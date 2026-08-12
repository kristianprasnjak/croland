# Demo memorijske kartice

Pet kartica za testiranje, od nule do pređene igre. Ubaci ih u aplikaciju preko
**Settings → Drop your memory card (.json) here**.

Ukupno u igri: **8345 bodova** (942 vježbe, bez Lesson 0 koja se ne boduje).

| Datoteka | Ime | Bodovi | Otključano (L / V / G / P / T) | Riječi u rječniku |
|---|---|---|---|---|
| `croland-00-nova.json` | Ana | 0 (0 %) | 1 / 1 / 1 / 1 / 1 | 0 |
| `croland-25-pocetnik.json` | Marko | 2086 (25 %) | 10 / 11 / 10 / 10 / 10 | 274 |
| `croland-50-sredina.json` | Petra | 4173 (50 %) | 15 / 16 / 15 / 14 / 14 | 453 |
| `croland-75-napredni.json` | Ivan | 6259 (75 %) | 18 / 19 / 18 / 18 / 18 | 575 |
| `croland-100-prijedena.json` | Lucija | 8345 (100 %) | 20 / 20 / 20 / 20 / 20 | 683 |

## Kako su složene

- Napredak je **prefiks**: niže razine su 100 % riješene, a granična cjelina je
  djelomična — točno onoliko koliko treba da se pogodi postotak. Zato su
  otključavanja uvijek u skladu s pragovima (`prag()` / `otkljucano()`).
- Lesson 0 je na svakoj kartici osim nulte riješena u cijelosti, pa je i svih
  30 slova abecede upaljeno (`slova`, `abecedaSlavljena`).
- Rječnik sadrži sve natuknice iz cjelina koje su 100 % gotove.
- **Mini-igre i daily streak namjerno su prazni** (`mini: {}`,
  `streak: {niz:0, bodovi:0}`) — kartice testiraju samo napredak kroz vježbe.
- Nulta kartica je registrirana (`ime`, `kartica: 1`), ali bez ijednog boda.

## Regeneriranje

Skripta ne prepisuje bodove ručno — učita `app.html` u jsdom i pusti da
**sama aplikacija** izračuna valute, otključavanja, rječnik i format kartice.
Kartice zato ostaju ispravne i nakon promjene bodova ili pragova u `app.html`.

```
npm install jsdom
node memory-kartice/napravi-kartice.js
```
