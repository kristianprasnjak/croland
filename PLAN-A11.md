# Plan: priprema za ispit A1.1 (Extras)

**Stanje: 7. 10. 2026.** Plan je dogovoren u razgovoru, odluke su konačne dok se ne kaže drukčije.

## Kontekst

- Izmjene Zakona o strancima vrijede od 4. 6. 2026. **Obveza A1.1 vrijedi od 4. 6. 2027.**: radnici s dozvolom preko HZZ-a koji su u RH dulje od godinu dana. Izuzeti: sezonci, govornici južnoslavenskih jezika i oni školovani u RH. Ispit plaća poslodavac.
- **Provjereno u NN 55/2026 (18. 10.):** zakon na snazi od 4. 6. 2026., čl. 92.a st. 1, 4 i 6 od 4. 6. 2027. (čl. 70). Pravilnik o polaganju (NN 100/21) mora se uskladiti **do 4. 12. 2026.** (čl. 69 st. 3); tada se očekuje format. Detalji u `USKLADENOST-A11.md`.
- Ispit provodi oko 90 ovlaštenih ustanova. Četiri vještine + latinica. **Format, bodovi i prag još nisu objavljeni**, pa je probni ispit parametriziran (`A11_FORMAT`) i označen kao neslužben. Pratiti ogledne primjere ustanova.

## Vizija (usklađeno 20. 10.)

**Što je A1.1 u ovoj aplikaciji.** Glavni tečaj (L0–L20) je proizvod za pojedince kojima su engleski, njemački ili španjolski prvi ili drugi jezik: dijaspora, partneri i oni koji se sele. A1.1 je **drugi proizvod u istoj aplikaciji**, s drugim korisnikom (radnik iz treće zemlje, često bez engleskog i bez latinice) i drugim kupcem (poslodavac ili agencija, jer zakon kaže da ispit plaća poslodavac). Dijele račun, Plus, kodove, slike, zvuk, prepoznavanje govora i bucket. Dijele i put kroz aplikaciju (englesku ljusku), a razlikuju se u jeziku: upute u A1.1 su na materinjem jeziku radnika.

**Iz toga slijede četiri pravila:**

1. **Radnik prolazi kroz englesku ljusku, sam** (odluka 21. 10.). Sam napravi račun, potvrdi ga **kodom iz maila koji upisuje u aplikaciju** (ne linkom), ukuca kod `CRO-…` (bez sličnih znakova poput O i 0) i otvori Extras → A1.1, ili karticu A1.1 na naslovnici. Tko ne zna, pita kolegu ili šefa. Posebnih uputa i dubokog linka u modul nema. Radnik ima pristup i ostatku aplikacije (tečaj, igre), što je i argument za poslodavca. Kartica A1.1 zato mora biti prepoznatljiva bez čitanja: vlastita slika i krupno "A1.1".
2. **Jezik bira sam pri prvom ulasku** (odluka 21. 10.), zastavama i nazivima na vlastitom pismu, bez pogađanja prema postavkama mobitela. Zastave su poredane po očekivanoj čestoći (nepalski, hindski, filipinski, bengalski…), ne abecedno. U temama vrijedi slika i zvuk prije teksta. Upute na materinjem jeziku nisu ukras, nego uvjet da modul uopće radi za ciljanu skupinu.
3. **Latinica je tema 0.** Zakon traži "poznavanje hrvatskog jezika **i latiničnog pisma**", a ciljana skupina je često ne čita. Glavni tečaj to pretpostavlja, A1.1 ne smije.
4. **Priprema prije ispita.** Format izlazi tek uz usklađivanje pravilnika (rok 4. 12. 2026.). Do tada vrijedi graditi teme i tematske provjere. Probni ispit ima smisla tek kad je format poznat, a parametriziran je (`ispit` u `teme.json`) samo da se onda ne mijenja kod.

**Kalendar koji to diktira:** obveza vrijedi od 4. 6. 2027., a poslodavci će rješenje tražiti od siječnja 2027. Prodaji (vidi razgovore o prodaji) treba **demo do kraja prosinca 2026.**: nešto što poslodavac može dati jednom radniku na mobitelu.

**Tehnički smjer za banku zadataka:**
- Zadaci koriste postojeću knjižnicu aplikacije: slike (`PODACI.slike`) i zvukove (`ZVUK`), koje modul čita iz roditelja (isto podrijetlo). Novo se snima postojećim Gemini tijekom, a audio smije biti javan.
- Tipovi zadataka nose imena postojećih formata gdje se poklapaju (`izbor`, `upis`, `parovi`, `poredak`, `dijalog`). Novi su `obrazac`, `natpis`, `slusanje` (slika ili broj na zvuk) i `govor` (Web Speech kao pomoć, ne kao ocjena).
- Hrvatski tekst ide u `teme.json`, a upute su ključevi u `upute-XX.tsv`. Isti zadatak tako radi na svakom jeziku bez dupliciranja.
- Bodova nema (`maks: 0`). Napredak (prođene teme, provjere) ide u `croland-mini-a11` i kasnije služi za uvid poslodavca, uz pristanak.

**Ime aplikacije.** Ako Croland postane drugo ime (Parlentia ili slično), mijenjaju se samo vidljivi tekstovi. Ključevi `crolandA11`, `croland-mini-a11` i `croland.tema` ostaju kakvi jesu, inače se gubi spremljeni napredak.

## Odluke

| Datum | Odluka |
|---|---|
| 7. 10. | A1.1 je u **Extras** (Games & Extras → A1.1) i na naslovnici. Dio je **iste pretplate Plus**. |
| 7. 10. | Ekonomija bodova se ne dira: A1.1 ima `maks: 0`. |
| 7. 10. | **Besplatne igre** (samo račun): Portal (`mario`), Konoba, Gradovi Hrvatske. Sve ostale igre i svi Extras traže Plus. Daily i Weekly ostaju samo uz račun. |
| 7. 10. | Zadnja odigrana igra se nudi ("Continue"): na Games & Extras i u Quick practice na naslovnici. |
| 7. 10. | **Ljuska aplikacije se ne prevodi.** Jezik uputa bira se unutar modula, preko zastava. |
| 7. 10. | Jezici se dodaju redom, arhitektura za 10+ jezika (uključujući RTL). |
| 7. 10. | Nema izvornih govornika: prijevod + povratni prijevod drugim AI-jem + skriptne provjere; jezik ide sa statusom *beta*. |
| 7. 10. | Izgled **poput udžbenika / radne bilježnice**, puno slika, malo teksta. |
| 7. 10. | Prepoznavanje govora (Web Speech API) se koristi kao **pomoć, ne kao ocjena**: snimi, preslušaj, usporedi, samoprocjena. Iza jedne funkcije, da se kasnije može zamijeniti plaćenim sustavom (Whisper, Google STT) preko edge funkcije. |
| 18. 10. | Dodana tema 0 **Latinica i snalaženje**: zakon traži latinično pismo, a ciljana skupina često ne čita latinicu. Redoslijed za F4: Latinica → Dokumenti (obrazac) → Posao → Natpisi → Zdravlje → Brojevi (s mjesecima). Vidi `USKLADENOST-A11.md`. |
| 21. 10. | **Ulaz:** radnik prolazi kroz englesku ljusku sam (račun, potvrda **kodom iz maila**, kod `CRO-…`, Extras → A1.1). Pomoć traži od kolege ili šefa. Bez dubokog linka i bez posebnih uputa za radnika. |
| 21. 10. | **Jezik:** bira se ručno pri prvom ulasku, zastavama; ne prema postavkama mobitela. |
| 21. 10. | **Preduvjet za demo:** potvrda registracije kodom (`KOD_U_MAILU`), što traži domenu i Brevo. |
| 7. 10. | B2B: postojeći kodovi `CRO-XXXX-XXXX` (Custom kupnja). Dodati: link `?redeem=…&a11` ravno u modul i, uz pristanak radnika (isključeno po zadanom), uvid poslodavca u napredak A1.1. *(Link ravno u modul otpao 21. 10.)* |

## Sadržaj: 11 tema

| Tema | Pokriveno u tečaju | Novo |
|---|---|---|
| **Latinica i snalaženje** (tema 0, dodano 18. 10.) | L0 pretpostavlja latinicu | abeceda, č ć dž đ lj nj š ž, sricanje imena, tiskana slova za obrasce, *Ne razumijem. Ponovite, molim.* |
| Osobni podaci, predstavljanje | L2 | formule *Zovem se / Dolazim iz / Živim u / Radim kao* |
| Brojevi, datum, sat | rasuto, L18 | **cijela tema** |
| Obitelj | L4 | — |
| Kupovina, cijene | L5, L18 | eurocenti na slušanje |
| Grad, smjer, prijevoz | L6, L13 | vozni red, karta |
| **Posao** | — | smjena, plaća, šef, radno vrijeme, slobodan dan, bolovanje, zaštitna oprema |
| **Zdravlje** | — | liječnik, *boli me*, ljekarna, hitna |
| **Dokumenti, ured** | — | obrazac, OIB, adresa, državljanstvo, potpis, MUP, termin |
| Stanovanje (L16 djelomično) | | najam, račun, režije |
| Natpisi | — | ULAZ/IZLAZ, ZATVORENO, RADNO VRIJEME… |

Svaka tema je rastvorena stranica radne bilježnice: ilustracija scene, okvir s riječima i slikama, numerirane vježbe s ikonom vještine (🎧 📖 ✏️ 🗣) i na kraju "Provjeri se" (tematski kviz od 6 zadataka).

## Probni ispit (oko 35–40 min)

| Dio | Zadaci | Ocjena |
|---|---|---|
| Slušanje | 8 | automatski |
| Čitanje | 8 | automatski |
| Pisanje | obrazac (8 polja) + poruka od 3 do 5 rečenica | obrazac automatski, s djelomičnim bodovima za dijakritike; poruka kroz samoprocjenu s uzorkom |
| Govor | predstavljanje, 3 pitanja, 1 zahtjev | mikrofon kao pomoć + samoprocjena |

3 fiksne varijante + nasumični ispit iz banke. Rezultat po dijelu, povijest pokušaja, preporuka što ponoviti.

## Tehnika

- Modul: `mini-igre/a11.html`, unos u `EXTRA_IGRE` (`maks: 0`, bez `besplatno`). Stanje u `croland-mini-a11` → `PROGRESS.mini_igre`.
- **Sadržaj je zaštićen:** `a11-plus.json` + `a11-upute-XX.json` u bucketu `sadrzaj` (`/sadrzaj?f=`, `uploadaj-sadrzaj.js`). Matična stranica dohvaća i predaje iframeu. Audio smije biti javan (`zvuk/`).
- Jezici: `a11-jezici/` → `jezici.json` (kod, izvorno ime, zastava, `dir`, font, status, aktivan), `upute-en.tsv` (izvor), `upute-XX.tsv` (`en | XX`, prazno = engleski), `glosar-XX.tsv`. Noto font po pismu učitava se samo za odabrani jezik. CSS s logičkim svojstvima (RTL).
- Prijevodni tijek: prijevod uz glosar → povratni prijevod drugim AI-jem → skripta označava odstupanja → provjere (`%1`, duljina, glosar, zaostali engleski) → status *beta* → gumb "javi grešku u prijevodu".
- Redoslijed jezika (prijedlog): EN, nepalski, hindski, filipinski, bengalski, uzbečki, urdu, arapski, indonezijski, sinhalski, turski, ruski.

## Faze

Stari redoslijed (F4 banka na engleskom → F5 audio → F6 ispit → F7 jezični stroj → F8 jezici → F9 B2B) bio je horizontalan: svaki sloj do kraja, pa sljedeći. Prema viziji gore to bi značilo da prva stvar koju radnik može stvarno koristiti stiže na samom kraju. **Od 20. 10. ide okomito:** najprije jedan tanki komad koji radi od linka poslodavca do završene teme na materinjem jeziku, pa se širi.

| Faza | Što | Stanje |
|---|---|---|
| F1 | Pristup po igri (Free/Plus, lokot, modal) | **gotovo 7. 10.** |
| F2 | Zadnja igra (Continue) | **gotovo 7. 10.** |
| F3 | Kostur: unos u Extras, `a11.html`, zastave, bucket, kartica na naslovnici, edge funkcija | **gotovo 18. 10.**, objavljeno 19. 10. |
| **M1** | **Stranica teme**: izgled radne bilježnice i tipovi zadataka (`izbor`, `slusanje`, `upis`, `parovi`, `obrazac`, `natpis`, `govor`), čitanje slika i zvuka iz aplikacije, "Provjeri se" na kraju teme, napredak u stanju. **Slika kartice A1.1** (Extras i naslovnica) s krupnim "A1.1" | |
| **M2** | **Sadržaj MVP-a**: teme Latinica, Dokumenti (obrazac), Posao, Natpisi, po 20–25 zadataka, i popis rečenica za snimanje | |
| **M3** | **Audio** za M2 (Gemini skupine, preslušavanje) | |
| **M4** | **Prvi materinji jezik**: jezični stroj (fontovi, povratni prijevod, provjere) i nepalski kao *beta*; redoslijed zastava po čestoći | |
| ~~M5~~ | ~~Ulaz za poslodavca `?redeem=…&a11`~~: **otpada 21. 10.**, radnik ulazi sam kroz ljusku | |
| **M6** | **Test i demo**: ai-tester persona (radnik iz Nepala, Android, bez engleskog), pa jedan stvarni radnik preko poslodavca. Cilj je kraj prosinca 2026. **Preduvjet:** domena → Brevo (SMTP) → predložak s kodom u Supabaseu → `KOD_U_MAILU = true` u `index.html`. Bez toga potvrda ide linkom, a to za radnike ne vrijedi. | |
| P1 | Ostale teme (Zdravlje, Brojevi s mjesecima, Osobno, Kupovina, Grad, Stanovanje, Obitelj) | |
| P2 | Probni ispit, **kad izađe pravilnik**: varijante, nasumični, govor i pisanje, povijest | |
| P3 | Jezici redom (HI, FIL, BN, UZ, UR, AR…) | |
| P4 | Uvid poslodavca uz pristanak radnika (isključeno po zadanom) | |
| P5 | Glavni tečaj: mjeseci i datumi (L11 ili L18), obrazac kao vježba | |

## Napomene uz F1 i F2

- Kopija prije izmjene: `index.html.bak-prije-pristupa-igara`.
- Zaključavanje igara je samo u klijentu: datoteke igara u `mini-igre/` i dalje se mogu otvoriti izravnim URL-om. Za igre je to prihvatljivo, a sadržaj A1.1 zato ide u bucket.
- Novi tekstovi kroz `T_()` (*Continue: %1*, poruka modala) u DE/ES buildu ostaju engleski dok se ne dodaju u `sucelje-XX.tsv` (`izvuci-sucelje.py`).
- Zbroj bodova na Games & Extras ("x of y points") i dalje broji sve igre, i one zaključane.

## Napomene uz F3 (18. 10.)

- Kopije prije izmjene: `index.html.bak-prije-a11`, `scripts/build.js.bak-prije-a11`, `uploadaj-sadrzaj.js.bak-prije-a11`, `supabase/functions/sadrzaj/index.ts.bak-prije-a11`.
- Izvor: `a11-sadrzaj/teme.json` (teme, zadaci, `ispit` = A11_FORMAT) i `a11-jezici/` (`jezici.json`, `upute-en.tsv`). Obje mape su izvan `DIRS`, pa ne idu u `dist/`.
- `scripts/a11-build.js` (pokreće ga `build.js`) gradi `zasticeno/a11-plus.json` i `zasticeno/a11-upute-XX.json` za aktivne jezike. Brava u `build.js` ruši build ako se ijedan `a11-*.json` ili izvorna mapa nađe u `dist/`.
- `uploadaj-sadrzaj.js` uz `data-plus*` sam šalje i sve `zasticeno/a11-*.json`.
- Edge funkcija `sadrzaj` pušta `a11-plus.json` i `a11-upute-XX.json`. Objavljena 18. 10. kroz dashboard; provjereno: `a11-*` prolazi, nepoznata imena i dalje 400.
- `index.html`: unos `a11` u `EXTRA_IGRE` (bez slike, kartica ima zamjensko polje dok se ne doda `slike/mini-igre/a11.webp` i `slika: 'a11.webp'`), kartica "Croatian A1.1" u Quick practice, `window.crolandA11.dohvati(f)` za modul (provjera Plusa i imena datoteke, keš po korisniku). Traka ispod okvira za igre bez bodova pokazuje `podnozje` umjesto "0 pts ×4".
- `mini-igre/a11.html`: izbor jezika (prvi ulaz), naslovnica s 10 tema (stoji "coming soon" dok tema nema zadataka) i karta probnog ispita (gumb ugašen). Jezik se pamti u `croland-mini-a11` → `PROGRESS.mini_igre.a11`. RTL provjeren probnim arapskim; neprevedeni engleski u RTL-u izolira se (LRI/PDI).
- U `jezici.json` je svih 12 jezika iz redoslijeda; aktivan je samo EN. Jezik se pali s `aktivan: true` + `upute-XX.tsv`.
- Tablica "Sadržaj" ima 10 redaka, a naslov kaže "8 tema". U kostur je ušlo svih 10 (Stanovanje i Natpisi su zasebne teme).

