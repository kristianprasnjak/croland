# Predaja: pixel izgled za ostale mini igre

Ovaj dokument služi kao početak novog razgovora. Opisuje što je odlučeno i napravljeno na Konobi te kako je postavljen alat za slike, da se rad na ostalim igrama ne mora otkrivati iznova.

## Odluke koje vrijede za sve igre

- Mini igre trebaju izgledati drukčije od ostatka aplikacije. Smjer je **pixel art**, i to "stil A": topao, čitljiv, s tamnim obrubom, bez kiča.
- **Ono što vidimo jest scena.** Ne dodaje se ukrasna scena uz igru. Samo sučelje (ploča s rezultatom, oblačići, pult, pločice) postaje pixel svijet.
- **Ne štedjeti na slikama.** Gemini je jeftin, a korisnik je izričito rekao da ne treba raditi kompromise zbog novca.
- **Strah od kiča:** manje ukrasa i mirne boje. Sadržaj (hrvatski jezik) mora ostati u prvom planu.
- **Fontovi:** Geist za tekst, Geist Pixel za HUD i oznake. Oba se učitavaju lokalno iz `mini games media/` (woff2, latin i latin-ext).
- **Jezik:** natpisi u sučelju su na engleskom, sadržaj igre na hrvatskom.

## Kako je napravljena Konoba (uzor)

**Mjerilo piksela.** Jedan "art piksel" iznosi `--u` CSS piksela, gdje je `u = k / devicePixelRatio`, a `k` cijeli broj piksela uređaja. `prilagodiMjerilo()` bira najveći `k` pri kojem cijela igra stane na ekran. Visinu ekrana šalje roditeljska aplikacija (iframe je visok koliko i sadržaj). Slike se prikazuju s `image-rendering: pixelated`.

**Veličine:**
- jela: 32×32
- minijature: 16×16
- portreti: 40×40
- pločica šanka: 34u

**Okviri** su `box-shadow` obrubi od jednog art piksela (klasa `.pxo`). Teksture `zid`, `drvo`, `ploca` i `rep` nalaze se u `mini games media/konoba/`.

**Izvorne datoteke** su u containeru starog razgovora (`/home/claude/konoba/`) i više nisu dostupne. Prava verzija je `mini-igre/05-konoba.html`; stil i logiku treba čitati iz nje.

## Alat za slike (u `redizajn/`)

1. **`gemini.js`** generira slike prema popisu.
   - Pokretanje: `node redizajn/gemini.js <popis.json> [imena] [--ponovno]`.
   - Model je `gemini-nano-banana-2.1`. Izlaz je samo JPEG, 1:1, 1K.
   - Ključ se čita iz `.env` (`GEMINI_API_KEY`). Ključ nikad ne ide kroz chat.
   - Stavka s `iz` je izmjena postojeće slike (npr. izrazi lica: "change ONLY the facial expression").
   - Uzor popisa: `redizajn/konoba-pixel/popis.json`, uz pokretač `generiraj-konoba-pixel.bat`.
   - Kredit se kupuje na aistudio.google.com/billing ("Buy credits"). Greška HTTP 402 znači da je kredit potrošen.

2. **`pikseli.py`** pretvara "lažni" Gemini pixel art u pravi.
   - Traži mrežu i uzima medijan po ćeliji.
   - Bijelu pozadinu pretvara u prozirnost.
   - Cijeli set svodi na zajedničku paletu.
   - Pokretanje: `python redizajn/pikseli.py ULAZ IZLAZ --grupe A --platno 32 --boja 64 [--vece gost=40] [--izvor gost] [--pregled p.png]`.

3. **`konoba-pixel/ugradi.py`** preimenuje slike, radi `-mini` verzije i kopira teksture u `mini games media/<igra>/`.

**Pouke iz Konobe:**
- Gemini crta mreže različite gustoće (33, 40, 51, 61, 65 ćelija), pa se slike moraju svesti na istu veličinu.
- **Predmeti:** obično smanjivanje koje čuva obrube (zadano ponašanje).
- **Lica:** opcija `--izvor`, koja svaki portret iznova uzorkuje iz originala. Obično smanjivanje briše oči i osmijehe.
- **Paleta:** predmeti i lica moraju imati odvojene palete (dva pokretanja). Predmetima trebaju 64 boje, inače nestanu ljubičasta i ružičasta.
- **Pregled:** svaku sliku treba pregledati uz original. Sitno nacrtan lik propadne nakon smanjivanja. Gost 08 je zbog toga izbačen iz igre.
- **Slične slike:** paziti na predmete koji u 32×32 izgledaju slično (kava/kapučino/čaj, kolač/torta, pita/burek).

## Svjetovi i palete (odluka korisnika, 11. 10. 2026.)

- Svaka igra je svoj svijet sa svojom paletom i materijalima. Palete se razlikuju, ali moraju biti **srodne**.
- Primjeri koje je korisnik naveo:
  - tvrđava se odvija noću,
  - pacman je u svijetu drugih materijala nego te dvije igre,
  - portal je na plaži.
- **Što je zajedničko:**
  - ista tinta za obrube,
  - ista logika svjetla i sjene,
  - isti gornji prag zasićenosti (ništa kričavo),
  - isti krem za tekstualna polja,
  - iste boje za stanja: dobro, upozorenje, loše.
- **Što se mijenja po igri:** temeljni ton svijeta i materijali (drvo, kamen, pijesak, noćno nebo…).
- Prije izrade slika za igru prvo se dogovori njezin svijet: doba dana, materijali i paleta.

## Grad i Gradovi

- **Gradovi** već imaju vlastiti sustav slika. Ne prebacuje se na pixel; treba ga dovršiti i po potrebi malo dotjerati.
- **Grad** korisniku je ružan i kandidat je za potpuni redizajn.

## Tehnička pravila projekta

- Objava ide preko `objavi.bat`. `scripts/build.js` kopira u `dist/` samo mape s popisa `DIRS`, pa svaku novu mapu sa slikama treba dodati na taj popis.
- Prije izmjene igre napraviti kopiju `<igra>.html.bak-<opis>`.
- Originale u `slike/` i `slike nekompresirano/` nikad ne prepisivati.
- Svaki novi izvor slika ili fonta upisati u `mini games media/IZVORI-CC0.md`.
- `.env` sadrži tajne: smiju se spominjati samo imena varijabli, nikad vrijednosti.
- Zajednička jezgra igara je `CL` (`CL.hud`, `CL.zastor`, `CL.kraj`, `CL.poruka`…). Zajednički stil `CL-STIL` ugrađuje se preko `_sadrzaj/ugradi.js`.

## Igre

| br. | igra |
|---|---|
| 01 | grad |
| 02 | put oko Hrvatske |
| 03 | pamti pa piši |
| 04 | tvrđava |
| 05 | konoba (gotova) |
| 06 | skladište |
| 07 | poštanski vlak |
| 08 | labirint |
| 09 | zmija |
| 10 | mario |
| 11 | preživljavanje |
| 12 | obrana baze |
| 13 | gradovi |

Neke već imaju vlastite slike: grad (atlas i karta), gradovi (likovi i dijalozi), tvrđava, vlak, portal i obrana (Gemini pozadine), te ručno nacrtane sprajtove u `_sadrzaj/sprajtovi.js`.
