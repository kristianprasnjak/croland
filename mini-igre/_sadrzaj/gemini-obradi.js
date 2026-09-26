/* =====================================================================
   Croland mini-igre — obrada Gemini slika
   ---------------------------------------------------------------------
   Pokretanje:  node _sadrzaj/gemini-obradi.js      (iz mape mini-igre)

   Gemini ne vraća pravi pixel art nego veliku sliku koja tako izgleda.
   Ova skripta od nje radi pravu malu sliku za igru:

     1. uzme datoteku iz  ../slike nekompresirano/gemini-mini/<naziv>.png
        (naziv = točan naziv iz MINI-gemini-promptovi.md; .jpg i .webp isto rade)
     2. ako slika treba prozirnost — makne magenta pozadinu (#FF00FF)
     3. izreže i smanji na točnu veličinu u pikselima (tablica niže)
     4. svede na najviše 32 boje, bez ditheringa (čisti pixel art)
     5. spremi u  mini games media/<naziv>.png

   Igre same povećavaju sliku oštrim pikselima. Pokreni skriptu koliko god
   puta treba — prepisuje samo slike koje su u ulaznoj mapi.
   ===================================================================== */

var fs = require('fs');
var path = require('path');
var sharp = require(path.resolve(__dirname, '..', '..', 'node_modules', 'sharp'));

var ULAZ = path.resolve(__dirname, '..', '..', 'slike nekompresirano', 'gemini-mini');
var IZLAZ = path.resolve(__dirname, '..', 'mini games media');

/* naziv: [širina, visina, prozirno?, broj boja] */
var SLIKE = {
  /* 04 Tvrđava — pozadine 320×180, portreti 64×64, namirnice 24×24 (igra ih prikazuje veće) */
  'tvr-naslovna':        [320, 180, false, 32],
  'tvr-soba-vrata':      [320, 180, false, 32],
  'tvr-soba-dvoriste':   [320, 180, false, 32],
  'tvr-soba-kuhinja':    [320, 180, false, 32],
  'tvr-soba-knjiznica':  [320, 180, false, 32],
  'tvr-soba-toranj':     [320, 180, false, 32],
  'tvr-soba-straza':     [320, 180, false, 32],
  'tvr-soba-radionica':  [320, 180, false, 32],
  'tvr-soba-kapelica':   [320, 180, false, 32],
  'tvr-soba-pisarnica':  [320, 180, false, 32],
  'tvr-soba-tamnica':    [320, 180, false, 32],
  'tvr-soba-podrum':     [320, 180, false, 32],
  'tvr-soba-dvorana':    [320, 180, false, 32],
  'tvr-lik-lucija':      [64, 64, false, 24],
  'tvr-lik-ivo':         [64, 64, false, 24],
  'tvr-lik-ivoZiv':      [64, 64, false, 24],
  'tvr-lik-jela':        [64, 64, false, 24],
  'tvr-lik-rok':         [64, 64, false, 24],
  'tvr-lik-nika':        [64, 64, false, 24],
  'tvr-lik-jure':        [64, 64, false, 24],
  'tvr-lik-marin':       [64, 64, false, 24],
  'tvr-lik-lovro':       [64, 64, false, 24],
  'tvr-lik-horvat':      [64, 64, false, 24],
  'tvr-lik-mira':        [64, 64, false, 24],
  'tvr-hrana-paprika':   [24, 24, true, 12, 6],     /* 5. broj: dodatno oštro povećanje (24 → 144) */
  'tvr-hrana-med':       [24, 24, true, 12, 6],
  /* 05 Konoba — traka iza gostiju */
  'konoba-interijer':    [384, 72, false, 32],
  /* 07 Poštanski vlak — kolodvor iza vlaka */
  'vlak-kolodvor':       [360, 80, false, 32],
  /* 10 Portal — pozadine obale, vodoravno se ponavljaju */
  'portal-pozadina-1':   [256, 150, true, 32],
  'portal-pozadina-2':   [256, 150, true, 32],
  'portal-pozadina-3':   [256, 150, true, 32],
  /* 12 Obrana baze — nebo iznad baze (obično i pojačani val) */
  'obrana-nebo':         [280, 110, false, 32],
  'obrana-nebo-jak':     [280, 110, false, 32]
};

function makniMagentu(buf, w, h) {
  for (var i = 0; i < w * h; i++) {
    var r = buf[i * 4], g = buf[i * 4 + 1], b = buf[i * 4 + 2];
    if (r > 200 && b > 200 && g < 90) buf[i * 4 + 3] = 0;
  }
  return buf;
}

(async function () {
  if (!fs.existsSync(ULAZ)) { fs.mkdirSync(ULAZ, { recursive: true }); console.log('Napravljena ulazna mapa: ' + ULAZ); }
  var datoteke = fs.readdirSync(ULAZ).filter(function (f) { return /\.(png|jpe?g|webp)$/i.test(f); });
  if (!datoteke.length) { console.log('Ulazna mapa je prazna: ' + ULAZ); return; }
  var nepoznate = [];
  for (var k = 0; k < datoteke.length; k++) {
    var f = datoteke[k], ime = f.replace(/\.(png|jpe?g|webp)$/i, '');
    var d = SLIKE[ime];
    if (!d) { nepoznate.push(f); continue; }
    var w = d[0], h = d[1], prozirno = d[2], boje = d[3], povecaj = d[4] || 1;
    var slika = sharp(path.join(ULAZ, f)).ensureAlpha();
    if (prozirno) {
      var s = await slika.raw().toBuffer({ resolveWithObject: true });
      slika = sharp(makniMagentu(s.data, s.info.width, s.info.height), { raw: s.info }).trim();
    }
    var mala = await slika.resize(w, h, { fit: prozirno ? 'contain' : 'cover', kernel: 'lanczos3',
      background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    var krajnja = sharp(mala);
    if (povecaj > 1) krajnja = sharp(await krajnja.resize(w * povecaj, h * povecaj, { kernel: 'nearest' }).png().toBuffer());
    await krajnja.png({ palette: true, colors: boje, dither: 0 }).toFile(path.join(IZLAZ, ime + '.png'));
    console.log('  ✓ ' + ime + '.png  ' + (w * povecaj) + '×' + (h * povecaj));
  }
  if (nepoznate.length) console.log('\nNepoznati nazivi (preskočeno): ' + nepoznate.join(', ') +
    '\nNaziv mora biti točno kao u MINI-gemini-promptovi.md.');
})().catch(function (e) { console.error(e); process.exit(1); });
