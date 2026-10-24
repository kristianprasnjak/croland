# Japanski — koncept tečaja

Verzija 0.2, 21.10.2026, status: koncept, ispravljen prema provjeri (popis kontrola v1.0).

**Vremenski plan:** jezik izvan latinice; izrada tek za godinu dana (≈ jesen 2027.), odluka vlasnika G7 od 23.10.2026. Koncept ostaje u v0.2; prije faze 3 ponovno provjeriti otvorene odluke i stanje alata.

## 1. U brojkama

| | |
|---|---|
| Razine | **L0a + L0b + 20** (dva dijela L0 jer se uče dva pisma) |
| Cilj | **A1** (JLPT N5 vokabular i kanji, gramatika dijelom N4: L17–L20) — „priprema za N5“. JLPT službeno ne veže razine uz CEFR; uobičajeno N5 ≈ A1, N4 ≈ A2. 22 tjedna × 25–35 min ≈ 65–90 sati |
| Vokabular | ≈ 800 riječi u L1–L20 (+ 80 u L0a–L0b) · ≈ 120 kanjija za čitanje (≈ 6 po razini) = cijeli N5 (≈ 80–100) + znakovi iz priče (京都, 田中, 思…) · hiragana i katakana potpuno |
| Pismo | hiragana (L0a), katakana (L0b), kanji postupno od L1 uz furiganu. Pravopisno pravilo: naučeni kanji uvijek u kanjiju, nenaučeni kanom, bez miješanja kanjija i kane unutar riječi; uz kanji izvan popisa (imena, mjesta) furigana. Razmaci među riječima u L1–L6, od L7 bez razmaka. **Romaji (Hepburn) samo u L0a i L0b**, kasnije gumb „prikaži čitanje“ u svim razinama (odluka vlasnika 21.10.2026.) |
| Uljudnost | tečaj počinje uljudnim oblicima (*です / ます*); obični oblici od L14 |
| Moduli | Modul 1 (L6) · Modul 2 (L12) · Modul 3 (L16) · Završni test (L20) |
| Priča | **サラ Sara Lindgren** (25) iz Švedske dolazi u Kyoto na rad u studiju za animaciju; cimerica **ゆい Yui**, stanodavka **田中（たなか）さん Tanaka-san**, kolega **けんた Kenta**, Tanakin unuk **はると Haruto** (7). Imena likova u kani, prezime 田中 u kanjiju s furiganom. Svi govore standardni jezik (*hyōjungo*); kjotski izrazi samo kao kulturna napomena |

## 2. Specifičnosti i izazovi

- **Tri pisma u istoj rečenici**: hiragana (gramatika), katakana (posuđenice), kanji (korijeni riječi), s više čitanja po znaku.
- **Predikat je na kraju rečenice** (glagol, pridjev ili imenica + *です*); osnovni red subjekt – objekt – glagol, u razgovoru i obrnuti red (*たべた？それ*).
- **Čestice** (*は, が, を, に, で, へ, の, も, と, から*): razlika *は / が* je trajni izazov (uvodi se postupno: *が* uz *います / あります* L4, *～がすき* L9, usporedba L18).
- **Razine uljudnosti** utkane u glagol (*たべます / たべる*) i rječnik.
- **Glagolski oblici** (*ます, て, ない, た*, rječnički oblik) i tri skupine glagola.
- **Dvije vrste pridjeva**: *い*-pridjevi imaju vlastite nastavke (*～くない, ～かった*); *な*-pridjevi se ponašaju kao imenice (*しずかです / しずかじゃないです*).
- **Brojači** (*～人, ～つ, ～本, ～枚*).
- **Izgovor**: pet samoglasnika; duljina samoglasnika i udvojeni suglasnici (*っ*) mijenjaju značenje (*おばさん / おばあさん*, *きて / きって*); bezvučno *i / u* (*です* ≈ [des], *～ます* ≈ [mas]); *は, へ, を* kao čestice se čitaju *wa, e, o*; *ふ* = [ɸ], ne *f*; *ん* ispred *b / m / p* = [m]; nezaobljeno *u*; tonski naglasak (*はし* most / štapići) kao napomena.
- **Tehnika**:
  - font s `lang="ja"` (ujedinjeni Han znakovi, inače se prikazuju kineski oblici); smjer teksta vodoravno (*yokogaki*);
  - ruby / furigana prikaz i prelamanje redaka; furigana se skriva **po riječi i čitanju**, ne po znaku (日本 naučeno ≠ 日曜日 naučeno) — i u podatkovnom modelu;
  - upis preko romajija s pretvorbom u kanu i izborom kanjija (kao japanski IME); romanizacija za **upis** (*wo* za を, *nn* za ん, *ou* za dugo *o*, *-* za ー) uvodi se kratko u L0a, odvojeno od pomoći pri čitanju; na mobitelu i japanska *flick* tipkovnica s 12 tipki;
  - provjera odgovora: kana i kanji ravnopravni (*ほん* = *本*), pune i pola širine znakova, *。、？* i *. , ?*, bez razmaka;
  - TTS dobiva čitanje (kana ili SSML), inače krivo čita 日本, 人 i imena; tonski naglasak provjeriti;
  - vježbe razlikovanja sličnih kana (*シ / ツ, ソ / ン*);
  - pisanje rukom (odluka vlasnika 21.10.2026.): animacija redoslijeda poteza i mini-igre u kojima se cijeli zaslon koristi za crtanje pojedinih znakova; podaci o redoslijedu poteza (npr. KanjiVG, CC BY-SA) i prepoznavanje rukopisa;
  - furigana u cjelini Test: vidi odluke.

### Izazovi po materinskom jeziku

**Govornici hrvatskog**
- Izgovor je blizak: pet samoglasnika gotovo jednakih; japanski *r* je kratki dodir [ɾ], kao hrvatski *r* između samoglasnika, i ne valja se; *つ* = *c* (Englezima teško).
- Duljina samoglasnika postoji u standardnom hrvatskom, ali je mnogi govornici ne razlikuju i ne vide je u pismu; u japanskom se piše i mijenja značenje, pa je treba uvježbati (objašnjenje ne skraćivati). Udvojenih suglasnika (*っ*) u hrvatskom nema: teški su i Hrvatima.
- Romaji (Hepburn) prema hrvatskom: *ch* ≈ č / ć, *sh* ≈ š, *j* ≈ dž / đ, *y* ≈ j, *ts* ≈ c. Hrvatski ima ustaljenu transkripciju (Kjoto, Tokio, Fudži, šinkansen): vidi odluke.
- Novo: predikat na kraju, čestice umjesto padeža, razine uljudnosti (*ti / Vi* samo je mali dio toga). Usporedba čestica: *を* ≈ akuzativ; *に* = primatelj (≈ dativ), cilj kretanja (≈ *u / na* + akuzativ), mjesto postojanja (≈ lokativ), vrijeme; *で* = mjesto radnje (≈ lokativ), sredstvo (≈ instrumental).
- Lakše: nema rodova ni članova; glagol se ne mijenja po licu ni broju; subjekt se izostavlja kao u hrvatskom.

**Govornici engleskog**
- Red riječi SOV i čestice su potpuno novi.
- Duljina samoglasnika i udvojeni suglasnici; engleski *r* i diftonzi (*kei* umjesto *ke*); *つ*; bezvučno *i / u*.
- Posuđenice u katakani pomažu, ali promijenjenog oblika i značenja (*マンション* = stan u zgradi, *バイキング* = švedski stol).

**Ostali jezici sučelja (napomena za prijevod)**
- Kineski: kanji su prednost (značenje), ali čitanja i neki znakovi (pojednostavljeni nasuprot japanskima) razlikuju se; posebna napomena.
- Korejski: red riječi i čestice gotovo jednaki; velika prednost.
- Turski, mađarski, finski: aglutinacija i SOV poznati.

## 3. Otvorene odluke

- ~~Broj kanjija~~ — **odlučeno 21.10.2026.: ≈ 120** (cijeli N5 + znakovi iz priče); popis po razinama u punoj fazi 2.
- ~~Romaji~~ — **odlučeno 21.10.2026.**: u tekstu samo u L0a i L0b; kasnije gumb „prikaži čitanje“ kao pomoć u svim razinama.
- ~~Romanizacija~~ — **odlučeno 21.10.2026.: Hepburn** za upis i za pomoć pri čitanju u svim sučeljima; u L0a stranica s razlikama prema hrvatskom (*ch* ≈ č, *j* ≈ dž, *sh* ≈ š).
- ~~Razmaci među riječima~~ — **odlučeno 21.10.2026.**: da u L1–L6, od L7 bez razmaka.
- ~~Pisanje kanjija rukom~~ — **odlučeno 21.10.2026.**: animacija poteza i mini-igre crtanja znakova preko cijelog zaslona. Prijedlog: vježba za pamćenje, ne ocjenjuje se u Testu.
- ~~Kada se furigana skriva~~ — **odlučeno 21.10.2026. (vlasnik prepustio autoru koncepta)**: za riječ (s tim čitanjem) tri razine nakon što je naučena; u Testu prikazana samo za riječi tekuće razine; gumb „prikaži čitanje“ uvijek dostupan.

## 4. Raspored razina

| # | Lesson — tema · gramatički fokus | Vocabulary | Grammar (+ dodatak) | Practice | Nosiva rečenica |
|---|---|---|---|---|---|
| 0a | **Hiragana & Sounds** — 46 osnovnih znakova, *゛゜*, 33 spoja s *ゃ ゅ ょ*, duljina, bezvučno *i / u*, *は へ を* kao čestice, romanizacija za upis | 40 riječi u hiragani | — | — | — |
| 0b | **Katakana** — 46 znakova, *ー*, proširene kombinacije (*ウィ ウェ ウォ ティ ディ ファ フィ フェ フォ ジェ チェ シェ*); vježba *っ* i duljine | 40 posuđenica | — | — | — |
| 1 | **はじめまして** — *X は Y です*, *か*, *も* | **Greetings, Countries & Languages** — 40 · kanji 人 日 本 語 | **は … です** + *～じん, ～ご* + *も* | **Arrival in Kyoto** | *はじめまして。サラです。スウェーデン人です。* |
| 2 | **What Is This?** — *これ / それ / あれ*, *の*, *ね / よ* | **Things & the Room** — 40 · 6 kanjija | **こそあど** + *の* + *なん* + *ね / よ* | **Sara's Room** | *これはゆいさんの本ですか。* |
| 3 | **Numbers & Prices** — brojevi, sat, *いくら*, brojači | **Numbers, Time & Money** — 40 · 6 (+ 時) | **Numbers** + *～時, ～えん* + *～つ, ～本, ～枚* | **The Konbini** | *このおべんとうはいくらですか。* |
| 4 | **Family** — *います / あります*, *が*, brojanje ljudi | **Family & People** — 40 · 6 | **N が います / あります** + *～人* + obitelj „moja / tvoja“ | **Tanaka-san's Photos** | *あにがふたりいます。* |
| 5 | **Food & Drink** — *を*, *ます / ません*, *と* (i), *ください* | **Food & Drink** — 40 · 6 | **を + ます / ません** + *N と N* + *～をください* | **The Ramen Shop** | *ラーメンとおちゃをください。* |
| 6 | **Where Is It?** — *に あります*, mjesto | **Places & Directions** — 40 · 6 | **に あります / います** (s *が*) + *うえ, した, なか, となり* | **Lost in Kyoto** · **Modul 1** | *えきのとなりにぎんこうがあります。* |
| 7 | **Daily Life** — *に, へ, で*, *から～まで*, datumi | **Daily Verbs, the Week & Dates** — 40 · 6 | **Time に, Place で, Direction へ** + *から～まで* + dani u mjesecu (*ついたち, はつか*) | **Sara's Week** | *まいあさ7時におきます。* |
| 8 | **Yesterday** — *ました / ませんでした*, *と* (s) | **Past Time & Events** — 40 · 6 | **Past ます Forms** + *N と* („s nekim“) | **The Weekend** | *きのうはともだちとえいがをみました。* |
| 9 | **Describing** — *い* i *な* pridjevi, *すき / じょうず* | **Adjectives & Places** — 40 · 6 | **い / な Adjectives** + prošlo vrijeme pridjeva + *～がすき / きらい / じょうず* + *あまり～ません* | **A Trip to Nara** | *奈良（なら）はとてもしずかなまちでした。* |
| 10 | **Let's Go!** — pozivi i želje | **Free Time & Invitations** — 40 · 6 | **～ませんか / ～ましょう / ～たいです** + *～がほしいです* | **Kenta's Invitation** | *いっしょにおまつりにいきませんか。* |
| 11 | **Please Do It** — *て*-oblik | **Requests & Classroom** — 40 · 6 | **て-Form** + *～てください* + veznički oblik pridjeva (*～くて / ～で*) | **The Animation Studio** | *ここになまえをかいてください。* |
| 12 | **Right Now** — *ています*, dopuštenje | **Home & Jobs** — 40 · 6 | **～ています** + *～てもいいですか* | **What Is Yui Doing?** · **Modul 2** | *ゆいさんは今へやで本を読んでいます。* |
| 13 | **Before & After** — niz radnji, razlozi | **Routine & Errands** — 40 · 6 | **～て、～** + *～から* (razlog) + *N のまえに / N のあとで* | **A Busy Saturday** | *しごとのあとで、スーパーにいきます。* |
| 14 | **Plain Form** — rječnički i *ない* oblik, *ことができます* | **Hobbies & Skills** — 40 · 6 | **Dictionary Form** + *～ことができます* + *V-るまえに* + *ない*-oblik uz *～ないでください* | **Haruto's Hobbies** | *はるとくんはひらがなをかくことができます。* |
| 15 | **Talking with Friends** — obični govor, *た*-oblik | **Experiences & Travel** — 40 · 6 | **Casual Speech** (glagoli; pridjevi i *だ* posebno) + *～たことがあります* + *V-たあとで* | **Have You Ever…?** | *富士山（ふじさん）にのぼったことある？* |
| 16 | **Comparisons & Change** — *より, いちばん*, *なる* | **Seasons & Weather** — 40 · 6 | **～より～ほうが** + *いちばん* + *～くなる / ～になる* + *～でしょう* | **Which Season Is Best?** · **Modul 3** | *なつよりあきのほうがすきです。* |
| 17 | **Giving & Receiving** — *あげる / もらう / くれる* | **Gifts & Celebrations** — 40 · 6 | **Giving Verbs** + *～のがすきです* | **Haruto's Birthday** | *田中（たなか）さんがわたしにおかしをくれました。* |
| 18 | **I Think…** — *と思います, と言いました* | **Opinions & News** — 40 · 6 | **Quoting** (obični oblik + *と*) + *～んです* + pregled *は / が* | **The Studio Meeting** | *このアニメはおもしろいと思います。* |
| 19 | **If & When** — *たら, とき*, *つもり* | **Plans & the Future** — 40 · 6 | **～たら** + *～とき* + *～つもりです* | **Sara's Big Decision** | *日本語がじょうずになったら、東京ではたらくつもりです。* |
| 20 | **Grand Finale** — opisne rečenice uz imenicu | **Memories & the Future** — 40 · 6 | **Noun-Modifying Clauses** + ponavljanje *なる* | **One Year in Kyoto** · **Završni test** | *京都はわたしがいちばんすきなまちになりました。* |

Napomene za fazu 3:
- Kanji u nosivim rečenicama (人, 語, 時, 本, 今, 読, 山, 思, 東京, 京都) moraju biti na popisu do te razine; inače s furiganom. Provjeriti posebno 時 (L3), 今 i 読 (do L12), 思 (do L18). 奈良, 富士, 田中 izvan popisa, s furiganom.
- Brojevi uz *時* u vodoravnom tekstu pišu se arapskim brojkama (*7時*).
- L14 i L15 ostaju razine s najviše novih oblika; provjeriti u pilotu.

## 5. Kralježnica — rane zabrane

- Do L13 samo uljudni oblici (*です / ます*); obični oblici tek L14 (rječnički, *ない*) i L15 (*た*, razgovorni govor).
- *ません* od L5; *ました / ませんでした* od L8.
- *て*-oblik (i veznički oblik pridjeva *～くて / ～で*) tek L11; do tada rečenice se spajaju samo s *そして / それから*.
- Čestice: *は, か, も* L1; *の, ね, よ* L2; *が* L4 (uz *います / あります*), L9 (*～がすき*); *を*, *と* (i) L5; *に, で, へ, から～まで* L6–L7; *と* (s) L8.
- *N のまえに / N のあとで* L13; *V-るまえに* L14; *V-たあとで* L15.
- *～くなる / ～になる* i *～でしょう* tek L16; *～のがすきです* L17; *～んです* L18.
- Brojači: *～つ, ～本, ～枚* L3; *～人* L4.
- Opisne rečenice uz imenicu (*わたしがかったほん*) tek L20.
- Svaki kanji u tekstu naučen ili s furiganom; nijedan kanji izvan popisa tečaja bez furigane; pravopisno pravilo iz odj. 1 (bez miješanja unutar riječi).
