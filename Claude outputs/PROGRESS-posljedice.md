# Stranica Progress — što donosi i što lomi

Prateći dokument uz `prijedlog-progress.html` (mockup). Podijeljeno na ono što je
besplatno, ono što traži bazu, i ono što traži odluku prije koda.

---

## 1. Što mockup pokazuje

Tri taba na jednoj stranici:

**You** — četiri valutne pločice s trakom do sljedećeg praga („još 16 → Grammar 9“),
sitne brojke (streak, riječi, odigrane vježbe, mini igre), mreža 20 razina × 5 vrsta,
ladica s pojedinačnim vježbama, popis „vrijedi se vratiti“, točkice dailyja, mini igre.

**Group** — tvrtka koja je kupila kodove: koliko mjesta, tko ih je iskoristio, njihovi
bodovi. Redci onih koji su progres postavili na javno se otvaraju u istu mrežu.

**Friends** — tvoj javni ID (`K7F2M`), dodavanje po ID-u, zahtjevi na čekanju, popis
prijatelja, i prekidač „što drugi vide o meni“.

Klik na vježbu otvara potvrdu prije odlaska u nju. Tekst potvrde nosi ono što se inače
mora pogađati: *najbolji rezultat se čuva, slabiji pokušaj ne može oduzeti bodove*.

---

## 2. Tab „You“ ne traži ništa novo

Sve što ta stranica pokazuje već postoji u `PROGRESS`-u i u `data.js`. Nema migracije,
nema novog stupca, nema Edge Functiona. Konkretno u `index.html`:

- `idi()` dobiva granu `'progress'`, nav dobiva `<a data-view="progress">`
- nova `renderProgress()` — otprilike 250–300 redaka, sve funkcije koje joj trebaju
  (`valute`, `prag`, `otkljucano`, `maksCjeline`, `osvojenoCjeline`, `najbolji`,
  `streakNiz`, `miniBodovi`, `brojRijeci`) već postoje i ne mijenjaju se
- mali modal za potvrdu — po uzoru na `prikaziModalPrijava`

Tri stvarne posljedice unutar aplikacije:

**Nav je pun.** Sedam stavki već puca u dva reda oko 1150 px; osma to zaključava. Tri
izlaza: (a) valute u zaglavlju postaju klikabilne i vode na Progress, a u navu stavka
postoji samo na mobitelu (tamo je izbornik okomit i ima mjesta); (b) kratice preko
`data-kratko` i na desktopu; (c) Progress zamjenjuje „User account“ u navu, a račun se
otvara klikom na e-mail unutar Progressa. Moja preporuka je (a) — valute su ionako
prirodno mjesto na koje čovjek klikne kad se pita „koliko imam“.

**„User account“ ostaje poluprazan.** Četiri valutne pločice, broj odigranih vježbi,
riječi i streak s Accounta se sele ovamo. Accountu ostaje e-mail, pretplata, odjava,
privatnost — što je zdravije, jer je to administrativna stranica, ne izlog.

**`KES_VAL` mora obuhvatiti cijelo crtanje.** Mreža poziva `otkljucano()` stotinu puta,
a svaki poziv bez keša prolazi kroz cijeli `IGRE` (1198 vježbi). Isti obrazac kao u
`renderMain()`: `KES_VAL = valute()` na početku, `finally { KES_VAL = null; }` na kraju.
Bez toga se crtanje mjeri u sekundama na slabijem telefonu.

---

## 3. Tuđi bodovi — tu je pravi rez

### 3.1 Server danas ne zna koliko tko ima bodova

Ovo je najvažnija rečenica u dokumentu. Bodovi se **računaju u pregledniku**, iz
`data.js` i `PROGRESS.vjezbe`. U bazi stoji samo jsonb s najboljim rezultatima po
vježbi. Ljestvica bilo koje vrste traži da broj negdje postoji kao broj.

Dva puta:

**(a) Proširiti RLS na `progress`** tako da prijatelj smije čitati tuđi red. Loše: red
nosi i `postavke`, `ime`, `savjeti`, `mini_igre`, `pokrenute`. Postgres RLS radi na
razini retka, ne stupca unutar jsonb-a — ili vidiš sve ili ništa. Ovo bih izbjegao.

**(b) Zasebna tablica `javni_bodovi`** (preporuka):

```sql
create table public.javni_bodovi (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nadimak text,
  javni_id text unique,
  lp int not null default 0, vp int not null default 0,
  gp int not null default 0, pp int not null default 0,
  progres_javan boolean not null default false,
  sazetak jsonb,                    -- po cjelini: {"Vocabulary 7": [77, 191], ...}
  verzija_sadrzaja text,            -- iz PODACI.generirano
  zadnja_aktivnost timestamptz,
  updated_at timestamptz not null default now()
);
```

Klijent je piše u istom trenutku kad šalje `progress` (jedan poziv više u
`posaljiProgress`). Tuđi je čitaju, `progress` nitko osim vlasnika nikad ne dira.
`sazetak` je taman toliko da se nacrta mreža za nekoga tko je progres postavio na
javno — bez njega bi trebalo dijeliti cijeli `vjezbe` objekt.

Poštena zamjerka na (b): klijent piše svoje bodove, dakle može lagati. Za usporedbu
među prijateljima to je podnošljivo (i danas se cijeli progres piše s klijenta).
U trenutku kad ljestvica nosi ikakvu nagradu, računanje mora preseliti u Edge Function
koja čita `progress` i sama zbraja. To je odvojen posao i može čekati.

### 3.2 Verzija sadržaja

Bodovi ovise o maksimumima iz `data.js`. Kad dodaš lekcije, zapisani tuđi bodovi
odjednom znače nešto drugo (isti broj, veći nazivnik). Zato `verzija_sadrzaja` u tablici
— barem da se zna da je zapis stariji od zadnjeg proširenja i da postotak nije usporediv.

### 3.3 Javni ID

Abeceda bez `0` i `O`: 25 slova + 9 znamenki = 34 znaka. `34⁵ = 45,4 milijuna`
kombinacija. Do stotinjak tisuća korisnika sudar je rijedak, a `unique` + ponovni pokušaj
ga ionako riješi. Pet znakova je dobra mjera — čita se preko stola bez ponavljanja.

Napomena koju vrijedi razmotriti: `0/O` nisu jedini par koji se griješi. `1/I/L`, `5/S`,
`8/B`, `2/Z` također. Dvije opcije: izbaciti i njih (ostaje 29 znakova, `29⁵ = 20,5 M` —
i dalje dovoljno), ili ostaviti kako jest, a unos učiniti tolerantnim (velika/mala slova
svejedno, i ako ID ne postoji, ponudi najbliži postojeći). Sklon sam prvom — kod koji se
ne može krivo pročitati vrijedi više od dodatnih 25 milijuna kombinacija.

**Traženje po ID-u mora ići kroz Edge Function, ne kroz direktan `select`.** Inače tko
ima botа može prošetati prostorom ID-ova i pokupiti nadimke — a nadimak će kod dobrog
dijela ljudi biti ime i prezime. Funkcija vraća samo „postoji / ne postoji“ + nadimak,
i ograničava broj upita po korisniku dnevno.

### 3.4 Veze i grupe

```sql
create table public.veze (
  a uuid references auth.users(id) on delete cascade,
  b uuid references auth.users(id) on delete cascade,
  trazitelj uuid not null,
  stanje text not null default 'ceka',   -- 'ceka' | 'prihvaceno' | 'blokirano'
  created_at timestamptz not null default now(),
  primary key (a, b)
);
```

Uz dogovor `a < b` (uređeni par), da isto prijateljstvo ne postoji dvaput. RLS: red
vidiš ako si `a` ili `b`. Odbijanje briše red; blokiranje ga zadržava sa `stanje =
'blokirano'` da isti čovjek ne može poslati zahtjev iznova.

Grupe dolaze s plaćanjem, pa ih zasad opisujem samo obrisom: tablica kodova
(`kod`, `vlasnik_uuid`, `iskoristio_uuid`, `vrijedi_do`) je dovoljna — „grupa“ je onda
samo pogled nad kodovima istog vlasnika. Vidljivost traje dok kod traje; istekom koda
osoba nestaje s popisa, ali ne gubi ništa svoje.

---

## 4. Privatnost — troje što se ne smije preskočiti

**Nadimak je slobodan tekst, dakle bit će ime i prezime.** Time postaje osobni podatak
vidljiv poslodavcu. To je u redu ako je čovjek pristao, ali pristanak mora biti izričit
i na mjestu gdje se događa: pri unosu koda, rečenicom tipa *„Unosom ovog koda tvrtka
Zagreb Consulting vidjet će tvoj nadimak i broj bodova dok kod vrijedi (do 12. 3. 2027.).
E-mail ne vidi nitko.“*

**Poslodavac koji gleda učinak zaposlenika je u EU osjetljiva tema.** Sigurnija
postavka: firma po defaultu vidi agregat (koliko ih je aktiviralo, koliko ih je bilo
aktivno ovaj tjedan, prosjek bodova), a pojedinačne redke tek ako je osoba pristala.
Mockup trenutačno pokazuje pojedinačno — to je odluka koju vrijedi svjesno donijeti, a
ne naslijediti iz mockupa.

**`privacy.html` i `terms.html` treba dopuniti** prije nego išta od ovoga izađe: što je
javni ID, tko vidi nadimak, što firma vidi i koliko dugo, kako se prijateljstvo raskida,
i da brisanje računa briše i veze i javne bodove.

---

## 5. Društveni dio (poruke, dopisivanje)

Ovo nije „još jedna stranica“. Slobodan tekst među korisnicima donosi moderaciju,
prijavu sadržaja, blokiranje, čuvanje i brisanje poruka, obavijesti, i pravnu odgovornost
za ono što ljudi napišu — uključujući maloljetnike, kojih će u aplikaciji za učenje
jezika biti. To je zaseban proizvod, ne značajka.

Postupno, po cijeni:

1. **Prijatelji + bodovi** — nema teksta, nema moderacije. Ovo je siguran prvi korak.
2. **Gotove poruke** — „bravo“, „stigao sam te“, čestitka na streaku. Bez slobodnog
   unosa nema što moderirati, a društveni osjećaj postoji.
3. **Slobodan tekst** — tek kad postoji odluka tko moderira i kako se prijavljuje.

---

## 6. Redoslijed

| # | Korak | Baza | Otprilike |
|---|-------|------|-----------|
| 1 | Progress „You“ | ništa | frontend, jedan zahvat |
| 2 | Nadimak + javni ID + `javni_bodovi` | mala shema | shema + upis uz `posaljiProgress` |
| 3 | Prijatelji (`veze`, zahtjevi, blokiranje) | srednje | + Edge Function za traženje po ID-u |
| 4 | Grupe / kodovi | ovisi o Stripeu | dolazi s plaćanjem |
| 5 | Poruke | velika | zasebna odluka |

Koraci 1 i 2 su neovisni jedan o drugome. Korak 1 se može objaviti sam i odmah ima
smisla; ostatak stranice do tada stoji kao „uskoro“ ili ga jednostavno nema.

---

## 7. Što treba odlučiti prije koda

1. **Nav** — valute u zaglavlju kao ulaz u Progress, ili osma stavka u meniju?
2. **Account** — sele li se valutne pločice s Accounta ovamo ili ostaju na oba mjesta?
3. **Abeceda ID-a** — samo bez `0/O`, ili bez svih parova koji se griješe (`1ILS58B2Z`)?
4. **Što firma vidi po defaultu** — pojedinačne bodove ili samo agregat?
5. **Tko piše bodove** — klijent (jeftino, može se lagati) ili Edge Function (pošteno,
   skuplje)? Ako ljestvica ikad nosi nagradu, odgovor je Edge Function.
