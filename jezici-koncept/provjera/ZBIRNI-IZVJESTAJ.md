# Zbirni izvještaj — provjera i dorada koncepata (13 jezika)

21.10.2026 · Popis kontrola v1.0 · Pojedinačni izvještaji: `provjera/<kod>-izvjestaj.md` (na kraju svakog je odjeljak „Primjena ispravaka (v0.2)“).

## 1. Pregled

Težina nalaza: **B** = blokira · **V** = važno · **K** = kozmetika. Status primjene broji svaki nalaz jednom;
„+ odl.“ = od primijenjenih nalaza koliko je dio odluke ujedno prenesen u otvorene odluke.

| Jezik | Presuda | Nalaza | B | V | K | Primijenjeno (+ odl.) | Djelomično | Odbačeno | Samo u odluke | Druga provjera |
|---|---|---|---|---|---|---|---|---|---|---|
| Arapski | prolazi uz ispravke | 31 | 3 | 19 | 9 | 31 (2) | 0 | 0 | 0 | ne |
| Njemački | prolazi uz ispravke | 24 | 0 | 14 | 10 | 21 (2) | 1 | 1 | 1 | kratka, nakon prijenosa ‡ u plan |
| Engleski | prolazi uz ispravke | 29 | 2 | 19 | 8 | 29 (2) | 0 | 0 | 0 | ne |
| Esperanto | prolazi uz ispravke | 24 | 1 | 14 | 9 | 22 (2) | 0 | 0 | 2 | ne (nakon odluke o cilju) |
| Španjolski | prolazi uz ispravke | 22 | 2 | 13 | 7 | 21 (2) | 1 | 0 | 0 | ne |
| Francuski | prolazi uz ispravke | 31 | 2 | 18 | 11 | 31 (1) | 0 | 0 | 0 | ne |
| Interslavenski | **vraća se** | 31 | 2 | 23 | 6 | 30 (7) | 0 | 1 | 0 | **da** |
| Talijanski | prolazi uz ispravke | 26 | 1 | 10 | 15 | 26 (1) | 0 | 0 | 0 | ne |
| Japanski | prolazi uz ispravke | 26 | 2 | 17 | 7 | 26 (4) | 0 | 0 | 0 | ne |
| Latinski | **vraća se** | 25 | 5 | 11 | 9 | 25 (5) | 0 | 0 | 0 | **da** |
| Portugalski | prolazi uz ispravke | 27 | 3 | 14 | 10 | 25 (0) | 0 | 0 | 2 | ne |
| Ruski | prolazi uz ispravke | 28 | 3 | 13 | 12 | 28 (4) | 0 | 0 | 0 | preporučena |
| Kineski | prolazi uz ispravke | 21 | 2 | 12 | 7 | 21 (3) | 0 | 0 | 0 | ne |
| **Ukupno** | 11 prolazi, 2 vraća se | **345** | **28** | **197** | **120** | **336** | **2** | **2** | **5** | |

Odbačeni i djelomično primijenjeni nalazi (obrazloženje u izvještajima):
- **de #5** odbačen: *kein* ostaje u L4 (isti nastavci kao *ein*, tema i nosiva rečenica ga traže).
- **de #6** djelomično: *konnte / musste* premješteni u L11 (‡); nastavci pridjeva u dativu ostaju u L17, *ob* u L20 (L13 bi postala preteška).
- **es #8** djelomično: odnosni *que* ostaje u L17, jer su L12–L13 pune.
- **isv #27** odbačen (zamijenjen): rečenica L8 zbog nove rute govori o Ljubljani, ne o Beogradu.

Dorada u ovoj sesiji: `ar, en, eo, es, fr, it, la, pt, zh` bili su djelomično dorađeni (dovršeno i zapisano); `de, isv, ja, ru` dorađeni u cijelosti.
Kod svih 13 provedena je završna provjera kralježnice (sve nosive rečenice prema odj. 5 dorađene datoteke).

## 2. Otvorene odluke za vlasnika

Oznaka **[blokira]** = mora se odlučiti prije faze 3 za taj jezik. Uz svaku je prijedlog iz koncepta.

### Globalne (`00-pregled.md`, odj. 3)

1. ~~Fiksnih 20 razina ili po jeziku~~ — **odlučeno 21.10.2026.**: broj razina fleksibilan, tečaj ≈ 5–6 mjeseci.
2. ~~Jedan lik ili zajednički~~ — **odlučeno 21.10.2026.**: priče nisu povezane, lik po jeziku.
3. **Upis za druga pisma** — prijedlog: vlastita tipkovnica za ćirilicu i arapsko pismo, pinyin / romaji s izborom znaka; ruska tipkovnica fonetska kao zadana za HR i EN; ćirilica u interslavenskom kao prekidač.
4. **Zvuk / TTS** — prijedlog: snimljeni govor za L0 i nosive rečenice kod latinskog, esperanta i interslavenskog; TTS s označenim naglaskom / čitanjem za ruski i japanski.
5. ~~Jedinstvena formulacija cilja~~ — **odlučeno 21.10.2026.**: ciljevi prilagođeni svakom jeziku.
6. **Tolerancija upisa i provjera odgovora** — prijedlog: dijakritik smije izostati uz upozorenje samo kad ne nastaje druga riječ; dopuštene varijante i više redoslijeda (slobodan red riječi) se prihvaćaju.
7. **Leksičke iznimke od pravila kralježnice** (npr. latinska 3. deklinacija od L1) — prijedlog: dopustiti uz zapis u odj. 5.

### Arapski
- ~~Samo MSA ili MSA + dijalekt~~ — **odlučeno 21.10.2026.**: samo MSA (dijalekt samo kao kulturna napomena u L1).
- Pravilo padežnih nastavaka — prijedlog: radno pravilo (puni nastavci unutar rečenice, pauzalni oblik pred pauzom), isto za TTS.
- Cilj i opseg — prijedlog: A1 + prepoznavanje A2 uz isti opseg.
- Upis harakata — prijedlog: ne, osim u L0b.
- Brojke — prijedlog: zapadne u sučelju i upisu, istočnoarapske od L4 za prepoznavanje.
- Transliteracija — prijedlog: DIN 31635; uz tekst u L0, na dodir L1–L6, od L7 samo za nove riječi.
- L0c — prijedlog: zasad ne.
- Zvuk — TTS provjeriti na pravilu o pauzi; dijalekt vjerojatno snimljen.

### Njemački
- **Prijedlozi izmjene postojećeg plana (‡)** — cilj, L0, nosive L1 / L8 / L10 / L12, fraze L4 / L9 / L11, *konnte* u L11, test L19–L20, priča; prijedlog: prihvatiti sve i prenijeti u `DE-plan-tecaja.md` i `DE-gramaticka-kraljeznica.md`.
- Poruka nakon Modula A1 — prijedlog: *„You've completed the A1 course“*.
- Modul nakon L6 — prijedlog: dodati kratki modul (15–20 min).
- Zamjenski upis (*ae / oe / ue / ss*) i velika slova — prijedlog: prihvatiti uz upozorenje; mala slova kod imenica u testu greška.
- Sloj izazova po materinskom jeziku u planu — prijedlog: redak „Izazovi HR / EN“ uz svaku razinu.

### Engleski
- ~~Britanski ili američki~~ — **odlučeno 21.10.2026.**: britanski.
- Način „samo engleski“ (engleski tečaj s engleskim sučeljem).
- Tempo za udaljene jezike sučelja — prijedlog: dodatne cjeline ponavljanja nakon L6 i L10 ili navesti pretpostavku izloženosti.
- Vokabular L5–L10 — prijedlog: zadržati 70–75.

### Esperanto
- ~~Cilj~~ — **odlučeno 21.10.2026.**: A2, bez fokusa na formalni ispit (hobi jezik).
- Težina HR / EN (1 / 2) — prijedlog: zadržati do pilota.
- Zvuk — prijedlog: snimljeni govornici za L0 i nosive rečenice, TTS za vježbe.
- Standard — prijedlog: *Fundamento* + Akademio, PIV; *ri* i *-iĉ-* samo napomena.
- Koliko kulture zajednice; epizoda iz Zagreba (kongresi 1953., 2001.) — prijedlog: jedna epizoda u Practice.

### Španjolski
- ~~Varijanta~~ — **odlučeno 21.10.2026.**: Španjolska.
- Upis — prijedlog: *¿ ¡* se ne ocjenjuju; tilda samo kad ne nastaje druga riječ; *ñ* nikad kao *n*.
- Provjera odgovora i govora — prijedlog: *ustedes / usted* gdje kontekst dopušta; *seseo* u prepoznavanju govora.
- ~~Cilj~~ — **odlučeno 21.10.2026.**: „A1 + jezgra A2“ (po jeziku).

### Francuski
- Govorni francuski — prijedlog: *on* od L7, izostavljanje *ne* kao napomena od L13.
- Tolerancija akcenata — prijedlog: u L1–L6 uz upozorenje.
- *tu* ili *vous* — prijedlog: upute u vježbama u *vous* kao fraze; likovi međusobno *tu*, monsieur Bernardu *vous*.
- Tipografija — prijedlog: nerastavljivi razmak prije *? ! : ;*, upis prihvaća i bez razmaka.

### Interslavenski
- Standard — provjeriti sve oblike (osobito označene „provjeriti“) u živom rječniku zajednice prije faze 3.
- **[blokira] Školski standard tečaja** (jezik ima ISO kod i rječnik zajednice, ali nema službeno tijelo i namjerno dopušta varijante, pa tečaj mora sam fiksirati oblike) — 1. lice *-u / -ju* (prijedlog) ili *-m*; kondicional *byh / bys* (prijedlog) ili nepromjenjivo *by*; *jesm* u 3. licu izostaje (prijedlog); aktivno *čto*, prihvaća se *što*.
- Prihvaćanje varijanti u Testu — prijedlog: sve dopuštene varijante točne.
- Zvuk — prijedlog: snimljeni govornici za L0 i nosive rečenice, TTS srodnog jezika za vježbe.
- Jedan tečaj ili dva tempa — prijedlog: jedan tempo, uz preporuku „možeš brže“ za slavenska sučelja.
- Popisi „lokalizmi“ — prijedlog: jedan zajednički popis po razini s oznakom jezika.
- Istočnoslavenski dio priče — prijedlog: lik iz istočnoslavenskog prostora (npr. ukrajinska studentica Oksana).
- Ćirilica — prijedlog: prekidač prikaza (uneseno u pregled).

### Talijanski
- Upis — prijedlog: akcent toleriran do L6 osim *è / e*; *é / è* do L12; *po'* od L5; *Lei* oba slova.
- ~~Cilj~~ — **odlučeno 21.10.2026.**: „A1 + većina A2“ (po jeziku).

### Japanski
- ~~Broj kanjija~~ — **odlučeno 21.10.2026.**: ≈ 120.
- ~~Romaji~~ — **odlučeno 21.10.2026.**: samo L0a i L0b, kasnije gumb „prikaži čitanje“.
- ~~Romanizacija~~ — **odlučeno 21.10.2026.**: Hepburn.
- ~~Razmaci~~ — **odlučeno 21.10.2026.**: da u L1–L6.
- ~~Pisanje kanjija rukom~~ — **odlučeno 21.10.2026.**: animacija poteza i mini-igre crtanja znakova preko cijelog zaslona.
- ~~Furigana~~ — **odlučeno 21.10.2026.** (prepušteno autoru): tri razine nakon što je riječ naučena; u Testu prikazana za riječi tekuće razine.

### Latinski
- ~~Cilj i nastavak~~ — **odlučeno 21.10.2026.**: bez drugog tečaja; izvorni odlomci (Cezar, Ciceron, izbor iz Marcijala) u Practice kad ih raspored dopušta.
- ~~Izgovor~~ — **odlučeno 21.10.2026.**: samo klasični (i u zvuku).
- ~~Govor~~ — **odlučeno 21.10.2026.**: zasad slušanje; kad bude budžeta, rješenja za slušanje i izgovor.
- Zvuk — vjerojatno snimljeni govor.
- ~~Makroni~~ — **odlučeno 21.10.2026.** (prepušteno autoru): uključeni do L15, prekidač od L16, basna u obje verzije.
- Iznimka od kralježnice (3. deklinacija od L1) — globalna odluka 7.
- Duljina u *Ostia* — provjeriti u OLD-u / Lewis & Shortu.

### Portugalski
- ~~Brazil ili Portugal~~ — **odlučeno 21.10.2026.**: brazilski.
- Objektne zamjenice — prijedlog: govorni brazilski s napomenom o standardu.
- ~~Cilj~~ — **odlučeno 21.10.2026.**: „A1 · sadržaj A2, pretežno receptivno“.
- Naglasak zvuka — prijedlog: neutralni brazilski TTS + napomena o karioka izgovoru.
- Upis bez dijakritika — prijedlog: tolerancija uz upozorenje, osim *e / é, a / à, avó / avô*.

### Ruski
- ~~Mjesto priče~~ — **odlučeno 21.10.2026.**: Sankt Peterburg.
- L0 u jednom ili dva dijela — prijedlog: dva dijela za sva sučelja osim onih koja znaju ćirilicu.
- Množina kosih padeža — prijedlog: primijenjeno uvođenje uz padeže (L12, L14, L15, L17).
- Vokabular do L12 prema TORFL-u — prijedlog: +5 riječi po razini u L7–L12 ili cilj L12 bez TORFL zahtjeva.
- Rukopis i kurziv — prijedlog: samo čitanje kurziva.
- Upis bez *ъ / ь* — prijedlog: upozorenje u vježbi, greška u Testu.

### Kineski
- ~~Koji HSK popis~~ — **odlučeno 21.10.2026.**: revidirani ispitni program 2025.; od kada vrijedi novi ispit provjeriti kod CTI.
- Pojednostavljeni ili tradicionalni — prijedlog: pojednostavljeni.
- Pisanje rukom — prijedlog: opcija.
- Zvuk — snimljeni govor za tonske parove; TTS provjeriti na tonskim promjenama.
- Prepoznavanje govora za tonove — prijedlog: ne u prvoj verziji.
- Dijalekt u Chengduu — prijedlog: standardni mandarinski + kulturna bilješka.

## 3. Preporuka

- **Druga provjera obavezna** za latinski i interslavenski (presuda „vraća se“, raspored bitno preuređen; kod interslavenskog i oblici nisu provjereni u živom rječniku).
- **Preporučena** za ruski (redoslijed padeža preuređen u ovoj doradi) i kratka za njemački nakon prijenosa ‡ u plan.
- Ostali jezici mogu u fazu 3; esperanto i kineski više nemaju blokirajućih odluka (kod kineskog samo provjeriti datum novog HSK ispita). Blokira još samo školski standard interslavenskog.

## 4. Druga provjera (vlastita, 21.10.2026.)

Nakon odluka vlasnika (ciljevi po jeziku, fleksibilan broj razina i trajanje ≈ 5–6 mjeseci, nepovezane priče,
Španjolska, britanski, klasični izgovor latinskog, Sankt Peterburg) provedena je druga provjera svih 13 datoteka.
To nije neovisna provjera: radila ju je ista sesija koja je radila doradu. Za latinski i interslavenski i dalje vrijedi preporuka za neovisnu provjeru.

| Što je provjereno | Rezultat |
|---|---|
| tablica razina (sve razine, 7 znakova `\|`), redak verzije 0.2 | prolazi za svih 13 |
| zbroj vokabulara po razinama prema odj. 1 i `00-pregled.md` | slaže se (odstupanja ≤ 5 %) |
| nazivi i mjesta modula u odj. 1 i u tablici | ispravljeno: romanski blok imao je „Modul A1“ i „Modul 2“ na L16 → Modul 1 / 2 / 3 / Završni test |
| imena u Practice naslovima prema krugu likova; jedinstvena imena glavnih likova | prolazi |
| cilj u odj. 1 prema pregledu | ispravljeno: `pt.md` je još imao „A1 cijeli · A2“ |
| opterećenje razina (jednake teme, preduvjeti) | ispravljeno: en *these / those* iz L12 u L2; it prijedlozi mjesta iz L16 u L6; pt osnovni prijedlozi mjesta (*perto de, ao lado de*) u L6 (nosiva L6 ih već koristi); ru vokabular L8 preimenovan da se ne ponavlja s L5 |
| odluke vlasnika unesene u odj. 1 i 3 datoteka | es, en, la, ru, it, pt; globalne 1, 2, 5 u `00-pregled.md` |
| nosive rečenice nakon pomaka | bez novih prekršaja (*these* u en L12 sada nakon L2) |

Preostala lakša upozorenja (za pilot, ne mijenjano): en L17 (superlativ, *as … as*, prvi kondicional), fr i es L6 (uz modul), ru L9 i L12, ja L14–L15.
