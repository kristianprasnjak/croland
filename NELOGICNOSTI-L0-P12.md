# Nelogičnosti u sadržaju: od Lesson 0 do Practice 12

Pregled: 17.09.2026. Izvor su `igre/*.md` u stanju od danas (lekcija-12, vokabular-12, gramatika-12 i praksa-12 mijenjani su jutros). Opseg: `lekcija-0.md` i razine 1–12 redom kojim ih učenik prolazi (Lesson → Vocabulary → Grammar → Practice → Test). Test 12 dolazi iza Practice 12 i nije pregledan.

**Kako čitati.** Svaka stavka ima `datoteka:redak`, pa se može otvoriti izravno. Citati su skraćeni. Uz ručno čitanje svih 60 datoteka pokrenute su i skripte (dupli naslovi, dupli zadaci, popisi pasivnih riječi, tvrdnje „every sentence comes from the texts“, rekonstrukcija riječi u vježbama `nastavak`, UK/US pravopis, prijevodi).

**Odnos prema `PRIJEDLOG-jasnoca-L1-L9.md`.** Taj dokument bavi se tonom i prejakim tvrdnjama. Ovdje su proturječja, pogrešni ključevi, redoslijed uvođenja i logika zadataka. Gdje se teme dodiruju, stavka je ovdje navedena samo ako i dalje stoji u današnjim datotekama.

**Ukupno: 375 stavki** u 12 kategorija (A–L u 3. poglavlju).

---

## 1. Najčešće pogreške

Obrasci koji se ponavljaju kroz cijeli tečaj, po učestalosti. „Stavki“ je broj redaka u popisu iz 3. poglavlja; stvarnih pojava je više, jer jedna stavka često pokriva nekoliko redaka ili datoteka.

| # | Obrazac | Kat. | Stavki | Tipičan primjer |
|---|---|---|---|---|
| 1 | **Riječ ili gramatika koristi se prije nego što je uvedena**, bez glose | D | 73 | `lekcija-03:62` *čitam knjigu* (akuzativ) dvije razine prije akuzativa; `gramatika-04:190` traži *razgovaraju* (oni-oblik iz L7) |
| 2 | **Uputa (info/opis) ne odgovara vježbi**: pogrešan broj, „every“, „only“, „exactly one“ | C | 64 | `vokabular-06:7` „Five of them squeeze“ — navedena su tri; `praksa-07:106` „none of them are stated outright“ — četiri od šest piše doslovno |
| 3 | **Pravilo proturječi drugom pravilu ili vlastitim primjerima** | B | 57 | `gramatika-09:166` kaže da su *svoj* i *moj* uz *ja* oba ispravna, a 185 u istoj datoteci boduje *moj* kao grešku |
| 4 | **Popisi „Passive words“**: riječi koje su već aktivne, riječi kojih u vježbi nema, nove riječi koje nisu navedene | E | 38 | `praksa-04:8` kao pasivne navodi *doktorica, veseo, topao*; `lekcija-06:185` navodi *evo, bolestan* kojih u dijalogu nema |
| 5 | **Pogrešan hrvatski ili pogrešan ključ** | A | 26 | *pas___ + a* → „pasa“; *Djeca su spavali* |
| 6 | **Logika priča, zagonetki i likova** | I | 25 | `praksa-07:122` Ivan i Luka su „novi učenici“, a već su u razredu; Petra je studentica, doktorica i novinarka |
| 7 | **Dijalog ne prati odabranu repliku** | G | 24 | `praksa-08:210-211` odbiješ izlet („Neću ići, nemam kartu“), a prijatelj pita „Ustat ćeš na vrijeme?“ |
| 8 | **Engleski i prijevodi nedosljedni** (Mom/Mum, UK/US, ista riječ dva prijevoda) | K | 20 | `praksa-03` ima *Mom* i *Mum*; *policajac* = police officer / policeman |
| 9 | **Navigacija i najave**: pogrešna sljedeća cjelina, pogrešan modul | H | 16 | Lekcije 4–9: „ready for Lesson N+1“ i „Next up: Grammar“ — preskaču Vocabulary |
| 10 | **Testovi i vježbe odbijaju ispravan odgovor ili boduju gramatičan distraktor kao grešku** | J (+A) | 13 | opis „both versions count“, a prihvaćena je jedna; `gramatika-04:207` *ali dom je topao* označeno netočnim |
| 11 | **„Everything comes from the texts“** — a rečenice u tekstovima ne postoje | F | 11 | `praksa-11:168` (u tekstovima nema nijednog *li*-pitanja) |
| 12 | **Sitnice i prateće datoteke** (dupli naslovi, format, zastarjeli `popis lekcija.md`) | L | 8 | tri stranice „Six more“ u Lesson 0 |

**Gdje se najviše skuplja.** Lekcije 4–9 imaju stariji predložak (pogrešna navigacija, puno neglosiranih riječi). Practice datoteke najčešće griješe u pasivnim popisima i tvrdnji „from the texts“. Testovi najčešće imaju preusko prihvaćene odgovore.

---

## 2. Popravi prvo

Stavke koje učeniku izravno prikazuju krivi hrvatski ili ga kažnjavaju za točan odgovor.

1. **Vježbe `nastavak` slažu nepostojeće riječi.** Aplikacija doslovno spaja osnovu i nastavak (`puna()` u `index.html`), prikazuje rezultat i pušta zvuk za njega:
   - `gramatika-06:150`, `praksa-06:147`, `praksa-06:149`, `test-06:281` — *pas___* + *a* → **pasa** (treba *psa*, kako uči ista lekcija).
   - `lekcija-11:142`, `lekcija-11:147`, `gramatika-11:96`, `gramatika-11:99`, `praksa-11:151`, `test-11:152`, `test-11:155` — *Kakv___* + „bez nastavka“ → **Kakv je film?** (treba *Kakav*).
   - `lekcija-12:189`, `gramatika-12:102`, `praksa-12:146` — *___što* + *ni* → **ništo** (treba *ništa*).
2. **Ključ za *djeca* je pogrešan.** `lekcija-10:151`, `gramatika-10:50`, `test-10:151` traže *Djeca su spava**li***. Ista `gramatika-10` u retcima 79, 121, 152, 168, 201 uči *Djeca su spava**la*** i boduje *spavali* kao grešku. I pravilo (L10:100, G10:8 „-li for any group“) ne objašnjava *djeca*.
3. **`gramatika-04:190`** — *Mama i tata ___ (razgovarati)* → *razgovaraju*. Oni-oblik prezenta uči se tek u Lesson 7.
4. **`lekcija-06:185`** — u opisu dijaloga ostao je radni tekst: „*gust* is not needed here“.
5. **`gramatika-09:166` protiv 185 i 195** — stranica kaže da su *Volim svoj klub* i *Volim moj klub* oba ispravna; vježba u istoj datoteci boduje *moj* kao netočno. Isto `lekcija-09:237-238`, `test-09:198`.
6. **`praksa-06:85`** — *Vidim ga zadnji put kod mosta* preveden je kao „I saw him last“. Prezent za prošlu radnju nije ispravan hrvatski.
7. **`praksa-08:107-117`** — zagonetka: *Jedan će putovati na otok* (m. rod), *Jedna će ići u planinu* (ž. rod), a ključ kaže da na otok ide **Iva**.
8. **`praksa-11:71`** — *Čija je ovo kutija? — Anina.* Tekst (55) kaže *Na kutiji nema imena.*
9. **Gramatični distraktori bodovani kao greška**: `gramatika-04:207` *ali dom je topao*; `gramatika-06:267` i `test-06:341` *Konobar vidi nas*; `gramatika-08:215` *Sutra hoću plivati*, 218 *Hoćemo putovati u subotu*; `test-05:125` *kolač* za „cake“ (V5 ga tako prevodi); `test-08:80` „break time“ za *odmor* (V7 ga tako prevodi); `test-07:128` *odmor* za „break“.
10. **Navigacija lekcija 4–9** — kontrolna točka i „Next up“ šalju na krivu cjelinu (kategorija H).
11. **`vokabular-11:51`** — „*eura* or *kuna*“. Kuna nije valuta od 2023.
12. **`vokabular-12:6`** — „*gljive* and *palačinke* exist only in the plural“. Jednine *gljiva* i *palačinka* postoje.

---

## 3. Popis po kategorijama

### A. Pogrešan hrvatski, pogrešan ključ ili činjenična greška

- **gramatika-06:150, praksa-06:147, praksa-06:149, test-06:281** — *pas___ + a* daje „pasa“ umjesto *psa*.
- **lekcija-11:142, 147; gramatika-11:96, 99; praksa-11:151; test-11:152, 155** — *Kakv___ + —* daje „Kakv“.
- **lekcija-12:189; gramatika-12:102; praksa-12:146** — *___što + ni* daje „ništo“.
- **lekcija-10:151; gramatika-10:50; test-10:151** — ključ *Djeca su spavali*; ista gramatika-10 (79, 121, 152, 168, 201) i test-10 (179, 199) traže *spavala*.
- **gramatika-04:190** — ključ *razgovaraju* prije nego što je oni-oblik naučen.
- **praksa-06:85** — *Vidim ga zadnji put* za prošlu radnju; 100 *Gdje je pas zadnji put?* isto.
- **vokabular-11:51** — kuna kao valuta.
- **vokabular-11:62** — *tisuću* prikazano kao osnovni oblik (nominativ je *tisuća*).
- **vokabular-12:6** — *gljive* i *palačinke* „samo u množini“.
- **vokabular-02:91, gramatika-02:113, 146, test-02:246** — *turist → turistica*; standardno je *turistkinja*.
- **vokabular-10:55** — *prošla godina* = „last year“; za „last year“ se kaže *prošle godine*.
- **lekcija-10:113, lekcija-10:61** — „*jesti → jeo*, the *d* is dropped“: infinitiv nema *d* (on je iz prezentske osnove *jed-*).
- **lekcija-08:117, 207; praksa-08:227** — *Vlak će stizati*, *Stizat ću u hotel* za jedan dolazak (nesvršeni glagol; treba *stići*).
- **gramatika-10:171-172** — *Ustajem rano → Ustao sam rano*, *pobjeđuje → je pobijedio*: nesvršeni glagol u prezentu postaje svršeni u perfektu bez objašnjenja, a traži se kao jedini točan odgovor.
- **gramatika-04:207** — gramatična rečenica *Stan je mali, ali dom je topao* označena netočnom (*ali* ne nosi enklitiku).
- **gramatika-06:267, test-06:341** — *Konobar vidi nas* (naglašeni oblik) označeno netočnim.
- **gramatika-08:215, 218** — *Sutra hoću plivati*, *Hoćemo putovati u subotu* označeno netočnim.
- **gramatika-02:192** — *Ne, nisam ja* označeno kao nemoguće; to je gramatična rečenica (drugog značenja).
- **test-11:198** — *Koliko to čini?* označeno kao pogrešno; to je uobičajen izraz.
- **gramatika-11:63** — za odgovor *Svaki dan* distraktor *Kada treniraš?* jednako je prirodno pitanje.
- **test-09:287** — *Čekam ___ | prijatelja | prijatelj | prijatelje* bez naznake jednine; *prijatelje* je ispravno.
- **test-11:248** — *Koliko fotografija ima?* — tekst „Ne znam! Možda tisuću.“ podupire i *tisuću*.
- **praksa-09:69 i 72** — *Prva lopta je crvena* = TRUE, *Lopta u parku je crvena* = FALSE; to je ista lopta.
- **praksa-10:149** — *Tko nije bio doma? — Luka*; ni Marko nije bio doma (133).
- **test-03:205, 261, 299, 372, 428** — *Ja slušam film* („I listen to a film“) pet puta kao točna rečenica.

### B. Pravilo proturječi drugom pravilu ili vlastitim primjerima

**Razine 1–3**

- **gramatika-01:44** — „The -i form is the one you use when the adjective sits in front of its noun“. Ista stranica (40) *velik grad*, 78 *mekan krevet*; vježba 57-63 traži *dobar dan, star automobil, lijep grad, mekan krevet*; `lekcija-01:77` *velik grad*; `praksa-01:100` *lijep grad, savršen dan*.
- **lekcija-01:97 i 79** — „noun ending in a consonant takes the bare form“, a kartica uči *mali / mala / malo* (objašnjenje tek u G1:45).
- **lekcija-02:58** — „mi, vi, oni … the word after them needs a plural“; 127 *Vi ste profesor*; `gramatika-02:42` *Vi ___ profesor*. Da uz uljudno *vi* pridjev ide u množinu, a imenica ostaje u jednini, nigdje ne piše.
- **lekcija-02:58, gramatika-02:22** — „add -i … every plural you meet here follows this one“; `lekcija-07:79,150` kaže da pridjev u množini ima tri nastavka (*Knjige su nove*).
- **lekcija-02:58** — „add -i“; isti deck ima *veseo → veseli*, *sretan → sretni* (nije samo -i).
- **lekcija-02:63** — „for oni add -i — the same rule you already know from Lesson 1“; L1 nije učio -i.
- **gramatika-02:56** — „*veseo* … the only word here that does this“; `gramatika-01:77` *topao → topla* je isti trik.
- **vokabular-02:152** — „the ones ending in -an or -ar lose that vowel“; `gramatika-01:78` „*mekan* keeps everything … don't assume every -an drops“.
- **vokabular-02:186** — „*veseo* is the odd one out … every other word here simply takes -a or -i“; *nizak, ljubazan, ozbiljan, vrijedan, pametan, sretan* gube vokal.
- **vokabular-02:7, lekcija-02:79** — ženski oblik zanimanja je „one simple trick“ (-ica); `gramatika-02:114` *novinarka, policajka* (-ka).
- **lekcija-03:54, 64 i 62** — „the word after the verb keeps the shape you learned it in … That's Lesson 5“, a primjer na istoj stranici glasi *čitam knjigu*.
- **gramatika-03:30 i 18** — isto: „The object keeps the shape you learned it in“ uz *Ja čitam knjigu*.
- **vokabular-03:81, 80, 113** — „Every one of these keeps the same shape when it becomes the object“; deck ima *mačka* (→ *mačku*) i *pas* (→ *psa*).
- **gramatika-06:14** — „Lesson 3 felt easy: every object there was a 'no change' word“; L3 ima *knjigu*.
- **gramatika-01:167-168, test-01:332** — „Word order is free“; `gramatika-02:17` *sam, si, je* ne smiju prvi.

**Razine 4–6**

- **lekcija-04:52** — „family words play by exactly the same rule. One famous trap: *obitelj*“; u istoj vježbi *tata* (-a, m. rod). `test-04:166` isto („Two traps“, a *tata* je treća).
- **lekcija-04:76 i gramatika-04:9** — *a* spaja dva različita subjekta; `praksa-04:72` *Ujutro radim, a poslije ne radim ništa* (isti subjekt).
- **lekcija-05:171, lekcija-07:215, praksa-07:12** — *Tržnica je velika, ali je trgovina mala*; *Knjige su nove, ali stolovi su stari*: dva subjekta u blagom kontrastu, po L4/G4 treba *a*. `praksa-07:14` u istom tekstu za isti tip kontrasta koristi *a*.
- **test-04:152 i 159** — *pas star · pas veseo* → *ali*; *djed star · djed pametan* → *i*.
- **gramatika-04:128 i 153** — „No object in these sentences changes shape yet“; stavka *pijem kavu*.
- **lekcija-06:169** — „The comma still goes before *ali*, *a* and *jer*“; `gramatika-04:97,108` „jer … usually no comma“; stavka 179 *jer je bolesna* bez zareza.
- **lekcija-05:87 i 180** — „*kruh, sok, sir* end in a consonant and simply don't move“; u tablici iste lekcije *Čekaš prijatelja*.
- **lekcija-05:10** — „a feminine word (ending in -a) … That's the whole rule“; *tata, kolega* (m. rod na -a) isto dobivaju -u.
- **gramatika-05:154, 167, 205** — „a destination … takes the same -u“, „The place keeps its -u either way“; *u kafić, na posao, na koncert, u restoran, na more, u grad*.
- **lekcija-06:38, vokabular-06:32, 152** — kartica *auto*; `gramatika-01:14` „That's why this course uses *automobil*“.
- **gramatika-06:82** — pravilo „add -a“, a primjer *Marko → Marka* (da -o otpada, ne piše).
- **gramatika-06:248, 252-256** — „For first place use *mene, tebe, njega, nju*“; dugi oblici za *nas, vas, ih* nisu u tablici.

**Razine 7–9**

- **lekcija-07:89 i gramatika-07:16** — L7 traži *dva učenika* (nije množina), G7 za isti obrazac *dvije knjige, dva pisma* prikazuje kao množinu.
- **lekcija-07:88** — „One exception today: *dijete → djeca*“; 243, 251 uvode i *brat → braća*.
- **vokabular-07:25, 156 i gramatika-07:81** — V7 kaže da je *-ovi* „still the masculine -i plural underneath“, pa ga razvrstava u IZNIMKA; G7 ima zaseban stupac -OVI. Opis V7:156 „one just grows a whole syllable“, a takvih je četiri.
- **vokabular-07:111** — „*mladi, kratki, teški* are the ones you need with plural nouns“; za *knjige* treba *-e*.
- **lekcija-08:72** — *ću–ćeš–će…* i *sam–si–je…* „one letter of difference“.
- **lekcija-08:123** — „an *-ati* verb drops its final -i“; stavke *Učit ćeš*, *Radit ću*.
- **gramatika-08:16-23 i gramatika-10:132** — obje stranice kažu „the third time you meet this“: G8 broji L2, L6, L8; G10 broji L2, L8, L10. `lekcija-05:182` *li* je već nazvao klitikom.
- **gramatika-08:205** — „Lesson 11 takes the *li* apart properly; for now take the phrase whole“; `lekcija-05:173-186` već ima cijelu stranicu o *li* („That is the whole of *li*“).
- **gramatika-08:203, 216 i 205** — *hoće* se prevodi čas „wants“, čas „will“, bez objašnjenja.
- **lekcija-09:136, 56** — „sorting is done entirely on the last letter“; *momčad* (129, 168, 184) traži *naša/tvoja*. V9:161 i G9:23 tu zamku navode, L9 ne.
- **lekcija-09:216** — *svoju sestru* i *njegovu sestru* „one letter apart“.
- **lekcija-09:226, 237-238** — uz *ja/ti* „use *svoj*“, *mojem/tvoj* netočno; `gramatika-09:166` kaže da su oba ispravna.
- **gramatika-09:185, 195** — isto proturječje unutar G9.
- **gramatika-09:213** — „English word order is the other way round. English says *Marko's jersey*, Croatian *Markov dres* — the owner first“.
- **gramatika-09:254** — *Ana nosi ___ | njezinu gitaru*; po stranici o *svoj* uz subjekt Ana treba *svoju*, a tuđa gitara nije naznačena.
- **gramatika-09:210 i 218-219** — tablica ima -ev (*Igračev*), vježba kaže „any other takes -ov“; *Igračev* s velikim slovom, protiv pravila 212.
- **vokabular-09:35** — „consonant is masculine … -o or -e is neuter“; deck ima *krv, kost* (ž.) i *usta, leđa*.
- **vokabular-09:109 i lekcija-09:128, 167, 182, 203, 254** — V9 kao prirodan izraz daje *Boli me koljeno*, L9 cijelo vrijeme vježba *Moje koljeno boli*.

**Razine 10–12**

- **lekcija-10:100, 118, 143; vokabular-10:85** — „-o for a man or a boy, -la for a woman or a girl“; stavke *Film je bio*, *Pizza je bila*, *Voda je bila*, *Naš klub je pobijedio*.
- **gramatika-10:8, 42** — „-li for any group“; ista datoteka *Djeca su spavala*.
- **gramatika-11:6, 236 i 10** — „three ways to ask“; ista stranica uvodi intonaciju kao četvrti.
- **gramatika-11:70 i 141-146** — „*tko, što, gdje, kada, zašto* never change shape“; *tko → koga, za koga, o kome*.
- **gramatika-11:141** — „after a preposition it stays *koga*: *za koga*, *o kome* comes later“.
- **gramatika-11:176 i 184-193** — „A bare *da* sounds abrupt“; vježba traži *Da, volim / Da, imam*.
- **lekcija-05:184 i 197; lekcija-11:194** — isto pravilo, a dijalozi nude samo *Da, molim / Ne, hvala*.
- **lekcija-11:33 i vokabular-11:6** — L11 „Five of them never change shape“ (nabroji sedam), V11 „Seven of them“.
- **lekcija-12:60** — „**ne-** gives the positive one“; ista lekcija uči *neću, nemam, nema*; 186 „The same taps build *nisam, nemamo, neće*“.
- **lekcija-12:106, vokabular-12:54** — *Nemam vremena* ima genitivni nastavak koji „Lesson 16 explains“; `lekcija-12:156` *Nemam vilicu*, 231 *Danas nemamo ribu*, 267 *nemamo ni ribu ni juhu*, `gramatika-12:254` *Nemamo jelovnik*: akuzativ, razlika neobjašnjena.
- **gramatika-12:91** — „Word order is free“ za *ništa/nikad*; upis 252-266 prihvaća jedan red (npr. *Ne pijem nikad mlijeko* prihvaćeno u 145, odbijeno u 259).
- **gramatika-10:222** — „Word order is free as long as the helper is not first“; 225, 227-229, 234 prihvaćaju jedan red.

### C. Uputa (info / opis) ne odgovara sadržaju vježbe

**Brojevi**

- **lekcija-0:189** — „two thirds of the alphabet is already yours“ nakon 18 od 30 slova.
- **lekcija-0:5 i 181** — „In the next five minutes“ i „about ten minutes after you first opened this page“.
- **lekcija-05:33** — „The last four don't [end in -a]“; takve su tri imenice (*kruh, sok, sir*), zadnje tri kartice su glagoli.
- **vokabular-02:83** — „Two lose a consonant: *odvjetnica, glumica*“; i *radnik → radnica* (90).
- **vokabular-03:21** — „Three of them hide a surprise“; i *razumjeti → razumijem*, *šutjeti → šutim*.
- **vokabular-04:115-116** — „Four connectors and four words“; nabrojeno pet riječi.
- **vokabular-04:223** — „Three family words need letters English does not have“; navedeno pet.
- **vokabular-06:7** — „Five of them squeeze a letter out“; navedena tri (205, 278 kažu „three“).
- **vokabular-08:47** — „two for when the *bura* starts blowing“; tople su tri (*šal, kaput, džemper*).
- **vokabular-09:58-60** — „Ten new verbs“; kartica ima 12 (i šest od njih nije novo).
- **vokabular-09:144** — „Six say -am“; u stupcu -AM je sedam.
- **vokabular-09:100** — „Two of them use grammar that comes later“; i *Naš klub je pobijedio!* (perfekt).
- **vokabular-10:33** — „Three of them are not about the past“; i *danas, sutra, odmah, poslije*.
- **vokabular-10:108** — „Three of them ask about the past … each has a female version“; *Kako je bilo?* nema ženski oblik, *Jesi li gledao film?* je četvrto.
- **vokabular-11:97** — „plus five verbs“; ima ih sedam.
- **vokabular-11:296** — „Three words here need letters“; navedena četiri.
- **vokabular-12:33** — „Three of them drop the *a*“; i *sočan → sočna*.
- **vokabular-12:302** — „*Ništa* and *nešto* differ in one letter“; razlikuju se u dva.
- **lekcija-11:10** — „the eight question words“; kartica ima 11, a većina je već uvedena (vidi D).
- **lekcija-11:33** — „Five of them never change shape“; nabrojeno sedam.
- **lekcija-11:214, vokabular-11:311** — „Two of them take an ending — *koji* and *kakav*“; i *čiji*.
- **praksa-08:89** — „One question is in the future“; i 93 *Koliko dugo će putovati?*.
- **praksa-09:106** — „Two of the questions ask *čiji*“; samo jedno.
- **praksa-10:103** — „A whole weekend in six sentences“; ima ih sedam.
- **praksa-11:90** — „the host has six questions“; postavlja sedam. 188 „the same six questions“ — nisu ista.
- **lekcija-10:33, vokabular-11:97** — „new verbs“ koji su već naučeni (*imati, znati, pobijediti*).
- **lekcija-06:35, lekcija-08:34, lekcija-09:75** — „seven / six / ten new verbs“, a među njima su *čekati* (V4), *šetati* (V4), *trenirati, vježbati, plesati, crtati*.

**„Every“, „only“, „none“ i slične tvrdnje**

- **lekcija-0:113-114** — info „The six hardest words again“, opis „these six are new“; nisu bile u memoriji, a *ekran* i *farma* nisu „hardest“.
- **lekcija-01:9** — „Today's one new word is *je*“; lekcija uvodi 15 imenica, 15 pridjeva, *ovo, i, ali*.
- **praksa-01:30** — „These nouns are masculine, which is why the adjectives stay bare“; stavka *Restoran je mali*.
- **praksa-01:76** — „… and *Hvala* in reply at the end“; iza *Hvala* dolaze još dvije replike.
- **praksa-01:89** — „Every reply on offer is a sentence of that shape (thing + je + description)“; *Kava, molim*, *Velika, molim*.
- **lekcija-02:62** — „Adjective cards … add -a for *ona*“; deck sadrži *student, profesor, doktor, konobar*.
- **vokabular-02:21** — „again consonant-final and masculine“; deck ima *ime*.
- **vokabular-02:99 i 98** — opis „Nationalities work the same way“, info „There is no single ending here“.
- **vokabular-05:66, 65** — „All ten take a target“; *ići* i *koštati* nemaju objekt.
- **vokabular-06:188** — „Every Croatian card is a *ja* form“; 198-199 *konobar, policajac*.
- **vokabular-07:97** — „They are feminine -a nouns“; *povijest, sport, jezik*.
- **vokabular-10:6** — „the whole group is masculine or feminine“; *kino, kazalište*.
- **vokabular-10:34** — „None of them ever changes shape“; *prošli / prošla / prošlo* u istom decku.
- **vokabular-10:190** — „none of these masculine nouns changes shape as an object“; popis ima *gitara, lopta, kava, knjiga, more, sunce*.
- **vokabular-10:320** — „*dokumentarac* and *sendvič* need **č**“; *dokumentarac* nema č.
- **vokabular-11:142** — „The teens all end in -naest, the tens above twenty in -deset“; *dvadeset* je u stupcu 11–20, *sto* u „više od 20“.
- **vokabular-11:123-135** — „Sort each question word“; *danas* i *sutra* nisu upitne riječi.
- **vokabular-11:164** — „Everything here can be a present“; *sunce, more, kino, euro, pas*.
- **lekcija-11:52** — „once you have one to ten, the rest is a pattern“; *četrnaest, šesnaest, dvanaest*.
- **lekcija-10:169** — „The distractors each get exactly one of the two wrong“; 172, 173, 176 griješe u oba.
- **gramatika-10:111** — isto; 114, 117, 119 griješe u oba, 122 u padežu.
- **lekcija-10:272, praksa-10:195** — „the first option is the man's form, the second the woman's“; 281, 285 (L10) i 204, 206, 208 (P10) nisu rodni parovi; P10:206 „ženska“ opcija glasi *Nisam jeo pizzu, ali sam jeo sladoled*.
- **praksa-04:113** — „Every question is a *why* question in disguise“; 118 i 119 nisu.
- **praksa-06:105** — „Every reply on the right uses the pronoun instead“; 107, 113, 117.
- **praksa-07:106, 108** — „none of them are stated outright“; 111-114 piše doslovno.
- **praksa-10:142, praksa-11:135, praksa-08:101** — „Nobody says who did what“; većina odgovora piše doslovno.
- **praksa-09:65** — „the first speaker says the red one is hers“; kaže to drugi govornik.
- **praksa-09:222** — „players arrive and change … coach speaks before the match“; ništa od toga nije u rečenicama 224-230.
- **praksa-12:34** — „a gap in front of a verb takes *ne*“; 38 traži *Nikad*. „a gap before an adjective takes *nije*“; 42 *problem* je imenica.
- **praksa-12:76** — „The guest's order comes last“; zadnja je konobarova replika.
- **praksa-08:115** — „what each person likes and fears“; tekst ne spominje strah.
- **lekcija-03:162, praksa-03:114** — „you can leave *ja* out entirely“; sve ponuđene replike počinju s *Ja*.
- **lekcija-12:263** — „your replies use … *nemate li*“; nijedna replika ga nema.
- **praksa-03:70-78** — opis „Type the whole verb“, a stavka pokazuje pola riječi (*Tata kuh__*).
- **praksa-11:6-7** — „shop conversation … a shop assistant“; sugovornik te tika i zna što tvoja sestra voli (17).
- **lekcija-02:135** — „Agreement applies to you as well: a woman says *pametna*“; nijedna replika ne opisuje govornika.
- **praksa-02:134** — „a job word or an adjective about you has to match your own gender“; dijalog ne pamti izbor (vidi G).

### D. Riječi i gramatika prije nego što su uvedene

Riječi koje se koriste u produkciji ili se provjeravaju, a nisu ni na kartici ni u popisu pasivnih riječi. Kad je riječ uvedena kasnije, to piše u zagradi.

**Gramatika**

- **lekcija-03:62; gramatika-03:18** — akuzativ *knjigu* (L5).
- **gramatika-04:153; test-04:329** — *pijem kavu*, *Negiraj: Pijem kavu* (L5).
- **gramatika-04:190** — oni-oblik *razgovaraju* (L7).
- **praksa-04:40, 53, 75, 96, 98; praksa-05:46, 105, 128, 134, 136; praksa-06:17** — prezent množine *gledaju, jedu, idemo, slušaju, rade, trebamo, idu, pričaju* (L7), mahom bez glose.
- **lekcija-07:6-7** — zato „verbs finally learn to say we, you all and they“ ne stoji.
- **gramatika-06:257-258** — perfekt *Ana ju je vidjela* (L10).
- **vokabular-09:107** — perfekt *Naš klub je pobijedio!* (L10).
- **praksa-02:63-66, 148** — *iz Splita, u Zagrebu, Ivane, na tečaju* (genitiv, lokativ, vokativ).
- **gramatika-04:87, 188; lekcija-09:225, 237; lekcija-10:158, 161, 242** — lokativ *u Splitu, u svom klubu, u kinu, na koncertu, na moru* (L13).
- **praksa-05:93, 98** — *bocu vode*, *Hvala vama* (genitiv, dativ).
- **praksa-06:86** — *Ako vidite psa … zovite … kod mosta … na vratu* (ako, imperativ L17, genitiv, lokativ). `gramatika-04:109` kaže da *ako* dolazi u Grammar 20.
- **praksa-07:158** — *Mislim da volim ovu školu* (*da*-rečenica, G20; *ovu*).
- **gramatika-02:166; gramatika-03:172** — *Jesi li umoran?*, *Radiš li danas?* (li, L5).
- **lekcija-07:89** — *dva učenika* (broj + genitiv, L16).
- **gramatika-10:246** — *Nije bilo sunca* (genitiv).
- **lekcija-09:239; gramatika-09:184** — *svoga / njezinog* (akuzativ živog za posvojne).
- **praksa-08:196** — *Iva se boji aviona* (bojati se + genitiv, L18).
- **test-02:390-392; test-03:315-319; test-04:326, 329; lekcija-04:191; lekcija-05:242-251; lekcija-06:232; lekcija-08:260** — upute na hrvatskom (*Koja je rečenica točna?, Što znači, Kako pitaš stranca?, Negiraj, U koji stupac ide, Koji veznik nikad ne traži zarez?, Napiši ciljni oblik, Pretvori u futur*) prije nego što su *koji, što, pitati, stranac, veznik, zarez* uvedeni. `lekcija-04:152` tek tada najavljuje „From here on, the questions are asked in Croatian“.
- **lekcija-03:193** — pitanje *Pas spava. — što pas radi?* s engleskim odgovorima.
- **gramatika-05:14; gramatika-06:16; gramatika-08:14** — hrvatski usred engleskog pravila (*ništa se ne mijenja*, *stvar / biće*, *Bez zamjenice:*).

**Riječi**

- **lekcija-01:71-72** — *ovo* (V1).
- **lekcija-01:153** — *ali* u slaganju (L4); `praksa-01:6` ga zatim zove pasivnom riječi.
- **gramatika-01:81** — *čaj, juha, kolač*, veznik *a*.
- **gramatika-01:138** — *ta*.
- **praksa-01:65, 101** — *Dobar dan, Jest, Doviđenja* nisu u pasivnom popisu; *popularan* (16) također.
- **lekcija-02:56** — *turisti*; 140 *Ne*.
- **gramatika-02:23, 165, 168; test-03:316** — *doma*.
- **gramatika-02:37** — *novinarka* prije pravila o -ka (114).
- **vokabular-02:113, 127; test-02:248** — *susjeda*.
- **lekcija-03:8, 88-157** — *sok, tekst, film, udžbenik, sendvič, kruh, pismo, radio, mačka, sir, hrvatski* bez kartice (V3).
- **lekcija-03:164, 170** — *Što*, *miran*.
- **gramatika-03:173, 186-187** — *imati, nemam, imam* (V4).
- **gramatika-03:172, 199, 220** — *danas*.
- **test-03:38** — *hrvatski | Croatian* u testu, nikad na kartici.
- **praksa-03:73** — *kuha* (V4).
- **lekcija-04:99, 162, 168** — *puno, subota, još*.
- **lekcija-04:113** — *Ja volim kuhati* (V4).
- **gramatika-04:60, 116, 202, 217; test-04:265, 349, 380; lekcija-05:20** — *plivam* (V8).
- **gramatika-04:61, 176, 189, 191** — *kasno, svijetla, svaki dan, rano*.
- **lekcija-05:65, 73, 100** — *svjež*.
- **lekcija-05:233; praksa-05:41; praksa-06:96; lekcija-07:261, 265; praksa-07:27** — *Kakav / Kakva / Kakvi* (L11).
- **gramatika-05:171, 188, 209; test-05:302, 325, 406; test-06:369** — *škola* (V7); *plaža* (V8).
- **vokabular-05:266** — slova *grožđe* (V12).
- **vokabular-06:272** — slova *kazalište* (V10).
- **gramatika-06:77, 79, 91-93, 114; test-06:192-194** — *Amerikanac, Austrijanac, otac* (nikad).
- **lekcija-06:179, 189** — *bolesna, puna, žurim*.
- **lekcija-06:191** — *jedan* (m.).
- **praksa-06:108, 114, 118** — *onaj, netko, tvoj* (L9).
- **test-06:419** — *Čovjek vodi psa* u produkciji; *vodi* je samo pasivno u P6.
- **lekcija-07:93-137** — *pitanja, sela* (V7), *vježbaju, svijetli*.
- **lekcija-07:228-235** — *djeco, matematiku, imamo, znam*.
- **gramatika-07:20-26** — *vojnik, bubreg, orah, junak*; upis traži *junak → junaci*.
- **praksa-07:39, 49** — *u srijedu*; 50 *Koliko*, 51 *dvaput, dolazi*.
- **lekcija-08:117, 237** — *stizati, kreće, odmarati* nisu na kartici L8 (V8).
- **gramatika-08:101** — *doći*.
- **praksa-08:25, 72** — *Kamo*.
- **lekcija-09:126, 128, 166, 189, 205** — *strog, boli, fotoaparat, fotografija* (V9), *pobjeđuje*.
- **lekcija-09:227, 291; test-09:278** — *vlastitu, tuđu, vlastiti*.
- **praksa-09:229** — *pobjeđuje*.
- **lekcija-11:116, 124, 201, 202** — *pošta, spor, poslao, parfem*.
- **gramatika-11:110, 113; test-11:165, 168** — *onaj, onu*.
- **gramatika-11:192** — *jest* kao odgovor.
- **lekcija-12:238** — *ova*.
- **lekcija-12:302** — memorija *nekoga | nikoga*; *nekoga* nije ni na kartici (V12).

**Najavljeno kao novo, a već poznato**

- **lekcija-04:152** — pitanja na hrvatskom „from here on“; već `test-02:390`, `test-03:317`, `lekcija-03:193`.
- **lekcija-07:6** — „verbs finally learn to say we … they“; vidi gore.
- **lekcija-11:10** — upitne riječi „today“; `lekcija-04:149-163` (*tko, što, zašto, gdje, koji, kada*), L6 *koga*, L9 *čiji*.
- **gramatika-10:260** — „Lesson 11 hands you the questions — *tko, što, gdje, kada, zašto*“; isto.
- **lekcija-12:10** — „New today: *ništa, nitko, nigdje, nikad*“; *nikad* je kartica u V3, *nitko* u P3/P6/P7, *ništa* u P4.
- **praksa-09:9** — „*ima / imaju* (properly in Lesson 10)“; *imati* je u V4.
- **lekcija-08:8, 273** — „you have already met … *neću*“, a zatim „What is still missing is the refusal — *neću*“.
- **lekcija-10:8** — „You can describe, ask, plan and dream“; *ask* je L11, *dream* L18.
- **vokabular-02:91-92, vokabular-05:91-92, vokabular-08:99-102, vokabular-06:96, lekcija-12:46** — ponovno kao nove kartice: *gladan, žedan, cijeli, savršen, umoran, sretan, brz, džem*.

### E. Popisi „Passive words“

Tri vrste pogrešaka: navedena riječ koju je učenik već aktivno naučio, navedena riječ koje u tekstu nema, i nenavedena nova riječ.

**Riječ se navodi kao pasivna, a već je aktivna kartica**

- **praksa-01:6-7** — *ali* (traži se u produkciji već u `lekcija-01:153`).
- **praksa-02:7** — *i* (V1).
- **praksa-03:8** — *čaj, sir, strip, smiješan* (V3); 115 *Vidimo se!* (V2).
- **praksa-04:8** — *doktorica* (L2), *puno, još* (V4), *veseo* (L2), *topao* (L1); 32 *ustaje* (V4), *posao* (V2); 70 *koncert* (V3), *cijeli* (V4); 94 *ručak* (V3), *gladan* (V2), *uvijek* (V3); 124 *zajedno* (V4), *Vidimo se* (V2).
- **lekcija-05:228** — *gladan, žedan* (V2), *jak* (L2).
- **praksa-05:7** — *jaka, gladna, žedna*; 104 *žuta, crvena, zelena* (L1).
- **praksa-06:8** — *glazba, sad, Sretan put, žuri, oprostite* (sve V6).
- **lekcija-07:227** — *Kako ste?* (V2), *uvijek* (V3).
- **praksa-07:8** — *zidovi* (V7), *veliki, žuti* (L1); 57 *roditelji* (V4); 95 *brzo* (V7); 119 *jako* (V2).
- **lekcija-08:228, praksa-08:204** — *naravno* (V2), *Hoćeš li* (G8); 246 *težak* (V7).
- **lekcija-09:265** — *čiji* (uveden aktivno na 115), *naravno* (V2).
- **praksa-09:51** — *slobodan* (V9); 93 *zajedno* (V4); 120 *kutija* (V5); 206 *Dobro došli* (V7), *naravno, vidimo se* (V2).
- **lekcija-10:292** — *umoran* (L2), *balkon* (V4).
- **praksa-10:8** — *gdje* (L4); 117 *kolač* (V5).
- **praksa-11:8** — *savršen* (V8); 91 *odgovor* (V7); 50 *naravno* (V2).
- **lekcija-11:247** — *Izvolite* (V5), *savršen* (V8).
- **praksa-12:91** — *njegova* (L9).

**Riječ je navedena, a u vježbi je nema**

- **praksa-04:94** — *sada*.
- **praksa-05:84** — *Imate li?*; 101 *nešto*.
- **lekcija-06:185** — *evo*, *bolestan*.
- **praksa-06:8** — *oprostite, Sretan put, žuri* (nisu u Text 1); 35 *iza*; 78 *nađen*.
- **praksa-07:32** — *zadnji*; 54 *zbor*; 142 *Koliko?*, *najbolji*.
- **praksa-08:8** — *ručak*.
- **praksa-09:51** — *tamo*; 89 *malo*.
- **praksa-10:8** — *na moru, sve* (u Text 1 ih nema); 46 *Jesi li…?*; 126 *netko, nitko*.
- **lekcija-11:247** — *preporučiti*.
- **praksa-11:8** — *Izvolite?*; 119 *nitko, netko*; 186 *voditelj*.
- **praksa-03:8** — popis u Text 1 pokriva riječi iz Tekstova 2–4 (isto `praksa-05:7`, `praksa-10:8`); ako je popis zajednički za cijelu vježbu, to nigdje ne piše.

**Nova riječ nije navedena**

- **praksa-01:7** — *popularan, Dobar dan, Doviđenja, Jest*.
- **praksa-02:7** — *super, To je, težak, zanimljiv, sada, iz Splita, u Zagrebu, Ivane, I meni, danas, tečaj*.
- **praksa-04:70** — *Moja* (posvojna, L9); 94 *svi*.
- **lekcija-05:191** — *Imamo* (mi-oblik), *To je sve*, *još* u značenju „more“.
- **praksa-06:35** — *svi, nešto, smije se*; 81 *zovite* (imperativ).
- **lekcija-07:227** — *djeco* (vokativ), *matematiku, znam, imamo*.
- **praksa-07:32** — *svaki odmor, 5. razred*; 145 *strogi, neki, laki, različite, Mislim da, ovu, Dobro došao, na odmoru*.
- **praksa-08:204** — *Još ne znam, dosadna, nemam kartu, na vrijeme, za mene, ručnike, hranu*.
- **lekcija-11:247** — *parfem, jeftinije*.
- **praksa-12:186** — *alergični, orahe, Želite li*.

### F. „Everything comes from the texts“ — a ne dolazi

Skriptirana provjera: rečenica iz vježbe uspoređena je sa svim rečenicama tekstova iste datoteke.

- **praksa-01:106** — *Kuća je velika* (i *More je plavo*, *Kava je topla* u drugom obliku).
- **praksa-03:132** — *Film je dobar*.
- **praksa-05:141, 143** — 10 od 16 rečenica nije u tekstovima (*Juha je topla*, *Rajčica je crvena*, *Subota je danas*, *Vrećica je mala*…).
- **praksa-05:190** — 10 od 28 (*Ana voli čokoladu*, *Idem u trgovinu*, *Ana gleda cijenu*…).
- **praksa-06:140** — 6 stavki; 200 — 7 stavki (*Ana zove prijatelja*, *Ana ga čeka*, *Marko je vidi*…).
- **praksa-07:165** — *Ocjene su dobre*, *Iskustva su zanimljiva*; 213 — 6 stavki (*Ana voli riječi*, *Čekam prijatelje*…).
- **praksa-08:140** — 5 stavki; 187 — 5 (*Iva se boji aviona*, *Luka trenira svaki dan*…); 233 — 6.
- **praksa-09:146** — 6 stavki; 184 („Everything here is in one of the four texts“) — *oko, srce, tijelo*; 235 — *Čija je ovo lopta?*, *To je Markov dres*, *To je Anin fotoaparat*.
- **praksa-10:153** — 7 stavki; 176 — 8 (*Idem u kino*, *Voda je topla*, *Baka kuha ručak*…); 225 — *Bilo je savršeno*.
- **praksa-11:146** — 13 od 16 stavki; 168 — 7 (u tekstovima nema nijednog *li*-pitanja ni *zar ne* osim jednog); 219 — 6.
- **praksa-12:145** — 4 stavke; 218 — 1.

### G. Dijalozi koji ne prate odabranu repliku

- **lekcija-02:137-145** — Petra se predstavi, ti kažeš „Ja sam Ana“, ona pita „Tko si ti?“; odgovori su u muškom rodu i kad si Ana; „Drago mi je!“ dolazi na kraju razgovora; „Bok!“ pa se razgovor nastavlja.
- **lekcija-03:167-169** — kažeš „Ja pijem sok“, Marko odgovara „I ja jedem“; druga grana nudi „Sok je hladan“ iako sok nije spomenut.
- **praksa-03:119-120** — pitaš „Jedeš li?“, Marko odgovara „Pijem čaj“.
- **lekcija-04:113-114** — kažeš „Ja volim kuhati!“, Ivana odgovara „Radiš puno!“.
- **lekcija-06:186-188** — kažeš „Ne, čekam tramvaj“, sugovornik odgovara „I ja čekam autobus“.
- **praksa-06:107-118** — odbiješ („Ne, čekam autobus“), a na kraju „Vidim tvoj tramvaj“.
- **lekcija-07:237** — replika „Oni uvijek brzo igraju“ ne odgovara na „Pauza je kratka!“.
- **lekcija-08:235-239** — „Sretan put!“ → „Da, vlak kreće jako rano“; na kraju „Dogovoreno. Vidimo se u ponedjeljak!“ iako sugovornik tada putuje.
- **praksa-08:210-212** — „Neću ići, nemam kartu“ → „Ustat ćeš na vrijeme?“.
- **praksa-08:216** — ti želiš prijatelju „Sretan put!“ iako putujete zajedno.
- **lekcija-09:273-274** — „Kada trenirate?“ → „Naš — naš park je velik!“.
- **praksa-09:213** — „On je također golman“ i kad si rekao da igraš u obrani; 214 „A gdje je moja lopta?“ na prvom treningu.
- **lekcija-10:277 i 283** — „Plivao sam cijeli dan“ pa „Učio sam ujutro“.
- **praksa-10:199, 201** — Petra pita „Jesi li plivao / gledao?“ u muškom rodu i kad si birala ženske oblike.
- **praksa-10:204-205** — „Je li bilo puno ljudi?“ → „Komedija.“
- **praksa-10:206** — „Mi smo isto jeli pizzu!“ iako si proveo večer sam s knjigom.
- **lekcija-11:249-250** — „Samo gledam, hvala“ → „Lijepo! Što ona voli?“ (nema *ona*).
- **lekcija-11:255-256** — „Imate li nešto jeftinije?“ → „Nova je i jako dobra.“
- **praksa-12:190-191** — „Piletinu, molim!“ → „Nema problema. Imamo i salatu.“
- **praksa-12:194-195** — „Da, na orahe.“ (alergija) → „A za piće?“
- **praksa-12:198** — „tjestenina je hladna“ i kad si naručio salatu.
- **lekcija-05:195-199** — „Ne, hvala“ → „Trebate li vrećicu?“ → „To je sve?“ → „Trebam još jednu ribu“ (u dućanu koji riba nije nudio).
- **praksa-04:131** — Ivana zove telefonom i kaže „I ja spavam jer je subota“.
- **lekcija-05:201, lekcija-06:197, lekcija-09:279** — zadnja *ti* replika ima samo jednu opciju, dok sve ostale imaju dvije.

### H. Navigacija, redoslijed i najave

- **lekcija-04:180** — „Score 80% to be ready for **Lesson 5**“; slijedi Vocabulary 4.
- **lekcija-06:228** — „ready for **Lesson 7**“; slijedi Vocabulary 6.
- **lekcija-07:271** — „ready for **Lesson 8**“; slijedi Vocabulary 7.
- **lekcija-08:257** — „ready for **Lesson 9**“; slijedi Vocabulary 8.
- **lekcija-09:297** — „ready for **Lesson 10**“; slijedi Vocabulary 9.
- **lekcija-04:198** — „Next up: … In Lesson 5“ — preskače V4, G4, P4, T4.
- **lekcija-05:257** — „Next up: Grammar 5“ — preskače Vocabulary 5.
- **lekcija-06:246, lekcija-07:289, lekcija-08:275** — isto (Grammar umjesto Vocabulary).
- **lekcija-09:316** — „Next up: … In Lesson 10“ — preskače četiri cjeline.
- **lekcija-05:239** — „finish **Module A** and earn your first big badge“ na kontrolnoj točki lekcije; iza nje su V5, G5, P5, T5, a Modul A nigdje drugdje ne postoji.
- **lekcija-10:315, 319, 339** — „Module B final checkpoint“, „complete Lessons 1–10 — half the course!“, „Module B is complete“ — iza toga slijede V10, G10, P10 i Test 10, koji je po `popis lekcija.md` ispit Modula B.
- **test-10** — naslov i sadržaj su obični test razine, iako ga L10 i popis najavljuju kao ispit Modula B („sva tri vremena“, 25 min; trajanje je 23 min).
- **gramatika-04:109** — „Grammar 20 adds … *ako*“; *ako* se koristi u `praksa-06:86`.
- **gramatika-08:205** — „Lesson 11 takes the *li* apart properly“; L5 je to već napravio.
- **gramatika-10:260** — „Lesson 11 hands you the questions“; L4 ih je već uveo.
- **lekcija-04:152** — „From here on, the questions … are asked in Croatian“; već su bile (T2, T3, L3).

### I. Priče, zagonetke i likovi

- **lekcija-0:113-114** — „the six hardest words again … these six are new“ (ista šestorka, dva opisa).
- **lekcija-0:181, 189** — „ten minutes“ / „two thirds“ (vidi C).
- **praksa-02:82-92** — poredak izbaci Majine replike, pa Ivan sam sebi odgovara i odmah kaže „Drago mi je, Maja!“.
- **praksa-02:142** — Petra na „Ja sam Hrvatica, iz Splita“ odgovara „Posao je težak, ali je zanimljiv“ (prepisano iz Text 2).
- **Lik Petra** — studentica (`lekcija-02:141`), doktorica (`praksa-02:16`), novinarka (`praksa-02:140`).
- **Lik Marko** — susjed (L3), 30-godišnjak u kvizu (`praksa-11:97`), dijete koje jede samo palačinke (`praksa-12:92`), sportaš (P7), gost u restoranu (`praksa-12:119`).
- **Ivana** — „your neighbour“ (`lekcija-04:109`) i „Your friend“ (`praksa-04:124`).
- **praksa-04:102** — „Pas šeta zajedno jer pas uvijek šeta.“
- **praksa-05:113-123** — zagonetka o trima vrećicama rješava se doslovnim čitanjem teksta (110), a opis kaže da treba zaključivati.
- **praksa-06:35** — „Everybody on this street is looking at somebody“; turist gleda spomenik.
- **praksa-07:122** — Ivan i Luka predstavljeni kao novi učenici, a već su u razredu (`lekcija-07:234`, `praksa-07:64`, 98-101).
- **praksa-08:107-117** — rod u zagonetki proturječi ključu (vidi „Popravi prvo“).
- **praksa-09:56-58** — „Naš klub trenira danas“ → „Čiji je to klub?“ → „Naš“.
- **praksa-09:69/72** — *Prva lopta je crvena* (TRUE) i *Lopta u parku je crvena* (FALSE).
- **praksa-10:118, 124** — pitanje se odnosi na rečenicu koja je izbačena iz priloženog teksta.
- **praksa-10:134** — *Iva je imala ispit u ponedjeljak* u priči koja se događa u subotu.
- **praksa-10:149** — dva točna odgovora na „Tko nije bio doma?“.
- **praksa-11:124-125** — „kupuju poklone za Anin rođendan“, a „Ana kupuje poklon za baku“.
- **praksa-11:127, 137** — pitanje o gitari koje tekst ne spominje.
- **lekcija-12:283** — „Marko nikad ništa ne jede — samo palačinke!“ (i pitanje 287 to boduje).
- **praksa-05:134** — „U podne idemo u školu i na posao“.
- **praksa-12:56** — „moj prijatelj ne jede ništa drugo“ kao razlog za narudžbu pizze i salate.
- **praksa-06:191, praksa-09:224-230, praksa-10:214** — u vježbama „Nobody wrote this down“ redoslijed je dijelom proizvoljan (npr. *Svaki igrač nosi svoj dres* prije *Igrači dolaze na stadion*).
- **lekcija-09:267** — „To je njegova lopta“ bez ikoga na koga bi se *njegova* odnosilo.
- **lekcija-03:170** — „Ana spava, pas spava“ u razgovoru sa susjedom koji o Ani nije ništa rekao.

### J. Testovi: pokrivenost, distraktori, prihvaćeni odgovori

**Preusko prihvaćeni odgovori**

- **gramatika-02:197** — „the pronoun is optional, so both versions are accepted“; 200, 201, 206, 207, 210, 211, 213 prihvaćaju samo verziju sa zamjenicom.
- **gramatika-03:207, test-03:381, test-04:372, test-06:409, test-07:441** — isti opis, ista pogreška (npr. `test-06:424` odbija *Ja ga vidim*).
- **gramatika-10:222, gramatika-12:91** — „word order is free“, a prihvaćen je jedan red riječi.
- **test-02:450** — „You are polite. | Ti si ljubazan.“ — ženski i uljudni oblik odbijeni.
- **lekcija-01:178** — izbor s dvije opcije ondje gdje ostali imaju tri.

**Distraktori koji su zapravo točni ili besmisleni**

- **test-05:125** *kolač*; **test-06:88-89, 132** *stanica/kolodvor*; **test-07:128** *odmor*; **test-08:77, 80, 88** *put, odmor, karta*; **test-11:198** *Koliko to čini?*.
- **test-06:113** „buyer's bag“, **test-06:115** „dove keeper“, **test-07:71** „student body“, **test-07:95** „poem book“, **test-08:104** „moonlight“, **test-08:143** „letjeti sam“, **test-11:197** „Gdje ti živiš da?“.

**Pokrivenost**

- **test-01, test-02** — ne provjeravaju negaciju (*nije*, *nisam*) koju uče G1 i G2.
- **test-03** — provjerava samo devet glagola iz L3; V3 (10 novih glagola, objekti, *uvijek/često/nikad*) i *ne* + glagol iz G3 nisu u testu.
- **test-05** — ne provjerava *li*-pitanja iz L5.
- **test-01** — jedini test bez `prag` (aplikacija tada uzima 70 %, dok ostali testovi imaju 70 upisano).
- **test-03:155-430** — pet zadataka ponavlja istu rečenicu unutar iste vježbe (*Ti gledaš film*).
- **trajanja** — 1080, 1200, 1260, 1320, 1380 s po testovima; `popis lekcija.md` za sve navodi 18 min.

### K. Engleski, prijevodi i pravopis

- **Mom / Mum** — *Mom* je pravilo (≈120 pojava), *Mum* u `praksa-03:8, 86` i `lekcija-04:157`; `praksa-03` ima oba.
- **colour / color** — `lekcija-01:186`, `lekcija-05:228`, `praksa-05:103` (UK) protiv `vokabular-01` naslova „Colors“ i `praksa-05:7, 9` „colorful“.
- **practise / practice (glagol)** — `vokabular-07:88, 304, 369` protiv `lekcija-04:9` „You'll practice them“.
- **programme / program** — `vokabular-10:16, 253` i `test-10` oboje.
- **vokabular-06** — „airplane“ (US) uz „petrol“, „neighbourhood“, „theatre“ (UK) u istoj datoteci.
- **learnt / learned, storey / story, crisps / chips** — po jedna iznimka u inače dosljednom nizu.
- **čovjek** — „person, man“ (V2), „person“ (T2), „man, person“ (L6), „man“ (T6), „man → people“ (V7).
- **policajac** — „police officer“ (V2, T2) i „policeman“ (L6, V6, T6).
- **vi** — „you (plural or polite)“ (L2, V4) i „you (plural)“ (T2).
- **posao** — „job, work“ (V2), „job“ (T2), „work, job“ (V10), „work“ (T10).
- **odmor** — „break“ (V7), „break time“ (T7), „holiday, break“ (V8), „holiday“ (T8).
- **vježbati** — „to practise“ (V7, T7) i „to exercise“ (L9, V9).
- **čekati** — „to wait“ (V4) i „to wait for“ (L6, V6).
- **nositi** — „to carry“ (V5), „wearing“ (`praksa-06:84`), „take“ (`praksa-08:36, 41`).
- **raditi** — „to work“ (V3) i „makes“ (`praksa-12:91`), „what are you doing“ (`lekcija-03:164`).
- **Dobar dan** — „Good day!“ (L2, T2) i „Good afternoon!“ (`praksa-01:65`, `praksa-02:97`).
- **Izvolite** — „here you are“ (`praksa-01:7`) i „What would you like?“ (`praksa-01:90`); V5:82 ih pomiruje tek sedam razina kasnije.
- **torba / vrećica** — obje „bag“; **tim / momčad** obje „team“; **muzika / glazba** obje „music“; **torta / kolač** obje „cake“ (upis prihvaća samo jednu).
- **vokabular-01:336, vokabular-02:229, vokabular-03:234, vokabular-05:258** — *č, ć, š, ž* nazvani „accented letters“; to su slova s dijakritičkim znakom, ne naglasak.
- **lekcija-11:1** — naslov „The Perfect Present“ može se pročitati kao gramatičko vrijeme (present perfect), a lekcija je o poklonu i pitanjima.

### L. Sitnice, format i prateće datoteke

- **lekcija-0:26, 54, 76** — tri stranice s istim naslovom „Six more“ (u pregledu napretka pojavljuju se kao tri jednaka retka).
- **praksa-02:24/107, praksa-09:21/104, praksa-10:20/114, praksa-12:62/102** — dva puta „Did you get it?“ u istoj datoteci.
- **test-01:223, 288** — naslov `##` nema prazan redak ispred sebe (parser to preživi, uređivač ne).
- **lekcija-03:194, lekcija-09:304** — „false | true“ malim slovom, drugdje „FALSE | TRUE“.
- **vokabular-06:67 i 94** — *spomenik* dvaput kao kartica u istoj datoteci; `vokabular-07:105-107` isto za *glazba, sport, jezik*.
- **vokabular-09:31** — *glazba* u decku sportskih riječi; `vokabular-03:108-109` pridjevi *miran, smiješan* u decku objekata.
- **popis lekcija.md** — zastario naspram datoteka: V1 nema *ovdje, ondje, gore, dolje*; V2 nema *Francuz, Amerikanac, Austrijanac, iskren, simpatičan, bogat, slavan*; V3 ima 19 glagola, ne 25, i nijedan od navedenih (*buditi se, oblačiti se, kušati…*); brojevi riječi i trajanja testova ne odgovaraju.
- **PROCITAJ-ME.md** — opisuje v0.12 i `app.html`, a projekt je v0.11 s `index.html`.

---

## 4. Prijedlog redoslijeda rada

1. **Kategorija A** (pogrešan hrvatski i ključevi) — 26 stavki, najviše štete po satu rada.
2. **Kategorija H** (navigacija) — 16 stavki, mehanička zamjena u šest lekcija.
3. **Kategorija C, brojevi** — 27 stavki (prvi blok kategorije), svaka je izmjena jedne riječi u `info`.
4. **Kategorija F** — ili ispraviti rečenice, ili u šest opisa maknuti „Everything comes from the four texts“.
5. **Kategorija E** — popisi pasivnih riječi; najbrže se rješavaju skriptom koja usporedi popis sa sadržajem vježbe (skripta iz ovog pregleda je u sesiji).
6. **Kategorija B** — proturječja pravila; traže odluku o sadržaju, ne samo ispravak.
