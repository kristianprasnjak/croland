# Deutsch — sadržaj tečaja njemačkog (dvojezično: hrvatski + engleski)

Nastalo 01.10.2026. Ova mapa je **odvojena od hrvatskog tečaja** (Croland). Ništa u `igre/`,
`data.js`, `rjecnik*.jsonl` ili ostalim datotekama Crolanda nije mijenjano.

Planski dokumenti (u korijenu projekta): `DE-gramaticka-kraljeznica.md`, `DE-plan-tecaja.md`,
`DE-detaljni-plan.md`, `DE-dvojezicnost.md`, `DE-review-plana.md`.

## Sadržaj mape

```
deutsch/
  igre/            101 cjelina: lekcija-00 … lekcija-20, vokabular-01…20, gramatika-01…20,
                   praksa-01…20, test-00…20
  rjecnik/         rjecnik-de.tsv + rjecnik-de.jsonl (2076 lema, L0–L20), dodatak.tsv, gradi_rjecnik.py
  sucelje/         sucelje-hr-en.json (tekstovi sučelja HR + EN)
  blobby-glas-de.md  Blobbyjeve rečenice (doslovan prijepis, HR + EN)
  slike-kljucevi.txt  362 ključa slika iz Croland slike/ (za slikovne igre)
  provjeri.py      provjera formata, dvojezičnosti i zabrana po razinama
  IZVJESTAJ.md     rezultat zadnje provjere
```

## Format (proširenje Croland formata)

Parser `osvjezi.js` čita meta-redove regexom `^(\w+):` — zato dvojezični ključevi koriste
**podvlaku**, ne crticu (`info_en`, ne `info-en`). Postojeći parser ih čita bez izmjena i
sprema u `meta`; player ih treba naučiti prikazati.

Zaglavlje datoteke:

```
# Hrvatski naslov cjeline
naslov_en: English title
cjelina: Lesson 4
```

Stranica:

```
## Hrvatski naslov stranice
id: l04-03                        stalni ključ za bodove (ne mijenja se)
naslov_en: English page title
format: nastavak
info: Hrvatsko objašnjenje.
info_en: English explanation.
opis: Hrvatska uputa.             (neobavezno)
opis_en: English instruction.
most_hr: Usporedba s hrvatskim.   (neobavezno)
most_en: Comparison with English. (neobavezno)
nastavci: en | e | -
- Ich habe ein___ Bruder. | Imam brata. // I have a brother. | en
```

- Njemački je u stavkama **jednom**; prijevod je `hrvatski // engleski`.
- Pitanja u čitanjima i testovima su na njemačkom (jednostavna W-pitanja), pa vrijede za oba jezika.
- Pitanja o značenju riječi imaju ponuđene odgovore u obliku `hr // en`.

Polja po formatu (njemački sadržaj):

| format | stavka |
|---|---|
| tekst | `- njemačka rečenica \| hr // en` ili `- **objašnjenje**` (za objašnjenja vidi niže) ili `- tab: …` |
| kartice | `- der Tisch, Tische \| stol // table` |
| brzina | `- prompt \| točan odgovor` |
| parovi, memorija | `- lijevo \| desno` |
| spajanje | `- der Apfel \| jabuka // apple \| jabuka` (3. polje = ključ slike iz `slike/`) |
| razvrstavanje | `stupci: A \| B` + `- stavka \| A` |
| izbor | `- pitanje \| točan \| krivi \| krivi` |
| nastavak | `nastavci: x \| y \| -` + `- Rečenica s ___ \| hr // en \| x` |
| upis | `- prompt \| odgovor` (više točnih: `a / b`) |
| slaganje | `- Ganzer Satz. \| hr // en` |
| poredak | `- korak` (točnim redom) |
| dijalog | `- npc \| replika` / `- ti \| opcija A \| opcija B` |
| provjera | `- izbor \| …`, `- upis \| …`, `- slaganje \| Satz. \| hr // en` |

**Objašnjenja u `tekst` stranicama** (pravila): svaki redak objašnjenja ima dvije verzije,
hrvatsku pa englesku, u dva uzastopna retka označena `hr:` i `en:` iza crtice:

```
- hr: **Samo se der mijenja.** U akuzativu: der → den, ein → einen.
- en: **Only der changes.** In the accusative: der → den, ein → einen.
- tab: | Nominativ | Akkusativ
- tab: der | der Bruder | den Bruder
```

Player prikazuje samo retke svog jezika (i one bez oznake: tablice, njemačke rečenice).
Polja za upis `[…]` stoje u njemačkim recima i vrijede za oba jezika.

### Novi formati (player ih još nema)

| format | meta | stavke |
|---|---|---|
| `hoeren` | `tekst:` njemački dijalog/obavijest — **samo zvuk**, tekst se otkriva nakon odgovora; `glasovi:` npr. `A=žena, B=muškarac` | `- Frage? \| točan \| krivi \| krivi` |
| `schreiben` | `zadatak:` / `zadatak_en:` uputa; `uzorak:` primjer rješenja na njemačkom; `rijeci:` 20–60 | `- kriterij // criterion` (popis za AI ocjenu) |
| `sprechen` | `zadatak:` / `zadatak_en:` | `- njemačka rečenica za izgovor \| hr // en` |

`wiederholen` (dnevno ponavljanje) se ne piše u `.md`: generira se iz rječnika i napretka.

## Rječnik

`rjecnik/rjecnik-de.tsv` (i isti sadržaj kao `rjecnik-de.jsonl`, jedan JSON objekt po retku) — 2076 lema.
Stupci: `razina | njemački | hrvatski | engleski | izvor | slika | primjer | primjer_hr | primjer_en`.

- **njemački**: imenice s članom i množinom (`der Tisch, Tische`), glagoli s oblicima
  (`fahren → er fährt · ist gefahren`, `an·kommen → ist angekommen`); `·` = odvojivi prefiks.
- **razina**: prva razina u kojoj se riječ uči; za dodatne riječi razina teme.
- **izvor**: `osnovni` (DE-rjecnik-800, 795), `tečaj` (iz kartica i vježbi, 511), `dodatno` (770 korisnih A1–A2
  riječi uz temu razine koje nisu u lekcijama — za `wiederholen`, pretragu i buduće proširenje).
- **slika**: ključ slike iz Croland `slike/` kad postoji (318 riječi).
- **primjer**: rečenica iz tečaja s hrvatskim i engleskim prijevodom (596 riječi), najranija na razini riječi ili kasnije.
- Ponovna izgradnja nakon izmjena lekcija: `cd deutsch/rjecnik && python3 gradi_rjecnik.py`
  (čita `../../DE-rjecnik-800.tsv`, `../igre/*.md`, `dodatak.tsv` i `../slike-kljucevi.txt`), pa ponovno izvoz u JSONL.

Po razinama: L0 26 · L1 101 · L2 92 · L3 90 · L4 95 · L5 110 · L6 97 · L7 111 · L8 84 · L9 109 · L10 92 ·
L11 115 · L12 113 · L13 109 · L14 113 · L15 103 · L16 112 · L17 89 · L18 111 · L19 97 · L20 107.

## Mini igre (slikovne mehanike)

Iste mehanike kao u hrvatskom tečaju, s njemačkim riječima. Svaka stavka ima tri polja:
`- njemački (s članom) | hr // en | ključ slike` — ključ je naziv slike iz Croland `slike/` (provjeru radi `provjeri.py`).

| format | gdje | |
|---|---|---|
| `spajanje` | L0 (2×), većina Vocabulary cjelina | spoji sliku i riječ |
| `baloni` | L0, Practice 5–20 (po jedan, tema razine) | slika gore, dodirni balon s riječju |
| `pamti` | L0, Practice 5, 8, 14 | tri slike bljesnu, ponovi redom |
| `slova` | L0 | složi riječ od slova (njemački bez člana; ä/ö/ü/ß kao zasebne pločice) |
| `zid` | L0 | zid svih riječi iz L0 |

Za razliku od hrvatskog (gdje je riječ = ključ slike), ovdje je riječ njemačka pa je ključ slike zasebno, treće polje.
Player za `baloni`/`pamti`/`zid` prikazuje njemačku riječ (s članom), a glosu `hr // en` po jeziku sučelja.

## Sučelje na dva jezika

Sav sadržaj stranica već je dvojezičan (`info`/`info_en`, `opis`/`opis_en`, `hr //` `en` u glosama, `- hr:` / `- en:` reci).
`sucelje/sucelje-hr-en.json` sadrži tekstove samog sučelja na hrvatskom i engleskom:
- `sucelje` — 74 tekstova (gumbi, povratne poruke, slušanje/pisanje/govor, mini igre, rječnik, napredak),
- `formati` — naziv i zadana uputa za svih 21 formata,
- `cjeline` — hrvatski i engleski naslov svih 102 cjeline,
- `gramaticki_pojmovi` — 38 pojmova (nominativ ↔ nominative…).

Ključevi u `sucelje` su prijedlog: `app.html` nije bio dostupan pri izradi, pa ih treba uskladiti s
postojećim tekstovima aplikacije (i dodati one kojih ovdje nema).

## Polja na svakoj stranici

Kao u hrvatskom tečaju, svaka stranica (svih 1043) ima tri razine teksta, svaku na hrvatskom i engleskom:
- `info` / `info_en` — dulje objašnjenje (panel „?“),
- `infokratko` / `infokratko_en` — jedan redak (≤ 120 znakova): pravilo + primjer,
- `opis` / `opis_en` — uputa u igri, s malom scenom iz priče; na `provjera` stranicama prag i što se otključava.
`provjeri.py` upozorava ako neko od tih polja nedostaje.

## Blobby

Blobby govori uvod i kraj svake lekcije te prvu rečenicu Vocabulary, Grammar i Practice cjelina.
Ton: kratko, na *ti*, toplo i duhovito, „najprije iskustvo, onda ime pravila“; pohvala na njemačkom, svaka razina
drugom (*Super! Toll! Prima! Klasse! … Geschafft!*). Doslovan prijepis svih rečenica: `blobby-glas-de.md`.

## Status sadržaja

Sav sadržaj napisao je AI (Claude), bez pregleda izvornog govornika. **Prije objave** treba:
1. pregled njemačkog (izvorni govornik ili nastavnik),
2. odigrati svaku cjelinu u revizijskom alatu na hrvatskom (engleski uzorkom),
3. snimiti zvuk licenciranim TTS-om (vidi `DE-review-plana.md`, 2.6).
