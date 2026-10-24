# Kineski (mandarinski) — koncept tečaja

Verzija 0.2, 21.10.2026, status: koncept, ispravljen prema provjeri (popis kontrola v1.0).

**Vremenski plan:** jezik izvan latinice; izrada tek za godinu dana (≈ jesen 2027.), odluka vlasnika G7 od 23.10.2026. Koncept ostaje u v0.2; prije faze 3 ponovno provjeriti otvorene odluke i stanje alata.

## 1. U brojkama

| | |
|---|---|
| Razine | L0 + 20 |
| Cilj | **HSK 2 po revidiranom ispitnom programu (2025.)** (odluka vlasnika 21.10.2026.): razina 2 cijela (500 riječi) i nešto više, ukupno ≈ 600 riječi; približno A2− u govoru i slušanju, A1 u pisanju. Od kada vrijedi novi ispit, provjeriti kod CTI (chinesetest.cn) |
| Vokabular | ≈ 600 riječi · ≈ 450 znakova za čitanje · ≈ 150 znakova za pisanje (prepoznavanje je cilj, pisanje rukom opcija) |
| Pismo | **radni prijedlog: pojednostavljeni znakovi**; pinyin s tonovima iznad znakova, postupno se skriva (od L13 samo za nove riječi, uz gumb „prikaži pinyin“) |
| Moduli | L6 (Modul 1) · L12 (Modul 2) · L16 (Modul 3) · L20 (završni test) |
| Priča | **Leo Martin** (27), grafički dizajner iz Belgije, dolazi raditi u Chengdu; cimer **小李 Xiǎo Lǐ**, susjeda **张奶奶 Zhāng nǎinai**, kolega **陈明 Chén Míng**, Zhang nainaina unuka **乐乐 Lèle** (8). Likovi govore standardni mandarinski (radni prijedlog, §3) |

## 2. Specifičnosti i izazovi

- **Četiri tona i neutralni ton**; ton mijenja značenje (*mā / má / mǎ / mà*). Tonske promjene: dva treća tona (*nǐ hǎo*, L0), *bù / bú* (L1), *yī / yí / yì* (L3).
- **Znakovi**: tisuće znakova, sastavljeni od komponenti (značenjskih i glasovnih); radikali su podskup komponenti po kojima se znak traži u rječniku. Pamćenje traži sustav (komponente, priče, ponavljanje s razmakom).
- **Pinyin** koristi latinicu, ali slova se čitaju drugačije nego u europskim jezicima (*q, x, zh, c, z, j, r, ü*). Finali se pišu skraćeno: *iu* = iou, *ui* = uei, *un* = uen; *ian* se čita [iɛn]; *ü* se iza *j, q, x, y* piše kao *u*.
- **Gramatika bez oblika**: nema konjugacije ni deklinacije, ali **stalni red riječi**: subjekt + vrijeme + *在* + mjesto + glagol + objekt (vrijeme smije stajati i ispred subjekta); **odredište stoji iza** *去 / 来 / 到*. Uz to **čestice** (*了, 过, 着, 呢, 吗, 吧*).
- **Pridjev kao predikat bez 是**: *我很忙*, ne *我是忙*.
- **Nema općeg „da“**: na pitanje da/ne odgovara se ponavljanjem glagola (*是 / 不是*, *有 / 没有*).
- **Mjerne riječi** (*个, 本, 杯, 张, 只*…) uz svaku imenicu s brojem ili *这 / 那*.
- **Dopune glagolu** (rezultativne, smjerne, stupnja s *得*, trajanja): ključ prema A2.
- **Nema glagolskih vremena**; vrijeme se izražava prilozima i česticama, aspekt s *了 / 过 / 着 / 在*.
- **Tehnika**:
  - upis preko pinyina s izborom znaka (kao kineski IME); tonovi se upisuju dijakritikom ili brojem (*ni3*), *v* za *ü*;
  - tolerancija: izostavljen ton smije proći pri upisu znakova preko IME-a, ali ne u vježbama tonova; pogrešan ton nikad ne prolazi;
  - oznaka jezika `zh-Hans` i kineski font, inače uređaji zbog unifikacije Han znakova mogu prikazati japanske varijante;
  - pinyin po riječima (*Xiǎo Lǐ*, *shǒujī*), ne po znakovima, iznad znakova (ruby);
  - pri tonskim promjenama pinyin pokazuje citatni ton (*bù shì*), a u L0–L3 promjena se dodatno označava;
  - interpunkcija pune širine i latinična imena unutar kineske rečenice (*我叫 Leo，*);
  - animacija redoslijeda poteza za pisanje (izvor podataka i licenca, npr. Make Me a Hanzi / Hanzi Writer, treba potvrditi);
  - vježbe prepoznavanja tona (slušanje); prepoznavanje govora je otvorena odluka (§3).

### Izazovi po materinskom jeziku

**Govornici hrvatskog**
- Tonovi su nov koncept. Za dio govornika koji razlikuju naglaske silazni naglasak pomaže kod 4. tona; ne oslanjati se na to (mnogi govornici, npr. u urbanom govoru, uzlazne i silazne naglaske ne razlikuju).
- Pinyin nije hrvatska abeceda, ali hrvatski ima dobre oslonce, bolje nego engleski. Posebna stranica „pinyin nije hrvatska abeceda“ (s tablicom i skraćenim zapisima finala):

  | Pinyin | Najbliži hrvatski glas | Razlika |
  |---|---|---|
  | *b, d, g* | p, t, k | bezvučni, bez pridaha; hrvatski b, d, g su zvučni |
  | *p, t, k* | p, t, k + pridah | hrvatski p, t, k nemaju pridah, pa ih Kinez čuje kao *b, d, g* |
  | *z* | c | najčešća zamka: ne čitati kao hrvatski z |
  | *c* | c + pridah | |
  | *zh* | č | bez pridaha (nije ž) |
  | *ch* | č + pridah | |
  | *sh* | š | |
  | *r* | ž | približno, bez trenja |
  | *j* | ć | nije hrvatski j |
  | *q* | ć + pridah | nije k |
  | *x* | meko š (ś) | nije ks |
  | *h* | h | isti glas (prednost pred engleskim) |

- Lakše: nema padeža, rodova ni konjugacije.
- Stalni red riječi suprotan je slobodnom hrvatskom: *Ja sutra u Zagrebu radim* = *我明天在萨格勒布工作* (ispravno), ali *Radim u Zagrebu sutra* = **我工作在萨格勒布明天* (neispravno). Odredište ide iza glagola: *我明天去萨格勒布*.
- Greška prema „ja sam…“: **我是忙*, **他是高*; pravilno *我很忙*, *他很高*.
- Nema općeg „da“: odgovara se glagolom (*你是学生吗？— 是。*).

**Govornici engleskog**
- Pinyin zavodi na engleski izgovor (*xi, qi, zhi, cai*); aspiracija je poznata (*pin / spin*), ali u engleskom ne mijenja značenje.
- Red riječi: vrijeme i mjesto radnje ispred glagola (*I tomorrow in Beijing work*), odredište iza *去*.
- Nema glagolskih vremena, što je lakše, ali *了* nije „past tense“: tipična greška je *了* uz svaku prošlu radnju.
- Greška prema „I am…“: **我是忙*; pridjev ide s *很*, bez *是*.
- Nema općeg „yes / no“: odgovara se ponavljanjem glagola.
- Rečenična intonacija pitanja (uzlazna na kraju) „gazi“ tonove; pitanje se u kineskom označava s *吗*, ne intonacijom.

**Ostali jezici sučelja (napomena za prijevod)**
- Japanski i korejski: znakovi (kanji, hanja) djelomično poznati, ali s drugim izgovorom i ponekad drugim značenjem; posebna napomena.
- Vijetnamski i tajlandski: tonovi poznati kao koncept, ali drugi sustav.
- Europski jezici: kao hrvatski ili engleski, prema tome kako se u njima čita latinica.

## 3. Otvorene odluke

- ~~Koji HSK popis~~ — **odlučeno 21.10.2026.: revidirani ispitni program (2025.)**. Prije faze 3: kod CTI provjeriti od kada vrijedi novi ispit i uskladiti riječi i znakove po razinama s njegovim popisom.
- **Pojednostavljeni ili tradicionalni znakovi** (prijedlog: pojednostavljeni; tradicionalni kao prikaz na zahtjev ili zaseban tečaj za Tajvan).
- **Pisanje rukom**: obavezno ili opcija (prijedlog: opcija, cilj je čitanje i upis preko pinyina).
- **Zvuk**: snimljeni govor za tonske parove; TTS je za mandarinski dobar, ali treba provjeriti tonske promjene.
- **Prepoznavanje govora za tonove**: da ili ne (prijedlog: ne u prvoj verziji; vježbe slušanja i snimanje vlastitog izgovora za usporedbu).
- **Dijalekt u Chengduu**: ondje se govori sečuanski (prijedlog: likovi govore standardni mandarinski, uz jednu kulturnu bilješku o dijalektu).

## 4. Raspored razina

| # | Lesson — tema · gramatički fokus | Vocabulary | Grammar (+ dodatak) | Practice | Nosiva rečenica |
|---|---|---|---|---|---|
| 0 | **Tones & Pinyin** — četiri tona, inicijali i finali (skraćeni zapisi), prvi znakovi (一 二 三 人 口 大) | 20 slogova + 10 znakova | tonske promjene *nǐ hǎo* | — | — |
| 1 | **你好!** — *是*, *叫*, pitanja s *吗* i *什么*, *不* | **Greetings & Countries** — 30 · 25 znakova | **是 & 吗** + *国 + 人* + *什么* + *不* (tonska promjena *bú shì*) | **Arrival in Chengdu** | *我叫 Leo，我是比利时人。* |
| 2 | **Things Around Us** — *这 / 那*, *个*, *的*, *很* + pridjev | **The Room & Objects** — 30 · 25 | **Measure Word 个** + *的* za posvojnost + *很* + pridjev (bez *是*) | **Leo's Room** | *这个手机是我的，那个是小李的。* |
| 3 | **Numbers & Dates** — brojevi, dob, datumi | **Numbers, Days & Age** — 30 · 20 | **Numbers** + *几 / 多少* + *岁* + *二 / 两* (tonska promjena *一*) | **Lèle's Age** | *乐乐今年八岁。* |
| 4 | **Family** — *有 / 没有*, *和*, pitanja A-不-A | **Family & People** — 30 · 25 | **有 / 没有** + *口* + *也, 都* + A-不-A (*有没有, 是不是*) i odgovor glagolom | **Zhang Nainai's Photos** | *我家有四口人，我没有弟弟。* |
| 5 | **Food & Drink** — *想 / 要*, novac, *还是*; *太好了！* kao zamrznuta fraza | **Food, Drink & Money** — 35 · 25 | **Measure Words II** (*杯, 碗, 斤*) + *多少钱* + *还是* | **The Noodle Shop** | *我要一碗面和一杯茶，多少钱？* |
| 6 | **Where Is It?** — *在*, smjerovi | **Places & Directions** — 30 · 25 | **在 + mjesto** + *上, 里, 旁边* | **Lost in Chengdu** · **Modul 1** | *银行在超市旁边。* |
| 7 | **Time** — sat, red riječi vrijeme – mjesto radnje – glagol | **Time & the Week** — 30 · 25 | **Time-Place-Verb Order** + *点, 分* | **Leo's Week** | *我明天早上八点在公司工作。* |
| 8 | **Going Places** — *去 / 来* (odredište iza glagola), *跟 … 一起* | **Activities & Places** — 30 · 25 | **去 / 来** + *跟 … 一起* + *吧* (prijedlog) | **A Sunday Plan** | *小李，星期天你跟我一起去公园吧！* |
| 9 | **Can & Want** — modalni glagoli, *一下* | **Hobbies & Skills** — 30 · 20 (uklj. *一点儿*) | **会, 能, 可以** (*想* ponavljanje iz L5) + udvajanje glagola i *一下* | **Chen Ming's Hobbies** | *我会说一点儿中文，可是不会写汉字。* |
| 10 | **Done!** — *了* | **Daily Events** — 30 · 25 | **Completed Action 了** + *没* | **Yesterday** | *昨天我买了一本书，没去上班。* |
| 11 | **Weather & Comparisons** — *比*, promjena stanja s *了* | **Weather & Seasons** — 30 · 20 | **比** + *太 … 了* + *了* za promjenu stanja (*下雨了, 天气冷了*) | **Chengdu or Beijing?** | *今天比昨天热，太热了！* |
| 12 | **Getting Around** — prijevoz, *从 … 到*, *离* | **Transport** — 30 · 25 | **怎么** + *从 … 到*, *离* + *坐 / 骑* | **The Metro** · **Modul 2** | *我家离公司不远，我每天坐地铁去上班。* |
| 13 | **Right Now** — *在 + glagol*, *呢* | **Home & Chores** — 30 · 20 | **Progressive 在 / 正在** + *呢* | **What Are You Doing?** | *你在做什么呢？我在做饭。* |
| 14 | **Experiences** — *过*, *是 … 的* | **Travel & Places** — 30 · 20 | **Experience 过** + *还没* + *是 … 的* (kada, gdje, kako) | **Have You Been to Beijing?** | *我去过北京，但是还没去过上海。* |
| 15 | **Shopping & Clothes** — *的* uz opisnu rečenicu, *有点儿* nasuprot *一点儿* | **Clothes & Colours** — 30 · 20 | **Attributive 的** + *有点儿* nasuprot *一点儿* | **The Market Street** | *我昨天买的衣服有点儿小。* |
| 16 | **Did You Get It?** — rezultativne dopune, *已经* | **School & Work Tasks** — 30 · 20 | **Result Complements** (*完, 懂, 到, 好*) + *已经 … 了* | **Leo's Chinese Class** · **Modul 3** | *老师说的话，我听懂了。* |
| 17 | **Health & Body** — dopuna stupnja *得*, trajanje, *应该* | **The Body & the Doctor** — 30 · 20 | **Degree Complement 得** + *应该* + dopuna trajanja (*病了三天*) | **Leo Is Ill** | *你睡得太晚了，应该多喝水，早点儿睡觉。* |
| 18 | **Plans & Reasons** — *打算*, *因为 … 所以* | **Plans & the Future** — 30 · 20 | **因为 … 所以** + *要 … 了* + *打算* | **Leo's Big Decision** | *因为我很喜欢成都，所以我打算再住一年。* |
| 19 | **Moving Things** — jednostavne smjerne dopune, *着*, *别* | **The Home & Moving** — 30 · 20 | **Directional Complements** (*进来, 出去, 回去, 上去*) + *着* + *别 / 不要* | **Moving Day** | *桌子很重，别一个人搬，我们一起搬进来吧！* |
| 20 | **Grand Finale** — *虽然 … 但是*, *如果 … 就*, ponavljanje | **Memories & the Future** — 30 · 20 | **Complex Sentences** (*虽然 … 但是, 如果 … 就*) + *越来越* (fraza) | **One Year in Chengdu** · **Završni test** | *虽然汉字很难，但是我越来越喜欢学中文了。* |

Napomena: L9 rečenica koristi *一点儿* iz L9 Vocabulary; L15 uči samo razliku prema *有点儿*. Rečenica u L16
koristi *的* iz L15, u L17 *太 … 了* iz L11, u L18 dopunu trajanja (*住一年*) iz L17. L20 rečenica sadrži
*越来越* (fraza u L20 Vocabulary) i *了* za promjenu stanja iz L11. *把* i složene smjerne dopune (*搬上来,
拿下去*) su građa HSK 3 i nisu u tečaju. Broj znakova po razini (drugi broj u stupcu Vocabulary) je okviran
i treba ga u fazi 3 uskladiti s izabranim HSK popisom (§3).

## 5. Kralježnica — rane zabrane

- *了* tek L10. Iznimka: *太好了！* kao zamrznuta fraza od L5 (označena); u L11 se objašnjavaju *太 … 了* i *了* za promjenu stanja te razlika prema *了* iz L10.
- *过* i *是 … 的* tek L14; *在* kao progresiv tek L13 (kao mjesto od L6).
- *很* + pridjev od L2; A-不-A pitanja L4; *还是* L5; *一点儿* L9, *有点儿* L15; *一下* i udvajanje glagola L9; *已经* L16; *着* i *别 / 不要* L19.
- Dopune glagolu tek L16 (rezultativne), L17 (stupanj, trajanje), L19 (jednostavne smjerne); do tada nijedna.
- *把* i složene smjerne dopune nisu u tečaju (HSK 3).
- *越来越* samo kao fraza u L20.
- Svaki znak u rečenici mora biti naučen ili označen kao nov uz pinyin; nema „slučajnih“ znakova.
