# Croland — pregled backenda prije lansiranja

Datum: 14.8.2026. Pregledano bez ijedne izmjene koda i bez deploya.

Pregledano: `supabase-schema.sql`, `supabase-migration-komplimentarno.sql`,
`netlify/functions/_lib.js`, `netlify/functions/create-checkout-session.js`,
`netlify/functions/stripe-webhook.js`, `scripts/build.js`, `.gitignore`,
auth/entitlement/progress dio `index.html`.

---

## Što je dobro (ne treba dirati)

- **RLS je ispravno postavljen.** Sve tri tablice imaju `enable row level security`.
  `profiles` ima samo `select` politiku za `authenticated` — korisnik **ne može** sam sebi
  upisati `komplimentarno = true`. To je najvažnija stvar i napravljena je kako treba.
- `stripe_events` ima RLS uključen i nula politika → klijent mu ne može pristupiti.
- **Webhook provjerava Stripe potpis** nad sirovim tijelom, s ispravnim base64 rukovanjem.
- **Idempotencija**: `stripe_events` red se upisuje *prije* obrade, unique violation (23505)
  se tretira kao duplikat. Ispravan uzorak.
- **Cijena nikad ne dolazi s klijenta** — `STRIPE_PRICE_ID` je iz env varijable.
- `create-checkout-session` traži Bearer token i verificira ga preko `auth.getUser`.
- `SUPABASE_ANON_KEY` u `index.html` je `sb_publishable_...` — javni ključ, tu i pripada.
- `scripts/build.js` radi po allowlisti, pa `.env`, `.sql`, `.md` i radni fajlovi
  fizički ne mogu završiti na živoj stranici.
- `.gitignore` pokriva `.env` i `.env.*`.

---

## Visoki prioritet

### 1. Sadržaj iza paywalla nije zapravo zaštićen

`imaPristup()` u `index.html` je isključivo provjera u pregledniku. `data.js` (3,5 MB) i
`rjecnik.js` (672 KB) se serviraju iz `dist/` svakome tko zna adresu — bez računa, bez
pretplate. Tko otvori `tvoja-domena/data.js` ima **cijeli plaćeni sadržaj**.

Za lansiranje je najvažnije da si toga svjestan i da svjesno odlučiš. Opcije:

- **Prihvatiti.** Ako je vrijednost proizvoda u vježbama, praćenju napretka i doživljaju, a ne
  u samim riječima, ovo je podnošljivo. Većina jezičnih aplikacija tako radi.
- **Podijeliti podatke.** Besplatne razine u jedan fajl, plaćene u drugi, plaćeni se dohvaća
  kroz Netlify Function koja provjerava pretplatu. Veći zahvat.

Ne preporučam veći zahvat tjedan-dva prije marketinga. Preporučam svjesnu odluku i, ako treba,
podjelu podataka nakon lansiranja.

### 2. Webhook može tiho pojesti uplatu

`stripe-webhook.js` prvo upiše `stripe_events` red, pa obrađuje. Ako obrada pukne (npr.
`stripe.subscriptions.retrieve` istekne), `catch` samo loga i vraća 200. Stripe pokuša ponovo,
ali sada je događaj već zabilježen → tretira se kao duplikat i preskače.

Ishod: **korisnik je platio, a pristup nikad nije dobio**, i to bez ikakvog traga osim jedne
linije u logovima. Prije nego krene pravi novac ovo treba popraviti.

Popravak (malen): u `catch` obrisati upravo upisani red iz `stripe_events` i vratiti 500, da
Stripe ponovo pokuša. Uz to uključiti Stripeove e-mail obavijesti o neuspjelim webhookovima.

### 3. Napredak se sprema s `update`, ne `upsert`

`posaljiProgress()` radi `.from('progress').update(...).eq('user_id', ...)`. Ako `progress`
red za korisnika ne postoji — jer je korisnik nastao prije nego je trigger postavljen, ili je
trigger jednom pukao — `update` pogodi nula redaka, **ne vrati grešku**, i napredak se tiho
gubi zauvijek. Retry mehanizam tu ne pomaže jer nema greške na koju bi reagirao.

Popravak: `upsert` s `user_id` kao ključem sukoba. Nekoliko linija.

---

## Srednji prioritet

### 4. `STRIPE_PORTAL_URL` je još test-mode link

`index.html`, linija ~1145: `https://billing.stripe.com/p/login/test_dRm14...`. Sadrži `test_`.
Kad prebaciš Stripe u live, ovaj link treba zamijeniti live verzijom, inače "Manage
subscription" vodi pravog pretplatnika u prazno.

### 5. Moguća dvostruka pretplata

`create-checkout-session` ne provjerava ima li korisnik već aktivnu pretplatu. Dva klika,
dva taba ili povratak na stranicu → dvije pretplate, dva mjesečna terećenja, ljut korisnik i
povrat novca. Popravak: ako je `subscription_status` već `active` ili `trialing`, vratiti
portal link umjesto nove Checkout sesije.

### 6. Postavi `SITE_URL` u Netlify env varijable

`siteUrlFrom()` pada natrag na `Origin` header zahtjeva ako `SITE_URL` nije postavljen.
Header dolazi izvana. Postavi `SITE_URL` na pravu domenu u produkciji da `success_url` i
`cancel_url` budu deterministički.

### 7. Neuspjela naplata odmah zaključava pristup

`invoice.payment_failed` postavi status na `past_due`, a `imaPretplatu()` propušta samo
`active` i `trialing` → pristup pada istog trena. Kartica koja je istekla nije isto što i
otkazana pretplata. Razmisli o tome da `past_due` propuštaš još par dana. Poslovna odluka,
ne bug.

---

## Niski prioritet

- **`select('*')` na `profiles`** povlači `stripe_customer_id` i `stripe_subscription_id` u
  preglednik. Vlastiti red, pa nije curenje, ali nema razloga da ih klijent uopće vidi —
  dovoljno je `subscription_status, current_period_end, komplimentarno`.
- **Više otvorenih tabova / uređaja**: napredak se šalje kao cijelo stanje, zadnji upis
  pobjeđuje. Drugi tab može tiho pregaziti prvi. Za lansiranje vjerojatno podnošljivo.
- `updated_at` se postavlja iz koda, ne triggerom — radi, samo je lomljivije.

---

## Efikasnost

Svaki posjetitelj, uključujući onoga koji samo baci pogled i ode, povuče:

| fajl | veličina |
|---|---|
| `data.js` | 3,5 MB |
| `rjecnik.js` | 672 KB |
| `index.html` | 307 KB |
| **ukupno** | **~4,5 MB** |

Sve se učitava odmah, prije prijave, prije nego se zna hoće li čovjek uopće ostati.

Dvije posljedice za marketinšku kampanju:

1. **Prvi dojam na mobitelu.** 4,5 MB preko mobilnog interneta je nekoliko sekundi bijelog
   ekrana. Kod dolaska s oglasa to je najskuplji trenutak koji imaš.
2. **Netlify bandwidth.** Besplatni plan daje 100 GB mjesečno — to je oko 22.000 posjeta
   prije nego naplata krene. Kampanja to može potrošiti.

Najisplativiji potez, bez ikakve prepravke arhitekture: `rjecnik.js` učitavati tek kad
korisnik prvi put otvori rječnik, a ne u `<head>`. To je odmah -672 KB po posjetu. Dijeljenje
`data.js` po razinama je sljedeći korak, ali je veći zahvat i može čekati.

---

## Preporuka

Nemoj raditi "reformu backenda". Temelji su dobri — RLS, potpis webhooka, idempotencija i
razdvajanje ključeva su napravljeni ispravno, a to je ono što se teško popravlja poslije.

Napravi tri stvari iz visokog prioriteta (br. 2 i 3 su po nekoliko linija koda, br. 1 je
odluka a ne kod), plus br. 4, 5 i 6 iz srednjeg. Sve skupa je nekoliko sati rada, sve stane u
jedan build, i nakon toga možeš mirno pustiti ljude unutra.
