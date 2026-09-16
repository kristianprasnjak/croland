# Upute: proširenje lekcija 10–20 na razinu lekcija 5–9

Brief za Claude (ovu ili novu sesiju). Cilj: `igre/lekcija-10.md` … `igre/lekcija-20.md` dovesti na
gustoću, strukturu i ton lekcija 5–9, bez mijenjanja gramatičkog redoslijeda kursa.
Ogledni primjer gotovog rezultata: `igre/lekcija-10.md` (proširen po ovim uputama);
uzori iz prve polovice: `igre/lekcija-05.md`, `lekcija-06.md`, `lekcija-08.md`, `lekcija-09.md`.

---

## 0. Zašto (dijagnoza koju ispravljamo)

| | L1–L9 | L10–L20 (prije) | Cilj za L10–L20 |
|---|---|---|---|
| `info:` na svakoj stranici | 100 % | 0 % | 100 % |
| stranica po lekciji | 13–19 | 12–13 | 15–19 |
| stavki po drilu (prosjek) | 10–15 | 5–7 | ≥ 10 |
| warm-up (brzina) | 8–15 stavki | 4–5 | 10–12 |
| nastavak (tap-the-ending) | u svakoj lekciji | nigdje | 1 po lekciji |
| tekst za čitanje + pitanja (`tekst:`) | u svakoj lekciji | nigdje | 1 po lekciji |
| checkpoint | 12 pitanja | 8 | 12 (modulni: 12–14) |
| "Passive words" napomena u dijalogu/čitanju | da | ne | da |
| oba roda korisnika u perfektu/kondicionalu | – | samo muški | uvijek oba |

---

## 1. Datoteke i sintaksa (parser `osvjezi.js`)

- Izvor je **isključivo** `igre/lekcija-NN.md`. `data.js` se NE uređuje ručno — regenerira se s
  `node osvjezi.js` (ili `osvježi.bat`) iz korijena projekta.
- Parser čita **svaku** `.md` datoteku u `igre/` (ne rekurzivno). Sigurnosne kopije zato idu u
  podmapu `igre/_bak-prije-prosirenja/`, nikad kao `igre/nesto.md`.
- Zaglavlje datoteke:
  ```
  # Naslov lekcije na engleskom
  cjelina: Lesson 10
  ```
- Svaka stranica = `## Naslov stranice` + `format: <format>` + meta-redovi + stavke `- a | b | c`.
  Stranica bez `format:` ili bez ijedne stavke se **preskače**. Znak `|` je razdjelnik polja i ne
  smije se pojaviti u tekstu stavke. Prazna polja se odbacuju; crtica `-` kao polje ostaje.
- Meta-redovi (`ključ: vrijednost`, mala slova): `info`, `opis`, `tekst` (tekst za čitanje),
  `stupci` (razvrstavanje: `A | B | C`), `nastavci` (nastavak: `m | š | -`), `prag` (provjera, `80`),
  `trajanje` (brzina, sekunde), `infoodmah: da` (info prikazan odmah, ne na klik), `bodovi: N`
  (ručno pregazi bodove — **ne koristiti**, bodovi se računaju iz formata × razine).
- Stavke po formatu:
  - `tekst`: `- rečenica` (markdown **bold** / *italic*), `- tab: c1 | c2 | c3` = redak tablice
    (prvi `tab:` redak je zaglavlje), `[riječ]` u tekstu = polje za upis → stranica se boduje kao zadatak.
    Stranica bez `[...]` vrijedi 1 bod (uvod, reward) — zato svaka **pravilo**-stranica završava
    redom `**Now you write them.** … [x] … [y] … [z]`.
  - `kartice`: `- hr | en`. Glagoli: `- infinitiv → ja-oblik | to …` (u L10+ po potrebi treći
    oblik: `→ particip`).
  - `brzina`: `- prompt | točan odgovor` (+ `trajanje: 60`; 45 za sprint jednostavnih oblika).
  - `parovi`, `memorija`: `- lijevo | desno`. Memorija: 8–10 parova.
  - `spajanje`: slika ↔ riječ; koristi **samo** riječi koje postoje u `slike/` (mala slova = naziv
    datoteke). Provjeri prije uporabe; ako nema ≥ 8 slika, ne koristi format.
  - `razvrstavanje`: `stupci: A | B | C` + `- stavka | A`. 12–18 stavki.
  - `izbor`: `- pitanje/prompt | točan | krivi | krivi`. Prvi odgovor je točan. 10–12 stavki.
  - `nastavak`: `nastavci: x | y | -` + `- Rečenica s ___ | English gloss | x`. 12–20 stavki.
    Crtica `-` = "nema nastavka" (legitiman odgovor).
  - `upis`: `- prompt | odgovor`. Više prihvaćenih odgovora odvoji ` / ` (`Pio sam / Pila sam`).
    Odgovor bez završne interpunkcije. 10–15 stavki.
  - `slaganje`: `- Cijela rečenica.` ili `- Cijela rečenica. | en: English`. 10–12 rečenica.
  - `poredak`: `- korak` u točnom redoslijedu (8 koraka).
  - `dijalog`: `- npc | replika` / `- ti | opcija A | opcija B`. 10–14 redaka.
  - `izbor` s čitanjem: dodaj `tekst: …` (60–90 riječi) + 5–6 pitanja **na hrvatskom**.
  - `provjera`: `prag: 80` + `- slaganje | rečenica`, `- izbor | pitanje | točan | krivi…`,
    `- upis | prompt | odgovor`. 12 stavki (mješavina: 4 izbor, 4 upis, 3 slaganje, 1 značenje riječi).

---

## 2. Obavezni kostur lekcije (15–19 stranica, ovim redom)

| # | format | naslov (uzorak) | kvota | napomena |
|---|---|---|---|---|
| 1 | tekst | uvod ("Telling stories") | 3–4 reda | bez `[...]`, hook + što ćeš moći na kraju |
| 2 | brzina | Rapid recall | 10–12 | **isključivo** gradivo prethodne lekcije |
| 3 | kartice | riječi lekcije | 15–22 | imenice + 6–10 glagola s `→ ja-oblik`; recikliraj `vokabular-NN.md` |
| 4 | kartice ili parovi | drugi set (oblici, parovi, fraze) | 10–14 | npr. particip-parovi, upitne riječi, padežni oblici |
| 5 | tekst | **Pravilo 1** | tablica + 3 `[...]` | glavno pravilo lekcije, `infoodmah: da` |
| 6 | razvrstavanje | otkrij/razvrstaj | 12–18 | kad je moguće **prije** pravila (kao L5 p4) |
| 7 | nastavak | Tap the ending | 12–20 | jedan tap = jedan nastavak; engleski gloss u 2. polju |
| 8 | izbor | Pick the right form | 10–12 | 3 opcije; distraktori = stvarne pogreške učenika |
| 9 | upis | Transformation drill / Type it | 10–15 | tipkanje cijelog oblika |
| 10 | tekst | **Pravilo 2** (red riječi, iznimka, drugi posao padeža) | 3 `[...]` | kraće od Pravila 1 |
| 11 | slaganje | Build … | 10–12 | 2–3 rečenice s veznikom ili dvije klauzule |
| 12 | brzina ili razvrstavanje | drugi drill (sprint oblika / SADA-POSLIJE tip) | 10–15 | `trajanje: 45` za sprint |
| 13 | dijalog | situacija lekcije | 10–14 redaka | vidi §3.4 |
| 14 | izbor + `tekst:` | čitanje + pitanja | tekst 60–90 riječi, 5–6 pitanja | pitanja na hrvatskom (`Tko…? Što…? Zašto…? Kakav…?`) |
| 15 | memorija (opcionalno) | parovi oblika | 8–10 | osnovni ↔ novi oblik |
| 16 | provjera | Lesson checkpoint | 12 | `prag: 80`; modulni (L10, L15, L20) 12–14 s 3–4 pitanja iz ranijih lekcija |
| 17 | tekst | Reward & preview | 2 reda | što sad znaš + što slijedi u Vocabulary/Grammar/next Lesson |

Postojeće stranice **zadrži i proširi** (naslove ne mijenjaj bez razloga — zvuk i slike se vežu
na tekst stavki, ne na naslove), nove umetni na odgovarajuće mjesto.

---

## 3. Pravila pisanja

### 3.1 `info:` (obavezno na SVAKOJ stranici)
- 2–3 rečenice na engleskom, 35–60 riječi. Struktura: (1) što učenik radi na stranici, (2) pravilo
  u jednoj rečenici s **bold** nastavcima i *italic* primjerima, (3) na što paziti (trap).
- Piše se "you", nikad "the learner". Ton kao L5–L9: topao, konkretan, bez klišeja.
- Na uvodnoj i reward stranici `info` sažima lekciju (bez novog gradiva).

### 3.2 `opis:`
- 1–2 rečenice, uputa za mehaniku + mala motivacija. Ako stranica uvodi riječi koje učenik nije
  učio, završi s `Passive words: *x* (meaning), *y* (meaning).`

### 3.3 Vokabular
- Smiješ koristiti samo riječi iz: Lesson 0–N, Vocabulary 1–(N−1), Grammar 1–(N−1), plus riječi
  uvedene na karticama **iste** lekcije. Sve ostalo ide u `Passive words`.
- Nove riječi u lekciji: 15–22, od toga 6–10 glagola. Prvo iscrpi `vokabular-NN.md` (iste riječi,
  ne izmišljaj paralelne), pa dodaj što lekcija tematski traži.
- Oblik na kartici: `imenica | meaning`; `glagol → ja-oblik | to …`; od L10 particip po potrebi
  `glagol → ja-oblik → particip`.

### 3.4 Dijalog
- 10–14 redaka, korisnik ima 2 opcije; **obje** opcije gramatički točne i smislene.
- Gdje god perfekt/kondicional traži rod govornika, ponudi **jednu mušku i jednu žensku** opciju
  (`- ti | Bio sam na moru. | Bila sam na moru.`) ili obje u jednoj replici, ili neutralnu
  množinu (*Bili smo…*). NPC ne smije nametati rod korisnika (ne "Ti si dobar brat!").
- NPC-ova replika sadrži riječ koju korisnik treba u odgovoru (kao L6 p10).
- `opis` navodi `Passive words`.

### 3.5 Čitanje (`izbor` + `tekst:`)
- 60–90 riječi, 7–10 kratkih rečenica, priča s likovima koji se ponavljaju u kursu (Ana, Marko,
  Petra, Ivan, baka, djed, obitelj Horvat). Barem 70 % rečenica sadrži ciljano gradivo.
- Pitanja na hrvatskom, 3 opcije, distraktori iz teksta (ne nasumični).

### 3.6 Distraktori i drilovi
- U `izbor`/`provjera` distraktori su **stvarne** pogreške: krivi rod (*je igrao/je igrala*),
  krivi pomoćni glagol (*sam/je/su*), krivi red riječi (*Sam gledao*), krivi padež.
- U `nastavak` svaka skupina od 3 stavke pokriva sve nastavke; barem 25 % stavki traži
  „tricky" odgovor (crtica, iznimka).
- U `upis` nikad ne traži oblik koji nije bio na kartici ili u pravilu.
- Rečenice u drilovima se **recikliraju** kroz lekciju (kartica → nastavak → izbor → slaganje →
  dijalog → čitanje → checkpoint), kao u L5/L6. To smanjuje i broj novih zvučnih datoteka.

### 3.7 Ton: bez personifikacije (obavezno)
Gramatika nije lik u priči. Rečenice u `info`, `opis` i pravilo-stranicama opisuju **što se događa s
oblikom**, ne što riječ "želi", "voli" ili "osjeća". Zabranjeno i zamjena:

| ne pisati | pisati |
|---|---|
| The adjective doesn't flinch. | The adjective does not change. |
| Negation touches the verb, never the ending. | Negation alters the verb, not the ending. |
| same meaning, honest ending | same meaning, regular ending |
| Context does all the work. | The meaning follows from the context. |
| two patterns cover everything you met in Lesson 1 | two patterns cover everything from Lesson 1 |
| The verb is waiting for its name tag. | One tap completes the verb. |
| *jesti* hides its *d*. | In *jesti* the *d* is dropped. |
| Some words are too important to follow rules. | These four words are irregular. |
| the ending the noun asks for / wants | the ending that matches the noun |
| your old friend *biti* | the verb *biti* from Lesson 2 |
| Two verbs refuse to behave. / the rebels | Two verbs are irregular. / the irregular ones |
| *ću* is shy, it leans on another word. | *ću* is unstressed and attaches to the preceding word. |
| Words that squeeze / stretch / dance. | Words that lose a vowel / add *-ov-*. |
| Croatian likes / cares about / is strict here. | In Croatian, … (opisati pravilo). |

Dopušteno je i dalje: *copy → match*, *agree with*, *take an ending*, *drop a letter*, *attach to*,
*the ending shows who is speaking*. Zadržava se topao ton prema **korisniku** ("you", "watch out for",
"say it aloud") — zabrana se odnosi samo na personifikaciju riječi, jezika i gramatike.
Isto vrijedi za naslove stranica: "Old friends" → "Words from earlier levels", "The rebels" →
"The irregular plurals".

### 3.8 Jezik
- Standardni hrvatski, ijekavica, `komu` (ne *kome*), `s/sa` po pravilu (sa + s, š, z, ž),
  zarez ispred *a, ali, jer, nego*, nema zareza ispred *i*. Bez kolokvijalizama koje L1–L9 nisu
  koristile (npr. *odmarati* → *odmarati se* ili izbjeći).
- Engleski u `info/opis/tekst`-pravilima; hrvatski **samo** u stavkama, pitanjima za čitanje i
  checkpointu (kao u L4+). Nikad hrvatski naslov usred engleskog objašnjenja (*"Novi glagoli:"*).
- Ne uvodi gramatiku koja dolazi kasnije bez napomene (*dva učenika*, *bude*, *koga*): ili je
  izbjegni ili dodaj jednu rečenicu „take it whole for now, Lesson X explains it".

---

## 4. Specifikacija po lekciji

Za svaku: **što zadržati**, **što dodati**, **što popraviti**. Riječi: prvo iz `vokabular-NN.md`.

### L10 · Yesterday: The Past Tense — *gotovo, vidi `lekcija-10.md`*
- Dodati: nastavak (`o | la | li | lo`), tekst-čitanje, drugi brzina-sprint (infinitiv → particip),
  memorija, kartice s `→ particip`. Pravilo 2 = red riječi + *bilo je* (neutrum).
- Popraviti: dijalog u oba roda; „Module B final" 14 pitanja s po 1 iz L5–L9.
- Zadržati odnos s Grammar 10: negacija perfekta (*nisam gledao*) i *Nisi li…?* ostaju u Grammar 10 —
  Lesson samo najavi.

### L11 · Asking Questions
- Zadržati: kartice upitnih riječi, parovi pitanje↔odgovor, izbor upitne riječi, dijalog kupnje poklona.
- Dodati: nastavak `nastavci: li | -` (verb + li vs. upitna riječ: *Voliš ___ ribu?* → li; *Što ___ voliš?* → -),
  razvrstavanje `LI-PITANJE | UPITNA RIJEČ | ZAR NE?`, upis pretvorbe izjava → li-pitanje (10),
  slaganje 10 pitanja, čitanje „The present mystery" s pitanjima, brzina upitnih riječi (10).
- Popraviti: L5 je već detaljno uveo *li* — L11 p1 i p5 preformulirati kao **ponavljanje + proširenje**
  („You met *li* in Lesson 5 — today it gets company"). Rečenicu „not *je li* from the short *je*…"
  napisati nanovo. „Seven little question words" → osam (ili izbaci *koji*). Dodati *kakav/kakva/kakvo*
  i *čiji* (obećano u L4 preview). *Koliko je gitara?* → *Koliko košta gitara?* (uvesti *koštati → košta*).
  Brojevi 1–20 su u Vocabulary 11 — ovdje samo *dvadeset, trideset* kao passive.

### L12 · Negation
- Zadržati: *ne* + glagol, tablica *nisam/nemam*, dvostruka negacija, restoran-dijalog.
- Dodati: nastavak `nastavci: ni | ne | -` ili razvrstavanje „koja riječ treba *ne*", nastavak za
  *nisam/nemam* (`nastavci: sam | mam | …` nije praktično → radije `izbor`), upis negacija 12 stavki
  (uključi *nisam/nemam/neću* → *neću* je iz Grammar 8, smije), slaganje 10, brzina „positive → negative"
  (`trajanje: 45`, 12 stavki), čitanje „The picky eaters" (Marko ništa ne jede…), memorija *volim↔ne volim*
  parovi ili *sam↔nisam*.
- Popraviti: *rajčica* nije nova (L5) — zamijeni novom riječi (*sir, jaje, krumpir, meso, čaj*). Kartice
  proširiti na 15+ (okusi *slatko, slano, gorko, kiselo* + hrana).

### L13 · The Locative
- Zadržati: motion vs. location tablica, going-or-being razvrstavanje, telefonski dijalog.
- Dodati: kartice 18+ (mjesta iz `vokabular-13.md`: *knjižnica, bolnica, banka, kupaonica, kuhinja,
  hodnik, balkon, krov, kat*), nastavak `nastavci: u | i` (16 stavki, m/n → u, f → i; dodaj 2–3 *na*
  primjera), upis 12, izbor 12 (*u ured / u uredu*), slaganje 10, drugi razvrstavanje `U | NA`
  (*u školi, na tržnici, na trgu, u kinu, na koncertu, na moru, u parku, na plaži*), čitanje „Around
  town" (Ana je u teretani…), brzina lokativ-sprint 12.
- Popraviti: *ljudi* nije mjesto — premjesti u passive. Uvesti *živjeti → živim* na kartici (koristi se
  u drilu). Pravilo 2 = *u* vs *na* + glasovna promjena samo najaviti (Grammar 13).

### L14 · The Dative
- Zadržati: receiver-tablica, „who gets what", giving verbs, božićni kontekst.
- Dodati: kartice 15+ (*dar/poklon, čestitka, kartica, e-mail, rukavice, parfem, knjiga; davati → dajem,
  slati → šaljem, nositi → nosim, kupovati → kupujem, pisati → pišem, pomagati → pomažem*), nastavak
  `nastavci: i | u` (16 stavki: *mam___, brat___, sestr___, djed___, Mark___, An___*), razvrstavanje
  `-I (f.) | -U (m.)`, izbor 12, upis 12 (uključi *pas → psu*, *Ana → Ani*, *Marko → Marku*, *učiteljica →
  učiteljici*), slaganje 10, brzina dativ-sprint 12, čitanje „December gifts", memorija 8–10.
- Popraviti: dijalog rodno neutralan („The generous sibling"; NPC: *Ti si dobar/dobra!* → *Baš lijepo od
  tebe!*). Objasniti da su nastavci isti kao lokativ, drugi posao (jedna rečenica u Pravilu 2).

### L15 · The Instrumental
- Zadržati: company tablica, means without *s*, s-or-no-s razvrstavanje, koncert-dijalog.
- Dodati: **kartice nedostaju potpuno** — 18 riječi (*koncert, kino, kazalište, klub, kafić, večera,
  izlazak, prijevoz, vlak, autobus, tramvaj, auto, bicikl, taksi, mlijeko, šećer, limun, šalica;
  izlaziti → izlazim, putovati → putujem, hodati → hodam, ići → idem*), nastavak `nastavci: om | em`
  (16: *brat___, prijatelj___, sestr___, vlak___, autobus___, Mark___, An___, mlijek___*), izbor 12,
  upis 12, slaganje 10, brzina 12, čitanje „Friday night & train rides", memorija.
- Popraviti: *(gitara) Mladić ___ svira.* → zamijeni (*Pijem čaj ___ .* → *s limunom*). Uvesti *s kim*
  eksplicitno u Pravilu 2. Module C checkpoint 14 pitanja.

### L16 · The Genitive
- Zadržati: tri posla genitiva, *nema* stranica, café-dijalog.
- Dodati: kartice 18+ (iz `vokabular-16.md`: *vrt, vrata, kuhinja, zid, slika, miris, šećer, komad,
  prijedlozi bez, iz, kod, pokraj, od, do, blizu*), nastavak `nastavci: a | e` (16), razvrstavanje
  `BELONGING | PREPOSITION | NEMA` (12 rečenica), izbor 12, upis 12, slaganje 10, brzina 12, čitanje
  „Grandma's house", memorija.
- Popraviti: *auto brata* → *bratov auto* ili *auto mojeg brata*; dodati rečenicu u Pravilo 1: „For people
  Croatian usually prefers the possessive adjective (*bakina kuća*) — the genitive is standard for things
  (*vrata kuće*, *miris kave*)". Brojevi 2–4 + genitiv ostaju u Grammar 16 — samo najava.

### L17 · The Imperative
- Zadržati: tablica tvorbe, *nemoj(te)*, poredak-recept, dijalog upute za put. (Najbolja lekcija druge
  polovice — najmanje posla.)
- Dodati: kartice 18+ (kuhinja + smjerovi iz `vokabular-17.md`, glagoli s **ti-oblikom i imperativom**:
  *uzeti → uzmeš → uzmi!*), nastavak `nastavci: aj | i | j` (16), razvrstavanje `JEDNOM (ti) | GRUPI (vi)`
  (12), izbor 12, upis 12 (ti + vi oblici), slaganje 10, brzina 12 (*ti-oblik → imperativ*), čitanje
  „Coach Zvone" (trener daje naredbe) s pitanjima.
- Popraviti: *dođi/dođite* i *idi/idite* su nepravilni — jedna rečenica u pravilu („learn these two whole").

### L18 · The Conditional
- Zadržati: tablica *bih/bi/bismo*, past-or-dream razvrstavanje, *Htio/Htjela bih*, dijalog grad↔more.
- Dodati: kartice 15+ (*želja, san, milijun, brod, kuća pokraj mora, putovanje, godina, zima, val;
  dobiti → dobijem, ostati → ostanem, zamisliti → zamislim, željeti → želim, moći → mogu*), nastavak
  `nastavci: h | smo | ste | -` na pomoćnom glagolu (*bi___*), izbor 12, upis 12 (particip iz L10 +
  novi pomoćni), slaganje 10, brzina 12, čitanje „The perfect day", memorija *ja↔bih, mi↔bismo…*.
- Popraviti: *„Novi glagoli:"* premjestiti na kartice; izbaciti *___ li radio? — pitam sebe!*; dijalog u
  oba roda (*Gdje bi živio/živjela?* → NPC: *Gdje bi živio ili živjela?* ili *Gdje biste živjeli?*).
  Dodati Pravilo 2: *ako* + prezent/kondicional u jednoj rečenici (kao najava L20).

### L19 · Aspect
- Zadržati: twins kartice, process/done tablica, signalne riječi, „homework interrogation" dijalog.
- Dodati: kartice proširiti na 12 parova (+ *kuhati → skuhati, raditi → napraviti/uraditi, gledati →
  pogledati, pisati → napisati, učiti → naučiti, plivati → otplivati? — NE, koristi samo prozirne
  prefikse: na-, po-, pro-, s-*), nastavak `nastavci: na | po | pro | -` (prefiks kao „nastavak"
  sprijeda — ako mehanika to ne podržava vizualno, koristi `izbor`), razvrstavanje signalnih riječi
  `PROCESS | DONE!` (14), izbor 12, upis 12, slaganje 10, brzina 12, **prezentni primjeri** (svršeni
  prezent = budućnost: *Popijem kavu i idem.*) samo kao passive napomena, čitanje „The letter".
- Popraviti: *Kupovao je marku…* → *Kupovao je poklon u tri trgovine i napokon ga je kupio.*

### L20 · Complex Sentences
- Zadržati: pet veznika, *koji/koja/koje*, final checkpoint po lekcijama, završni dijalog.
- Dodati: kartice 15+ (apstraktne riječi iz `vokabular-20.md`: *uspomena, djetinjstvo, budućnost, jezik,
  glazba, riva, greška; zvučati → zvuči, sjećati se → sjećam se, početi → počnem, misliti → mislim*),
  nastavak `nastavci: i | a | e | u` za *koj___* (16), razvrstavanje veznika po značenju (`UZROK | VRIJEME |
  UVJET | SUPROTNOST`), izbor 12, upis 10 (spajanje rečenica), slaganje 10, brzina 12 (veznik ↔ značenje),
  čitanje „Why I'm learning Croatian" (esej 80–90 riječi) s 6 pitanja.
- Popraviti: „You've known *jer* since Lesson 11" → Lesson 4. *Ako bude sunca* → *Ako je sunčano* /
  *Ako sja sunce* (izbjeći futur II). Dijalog u oba roda (*čuo/čula, počeo/počela, mislio/mislila*).
  Final checkpoint ostaje 20 pitanja (po 1 iz svake lekcije) — dodaj `slaganje` L10 varijantu u oba roda.

---

## 5. Postupak (po lekciji)

1. **Pročitaj** `igre/lekcija-NN.md`, `vokabular-NN.md`, `gramatika-NN.md`, `praksa-NN.md` i
   `lekcija-(NN−1).md` (za warm-up). Zabilježi koje riječi smiješ koristiti (§3.3).
2. **Kopiraj original** u `igre/_bak-prije-prosirenja/lekcija-NN.md` (napravi mapu ako ne postoji).
3. **Napiši** novu datoteku po kosturu §2, koristeći §3 i §4. Postojeći sadržaj zadrži (proširi liste,
   dodaj `info`), nove stranice umetni.
4. **Provjeri sintaksu**: u korijenu projekta `node osvjezi.js`, pa
   ```
   node -e "const s=require('fs').readFileSync('data.js','utf8');const d=JSON.parse(s.slice(s.indexOf('{')).trim().replace(/;$/,''));const L=d.igre.filter(g=>g.cjelina==='Lesson NN');console.log(L.length,'pages');for(const g of L)console.log(g.stranica,g.format,g.stavke.length,'info' in g.meta?'':'<< NO INFO',g.naslov)"
   ```
   Očekivano: 15–17 stranica, nijedna bez `info`, kvote iz §2.
5. **QA lista** (sve mora biti „da"):
   - [ ] svaka stranica ima `info` (35–60 riječi) i `opis` (osim `tekst`)
   - [ ] brzina ≥ 10, nastavak ≥ 12, izbor ≥ 10, upis ≥ 10, slaganje ≥ 10, razvrstavanje ≥ 12, checkpoint = 12 (14 modulni)
   - [ ] postoji 1 `nastavak`, 1 čitanje s `tekst:`, 1 dijalog, 2 pravila s `[...]`
   - [ ] u `izbor`/`provjera` prvi odgovor je točan; nijedan distraktor nije slučajno također točan
   - [ ] ni jedna stavka ne sadrži `|` u tekstu; `upis` odgovori bez završne točke
   - [ ] nema riječi izvan dopuštenog vokabulara bez `Passive words`
   - [ ] perfekt/kondicional: korisnik ima muški i ženski oblik
   - [ ] warm-up koristi isključivo gradivo lekcije N−1
   - [ ] `spajanje`/`memorija` sa slikama koriste samo riječi koje postoje u `slike/`
   - [ ] hrvatski: zarezi ispred *a/ali/jer*, *s/sa*, ijekavica, bez kolokvijalizama
   - [ ] reward stranica točno najavljuje što je u Vocabulary/Grammar/Lesson N+1 (provjeri u datotekama)
6. **Zvuk**: nove hrvatske rečenice/riječi nemaju MP3. Zvuk se veže na tekst stavke (mala slova, bez
   završne interpunkcije; kartice s `a / b / c` se dijele na pojedine oblike). Nakon `node osvjezi.js`
   pokreni (u korijenu projekta, `NN` = broj lekcije) — dodaje sve što nedostaje u `recenice.txt` /
   `rijeci.txt`, bez duplikata:
   ```
   node -e "const fs=require('fs');const s=fs.readFileSync('data.js','utf8');const d=JSON.parse(s.slice(s.indexOf('{')).trim().replace(/;$/,''));const L=d.igre.filter(g=>g.cjelina==='Lesson NN');const norm=t=>t.normalize('NFC').toLowerCase().trim().replace(/\s+/g,' ').replace(/[\s.!?…]+$/,'');const sent=new Set(),words=new Set();for(const g of L){for(const st of g.stavke){let c=[];if(g.format==='dijalog')c=st.slice(1);else if(['slaganje','kartice','parovi','memorija','brzina'].includes(g.format))c=[st[0]];for(let x of c){if(/___|\(|→/.test(x))continue;for(const p of x.split(' / ')){if(norm(p) in d.zvukovi)continue;(/[ .!?,]/.test(p.trim())?sent:words).add(p.trim());}}}}const rec=fs.readFileSync('recenice.txt','utf8').split(/\r?\n/).map(norm);const rij=fs.readFileSync('rijeci.txt','utf8').split(/\r?\n/).map(norm);const ns=[...sent].filter(x=>!rec.includes(norm(x))),nw=[...words].filter(x=>!rij.includes(norm(x)));console.log('sentences',ns.length,'words',nw.length);if(ns.length)fs.appendFileSync('recenice.txt','\r\n'+ns.join('\r\n')+'\r\n');if(nw.length)fs.appendFileSync('rijeci.txt','\r\n'+nw.join('\r\n')+'\r\n');"
   ```
   Zatim na Windowsu pokreni `generiraj-zvuk.ps1` (edge-tts, preskače već generirano) i ponovno
   `node osvjezi.js` da se novi MP3-ovi upišu u `data.js`. Reciklirane rečenice (§3.6) drže taj popis kratkim
   (L10: 25 rečenica + 1 riječ).
7. **Regeneriraj** `data.js` (`node osvjezi.js`), otvori app, prođi lekciju klikom (barem nastavak, upis,
   dijalog, provjera) i tek onda prelazi na sljedeću lekciju.

Redoslijed rada: L10 (ogledni) → L15 i L20 (modulni checkpointi) → L11–L14 → L16–L19.
Jedna lekcija po sesiji/poruci je realan opseg (≈ 300 redaka md-a).
