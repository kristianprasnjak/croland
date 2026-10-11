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

## Postupak po igri (korisnik odobrio 11. 10. 2026.)

1. **Što vidimo.** Popis svega na ekranu igre te prijedlog što postaje pixel slika, a što ostaje tekst. Korisnik to pregleda.
2. **Karta svijeta.** Prije cijelog seta slika napraviti:
   - paletu svijeta od 8–10 boja,
   - 2–3 probne Gemini slike svedene na pravi pixel art,
   - jednu snimku ekrana igre s pravim tekstom (mobitel).

   Korisnik odobri ili traži izmjene. Tu se hvata kič i provjerava čitljivost.
3. **Cijeli set.** Tek nakon toga: popis slika, Gemini, obrada, pregled svake slike uz original, ugradnja, test (360, 390 i 1280 px), objava.

Prije prve igre treba izvući zajednički pixel temelj iz Konobe (mjerilo `--u`, okviri `.pxo`, ploča s rezultatom, prozor/gumb/poruka, fontovi) i prebaciti Konobu na njega. Predloženi redoslijed je zatim tvrđava, jer je noć najteži test srodnih paleta.

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

## Pixel temelj (napravljen 11. 10. 2026.)

Zajednički dio pixel igara izvučen je iz Konobe u dvije datoteke:

- `mini-igre/_sadrzaj/pixel.css` (blok `CL-PIXEL`): fontovi Geist i Geist Pixel, mjerilo `--u`, okvir `.pxo`, ploča s rezultatom, prozor, gumbi, poruka, mobilni izgled. Zajedničke boje: `--tinta`, `--krem`, `--siva`, stanja `--zelena`, `--zuta`, `--crvena`. Obrubi za vlastita pravila: `var(--obrub)`, `var(--obrub-dobro)`, `var(--obrub-lose)`, `var(--sjena)`.
- `mini-igre/_sadrzaj/pixel.js` (blok `CL-PIXEL-JS`): objekt `PX` za mjerilo. Igra pozove `PX.mjerilo({sirina, omot, kMax, kMaxUsko, kMin, nakon})`, a zatim `PX.prilagodi()` kad se raspored promijeni.

**Svijet igre** se zadaje u igrinom `:root`, ispod bloka `CL-PIXEL`: `--svijet`, `--svijet-slika`, `--ploca`, `--ploca-slika`, `--ploca-tekst`, `--ploca-tekst2`, `--gumb`, `--gumb-hover`, `--gumb-glavni-hover`, `--zastor-tama`, `--zastor-tekst`, `--omot-sirina`.

**Uključivanje igre:** u `<style>` iza bloka `CL-STIL` dodati prazne oznake `/*[CL-PIXEL]*/` i `/*[/CL-PIXEL]*/`, a u zasebni `<script>` prije skripte igre `/*[CL-PIXEL-JS]*/` i `/*[/CL-PIXEL-JS]*/`. Zatim pokrenuti `node _sadrzaj/ugradi.js`. Igre bez oznaka ugradnja ne dira. Konoba je prebačena na temelj i izgleda isto kao prije (provjereno snimkama na 360, 390 i 1280 px).

## 04 Tvrđava → Dvorac Vrana (gotovo 12. 10. 2026.)

- Nova igra u `mini-igre/04-tvrdjava.html` (id i ime datoteke ostali su `tvrdjava`, u aplikaciji se zove „Dvorac / Castle"). Stara tvrđava: `04-tvrdjava.html.bak-prije-dvorca`.
- Escape room u 10 soba, jedna soba = dvije lekcije tečaja. U svakoj sobi je Klarina poruka (5 inačica, jedna nasumično) koja kaže u kojem je predmetu ključ. Krivi predmet gasi svijeću (3 ili 1), a zadnja svijeća završava igru. Bodovi: 120 po sobi i 300 za kraj.
- Slike: `redizajn/dvorac/` (popis, obrada, README) i `generiraj-dvorac.bat` → `mini games media/dvorac/`. Predmeti su zasebni sprajtovi na praznim pozadinama soba, iste gustoće piksela i iste palete.
- Pouke:
  - Gemini ne crta precizan raspored predmeta u sceni, pa su predmeti zasebni, a mjesta im određuje kod.
  - Parovi koji se razlikuju samo u jednome rade se kao izmjena istog crteža (`iz`).
  - Ono o čemu ovisi odgovor (znakovi na knjigama, puna/prazna bačva, brojevi) treba dorisati pikselima.
  - Mreža se ne traži automatski: predmet se uzorkuje izravno iz originala na zadanu veličinu.
