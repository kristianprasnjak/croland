# Tvrđava v2 — priča, sobe i slike

Nova verzija `04-tvrdjava.html`. Stara je sačuvana kao `04-tvrdjava-v1.html`.
Igra je odmah igriva: dok slika nema, crta se zamjenska grafika (boje, znakovi, isprekidani okviri).

## Priča

Iznad gradića **Mala Luka** stoji tvrđava **Galebnjak**. Kaštelan **Ivo** četrdeset je godina čuvao
sve ključeve. Jučer je pao s ljestava i sada je u bolnici — a ključevi su skriveni.

Nije ih izgubio. **Sakrio ih je namjerno, jedan za drugim**, jer odvjetnik **Davor Horvat**
(tvrtka *Adria Resort*) traži stari **statut iz 1618.** Dok statut postoji, tvrđava se ne smije prodati.
U petak gradsko vijeće glasa o prodaji tvrđave hotelu.

Igrač ide s Ivinom unukom **Lucijom** iz sobe u sobu. Svaka soba daje ključ sljedeće, a svaki
zadatak ima razlog u priči: ljudi u tvrđavi traže pomoć ili je Ivo ostavio zagonetku.
Rok to u 5. sobi izgovara naglas: *„Do kraja stigne samo strpljiv čovjek."*

Napetost raste polako: svjetlo u dvorištu noću (Jela) → Horvat u dnevniku → čovjek s lampom na
zidinama (Nika) → pismo gradonačelnici → Horvat u podrumu → sjednica vijeća.

Nema borbe ni negativca iz crtića. Horvat je uvijek pristojan. Pobjeđuje se razumijevanjem teksta.

## Sobe (od lakšeg prema težem)

| # | soba | lik | zadatak | gradivo | razina |
|---|---|---|---|---|---|
| 1 | Vrata | Lucija | Ključevi bez natpisa: odaberi onaj koji odgovara opisu. Svaki lažni ključ razlikuje se u samo jednom svojstvu. | velik/malen, boje, star/nov | 1 |
| 2 | Dvorište | Ivina poruka | Pročitaj gdje je ključ i klikni to mjesto u sceni (6 mjesta, svako se razlikuje po boji ili položaju) | boje, *ispod / pokraj / na / u* | 1 |
| 3 | Kuhinja | Jela | Tri narudžbe iz smočnice, samo slike bez natpisa, sve teže (zadnja ima i „to ne trebam") | brojevi, *dva jaja / pet jaja* | 2 |
| 4 | Knjižnica | Lucija | Razvrstaj knjige po policama. Jedna nije knjiga — to je Ivin dnevnik. Dva pitanja o dnevniku. | kategorije, čitanje | 2 |
| 5 | Toranj | Rok | Namjesti sat: pun sat → *pola jedanaest* (= 10:30) → *četvrt do* / *i petnaest* | vrijeme | 2 |
| 6 | Stražarnica | Nika | Ivin plan kretanja po zidinama; igrač se sam kreće po mreži (naprijed, lijevo, desno) | zapovjedni način, *jedno polje / dva polja* | 3 |
| 7 | Radionica | Jure | Natpisi za izložbu (*stari mač / stara kaciga / staro koplje*), zatim pravi ključ po duljini i težini | rod pridjeva, komparativ i superlativ | 3 |
| 8 | Kapelica | don Marin | Razbijena ploča s natpisom: vrati komade (odabir padeža), zatim pitanje o značenju | padeži, perfekt | 3 |
| 9 | Pisarnica | Lovro | Službeno pismo Horvata gradonačelnici + 4 pitanja | razumijevanje pisanog teksta | 4 |
| 10 | Tamnica | Ivine zagonetke | Tri zagonetke, odgovor se upisuje (s dijakriticima). Nakon 2 promašaja nudi se izbor. | zagonetke, strogi upis | 4 |
| 11 | Podrum | Lucija, Horvat | Lokot sa šifrom: logički opis znamenki (2 inačice, svaka ima jedno rješenje — provjereno) | brojevi, *dva puta veća, zbroj* | 4 |
| 12 | Dvorana | Mira, Horvat, Lovro | Kamen s galebom → statut → sjednica vijeća: odgovori na pitanja i Horvatove tvrdnje prema statutu | čitanje arhaičnijeg teksta, argument | 5 |

Bodovi: 6+6+7+7+8+8+8+8+9+9+10+14 = **100**.

Da se igra ne pamti napamet, nasumično se mijenjaju: opisi ključeva (1), mjesto ključa (2),
narudžbe (3), vremena (5), ruta (6), natpisi i ključevi (7), šifra (11).

Napredak se sprema: igrač nastavlja od zadnje otvorene sobe. Soba se sprema tek kad je riješena.

Pravila iz ostalih igara vrijede i ovdje: sučelje je na engleskom, replike likova hrvatski s prijevodom
skrivenim iza `👁 translation`. Pisma, dnevnik i statut **nemaju** prijevod, jer bi on riješio pitanja —
umjesto toga ispod ima kratak rječnik ključnih riječi. Kriva ponuđena rješenja su netočne tvrdnje, ne izbjegavanja.

## Slike — što trebaš nacrtati

Sve ide u `mini-igre/mini games media/`, ravno, bez podmapa. Naziv mora biti točan.
Dok datoteke nema, igra crta zamjenu, pa slike možeš dodavati jednu po jednu.

**Stil:** pixel art. Crtaj u **izvornoj veličini** (npr. 320×180), izvezi PNG bez povećavanja —
igra sama povećava s oštrim pikselima. Paleta topla i kamena: vapnenac, drvo, bakreno svjetlo svijeća,
more plavo. Mediteranska tvrđava, ne nordijski dvorac.

### 1. Pozadine soba — 320×180 px

Gornji lijevi kut (oko 110×30 px) i gornji desni (oko 50×24 px) ostavi mirne — ondje stoje natpis sobe i razina.
Donjih ~10 px može biti tamno; odmah ispod scene je okvir za govor.

| datoteka | što je na slici |
|---|---|
| `tvr-naslovna.png` | Tvrđava na stijeni iznad malog gradića i mora, sumrak. Donja trećina mirnija — ondje je naslov. |
| `tvr-soba-vrata.png` | Kameni ulaz s teškim drvenim vratima, poštanski sandučić na zidu, jutro |
| `tvr-soba-dvoriste.png` | **Vidi raspored ispod** — ovdje se klika po slici |
| `tvr-soba-kuhinja.png` | Kamena kuhinja: ognjište, dugi drveni stol, lonci, vrata smočnice |
| `tvr-soba-knjiznica.png` | Police do stropa, ljestve, prašina u zraci svjetla, prazne police |
| `tvr-soba-toranj.png` | Unutrašnjost tornja sa satom: zupčanici, zvono gore, stari čovjek može biti samo silueta |
| `tvr-soba-straza.png` | Uski prozor prema moru, dalekozor na stalku, na stolu raširen plan zidina |
| `tvr-soba-radionica.png` | Stara oružarnica pretvorena u radionicu: nakovanj, štitovi i koplja na zidu, alat po podu |
| `tvr-soba-kapelica.png` | Mala kamena kapelica, svijeće, na podu razbijena kamena ploča |
| `tvr-soba-pisarnica.png` | Ured arhiva: kutije spisa, stari pisaći stol, stolna lampa, prozor |
| `tvr-soba-tamnica.png` | Svodni podrum-tamnica, rešetke, danas skladište s kutijama; drvena kutija s tri brave na bačvi |
| `tvr-soba-podrum.png` | Vinski podrum: bačve, boce, škrinja s lokotom u sredini, slabo svjetlo |
| `tvr-soba-dvorana.png` | **Vidi raspored ispod** — ovdje se klika po slici |

### 2. Scene po kojima se klika — točan raspored

Koordinate su u pikselima slike 320×180, `x1,y1 – x2,y2` (gornji lijevi – donji desni kut).
Predmet nacrtaj **unutar** okvira; igra na to mjesto stavlja nevidljivo polje za klik.

**`tvr-soba-dvoriste.png`** — kaldrma, pogled sprijeda.

| predmet | okvir | klikabilno? |
|---|---|---|
| drvena vrata (kuhinja), lijevo | 16,64 – 60,150 | ne |
| kameni bunar, sredina | 132,100 – 180,152 | ne |
| stablo (smokva ili maslina) iza bunara | 184,18 – 232,96 | ne |
| kamene stepenice uz zid, desno | 244,70 – 306,150 | ne |
| **crvena kanta** pokraj bunara (desno od njega) | 184,132 – 202,150 | da |
| **plava kanta** pokraj bunara (lijevo od njega) | 110,132 – 128,150 | da |
| **crvena kanta** pokraj vrata | 64,132 – 82,150 | da |
| **plava kanta** na stepenicama (gore) | 262,96 – 280,114 | da |
| **crvena kanta** na stepenicama (dolje) | 282,124 – 300,142 | da |
| **pletena košara** ispod stabla | 198,98 – 218,114 | da |

Važno: kante moraju biti jasno crvene i jasno plave, a tri crvene i dvije plave inače jednake.

**`tvr-soba-dvorana.png`** — velika dvorana, prijestolje u sredini, kameni pod.

| predmet | okvir | klikabilno? |
|---|---|---|
| kameno prijestolje (knežev stolac) | 136,36 – 184,120 | ne |
| podna ploča s uklesanom **ribom** | 36,140 – 80,170 | da |
| podna ploča s uklesanim **galebom** | 104,140 – 148,170 | da |
| podna ploča s uklesanim **sidrom** | 172,140 – 216,170 | da |
| podna ploča s uklesanim **ključem** | 240,140 – 284,170 | da |

### 3. Portreti likova — 64×64 px

Glava i ramena, pogled prema gledatelju, tamna ili neutralna pozadina (stoje u tamnom okviru).

| datoteka | lik |
|---|---|
| `tvr-lik-lucija.png` | Lucija, ~30 godina, voditeljica projekta muzeja, praktična, kosa skupljena |
| `tvr-lik-ivo.png` | *Nije lice* — presavijen papirić s rukopisom (za Ivine poruke i zagonetke) |
| `tvr-lik-ivoZiv.png` | Ivo, ~75 godina, sijed, brkovi, u košulji, na kraju igre sa štakama |
| `tvr-lik-jela.png` | Jela, kuharica, ~55, pregača, zasukani rukavi |
| `tvr-lik-rok.png` | Rok, vrlo star, debele naočale, kapa |
| `tvr-lik-nika.png` | Nika, arhitektica, ~35, kaciga ili olovka za uhom |
| `tvr-lik-jure.png` | Jure, restaurator, brada, kožna pregača |
| `tvr-lik-marin.png` | don Marin, svećenik, ~60, crna odjeća s bijelim kolarom |
| `tvr-lik-lovro.png` | Lovro, arhivist, ~40, naočale, prsluk |
| `tvr-lik-horvat.png` | Davor Horvat, odvjetnik, ~50, skupo odijelo, uglađen osmijeh |
| `tvr-lik-mira.png` | Mira Kovač, gradonačelnica, ~50, sako |

### 4. Namirnice u smočnici — 24×24 px

Prozirna pozadina. Bez natpisa (igrač mora prepoznati sliku).

`tvr-hrana-jaje.png`, `tvr-hrana-kruh.png`, `tvr-hrana-rajcica.png`, `tvr-hrana-luk.png`,
`tvr-hrana-paprika.png`, `tvr-hrana-krumpir.png`, `tvr-hrana-limun.png`, `tvr-hrana-mlijeko.png` (boca),
`tvr-hrana-sir.png`, `tvr-hrana-jabuka.png`, `tvr-hrana-riba.png`, `tvr-hrana-med.png` (staklenka)

**Ukupno: 13 pozadina + 11 portreta + 12 namirnica = 36 slika.** Redoslijed koji najviše mijenja dojam:
naslovna → dvorište i dvorana (klikaju se) → Lucija i Ivina poruka (najčešće se vide) → ostalo.

Ključevi, sat, lokot, mreža zidina i police crtaju se kodom, za njih ne trebaju slike.

Stare datoteke `soba-*.png` 1280×720 iz `MEDIJI-popis.md` više se ne koriste.
