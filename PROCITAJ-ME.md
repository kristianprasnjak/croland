# Croland v0.12 — redizajn

`app.html` je zamjena za `app.html` iz v0.11. Sav sadržaj i logika su nepromijenjeni;
promijenjen je vizualni sloj (paleta, tipografija, kartice) i dodano označavanje
aktivne stavke u zaglavlju.

## Kako ga staviti u projekt

Kopirajte cijelu mapu v0.11 u novu (npr. `croland app v0.12`) i u njoj zamijenite
samo `app.html` ovim. Aplikaciji trebaju susjedne mape iz v0.11:

    slike/  zvuk/  igre/  memory-kartice/  mini-igre/  Daily challenge/
    data.js  rjecnik.js

`data.js` i `rjecnik.js` priloženi su ovdje samo radi pregleda i istovjetni su
onima iz v0.11. Medijske mape nisu priložene — bez njih se slike i zvuk ne
prikazuju, pa `app.html` pregledavajte tek kad je na svom mjestu u projektu.

## Što je promijenjeno

- Paleta: topla pozadina i papirnate kartice; četiri valute imaju svoje boje
  (LP crvena, VP plava, GP zelena, PP oker).
- Tipografija: Space Grotesk za naslove i brojeve, Public Sans za tekst.
- Lekcija 0 više nije ljubičasta nego dio iste palete.
- Zaglavlje: aktivna stranica je označena (`header nav a.aktivna`).

Ništa nije uklonjeno — zvuk, slike, hrvatska tipkovnica, lebdeći rječnik,
traka abecede, testovi i mini-igre rade kao u v0.11.
