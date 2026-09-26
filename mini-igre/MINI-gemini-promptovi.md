# Mini igre: promptovi za Gemini (34 slike)

Ovo je jedino što u vizualnoj obnovi mini igara ostaje tebi: izraditi ove slike.
Ostalo je gotovo, a svaka igra radi i bez njih. Dok slika nema, igra crta svoju zamjenu (pixel nebo, papir, emoji).

| igra | slika | kom |
|---|---|---|
| 04 Tvrđava | naslovna, 12 soba, 11 portreta, 2 namirnice | 27 |
| 05 Konoba | interijer iza gostiju | 1 |
| 07 Poštanski vlak | kolodvor iza vlaka | 1 |
| 10 Portal | pozadina obale za svaki od 3 svijeta | 3 |
| 12 Obrana baze | nebo (obično i pojačani val) | 2 |
| | **ukupno** | **34** |

Ostaje 6–16 pokušaja rezerve do dogovorenih 40–50.

Deset namirnica u Tvrđavi već je napravljeno iz tvojih ilustracija u `slike/`. Za paprike i meda tamo nije bilo slike, pa su ovdje.

## Postupak

1. Otvori **jedan razgovor po skupini** (A, B, C…). Kao prvu poruku pošalji stilski blok te skupine i dodaj: *„Ovo je stil za sve slike u ovom razgovoru. Potvrdi i čekaj."*
2. Zatim šalji kratke opise iz tablice, jedan po jedan.
3. Kad dobiješ prvu dobru sliku, priloži je uz sljedeći zahtjev i napiši *„match the style of this image exactly"*. To najviše ujednačuje stil.
4. Spremi sliku u **`slike nekompresirano/gemini-mini/`** pod **točnim nazivom iz tablice** (npr. `tvr-soba-kuhinja.png`). Ta mapa se ne objavljuje.
5. Pokreni:

   ```
   node mini-igre/_sadrzaj/gemini-obradi.js
   ```

   Skripta za svaku sliku:
   - makne magentu (#FF00FF) tamo gdje treba prozirnost;
   - smanji sliku na točnu veličinu u pikselima;
   - svede boje na 32;
   - spremi je u `mini games media/`.

   Igre je odmah koriste. Ništa drugo ne treba mijenjati.

**Što očekivati:** Gemini ne vraća pravi pixel art nego veliku sliku koja tako izgleda. To je u redu, skripta je pretvori. Realno je da iz prvog pokušaja valja svaka treća do peta slika.

---

## A — Tvrđava: pozadine soba (13) · 320×180 · omjer 16:9

Stilski blok (prva poruka u razgovoru):

```
Pixel art background scene for a 2D point-and-click adventure game, drawn on a 320x180 pixel grid and shown enlarged so every pixel is a crisp square block. Side view, eye level, like a classic 1990s adventure game.
Setting: an old Mediterranean stone fortress above a small Croatian coastal town (Dalmatia) — warm limestone, old wood, copper candlelight, glimpses of blue sea. NOT a northern European castle.
Flat colours with a limited palette of about 24 colours, hand-placed dithering allowed, no gradients, no blur, no anti-aliasing, no glow effects.
Keep the TOP-LEFT corner (about 110x30 px) and the TOP-RIGHT corner (about 50x24 px) calm and plain — text labels go there. The bottom 10 px may be dark.
No people unless asked, no text, no letters, no numbers, no watermark, no border, no frame. Aspect ratio 16:9.
```

| datoteka | kratki opis |
|---|---|
| `tvr-naslovna.png` | The fortress on a rock above a small town and the sea at dusk. The bottom third calmer — a title goes there. |
| `tvr-soba-vrata.png` | Stone entrance with a heavy wooden door, a small mailbox on the wall, morning light. |
| `tvr-soba-dvoriste.png` | Cobbled courtyard seen from the front: wooden door on the far left, stone well in the middle, a fig tree behind the well to the right, stone stairs along the wall on the right. **Empty ground — no buckets, no baskets** (the game draws them). |
| `tvr-soba-kuhinja.png` | Stone kitchen: open hearth, long wooden table, copper pots, a pantry door. |
| `tvr-soba-knjiznica.png` | Shelves up to the ceiling, a ladder, dust in a beam of light, some shelves empty. |
| `tvr-soba-toranj.png` | Inside a clock tower: big gears, a bell above, warm dim light. |
| `tvr-soba-straza.png` | Narrow window looking at the sea, a telescope on a stand, a plan of the walls spread on a table. |
| `tvr-soba-radionica.png` | Old armoury turned workshop: anvil, shields and spears on the wall, tools on the floor. |
| `tvr-soba-kapelica.png` | Small stone chapel, candles, a broken stone slab on the floor. |
| `tvr-soba-pisarnica.png` | Archive office: boxes of files, an old writing desk, a desk lamp, a window. |
| `tvr-soba-tamnica.png` | Vaulted cellar-dungeon with iron bars, now a storeroom with boxes; a wooden box with three locks standing on a barrel. |
| `tvr-soba-podrum.png` | Wine cellar: barrels, bottles, a chest with a padlock in the middle, weak light. |
| `tvr-soba-dvorana.png` | Great hall: a stone throne in the middle, stone floor. **The bottom strip of the floor plain and empty** (the game draws four carved tiles there). |

## B — Tvrđava: portreti (11) · 64×64 · omjer 1:1

```
Pixel art character portrait for a 2D adventure game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders, facing the viewer, friendly and readable at small size. Dark plain background (deep brown #2B2118).
Flat colours, limited palette of about 20 colours, no gradients, no blur, no anti-aliasing. Mediterranean (Croatian) people, warm light.
No text, no letters, no watermark, no border. Aspect ratio 1:1.
```

| datoteka | kratki opis |
|---|---|
| `tvr-lik-lucija.png` | Lucija, about 30, museum project lead, practical, hair tied back. |
| `tvr-lik-ivo.png` | **Not a face:** a folded paper note with handwriting (a grandfather's note). |
| `tvr-lik-ivoZiv.png` | Ivo, about 75, grey hair, moustache, in a shirt, holding crutches. |
| `tvr-lik-jela.png` | Jela, a cook, about 55, apron, rolled-up sleeves. |
| `tvr-lik-rok.png` | Rok, very old man, thick glasses, a cap. |
| `tvr-lik-nika.png` | Nika, architect, about 35, pencil behind her ear. |
| `tvr-lik-jure.png` | Jure, restorer, beard, leather apron. |
| `tvr-lik-marin.png` | Don Marin, priest, about 60, black clothes with a white collar. |
| `tvr-lik-lovro.png` | Lovro, archivist, about 40, glasses, waistcoat. |
| `tvr-lik-horvat.png` | Davor Horvat, lawyer, about 50, expensive suit, smooth smile. |
| `tvr-lik-mira.png` | Mira Kovač, mayor, about 50, blazer. |

## C — Tvrđava: namirnice (2) · 24×24 · prozirna pozadina

```
Pixel art item icon for a 2D game, drawn on a 24x24 pixel grid and shown enlarged so every pixel is a crisp square block.
One single object, centred, with a dark 1-pixel outline. Background filled with solid magenta #FF00FF (it will be removed).
Flat colours, no gradients, no blur, no shadow on the background. No text. Aspect ratio 1:1.
```

| datoteka | kratki opis |
|---|---|
| `tvr-hrana-paprika.png` | A green bell pepper. |
| `tvr-hrana-med.png` | A glass jar of honey with a cloth lid. |

## D — pozadine ostalih igara (6)

Svaka slika je zasebna. Stilski blok za sve:

```
Pixel art background for a 2D word game, shown enlarged so every pixel is a crisp square block. Flat colours, limited palette of about 24 colours, no gradients, no blur, no anti-aliasing. Warm, friendly Croatian coastal mood. No people, no text, no letters, no watermark, no border.
```

| datoteka | mjera i omjer | kratki opis |
|---|---|---|
| `konoba-interijer.png` | 384×72 · vrlo široka traka, 16:3 | Interior back wall of a Dalmatian tavern (konoba): stone wall, wooden beams, hanging garlic and peppers, a small window to the sea, wine barrels at the sides. Calm middle area — guest cards stand in front of it. |
| `vlak-kolodvor.png` | 360×80 · široka traka, 9:2 | Small old Croatian railway station behind the tracks: station building with a clock, lamp posts, hills and blue sky. The bottom quarter plain — a train stands in front of it. |
| `portal-pozadina-1.png` | 256×150 · 5:3 | Sunny beach seen from the shore: sea horizon, small green islands, a few clouds. **Seamless left–right** (it repeats sideways). Top area solid magenta #FF00FF (the game draws the sky there). |
| `portal-pozadina-2.png` | 256×150 · 5:3 | Harbour at sunset: sea, a stone pier with small fishing boats, distant hills. **Seamless left–right**. Top area solid magenta #FF00FF. |
| `portal-pozadina-3.png` | 256×150 · 5:3 | Island at dusk, dark blue-purple sea, silhouettes of islands, first stars. **Seamless left–right**. Top area solid magenta #FF00FF. |
| `obrana-nebo.png` | 280×110 · 28:11 | Night sky over a Croatian coastal town: deep blue-purple sky with stars, distant silhouette of hills and a few lit windows at the very bottom. |
| `obrana-nebo-jak.png` | 280×110 · 28:11 | Same view in a storm: dark red-purple sky, lightning in the distance, hills at the bottom. |

**Gdje se vide:**
- Portal: pozadina se crta iznad pijeska i ponavlja vodoravno. Magenta na vrhu postaje prozirna, pa ostaje pixel nebo same igre.
- Obrana: nebo pokriva prostor iznad baze.
