# Prijedlog dorade: ekonomija bodova

Pregled: 19.09.2026., dopunjeno istog dana nakon prve rasprave. Izvor su `index.html` (`valute`, `prag`, `otkljucano`, `K_PRAG`, `streakOznaci`, `miniBodovi`, `MINI_IGRE`, `WEEKLY_SLIKE`, `dailyDanasnji`, `kraj`, `testPrekini`), `osvjezi.js`, `data.js` (1405 vježbi, 18 782 boda) i svih 12 mini igara + Extras.

**Doseg: samo korekcija brojeva.** Sustav ostaje kakav jest — jedan zbroj po valuti, četiri valute, pragovi po razini, najbolji-rezultat, `KES_VAL`. Nema dviju vrsta prihoda, nema kape na udio, nema nove tablice u bazi. Mijenjaju se **konstante** i **trenutak upisa**.

**Konkretne brojke su u § 7.** Poglavlja 1–6 su obrazloženje i pisana su u današnjim jedinicama; § 7 ih množi s deset i daje gotove tablice za lekcije 1–10, mini igre, daily, weekly, streak i pragove.

**Polazište.** Igre se ne mogu riješiti dok jezik nije naučen, a dnevni izazov nije zaobilaznica nego 5–6 pravih vježbi. Tko je odigrao 30 dailyja zaredom, **naučio je jezik u tih 30 dana** — nije prevario ekonomiju. Zato ovdje nema riječi o „inflaciji“: pitanje je isključivo koliki broj pošteno opisuje to što je čovjek napravio.

## 0. Prvo popraviti — tri stvari koje su danas pokvarene

Ovo nije ugađanje nego kvar. Vrijedi prije svega ostalog.

### 0.1 Daily se iscrpio **danas**, i time gasi streak svima

`igre/daily-*.md` ima 43 datoteke, od `2026-08-07` do `2026-09-18`. `DAILY_POCETAK` je 7. kolovoza (`index.html:2983`), pa je indeks za 19.09.2026. točno **43** — a `dailyDanasnji()` (`index.html:2996`) vraća `null` čim je `i >= b.length`.

Posljedica: od danas nema dnevnog izazova. `streakOznaci()` se zove samo iz `zabiljezi()` kad je `jeDanasnjiDaily(g)` istina, pa se streak **ne može više održati ni jednim potezom**. Za svakog korisnika `streakNiz()` pada na nulu sutra i ostaje ondje zauvijek. Bodovi već upisani u `PROGRESS.streak.bodovi` ostaju, ali brojač na naslovnici ide na nulu i više ne raste.

**Prijedlog (dva koraka):**

- **Odmah:** kad se popis potroši, dan se puni ponavljanjem — `dailyDanasnji()` vraća `b[i % b.length]` uz oznaku da je to ponavljanje. Bodovi vježbi su već naplaćeni (najbolji-rezultat), pa ponavljanje ne daje ništa novo iz samih vježbi, ali **streak ostaje živ** i dan i dalje nosi svojih 5 po valuti. Natpis: „Encore — you have seen this one before“.
- **Trajno:** `osvjezi.js` na kraju ispiše upozorenje kad je preostalo manje od 14 dnevnih izazova, da se popis ne potroši nečujno.

### 0.2 Grad ne isplaćuje ništa

`MINI_IGRE` (`index.html:3033`) vodi Grad s `maks: 100`, naslovnica ga prikazuje kao najveću igru, a `01-grad.html` **nema nijedan poziv `CL.kraj`, nema `window.IGRA_MAKS` i ne piše polje `naplaceno`**. Sprema se pod `croland-grad-v2` (`01-grad.html:556`), a `miniStanje()` čita `croland-mini-grad`. Ta dva ključa se nikad ne sretnu.

Rezultat: 100 bodova u svakoj valuti — 400 ukupnih, najveća pojedinačna isplata u aplikaciji — ne postoji. Igrač koji riješi svih pet zadataka dobije nula i nigdje ne piše zašto. Uz to `ocistiMiniLokalno()` briše samo ključeve s prefiksom `croland-mini-`, pa Gradov spremljeni grad ostaje sljedećem korisniku preglednika.

**Prijedlog:** Grad dobiva isplatu po zadatku (v. § 4), ključ `croland-mini-grad`, i `naplaceno = 20 × broj riješenih zadataka`. Dok to nije napravljeno, `maks` u `MINI_IGRE` treba biti `0`, a ne `100` — lažni maksimum je gori od nikakvog.

### 0.3 Labirint obećava 100, a plaća 30

`08-labirint.html:604-606` daje `RAZINA_UK × VALOVA × META_VAL = 10 × 2 × 5 = 100`, i završni ekran ispisuje „You have taken the full **100** from this game.“ `MINI_IGRE` za `labirint` ima `maks: 30`, a `miniBodovi()` (`index.html:3111`) reže s `Math.min(n, g.maks)`.

Igrač pročita da je pokupio sto, a u zaglavlju mu se pojavi trideset.

**Prijedlog:** uskladiti na **30** u samoj igri (`META_VAL` s 5 na 1,5 nije cijeli broj — jednostavnije je zadržati unutarnje bodovanje i podijeliti ga na kraju) **ili** podići `maks` u `MINI_IGRE` na 100. Preporuka je 100: Labirint je po dužini i težini bliži Preživljavanju (100) nego Zmiji (30). Tada mini igre ukupno nose 840 umjesto 770.

Usput: `02-put-oko-hrvatske.html` postoji u mapi, ima `IGRA_MAKS = 100` i cijelu `CL.kraj` mehaniku, ali ga nema u `MINI_IGRE`. Ili ulazi u popis, ili ide u `_bak`.

---

## 1. Dijagnoza

### 1.1 Pragovi zapravo ne koče nikoga tko dolazi svaki dan

Simulacija igrača koji svaki dan odradi daily + 6 vježbi uz 85 % točnosti, s mini igrama razvučenima kroz prva 4 mjeseca:

| | sadržaj došao do razine | vrata otvorena do |
|---|---|---|
| dan 30 | Lesson 5 · Grammar 3 | Lesson **9** · Grammar **8** |
| dan 90 | Lesson 12 · Grammar 7 | Lesson **20** · Grammar **20** |
| dan 180 | Lesson 20 · Grammar 13 | sve |

Vrata stoje tri do trinaest razina ispred sadržaja koji je čovjek stigao dotaknuti. Stvarno ograničenje nije bodovno nego vremensko: 1 184 vježbi pri 6 dnevno je oko 197 dana, što se poklapa s obećanjem same aplikacije („6–12 months to A1“).

**Posljedica za ovaj dokument:** prag nije zaštita sadržaja od nekoga tko uči. On radi samo protiv jedne osobe — one koja *preskače*. Zato korekcija praga treba biti mala i tiha, a težište je na tome **što četiri broja u zaglavlju govore čovjeku o njegovu radu**.

### 1.2 Streak ne griješi u iznosu nego u obliku

`streakOznaci()` (`index.html:3425`): `s.bodovi += s.niz`. Dan N nosi N.

Isti trominutni povratak vrijedi **5 na peti dan i 95 na devedeset peti**. To je jedini dio ekonomije u kojem se ista radnja plaća devetnaest puta različito, i plaća se najviše ondje gdje je navika već stvorena, a najmanje ondje gdje je niz krhak.

Što to napravi udjelima u zaglavlju — koliko svaki izvor nosi u Lesson bodovima:

**Igrač od ~10 min dnevno (daily + 3 vježbe):**

| dan | ukupno | tečaj | mini | daily | **streak** |
|---|---|---|---|---|---|
| 30 | 916 | 108 (12 %) | 193 (21 %) | 150 (16 %) | **465 (51 %)** |
| 90 | 5 542 | 419 (8 %) | 578 (10 %) | 450 (8 %) | **4 095 (74 %)** |
| 365 | 72 930 | 3 540 (5 %) | 770 (1 %) | 1 825 (3 %) | **66 795 (92 %)** |

**Igrač od ~20 min dnevno (daily + 6 vježbi):**

| dan | ukupno | tečaj | mini | daily | **streak** |
|---|---|---|---|---|---|
| 30 | 1 057 | 249 (24 %) | 193 (18 %) | 150 (14 %) | **465 (44 %)** |
| 90 | 6 226 | 1 103 (18 %) | 578 (9 %) | 450 (7 %) | **4 095 (66 %)** |

Nakon tri mjeseca dvije trećine svega što čovjek vidi na ekranu dolazi od toga što se vratio, a ne od onoga što je napravio kad se vratio. Nakon godine dana je to 91 %, i četiri broja u zaglavlju više ne mjere jezik nego kalendar.

To je jedina brojka u ekonomiji koja je stvarno kriva.

### 1.3 `K_PRAG` završava na 0,99 i koči jedino marljivog samotnjaka

`K_PRAG` (`index.html:2814`) raste 0,50 → 0,99. Zazor između zalihe i praga na razini 20 je 35–50 bodova — dvije do tri promašene vježbe.

Za dnevnog igrača to je nevidljivo (§ 1.1). Koči točno jedan profil: **onoga tko radi lekcije, a ne dira ni daily ni igre.** Takav igrač uz 85 % točnosti zaglavi na Lesson 14 · Vocabulary 14 · Grammar 13 · Practice 13 i dalje ne može, koliko god radio. To je jedini stvarni zid u aplikaciji i jedini razlog da se `K_PRAG` uopće dira.

### 1.4 Weekly ima težinu u kodu, a nema sadržaja

`valute()` ima granu za `weekly challenge` s `tezina: 15`. U `data.js` je **nula** vježbi tog tipa. Stvarni tjedni izazov (`weekly/2026-09-14-trznica.html`, 22 pojma) vodi se u `WEEKLY_SLIKE` (`index.html:3068`) i ne nosi nijedan bod.

Grana koja plaća 15 nikad se ne izvrši, a ritual koji se nudi jednom tjedno ekonomski ne postoji.

### 1.5 Mini bodovi žive samo u ovom pregledniku

`miniStanje()` čita `localStorage`, `PROGRESS` ide u Supabase. Mini bodovi **otključavaju razine**, a nisu sinkronizirani. Prijava na drugom uređaju ili očišćen preglednik = do 770 bodova po valuti nestane i razine se ponovno zaključaju, bez objašnjenja.

### 1.6 Pjesma se plaća, ali ne bi trebala

**LRWS (Extras) danas plaća prijevod vlastitog teksta.** `lrws.html:566` upisuje bod za svaki redak koji si sam preveo, `lrws.html:360` još jedan za svaki koji si izgovorio s ≥ 80 % pogotka. Do `MAKS = 200`, u sve četiri valute. Jedna pjesma od 40 stihova, cijela odrađena, nosi 80 po valuti = 320 ukupnih bodova — više od dvadeset dana streaka.

Problem nije iznos nego to što se **ne može provjeriti**. Tekst bira igrač, „prijevod“ je bilo koji unos od dva znaka naviše (`normal(r.moj).length >= 2`), a izgovor se mjeri prema tekstu koji je igrač sam zalijepio. Nijedan od tih bodova ne kaže da je nešto naučeno, a svi ulaze u iste valute koje otključavaju razine.

**Odluka: LRWS ide na nulu** (§ 7.3). Igra ostaje — ona je najbolji alat u aplikaciji za rad s pravim jezikom — samo prestaje biti izvor bodova. Kartica to mora izričito reći, inače izgleda kao kvar.

### 1.7 Vocabulary 13–20 je peti dio onoga što je 1–12

| Vocabulary | vježbi po razini | bodova po razini |
|---|---|---|
| 1–12 | 10–18 | 59 → 346 (**ukupno 2 243**) |
| 13–20 | **točno 5** | 91 → 197 (**ukupno 1 128**) |

Nije problem ekonomije nego sadržaja, ali ga ekonomija pojačava: druga polovica Vocabularyja traži više, a nudi manje.

---

## 2. Odgovor: koliko vrijedi 30 dana zaredom

### 2.1 Što tih 30 dana sadrži

Izbrojano iz `data.js`:

- **30 dnevnih izazova = 152 vježbe, 515 sirovih bodova.**
- Daily za to plaća 30 × 5 = **150 po valuti**, dakle 600 ukupnih bodova. Da su te iste vježbe bile u lekciji, donijele bi 515 u jednoj valuti. **Daily plaća 1,17× ono što bi ista količina posla donijela kroz tečaj.** Težina 5 je, dakle, već točno odmjerena i ne treba je dirati.
- Uz to ide sve što se ne mjeri: riječi iz rječnika, ponovljene igre, pročitano dvaput, pjesma koja nije do kraja odrađena, pokušaji koji su završili lošije od prošlog puta (najbolji-rezultat ih pojede).

**Streak je jedini instrument kojim se to nevidljivo plaća.** Pitanje nije treba li ga biti — treba — nego koliki je pošten iznos.

### 2.2 Mjera koju predlažem

> Streak za 30 dana treba vrijediti otprilike koliko i sam daily koji ga je nosio, i ne smije biti najveći broj na ekranu dok god čovjek radi lekcije.

Drugim riječima: nevidljivi rad je otprilike jednako vrijedan kao vidljivi dnevni zadatak — što je velikodušno — ali tečaj ostaje glavni broj.

### 2.3 Brojka

**Jedna izmjena, jedna konstanta:**

```js
// index.html:3425, u streakOznaci()
var STREAK_DNEVNI_MAKS = 10;
s.bodovi += Math.min(s.niz, STREAK_DNEVNI_MAKS);   // prije: s.bodovi += s.niz
```

Dan N nosi `min(N, 10)`. **Prvih deset dana je identično današnjem** (55 bodova), pa se na krhkom početku ne mijenja baš ništa. Od jedanaestog dana povratak vrijedi ravnih 10.

| dana | danas | **min(N, 10)** | min(N, 7) | min(N, 5) | daily za usporedbu |
|---|---|---|---|---|---|
| 7 | 28 | **28** | 28 | 25 | 35 |
| 10 | 55 | **55** | 49 | 40 | 50 |
| **30** | 465 | **255** | 189 | 140 | **150** |
| 90 | 4 095 | **855** | 609 | 440 | 450 |
| 180 | 16 290 | **1 755** | 1 239 | 890 | 900 |
| 365 | 66 795 | **3 605** | 2 534 | 1 815 | 1 825 |

Omjer streak : daily pri `min(N, 10)` stabilizira se na **1,7–2,0×** umjesto današnjih 3,1× (dan 30) → 36,6× (dan 365).

**Dakle, odgovor na pitanje: 30 dana zaredom vrijedi 255 bodova u svakoj valuti — 1 020 ukupnih.** To je uz 150 iz samog dailyja, pa dnevni ritual za mjesec dana nosi **405 po valuti, 1 620 ukupnih** — otprilike koliko cijela Lesson 6 i Lesson 7 zajedno.

### 2.4 Što to napravi zaglavlju

Isti igrač kao u § 1.2, uz `min(N, 10)`:

| ~10 min/dan | ukupno | tečaj | mini | daily | streak |
|---|---|---|---|---|---|
| dan 30 | 706 | 108 (15 %) | 193 (27 %) | 150 (21 %) | **255 (36 %)** |
| dan 90 | 2 302 | 419 (18 %) | 578 (25 %) | 450 (20 %) | **855 (37 %)** |
| dan 365 | 9 740 | 3 540 (36 %) | 770 (8 %) | 1 825 (19 %) | **3 605 (37 %)** |

| ~20 min/dan | ukupno | tečaj | mini | daily | streak |
|---|---|---|---|---|---|
| dan 30 | 847 | **249 (29 %)** | 193 (23 %) | 150 (18 %) | 255 (30 %) |
| dan 90 | 2 986 | **1 103 (37 %)** | 578 (19 %) | 450 (15 %) | 855 (29 %) |
| dan 365 | 10 274 | **4 074 (40 %)** | 770 (7 %) | 1 825 (18 %) | 3 605 (35 %) |

Kod igrača koji radi 20 minuta dnevno **tečaj postaje najveća stavka**, a streak druga. To je rečenica koju ekonomija treba izgovarati: *tvoj rad je najveći broj, tvoja upornost odmah do njega.*

Kod igrača od 10 minuta dnevno streak ostaje najveći — i to je u redu, jer kod njega upornost **jest** glavni doprinos.

Nakon dana ~200 tečaj je iscrpljen (4 074 = cijela Lesson zaliha) i streak opet preuzima. Ni to nije greška: kad je tečaj gotov, streak i jest rezultat.

### 2.5 Nema kape na ukupno

Namjerno. Kapa na dnevni iznos je dovoljna, a kapa na zbroj bi značila da od nekog dana povratak ne vrijedi ništa — što je suprotno od onoga što ovaj dokument tvrdi.

Tko izdrži godinu dana zaredom ima 3 605 po valuti iz streaka. Zaslužio je.

### 2.6 Jedina izmjena praga: `K_PRAG` prestaje rasti na 0,80

Zbog § 1.3, i ni zbog čega drugoga.

```js
// index.html:2814
var K_PRAG = { 2:0.50, 3:0.54, 4:0.57, 5:0.61, 6:0.65, 7:0.69, 8:0.73, 9:0.76, 10:0.80,
               11:0.80, 12:0.80, 13:0.80, 14:0.80, 15:0.80, 16:0.80, 17:0.80, 18:0.80,
               19:0.80, 20:0.80 };
```

| razina | Lesson | Vocabulary | Grammar | Practice |
|---|---|---|---|---|
| 2 | 45 → **45** | 35 → **35** | 45 → **45** | 25 → **25** |
| 5 | 280 → **270** | 290 → **275** | 315 → **300** | 190 → **185** |
| 10 | 1 275 → **1 305** | 1 290 → **1 325** | 1 355 → **1 390** | 1 070 → **1 100** |
| 16 | 3 245 → **2 855** | 2 855 → **2 510** | 3 055 → **2 690** | 2 530 → **2 225** |
| 20 | 4 865 → **3 930** | 3 715 → **3 000** | 4 410 → **3 565** | 3 540 → **2 860** |

Prvih deset razina praktički se ne miče (±30 bodova). Ruši se samo zid u drugoj polovici, i marljivi samotnjak iz § 1.3 prolazi do kraja.

**Uz to jedna zaštita, jedna linija.** `PROGRESS.vidjeno` (`index.html:4127`) već pamti svaku razinu koja je ikad bila otključana i sprema se u napredak. Neka `otkljucano()` prvo pogleda tu oznaku i, ako stoji, vrati `true` bez računanja praga. Bez toga bi svaka buduća promjena `K_PRAG`-a nekome zatvorila vrata koja su mu jučer bila otvorena.

---

## 3. Ostale konstante

### 3.1 Daily: težina 5 ostaje

Dokazano u § 2.1 — plaća 1,17× ono što bi isti posao donio u lekciji. Jedino što treba: težine 5 i 15 izvaditi iz sredine izraza u `valute()` u imenovane konstante `TEZINA_DAILY` i `TEZINA_WEEKLY`.

Popis se ne smije potrošiti (§ 0.1).

### 3.2 Weekly: 15 po valuti, i to stvarno isplaćeno

Grana s `tezina: 15` postoji i nikad se ne izvrši. Prijedlog je **nahraniti je**, ne obrisati: `valute()` čita `WEEKLY_SLIKE` kao što `miniBodovi()` čita mini igre — `nadjeno / pojmova × 15` po valuti, u sve četiri, s upisom **čim je pojam pogođen** (§ 4).

Tjedni izazov traži prepoznavanje predmeta bez ponuđenih odgovora — to je teže od svega u mini igrama i vrijedno je svojih 15. Godišnje je to najviše 780 po valuti, manje nego streak, i ne treba mu kapa.

Ako odluka ostane „weekly ne nosi bodove“, onda grana i `tezina: 15` moraju otići, a ne stajati kao mrtvo obećanje.

### 3.3 Mini igre: uskladiti maksimume; spušta se samo LRWS

Igra se ne može riješiti dok jezik nije naučen, pa je isplata iz igara zarađena isto kao iz lekcije. **Nijednoj od dvanaest igara `maks` se ne spušta** — tri rastu. Jedina iznimka je LRWS, koji radi s tekstom koji igrač sam donese i zato ide na nulu (§ 1.6).

| # | igra | `maks` u `MINI_IGRE` | maks u samoj igri | kada plaća | što treba |
|---|---|---|---|---|---|
| 01 | Grad | 100 | — | **nikad** | § 0.2 — spojiti isplatu |
| 03 | Pamti pa piši | 100 | 100 | kraj partije | — |
| 04 | Tvrđava | 100 | 100 | **tek nakon svih 12 soba** | § 4.1 |
| 05 | Konoba | 50 | 50 | kraj partije | — |
| 06 | Skladište | 100 | 100 | kraj posla | — |
| 07 | Poštanski vlak | 30 | 30 | kraj partije | — |
| 08 | Labirint | **30** | **100** | kraj partije | § 0.3 — **podići na 100** |
| 09 | Zmija | 30 | 30 | kraj partije | — |
| 10 | Portal | 50 | 50 | kraj partije | — |
| 11 | Preživljavanje | 100 | 100 | kraj partije | — |
| 12 | Obrana baze | 40 | 40 | kraj partije | — |
| 13 | Gradovi Hrvatske | 40 | 40 | **nakon svakog grada** | uzor |
| — | LRWS (Extras) | 200 | 200 | po retku | **na 0 — vlastiti tekst se ne boduje (§ 7.3)** |

Konačne brojke su u § 7.3: **890 po valuti** (odnosno 8 900 na skali ×10), LRWS 0. Jednokratno, pa je to kroz godinu dana 8 % igračevih bodova (§ 7.6) — ukras, ne motor.

**`naplaceno` mora u `PROGRESS`** (§ 1.5). `localStorage` ostaje igri za njezino stanje; brojka koja otključava razine pripada sinkroniziranom napretku. Spajanje na prijavi: `max(lokalno, server)`, nikad zbroj.

### 3.4 Lekcije i testovi: mehanika ostaje, zbroj po cjelini se zadaje

`osvjezi.js` (baza po formatu × ±20 % količine × rast po razini) dobro dijeli bodove **unutar** cjeline i ostaje. Mijenja se samo to da zbroj cjeline više nije ono što slučajno ispadne iz broja vježbi, nego zadana brojka iz tablice u § 7.2 — generator na kraju skalira cjelinu da je pogodi.

Razlog je Vocabulary 13–20 (§ 1.7): pet vježbi po razini danas znači petinu bodova, iako gradiva nije manje. Sa zadanim zbrojem kraća cjelina jednostavno ima vrjednije vježbe.

Test i dalje nosi koliko i jedna cjelina i dalje se dijeli na četvrtine u sve četiri valute — time gura sva četvora vrata istodobno i točno je jednako vrijedan kao lekcijski bod.

211 stranica formata `tekst` koje se samo prelistaju nose 10 bodova i ne ulaze u skaliranje: čitanje se isplati, ali se time ne zarađuje.

---

## 4. Trenutak boda: kadenca isplate mora pratiti duljinu

Ovo je dio koji se najviše osjeti, a najmanje se vidi u brojkama. Danas svaka vježba plaća u `kraj()` (`index.html:4376`), a svaka igra na svom završnom ekranu — bez obzira traje li potez 90 sekundi ili dva sata.

**Pravilo koje predlažem:**

| duljina jednog zaokruženog poteza | kada se bod upisuje |
|---|---|
| do 3 min (vježba, dnevni zadatak) | na kraju poteza — kako i sada |
| 3–20 min (partija, smjena, val) | na kraju partije — kako i sada |
| **preko 20 min ili preko više sjedenja** | **na svakoj prijeđenoj međi** |
| **prekid na pola** | **ono što je stvarno riješeno, odmah** |

Tri mjesta danas krše treći i četvrti redak:

### 4.1 Tvrđava plaća tek nakon dvanaeste sobe

`04-tvrdjava.html:1472` — jedini `CL.kraj` u igri zove se iz `kraj()`, a `kraj()` se dogodi tek kad vijeće glasa. Igrač koji otvori jedanaest od dvanaest soba i ostavi igru za sutra ima **nula**. Pritom svaka soba već nosi svoju brojku (`bodovi: 6, 6, 7, 7, …` u popisu soba, `04-tvrdjava.html:689`).

**Prijedlog:** `sobaGotova(s)` upisuje `naplaceno = Math.max(naplaceno, zbroj bodova prijeđenih soba)`. Ništa se ne oduzima, ništa ne treba dvaput naplatiti, a najduža igra u aplikaciji prestaje biti oklada.

### 4.2 Grad nema nijednu među

Pet zadataka, `zavrsi(q, poruka)` (`01-grad.html:842`) već zna kad je koji gotov. **Prijedlog:** ondje upisati `naplaceno = 20 × broj riješenih zadataka` pod ključ `croland-mini-grad`.

### 4.3 Test propadne ako se ode s njega

`testZavrsi()` (`index.html:8833`) uredno plaća i kad istekne vrijeme — nedosegnute vježbe vrijede nula, riješene se upišu. Ali `testPrekini()` (`index.html:8655`) postavlja `TEST = null` **bez ijednog `zabiljezi`**, a zove se pri svakoj navigaciji izvan testa. Test 12 nosi 353 boda; izlazak nakon četrnaeste od petnaest vježbi plaća nula.

**Prijedlog:** `testPrekini()` prije brisanja radi isto što i `testZavrsi('time')` — upiše `T.rez` i, ako je vježba u tijeku, pozove `predaja()`. Sva mehanika već postoji.

### 4.4 Vježba koja se napusti na pola

Isto pitanje jedan kat niže. `predaja()` je definiran za 19 formata i koristi se samo pri isteku testnog sata. Prijedlog: pri izlasku iz nedovršene vježbe pozvati `predaja()` i proći kroz `zabiljezi()`. Najbolji-rezultat i tako štiti od pada, pa djelomičan upis ne može ništa pokvariti — može samo prestati brisati napravljeno.

### 4.5 Weekly plaća po pojmu

Već navedeno u § 3.2, ovdje zbog potpunosti: tjedni izazov od 22 pojma ne smije biti sve-ili-ništa. Pogodak → bod, odmah.

---

## 5. Redoslijed

1. **§ 0.1 daily** — gori danas, gasi streak svim korisnicima.
2. **§ 0.2 Grad** — spojiti isplatu, ili privremeno `maks: 0`.
3. **§ 0.3 Labirint** — `maks` s 30 na 100.
4. **§ 4.3 test** — jedan poziv, spašava do 353 boda po testu.
5. **§ 2.3 `STREAK_DNEVNI_MAKS = 10`** — jedna linija, i to je cijela korekcija streaka.
6. **§ 2.6 `K_PRAG` ravan od 0,80** + zaštita preko `PROGRESS.vidjeno`.
7. **§ 4.1 Tvrđava, § 4.2 Grad, § 4.4 vježba, § 4.5 weekly** — kadenca isplate.
8. **§ 3.2 weekly u `valute()`**, **§ 3.3 `naplaceno` u `PROGRESS`**, **§ 1.6 LRWS na nulu**.
9. **§ 7 prijelaz na skalu ×10** — zadnje, jer traži istovremenu promjenu `osvjezi.js`, `MINI_IGRE`, dvanaest datoteka igara i migraciju napretka (§ 7.7).

Koraci 1–6 su svi manji od desetak linija i međusobno neovisni.

---

## 6. Što ostaje za odlučiti

- **Je li 10 prava dnevna kapa za streak?** To je jedina prava ručica u dokumentu. Pri 10 streak za 30 dana nosi 255 i drži se na 1,7–2,0× dailyja. Pri 7 nosi 189 i 1,3×. Pri 5 nosi 140 i točno izjednačuje streak s dailyjem. Sve tri su obranjive; 10 je odabran jer je **prvih deset dana tada identično današnjima** i jer plaća nevidljivi rad velikodušnije nego strogo.
- **Ravni `K_PRAG` od 0,80 ili blagi rast do 0,85?** Ravno je predvidljivije; blagi rast daje kasnim razinama nešto ozbiljnosti. Razlika je oko 200 bodova na razini 20.
- **Weekly: prihod ili ritual?** § 3.2 predlaže prihod. Ako ostane ritual, mrtvu granu treba obrisati.
- **Vocabulary 13–20** (§ 1.7) — pet vježbi po razini je premalo za ekonomiju koja od njih traži jednako. Poziv na sadržaj, ne na formulu.
- **Što nakon 200. dana**, kad je tečaj iscrpljen i streak je jedino što još raste? Tada valute prestaju biti ključ i postaju rezultat. Vrijedi razmisliti o tome da Progress od te točke pokazuje nešto drugo — dane, riječi u rječniku, postotak pokrivenosti — jer četiri broja koja više ništa ne otključavaju traže novi smisao.

---

## 7. Tablica: sve predložene brojke, na skali ×10

**Sve dosad u dokumentu je u današnjim jedinicama.** Ovo poglavlje ih množi s deset i na toj skali daje konačne brojke. Ako se prihvaća samo jedno poglavlje, neka bude ovo — ostala su obrazloženje.

### 7.1 Zašto ×10

Danas je najmanja jedinica prevelika za djelomičan uspjeh. `kraj()` računa `osvojeno = Math.round(bodovi × pct)`, pa vježba od 2 boda ima točno tri ishoda (0, 1, 2), a vježba od 6 bodova s pet zadataka daje 1, 2, 4, 5, 6 — 60 % i 70 % su isti broj. Na skali ×10 ista vježba ima 60 stupnjeva umjesto 6, i rezultat prvi put opisuje ono što se stvarno dogodilo.

Množi se **sve** — vježbe, mini igre, daily, weekly, streak, pragovi — pa se nijedan omjer ne mijenja samim prijelazom. Mijenjaju se samo one brojke koje su dolje izričito označene.

### 7.2 Lekcije 1–10: koliko nosi koja cjelina

Prijedlog je da **sve četiri vrste nose isto po razini.** Danas nose 750 / 590 / 800 / 390 (razina 1, ×10), što nije odluka nego posljedica toga koliko je vježbi netko napisao. Kad su izjednačene, četiri broja u zaglavlju postaju usporediva, a ravnomjeran bonus iz igara prestaje biti nerazmjeran (danas je 22 % Lesson zalihe, a 31 % Practice zalihe).

**Test nosi isto koliko i jedna cjelina** — kao i danas, dijeli se na četvrtine u sve četiri valute.

| razina | Lesson | Vocabulary | Grammar | Practice | Test | **red ukupno** | rast |
|---|---|---|---|---|---|---|---|
| 1 | 700 | 700 | 700 | 700 | 700 | **3 500** | — |
| 2 | 800 | 800 | 800 | 800 | 800 | **4 000** | ×1,14 |
| 3 | 950 | 950 | 950 | 950 | 950 | **4 750** | ×1,19 |
| 4 | 1 100 | 1 100 | 1 100 | 1 100 | 1 100 | **5 500** | ×1,16 |
| 5 | 1 300 | 1 300 | 1 300 | 1 300 | 1 300 | **6 500** | ×1,18 |
| 6 | 1 500 | 1 500 | 1 500 | 1 500 | 1 500 | **7 500** | ×1,15 |
| 7 | 1 750 | 1 750 | 1 750 | 1 750 | 1 750 | **8 750** | ×1,17 |
| 8 | 2 000 | 2 000 | 2 000 | 2 000 | 2 000 | **10 000** | ×1,14 |
| 9 | 2 300 | 2 300 | 2 300 | 2 300 | 2 300 | **11 500** | ×1,15 |
| 10 | 2 650 | 2 650 | 2 650 | 2 650 | 2 650 | **13 250** | ×1,15 |

Zbroj razina 1–10: **15 050 po vrsti**, 75 250 ukupno. Razina 10 nosi 3,8× razinu 1 — praktički isto kao danas (Lesson 10 / Lesson 1 = 3,9×), samo bez skokova koji dolaze od toga što jedna cjelina slučajno ima 19 vježbi, a druga 12.

**Nastavak 11–20** (blaži rast, jer od razine 13 sadržaja ima manje): 2 900 · 3 100 · 3 350 · 3 600 · 3 900 · 4 200 · 4 550 · 4 900 · 5 300 · 5 700. Zbroj 1–20 = **56 550 po vrsti**, 282 750 u cijeloj aplikaciji.

**Kako se to dijeli unutar cjeline.** `osvjezi.js` ostaje kakav jest — baza po formatu × ±20 % količine × rast — ali na kraju se bodovi svake cjeline **skaliraju da pogode zadani zbroj iz tablice**. Time se `RAST_PO_RAZINI` prestaje boriti s brojem vježbi, a cjelina od 5 vježbi i cjelina od 19 vježbi na istoj razini vrijede isto (pojedina vježba u kraćoj, dakle, više — što je i pošteno, jer nosi više gradiva).

**Stranice koje se samo prelistaju** (format `tekst` bez ijedne praznine, 211 komada): **10 bodova**, i ne ulaze u skaliranje cjeline — dodaju se povrh. Čitanje se isplati, ali se time ne zarađuje.

### 7.3 Mini igre

Ništa se ne spušta. Tri brojke rastu, jer su bile ispod onoga što igra stvarno traži.

| # | igra | danas (×10) | **prijedlog** | zašto |
|---|---|---|---|---|
| 01 | Grad | 1 000 | **1 000** | pet zadataka, najviše sadržaja — ali danas ne isplaćuje ništa (§ 0.2) |
| 03 | Pamti pa piši | 1 000 | **1 000** | 100 razina, dijakritika se broji |
| 04 | Tvrđava | 1 000 | **1 000** | 12 soba, više sjedenja |
| 06 | Skladište | 1 000 | **1 000** | ulog se bira, skalira se s igračem |
| 11 | Preživljavanje | 1 000 | **1 000** | — |
| 08 | Labirint | 300 | **1 000** ↑ | igra dijeli 10 × 2 × 5 = 100 i to piše na ekranu (§ 0.3) |
| 13 | Gradovi Hrvatske | 400 | **800** ↑ | 128 gradova, tri srca koja se ne vraćaju — najduža igra u popisu |
| 12 | Obrana baze | 400 | **500** ↑ | 15 valova, oba smjera |
| 05 | Konoba | 500 | **500** | 8 smjena |
| 10 | Portal | 500 | **500** | — |
| 07 | Poštanski vlak | 300 | **300** | jedna partija |
| 09 | Zmija | 300 | **300** | jedna partija |
| — | **LRWS (Extras)** | 2 000 | **0** | vlastiti tekst se ne boduje |

**Ukupno iz igara: 8 900 po valuti**, jednokratno. To je 16 % zalihe jedne vrste kroz cijeli tečaj — osjetno, a daleko od toga da bilo što nosi samo.

**LRWS ostaje u aplikaciji, samo bez bodova.** Mehanički: izbaciti `EXTRA_IGRE` iz `sveIgre()`, jer bi `maks: 0` natjeralo `miniPrijedena()` da igru odmah broji kao prijeđenu. Na kartici treba pisati da je to vlastiti tekst i da ne nosi bodove — inače izgleda kao kvar.

### 7.4 Daily, weekly, streak

| izvor | danas (×10) | **prijedlog** | mjesec dana | godina |
|---|---|---|---|---|
| **Daily challenge** (100 %) | 50 / dan | **50 / dan** | 1 500 | 18 250 |
| **Weekly challenge** (100 %) | 0 (grana mrtva) | **150 / tjedan** | 650 | 7 800 |
| **Streak**, dan N | 10 × N, bez granice | **min(10 × N, 100)** | 2 550 | 36 050 |

Streak: prvih deset dana ramp 10, 20, 30 … 100 — **identično današnjem**. Od jedanaestog dana svaki povratak vrijedi ravnih 100.

```js
// index.html:3425, u streakOznaci()
var STREAK_DNEVNI_MAKS = 100;
s.bodovi += Math.min(10 * s.niz, STREAK_DNEVNI_MAKS);   // prije: s.bodovi += s.niz
```

| dana | danas (×10) | **prijedlog** | daily za usporedbu | omjer |
|---|---|---|---|---|
| 7 | 280 | **280** | 350 | 0,8× |
| 10 | 550 | **550** | 500 | 1,1× |
| **30** | 4 650 | **2 550** | 1 500 | **1,7×** |
| 90 | 40 950 | **8 550** | 4 500 | 1,9× |
| 365 | 667 950 | **36 050** | 18 250 | 2,0× |

Nema kape na zbroj: tko izdrži godinu dana ima 36 050 i zaslužio ih je (§ 2.5).

### 7.5 Pragovi

Kad sve četiri vrste nose isto, **prag je jedna tablica umjesto četiri.** Vrijednosti su `K_PRAG × (zaliha cjelina + četvrtina testova do prethodne razine)`, zaokruženo na 50.

| razina | K | **prag za ulaz** | | razina | K | **prag za ulaz** |
|---|---|---|---|---|---|---|
| 2 | 0,50 | **450** | | 11 | 0,80 | **15 050** |
| 3 | 0,54 | **1 000** | | 12 | 0,80 | **17 950** |
| 4 | 0,57 | **1 750** | | 13 | 0,80 | **21 050** |
| 5 | 0,61 | **2 700** | | 14 | 0,80 | **24 400** |
| 6 | 0,65 | **3 950** | | 15 | 0,80 | **28 000** |
| 7 | 0,69 | **5 500** | | 16 | 0,80 | **31 900** |
| 8 | 0,73 | **7 400** | | 17 | 0,80 | **36 100** |
| 9 | 0,76 | **9 600** | | 18 | 0,80 | **40 650** |
| 10 | 0,80 | **12 400** | | 19 | 0,80 | **45 550** |
| | | | | 20 | 0,80 | **50 850** |

Zaokruživanje u `prag()` ide s `/5*5` na **`/50*50`**, da prag ostane okrugao broj i na novoj skali.

### 7.6 Provjera: drži li sve zajedno

**Marljivi samotnjak** — sve lekcije uz 85 % točnosti, nijedan daily, nijedna igra: na razini 20 ima 54 028, treba 50 850. **Prolazi, s rezervom od 6 %.** Danas zaglavi na razini 13–14.

**Dnevni igrač** — daily + 6 vježbi dnevno, 85 %, igre razvučene kroz prva 4 mjeseca:

| | ukupno | tečaj | mini | daily | streak | sadržaj / vrata |
|---|---|---|---|---|---|---|
| dan 30 | 8 758 | 2 483 (28 %) | 2 225 (25 %) | 1 500 (17 %) | 2 550 (29 %) | razina 3 / vrata 8 |
| dan 90 | 30 265 | 10 540 (35 %) | 6 675 (22 %) | 4 500 (15 %) | 8 550 (28 %) | razina 9 / vrata 15 |
| dan 180 | 75 669 | **40 219 (53 %)** | 8 900 (12 %) | 9 000 (12 %) | 17 550 (23 %) | razina 18 / vrata 20 |
| dan 365 | 111 268 | **48 068 (43 %)** | 8 900 (8 %) | 18 250 (16 %) | 36 050 (32 %) | razina 20 / vrata 20 |

Tečaj je najveća stavka od trećeg mjeseca nadalje, streak druga. Vrata stoje ispred sadržaja, kako i treba (§ 1.1).

### 7.7 Prijelaz na novu skalu

`PROGRESS.vjezbe` drži najbolje rezultate u starim jedinicama. Bez migracije bi svaki igrač ujutro vidio desetinu svojih bodova.

Uzor postoji — `migrirajRjecnik()` (`index.html:3552`) se zove iz `ucitajProgress()` i radi točno tu vrstu jednokratnog posla. Isto i ovdje:

```js
// pored migrirajRjecnik(), zvati iz ucitajProgress()
function migrirajSkalu() {
  if (PROGRESS.skala === 10) return;          // novo polje u PROGRESS_PRAZAN(), zadano 1
  var v = PROGRESS.vjezbe || {};
  Object.keys(v).forEach(function (k) { v[k] = (v[k] || 0) * 10; });
  if (PROGRESS.streak) PROGRESS.streak.bodovi = (PROGRESS.streak.bodovi || 0) * 10;
  PROGRESS.skala = 10;
  spremiProgress();
}
```

Mini igre su poseban slučaj: `naplaceno` piše sama igra u `localStorage`, pa `IGRA_MAKS` u svakoj od dvanaest datoteka mora ×10 **u istom puštanju** kao i `MINI_IGRE`. Dok se to ne napravi zajedno, `miniBodovi()` bi rezao na `Math.min(staro, novi maks)` i igre bi plaćale desetinu.

To je i razlog da `naplaceno` treba preseliti u `PROGRESS` (§ 3.3): ondje bi migracija bila jedna linija više u gornjoj funkciji, umjesto trinaest usklađenih datoteka.
