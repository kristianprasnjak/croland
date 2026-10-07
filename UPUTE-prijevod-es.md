# Prijevod Crolanda na španjolski — upute za sesije

Napisano 05.10.2026. Ovo je radni brief za svaku sesiju koja prevodi ili recenzira španjolsku verziju.
Odluke, pravila stila i kontrola kvalitete su u `ES-plan.md` (§0, §3, §6) i vrijede bez iznimke.
Alati i i18n pravila za `index.html`: `croland-jezici/PROCITAJ-ME.md`. Stanje rada: `croland-es/STANJE.md`.

## 0. Prije početka svake sesije

1. Pročitaj `ES-plan.md`, ovaj dokument, `croland-es/STANJE.md` i (ako postoji) `croland-es/glosar-es.tsv`.
2. Uzmi **prvi neodrađeni korak** iz `STANJE.md`. Ne preskači redoslijed: glosar → sučelje → rječnik → lekcije.
3. Osvježi memorije (sigurno je, prijevodi ostaju):
   ```
   python croland-jezici/alati/izvuci.py --jezik es
   python croland-jezici/alati/izvuci-sucelje.py --jezik es
   ```
4. Radi na korisnikovom računalu (device shell). Ako ne radi, preuzmi samo datoteke koje trebaš, radi u oblaku
   i vrati ih; prije vraćanja napravi `.bak-…` kopiju svake datoteke koju mijenjaš.

## 1. Izvor i uzor

- Prevodi se **samo s engleskog** (stupac `en`). Hrvatski dio je znak po znak isti.
- Njemački prijevod istog stringa (`croland-de/prijevod-de.tsv`, `croland-de/sucelje-de.tsv`) je **uzor za odluke**
  (što je hrvatski pa `=`, gdje treba most, gdje je *(höflich)/(Plural)*), nikad izvor teksta.
- Oznake `=` (hrvatski, kod, imena) i `@blobby` već su prenesene iz DE u `prijevod-es.tsv` i `sucelje-es.tsv`
  (`posao.py dump` ih ne nudi). Ako je neka kriva za španjolski, upiši prijevod preko nje.
- Isti engleski string = isti španjolski svugdje (memorija). Ako kontekst traži drukčije, iznimka u
  `croland-es/iznimke.tsv` i bilješka u `STANJE.md`.

## 2. Koraci

### Korak 1 — glosar (`croland-es/glosar-es.tsv`)
Stupci: `en | es | napomena`. Obavezno: nazivi tipova (Lesson, Vocabulary, Grammar, Practice, Test, Daily/Weekly
challenge), valute i kratice (odluka §0: PL · PV · PG · PP), streak/racha, points, level, unit, exercise, checkpoint,
dictionary, favourites, sticky note, mini game, nazivi svih formata vježbi, padeži (nominativ … instrumental) i
gramatički pojmovi (aspect, perfective, infinitive, participle, conditional …), Croland Plus i nazivi planova.
Zatim popis **zabranjenih** oblika s ispravnom zamjenom (`zabranjeno | koristi | razlog`): *vosotros, os, vuestro,
-áis/-éis, vos* + glagol, *ordenador, móvil, coche, zumo, patata, melocotón, piso (stan), conducir, vale, guay* itd.
Uz glosar napravi i provjeru `croland-jezici/alati/provjeri-stil.py --jezik es` (pravila iz `croland-es/pravila.json`):
parovi ¿? ¡!, navodnici “ ”, zabranjeni oblici, glosar, duljina >1,5× engleskog na gumbima (§6a, točke 2–5, 7).
Mora raditi i na lekcijama i na sučelju. Za DE neka pravila budu prazna (alat se ne smije srušiti).

### Korak 2 — sučelje
- `croland-es/sucelje-es.tsv`: prevedi prazan stupac `es` (i retke s izvorom `pregledi.js` — tako je i u DE). `=` za kod (CSS, imena datoteka,
  hrvatski). Redak `js-t` je cijela rečenica s `%1`, `%2` — mjesta moraju ostati, red riječi slobodan.
  Retci `LP`, `VP`, `GP`, `PP` = `PL`, `PV`, `PG`, `PP`. Retci `Words/Games/Daily/...` (izvor `html-attr`) su kratki
  natpisi navigacije — kratko.
- `croland-es/pregledi-es.tsv`: stupac `es`, prijevod engleskog uz hrvatski u stupcu `hr` (engleski može značiti
  različito uz različit hrvatski — svaki redak za sebe).
- Ne mijenjaj `index.html` radi prijevoda. Ako nađeš rečenicu slaganu od dijelova (`'... ' + x + ' ...'`),
  prebaci je u `T_('…%1…', x)` po pravilima iz `croland-jezici/PROCITAJ-ME.md`, dodaj njemački redak u
  `croland-de/sucelje-de.tsv` (sastavi ga iz dosadašnjih njemačkih dijelova), i pusti regresijski test (§4).
- Build za probu: `python croland-jezici/alati/izgradi-sucelje.py --jezik es` (izlaz `index-es.html` se ne objavljuje
  dok ES nije u `jezici.json` aktivan i u `scripts/build.js`).

### Korak 3 — rječnik
`croland-es/rjecnik/es-1.tsv … es-5.tsv`, redak `lema<TAB>značenje; značenje` (kao `croland-de/rjecnik/de-*.tsv`),
za svih 2 401 lema iz `prijevodi.jsonl` (engleska značenja su izvor). Latinoamerički vokabular, glosar.
Zatim `python croland-jezici/alati/spoji-rjecnik.py --jezik es` mora javiti `nedostaje: []`.

### Korak 4 — lekcije, jedna razina po krugu
Razina N = `lekcija-NN.md, vokabular-NN.md, gramatika-NN.md, praksa-NN.md, test-NN.md`. Redom L0 (`lekcija-0.md`),
L1 … L20, zatim `daily-*.md` i `*-lekcija1.md`.
```
python croland-jezici/alati/posao.py --jezik es dump lekcija-NN.md vokabular-NN.md > croland-es/_radno/en.txt
# napiši croland-es/_radno/es.txt: isti brojevi, redak "N<TAB>španjolski prijevod"
python croland-jezici/alati/posao.py --jezik es upis croland-es/_radno/es.txt
# isto za gramatika-NN, praksa-NN, test-NN (upis uvijek prije sljedećeg dump)
python croland-jezici/alati/primijeni.py --jezik es
python croland-jezici/alati/provjeri.py --jezik es          # mora biti 0 grešaka
python croland-jezici/alati/provjeri-stil.py --jezik es     # mora biti 0
python croland-jezici/alati/posao.py --jezik es stanje
```
Pravila koja se najčešće krše (sva su u ES-plan §3):
- hrvatski krivo prepoznat kao engleski → `=`; `en:` prefiks ostaje; markdown, `[praznine]`, `tab:` netaknuti;
- *tú* svugdje, *ustedes* za množinu, nikad *vosotros*; ¿…? ¡…!; “…”; crtica ` – `; naslovi malim slovima osim prvog;
- TRUE/FALSE → VERDADERO/FALSO; „Tap the English meaning“ → „significado en español“; „English above“ → „Arriba en español“;
- engleski nagovještaj u zagradi → španjolski oblik koji odgovara hrvatskom odgovoru (*(to him)* → *(a él)*);
- mostovi prema španjolskom, ne prema engleskom (tablica u §3): izostavljanje zamjenice, *se*, dvostruka negacija…;
- *vi* = *ustedes* (množina) ili *usted* (uljudno) — gdje o tome ovisi točan odgovor, *(formal)* / *(plural)*;
- **odavanje rješenja**: rod/broj španjolskog člana ili pridjeva ne smije otkriti hrvatski odgovor.

### Korak 5 — Blobby i ostalo
BLOBBY se gradi sam iz memorije lekcija (build javlja koliko fali). Provjeri `nedostaje.tsv` = prazno.

## 3. Uloga sesije i recenzija

> **Izmjena 06.10.2026. (odluka korisnika): recenzije su ukinute.** Svaka sesija je prevoditelj. Kad su korak/razina
> prevedeni i provjere 0, korak je **gotovo**, a `Sljedeće: prijevod — <sljedeći korak/razina>`. Ostatak ovog odjeljka
> o recenzentu više ne vrijedi.

Svaka sesija ima **točno jednu ulogu**, koju bira prema retku `Sljedeće:` na vrhu `croland-es/STANJE.md`:
- `Sljedeće: prijevod — <korak/razina>` → **prevoditelj**: prvo ispravi ili obrazloži otvorene nalaze recenzije
  (stupac `odluka`), zatim prevodi. Kad je korak/razina potpuno preveden(a) i provjere su 0, označi
  „čeka recenziju“ i postavi `Sljedeće: recenzija — <isto>`. Ako nije stigao do kraja, `Sljedeće` ostaje prijevod.
- `Sljedeće: recenzija — <korak/razina>` → **recenzent**: ne ispravlja ništa. Usporedi engleski izvor i
  španjolski (memorija za tu razinu, `croland-es/igre/*.md`, `sucelje-es.tsv`, rječnik), pokrene `provjeri.py` i
  `provjeri-stil.py`, i nalaze upiše u `croland-es/recenzija/<korak-ili-razina>.md` kao tablicu
  `# | gdje | en | es sada | problem | prijedlog | odluka`. Traži: smisao, prirodnost i regionalizme, *vosotros*/voseo,
  ton (*tú*, toplo, kratko), gramatiku i pravopis (¿? ¡! “ ”), glosar, mostove, *usted/ustedes*, **odavanje
  rješenja** i hrvatsko koje je prevedeno (ili obrnuto). Zatim:
  - 0 nalaza → korak/razina **gotovo**, `Sljedeće: prijevod — <sljedeći korak/razina>`;
  - ima nalaza → „recenzija: N nalaza“, `Sljedeće: prijevod — <isto> (ispravci)`.
- Sesija nikad ne recenzira ono što je sama prevela u istoj sesiji. Svaka sesija je nova, pa je recenzija neovisna.

## 4. Regresija
Svaka izmjena `index.html` (rijetko, samo za kuke): `croland-jezici/test/snimi.js` i `usporedi.py` za EN i DE
prije/poslije (upute u `croland-jezici/PROCITAJ-ME.md`). EN mora biti bez razlike.

## 5. Kraj svake sesije
- Ažuriraj `croland-es/STANJE.md`: što je gotovo, brojke (`posao.py stanje`, greške provjera), otvorene odluke.
- Ne objavljuj ništa i ne diraj `jezici.json` (`es` ostaje `"aktivan": false`) ni `<head>` popis jezika — to je faza 7.
- Postavi redak `Sljedeće:` u `STANJE.md` (vidi §3).
- Korisniku na kraju: 2–3 rečenice o tome što je gotovo i što piše u `Sljedeće:`.

---

## Prompt (uvijek isti, kopiraj u novu sesiju)

> Nastavljamo španjolsku verziju Crolanda (hrvatski za govornike latinoameričkog španjolskog). U mapi projekta
> pročitaj redom `ES-plan.md`, `UPUTE-prijevod-es.md`, `croland-es/STANJE.md` i `croland-es/glosar-es.tsv`
> (ako postoji). Redak `Sljedeće:` u `STANJE.md` određuje tvoju ulogu u ovoj sesiji — prevoditelj ili recenzent —
> i što radiš; drži se točno §3 uputa i samo te jedne uloge. Prije izmjena napravi `.bak` kopije, ništa ne
> objavljuj. Na kraju ažuriraj `STANJE.md` (i redak `Sljedeće:`) i reci mi ukratko što je gotovo.

Isti prompt se lijepi svaki put; sesija sama zna je li na redu prijevod ili recenzija.
