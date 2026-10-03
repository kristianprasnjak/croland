# Plan: ekran za učitavanje (loading screen)

Status: **ekran je implementiran** (odjeljci 3, 4 i 6). Ubrzanje (odjeljak 5) je sljedeći, zaseban korak.

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

## 5. Ubrzanje samog čekanja (neovisno o izgledu, ali isplati se)

Ekran skriva čekanje; ovo ga stvarno skraćuje. Može ići u isti ili u zaseban korak.

1. **`defer` na četiri skripte** + glavna skripta u `DOMContentLoaded`. Preglednik tada
   preuzima `data.js`, `rjecnik.js` i `supabase.js` **paralelno** dok crta ekran.
   Treba provjeriti da ništa u tijelu ne zove funkcije prije toga (`onclick` atributi su u
   redu jer se izvršavaju tek na klik).
2. **`<link rel="preload">`** za `data.js` i `rjecnik.js` u `<head>`, da preuzimanje krene
   prije nego se parsira 3000 redaka CSS-a.
3. **`ucitajPostavke` i `ucitajEntitlement` paralelno** umjesto u nizu, ako ne ovise
   jedno o drugome (provjeriti). Ušteda jedan krug do Supabasea (~100–300 ms).
4. **`rjecnik.js` nakon prvog rendera**: rječnik treba tek u vježbama i na stranici
   Dictionary. Učitati ga u pozadini nakon prvog rendera (uz kratki "učitavam" ako netko
   baš tad otvori rječnik). Najveća pojedinačna ušteda nakon `data.js`.
5. **Supabase s vlastite domene**: kopirati `supabase.js` u `dist/` (verzija zaključana)
   umjesto jsDelivr. Jedan DNS/TLS manje i nema ovisnosti o tuđem CDN-u.
6. Kasnije: service worker koji cachira `data.js` i `rjecnik.js` (verzija u imenu ili
   hash). Drugo otvaranje postaje skoro trenutno. To je veći posao, ne za prvu verziju.

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
- Blokirati `cdn.jsdelivr.net`: aplikacija radi bez prijave i ekran se gasi.
- Svih 5 tema, svijetlo, mobitel (360 px) i desktop, `prefers-reduced-motion`.
- Prijava preko Googlea (povratak s preusmjeravanja), registracija (proslava), link
  "Forgot password", dolazak s promjenom jezika.
- `index-de.html`: isto, s njemačkim prijevodom fraze.

## 8. Odluke

Odlučeno: neutralni ekran (logo + traka), prekriva zaglavlje, ubrzanje ide zasebno.

Otvoreno za kasnije: dodati Blobbyja i frazu dana kad bude vremena za grafiku.
