// POST https://<projekt>.supabase.co/functions/v1/stripe-webhook — registrirano kao Stripe
// webhook endpoint. Provjerava potpis, odbacuje duplikate po event.id (Stripe isporučuje
// događaje izvan redoslijeda i više puta) i pronalazi korisnika bez oslanjanja na redoslijed:
// prvo client_reference_id, pa metadata.supabase_user_id na Stripe kupcu, pa postojeća veza
// profiles.stripe_customer_id.
//
// VAŽNO: ova funkcija mora biti deployana s verify_jwt = false (vidi supabase/config.toml).
// Stripe ne šalje Supabase JWT, pa bi je inače gateway odbio prije nego što je uopće dosegne.
// Bez CORS-a je namjerno — poziva je Stripeov server, ne preglednik.
import Stripe from 'npm:stripe@18.5.0';
import { getSupabaseAdmin, getStripe } from '../_shared/lib.ts';
import type { SupabaseClient } from 'npm:@supabase/supabase-js@2';

const SUBSCRIPTION_EVENTS = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

// Deno nema sinkroni crypto koji stripe.webhooks.constructEvent traži; constructEventAsync
// s ovim providerom je jedini put.
const cryptoProvider = Stripe.createSubtleCryptoProvider();

async function resolveUserId(
  supabaseAdmin: SupabaseClient,
  stripe: Stripe,
  eventType: string,
  obj: any,
): Promise<string | null> {
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
  return ((customer as any) && (customer as any).metadata && (customer as any).metadata.supabase_user_id) || null;
}

async function upsertFromSubscription(supabaseAdmin: SupabaseClient, sub: any, userId: string) {
  const item = sub.items && sub.items.data && sub.items.data[0];
  const priceId = item && item.price ? item.price.id : null;
  // API 2025-03-31.basil+ premjestio je current_period_end sa pretplate na razinu stavke;
  // fallback na polje najviše razine pokriva starije API verzije.
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

// Oznaka pretplate s računa (invoice). Od API verzije 2025-03-31.basil polje
// `invoice.subscription` je uklonjeno i preseljeno pod `invoice.parent`, pa se čita oboje:
// stariji webhook endpointi još šalju stari oblik, noviji (basil, dahlia…) samo novi.
// Bez ovoga bi invoice.payment_failed tiho ne radio ništa i neuspjelo plaćanje ne bi
// zaključalo sadržaj.
function pretplataSRacuna(obj: any): string | null {
  if (obj.subscription) return obj.subscription;
  const roditelj = obj.parent;
  const detalji = roditelj && (roditelj.subscription_details || roditelj.subscriptionDetails);
  return (detalji && detalji.subscription) || null;
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const stripe = getStripe();
  const sig = req.headers.get('stripe-signature');
  const rawBody = await req.text();

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      rawBody,
      sig!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      cryptoProvider,
    );
  } catch (err) {
    return new Response('Webhook signature verification failed: ' + (err as Error).message, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Idempotencija: prvo se "zauzme" event id. Sudar znači da je već obrađen.
  const { error: insertErr } = await supabaseAdmin
    .from('stripe_events')
    .insert({ id: stripeEvent.id });
  if (insertErr) {
    // Unique violation == duplicate delivery; anything else is a real error we should surface.
    if ((insertErr as any).code === '23505') {
      return Response.json({ received: true, duplicate: true });
    }
    return new Response(JSON.stringify({ error: 'Could not record event' }), { status: 500 });
  }

  const obj = stripeEvent.data.object as any;

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
      const subId = pretplataSRacuna(obj);
      if (userId && subId) {
        const sub = await stripe.subscriptions.retrieve(subId);
        await upsertFromSubscription(supabaseAdmin, sub, userId);
      }
    }
  } catch (err) {
    // Događaj je već zapisan u stripe_events, pa bi Stripeov retry samo preskočio kao duplikat.
    // Log-and-200 je namjeran: zaglavljeni događaj koji Stripe vječno ponavlja nije korisniji
    // od onoga koji je pao jednom i stao.
    console.error('stripe-webhook processing error', stripeEvent.type, err);
  }

  return Response.json({ received: true });
});
