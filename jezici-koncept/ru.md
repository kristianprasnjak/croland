# Ruski — koncept tečaja

Verzija 0.2, 21.10.2026, status: koncept, ispravljen prema provjeri (popis kontrola v1.0).

**Vremenski plan:** jezik izvan latinice; izrada tek za godinu dana (≈ jesen 2027.), odluka vlasnika G7 od 23.10.2026. Koncept ostaje u v0.2; prije faze 3 ponovno provjeriti otvorene odluke i stanje alata.

## 1. U brojkama

| | |
|---|---|
| Razine | **L0a + L0b + 20**; L0 u jednom dijelu samo za sučelja čiji govornici znaju ćirilicu (bugarski, makedonski, srpski, ukrajinski, bjeloruski). Hrvatsko sučelje ima L0a + L0b, uz kraća objašnjenja glasova |
| Cilj | A1 (L1–L12) · A2 (L13–L20), otprilike TORFL elementarni + dio bazičnog; množina u svim padežima uvodi se uz pojedine padeže (G mn. L12, D mn. L14, I mn. L15, L mn. L17) |
| Vokabular | ≈ 690 do L12, ≈ 1270 do L20 (s 40 riječi u L0); leksički minimum TORFL-a je ≈ 780 (elementarni) i ≈ 1300 (bazični) — vidi odluke |
| Pismo | ćirilica; naglasak označen u svim materijalima do L16; od L17 Practice tekst bez oznaka, uz prekidač „prikaži naglasak“ |
| Moduli | Modul 1 (L6) · Modul 2 (L12, kraj A1) · Modul 3 (L16) · Završni test (L20) |
| Priča | **Marta Silva** (26), prevoditeljica iz Lisabona, dolazi na godinu dana u **Sankt Peterburg** (odluka vlasnika 21.10.2026.); cimerica **Katja**, susjeda **Valentina Petrovna**, kolega prevoditelj **Dima**, Katjin brat **Miša** (10) |

## 2. Specifičnosti i izazovi

- **Ćirilica** (33 slova), uključujući *ы, э, ё, й, щ, ъ, ь*; slova „lažni prijatelji“ latinice (*В, Н, Р, С, У, Х*).
- **Pomični naglasak i redukcija samoglasnika**: nenaglašeno *о* zvuči kao *a*, a *е, я* nenaglašeni kao [i] (*сестра́* [sʲistra], *пятно́*); pravopis ne pokazuje izgovor, naglasak se uči uz svaku riječ.
- **Meki i tvrdi suglasnici** razlikuju značenje.
- **Šest padeža**, tri roda, slaganje pridjeva; akuzativ živih muškog roda = genitiv (*ви́жу бра́та*).
- **Nema glagola „biti“ u prezentu** (*Я студе́нтка.*).
- **Vid** (*чита́ть / прочита́ть*) i glagoli kretanja (*идти́ / ходи́ть, е́хать / е́здить*) s prefiksima.
- **Brojevi s imenicama** (2–4 + genitiv jednine, 5+ genitiv množine).
- **Tehnika**:
  - ruska tipkovnica u aplikaciji; raspored ЙЦУКЕН ili fonetski (za HR i EN polaznike znatno lakši) — globalna odluka 3 u `00-pregled.md`;
  - prihvaćanje *е* umjesto *ё*; upis bez *ъ / ь*: prijedlog — upozorenje u vježbi, greška u Testu;
  - znak naglaska (U+0301) samo za prikaz: briše se pri usporedbi upisa, pretraživanju i kopiranju; font ga mora ispravno prikazati;
  - TTS za ruski često stavlja krivi naglasak: zvuk provjeren ili s označenim naglaskom (SSML, snimke);
  - sve oznake naglaska prije faze 3 automatski provjeriti prema rječniku (Zaliznjak, ru.wiktionary);
  - čitanje rukopisa i kurziva (*т* = m, *д* = g, *и* = u): vidi odluke.

### Izazovi po materinskom jeziku

**Govornici hrvatskog**
- Velika prednost: padeži, slaganje, slobodan red riječi i mnogo zajedničkog korijena; brojevi s imenicama (2–4 / 5+) gotovo kao u hrvatskom. Objašnjenja padeža mogu biti kratka, s usporedbom.
- **Vid je prednost samo djelomično**: ruski svršeni „prezent“ znači budućnost (*напишу́* = napisat ću), a u hrvatskom svršeni prezent samostalno ne stoji (*da napišem*); nesvršeni glagol stoji za opću činjenicu u prošlosti (*Ты чита́л э́ту кни́гу?*) i u zanijekanom imperativu (*Не открыва́йте!*). Prošireno objašnjenje u L10, L13 i L16.
- **Lažni prijatelji** (uz razinu prvog javljanja): *страна́* = zemlja, država (L1); *магази́н* = trgovina, ne časopis ili skladište (L5); *пря́мо* = ravno (hrv. *idi pravo*), a *напра́во* = desno, *пра́во* = pravo, zakon (L6); *час* = sat, ne trenutak (L9); *неде́ля* = tjedan; *позо́р* = sramota; *живо́т* = trbuh; *столи́ца* = glavni grad, a hrv. *stolica* = *стул*; *я́года* = bobica, a jagoda = *клубни́ка* (L17); *год* = godina; *пол* = pod, spol; *уро́д* = nakaza (hrv. *urod* = prinos).
- Redukcija samoglasnika i pomični naglasak (hrvatski ima naglasak, ali bez redukcije).
- Oprez s nastavcima: hrvatski muški rod ima isti oblik u dativu i lokativu (*gradu / u gradu*), ruski ne (*го́роду / в го́роде*) — L6, L14; genitiv množine *-ов / -ей / -∅* nasuprot hrvatskom *-a* (L12); *у меня́ есть* nasuprot *imam*; instrumental *с кем*.
- Ćirilica: većina mlađih govornika ne zna srpsku ćirilicu, pa hrvatsko sučelje ima L0a + L0b. Tko je zna: zamka je isto slovo s drugom vrijednošću (rus. *е* = [je] / meko, srp. *е* = [e]); *ј, љ, њ, ћ, ђ, џ* ne postoje u ruskom, a *ы, э, щ, ъ, ь, й, я, ю, ё* su nova.

**Govornici engleskog**
- Ćirilica: L0a slova, L0b čitanje i naglasak.
- Padeži i vid su potpuno novi: dulja objašnjenja i više vježbe u L4–L8, L10, L12–L15.
- Nema članova (lakše), ali nema ni glagola „biti“ u prezentu.
- Glasovi *ы*, meki suglasnici, *р*, *щ*.

**Ostali jezici sučelja (napomena za prijevod)**
- Slavenski jezici: kao hrvatski, s vlastitim popisom lažnih prijatelja (poljski, češki i bugarski imaju svoje). Bugarski i makedonski znaju ćirilicu, ali nemaju padeže.
- Baltički jezici: padeži poznati.
- Ostali: kao engleski.

## 3. Otvorene odluke

- ~~Mjesto priče~~ — **odlučeno 21.10.2026.: Sankt Peterburg** (L6 *на Не́вском*, L11 *в Москву́*, L17 *да́ча* i L20 ostaju kako jesu).
- **L0 u jednom ili dva dijela** ovisno o jeziku sučelja: prijedlog — dva dijela za sve osim sučelja čiji govornici znaju ćirilicu (odj. 1).
- **Množina kosih padeža**: u konceptu je primijenjeno uvođenje uz pojedine padeže (L12, L14, L15, L17), da bi cilj A2 bio ispunjen. Alternativa: cilj „A2 bez množine kosih padeža (osim genitiva)“. Prijedlog: primijenjeno rješenje.
- **Vokabular**: ≈ 690 do L12 ispod je elementarnog minimuma TORFL-a (≈ 780). Prijedlog: +5 riječi po razini u L7–L12 (≈ 720) ili cilj L12 opisati kao „A1, bez zahtjeva TORFL elementarnog“.
- **Rukopis i kurziv**: prijedlog — samo čitanje kurziva (prepoznavanje) u L0b i u Practice tekstovima povremeno, bez pisanja rukom.
- **Upis bez *ъ / ь***: prijedlog u odj. 2.

## 4. Raspored razina

| # | Lesson — tema · gramatički fokus | Vocabulary | Grammar (+ dodatak) | Practice | Nosiva rečenica |
|---|---|---|---|---|---|
| 0a | **Alphabet** — ćirilica, „lažna“ slova, kurziv (prepoznavanje) | 20 poznatih riječi (*такси́, ко́фе, банк, ма́ма*) | — | — | — |
| 0b | **Sounds & Stress** — naglasak, redukcija (*о*, *е / я*), *ы*, meki i tvrdi suglasnici, meki znak | 20 poznatih riječi | — | — | — |
| 1 | **Приве́т!** — *я / ты / вы*, bez „biti“, *э́то* | **Greetings & Countries** — 45 | **No "to be"** + fraze *как вас зову́т?*, *Я из* + zemlja (zatvoren popis zemalja) | **Arrival in St Petersburg** | *Меня́ зову́т Ма́рта. Я из Португа́лии.* (*Я из…* zamrznuto) |
| 2 | **Things Around Us** — rod, *мой / моя́ / моё* | **The Flat & Colours** — 50 | **Gender** + slaganje pridjeva (nominativ) + *где? здесь / там* | **Marta's Room** | *Э́то моя́ ко́мната. Она́ ма́ленькая, но све́тлая.* |
| 3 | **Everyday Life** — prezent 1. konjugacije, *не* | **Everyday Verbs & the Week** — 50 | **Present Tense I** (*чита́ть, де́лать, рабо́тать*) + fraza *в* + dan (*в понеде́льник, в сре́ду*) | **A Week with Katja** | *В понеде́льник я рабо́таю, а ве́чером чита́ю.* |
| 4 | **Family** — *у меня́ есть*, brojevi 1–10 | **Family & Age** — 50 | **у меня́ есть** (kao fraza; *нет* samo kao odgovor „ne“) + posvojni + brojevi 1–10 samostalno + fraza *Мне … лет* | **Valentina Petrovna's Photos** | *У меня́ есть брат и сестра́.* |
| 5 | **At the Shop** — akuzativ (neživo), množina | **Food & Shopping** — 55 | **Accusative I** (imenice i pridjevi; ž. *-у*) + nominativ množine + *хоте́ть* + fraza *Ско́лько сто́ит?* | **Saturday Shopping** | *Я хочу́ купи́ть хлеб, молоко́ и колбасу́.* |
| 6 | **In the City** — lokativ (*в / на* + gdje), 2. konjugacija | **City & Places** — 55 | **Prepositional Case** (imenice i pridjevi) + 2. konjugacija (*говори́ть, люби́ть*) + *жить* (nepravilan) + fraze za smjer (*иди́те пря́мо, напра́во, нале́во*) | **Lost in St Petersburg** · **Modul 1** | *Я живу́ в це́нтре, а рабо́таю на Не́вском.* (*на Не́вском* = ime mjesta) |
| 7 | **Free Time** — *мочь*, *игра́ть в / на* | **Hobbies & Sport** — 55 | **мочь** + *мо́жно / нельзя́* + *игра́ть в футбо́л / на гита́ре* | **Dima's Sunday** | *Я люблю́ пла́вать, но не могу́ игра́ть в те́ннис.* |
| 8 | **What Is Missing?** — genitiv jednine, akuzativ živih | **Packaging, Quantities & People** — 55 | **Genitive I** (*нет, у, из, без*, količine: *буты́лка воды́*; pridjevi) + akuzativ živih (*ви́жу бра́та*) + *у кого́?* | **The Empty Fridge** | *В магази́не нет хле́ба, но есть буты́лка молока́.* |
| 9 | **Yesterday** — prošlo vrijeme, povratni glagoli | **Routine, Time & Past Events** — 55 | **Past Tense** (rod u prošlom vremenu) + **-ся Verbs** (prezent i prošlo) + fraza *в семь часо́в* | **Marta Oversleeps** | *Вчера́ я гуля́ла, а Ди́ма занима́лся.* |
| 10 | **Done or Doing?** — vid u prošlosti | **Tasks & Chores** — 60 | **Aspect I** (*чита́л / прочита́л*; nesvršeni za opću činjenicu) | **The To-Do List** | *Я до́лго писа́ла письмо́ и наконе́ц написа́ла.* |
| 11 | **Travel** — glagoli kretanja, *куда́?* | **Transport & Trips** — 60 | **идти́ / е́хать** + akuzativ smjera + *на чём?* | **A Trip by Train** | *За́втра мы е́дем в Москву́ на по́езде.* |
| 12 | **Shopping for Clothes** — brojevi s imenicama, genitiv množine, datumi | **Clothes, Shops & Dates** — 60 | **Numbers & Nouns** (2–4 + G jd., 5+ + G mn.) + **Genitive Plural** (i akuzativ živih u množini) + redni brojevi i datumi (*пя́того ма́я*) | **The Interview Outfit** · **Modul 2** | *У меня́ нет вре́мени, но есть два биле́та в кино́.* |
| 13 | **Health & Body** — imperativ, *боли́т* | **The Body & the Doctor** — 70 | **The Imperative** (+ *не* + nesvršeni) + *у меня́ боли́т* + fraza *мне на́до / ну́жно* | **Marta Is Ill** | *Пе́йте чай и остава́йтесь до́ма!* |
| 14 | **Gifts & Celebrations** — dativ, *нра́вится* | **Parties & Presents** — 70 | **Dative** (jednina i množina *-ам*, pridjevi, zamjenice *мне, тебе́, ему́…*) + *мне нра́вится* + *на́до / ну́жно* sustavno | **Miša's Birthday** | *Я дарю́ Ми́ше кни́гу, потому́ что ему́ нра́вятся исто́рии.* |
| 15 | **Going Out** — instrumental, *свой* | **Friends & Professions** — 70 | **Instrumental** (jednina i množina *-ами*; *с кем?*, *рабо́тать кем?*) + *свой* | **Friday Night** | *Я иду́ в кино́ с Ка́тей, а Ди́ма рабо́тает перево́дчиком.* |
| 16 | **Plans** — budućnost | **Plans & Seasons** — 70 | **Future** (*бу́ду* + nesvršeni, svršeni prezent) | **A Summer Plan** · **Modul 3** | *Ле́том я бу́ду отдыха́ть, а пото́м напишу́ кни́гу.* |
| 17 | **City or Country?** — usporedba | **Town, Village & Nature** — 75 | **Comparatives** (*бо́льше, лу́чше, интере́снее, чем*) + *са́мый* + lokativ množine (*-ах*); od ove razine Practice bez oznaka naglaska | **A Weekend at the Dacha** | *На да́че ти́ше, чем в го́роде.* |
| 18 | **Coming & Going** — prefiksirani glagoli kretanja | **Visits & Errands** — 75 | **Motion Verbs II** (*ходи́ть / идти́, прийти́, уйти́*) | **Valentina Petrovna's Visitors** | *Ка́тя пришла́ в шесть, а ушла́ в де́сять.* |
| 19 | **Dreams & Advice** — kondicional | **Wishes & Advice** — 75 | **Conditional** (*бы, е́сли бы*) + *тебе́ сто́ит* | **If I Won the Lottery** | *Е́сли бы у меня́ бы́ло вре́мя, я бы чита́ла бо́льше.* |
| 20 | **Grand Finale** — odnosne rečenice, *что́бы* | **Memories & the Future** — 75 | **кото́рый** + *что́бы* | **One Year in St Petersburg** · **Završni test** | *Э́то го́род, кото́рый я никогда́ не забу́ду.* |

Napomena: preuređenje prema v0.1 — genitiv jednine iz L12 premješten u L8 (teme dob, količine i „nemam“ traže ga rano), povratni glagoli spojeni s prošlim vremenom u L9, L12 zadržava brojeve s imenicama i genitiv množine. L12 i L9 su najteže razine; provjeriti u pilotu.

## 5. Kralježnica — rane zabrane

- Padeži redom: nominativ (L1–L4), akuzativ neživo (L5), lokativ (L6), genitiv jednine i akuzativ živih (L8), genitiv množine i brojevi s imenicama (L12), dativ (L14), instrumental (L15); dativ množine L14, instrumental množine L15, lokativ množine L17. Pridjevi i zamjenice uz svaki padež.
- Zamrznute fraze — zatvoren popis: *меня́ зову́т*, *как вас зову́т?*, *Я из* + zemlja (popis zemalja u L1) (L1); *в* + dan u tjednu (L3); *Мне … лет* (L4); *Ско́лько сто́ит?* (L5); *на Не́вском*, *иди́те пря́мо, напра́во, нале́во* (L6); *в семь часо́в* (L9); *мне на́до / ну́жно* (L13). *Нет* + imenica nije fraza: tek od L8.
- Glagoli: prezent 1. konjugacije L3; *хоте́ть* L5; 2. konjugacija i *жить* L6; *мочь* L7; prošlo vrijeme i *-ся* L9; vid L10; glagoli kretanja L11 (bez prefiksa) i L18 (s prefiksima); imperativ L13; budućnost L16; kondicional L19.
- Infinitiv svršenog glagola (*купи́ть*) od L5 samo kao dopuna (*хочу́ купи́ть*); vid kao pojam tek L10.
- Brojevi s imenicama osim *оди́н / одна́* tek L12; prije toga brojevi samostalno (L4) i fraze.
- Komparativ i *са́мый* L17; *кото́рый* i *что́бы* L20.
- Naglasak označen u svim materijalima do L16; od L17 Practice bez oznaka (prekidač).
