// Shared helpers for the Netlify Functions. Server-only — never bundled into app.html.
const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');

function getSupabaseAdmin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
}

function siteUrlFrom(event) {
  const origin = event.headers && (event.headers.origin || event.headers.Origin);
  return process.env.SITE_URL || origin || 'http://localhost:8888';
}

module.exports = { getSupabaseAdmin, getStripe, siteUrlFrom };
