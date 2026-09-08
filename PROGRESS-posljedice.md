# Progress — što je napravljeno i što još treba

Stranica *Progress* je ugrađena u `index.html`. Ovaj dokument je uz nju: što točno stoji
u kodu, što treba pokrenuti u bazi, i što je ostalo za odlučiti.

---

## 1. Prije nego išta proradi: pokreni migraciju

`supabase-progress-drustveno.sql` → Supabase → **Database › SQL Editor › New query** →
zalijepi cijeli sadržaj → Run. Pokreće se **jednom**, i to poslije `supabase-schema.sql`.

Ne dira postojeće tablice — jedino proširuje okidač `handle_new_user` da svaki novi
korisnik odmah dobije svoj javni redak. Postojećim korisnicima ga dodaje na kraju skripte.

Migracija je prije isporuke puštena na pravom PostgreSQL-u i provjerena scenarijem s tri
korisnika: nitko ne vidi ništa dok veza ne postoji, zahtjev se pošalje i prihvati, tada se
otvore oba smjera, tuđi bodovi se ne mogu prepisati, veza se ne može sama sebi dodijeliti,
raskid zatvara pristup u istoj sekundi, a pretraga po ID-u staje na tridesetoj dnevno.

**Dok migracija nije pokrenuta**, tab *You* radi normalno (ne treba mu baza), a tab
*Friends & groups* pokazuje „This part could not be loaded“ s gumbom za ponovni pokušaj.

---

## 2. Što stranica radi

### Tab You

Otvorena je **svakome tko ima račun** — s pretplatom ili bez nje, s tisuću bodova ili s
jednim. Nema praznog zida ni skraćene verzije: tko god se prijavi, vidi sve što o sebi ima.

- četiri valutne pločice, svaka s trakom i rečenicom „još 19 → Lesson 10“
- streak, riječi u rječniku, odigrane vježbe, bodovi iz mini igara
- mreža svih cjelina: 20 razina × 5 vrsta, s postotkom, omjerom i stanjem
  (netaknuto / u tijeku / sve pokupljeno / zaključano, uz razlog zaključanosti)
- klik na kvadratić otvara ladicu s vježbama te cjeline: naslov, bodovi, traka,
  oznaka „not played“
- klik na vježbu ili na mini igru vodi ravno u nju, kroz potvrdu
- „Worth going back to“: šest vježbi koje drže najviše bodova, ali samo u cjelinama u
  kojima si stvarno bio, s prednošću onima koje si načeo
- točkice dailyja (klik vodi u taj dan) i popis mini igara

### Tab Friends & groups

Jedan popis. Prijatelj koji je prihvatio zahtjev i čovjek kojemu plaćaš pretplatu stoje
jedan pored drugoga, bez značaka i bez filtriranja.

- tvoj ID (pet znakova, bez nule i slova O) i polje za nadimak
- dodavanje tuđim ID-om, zahtjevi na čekanju u oba smjera
- tablica: LP · VP · GP · PP · ukupno · dijeli li puni progres · kad je zadnji put upisao
- redak čovjeka koji je progres postavio na javno otvara se u istu mrežu, samo za gledanje
- prekidač „Points only / Full progress“ za sebe; *points only* je zadano

### Potvrde

Prije odlaska u vježbu piše da se najbolji rezultat čuva i da slabiji pokušaj ne može
oduzeti bodove. Prije mini igre piše koliko je iz nje već naplaćeno — a ako je sve,
kaže da je isplata jednokratna i da je ostalo samo igranje radi igranja.

---

## 3. Što je promijenjeno u index.html

Devet zahvata, svaki sidren na točan tekst. Sigurnosna kopija prije zahvata:
`index.html.bak-prije-progressa`.

| Gdje | Što |
|---|---|
| `<style>` | blok stilova za stranicu, sve preko postojećih tokena (radi u svih šest tema) |
| `<nav>` | nova stavka **Progress**, prije „User account“ |
| zaglavlje | valute su sada klikabilne i vode na Progress |
| `oznaciNav` | `progress: 'progress'` |
| `idi()` | vrata: traži račun, **nikad** pretplatu; i nova grana `renderProgress()` |
| glavni kod | ~700 redaka: crtanje obaju tabova, ladica, potvrde, društveni sloj |
| `posaljiProgress` | uz progres se upisuju i javni bodovi |
| `ucitajProgress` | odjava briše sve što smo znali o tuđim ljudima |

Ono što je bilo na *User account* namjerno je ostavljeno gdje jest.

### Tri stvari koje vrijedi znati o tom kodu

**Bodovi se računaju na jednom mjestu.** Progress nema vlastitu kopiju formule — zove
`valute()`, `prag()` i `otkljucano()` kao i naslovnica. Kad se sutra promijeni težina
Testa ili dailyja, mijenja se na jednom mjestu i stranica se sama poravna.

**`KES_VAL` obuhvaća cijelo crtanje.** Mreža poziva `otkljucano()` stotinu puta, a svaki
poziv bez keša prolazi kroz svih 1198 vježbi. `renderProgress()` postavlja keš na početku
i gasi ga u `finally`, isto kao `renderMain()`.

**Javni bodovi se pišu samo kad se promijene.** `posaljiJavneBodove()` pamti zadnja četiri
broja i preskače upis ako su isti, pa svaka spremljena vježba ne povuče i drugi upis.

---

## 4. Kako je riješena privatnost

**E-mail ne izlazi iz vlastitog računa.** Nikad, ni prijatelju, ni onome tko plaća.
Jedini javni podatak je nadimak, i to slobodan tekst koji čovjek sam bira.

**ID se ne da pretraživati botom.** Traženje ide kroz `nadji_po_id()`, koja vraća samo
nadimak i stanje veze, nikad uuid, i staje na trideset upita dnevno. Bez toga bi netko
mogao prošetati prostorom od 45 milijuna ID-ova i pokupiti imena.

**Tuđe se ne čita izravno.** Nad `javni_bodovi` namjerno ne postoji politika koja bi
drugima dala `select`. Sve ide kroz `moji_ljudi()`, koja sama odlučuje što smije van:
bodovi uvijek, razrada po cjelinama samo ako je čovjek progres postavio na javno. Da
politika postoji, razrada bi curila i onima koji su je držali zatvorenom — RLS radi na
razini retka, a ne stupca.

**Veza je jednosmjeran red.** Prijateljstvo je uzajamno (dva reda), odnos platitelja i
korisnika koda nije. Prihvaćanje otvara oba smjera odjednom, jer je onaj tko je poslao
zahtjev time već pristao. Raskid briše oba reda i pristup nestaje odmah.

---

## 5. Što je ostalo

**Kodovi i naplata.** Tablica `veze` već ima `izvor='kod'`, `kod` i `vrijedi_do`, i
`moji_ljudi()` ih pokazuje kao i sve ostale. Nedostaje samo ono što ih stvara: kupnja
paketa i unos koda. Te redove upisuje service-role (Netlify funkcija), pa za njih
namjerno nema klijentske politike. Kad kod istekne, čovjek nestane s popisa i zadrži sve
što je zaradio — bez ijednog dodatnog retka koda.

Jedna stvar koju treba imati na umu kad naplata dođe: **paket kodova mora biti zaseban
proizvod**, a ne dodatak na aktivnu pretplatu. Inače onaj tko plaća drugima mora kupiti
pretplatu koju neće koristiti.

**Pristanak pri unosu koda.** Nadimak će kod dobrog dijela ljudi biti ime i prezime, pa
kad se kodovi uvedu, unos mora reći što se događa: *„Unosom ovog koda onaj tko ga je
kupio vidjet će tvoj nadimak i broj bodova dok kod vrijedi. E-mail ne vidi nitko.“*

**`privacy.html` i `terms.html`** treba dopuniti prije nego ovo izađe: što je javni ID,
tko vidi nadimak, kako se veza raskida, i da brisanje računa briše i veze i javne bodove.

**Blokiranje.** `veze` ima stanje `'blokirano'` i `posalji_zahtjev()` ga poštuje (blokiranom
se ne javlja da je blokiran), ali u sučelju još nema gumba. Vrijedi ga dodati prije nego
popis ljudi postane veći od nekoliko desetaka.

**Poruke.** Slobodan tekst među korisnicima znači moderaciju, prijave, blokiranje i pravnu
odgovornost — uključujući maloljetnike, kojih će u aplikaciji za jezik biti. Ako se ikad
radi, prvi korak su gotove poruke bez slobodnog unosa („bravo“, „stigao sam te“): nema što
moderirati, a društveni osjećaj postoji.

---

## 6. Što bih još odlučio

1. **Abeceda ID-a.** Sada je bez `0` i `O` (34 znaka, 45,4 milijuna kombinacija). `1/I/L`,
   `5/S`, `8/B` i `2/Z` se i dalje griješe pri prepisivanju. Bez njih ostaje 29 znakova i
   20,5 milijuna — i dalje višestruko dovoljno, a kod se ne može krivo pročitati.
2. **Tko piše bodove.** Sada ih piše klijent, kao i sav ostali progres. Za usporedbu među
   prijateljima to je u redu; ako ljestvica ikad ponese nagradu, računanje mora preseliti
   u Edge Function koja čita `progress` i sama zbraja.
3. **Verzija sadržaja.** Uz bodove se sprema i `PODACI.generirano`. Kad dodaš gradivo,
   isti broj bodova znači drugi postotak — taj podatak omogućuje da se to primijeti, ali
   stranica ga još nigdje ne prikazuje.

---

## 7. Datoteke

| Datoteka | Što je |
|---|---|
| `supabase-progress-drustveno.sql` | migracija, pokreće se jednom |
| `index.html` | stranica je unutra |
| `index.html.bak-prije-progressa` | stanje prije zahvata |
| `Claude outputs/test-progress.html` | kopija aplikacije s izmišljenim rezultatima — otvara Progress bez prijave, za pregled |
| `Claude outputs/test-ljudi.html` | isto, ali s lažnim popisom ljudi, za pregled taba Friends & groups |
| `prijedlog-progress.html` | prvi mockup; prestignut, može se obrisati |
| `Claude outputs/_radni-otpad/` | blokovi koda i skripta kojom je zakrpa primijenjena; može se obrisati |
