// POST /api/create-checkout-session
// Auth: Authorization: Bearer <supabase access token>
// Creates (or reuses) a Stripe customer for the caller and returns a Checkout Session URL
// for the subscription price configured in STRIPE_PRICE_ID. The price is never client-supplied.
const { getSupabaseAdmin, getStripe, siteUrlFrom } = require('./_lib');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Missing bearer token' }) };
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
  if (userErr || !userData || !userData.user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Invalid session' }) };
  }
  const user = userData.user;

  const stripe = getStripe();

  const { data: profile, error: profileErr } = await supabaseAdmin
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single();
  if (profileErr) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not load profile' }) };
  }

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

  const siteUrl = siteUrlFrom(event);
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: siteUrl + '/?checkout=success',
    cancel_url: siteUrl + '/?checkout=cancel',
  });

  return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
};
