# Plan: ekran za učitavanje (loading screen)

Status: **ekran je implementiran** (odjeljci 3, 4 i 6), **ubrzanje djelomično** (odjeljak 5).

## 1. Što se danas događa u te 2–3 sekunde

Redoslijed u `index.html` (isto vrijedi za `index-de.html`):

1. **Glava stranice**: preusmjeravanje na pravi jezik, Google Fonts (Space Grotesk, Public Sans)
   i ~3300 redaka CSS-a. Brzo.
2. **Tijelo**: `<header>` s logom i navigacijom, sprite ikona, **prazan `<div id="view">`**.
   Preglednik to već nacrta: korisnik vidi zaglavlje i bijelu/praznu stranicu.
3. **Sinkrone skripte na dnu** (`index.html:3380`) blokiraju sve dalje:
   - `data.js`: ~3,2 MB u repozitoriju (u `dist/` samo javni dio, ali i dalje najveći komad)
   - `rjecnik.js`: ~1 MB
   - `pregledi.js`: ~30 KB
   - `supabase.js` s jsDelivr CDN-a (vanjski poslužitelj)
4. **Glavna skripta** (~10 000 redaka) se parsira i pokreće `initAuth()`.
5. **Mreža, u nizu**: `onAuthStateChange` → `ucitajPostavke` → `ucitajEntitlement` →
   `ucitajProgress`. Tri uzastopna poziva Supabaseu.
6. Tek onda: `postaviTemu()`, `postaviFont()` i prvi render (`renderMain()` ili lekcija 0).

Posljedice:
- 2–3 s korisnik gleda **zaglavlje bez sadržaja**, što izgleda kao da je stranica pukla.
- Kad sve stigne, **tema skoči** sa zadane (zagreb/crvena) na korisnikovu (npr. jadran),
  jer se tema zna tek nakon `ucitajProgress`.
- Postoji `renderUcitavanje()` ("Checking your session…"), ali on se pokazuje samo kod
  navigacije prije gotove sesije, ne kod prvog otvaranja.

## 2. Cilj

- Od **prvog crtanja** (prije `data.js`) vidi se smiren, brendiran ekran, ne prazna stranica.
- Ekran nestaje **točno** kad je prvi pravi pogled nacrtan, bez treptanja i skoka teme.
- Bez dodatnih zahtjeva prema mreži i bez knjižnica: čisti inline HTML i CSS.
- Ako se nešto zaglavi, korisnik nije zarobljen: dobije poruku i gumb za ponovni pokušaj.

## 3. Dizajn (odabrano: neutralno)

Zasad ništa grafički složeno. Na pozadini `--bg` aktivne teme stoji samo:

```
                 ┌───┐
                 │ C │      ← isti kvadratić s logom kao u zaglavlju, 3rem
                 └───┘
            ──────────────   ← traka 2 px, 7.5rem, u --plava na --rub
```

- Nema teksta ni slike. Čitačima ekrana se najavi "Loading Croland…" (`role="status"`).
- **Pozadina je neprozirna od prvog crtanja** i prekriva zaglavlje (`z-index: 2000`).
  Logo i traka pojave se tek nakon **300 ms**, pa kod brzog otvaranja nema bljeska,
  nego samo boja pozadine.
- **Traka prati stvarne faze**: 10 % ekran nacrtan, 45 % `data.js`, 65 % `rjecnik.js`,
  70 % `pregledi.js`, 80 % `supabase.js`, 90 % sesija gotova, 100 % prvi pogled.
- **Izlaz**: `opacity` 1 → 0 kroz 250 ms, zatim `remove()` iz DOM-a.
- `prefers-reduced-motion`: bez prijelaza i bez fadea.
- Blobby, fraza dana i "disanje" su odgođeni. Mogu se kasnije dodati u isti element
  bez mijenjanja logike.

### Tema bez skoka

- `postaviTemu(id)` sprema `localStorage['croland.tema']`.
- Inline skripta ekrana na vrhu `<body>` čita taj ključ (ili temu iz
  `croland-pocetni-izgled` ako ključa još nema) i odmah postavlja `data-tema`.
- Prvi posjet ikad: zadane boje iz `:root`, jer se sjeme teme stvara tek u glavnoj skripti.
- Na novom uređaju, nakon prijave, tema se može promijeniti jednom, kad stigne progres.

## 4. Sigurnosne mreže

- **Predugo**: ako nakon ~12 s nema prvog rendera, ispod trake se pojavi
  "This is taking longer than usual." + gumb **Reload**. Supabase ili CDN znaju zapeti
  (npr. u ugrađenom pregledniku Messengera).
- **Greška u skripti**: `window.addEventListener('error', …)` registriran u inline skripti
  ekrana; ako padne prije prvog rendera, ekran prikaže poruku i Reload umjesto vječne trake.
- **Bez Supabasea** (`supa === null`): `initAuth` ide ravno na `poslijeAuthPromjene(null)`,
  pa se ekran gasi na istom mjestu; ne treba posebna grana.
- **Proslava registracije** (`proslaviRegistraciju`): ekran mora nestati prije nje, tj.
  sakrij ga čim je odluka donesena, ne tek nakon `nastavi()`.
- **Preusmjeravanje na drugi jezik** (skripta u `<head>`): ne dira ekran, jer se stranica
  ionako zamijeni.

## 5. Ubrzanje samog čekanja

### Napravljeno

1. **Tri dohvata iz Supabasea paralelno** (`ucitajPostavke`, `ucitajEntitlement`,
   `ucitajProgress` u `poslijeAuthPromjene`). Međusobno ne ovise, a prije su išli zaredom.
   Prijavljeni korisnik štedi dva kruga do Supabasea (procjena ~0,2–0,6 s). Gost radi
   samo jedan stvarni poziv, pa za njega nema razlike.
2. **`supabase-js` s vlastite domene**: `vendor/supabase-2.117.2.js` (MIT, licenca uz njega),
   umjesto `cdn.jsdelivr.net/...@2`. Jedna veza (DNS + TLS) manje, verzija zaključana i
   nema ovisnosti o tuđem CDN-u. `scripts/build.js` kopira `vendor/` u `dist/`.
   Nadogradnja: `npm pack @supabase/supabase-js@<verzija>`, kopirati `dist/umd/supabase.js`
   u `vendor/` pod novim imenom i promijeniti `<script src>` u obje stranice.
3. **`preconnect` prema Supabaseu** u `<head>`: TLS rukovanje se obavi dok stižu skripte.

### Isprobano i odbačeno

- **`preload` za `data.js` / `rjecnik.js`**: izmjereno bez ikakvog dobitka (1,23 s prije i
  poslije). Usko grlo su bajtovi, ne trenutak kad preuzimanje krene. Usto bi njemačkim
  korisnicima koji uđu preko `index.html` uzalud vukao engleske podatke prije preusmjeravanja.
- **`defer`**: iz istog razloga ne bi donio ništa, a traži premještanje glavne skripte u
  `DOMContentLoaded`.

### Mjerenje (Chromium, 6 Mbit/s, 150 ms latencija, gzip kao na GitHub Pagesu, gost)

| | komprimirano | stiglo do |
|---|---|---|
| `index.html` (inline CSS + glavna skripta) | 205 KB | 0,75 s |
| `rjecnik.js` | 202 KB | 0,92 s |
| `data.js` (javni dio) | 78 KB | 0,73 s |
| `supabase-2.117.2.js` | 54 KB | 0,64 s |
| `pregledi.js` | 9 KB | 0,47 s |

Prvi pogled: **1,25 s** (procesor kao računalo), **1,73 s** (procesor 4× sporiji, kao
slabiji mobitel). Oko 0,9 s je preuzimanje, ostatak izvršavanje JS-a i jedan poziv
Supabaseu. Na stvarnoj mobilnoj mreži i s prijavom to naraste na 2–3 s.

### Sljedeći veliki dobitak (nije napravljeno)

- **`rjecnik.js` nakon prvog pogleda**: to je 37 % svih bajtova. Treba ga u vježbama
  (indeks `LEME`/`OBLICI` gradi se pri pokretanju) i na stranici Dictionary. Naslovnici
  ne treba. Posao: učitati ga u pozadini nakon prvog rendera, indeks graditi kad stigne, a
  vježbe i Dictionary pričekati ga ako netko uđe prije. Procjena ~0,3 s na 6 Mbit/s i
  manje JS-a za izvršiti. Za novog korisnika nema dobitka, jer je njegov prvi pogled
  Lekcija 0, koja rječnik treba.
- **Service worker** koji drži `data.js`, `rjecnik.js` i `vendor/` u cacheu: drugo
  otvaranje bez ijednog zahtjeva. Veći posao, s rizikom zastarjelih podataka nakon objave.

## 6. Implementacija (napravljeno)

Isto u `index.html` i `index-de.html` (njemački tekst za poruku i gumb):

1. **CSS** `#ucitavanje` na kraju glavnog `<style>`, samo na tokenima teme.
2. **Markup i inline skripta** odmah nakon `<body>`. Skripta postavlja temu i izlaže
   `window.CROLAND_UCITAVANJE` s metodama `faza(p)` i `gotovo()`. Pokreće i timeout od
   12 s; nakon JS greške timeout se skraćuje na 4 s.
3. **Oznake faza**: `<script>CROLAND_UCITAVANJE.faza(n)</script>` iza svake velike skripte.
4. `poslijeAuthPromjene`: `faza(90)` kad je sesija gotova, a `gotovo()` odmah nakon
   `nastavi()` / `proslaviRegistraciju()`. Crtanje je sinkrono, pa je pogled tada već
   nacrtan. `gotovo()` se smije zvati više puta, a svaka iduća promjena prijave ga zove
   bez učinka.
5. `postaviTemu()` sprema temu u `localStorage`.
6. `renderUcitavanje()` ("Checking your session…") ostaje za navigaciju unutar aplikacije.
7. `scripts/build.js`: bez promjena, jer je sve inline.

Provjereno u Chromiumu (Playwright, usporena mreža, 390 px): ekran se odmah vidi u
spremljenoj temi, traka napreduje, ekran nestaje s prvim pogledom (Lesson 0), bez JS
grešaka, za obje stranice. Kad `data.js` nikad ne stigne, nakon 12 s pojavi se
"This is taking longer than usual." i gumb Reload.

## 7. Provjera

- Chrome DevTools → Network → **Slow 4G** + "Disable cache": ekran se vidi, traka napreduje
  kroz faze, ekran nestane točno s prvim renderom, nema skoka teme.
- Brza veza / cache: ekran se **ne** vidi (odgoda 300 ms).
- Blokirati `krunohdgohuebmafepmb.supabase.co` u DevToolsima: nakon 12 s poruka + Reload.
- Blokirati `vendor/supabase-2.117.2.js`: aplikacija radi bez prijave i ekran se gasi.
- Svih 5 tema, svijetlo, mobitel (360 px) i desktop, `prefers-reduced-motion`.
- Prijava preko Googlea (povratak s preusmjeravanja), registracija (proslava), link
  "Forgot password", dolazak s promjenom jezika.
- `index-de.html`: isto, s njemačkim prijevodom fraze.

## 8. Odluke

Odlučeno: neutralni ekran (logo + traka), prekriva zaglavlje, ubrzanje ide zasebno.

Otvoreno za kasnije: dodati Blobbyja i frazu dana kad bude vremena za grafiku.
