# Croland AI tester — upute

Simulirani korisnik (Haiku, preko tvoje Claude Pro pretplate) koristi lokalnu kopiju Crolanda kao pravi čovjek. Uči dan po dan, griješi, pogađa i bilježi samo ono što je važno. Na kraju svakog dana piše dnevnik i odlučuje hoće li se vratiti. Test traje dok ne odustane ili ne završi tečaj.

Ništa ne ide u pravu bazu, Stripe ni Supabase. Tester podmeće lažnu bazu, a index.html se ne mijenja.

## Prvi put

1. **1-INSTALIRAJ.bat**: instalira pakete i preglednik, pa te prijavi u Claude. Prijavi se svojim računom s Pro pretplatom. Na kraju napravi jedan probni poziv.
2. **2-PILOT-MIKE.bat**: Mike odigra samo prva 2 dana.
   - **Prije** pokretanja zapiši koliko piše u Claude aplikaciji pod *Settings → Usage* (tjedni limit).
   - **Poslije** pogledaj opet. Razlika je cijena dva Mikeova dana.
3. Otvori izvještaj (**5-OTVORI-IZVJESTAJ.bat**) i provjeri ima li smisla ono što Mike radi.

## Pravi test

- **3-POKRENI-MIKEA.bat** pušta Mikea da radi dan po dan dok ne odustane ili ne završi tečaj.
  - Nastavlja gdje je stao, ako zatvoriš prozor ili ugasiš računalo.
  - Kad udari limit, sam složi privremeni izvještaj, pričeka da se limit obnovi i nastavi.
  - Kočnica: tester ne smije potrošiti više od **50 % tjednog limita** (`postavke.json` → `tjedni_udio_max_posto`). Kad dođe do granice, čeka novi tjedan.
  - Dok radi, računalo ne ide u stanje mirovanja. Prozor mora ostati otvoren.
- **4-CILJANI-TEST.bat** testira jednu cjelinu, npr. `Grammar 12`, `Lesson 20` ili `Test 13`. Mike tada ima pretplatu i napredak kao da je prošao sve prije te cjeline, s oko 75 % bodova. Može se ponoviti više puta. Dobar je za brzu provjeru nakon što nešto promijeniš.
- **5-OTVORI-IZVJESTAJ.bat** otvara izvještaj u pregledniku. Dok je taj prozor otvoren, tvoje oznake (ispravljeno, odbačeno, kasnije) i komentari se spremaju, a sljedeća trijaža ih poštuje.

## Što dobiješ

Sve je u mapi `ai-tester\rezultati\`:

| Datoteka | Što je |
|---|---|
| `izvjestaj.html` | Pregled za tebe: trijaža, grafovi, Mikeov put dan po dan, cjeline, greške, slike. |
| `mike\za-ispravak.md` | Nalazi koje AI može sam ispraviti. Daj datoteku Claudeu uz poruku „ispravi ovo”. |
| `mike\trijaza.json` | Nalazi razvrstani u dvije hrpe: *za AI* i *za tebe*. |
| `mike\biljeske.jsonl` | Sve sirove bilješke. |
| `mike\dani.jsonl` | Dnevnici po danu. |
| `mike\vjezbe.jsonl` | Završene vježbe s bodovima i trajanjem. |
| `mike\slike\` | Screenshotovi, samo kod bilješki, grešaka i zaglavljivanja. |

Trijažu (razvrstavanje) radi jači model (Sonnet) svakih 7 Mikeovih dana i na kraju. Ako tada nema limita, preskoči je i napravi kasnije. Ručno: `node tester.js trijaza mike`.

## Nova persona

Kopiraj `persone\mike.md` u npr. `persone\ana.md` i promijeni tekst i postavke na vrhu. Zatim pokreni `node tester.js persona ana`, ili kopiraj 3-POKRENI-MIKEA.bat i u njemu promijeni `mike` u `ana`.

**Ispočetka s Mikeom:** obriši mapu `rezultati\mike`.

## Kako radi (ukratko)

- **Što AI vidi:** sažet tekst ekrana s numeriranim gumbima, ne sliku. Tako je jeftino. Sliku ekrana vidi samo kad prvi put naiđe na novu vrstu vježbe, na plaćanje ili kad je sam zatraži (najviše 4 puta na dan).
- **Slike:** opisane su riječima na engleskom, npr. „slika: pineapple”, kao što bi ih čovjek vidio.
- **Zvuk:** AI ga „čuje” kao tekst.
- **Sat:** sat preglednika je zamrznut dok AI razmišlja i pomiče se samo za procijenjeno ljudsko vrijeme. Tajmirane igre su zato poštene, a jedan Mikeov dan traje nekoliko minuta. Minute u izvještaju su procjena ljudskog vremena.
- **Pitanja u situaciji:** kad se nešto dogodi prvi put (prva gramatika, prvi test, nova vrsta vježbe, zid s plaćanjem, zaglavljivanje, dugo trajanje, loš rezultat), AI dobije kratko pitanje. Ako nema što reći, šuti.
- **Automatske bilješke:** skripta sama bilježi greške u konzoli, datoteke koje fale (404), elemente prekrivene drugim elementima i zaglavljivanje.
- **Lažne usluge:** AI pomoć je u testu isključena, ali se bilježi što je Mike pitao. Plaćanje je lažno, ali se bilježi kad i zašto je odlučio platiti.

## Ograničenja

- AI persona nije čovjek. „Dosadno” i „odustao bih” su signali gdje pogledati, ne dokaz. Najvrjednije je ono što potvrde i brojke i više bilješki.
- Gost bez računa gubi napredak kad zatvori preglednik, kao i u stvarnosti.
- Dnevni izazov postoji samo za datume za koje si napravio sadržaj. Nakon toga njegov nedostatak nije bug.
- Ne pokreći dva testa istovremeno, jer koriste isti port.

## Postavke (`postavke.json`)

| Postavka | Što radi |
|---|---|
| `model_korisnik` | Model koji glumi korisnika (Haiku 4.5). |
| `model_trijaza` | Model koji razvrstava nalaze (Sonnet). |
| `tjedni_udio_max_posto` | Koliko posto tjednog limita tester smije potrošiti (50). |
| `rezervna_kocnica_poziva_tjedno` | Radi samo ako Claude ne javi postotak limita. Najviše toliko poziva tjedno. Nakon pilota je uskladi. |
| `max_koraka_po_danu` | Najviše radnji u jednom Mikeovom danu (150). Manje znači jeftinije, ali kraće dane. |
| `trijaza_svakih_dana` | Koliko često se radi trijaža. |
