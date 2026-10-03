// POST https://<projekt>.supabase.co/functions/v1/racun
// Auth: Authorization: Bearer <supabase access token>
// Tijelo: { radnja: ..., ... }
//
//   iskoristi_kod    { kod, vise }   — iskoristi kod; pretplatniku pomiče iduću naplatu u Paddleu
//   portal           {}              — Paddle portal (otkazivanje, kartica, računi)
//   promijeni_paket  { paket }       — novi paket vrijedi kad istekne plaćeno razdoblje
//   nastavi          {}              — poništi zakazano otkazivanje
//   obrisi_racun     {}              — otkaže Paddle pretplatu i obriše račun
//
// Sve što ne treba Paddle (kod bez pretplate, brisanje bez pretplate) radi i prije nego
// što je Paddle postavljen.
import {
  getSupabaseAdmin, korisnikIzZahtjeva, corsZaglavlja, json, paddle, cijenaPaketa,
  dodajTrajanje, PaddleGreska, VRSTE, type Vrsta,
} from '../_shared/lib.ts';

const AKTIVNA = ['active', 'trialing', 'past_due'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsZaglavlja(req) });
  if (req.method !== 'POST') return json(req, 405, { error: 'Method not allowed' });

  const db = getSupabaseAdmin();
  const user = await korisnikIzZahtjeva(db, req);
  if (!user) return json(req, 401, { error: 'Invalid session' });

  let t: any;
  try { t = await req.json(); } catch { return json(req, 400, { error: 'Bad JSON' }); }

  const { data: pr } = await db.from('pretplate').select('*').eq('user_id', user.id).maybeSingle();

  try {
    switch (t.radnja) {
      case 'iskoristi_kod': return await iskoristiKod(req, db, user.id, pr, String(t.kod || ''), !!t.vise);
      case 'portal': {
        if (!pr || !pr.paddle_customer_id) return json(req, 404, { error: 'nema-pretplate' });
        const s = await paddle('POST', '/customers/' + pr.paddle_customer_id + '/portal-sessions',
          pr.paddle_subscription_id ? { subscription_ids: [pr.paddle_subscription_id] } : {});
        return json(req, 200, { url: s.urls.general.overview });
      }
      case 'promijeni_paket': {
        const paket = t.paket as Vrsta;
        if (!VRSTE.includes(paket)) return json(req, 400, { error: 'Unknown plan' });
        if (!pr || !AKTIVNA.includes(pr.status)) return json(req, 404, { error: 'nema-pretplate' });
        const priceId = cijenaPaketa(paket);
        if (!priceId) return json(req, 503, { error: 'paddle-nije-postavljen' });
        // do_not_bill: ništa se ne naplaćuje sad; novi paket i cijena kreću s idućom
        // naplatom, tj. kad istekne već plaćeno razdoblje (odluka 3. 10. 2026.). (provjeriti u sandboxu)
        await paddle('PATCH', '/subscriptions/' + pr.paddle_subscription_id, {
          items: [{ price_id: priceId, quantity: 1 }], proration_billing_mode: 'do_not_bill',
        });
        await db.from('pretplate').update({ paket, updated_at: new Date().toISOString() }).eq('user_id', user.id);
        return json(req, 200, { ok: true });
      }
      case 'nastavi': {
        if (!pr || !pr.paddle_subscription_id) return json(req, 404, { error: 'nema-pretplate' });
        await paddle('PATCH', '/subscriptions/' + pr.paddle_subscription_id, { scheduled_change: null });
        await db.from('pretplate').update({ auto_obnova: true, updated_at: new Date().toISOString() }).eq('user_id', user.id);
        return json(req, 200, { ok: true });
      }
      case 'obrisi_racun': {
        // Pretplata se otkazuje odmah; preostali dani propadaju (odluka 3. 10. 2026.).
        if (pr && pr.paddle_subscription_id && (AKTIVNA.includes(pr.status) || pr.status === 'paused')) {
          await paddle('POST', '/subscriptions/' + pr.paddle_subscription_id + '/cancel', { effective_from: 'immediately' });
        }
        // Kaskada briše profil, napredak, javne bodove, veze, AI razgovore, pretplatu i pristup.
        // Kupljeni kodovi ostaju valjani (kupnje_kodova.kupac → null).
        const { error } = await db.auth.admin.deleteUser(user.id);
        if (error) { console.error('deleteUser', error); return json(req, 500, { error: 'Delete failed' }); }
        return json(req, 200, { ok: true });
      }
      default:
        return json(req, 400, { error: 'Unknown action' });
    }
  } catch (e) {
    if (e instanceof PaddleGreska) return json(req, e.status, { error: e.message });
    console.error(e);
    return json(req, 500, { error: 'Failed' });
  }
});

async function iskoristiKod(req: Request, db: any, uid: string, pr: any, kod: string, vise: boolean) {
  const pretplatnik = !!(pr && AKTIVNA.includes(pr.status) && pr.auto_obnova && pr.paddle_subscription_id && pr.vrijedi_do);

  const { data: r, error } = await db.rpc('iskoristi_kod', {
    p_uid: uid, p_kod: kod, p_vise: vise, p_produzi_pristup: !pretplatnik,
  });
  if (error) { console.error(error); return json(req, 500, { error: 'Failed' }); }
  if (!r || r.stanje !== 'ok') return json(req, 409, { error: 'nevazeci' });

  if (!pretplatnik) return json(req, 200, { ok: true, nacin: 'pristup', vrsta: r.vrsta, novi_do: r.novi_do });

  // Pretplatnik: pomiče se iduća naplata za trajanje koda. Ako Paddle odbije, kod se vraća.
  const novi = dodajTrajanje(new Date(pr.vrijedi_do), r.vrsta as Vrsta).toISOString();
  try {
    await paddle('PATCH', '/subscriptions/' + pr.paddle_subscription_id, {
      next_billed_at: novi, proration_billing_mode: 'do_not_bill',
    });
  } catch (e) {
    await db.rpc('vrati_kod', { p_uid: uid, p_kod: kod });
    throw e;
  }
  await db.from('pretplate').update({ vrijedi_do: novi, updated_at: new Date().toISOString() }).eq('user_id', uid);
  return json(req, 200, { ok: true, nacin: 'pretplata', vrsta: r.vrsta, novi_do: novi });
}
