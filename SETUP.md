# Croland — accounts & subscriptions setup

Everything in code is done. What's left needs your own accounts/credentials, which I can't
create for you. Follow these in order — later steps depend on earlier ones.

**Stack:** GitHub Pages (statična stranica) + Supabase (auth, baza, Storage, Edge Functions)
+ Paddle (naplata, Merchant of Record) + Brevo (mailovi). Stripe je uklonjen 3. 10. 2026.
(stare funkcije su u `_arhiva/stripe-funkcije/`). Plan i odluke: `PLAN-account-i-naplata.md`.

Adresa stranice: `https://kristianprasnjak.github.io/croland/`
Adresa funkcija: `https://krunohdgohuebmafepmb.supabase.co/functions/v1/`

## 1. Supabase (auth + database)

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → paste the contents of [`supabase-schema.sql`](supabase-schema.sql) → Run.
   This creates the `profiles`, `progress` and `stripe_events` tables, their RLS policies, and
   the signup trigger. Zatim, istim redom: `supabase-postavke.sql`, `supabase-progress-drustveno.sql`,
   `supabase-ai-pomoc.sql` i **`supabase-migration-naplata.sql`** (pretplate, kodovi, Paddle,
   početak naplate 1. 11. 2026.). Svaka se smije pokrenuti i više puta.

   **Dok `supabase-migration-naplata.sql` nije pokrenut**, nova stranica računa radi u
   "starom" načinu: nema kodova ni planova, a `komplimentarno` i dalje vrijedi.
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

## 3. Paddle (naplata)

Paddle je prodavač (Merchant of Record): naplaćuje kupcu, obračunava PDV, šalje račune i
rješava povrate. Ti izdaješ jedan račun mjesečno Paddleu (vidi `OBRT-odluke-i-koraci.md`).

**Sandbox (može odmah, bez obrta):** račun na [sandbox-vendors.paddle.com](https://sandbox-vendors.paddle.com).
Kad sve radi, isto se ponovi na [vendors.paddle.com](https://vendors.paddle.com) (traži obrt,
bankovni račun, domenu, Terms/Privacy/Refund policy — pa odobrenje).

1. **Catalog → Products**:
   - "Croland Plus" s tri cijene: **5 € / 1 tjedan**, **10 € / 1 mjesec**, **60 € / 1 godina**,
     *tax inclusive*. Zapiši tri Price ID-a (`pri_...`).
   - "Croland Plus code" (bez cijena — cijenu Custom kupnje računa funkcija). Zapiši Product ID (`pro_...`).
   Cijene moraju odgovarati postavci `cijene` u tablici `postavke` (prikaz na stranici).
2. **Checkout → Checkout settings**: *Default payment link* = adresa stranice
   (`https://kristianprasnjak.github.io/croland/`, kasnije vlastita domena).
3. **Developer tools → Authentication**:
   - **API key** (server, tajni) → `PADDLE_API_KEY` (korak 4).
   - **Client-side token** (javni, `test_...` / `live_...`) → Supabase Table editor →
     `postavke` → red `paddle` → `{"okruzenje": "sandbox", "client_token": "test_..."}`.
     Dok je `client_token` null, tipke za kupnju javljaju da kupnja još nije otvorena.
4. **Developer tools → Notifications → New destination**:
   URL = `https://krunohdgohuebmafepmb.supabase.co/functions/v1/paddle-webhook`, događaji:
   `subscription.created`, `subscription.updated`, `subscription.activated`,
   `subscription.canceled`, `subscription.past_due`, `subscription.paused`,
   `subscription.resumed`, `subscription.trialing`, `transaction.completed`,
   `adjustment.created`, `adjustment.updated`. Zapiši **secret key** te destinacije.
5. **Customer portal** je uključen sam po sebi (otkazivanje, kartica, računi).

## 4. Supabase Edge Functions (backend)

Funkcije u `supabase/functions/`: `paddle-checkout`, `paddle-webhook`, `racun`, `sadrzaj`,
`pomoc`. Trebaju [Supabase CLI](https://supabase.com/docs/guides/cli).

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
npx supabase@latest secrets set PADDLE_OKRUZENJE=sandbox
npx supabase@latest secrets set PADDLE_API_KEY=...
npx supabase@latest secrets set PADDLE_WEBHOOK_SECRET=...
npx supabase@latest secrets set PADDLE_PRICE_TJEDAN=pri_... PADDLE_PRICE_MJESEC=pri_... PADDLE_PRICE_GODINA=pri_...
npx supabase@latest secrets set PADDLE_PRODUCT_KODOVI=pro_...
npx supabase@latest secrets set SITE_URL=https://kristianprasnjak.github.io/croland
npx supabase@latest secrets unset STRIPE_SECRET_KEY STRIPE_PRICE_ID STRIPE_WEBHOOK_SECRET
```

`SUPABASE_URL` i `SUPABASE_SERVICE_ROLE_KEY` se **ne postavljaju** — Supabase ih sam ubrizgava
u svaku Edge Function, a prefiks `SUPABASE_` je rezerviran pa ga `secrets set` odbija.

`SITE_URL`: kad stigne vlastita domena, ovdje se upiše nova adresa i ona se sama doda na popis
dozvoljenih podrijetla (`_shared/lib.ts`).

Deploy:

```bash
npx supabase@latest functions deploy paddle-checkout --use-api
npx supabase@latest functions deploy paddle-webhook --use-api
npx supabase@latest functions deploy racun --use-api
npx supabase@latest functions deploy sadrzaj --use-api
npx supabase@latest functions deploy pomoc --use-api
npx supabase@latest functions delete create-checkout-session
npx supabase@latest functions delete stripe-webhook
```

`--use-api` znači "spakiraj funkciju na Supabaseovoj strani". Bez toga stariji CLI traži
lokalni Docker, koji ovom projektu inače nigdje ne treba.

`supabase/config.toml` postavlja `verify_jwt = false` za `paddle-webhook`. Paddle ne šalje
Supabase JWT; sigurnost te funkcije počiva na provjeri Paddleova potpisa. Ostale traže
valjani korisnički token.

**Bez Paddlea** (prije koraka 3) radi: stranica računa, unos kodova, izvoz i brisanje računa
(bez pretplate). Kupnja javlja "Not available yet" ili, do 1. 11., "Access is free until …".

## 4a. Mailovi (Brevo) i prijava emailom

Supabaseov ugrađeni mail služi samo za testiranje (nekoliko poruka na sat). Prije lansiranja:

1. Račun na [brevo.com](https://www.brevo.com), domena dodana i potvrđena (SPF, DKIM, DMARC).
2. Brevo → **SMTP & API** → SMTP ključ.
3. Supabase → **Authentication → Emails → SMTP Settings** → host `smtp-relay.brevo.com`, port 587,
   korisnik i ključ iz Brevoa, pošiljatelj npr. `hello@<domena>`.
4. Supabase → **Authentication → Emails → Templates**: *Confirm signup*, *Reset password*,
   *Change email address* — prevedi i uredi. Linkovi u njima vode na adrese iz koraka 1.4.

"Forgot your password?" je u prozoru za prijavu; link iz maila vraća na stranicu, koja odmah
otvori prozor za novu lozinku.

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
```

Za lokalni rad privremeno prebaci `FUNKCIJE_URL` u `index.html` na
`http://localhost:54321/functions/v1` (i vrati prije commita). Paddleovi webhookovi lokalno
ne stižu (Paddle ne zna za localhost) — za to se testira na deployanim funkcijama u sandboxu.

**Kodovi bez Paddlea** (SQL Editor):

```sql
-- 5 mjesečnih kodova "kupcu" (uuid iz Authentication → Users)
select public.izdaj_kodove('<uuid-kupca>', 'mjesec', 5, 0, 'EUR', 'test-' || gen_random_uuid());
select kod from public.kodovi order by created_at desc limit 5;
```

Zatim se drugim računom unese kod na stranici računa.

**Sandbox kupnja:** Paddle testna kartica `4242 4242 4242 4242`, bilo koji budući datum i CVC.
Provjeri: plan se pojavi na stranici računa za ~10 s; Custom kupnja stvori kodove u "My codes";
*Change plan* pomakne paket na kraj razdoblja; *Manage subscription* otvori Paddle portal;
povrat u Paddleu poništi neiskorištene kodove. Popis stvari koje treba potvrditi u sandboxu je
na kraju `PLAN-account-i-naplata.md`.

**Komplimentarni pristup:** Table editor → `profiles` → `komplimentarno = true`.

## 7. Go live

1. Paddle live račun odobren (vidi `PLAN-account-i-naplata.md` → kontrolni popis).
2. Isti proizvodi i cijene u live Paddleu → novi Price/Product ID-ovi u secrets.
3. `PADDLE_OKRUZENJE=production`, live `PADDLE_API_KEY`, nova webhook destinacija (ista URL
   adresa) i njezin `PADDLE_WEBHOOK_SECRET`.
4. `postavke.paddle` = `{"okruzenje": "production", "client_token": "live_..."}`.
5. Redeploy funkcija, jedna stvarna kupnja vlastitom karticom, pa povrat.
