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

module.exports = { getSupabaseAdmin, getStripe, siteUrlFrom };
