# Croland — mini igre (radni prototipi)

Dvanaest igrivih prototipa prema `mini-igre.md`. Svaka je **samostalna HTML datoteka**:
otvori je dvoklikom i radi. Nema buildanja, nema servera, nema vanjskih biblioteka.

## Potpuno odvojeno od postojeće aplikacije

Ove datoteke **ne čitaju i ne mijenjaju** ništa iz projekta — ni `app.html`, ni `data.js`,
ni mape `slike/`, `zvuk/`, `igre/`. Svaka igra nosi vlastiti ugrađeni sadržaj:

| | prije | sada |
|---|---|---|
| riječi | 246 u 17 kategorija | **903 u 23 kategorije** |
| rečenice hr/en | — | **334 (razine 1–5)** |
| zadaci s prazninom | — | **107** |
| dijalozi | — | **12 (85 replika)** |
| suprotnice | — | **55 parova** |
| gramatički savjeti | — | **30** |

Napredak se sprema u `localStorage` pod ključem `croland-mini-<id>`, odvojeno od aplikacije.
Uz to sve igre dijele `croland-mini-ucenje` — zajedničku evidenciju svladanih i promašenih
riječi, koju koriste za biranje novog gradiva (`CL.svjezeRijeci`) i popis za ponoviti
(`CL.zaPonoviti`).

## Uređivanje sadržaja

Sadržaj se **ne uređuje u HTML datotekama** nego u mapi `_sadrzaj/`:

```
_sadrzaj/rijeci.js     rječnik (hr, en, rod, emoji) po kategorijama
_sadrzaj/recenice.js   rečenice, praznine, dijalozi, savjeti, suprotnice
_sadrzaj/ugradi.js     ugradi sadržaj u svih 12 igara     → node _sadrzaj/ugradi.js
_sadrzaj/mediji.js     osvježi MEDIJI-popis.md/.csv       → node _sadrzaj/mediji.js
_sadrzaj/provjeri.js   headless provjera svih igara       → node _sadrzaj/provjeri.js
```

`ugradi.js` je idempotentan — pokreni ga koliko god puta treba. Provjerava i sam sadržaj
(rod, kategorije, praznine bez `___`) i prekida s greškom ako nešto ne valja.

## Mediji

Igre traže slike i zvuk u mapi **`mini games media/`**. Popis svega što tamo ide —
s nazivima, dimenzijama i opisima — je u **`MEDIJI-popis.md`** (i `MEDIJI-popis.csv`).

**Dok je mapa prazna, sve igre rade.** Svaka slika ima ugrađen zamjenski znak, a izgovor
se preskače. Mediji su nadogradnja, ne uvjet.

## Popis igara

| # | Igra | Stil | Duljina | Bodovi | Što je unutra |
|---|------|------|---------|--------|---------------|
| 01 | Grad | Pokémon Red RPG | 15 zadataka · 10 likova | 100 | kupovina, dostava, kviz, dijalozi, razvrstavanje, praznine, prijevodi, upis, suprotnice, završna provjera |
| 02 | Put oko Hrvatske | Oregon Trail | 2 kruga × 100 mjesta | 100 | HR↔EN, crtež, anagram, upis, rod, suprotnice, praznine, prijevod rečenica; zalihe i kontrolne točke |
| 03 | Pamti pa piši | memorija + upis | 150 razina | 100 | 1–5 crteža, riječ u tekstu, crtež→engleski, kratke i duge rečenice |
| 04 | Tvrđava | point-and-click | 16 soba | 100 | 16 različitih zagonetki, svaka sa svojim likom |
| 05 | Konoba | posluživanje | 20 smjena · 85 gostiju | 50 | 38 jela, 12 pridjeva, 20 uzoraka narudžbe, 4 tipa gostiju |
| 06 | Skladište | Sokoban | 2–9 katova (po ulogu) | 100 | 5 pravila razvrstavanja, regali koji blokiraju put |
| 07 | Poštanski vlak | razvrstavanje + sat | 18 krugova | 30 | 8 pravila: kategorija, rod, slovo, duljina, vrsta riječi, prijevod, suprotnice, rečenice |
| 08 | Labirint | Pac-Man | 10 razina | 30 | 5 pravila skupljanja, uljezi, duhovi, ⭐ za zamrzavanje |
| 09 | Zmija | Snake | 3 razine · 30 riječi | 30 | riječi 3–11 slova, zidovi, ubrzanje |
| 10 | Mario | platformer | 3 svijeta · 30 razina | 50 | 9 vrsta pitanja, protivnici koje treba preskočiti |
| 11 | Preživljavanje | pod satom | 5 etapa · 60 zadataka | 100 | riječi u oba smjera, slike, praznine, prijevod rečenica |
| 12 | Obrana baze | padajuće riječi | 15 valova | 40 | 5 vrsta meta, pojačani valovi svakih 5 |

**Ukupno: 830 bodova po valuti.**

## Beskonačni način

Svaka igra ima **beskonačni način** — otključa se kad je pređeš, gumb „Bez kraja ▶"
na završnom ekranu. Nema gornje granice: pravila se nasumično izmjenjuju, težina raste,
a igra broji koliko dugo izdržiš. Beskonačni način **ne mijenja isplatu** — bodovi su
već naplaćeni prelaskom igre.

## Bodovanje

Svaka igra isplaćuje **isti iznos u sve četiri valute** (LP · VP · GP · PP).
Isplata je **jednokratna** — jednom naplaćen maksimum se ne ponavlja. Maksimum je **skriven**
dok ga igrač ne dosegne; tek tada piše da je prešao igru.

## Tehnički detalji

- Kontrole: tipkovnica (strelice / WASD / razmak) **i** gumbi na ekranu — radi na mobitelu.
- Zvuk: kratki sintetički tonovi (Web Audio) rade bez ijedne datoteke; izgovor riječi se
  pušta iz `mini games media/` ako datoteka postoji.
- Sve u jednoj datoteci: CSS, sadržaj i logika. Prosječno ~152 kB po igri.
- Zajednička jezgra `CL` u svakoj igri nudi: rječnik i kategorije, rečenice po razini,
  praznine, dijaloge, suprotnice, savjete, praćenje učenja, HUD, srca, konfete,
  strogi upis s kvačicama i završni ekran s beskonačnim načinom.
- Provjera: `node _sadrzaj/provjeri.js` (jsdom) — učitavanje, jezgra i sadržaj svih 12 igara.
