// POST https://<projekt>.supabase.co/functions/v1/create-checkout-session
// Auth: Authorization: Bearer <supabase access token>
//
// Stvara (ili ponovno koristi) Stripe kupca za pozivatelja i vraća adresu Checkout sesije za
// pretplatu iz STRIPE_PRICE_ID. Cijena nikad ne dolazi s klijenta.
import { getSupabaseAdmin, getStripe, siteUrl, korisnikIzZahtjeva, corsZaglavlja, json } from '../_shared/lib.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsZaglavlja(req) });
  if (req.method !== 'POST') return json(req, 405, { error: 'Method not allowed' });

  const supabaseAdmin = getSupabaseAdmin();
  const user = await korisnikIzZahtjeva(supabaseAdmin, req);
  if (!user) return json(req, 401, { error: 'Invalid session' });

  const stripe = getStripe();

  const { data: profile, error: profileErr } = await supabaseAdmin
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single();
  if (profileErr) return json(req, 500, { error: 'Could not load profile' });

  let customerId = profile && profile.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    await supabaseAdmin
      .from('profiles')
      .update({ stripe_customer_id: customerId, updated_at: new Date().toISOString() })
      .eq('id', user.id);
  }

  const site = siteUrl(req);
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: Deno.env.get('STRIPE_PRICE_ID')!, quantity: 1 }],
    success_url: site + '/?checkout=success',
    cancel_url: site + '/?checkout=cancel',
  });

  return json(req, 200, { url: session.url });
});
