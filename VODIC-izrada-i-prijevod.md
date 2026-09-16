# Croland — kako je napravljen i kako ga ponoviti

Ovo je zapis iskustva iz projekta, za dvije namjene:

1. **Buduće web stranice** bilo kojeg sadržaja: što se pokazalo dobrim, što je koštalo vremena.
2. **Tečajevi španjolskog, francuskog i njemačkog** nastali slobodnim prijevodom Crolanda: što se prenosi kakvo jest, a što se mora ispočetka smisliti za svaki jezik.

Stanje: rujan 2026., Croland v0.12, 39 commitova, oko 1200 vježbi u 20 razina.

---

## Dio A — Arhitektura koja je proradila

### A1. Stack: statična stranica i unajmljeni backend

| Sloj | Rješenje | Zašto |
|---|---|---|
| Stranica | Jedan `index.html` (~540 KB, CSS i JS u istoj datoteci), vanilla JS, bez frameworka | Nema koraka gradnje za sam kod. Otvori se i radi, a Claude uređuje jednu datoteku. |
| Sadržaj | `data.js` (`window.PODACI`) i `rjecnik.js` (`window.RJECNIK`) | Učitavaju se običnim `<script>` tagom. Radi i s `file://` i s bilo kojim poslužiteljem. |
| Hosting | GitHub Pages, deploy kroz GitHub Actions (`.github/workflows/deploy.yml`) | Besplatno, a svaki push na `main` objavi stranicu. |
| Auth, baza, datoteke | Supabase: Email i Google prijava, Postgres s RLS-om, privatni Storage bucket, Edge Functions | Nema vlastitog poslužitelja za održavanje. |
| Naplata | Stripe Checkout, Customer Portal i webhook u Edge Function | Cijena i status pretplate nikad ne dolaze s klijenta. |
| Lokalno | `python -m http.server 8000` (`.claude/launch.json`, `pokreni-lokalno.bat`) | Pokreće se jednim klikom. |

Isprva je hosting bio na Netlifyju. Selidba na GitHub Pages i Supabase pojednostavila je lanac jer je sve osim naplate sad na dva mjesta. **Za novi projekt odmah kreni sa stackom GitHub Pages + Supabase (+ Stripe).**

### A2. Sadržaj se piše u Markdownu, a kod ga nikad ne sadrži

To je najvažnija odluka u projektu.

```
igre/*.md  ──(node osvjezi.js)──►  data.js  ──(npm run build)──►  dist/data.js (javno)
slike/, zvuk/  ──(isti korak)──►  mape slika i zvukova            zasticeno/data-plus.json (plaćeno)
rjecnik.jsonl, prijevodi.jsonl, rjecnik-en-hr.jsonl  ──►  rjecnik.js
```

- `data.js` je **generiran** i ne uređuje se ručno (to piše i u prvom retku datoteke).
- Svaka lekcija je jedna `.md` datoteka: `# Naslov`, `cjelina: Lesson 5`, pa stranice `## Naslov` + `format:` + meta-redovi + stavke `- a | b | c`.
- Parser (`osvjezi.js`, ~200 redaka) je namjerno glup: redak je naslov, meta ili stavka. Zato sadržaj može pisati bilo tko, i čovjek i AI, bez znanja JS-a.
- Postoji i `osvjezi.ps1` koji radi isto. Inačica za Node postoji jer CI ne radi na Windowsu. **U novim projektima drži samo inačicu za Node.**
- Sigurnosne kopije lekcija moraju biti u **podmapi** (`igre/_bak-.../`) jer parser čita svaki `.md` u `igre/`.

**Za druge stranice:** svaki sadržaj koji se ponavlja (proizvodi, recepti, članci, događaji) drži u Markdownu ili JSONL-u i generiraj JS/JSON skriptom. Kod i sadržaj se tada mijenjaju neovisno, a Claude može masovno prerađivati sadržaj bez rizika da pokvari logiku.

### A3. Imena datoteka su ključevi

- `slike/Ananas.webp` automatski postaje slika riječi *ananas*. Ključ je naziv datoteke malim slovima, bez završne interpunkcije.
- Zvuk radi isto (`zvuk/Kava je dobra.mp3`), uz NFC normalizaciju i sažete razmake.
- Nema ručnih mapiranja: novi medij vidi se čim se pokrene `osvjezi`.
- Dijakritika u nazivima datoteka radi (`Brašno.webp`), ali **normalizacija u NFC je obavezna**. Windows i macOS inače zapisuju isto slovo različito.

### A4. Plaćeni sadržaj stvarno zaštititi, ne samo sakriti

Prva verzija je sadržaj zaključavala samo u pregledniku, pa je svatko mogao otvoriti `/data.js` i dobiti sve. Popravak (`scripts/build.js` + `scripts/podijeli-podatke.js`):

- `dist/` se slaže po **allowlisti** datoteka i mapa. `.md`, `.sql`, `.env` i radne datoteke tako fizički ne mogu završiti na živoj stranici.
- `data.js` se dijeli: besplatne vježbe ostaju cijele, a od plaćenih ostaje samo **kostur** (naslov, bodovi, `zakljucano: true`, prazne stavke). Naslovnica tako može prikazati zaključane razine.
- Plaćeni dio (`zasticeno/data-plus.json`) ide u privatni Supabase bucket. Edge Function `sadrzaj` ga predaje tek nakon provjere pretplate.
- **Brava u buildu:** build pada ako javni dio sadrži stavke zaključane vježbe, ako se u javnoj mapi zvukova nađe skriveni zvuk (ključevi zvukova su same rečenice, pa bi odali sadržaj) ili ako zbroj javnih i plaćenih vježbi nije jednak izvorniku. *Radije neuspio build nego tiho objavljen sadržaj.*
- Pravilo pristupa (razina ≤ 1, Lesson 0, dnevni izazovi i mini-igre su besplatni) postoji na dva mjesta: `imaPristup()` u `index.html` i `jeBesplatna()` u buildu. Komentar na oba mjesta upozorava da moraju ostati usklađeni.

### A5. Nalazi o backendu prije lansiranja (vrijede za svaki projekt s naplatom)

Iz `PRED-LANSIRANJE-nalazi.md`, sažeto kao kontrolni popis:

- [ ] RLS uključen na **svakoj** tablici. Korisnik ne smije moći sam sebi upisati pristup (`komplimentarno`, `subscription_status`).
- [ ] Webhook provjerava Stripeov potpis nad sirovim tijelom zahtjeva.
- [ ] Idempotencija: događaj se zabilježi prije obrade. **Ako obrada pukne, zapis se briše i vraća se 500**, da Stripe pokuša ponovo. Inače korisnik plati, a pristup ne dobije.
- [ ] Napredak se sprema s `upsert`, ne s `update`. `update` bez retka tiho ne napravi ništa.
- [ ] Checkout provjerava postoji li već aktivna pretplata, da nema dvostrukih naplata.
- [ ] `SITE_URL` je zadan kao tajna, a ne izveden iz `Origin` zaglavlja.
- [ ] Portal link i ključevi prebačeni iz testnog u live način rada.
- [ ] Supabase **Redirect URLs** sadrže produkcijsku i lokalnu adresu. Inače OAuth vraća korisnika na stari Site URL.
- [ ] Supabase CLI se pokreće kroz `npx supabase@latest …` jer globalni npm install ne radi.

### A6. Napredak i stanje korisnika

- Sve je u jednom objektu `PROGRESS`. Za prijavljene se sinkronizira sa Supabaseom, a lokalno živi u `localStorage`.
- **Najbolji rezultat se čuva** i slabiji pokušaj ne oduzima bodove. To se korisniku i napiše prije ulaska u vježbu.
- Postavke koje se trebaju zadati *prije* učitavanja sa servera, poput nasumične teme pri prvom posjetu, idu u **zaseban ključ** (`croland-pocetni-izgled`). Inače ih hidratacija pregazi.
- Mini-igre imaju vlastite ključeve (`croland-mini-<id>`) i zajedničku evidenciju naučenih riječi (`croland-mini-ucenje`).
- Društveni dio (prijatelji, ID od pet znakova bez znakova koji se lako zamijene, *points only* kao zadano) napravljen je migracijom koja je **prije isporuke puštena na pravom Postgresu** sa scenarijem od tri korisnika. Isplatilo se.

---

## Dio B — Dizajn i sučelje

### B1. Tri uređaja, tri dizajna

Rastezljivi dizajn (`vw`, `clamp`) nije bio dovoljan: tablet je dobivao stisnuto računalo. Pravilo sada glasi:

- Pragovi: **≤ 639.98px mobitel · 640–1023.98px tablet · ≥ 1024px računalo**, plus `(pointer: coarse)`, `(hover: none)` i mobitel u pejzažu `(orientation: landscape) and (max-height: 30rem)`.
- Svaki uređaj ima **vlastitu tipografsku ljestvicu** (`--t-*`) i vlastiti korijen pisma (`--baza`). Omjer naslova i tijela je 1.36 / 1.58 / 1.68.
- **Mobitel je najkrupniji, računalo najgušće.** Miš pogađa precizno i cijeli ekran se vidi odjednom, pa razmaci idu mobitel > tablet > računalo. S monitorom raste prazna margina, ne kartice. („Sve mi se čini nepotrebno rašireno.“)
- **Sve stranice dijele isti stupac** (100% / 52rem / 54rem). Stranica uža od ostalih uzrokuje skakanje sadržaja pri navigaciji.
- `scrollbar-gutter: stable` na `html` uklanja titranje od 8px između stranica sa skrolom i bez njega.
- Svi stilovi za uređaje su u **jednom bloku na dnu CSS-a**, bez prijeloma razasutih po datoteci.
- Mini-igre su izuzete.

### B2. Zaglavlje koje se ne lomi

Tri stvari moraju stajati zajedno:

1. `grid-template-columns: 1fr minmax(0, max-content) 1fr`. Mora biti **`max-content`, ne `auto`**.
2. Desna skupina nema `min-width: 0` (osim na mobitelu).
3. `nav { flex-wrap: nowrap; overflow-x: auto }` i `nav a { flex: none }`.

Stupci mreže se zadaju izričito (`grid-column`), inače desna skupina sklizne u sredinu kad je nav skriven.

### B3. Ostale lekcije o sučelju

- **Naslovnica služi samo odluci „što sada“.** Statistika je premještena na zasebnu stranicu Progress.
- **Karusel pomiče najviše jednu karticu po potezu.** Nativni `scroll-snap` jednim zamahom leti predaleko, a CSS tu brzinu ne može ograničiti, pa to radi JS.
- `position: sticky` unutar okvira s `overflow-x: auto` ne radi prema ekranu. Tada treba `overflow-y: clip`.
- Visinu zaglavlja CSS ne može sam pročitati, pa je JS mjeri u `--visinaZaglavlja` (za iframe mini-igre visine `100dvh`).
- Teme (5) × pisma (6), prvi posjet dobiva nasumičnu kombinaciju. Veličina sučelja ima tipke `− +`, a pisma s drukčijom optičkom veličinom dobivaju korekciju (`KOREKCIJA_PISMA`).
- Fontovi s Google Fonts: Space Grotesk za naslove i brojeve, Public Sans za tekst. Caveat se učitava tek kad zatreba (ceduljice).
- **Slike u WebP**, najveća strana 512px, kvaliteta 82 (`konvertiraj-slike.js`, sharp). Ukupno 215 MB je palo na 4,5 MB. Originali ostaju u `slike nekompresirano/`. Skripta je idempotentna i ima `--probno`.

### B4. Jezik sučelja i jezik gradiva

- **Sučelje je na engleskom, gradivo na ciljnom jeziku.** Naslovi, gumbi, upute i poruke su engleski, a riječi, rečenice, dijalozi i replike su hrvatski (uz prijevod).
- Gdje bi prijevod riješio zadatak, on je **skriven** iza `👁 translation` (`CL.skritEN`).
- Gramatički pojmovi se prikazuju engleski, a naziv na ciljnom jeziku ide u zagradu.

---

## Dio C — Didaktički model (jezgra koja se prevodi)

### C1. Struktura tečaja

**20 razina × 5 vrsta cjelina:**

| Vrsta | Uloga |
|---|---|
| **Lesson** | Uvodi jednu gramatičku ideju kroz tekst, drilove i dijalog (15–19 stranica). |
| **Vocabulary** | 40–60 riječi razine: kartice, parovi, memorija, brzina. |
| **Grammar** | Pravilo i paradigme (`- tab:` tablice), pa drilovi. |
| **Practice** | Kratke priče s prijevodom i pitanja o razumijevanju. |
| **Test** | Provjera s pragom (70–80 %), ograničenim vremenom i više formata. |

Uz to postoje **Lesson 0** (abeceda i izgovor, posebne mehanike: baloni, vlak, slova, zid, spajanje), **Daily challenge** (dnevna priča s premisom, npr. „23:47, zadnji tramvaj“) i **13 mini-igara**.

Svaka razina ima jednu **nosivu rečenicu** (`popis lekcija.md`, npr. *More je plavo i toplo.*) koja sažima što polaznik tada zna reći.

### C2. Formati vježbi (18 mehanika)

Broj stranica u cijelom tečaju: tekst 290 · izbor 175 · upis 151 · kartice 131 · razvrstavanje 91 · slaganje 77 · parovi 75 · brzina 63 · nastavak 41 · dijalog 32 · memorija 32 · poredak 24 · provjera 20 · spajanje 11 · baloni/slova 6 · pamti 3 · zid 1.

Sintaksa je u `UPUTE-prosirenje-lekcija-10-20.md`, odjeljak 1. Najvažnije:

- `izbor`: `- pitanje | točan | krivi | krivi`, prvi odgovor je uvijek točan (miješa se pri prikazu).
- `nastavak`: `nastavci: m | š | -` i `- Rečenica s ___ | gloss | m`. Crtica znači „bez nastavka“.
- `razvrstavanje`: `stupci: A | B` i `- stavka | A`.
- `tekst`: `[riječ]` u rečenici je polje za upis, a `[je/jest]` prima oba oblika. `- tab: a | b | c` je redak tablice.
- Znak `|` ne smije biti u tekstu stavke.

Gustoća koja se pokazala dobrom (L1–L9, na nju su podignute L10–L20): `info:` na **svakoj** stranici, ≥ 10 stavki po drilu, zagrijavanje na brzinu s 10–12 stavki, jedan `nastavak` i jedan tekst za čitanje po lekciji, checkpoint s 12 pitanja, napomena „passive words“ uz tekstove i **oba roda polaznika** u oblicima koji ih razlikuju.

### C3. Bodovanje

`osvjezi.js`, tri sastojka tim redom:

1. **Baza po formatu** (tekst 4, kartice 5, izbor 6, upis 7, provjera 10…).
2. **Količina sadržaja** kao uska korekcija, najviše ±20 %.
3. **Razina** kao glavni pokretač, geometrijski ×1.11 po razini (R10 ×2.56, R20 ×7.26).

Tekst-stranica **bez ijedne praznine vrijedi 1 bod**. Prije je klik na „Done reading“ vrijedio kao vježba. Zato svaka stranica s pravilom završava odlomkom `**Now you write them.** … [x] … [y] … [z]`.

Bodovi se vode u četiri valute (LP, VP, GP, PP), svaka sa svojom bojom. Dnevni izazov se ne skalira i uvijek vrijedi 5 + 5 + 5 + 5.

Bodovi su vezani uz `sortkljuc` i naslov vježbe. **Ne mijenjaj naslove i redoslijed bez potrebe**, inače se osvojeni bodovi i ocjene revizije odvoje od vježbe.

### C4. Pravila kvalitete sadržaja (naučena na greškama)

1. **Krivi odgovor mora biti netočan sam po sebi**, a ne samo izbjegavajući ili pogrešan u kontekstu. Primjer: „Dunav je najduža rijeka u Africi.“
2. **Oblik odgovora ne smije odati točan.** Kad je 63 % točnih odgovora počinjalo sa „Znači,“, zadaci su se rješavali bez čitanja. Za svako površinsko obilježje (početak, duljina, upitnik, prvo lice) izbroji koliko puta ga ima samo točan odgovor. **Sve iznad ~33 % je trag koji se može iskoristiti.** Oznaku stavi na 2 od 3 opcije, neovisno o točnosti.
3. Replike igrača po mogućnosti **rodno neutralne**. Gdje to nije moguće, ponudi oba roda.
4. Paradigme idu u tablicu, nikad u odlomak. U tablicama koristi `(noun)`, a ne `[noun]`, jer su uglate zagrade polja za upis.
5. Dugi tekst se ne čita do kraja, pa odlomak s podebljanom najavom postaje odjeljak koji se otvara klikom (kad stranica ima ≥ 2 odjeljka i ≥ 400 znakova).
6. **Blobby (maskota) ima zapisan glas** (`blobby-glas.md`), doslovan popis njegovih rečenica. Lik ostaje dosljedan kroz 20 razina i kroz više ljudi ili sesija koje pišu.
7. `spajanje` (slika ↔ riječ) smije koristiti samo riječi za koje slika **postoji**. Provjeri prije pisanja i ne koristi format ako ih nema barem 8.
8. Standardni jezik: srbizmi i nestandardne riječi dobivaju standardnu istoznačnicu i jasnu napomenu (`foka` → `tuljan`), a razgovorno se ne označava kao pogrešno.

### C5. Rječnik

- `rjecnik.jsonl`: jedna lema po retku, s vrstom riječi, rodom, živošću, **svim oblicima** (14 padežnih oblika za imenice), sinonimima i napomenom. Glagoli imaju vidskog partnera (`svrseni`/`nesvrseni`).
- `prijevodi.jsonl` (lema → en[]) i `rjecnik-en-hr.jsonl` (en → hr[]) daju dva smjera.
- JSONL je izabran jer se diff čita redak po redak, a Claude ga lako proširuje u serijama. Proširenje s 1586 na 2032 leme opisano je u `PROSIRENJE-rjecnika.md`.
- Rječnik pokreće lebdeći rječnik (klik na riječ bilo gdje), Full dictionary, Word test i evidenciju naučenih riječi.
- **Pravilo:** svaka lema koju polaznik vidi mora imati prijevod. Prije je 39 bilo bez njega.

### C6. Mini-igre

- Svaka je **samostalna HTML datoteka** koja radi na dvoklik: bez builda, poslužitelja i vanjskih biblioteka. U aplikaciji se otvara u iframeu.
- Zajednička jezgra `CL` (kategorije, `svjezeRijeci`, `zaPonoviti`, `skritEN`) i sadržaj u `mini-igre/_sadrzaj/` (`rijeci.js`, `recenice.js`, `mediji.js`) ugrađuju se skriptom `ugradi.js`. Iznimka je igra 13 (gradovi) sa sadržajem ugrađenim izravno.
- Pomoćni popisi (likovi, mediji koji nedostaju) **generiraju se iz podataka igre**, ne pišu se ručno.
- Nepotpuni skup medija ne smije srušiti igru. Slika koja nedostaje zamjenjuje se papirnatim panelom (`onerror`).
- Grafika: Kenney asseti (`kenney/`) i Python skripte za atlas, paletu i teren (`mini-igre/*.py`).

---

## Dio D — Radni proces s Claudeom

### D1. Petlja revizije sadržaja

`revizija-lekcija.html` je alat koji je vrijedio više od bilo koje pojedinačne lekcije:

**igraj vježbu → prolaz ili izbaci → bilješka → izvoz (.md/.csv/.json) → Claude mijenja `igre/*.md` → `osvjezi` → uvezi stari izvoz i nastavi gdje si stao.**

- Stanje je u `localStorage`, a izvoz se može uvesti natrag.
- Uz svaku ocjenu sprema se **otisak sadržaja**, pa filtar „izmijenjeno nakon ocjene“ pokazuje što je dirano nakon odobrenja.

**Za druge projekte:** kad sadržaja ima stotine jedinica, prvo napravi alat za pregled i ocjenjivanje, pa tek onda masovno uređuj.

### D2. Dokumenti koji su se pokazali korisnima

| Vrsta dokumenta | Primjer | Svrha |
|---|---|---|
| Brief za Claudea | `UPUTE-prosirenje-lekcija-10-20.md` | Dijagnoza u tablici (prije / cilj), sintaksa, ogledni gotov primjer. Nova sesija radi bez objašnjavanja. |
| Popis tečaja | `popis lekcija.md` | Cijeli kurikulum u jednoj tablici. |
| Postavljanje računa | `SETUP.md` | Koraci koje samo vlasnik računa može napraviti, redoslijedom ovisnosti. |
| Nalazi prije lansiranja | `PRED-LANSIRANJE-nalazi.md` | Pregled bez izmjena, po prioritetu. **Zastarjeli dokument se označi na vrhu, ne briše se.** |
| Posljedice promjene | `PROGRESS-posljedice.md` | Što je u kodu, što treba pokrenuti u bazi, što je ostalo za odlučiti. |
| Uputa za postupak | `KONVERZIJA-SLIKA-uputa.md` | Točne izmjene koda uz izmjerene brojke. |
| Glas lika | `blobby-glas.md` | Dosljednost tona. |
| Memorija | `.claude/.../memory/` | Pravila koja nisu vidljiva iz koda („zašto“ i „kako primijeniti“). |

### D3. Navike koje su se isplatile

- **Komentari objašnjavaju zašto**, s datumom i citatom zahtjeva kad je odluka neočekivana („traženo 13.09.2026.: …“). Tako se sprječava da netko „popravi“ namjernu odluku.
- **Mjeri umjesto da procjenjuješ:** broj tragova u odgovorima, veličinu slika, gustoću stranica po lekciji.
- **Provjere u buildu** umjesto pravila koja se pamte.
- Sigurnosne kopije prije velikih zahvata (`.bak-…`), s tim da se **ne gomilaju u korijenu**. Korijen ovog projekta ih ima previše (`index.html.bak-*`, `*.jsonl.bak2`, `__kartice-tmp.html`). U novom projektu za to služi git ili mapa `_arhiva/`.
- Commit poruke su trenutno samo datumi („Azuriranje sri 16.09.2026.“). Za buduće projekte vrijedi kratak opis promjene jer se povijest inače ne može pretraživati.

---

## Dio E — Prijevod tečaja na španjolski, francuski i njemački

### E1. Što se prenosi bez izmjena

- `index.html`: cijeli player, 18 mehanika, Progress, rječnik, teme, tri uređaja, auth i naplata.
- `osvjezi.js`, `scripts/build.js`, `podijeli-podatke.js`, deploy workflow i Supabase funkcije.
- Struktura 20 × 5, Lesson 0, dnevni izazovi, bodovanje, pravila kvalitete iz C4.
- Revizijski alat i petlja rada.
- Sučelje na engleskom (ciljna publika ostaje anglofona).

**Preporuka:** jedan kod, više sadržaja. Umjesto kopiranja repozitorija po jeziku, izdvoji iz `index.html` sve što je hrvatsko u **jezični profil** (npr. `jezik.js`) i neka build bira mapu sadržaja (`sadrzaj/hr/`, `sadrzaj/es/`…). Popravak u playeru tada vrijedi za sve tečajeve odjednom. Ako to nije izvedivo odmah, kopiraj repozitorij, ali popiši mjesta iz E2 kao prvi zadatak.

### E2. Što je u kodu vezano uz hrvatski (treba parametrizirati)

- **Hrvatska tipkovnica** (č ć đ š ž): ES treba á é í ó ú ü ñ ¿ ¡, FR é è ê ë à â ç î ï ô û ù œ, DE ä ö ü ß.
- **Normalizacija pri provjeri upisa:** smije li se prihvatiti odgovor bez dijakritike? Za ES i FR naglasak može mijenjati značenje (*si/sí, ou/où*), pa blaga provjera s porukom „watch the accent“ radi bolje od odbijanja. Njemački `ss` umjesto `ß` i `ae` umjesto `ä` treba prihvatiti uz napomenu.
- **Velika slova:** u njemačkom su imenice uvijek velikim slovom, pa usporedba bez obzira na velika i mala slova tamo sakriva grešku.
- **Traka abecede i Lesson 0:** hrvatski je fonetski („čitaj kako piše“), a francuski ni približno. Lesson 0 se za FR i ES radi ispočetka (vidi E4).
- **Shema oblika u rječniku:** 14 padežnih oblika (`Njd`…`Imn`) za imenice i vidski par za glagole su specifično hrvatski. Svakom jeziku treba svoja shema (E3).
- **Mapa zvukova i slika:** ključevi su riječi ciljnog jezika. Slike se mogu dijeliti ako se uvede neutralni ključ (vidi E5).
- Nazivi formata i polja u kodu (`izbor`, `stavke`, `cjelina`) su hrvatski. To je interno i može ostati.
- `lang` atributi, naziv i domena, Stripe proizvod, Terms/Privacy, `SITE_URL`, Supabase bucket po jeziku.

### E3. Rječnik po jeziku

Zajednička polja: `lema`, `vrsta`, `sinonimi`, `napomena`, prijevodi u oba smjera. Zatim:

| | Imenica | Glagol | Pridjev | Posebno |
|---|---|---|---|---|
| **HR** | rod, živost, 7 padeža × 2 broja | vid i partner, prezent ja-oblik | rod, slaganje | srbizmi i standard |
| **ES** | rod, množina | 3 konjugacije, nepravilni, *ser/estar*, participi, subjuntivo | rod i broj | ES vs. latinoamerički (*coche/carro*, *vosotros*) |
| **FR** | rod (+ član!), množina | 3 skupine, *être/avoir* u passé composé, participi | rod i broj, položaj (BAGS) | izgovor (IPA ili napomena), liaison, elizija |
| **DE** | rod (+ član!), množina, 4 padeža, n-deklinacija | jaki/slabi, odvojivi prefiksi, *haben/sein*, Präteritum i Partizip II | jaka/slaba/mješovita deklinacija | DE/AT/CH varijante, velika slova |

**Kartice i drilovi u FR i DE uvijek uče riječ sa članom** (*la maison*, *das Haus*). Rod bez člana se ne pamti.

### E4. Gramatička os: što slobodni prijevod znači

Hrvatski tečaj je složen oko **roda → padeža → vida**. Ta os se ne prevodi. Za svaki jezik ostaju **teme razina i situacije** (opis svijeta, osobe, dan, obitelj, kupovina, putovanja, sport…), a gramatička kralježnica se slaže iznova. Predložak za prve razine:

| Razina | HR (postojeće) | ES | FR | DE |
|---|---|---|---|---|
| 0 | abeceda, fonetsko čitanje | izgovor gotovo fonetski: *ll, ñ, j, c/z*, naglasak | **izgovor i pravopis kao velika tema**: nijema slova, nazali, liaison | izgovor: *ei/ie, sch, ch, ü/ö/ä*, velika slova |
| 1 | *je*, rod → nastavak pridjeva, **bez članova** | *es/está*, **članovi** el/la, slaganje pridjeva | *c'est / il est*, **članovi**, slaganje | *ist*, **der/die/das**, pridjev iza *ist* ostaje nepromijenjen |
| 2 | zamjenice, *biti*, ti/vi | *ser* sve osobe, *tú/usted* | *être*, *tu/vous* | *sein*, *du/Sie* |
| 3 | prezent, tri skupine | prezent -ar/-er/-ir | prezent -er, pa -ir/-re | prezent pravilni, pa *haben* |
| 4 | veznici i obitelj | *y, pero, porque* + posvojni | *et, mais, parce que* + posvojni | *und, aber, denn* (**weil** i red riječi kasnije) |
| 5 | ženski akuzativ | *ser vs. estar* ili *hay* | partitiv *du/de la* (kupovina!) | **akuzativ** *den/einen* (kupovina) |

Zadrži **„jednu novu ideju po lekciji“** i nosivu rečenicu razine. Uvodna rečenica Lesson 1 („you already speak some Croatian: hotel, banana…“) ima prirodne ekvivalente: kognati su u ES i FR vrlo brojni, a u DE su bliski engleskom (*Haus, Hand, Butter*).

Gdje hrvatski ima „olakšanje“ koje se u marketingu naglašava (*no articles, spelling you can always trust*), svaki jezik treba **svoje iskreno olakšanje**. ES: pravopis i izgovor. FR: puno zajedničkih riječi s engleskim. DE: srodnost s engleskim, predvidljiv izgovor.

### E5. Tijek rada za novi jezik

1. **Kurikulum:** napiši `popis lekcija.md` za jezik (20 razina × 5 vrsta + nosiva rečenica), prema E4. Odobri ga prije ikakvog pisanja lekcija.
2. **Rječnik:** definiraj shemu (E3), pa leme razine 1–5, pa prijevode. Provjeravaj da svaka riječ iz lekcija postoji u rječniku.
3. **Glas maskote** na novom jeziku (`blobby-glas-es.md`). Humor se prilagođava, ne prevodi.
4. **Lesson 1 kao ogledna lekcija** u punoj gustoći (C2), odigrana i ocijenjena u revizijskom alatu. Tek onda brief za ostale lekcije po uzoru na `UPUTE-prosirenje-lekcija-10-20.md`.
5. **Lekcije u serijama** (npr. po 5 razina), svaka serija kroz petlju revizije. Uz svaku seriju pokreni mjerenje tragova u krivim odgovorima (C4.2).
6. **Mediji:** slike su uglavnom neovisne o jeziku. Uvedi neutralni ključ slike (npr. engleski: `apple.webp`) i mapiranje po jeziku, ili kopiraj i preimenuj skriptom. Zvuk se snima ispočetka: izvorni govornik, ili TTS provjeren uhom (postoji `generiraj-zvuk.ps1` i popis `nedostaje-zvuk.txt`).
7. **Dnevni izazovi i mini-igre:** mehanike ostaju, premise i lokalni sadržaj se mijenjaju. „Towns of Croatia“ postaje npr. put kroz Španjolsku ili regije Francuske (isto pravilo: lanac gradova, 4 razmjene po gradu).
8. **Kulturni sloj:** imena likova, novac (€ vrijedi za ES, FR i DE, ali ne za LatAm i CH), hrana, geografija, formalno obraćanje.
9. **Build i objava:** zaseban Stripe proizvod ili jedna pretplata za sve jezike (poslovna odluka), `ZADNJA_BESPLATNA_RAZINA` po jeziku, brava u buildu ostaje ista.

### E6. Zamke kod prevođenja s hrvatskog izvora

- **Ne prevodi vježbe redak po redak.** Vježba „ženski akuzativ -a → -u“ u francuskom nema smisla. Prevodi *situaciju* (tržnica) i napiši drill za gramatiku *te* razine.
- Distraktori u `izbor` zadacima se pišu ispočetka. Prevedeni često postanu točni ili dvosmisleni.
- `nastavak` (odaberi nastavak) je izrazito padežna mehanika. U ES i FR preusmjeri je na glagolske nastavke i slaganje pridjeva, a u DE na nastavke članova i pridjeva.
- `razvrstavanje` po rodu je u DE i FR još važnije nego u HR (član!). U ES rod je predvidljiviji, pa su bolji stupci *ser/estar* ili *por/para*.
- Oba roda polaznika: u HR je to perfekt i kondicional. U ES i FR pridjevi o sebi (*estoy cansado/cansada*, *je suis fatigué/fatiguée*), a u DE gotovo nikad, osim zanimanja (*Lehrer/Lehrerin*).
- Primjeri s *vi/Vi* i *ti*: svaki jezik ima drukčiju granicu formalnosti (DE *Sie* je strože od HR *Vi*).
- Pazi na regionalne varijante od prvog dana. Izaberi jednu (npr. ES iz Španjolske, DE iz Njemačke) i napiši je u rječnički `napomena` za drugu, kao što HR tečaj radi sa srbizmima.

---

## Dio F — Kratki kontrolni popis za bilo koju novu stranicu

- [ ] Sadržaj u `.md`/`.jsonl`, generator u Nodeu, generirane datoteke označene „ne uređivati“.
- [ ] Mediji s ključem u imenu datoteke, NFC, WebP 512px.
- [ ] Build po allowlisti u `dist/`, deploy kroz Actions, `.nojekyll`.
- [ ] Plaćeni sadržaj nikad u javnom dijelu, s provjerom u buildu.
- [ ] Kontrolni popis za backend iz A5.
- [ ] Tri rasporeda (mobitel / tablet / računalo) u jednom CSS bloku, zajednički stupac, `scrollbar-gutter: stable`.
- [ ] Alat za pregled i ocjenjivanje sadržaja prije masovnih izmjena.
- [ ] `SETUP.md` za korake s računima, brief-dokumenti za Claudea, memorija za pravila koja nisu vidljiva iz koda.
- [ ] Komentari s „zašto“, zastarjeli dokumenti označeni, radni otpad izvan korijena.
