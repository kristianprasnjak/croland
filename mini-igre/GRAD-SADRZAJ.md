# Grad v2 — sadržaj

Radni dokument za pisanje. Svijet je gotov i hoda se po njemu; ovo je ono što se
u njega ulijeva.

**Sve u igri piše samo na hrvatskom.** Nema prijevoda ispod replike, nema pomoći
u zagradi. Ako nešto ne razumiješ, otvaraš **rječnik** — i to te stoji novčić.
Vidi poglavlje 1a.

Sadržaj se ne piše u HTML-u nego u `_sadrzaj/grad-likovi.js`, odakle ga
`ugradi.js` ubacuje u igru — isto kao rječnik i rečenice. Tako se tekst može
popravljati bez diranja koda.

---

## 0. Kakva je ovo igra — i što to znači za pisanje

Grad **nije lekcija.** Ne nadovezuje se na gradivo, ne pretpostavlja da si nešto
prošao i ne prilagođava se razini igrača. To je **provjera stvarnog znanja**:

- tko govori hrvatski, prelazi je **100 %**;
- tko je tek instalirao aplikaciju, izvući će **10 %** i to je u redu;
- isti taj igrač nakon 20 lekcija vraća se i izvuče 50 %, pa 80 %;
- netko će je preći iz prve, netko tek iz pete.

**Tri posljedice za pisanje, i sve tri su oslobađajuće:**

1. **Piše se prirodni hrvatski**, onakav kakav ljudi doista govore. Ne gradira se
   po težini, ne izbjegavaju se padeži i ne štede se riječi. Baka Mara ne govori
   kao udžbenik za početnike nego kao baka.
2. **Ne provjeravam „zna li igrač ovu riječ".** Prije je pitanje bilo smiju li
   likovi koristiti riječi koje igrač još nije naučio — sada je odgovor: smiju,
   i baš to je poanta.
3. **Težina raste prirodno kroz grad**, ne po planu: riva i gornji grad govore
   teže od stambenog kvarta jer tamo žive drukčiji ljudi, a ne zato što je to
   „druga razina".

Igra se zato može igrati **više puta kroz mjesece**, i svaki put dade drukčiji
postotak. To je i mjera napretka koju nijedna lekcija ne može dati.

---

## 1. Kako je zapisan lik

```js
{
  id: "mara",
  ime: "Baka Mara",
  en: "Grandma Mara",
  dob: 74, zona: "stambeno", vi: true,     // vi:true → očekuje persiranje
  govor: "sporo",                           // sporo | normalno | brzo
  lik: "lik-4-2",                           // sličica iz atlasa
  pozdrav: {
    prvi:  ["Dobar dan. Vi ste novi ovdje?", "Good day. Are you new here?"],
    opet:  ["Opet vi! Lijepo.", "You again! Nice."],
    poslije: ["Moj spasitelj! Kako ste?", "My saviour! How are you?"]
  },
  teme: [
    { id:"vrijeme", naslov:["Vrijeme","The weather"], otvoreno:true,
      redci:[["Danas je toplo, ali navečer će zahladiti.",
              "Today it is warm, but in the evening it will get cold."]] }
  ],
  usputno: [
    ["Mačka mi je opet pobjegla.", "My cat ran away again."]
  ],
  oprosta: [["Doviđenja i čuvajte se.", "Goodbye and take care."]]
}
```

**Registar (`vi`)** je jedina mehanika u razgovoru: ako liku koji očekuje *vi*
odgovoriš s *ti*, blago te ispravi i to je sve — nema bodova ni mjerača.

Engleski se i dalje zapisuje uz svaku repliku, ali **igrač ga ne vidi** — služi
rječniku i kontroli prijevoda. U igri se prikazuje samo hrvatski redak.

---

## 1a. Rječnik — 1 novčić po otvaranju

Nosiš rječnik sa svih 903 riječi. Otvaraš ga tipkom **R** ili gumbom 📖.
Traži se upisom ili se lista po vrstama.

**Jedno otvaranje = jedan novčić.** Dok je rječnik otvoren, gledaj koliko hoćeš;
plaća se otvaranje, ne riječ. To nagrađuje onoga tko skupi nekoliko nepoznanica
pa ih provjeri odjednom, umjesto da otvara rječnik deset puta u istom razgovoru.

### Novčići i bodovi su dvije odvojene stvari

**Postotak koji igrač dobije ovisi isključivo o tome što je riješio.** Gledanje u
rječnik ga ne umanjuje ni za jedan bod. Novčić je resurs unutar igre, ne kazna.

Iz toga slijedi jedina stvar koju novčići rade: **određuju koliko pomoći možeš
dobiti prije nego je moraš zaslužiti.** Ostaneš li bez njih, rječnik se zaključa
dok ne zaradiš još — i to je u redu, jer igrač koji dalje ide bez pomoći
jednostavno riješi manje i dobije niži postotak. Rezultat tako i dalje pošteno
mjeri znanje.

### Odakle novčići

Ključno: **dio prihoda ne smije ovisiti o znanju hrvatskog.** Inače početnik
ostane bez pomoći baš zato što mu treba, a to je jedina zamka u sustavu.

| izvor | iznos | traži li znanje |
|---|---|---|
| početni iznos | **40** | — |
| prvi ulazak u zgradu | +2 | **ne** |
| prvi dolazak u novu zonu | +3 | **ne** |
| pronađena sitnica u gradu | +1 | **ne** |
| pročitan natpis prvi put | +1 | **ne** |
| točan odgovor u razgovoru | +1 | da |
| riješen zadatak | +5 | da |

Prva četiri reda daju **oko 70 novčića samo za istraživanje grada** — dovoljno da
i onaj tko ne razumije ni riječ ima stalan dotok pomoći dok hoda i otkriva.
Ostatak zarađuje tko zna.

Grubi zbroj kroz igru: **oko 210 novčića**, od čega trećina bez ijedne hrvatske
riječi.

### Što se broji

- Rječnik pamti **koliko si puta koju riječ tražio**, i to je najbolji mogući
  popis za ponavljanje: riječi koje si gledao pet puta su točno one koje ne znaš.
- Ta se evidencija dijeli s ostalim mini-igrama preko `croland-mini-ucenje`,
  pa Zmija i Labirint znaju što ti ne ide.

---

## 1b. Ekonomija — na što se novčići troše

Novčić je **novac gradića**. Sve što bi u stvarnom gradu nešto koštalo, košta i
ovdje. Ali vrijedi jedno pravilo, inače ekonomija postane zaposlenost bez svrhe:

> **Svaki trošak mora kupiti ili pomoć ili sadržaj. Ništa se ne kupuje zato da se
> nešto kupuje.**

Zato nema općenite kupovine hrane, opreme, ukrasa ni „napretka". Postoje tri
vrste troška i sve tri nešto stvarno daju.

### 1. Pomoć — kupuješ razumijevanje

| što | cijena | što dobiješ |
|---|---|---|
| rječnik | 1 | otvaranje; gledaj koliko hoćeš dok je otvoren |
| „Možete li ponoviti?" | 1 | lik ponovi repliku sporije i kraćim riječima |
| „Kako se ovo kaže?" | 2 | lik ti sam kaže riječ koja ti fali u odgovoru |
| prijevod natpisa | 1 | jedan natpis u gradu prevede se cijeli |

Druga stavka je najvrednija u cijelom popisu: **možeš tražiti da ti se ponovi.**
To je ono što stvarni čovjek radi kad ne razumije, i uči više nego rječnik.

### 2. Pristup — kupuješ mjesto na kojem ima sadržaja

Ulaznice nisu ukras: **iza svake su vrata s razgovorom, likom i zadatkom.**
A sama kupnja ulaznice je vježba — brojevi, cijene, pristojnost na blagajni.

| gdje | cijena | što je iza |
|---|---|---|
| kino | 8 | razgovor na blagajni + razvodnik + film |
| utakmica na stadionu | 5 | Dario, rezultat, prošlo vrijeme |
| muzej | 3 | natpisi za prevesti, čuvar Filip |
| autobus preko grada | 2 | Slaven, imena stanica, brzi prijelaz |
| toranj crkve | 2 | vidikovac, don Ante, sat i brojevi |

Autobus je namjerno jeftin: tko ne želi pješačiti, plati — ali time propušta
susrete usput. Mala odluka, ali stalna.

### 3. Druga prilika — kupuješ ispravak

| što | cijena |
|---|---|
| ponovi zadatak koji si pokvario | 3 |
| preskoči zadatak koji nikako ne ide | 10 |

Preskakanje je skupo namjerno. Ne donosi bodove, ali otvara ono što je iza njega,
pa igrač nikad ne ostane zaglavljen.

### Kupovina za zadatke — novac daje onaj tko šalje

Kad te baka Mara pošalje po kruh, **ona ti da novac.** Isto vrijedi za sve
zadatke s kupovinom.

Razlog je praktičan: da igrač koji je potrošio sve na rječnik ne ostane zaglavljen
na zadatku koji ne može platiti. Vježba kupovine ostaje ista — brojiš, tražiš,
zahvaljuješ — ali iz tuđe torbe.

### Što ostane na kraju

Neutrošeni novčići **ne daju bodove**. Na završnom zaslonu pišu kao zasebna
brojka:

> Riješeno: **62 %** · Novčića ostalo: **118 od 210**

To je druga, tiša mjera znanja — **koliko ti pomoći nije trebalo.** Dva igrača s
istih 62 % nisu isti ako je jedan potrošio sve, a drugi ništa. Bodove to ne dira.

---


## 2. Natpisi po gradu

**Načelo: manje je bolje.** Natpis ima smisla samo ondje gdje bi u stvarnom
gradu doista stajao, i samo ako nosi riječ koja negdje drugdje zatreba. Grad
prepun tabli izgleda kao vježbenica, a ne kao mjesto.

Postojećih 24 (nazivi zgrada + imena ulica i trgova) ostaje — to su natpisi koji
i inače stoje na zgradama. Od predloženih 18 dodatnih **zadržavam osam**, i to
one koje nose brojeve, vrijeme i količine, jer se to teško uči drukčije.
Ostalih deset ispada.

| gdje | hrvatski | engleski |
|---|---|---|
| glavna ulica | GLAVNA ULICA | main street |
| trg | TRG | town square |
| tržnica | TRŽNI TRG — utorkom i petkom | market square — Tuesdays and Fridays |
| škola | ŠKOLSKO DVORIŠTE | school yard |
| sport | SPORTSKI CENTAR | sports centre |
| obala | OBALNA CESTA | coastal road |
| lučica | LUČICA | small harbour |
| gornji grad | GORNJI GRAD | upper town |
| + 16 natpisa na zgradama (Pekara — bakery, Škola — school, …) | | |

### Osam koje ostaju

Svaki nosi nešto što se poslije traži u zadatku — vrijeme, količinu, cijenu ili
zabranu. Ništa što je puki ukras.

| gdje | natpis | zašto baš taj |
|---|---|---|
| pekara | OTVORENO 6–14 · NEDJELJOM ZATVORENO | sati i dani u tjednu |
| tržnica | CIJENE PO KILOGRAMU | mjere, veže se na Ankinu vagu |
| konoba | DANAS: GRAH I KRUH | jelovnik, veže se na Ivin zadatak |
| škola | RASPORED SATI NA VRATIMA | vrijeme i redoslijed |
| muzej | ULAZ 3 € · DJECA BESPLATNO | brojevi i novac |
| kino | VEČERAS U 20 SATI | sat u 24-satnom obliku |
| plaža | ZABRANJENO SKAKANJE S MOLA | zabrana, glagolska imenica |
| stadion | UTAKMICA U NEDJELJU U 17 | dan + sat, veže se na Darijev zadatak |

**Ispada** deset ostalih (TIŠINA MOLIM, NE GAZI TRAVU, ULAZ ZA UČENIKE i sl.) —
lijepi su, ali ne nose ništa novo i samo gušu grad.

---

## 3. Ljudi — 35 likova

Označeno **✍** = napisan u cijelosti, **○** = tek skica.

### Stambeno
| id | ime | dob | vi | uloga | stanje |
|---|---|---|---|---|---|
| mara | Baka Mara | 74 | da | susjeda, uvodni zadaci | ✍ |
| tomislav | Susjed Tomislav | 48 | da | popravlja sve, posuđuje alat | ○ |
| iva | Iva | 10 | ne | blizanka, brzo govori | ○ |
| ana | Ana | 10 | ne | blizanka, sve ponavlja | ○ |

### Trg
| bruno | Knjižničar Bruno | 61 | da | daje bilježnicu, ispravlja | ✍ |
| svirac | Ulični svirač Rene | 27 | ne | pjeva, uči te riječi kroz stihove | ○ |
| novinarka | Prodavačica novina Vera | 55 | da | zna sve tračeve | ○ |
| starac | Starac Jure | 82 | da | sjedi na klupi, priča o prošlosti | ○ |

### Dućani
| vesna | Pekarica Vesna | 39 | da | kupovina, količine | ✍ |
| jela | Jela s tržnice | 52 | da | kategorije, cjenkanje | ○ |
| ivo | Konobar Ivo | 33 | ne | naručivanje, pristojnost | ○ |
| dostavljac | Dostavljač Bruno ml. | 22 | ne | žuri, govori u kraticama | ○ |

### Školski kvart
| damir | Učitelj Damir | 45 | da | rod, padeži, zadaća | ○ |
| luka | Dječak Luka | 8 | ne | prati te, komentira | ○ |
| sara | Učenica Sara | 12 | ne | pomaže ti, malo se pravi važna | ○ |
| kata | Spremačica Kata | 58 | da | zna gdje je što | ○ |

### Zanatska
| zoran | Poštar Zoran | 41 | ne | dostave po gradu | ○ |
| nada | Šalterica Nada | 49 | da | obrasci, adrese | ○ |
| ema | Turistkinja Ema | 29 | ne | prijevodi natpisa u muzeju | ○ |
| filip | Čuvar Filip | 36 | da | pušta te ili ne pušta | ○ |
| razvodnik | Razvodnik Mario | 24 | da | razgovor na blagajni | ○ |

### Gornji grad
| zupnik | Župnik don Ante | 63 | da | brojevi, sat, mir | ○ |
| ruza | Starica Ruža | 88 | da | govori sporo i tiho, stare riječi | ○ |
| klesar | Klesar Šime | 50 | ne | alat, materijali | ○ |
| slaven | Vozač Slaven | 44 | ne | linije, stanice, vrijeme | ○ |

### Riva
| mate | Ribar Mate | 66 | ne | more, vrijeme, ribe | ○ |
| anka | Ribarica Anka | 60 | da | prodaja, težine | ○ |
| turist | Turist Hans | 51 | da | ne zna hrvatski, ti mu prevodiš | ○ |
| djeca | Djeca koja pecaju | 9 | ne | trče, prekidaju | ○ |

### Park
| vrtlar | Vrtlar Zdravko | 57 | ne | biljke, godišnja doba | ○ |
| zena-psom | Žena sa psom, Sanja | 34 | ne | životinje | ○ |
| petra | Liječnica Petra | 42 | da | tijelo, kako se osjećaš | ○ |

### Sportski kvart
| boris | Trener Boris | 47 | ne | zapovjedni način: Trči! Dodaj! | ○ |
| dario | Vratar Dario | 21 | ne | rezultat, prošlo vrijeme | ○ |
| lana | Atletičarka Lana | 19 | ne | brojevi, vrijeme, mjere | ○ |
| stipe | Domar Stipe | 62 | da | ključevi, pravila | ○ |

---

## 4. Tri napisana lika kao mjerilo

### 4.1 Baka Mara — stambeno, prvi lik kojeg sretneš

**Pozdrav, prvi put**
> Dobar dan. Vi ste onaj novi iz zgrade preko puta?
> *Good day. Are you the new one from the building across the road?*

**Pozdrav, svaki idući**
> Opet vi. Sjedite malo, nemam s kim razgovarati.
> *You again. Sit a while, I have no one to talk to.*

**Ako joj kažeš „ti"**
> Mladiću, ja sam vam baka. Recite mi „vi", pa ćemo se lijepo slagati.
> *Young man, I am a grandmother to you. Say "vi" to me and we shall get on fine.*

**Tema: kruh** *(otvorena od početka)*
> U pekari na uglu peku kruh svako jutro u šest. Onaj s kraja police je najsvježiji.
> *At the bakery on the corner they bake bread every morning at six. The one at the end of the shelf is the freshest.*

**Tema: mačka** *(otvara se nakon prve usluge)*
> Moja mačka se zove Mica i stalno bježi u park. Ako je vidite, recite mi.
> *My cat is called Mica and she keeps running off to the park. If you see her, tell me.*

**Tema: grad** *(otvara se kad bilježnica ima 30 riječi)*
> Prije je ovdje sve bilo polje. Sad ima i semafor. Ne znam je li to napredak.
> *It was all fields here before. Now there is even a traffic light. I do not know if that is progress.*

**Usputno**
> Vruće je danas. · *It is hot today.*
> Jeste li jeli? Mršavi ste. · *Have you eaten? You are thin.*
> Ovo koljeno mi javlja kišu. · *This knee of mine announces rain.*

**Oproštaj**
> Doviđenja i čuvajte se. · *Goodbye and take care.*
> Dođite opet, uvijek sam tu. · *Come again, I am always here.*

---

### 4.2 Knjižničar Bruno — trg, daje ti bilježnicu

**Pozdrav, prvi put**
> Dobar dan. Vidim po licu — ne razumijete ni riječ, je li tako?
> *Good day. I can see it on your face — you do not understand a word, is that right?*

> Nije to strašno. Evo, uzmite ovu bilježnicu. Svaka riječ koju čujete u gradu upisat će se sama.
> *That is not so bad. Here, take this notebook. Every word you hear in town will write itself in.*

**Pozdrav, svaki idući**
> Kako napreduje bilježnica?
> *How is the notebook coming along?*

**Tema: kako riječi rade**
> Hrvatski nema članova. Nema „a" ni „the". Kuća je kuća.
> *Croatian has no articles. There is no "a" and no "the". A house is a house.*

**Tema: rodovi** *(otvara se nakon 20 riječi)*
> Svaka imenica ima rod. Muški, ženski, srednji. Većina ženskih završava na -a.
> *Every noun has a gender. Masculine, feminine, neuter. Most feminine ones end in -a.*

**Tema: savjet** *(nakon 60 riječi)*
> Sad već razumijete više nego što mislite. Prestanite prevoditi u glavi.
> *You already understand more than you think. Stop translating in your head.*

**Usputno**
> Tiho, molim. Iako, nema nikoga. · *Silence, please. Although, there is nobody here.*
> Ovu knjigu nitko nije posudio dvadeset godina. · *Nobody has borrowed this book in twenty years.*

---

### 4.3 Pekarica Vesna — dućani, prvi zadatak s kupovinom

**Pozdrav, prvi put**
> Dobro jutro! Izvolite?
> *Good morning! What would you like?*

**Izbori igrača**
> › Dobro jutro. Jedan kruh, molim. — **točno**
> › Dobro jutro. Jedan kruh. — *točno, ali bez „molim"; Vesna to primijeti*
> › Kruh. — *razumije te, ali odgovori kraće nego inače*

**Ako izostaviš „molim"**
> Evo. Kod nas se kaže i „molim", ali dobro, naučit ćete.
> *Here you are. Around here we also say "please", but never mind, you will learn.*

**Tema: vrste kruha**
> Imamo bijeli, crni i polubijeli. Crni je zdraviji, bijeli je bolji.
> *We have white, dark and half-white. Dark is healthier, white is better.*

**Tema: količine** *(za zadatak s brojevima)*
> Koliko? Jedan, dva, pola? Pola kruha se isto može kupiti.
> *How many? One, two, half? You can buy half a loaf too.*

**Usputno**
> Ustajem u četiri. Svaki dan. · *I get up at four. Every day.*
> Miriše, je li? · *Smells good, doesn't it?*

---

## 5. Zadaci — 27 napisanih i u igri

Svih 27 je **ugrađeno i prohodno** — testirano automatski, bez zaglavljivanja.
Od 38 likova, **27 daje zadatak**, 22 su nečiji cilj, **34 su uključena** u barem
jedan. Preostala četvorica (blizanke, dijete s udicom, svirač…) su tu za atmosferu.

**Tri mehanike, sve tri su „obavi za mene":**

- **donesi** — pošalju te k nekome, on ti da stvar, vraćaš se davatelju
- **odnesi** — odmah dobiješ stvar, nosiš je primatelju, tu i završava
- **poruka** — preneseš pitanje ili poruku, pa se vraćaš s odgovorom

**Jezična provjera je na predaji.** Kad dođeš do druge strane, ona te nešto pita i
biraš između tri odgovora. Krivi odgovor te ne blokira — lik te ispravi i pokušavaš
opet — ali se broji. Redoslijed ponuđenih odgovora je svaki put drukčiji.

### Niti koje povezuju priče

Zadaci nisu izolirani. Nekoliko ih se međusobno dodiruje, pa grad djeluje kao mjesto
gdje se ljudi znaju:

- **Posuđeno pa zaboravljeno** — Tomislavov čekić kod Šime, Šimin klin kod Stipe,
  Matina igla kod Anke, Brunina knjiga kod Sare. Četiri različita čovjeka, isti ljudski
  propust. Igrač to primijeti sam, nitko mu ne kaže.
- **Jure i Ruža** — on je na trgu, ona u Gornjem gradu, plesali su u lipnju šezdeset
  i prve. On pita sjeća li se; ona kaže da je gazio po nogama, ali da su plesali do zore.
  Nakon toga on govori da će „ovih dana gore, kad malo zahladi".
- **Tiha zahvalnost** — Vesna Ruži šalje pecivo i ne naplaćuje; Anka sestri Mariji
  nosi ribu jer joj je zimus pomogla; Dario Kreši daje ulaznice i traži da se ne kaže
  od koga su. Nitko od njih to ne izgovara naglas.
- **Hans uči hrvatski** — traži da za njega pitaš ima li knjižnica rječnik za strance.
  Bruno poruči da dođe osobno jer „i tako mora vježbati". Poslije Hans kaže: „Bio sam
  u knjižnici. Sam! I razumio sam pola."
- **Škola** — Sari treba popis lektire od Damira, Damiru kreda od Kate, a Kata poručuje
  da ne baca komadiće po podu. Kad joj to preneseš, Damir kaže: „Prenio si vjerno, vidim."

### Likovi pamte što si napravio

Svaki davatelj ima i **replike za poslije**. Baka Mara više ne traži kruh nego zove na
kavu; Tomislav javlja da krov ne kaplje; Luka priznaje da mu je Stipe jučer mahnuo.
To je jedina „memorija" u igri i dovoljna je da se ne čini da hodaš kroz kulise.

### Svih 27

| # | id | daje | tip | druga strana | o čemu je | provjera na predaji |
|---|---|---|---|---|---|---|
| 1 | `kruh` | Baka Mara | donesi | Pekarica Vesna | Donesi baki Mari kruh iz pekare (Dućani) | „Izvolite? Što trebate?" → **Jedan kruh, molim.** |
| 2 | `pismo` | Poštar Zoran | odnesi | Don Ante | Odnesi pismo don Anti u crkvu (Gornji grad) | „Nosiš mi nešto, sinko?" → **Pismo od poštara Zorana.** |
| 3 | `cekic` | Susjed Tomislav | donesi | Klesar Šime | Uzmi Tomislavov čekić od klesara Šime (Gornji grad) | „Tebe šalje Tomislav? Po što?" → **Po čekić.** |
| 4 | `pecivo` | Pekarica Vesna | odnesi | Starica Ruža | Odnesi vrećicu peciva starici Ruži (Gornji grad) | „Što mi to nosiš, dijete?" → **Pecivo iz pekare.** |
| 5 | `knjiga` | Knjižničar Bruno | donesi | Učenica Sara | Uzmi od Sare knjigu za knjižnicu (Školski kvart) | „Šalje te Bruno? Zbog čega?" → **Zbog knjige koju nisi vratila.** |
| 6 | `riba` | Konobar Ivo | donesi | Ribarica Anka | Donesi Ivi ribu od Anke s rive | „Za koga je riba?" → **Za konobu, Ivo me šalje.** |
| 7 | `rajcice` | Jela | odnesi | Konobar Ivo | Odnesi sanduk rajčica Ivi u konobu (Dućani) | „Što je u sanduku?" → **Rajčice s tržnice.** |
| 8 | `muzej` | Turistkinja Ema | poruka | Čuvar Filip | Pitaj čuvara Filipa u muzeju kad je ulaz besplatan, pa javi Emi | „Izvolite? Imate pitanje?" → **Kada je ulaz u muzej besplatan?** |
| 9 | `lopta` | Dječak Luka | donesi | Domar Stipe | Uzmi Lukinu loptu od domara Stipe u dvorani (Sportski kvart) | „A ti si čiji? Što tražiš?" → **Lukinu loptu s krova.** |
| 10 | `trening` | Trener Boris | poruka | Vratar Dario | Prenesi Dariju kod stadiona: trening je sutra u sedam | „Šalje te trener? Što poručuje?" → **Trening je sutra u sedam.** |
| 11 | `lijek` | Liječnica Petra | odnesi | Starac Jure | Odnesi Juri na trg njegov lijek iz ambulante | „Što je to, mladiću?" → **Vaš lijek iz ambulante.** |
| 12 | `novine` | Prodavačica Vera | odnesi | Ribar Mate | Odnesi Mati novine na rivu | „Što mi nosiš?" → **Novine, već su plaćene.** |
| 13 | `paket` | Vozač Slaven | poruka | Šalterica Nada | Javi Nadi u pošti (Zanatska četvrt) za paket iz autobusa | „Izvolite? Šalter jedan ili dva?" → **U autobusu je ostao paket.** |
| 14 | `zica` | Svirač Rene | donesi | Susjed Tomislav | Uzmi od Tomislava žicu za gitaru (Stambeno naselje) | „Reci, susjede, po što si došao?" → **Po žicu za gitaru.** |
| 15 | `ples` | Starac Jure | poruka | Starica Ruža | Pitaj staricu Ružu sjeća li se plesa u lipnju (Gornji grad) | „Reci, dijete, što te dovodi k meni?" → **Sjećate li se plesa u lipnju?** |
| 16 | `adresa` | Dostavljač | odnesi | Šalterica Nada | Odnesi paket bez adrese Nadi u poštu (Zanatska četvrt) | „Izvolite? Šalje vas netko?" → **Paket je bez čitke adrese.** |
| 17 | `lektira` | Učenica Sara | donesi | Učitelj Damir | Uzmi popis lektire od učitelja Damira u školi | „Uđi. Trebaš nešto?" → **Trebam popis lektire.** |
| 18 | `svijece` | Starica Ruža | odnesi | Don Ante | Odnesi don Anti novac za svijeće (crkva, Gornji grad) | „Izvoli, sinko. Nosiš li mi nešto?" → **Novac za svijeće, od Ruže.** |
| 19 | `klin` | Klesar Šime | donesi | Domar Stipe | Uzmi klesarov klin od domara Stipe u dvorani (Sportski kvart) | „Reci, po što si došao?" → **Po Šimin klin.** |
| 20 | `sjemenke` | Vrtlar Zdravko | odnesi | Sanja sa psom | Odnesi Sanji vrećicu sjemenki (park) | „Dobar dan! Nosite li to nešto?" → **Sjemenke od vrtlara.** |
| 21 | `ogrebotina` | Sanja sa psom | poruka | Liječnica Petra | Pitaj liječnicu Petru treba li ogrebotinu nečim namazati (park) | „Dobar dan. Trebate nešto?" → **Treba li se ogrebotina nečim namazati?** |
| 22 | `igla` | Ribar Mate | donesi | Ribarica Anka | Uzmi Matinu iglu za mrežu od Anke na rivi | „Izvoli? Trebaš ribu?" → **Trebam Matinu iglu za mrežu.** |
| 23 | `ribasestra` | Ribarica Anka | odnesi | Sestra Marija | Odnesi sestri Mariji ribu u ambulantu (Stambeno naselje) | „Dobar dan. Je li hitno?" → **Nije hitno, nosim vam ribu od Anke.** |
| 24 | `rjecnik` | Turist Hans | poruka | Knjižničar Bruno | Pitaj knjižničara Brunu ima li rječnik za strance (knjižnica, Trg) | „Dobar dan. Tražite nešto određeno?" → **Imate li rječnik za strance?** |
| 25 | `ulaznice` | Vratar Dario | odnesi | Navijač Krešo | Odnesi Kreši ulaznice za utakmicu (Sportski kvart) | „Ej! Što ima?" → **Nosim ti ulaznice za nedjelju.** |
| 26 | `mjerenje` | Atletičarka Lana | poruka | Trener Boris | Pitaj trenera Borisa hoće li Lani mjeriti vrijeme u subotu (Sportski kvart) | „Da? Brzo, imam trening." → **Hoćete li Lani mjeriti vrijeme u subotu?** |
| 27 | `kreda` | Učitelj Damir | donesi | Spremačica Kata | Uzmi kutiju krede od spremačice Kate (u školi) | „Pazi, oprano je! Trebaš nešto?" → **Trebam kutiju krede za učitelja.** |

### Ekonomija u praksi

Odigrano od početka do kraja, s točnim odgovorima iz prve: **202 novčića** zarađeno
(40 početnih + 27×5 za zadatke + 27×1 za točne odgovore). To se poklapa s procjenom
od ~210 iz poglavlja 1a — dovoljno za oko 200 pogleda u rječnik.

## 6. Tekstovi sustava — 30

Svi samo na hrvatskom, kao i ostalo.

| gdje | tekst |
|---|---|
| nova riječ | Nova riječ: **{riječ}** |
| otvaranje rječnika | Rječnik. *(−1 novčić · ostalo: {n})* |
| rječnik bez novčića | Rječnik. *(dug: {n} novčića)* |
| bilježnica prazna | Bilježnica je prazna. Razgovaraj s ljudima. |
| vrata zaključana | Zaključano. Možda netko ima ključ. |
| zadatak preuzet | Novi zadatak: **{naslov}** |
| zadatak gotov | Gotovo. |
| ulazak | {mjesto} |
| … | *(preostalih 22 pišem uz implementaciju)* |

---

## 7. Redoslijed pisanja

Ovo je **moj plan rada**, ne tvoj zadatak. Pišem u serijama koje se odmah mogu
isprobati u igri, umjesto da sve nastane odjednom pa se tek na kraju vidi valja li.

1. **8 natpisa** iz poglavlja 2 — najbrže, odmah vidljivo u gradu.
2. **8 likova prve zone** (stambeno + trg) do kraja — s njima počinje igra.
   Tek kad njih osam radi, ima smisla pisati ostale.
3. **Zadaci 1–6** — prvih pola sata igre.
4. Ostatak likova po zonama, pa zadaci 7–28.

Ja pišem, ti prolaziš i ispravljaš — poglavlje 4 je mjerilo tona. Ako ti taj ton
ne odgovara, reci na tim trima likovima i preslagat ću sve ostale prema tome.
