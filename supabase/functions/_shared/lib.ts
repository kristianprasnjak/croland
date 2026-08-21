// Zajednički dio triju Edge Functiona. Server-only — nikad se ne pakira u index.html.
//
// Nasljednik netlify/functions/_lib.js. Dvije razlike u odnosu na Netlify inačicu:
//   • ws shim za Supabase klijent više ne treba — Deno ima native WebSocket.
//   • SUPABASE_URL i SUPABASE_SERVICE_ROLE_KEY se ne postavljaju ručno; Supabase ih sam
//     ubrizgava u svaku Edge Function. Ručno ih se ne može ni postaviti (prefiks SUPABASE_
//     je rezerviran u `supabase secrets set`).
import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@18.5.0';

// Podrijetla kojima se smije odgovoriti. Dok je frontend bio iza Netlifyjevog /api/ proxyja
// ovo nije trebalo — bio je isto podrijetlo. Sad je stranica na github.io, a funkcije na
// supabase.co, pa svaki poziv iz preglednika ide kroz CORS.
const DOZVOLJENA_PODRIJETLA = [
  'https://kristianprasnjak.github.io',
  'http://localhost:8000',
  'http://localhost:3000',
  'http://127.0.0.1:8000',
];

export function corsZaglavlja(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': DOZVOLJENA_PODRIJETLA.includes(origin) ? origin : DOZVOLJENA_PODRIJETLA[0],
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

export function getStripe(): Stripe {
  // Managed Payments računi (Stripeov današnji default) traže 2025-03-31.basil ili noviji.
  // Verzija knjižnice je fiksirana na točan broj namjerno: apiVersion mora odgovarati onome
  // što stripe@18.5.0 tipizira, pa bi "^18" pri sljedećem deployu mogao pući na tipovima.
  return new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2025-08-27.basil',
    // Deno nema Nodeov http agent; fetch klijent je obavezan.
    httpClient: Stripe.createFetchHttpClient(),
  });
}

// Adresa na koju se korisnik vraća iz Stripe Checkouta. SITE_URL mora biti postavljen jer
// GitHub Pages živi na poddirektoriju (/croland/), a Origin zaglavlje nosi samo host —
// fallback na Origin bi vratio korisnika na korijen domene, tj. u 404.
export function siteUrl(req: Request): string {
  const postavljen = Deno.env.get('SITE_URL');
  if (postavljen) return postavljen.replace(/\/+$/, '');
  return (req.headers.get('origin') || 'http://localhost:8000').replace(/\/+$/, '');
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

// Jedina točka odluke o pravu na plaćeni sadržaj na strani servera. Klijentski parnjak je
// imaPretplatu() u index.html i njih dvoje moraju govoriti isto — ali klijentskom se ne
// vjeruje, jer se preglednik da nagovoriti na svašta.
//
// Tri načina da netko ima pristup:
//   1. komplimentarno = true   (ručno upaljeno u Table editoru, doživotno)
//   2. aktivna Stripe pretplata
//   3. akcija "upadaj" još traje  (postavke.svima_pristup_do je u budućnosti)
export async function imaPravoPristupa(
  supabaseAdmin: SupabaseClient,
  userId: string,
): Promise<{ ok: boolean; razlog: string }> {
  const { data: profil, error } = await supabaseAdmin
    .from('profiles')
    .select('komplimentarno, subscription_status')
    .eq('id', userId)
    .maybeSingle();

  if (error) return { ok: false, razlog: 'profil-nedostupan' };

  if (profil && profil.komplimentarno) return { ok: true, razlog: 'komplimentarno' };
  if (profil && (profil.subscription_status === 'active' || profil.subscription_status === 'trialing')) {
    return { ok: true, razlog: 'pretplata' };
  }

  const { data: postavka } = await supabaseAdmin
    .from('postavke')
    .select('vrijednost')
    .eq('kljuc', 'svima_pristup_do')
    .maybeSingle();

  const doKad = postavka && postavka.vrijednost;
  if (doKad) {
    const t = Date.parse(doKad);
    // Neispravan datum namjerno NE otvara pristup — tipfeler u Table editoru ne smije
    // slučajno pokloniti sadržaj svima.
    if (!isNaN(t) && Date.now() < t) return { ok: true, razlog: 'akcija' };
  }

  return { ok: false, razlog: 'nema-pretplatu' };
}
