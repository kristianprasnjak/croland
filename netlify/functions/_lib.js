// Shared helpers for the Netlify Functions. Server-only — never bundled into app.html.
const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');
const ws = require('ws');

function getSupabaseAdmin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
    // Netlify's Node 20 runtime has no native WebSocket global, which the client needs even
    // though these Functions never use realtime subscriptions — without this it throws at
    // construction time.
    realtime: { transport: ws },
  });
}

function getStripe() {
  // Managed Payments accounts (Stripe's current default for new accounts) require
  // 2025-03-31.basil or later — 2024-06-20 fails with "Managed Payments is not supported".
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-03-31.basil' });
}

function siteUrlFrom(event) {
  const origin = event.headers && (event.headers.origin || event.headers.Origin);
  return process.env.SITE_URL || origin || 'http://localhost:8888';
}

// Jedina točka odluke o pravu na plaćeni sadržaj na strani servera. Klijentski parnjak je
// imaPretplatu() u index.html i njih dvoje moraju govoriti isto — ali klijentskom se ne
// vjeruje, jer se preglednik da nagovoriti na svašta.
//
// Tri načina da netko ima pristup:
//   1. komplimentarno = true   (ručno upaljeno u Table editoru, doživotno)
//   2. aktivna Stripe pretplata
//   3. akcija "upadaj" još traje  (postavke.svima_pristup_do je u budućnosti)
async function imaPravoPristupa(supabaseAdmin, userId) {
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

module.exports = { getSupabaseAdmin, getStripe, siteUrlFrom, imaPravoPristupa };
