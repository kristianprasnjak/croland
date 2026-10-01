# Upute za razinu 20 (izvuceno doslovno iz izvornih dokumenata)

Ovo je izvadak, ne sazetak: svaki odjeljak ispod prepisan je bez izmjena. Izvorni dokumenti su u korijenu projekta; otvori ih samo ako ti ovdje nesto nedostaje.

---
## IZ: UPUTE-razine-13-20-nocni.md (cijeli dokument)

# Noćni rad: razine 13–20 (Lesson, Grammar, Practice, Test)

Napisano 29.09.2026. Brief za Claude Code, koji radi **jednu cjelinu po pozivu** (pokreće ga `preradi-vokabular.ps1`, druga faza, nakon što su gotove Vocabulary 1–20). Svaki poziv je nova sesija, pa sve što treba znati piše ovdje i u datotekama na koje ovaj dokument upućuje.

## Cilj

Razine 13–20 danas su kosturi (4–6 KB po datoteci). Treba ih dovesti na gustoću, strukturu i ton razina 10–12, koje su gotove i pregledane.

Redoslijed po razini: **Lesson → Grammar → Practice → Test**. Vocabulary N je već prerađen u prvoj fazi.

## Što čitati prije pisanja

**Od v5 (30.09.) jedna sesija radi cijelu razinu:** Lesson → Grammar → Practice → Test, redom, i nakon svake cjeline odmah upisuje njezin `GOTOVO` redak. Ako neka cjelina razine već ima `GOTOVO`, preskoči je.

1. **Upute:** `_radno/upute-razina-N.md` — doslovni izvadak svih odjeljaka koji vrijede za razinu N (ovaj dokument, `UPUTE-prosirenje-lekcija-10-20.md` § 1–3, § 4 za tvoju razinu i § 5, `VODIC` C2–C4 i F, `REVIEW` § 3–4, redak iz `popis lekcija.md`). Pročitaj ga **jednom, cijelog**, na početku sesije. Izvorne dokumente otvaraj samo ako ti u izvatku nešto nedostaje.
2. **Uzori** (gotovi, pregledani), prije pisanja svake cjeline:

| Cjelina | Obavezni uzor | Drugi uzor (za raznolikost) |
|---|---|---|
| Lesson | `igre/lekcija-12.md` | `igre/lekcija-11.md` |
| Grammar | `igre/gramatika-12.md` | `igre/gramatika-11.md` |
| Practice | `igre/praksa-12.md` | `igre/praksa-11.md` |
| Test | `igre/test-12.md` | `igre/test-11.md` |

3. `igre/vokabular-NN.md` iste razine (riječi razine) i izvorni kostur cjeline koju pišeš. Cjeline iste razine koje si u ovoj sesiji već napisao imaš u kontekstu — ne čitaj ih ponovno.

**Ako datoteka cjeline već izgleda proširena** (prekinut raniji pokušaj, npr. zbog limita), ne počinji ispočetka: pročitaj je, provjeri po pravilima i dovrši.

**Štednja bez gubitka kvalitete:** svaku datoteku zapiši jednim `Write` kad je gotova (ne gradi je nizom sitnih izmjena); `data.js` (1,9 MB) nikad ne otvaraj — za provjeru služi `provjeri-cjelinu.js`; dnevnik ne čitaj, samo mu dopiši odjeljak na kraj.

## Pravila koja proizlaze iz pregleda razina 1–12 (obavezna)

1. **U bodovanom zadatku (točan odgovor ili distraktor) smije biti samo gramatika koja je uvedena** do te razine ili na toj stranici. Pasivne riječi u tekstovima su u redu, ali ih navedi u napomeni *Passive words*.
2. **Distraktor mora biti stvarno netočan hrvatski.** Ne nudi kao grešku gramatičnu rečenicu s drugim redom riječi ili naglašenim oblikom (*Konobar vidi nas*, *Sutra hoću plivati* su bili takve greške).
3. Klitike: *je, sam, ću, ga, mu, se, li…* stoje na drugom mjestu, i iza veznika *jer, da, ako, kad* (*jer je danas*, ne *jer danas je*).
4. Perfekt i kondicional uvijek nude **oba roda** polaznika; za skupinu samih žena *-le*, za srednji rod množine *-la*.
5. Vid: za jednokratni završeni događaj svršeni glagol (*stići*, ne *stizati*) — i prije L19, u primjerima.
6. **Dijalog reagira na izbor**: barem jedna replika po dijalogu komentira ono što je igrač odabrao. NPC ne smije pretpostaviti rod igrača.
7. **Practice je raznolik**: uz tekstove s pitanjima barem jedna zagonetka (odgovor se izvodi, ne čita) i barem jedan tekst iz stvarnog svijeta (oglas, poruka, jelovnik, karta, raspored, recept…). Priče moraju biti logične i dosljedne između teksta, pitanja i `poredak` stranice.
8. Svaka riječ koju Lesson/Practice uvodi kao aktivnu mora biti na karticama `vokabular-NN.md`. Ako fali, **dodaj je na postojeću stranicu kartica** u `vokabular-NN.md` (ne mijenjaj druge stranice tamo).
9. Test ima stranicu *From the earlier levels* i pokriva cijelu razinu; L15 i L20 su modulni testovi (Modul C, završni).

## Što smiješ mijenjati

Samo datoteku cjeline koju radiš (`igre/lekcija-NN.md`, `gramatika-NN.md`, `praksa-NN.md` ili `test-NN.md`), iznimno kartice u `igre/vokabular-NN.md` (pravilo 8), plus dnevnik i status. Prije pisanja spremi kopiju izvorne datoteke u `igre/_bak-prije-prosirenja/` ako tamo još nije. Zaglavlje (`# Naslov`, `cjelina: …`) ostaje. Postojeći naslovi stranica (`## …`) koji ostaju istog formata zadržavaju točan naslov (bodovi su vezani uz njih).

## Provjera prije kraja (za svaku cjelinu)

1. `node osvjezi.js` prolazi bez greške.
2. `node provjeri-cjelinu.js igre/<datoteka>.md` — nema GRESAKA; svako UPOZORENJE pogledaj i ispravi ili u dnevniku obrazloži zašto je u redu.
3. **Pročitaj svoj tekst još jednom, stavku po stavku,** i prođi pravila 1–7: skripta hvata samo mehaniku (format, prazna polja, broj stranica, očite klitike); gramatiku, distraktore, rod, vid, dijaloge i logiku priče provjeravaš ti.
4. Dopiši u `NOCNI-dnevnik-13-20.md` odjeljak `## <Cjelina> N`: broj stranica, što je dodano u vokabular, odluke koje si donio sam, i sve što treba ljudski pregled.
5. **Tek na kraju** dopiši točno zadani redak (npr. `GOTOVO L14`) u `vokabular-preradba-status.txt`, pa prijeđi na sljedeću cjelinu razine.

## Kad nešto nije jasno

Nitko neće odgovoriti. Odluči razumno, drži se uzora iz razina 10–12, zapiši odluku u dnevnik i dovrši cjelinu.

---
## IZ: UPUTE-prosirenje-lekcija-10-20.md

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

---
## IZ: VODIC-izrada-i-prijevod.md

### C2. Formati vježbi (18 mehanika)

Broj stranica u cijelom tečaju: tekst 290 · izbor 175 · upis 151 · kartice 131 · razvrstavanje 91 · slaganje 77 · parovi 75 · brzina 63 · nastavak 41 · dijalog 32 · memorija 32 · poredak 24 · provjera 20 · spajanje 11 · baloni/slova 6 · pamti 3 · zid 1.

Sintaksa je u `UPUTE-prosirenje-lekcija-10-20.md`, odjeljak 1. Najvažnije:

- `izbor`: `- pitanje | točan | krivi | krivi`, prvi odgovor je uvijek točan (miješa se pri prikazu).
- `nastavak`: `nastavci: m | š | -` i `- Rečenica s ___ | gloss | m`. Crtica znači „bez nastavka“.
- `razvrstavanje`: `stupci: A | B` i `- stavka | A`.
- `tekst`: `[riječ]` u rečenici je polje za upis, a `[je/jest]` prima oba oblika. `- tab: a | b | c` je redak tablice.
- Znak `|` ne smije biti u tekstu stavke.

Gustoća koja se pokazala dobrom (L1–L9, na nju su podignute L10–L20): `info:` na **svakoj** stranici, ≥ 10 stavki po drilu, zagrijavanje na brzinu s 10–12 stavki, jedan `nastavak` i jedan tekst za čitanje po lekciji, checkpoint s 12 pitanja, napomena „passive words“ uz tekstove i **oba roda polaznika** u oblicima koji ih razlikuju.

### C3. Bodovanje

`osvjezi.js`, tri sastojka tim redom:

1. **Baza po formatu** (tekst 4, kartice 5, izbor 6, upis 7, provjera 10…).
2. **Količina sadržaja** kao uska korekcija, najviše ±20 %.
3. **Razina** kao glavni pokretač, geometrijski ×1.11 po razini (R10 ×2.56, R20 ×7.26).

Tekst-stranica **bez ijedne praznine vrijedi 1 bod**. Prije je klik na „Done reading“ vrijedio kao vježba. Zato svaka stranica s pravilom završava odlomkom `**Now you write them.** … [x] … [y] … [z]`.

Bodovi se vode u četiri valute (LP, VP, GP, PP), svaka sa svojom bojom. Dnevni izazov se ne skalira i uvijek vrijedi 5 + 5 + 5 + 5.

Bodovi su vezani uz `sortkljuc` i naslov vježbe. **Ne mijenjaj naslove i redoslijed bez potrebe**, inače se osvojeni bodovi i ocjene revizije odvoje od vježbe.

### C4. Pravila kvalitete sadržaja (naučena na greškama)

1. **Krivi odgovor mora biti netočan sam po sebi**, a ne samo izbjegavajući ili pogrešan u kontekstu. Primjer: „Dunav je najduža rijeka u Africi.“
2. **Oblik odgovora ne smije odati točan.** Kad je 63 % točnih odgovora počinjalo sa „Znači,“, zadaci su se rješavali bez čitanja. Za svako površinsko obilježje (početak, duljina, upitnik, prvo lice) izbroji koliko puta ga ima samo točan odgovor. **Sve iznad ~33 % je trag koji se može iskoristiti.** Oznaku stavi na 2 od 3 opcije, neovisno o točnosti.
3. Replike igrača po mogućnosti **rodno neutralne**. Gdje to nije moguće, ponudi oba roda.
4. Paradigme idu u tablicu, nikad u odlomak. U tablicama koristi `(noun)`, a ne `[noun]`, jer su uglate zagrade polja za upis.
5. Dugi tekst se ne čita do kraja, pa odlomak s podebljanom najavom postaje odjeljak koji se otvara klikom (kad stranica ima ≥ 2 odjeljka i ≥ 400 znakova).
6. **Blobby (maskota) ima zapisan glas** (`blobby-glas.md`), doslovan popis njegovih rečenica. Lik ostaje dosljedan kroz 20 razina i kroz više ljudi ili sesija koje pišu.
7. `spajanje` (slika ↔ riječ) smije koristiti samo riječi za koje slika **postoji**. Provjeri prije pisanja i ne koristi format ako ih nema barem 8.
8. Standardni jezik: srbizmi i nestandardne riječi dobivaju standardnu istoznačnicu i jasnu napomenu (`foka` → `tuljan`), a razgovorno se ne označava kao pogrešno.

## Dio F — Kratki kontrolni popis za bilo koju novu stranicu

- [ ] Sadržaj u `.md`/`.jsonl`, generator u Nodeu, generirane datoteke označene „ne uređivati“.
- [ ] Mediji s ključem u imenu datoteke, NFC, WebP 512px.
- [ ] Build po allowlisti u `dist/`, deploy kroz Actions, `.nojekyll`.
- [ ] Plaćeni sadržaj nikad u javnom dijelu, s provjerom u buildu.
- [ ] Kontrolni popis za backend iz A5.
- [ ] Tri rasporeda (mobitel / tablet / računalo) u jednom CSS bloku, zajednički stupac, `scrollbar-gutter: stable`.
- [ ] Alat za pregled i ocjenjivanje sadržaja prije masovnih izmjena.
- [ ] `SETUP.md` za korake s računima, brief-dokumenti za Claudea, memorija za pravila koja nisu vidljiva iz koda.
- [ ] Komentari s „zašto“, zastarjeli dokumenti označeni, radni otpad izvan korijena.

---
## IZ: REVIEW-razine-L1-L12.md

## 3. Obrasci kroz cijeli raspon

### 3.1 Kostur je uvijek isti

Svaka razina ima isti niz: warm-up brzina → kartice → parovi → stranica s pravilom → izbor → nastavak → upis → slaganje → dijalog → provjera. Vocabulary: 3–5 kartica, spajanje, parovi, memorija, 2–3 brzine, slova, 2 upisa. Practice: 3–5 tekstova s pitanjima, zagonetka, poredak, baloni.

Predvidljivost pomaže učenju, ali od L6 nadalje ubija znatiželju. Prijedlozi koji ne traže nove formate:
- **Skratiti Vocabulary** na 8–10 stranica i zamijeniti dio prepoznavanja proizvodnjom u kontekstu (upis u rečenicu umjesto izolirane riječi).
- **Promijeniti redoslijed Practice stranica** od razine do razine (npr. zagonetka prva, tekst kao rješenje).
- **Jedan „događaj“ po razini**: nešto što se pojavi samo jednom (karta u L8 je upravo to). L1–L4 takav događaj nemaju.

### 3.2 Dijalozi bez posljedica

Svaki dijalog ima dva ispravna odgovora i NPC nastavlja isto bez obzira na izbor. Tri puta NPC čak odgovara na nešto što igrač nije rekao (P2 *umoran*, L6 taksi, P9 golman). Jeftin popravak: u svakom dijalogu od L5 nadalje jedan izbor koji NPC stvarno komentira (*Ne, hvala, ne volim ribu.* → *Šteta, riba je danas odlična!*).

### 3.3 Slušanje i govor

- Nema zadatka u kojem se prvo sluša pa odgovara (diktat, „tap what you hear“). Zvuk je nagrada, ne ulaz.
- Govor je samo poziv „say it out loud“. Extras „Listen Read Write Speak“ ima mikrofon, ali bez bodova i izvan tečaja.
- Izgovor: *č/ć*, *dž/đ*, *ije/je* i naglasak se nigdje ne objašnjavaju. L0 kaže „don't try to pronounce them yet“, a L1 pretpostavlja da je to riješeno.

Najmanji korak s najvećim učinkom: format **„slušaj i složi“** (zvuk bez teksta → pločice) postojećim `slaganje` stavkama, i jedna stranica o *č/ć* i *dž/đ* u L1 ili L2.

### 3.4 Ponavljanje

Dobro: warm-up brzina s prethodne razine, „From the earlier levels“ u testovima od T2, „Words from earlier levels“ u V9–V12, kontrolna točka Modula B. Nedostaje: ponavljanje onoga što je **ovaj** učenik promašio. Mini igre imaju zajednički popis promašaja (`CL.zaPonoviti`), ali on ne ulazi u lekcije.

### 3.5 Gradivo prije vremena

Pasivne riječi navedene na vrhu teksta su u redu, a plutajući rječnik i AI pomoć to dodatno pokrivaju. Problem je samo kad se neuvedeni oblik **boduje**: L7 *dva učenika*, L9 *u svom klubu*, *svoga brata*, G6 perfekt *je vidjela*. Pravilo za ubuduće: ako je oblik u točnom odgovoru ili distraktoru, mora biti uveden ili izbačen.

---

## 4. Otvoreno od 17.09. i novo

**I dalje otvoreno iz `NELOGICNOSTI-L0-P12.md`:**

| Gdje | Što | Prijedlog |
|---|---|---|
| `gramatika-04:221` | *ali dom je topao* bodovano kao greška | maknuti kao distraktor |
| `gramatika-06:282`, `test-06:341` | *Konobar vidi nas* bodovano kao greška | distraktor *Konobar vidi me* ili *Nas konobar vidi* |
| `gramatika-08:229,232` | *Sutra hoću plivati*, *Hoćemo putovati* kao greške | drugi distraktor |
| `gramatika-09:175` protiv `:195`, `lekcija-09:251-252`, `test-09:198` | *svoj/moj* uz *ja/ti* | prihvatiti oba ili maknuti ja/ti stavke |
| `praksa-07:132` protiv `:146` | Ivan i Luka „naši igrači“ / „novi učenici“ | uskladiti poredak s tekstom |

**Novo u ovom pregledu:**

| Gdje | Što |
|---|---|
| `lekcija-10`, `gramatika-10` | participi *-le* (ž. mn.) i *-la* (s. mn.) nisu uvedeni |
| `lekcija-07:94` | *dva [učenika]* bez objašnjenja paukala |
| `lekcija-09:251,253`, `gramatika-09:194` | lokativ i dugi akuzativ u drilu |
| `lekcija-09:290` | *u naš park* umjesto *u našem parku* |
| `praksa-11:64` | *Jer danas je* → *Jer je danas* |
| `vokabular-11:65` | *tisuću* → *tisuća* |
| `lekcija-08:124`, `praksa-08:243` | *stizati* umjesto *stići* |
| `praksa-06:91` | izgubljeni pas kojeg vlasnik vidi svaki dan |
| `lekcija-06:200-202` | taksi / crveni auto |
| `praksa-09:225` | „trebamo golmana“, a Marko je golman |
| `praksa-09:10` | „plural comes in Lesson 10“ → L7 |
| `praksa-09` poredak | *Čiji je to klub?* ≠ tekst |
| `praksa-08:208,210` | sortiranje s rečenicama kojih nema u tekstu |
| `praksa-10` dijalog | *Nisam jeo pizzu* samo u muškom obliku |
| `praksa-02` dijalog | *Jesi li umoran?* i kad je igrač Ana |
| `vokabular-07` p10 | *-ovi* riječi kao IZNIMKA, u G7 zaseban stupac |
| `vokabular-09` p3 | „Ten new verbs“, a ima ih dvanaest |
| `test-01` | *muzika* nije uvedena |

---

---
## Redak razine 20 iz popis lekcija.md

# Tečaj — 20 razina
| 11 | **Asking Questions** — *li*, upitne riječi, *zar ne?* | **Presents & Questions** — **55 riječi** · upitne riječi, pokloni, **brojevi 1–20**; 10 glagola | **Questions** — tri načina pitanja — **+ *koji / kakav / čiji*** | **The Present Mystery** — The present · The mystery · The quiz show | **Pitanja i brojevi** · 18 min · 70 % | Koliko godina ima tvoj brat? |
| 20 | **The Grand Finale** — *jer, da, ako, kad, dok, iako* + *koji* | **Memories & Big Sentences** — **55 riječi** · uspomene, apstraktne imenice *budućnost, djetinjstvo, iskustvo, briga, cilj* | **Complex Sentences** — sve zajedno, pravilo zareza — **+ *da*-rečenice i *koji* u ostalim padežima** | **The Summer I Remember** — The summer I remember · If it's sunny · Why I'm learning Croatian | **Završni test** · 40 min · 75 % | Učim hrvatski jer volim jezik koji zvuči kao glazba. |
