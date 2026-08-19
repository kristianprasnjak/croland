# Grad v2 — dizajnerski dokument

Prijedlog nove verzije igre `01-grad.html`. Ništa još nije implementirano.

**Okvir (zadan):** bez animacija, bez dvoboja i borbi. Veći i bogatiji grad,
puno više likova, razgovori kao glavni sadržaj. Vlastiti identitet — ne kopija
nijedne postojeće igre.

---

## 0. Što je izbačeno i zašto

Prethodna verzija dokumenta imala je susrete s "divljim riječima", dvoboje,
značke po zgradama i oporavak u ambulanti. **Sve to ispada.** Ne samo zato što
je preblizu tuđem dizajnu — nego zato što bi u ovoj igri bilo suvišno: mehanika
dvoboja je samo omot oko pitanja, a pitanja se mogu postaviti izravno, u
razgovoru, gdje ionako pripadaju.

Ono što je od te ideje vrijedilo — da sadržaj mora **teći** kroz igru, a ne se
potrošiti u 15 zadataka — rješava se drukčije, poglavljem 4.

**Vlastiti identitet, konkretno:** hrvatski primorsko-zagorski gradić, ne japansko
predgrađe. Kaldrma, škure, bura, konoba, tržnica, zvonik, riva. Paleta topla i
papirnata, ista kao ostatak Crolanda (`--papir`, `--tinta`, `--zut`), a ne
Game Boy zelena. Nema stvorenja, nema borbi, nema sustava koji podsjeća na
kolekcionarske igre. Radna oznaka žanra: **grad u kojem se uči govoriti.**

---

## 1. Što danas ne radi

| što je | posljedica |
|---|---|
| jedna karta 24×18, sve vidljivo odjednom | nema otkrivanja |
| ulazak u zgradu = modal preko ekrana | zgrada nije mjesto, nego gumb s krovom |
| 10 likova, svaki kaže 4 rečenice | grad je prazan između zadataka |
| 15 zadataka, strogo linearno | igrač nikad ne bira što će raditi |
| nema razloga za povratak nikamo | grad se potroši u jednom prolazu |
| rječnik od 903 riječi | igrač u jednom prolazu vidi možda 60 |

Zadnja dva retka su srž. Sadržaja ima za desetke sati; struktura ga ne zna
posluživati.

---

## 2. Vizija

Doseljenik si u gradić na moru. Ne znaš jezik. Ljudi su strpljivi, ali govore
hrvatski. **Igra je razgovor** — s pekarom, susjedom, djecom pred školom,
ribarom na rivi, knjižničarom koji te ispravlja kad mu kažeš "ti".

Cilj nije prijeći razine nego **doći do dana kad razumiješ grad**.

Ime grada: predlažem izmišljeno, da ne veže ni za jedno stvarno mjesto —
**Vrbanik**, **Slatina Mala**, **Kamenjak**, **Lučica**. (Odluka je tvoja.)

---

## 3. Grad

### 3.1 Vanjska karta — otprilike 44×34 pločica

Kamera već prati igrača (vidno polje 13×9), pa karta smije biti puno veća od
ekrana. Igrač u svakom trenutku vidi otprilike **osminu grada** — otkrivanje
postaje stvarno.

```
   ┌────────────────────────────────────────────────────────────┐
   │  ŠUMSKA STAZA        GORNJI GRAD                           │
   │  (klupe, izvor,     (crkva, zvonik,                        │
   │   stara vrata)       vidikovac, groblje)                   │
   │         │                  │                               │
   │  ═══════╪══════ ULICA STUBE ╪═══════════                   │
   │         │                  │                               │
   │  ŠKOLSKI KVART       TRG                DUĆANI             │
   │  (škola, igralište,  (fontana, klupe,   (pekara,           │
   │   knjižnica)          zvonik, table)     tržnica,          │
   │                                          konoba)           │
   │         │                  │                │              │
   │  ═══════╪══════ GLAVNA ULICA ╪═════════════╪═══════════    │
   │         │                  │                │        │     │
   │  STAMBENO            PARK               ZANATSKA   SPORTSKI│
   │  (tvoja kuća,       (drveće, potok,     (pošta,     KVART  │
   │   susjedi, vrtovi)   most, paviljon)     muzej,   (dvorana,│
   │                                          kino)     stadion,│
   │         │                  │                │     igralište│
   │  ═══════╧═════════ OBALNA CESTA ═════════╧═════════╧═════  │
   │                                                            │
   │  ▓▓▓▓▓ RIVA ▓▓▓ lučica ▓▓▓ plaža ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
   │  ░░░░░░░░░░░░░ MORE ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
   └────────────────────────────────────────────────────────────┘
```

Devet zona, svaka s **svojim ljudima i svojim temama razgovora**. Riva govori o
moru, vremenu i ribi; školski kvart o učenju i djeci; Gornji grad o prošlosti.
To je razlog da se ide negdje — ne nagrada, nego drugi ljudi.

**Sportski kvart** (istočno, uz obalnu cestu) nije ukras — jezično je najbogatija
zona u igri. Na njemu se prirodno okupljaju četiri velike skupine iz rječnika koje
inače nemaju svoje mjesto u gradu:

| skupina | riječi u rječniku | gdje se javlja |
|---|---|---|
| sport | 27 | dvorana, stadion, razgovor s trenerom |
| tijelo | 30 | zagrijavanje, ozljede, "boli me…" |
| glagoli | 99 | trčati, skakati, baciti, uhvatiti, pobijediti |
| brojevi | 25 | rezultat, vrijeme, koliko krugova |

To je **oko 180 riječi** koje danas gotovo nemaju kontekst. Uz to, sport je jedina
tema u kojoj se prirodno govori u zapovjednom načinu („Trči!", „Dodaj!") i u
prošlom vremenu („Tko je pobijedio?") — dvije stvari koje ostatak grada slabo pokriva.

Sadržaj kvarta: **dvorana** (interijer — parket, koš, klupa, svlačionica),
**stadion** (vanjski — travnjak, bijele crte, tribina, gol, semafor, atletska staza)
i **igralište** uz školu (dodatak, dijeli pločice sa stadionom).

### 3.2 Čime je karta "bogata"

Bogatstvo nisu veće dimenzije nego **gustoća stvari koje odgovaraju**:

- **Table i natpisi** koji se čitaju razmaknicom: "PEKARA — bakery",
  "OTVORENO 7–14", "ZABRANJENO KUPANJE", "AUTOBUSNI KOLODVOR", cjenik u konobi,
  raspored sati na školskim vratima, plakat za kino. Oko **30 natpisa** — jeftin
  sadržaj, a grad odmah počne učiti jezik sam od sebe.
- **Predmeti koji nešto kažu**: klupa ("Ovdje ljudi sjede i gledaju more."),
  fontana, poštanski sandučić, štand, ribarska mreža, bicikl naslonjen na zid.
  Otprilike **40 pregledivih sitnica**.
- **Staze i kaldrma** kao vidljivi putevi umjesto današnje ravnomjerne trave.
- **Prečice i skrovita mjesta**: prolaz između kuća, stube do vidikovca, klupa
  iza crkve gdje sjedi netko koga inače ne sretneš.
- **Prepreke koje se otvore kad treba**: zaključana vrata parka, most preko
  potoka koji poprave nakon zadatka, gradilište. Ne zagonetke — samo razlog da
  se grad mijenja dok napreduješ.
- **Doba dana** *(opcija, v. pogl. 9)*: ujutro su djeca pred školom, popodne na
  igralištu, navečer je konoba puna. Isti grad, tri različita popisa ljudi.

### 3.3 Unutrašnjosti — 12 malih karata

Zgrada više nije modal. Ulaz na vrata → prijelaz na kartu 12×10 s vlastitim
podom, namještajem i ljudima. Izlaz je na otiraču.

| # | prostor | tko je unutra | o čemu se priča |
|---|---|---|---|
| 1 | Tvoja kuća | — | spremanje igre, bilježnica na stolu |
| 2 | Knjižnica | Bruno, čitateljica | riječi, knjige, ispravci |
| 3 | Škola | Damir, učenici, spremačica | rod, padeži, zadaća |
| 4 | Pekara | prodavačica, red ljudi | kupovina, količine, brojevi |
| 5 | Tržnica | Jela, tri prodavača | hrana, cijene, kategorije |
| 6 | Konoba | Ivo, gosti, kuharica | naručivanje, pristojnost |
| 7 | Pošta | Zoran, šalterica | adrese, pisanje, obrasci |
| 8 | Muzej | Ema, čuvar | prijevod natpisa, prošlost |
| 9 | Kino | razvodnik, blagajnica | razgovor na blagajni |
| 10 | Ambulanta | Petra | tijelo, kako se osjećaš |
| 11 | Crkva/zvonik | župnik, starica | tiši, sporiji govor, brojevi |
| 12 | Ribarska kućica | ribar Mate | more, vrijeme, alat |
| 13 | Sportska dvorana | trener Boris, igrači, domar | sport, tijelo, glagoli, rezultat |

Interijer je jeftin za nacrtati (jedan pod, četiri zida, pet komada namještaja),
a mijenja dojam iz temelja: zgrada postaje mjesto s ljudima, ne skočni prozor.

---

## 4. Razgovor je igra

Ovo je poglavlje koje nosi sve ostalo.

### 4.1 Svaki lik ima strukturu, ne repliku

Danas lik ima uvod, nalog i završnu rečenicu. U v2 svaki lik ima:

```
pozdrav        prvi put / svaki idući put / kad si mu već pomogao
teme           3–6 tema o kojima zna pričati; otvaraju se postupno
usputno        2–4 rečenice koje kaže "tek tako", nasumično
reakcije       na tvoj izbor u razgovoru — točan, netočan, nepristojan
priča          osobna nit koja se pomiče kroz igru (v. 4.4)
oproštaj       2 varijante
```

To je otprilike **15–20 replika po liku**, umjesto današnje 4.

### 4.2 Izbor u razgovoru nosi težinu — ali blago

Tri vrste izbora:

1. **Razumijevanje** — lik nešto kaže, biraš odgovor koji ima smisla.
   Pogrešan odgovor nije kazna: lik se nasmije, ponovi sporije, doda gestu.
   („Molim? …Aha, mislio si *kruh*. Evo, kruh.")
2. **Registar — *ti* ili *vi*.** Ovo je specifično hrvatsko i vrijedi ga učiti.
   Kažeš li starijoj gospođi „ti", ona te blago ispravi. Kažeš li vršnjaku „vi",
   nasmije se. Nema bodova, samo odaziv — i to je dovoljno da se zapamti.
3. **Pristojnost** — molim, hvala, izvolite, oprostite. Neki likovi na to
   reagiraju toplije i otvore temu koju inače ne bi.

Nema mjerača naklonosti na ekranu. Sve je u tome **što lik kaže sljedeći put**.

### 4.3 Svaka riječ u razgovoru je klikabilna

Ovo zamjenjuje izbačene "susrete" kao način da 903 riječi prođu kroz igru.

Bilo koja riječ u bilo kojoj replici može se kliknuti (ili odabrati strelicama
na tipkovnici). Otvara se kartica: prijevod, rod, vrsta, slika, izgovor ako
postoji mp3, i primjer rečenice. Riječ se upiše u **bilježnicu**.

Zašto je to dobro:
- sadržaj teče prirodno — što više razgovaraš, više riječi vidiš;
- igrač sam bira dubinu: netko klikne svaku riječ, netko nijednu;
- ne traži nikakvu novu mehaniku ni novi ekran za igranje;
- veže se na `croland-mini-ucenje`, pa **bilježnica raste i kad igraš druge igre**.

### 4.4 Likovi se sjećaju i mijenjaju

Mala stvar, veliki učinak. Tri razine pamćenja:

- **Da si tu bio** — „Opet ti!", „Jučer si kupio kruh, sjećam se."
- **Što si napravio** — nakon riješenog zadatka lik ima nove teme.
- **Koliko znaš** — kad ti bilježnica naraste, likovi ti govore duže rečenice
  i rjeđe prevode. Grad ti se **prilagođava**, a da to nigdje ne piše.

Zadnje je najvrednije: ista igra na početku govori „Kruh. Bread." a poslije
„Danas je kruh svježiji nego jučer, uzmi ovaj s kraja."

### 4.5 Kako izgleda na ekranu

```
┌───────────────────────────────────────────────┐
│                                               │
│            [ grad, 13×9 pločica ]             │
│                                               │
├───────────────────────────────────────────────┤
│ 👩‍🍳  Jela, prodavačica na tržnici             │
│                                               │
│  Dobar dan! Danas imamo svježe rajčice.       │
│  Good day! Today we have fresh tomatoes.      │
│  ─────────────────────────────────────────    │
│  › Dobar dan. Koliko košta kilogram?          │
│  › Dobar dan. Imate li kruha?                 │
│  › (odlazak)                                  │
└───────────────────────────────────────────────┘
```

Hrvatski krupno, engleski sitno ispod — to postojeća igra već radi dobro i
ostaje. Novo: engleski se **može isključiti** u postavkama, i sam se skriva
kod likova čije si teme već prošao.

---

## 5. Ljudi

Deset postojećih likova ostaje, sa svojim imenima, i dobiva prostor. Novih
otprilike dvadeset.

| zona | likovi |
|---|---|
| Stambeno | **Baka Mara**, susjed Tomislav, blizanke Iva i Ana, poštarov pas |
| Trg | **Knjižničar Bruno**, ulični svirač, prodavačica novina, starac na klupi |
| Dućani | prodavačica u pekari Vesna, **Jela** (tržnica), **Konobar Ivo**, dostavljač |
| Školski kvart | **Učitelj Damir**, **Dječak Luka**, učenica Sara, spremačica Kata |
| Zanatska | **Poštar Zoran**, šalterica Nada, **Ema** (muzej), čuvar Filip, razvodnik |
| Gornji grad | župnik, starica Ruža, klesar, **Vozač Slaven** na okretištu |
| Riva | ribar Mate, ribarica Anka, turist s kartom, djeca koja pecaju |
| Park | vrtlar, žena sa psom, **Liječnica Petra** na šetnji |
| Sportski kvart | trener Boris, vratar Dario, atletičarka Lana, domar Stipe, navijač Krešo |

**Ukupno ~35 likova.** Pola ih ima zadatke; druga polovica postoji samo da se s
njima razgovara — i to je u redu, jer razgovor **je** sadržaj.

Za svakog lika treba: ime, dob, zanimanje, kako govori (brzo/sporo, dijalekt
naznačen s mjerom), tri do šest tema, osobna nit.

---

## 6. Zadaci

Postojećih 15 se zadržava i prepisuje na novi grad; dopunjuje se do **~28**.
Ostaje 10 tipova vježbi koje već rade (kupovina, dostava, kviz, dijalog,
razvrstavanje, praznine, prijevod rečenica, upis, suprotnice, završna provjera).

Dvije promjene:

1. **Zadatak se ne otvara kao modal iza vrata** nego se odvija u prostoru:
   kupovina je razgovor za pultom, razvrstavanje je slaganje na štandu,
   dostava je stvarno nošenje pisma kroz grad do određenog lika.
2. **Više zadataka je aktivno odjednom** i vodi ih dnevnik. Redoslijed biraš sam;
   neki traže prethodni (ključ, propusnica, poznanstvo).

Zadaci su **razlog da odeš negdje**; razgovori usput su ono zbog čega ideš pješice.

---

## 7. Bilježnica

Skromna, bez sustava razina i ponavljanja s odbrojavanjem.

- Popis svih riječi na koje si naišao, po zonama i vrstama.
- Uz svaku: gdje si je čuo i od koga („rajčica — tržnica, Jela").
- Rečenice koje si sreo, spremljene kao primjeri.
- Filter: riječi koje si vidio samo jednom.
- Brojka u HUD-u: `📖 84` — jedini pokazatelj napretka koji igrač vidi.

Ništa se ne "lovi", ništa ne pada za razinu, nema testova. Bilježnica je zapis,
ne sustav.

---

## 8. Napredak — i dalje otvoreno

Bez značaka i bez borbi ostaju tri poštene opcije:

- **A — Dnevnik i otvoren grad.** Zadaci se nude, biraš redoslijed, grad se
  otvara kako ih rješavaš (most, park, gornji grad). Kraj je kad su svi gotovi.
- **B — Poglavlja/dani.** Igra je podijeljena na dane ili poglavlja ("Prvi dan
  u gradu", "Tržnica", "Blagdan"). Svako ima svoju malu priču i 3–4 zadatka.
  Najbolje za pripovijedanje i najlakše za dodavanje sadržaja kasnije.
- **C — Ljudi kao mjera.** Napreduješ tako da upoznaješ ljude; svaki upoznati
  lik otvara nekog drugog („Pitaj moju sestru na rivi"). Grad se širi kroz
  poznanstva.

Moja preporuka: **B kao okvir, A kao način rada unutar poglavlja.** Poglavlja
daju priči oblik i jasan kraj, a unutar dana si slobodan. C je lijep dodatak
— dio zadataka neka se otvara preporukom drugog lika.

---

## 9. Otvorena pitanja

1. **Napredak** — A, B ili C (preporuka: B + A).
2. **Doba dana** — dodaje puno života za relativno malo koda (tri popisa
   pozicija likova), ali utrostručuje broj replika za pozdrave. Da ili ne?
3. **Ime grada.**
4. **Koliko sati igre ciljamo?** To određuje broj zadataka i poglavlja.
5. **Dijalekt** — koliko primorskog/kajkavskog u govoru likova? Daje karakter,
   ali može zbuniti početnika. Prijedlog: samo u pozdravima i uzrečicama.
6. **Engleski ispod** — uvijek, na klik, ili se postupno gasi kako napreduješ?

---

## 10. Koliko sadržaja treba napisati

Rječnik (903), rečenice (334), praznine (107), suprotnice (55) i savjeti (30)
**već postoje**. Novo je:

| što | količina |
|---|---|
| replike likova (35 likova × ~17) | ~600 |
| natpisi i table po gradu | ~35 |
| opisi pregledivih sitnica | ~45 |
| zadaci — prepisati 15 + napisati 17 (od toga 4 sportska) | 32 |
| tekstovi sustava (dnevnik, bilježnica, prijelazi) | ~30 |
| **ukupno kratkih dvojezičnih tekstova** | **~740** |

Puno je, ali je to jedina vrsta posla koju mogu odraditi u cijelosti i predati
ti na ispravak — a ne obrnuto.

---

## 11. Koliko pixel slika stvarno treba

Sve je statično — jedan frame po sličici, nula animacija.

### 11.1 Pravilo koje odlučuje: spaja li se ili stoji sam

Emoji ne pada zato što je "manje vrijedan", nego zato što **ne zna dodirivati
susjeda**. Sve što se mora nastavljati preko ruba pločice — trava, staza,
kaldrma, more, zid, krov — mora biti nacrtano. Sve što stoji samo na pločici,
s prostorom oko sebe, emoji odradi bez problema.

| emoji **ne** može | emoji **može** |
|---|---|
| tlo, staze, voda, plaža | klupa, fenjer, sandučić, bicikl, kanta |
| zidovi, ograde, krovovi | namještaj u interijeru (🛏 🪑 🪴 📚 🧺 📦) |
| bilo što što se boji ili prelijeva | sitnice na štandovima i policama |
| igrač (u njega se gleda cijelu igru) | sporedni likovi na karti |
| stvari manje od ~20 px | ikone sučelja, dnevnik, bilježnica |
| ono što mora pokazivati smjer | ilustracije riječi (već imaju okvir) |

Dva sitna trika koji emoji na crtanoj podlozi čine podnošljivim:

1. **Jedna zajednička sjena** — ovalna mrlja ispod svakog emoji-objekta. Jedna
   sličica, a sve prestaje "lebdjeti" nad tlom.
2. **Emoji se ne skalira preko ~24 px** na karti. Krupni emoji izgleda kao
   naljepnica; sitni izgleda kao dio scene.

Jedno upozorenje: emoji izgleda **drukčije na Windowsu, Androidu i iPhoneu**.
Za sitnice je to nevažno, ali ništa što nosi identitet igre (igrač, zgrade,
grad) ne smije ovisiti o njemu.

### 11.2 Razine — od najmanje prema potpunoj

**Razina 1 — tlo, zidovi i kuće. ~60 slika.**
Sve ostalo emoji. Ovo je najveći skok dojma po nacrtanoj slici u cijelom projektu.

| skupina | komada | popis |
|---|---|---|
| teren | 20 | trava ×3, cvjetna trava, zemljana staza, kaldrma, pločnik, pijesak, more, plićak, potok, most, stube, parket (dvorana), travnjak ×2, atletska staza, bijela crta, rubovi trava→staza i trava→pijesak |
| granice | 6 | kameni zid, drvena ograda, mrežasta ograda, živica, kamena obala, rub mola |
| zgrade (svaka kao jedna slika ~128×96) | 17 | tvoja kuća, 3 obične kuće, knjižnica, škola, pekara, tržnica, konoba, pošta, muzej, kino, ambulanta, crkva sa zvonikom, ribarska kućica, **dvorana**, **stadion (ulaz + tribina)** |
| krupni objekti koji se moraju uklopiti | 12 | drvo ×2, čempres, palma, grm, fontana, paviljon, tribina, gol, koš, semafor, vidikovac |
| igrač | 4 | 4 smjera, statično |
| pomoćno | 1 | zajednička sjena ispod objekata |
| **ukupno** | **60** | |

**Razina 2 — portreti likova. +35 slika (ukupno ~95).**
Lice uz repliku, ~64×64, pola tijela. Najisplativiji dodatak nakon razine 1 —
jedan portret diže razgovor više nego deset pločica. Na karti likovi i dalje
ostaju emoji.

**Razina 3 — likovi na karti. +35 slika (ukupno ~130).**
35 likova, jedan pogled (sprijeda), statično. Radi se tek kad portreti postoje,
da se lice i figura poklapaju.

**Razina 4 — interijeri i sitnice. +45 slika (ukupno ~175).**
Namještaj i rekviziti umjesto emojija: pult, police, štandovi, ploča, vitrine,
kasa, peć, oltar, mreže, koševi za smeće, klupe, fenjeri, table.

**Nikad obavezno:** 903 ilustracije riječi. One žive u svom okviru s obojanom
mrljom, gdje emoji izgleda posve u redu — i tako mogu ostati zauvijek, ili se
puniti postupno.

### 11.3 Preporuka

Nacrtaj **razinu 1 (60 slika)** i stani. To je jedan tjedan crtanja, a igra
prestaje izgledati kao prototip. Tek kad to vidiš u pokretu, odluči ide li se
na portrete.

Prvo se crtaju **jedna ulica i jedan interijer** kao uzorak — po njima se
određuje paleta (16–24 boje za cijelu igru) i tek onda ostalih 55.

---

## 12. Tehnika

- Radi se u `01-grad-v2.html`; postojeća datoteka se ne dira dok v2 ne bude bolja.
- Kamera i zum su **već napravljeni** i prelaze bez izmjena.
- Karta iz niza stringova → **objekt sa slojevima** (`teren`, `objekti`,
  `prolaz`, `natpisi`), inače se karta od 44×34 ne da održavati.
- Prijelazi vanjsko↔unutarnje: popis vrata `{x, y, kamo, ulazX, ulazY}`.
- **Dijalozi u zaseban podatkovni blok** (`_sadrzaj/grad-likovi.js`), ugrađuje ih
  `ugradi.js` kao i ostali sadržaj — da se tekst može popravljati bez diranja koda.
- Spremanje: `localStorage`, ključ `croland-mini-grad` (isti kao danas) — pozicija,
  dnevnik, bilježnica, stanja likova. Znanje riječi ostaje u zajedničkom
  `croland-mini-ucenje`.
- Bodovanje prema aplikaciji ostaje 100 × 4 valute, jednokratno; veže se na
  završetak zadnjeg poglavlja.
- Emoji ostaje kao zamjena dok slike ne stignu, ali prelazak na crtane sličice
  ide **sve odjednom unutar ove igre** — miješani stil na karti se odmah vidi.

---

## 13. Redoslijed rada

| faza | što | rezultat |
|---|---|---|
| 1 | slojevita karta, novi grad 44×34, staze, zone | hodaš po novom gradu |
| 2 | vrata i 12 interijera | ulaziš u zgrade i hodaš po njima |
| 3 | novi sustav razgovora (teme, izbori, pamćenje, klik na riječ) | jezgra radi |
| 4 | 30 likova s replikama | grad je živ |
| 5 | 28 zadataka, dnevnik | priča i struktura |
| 6 | bilježnica, natpisi, sitnice | punoća |
| 7 | balans, zvuk, prijelazi | gotovo |
| 8 | grafika kad slike stignu | izgleda kako treba |

Faze 1–3 odlučuju hoće li igra biti dobra. Faze 4–6 su količina — i tu je posao
uglavnom pisanje, koje mogu preuzeti u cijelosti.
