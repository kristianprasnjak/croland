# Nelogičnosti u sadržaju: od Lesson 0 do Practice 12

Pregled: 17.09.2026. Izvor su `igre/*.md` u stanju od danas (lekcija-12, vokabular-12, gramatika-12 i praksa-12 mijenjani su jutros). Opseg: `lekcija-0.md` i razine 1–12 redom kojim ih učenik prolazi (Lesson → Vocabulary → Grammar → Practice → Test). Test 12 dolazi iza Practice 12 i nije pregledan.

**Kako čitati.** Svaka stavka ima `datoteka:redak`, pa se može otvoriti izravno. Citati su skraćeni. Uz ručno čitanje svih 60 datoteka pokrenute su i skripte (dupli naslovi, dupli zadaci, popisi pasivnih riječi, tvrdnje „every sentence comes from the texts“, rekonstrukcija riječi u vježbama `nastavak`, UK/US pravopis, prijevodi).

**Odnos prema `PRIJEDLOG-jasnoca-L1-L9.md`.** Taj dokument bavi se tonom i prejakim tvrdnjama. Ovdje su proturječja, pogrešni ključevi, redoslijed uvođenja i logika zadataka. Gdje se teme dodiruju, stavka je ovdje navedena samo ako i dalje stoji u današnjim datotekama.

**Ukupno: 412 stavki** u 11 kategorija.

---

## 1. Najčešće pogreške

Deset obrazaca koji se ponavljaju kroz cijeli tečaj. Brojevi su broj stavki u popisu ispod; stvarnih pojava je više, jer jedna stavka često pokriva nekoliko redaka.

| # | Obrazac | Stavki | Tipičan primjer |
|---|---|---|---|
| 1 | **Riječ ili gramatika koristi se prije nego što je uvedena**, bez glose | 74 | `lekcija-03:62` *čitam knjigu* (akuzativ) dvije lekcije prije akuzativa; `gramatika-04:190` traži *razgovaraju* (oni-oblik iz L7) |
| 2 | **Uputa (info/opis) ne odgovara vježbi**: pogrešan broj, „every“, „only“, „exactly one“ | 71 | `vokabular-06:7` „Five of them squeeze“ — navedena su tri; `praksa-07:106` „none of them are stated outright“ — četiri od šest piše doslovno |
| 3 | **Popisi „Passive words“**: navode riječi koje su već aktivne ili ih u tekstu nema, a izostavljaju nove | 38 | `praksa-04:8` kao pasivne navodi *doktorica, veseo, topao*; `lekcija-06:185` navodi *evo, bolestan* kojih u dijalogu nema |
| 4 | **Pravilo proturječi drugom pravilu ili vlastitim primjerima** | 48 | `gramatika-09:166` kaže da su *svoj* i *moj* uz *ja* oba ispravna, a 185 u istoj datoteci boduje *moj* kao grešku |
| 5 | **Dijalog ne prati odabranu repliku** | 24 | `praksa-08:210-211` odbiješ izlet („Neću ići, nemam kartu“), a prijatelj pita „Ustat ćeš na vrijeme?“ |
| 6 | **Testovi i vježbe odbijaju ispravan odgovor ili boduju gramatičan distraktor kao grešku** | 43 | `gramatika-04:207` *Stan je mali, ali dom je topao* označeno kao netočno; opis „both versions count“, a prihvaćena je jedna |
| 7 | **„Every sentence comes from the texts“** — a rečenice u tekstovima ne postoje | 26 | `praksa-05:190`, `praksa-11:168` (u tekstovima nema nijednog *li*-pitanja) |
| 8 | **Navigacija i najave**: pogrešna sljedeća cjelina, pogrešan modul | 16 | Lekcije 4–9: „ready for Lesson N+1“ i „Next up: Grammar“ — preskaču Vocabulary |
| 9 | **Logika priča, zagonetki i likova** | 30 | `praksa-07:122` Ivan i Luka su „novi učenici“, a dvije lekcije ranije već su u razredu |
| 10 | **Engleski i prijevodi nedosljedni** (Mom/Mum, UK/US, ista riječ dva prijevoda) | 24 | `praksa-03:59` *Mom*, 86 *Mum*; `policajac` = police officer / policeman |

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
- **lekcija-01:77 i gramatika-01:44** — vidi B1 (-i oblik ispred imenice).

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
