# Croland ES — plan španjolske verzije (hrvatski za govornike španjolskog)

Napisano 05.10.2026. Brief za sesije koje rade španjolsku verziju. Prije početka pročitaj i
`croland-de/PROCITAJ-ME.md` (kako je napravljena njemačka verzija) i `UPUTE-prijevod-de.md`.

## 0. Odluke (dogovoreno)

| pitanje | odluka |
|---|---|
| ciljna publika | govornici španjolskog koji uče hrvatski |
| varijanta | **neutralni latinoamerički** španjolski: *tú*, *ustedes* (bez *vosotros*), latinoamerički vokabular |
| izvor prijevoda | engleski tekst Crolanda (kao za DE), uz njemačke odluke kao uzor za mostove i dvosmislenosti |
| alati | **poopćiti** postojeće DE alate u jedan skup s parametrom jezika (faza 0), ne kopirati |
| tko radi | svaku sesiju (prijevod, recenziju, build) radi **Opus 5.5**; nijedan korak se ne prepušta slabijem modelu |
| standard | „besprijekorno“: svaki string prolazi prijevod, automatske provjere i neovisnu recenziju (vidi §6) |
| valute | **kratice na jeziku stranice**: interni ključevi ostaju LP/VP/GP/PP (napredak, javni_bodovi), a prikaz ide kroz `valutaKratica()` i redove `LP`, `VP`, `GP`, `PP` u `sucelje-XX.tsv`. DE: LP · **WP** · GP · PP (od 05.10.2026.). ES: **PL · PV · PG · PP** (*puntos de lección / vocabulario / gramática / práctica*) |
| Daily challenge | **Desafío diario** (množina *Desafíos diarios*); Weekly challenge → *Desafío semanal* |
| streak | **racha** (*racha de 5 días*, *puntos de racha*) |

**Načelo:** sve što korisnik čita ili s čime komunicira je na španjolskom (sučelje, objašnjenja,
upute, AI pomoć, naplata, e-mailovi); jedino što je hrvatsko je ono što se uči. Isto načelo vrijedi
i za njemački — rupe koje DE danas ima rješavaju se u fazi 0 za sve jezike odjednom (§7).

Hrvatski sadržaj, zvuk, slike i ključevi napretka **ne diraju se**. Španjolska verzija je
`index-es.html` s istim kodom i istim ključevima kao `index.html` i `index-de.html`, pa korisnik
može mijenjati jezik usred tečaja bez gubitka napretka.

## 1. Opseg

| dio | izvor | veličina |
|---|---|---|
| lekcije L0–L20, daily, `*-lekcija1.md` | `igre/*.md` → memorija | ~11 000 jedinstvenih stringova, ~143 000 riječi (~795 000 znakova) |
| sučelje | `index.html` + `pregledi.js` | ~1 160 stringova (~27 000 znakova) + 131 `@blobby` |
| rječnik | `prijevodi.jsonl` | 2 401 lema → `prijevodi-es.jsonl` + obrnuti ES→HR |
| Blobby | `BLOBBY_RECI` | generira se iz memorije (kao DE) |

Za usporedbu: DE je imao 16 912 stringova (s ponavljanjima), 0 grešaka strukture na kraju.

## 2. Faza 0 — poopćenje alata (prije ijednog prijevoda)

Cilj: drugi jezik ne smije značiti drugu kopiju skripti ni novih ~30 zakrpa koda.

### 2a. Zajednički alati

```
croland-jezici/
  alati/        izvuci.py, primijeni.py, provjeri.py, posao.py, izvuci-sucelje.py,
                izgradi-sucelje.py, spoji-rjecnik.py, osvjezi-jezik.js, sucelje_lib.py, _alati/ (acorn)
  jezici.json   { "de": {"mapa": "croland-de", "ime": "Deutsch", ...}, "es": {"mapa": "croland-es", ...} }
croland-de/     podaci DE (prijevod-de.tsv, sucelje-de.tsv, iznimke.tsv, igre/, rjecnik/) — ostaju gdje jesu
croland-es/     podaci ES (ista struktura)
```

- Svaka skripta prima `--jezik de|es`; stupac u memoriji je kod jezika (`en | es | puta | prvi_id | jezik`).
- Postojeće skripte u `croland-de/` zamijeniti tankim omotačima ili ih ukloniti kad `objavi.bat` prijeđe na nove.

### 2b. i18n kuke u `index.html` (umjesto zakrpa)

Sve što build danas krpa regexom prebaciti u sam original, tako da engleski izgleda točno isto:

1. **Registar jezika** na jednom mjestu: `STRANICE` u `<head>` i `JEZIK_STRANICA` + popis u Options (sada su dvostruko upisani, redci ~10 i ~3493).
2. **`tipIme(t)` / `cjelinaIme(c)`** u originalu (za EN vraća isto), s mapom po jeziku. Time nestaje `deTip`/`deCjelina` i cijela lista `ZAKRPE`.
3. **Množina**: `mn(n, 'word')` s pravilima po jeziku (ES: `palabra/palabras`, `ejercicio/ejercicios`, `nota/notas`).
4. **Rečenice slagane iz fragmenata** (npr. `' point</strong> is'`, `'</b> more → ' + tip`) pretvoriti u cijele rečenice s mjestima (`'{n} more → {tip}'`), da se red riječi može prevesti. Ovo je DE poznato ograničenje br. 1 i bez toga ES neće biti besprijekoran.
5. **HTML atributi u JS-u** (`aria-label`, `title`, `placeholder` razlomljeni preko više literala) složiti tako da ih ekstraktor vidi kao cijeli tekst.
6. **Sortiranje** po prijevodu: `localeCompare(b, JEZIK_APP)` umjesto fiksnog `'en'` (redci ~11537, ~11549) — `ñ` mora ići iza `n`.
7. Gumb prijevoda (`EN`/`DE`/`ES`) iz registra jezika.

### 2c. Regresijski test faze 0 (obavezno)

- `index.html` prije i poslije: isti skup vidljivih engleskih tekstova (usporedba izlaza `izvuci-sucelje.py`) i JS se parsira (acorn).
- DE build prije i poslije: `index-de.html` daje iste prikazane tekstove (razlike samo tamo gdje su fragmenti postali cijele rečenice, i te razlike ručno pregledati).
- Ručno u pregledniku: EN i DE — naslovnica, lekcija, rječnik, napredak, račun, promjena jezika.

### 2d. Stanje faze 0 — GOTOVO (05.10.2026.)

**Alati (2a).** `croland-jezici/` postoji: `jezici.json` (de aktivan, es upisan, neaktivan), `alati/` s
`izvuci.py, primijeni.py, provjeri.py, posao.py, izvuci-sucelje.py, izgradi-sucelje.py, spoji-rjecnik.py,
osvjezi-jezik.js, izgradi-jezike.py, novi-jezik.py, jezici_lib.py, _alati/` — sve s `--jezik de|es`, stupac u
memorijama je kod jezika. Skripte u `croland-de/` su tanki omotači (stare naredbe rade). `objavi.bat` korak 1b
zove `izgradi-jezike.py` (gradi sve aktivne jezike). Upute: `croland-jezici/PROCITAJ-ME.md`.
Usput: `izvuci.py` je bio nedeterministički kod izjednačenog glasanja hr/en (ovisio o `PYTHONHASHSEED`); sad
izjednačeno = en. Za DE to mijenja 2 retka memorije (`strip`, `popis`, oba `=`), lekcije su bajt po bajt iste.

**Kostur ES** (`novi-jezik.py --jezik es`): `croland-es/` s `iznimke.tsv` (kopija DE), praznim
`prijevod-es.tsv` (11 685 stringova), `sucelje-es.tsv` (1 936), `pregledi-es.tsv` (588), `segmenti.tsv`.
Ništa nije prevedeno. Suhi prolaz ES (primijeni, provjeri, build) radi: 0 grešaka strukture, build bez prijevoda
daje `index-es.html` = `index.html` (samo jezik i datoteke) — taj izlaz nije spremljen.

**i18n kuke (2b)** u `index.html` — build više ne krpa kod (nestali `ZAKRPE`, `deTip/deCjelina`, `MNOZINA`, `KRATKO`):
1. registar: `JEZIK_APP` čita `JEZIK_STRANICE` iz `<head>`; build mijenja samo taj redak, `<html lang>` i
   `<script src>`; `data-plus-XX.json` iz `JEZIK_APP`;
2. `tipIme()`, `cjelinaIme()`, `kljucCjeline()` i `IME_TIPA` (vrijednosti kroz `T_`); riječi-ključevi (`Daily
   challenge`, `Lesson`…) prevode se samo unutar `T_( )`;
3. množina: oba oblika kao cijeli `T_` (umjesto `mn()`; isto rješenje, bez posebnih pravila u kodu);
4. ~80 rečenica s brojem/imenom u sredini → cijeli `T_('…%1…')`. Nakon toga detektor lanaca `+` nalazi još samo
   natpise oblika „broj + riječ“ (*8 short ones*, *400 streak points*) i oznaku + vrijednost u zasebnim elementima,
   što je za ES isti red riječi; ako ih recenzija faze 2 nađe nespretnima, prebacuju se istim postupkom;
5. HTML atributi u JS-u (`aria-label`, `title`, `placeholder`) kao cijeli `T_`, `data-kratko` kao atribut;
6. sortiranje `localeCompare(…, JEZIK_APP)` (rječnik EN→XX i traka slova);
7. gumb prijevoda = `JEZIK_APP.toUpperCase()`.

**Regresijski test (2c)** — `croland-jezici/test/`, rezultat u `test/faza0/rezultat-testa.txt`:
- Preglednik (Playwright, lažni Supabase: prvo otvaranje, gost, prijavljen s pretplatom i napretkom; 124 ekrana:
  naslovnica, lekcije, pregledi cjelina, vježbe 8 cjelina svih formata, uvod testa, rječnik, test riječi, igre,
  daily, napredak, račun, opcije, mobitel, promjena jezika EN↔DE). Svaka verzija 2×, šum (animirani brojači) izdvojen.
  **EN: 0 razlika** u tekstu i atributima. **DE: samo namjerni ispravci** (vidi niže).
- Izrazi: svaka od 92 pretvorbe izvršena staro/novo s istim vrijednostima (N = 1 i 3): **EN 182/182 isto**;
  DE razlike samo na namjernim ispravcima. Pokriva i ekrane do kojih test ne dolazi (kraj igre, kraj testa, AI pomoć,
  račun/kodovi, promjena e-maila).
- acorn: JS u `index.html`, `index-de.html`, `pregledi-de.js` se parsira (build to sad provjerava sam i staje).
- Lekcije: `croland-de/igre/*.md` i igre u `data-de.js` bajt po bajt iste; `rjecnik-de.js`, `prijevodi-de.jsonl`,
  `rjecnik-de-hr.jsonl`, `pregledi-de.js` (sadržaj) isti; `provjeri.py --jezik de`: 0 grešaka; DE 16 914/16 914.

DE razlike (sve su ispravci starih grešaka zakrpa, pregledane ručno):
- „Tippe bei einem kroatischen Wort auf 🔊 neben dem Wort …“ → „Tippe auf 🔊 neben dem Wort …“ (dio `Tap ` bio je
  dijeljen između dvije rečenice);
- „Alle anzeigen 20 Level ▾“ → „Alle 20 Level anzeigen ▾“;
- `<strong>dictionary</strong>` u 7 savjeta o rječniku → `<strong>Wörterbuch</strong>`;
- „Lesson 4“ / „Lessons 2, 5“ u testu riječi i „Lesson 3“ u ladici napretka → „Lektion …“;
- „Daily challenge 12“ u „gdje“ popisu napretka → „Tägliche Challenge 12“;
- točkice dnevnih izazova u napretku „Tag 5 – 0/0“ → „0/55“: stari build je ključ `'Daily challenge'` prevodio
  i u kodu (`igreCjeline/maksCjeline/progOsv('Tägliche Challenge')`), pa DE nije nalazio dnevne vježbe;
- `title` „ 3 Wörter ins Wörterbuch aufnehmen“ bez razmaka na početku; rezervni ključ `PREGLEDI['Lektion 3']` → `'Lesson 3'`.

**Ključ napretka — riješeno 05.10.2026. (dodatak fazi 0).** Napredak vježbe sprema se pod
`cjelina|stranica|naslov`, a `naslov` je bio preveden (u DE različit za 1 557 od 1 613 vježbi), pa je korisnik
nakon promjene jezika vidio vježbe kao neodigrane (u testu: 76 odigranih → 3). Sada je ključ uvijek **engleski
naslov**: to je ključ pod kojim je već spremljen napredak svih engleskih korisnika, pa za njih nema nikakve
migracije (brojevi bi tražili prepisivanje svih računa i mijenjali bi se pri svakom umetanju vježbe; hrvatskih
naslova nema). `osvjezi-jezik.js` svakoj vježbi u `data-XX.js` upiše `kljuc` = engleski naslov (sparuje po redu iz
istog izvora i staje ako se cjelina, stranica ili format ne poklope), `kostur()` u `scripts/podijeli-podatke.js` ga
zadržava, a `kljucIgre()` u `index.html` ga koristi. `migrirajKljuceVjezbi()` jednom prepiše bodove spremljene pod
njemačkim naslovom (vrijedi bolji rezultat). Test: EN → DE i DE → EN daju iste brojke u napretku; EN prikaz i
engleska podjela javno/plaćeno nepromijenjeni. Razgovori s AI pomoći ostaju vezani uz naslov na jeziku stranice
(razgovor je ionako na tom jeziku).

§7: točka 1 (AI pomoć po jeziku, `jezik: JEZIK_APP` + upute za en/de/es u `pomoc/index.ts`), 2 (Paddle
`locale: JEZIK_APP`) i 5 (rječnik po jeziku, `prijevodZapisa`) već su bile napravljene prije faze 0; provjereno u kodu.

## 3. Pravila španjolskog (stil)

**Obraćanje i oblici**
- *tú* svugdje (Croland ima topao, kratak ton). Imperativ *tú*: *Toca*, *Escribe*, *Elige*, *Arrastra*.
- Nema *vosotros* ni oblika *-áis/-éis*, *os*, *vuestro*. Množina = *ustedes*.
- Latinoamerički vokabular: *computadora, celular, carro/auto, jugo, papa, durazno, departamento, manejar, jugar con*… Izbjegavati: *ordenador, móvil, coche, zumo, patata, melocotón, piso (stan), conducir, vale, guay*. Popis drži `croland-es/glosar-es.tsv` i provjera ga koristi.
- Bez voseo (*vos tenés*).

**Pravopis i tipografija**
- Obavezni obrnuti znakovi: *¿…?* i *¡…!*.
- Navodnici “…” (latinoamerička praksa), unutarnji ‘…’. Crtica s razmacima ` – ` kao u DE.
- Naslovi **malim slovima osim prvog** (*Desafío diario*, ne *Desafío Diario*); mjeseci i dani malim slovom.

**Tehnička pravila (ista kao DE)**
- Prevodi se samo engleski; hrvatski dio retka znak po znak isti; hrvatski krivo prepoznat kao engleski → `=`.
- `en:` prefiks ostaje (`en: La casa es grande.`). Markdown, `[praznine]`, `tab:` netaknuti.
- TRUE/FALSE → VERDADERO/FALSO. „Tap the English meaning“ → „significado en español“, „English above“ → „Arriba en español“.
- Isti engleski string = isti španjolski svugdje; ako kontekst traži drukčije, iznimka u `iznimke.tsv`.
- Kategorije razvrstavanja na hrvatskom (KAMO?, GDJE?…) ostaju hrvatske.
- Engleski nagovještaji u zagradama → španjolski oblik koji odgovara hrvatskom odgovoru: *(to him)* → *(a él)*, *(my)* → *(mi)*, *(a woman speaking)* → *(habla una mujer)*.

**Mostovi prema španjolskom** (gdje engleski tekst uspoređuje s engleskim)

| hrvatski | most za govornika španjolskog |
|---|---|
| izostavljanje zamjenice (*Pijem kavu*) | isto kao španjolski (*Tomo café*) — najjači most, koristiti ga |
| rod imenica (3 roda) | španjolski ima 2; srednji rod je novost, *-o/-a* često se poklapa (*-a* = ženski) |
| nema članova | španjolski ih ima — objasniti da *kuća* = *la casa / una casa* |
| padeži | novost; dativ/akuzativ zamjenica ↔ *le/lo/la* (*daj mu* ↔ *dale*), *a* osobni ↔ akuzativ živog |
| *se* (povratni) | isto kao *se* u španjolskom (*zove se* ↔ *se llama*) |
| dvostruka negacija (*nemam ništa*) | isto kao *no tengo nada* |
| *biti* | jedan glagol za *ser* i *estar* |
| vid (svršeni/nesvršeni) | djelomično kao *pretérito/imperfecto*, ali vid je u glagolu, ne u vremenu — oprezno, ne obećavati podudarnost |
| *Vi* (uljudno) | *usted*; *vi* (množina) = *ustedes* |

**Dvosmislenost *usted*/*ustedes*** (kao *Sie* u DE): hrvatsko *vi* pokriva i *ustedes* (množina) i *usted* (uljudno, jednina, pa *Vi*). Gdje to mijenja točan odgovor, uz rečenicu stoji *(formal)* ili *(plural)*. Isto za glagolske oblike 3. lica (*¿Tiene…?* = on/ona/Vi) — označiti *(usted)* kad je to namjera.

**Odavanje rješenja**: španjolski rod pridjeva ili člana u ponuđenom odgovoru ne smije otkriti hrvatski odgovor (npr. *la mesa* kad se pita za rod hrvatske imenice). Recenzija to provjerava posebno.

## 4. Infrastruktura (kontrolni popis)

- [ ] `index-es.html`, `data-es.js`, `rjecnik-es.js`, `pregledi-es.js` iz builda; `<html lang="es">`.
- [ ] Registar jezika: `es: 'index-es.html'`, u Options *Español — Explicaciones, pistas y traducciones en español.*
- [ ] `scripts/build.js`: `FILES` + `podijeliIProvjeri('data-es.js', 'data-es.js', 'data-plus-es.json')`.
- [ ] `uploadaj-sadrzaj.js`: `data-plus-es.json` na zadani popis.
- [ ] Edge Function `sadrzaj`: dopustiti `data-plus-es.json` i redeployati (lokalni `index.ts` isto).
- [x] `objavi.bat` korak 1b: gradi sve jezike iz `jezici.json` (ne samo DE) — faza 0, `izgradi-jezike.py`.
- [ ] GitHub Actions: commitane ES datoteke moraju biti u repozitoriju.
- [ ] Redirect URLs u Supabaseu već imaju `**`, pa pokrivaju `index-es.html` — samo provjeriti.

## 5. Redoslijed rada

| faza | posao | izlaz |
|---|---|---|
| 0 | poopćenje alata + i18n kuke + regresijski test | DE build radi preko novih alata, EN nepromijenjen — **gotovo 05.10.2026.** (§2d) |
| 1 | `glosar-es.tsv`: ključni pojmovi (Lesson, Practice, streak, points, nazivi padeža, gramatički termini, nazivi mini-igara) + popis zabranjenih španjolskih regionalizama | glosar koji poštuju sve iduće sesije |
| 2 | sučelje (`sucelje-es.tsv`) + pravni/računski tekstovi u sučelju | `index-es.html` koji se može otvoriti |
| 3 | rječnik 2 401 lema (`croland-es/rjecnik/es-*.tsv`) | `prijevodi-es.jsonl`, `rjecnik-es-hr.jsonl` |
| 4 | lekcije L0–L20, jedna razina po krugu (lekcija, vokabular, gramatika, praksa, test) | memorija `prijevod-es.tsv` 100 % |
| 5 | daily, `*-lekcija1.md`, Blobby | — |
| 6 | završna QA (§6) i ispravci | izvještaj `croland-es/IZVJESTAJ.md` |
| 7 | build, lokalna proba, objava | ES uživo |

**Radne upute i promptovi za sesije: `UPUTE-prijevod-es.md`; stanje: `croland-es/STANJE.md`.**
Postupak jednog kruga u fazi 4 isti je kao u `UPUTE-prijevod-de.md` (`posao.py dump/upis`, `primijeni`, `provjeri`), samo s `--jezik es`.
Razina se ne smatra gotovom dok ne prođe recenziju (§6b).

## 6. Kontrola kvalitete

### 6a. Automatske provjere (svaki krug, moraju biti 0)

1. Struktura: isti broj stranica, stavki i polja, iste `[praznine]`, `en:` prefiks, markdown (postojeći `provjeri`).
2. Zaostali engleski: nijedan string koji prepoznavanje označi kao engleski bez prijevoda ili iznimke.
3. Parovi `¿?` i `¡!`; navodnici “ ” zatvoreni.
4. Zabranjeno: *vosotros, os* (zamjenica), *-áis/-éis*, *vuestro*, voseo, regionalizmi iz glosara.
5. Glosar: ključni pojmovi uvijek isto prevedeni.
6. Hrvatski dio nepromijenjen (usporedba bajt po bajt s izvorom).
7. Sučelje: ES string dulji od 1,5× engleskog na gumbima/karticama → popis za ručnu provjeru izgleda.
8. JS parsira (acorn) za `index-es.html` i `pregledi-es.js`; build ne smije javiti `UPOZORENJE`.

### 6b. Neovisna recenzija (svaka razina)

Nova Opus 5.5 sesija, bez konteksta prevoditelja, dobiva EN izvor + ES prijevod + ova pravila i
traži probleme: smisao, prirodnost, ton, gramatiku, odavanje rješenja, *usted/ustedes*, mostove,
glosar. Nalaze upisuje u `croland-es/recenzija/razina-NN.md`; prevoditelj ih ispravlja ili
obrazlaže. Razina je gotova kad recenzija nema otvorenih nalaza.

### 6c. Provjera u pregledniku

Na mobilnoj i desktop širini: L0 cijela, po jedna vježba svakog formata, rječnik (sortiranje s *ñ*),
napredak, račun i pretplata, Options → promjena jezika EN ↔ DE ↔ ES usred lekcije.

### 6d. Izvorni govornik (preporuka prije lansiranja)

Model može doći vrlo blizu, ali ne može jamčiti 100 %. Prije javnog lansiranja neka izvorni
govornik (po mogućnosti iz Latinske Amerike) prođe barem sučelje, L0–L2 i tekstove plaćanja.
Nalazi idu kao ispravci u memoriju (jedan redak = ispravak svugdje).

## 7. Izvan sučelja: što još mora pratiti jezik (vrijedi za DE i ES)

Stanje 05.10.2026. — ovo njemačka verzija danas **nema**:

1. **AI pomoć** (`supabase/functions/pomoc`): upute modelu kažu *„Answer in simple English, even if the learner writes in another language“* i opisuju tečaj kao tečaj za govornike engleskog. Njemački korisnik zato dobiva odgovore na engleskom.
   Rješenje: preglednik šalje `jezik: JEZIK_APP`; funkcija bira upute po jeziku (*„Antworte in einfachem Deutsch…“*, *„Responde en español sencillo…“*), uz istu iznimku: hrvatski primjeri ostaju hrvatski. Poruke greške pomoći (*„The helper is very busy…“*) idu kroz prijevod sučelja.
2. **Paddle naplata**: `Paddle.Checkout.open(...)` se poziva bez jezika, pa Paddle uzima jezik preglednika — korisnik s engleskim preglednikom koji je izabrao Deutsch/Español dobiva engleski checkout. Rješenje: `settings: { locale: JEZIK_APP }`.
3. **E-mailovi prijave i obnove lozinke** (Supabase Auth): jedan predložak, engleski. Rješenje: predložak s blokovima po jeziku prema `user_metadata.jezik` (sprema se pri registraciji), ili barem dvojezični/trojezični e-mail.
4. **Terms / Privacy**: postoje samo na engleskom. Prijedlog: prevesti, uz rečenicu da je u slučaju spora mjerodavna engleska verzija.
5. **Rječnik korisnika**: riječi spremljene prije promjene jezika zadržavaju stari prijevod (DE ograničenje br. 2). Rješenje: spremati lemu, a prijevod čitati iz rječnika trenutnog jezika.

Redoslijed: točke 1, 2 i 5 u fazi 0 (kod), 3 i 4 u fazi 2 (tekstovi).

## 8. Što se ne radi

- Ne mijenja se hrvatski sadržaj, `data.js`, zvukovi ni slike.
- Ne prevodi se s njemačkog (samo uzor za odluke) — izvor je engleski.
- Ne uvodi se zasebna Supabase shema: ES je isti tečaj (kao DE), dijeli napredak.
