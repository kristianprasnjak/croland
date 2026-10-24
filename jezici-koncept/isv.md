# Interslavenski (Medžuslovjansky) — koncept tečaja

Verzija 0.2, 21.10.2026, status: koncept, ispravljen prema provjeri (popis kontrola v1.0). Dopuna 23.10.2026.: školski standard i verzija rječnika odlučeni; nosive L3–L6, L9 prilagođene (*-m*), ispravci iz provjere 2 (*večerom, odboči, zatože*).
Presuda provjere bila je „vraća se“; raspored je preuređen (množina, brojevi, imperativ, modali i veznici ranije, prošlo vrijeme s *jesm*), obrazloženje u odj. 4 i u izvještaju.

## 1. U brojkama

| | |
|---|---|
| Razine | **L0 + 16** (namjerno manje od 20, obrazloženje niže) |
| Cilj | govornici slavenskih jezika: ≈ **B1** (aktivno A2+, pasivno B1) · ostali: ≈ **A1+ / A2−**. Službene CEFR provjere za ISV nema; razine su procjena |
| Vokabular | ≈ 1350 (40 u L0 + 1310 u L1–L16); za slavenske govornike većina je pasivno poznata, pa je glavni posao odabir standardnog oblika. Za neslavenska sučelja dio riječi od L5 označen je kao pasivan (80–90 riječi po razini je iznad norme iz `00-pregled.md`) |
| Pismo | latinica kao glavna (jednostavni pravopis: *č, š, ž, ě, y*); ćirilica kao prekidač prikaza (automatska transliteracija) i zasebna neobavezna cjelina uz L0 |
| Standard | „školski standard tečaja“ (**odlučeno 23.10.2026.**, odj. 3): 1. lice jednine na **-m** (*rabotam, imam, prosim, idem, budem*), kondicional s ličnim oblicima (*byh, bys, by…*), prošlo vrijeme s *jesm* (u 3. licu bez pomoćnog), aktivno *čto*; Test prihvaća sve dopuštene varijante (i *-u / -ju*) |
| Moduli | Modul 1 (L6) · Modul 2 (L12) · Završni test (L16) |
| Priča | **Sofie Brandt** (23), danska studentica slavistike, putuje vlakom na jug kroz slavenske zemlje: Krakov → Prag → Bratislava → Ljubljana → Zagreb → Sarajevo → Beograd → Skopje → Sofija; u svakom gradu nekoga upozna i provjerava razumiju li je. Stalni suputnik je **gospodin Miroslav**, umirovljeni kondukter iz Češke koji istim putem ide k unuci u Sofiju. Istočnoslavenski dio: otvorena odluka |

**Zašto 16 razina**: jezik je namjerno pravilan (s malo nepravilnosti: *byti, idti – šel, jesti, dati, věděti, hotěti*, komparativi *menši, lěpši, bolši*, imenice *vrěme – vrěmene, ime – imene, mati – materi, člověk – ljudi, děte – děti, oko – oči, uho – uši*; uče se kao vokabular gdje se pojave), a za većinu publike (govornike slavenskih jezika) vrlo blizak. Dvadeset razina značilo bi rastezanje bez novog sadržaja. Za neslavenske polaznike 16 razina je kratko (padeži, vid i glagoli kretanja kao kod ruskog), pa je cilj za njih niži i otvorena je odluka o duljem tempu.

## 2. Specifičnosti i izazovi

- **Umjetno izgrađen jezik** sa svrhom da ga razumiju govornici svih slavenskih jezika bez učenja; riječi se biraju po tome koliko ih slavenskih jezika dijeli.
- **Gramatika je slavenska, ali pojednostavljena**: šest padeža (plus vokativ), tri roda, muški rod razlikuje živo i neživo (akuzativ živih = genitiv: *brata*), vid; vrlo malo nepravilnosti (popis u odj. 1).
- **Brojevi**: 2–4 + nominativ množine (*dva domy*), 5 i više + genitiv množine (*pet domov*); zato množina dolazi rano (L2, L5).
- **Dvije razine pravopisa** (jednostavni i etimološki s *å, ę, ų, ė, ȯ…*): tečaj uči jednostavni, etimološki samo kao napomena.
- **Dvije abecede** (latinica i ćirilica) ravnopravne u jeziku; u tečaju je latinica glavna, ćirilica prekidač prikaza.
- **Izgovor je fleksibilan** (*ě* se može čitati kao *e, je, i*): svaki govornik smije svoj slavenski izgovor.
- **Varijante su dopuštene** (1. lice *-u / -m*, *čto / što*, sinonimi *tydenj / nedělja*): tečaj aktivno uči jedan oblik, a prihvaća sve dopuštene.
- **Mali korpus izvornih materijala**; TTS treba provjeriti (vjerojatno glas srodnog jezika, npr. češki ili hrvatski).
- **Glavna vještina nije samo gramatika nego strategija**: kako birati riječ koju će razumjeti i Poljak i Bugarin.
- **Tehnika**:
  - automatsko ocjenjivanje (vježbe i Test) prihvaća dopuštene varijante: *ě / e*, *-u / -m*, *čto / što*, sinonime iz rječnika, latinicu i ćirilicu;
  - upis *ě, y, č, š, ž* i ćiriličnih *є, ы, ј, љ, њ, џ* (tipkovnica u aplikaciji);
  - automatska transliteracija latinica ↔ ćirilica (postoji paket `@interslavic/translit`);
  - prepoznavanje govora uz fleksibilan izgovor (*ě*, *y*);
  - uz svaku nosivu rečenicu u fazi 3 zapisati izvor i datum provjere oblika (rječnik, verzija).

### Izazovi po materinskom jeziku

**Govornici hrvatskog (i drugih slavenskih jezika)**
- Gotovo sve je razumljivo od prvog dana; ako se usvoji skraćeni tempo (odluka), L1–L6 mogu se proći za ≈ dva tjedna.
- Glavni izazov je **odučiti vlastite posebnosti**: hrvatske riječi koje drugi Slaveni ne razumiju (*kazalište → teatr*, *glazba → muzika*, *povijest → historija*, *zrakoplov → samolet*, *znanost → nauka*, *tvornica → fabrika*, *siječanj … → januar …*). Nisu primjeri: *tjedan* (ista osnova kao *tydenj*, češki *týden*), *kruh* i *zrak* (postoje i u slovenskom), *što* (dopuštena varijanta uz *čto*). Svaka razina ima stranicu „lokalizmi“ (vidi odluke).
- Sustavne razlike prema hrvatskom (napomene za sloj prijevoda):
  - *ě* ↔ *ije / je / e* (*rijeka → rěka*, *vidjeti → viděti*, particip *viděla*, ne *vidila*);
  - *y* gdje hrvatski ima *i* (*byti, my, vy, ty*);
  - *-l* u participu (*bio → byl*, *vidio → viděl*) i pomoćni glagol *jesm* (L8);
  - nema *ć / đ*; infinitiv *-ći → -kti / -gti* (*moći → mogti*);
  - *u → v* (*u gradu → v gradu*), *tko → kto*, *gdje → kde*;
  - **svršeni prezent je budućnost** (*napišu* = napisat ću), u hrvatskom nije (L9);
  - **uz 2–4 nominativ množine, a ne genitiv jednine** (*dva domy*, ne *dva doma*), a genitiv množine je *-ov / -ev* (*pet domov*), ne *-a* (L5).
- Ćirilica: tko zna srpsku ćirilicu ima je gotovo cijelu.
- Za druge slavenske jezike sučelja isti popis „lokalizmi“ (poljski *sklep* = dućan, ruski *позор*, češki *čerstvý*…), kao jedan zajednički popis po razini s oznakom jezika.

**Govornici engleskog**
- Padeži, vid i slaganje su novi, kao kod ruskog, i s malo nepravilnosti; objašnjenja moraju biti dulja.
- Lakše: nema članova.
- Dvostruka negacija (*ne imam ničto*), povratno *se*, slobodniji red riječi.
- Izgovor: *j* = engleski *y*, *y*, *ě*, suglasničke skupine.
- Motivacija je drukčija: ključ ponude je „jedan jezik za više od 300 milijuna govornika slavenskih jezika“ i ulaz u kasnije učenje nacionalnog slavenskog jezika.
- Prijedlog: na kraju tečaja stranica „Što dalje: ako sada učiš ruski / poljski / hrvatski, ovo već znaš“.

**Ostali jezici sučelja (napomena za prijevod)**
- Baltički (litavski, latvijski): padeži i dio vokabulara poznati.
- Romanski i germanski: kao engleski.

## 3. Otvorene odluke

- **Standard**: pratiti pravila i rječnik zajednice (interslavic-dictionary.com, medžuslovjansky.com). Provjera je rađena prema rječniku iz 2022.; prije faze 3 sve oblike (posebno one označene „provjeriti“) provjeriti u živom rječniku. Stanje standardizacije (provjereno 21.10.2026.): jezik ima ISO 639-3 kod *isv* (od 2024.), standardni pravopis (latinica i ćirilica) i rječnik zajednice, ali nema službenog tijela s ovlastima kao akademija; gramatika namjerno dopušta varijante (nastavci glagola, zamjenica, pridjeva), a rječnik se još razvija. Zato tečaj mora sam fiksirati „školski standard“ (sljedeća točka) i u Testu prihvaćati dopuštene varijante.
- ~~Školski standard tečaja~~ — **odlučeno 23.10.2026.:** (a) 1. lice jednine na **-m** (*dělam, prosim, vidim, idem, budem, možem*); *-u / -ju* se u Testu prihvaća. Razlog: bez jotacije u prvom tjednu (*prosim*, ne *prošu*; *vidim*, ne *vidžu*), jedan nastavak za sve glagole, dosljedno s *jesm* i *imam*, a oblik je zapadnoslavenski i južnoslavenski (češki, slovački, slovenski, hrvatski, srpski, dijelom poljski), dakle razumljiv većini; (b) kondicional s ličnim oblicima *byh, bys, by, byhmo, byste, by*; (c) *jesm* u 1. i 2. licu, u 3. licu izostaje, u nizu glagola jednom; (d) aktivno *čto*, prihvaća se *što*.
- ~~Verzija rječnika~~ — **odlučeno 23.10.2026.:** faza 3 radi prema bazi `medzuslovjansky/database` u stanju commit `53d42b2a` (11.10.2026.); natuknice se skriptom prevode iz etimološkog u jednostavni pravopis; nova verzija baze znači ponovnu provjeru svih tekstova.
- **Prihvaćanje varijanti u Testu** (odj. 2, Tehnika): prijedlog: sve dopuštene varijante iz rječnika točne, aktivno se prikazuje školski standard.
- **Zvuk**: kojim glasom (iskusni govornici zajednice, TTS srodnog jezika ili kombinacija). Prijedlog: snimljeni govornici za L0 i nosive rečenice, TTS srodnog jezika za vježbe.
- **Jedan tečaj ili dva tempa**: isti sadržaj; za slavenska sučelja L1–L6 skraćeni, za ostala puna dužina ili dodatne cjeline ponavljanja nakon L6 i L12. Utječe na zajednički model „1 razina ≈ 1 tjedan“, cjenik i prikaz napretka. Prijedlog: jedan tempo u aplikaciji, uz preporuku „možeš brže“ za slavenska sučelja.
- **Popisi „lokalizmi“**: zaseban popis po sučelju je velik trošak (≈ 16 razina × 10–15 riječi × broj slavenskih sučelja). Prijedlog: jedan zajednički popis po razini s oznakom jezika.
- **Istočnoslavenski dio priče**: ruta nema Ukrajinu, Bjelorusiju ni Rusiju (većina slavenskih govornika). Prijedlog: lik iz istočnoslavenskog prostora u krugu likova (npr. ukrajinska studentica **Oksana** koju Sofie upozna u Krakovu i koja putuje do Zagreba); Lavov ili Kijev kao mogući nastavak priče.
- **Ćirilica**: prijedlog prihvaćen u konceptu kao prekidač prikaza; uskladiti s `00-pregled.md` („latinica glavna, ćirilica opcija“).

## 4. Raspored razina

| # | Lesson — tema · gramatički fokus | Vocabulary | Grammar (+ dodatak) | Practice | Nosiva rečenica |
|---|---|---|---|---|---|
| 0 | **Sounds & Spelling** — latinica *č š ž ě y*, slobodan izgovor *ě*; ćirilica kao neobavezna cjelina | 40 riječi zajedničkih svim Slavenima | — | — | — |
| 1 | **Zdrav!** — *byti*, *ja / ty / vy*, predstavljanje | **Greetings & Countries** — 60 | **byti** (sva lica) + upitne riječi *kto, čto, kde, kako*; fraze: *iz Danije*, *Kako se zoveš?* (provjeriti) | **Arrival in Kraków** | *Jesm Sofie, jesm iz Danije.* (*iz Danije* zamrznuto) |
| 2 | **Things Around Us** — rod, pridjevi, množina | **The Train & Colours** — 70 | **Gender & Adjectives** + nominativ množine (imenice i pridjevi) + *ne* | **Compartment 7** | *Vagon jest novy, ale okno jest malo.* |
| 3 | **Everyday Life** — prezent, *hotěti, mogti* | **Everyday Verbs & the Week** — 70 | **Present Tense** (dvije konjugacije, 1. lice *-m*) + *hotěti, mogti* + infinitiv | **A Day in Prague** | *V ponedělok rabotam, a večerom čitam.* (*v ponedělok* zamrznuto) |
| 4 | **Family** — *imati*, akuzativ, posvojne | **Family & People** — 70 | **Accusative** (neživo, ž. *-u*, živo m. = genitivni oblik *brata*) + posvojne *moj, tvoj…* + *mene, tebe, jego, jej* + vokativ (*mamo, brate*) + *děte – děti, člověk – ljudi* | **Miroslav's Family** | *Imam brata i sestru; moj brat jest doktor.* |
| 5 | **At the Market** — genitiv, brojevi, dob | **Food, Numbers & Age** — 80 | **Genitive** jednine i množine (*ne imam*, *kilogram jablok*) + brojevi (2–4 + N mn., 5+ + G mn.) + dob (*imam 23 lět*, provjeriti) | **Prague Market** | *Prosim kilogram jablok i hlěb.* |
| 6 | **In the City** — lokativ, *kamo* nasuprot *kde*, imperativ | **City & Directions** — 80 | **Locative** + akuzativ smjera + **Imperative** (2. lice jednine i množine: *idi, odboči vlěvo / vpravo*) + *idti, jehati* (prezent) | **Lost in Bratislava** · **Modul 1** | *Muzej jest v centru, idem v muzej.* |
| 7 | **Free Time** — dativ, *podobati se*, negacija | **Hobbies & Sport** — 80 | **Dative** + *mně se podobaje* + *mně, tebě* + niječne zamjenice i dvostruka negacija (*ničto, nikto*) | **Ljubljana Evening** | *Mně se podobaje muzika, ale ne tanec.* |
| 8 | **Yesterday** — prošlo vrijeme, *že, kogda* | **Past Time & Events** — 80 | **Past Tense** (*jesm / jesi byl(a)*, u 3. licu bez pomoćnog glagola) + *šel* + *že, kogda* | **What Did You See?** (Zagreb) | *Včera jesm byla v Ljubljaně i viděla rěku.* |
| 9 | **Plans** — vid i budućnost, *musěti*, *ako* | **Plans, Weather & Seasons** — 90 | **Aspect & Future** (*budem* + infinitiv, svršeni prezent) + *musěti* + *ako* (stvarni uvjet) + *vrěme – vrěmene* | **The Route Plan** | *Zautra budem jehati v Sarajevo i tam kupim bilet.* |
| 10 | **Company** — instrumental, sat | **Friends, Professions & Eating Out** — 90 | **Instrumental** (*s kym?*, *rabotati kako*) + lične zamjenice u instrumentalu + sat, redni brojevi, datumi | **Dinner in Sarajevo** | *Idu s Miroslavom na večerju.* |
| 11 | **Travel** — glagoli kretanja, smještaj | **Transport, Trips & Hotels** — 90 | **Motion Verbs** (*idti / hoditi, jehati*) + prefiksi | **The Night Train** (do Beograda) | *Vlak odhodi o polnoči i prihodi rano.* |
| 12 | **Health & Body** — *trěba*, *se / svoj* | **The Body & the Doctor** — 90 | **trěba** + infinitiv (ponavljanje *mogti, musěti, hotěti*) + povratno *se* i *svoj* + imperativ (ponavljanje, *idimo*) | **Sofie Is Ill** (Beograd) · **Modul 2** | *Pij čaj i ostani v posteli!* |
| 13 | **Comparisons** — komparativ, superlativ, *ktory* | **Cities & Nature** — 90 | **Comparatives** (+ *menši, lěpši, bolši*) + *než* + odnosni *ktory* | **Which City Is Best?** | *Ljubljana jest menša než Praga, ale jest najzelenějša.* |
| 14 | **Many Things** — množina u ostalim padežima | **Shopping & Clothes** — 90 | **Plural Cases** (dativ, lokativ, instrumental množine; N, A i G mn. već poznati) | **Souvenirs for Everyone** (Skopje) | *Kupila jesm podarky dlja vsih prijateljev.* |
| 15 | **Dreams** — kondicional, *čtoby* | **Wishes & Advice** — 90 | **Conditional** (*byh, bys, by…*) + *jestli by* + *čtoby* | **If I Could Stay** | *Jestli byh imala vrěme, ostala byh tu.* |
| 16 | **Grand Finale** — strategije razumljivosti, ponavljanje | **Memories & the Future** — 90 | kako izabrati najrazumljiviju riječ + *poneže / zatože* + neupravni govor (*rekla, že…*) + ponavljanje | **The Last Station** (Sofija) · **Završni test** | *To jest jezyk, ktory razuměje skoro vsaky Slovjan.* |

Napomene:
- Oblici u nosivim rečenicama provjereni su prema rječniku iz 2022. (izvještaj o provjeri); u fazi 3 provjeriti u živom rječniku, posebno *zautra*, *o polnoči* (prijedlog *o*), *než*, *kilogram*, *lět*, *Kako se zoveš?* i nove oblike *v Ljubljaně*, *Sarajevo*.
- Preuređenje prema v0.1: nominativ množine L2 (prije nije bio nigdje), genitiv množine L5 uz brojeve (prije L14), imperativ L6 (prije L12), *hotěti / mogti* L3 i *musěti* L9 (prije L12), *že, kogda* L8, *ako* L9, *ktory* L13 (prije L16), dob iz L4 u L5. L14 zato nosi samo tri kosa padeža množine, a L16 strategije i ponavljanje.
- L5 i L6 su najteže razine (genitiv s brojevima; lokativ s imperativom i modulom); provjeriti u pilotu.

## 5. Kralježnica — rane zabrane

- Glagoli: *byti* L1; prezent ostalih glagola L3 (*hotěti, mogti* L3); imperativ L6; prošlo vrijeme s *jesm* L8; vid i budućnost L9; *musěti* L9; glagoli kretanja s prefiksima L11 (*idti, jehati* u prezentu od L6); *trěba* L12; kondicional L15.
- Padeži: nominativ jednine L1–L2, nominativ množine L2, akuzativ L4 (živo m. = genitivni oblik), genitiv jednine i množine L5, lokativ L6, dativ L7, instrumental L10; dativ, lokativ i instrumental množine L14. Ranije samo zamrznute fraze: *iz Danije* (L1), *v ponedělok* (L3).
- Brojevi s imenicom tek L5; sat, redni brojevi i datumi tek L10.
- Zamjenice: posvojne L4; lične u kosim padežima uz padež (akuzativ L4, genitiv L5, dativ L7, instrumental L10); povratno *svoj* L12; *se* u ustaljenim glagolima kao vokabular (*Kako se zoveš?* L1, *podobati se* L7), sustavno L12.
- Veznici: *i, a, ale* od L1–L2; *že, kogda* L8; *ako* L9; *ktory* L13; *čtoby* L15; *poneže / zatože* L16.
- Nepravilni oblici kao vokabular u razini gdje se pojave (odj. 1): *děte – děti, člověk – ljudi* L4, *šel* L8, *vrěme* L9, *menši, lěpši, bolši* L13.
- U materijalima nijedna riječ koja postoji samo u jednom slavenskom jeziku (provjera po rječniku zajednice).
