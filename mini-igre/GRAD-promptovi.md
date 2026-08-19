# Grad v2 — promptovi za Gemini, jedan po jedan

Svaki prompt je **potpun i samostalan** — kopiraj cijeli blok i zalijepi ga u
Gemini kakav jest. Ne treba slati stil unaprijed niti bilo što dodavati.

Sliku koju dobiješ spremi u mapu `sirovo/` **pod nazivom koji piše iznad prompta**.
Kad ih nakupiš, pokreni jednom:

```
python grad-obradi.py --popis GRAD-slike-popis.csv --ulaz sirovo --izlaz gotovo
```

> **Savjet koji najviše vrijedi:** kad dobiješ prvu sličicu koja ti se sviđa,
> priloži je uz sljedeći prompt i dopiši `Match the style of the attached image exactly.`
> Ujednačenost skoči više nego od bilo koje izmjene u tekstu prompta.

Ukupno **180 promptova**. Obavezna je samo prva petorka skupina (60) — ostalo je nadogradnja.

## Sadržaj

- [1 · Teren](#1-teren) — 20 kom
- [2 · Granice](#2-granice) — 6 kom
- [3 · Zgrade](#3-zgrade) — 17 kom
- [4 · Krupni objekti](#4-krupni-objekti) — 12 kom
- [5 · Igrač i pomoćno](#5-igrač-i-pomoćno) — 5 kom
- [6 · Portreti (razina 2)](#6-portreti-razina-2) — 38 kom
- [7 · Likovi na karti (razina 3)](#7-likovi-na-karti-razina-3) — 37 kom
- [8 · Interijeri i sitnice (razina 4)](#8-interijeri-i-sitnice-razina-4) — 45 kom

---

## 1 · Teren

*Pločice koje se ponavljaju po cijeloj karti. Najteže su — moraju biti bešavne.*

### `grad-teren-trava-1.png` — 32×32 · osnovna trava

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: short green lawn grass seen from straight above, even and calm, only a few blades of texture
Aspect ratio 1:1.
```

### `grad-teren-trava-2.png` — 32×32 · trava, varijanta

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: short green lawn grass from above, slightly more blades and one lighter patch
Aspect ratio 1:1.
```

### `grad-teren-trava-3.png` — 32×32 · trava s kamenčićima

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: short green lawn grass from above with two or three small grey pebbles
Aspect ratio 1:1.
```

### `grad-teren-trava-cvijece.png` — 32×32 · trava s cvijećem

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: short green lawn grass from above with four tiny yellow and white wildflowers
Aspect ratio 1:1.
```

### `grad-teren-zemlja.png` — 32×32 · zemljana staza

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: bare packed dirt path, warm brown, faint footprints, seen from above
Aspect ratio 1:1.
```

### `grad-teren-kaldrma.png` — 32×32 · kaldrma

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: old cobblestone paving of irregular grey stones with visible joints, seen from above
Aspect ratio 1:1.
```

### `grad-teren-plocnik.png` — 32×32 · pločnik

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: plain concrete pavement slabs in a regular grid, pale grey, seen from above
Aspect ratio 1:1.
```

### `grad-teren-pijesak.png` — 32×32 · pijesak

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: fine beach sand, pale warm yellow, very faint ripples, seen from above
Aspect ratio 1:1.
```

### `grad-teren-more.png` — 32×32 · more

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: calm deep sea water surface seen from above, blue, gentle darker ripples, no foam
Aspect ratio 1:1.
```

### `grad-teren-more-plitko.png` — 32×32 · plitko more

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: shallow turquoise sea water over pale sand, seen from above, brighter than deep water
Aspect ratio 1:1.
```

### `grad-teren-potok.png` — 32×32 · potok

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: narrow freshwater stream water seen from above, blue-green, small ripples
Aspect ratio 1:1.
```

### `grad-teren-most.png` — 32×32 · daske mosta

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: wooden bridge planks laid side by side, warm brown boards with visible seams, seen from above
Aspect ratio 1:1.
```

### `grad-teren-stube.png` — 32×32 · stube

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a flight of pale stone steps going upward, seen from above and slightly in front
Aspect ratio 1:1.
```

### `grad-teren-parket.png` — 32×32 · parket dvorane

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: polished light wooden sports hall parquet floor in a herringbone pattern, seen from above
Aspect ratio 1:1.
```

### `grad-teren-travnjak-1.png` — 32×32 · travnjak, svjetlija pruga

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: football pitch grass, lighter mown stripe, seen from above, very even
Aspect ratio 1:1.
```

### `grad-teren-travnjak-2.png` — 32×32 · travnjak, tamnija pruga

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: football pitch grass, darker mown stripe, seen from above, very even
Aspect ratio 1:1.
```

### `grad-teren-atletska-staza.png` — 32×32 · atletska staza

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: red rubber running track surface, seen from above, plain and even
Aspect ratio 1:1.
```

### `grad-teren-crta.png` — 32×32 · bijela crta

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a straight white painted line on green sports grass running across the whole tile, seen from above
Aspect ratio 1:1.
```

### `grad-teren-rub-trava-staza.png` — 32×32 · rub trava→staza

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a transition tile: green grass on the upper half, brown dirt path on the lower half, with a soft irregular border between them, seen from above
Aspect ratio 1:1.
```

### `grad-teren-rub-trava-pijesak.png` — 32×32 · rub trava→pijesak

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a transition tile: green grass on the upper half, pale beach sand on the lower half, with a soft irregular border, seen from above
Aspect ratio 1:1.
```

---

## 2 · Granice

*Zidovi i ograde. Idu vodoravno, ponavljaju se lijevo-desno.*

### `grad-zid-kameni.png` — 32×32 · suhozid

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a low dry-stone wall of stacked pale stones seen from the front, running left to right across the whole tile
Aspect ratio 1:1.
```

### `grad-ograda-drvena.png` — 32×32 · drvena ograda

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a simple wooden fence of two horizontal rails on posts, front view, running left to right across the whole tile
Aspect ratio 1:1.
```

### `grad-ograda-mrezasta.png` — 32×32 · mrežasta ograda

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a chain-link wire mesh fence panel with metal posts, front view, running left to right across the whole tile
Aspect ratio 1:1.
```

### `grad-zivica.png` — 32×32 · živica

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a trimmed dense green hedge seen from the front, running left to right across the whole tile
Aspect ratio 1:1.
```

### `grad-obala-kamena.png` — 32×32 · kamena obala

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: the rocky stone edge where land meets the sea: pale rocks on the upper half, blue water on the lower half, seen from above
Aspect ratio 1:1.
```

### `grad-molo-rub.png` — 32×32 · rub mola

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: the wooden plank edge of a small harbour pier with a mooring bollard, water below, seen from above
Aspect ratio 1:1.
```

---

## 3 · Zgrade

*Svaka je jedna slika. Vrata su uvijek u donjem redu i poravnata s pločicom.*

### `grad-zgrada-kuca-igrac.png` — 128×96 · tvoja kuća

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small two-storey Mediterranean stone house with a terracotta tile roof, blue wooden shutters, a wooden front door centred at the very bottom, and a climbing plant on one wall
Aspect ratio 4:3.
```

### `grad-zgrada-kuca-1.png` — 96×96 · kuća A

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small whitewashed stone town house with a terracotta roof and green shutters, a plain wooden door centred at the very bottom
Aspect ratio 1:1.
```

### `grad-zgrada-kuca-2.png` — 96×96 · kuća B

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small ochre-plastered town house with a terracotta roof, red shutters, a flower box under the window, and a door centred at the very bottom
Aspect ratio 1:1.
```

### `grad-zgrada-kuca-3.png` — 96×96 · kuća C, dvokatnica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a narrow three-storey town house with a terracotta roof, a small balcony with hanging laundry, and a door centred at the very bottom
Aspect ratio 1:1.
```

### `grad-zgrada-knjiznica.png` — 128×96 · knjižnica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a modest old stone library building with tall arched windows and a wide double door centred at the very bottom
Aspect ratio 4:3.
```

### `grad-zgrada-skola.png` — 160×128 · škola

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a two-storey school building with pale plaster, many regular windows, a round clock on the facade, and wide steps up to a double door centred at the very bottom
Aspect ratio 5:4.
```

### `grad-zgrada-pekara.png` — 128×96 · pekara

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small bakery with warm ochre plaster, a big shop window showing loaves of bread, a striped awning, and a door centred at the very bottom
Aspect ratio 4:3.
```

### `grad-zgrada-trznica.png` — 160×96 · tržnica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: an open covered market hall: stone pillars holding a terracotta roof, market stalls visible underneath, and an open entrance centred at the very bottom
Aspect ratio 5:3.
```

### `grad-zgrada-konoba.png` — 128×96 · konoba

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small tavern with stone walls, a grapevine pergola over two outdoor tables, a warm lantern, and a door centred at the very bottom
Aspect ratio 4:3.
```

### `grad-zgrada-posta.png` — 128×96 · pošta

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small post office with pale plaster and a yellow horizontal stripe, a postbox beside a door centred at the very bottom
Aspect ratio 4:3.
```

### `grad-zgrada-muzej.png` — 160×128 · muzej

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small classical museum with a pale stone facade, four columns and a triangular pediment, and wide steps to a door centred at the very bottom
Aspect ratio 5:4.
```

### `grad-zgrada-kino.png` — 128×96 · kino

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small old cinema with a marquee canopy over the entrance, an empty blank poster frame on the wall, and a glass door centred at the very bottom
Aspect ratio 4:3.
```

### `grad-zgrada-ambulanta.png` — 128×96 · ambulanta

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small white clinic building with a clean plain facade, a red cross symbol, and a glass door centred at the very bottom
Aspect ratio 4:3.
```

### `grad-zgrada-crkva.png` — 128×160 · crkva sa zvonikom

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small stone church with a tall bell tower on the left side, a simple round rose window, and an arched wooden door centred at the very bottom
Aspect ratio 4:5.
```

### `grad-zgrada-ribarska-kucica.png` — 96×96 · ribarska kućica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a tiny weathered stone fisherman's hut by the sea with fishing nets hanging on the wall and a wooden door centred at the very bottom
Aspect ratio 1:1.
```

### `grad-zgrada-dvorana.png` — 192×128 · sportska dvorana

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a modern sports hall with a low curved roof, plain pale walls, a row of high narrow windows, and a wide glass entrance centred at the very bottom
Aspect ratio 3:2.
```

### `grad-zgrada-stadion.png` — 192×128 · ulaz na stadion

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: the entrance gate of a small football stadium with a section of covered grandstand seating beside it and an open gate centred at the very bottom
Aspect ratio 3:2.
```

---

## 4 · Krupni objekti

*Sve što se mora uklopiti u teren i ne prolazi kao emoji.*

### `grad-objekt-drvo-1.png` — 64×64 · drvo A

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a broad deciduous tree with a full round leafy crown and a short brown trunk, seen from slightly above
Aspect ratio 1:1.
```

### `grad-objekt-drvo-2.png` — 64×64 · drvo B

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a deciduous tree with a taller narrower crown and a visible fork in the trunk, seen from slightly above
Aspect ratio 1:1.
```

### `grad-objekt-cempres.png` — 32×64 · čempres

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a tall narrow dark green cypress tree seen from the side
Aspect ratio 1:2.
```

### `grad-objekt-palma.png` — 64×80 · palma

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a palm tree with a slender curved trunk and a crown of fronds, seen from the side
Aspect ratio 4:5.
```

### `grad-objekt-grm.png` — 32×32 · grm

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small round green shrub seen from slightly above
Aspect ratio 1:1.
```

### `grad-objekt-fontana.png` — 64×64 · fontana

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small round stone town fountain with water in the basin, seen from slightly above
Aspect ratio 1:1.
```

### `grad-objekt-paviljon.png` — 96×64 · paviljon

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small open park pavilion: six slender posts holding a hexagonal tiled roof, empty underneath
Aspect ratio 3:2.
```

### `grad-objekt-tribina.png` — 96×64 · tribina

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a short section of open stadium grandstand: three rows of bench seating on a concrete frame, front view, designed to repeat side by side
Aspect ratio 3:2.
```

### `grad-objekt-gol.png` — 64×48 · gol

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a football goal with a white frame and net, seen from the front
Aspect ratio 4:3.
```

### `grad-objekt-kos.png` — 32×64 · koš

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a basketball hoop on a pole with a white backboard, seen from the front
Aspect ratio 1:2.
```

### `grad-objekt-semafor.png` — 64×48 · semafor

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a simple stadium scoreboard on two legs with a dark blank panel and no numbers or writing on it
Aspect ratio 4:3.
```

### `grad-objekt-vidikovac.png` — 64×64 · vidikovac

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small stone viewpoint terrace with a low railing and a bench, seen from slightly above
Aspect ratio 1:1.
```

---

## 5 · Igrač i pomoćno

*Četiri smjera istog lika. Radi ih u istom razgovoru, jedan za drugim.*

### `grad-lik-igrac-d.png` — 32×48 · igrač, prema dolje

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a friendly young adult game character standing and facing the viewer, simple modern everyday clothes, calm neutral face, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-igrac-g.png` — 32×48 · igrač, prema gore

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: the same friendly young adult game character seen from behind, standing, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-igrac-l.png` — 32×48 · igrač, lijevo

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: the same friendly young adult game character standing in profile facing left, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-igrac-r.png` — 32×48 · igrač, desno

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: the same friendly young adult game character standing in profile facing right, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-sjena.png` — 32×16 · zajednička sjena

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a soft flat dark oval shadow blob and nothing else
Aspect ratio 2:1.
```

---

## 6 · Portreti (razina 2)

*Lice uz repliku u razgovoru. Najisplativiji dodatak nakon razine 1.*

### `grad-portret-igrac.png` — 64×64 · igrač

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: the player character: a friendly young adult newcomer to the town with a calm neutral expression
Aspect ratio 1:1.
```

### `grad-portret-mara.png` — 64×64 · Baka Mara

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: an elderly kind grandmother in a headscarf and an apron
Aspect ratio 1:1.
```

### `grad-portret-tomislav.png` — 64×64 · susjed Tomislav

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a middle-aged neighbour man in a worn work shirt
Aspect ratio 1:1.
```

### `grad-portret-iva.png` — 64×64 · blizanka Iva

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a cheerful girl of about ten with braided hair
Aspect ratio 1:1.
```

### `grad-portret-ana.png` — 64×64 · blizanka Ana

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a cheerful girl of about ten with a ponytail and a red hair ribbon, the twin sister of the previous girl
Aspect ratio 1:1.
```

### `grad-portret-bruno.png` — 64×64 · knjižničar Bruno

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: an older librarian man with round glasses and a knitted cardigan
Aspect ratio 1:1.
```

### `grad-portret-svirac.png` — 64×64 · ulični svirač

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a young street musician holding a small accordion
Aspect ratio 1:1.
```

### `grad-portret-novinarka.png` — 64×64 · prodavačica novina

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a woman selling newspapers at a kiosk
Aspect ratio 1:1.
```

### `grad-portret-starac.png` — 64×64 · starac na klupi

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a very old man in a flat cap with a walking stick
Aspect ratio 1:1.
```

### `grad-portret-vesna.png` — 64×64 · pekarica Vesna

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a friendly baker woman in a white apron and cap
Aspect ratio 1:1.
```

### `grad-portret-jela.png` — 64×64 · Jela s tržnice

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a market woman in a colourful apron holding a wooden crate
Aspect ratio 1:1.
```

### `grad-portret-ivo.png` — 64×64 · konobar Ivo

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a waiter man in a white shirt with a folded towel over his arm
Aspect ratio 1:1.
```

### `grad-portret-dostavljac.png` — 64×64 · dostavljač

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a young delivery man with a cap carrying a parcel
Aspect ratio 1:1.
```

### `grad-portret-damir.png` — 64×64 · učitelj Damir

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a schoolteacher man in a jacket holding a book
Aspect ratio 1:1.
```

### `grad-portret-luka.png` — 64×64 · dječak Luka

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a boy of about eight with a school backpack
Aspect ratio 1:1.
```

### `grad-portret-sara.png` — 64×64 · učenica Sara

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a schoolgirl of about twelve with a satchel
Aspect ratio 1:1.
```

### `grad-portret-kata.png` — 64×64 · spremačica Kata

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a cleaning lady in a headscarf holding a mop
Aspect ratio 1:1.
```

### `grad-portret-zoran.png` — 64×64 · poštar Zoran

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a postman in a blue uniform with a shoulder bag
Aspect ratio 1:1.
```

### `grad-portret-nada.png` — 64×64 · šalterica Nada

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a post office clerk woman with glasses
Aspect ratio 1:1.
```

### `grad-portret-ema.png` — 64×64 · turistkinja Ema

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a young tourist woman with a sun hat and a camera
Aspect ratio 1:1.
```

### `grad-portret-filip.png` — 64×64 · čuvar Filip

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a museum guard man in a dark uniform
Aspect ratio 1:1.
```

### `grad-portret-razvodnik.png` — 64×64 · razvodnik u kinu

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a cinema usher in a red waistcoat
Aspect ratio 1:1.
```

### `grad-portret-zupnik.png` — 64×64 · župnik

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a parish priest in a black cassock
Aspect ratio 1:1.
```

### `grad-portret-ruza.png` — 64×64 · starica Ruža

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a very old woman in black village clothes with a headscarf
Aspect ratio 1:1.
```

### `grad-portret-klesar.png` — 64×64 · klesar

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a stonemason man in a dusty leather apron
Aspect ratio 1:1.
```

### `grad-portret-slaven.png` — 64×64 · vozač Slaven

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a bus driver man in a uniform shirt and cap
Aspect ratio 1:1.
```

### `grad-portret-mate.png` — 64×64 · ribar Mate

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: an old fisherman in a striped shirt and a cap
Aspect ratio 1:1.
```

### `grad-portret-anka.png` — 64×64 · ribarica Anka

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a fisherwoman in an apron holding a basket
Aspect ratio 1:1.
```

### `grad-portret-turist.png` — 64×64 · turist s kartom

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a tourist man holding an open paper map
Aspect ratio 1:1.
```

### `grad-portret-djeca.png` — 64×64 · dijete koje peca

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a child holding a fishing rod
Aspect ratio 1:1.
```

### `grad-portret-vrtlar.png` — 64×64 · vrtlar

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a gardener in overalls holding a watering can
Aspect ratio 1:1.
```

### `grad-portret-zena-psom.png` — 64×64 · žena sa psom

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a woman walking a small dog on a lead
Aspect ratio 1:1.
```

### `grad-portret-petra.png` — 64×64 · liječnica Petra

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a doctor woman in a white coat
Aspect ratio 1:1.
```

### `grad-portret-boris.png` — 64×64 · trener Boris

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a sports coach man in a tracksuit with a whistle around his neck
Aspect ratio 1:1.
```

### `grad-portret-dario.png` — 64×64 · vratar Dario

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a goalkeeper in a green jersey and gloves
Aspect ratio 1:1.
```

### `grad-portret-lana.png` — 64×64 · atletičarka Lana

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a young female athlete in running kit
Aspect ratio 1:1.
```

### `grad-portret-stipe.png` — 64×64 · domar Stipe

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a caretaker man holding a broom with keys on his belt
Aspect ratio 1:1.
```

### `grad-portret-kreso.png` — 64×64 · navijač Krešo

- [ ] napravljeno

```text
Pixel art character portrait for the dialogue box of a 2D role-playing game, drawn on a 64x64 pixel grid and shown enlarged so every pixel is a crisp square block.
Head and shoulders only, facing the viewer, friendly and calm, clearly readable at small size.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
An ordinary present-day person from a small Croatian coastal town. Not fantasy, not anime, no armour, no weapons, no magic.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else.
No text, no letters, no numbers, no watermark, no logo.

Subject: a football supporter wearing a club scarf
Aspect ratio 1:1.
```

---

## 7 · Likovi na karti (razina 3)

*Radi ih tek nakon portreta, uz priložen portret te osobe — da ostanu ista osoba.*

### `grad-lik-mara.png` — 32×48 · Baka Mara

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: An elderly kind grandmother in a headscarf and an apron, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-tomislav.png` — 32×48 · susjed Tomislav

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A middle-aged neighbour man in a worn work shirt, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-iva.png` — 32×48 · blizanka Iva

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A cheerful girl of about ten with braided hair, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-ana.png` — 32×48 · blizanka Ana

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A cheerful girl of about ten with a ponytail and a red hair ribbon, the twin sister of the previous girl, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-bruno.png` — 32×48 · knjižničar Bruno

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: An older librarian man with round glasses and a knitted cardigan, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-svirac.png` — 32×48 · ulični svirač

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A young street musician holding a small accordion, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-novinarka.png` — 32×48 · prodavačica novina

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A woman selling newspapers at a kiosk, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-starac.png` — 32×48 · starac na klupi

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A very old man in a flat cap with a walking stick, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-vesna.png` — 32×48 · pekarica Vesna

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A friendly baker woman in a white apron and cap, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-jela.png` — 32×48 · Jela s tržnice

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A market woman in a colourful apron holding a wooden crate, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-ivo.png` — 32×48 · konobar Ivo

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A waiter man in a white shirt with a folded towel over his arm, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-dostavljac.png` — 32×48 · dostavljač

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A young delivery man with a cap carrying a parcel, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-damir.png` — 32×48 · učitelj Damir

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A schoolteacher man in a jacket holding a book, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-luka.png` — 32×48 · dječak Luka

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A boy of about eight with a school backpack, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-sara.png` — 32×48 · učenica Sara

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A schoolgirl of about twelve with a satchel, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-kata.png` — 32×48 · spremačica Kata

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A cleaning lady in a headscarf holding a mop, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-zoran.png` — 32×48 · poštar Zoran

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A postman in a blue uniform with a shoulder bag, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-nada.png` — 32×48 · šalterica Nada

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A post office clerk woman with glasses, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-ema.png` — 32×48 · turistkinja Ema

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A young tourist woman with a sun hat and a camera, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-filip.png` — 32×48 · čuvar Filip

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A museum guard man in a dark uniform, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-razvodnik.png` — 32×48 · razvodnik u kinu

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A cinema usher in a red waistcoat, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-zupnik.png` — 32×48 · župnik

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A parish priest in a black cassock, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-ruza.png` — 32×48 · starica Ruža

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A very old woman in black village clothes with a headscarf, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-klesar.png` — 32×48 · klesar

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A stonemason man in a dusty leather apron, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-slaven.png` — 32×48 · vozač Slaven

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A bus driver man in a uniform shirt and cap, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-mate.png` — 32×48 · ribar Mate

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: An old fisherman in a striped shirt and a cap, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-anka.png` — 32×48 · ribarica Anka

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A fisherwoman in an apron holding a basket, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-turist.png` — 32×48 · turist s kartom

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A tourist man holding an open paper map, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-djeca.png` — 32×48 · dijete koje peca

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A child holding a fishing rod, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-vrtlar.png` — 32×48 · vrtlar

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A gardener in overalls holding a watering can, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-zena-psom.png` — 32×48 · žena sa psom

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A woman walking a small dog on a lead, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-petra.png` — 32×48 · liječnica Petra

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A doctor woman in a white coat, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-boris.png` — 32×48 · trener Boris

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A sports coach man in a tracksuit with a whistle around his neck, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-dario.png` — 32×48 · vratar Dario

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A goalkeeper in a green jersey and gloves, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-lana.png` — 32×48 · atletičarka Lana

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A young female athlete in running kit, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-stipe.png` — 32×48 · domar Stipe

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A caretaker man holding a broom with keys on his belt, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

### `grad-lik-kreso.png` — 32×48 · navijač Krešo

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: A football supporter wearing a club scarf, standing and facing the viewer, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3.
```

---

## 8 · Interijeri i sitnice (razina 4)

*Namještaj i rekviziti. Najniži prioritet — do tada sve ovo radi kao emoji.*

### `grad-unut-pod-drveni.png` — 32×32 · drveni pod

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a plain wooden plank floor seen from above, warm brown boards
Aspect ratio 1:1.
```

### `grad-unut-pod-plocice.png` — 32×32 · pod od pločica

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a plain square tiled floor seen from above, pale and clean
Aspect ratio 1:1.
```

### `grad-unut-pod-kamen.png` — 32×32 · kameni pod

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: an old stone slab floor seen from above, grey and worn
Aspect ratio 1:1.
```

### `grad-unut-pod-tepison.png` — 32×32 · tepison

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a plain flat carpet floor seen from above, muted dark red
Aspect ratio 1:1.
```

### `grad-unut-zid-1.png` — 32×32 · zid, obojan

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a plain painted interior wall seen from the front, pale warm colour, with a simple skirting board along the bottom
Aspect ratio 1:1.
```

### `grad-unut-zid-2.png` — 32×32 · zid s lamperijom

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: an interior wall with vertical wooden panelling seen from the front
Aspect ratio 1:1.
```

### `grad-unut-zid-3.png` — 32×32 · kameni zid

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a 32x32 pixel grid and shown enlarged so every pixel is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: an interior wall of old stone blocks seen from the front
Aspect ratio 1:1.
```

### `grad-unut-prozor.png` — 32×32 · unutarnji prozor

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a simple interior window with a wooden frame and daylight behind it
Aspect ratio 1:1.
```

### `grad-unut-vrata.png` — 32×32 · unutarnja vrata

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a simple closed wooden interior door seen from the front
Aspect ratio 1:1.
```

### `grad-unut-otirac.png` — 32×32 · otirač

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a plain rectangular doormat seen from above
Aspect ratio 1:1.
```

### `grad-unut-pult-drveni.png` — 64×32 · drveni pult

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a wooden shop counter seen from the front
Aspect ratio 2:1.
```

### `grad-unut-pult-kamen.png` — 64×32 · kameni pult

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a stone market counter seen from the front
Aspect ratio 2:1.
```

### `grad-unut-salter.png` — 64×32 · šalter

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a post office service counter with a glass partition above it, seen from the front
Aspect ratio 2:1.
```

### `grad-unut-police-knjige.png` — 32×64 · police s knjigama

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a tall bookshelf full of books seen from the front
Aspect ratio 1:2.
```

### `grad-unut-police-roba.png` — 32×64 · police s robom

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a tall shop shelf unit with jars and boxes seen from the front
Aspect ratio 1:2.
```

### `grad-unut-vitrina.png` — 64×32 · vitrina

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a low glass display case with a wooden frame seen from the front
Aspect ratio 2:1.
```

### `grad-unut-stand-1.png` — 64×48 · štand s voćem

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a market stall table piled with fruit seen from the front
Aspect ratio 4:3.
```

### `grad-unut-stand-2.png` — 64×48 · štand s povrćem

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a market stall table piled with vegetables seen from the front
Aspect ratio 4:3.
```

### `grad-unut-stol.png` — 64×32 · stol

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a plain wooden table seen from slightly above
Aspect ratio 2:1.
```

### `grad-unut-stolica.png` — 32×32 · stolica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a simple wooden chair seen from the front
Aspect ratio 1:1.
```

### `grad-unut-klupa-skolska.png` — 64×32 · školska klupa

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a school desk with an attached bench seen from slightly above
Aspect ratio 2:1.
```

### `grad-unut-ploca.png` — 64×48 · školska ploča

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a blank dark green school blackboard on a wooden stand, with nothing written on it
Aspect ratio 4:3.
```

### `grad-unut-krevet.png` — 32×64 · krevet

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a simple single bed with a blanket and pillow seen from above
Aspect ratio 1:2.
```

### `grad-unut-ormar.png` — 32×64 · ormar

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a tall plain wooden wardrobe seen from the front
Aspect ratio 1:2.
```

### `grad-unut-pec.png` — 32×48 · krušna peć

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a traditional brick bread oven with an arched opening seen from the front
Aspect ratio 2:3.
```

### `grad-unut-kasa.png` — 32×32 · blagajna

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: an old mechanical cash register seen from the front
Aspect ratio 1:1.
```

### `grad-unut-sanduk.png` — 32×32 · sanduk

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a closed wooden crate seen from slightly above
Aspect ratio 1:1.
```

### `grad-unut-tepih-1.png` — 64×64 · tepih, topli

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a rectangular patterned rug in warm red and ochre tones seen from above
Aspect ratio 1:1.
```

### `grad-unut-tepih-2.png` — 64×64 · tepih, hladni

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a rectangular patterned rug in cool blue and grey tones seen from above
Aspect ratio 1:1.
```

### `grad-unut-sat.png` — 32×32 · zidni sat

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a round wall clock with blank hands and no numbers on the face
Aspect ratio 1:1.
```

### `grad-unut-biljka.png` — 32×32 · biljka u loncu

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small green potted plant in a terracotta pot
Aspect ratio 1:1.
```

### `grad-unut-oltar.png` — 64×48 · oltar

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a simple stone church altar with a cloth and two candles, seen from the front
Aspect ratio 4:3.
```

### `grad-unut-klupa-crkva.png` — 64×32 · crkvena klupa

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a long wooden church pew seen from slightly above
Aspect ratio 2:1.
```

### `grad-unut-svijecnjak.png` — 32×48 · svijećnjak

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a tall iron candle stand holding several lit candles
Aspect ratio 2:3.
```

### `grad-unut-mreza.png` — 32×32 · ribarska mreža

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a fishing net hanging on a wall, seen from the front
Aspect ratio 1:1.
```

### `grad-unut-sanduk-riba.png` — 32×32 · sanduk s ribom

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a wooden crate full of fresh fish seen from slightly above
Aspect ratio 1:1.
```

### `grad-unut-svlacionica-klupa.png` — 64×32 · klupa u svlačionici

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a plain wooden changing room bench seen from the front
Aspect ratio 2:1.
```

### `grad-unut-ormaric.png` — 32×48 · ormarić

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a narrow metal locker seen from the front
Aspect ratio 2:3.
```

### `grad-vanj-klupa.png` — 64×32 · klupa

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a park bench with wooden slats and iron legs seen from the front
Aspect ratio 2:1.
```

### `grad-vanj-fenjer.png` — 32×64 · fenjer

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: an old iron street lamp on a post seen from the front
Aspect ratio 1:2.
```

### `grad-vanj-sanducic.png` — 32×32 · sandučić

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a yellow public postbox on a post seen from the front
Aspect ratio 1:1.
```

### `grad-vanj-kos-smece.png` — 32×32 · koš za smeće

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a simple public litter bin seen from the front
Aspect ratio 1:1.
```

### `grad-vanj-tabla.png` — 32×32 · tabla s natpisom

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small blank wooden signboard on a post, with no writing on it at all
Aspect ratio 1:1.
```

### `grad-vanj-plakat.png` — 32×48 · plakat

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a blank paper poster pinned on a wall, with no writing or picture on it
Aspect ratio 2:3.
```

### `grad-vanj-bicikl.png` — 32×32 · bicikl

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a small pixel grid and shown enlarged so every pixel is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: an old bicycle leaning sideways, seen from the side
Aspect ratio 1:1.
```

---

## Kad nešto pođe po zlu

| problem | dopiši u prompt |
|---|---|
| napisao je natpis na zgradi | `Remove all text and lettering. Leave every sign completely blank.` |
| dodao je sjenu na tlu | `No shadow on the ground. Plain magenta right up to the edge of the object.` |
| izgleda kao vektor, ne kao pixel art | `Visible chunky pixels, low resolution look, hard jagged edges, like a Super Nintendo game.` |
| boje ne odgovaraju | priloži `grad-paleta.png` i dopiši `Use only the colours in the attached palette image.` |
| pločica se vidljivo ponavlja | `Much calmer and flatter, almost uniform, no distinctive features anywhere.` |
| lik je prevelik u okviru | `Full body from head to feet, the whole figure must fit inside the frame with the feet touching the bottom edge.` |