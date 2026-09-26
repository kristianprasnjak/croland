/* =====================================================================
   Croland mini-igre — slaganje pixel sprajtova
   ---------------------------------------------------------------------
   Pokretanje:  node _sadrzaj/sprajtovi.js      (iz mape mini-igre)

   Iz Kenney paketa u ../kenney/ (svi CC0, popis u mini games media/
   IZVORI-CC0.md) i iz nekoliko ručno nacrtanih pločica (ovdje, niže)
   slaže male listove za pojedine igre u mini games media/. Svaka pločica
   je 16×16; igre ih crtaju CL.sprite(G, list, stupac, 0, …).

   Treba sharp (već je u package.json projekta).
   ===================================================================== */

var fs = require('fs');
var path = require('path');
var sharp = require(path.resolve(__dirname, '..', '..', 'node_modules', 'sharp'));

var KEN = path.resolve(__dirname, '..', '..', 'kenney');
var MED = path.resolve(__dirname, '..', 'mini games media');
var TD = path.join(KEN, 'tiny-dungeon', 'tilemap_packed.png');
var TT = path.join(KEN, 'tiny-town', 'tilemap_packed.png');
var RC = path.join(KEN, 'roguelike-characters', 'roguelikeChar_transparent.png');

/* ---------- ručno nacrtane pločice ---------- */
function hex(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 255]; }
function izNiza(redovi, paleta, sir, vis) {
  sir = sir || 16; vis = vis || 16;
  if (redovi.length !== vis) throw new Error('pločica mora imati ' + vis + ' redova');
  var b = Buffer.alloc(sir * vis * 4);
  redovi.forEach(function (red, y) {
    if (red.length !== sir) throw new Error('red ' + y + ' nema ' + sir + ' znakova: "' + red + '"');
    for (var x = 0; x < sir; x++) {
      var z = red[x]; if (z === '.') continue;
      var c = paleta[z]; if (!c) throw new Error('nepoznata boja ' + z);
      c = hex(c); c.forEach(function (v, k) { b[(y * sir + x) * 4 + k] = v; });
    }
  });
  return b;
}
var OBRUB = '#2B2118';

/* Blobby — maskota Crolanda, kao pixel lik (gleda udesno) */
var BLOBBY = izNiza([
  '................',
  '......oooo......',
  '....oollllbboo..',
  '...olllllllbbbo.',
  '..ollwwllwwbbbo.',
  '..olwpwllwpwbbo.',
  '.obllwwbbwwbbbbo',
  '.obbbbbbbbbbbbbo',
  '.obbbommmmobbbbo',
  '.obbbbommobbbbbo',
  '.obbbbboobbbbbbo',
  'obbbbbbbbbbbbbbo',
  'obbbbbbbbbbbbbbo',
  'obbbbbbbbbbbbbbo',
  'obbobbbobbbobbbo',
  '.oo.ooo.ooo.ooo.'
], { o: OBRUB, l: '#CFE8FA', b: '#79B3E0', w: '#FFFFFF', p: '#2E5E8C', m: '#2B2118' });

/* drvena kutija za skladište */
var KUTIJA = izNiza([
  'oooooooooooooooo',
  'oLLLLLLLLLLLLLLo',
  'oLbbbbbbbbbbbbdo',
  'oLbdddddddddbbdo',
  'oLbdddddddddbbdo',
  'oLbbbbbbbbbbbbdo',
  'oLbddddddddddbdo',
  'oLbddbbbbbbddbdo',
  'oLbddddddddddbdo',
  'oLbbbbbbbbbbbbdo',
  'oLbdddddddddbbdo',
  'oLbdddddddddbbdo',
  'oLbbbbbbbbbbbbdo',
  'oLddddddddddddDo',
  'oDDDDDDDDDDDDDDo',
  'oooooooooooooooo'
], { o: OBRUB, L: '#E7B77A', b: '#C58747', d: '#A3703A', D: '#6D4B27' });

/* zvijezda (labirint: zamrzava duhove) */
var ZVIJEZDA = izNiza([
  '.......oo.......',
  '......oyyo......',
  '......oyyo......',
  '.....oyyyyo.....',
  'ooooooyWyyoooooo',
  'oyyyyyyWyyyyyyyo',
  '.oyyyyyyyyyyyyo.',
  '..oyyyyyyyyyyo..',
  '...oyyyyyyyyo...',
  '...oyyyyyyyyo...',
  '..oyyyyddyyyyo..',
  '..oyyyddddyyyo..',
  '.oyyydo..odyyyo.',
  '.oyydo....odyyo.',
  'oyddo......oddyo',
  'oooo........oooo'
], { o: OBRUB, y: '#F4B942', W: '#FFF3C4', d: '#C98A12' });

/* žeton sa slovom (zmija) — slovo igra piše preko */
var ZETON = izNiza([
  '................',
  '.....oooooo.....',
  '...ooyyyyyyoo...',
  '..oyWWyyyyyyyo..',
  '..oyWyyyyyyyyo..',
  '.oyyyyyyyyyyyyo.',
  '.oyyyyyyyyyyyyo.',
  '.oyyyyyyyyyyyyo.',
  '.oyyyyyyyyyyyyo.',
  '.oyyyyyyyyyyyyo.',
  '.oyyyyyyyyyyydo.',
  '..oyyyyyyyyydo..',
  '..oyyyyyyyyddo..',
  '...oodddddddo...',
  '.....oooooo.....',
  '................'
], { o: OBRUB, y: '#F4B942', W: '#FFF3C4', d: '#C98A12' });

/* zmija: glava (gleda udesno), tijelo (vodoravno), zavoj (lijevo↔dolje), rep (prema desno) */
var ZP = { o: OBRUB, g: '#7CB342', G: '#5E8F2E', l: '#A8D86E', w: '#FFFFFF', p: '#2B2118', r: '#E8623A' };
var Z_GLAVA = izNiza([
  '................',
  '................',
  'oooooooooo......',
  'lllllllllloo....',
  'gggggggglllloo..',
  'ggGgggGgggwwwo..',
  'gggggggggwwppwo.',
  'gGgggGggggwppwo.',
  'gggggggggggwwgo.',
  'ggGgggGgggggggor',
  'ggggggggggggggo.',
  'GGGGGGGGGGGGoo..',
  'ooooooooooooo...',
  '................',
  '................',
  '................'
], ZP);
var Z_TIJELO = izNiza([
  '................',
  '................',
  'oooooooooooooooo',
  'llllllllllllllll',
  'gggggggggggggggg',
  'ggGgggGgggGgggGg',
  'gggggggggggggggg',
  'gGgggGgggGgggGgg',
  'gggggggggggggggg',
  'ggGgggGgggGgggGg',
  'gggggggggggggggg',
  'GGGGGGGGGGGGGGGG',
  'oooooooooooooooo',
  '................',
  '................',
  '................'
], ZP);
var Z_ZAVOJ = izNiza([   /* spaja lijevi rub i donji rub */
  '................',
  '................',
  'ooooooooooo.....',
  'lllllllllllo....',
  'gggggggggglGo...',
  'ggGgggGggggGGo..',
  'gggggggggggggo..',
  'gGgggGgggGgggo..',
  'gggggggggggggo..',
  'ggGgggGgggGggo..',
  'ggggggggggggGo..',
  'GGGgggggggggGo..',
  'oooGgggggggGGo..',
  '..olgggGgggGGo..',
  '..olggggggggGo..',
  '..olgGgggGggGo..'
], ZP);
var Z_REP = izNiza([     /* šiljak lijevo, spoj desno */
  '................',
  '................',
  '................',
  '.........ooooooo',
  '......ooolllllll',
  '....oolggggggggg',
  '..oolggGgggGgggg',
  '.olgggggggggggGg',
  '..ooGGgggGgggggg',
  '....ooGGGggggGgg',
  '......oooGGGGGGG',
  '.........ooooooo',
  '................',
  '................',
  '................',
  '................'
], ZP);

/* rak za Portal: 20×13 px, crta se ×2 = točno 40×26 (njegov hitbox); dvije faze hoda */
var RP = { o: OBRUB, r: '#E8623A', R: '#B8452A', w: '#FFFFFF', p: '#2B2118' };
var RAK_GORE = [
  '..oo............oo..',
  '.orro....o..o...orro',
  '.orrro..owoow..orrro',
  '..orroo.opoop.oorro.',
  '...oorrooooooorroo..',
  '....orrrrrrrrrro....',
  '...orrrRrrrrRrrro...',
  '..orrrrrrrrrrrrrro..',
  '..oRrrrrrrrrrrrrRo..',
  '...oRRRRRRRRRRRRo...'
];
var RAK_A = RAK_GORE.concat(['..o.oo.o....o.oo.o..', '.o..o..o....o..o..o.', 'o..o...o....o...o..o']);
var RAK_B = RAK_GORE.concat(['...o.oo.o..o.oo.o...', '..o..o..o..o..o..o..', '.o..o...o..o...o..o.']);

/* ---------- slaganje listova ---------- */
async function plocica(izvor, c, r, razmak) {
  var k = 16 + (razmak || 0);
  return sharp(izvor).extract({ left: c * k, top: r * k, width: 16, height: 16 }).png().toBuffer();
}
function sirovo(buf) { return sharp(buf, { raw: { width: 16, height: 16, channels: 4 } }).png().toBuffer(); }

async function slozi(ime, dijelovi) {
  var ulazi = [];
  for (var i = 0; i < dijelovi.length; i++) ulazi.push({ input: await dijelovi[i], left: i * 16, top: 0 });
  await sharp({ create: { width: dijelovi.length * 16, height: 16, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(ulazi).png().toFile(path.join(MED, ime));
  console.log('  ✓ ' + ime + '  (' + dijelovi.length + ' pločica)');
}

(async function () {
  /* 06 Skladište: pod · regal · kutija · vrata garaže · radnik */
  await slozi('skladiste.png', [
    plocica(TD, 0, 4), plocica(TD, 3, 5), sirovo(KUTIJA), plocica(TD, 10, 3), plocica(TD, 4, 7)
  ]);
  /* 08 Labirint: zid · pod · Blobby · duh · zvijezda */
  await slozi('labirint.png', [
    plocica(TD, 4, 3), plocica(TD, 1, 4), sirovo(BLOBBY), plocica(TD, 1, 10), sirovo(ZVIJEZDA)
  ]);
  /* 09 Zmija: trava · trava s cvijetom · kamen · glava · tijelo · zavoj · rep · žeton */
  await slozi('zmija.png', [
    plocica(TT, 0, 0), plocica(TT, 1, 0), plocica(TT, 7, 3),
    sirovo(Z_GLAVA), sirovo(Z_TIJELO), sirovo(Z_ZAVOJ), sirovo(Z_REP), sirovo(ZETON)
  ]);
  /* 10 Portal: igrač (Tiny Dungeon) i rak u dvije faze (40×13 list) */
  await slozi('portal.png', [plocica(TD, 2, 7)]);
  await sharp({ create: { width: 40, height: 13, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: await sharp(izNiza(RAK_A, RP, 20, 13), { raw: { width: 20, height: 13, channels: 4 } }).png().toBuffer(), left: 0, top: 0 },
      { input: await sharp(izNiza(RAK_B, RP, 20, 13), { raw: { width: 20, height: 13, channels: 4 } }).png().toBuffer(), left: 20, top: 0 }
    ]).png().toFile(path.join(MED, 'portal-rak.png'));
  console.log('  ✓ portal-rak.png  (2 faze, 20×13)');
  /* Blobby i zasebno — za druge igre */
  await slozi('blobby.png', [sirovo(BLOBBY)]);
})().catch(function (e) { console.error(e); process.exit(1); });
