# Korak 4 — postavljanje Supabase Edge Functiona, klik po klik

Ovo je jednokratni posao. Kad jednom prođe, ubuduće je samo `deploy` naredba.

Sve naredbe pokrećeš **ti**, u svom terminalu na svom računalu. Ja ih ne mogu pokrenuti umjesto
tebe jer moj pristup tvojoj mapi nema pristup internetu.

---

## Prije početka — što je što

**Supabase CLI** je program koji preko interneta šalje tvoje funkcije Supabaseu. Ne moraš ga
instalirati: naredba `npx` ga svaki put preuzme, pokrene i baci.

**`login`** te predstavi Supabaseu — jednom, pa CLI zapamti tko si.

**`link`** upari ovu mapu s tvojim Supabase projektom. Bez toga CLI ne zna kojem projektu šalje
funkcije. Zapis ide u `supabase/.temp/` i ne ide u git.

**`secrets set`** sprema tajne (Stripe ključeve) na Supabaseov server. Ne ostaju kod tebe na
disku i ne vide se u kodu. Ovo je zamjena za ono što su nekad bile Netlify env varijable.

**`functions deploy`** šalje jednu funkciju u produkciju.

> **Napomena:** `npm install -g supabase` **ne radi.** Supabase je ugasio globalnu npm
> instalaciju i javlja *"Installing Supabase CLI as a global module is not supported"*.
> Zato je svugdje niže `npx` oblik.

---

## 0. Otvori terminal u projektnoj mapi

1. Pritisni tipku **Windows**, upiši `cmd`, pritisni **Enter**. Otvori se crni prozor.
2. Upiši ovo i pritisni **Enter**:

   ```
   cd /d "C:\Users\Korisnik\Claude\Projects\croland app v0.11"
   ```

   Navodnici su nužni jer u putanji ima razmaka.
3. Provjeri da si na pravom mjestu — upiši `dir` i Enter. Na popisu moraš vidjeti `index.html`,
   `package.json` i mapu `supabase`. Ako ne vidiš, `cd` nije prošao.

**Ostani u ovom prozoru do kraja.** Sve naredbe idu ovdje.

---

## 0.5 Napravi mapu koja npm-u nedostaje

Ovo je zaobilaženje poznatog kvara u npm-u na Windowsu. Ako ga preskočiš, svaka `npx` naredba
puca s `ENOENT ... lstat 'C:\Users\...\AppData\Roaming\npm'` i kodom `-4058`.

Uzrok: npm očekuje da postoji mapa za globalne pakete, a Node instalater je nije napravio.
Mapa smije ostati prazna — samo mora postojati.

```
mkdir "%AppData%\npm"
```

Ako javi **`A subdirectory or file ... already exists`**, mapa već postoji i sve je uredu —
idi dalje.

---

## 1. Prijava (`login`)

Upiši i Enter:

```
npx supabase@latest login
```

Što će se dogoditi, redom:

1. Prvi put te `npx` pita nešto tipa *"Need to install the following packages: supabase@… Ok to
   proceed? (y)"* → upiši **`y`** i Enter.
2. Nakratko preuzima. Onda ispiše poruku dobrodošlice i **verifikacijski kod** (npr. `ABCD-EFGH`)
   te *"Press Enter to open browser…"*.
3. Pritisni **Enter**. Otvori se preglednik na Supabase stranici.
4. Ako nisi prijavljen na supabase.com, prijavi se (isti račun na kojem je projekt).
5. Stranica pokaže kod. **Usporedi ga s kodom u crnom prozoru** — mora biti isti.
6. Klikni **Authorize** (ili *Continue*).
7. Vrati se u crni prozor. Mora pisati **`Finished supabase login.`**

Ako se preglednik ne otvori sam, stranica je ispisana kao adresa u terminalu — kopiraj je i
zalijepi u preglednik ručno.

---

## 2. Uparivanje s projektom (`link`)

Upiši i Enter:

```
npx supabase@latest link --project-ref krunohdgohuebmafepmb
```

Onaj niz `krunohdgohuebmafepmb` je oznaka tvog projekta. Vidiš je i sam u adresi Supabase
dashboarda: `supabase.com/dashboard/project/`**`krunohdgohuebmafepmb`**.

Što će se dogoditi:

1. Pita **`Enter your database password (or leave blank to skip):`**
   → **samo pritisni Enter.** Lozinka baze treba za rad s tablicama, ne za funkcije.
2. Možda ispiše koju žutu napomenu da se lokalne postavke razlikuju od onih na serveru.
   To je uredu, ne diraj.
3. Na kraju mora pisati **`Finished supabase link.`**

---

## 3. Pokupi dvije vrijednosti iz Stripea

Trebaš ih za sljedeći korak. Otvori [dashboard.stripe.com](https://dashboard.stripe.com) u
pregledniku.

**Prvo provjeri da si u test načinu** — gore desno mora biti uključen **Test mode** (ili si u
Sandboxu). Ako nisi, ključevi ispod bit će pravi, a ne testni.

### 3a. Tajni ključ → `sk_test_...`

1. U lijevom izborniku: **Developers** → **API keys**
2. U retku **Secret key** klikni **Reveal test key**
3. Klikni ikonu za kopiranje. Dobiješ niz koji počinje s `sk_test_`

### 3b. Oznaka cijene → `price_...`

1. U lijevom izborniku: **Product catalog** (ili *Products*)
2. Klikni na proizvod **Croland Plus**
3. Skrolaj do odjeljka **Pricing**, nađi redak s mjesečnom cijenom
4. Kopiraj **API ID** te cijene — niz koji počinje s `price_`

> Pazi: `prod_...` je oznaka **proizvoda** i nije to što tražimo. Treba `price_...`.

Zalijepi oba negdje u Notepad da ti budu pri ruci.

---

## 4. Spremi tajne (`secrets set`)

Tri naredbe, jedna po jedna. **Zamijeni `...` svojom vrijednošću** iz prethodnog koraka.

```
npx supabase@latest secrets set STRIPE_SECRET_KEY=sk_test_ovdje_tvoj_kljuc
```

```
npx supabase@latest secrets set STRIPE_PRICE_ID=price_ovdje_tvoj_price
```

```
npx supabase@latest secrets set SITE_URL=https://kristianprasnjak.github.io/croland
```

Zadnju kopiraj doslovno — to je adresa na koju te Stripe vraća nakon plaćanja.

Lijepljenje u crni prozor: **desni klik** ili **Ctrl+V**.

Nakon svake mora pisati `Finished supabase secrets set.`

**Provjera:**

```
npx supabase@latest secrets list
```

Mora izlistati `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `SITE_URL`. Vrijednosti se namjerno ne
prikazuju, samo njihovi otisci — to je normalno.

> **Zašto sad nema `STRIPE_WEBHOOK_SECRET`?** Njega dobiješ tek kad u Stripeu upišeš novu
> adresu webhooka, a za to prvo mora postojati funkcija. Zato ide poslije, u koraku 6.

---

## 5. Pošalji funkcije (`deploy`)

Tri naredbe, jedna po jedna:

```
npx supabase@latest functions deploy create-checkout-session --use-api
```

```
npx supabase@latest functions deploy sadrzaj --use-api
```

```
npx supabase@latest functions deploy stripe-webhook --use-api
```

`--use-api` znači *"spakiraj funkciju na Supabaseovoj strani"*. Bez toga stariji CLI traži
Docker instaliran na tvom računalu, a on ti u ovom projektu inače nigdje ne treba.

Svaka mora završiti s nečim poput:

```
Deployed Functions on project krunohdgohuebmafepmb: create-checkout-session
```

Prva traje najduže (preuzima ovisnosti). Druge dvije su brže.

---

## 6. Provjeri u dashboardu

1. Otvori [supabase.com/dashboard](https://supabase.com/dashboard) i uđi u projekt
2. Lijevi izbornik → **Edge Functions**
3. Moraju biti sve tri: `create-checkout-session`, `sadrzaj`, `stripe-webhook`
4. Klikni na **`stripe-webhook`** i nađi postavku **Verify JWT** →
   **mora biti isključeno (off / false)**

Ako je kod `stripe-webhook` JWT provjera uključena, Stripeovi pozivi bit će odbijeni prije nego
što funkcija uopće provjeri potpis, i pretplate se neće upisivati. To znači da `supabase/config.toml`
nije pokupljen — javi mi pa ćemo riješiti.

Druge dvije funkcije **smiju i moraju** imati JWT provjeru uključenu — njih zove preglednik s
korisnikovim tokenom.

---

## Ako zapne

| Poruka | Što znači |
|---|---|
| `Access token not provided` | `login` nije prošao. Ponovi korak 1. |
| `Cannot find project ref` | `link` nije prošao ili nisi u projektnoj mapi. Ponovi `cd` iz koraka 0, pa korak 2. |
| Nešto o `Docker` | Zaboravio si `--use-api` na kraju deploy naredbe. |
| `Installing Supabase CLI as a global module is not supported` | Pokrenuo si `npm install -g supabase`. Ne treba — koristi `npx` oblik. |
| `'npx' is not recognized` | Node.js nije instaliran ili nije u PATH-u. Instaliraj Node 20+ s nodejs.org i otvori novi `cmd`. |
| `ENOENT … lstat 'C:\Users\…\AppData\Roaming\npm'`, `errno -4058` | Poznati kvar u npm-u na Windowsu. Preskočio si korak 0.5 — pokreni `mkdir "%AppData%\npm"`. |

Kad zapne, kopiraj cijeli ispis iz crnog prozora i pošalji mi ga.

---

## Što slijedi nakon ovoga

Korak 5 — Supabase **Authentication → URL Configuration** (ono zbog čega te Google prijava
bacala na staru adresu), pa korak 6 — nova adresa Stripe webhooka i `STRIPE_WEBHOOK_SECRET`.
