# Grad v2 — promptovi, 1. dio: obavezno

**60 sličica bez kojih igra ne može.** Teren, granice, zgrade, krupni objekti i igrač.
Sve ostalo u igri do daljnjega ostaje emoji.

Nastavak: `GRAD-promptovi-2-nadogradnja.md` (portreti, likovi, sitnice).

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

## Sadržaj

- [1 · Teren](#1-teren) — 20 kom
- [2 · Granice](#2-granice) — 6 kom
- [3 · Zgrade](#3-zgrade) — 17 kom
- [4 · Krupni objekti](#4-krupni-objekti) — 12 kom
- [5 · Igrač i pomoćno](#5-igrač-i-pomoćno) — 5 kom

---

## 1 · Teren

*Pločice koje se ponavljaju po cijeloj karti. Najteže su — moraju biti bešavne.*

### `grad-teren-trava-1.png` — 32×32 · osnovna trava

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: short green lawn grass seen from straight above, even and calm, only a few blades of texture
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-trava-2.png` — 32×32 · trava, varijanta

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: short green lawn grass from above, slightly more blades and one lighter patch
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-trava-3.png` — 32×32 · trava s kamenčićima

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: short green lawn grass from above with two or three small grey pebbles
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-trava-cvijece.png` — 32×32 · trava s cvijećem

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: short green lawn grass from above with four tiny yellow and white wildflowers
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-zemlja.png` — 32×32 · zemljana staza

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: bare packed dirt path, warm brown, faint footprints, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-kaldrma.png` — 32×32 · kaldrma

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: old cobblestone paving of irregular grey stones with visible joints, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-plocnik.png` — 32×32 · pločnik

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: plain concrete pavement slabs in a regular grid, pale grey, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-pijesak.png` — 32×32 · pijesak

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: fine beach sand, pale warm yellow, very faint ripples, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-more.png` — 32×32 · more

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: calm deep sea water surface seen from above, blue, gentle darker ripples, no foam
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-more-plitko.png` — 32×32 · plitko more

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: shallow turquoise sea water over pale sand, seen from above, brighter than deep water
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-potok.png` — 32×32 · potok

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: narrow freshwater stream water seen from above, blue-green, small ripples
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-most.png` — 32×32 · daske mosta

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: wooden bridge planks laid side by side, warm brown boards with visible seams, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-stube.png` — 32×32 · stube

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a flight of pale stone steps going upward, seen from above and slightly in front
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-parket.png` — 32×32 · parket dvorane

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: polished light wooden sports hall parquet floor in a herringbone pattern, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-travnjak-1.png` — 32×32 · travnjak, svjetlija pruga

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: football pitch grass, lighter mown stripe, seen from above, very even
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-travnjak-2.png` — 32×32 · travnjak, tamnija pruga

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: football pitch grass, darker mown stripe, seen from above, very even
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-atletska-staza.png` — 32×32 · atletska staza

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: red rubber running track surface, seen from above, plain and even
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-crta.png` — 32×32 · bijela crta

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a straight white painted line on green sports grass running across the whole tile, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-rub-trava-staza.png` — 32×32 · rub trava→staza

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a transition tile: green grass on the upper half, brown dirt path on the lower half, with a soft irregular border between them, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-teren-rub-trava-pijesak.png` — 32×32 · rub trava→pijesak

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a transition tile: green grass on the upper half, pale beach sand on the lower half, with a soft irregular border, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

---

## 2 · Granice

*Zidovi i ograde. Idu vodoravno, ponavljaju se lijevo-desno.*

### `grad-zid-kameni.png` — 32×32 · suhozid

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a low dry-stone wall of stacked pale stones seen from the front, running left to right across the whole tile
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-ograda-drvena.png` — 32×32 · drvena ograda

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a simple wooden fence of two horizontal rails on posts, front view, running left to right across the whole tile
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-ograda-mrezasta.png` — 32×32 · mrežasta ograda

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a chain-link wire mesh fence panel with metal posts, front view, running left to right across the whole tile
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zivica.png` — 32×32 · živica

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: a trimmed dense green hedge seen from the front, running left to right across the whole tile
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-obala-kamena.png` — 32×32 · kamena obala

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: the rocky stone edge where land meets the sea: pale rocks on the upper half, blue water on the lower half, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-molo-rub.png` — 32×32 · rub mola

- [ ] napravljeno

```text
Pixel art terrain tile for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
The texture must FILL THE WHOLE FRAME edge to edge and TILE SEAMLESSLY on all four sides: the left edge must continue into the right edge, and the top edge into the bottom edge.
Flat colours only. No gradients, no anti-aliasing, no blur, no soft shadows, no glow, no vignette, no directional lighting.
Keep it calm and low in contrast, because this tile repeats hundreds of times and any strong feature would visibly repeat.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town.
No text, no letters, no numbers, no watermark, no logo, no border, no frame.

Subject: the wooden plank edge of a small harbour pier with a mooring bollard, water below, seen from above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

---

## 3 · Zgrade

*Svaka je jedna slika. Vrata su uvijek u donjem redu i poravnata s pločicom.*

### `grad-zgrada-kuca-igrac.png` — 128×96 · tvoja kuća

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 128x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small two-storey Mediterranean stone house with a terracotta tile roof, blue wooden shutters, a wooden front door centred at the very bottom, and a climbing plant on one wall
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 128x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 128x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-kuca-1.png` — 96×96 · kuća A

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 96x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small whitewashed stone town house with a terracotta roof and green shutters, a plain wooden door centred at the very bottom
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 96x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 96x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-kuca-2.png` — 96×96 · kuća B

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 96x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small ochre-plastered town house with a terracotta roof, red shutters, a flower box under the window, and a door centred at the very bottom
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 96x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 96x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-kuca-3.png` — 96×96 · kuća C, dvokatnica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 96x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a narrow three-storey town house with a terracotta roof, a small balcony with hanging laundry, and a door centred at the very bottom
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 96x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 96x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-knjiznica.png` — 128×96 · knjižnica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 128x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a modest old stone library building with tall arched windows and a wide double door centred at the very bottom
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 128x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 128x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-skola.png` — 160×128 · škola

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 160x128 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a two-storey school building with pale plaster, many regular windows, a round clock on the facade, and wide steps up to a double door centred at the very bottom
Aspect ratio 5:4. The whole design must stay readable when it is reduced to exactly 160x128 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 160x128 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-pekara.png` — 128×96 · pekara

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 128x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small bakery with warm ochre plaster, a big shop window showing loaves of bread, a striped awning, and a door centred at the very bottom
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 128x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 128x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-trznica.png` — 160×96 · tržnica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 160x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: an open covered market hall: stone pillars holding a terracotta roof, market stalls visible underneath, and an open entrance centred at the very bottom
Aspect ratio 5:3. The whole design must stay readable when it is reduced to exactly 160x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 160x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-konoba.png` — 128×96 · konoba

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 128x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small tavern with stone walls, a grapevine pergola over two outdoor tables, a warm lantern, and a door centred at the very bottom
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 128x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 128x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-posta.png` — 128×96 · pošta

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 128x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small post office with pale plaster and a yellow horizontal stripe, a postbox beside a door centred at the very bottom
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 128x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 128x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-muzej.png` — 160×128 · muzej

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 160x128 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small classical museum with a pale stone facade, four columns and a triangular pediment, and wide steps to a door centred at the very bottom
Aspect ratio 5:4. The whole design must stay readable when it is reduced to exactly 160x128 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 160x128 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-kino.png` — 128×96 · kino

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 128x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small old cinema with a marquee canopy over the entrance, an empty blank poster frame on the wall, and a glass door centred at the very bottom
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 128x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 128x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-ambulanta.png` — 128×96 · ambulanta

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 128x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small white clinic building with a clean plain facade, a red cross symbol, and a glass door centred at the very bottom
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 128x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 128x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-crkva.png` — 128×160 · crkva sa zvonikom

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 128x160 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small stone church with a tall bell tower on the left side, a simple round rose window, and an arched wooden door centred at the very bottom
Aspect ratio 4:5. The whole design must stay readable when it is reduced to exactly 128x160 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 128x160 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-ribarska-kucica.png` — 96×96 · ribarska kućica

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 96x96 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a tiny weathered stone fisherman's hut by the sea with fishing nets hanging on the wall and a wooden door centred at the very bottom
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 96x96 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 96x96 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-dvorana.png` — 192×128 · sportska dvorana

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 192x128 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a modern sports hall with a low curved roof, plain pale walls, a row of high narrow windows, and a wide glass entrance centred at the very bottom
Aspect ratio 3:2. The whole design must stay readable when it is reduced to exactly 192x128 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 192x128 pixel image. Do not add detail that would disappear at that size.
```

### `grad-zgrada-stadion.png` — 192×128 · ulaz na stadion

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 192x128 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: the entrance gate of a small football stadium with a section of covered grandstand seating beside it and an open gate centred at the very bottom
Aspect ratio 3:2. The whole design must stay readable when it is reduced to exactly 192x128 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 192x128 pixel image. Do not add detail that would disappear at that size.
```

---

## 4 · Krupni objekti

*Sve što se mora uklopiti u teren i ne prolazi kao emoji.*

### `grad-objekt-drvo-1.png` — 64×64 · drvo A

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 64x64 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a broad deciduous tree with a full round leafy crown and a short brown trunk, seen from slightly above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 64x64 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 64x64 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-drvo-2.png` — 64×64 · drvo B

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 64x64 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a deciduous tree with a taller narrower crown and a visible fork in the trunk, seen from slightly above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 64x64 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 64x64 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-cempres.png` — 32×64 · čempres

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x64 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a tall narrow dark green cypress tree seen from the side
Aspect ratio 1:2. The whole design must stay readable when it is reduced to exactly 32x64 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x64 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-palma.png` — 64×80 · palma

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 64x80 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a palm tree with a slender curved trunk and a crown of fronds, seen from the side
Aspect ratio 4:5. The whole design must stay readable when it is reduced to exactly 64x80 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 64x80 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-grm.png` — 32×32 · grm

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x32 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small round green shrub seen from slightly above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 32x32 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x32 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-fontana.png` — 64×64 · fontana

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 64x64 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small round stone town fountain with water in the basin, seen from slightly above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 64x64 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 64x64 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-paviljon.png` — 96×64 · paviljon

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 96x64 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small open park pavilion: six slender posts holding a hexagonal tiled roof, empty underneath
Aspect ratio 3:2. The whole design must stay readable when it is reduced to exactly 96x64 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 96x64 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-tribina.png` — 96×64 · tribina

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 96x64 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a short section of open stadium grandstand: three rows of bench seating on a concrete frame, front view, designed to repeat side by side
Aspect ratio 3:2. The whole design must stay readable when it is reduced to exactly 96x64 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 96x64 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-gol.png` — 64×48 · gol

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 64x48 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a football goal with a white frame and net, seen from the front
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 64x48 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 64x48 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-kos.png` — 32×64 · koš

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x64 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a basketball hoop on a pole with a white backboard, seen from the front
Aspect ratio 1:2. The whole design must stay readable when it is reduced to exactly 32x64 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x64 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-semafor.png` — 64×48 · semafor

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 64x48 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a simple stadium scoreboard on two legs with a dark blank panel and no numbers or writing on it
Aspect ratio 4:3. The whole design must stay readable when it is reduced to exactly 64x48 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 64x48 pixel image. Do not add detail that would disappear at that size.
```

### `grad-objekt-vidikovac.png` — 64×64 · vidikovac

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 64x64 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a small stone viewpoint terrace with a low railing and a bench, seen from slightly above
Aspect ratio 1:1. The whole design must stay readable when it is reduced to exactly 64x64 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 64x64 pixel image. Do not add detail that would disappear at that size.
```

---

## 5 · Igrač i pomoćno

*Četiri smjera istog lika. Radi ih u istom razgovoru, jedan za drugim.*

### `grad-lik-igrac-d.png` — 32×48 · igrač, prema dolje

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x48 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a friendly young adult game character standing and facing the viewer, simple modern everyday clothes, calm neutral face, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3. The whole design must stay readable when it is reduced to exactly 32x48 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x48 pixel image. Do not add detail that would disappear at that size.
```

### `grad-lik-igrac-g.png` — 32×48 · igrač, prema gore

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x48 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: the same friendly young adult game character seen from behind, standing, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3. The whole design must stay readable when it is reduced to exactly 32x48 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x48 pixel image. Do not add detail that would disappear at that size.
```

### `grad-lik-igrac-l.png` — 32×48 · igrač, lijevo

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x48 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: the same friendly young adult game character standing in profile facing left, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3. The whole design must stay readable when it is reduced to exactly 32x48 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x48 pixel image. Do not add detail that would disappear at that size.
```

### `grad-lik-igrac-r.png` — 32×48 · igrač, desno

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x48 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: the same friendly young adult game character standing in profile facing right, FULL BODY from head to feet with the feet at the very bottom of the frame
Aspect ratio 2:3. The whole design must stay readable when it is reduced to exactly 32x48 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x48 pixel image. Do not add detail that would disappear at that size.
```

### `grad-sjena.png` — 32×16 · zajednička sjena

- [ ] napravljeno

```text
Pixel art sprite for a 2D top-down role-playing game, drawn on a grid of EXACTLY 32x16 PIXELS and shown enlarged so every one of those pixels is a crisp square block.
A SINGLE object, centred, filling most of the frame, seen from the front or slightly above in the classic 3/4 top-down RPG view.
Flat colours only. No gradients, no anti-aliasing, no blur, no glow. Clean dark outline in colour #2B2118 around the silhouette.
NO shadow on the ground and NO ground or scenery under the object, because the game adds those itself.
Use ONLY these colours: #2B2118 #4A3826 #6E5B48 #8B6142 #C89B72 #E8D8A8 #F3E7D4 #FFF8EF #3F6B22 #5E8F33 #7CB342 #A8CF7A #2E6E93 #4A9BC4 #74BEDC #635A50 #8C8072 #B9AC96 #8E3B2A #C4553D #E8623A #E89A2C #F4B942 #7B5EA7.
Warm sunlit mood of a small Croatian coastal town: terracotta roofs, pale stone, olive greens, Adriatic blue.
The background must be PLAIN SOLID MAGENTA #FF00FF and absolutely nothing else. No grass, no sky, no floor, no border.
No text, no letters, no numbers, no signage, no watermark, no logo.

Subject: a soft flat dark oval shadow blob and nothing else
Aspect ratio 2:1. The whole design must stay readable when it is reduced to exactly 32x16 pixels, so keep the shapes big and simple: no detail smaller than one pixel of that grid.

IMPORTANT: this is a 32x16 pixel image. Do not add detail that would disappear at that size.
```

---


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
