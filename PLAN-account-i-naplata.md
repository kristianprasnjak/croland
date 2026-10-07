# Account i naplata — cjeloviti plan

**Stanje: 3. 10. 2026. Verzija 1, za raspravu. Dopuna 7. 10. 2026.: program za kreatore i promo kodovi (sekcija 3d).** Nadovezuje se na `OBRT-odluke-i-koraci.md` i mockup `prijedlog-account.html`. Ovo nije porezni ni pravni savjet: točke s oznakom **(potvrdi)** treba provjeriti s knjigovođom ili HOK-om.

---

## Dnevnik odluka

Ažurira se nakon svake tvoje odluke. Datum, odluka, posljedica.

| Datum | Odluka | Posljedica u planu |
|---|---|---|
| 3. 10. | Statistika (Progress) nema mjesta na Account stranici | Ukinut red statistike i link (D7 zatvoren) |
| 3. 10. | Cilj stranice je i prodaja; gost vidi cijene paketa | Sekcija 5.2 "Gost" |
| 3. 10. | Samoposlužno brisanje i upravljanje računom | Sekcija 6 |
| 3. 10. | Naplata na webu: Paddle, ne Stripe | Sekcija 2, F1 briše Stripe |
| 3. 10. | Croland postaje i Android i iOS aplikacija | Sekcije 2.1, 5.3, 7.2–7.4, F4–F5 |
| 3. 10. | **Aplikacije se parkiraju** dok obrt ne radi i web ne prodaje | F4–F5 i sekcije 7.2–7.4 parkirane; RevenueCat se ne uvodi sada (D1) |
| 3. 10. | Tjedni paket ostaje (ima svoju publiku) | D2 zatvoren. *Ispravak: automatska obnova NIJE odlučena, vidi L1.* |
| 3. 10. | Obrt još nije otvoren; nije u sustavu PDV-a | Sekcija 7.1a |
| 3. 10. | **Paketi (tjedni/mjesečni/godišnji) se automatski obnavljaju dok korisnik ne otkaže** — najbolja praksa | L1 zatvoren; sekcija 3 vrijedi |
| 3. 10. | **Unos koda je na samom vrhu stranice**, iznad paketa, u svim stanjima. Nakon unosa dijalog („Extend your Plus to 23 Oct?") | Sekcija 5.1, 3b; mockup |
| 3. 10. | Kod vrijedi dan, tjedan ili godinu (mjesec?); rok za unos 1–2 godine | 3b; pitanja K1, K2 |
| 3. 10. | **Preprodaja kodova je poželjna** — ništa je ne smije sprječavati | L4 zatvoren; kodovi nisu vezani za email kupca |
| 3. 10. | Kupac koda vidi **nadimak i bodove** korisnika; više samo ako korisnik odobri | L7 zatvoren; sekcija 3b „Vidljivost" |
| 3. 10. | Ne „Buy for others" nego **„Custom"**: bira vrstu i broj kodova | Sekcija 3b; mockup |
| 3. 10. | Kupci kodova: roditelji, prijatelji, učitelji, škole, tvrtke i drugi | L2 zatvoren; L3 (plaćanje računom) ostaje otvoren |
| 3. 10. | Vrste kodova: **tjedan, mjesec, godina** (bez dnevnog) | K1 zatvoren; mockup bez "Day"; `cjenik.html` još ima dnevnu — zastario |
| 3. 10. | Rok za unos koda: **2 godine** od kupnje | K2 zatvoren |
| 3. 10. | Cijene 5 / 10 / 60 € su **s PDV-om, iste za sve**; ubuduće mogu rasti | K3 zatvoren; nova sekcija 3c (promjena cijena) |
| 3. 10. | Kod poskupljenja **postojeći pretplatnici zadržavaju staru cijenu** | C1 zatvoren |
| 3. 10. | **Samo kartično plaćanje**; državne škole koje ne mogu karticom zasad se ne ciljaju | L3 zatvoren |
| 3. 10. | Korisnik koda **smije sakriti** i nadimak i bodove od kupca koda (kupac tada vidi „Someone") | K4 zatvoren |
| 3. 10. | **Kodovi vrijede i kad kupac obriše račun** | O6 zatvoren |
| 3. 10. | **Naplata kreće 1. 11. ili 1. 12. 2026.** Do tada se ništa ne može kupiti; stranica izgleda kao poslije, a pokušaj kupnje javlja „Access is free until …" | O7, O9 zatvoreni; mockup stanje „Prije naplate" |
| 3. 10. | **Kupnja samo s računom**, na stranici, preko Paddlea | O3 zatvoren |
| 3. 10. | **Bez triala** | O1 zatvoren |
| 3. 10. | **Promjena paketa (bilo koji → bilo koji) vrijedi tek kad se iskoristi trenutni** | O2 zatvoren; mockup „Change plan" |
| 3. 10. | Kodovi ne moraju na mail; otvoreno je pitanje vlastitog mail sustava | Sekcija 7.7 |
| 3. 10. | Nema Stripe pretplatnika | O10 zatvoren; Stripe se samo briše |
| 3. 10. | Njemačka verzija se ne dira zasad | O11 zatvoren; F2 samo `index.html` |
| 3. 10. | **Domena još nije kupljena; sve mora biti spremno za ~2 mjeseca** | Sekcija 8a (kritični put) |
| 3. 10. | Povrat koje odobri Paddle: **neiskorišteni kodovi iz te kupnje se poništavaju, iskorišteni ostaju** | O5 zatvoren |
| 3. 10. | Brisanje računa: pretplata se otkazuje, preostali dani propadaju | O8 zatvoren |
| 3. 10. | **Naplata nominalno od 1. 11.**, uz očekivana produljenja besplatnog pristupa za 2 tjedna (jednom ili dvaput); produljenje se korisnicima javlja kao dobra vijest | O12 zatvoren; datum se mijenja samo u `postavke.svima_pristup_do` |
| 3. 10. | **Bez popusta za rane korisnike** | O14 zatvoren |
| 3. 10. | Registracija mailom mora potpuno raditi | F3: dodan „Forgot password" (trenutno ne postoji) |
| 3. 10. | Domena još nije odabrana | O15 otvoren — blokira Paddle live, mail servis i Google prijavu |
| 3. 10. | **Mail servis: Brevo** | O13 zatvoren |
| 3. 10. | Pravni tekstovi napisani kao nacrt | `pravni-tekstovi-nacrt/` (terms, privacy, refund); na dan lansiranja zamjenjuju postojeće i dodaju se u `scripts/build.js` |
| 3. 10. | **Pretplatnik ne vidi ponude** — samo svoj plan; Custom je sklopljen („Buy codes for others") | Izvedeno u `index.html` |
| 3. 10. | **Cijene u aplikacijama iste kao na webu** | D3 zatvoren (⏸ aplikacije) |
| 3. 10. | **Neprijavljeni ne ulaze na Account** — odmah prozor za prijavu | Izvedeno u `index.html` (`idi('account')`) |
| 3. 10. | **Izvedba gotova bez domene, obrta i Paddlea** | Sekcija 10 |
| 3. 10. | **Gost vidi Account kao cjenik** (paketi, Custom, Free vs Plus, upute za prijavu); svaka radnja otvara prijavu | Izvedeno; ujedno zadovoljava Paddleov uvjet javno vidljivih cijena |
| 3. 10. | **Baza i funkcije postavljene u produkciji** (Claude preko preglednika) | Vidi sekciju 10 |
| 3. 10. | Osim kupnje za sebe postoje **kodovi (licence)**: više komada uz popust na količinu, može ih iskoristiti bilo tko, kupac uz pristanak vidi napredak korisnika koda | Nova sekcija 3b; model iz `cjenik.html` uzet kao polazište |
| 7. 10. | **Program za kreatore (YouTube):** kreator dobiva **15–30 mjesečnih kodova** i radi s njima što hoće (koristi, dijeli, prodaje). Bez novca, provizije, isplata i besplatne godine. Format videa se ne uvjetuje. | Nova sekcija 3d; `KREATORI.md` |
| 7. 10. | **Promo kod kreatora:** upisuje se **isključivo pri registraciji** (ručno ili preko linka `?promo=`), daje **20 % popusta na prvu uplatu** za paket, vrijedi **1 godinu** od registracije | Sekcija 3d; Terms i Privacy (nacrt) dopunjeni |
| 7. 10. | **Nagrada kreatoru:** 1 mjesečni kod za svakog korisnika koji se registrirao s njegovim promo kodom i prvi put platio (bilo koji paket) | Sekcija 3d |
| 7. 10. | Promo kod i kod za pristup su **odvojeni**: promo pri registraciji, kod za produžetak pod Account („Have a code?") | Sekcija 3d |
| 7. 10. | Promo kodovi na stranicama s kuponima **nisu problem** (besplatna reklama); bez ograničenja nagrada po kreatoru | Sekcija 3d |

---

## 0. Sažetak

> **Trenutni opseg (3. 10.): samo web + Paddle.** Sve o aplikacijama ostaje u dokumentu kao smjer za kasnije, označeno ⏸.

Croland će se prodavati kroz tri kanala: **web (Paddle)**, **iOS (Apple)** i **Android (Google Play)**. Na webu ostaje samo Paddle, kako je već odlučeno. U aplikacijama se mora koristiti naplata trgovine (detalji u 2.1).

Sva tri kanala slijevaju se u **jedno pravo "Plus"** po korisniku. To pravo vodi **RevenueCat** i upisuje ga u Supabase, a aplikacija čita samo taj jedan zapis.

Account stranica postaje **prodajno mjesto i upravljanje računom**. Prikazuje se drukčije ovisno o stanju korisnika (gost / Free / Plus / akcija) i o platformi (web / iOS / Android). Statistika s nje odlazi na Progress.

Stripe se uklanja u potpunosti.

---

## 1. ⏸ RevenueCat — tek kad dođu aplikacije

**Za web-only fazu:** Paddle webhook ide izravno u Supabase edge funkciju (isti obrazac kao postojeći `stripe-webhook`). Tablica `pretplate` ima stupac `izvor`, pa se RevenueCat kasnije doda bez prepravljanja stranice.


RevenueCat je servis između aplikacije i triju sustava naplate. Svaka trgovina ima svoj način potvrde kupnje: Apple šalje potvrde (receipts) i obavijesti s poslužitelja, Google ima Play Developer API i Pub/Sub, a Paddle ima webhookove. Svaki od njih ima i svoje statuse, obnove, povrate i razdoblja odgode (grace period).

Bez RevenueCata to bismo morali sami pisati i održavati tri puta. RevenueCat to radi za nas i vraća jedan odgovor: *"korisnik X ima Plus do datuma Y, kupljeno preko Z"*.

- **Cijena:** besplatan do 2.500 $ prihoda mjesečno, a iznad toga 1 % ([cjenik](https://www.revenuecat.com/pricing/)). U početnoj fazi to znači 0 €.
- **Podržava Paddle** na webu ([integracija](https://www.revenuecat.com/docs/web/integrations/paddle)) i ima dodatak (plugin) za Capacitor, tj. za aplikacije napravljene od weba.
- **Korisnik u RevenueCatu = Supabase `user.id`.** Zato kupnja na iPhoneu vrijedi i na webu, i obrnuto.
- **Alternativa bez RevenueCata:** vlastite edge funkcije za Apple, Google i Paddle, s provjerom potvrda kupnje i svim rubnim slučajevima. Procjena je nekoliko tjedana rada uz trajni rizik grešaka koje znače izgubljen novac. **Preporuka: RevenueCat.**

---

## 2. Arhitektura naplate

```
 Web ──► Paddle Checkout ──┐
 iOS ──► Apple IAP ────────┼──► RevenueCat ──webhook──► Supabase edge fn ──► tablica `pretplate`
 And ──► Google Play ──────┘                                                  │
                                                                               ▼
                                       imaPlus() = pretplata aktivna  ILI  akcija  ILI  komplimentarno
```

### 2.1 Zašto u aplikacijama ne može samo Paddle

- **Apple 3.1.1:** otključavanje sadržaja ili pretplate u aplikaciji mora ići preko in-app kupnje.
- **Apple 3.1.3(b):** pristup sadržaju kupljenom na webu dopušten je samo *"provided those items are also available as in-app purchases within the app"* ([smjernice](https://developer.apple.com/app-store/review/guidelines/)). Znači, IAP mora postojati.
- **Iznimke postoje, ali ne pomažu dovoljno.** Link na web naplatu dopušten je u SAD-u. U EU je dopušten uz Appleovu naknadu od 10–20 %, ali tada se u toj aplikaciji ne smije nuditi IAP.
- **Google Play:** od 30. 6. 2026. u EEA, UK-u i SAD-u dopuštena je i vlastita naplata. Servisna naknada od 10 % ostaje u svakom slučaju, a uz Google naplatu dolazi još 5 % ([Google](https://android-developers.googleblog.com/2026/06/play-expanded-billing.html)).

Zaključak: **Paddle na webu, Apple IAP na iOS-u, Google Play Billing na Androidu.** Provizije su ~5 % + 0,50 $ za Paddle, 15 % za Apple (Small Business Program) i 15 % za Google (10 % + 5 %).

### 2.2 Gdje korisnik upravlja pretplatom

Pretplatom se upravlja **tamo gdje je kupljena**, a ne tamo gdje se korisnik trenutno nalazi:

| Kupljeno na | Tipka "Manage" na webu | U iOS aplikaciji | U Android aplikaciji |
|---|---|---|---|
| Paddle | Paddle customer portal | Tekst "Manage at croland.com" (bez linka izvan SAD-a) | Link na web |
| Apple | Uputa: Settings → Apple ID → Subscriptions | Nativni prikaz pretplata | Uputa za iPhone |
| Google | Link na play.google.com/store/account/subscriptions | Uputa za Android | Play prikaz pretplata |

### 2.3 Dvostruka pretplata

Ako korisnik već ima aktivan Plus iz jednog kanala, ostali kanali **ne nude kupnju**, nego pokazuju: *"You already have Plus via App Store."* Time se rješava i nalaz br. 5 iz `PRED-LANSIRANJE-nalazi.md`.

---

## 3. Paketi i cijene

| Paket | Web (Paddle, s PDV-om) | Aplikacije (prijedlog) | Napomena |
|---|---|---|---|
| Tjedni | 5 € | 5,99 € | Apple dopušta minimalno 7 dana, pa je u redu. Paddle s 5 % + 0,50 $ uzima ~14 %. |
| Mjesečni | 10 € | 11,99 € | |
| Godišnji | 60 € | 69,99 € | Prvi u prikazu, uz oznaku "Save 50%" |

- **Viša cijena u aplikacijama** pokriva veću proviziju. Apple i Google to dopuštaju, a smjer prema webu ostaje primamljiv bez reklamiranja. **Odluka D3.**
- **Cijene u aplikacijama dolaze iz trgovine** i prilagođene su zemlji. Ne pišu se u kod.
- **Probno razdoblje: ne postoji i neće postojati** (O1, potvrđeno 7. 10.). Prijedlog D4 je odbačen.
- **Tjedni paket:** u `OBRT-odluke-i-koraci.md` dosad su bili samo mjesečni i godišnji. Ako ostaje, treba ga dopisati i tamo. **Odluka D2.**

---

## 3b. Kodovi i „Custom" kupnja

### Odlučeno
- **Dva proizvoda:**
  1. **Paket** (tjedni, mjesečni, godišnji) je pretplata s automatskom obnovom, za kupca samog.
  2. **Custom** je jednokratna kupnja N kodova odabrane vrste, bez obnove i uz popust na količinu. Kupac ih koristi sam, poklanja ili preprodaje.
- **Kod nije vezan ni za čiji email.** Tko ga ima, može ga iskoristiti.
- **Unos koda je na vrhu Account stranice**, a postoji i link `?redeem=CRO-…` koji otvori stranicu s već upisanim kodom.
- **Aktivacija koda:**
  - Free korisnik: pristup do datuma X, bez obnove i bez kartice.
  - Pretplatnik: **iduća naplata se pomiče** za trajanje koda (Paddle: promjena `next_billed_at`). Nema pauziranja ni dvostruke naplate.
  - Korisnik s pristupom iz koda: dani se dodaju na kraj.
  - Gost: prijava ili registracija, a kod se pamti kroz prijavu.
- **Vidljivost:** kupac koda vidi nadimak i bodove korisnika. Lekcije i datume vidi samo ako korisnik to odobri (kvačica u dijalogu, isključena po zadanom).

### Zapaženo, za razgovor
- **Preprodavač vidi strance.** Tko kupi 100 kodova i preproda ih, vidi nadimke i bodove 100 nepoznatih ljudi. Korisnik zato u dijalogu vidi od koga je kod.
- **Custom s 1 kodom = paket bez obnove.** Tko ne voli pretplate, može tako kupiti za sebe. To je dobra sigurnosna opcija i nije problem.
- **Kupnja kodova za sebe uz popust:** netko kupi 10 godišnjih kodova po ~43 € i koristi ih 10 godina zaredom. To je u skladu s pravilom da se kodovi zbrajaju, ali tada rok aktivacije ograničava koliko se može unaprijed "nagomilati" (vidi K2).

### Polazište iz `cjenik.html`

### Što već postoji (iz `cjenik.html` i `supabase-progress-drustveno.sql`)
- **Vrste licenci:** dnevna 2 €, tjedna 5 €, mjesečna 10 €, godišnja 60 €. U cjeniku piše *bez PDV-a*.
- **Popust na količinu:** cijena po komadu = osnovica × n^-0,1505, uz donju granicu od ⅓ osnovice. 10 kom. daje −29 %, 100 kom. −50 %, a od 1.479 kom. −67 %.
- **Kupnja za sebe** otključava pristup odmah, bez koda. **Kupnja za druge** šalje kodove mailom i u nadzornu ploču.
- **Rok aktivacije** je 365 dana od kupnje. Kodovi se zbrajaju: dani se dodaju na kraj trenutnog pristupa.
- **Pristanak pri aktivaciji:** korisnik vidi tko mu je dao kod i odlučuje smije li ta osoba vidjeti njegov napredak. Za maloljetnike pristanak daju roditelj ili škola.
- **Baza:** tablica `veze` već ima `izvor = 'kod'`, `kod` i `vrijedi_do`.

### Neusklađenosti koje treba razriješiti
1. **Dnevni paket:** OBRT dokument ga ukida (fiksna naknada pojede 27 %), a cjenik ga ima. Kod kodova se naknada od 0,50 $ dijeli na cijelu kupnju, pa ondje ima smisla.
2. **PDV:** OBRT kaže "cijene s PDV-om, iste za sve", a cjenik "bez PDV-a". Za kupce u EU cijena mora biti istaknuta s PDV-om. Tvrtkama i školama uobičajena je cijena bez PDV-a.
3. **Kupnja za sebe: pretplata ili licenca?** Cjenik je opisuje kao vremensku licencu bez obnove. U ovom planu (sekcija 3) to je pretplata s obnovom.

### Tehničke posljedice
- **Cijena se računa na poslužitelju.** Paddle ne zna formulu popusta, pa edge funkcija izračuna iznos i otvori Paddle transakciju s tom cijenom (non-catalog price u Paddle Billingu). Klijent nikad ne šalje cijenu.
- **Nove tablice:** `kupnje_kodova` (kupac, vrsta, količina, iznos, Paddle transakcija) i `kodovi` (kod, vrsta, kupnja, iskoristio, iskorišteno_at, vrijedi_za_aktivaciju_do, opozvan).
- **Pristup iz koda** je redak u `pretplate` s `izvor = 'kod'`, `auto_obnova = false` i `vrijedi_do` = početak + trajanje.
- **Povrat novca za neiskorištene kodove** opoziva te kodove. Za već iskorištene pristup ostaje (**odluka L8**).

---

## 3c. Promjena cijena (kad porastu)

- **Novi kupci** odmah vide novu cijenu. U Paddleu se doda nova cijena, a stara se arhivira.
- **Postojeći pretplatnici:** dvije mogućnosti (**odluka C1**):
  - **a) zadržavaju staru cijenu** dok ne otkažu (grandfathering). Pošteno, dobro za lojalnost, nema pritužbi.
  - **b) prelaze na novu** uz najavu unaprijed. U EU korisnik mora biti obaviješten prije obnove i mora moći otkazati. Paddle mijenja cijenu na postojećoj pretplati preko API-ja.
- **Već prodani kodovi se ne mijenjaju.** Kod nosi trajanje, a ne cijenu. Zato je najava poskupljenja ujedno i prodajni poticaj za kodove ("kupi sad po staroj cijeni, iskoristi do 2 godine").
- **Promjena stope PDV-a** u nekoj zemlji ne mijenja cijenu (ista za sve, s PDV-om), nego samo tvoj neto iznos iz te zemlje.
- **Cijene se ne pišu u kod stranice.** Paketi se čitaju iz Paddlea, a osnovice za Custom iz `postavke` u Supabaseu. Poskupljenje je tako promjena jednog retka, bez novog izdanja aplikacije.

---

## 3d. Program za kreatore i promo kodovi (7. 10. 2026.)

**Cilj:** što više malih YouTube kanala (expati, dijaspora, polygloti, ljudi koji uče jezike, travel) snima o Crolandu, ti kanali rastu, a kad stignu novi jezici, isti kreatori nastavljaju. Kreatorima se ne nameće format. Popis kandidata i poruka za prvi kontakt: `KREATORI.md`.

### Ponuda kreatoru
- **15–30 mjesečnih kodova** (vrijednost 150–300 € po cijeni od 10 €). Kreator ih smije sam koristiti, poklanjati ili prodavati (u skladu s 3b: preprodaja je poželjna).
- **15** za kanale ispod ~500 pregleda po videu, **30** za veće i one čija publika stvarno uči hrvatski.
- **Bez novca:** nema provizije, praga, isplata ni poreznih pitanja oko isplata strancima. Nema besplatne godine.
- Kodove izdaješ ručno (SQL), kao i ostale besplatne kodove.

### Promo kod kreatora
- Svaki kreator ima svoj **promo kod** = njegovo ime (npr. `NASTYA`). Vizualno se razlikuje od koda za pristup, koji počinje s `CRO-`.
- Upisuje se **isključivo pri registraciji**. Postojeći korisnici ga ne mogu naknadno upisati: kreator je nagrađen samo za ljude koje je doveo.
- Dva puta do registracije: **link** `?promo=NASTYA` (pamti se kroz prijavu, isto kao `?redeem=`) ili **ručni unos** u polje na obrascu za registraciju, i za Google i za email.
- Daje **20 % popusta na prvu uplatu za paket** (tjedni, mjesečni ili godišnji), ako je uplata unutar **1 godine** od registracije. Ne vrijedi za obnove.
- **Kodovi za produžetak** se i dalje upisuju samo pod Account („Have a code?"). Promo kod tamo ne radi, i obrnuto.

### Nagrada za kreatora
- Kad korisnik registriran s promo kodom **prvi put plati** (bilo koji paket), kreator automatski dobiva **1 mjesečni kod**. Svaki korisnik se broji jednom.
- Kreator ne vidi ime ni email tog korisnika.
- Ako Paddle vrati novac za tu uplatu, vrijedi pravilo O5: neiskorišteni nagradni kod se poništava, iskorišteni ostaje.
- Bez ograničenja broja nagrada. Promo kodovi koji završe na stranicama s kuponima su besplatna reklama.

### Računica po kupcu (kupac iz HR, s PDV-om 25 %)
| Paket | Normalno ti ostane | S 20 % popusta |
|---|---|---|
| Godišnji 60 € → 48 € | ~45 € | ~36 € |
| Mjesečni 10 € → 8 € | ~7,1 € | ~5,6 € (samo prvi mjesec) |
| Tjedni 5 € → 4 € | ~3,3 € | ~2,6 € |

Nagradni kod te ne košta ništa. Na svakom kupcu zarađuješ, a riječ je o kupcima koji bez kreatora ne bi došli.

### Tehničke posljedice
- **Profil:** novi stupci `promo_kod` (tekst), `promo_upisan_at` (datum registracije) i `promo_iskoristen` (bool). Upisuju se samo pri prvoj prijavi novog računa.
- **Nova tablica `kreatori`:** `promo_kod` (jedinstven), ime, kanal (URL), jezik, napomena, aktivan. Promo kod se pri registraciji provjerava protiv ove tablice.
- **`paddle-checkout`:** ako korisnik ima važeći, neiskorišten promo kod (manje od 1 godine) i kupuje paket, transakciji se dodaje Paddle popust od 20 % s `recur: false`. Klijent nikad ne šalje popust.
- **`paddle-webhook`:** pri prvoj potvrđenoj uplati takvog korisnika postavlja `promo_iskoristen = true` i izdaje 1 mjesečni kod kreatoru (tablica `kodovi`, izvor `nagrada`).
- **Kreator vidi svoje kodove** kao i svaki kupac kodova (3b), uključujući nadimak i bodove onih koji ih iskoriste, ako to dopuste.
- **Registracija:** polje „Promo code (optional)" iznad tipki Google / email; vrijednost se pamti kroz OAuth preusmjeravanje.

---

## 4. Model prava (entitlement)

### 4.1 Nova tablica `pretplate`, umjesto Stripe stupaca u `profiles`

| stupac | značenje |
|---|---|
| `user_id` | Supabase korisnik |
| `izvor` | `paddle` / `apple` / `google` / `promo` |
| `paket` | `tjedni` / `mjesecni` / `godisnji` |
| `status` | `trial` / `active` / `grace` / `cancelled` (aktivan do kraja razdoblja) / `expired` / `refunded` |
| `vrijedi_do` | kraj plaćenog razdoblja |
| `auto_obnova` | true/false: prikazuje se "Renews" ili "Ends on" |
| `updated_at` | |

- Upisuje je samo edge funkcija `revenuecat-webhook`, koja provjerava tajni ključ i radi idempotentno (isti događaj se ne obrađuje dvaput).
- Klijent ima samo pravo čitanja, i to samo svog retka.
- `komplimentarno` i `postavke.svima_pristup_do` ostaju kao ručne iznimke.

### 4.2 Pravila pristupa

- **Plus vrijedi** dok je `status` u {trial, active, grace, cancelled} i `vrijedi_do` je u budućnosti.
- **Neuspjela naplata** daje razdoblje odgode od 7 dana (status `grace`) prije zaključavanja. Apple i Google to imaju kao postavku, a za Paddle to vrijedi kroz RevenueCat. Ovim je riješen nalaz br. 7 iz pred-lansiranja.
- **Povrat novca** (`refunded`) odmah zaključava pristup.

---

## 5. Account stranica: specifikacija

Mockup: `prijedlog-account.html` (preklopnici stanja i platforme na vrhu).

### 5.1 Redoslijed sekcija

1. **Identitet:** inicijal ili avatar, ime za prikaz, email, način prijave, "member since", Log out
2. **Plan:** glavni element stranice, sadržaj ovisi o stanju (5.2)
3. **Account settings:** ime za prikaz (*premješta se s Progressa*), email, lozinka, odjava sa svih uređaja
4. **Your data:** preuzimanje podataka, brisanje računa
5. Podnožje: Privacy · Terms · Contact · podaci obrta

**0. Unos koda** — traka "Have a code?" iznad svega, u svim stanjima.

Statistika (bodovi, streak, riječi) **ne ide** na ovu stranicu, ni kao link. Progress je u glavnom izborniku.

### 5.2 Sekcija "Plan" po stanjima

| Stanje | Prikaz |
|---|---|
| **Gost** | Naslov s ponudom, 3 paketa, usporedba Free i Plus, pa registracija (Google / Apple / email). Klik na paket vodi na registraciju, a nakon nje ravno na naplatu tog paketa (paket se pamti kroz prijavu). |
| **Free** | "Free plan", 3 paketa, sklopiva usporedba |
| **Trial** | "Plus — free trial, ends 10 Oct", jasno napisano što će se naplatiti i kada, tipka Manage |
| **Plus aktivan** | Paket, cijena, "Renews 3 Oct 2027", kanal naplate, Manage, računi (samo Paddle) |
| **Plus otkazan** | "Plus until 3 Oct 2027 — won't renew", tipka Resubscribe |
| **Grace** | Upozorenje: "We couldn't charge your card — update payment by 10 Oct", tipka Update payment |
| **Istekao** | Kao Free, uz rečenicu "Your Plus ended on …", ponuda u prvom planu |
| **Akcija** | Banner "Everything unlocked until …". Cijene skrivene ili prikazane tiše (**odluka D6**). |
| **Komplimentarno** | "Plus — gifted by Croland", bez Manage |

### 5.3 Razlike po platformi

| | Web | iOS | Android |
|---|---|---|---|
| Cijene | iz Paddlea (fiksne, s PDV-om) | iz App Storea | iz Play Storea |
| Tekst ispod cijena | "Prices include VAT. Payments by Paddle." | "Auto-renews…", Restore purchases (obavezno), Terms, Privacy | isto kao iOS, Restore nije obavezan ali je poželjan |
| Prijava | Google, Apple, email | **Apple obavezan** uz Google (smjernica 4.8) | Google, email (Apple po želji) |
| Upozorenje pri brisanju | Paddle pretplata se otkazuje automatski | "Brisanje ne otkazuje App Store pretplatu", s uputom | isto, za Google Play |

---

## 6. Funkcije računa

| Funkcija | Kako | Napomena |
|---|---|---|
| Ime za prikaz | postojeći `javni_bodovi.nadimak`, UI se seli s Progressa | |
| Promjena emaila | `supabase.auth.updateUser({email})` | potvrda na stari i novi email |
| Lozinka | promjena za email korisnike, "Set a password" za korisnike s Google/Apple prijavom | |
| Sign in with Apple | Supabase Apple provider | traži Apple Developer račun |
| Odjava sa svih uređaja | `signOut({ scope: 'global' })` | |
| **Preuzimanje podataka** | edge fn `izvoz-podataka` vraća JSON (profil, progress, javni_bodovi, prijatelji, pretplate) | GDPR čl. 20 |
| **Brisanje računa** | edge fn `obrisi-racun`, koraci ispod | Apple 5.1.1(v) i Google to traže; Google traži i **web URL** za brisanje |

**Brisanje računa, korak po korak**

1. Provjera JWT-a. Korisnik u prozoru upisuje "DELETE".
2. Ako postoji Paddle pretplata: otkazati je odmah preko Paddle API-ja. Povrat novca samo po pravilu o 14 dana (**odluka D8**).
3. Apple i Google pretplate se ne mogu otkazati s naše strane. Korisnika se upozorava *prije* brisanja.
4. Brisanje korisnika u RevenueCatu (REST API).
5. `auth.admin.deleteUser(id)`. Kaskada briše profiles, progress, pretplate i javni_bodovi.
6. Anonimni zapis u tablicu `brisanja` (datum, kanal pretplate) radi statistike i podrške.
7. Računi kupaca ostaju kod Paddlea, Applea i Googlea. Oni su prodavači i imaju vlastitu zakonsku obvezu čuvanja, pa mi ništa ne čuvamo.

---

## 7. Administrativni dio

### 7.1 Paddle (web)

#### 7.1a PDV
- **Kupcu PDV obračunava Paddle**, jer je on prodavač (Merchant of Record). Hrvatski kupac plaća 25 % hrvatskog PDV-a, njemački 19 % njemačkog i tako dalje. Paddle ga prijavljuje i plaća u svakoj zemlji.
- **Tvoj status (nisi u sustavu PDV-a) ne utječe na to što plaća kupac.** Ti ne prodaješ kupcu, nego Paddleu (Paddle.com Market Ltd, UK). Na račun Paddleu ne zaračunavaš PDV, uz napomenu iz `OBRT-odluke-i-koraci.md` (čl. 17. st. 1.).
- **Posljedica za cijenu:** "10 € s PDV-om" znači da od hrvatskog kupca Paddleu ostaje 8 €, a od toga mu ide naknada 5 % + 0,50 $. Zato ti od godišnje licence ostaje oko 45 € za kupca iz Hrvatske i oko 57 € za kupca iz SAD-a, gdje u većini saveznih država nema poreza na digitalnu uslugu.
- **Tvoja PDV obveza postoji samo na ulaznoj strani:** strane usluge (Supabase, Gemini, domena) idu u mjesečni obrazac PDV s 25 %. To već piše u OBRT dokumentu.

#### 7.1b Povrati i chargebackovi
- **Paddle odlučuje o povratima, ne ti.** Polazna točka mu je "bez povrata", osim zakonskih 14 dana (EU, UK) i iznimaka po njegovoj procjeni ([Refund policy](https://www.paddle.com/legal/refund-policy)).
- **Pravo na povrat nakon 4 svjesno pristale naplate nitko nema.** Međutim, kupac uvijek može osporiti terećenje u banci (chargeback), a banka odlučuje neovisno o tome tko je u pravu.
- **Chargeback te košta 20 €, čak i kad ga Paddle dobije.** Paddle ponekad i preventivno vrati novac kupcu prije nego spor krene, a naknadu svejedno naplati. Prag prihvatljivosti je 0,65 % transakcija mjesečno ([Paddle](https://www.paddle.com/help/manage/risk-prevention/understanding-chargebacks-with-paddle)).
- **Najjeftinija zaštita su jasnoća i lako otkazivanje:**
  1. Na checkoutu i u Account sekciji uvijek piše "Renews weekly, cancel anytime".
  2. Tipka Manage na Account stranici je vidljiva i radi.
  3. Ime na izvodu kartice treba biti prepoznatljivo, npr. "PADDLE.NET* CROLAND". **(provjeriti u Paddleu)**

- Sve iz `OBRT-odluke-i-koraci.md` vrijedi.
- **Odobrenje domene u Paddleu:** traži javno dostupne cijene, Terms, Privacy i Refund policy. Javni cjenik za goste na Account stranici tome izravno pomaže.
- **Proizvodi:** Croland Plus s tri cijene (tjedna, mjesečna, godišnja), bez triala (O1). Uz to jednokratni popust od 20 % za promo kodove (sekcija 3d).
- Uključiti customer portal i webhook prema RevenueCatu.

### 7.2 Apple

1. **Apple Developer Program:** 99 $ godišnje. **Račun kao organizacija** (obrt), za što treba besplatni D-U-N-S broj. Na individualnom računu kao prodavač piše tvoje osobno ime.
2. **Paid Apps Agreement:** bankovni podaci (poslovni IBAN), porezni obrazac W-8BEN-E.
3. **Small Business Program:** prijava za proviziju od 15 % umjesto 30 %. Mora se izričito prijaviti.
4. **EU status trgovca (DSA):** adresa, telefon i email obrta bit će javno vidljivi u App Storeu.
5. Subscription group "Croland Plus" s tri proizvoda, grace period uključen.
6. App Privacy oznake, testni račun za recenzente, link na EULA i Privacy u opisu aplikacije.

### 7.3 Google Play

1. **Play Console:** jednokratno 25 $. **Račun kao organizacija** (D-U-N-S). Osobni računi moraju prije objave proći zatvoreno testiranje s 12 testera kroz 14 dana. **(potvrdi da još vrijedi)**
2. Payments profil (poslovni IBAN), status trgovca.
3. Pretplate: tri osnovna plana (base plans), grace period.
4. Data safety obrazac, **URL za brisanje računa**.

### 7.4 Knjigovodstvo: što se mijenja dolaskom aplikacija

- **Paddle (UK):** po postojećem planu, bez obrasca ZP.
- **Apple i Google** isplaćuju preko irskih društava (Apple Distribution International, Google Commerce Ltd) za većinu zemalja. To je usluga poreznom obvezniku u EU, pa se vjerojatno **predaje mjesečni ZP** i navodi prijenos porezne obveze (reverse charge). **(potvrdi)** To je nova mjesečna obveza koju Paddle nije imao.
- **Apple izdaje samoobračun (self-billing)**, pa vjerojatno ne treba izdavati račun Appleu. Za Google provjeriti. **(potvrdi)**
- **KPR:** upisivati isplate iz sva tri izvora. Isto otvoreno pitanje kao kod Paddlea: bruto ili neto, i po kojem tečaju. **(potvrdi)**
- **Limit paušala od 60.000 €** zbraja sva tri kanala.

### 7.5 Pravni tekstovi (izmjene)

- **Terms:** uvjeti pretplate (automatska obnova, otkazivanje, kanali naplate), pravo na odustanak od 14 dana i njegov gubitak pristankom na trenutni početak korištenja (to rješava i Paddle checkout).
- **Privacy:** dodati Paddle, RevenueCat, Apple i Google kao obrađivače podataka. Ukloniti Stripe. Opisati izvoz i brisanje podataka.
- **Refund policy:** web ide preko Paddlea. U aplikacijama povrate rješavaju Apple i Google, a mi ih ne odobravamo.

### 7.7 Vlastiti sustav za mailove — **potreban je ionako**
- **Supabaseov ugrađeni mail služi samo za testiranje.** Ima strogo ograničenje broja poruka po satu, a za produkciju Supabase izričito traži vlastiti SMTP ([Supabase](https://supabase.com/docs/guides/deployment/going-into-prod)). Bez toga potvrde registracije i reset lozinke zapnu čim dođe više ljudi odjednom.
- **Rješenje:** servis za mailove spojen na domenu (SPF, DKIM, DMARC zapisi), za što treba domena.
- **Usporedba:**

| | Brevo | Resend |
|---|---|---|
| Sjedište | Francuska (EU), bez dvojbi oko GDPR-a | SAD |
| Besplatno | **300 mailova/dan**, uz Brevo logo u mailovima | 3.000/mj, ali **najviše 100/dan** |
| Prva plaćena razina | ~9 $/mj za 5.000 mailova (+10 $/mj bez loga) | 20 $/mj za 50.000 |
| Novosti i obavijesti svim korisnicima | Da, u istom alatu (popisi, odjava) | Samo uz dodatnu uslugu |
| Rast | Bez problema do milijuna | Bez problema do milijuna |

- **Preporuka: Brevo.** Dnevni limit je važniji od mjesečnog: dan lansiranja s 150 registracija probio bi Resendovih 100/dan. Brevo uz to šalje i obavijesti o produljenju besplatnog pristupa svima, iz istog alata.
- **Kad postoji, može slati:** potvrdu registracije i reset lozinke, kodove nakon kupnje, obavijest kupcu da je njegov kod iskorišten, najavu početka naplate postojećim korisnicima i, uz privolu, podsjetnike za streak.
- **Marketinški mailovi** (novosti, akcije) traže izričitu privolu (kvačica) i link za odjavu. Transakcijski ne traže.

### 7.6 Podrška (procedure)

- **"Platio sam, a nemam Plus":** provjera u RevenueCat dashboardu, po potrebi "grant promotional entitlement".
- **"Želim povrat":** web ide preko Paddlea. Za iOS i Android korisnika se upućuje na reportaproblem.apple.com odnosno Google Play.
- **Otkazivanje:** uvijek tamo gdje je kupljeno (tablica 2.2).

---

## 8a. Kritični put do početka naplate

Paddle prije live naplate **provjerava i tebe i stranicu**: podatke o obrtu, bankovni račun, živu stranicu na vlastitoj domeni s cijenama, Terms, Privacy i Refund policy. Odobrenje traje od nekoliko dana do dva tjedna, a ponekad traže izmjene.

| # | Korak | Ovisi o | Trajanje (procjena) |
|---|---|---|---|
| 1 | Pisana suglasnost škole | — | ? (to nije u tvojim rukama) |
| 2 | Kupnja domene, DNS, prebacivanje stranice | — | 1 dan |
| 3 | Otvaranje obrta (e-Obrt), RPO, PDV ID | 1 | 1–2 tjedna |
| 4 | Poslovni račun u banci | 3 | nekoliko dana |
| 5 | Paddle sandbox + izvedba F1–F3 | — (može odmah, paralelno) | 3–4 tjedna |
| 6 | Pravni tekstovi (Terms, Privacy, Refund) s podacima obrta | 3 | 2–3 dana |
| 7 | Mail servis na domeni | 2 | 1 dan |
| 8 | Paddle live: registracija obrta, verifikacija, odobrenje domene | 2, 3, 4, 6 | 3–14 dana |
| 9 | Prebacivanje na live ključeve, testna kupnja pravom karticom | 5, 8 | 1 dan |

- **1. 11. je realno samo ako se suglasnost škole i obrt riješe u idućih ~10 dana.**
- **1. 12. je sigurniji datum**, uz rezervu za Paddleovo odobrenje.
- Izvedba (korak 5) ne čeka obrt i kreće odmah u sandboxu.

---

## 8. Faze izvedbe

| Faza | Sadržaj | Ovisi o |
|---|---|---|
| **F0** | Odluke D1–D10 | ovom razgovoru |
| **F1 — naplata web** | Paddle sandbox, RevenueCat projekt, tablica `pretplate`, `revenuecat-webhook`, nova `imaPlus()`; brisanje Stripe koda (`create-checkout-session`, `stripe-webhook`, `stripe_events`, Stripe stupci) | Paddle sandbox račun |
| **F2 — Account UI (web)** | Nova stranica po mockupu, sva stanja iz 5.2, ime za prikaz preseljeno s Progressa (njemačka verzija kasnije) | F1 |
| **F3 — funkcije računa** | `izvoz-podataka`, `obrisi-racun`, email, lozinka, globalna odjava | F1 |
| **F4 — aplikacije** | Capacitor omotač, RevenueCat Capacitor plugin, otkrivanje platforme, Sign in with Apple, Restore | Apple i Google računi |
| **F5 — trgovine** | Proizvodi u App Store Connectu i Play Consoleu, privatnost, recenzija | F4, D-U-N-S |
| **F6 — live** | Paddle live, RevenueCat produkcija, pravni tekstovi, prvi mjesečni administrativni ciklus | otvoren obrt |

**Rizik za F4 — Apple 4.2 (minimalna funkcionalnost):** Apple odbija aplikacije koje su samo "repackaged website". Treba nešto što web nema: obavijesti za streak, rad bez interneta (offline lekcije), nativni zvuk i haptika. To planirati odmah, a ne nakon prvog odbijanja.

---

## 9. Otvorene odluke

Zatvorene odluke su u Dnevniku na vrhu.

| # | Pitanje | Preporuka |
|---|---|---|
| O15 | Domena: naziv | — (što prije: o njoj ovise Paddle, mail i Google prijava) |
| O16 | Vrijedi li promo kod i za prvu Custom kupnju kodova? | U nacrtu Terms zasad piše da ne vrijedi (samo prva uplata za paket) |

### Kontrolni popis prije početka naplate
- [ ] Domena kupljena, stranica prebačena, HTTPS
- [ ] Supabase: Site URL i redirect URL-ovi na novu domenu; Google OAuth (Google Cloud konzola) na novu domenu
- [ ] Brevo spojen kao SMTP u Supabaseu; predlošci mailova (potvrda, reset lozinke) prevedeni i s brendom
- [ ] „Forgot password" tok na stranici prijave
- [ ] Adresa za podršku na domeni (npr. hello@…) — traže je Paddle i Terms
- [ ] Terms: pretplate i automatska obnova, kodovi (vrijede 2 godine od kupnje, prenosivi, preprodaja dopuštena), povrati preko Paddlea, promjena paketa na kraju razdoblja, **promo kodovi (dopisano u nacrt 7. 10., EN i DE)**
- [ ] Privacy: Paddle i Brevo kao obrađivači, Stripe uklonjen, vidljivost nadimka i bodova kupcu koda, izvoz i brisanje, **promo kod pri registraciji (dopisano u nacrt 7. 10., EN i DE)**
- [ ] Refund policy (Paddle je traži kao zasebnu stranicu)
- [ ] Nacrte iz `pravni-tekstovi-nacrt/` popuniti (žuta polja: naziv obrta, adresa, OIB, datum, web host), kopirati preko postojećih i dodati `refund.html` u `scripts/build.js`
- [ ] Podaci obrta u podnožju
- [ ] `postavke.svima_pristup_do` = datum početka naplate

### ⏸ Parkirano
Aplikacije (D3, D5, D10) · njemačka verzija

### Provjeriti u Paddle sandboxu
- Tjedni interval naplate
- Transakcija s cijenom izračunatom na poslužitelju (Custom popust)
- Pomicanje `next_billed_at` bez naplate (aktivacija koda kod pretplatnika)
- Promjena paketa **na kraju razdoblja** (scheduled change), a ne odmah
- Zadržavanje stare cijene postojećim pretplatnicima
- Ime na izvodu kartice
- Jednokratni popust od 20 % (`recur: false`) na prvu transakciju pretplate, dodan na poslužitelju

### Tehničke napomene za izvedbu
- `_shared/lib.ts → imaPravoPristupa()` (funkcija `sadrzaj` koja čuva plaćeni sadržaj) mora čitati novu tablicu `pretplate`.
- `postavke.svima_pristup_do` postaviti na datum početka naplate. To je ujedno mehanizam za stanje „prije naplate".

---

## 10. Stanje izvedbe (3. 10. 2026.)

**Gotovo i provjereno** (sintaksa, testna baza Postgres 16, provjera tipova Deno, preglednik s lažnim Supabaseom u 14 scenarija):

| Dio | Datoteka |
|---|---|
| Baza: pretplate, kodovi, kupnje, Paddle događaji, vidljivost kupcu, `plus_stanje` kao jedino mjesto odluke, početak naplate 1. 11. | `supabase-migration-naplata.sql` |
| Kupnja (paket iz kataloga, Custom po formuli na serveru) | `supabase/functions/paddle-checkout` |
| Webhook (potpis, idempotencija s ponovnim pokušajem, pretplate, izdavanje kodova, povrati, prijenos preostalog vremena koda u novu pretplatu) | `supabase/functions/paddle-webhook` |
| Računske radnje (kod, portal, promjena paketa na kraju razdoblja, poništenje otkaza, brisanje računa) | `supabase/functions/racun` |
| Zajednički dio bez Stripea; CORS prima `SITE_URL` | `supabase/functions/_shared/lib.ts` |
| Nova Account stranica, „Forgot password", prozor za novu lozinku, `?redeem=` link | `index.html` (kopija prije: `index.html.bak-prije-accounta`) |
| Upute | `SETUP.md`, `.env.example` |
| Stripe funkcije | premještene u `_arhiva/stripe-funkcije/` |

**Što radi već sad, bez Paddlea** (kad se pokrene migracija i deployaju funkcije): Account stranica, kodovi (izdaju se SQL-om), vidljivost kupcu, izvoz podataka, brisanje računa, promjena imena/emaila/lozinke. Kupnja do 1. 11. javlja „Access is free until …", a poslije, dok nema Paddle tokena, „Not available yet".

**Napravljeno u produkciji (3. 10. 2026.):**
- `supabase-progress-drustveno.sql` — **nikad prije nije bio pokrenut** (tablice `javni_bodovi`, `veze`, `trazenja` nisu postojale, pa ni Progress → ljudi nije radio). Sad je pokrenut; 9 postojećih korisnika dobilo je javni ID.
- `supabase-migration-naplata.sql` — pokrenut; `svima_pristup_do` = 1. 11. 2026.
- Funkcije deployane: `racun`, `paddle-checkout`, `paddle-webhook` (bez JWT-a), `sadrzaj` i `pomoc` (nova zajednička `lib.ts`). Sve odgovaraju.
- Obrisane funkcije `create-checkout-session` i `stripe-webhook` i Stripe tajne.

**Preostaje:**
1. `objavi.bat` (nova stranica).
2. Paddle sandbox (SETUP.md, korak 3) — kad stigneš.
3. Promo kodovi i program za kreatore (sekcija 3d): stupci u profilu, tablica `kreatori`, polje na registraciji, `?promo=` link, popust u `paddle-checkout`, nagradni kod u `paddle-webhook`.
