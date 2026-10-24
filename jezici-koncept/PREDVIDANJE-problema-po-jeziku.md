# Predviđanje problema po jeziku — 12 koncepata prema postojećoj aplikaciji

Verzija 1.1, 23.10.2026. Status: analiza, ništa u kodu nije mijenjano.

**Vremenski plan (odluka vlasnika G7, 23.10.2026.):** jezici izvan latinice (ruski, kineski, japanski,
arapski) dolaze **tek za godinu dana (≈ jesen 2027.)**. Prvih godinu dana rade se latinični jezici:
njemački, francuski, talijanski, španjolski, portugalski, engleski, interslavenski, esperanto, latinski.
Dijelovi ove analize koji se odnose na ru, zh, ja i ar vrijede za pripremu 2027.; stanje alata
(TTS, licence, HSK) tada treba ponovno provjeriti.

Pročitano: svih 12 koncepata (v0.2), `00-pregled.md`, `ODLUKE-VLASNIKA.md`, `DNEVNIK-iskustava.md`,
`provjera/ZBIRNI-IZVJESTAJ.md`, `VODIC-izrada-i-prijevod.md` (B4, C, E), `francais/PROCITAJ-ME.md`,
`snimi-zvuk-gemini-skupine.ps1` i dijelovi `index.html` (provjera odgovora, ključevi zvuka i slika, rječnik,
tipkovnica, abeceda, razine, fontovi).

---

## 0. Zaključak

**Da, nastat će novi problemi, ali uglavnom ne u konceptima nego u aplikaciji.** Sadržaj koncepata
dvaput je provjeren i dobro je pokriven. Rizik je drugdje: kod je u šest pretpostavki napravljen
za hrvatski, a dvanaest jezika ruši ih različitim redom:

| # | Pretpostavka u kodu | Koji je jezici ruše |
|---|---|---|
| P1 | riječi su odvojene razmakom | zh potpuno, ja od L7, ar (spojeni *و ب ل ال* i sufiksi), la (*-que, -ne*), fr i it (*l', dell'*) |
| P2 | jedna riječ ima jedan pisani oblik, a taj oblik je ključ za zvuk, sliku i rječnik | ru (naglasak, *ё*), la (makroni), ar (harakat), ja (kana i kanji, furigana), zh (višečitajni znakovi), isv (latinica i ćirilica) |
| P3 | odgovor je točan ako je jednak nakon `toLowerCase` i brisanja završnog `.!?` | gotovo svi: es *¿ ¡*, fr razmak prije *? !*, ’ i ', *。？*, ar *؟* i hamza, ru naglasak, de velika slova, slobodan red riječi (eo, la, ru, isv) |
| P4 | pismo je abeceda s malo dvoslova (`ABECEDA`, `DIGRAFI`, Lesson 0 mehanike) | zh (nema abecede), ja (dva slogovna pisma), ar (oblici slova po položaju), ru i ar (cijela tipkovnica) |
| P5 | zvuk se snima jednim tijekom (Gemini + automatska provjera „HR ili EN“ + edge-tts rezerva) | la, eo, isv (nema glasa), ru, ar, zh, ja (provjera ne čuje greške koje su tu važne) |
| P6 | razine su cijeli brojevi 0–20 (`MAX_RAZINA = 20`, `K_PRAG` do 20, doslovno `20` u `sljedeciPrag`) | ru, ja, ar (L0a + L0b), isv (16), eo (18) |

Romanski blok i njemački ruše samo P3 i dio P1 i P2. **U prvoj godini (latinični jezici, G7)**
vrijedi ovo: P3 za sve jezike; P1 za fr i it (elizija) i la (enklitike); P2 za la (makroni) i isv
(ćirilica kao prekidač); P5 za la, eo i isv (nema glasa); P6 za isv (16) i eo (18).
P4 i veći dio P1, P2 i P5 dolaze s ru, zh, ja i ar 2027.

Rizik odluke G7: kroz godinu dana i devet latiničnih jezika aplikacija će se učvrstiti oko latinice,
a najteži jezici stižu kad je promjena najskuplja. To se ublažava s nekoliko jeftinih odluka već
sada (odj. 4, točka 2).

---

## 1. Zajednički problemi (pogađaju više jezika)

### Z1. Zvuk i slika se traže po tekstu — prekidači prikaza mijenjaju ključ (visoko)

`kljucZvuka()` radi NFC i mala slova, ali ne briše oznaku naglaska (U+0301), makrone ni harakat.
`kljucSlike()` radi isto. Koncepti uvode prikaz koji se mijenja tijekom tečaja:

- ru: naglasak do L16, od L17 prekidač „bez naglaska“;
- la: makroni do L15, od L16 prekidač;
- ar: potpuno vokalizirano L1–L12, djelomično L13–L19, bez vokala L20;
- ja: ista riječ u kani i u kanjiju (*ほん / 本*), furigana se skriva po riječi;
- isv: ćirilica kao prekidač prikaza.

Ishod: snimka postoji, a gumb za zvuk šuti, kao kod hrvatskih replika (preko 300 replika bez zvuka
zbog crtice). Ako se oznake pri izradi ključa brišu, dolazi do sudara homografa: ru *за́мок / замо́к*,
ar *كتب* (*kataba / kutub / kutiba*), ja *今日* (*kyō / konnichi*), zh *行, 了, 得*, la *rosa / rosā*.

**Prijedlog:** ključ zvuka je **kanonski oblik s punim oznakama** (naglasak, makron, harakat, čitanje
u kani ili pinyinu), a prikaz se iz njega izvodi. U markdownu stavka smije imati i zaseban
**tekst za zvuk** (vidi Z5).

### Z2. Riječi se dijele na razmacima (visoko za zh i ja, srednje za ar i la)

Na razmacima ovisi više stvari. `split(/\s+/)` je u kodu na četiri mjesta, a rečenice se uz to dijele i na `—–…`:
lebdeći rječnik (klik na riječ), pločice u `slaganje` i `poredak`, zvuk pojedine riječi,
evidencija naučenih riječi.

- **zh**: rečenica je jedan „token“. Rječnik, pločice i brojanje riječi ne rade.
- **ja**: razmaci postoje do L6 (odluka vlasnika), od L7 ne postoje, pa ista mehanika radi do L6 i prestaje usred tečaja.
- **ar**: *وَالكِتابُ* je jedna riječ za razmak, a tri za rječnik (*wa + al + kitāb*); posvojni i objektni sufiksi isto.
- **la**: *populusque*, *venitne*. **fr, it**: *l'amie, dell'acqua, c'è, qu'il* (elizija).

**Prijedlog:** granice riječi bilježe se u izvoru, a ne pogađaju u pregledniku. Za zh i ja to radi
autor ili skripta pri buildu, uz provjeru prema rječniku. Za ar, la, fr i it dovoljna je tablica
klitika po jeziku.

### Z3. Provjera odgovora nema jezični profil (visoko, ali jeftino)

Danas: `norm()` = mala slova + `trim` + brisanje završnog `.!?`; `bezKvacica()` zna samo
*č ć dž đ š ž*; `istiRed()` prihvaća zamjenu riječi samo oko hrvatskog *i*.

Što nedostaje po jeziku:

| Jezik | Što će biti krivo ocijenjeno |
|---|---|
| es | *¿ ¡* na početku (briše se samo kraj) |
| fr | razmak (i NBSP) prije *? ! : ;*; *œ / oe* |
| it, fr, en, eo | ’ i ' |
| de | velika slova (`toLowerCase` sakriva grešku, VODIC E2 to već bilježi) |
| ru | U+0301 iz kopiranog teksta; *е / ё* |
| la | makroni (koncept: ne traže se pri upisu) |
| ar | harakat, *أ إ آ → ا*, *ى / ي*, *ة / ه*, tatweel, *؟ ،* |
| zh, ja | interpunkcija pune širine *。？！、*; ja *ほん = 本* (treba podatak o čitanju) |
| eo, la, ru, isv | slobodan red riječi: `istiRed` će odbiti točne odgovore u `slaganje` (77 stranica u HR tečaju) i `poredak` (24) |
| isv | varijante *-u / -m*, *čto / što*, *ě / e*, latinica i ćirilica |
| en | *I'm = I am* je zamjena dviju riječi jednom, ne inline alternativa `[a/b]` |

Odluka 6 iz `00-pregled.md` (tolerancija po minimalnim parovima) dobro je zamišljena, ali u kodu za
nju još nema mjesta.

**Prijedlog:** funkcija `provjera` po jeziku (normalizacija, popis minimalnih parova koji se nikad ne
toleriraju, varijante, slobodan red DA/NE), uz poruku „skoro“ za svaki jezik umjesto `bezKvacica`.

### Z4. Zvuk: tijek s Geminijem neće se prenijeti jednako na sve jezike (visoko)

Današnji tijek: Gemini TTS čita skupinu riječi → jeftini model zapiše što čuje i odredi
„HR ili EN“ → kao rezerva služi edge-tts (`hr-HR-GabrijelaNeural`). Za ostale jezike vrijedi:

- **Gemini TTS nema SSML ni fonetsku kontrolu** (Googleova dokumentacija spominje samo oznake poput
  `[short pause]` i upute stilom). Koncepti ru i ja računaju na SSML („označeni naglasak“, „čitanje u
  kani“), a toga nema.
- **Automatska provjera čuje krivi jezik, ali ne čuje greške koje su ovdje važne:** krivi naglasak
  u ruskom, padežni nastavak u arapskom, tonsku promjenu ili višečitajni znak u kineskom, tonski naglasak
  u japanskom, duljinu u latinskom. Zapis bez oznaka izgleda isto.
- **Glasovi** (stanje dokumentacije 22.10.2026., status se mijenja):
  - es-ES i pt-BR su GA. To se slaže s odlukama (Španjolska, Brazil).
  - en-GB je *preview*.
  - **ar: GA je samo ar-EG (egipatski)**, a MSA (ar-001) je *preview*. Rizik je egipatski izgovor (*ج* kao [g]) u tečaju koji je odlučio „samo MSA“.
  - **la: postoji samo la-VA (Vatikan), *preview***. To vjerojatno znači crkveni izgovor, a odluka vlasnika je „samo restituirani klasični, i u zvuku“. Prije odluke o snimanju poslušati uzorak.
  - **eo i isv nisu na popisu.** Edge-tts rezerva nema glas ni za la, eo, isv.
  - cmn-CN (mandarinski) je *preview*.

**Prijedlog:**
1. Uz svaku stavku dopustiti **tekst za zvuk**: ar s pauzalnim oblikom ispisanim kako se izgovara,
   ja u kani, ru s naglaskom ili fonetski prepisan, zh s rastavljenim višečitajnim znakom. TTS čita
   ono što je napisano, pa se pravilo provodi kroz tekst, a ne kroz SSML.
2. Za la, eo i isv odmah planirati **snimljeni govor** (koncepti to predlažu za L0 i nosive rečenice;
   bez TTS-a to vrijedi za sve). To je trošak i proces (tko, gdje, kako se provjerava), a ne tehnička sitnica.
3. Za ru, ar, zh i ja automatska provjera ne može biti jedina. Treba ručno preslušavanje
   (`preslusaj-zvuk.html`) s popisom rizičnih riječi, kao `zvuk-gemini-rizicne.txt`.

### Z5. Lesson 0 mehanike pretpostavljaju abecedu (visoko za zh, ja, ar)

`ABECEDA`, `DIGRAFI` i `grafemi()` su hrvatski, a mehanike baloni, vlak, slova, zid i spajanje slažu riječ od slova.

- **ar**: slovo samo za sebe ima drugi oblik nego u riječi. Kad se riječ rastavi u pločice, svaka
  pločica pokaže izolirani oblik, a složena riječ izgleda kao niz nespojenih slova sve dok se ne
  složi u jedno polje. Potrebno je spajanje (ZWJ / tatweel) i RTL slaganje pločica.
- **ja**: jedinica je slog (kana), a 33 spoja s *ゃゅょ* i *っ* nisu „slova“.
- **zh**: slova nema. L0 su tonovi i pinyin, a pločice su slogovi s tonom.
- **es, pt, it**: novi dvoslovi (*ch, ll, rr, lh, nh, gli, gn*) samo se dodaju u `DIGRAFI`.

**Prijedlog:** L0 za zh, ja i ar dizajnirati kao **nove mehanike**, ne kao prijevod hrvatskog L0.
To je u skladu s odlukom G5 (mehanike se dograđuju).

### Z6. Razine: L0a / L0b i tečajevi kraći od 20 (srednje)

`razina` je broj; `MAX_RAZINA = 20`; `K_PRAG` je tablica do 20; u `sljedeciPrag()` je doslovno
`r <= 20`; filtar rječnika „lekcije 0–20“; bodovi rastu ×1.11 po razini. Iz toga slijedi:

- **ru, ja, ar** imaju dvije L0 cjeline, a struktura podataka ima jednu. Najjeftinije je L0b
  uvrstiti kao „L0, drugi dio“ (dvije cjeline iste razine), a ne uvoditi razinu 0.5.
- **isv (16) i eo (18)**: `MAX_RAZINA` mora doći iz jezičnog profila, a pragovi otključavanja i
  mjesta modula ne smiju biti vezani uz broj 20.

### Z7. Prikaz: `lang`, fontovi, RTL, ruby (srednje do visoko)

- Dokument je `<html lang="en">`, a tekst na ciljnom jeziku nema vlastiti `lang`. Za **zh i ja** to
  je greška u prikazu: zbog Han unifikacije uređaj može pokazati japanski oblik znaka u kineskom
  tečaju i obrnuto. Oba koncepta to traže (`zh-Hans`, `lang="ja"`), a aplikacija to danas ne radi.
- Izborni fontovi (Space Grotesk, Lexend, Atkinson Hyperlegible) po svemu sudeći nemaju ćirilicu
  (provjeriti; Inter i Literata je imaju). U ru i isv tekst bi se tada miješao sa sistemskim fontom,
  a znak naglaska U+0301 u zamjenskom fontu često „odleti“ od slova. Za la provjeriti *ȳ*.
- **ar**: RTL u cijeloj lekciji, miješani smjer s jezikom sučelja, veći prored zbog vokala,
  Noto Naskh. U A1.1 modulu to je već riješeno (LRI/PDI, logička CSS svojstva), pa iskustvo postoji,
  ali glavni player je LTR.
- **Ruby (furigana, pinyin iznad znaka)**: markdown format nema sintaksu za to. Koncept ja piše
  *田中（たなか）* s punim zagradama, a `bezZagrada()` briše samo obične zagrade. Treba nova
  sintaksa (npr. `{田中|たなか}`) u `osvjezi.js` i u playeru.
- Pragovi u znakovima (odjeljci se zatvaraju od 400 znakova, gustoća, vrijeme u `brzina`
  i Testu) u zh i ja vrijede otprilike trostruko više sadržaja, a čitanje novog pisma je sporije.

### Z8. Markdown sintaksa i pisanje u drugim pismima (srednje)

`[ ]` je polje za upis, `|` odvaja stupce, `( )` je napomena, `/` uvodi alternative, a `*` označava naglasak.

- U **arapskom** izvoru dvosmjerni prikaz u uređivaču vizualno okreće `[ ]` i `( )` i premješta
  `|`. Autor (i Claude) griješe češće nego u latinici. Treba skripta koja provjeri da je broj
  polja i stupaca u retku ispravan.
- `[je/jest]` (inline alternative) nije dovoljno za jezike s mnogo varijanti (isv, ru *ё*, eo
  slobodan red). Varijante treba prihvaćati pravilom iz profila (Z3), a ne pisati ih u svaki zadatak.

### Z9. Rječnik: traženje po popisu oblika neće raditi za sve (srednje do visoko)

Lebdeći rječnik gradi indeks `OBLICI` iz polja `oblici` (za hrvatski 14 padežnih oblika) i traži
točan pisani oblik. To radi kad se svi oblici mogu nabrojiti.

- **eo**: tvorba je produktivna (*lern-ej-o, lern-ant-o, lern-ig-i*), pa se oblici ne mogu nabrojiti.
  Treba rastavljanje na korijen i afikse.
- **la**: glagol ima stotinjak oblika, uz enklitike i makrone.
- **ar**: klitike i harakat (Z2); lema je korijen + obrazac.
- **ja**: konjugacija i nema razmaka.
- **de**: odvojivi glagoli (*fängt … an* su dva tokena za lemu *anfangen*).
- **ru**: oznaka naglaska u tekstu ruši točno podudaranje ako se ne briše.
- Abecedni red je `localeCompare(…, 'hr')`, što treba dolaziti iz profila. Za zh je red po pinyinu,
  za ja po *gojūon*, za ar po korijenu ili slovu (odluka).

**Prijedlog:** u buildu svaka riječ teksta dobiva lemu (skripta + ručni popis dvosmislenih), umjesto
da preglednik pogađa. Isto rješava Z2 i dio evidencije naučenih riječi.

### Z10. Rod polaznika (srednje; visoko za ar)

Hrvatski tečaj nudi oba roda u oblicima koji ih razlikuju (VODIC C2). Aplikacija ne zna rod
polaznika, pa to dosad nije smetalo. U arapskom se **drugo lice razlikuje po rodu i u prezentu i u
imperativu** (*taktubu / taktubīna*, *اِشْرَبْ / اِشْرَبي*): svaka uputa ili replika upućena
polazniku na arapskom ima dva oblika. Za ru, isv i pt slično vrijedi u prošlom vremenu i pridjevima
o sebi.

**Odluka za vlasnika:** pitati polaznika pri ulasku u tečaj „kako da ti se obraćamo“ (podatak u
profilu, bez obveze) ili svugdje prikazivati oba oblika.

### Z11. Svaki jezik kao zasebna stranica: posao raste s brojem jezika (srednje, organizacijski)

Francuski je zasebna stranica: vlastiti repozitorij, shema `tecaj_fr`, SQL, `data-plus-fr.json`,
dopuštenje u funkciji `sadrzaj`, redirect URL i bat datoteka. U `francais/PROCITAJ-ME.md` je otvoreno:
GDPR izvoz ne uključuje `tecaj_fr`, AI pomoć ima hrvatski prompt, nema rječnika, pregleda, mini-igara ni dailyja.

Uz još 12 jezika to je 14 shema i 14 ručnih koraka po svakoj promjeni. Najosjetljiviji je
**GDPR izvoz i brisanje**: svaki novi jezik koji se zaboravi dodati znači nepotpun izvoz podataka.

**Prijedlog:** shema po jeziku iz predloška (jedna SQL skripta s parametrom), funkcija `racun` koja
prolazi kroz sve sheme `tecaj_*`, a prompt AI pomoći iz jezičnog profila.

### Z12. Licence za podatke o potezima (nisko, ali provjeriti prije faze 3)

- ja: KanjiVG je CC BY-SA. Treba navesti izvor, a izvedeni podaci (npr. prilagođene animacije)
  možda moraju ostati pod istom licencom.
- zh: Make Me a Hanzi i Hanzi Writer imaju vlastite licence (dio podataka je pod Arphic licencom).

To ne blokira, ali za plaćenu aplikaciju treba provjeriti prije korištenja.

---

## 2. Po jeziku: što je novo prema hrvatskom i francuskom

Procjena tehničke novosti (ne težine učenja): 1 = gotovo ništa novo, 5 = velik dio playera ide ispočetka.
Ruski, kineski, japanski i arapski dolaze ≈ jesen 2027. (G7).

| Jezik | Novo u aplikaciji | Najveći rizik | Novost |
|---|---|---|---|
| **es** | traka *ñ á é í ó ú ü ¿ ¡*; *¿ ¡* na početku u provjeri; minimalni parovi s tildom; prihvaćanje *ustedes / usted* traži kontekst, ne samo varijantu riječi | sitno | 1 |
| **it** | traka *à è é ì ò ù*; elizija (*l', dell', c'è, po'*) u rječniku i pločicama; *è / e* | elizija u Z2 | 1 |
| **pt** | traka s 12 znakova; spojeni prijedlozi (*do = de + o*) u rječniku; neutralni ili karioka glas | europska inačica kasnije kao zaseban tečaj: ključevi zvuka i slika ne smiju biti vezani uz brazilski pravopis | 1–2 |
| **en** | kontrakcije kao zamjena više riječi (Z3); BrE/AmE pravopis; en-GB glas je *preview*; način „samo engleski“ nije moguć jer je ljuska već engleska | sitno; najveći posao je u slojevima sučelja, ne u playeru | 1–2 |
| **de** | velika slova u provjeri; *ae / ss*; odvojivi glagoli u rječniku; član uz imenicu u svim karticama | velika slova: usporedba je danas uvijek bez obzira na velika i mala slova | 2 |
| **eo** | x-sustav pri upisu (bez pretvaranja imena, npr. *Ewa*); slobodan red riječi; rječnik po afiksima; nema TTS-a ni edge rezerve | zvuk i rječnik | 3 |
| **isv** | latinica ↔ ćirilica u prikazu i upisu (ključevi uvijek iz latinice); prihvaćanje varijanti; nema TTS-a; **rječnik zajednice se mijenja**, pa treba zaključati verziju i ponovno provjeriti sve oblike kad se rječnik promijeni | standard koji se pomiče ispod gotovog sadržaja | 3 |
| **ru** | ćirilična tipkovnica (fonetska ili ЙЦУКЕН); U+0301 u ključevima, pretrazi, kopiranju i fontu; *ё*; L0a + L0b; naglasak u TTS-u bez SSML-a, a automatska provjera to ne čuje | zvuk s krivim naglaskom koji prođe provjeru | 3–4 |
| **la** | makroni u ključevima i prekidaču; enklitike; slobodan red; **glas: la-VA vjerojatno crkveni izgovor nasuprot odluci „samo klasični“**; snimljeni govor | zvuk: odluka i trošak | 3–4 |
| **zh** | nema razmaka (segmentacija u izvoru); pinyin kao ruby po riječima; upis pinyin → znak (IME); tonovi u upisu; `zh-Hans`; višečitajni znakovi i tonske promjene u zvuku; pragovi u znakovima | Z2: rječnik, pločice i brojanje riječi ne rade bez segmentacije | 4–5 |
| **ar** | RTL u cijelom playeru; oblici slova u pločicama; harakat u ključevima i prikazu po razinama; klitike; arapska tipkovnica; istočnoarapske brojke; rod polaznika u 2. licu; TTS je GA samo za egipatski; pravilo pauze kroz tekst za zvuk | RTL + oblikovanje slova + rod polaznika | 5 |
| **ja** | tri pisma i jednakost kana = kanji u provjeri (podatak o čitanju po stavci); furigana se skriva **po riječi i čitanju tri razine nakon učenja**, što traži novo stanje po korisniku; razmaci samo do L6; IME; crtanje preko cijelog zaslona s prepoznavanjem rukopisa (nova mehanika); L0a + L0b | furigana i čitanje kao podatak u modelu, ne samo u prikazu | 5 |

---

## 3. Što se može očekivati i u samim konceptima (sadržaj)

Ovo nije tehnika, ali proizlazi iz istog pogleda: problemi koji će iskrsnuti tek u fazi 3, pri
pisanju lekcija u punoj gustoći (VODIC C2: ≥ 10 stavki po drilu, oba roda, `nastavak` po lekciji).

- **Mehanike koje ne odgovaraju gramatici jezika** (VODIC E6 to vidi za es, fr, de):
  `nastavak` (odaberi nastavak) nema prirodnu primjenu u zh, a u ja i ar nastavak nije na kraju
  riječi na isti način (ar prefiksi imperfekta, ja okurigana). `razvrstavanje` po rodu nema smisla za
  zh, ja i eo. Za svaki jezik treba popis „koja od 18 mehanika radi i za što“ prije masovne izrade,
  inače će se mehanike prisiljavati.
- **Distraktori**: pravilo „oblik odgovora ne smije odati točan“ (C4.2) u zh i ja ima nove tragove:
  broj znakova, kana nasuprot kanjiju, prisutnost *了*. U ar tragovi su harakat i duljina. Skripta za
  mjerenje tragova treba znati brojati u tim pismima.
- **Practice tekstovi u ar, ja i zh** bit će kraći u riječima za isto vrijeme čitanja. Priča od 20
  tjedana s istim brojem epizoda bit će tanja, pa treba planirati broj epizoda, a ne preuzimati ga.
- **isv i eo** nemaju izvornih govornika za recenziju; za ar, zh i ja koncepti traže izvornog
  govornika. To je vanjski trošak koji danas nije u planu (A1.1 plan izričito kaže „nema izvornih
  govornika“, a za ove jezike to neće biti dovoljno).

---

## 4. Preporuka

1. **Jezični profil prije faze 3.** VODIC E1 već preporučuje „jedan kod, više sadržaja“. Iz ove
   analize slijedi što profil mora sadržavati, osim tipkovnice i abecede:
   normalizacija i minimalni parovi (Z3), slobodan red DA/NE, varijante, tokenizacija (Z2), kanonski
   ključ zvuka i tekst za zvuk (Z1, Z4), abeceda, dvoslovi ili L0 mehanike (Z5), popis razina s L0a/L0b
   i `MAX_RAZINA` (Z6), `lang`, font, smjer i ruby (Z7), abecedni red i analiza oblika za rječnik (Z9),
   obraćanje po rodu (Z10), prompt AI pomoći (Z11).
2. **Zbog G7 šiljak za japanski i arapski ne radi se sada**, nego na početku pripreme jezika izvan
   latinice (≈ ljeto 2027.): L0a i jedna stranica L1 u svakoj od 18 mehanika, prije profila za te jezike.
   Do tada jezični profil za latinicu raditi tako da ne zatvara put: ključ zvuka i slike po
   kanonskom obliku ili ID-u stavke, a ne po prikazanom tekstu (Z1); oznake razina i `MAX_RAZINA` iz
   profila, s mjestom za L0a / L0b (Z6); tokenizacija, provjera odgovora i abecedni red kao funkcije
   profila, i onda kad su za latinicu jednostavne (Z2, Z3, Z9). To je malo posla sada, a 2027.
   štedi prepravljanje playera.
3. **Zvuk odlučiti po jeziku sada**, jer o tome ovisi budžet: la, eo, isv snimljeni govor;
   za ar i la poslušati uzorak Gemini glasa prije odluke; za ru, ar, zh, ja ručno preslušavanje
   rizičnih riječi.
4. **Zajedničku infrastrukturu po tečaju napraviti iz predloška** (shema, GDPR izvoz, funkcija
   `sadrzaj`, objava), prije trećeg jezika.

### Odluke za vlasnika iz ove analize

| # | Odluka | Prijedlog |
|---|---|---|
| T1 | ~~Tehnički šiljak ja + ar prije romanskog bloka~~ | otpada zbog G7; šiljak na početku pripreme jezika izvan latinice (≈ ljeto 2027.), a profil za latinicu sada s točkama iz odj. 4.2 |
| T2 | Rod polaznika: pitati pri ulasku ili uvijek oba oblika | pitati (neobavezno), oba oblika kao zadano |
| T3 | Latinski zvuk: Gemini la-VA ili snimljeni govor | poslušati uzorak; vjerojatno snimljeni govor |
| T4 | Arapski zvuk (odluka 2027., stanje glasova tada ponovno provjeriti): ar-EG (GA) ili ar-001 (*preview*) ili snimke | ar-001 uz ručno preslušavanje; snimke za L0 i nosive rečenice |
| T5 | Zaključati verziju rječnika interslavenskog i pravilo ponovne provjere | da |

---

Izvor za stanje Gemini TTS jezika: Google Cloud dokumentacija „Gemini-TTS“ (pročitano 22.10.2026.).
Status *preview* / GA se mijenja; prije odluke ponovno provjeriti.
