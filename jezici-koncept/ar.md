# Arapski — koncept tečaja

Verzija 0.2, 21.10.2026, status: koncept, ispravljen prema provjeri (popis kontrola v1.0).

**Vremenski plan:** jezik izvan latinice; izrada tek za godinu dana (≈ jesen 2027.), odluka vlasnika G7 od 23.10.2026. Koncept ostaje u v0.2; prije faze 3 ponovno provjeriti otvorene odluke i stanje alata.

## 1. U brojkama

| | |
|---|---|
| Razine | **L0a + L0b + 20** (pismo se ne može svladati u jednoj cjelini; u L1–L4 nastavlja se kratka dnevna vježba čitanja i pisanja) |
| Cilj | **A1 (čvrsto) + prepoznavanje struktura A2** u standardnom arapskom (MSA); čitanje s vokalima, osnovni razgovor. Strukture iz L16–L20 (*kāna*, dvojina, subjunktiv, pogodba, odnosne rečenice, vrste II–V) su vođena upotreba i prepoznavanje, ne aktivno znanje (≈ 65–90 sati ukupno) |
| Vokabular | ≈ 885 riječi (60 u L0a–L0b + 825 u L1–L20); manje nego kod europskih jezika, jer su pismo i glasovi velik dio posla. Od L1 uz svaku riječ oznaka korijena; od L2 uz imenicu i množina (pasivno) |
| Varijanta | **samo MSA** (odluka vlasnika 21.10.2026.); priča je u Amanu, a dijalekt se spominje samo kao kulturna napomena u L1 (na ulici se govori levantski) |
| Dijalozi | svakodnevni dijalozi na MSA-u su „udžbenički standard“ (polazniku se u L1 kaže da se u Amanu u svakodnevici govori drukčije); barem jedna Practice cjelina po modulu prirodno pisana na MSA-u (bilješka, poruka, natpis, vijest) |
| Pismo | arapsko pismo, zdesna nalijevo; **L1–L12 potpuno vokalizirano, L13–L19 djelomično (nove riječi i dvosmislena mjesta), L20 prvi potpuno nevokalizirani tekst**; *lām* člana bez sukuna, sunčano slovo sa *shaddom* (*السّوق*); *hamzat al-waṣl* bez znaka, osim na početku izgovora (*اِشْرَبْ*) |
| Padežni nastavci (iʿrāb) | **radno pravilo**: unutar rečenice puni nastavci, u pisanju i u zvuku; riječ pred pauzom (kraj rečenice, zarez, upitnik) bez završnog kratkog vokala i tanwina, osim alifa tanwina koji se piše i čita *-ā* (*خُبْزاً*); *ة* se u pauzi čita *-a*; pravilna m. množina u pauzi *-ūn / -īn*. Nastavci se uvode postupno (L2 nominativ, L3 i L5 genitiv, L6 akuzativ objekta, L12 predikat uz *laysa*), sustav i diptote u L16. Isto pravilo vrijedi za TTS |
| Moduli | Modul 1 (L6) · Modul 2 (L12) · Modul 3 (L16) · Završni test (L20) |
| Priča | **David Okoye** (28), inženjer iz Lagosa, dolazi raditi u Aman; cimer **Karim**, susjeda **Umm Samir**, kolegica **Layla**, susjedin unuk **Yousef** (9) |

## 2. Specifičnosti i izazovi

- **Pismo**: 28 slova, spajanje, pisanje zdesna nalijevo; većina slova ima četiri oblika ovisno o položaju, a šest (*ا د ذ ر ز و*) se ne spaja s idućim slovom i ima samo dva; brojke se pišu slijeva nadesno.
- **Kratki samoglasnici se obično ne pišu**: čitanje bez vokala je vještina za kasnije.
- **Glasovi**: emfatični suglasnici (*ص ض ط ظ*), *ع*, *ح*, *خ*, *غ*, *ق*, hamza; duljina samoglasnika i udvojeni suglasnici (*shadda*).
- **Sustav korijena i obrazaca** (*k-t-b* → *kataba, kitāb, maktab, kātib, maktaba*): ključ vokabulara; korijen se prikazuje uz riječ od L1, sustavno u L14.
- **Imenička rečenica bez glagola „biti“** u prezentu; *iḍāfa* (posvojna veza), posvojni sufiksi.
- **Rod i slaganje**, uključujući glagol; **dvojina**; **izlomljena množina** (*kitāb → kutub*); neljudska množina slaže se u ženskom rodu jednine (*الكُتُبُ جَديدَة*); glagol ispred subjekta ostaje u jednini (*ذَهَبَ الطُّلّابُ*).
- **Glagol**: perfekt sa sufiksima za osobu, rod i broj; imperfekt s prefiksima i sufiksima.
- **Diglosija**: standardni jezik (MSA) i dijalekti razlikuju se u svakodnevnom govoru (konvencija za dijaloge u odj. 1).
- **Tehnika**:
  - smjer: RTL u cijelom sučelju lekcije, miješani smjer s jezikom sučelja; izolacija smjera (Unicode isolates, `dir="auto"`) za svaki arapski odlomak u LTR sučelju, uključujući interpunkciju na kraju (*،* *؟* *!*);
  - font: Noto Naskh Arabic, veći font i prored zbog vokala; ispravan prikaz ligature *لا* i znaka *ٰ* (dagger alif u *هٰذا*);
  - upis: arapska tipkovnica u aplikaciji (prijedlog: standardni arapski raspored); provjera odgovora ne ovisi o harakatu i normalizira *أ إ آ → ا*, *ى / ي*, *ة / ه*, oblike hamze i tatweel;
  - prikaz s vokalima i bez njih, prema razini (odj. 1);
  - zvuk: TTS mora slijediti pravilo o nastavcima i pauzi (odj. 1);
  - upis harakata, brojke i transliteracija: vidi otvorene odluke.

### Izazovi po materinskom jeziku

**Govornici hrvatskog**
- Pismo i glasovi su potpuno novi. Hrvatsko *h* je bliže arapskom *خ* nego *ه*, što treba iskoristiti u L0a; zamka: hrvatski nema glotalni *ه* ni ždrijelni *ح*, pa ih treba vježbati kao nove glasove, inače se oba izgovaraju kao *خ*.
- Lako: *ش* = *š*, *ج* ≈ *dž* (u MSA; u levantskom ≈ *ž*), treptajni *ر* ≈ hrvatsko *r*; fonemska duljina samoglasnika postoji i u hrvatskom (prednost za *ā ī ū*).
- Turcizmi arapskog podrijetla kao mostovi: *sat* (ساعة), *dućan* (دكان), *kava* (قهوة), *džamija* (جامع), *adet* (عادة), *hal* (حال).
- Rod i slaganje su poznat koncept (prednost), uključujući slaganje glagola u prošlom vremenu po rodu (*kataba / katabat* ≈ *pisao / pisala*). Zamka: u 1. licu arapski ne razlikuje rod (*katabtu* za oba roda, a hrvatski *pisao / pisala sam*), a u 2. licu ga razlikuje i u sadašnjem vremenu (*taktubu / taktubīna*, a hrvatski samo *pišeš*).
- Padeži su poznat koncept (prednost za iʿrāb), ali arapski ima tri padeža, a nastavci se u pauzi ne izgovaraju.
- Rečenica bez „biti“ je nova: hrvatski uvijek ima sponu (*ja sam, on je*), pa je treba vježbati jednako kao s govornicima engleskog.
- Zamka: glagol ispred subjekta ostaje u jednini (*ذَهَبَ الطُّلّابُ*); hrvatski govornik će ga složiti u množini.
- Novo: dvojina, izlomljena množina, neljudska množina u ženskom rodu jednine, korijeni.

**Govornici engleskog**
- Uz pismo i glasove, rod i slaganje su novi; potrebna su dulja objašnjenja u L1–L3.
- Padeži su novi koncept (osim *I / me*); dulja objašnjenja uz uvođenje nastavaka (L2–L6, L12, L16).
- *Iḍāfa* je bliža engleskom *of* (*the house of Umm Samir*, isti red riječi) nego *'s*; zamka: prvi član nema člana (*بَيْتُ*, ne *البَيْتُ*).
- Zamka: glagol ispred subjekta ostaje u jednini (*ذَهَبَ الطُّلّابُ*), a neljudska množina slaže se u ženskom rodu jednine.

**Ostali jezici sučelja (napomena za prijevod)**
- Perzijski, urdu: pismo poznato (uz razlike), vokabular djelomično zajednički.
- Turski, malajski, svahili: mnogo arapskih posuđenica.
- Hebrejski i malteški: srodni jezici; korijeni i obrasci poznati.
- **Sučelja s pismom slijeva nadesno** trebaju posebnu provjeru prikaza miješanog teksta u svakoj vrsti vježbe.

## 3. Otvorene odluke

- ~~Samo MSA ili MSA + dijalekt~~ — **odlučeno 21.10.2026.: samo MSA**; bez levantskih napomena po razinama, dijalekt samo kao kulturna napomena u L1.
- **Padežni nastavci**: u konceptu je primijenjeno radno pravilo (puni nastavci unutar rečenice, pauzalni oblik pred pauzom). Alternative: potpuno pauzalni govor (jednostavnije za govor, ali tekst i zvuk se razilaze) ili puni nastavci i na kraju (tradicionalno). Prijedlog: radno pravilo.
- **Cilj i opseg**: primijenjen je cilj A1 + prepoznavanje A2 uz isti opseg. Alternativa: zadržati „A1+ / A2−“ i smanjiti opseg (vrste II–V, tekst bez vokala i *لَمْ* izbaciti). Prijedlog: A1 + prepoznavanje; uskladiti `00-pregled.md`.
- **Upis harakata**: prijedlog: polaznik ne upisuje harakat, osim u L0b.
- **Brojke**: prijedlog: zapadne (3) u sučelju i upisu; istočnoarapske (٣) od L4 samo za prepoznavanje (natpisi, cijene; u Jordanu su česte obje).
- **Transliteracija**: prijedlog: DIN 31635 (ā, ḍ, ʿ, kao u konceptu); u L0a–L0b uz svaki tekst, u L1–L6 na dodir, od L7 samo u Vocabularyju za nove riječi.
- **L0c**: dodati treći uvodni blok ako pilot pokaže da L0a + L0b nisu dovoljni. Prijedlog: zasad ne, uz vježbu čitanja u L1–L4.
- **Zvuk**: TTS za MSA s vokalima treba provjeriti upravo na pravilu o nastavcima i pauzi.

## 4. Raspored razina

| # | Lesson — tema · gramatički fokus | Vocabulary | Grammar (+ dodatak) | Practice | Nosiva rečenica |
|---|---|---|---|---|---|
| 0a | **Letters & Sounds** — slova u skupinama po obliku (*ب ت ث ن ي* · *ج ح خ* · *د ذ ر ز و* …), svaka skupina odmah s *fatḥa, kasra, ḍamma* i dugim samoglasnicima; oblici po položaju, šest slova koja se ne spajaju s idućim; *ه* i *ح* kao novi glasovi | 30 riječi | — | — | — |
| 0b | **Vowels & Reading** — preostala slova (*ص ض ط ظ*, *ع غ ق*, hamza), *sukūn, shadda*, *al-* i sunčana slova, *tāʾ marbūṭa*, alif tanwina kao pravopis (*مَرْحَباً، شُكْراً*), pauza na kraju rečenice | 30 riječi | — | — | — |
| 1 | **مَرْحَباً!** — imenička rečenica, zamjenice, *nisba*, *hal / man* | **Greetings & Countries** — 35 | **Nominal Sentence** + *-ī / -iyya* + *هَلْ، مَنْ* + napomena o pauzi | **Arrival in Amman** | *أَنا دافيد، أَنا نَيْجيرِيّ.* |
| 2 | **Things Around Us** — rod, *al-*, *hādhā / hādhihi*, *mā* | **The Room & Objects** — 40 | **Gender & the Article** + slaganje pridjeva + *ما؟* + nominativ *-u / -un* | **David's Room** | *هٰذِهِ الغُرْفَةُ صَغيرَةٌ وَجَميلَة.* |
| 3 | **Family** — posvojni sufiksi, *iḍāfa* | **Family & People** — 40 | **Possessive Suffixes** + **Iḍāfa** (genitiv *-i*) | **Umm Samir's Photos** | *هٰذا بَيْتُ أُمِّ سَمير.* |
| 4 | **Numbers & Age** — brojevi 1–10 samostalno, *kam*, *ʿindī* | **Numbers & Age** — 35 | **Numbers 1–10** (bez brojene imenice) + *كَمْ؟* + *عِنْدي* | **Yousef's Age** | *— كَمْ عُمْرُ يوسُف؟ — تِسْعَة.* |
| 5 | **Where Is It?** — prijedlozi, *hunāka*, *laysa* (jednina) | **Places & Directions** — 40 | **Prepositions** (genitiv iza prijedloga) + *أَيْنَ؟* + *هُناكَ* + *لَيْسَ* s mjesnim predikatom (*لَيْسَ هُنا*) | **Lost in Amman** (označene fraze: *اِذْهَبْ*، *عَلى اليَمينِ / اليَسارِ*) | *البَنْكُ أَمامَ المَطْعَم.* |
| 6 | **Everyday Life** — imperfekt (jednina), *lā*, *mādhā* | **Everyday Verbs** — 40 | **Present Tense I** (*أَنا، أَنْتَ، أَنْتِ، هُوَ، هِيَ*) + *لا* + *ماذا؟* + akuzativ objekta *-a / -an* | **David's Day** (fraza: *يَوْمَ الجُمُعَة*) · **Modul 1** | *أَعْمَلُ في شَرِكَة، وَلا أَعْمَلُ يَوْمَ الجُمُعَة.* |
| 7 | **Food & Drink** — *urīdu*, *uḥibbu*, pravilna množina, cijene | **Food & Drink** — 40 | **أُريد / أُحِبّ** + množina *-ūna / -īna*, *-āt* + brojevi 11–100 samostalno (cijene) | **The Falafel Shop** | *أُريدُ كوبَ شايٍ وَفَلافِل، مِنْ فَضْلِك.* (fraza: *مِنْ فَضْلِك*) |
| 8 | **Daily Routine** — imperfekt (sva lica), sat, *matā* | **Routine & Time** — 40 | **Present Tense II** (bez ženske množine i dvojine) + *السّاعَة* + redni broj kao izraz + *مَتى؟* | **Karim Oversleeps** | *نَسْتَيْقِظُ في السّاعَةِ السّابِعَة.* |
| 9 | **Yesterday** — perfekt (jednina), *mā* | **Past Time & Events** — 40 | **Past Tense I** + *ما* + perfekt (niječnica; razlika od upitnog *ما* iz L2) | **What Did You Do?** | *أَمْسِ ذَهَبْتُ إِلى السّوقِ وَاشْتَرَيْتُ خُبْزاً.* (fraza: *اشْتَرَيْتُ*) |
| 10 | **The Weekend** — perfekt (sva lica), izlomljena množina, slaganje | **Weekend & Free Time** — 40 | **Past Tense II** + glagol ispred subjekta u jednini (*ذَهَبَ الطُّلّابُ*) + **Broken Plurals I** + neljudska množina u ž. rodu jednine | **A Trip to the Dead Sea** | *ذَهَبْنا إِلى البَحْرِ المَيِّتِ وَسَبَحْنا.* |
| 11 | **Travel** — budućnost *sa- / sawfa*, slabi glagoli | **Transport & Trips** — 40 | **Future** + **Weak Verbs I** (šuplji i defektni, samo najčešći: *قالَ، زارَ، نامَ، اشْتَرى، مَشى*) | **The Road to Petra** | *سَنُسافِرُ إِلى البَتْراءِ غَداً.* |
| 12 | **In the City** — *laysa* (sva lica), pokazne zamjenice | **City & Shops** — 40 | *لَيْسَ* (množina, akuzativ predikata) + *ذٰلِكَ، تِلْكَ، هٰؤُلاءِ* + **Broken Plurals II** (+ ponavljanje neljudske množine) | **Errands in Amman** · **Modul 2** | *هٰؤُلاءِ لَيْسوا طُلّاباً، هُمْ مُهَنْدِسون.* |
| 13 | **Health & Body** — imperativ, objektni sufiksi | **The Body & the Doctor** — 40 | **Imperative** (m., ž., množina) + objektni sufiksi na glagolu (*ساعِدْني*) + *عِنْدي* uz bolesti (ponavljanje) | **David Is Ill** | *اِشْرَبْ ماءً كَثيراً وَنَمْ مُبَكِّراً.* |
| 14 | **Roots & Patterns** — sustavni pregled korijena i obitelji riječi | **Word Families** — 45 | **Root System** (*k-t-b, d-r-s, ʿ-m-l*) + obrasci *mafʿal, fāʿil* | **The Library** | *الكاتِبُ يَكْتُبُ في المَكْتَبَة.* |
| 15 | **Shopping & Comparisons** — elativ | **Clothes & Colours** — 45 | **Elative** (*أَكْبَر مِنْ*, *الأَكْبَر*) + boje (m/ž) | **The Old Market** | *هٰذا القَميصُ أَرْخَصُ مِنْ ذٰلِك.* |
| 16 | **Then & Now** — *kāna*, glagoli s prijedlozima, pregled padeža | **Feelings & Relations** — 45 | **كان** (i *صارَ*; akuzativ predikata kao uz *لَيْسَ*) + pregled padežnih nastavaka i diptote (*عَمّانُ*) | **Umm Samir Remembers** · **Modul 3** | *كانَتْ عَمّانُ مَدينَةً صَغيرَة.* |
| 17 | **Two of Everything** — dvojina, broj s imenicom | **Numbers & Shopping** — 45 | **The Dual** (glagolska dvojina samo prepoznavanje) + broj s imenicom (3–10 obrnuti rod i genitiv množine, 11–99 akuzativ jednine) | **Two Tickets, Please** | *عِنْدي أَخَوانِ وَأُخْتان.* |
| 18 | **Plans & Reasons** — *an* + subjunktiv, *lan*, *li-anna* | **Plans & Work** — 45 | **أَنْ + Subjunctive** (*أُريدُ أَنْ، يَجِبُ أَنْ*) + *لَنْ* + *لِماذا؟ — لِأَنَّ* | **Layla's Big Decision** | *أُريدُ أَنْ أَسْكُنَ هُنا لِأَنَّني أُحِبُّ المَدينَة.* |
| 19 | **If & Who** — *idhā*, odnosne zamjenice | **Wishes & People** — 45 | **إِذا** (+ *فَـ* ispred *سَـ* u odgovoru) + *الَّذي / الَّتي* | **The Wedding** | *إِذا زُرْتَني فَسَأُعَرِّفُكَ عَلى صَديقي الَّذي يَعْمَلُ مَعي.* |
| 20 | **Grand Finale** — glagolske vrste II–V kao obitelji riječi, čitanje bez vokala (oboje kao uvid) | **Memories & the Future** — 45 | **Verb Forms Overview** (prepoznavanje) + prvi potpuno nevokalizirani tekst + *لَمْ* (prepoznavanje) | **One Year in Amman** · **Završni test** | *تَعَلَّمْتُ العَرَبِيَّةَ في عَمّان، وَصارَتْ لُغَةَ قَلْبي.* |

Napomene za fazu 3:
- Nosive rečenice su radne i moraju ih provjeriti izvorni govornik i jezični recenzent (vokalizacija, nastavci i pauza prema radnom pravilu iz odj. 1).
- L10: četiri podteme, ali množina je od L2 pasivno poznata; opterećenje provjeriti u pilotu.
- L19: futur iz L11, odnosna zamjenica nova; provjeriti duljinu rečenice za tu razinu.
- Glagoli izvedenih vrsta (*نَسْتَيْقِظُ* X, *نُسافِرُ* III, *أُعَرِّفُ* II, *تَعَلَّمْتُ* V) prije L20 uče se leksički, kao zasebne riječi.

## 5. Kralježnica — rane zabrane

- Imperfekt tek L6 (jednina) i L8 (sva lica bez ženske množine i dvojine); perfekt tek L9 (jednina) i L10 (sva lica); glagolska dvojina L17, samo prepoznavanje.
- Slabi glagoli (šuplji, defektni) tek L11; prije toga samo kao označena fraza (*اشْتَرَيْتُ* u L9). Imperativ tek L13 (u L5 samo fraze *اِذْهَبْ*، *عَلى اليَمينِ*). Objektni sufiksi na glagolu tek L13.
- Izvedene vrste (II–X) prije L20 samo leksički; sustav vrsta u L20 kao uvid.
- Pravilna množina L7; izlomljena množina u rečenicama tek L10 (u Vocabularyju od L2 pasivno, uz imenicu); dvojina L17.
- Brojevi: 1–10 samostalno L4, 11–100 samostalno L7, broj s imenicom tek L17. Dob u L4 samo s brojem bez imenice; *عُمْرُهُ تِسْعُ سَنَوات* samo kao označena zamrznuta fraza.
- Pokazne: *هٰذا / هٰذِهِ* L2; *ذٰلِكَ، تِلْكَ، هٰؤُلاءِ* L12.
- Upitnice: *هَلْ، مَنْ* L1, *ما* L2, *كَمْ* L4, *أَيْنَ* L5, *ماذا* L6, *مَتى* L8, *لِماذا* L18.
- Niječnice: *لا* L6, *لَيْسَ* L5 (jednina, mjesni predikat) i L12 (množina, akuzativ predikata), *ما* + perfekt L9, *لَنْ* L18; *لَمْ* samo prepoznavanje u L20.
- Nastavci: nominativ L2, genitiv L3 (*iḍāfa*) i L5 (iza prijedloga), akuzativ objekta L6, predikat uz *laysa* L12, uz *kāna* i diptote L16. Pred pauzom uvijek pauzalni oblik (odj. 1). Alif tanwina se piše (*خُبْزاً*, pravopis od L0b); ostali tanwin prema radnom pravilu.
- Vokali: L1–L12 potpuno vokalizirano, L13–L19 djelomično, L20 prvi potpuno nevokalizirani tekst.
