# Croland — accounts & subscriptions setup

Everything in code is done. What's left needs your own accounts/credentials, which I can't
create for you. Follow these in order — later steps depend on earlier ones.

**Stack:** GitHub Pages (statična stranica) + Supabase (auth, baza, Storage, Edge Functions)
+ Stripe (naplata). Netlifyja više nema nigdje u lancu.

Adresa stranice: `https://kristianprasnjak.github.io/croland/`
Adresa funkcija: `https://krunohdgohuebmafepmb.supabase.co/functions/v1/`

## 1. Supabase (auth + database)

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → paste the contents of [`supabase-schema.sql`](supabase-schema.sql) → Run.
   This creates the `profiles`, `progress` and `stripe_events` tables, their RLS policies, and
   the signup trigger.
3. **Authentication → Providers**: enable **Email**, and enable **Google** (needs step 2 below first).
4. **Authentication → URL Configuration**:
   - **Site URL**: `https://kristianprasnjak.github.io/croland/`
   - **Redirect URLs**: `https://kristianprasnjak.github.io/croland/**` i `http://localhost:8000/**`

   Ovo nije kozmetika. `signInWithOAuth` u `index.html` šalje `redirectTo: window.location.href`,
   ali Supabase taj zahtjev **ignorira** ako adresa nije na popisu i tada vrati korisnika na
   Site URL. Zaostala Site URL adresa je razlog zašto je Google prijava nekad završavala na
   staroj hosting adresi.
5. **Storage**: napravi privatni bucket `sadrzaj` (bez javnog pristupa) i u njega uploadaj
   `zasticeno/data-plus.json` koji nastane pri `npm run build`.
6. **Project Settings → API**: copy the **Project URL** and the **anon/publishable key**.
7. Open [`index.html`](index.html), find `SUPABASE_URL` and `SUPABASE_ANON_KEY` near the top of
   the `<script>` block, and paste them in. `FUNKCIJE_URL` se izvodi iz `SUPABASE_URL`, ne dira se.

## 2. Google sign-in

1. In [Google Cloud Console](https://console.cloud.google.com), create an OAuth 2.0 Client ID
   (Web application).
2. Authorized redirect URI: `https://krunohdgohuebmafepmb.supabase.co/auth/v1/callback`.
   **Ovo se ne mijenja pri selidbi hostinga** — Google uvijek gađa Supabase, a Supabase potom
   korisnika vraća na adrese iz koraka 1.4.
3. Google's consent-screen verification will ask for public Terms/Privacy URLs — use
   `https://kristianprasnjak.github.io/croland/terms.html` and `.../privacy.html`.
4. Paste the Client ID and Client Secret into Supabase → **Authentication → Providers → Google**.

## 3. Stripe (subscriptions)

1. Create a Stripe account. Stay in **Test mode** until everything works end-to-end.
2. **Product catalog**: create a Product ("Croland Plus") with a recurring monthly (or yearly)
   Price. Copy the **Price ID** (`price_...`).
3. **Settings → Billing → Customer portal**: turn it on, then copy the **portal login link**.
   Paste it into `index.html` as `STRIPE_PORTAL_URL`.
4. **Developers → Webhooks → Add endpoint**:
   URL = `https://krunohdgohuebmafepmb.supabase.co/functions/v1/stripe-webhook`
   Select events: `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.
   Copy the **signing secret** (`whsec_...`).

## 4. Supabase Edge Functions (backend)

Tri funkcije žive u `supabase/functions/`. Trebaju [Supabase CLI](https://supabase.com/docs/guides/cli).

`npm install -g supabase` **ne radi** — Supabase je globalnu npm instalaciju ugasio i javlja
"Installing Supabase CLI as a global module is not supported". Na Windowsu su dvije opcije:
`npx supabase@latest <naredba>` (ništa se ne instalira, treba Node 20+) ili
`scoop install supabase`. Niže je svugdje `npx` oblik.

```bash
npx supabase@latest login
npx supabase@latest link --project-ref krunohdgohuebmafepmb
```

`link` traži lozinku baze — za rad s funkcijama nije potrebna, može se preskočiti Enterom.

Tajne (jednom, i ponovno kad se mijenjaju):

```bash
npx supabase@latest secrets set STRIPE_SECRET_KEY=sk_test_...
npx supabase@latest secrets set STRIPE_PRICE_ID=price_...
npx supabase@latest secrets set STRIPE_WEBHOOK_SECRET=whsec_...
npx supabase@latest secrets set SITE_URL=https://kristianprasnjak.github.io/croland
```

`SUPABASE_URL` i `SUPABASE_SERVICE_ROLE_KEY` se **ne postavljaju** — Supabase ih sam ubrizgava
u svaku Edge Function, a prefiks `SUPABASE_` je rezerviran pa ga `secrets set` odbija.

`SITE_URL` je obavezan. Stranica je na poddirektoriju (`/croland/`), a fallback bi uzeo samo
`Origin` zaglavlje (bez putanje) i vratio korisnika iz Stripe Checkouta u 404.

Deploy:

```bash
npx supabase@latest functions deploy create-checkout-session --use-api
npx supabase@latest functions deploy sadrzaj --use-api
npx supabase@latest functions deploy stripe-webhook --use-api
```

`--use-api` znači "spakiraj funkciju na Supabaseovoj strani". Bez toga stariji CLI traži
lokalni Docker, koji ovom projektu inače nigdje ne treba.

`supabase/config.toml` postavlja `verify_jwt = false` za `stripe-webhook`. Stripe ne šalje
Supabase JWT, pa bi ga gateway odbio prije nego što funkcija stigne provjeriti potpis;
sigurnost te funkcije počiva na provjeri Stripeova potpisa, ne na JWT-u. Druge dvije ostaju
na defaultu i traže valjani korisnički token.

## 5. GitHub Pages (deploy pipeline)

```bash
git push origin main
```

`.github/workflows/deploy.yml` na svaki push u `main` pokrene `npm run build` i objavi
**`dist/`**. Jednom, ručno: **Settings → Pages → Source = GitHub Actions**.

Zašto ovo mora ostati ovako: ako Pages servira granu umjesto Actions artifacta, objavi se
korijen repozitorija — a ondje stoji puni `data.js` sa svim plaćenim vježbama. Jedino
`npm run build` dijeli sadržaj na javni (`dist/data.js`) i plaćeni
(`zasticeno/data-plus.json`, koji nikad ne ide van).

Nakon svakog builda koji mijenja sadržaj, novi `zasticeno/data-plus.json` treba ručno
uploadati u Storage bucket `sadrzaj` (korak 1.5).

## 6. Test locally

Dva procesa, u dva terminala:

```bash
npm run build
npx serve dist -l 8000        # stranica na http://localhost:8000
```

```bash
cp .env.example .env          # popuni prave vrijednosti — nikad ne commitaj
npx supabase@latest functions serve --env-file .env
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
# stripe listen ispiše whsec_... — stavi ga u .env kao STRIPE_WEBHOOK_SECRET i restartaj serve
```

Za lokalni rad privremeno prebaci `FUNKCIJE_URL` u `index.html` na
`http://localhost:54321/functions/v1` (i vrati prije commita). `http://localhost:8000` je već
na popisu dozvoljenih podrijetla u `supabase/functions/_shared/lib.ts`.

With Stripe still in **test mode**:

- Sign up with email, then separately with Google — confirm both land you in the app with
  Level 1 unlocked and a `profiles`+`progress` row created (visible in Supabase's Table editor).
- Subscribe using Stripe's test card `4242 4242 4242 4242`, any future expiry/CVC. Confirm
  Level 2+ unlocks within ~10s of returning to the site (the account page shows "Confirming your
  subscription…" while it waits for the webhook).
- Cancel the test subscription via **Manage subscription** → confirm Level 2+ locks again.
- To test complimentary access without Stripe: Supabase Table editor → `profiles` → your row →
  set `komplimentarno` to `true` → reload the app → Level 2+ should unlock immediately.

## 7. Go live

1. `npx supabase@latest secrets set STRIPE_SECRET_KEY=...` i `STRIPE_PRICE_ID=...` na **live**
   vrijednosti.
2. Register a **new** webhook endpoint in Stripe's live mode (ista URL adresa, novi signing
   secret) → `npx supabase@latest secrets set STRIPE_WEBHOOK_SECRET=...`.
3. Redeploy sve tri funkcije (secrets se primjenjuju i bez toga, ali redeploy je sigurniji).
4. Do one small real subscription yourself to confirm the whole path works, then refund it.
