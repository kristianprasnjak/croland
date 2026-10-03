// POST https://<projekt>.supabase.co/functions/v1/paddle-checkout
// Auth: Authorization: Bearer <supabase access token>
// Tijelo: { tip: 'paket', paket: 'tjedan'|'mjesec'|'godina' }
//      ili { tip: 'kodovi', vrsta: 'tjedan'|'mjesec'|'godina', kolicina: 1..max_kodova }
//
// Stvara Paddle transakciju i vraća njezin id; preglednik je otvara u Paddle.js checkoutu.
// Cijena NIKAD ne dolazi iz preglednika: paket je cijena iz Paddle kataloga, a Custom
// kupnja se računa ovdje, po formuli iz postavke 'cijene'.
import {
  getSupabaseAdmin, korisnikIzZahtjeva, corsZaglavlja, json, postavka, besplatnoDo,
  cijenaKodova, cijenaPaketa, paddle, paddlePostavljen, PaddleGreska, VRSTE, type Vrsta,
} from '../_shared/lib.ts';

const IME: Record<Vrsta, string> = { tjedan: 'week', mjesec: 'month', godina: 'year' };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsZaglavlja(req) });
  if (req.method !== 'POST') return json(req, 405, { error: 'Method not allowed' });

  const supabaseAdmin = getSupabaseAdmin();
  const user = await korisnikIzZahtjeva(supabaseAdmin, req);
  if (!user) return json(req, 401, { error: 'Invalid session' });

  let tijelo: any;
  try { tijelo = await req.json(); } catch { return json(req, 400, { error: 'Bad JSON' }); }

  // Do početka naplate se ništa ne prodaje.
  const besplatno = await besplatnoDo(supabaseAdmin);
  if (besplatno) return json(req, 409, { error: 'besplatno', do: besplatno.toISOString() });
  if (!paddlePostavljen()) return json(req, 503, { error: 'paddle-nije-postavljen' });

  const { data: pr } = await supabaseAdmin.from('pretplate')
    .select('paddle_customer_id, status').eq('user_id', user.id).maybeSingle();
  const customData: Record<string, unknown> = { user_id: user.id };
  let stavke: unknown[];

  try {
    if (tijelo.tip === 'paket') {
      const paket = tijelo.paket as Vrsta;
      if (!VRSTE.includes(paket)) return json(req, 400, { error: 'Unknown plan' });
      // Dvostruka pretplata: tko već ima aktivnu, mijenja paket, ne kupuje drugi.
      if (pr && ['active', 'trialing', 'past_due', 'paused'].includes(pr.status)) {
        return json(req, 409, { error: 'vec-pretplacen' });
      }
      const priceId = cijenaPaketa(paket);
      if (!priceId) return json(req, 503, { error: 'paddle-nije-postavljen' });
      customData.tip = 'paket';
      stavke = [{ price_id: priceId, quantity: 1 }];
    } else if (tijelo.tip === 'kodovi') {
      const vrsta = tijelo.vrsta as Vrsta;
      const cijene = (await postavka(supabaseAdmin, 'cijene')) || {};
      const max = Number(cijene.max_kodova) || 2000;
      const n = Math.floor(Number(tijelo.kolicina));
      if (!VRSTE.includes(vrsta) || !(n >= 1 && n <= max)) return json(req, 400, { error: 'Bad quantity' });
      const product = Deno.env.get('PADDLE_PRODUCT_KODOVI');
      if (!product) return json(req, 503, { error: 'paddle-nije-postavljen' });
      const { poKoduCenti } = cijenaKodova(cijene, vrsta, n);
      customData.tip = 'kodovi'; customData.vrsta = vrsta; customData.kolicina = n;
      stavke = [{
        quantity: n,
        price: {
          product_id: product,
          name: 'Croland Plus code — 1 ' + IME[vrsta],
          description: 'Code for 1 ' + IME[vrsta] + ' of Croland Plus. Redeem within 2 years.',
          unit_price: { amount: String(poKoduCenti), currency_code: String(cijene.valuta || 'EUR') },
          tax_mode: 'internal',              // cijena već sadrži PDV
          quantity: { minimum: 1, maximum: max },
        },
      }];
    } else {
      return json(req, 400, { error: 'Unknown purchase type' });
    }

    const txn = await paddle('POST', '/transactions', {
      items: stavke,
      custom_data: customData,
      ...(pr && pr.paddle_customer_id ? { customer_id: pr.paddle_customer_id } : {}),
    });
    return json(req, 200, { transaction_id: txn.id, email: user.email });
  } catch (e) {
    if (e instanceof PaddleGreska) return json(req, e.status, { error: e.message });
    console.error(e);
    return json(req, 500, { error: 'Checkout failed' });
  }
});
