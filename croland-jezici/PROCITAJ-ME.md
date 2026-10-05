# croland-jezici — zajednički alati za jezike uputa (DE, ES, …)

Nastalo 05.10.2026. (ES-plan, faza 0). Jedan skup alata za sve jezike uputa; jezik se bira
parametrom `--jezik`. Podaci svakog jezika ostaju u njegovoj mapi (`croland-de/`, `croland-es/`),
uvijek iste strukture. Hrvatski izvor (`igre/*.md`, `index.html`, `pregledi.js`) se ne dira.

```
croland-jezici/
  jezici.json          popis jezika: kod -> mapa, ime, aktivan (aktivan = gradi ga objavi.bat)
  alati/               sve skripte (vidi tablicu), jezici_lib.py, _alati/ (acorn, engleske-rijeci.txt)
  test/                regresijski test u pregledniku (Playwright) + zapis faze 0
croland-XX/
  prijevod-XX.tsv      memorija lekcija    en | XX | puta | prvi_id | jezik
  sucelje-XX.tsv       tekst sučelja       en | XX | izvor | redak
  pregledi-XX.tsv      pregledi.js         en | hr | XX | gdje
  iznimke.tsv          ručne iznimke prepoznavanja jezika (id <TAB> hr|en)
  segmenti.tsv         generira izvuci.py
  igre/                generirane lekcije na jeziku XX (commitaju se)
  rjecnik/             XX-*.tsv -> prijevodi-XX.jsonl, rjecnik-XX-hr.jsonl
```

U memorijama: prazno = još nije prevedeno (ostaje engleski), `=` = ostavi kako jest (hrvatski,
ime, kod), `@blobby` = generira se iz memorije lekcija.

## Alati (iz korijena projekta: `python croland-jezici/alati/<skripta> --jezik XX`)

| skripta | što radi |
|---|---|
| `izvuci.py` | `igre/*.md` → `segmenti.tsv` + novi retci u `prijevod-XX.tsv` (stari prijevodi ostaju). Nakon svake izmjene hrvatskih lekcija. |
| `primijeni.py [datoteke…]` | gradi `croland-XX/igre/*.md` iz izvora + memorije; neprevedeno → `nedostaje.tsv` |
| `provjeri.py` | struktura: stranice, stavke, polja, `[praznine]`, `en:` prefiks, kategorije. Mora biti 0 grešaka. |
| `posao.py dump F… / upis F / stanje` | prevođenje po datotekama (vidi `UPUTE-prijevod-de.md`; `_radno/` je u mapi jezika) |
| `izvuci-sucelje.py` | tekst iz `index.html` i `pregledi.js` → `sucelje-XX.tsv`, `pregledi-XX.tsv` |
| `izgradi-sucelje.py` | `index.html` → `index-XX.html`, `pregledi.js` → `pregledi-XX.js` |
| `spoji-rjecnik.py` | `rjecnik/XX-*.tsv` → `prijevodi-XX.jsonl` + obrnuti `rjecnik-XX-hr.jsonl` |
| `osvjezi-jezik.js` (node) | `croland-XX/igre` + rječnik → `data-XX.js`, `rjecnik-XX.js` (učita `osvjezi.js` i preusmjeri ulaz/izlaz); upiše i ključ napretka (`kljuc`). `--samo-kljucevi` = samo ključ u postojeći `data-XX.js` |
| `izgradi-jezike.py` | build svih jezika s `"aktivan": true` (osvjezi-jezik + izgradi-sucelje). Ovo zove `objavi.bat`, korak 1b. Bez `--jezik` = svi aktivni. |
| `novi-jezik.py` | kostur mape novog jezika (iznimke kopirane, prazne memorije). Sigurno ga je ponoviti. |

Stare naredbe u `croland-de/` (`posao.py`, `primijeni.py`, `izgradi-sucelje-de.py`, `osvjezi-de.js`…)
su sada tanki omotači koji zovu ove alate s `--jezik de`, pa stare upute i dalje rade.
`croland-de/_alati/` i `croland-de/__pycache__/` više ne trebaju (mogu se obrisati).

## Kako je jezik ugrađen u index.html (i18n kuke)

Build više ne krpa kod. Sve što ovisi o jeziku je u samom `index.html`, a za engleski daje točno isto:

- **Jezik stranice** je samo u `<head>`: `var JEZIK_STRANICE = 'en'` uz popis `JEZICI` (izbor jezika,
  preusmjeravanje, Options). `JEZIK_APP` ga čita odande. Build mijenja jedino taj redak, `<html lang>`
  i `<script src>` za `data/rjecnik/pregledi-XX.js`. Plaćeni sadržaj je `data-plus-XX.json` prema `JEZIK_APP`.
- **Rečenica s brojem ili imenom = jedan `T_('…%1…', vrijednost)`**, nikad dijelovi spojeni s `+`.
  Prijevod smije presložiti red riječi; `%1`, `%2` moraju ostati (build inače stane).
  Isto za HTML atribute: `title="' + esc(T_('Open %1', ime)) + '"`.
- **Množina**: oba oblika kao cijele rečenice: `n === 1 ? T_('%1 word learned', n) : T_('%1 words learned', n)`.
  (Nikad `' word' + (n === 1 ? '' : 's')`.) Za jezik s više oblika (npr. hrvatski) dodaje se treća grana.
- **Imena tipova i cjelina**: interni ključevi (`Lesson 3`, `Daily challenge 12`) ostaju engleski jer
  se po njima sprema napredak. Na zaslon idu kroz `tipIme(tip)` i `cjelinaIme(cjelina)`. Ključ cjeline
  se slaže s `kljucCjeline(tip, r)` ili `tip + ' ' + r`, nikad iz prevodivog literala (`'Lesson ' + r`).
- **Riječi koje su i ključ i tekst** (`Daily challenge`, `Lesson`, `Test`, `Enter`, `Home`… popis `KOD`
  u `izgradi-sucelje.py`) build prevodi **samo unutar `T_( )`**. Gdje su prikazani tekst, piši
  `T_('Daily challenge')` ili `tipIme(tip)`.
- **Kratki natpisi navigacije** su `data-kratko="…"` i prevode se kao atribut (redak u `sucelje-XX.tsv`).
- **Ključ napretka vježbe** je uvijek engleski naslov: `osvjezi-jezik.js` ga upiše u `data-XX.js` kao `kljuc`,
  `kljucIgre()` ga koristi (engleski `data.js` ga nema, pa je ondje ključ naslov kao i prije). Zato korisnik
  zadržava bodove kad promijeni jezik. Ako se lekcije jezika ne poklapaju s engleskim izvorom (red, stranica,
  format), build stane — tada prvo `primijeni.py --jezik XX`.
- **Valute**: interni ključevi su `LP/VP/GP/PP`; na zaslon idu kroz `valutaKratica(k)` (redovi `LP`, `VP`, `GP`, `PP`
  u `sucelje-XX.tsv`, npr. DE `VP` → `WP`). Nikad ne pisati kraticu izravno u tekst; u rečenici je `%n`.
- **Sortiranje po prijevodu**: `localeCompare(x, JEZIK_APP)` (španjolski: n < ñ < o). Gumb prijevoda u
  vježbi pokazuje `JEZIK_APP.toUpperCase()` (EN/DE/ES).

Novi tekst u `index.html` → `izvuci-sucelje.py --jezik XX` za svaki jezik (doda prazne retke) → prevedi
→ `izgradi-jezike.py`. Redak koji postoji samo kao `T_` (izvor `js-t`) prevodi se samo unutar `T_( )`.

## Novi jezik (npr. ES)

1. upiši ga u `jezici.json` (`"aktivan": false` dok nije spreman) — ES je već upisan;
2. `python croland-jezici/alati/novi-jezik.py --jezik es`;
3. prevedi `sucelje-es.tsv`, `pregledi-es.tsv`, `rjecnik/es-*.tsv`, memoriju lekcija (`posao.py --jezik es`);
4. `spoji-rjecnik.py`, `primijeni.py`, `provjeri.py`, pa `izgradi-jezike.py --jezik es`;
5. u `<head>` od `index.html` dodaj jezik u `JEZICI` (tek kad je spreman za korisnike), `"aktivan": true`,
   te infrastrukturu iz ES-plana §4 (`scripts/build.js`, `uploadaj-sadrzaj.js`, Edge Function `sadrzaj`).

## Regresijski test (`test/`)

`test/snimi.js` otvori stranicu u pregledniku (Playwright, lažni Supabase: gost i prijavljen korisnik s
pretplatom i djelomičnim napretkom), prođe ~120 ekrana (naslovnica, lekcije, pregledi, vježbe raznih
formata, test, rječnik, napredak, račun, opcije, mobitel, promjena jezika) i zapiše vidljivi tekst i
tekstualne atribute. `test/usporedi.py` uspoređuje dva zapisa; razlike koje se javljaju i između dva
prolaza iste verzije (animirani brojači) ne ispisuje.

```
npm i -D playwright && npx playwright install chromium      (jednom)
python -m http.server 8001          (u staroj kopiji projekta)   i   8002 (u novoj)
node croland-jezici/test/snimi.js http://localhost:8001 index-de.html de stari.json
node croland-jezici/test/snimi.js http://localhost:8002 index-de.html de novi.json
python croland-jezici/test/usporedi.py stari.json novi.json [stari2.json novi2.json ...]
```

`test/promjena.js <url> <stranica> <jezik> <drugi jezik>` provjeri da napredak ostaje isti nakon promjene jezika
(ispiše ISTO/RAZLICITO za brojke u mreži napretka).

`test/faza0/` je zapis pretvorbe iz faze 0 (popis kuka, njemački za nove rečenice, provjera na razini
izraza i izvještaj). Ne pokreće se ponovno.
