# Croland — accounts & subscriptions setup

Everything in code is done. What's left needs your own accounts/credentials, which I can't
create for you. Follow these in order — later steps depend on earlier ones.

## 1. Supabase (auth + database)

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → paste the contents of [`supabase-schema.sql`](supabase-schema.sql) → Run.
   This creates the `profiles`, `progress` and `stripe_events` tables, their RLS policies, and
   the signup trigger.
3. **Authentication → Providers**: enable **Email**, and enable **Google** (needs step 2 below first).
4. **Authentication → URL Configuration**: add your site's URL (and `http://localhost:8888` for
   local testing) to the Redirect URLs allow-list.
5. **Project Settings → API**: copy the **Project URL** and the **anon public key**.
6. Open [`index.html`](index.html), find `SUPABASE_URL` and `SUPABASE_ANON_KEY` near the top of
   the `<script>` block, and paste them in.

## 2. Google sign-in

1. In [Google Cloud Console](https://console.cloud.google.com), create an OAuth 2.0 Client ID
   (Web application).
2. Authorized redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback` (from step 1.5 above).
3. Google's consent-screen verification will ask for public Terms/Privacy URLs — use your
   deployed `/terms.html` and `/privacy.html` (see step 4).
4. Paste the Client ID and Client Secret into Supabase → **Authentication → Providers → Google**.

## 3. Stripe (subscriptions)

1. Create a Stripe account. Stay in **Test mode** until everything works end-to-end.
2. **Product catalog**: create a Product ("Croland Plus") with a recurring monthly (or yearly)
   Price. Copy the **Price ID** (`price_...`).
3. **Settings → Billing → Customer portal**: turn it on, then copy the **portal login link**.
   Paste it into `index.html` as `STRIPE_PORTAL_URL`.
4. **Developers → Webhooks → Add endpoint**: URL = `https://YOUR-SITE/.netlify/functions/stripe-webhook`
   (only works once deployed — see step 5). Select events: `checkout.session.completed`,
   `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`,
   `invoice.payment_failed`. Copy the **signing secret** (`whsec_...`).

## 4. GitHub + Netlify (deploy pipeline)

Netlify Drop can't run the Functions this needs — you confirmed git-based deploy instead.

```bash
# create an empty repo on GitHub first (no README/license), then:
git remote add origin https://github.com/YOUR-USERNAME/croland.git
git branch -M main
git push -u origin main
```

Then in Netlify: **Add new site → Import an existing project** → pick the GitHub repo. Netlify
will read `netlify.toml` automatically (build command, publish dir, functions dir already
configured).

**Site settings → Environment variables**, add:

| Key | Value |
|---|---|
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL (same value hardcoded in `index.html`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → secret key (`sb_secret_...`) |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys → Secret key |
| `STRIPE_WEBHOOK_SECRET` | from step 3.4 above |
| `STRIPE_PRICE_ID` | from step 3.2 above |

Redeploy after adding env vars (Netlify does this automatically on the next push, or trigger a
manual deploy).

## 5. Test before going live

With Stripe still in **test mode**:

- Sign up with email, then separately with Google — confirm both land you in the app with
  Level 1 unlocked and a `profiles`+`progress` row created (visible in Supabase's Table editor).
- Subscribe using Stripe's test card `4242 4242 4242 4242`, any future expiry/CVC. Confirm
  Level 2+ unlocks within ~10s of returning to the site (the account page shows "Confirming your
  subscription…" while it waits for the webhook).
- Cancel the test subscription via **Manage subscription** → confirm Level 2+ locks again.
- Optional: `netlify dev` + `stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook`
  lets you test the whole flow locally before it's even deployed.

## 6. Go live

1. Switch `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` in Netlify to their **live mode** values.
2. Register a **new** webhook endpoint in Stripe's live mode (same URL, new signing secret) →
   update `STRIPE_WEBHOOK_SECRET` in Netlify.
3. Do one small real subscription yourself to confirm the whole path works, then refund it.
