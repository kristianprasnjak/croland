# Nastavak rada — dorada koncepata po izvještajima provjere

Stanje 21.10.2026. Ovu datoteku čita nova sesija koja nastavlja posao.

## Što je dosad napravljeno

1. **Koncept v0.1** za 13 jezika: `fr, en, de, it, es, pt, ru, isv, eo, la, zh, ja, ar` + `00-pregled.md`.
   Izvorna verzija v0.1 sačuvana je u `_v0.1/` (ne mijenjati).
2. **Neovisna provjera** svakog jezika po `provjera/KONTROLE.md`; izvještaji su u `provjera/<kod>-izvjestaj.md`.
   Presude: latinski i interslavenski „vraća se“, svi ostali „prolazi uz ispravke“.
3. **Dorada je započeta i prekinuta** (dosegnut limit potrošnje). Za svaki jezik dio nalaza je možda
   već primijenjen, a dio nije; nijedna dorada nije završena ni zapisana u izvještaj.
   - Djelomično dorađeno (na vrhu piše „Verzija 0.2“): `ar, en, eo, es, fr, it, la, pt, zh`
   - Možda djelomično dorađeno, verzija još 0.1: `ja, ru`
   - Nije dorađivano: `de`, `isv`
   - `00-pregled.md` nije usklađen.

## Stanje 21.10.2026. (druga sesija)

**Koraci 1–4 su gotovi.** Ovaj dokument je sada povijesni; sljedeći rad počinje od `provjera/ZBIRNI-IZVJESTAJ.md`.

- Korak 1: svih 13 jezika u v0.2; u svakom izvještaju odjeljak „Primjena ispravaka (v0.2)“ (primijenjeno 336 od 345 nalaza, 2 djelomično, 2 odbačeno, 5 samo u odluke). `de, isv, ja, ru` dorađeni u cijelosti u drugoj sesiji.
- Korak 2: `00-pregled.md` v0.2 (usporedna tablica, odstupanja, globalne odluke 5–7, odjeljak „Stanje provjere“).
- Korak 3: `provjera/ZBIRNI-IZVJESTAJ.md` i `DNEVNIK-iskustava.md` (D1–D19, prijedlog za popis kontrola v1.1).
- Korak 4: automatska kontrola prošla (tablice, razine, 7 znakova `|`, verzija 0.2); `_v0.1/` nije mijenjan.
- Nakon toga (isti dan): unesene odluke vlasnika (ciljevi po jeziku, fleksibilan broj razina i trajanje ≈ 5–6 mjeseci, nepovezane priče, Sankt Peterburg, Španjolska, britanski, klasični izgovor latinskog) i provedena druga, vlastita provjera (`provjera/ZBIRNI-IZVJESTAJ.md`, odj. 4). Napravljen pregledni artefakt „Croland jezični koncepti“ (snimka stanja).
- Druga runda odluka (21.10.2026., 17:35): esperanto A2, kineski HSK 2025., brazilski, samo MSA, japanski (≈ 120 kanjija, romaji samo L0, Hepburn, razmaci do L6, animacija poteza i mini-igre, furigana), latinski (samo klasični, odlomci u Practice, govor kasnije, makroni). Blokira još samo školski standard interslavenskog.
- Sljedeće (čeka vlasnika): odluke iz zbirnog izvještaja; druga provjera za latinski i interslavenski (obavezno) i ruski (preporučeno).

## Što treba napraviti

### Korak 1 — dovrši doradu svakog jezika (13 datoteka)

Za svaki jezik, jedan po jedan (ili paralelno, ako sesija to može):

1. Pročitaj `provjera/KONTROLE.md`, `00-pregled.md`, trenutni `<kod>.md` i `provjera/<kod>-izvjestaj.md`.
2. Za svaki nalaz iz izvještaja i svaki predloženi ispravak nosive rečenice provjeri je li u trenutnom `<kod>.md` već primijenjen. Ako nije, primijeni ga.
3. Pravila dorade:
   - Primijeni SVE nalaze (blokira, važno, kozmetika).
   - Nalaz koji traži odluku vlasnika projekta (varijanta jezika, poslovna odluka) ne odlučuj: dodaj ga u „Otvorene odluke“ s preporukom.
   - Nalaz za koji smatraš da je pogrešan ne primjenjuj, uz kratko obrazloženje.
   - Zadrži oblik datoteke: isti odjeljci; tablica razina s istih 6 stupaca (svaki redak počinje s `| <oznaka razine> |` i ima točno 7 znakova `|`). Broj razina mijenjaj samo ako izvještaj to izričito traži i obrazloži.
   - Ako mijenjaš cilj, broj razina, vokabular ili module, mijenjaj ih dosljedno kroz cijelu datoteku.
   - Kod njemačkog: `de.md` je sažetak postojećeg plana `../DE-plan-tecaja.md`; svaku promjenu rasporeda koja od njega odstupa označi kao „prijedlog izmjene postojećeg plana“.
   - Kod latinskog i interslavenskog dorada je veća (presuda „vraća se“); smije se preurediti raspored, uz obrazloženje.
4. Na vrhu datoteke: „Verzija 0.2, <datum>, status: koncept, ispravljen prema provjeri (popis kontrola v1.0)“.
5. **Završna provjera kralježnice:** prođi SVE nosive rečenice i sve nove primjere. Nijedna ne smije koristiti oblik, padež, vrijeme, česticu, kanji/znak ili konstrukciju iz kasnije razine, osim ako je u toj razini izričito označena kao zamrznuta fraza.
6. Na kraj `provjera/<kod>-izvjestaj.md` dodaj:
   ```
   ## Primjena ispravaka (v0.2)
   | # nalaza | Status (primijenjeno / djelomično / odbačeno / u odluke) | Napomena |
   ```
7. Zabilježi za korak 2 koji su se podaci promijenili za usporednu tablicu (cilj, broj razina, vokabular, moduli, glavni izazov, težina HR/EN).

Pisati na hrvatskom, sažeto, stilom postojećih datoteka. Ne mijenjati datoteke u `_v0.1/`.

### Korak 2 — uskladi `00-pregled.md`

- Usporedna tablica, odjeljak o odstupanjima od 20 razina i popis odluka moraju odgovarati dorađenim datotekama.
- Dodaj odjeljak „Stanje provjere“: za svaki jezik presuda iz izvještaja i status dorade.
- Verzija 0.2.

### Korak 3 — zbirni izvještaj i dnevnik iskustava

- `provjera/ZBIRNI-IZVJESTAJ.md`: tablica (jezik, presuda, broj nalaza po težini, primijenjeno / odbačeno / u odluke) i popis **svih otvorenih odluka za vlasnika**, grupiranih po jeziku.
- `DNEVNIK-iskustava.md` (u ovoj mapi): skupi odjeljke „Za dnevnik iskustava“ iz svih 13 izvještaja, spoji ponavljanja i označi pravila koja vrijede za sve jezike. Svaki zapis: datum, jezik(ci), opažanje, prijedlog promjene procedure, status „otvoreno“.

### Korak 4 — kratka kontrola

Automatski provjeri da svaka datoteka jezika ima ispravnu tablicu (sve razine od L0 do zadnje, 7 znakova `|` po retku) i verziju 0.2. Javi vlasniku: što je gotovo, koje odluke čekaju njega, i preporuku je li potrebna druga provjera (barem za latinski i interslavenski, koji su bili vraćeni).

## Napomene vlasnika za sljedeći rad (21.10.2026., 18:22)

1. **Dokument o fazama ne postoji.** U mapi `croland app v0.11` nema dokumenta koji definira faze 1–5 izrade tečaja za novi ciljni jezik. Najbliže su `VODIC-izrada-i-prijevod.md`, E5 (9 koraka za novi jezik, bez brojeva faza), `DE-gramaticka-kraljeznica.md` („Faza 2a iz VODIC…, E5, korak 1“) i `ES-plan.md` (faze 0–7, ali za **hrvatski tečaj sa španjolskim sučeljem**, dakle drugo značenje riječi „faza“). Zadatak (preuzima Claude, kad vlasnik kaže da se nastavlja): napraviti dokument(e) koji definiraju faze izrade tečaja za novi ciljni jezik i uskladiti nazive u `jezici-koncept/`. Ne započinjati bez znaka vlasnika.
2. **Jezici sučelja.** Hrvatski i engleski nisu jedini jezici sučelja: ideja je oko 10 jezika sučelja po tečaju (više ili manje), a izbor će vlasnik prilagođavati tržištu i potrebama korisnika. Koncepti zasad razrađuju izazove samo za HR i EN (+ kratke napomene za skupine). To treba uzeti u obzir u dokumentu o fazama (sloj „izvor + promišljeni prijevod“ po jeziku sučelja, opseg rada, redoslijed) i u svim budućim procjenama posla.

## Stručna provjera 2 (pripremljeno 22.10.2026.)

Prompt za novi chat: `provjera-2/PROMPT-provjera-2.md`; kontrole v1.1: `provjera-2/KONTROLE-v1.1.md`; odluke vlasnika na jednom mjestu: `ODLUKE-VLASNIKA.md`. Izvještaji druge provjere nastaju u `provjera-2/`.
