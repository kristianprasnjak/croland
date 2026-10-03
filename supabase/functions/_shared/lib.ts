// Zajednički dio svih Edge Functiona. Server-only — nikad se ne pakira u index.html.
//
// SUPABASE_URL i SUPABASE_SERVICE_ROLE_KEY Supabase sam ubrizgava u svaku funkciju.
// Paddle tajne se postavljaju ručno (vidi SETUP.md → Paddle):
//   PADDLE_API_KEY, PADDLE_WEBHOOK_SECRET, PADDLE_OKRUZENJE (sandbox | production),
//   PADDLE_PRICE_TJEDAN, PADDLE_PRICE_MJESEC, PADDLE_PRICE_GODINA, PADDLE_PRODUCT_KODOVI
// Dok PADDLE_API_KEY nije postavljen, sve što traži Paddle vraća 503 'paddle-nije-postavljen',
// a ostatak (kodovi bez pretplate, brisanje računa bez pretplate) radi normalno.
import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2';

// Podrijetla kojima se smije odgovoriti. Kad stigne vlastita domena, dovoljno je postaviti
// SITE_URL (npr. https://croland.com) — doda se ovdje sama.
const DOZVOLJENA_PODRIJETLA = [
  'https://kristianprasnjak.github.io',
  'http://localhost:8000',
  'http://localhost:3000',
  'http://127.0.0.1:8000',
];
function podrijetla(): string[] {
  const site = (Deno.env.get('SITE_URL') || '').replace(/\/+$/, '');
  if (!site) return DOZVOLJENA_PODRIJETLA;
  try { return DOZVOLJENA_PODRIJETLA.concat(new URL(site).origin); } catch { return DOZVOLJENA_PODRIJETLA; }
}

export function corsZaglavlja(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  const svi = podrijetla();
  return {
    'Access-Control-Allow-Origin': svi.includes(origin) ? origin : svi[0],
    'Access-Control-Allow-Headers': 'authorization, apikey, x-client-info, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin',
  };
}

export function json(req: Request, status: number, body: unknown, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsZaglavlja(req), 'Content-Type': 'application/json', ...extra },
  });
}

export function getSupabaseAdmin(): SupabaseClient {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

// Vraća korisnika iz `Authorization: Bearer <supabase access token>`, ili null.
export async function korisnikIzZahtjeva(supabaseAdmin: SupabaseClient, req: Request) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data || !data.user) return null;
  return data.user;
}

// Jedina točka odluke o pravu na plaćeni sadržaj na strani servera. Sama odluka živi u
// bazi (public.plus_stanje), istoj funkciji iz koje preglednik dobiva moj_pristup(), pa
// server i stranica ne mogu reći različito. Klijentu se svejedno ne vjeruje.
//
// Načini da netko ima Plus: komplimentarno, Paddle pretplata (active/trialing, past_due
// još 14 dana), iskorišteni kodovi, besplatno razdoblje (postavke.svima_pristup_do).
export async function imaPravoPristupa(
  supabaseAdmin: SupabaseClient,
  userId: string,
): Promise<{ ok: boolean; razlog: string }> {
  const { data, error } = await supabaseAdmin.rpc('plus_stanje', { p_uid: userId });
  if (error) return { ok: false, razlog: 'stanje-nedostupno' };
  const red = Array.isArray(data) ? data[0] : data;
  if (red && red.ima) return { ok: true, razlog: red.razlog || 'plus' };
  return { ok: false, razlog: 'nema-pretplatu' };
}

// ---------------- postavke ----------------
export async function postavka(supabaseAdmin: SupabaseClient, kljuc: string) {
  const { data } = await supabaseAdmin.from('postavke').select('vrijednost').eq('kljuc', kljuc).maybeSingle();
  return data ? data.vrijednost : null;
}

// Kupnja je zatvorena dok traje besplatno razdoblje (odluka: do početka naplate se ništa ne prodaje).
export async function besplatnoDo(supabaseAdmin: SupabaseClient): Promise<Date | null> {
  const v = await postavka(supabaseAdmin, 'svima_pristup_do');
  if (!v) return null;
  const t = Date.parse(v);
  return isNaN(t) || t <= Date.now() ? null : new Date(t);
}

export type Vrsta = 'tjedan' | 'mjesec' | 'godina';
export const VRSTE: Vrsta[] = ['tjedan', 'mjesec', 'godina'];

// Ista formula kao u index.html (cijenaKodova) i cjenik.html.
export function cijenaKodova(cijene: Record<string, number>, vrsta: Vrsta, n: number) {
  const osnovica = Number(cijene[vrsta]);
  const e = Number(cijene.popust_eksponent) || Math.log(2) / Math.log(100);
  const pod = Number(cijene.popust_pod) || 1 / 3;
  const faktor = Math.max(Math.pow(n, -e), pod);
  const poKoduCenti = Math.round(osnovica * faktor * 100);
  return { poKoduCenti, ukupnoCenti: poKoduCenti * n, faktor };
}

export function dodajTrajanje(od: Date, vrsta: Vrsta): Date {
  const d = new Date(od.getTime());
  if (vrsta === 'tjedan') d.setUTCDate(d.getUTCDate() + 7);
  else if (vrsta === 'mjesec') {
    // kao Postgresov interval '1 month': 31. 1. + 1 mjesec = 28. 2., ne 3. 3.
    const dan = d.getUTCDate();
    d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() + 1);
    const zadnji = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
    d.setUTCDate(Math.min(dan, zadnji));
  }
  else d.setUTCFullYear(d.getUTCFullYear() + 1);
  return d;
}

// ---------------- Paddle ----------------
export function paddlePostavljen(): boolean {
  return !!Deno.env.get('PADDLE_API_KEY');
}

export class PaddleGreska extends Error {
  status: number;
  detalji: unknown;
  constructor(status: number, poruka: string, detalji?: unknown) {
    super(poruka); this.status = status; this.detalji = detalji;
  }
}

export async function paddle(metoda: string, putanja: string, tijelo?: unknown) {
  const kljuc = Deno.env.get('PADDLE_API_KEY');
  if (!kljuc) throw new PaddleGreska(503, 'paddle-nije-postavljen');
  const baza = (Deno.env.get('PADDLE_OKRUZENJE') || 'sandbox') === 'production'
    ? 'https://api.paddle.com' : 'https://sandbox-api.paddle.com';
  const r = await fetch(baza + putanja, {
    method: metoda,
    headers: { 'Authorization': 'Bearer ' + kljuc, 'Content-Type': 'application/json' },
    body: tijelo === undefined ? undefined : JSON.stringify(tijelo),
  });
  const txt = await r.text();
  let podaci: any = null;
  try { podaci = txt ? JSON.parse(txt) : null; } catch { podaci = { raw: txt }; }
  if (!r.ok) {
    console.error('Paddle', metoda, putanja, r.status, txt);
    throw new PaddleGreska(502, 'paddle-greska', podaci && podaci.error);
  }
  return podaci ? podaci.data : null;
}

export function cijenaPaketa(paket: Vrsta): string | null {
  const m: Record<Vrsta, string> = { tjedan: 'PADDLE_PRICE_TJEDAN', mjesec: 'PADDLE_PRICE_MJESEC', godina: 'PADDLE_PRICE_GODINA' };
  return Deno.env.get(m[paket]) || null;
}

// Paket iz Paddle cijene: po intervalu naplate, pa nije važno koja je točno cijena
// (stara cijena zadržana kod poskupljenja i dalje je "godina").
export function paketIzCijene(price: any): Vrsta | null {
  const i = price && price.billing_cycle && price.billing_cycle.interval;
  const f = price && price.billing_cycle && price.billing_cycle.frequency;
  if (i === 'week' && f === 1) return 'tjedan';
  if (i === 'month' && f === 1) return 'mjesec';
  if (i === 'year' && f === 1) return 'godina';
  return null;
}

// Provjera potpisa webhooka: Paddle-Signature: ts=...;h1=<hmac-sha256(ts:tijelo)>
export async function paddlePotpisValjan(tijelo: string, zaglavlje: string | null): Promise<boolean> {
  const tajna = Deno.env.get('PADDLE_WEBHOOK_SECRET');
  if (!tajna || !zaglavlje) return false;
  const dijelovi: Record<string, string> = {};
  zaglavlje.split(';').forEach((p) => { const [k, v] = p.split('='); if (k && v) dijelovi[k.trim()] = v.trim(); });
  if (!dijelovi.ts || !dijelovi.h1) return false;
  // Stari potpis (više od 5 min) se odbija — zaštita od ponovnog slanja istog zahtjeva.
  if (Math.abs(Date.now() / 1000 - Number(dijelovi.ts)) > 300) return false;
  const kljuc = await crypto.subtle.importKey('raw', new TextEncoder().encode(tajna),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const potpis = await crypto.subtle.sign('HMAC', kljuc, new TextEncoder().encode(dijelovi.ts + ':' + tijelo));
  const hex = Array.from(new Uint8Array(potpis)).map((b) => b.toString(16).padStart(2, '0')).join('');
  if (hex.length !== dijelovi.h1.length) return false;
  let razlika = 0;
  for (let i = 0; i < hex.length; i++) razlika |= hex.charCodeAt(i) ^ dijelovi.h1.charCodeAt(i);
  return razlika === 0;
}
