# Croland DE — njemačka verzija Crolanda (hrvatski za govornike njemačkog)

Nastalo 01.10.2026. Sav engleski tekst Crolanda prevodi se na njemački. **Hrvatski sadržaj se ne dira i ne kopira ručno**:
izvor ostaje `igre/*.md`, a njemačke datoteke se *generiraju* iz izvora i prijevodne memorije.

## Glavna datoteka: `prijevod-de.tsv`

Prijevodna memorija — svaki jedinstveni engleski string iz tečaja jednom, s njemačkim prijevodom.
Stupci: `en | de | puta (koliko se puta pojavljuje) | prvi_id (gdje se prvi put pojavljuje) | jezik`.

- `de` prazno = još nije prevedeno (u generiranoj datoteci ostaje engleski).
- `de` = `=` → string se ostavlja kakav jest (hrvatski koji je skripta krivo prepoznala kao engleski, imena, brojevi).
- Ispravak prijevoda: promijeni redak u ovoj datoteci i ponovno pokreni `primijeni.py`. Isti string se tako ispravlja svugdje odjednom.

## Skripte

**Od 05.10.2026. (ES faza 0) alati su zajednički za sve jezike: `croland-jezici/alati/`, s parametrom
`--jezik de` (vidi `croland-jezici/PROCITAJ-ME.md`).** Skripte ispod u ovoj mapi su tanki omotači koji
zovu nove alate s `--jezik de`, pa naredbe iz ove tablice i iz `UPUTE-prijevod-de.md` rade kao i prije
(pokreću se iz ove mape, `python3 …`). `_alati/` i `__pycache__/` ovdje više ne trebaju.

| skripta | što radi |
|---|---|
| `izvuci.py` | prolazi `../igre/*.md`, upisuje sve segmente u `segmenti.tsv` i nove engleske stringove u `prijevod-de.tsv` (postojeći prijevodi ostaju). Pokreni nakon svake izmjene hrvatskih lekcija. |
| `primijeni.py [datoteke…]` | gradi `igre/*.md` (njemačka verzija) iz izvora + memorije; neprevedeno ide u `nedostaje.tsv`. |
| `provjeri-de.py` (→ `provjeri.py`) | uspoređuje strukturu: isti broj stranica, stavki i polja, iste `[praznine]`, sačuvan `en:` prefiks, kategorije u stupcima. Mora pokazati 0 grešaka. |
| `posao.py dump F…` / `upis F` / `stanje` | alat za prevođenje po datotekama (vidi `../UPUTE-prijevod-de.md`). |
| `izvuci-sucelje.py` | izvlači engleske tekstove sučelja iz `index.html` i `pregledi.js` u `sucelje-de.tsv`. |
| `rjecnik/spoji.py` (→ `spoji-rjecnik.py`) | spaja `rjecnik/de-*.tsv` u `rjecnik/prijevodi-de.jsonl` (lema → njemačka značenja) i `rjecnik/rjecnik-de-hr.jsonl` (obrnuti rječnik). |

`iznimke.tsv`: ručna iznimka za pojedini segment (`id <TAB> hr|en`) kad prepoznavanje jezika pogriješi.

## Stanje (02.10.2026.)

| dio | stanje |
|---|---|
| Rječnik (`prijevodi.jsonl`, 2401 lema) | **gotovo** → `rjecnik/prijevodi-de.jsonl`, obrnuti DE→HR `rjecnik/rjecnik-de-hr.jsonl` |
| Sučelje (`index.html` + `pregledi.js`, 1236 stringova) | **gotovo** → `sucelje-de.tsv` (131 redak označen `@blobby` generira se iz lekcija, vidi niže) |
| Lekcije L0–L20 (Lesson, Vocabulary, Grammar, Practice, Test) | **gotovo** |
| Daily challenge (`daily-*.md`) i `*-lekcija1.md` | **gotovo** |
| Ukupno | **100 %** (16 912 stringova), 0 grešaka strukture; provjera zaostalog engleskog prošla (uključujući 155 ručnih iznimki u `iznimke.tsv`) |

Trenutni postotak: `python3 posao.py stanje`.

## Njemačka verzija aplikacije (lokalni build)

Original se ne dira: build stvara zasebne datoteke u korijenu projekta, uz `index.html`.

```
python3 croland-jezici/alati/izgradi-jezike.py --jezik de   # oboje odjednom (ovo zove objavi.bat)
node croland-de/osvjezi-de.js            # samo data-de.js + rjecnik-de.js (omotač za osvjezi-jezik.js)
python3 croland-de/izgradi-sucelje-de.py # samo index-de.html + pregledi-de.js (omotač za izgradi-sucelje.py)
```

Otvaranje: `pokreni-lokalno.bat`, pa u aplikaciji Options → Language → Deutsch (ili izravno `http://localhost:8000/index-de.html`).

- `osvjezi-de.js` učita `osvjezi.js` kao tekst i samo preusmjeri ulaz/izlaz — svaka promjena bodovanja ili formata u originalu automatski vrijedi i za DE.
- `izgradi-sucelje-de.py` mijenja samo stringove izvučene u `sucelje-de.tsv`; JS se tokenizira pravim parserom (acorn u `_alati/`), pa kod, regexi i ključevi ostaju netaknuti.
- **Interni ključevi ostaju engleski** (`Lesson 1`, `Daily challenge`, tipke `Enter/Escape`, `Authorization`…) jer se po njima sprema napredak u Supabase — korisnik koji promijeni jezik zadržava napredak. Prikaz imena tipova ide kroz `tipIme()` / `cjelinaIme()` koje su od faze 0 u samom `index.html` (za engleski vraćaju isto). Build više ne krpa kod (nema `ZAKRPE`, `deTip`, `MNOZINA`, `KRATKO`): te riječi prevodi samo unutar `T_( )`.
- **Tekst sučelja koji se slaže od dijelova piše se kao jedna rečenica s `T_()`** (od 05.10.2026.): `T_('Your next payment is now on %1.', datum)`. U engleskom `T_` samo umetne vrijednosti; build cijeli literal unutar `T_( )` prevodi odjednom (može i s HTML-om), pa njemački smije presložiti red riječi. Mjesta `%1`, `%2` moraju ostati u prijevodu (build inače stane). Redak koji postoji samo kao `T_` (izvor `js-t`) prevodi se **samo unutar `T_( )`** — isti string drugdje u kodu može biti ključ (npr. status `'paused'`). Gola riječ koja je tekst sučelja (`'days'`, `'locked'`) također ide u `T_()`.
- `izvuci-sucelje.py` uz staru heuristiku koristi i popis engleskih riječi `_alati/engleske-rijeci.txt` (iz wordfreq), pa hvata i kratke poruke sa simbolima (`▶ Continue`, `Saving…`).
- **`pregledi.js` prevodi se po položaju**, iz `pregledi-de.tsv` (`en | hr | de`): naslov, opis, drugi član para u `ex`/`t`/`w` i engleske ćelije zaglavlja u `g` (popis u `sucelje_lib.PREGLEDI_ENG_G`). Ne ide kroz globalnu tablicu, jer je npr. `more` u pregledima hrvatska riječ, a `is` je u sučelju bio dio druge rečenice. Isti engleski s različitim hrvatskim (npr. *you* = *ti* / *te*) ima svoj redak.
- Novi tekst u `index.html` → `python3 croland-de/izvuci-sucelje.py` (doda nove retke u `sucelje-de.tsv`, stari prijevodi ostaju), prevesti prazne retke (`=` = ne mijenjaj, za kod), pa ponovno build.

**Izbor jezika u aplikaciji** (Options → Language / Sprache): svaki jezik je svoja stranica (`index.html`, `index-de.html`) s istim kodom i istim ključevima napretka, pa se jezik može mijenjati tijekom tečaja bez gubitka napretka.
- Izbor se sprema u `localStorage` (`croland.jezik`) i u račun (`PROGRESS.postavke.jezik`), pa vrijedi i na drugom uređaju.
- Skripta na vrhu `<head>` odmah prebaci na stranicu odabranog jezika, prije učitavanja podataka; nakon promjene jezika korisnik ostaje na istom ekranu.

**Objava** (`objavi.bat`) sada radi oba jezika: korak 1b gradi `data-de.js` i `index-de.html` (treba Python: `python` ili `py`), `scripts/build.js` dijeli i `data-de.js` → `dist/data-de.js` + `zasticeno/data-plus-de.json`, a `uploadaj-sadrzaj.js` šalje obje plaćene datoteke u bucket. GitHub Actions gradi DE iz commitanih datoteka (`index-de.html`, `data-de.js`, `rjecnik-de.js`, `pregledi-de.js` moraju biti u repozitoriju).

**Supabase je pripremljen (02.10.2026.):** Edge Function `sadrzaj` je redeployana s `data-plus-de.json` na popisu dozvoljenih datoteka. Redirect URLs već imaju zamjenske znakove (`https://kristianprasnjak.github.io/croland/**`, `http://localhost:8888/**`), pa pokrivaju i `index-de.html`. Ako se ikad deploya iz lokalne mape (`supabase functions deploy sadrzaj`), lokalni `index.ts` već ima istu izmjenu.

Poznata ograničenja:
1. ~~Rečenice slagane od dijelova~~ — riješeno 05.10.2026. (ES faza 0): ~80 rečenica i oblika (broj/ime u sredini rečenice, množine, HTML atributi u JS-u) prebačeno je u cijele `T_()` rečenice. Usput ispravljeno u DE: „Tippe bei einem kroatischen Wort auf … neben dem Wort“ (dijeljeni dio `Tap `), „Alle anzeigen 20 Level“, `<strong>dictionary</strong>` u savjetima, „Lesson 3“ u rječničkom testu i ladici napretka, „Daily challenge 12“ u napretku, točkice dnevnih izazova 0/0 i ključ `Daily challenge` koji je build prevodio i u kodu (`igreCjeline('Tägliche Challenge')`).
2a. ~~Bodovi vježbi spremali su se pod njemačkim naslovom~~ — riješeno 05.10.2026.: ključ napretka je engleski naslov (`kljuc` u `data-de.js`), stari njemački ključevi se jednom prepišu; promjena jezika više ne gubi bodove.
2. ~~Riječi u rječniku zadržavaju jezik spremanja~~ — riješeno 05.10.2026.: zapis pamti `jez`, a prikaz uzima prijevod iz podataka trenutnog jezika (`prijevodZapisa`).
3. BLOBBY_RECI: 58 starih odsječaka ne postoji ni u engleskim lekcijama — ostaju neprevedeni i bez učinka.

## Odluke o prijevodu

- Obraćanje **du**; navodnici „…“; crtica –; markdown (`**`, `*`, `tab:`) i hrvatski dijelovi ostaju točno kako jesu.
- Polja s prefiksom `en:` (slaganje) zadržavaju prefiks jer ga player traži — sadržaj je njemački.
- **Mostovi**: gdje engleski tekst uspoređuje s engleskim (*like English him*, *no articles*), njemački tekst uspoređuje s njemačkim (padeži, rod, *du/ihr/Sie*, *-in* kao *-ica*). Njemački polaznik zna padeže i rod — objašnjenja to koriste.
- **Sie-dvosmislenost**: njemački *Sie sind* = *oni su* i *vi ste* (polite). Gdje to mijenja točan odgovor, uz rečenicu stoji *(höflich)* ili *(Plural)*.
- TRUE/FALSE u izboru → RICHTIG/FALSCH (player ih ne prepoznaje posebno).
- Engleski nagovještaji u zagradama prevode se na njemački oblik koji odgovara hrvatskom odgovoru: *(to him)* → *(ihm)*, *(my)* → *(mein)*, *(a woman speaking)* → *(eine Frau spricht)*.
- Kategorije razvrstavanja koje su na hrvatskom (KAMO?, GDJE?, UZROK, MUŠKARAC…) ostaju hrvatske.
