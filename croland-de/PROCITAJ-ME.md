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
node croland-de/osvjezi-de.js           # data-de.js + rjecnik-de.js (iz croland-de/igre i croland-de/rjecnik)
python3 croland-de/izgradi-sucelje-de.py # index-de.html + pregledi-de.js (iz sucelje-de.tsv)
```

Otvaranje: `pokreni-lokalno.bat`, pa u aplikaciji Options → Language → Deutsch (ili izravno `http://localhost:8000/index-de.html`).

- `osvjezi-de.js` učita `osvjezi.js` kao tekst i samo preusmjeri ulaz/izlaz — svaka promjena bodovanja ili formata u originalu automatski vrijedi i za DE.
- `izgradi-sucelje-de.py` mijenja samo stringove izvučene u `sucelje-de.tsv`; JS se tokenizira pravim parserom (acorn u `_alati/`), pa kod, regexi i ključevi ostaju netaknuti.
- **Interni ključevi ostaju engleski** (`Lesson 1`, `Daily challenge`, tipke `Enter/Escape`, `Authorization`…) jer se po njima sprema napredak u Supabase — korisnik koji promijeni jezik zadržava napredak. Prikaz imena tipova ide kroz `deTip()` / `deCjelina()` koje build ubacuje na ~30 mjesta (popis `ZAKRPE` u skripti; ako se izvorni redak promijeni, build stane s porukom umjesto da tiho propusti mjesto).
- Novi tekst u `index.html` → `python3 croland-de/izvuci-sucelje.py` (doda nove retke u `sucelje-de.tsv`, stari prijevodi ostaju), prevesti prazne retke (`=` = ne mijenjaj, za kod), pa ponovno build.

**Izbor jezika u aplikaciji** (Options → Language / Sprache): svaki jezik je svoja stranica (`index.html`, `index-de.html`) s istim kodom i istim ključevima napretka, pa se jezik može mijenjati tijekom tečaja bez gubitka napretka.
- Izbor se sprema u `localStorage` (`croland.jezik`) i u račun (`PROGRESS.postavke.jezik`), pa vrijedi i na drugom uređaju.
- Skripta na vrhu `<head>` odmah prebaci na stranicu odabranog jezika, prije učitavanja podataka; nakon promjene jezika korisnik ostaje na istom ekranu.

**Objava** (`objavi.bat`) sada radi oba jezika: korak 1b gradi `data-de.js` i `index-de.html` (treba Python: `python` ili `py`), `scripts/build.js` dijeli i `data-de.js` → `dist/data-de.js` + `zasticeno/data-plus-de.json`, a `uploadaj-sadrzaj.js` šalje obje plaćene datoteke u bucket. GitHub Actions gradi DE iz commitanih datoteka (`index-de.html`, `data-de.js`, `rjecnik-de.js`, `pregledi-de.js` moraju biti u repozitoriju).

**Supabase je pripremljen (02.10.2026.):** Edge Function `sadrzaj` je redeployana s `data-plus-de.json` na popisu dozvoljenih datoteka. Redirect URLs već imaju zamjenske znakove (`https://kristianprasnjak.github.io/croland/**`, `http://localhost:8888/**`), pa pokrivaju i `index-de.html`. Ako se ikad deploya iz lokalne mape (`supabase functions deploy sadrzaj`), lokalni `index.ts` već ima istu izmjenu.

Poznata ograničenja:
1. Nekoliko rečenica u kodu gradi se gramatički na engleski način (npr. `' point</strong> is'`); prijevod fragmenata je mjestimično nespretan.
2. Riječi koje je korisnik sam spremio u rječnik prije promjene jezika zadržavaju prijevod na jeziku na kojem su spremljene.
3. BLOBBY_RECI: 58 starih odsječaka ne postoji ni u engleskim lekcijama — ostaju neprevedeni i bez učinka.

## Odluke o prijevodu

- Obraćanje **du**; navodnici „…“; crtica –; markdown (`**`, `*`, `tab:`) i hrvatski dijelovi ostaju točno kako jesu.
- Polja s prefiksom `en:` (slaganje) zadržavaju prefiks jer ga player traži — sadržaj je njemački.
- **Mostovi**: gdje engleski tekst uspoređuje s engleskim (*like English him*, *no articles*), njemački tekst uspoređuje s njemačkim (padeži, rod, *du/ihr/Sie*, *-in* kao *-ica*). Njemački polaznik zna padeže i rod — objašnjenja to koriste.
- **Sie-dvosmislenost**: njemački *Sie sind* = *oni su* i *vi ste* (polite). Gdje to mijenja točan odgovor, uz rečenicu stoji *(höflich)* ili *(Plural)*.
- TRUE/FALSE u izboru → RICHTIG/FALSCH (player ih ne prepoznaje posebno).
- Engleski nagovještaji u zagradama prevode se na njemački oblik koji odgovara hrvatskom odgovoru: *(to him)* → *(ihm)*, *(my)* → *(mein)*, *(a woman speaking)* → *(eine Frau spricht)*.
- Kategorije razvrstavanja koje su na hrvatskom (KAMO?, GDJE?, UZROK, MUŠKARAC…) ostaju hrvatske.
