# Konverzija slika u WebP — uputa

Radi se **nakon** što nabavite ostatak slika (svih ~500 u mapi `slike/`).
Skripta: `konvertiraj-slike.js`. Originali se ne diraju.

---

## 1. Priprema (samo prvi put)

U mapi projekta otvorite PowerShell i pokrenite:

```
npm install sharp
```

## 2. Konverzija

```
node konvertiraj-slike.js
```

Skripta uzima `slike/*.png`, zapisuje `slike-web/*.webp`, najveća strana 512 px,
kvaliteta 82. Nazivi ostaju identični, samo se mijenja ekstenzija
(`Ananas.png` → `Ananas.webp`), dijakritika se čuva.

**Idempotentna je** — preskače sve što je već konvertirano. Kad kasnije dodate
još slika, samo je pokrenite iznova i obradit će isključivo nove.

Ako želite prvo vidjeti što bi napravila, bez pisanja:

```
node konvertiraj-slike.js --probno
```

Ostale opcije: `--velicina=768`, `--kvaliteta=90`, `--sve` (ponovi sve),
`--ulaz=`, `--izlaz=`.

## 3. Tri izmjene u kodu

Ove tri linije još pokazuju na staru mapu. Bez njih aplikacija nastavlja
koristiti PNG-ove i konverzija nema efekta.

### a) `osvjezi.js`, linija 163

Da `data.js` pokupi WebP putanje. Zamijenite:

```js
const slikeDir = path.join(root, 'slike');
if (fs.existsSync(slikeDir)) {
  for (const f of fs.readdirSync(slikeDir).sort()) {
```

s:

```js
// slike-web (WebP) ima prednost; slike/ ostaje kao rezerva za nekonvertirano
for (const mapa of ['slike-web', 'slike']) {
  const slikeDir = path.join(root, mapa);
  if (!fs.existsSync(slikeDir)) continue;
  for (const f of fs.readdirSync(slikeDir).sort()) {
```

i unutar petlje zamijenite:

```js
    if (k && !(k in slike)) slike[k] = 'slike/' + f;
```

s:

```js
    if (k && !(k in slike)) slike[k] = mapa + '/' + f;
```

Zatvarajuće vitičaste zagrade ostaju kako su — vanjski `for` preuzima mjesto
starog `if`-a. Redoslijed u nizu je važan: `slike-web` prvi, jer postojeća
provjera `!(k in slike)` zadržava prvi nalaz za svaki pojam.

### b) `app.html`, linija 1929 — Blobby maskota

```js
return 'slike/Blobby' + (1 + Math.floor(Math.random() * 9)) + '.png';
```

→

```js
return 'slike-web/Blobby' + (1 + Math.floor(Math.random() * 9)) + '.webp';
```

### c) `lekcija-0.html`, linija 363

```js
i.src = encodeURI('slike/' + w.img); i.alt = w.hr; i.loading = 'lazy';
```

→

```js
i.src = encodeURI('slike-web/' + w.img.replace(/\.[^.]+$/, '.webp')); i.alt = w.hr; i.loading = 'lazy';
```

*(`__kartice-tmp.html` ima istu Blobby liniju, ali je privremena datoteka i ne
poslužuje se — preskočite je ili obrišite.)*

## 4. Osvježite podatke i provjerite

```
node osvjezi.js
```

Otvorite `app.html` i provjerite da se slike prikazuju. U DevTools → Network
filtrirajte po `Img`: putanje moraju biti `slike-web/...webp`.

## 5. Kod objave

U deployment ne trebate uključiti mapu `slike/` — samo `slike-web/`.
Time ide ~4 MB umjesto ~215 MB.

---

## Izmjereno na 236 postojećih slika

| | |
|---|---|
| Prije | 214,9 MB |
| Poslije | 4,5 MB |
| Ušteda | 98 % |
| Prosjek po slici | 912 KB → 19 KB |

Sve 236 provjereno: ispravan WebP, 512×512 (10 nekvadratnih → 512×279),
nazivi s dijakritikom (`Brašno`, `Cvijeće`, `Džem`) neoštećeni.

Za ~500 slika očekujte **oko 9–10 MB** ukupno.

### O prozirnosti

165 od 236 PNG-ova ima alpha kanal, ali je u svima **potpuno neproziran** —
nijedna slika ne koristi stvarnu prozirnost. WebP ih zato zapisuje kao 3-kanalne
i ništa se ne gubi. Ako u novoj seriji slika **bude** stvarne prozirnosti
(npr. ilustracije bez podloge za slaganje preko boje), recite mi — tada u
skriptu treba dodati `alphaQuality: 100`, a za slike s prozirnošću je često
bolji `lossless: true`.

### Zašto 512 px

Slike se prikazuju na 92–126 px, a najviše ~300 px u mrežastim vježbama
(`.poljeSpoj img`, `.cigla img` idu `width: 100%`). 512 px pokriva dvostruku
gustoću za retina ekrane. Originali 1024×1024 ostaju u `slike/` pa se uvijek
možete vratiti na veću rezoluciju s `--velicina=768 --sve`.
