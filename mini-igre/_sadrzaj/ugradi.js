/* =====================================================================
   Croland mini-igre — ugradnja sadržaja
   ---------------------------------------------------------------------
   Pokretanje:  node _sadrzaj/ugradi.js      (iz mape mini-igre)
             ili node ugradi.js              (iz mape _sadrzaj)

   Uzima rijeci.js + recenice.js i ugrađuje ih u svih 12 HTML igara,
   tako da svaka ostaje samostalna datoteka bez vanjskih ovisnosti.

   Skripta je idempotentna — može se pokretati koliko puta treba.
   ===================================================================== */

var fs = require('fs');
var path = require('path');

var DIR = __dirname;
var IGRE_DIR = path.resolve(DIR, '..');

var rijeci = require(path.join(DIR, 'rijeci.js'));
var recenice = require(path.join(DIR, 'recenice.js'));

/* ---------- 1. sastavi banku riječi ---------- */

function slug(s) {
  return String(s).toLowerCase()
    .replace(/č|ć/g, 'c').replace(/đ/g, 'd').replace(/š/g, 's').replace(/ž/g, 'z')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

var BANKA = [];
var zauzeti = {};
Object.keys(rijeci.RIJECI).forEach(function (kat) {
  rijeci.RIJECI[kat].forEach(function (r) {
    var id = slug(r[0]);
    if (zauzeti[id]) id = id + '-' + kat;      // razriješi sudar (koža/koza, jezik/jezik)
    zauzeti[id] = true;
    BANKA.push({ hr: r[0], en: r[1], kat: kat, rod: r[2], emo: r[3], id: id });
  });
});

/* ---------- 1b. koje slike riječi stvarno postoje ----------
   Redoslijed: mini games media/rijec-<id>.png  →  ../slike/<Riječ>.webp
   (ilustracije iz glavne aplikacije). Popis se ugrađuje u igre kao FOTO,
   pa igra traži samo slike koje postoje. Nakon dodavanja slika ponovno
   pokreni ovu skriptu (radi to i osvjezi.js pri svakoj objavi). */
var MEDIJ_DIR = path.join(IGRE_DIR, 'mini games media');
var SLIKE_DIR = path.resolve(IGRE_DIR, '..', 'slike');
var medijSkup = {}, slikeSkup = {};
if (fs.existsSync(MEDIJ_DIR)) fs.readdirSync(MEDIJ_DIR).forEach(function (f) { medijSkup[f] = true; });
if (fs.existsSync(SLIKE_DIR)) fs.readdirSync(SLIKE_DIR).forEach(function (f) {
  if (/\.webp$/i.test(f)) slikeSkup[f.normalize('NFC').toLowerCase()] = f.normalize('NFC');
});
var FOTO = {};
function dodajFoto(id, hr) {
  var dat = 'rijec-' + id + '.png';
  if (FOTO[dat]) return;
  if (medijSkup[dat]) { FOTO[dat] = 'mini games media/' + dat; return; }
  var w = slikeSkup[(hr + '.webp').normalize('NFC').toLowerCase()];
  if (w) FOTO[dat] = '../slike/' + encodeURIComponent(w.replace(/\.webp$/i, '')) + '.webp';
}
BANKA.forEach(function (r) { dodajFoto(r.id, r.hr); });
/* igre s vlastitim popisom jela/predmeta: {id:'…', nom:'…'} */
fs.readdirSync(IGRE_DIR).filter(function (f) { return /^\d\d-.*\.html$/.test(f); }).forEach(function (f) {
  var t = fs.readFileSync(path.join(IGRE_DIR, f), 'utf8'), m, re = /\{id:'([a-z0-9-]+)',\s*nom:'([^']+)'/g;
  while ((m = re.exec(t))) dodajFoto(m[1], m[2]);
});

var KAT = rijeci.KATEGORIJE;

/* ---------- 2. provjere ---------- */

var greske = [];
BANKA.forEach(function (r) {
  if (!r.hr || !r.en || !r.emo) greske.push('nepotpun zapis: ' + JSON.stringify(r));
  if (['m', 'ž', 's', '-'].indexOf(r.rod) < 0) greske.push('loš rod: ' + r.hr);
  if (!KAT[r.kat]) greske.push('nepoznata kategorija: ' + r.kat);
});
recenice.PRAZNINE.forEach(function (p) {
  if (String(p[0]).indexOf('___') < 0) greske.push('praznina bez ___: ' + p[0]);
});
if (greske.length) {
  console.error('PREKID — greške u sadržaju:');
  greske.forEach(function (g) { console.error('  ' + g); });
  process.exit(1);
}

/* ---------- 3. blokovi koji se ugrađuju ---------- */

function j(o) { return JSON.stringify(o); }

var BLOK_SADRZAJ =
  '  /*[SADRZAJ]*/\n' +
  '  var BANKA = ' + j(BANKA) + ';\n' +
  '  var KAT = ' + j(KAT) + ';\n' +
  '  var RECENICE = ' + j(recenice.RECENICE) + ';\n' +
  '  var PRAZNINE = ' + j(recenice.PRAZNINE) + ';\n' +
  '  var DIJALOZI = ' + j(recenice.DIJALOZI) + ';\n' +
  '  var SAVJETI = ' + j(recenice.SAVJETI) + ';\n' +
  '  var SUPROTNICE = ' + j(recenice.SUPROTNICE) + ';\n' +
  '  var FOTO = ' + j(FOTO) + ';\n' +
  '  /*[/SADRZAJ]*/';

/* nova funkcija slika(): slika samo ako datoteka stvarno postoji (popis FOTO),
   inače odmah ugrađena zamjena — nema 404 poziva ni praznih okvira */
var BLOK_SLIKA = [
  '  /*[CL-SLIKA]*/',
  '  function slika(datoteka, zamjena, velicina, klasa) {',
  '    var v = velicina || 96;',
  '    var put = FOTO[datoteka];',
  '    return \'<span class="slikaOkvir \' + (klasa || \'\') + (put ? \' imaSliku\' : \'\') + \'" style="width:\' + v + \'px;height:\' + v + \'px;font-size:\' + Math.round(v * 0.55) + \'px">\' +',
  '      (put ? \'<img src="\' + put + \'" alt="" loading="lazy" onerror="this.remove()">\' : \'\') +',
  '      \'<span class="zamjena" style="font-size:\' + Math.round(v * 0.5) + \'px">\' + zamjena + \'</span>\' +',
  '      \'</span>\';',
  '  }',
  '  /*[/CL-SLIKA]*/'
].join('\n');
var SLIKA_STARO = [
  '  function slika(datoteka, zamjena, velicina, klasa) {',
  '    var v = velicina || 96;',
  '    return \'<span class="slikaOkvir \' + (klasa || \'\') + \'" style="width:\' + v + \'px;height:\' + v + \'px;font-size:\' + Math.round(v * 0.55) + \'px">\' +',
  '      \'<img src="\' + MEDIJ + datoteka + \'" alt="" loading="lazy" \' +',
  '      \'onerror="this.remove()">\' +',
  '      \'<span class="zamjena" style="font-size:\' + Math.round(v * 0.5) + \'px">\' + zamjena + \'</span>\' +',
  '      \'</span>\';',
  '  }'
].join('\n');

var BLOK_STIL = '/*[CL-STIL]*/\n' + fs.readFileSync(path.join(DIR, 'stil.css'), 'utf8').trim() + '\n/*[/CL-STIL]*/\n';

var BLOK_DODATAK = [
  '  /*[CL-DODATAK]*/',
  '  /* ---------- rečenice, praznine, dijalozi, savjeti ---------- */',
  '  function recenice(raz, doRazine) {',
  '    if (!raz) return RECENICE.slice();',
  '    return RECENICE.filter(function (r) { return doRazine ? r[2] <= raz : r[2] === raz; });',
  '  }',
  '  function recenica(raz, doRazine) { return rand(recenice(raz, doRazine)); }',
  '  function praznine(raz, doRazine) {',
  '    if (!raz) return PRAZNINE.slice();',
  '    return PRAZNINE.filter(function (p) { return doRazine ? p[5] <= raz : p[5] === raz; });',
  '  }',
  '  function praznina(raz, doRazine) { return rand(praznine(raz, doRazine)); }',
  '  function dijalozi(raz) {',
  '    if (!raz) return DIJALOZI.slice();',
  '    return DIJALOZI.filter(function (d) { return d.razina <= raz; });',
  '  }',
  '  function savjet() { return rand(SAVJETI); }',
  '  function suprotnica() { return rand(SUPROTNICE); }',
  '  function suprotnice() { return SUPROTNICE.slice(); }',
  '',
  '  /* razina prema napretku: 1-5 iz rednog broja koraka i ukupne dužine */',
  '  function razinaZa(i, ukupno) {',
  '    var r = Math.floor((i / Math.max(1, ukupno)) * 5) + 1;',
  '    return Math.max(1, Math.min(5, r));',
  '  }',
  '',
  '  /* ---------- praćenje svladanih riječi (dijeli se među igrama) ---------- */',
  '  function ucenje(id, dobro) {',
  '    try {',
  '      var k = "croland-mini-ucenje";',
  '      var m = JSON.parse(localStorage.getItem(k) || "{}");',
  '      var z = m[id] || { t: 0, k: 0 };',
  '      if (dobro) z.t++; else z.k++;',
  '      m[id] = z;',
  '      localStorage.setItem(k, JSON.stringify(m));',
  '    } catch (e) { }',
  '  }',
  '  function ucenjeSve() {',
  '    try { return JSON.parse(localStorage.getItem("croland-mini-ucenje") || "{}"); }',
  '    catch (e) { return {}; }',
  '  }',
  '  function zaPonoviti(n) {',
  '    var m = ucenjeSve(), popis = [];',
  '    Object.keys(m).forEach(function (id) {',
  '      var z = m[id];',
  '      if (z.k > 0 && z.k >= z.t && POID[id]) popis.push({ r: POID[id], k: z.k, t: z.t });',
  '    });',
  '    popis.sort(function (a, b) { return (b.k - b.t) - (a.k - a.t); });',
  '    return popis.slice(0, n || 12);',
  '  }',
  '  /* riječi koje igrač još nije vidio — daje prednost novom sadržaju */',
  '  function svjezeRijeci(n, filtar) {',
  '    var m = ucenjeSve();',
  '    var izvor = filtar ? BANKA.filter(filtar) : BANKA;',
  '    var nove = izvor.filter(function (r) { return !m[r.id]; });',
  '    var ostalo = izvor.filter(function (r) { return m[r.id]; });',
  '    return mix(nove).concat(mix(ostalo)).slice(0, n);',
  '  }',
  '',
  '  /* ---------- savjet između razina ---------- */',
  '  function savjetZastor(nastavi) {',
  '    var s = savjet();',
  '    var z = zastor(',
  '      \'<h3>💡 Tip</h3><p style="text-align:left">\' + esc(s[0]) + \'</p>\' +',
  '      \'<p style="font-size:13px;color:#8B7B6B;text-align:left">\' + esc(s[1]) + \'</p>\' +',
  '      \'<div class="tipke" style="margin-top:14px"><button class="g glavni" id="_dalje">Next</button></div>\');',
  '    z.querySelector(\'#_dalje\').onclick = function () { z.remove(); if (nastavi) nastavi(); };',
  '    return z;',
  '  }',
  '  /* ---------- pixel sprajtovi za canvas igre ----------',
  '     list(ime) učita PNG iz mini games media/ jednom; sprite() crta jednu',
  '     pločicu (stupac, red) oštro, bez zaglađivanja. Dok list nije učitan,',
  '     sprite() vraća false i igra crta svoju staru zamjenu. naSprite(fn)',
  '     pozove fn kad se neki list učita, da se scena ponovno nacrta. */',
  '  var _listovi = {}, _naSprite = [];',
  '  function list(ime) {',
  '    var i = _listovi[ime];',
  '    if (!i) {',
  '      i = _listovi[ime] = new Image();',
  '      i.onload = function () { i._ok = true; _naSprite.forEach(function (f) { try { f(ime); } catch (e) {} }); };',
  '      i.src = MEDIJ + ime;',
  '    }',
  '    return i;',
  '  }',
  '  function sprite(G, ime, c, r, x, y, w, h, vel) {',
  '    var i = list(ime); vel = vel || 16;',
  '    if (!i._ok) return false;',
  '    G.imageSmoothingEnabled = false;',
  '    G.drawImage(i, c * vel, r * vel, vel, vel, Math.round(x), Math.round(y), Math.round(w), Math.round(h === undefined ? w : h));',
  '    return true;',
  '  }',
  '  function naSprite(fn) { _naSprite.push(fn); }',
  '  /*[/CL-DODATAK]*/'
].join('\n');

var IZVOZ =
  '    /*[CL-IZVOZ]*/\n' +
  '    RECENICE: RECENICE, PRAZNINE: PRAZNINE, DIJALOZI: DIJALOZI, SAVJETI: SAVJETI,\n' +
  '    SUPROTNICE: SUPROTNICE, suprotnica: suprotnica, suprotnice: suprotnice,\n' +
  '    recenice: recenice, recenica: recenica, praznine: praznine, praznina: praznina,\n' +
  '    dijalozi: dijalozi, savjet: savjet, savjetZastor: savjetZastor, razinaZa: razinaZa,\n' +
  '    ucenje: ucenje, ucenjeSve: ucenjeSve, zaPonoviti: zaPonoviti, svjezeRijeci: svjezeRijeci,\n' +
  '    FOTO: FOTO, list: list, sprite: sprite, naSprite: naSprite,\n' +
  '    /*[/CL-IZVOZ]*/';

/* dodatak funkciji kraj(): gumb za beskonačni način */
var KRAJ_STARO =
  "      '<button class=\"g glavni\" id=\"_opet\">Play again</button>' +\n" +
  "      '</div>';";
var KRAJ_NOVO =
  "      '<button class=\"g glavni\" id=\"_opet\">Play again</button>' +\n" +
  "      (opts.beskonacno ? '<button class=\"g\" id=\"_bez\">Endless ▶</button>' : '') +\n" +
  "      '</div>';";
var KRAJ_VEZ_STARO =
  "    z.querySelector('#_opet').onclick = function () { z.remove(); if (opts.ponovno) opts.ponovno(); else location.reload(); };";
var KRAJ_VEZ_NOVO =
  "    z.querySelector('#_opet').onclick = function () { z.remove(); if (opts.ponovno) opts.ponovno(); else location.reload(); };\n" +
  "    if (opts.beskonacno) z.querySelector('#_bez').onclick = function () { z.remove(); opts.beskonacno(); };";

/* ---------- 4. ugradi u svaku igru ---------- */

function ugradi(dat) {
  var p = path.join(IGRE_DIR, dat);
  var t = fs.readFileSync(p, 'utf8');
  var prije = t;

  /* --- sadržaj --- */
  if (t.indexOf('/*[SADRZAJ]*/') >= 0) {
    t = t.replace(/[ \t]*\/\*\[SADRZAJ\]\*\/[\s\S]*?\/\*\[\/SADRZAJ\]\*\//, BLOK_SADRZAJ);
  } else {
    var reBanka = /^[ \t]*var BANKA = \[[\s\S]*?\];[ \t]*\r?\n[ \t]*var KAT = \{[\s\S]*?\};[ \t]*$/m;
    if (!reBanka.test(t)) throw new Error(dat + ': ne nalazim BANKA/KAT blok');
    t = t.replace(reBanka, BLOK_SADRZAJ);
  }

  /* --- pixel stil (prije stila same igre, da igra i dalje može prepisati svoje) --- */
  if (t.indexOf('/*[CL-STIL]*/') >= 0) {
    t = t.replace(/\/\*\[CL-STIL\]\*\/[\s\S]*?\/\*\[\/CL-STIL\]\*\/\n/, function () { return BLOK_STIL; });
  } else {
    var s0 = t.indexOf('<style>'), s1 = t.indexOf('\n/* ==== ', s0);
    if (s0 < 0 || s1 < 0) throw new Error(dat + ': ne nalazim mjesto za CL-STIL');
    t = t.slice(0, s1 + 1) + BLOK_STIL + '\n' + t.slice(s1 + 1);
  }

  /* --- slika(): samo postojeće slike --- */
  if (t.indexOf('/*[CL-SLIKA]*/') >= 0) {
    t = t.replace(/[ \t]*\/\*\[CL-SLIKA\]\*\/[\s\S]*?\/\*\[\/CL-SLIKA\]\*\//, function () { return BLOK_SLIKA; });
  } else {
    if (t.indexOf(SLIKA_STARO) < 0) throw new Error(dat + ': ne nalazim funkciju slika()');
    t = t.replace(SLIKA_STARO, function () { return BLOK_SLIKA; });
  }

  /* --- CL dodatak --- */
  if (t.indexOf('/*[CL-DODATAK]*/') >= 0) {
    t = t.replace(/[ \t]*\/\*\[CL-DODATAK\]\*\/[\s\S]*?\/\*\[\/CL-DODATAK\]\*\//, BLOK_DODATAK);
  } else {
    var sidro = '  return {\n    MEDIJ: MEDIJ,';
    var i = t.indexOf(sidro);
    if (i < 0) throw new Error(dat + ': ne nalazim return blok CL-a');
    t = t.slice(0, i) + BLOK_DODATAK + '\n\n' + t.slice(i);
  }

  /* --- izvoz --- */
  t = t.replace(/[ \t]*\/\*\[CL-IZVOZ\]\*\/[\s\S]*?\/\*\[\/CL-IZVOZ\]\*\/\r?\n/, '');
  var reIzvoz = /(^\s*MEDIJ: MEDIJ, BANKA: BANKA, KAT: KAT, kat: kat, po: po,[ \t]*$)/m;
  if (!reIzvoz.test(t)) throw new Error(dat + ': ne nalazim izvoznu liniju');
  t = t.replace(reIzvoz, '$1\n' + IZVOZ);

  /* --- kraj(): beskonačni način --- */
  if (t.indexOf("id=\\\"_bez\\\"") < 0 && t.indexOf('id="_bez"') < 0) {
    if (t.indexOf(KRAJ_STARO) < 0) throw new Error(dat + ': ne nalazim gumbe u kraj()');
    t = t.replace(KRAJ_STARO, KRAJ_NOVO);
    if (t.indexOf(KRAJ_VEZ_STARO) < 0) throw new Error(dat + ': ne nalazim vezanje gumba u kraj()');
    t = t.replace(KRAJ_VEZ_STARO, KRAJ_VEZ_NOVO);
  }

  if (t !== prije) fs.writeFileSync(p, t, 'utf8');
  return { dat: dat, kb: Math.round(Buffer.byteLength(t, 'utf8') / 1024) };
}

var IGRE = fs.readdirSync(IGRE_DIR)
  .filter(function (f) { return /^\d\d-.*\.html$/.test(f); })
  /* 01 Grad i 13 Gradovi nemaju CL jezgru; 02 je napuštena; -vN su stare inačice */
  .filter(function (f) { return !/^(01|02|13)-/.test(f) && !/-v\d/.test(f); })
  .sort();

console.log('Riječi: ' + BANKA.length + ' u ' + Object.keys(KAT).length + ' kategorija');
console.log('Rečenice: ' + recenice.RECENICE.length +
  ' · praznine: ' + recenice.PRAZNINE.length +
  ' · dijalozi: ' + recenice.DIJALOZI.length +
  ' · savjeti: ' + recenice.SAVJETI.length);
console.log('');

IGRE.forEach(function (f) {
  var r = ugradi(f);
  console.log('  ✓ ' + r.dat.padEnd(28) + r.kb + ' kB');
});

console.log('\nGotovo — ' + IGRE.length + ' igara ažurirano.');
