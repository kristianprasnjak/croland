# Croland DE — njemačka verzija Crolanda (hrvatski za govornike njemačkog)

Nastalo 01.10.2026. Sav engleski tekst Crolanda prevodi se na njemački. **Hrvatski sadržaj se ne dira i ne kopira ručno**:
izvor ostaje `igre/*.md`, a njemačke datoteke se *generiraju* iz izvora i prijevodne memorije.

## Glavna datoteka: `prijevod-de.tsv`

Prijevodna memorija — svaki jedinstveni engleski string iz tečaja jednom, s njemačkim prijevodom.
Stupci: `en | de | puta (koliko se puta pojavljuje) | prvi_id (gdje se prvi put pojavljuje) | jezik`.

- `de` prazno = još nije prevedeno (u generiranoj datoteci ostaje engleski).
- `de` = `=` → string se ostavlja kakav jest (hrvatski koji je skripta krivo prepoznala kao engleski, imena, brojevi).
- Ispravak prijevoda: promijeni redak u ovoj datoteci i ponovno pokreni `primijeni.py`. Isti string se tako ispravlja svugdje odjednom.

## Skripte (pokreću se iz ove mape, `python3 …`)

| skripta | što radi |
|---|---|
| `izvuci.py` | prolazi `../igre/*.md`, upisuje sve segmente u `segmenti.tsv` i nove engleske stringove u `prijevod-de.tsv` (postojeći prijevodi ostaju). Pokreni nakon svake izmjene hrvatskih lekcija. |
| `primijeni.py [datoteke…]` | gradi `igre/*.md` (njemačka verzija) iz izvora + memorije; neprevedeno ide u `nedostaje.tsv`. |
| `provjeri-de.py` | uspoređuje strukturu: isti broj stranica, stavki i polja, iste `[praznine]`, sačuvan `en:` prefiks, kategorije u stupcima. Mora pokazati 0 grešaka. |
| `posao.py dump F…` / `upis F` / `stanje` | alat za prevođenje po datotekama (vidi `../UPUTE-prijevod-de.md`). |
| `izvuci-sucelje.py` | izvlači engleske tekstove sučelja iz `index.html` i `pregledi.js` u `sucelje-de.tsv`. |
| `rjecnik/spoji.py` | spaja `rjecnik/de-*.tsv` u `rjecnik/prijevodi-de.jsonl` (lema → njemačka značenja) i `rjecnik/rjecnik-de-hr.jsonl` (obrnuti rječnik). |

`iznimke.tsv`: ručna iznimka za pojedini segment (`id <TAB> hr|en`) kad prepoznavanje jezika pogriješi.

## Stanje (01.10.2026.)

| dio | stanje |
|---|---|
| Rječnik (`prijevodi.jsonl`, 2401 lema) | **gotovo** → `rjecnik/prijevodi-de.jsonl`, obrnuti DE→HR `rjecnik/rjecnik-de-hr.jsonl` |
| Sučelje (`index.html` + `pregledi.js`, 1236 stringova) | **gotovo** → `sucelje-de.tsv` (131 redak označen `@blobby` generira se iz lekcija, vidi niže) |
| Lekcije: L0–L4 (Lesson, Vocabulary, Grammar, Practice, Test) | **gotovo** (provjereno: 0 grešaka strukture, bez zaostalog engleskog) |
| L5–L20, daily challenge | sljedeće — redom po razinama (oko 25 % ukupnog teksta je gotovo) |

Trenutni postotak: `python3 posao.py stanje`.

## Što još treba (nakon prijevoda)

1. **Player**: `index.html` nema sustav jezika — tekstovi su upisani u kod. Treba uvesti `T('…')` (ključ = engleski string) koji čita `sucelje-de.tsv`, i izbor jezika EN/DE.
2. **data-de.js**: `osvjezi.js` s `igreDir = croland-de/igre` i `prijevodi-de.jsonl` umjesto `prijevodi.jsonl`.
3. **BLOBBY_RECI** (`index.html`): popis odsječaka redaka iz lekcija koje izgovara Blobby — za DE se generira iz prijevodne memorije (odsječak → njemački redak), zato je u `sucelje-de.tsv` označen `@blobby`.
4. Gumb **EN** pored rečenica u čitanjima → u DE verziji **DE** (lekcije ga već tako spominju).

## Odluke o prijevodu

- Obraćanje **du**; navodnici „…“; crtica –; markdown (`**`, `*`, `tab:`) i hrvatski dijelovi ostaju točno kako jesu.
- Polja s prefiksom `en:` (slaganje) zadržavaju prefiks jer ga player traži — sadržaj je njemački.
- **Mostovi**: gdje engleski tekst uspoređuje s engleskim (*like English him*, *no articles*), njemački tekst uspoređuje s njemačkim (padeži, rod, *du/ihr/Sie*, *-in* kao *-ica*). Njemački polaznik zna padeže i rod — objašnjenja to koriste.
- **Sie-dvosmislenost**: njemački *Sie sind* = *oni su* i *vi ste* (polite). Gdje to mijenja točan odgovor, uz rečenicu stoji *(höflich)* ili *(Plural)*.
- TRUE/FALSE u izboru → RICHTIG/FALSCH (player ih ne prepoznaje posebno).
