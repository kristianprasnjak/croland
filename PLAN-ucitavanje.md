# Plan: ekran za učitavanje (loading screen)

Status: **prijedlog, ništa nije implementirano.**

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

## 3. Prijedlog dizajna

Puni zaslon u boji `--bg` aktivne teme, na sredini:

```
            ┌───────────┐
            │   Blobby  │   ← slike/Blobby1.webp (5 KB), lagano "diše" (scale 1 → 1.04)
            └───────────┘
              Croland        ← Space Grotesk 600, boja --ink
      ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁   ← tanka traka napretka u --plava (boja teme)
     "Dobar dan!" · Good day ← jedna nasumična hrvatska fraza s prijevodom (mijenja se)
```

Detalji:
- **Blobby** kao maskota: korisnici ga već poznaju iz lekcija, pa je to toplije od spinnera.
  Slika se učita odmah jer `<img>` stoji u HTML-u prije skripti.
- **Traka napretka** s pravim fazama (ne lažnim postotkom):
  | faza | otprilike | okidač |
  |---|---|---|
  | HTML i CSS nacrtani | 10 % | inline skripta odmah nakon ekrana |
  | `data.js` stigao | 50 % | `<script>` s jednom linijom odmah nakon `data.js` |
  | `rjecnik.js` + `supabase.js` | 70 % | isto, nakon njih |
  | sesija gotova (`SESSION_SPREMNA`) | 85 % | u `poslijeAuthPromjene` |
  | prvi render | 100 % → nestaje | na kraju `nastavi()` |

  Između faza traka polako puzi (CSS `transition` od nekoliko sekundi), da nikad ne stoji.
- **Hrvatska fraza dana**: 8–10 kratkih fraza upisanih ravno u inline skriptu ("Dobar dan!",
  "Hvala lijepa", "Polako, polako"…). Ne smije čitati `data.js`, jer on još nije stigao.
  Za `index-de.html` prijevod na njemački. Tako 2 s čekanja postanu mini-lekcija.
- **Odgoda pojavljivanja ~300 ms**: ako se aplikacija otvori iz cachea za 200 ms, ekran se
  uopće ne vidi (inače bi kratko bljesnuo). Rješava se CSS animacijom `opacity` s
  `animation-delay`, bez JS-a.
- **Izlaz**: `opacity` 1 → 0 kroz ~250 ms, zatim `remove()` iz DOM-a.
- `prefers-reduced-motion`: bez disanja i bez fadea, traka skače bez animacije.
- Pristupačnost: `role="status"`, `aria-live="polite"`, tekst "Loading Croland…";
  ekran ima `aria-busy` dok traje, a `#view` dobije fokus kad nestane.

### Tema bez skoka

- Pri svakom `postaviTemu(id)` dodatno spremiti `localStorage['croland.tema'] = id`
  (i isto za font ako treba).
- Mala inline skripta na samom vrhu `<body>` pročita taj ključ i odmah postavi
  `document.body.dataset.tema`, prije nego se išta nacrta. Tada su i ekran za učitavanje
  i zaglavlje od prve sekunde u korisnikovoj boji, a kasniji `postaviTemu()` ne mijenja ništa.
- Prvi posjet (nema ključa): zadana tema; ako `croland-pocetni-izgled` već postoji,
  uzeti temu iz njega.

### Zaglavlje

Preporuka: ekran za učitavanje **prekriva i zaglavlje** (`position: fixed; inset: 0;
z-index` iznad svega). Zaglavlje bez sadržaja i valuta (`#valuteHeader` je prazan dok
progres ne stigne) izgleda nedovršeno, a klik na navigaciju prije gotovog JS-a ionako ne radi.

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

## 6. Koraci implementacije

1. **Markup i CSS ekrana** odmah nakon `<body>` u `index.html` i `index-de.html`:
   `<div id="ucitavanje">` s Blobbyjem, naslovom, trakom i frazom. CSS inline u
   postojećem `<style>`, samo na tokenima (`--bg`, `--ink`, `--plava`, `--muted`), tako da
   sve teme rade same.
2. **Inline skripta** odmah iza: tema iz `localStorage`, nasumična fraza, `window.CROLAND_UCITAVANJE`
   s metodama `faza(postotak)`, `gotovo()` i `greska(poruka)`, timeout 12 s i `error` slušač.
3. **Oznake faza**: jednolinijske `<script>CROLAND_UCITAVANJE.faza(50)</script>` između
   postojećih `<script src>` (ili, uz `defer`, `onload` na svakoj skripti).
4. **Gašenje**: `CROLAND_UCITAVANJE.gotovo()` u `poslijeAuthPromjene` → `nastavi()` (i
   prije `proslaviRegistraciju`), te u grani "No data".
5. **Spremanje teme** u `postaviTemu()` (i `postaviFont()` ako ima smisla).
6. Ukloniti ili zadržati `renderUcitavanje()`: ostaje za navigaciju unutar aplikacije, ali
   može dobiti isti mali Blobby da izgleda dosljedno.
7. **Ubrzanja iz odjeljka 5**, točke 1–3 (jednostavne); 4–6 kasnije, zasebno.
8. `scripts/build.js`: ništa novo ako ostaje Blobby iz `slike/` (već se kopira). Ako se
   Supabase preseli lokalno, dodati ga u `FILES`.

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

## 8. Otvorena pitanja

1. Blobby + fraza (prijedlog) ili samo logo "C" i traka (minimalističnije)?
2. Prekriti zaglavlje (prijedlog) ili ga ostaviti vidljivim iznad ekrana?
3. Ide li ubrzanje (odjeljak 5) u istu promjenu ili zasebno nakon ekrana?
4. Fraze na ekranu: fiksni popis u kodu ili kasnije iz `data.js` (tek kad su skripte
   `defer` i rječnik stiže kasnije, to nema smisla za prvo otvaranje)?
