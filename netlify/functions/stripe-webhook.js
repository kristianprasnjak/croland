// POST /.netlify/functions/stripe-webhook — registered as the Stripe webhook endpoint.
// Verifies the signature, dedupes by event.id (Stripe delivers events out of order and more
// than once), and resolves the target user without depending on ordering: prefer
// client_reference_id, then the Stripe customer's metadata.supabase_user_id, then an existing
// profiles.stripe_customer_id link.
const { getSupabaseAdmin, getStripe } = require('./_lib');

const SUBSCRIPTION_EVENTS = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

async function resolveUserId(supabaseAdmin, stripe, eventType, obj) {
  if (eventType === 'checkout.session.completed' && obj.client_reference_id) {
    return obj.client_reference_id;
  }
  const customerId = obj.customer;
  if (!customerId) return null;

  const { data: byCustomer } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();
  if (byCustomer) return byCustomer.id;

  const customer = await stripe.customers.retrieve(customerId);
  return (customer && customer.metadata && customer.metadata.supabase_user_id) || null;
}

async function upsertFromSubscription(supabaseAdmin, sub, userId) {
  const item = sub.items && sub.items.data && sub.items.data[0];
  const priceId = item && item.price ? item.price.id : null;
  // API 2025-03-31.basil+ moved current_period_end from the subscription to the item level;
  // fall back to the top-level field for older API versions.
  const periodEnd = (item && item.current_period_end) || sub.current_period_end || null;
  await supabaseAdmin
    .from('profiles')
    .update({
      stripe_customer_id: sub.customer,
      stripe_subscription_id: sub.id,
      subscription_status: sub.status,
      price_id: priceId,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const stripe = getStripe();
  const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  const rawBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return { statusCode: 400, body: 'Webhook signature verification failed: ' + err.message };
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Idempotency: claim the event id first. A conflict means we've already processed it.
  const { error: insertErr } = await supabaseAdmin
    .from('stripe_events')
    .insert({ id: stripeEvent.id });
  if (insertErr) {
    // Unique violation == duplicate delivery; anything else is a real error we should surface.
    if (insertErr.code === '23505') {
      return { statusCode: 200, body: JSON.stringify({ received: true, duplicate: true }) };
    }
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not record event' }) };
  }

  const obj = stripeEvent.data.object;

  try {
    if (stripeEvent.type === 'checkout.session.completed') {
      const userId = await resolveUserId(supabaseAdmin, stripe, stripeEvent.type, obj);
      if (userId && obj.subscription) {
        const sub = await stripe.subscriptions.retrieve(obj.subscription);
        await upsertFromSubscription(supabaseAdmin, sub, userId);
      }
    } else if (SUBSCRIPTION_EVENTS.has(stripeEvent.type)) {
      const userId = await resolveUserId(supabaseAdmin, stripe, stripeEvent.type, obj);
      if (userId) await upsertFromSubscription(supabaseAdmin, obj, userId);
    } else if (stripeEvent.type === 'invoice.payment_failed') {
      const userId = await resolveUserId(supabaseAdmin, stripe, stripeEvent.type, obj);
      if (userId && obj.subscription) {
        const sub = await stripe.subscriptions.retrieve(obj.subscription);
        await upsertFromSubscription(supabaseAdmin, sub, userId);
      }
    }
  } catch (err) {
    // The event is already recorded in stripe_events, so a retry from Stripe would just
    // duplicate-skip rather than reprocess. Log-and-200 is intentional here: a stuck event
    // that Stripe retries forever isn't more useful than one that failed once and stopped.
    console.error('stripe-webhook processing error', stripeEvent.type, err);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
