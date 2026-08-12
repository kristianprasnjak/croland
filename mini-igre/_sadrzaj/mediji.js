/* =====================================================================
   Croland mini-igre — generator popisa medija
   ---------------------------------------------------------------------
   node _sadrzaj/mediji.js   →  osvježi MEDIJI-popis.md i MEDIJI-popis.csv
   prema trenutnom rječniku iz rijeci.js.
   ===================================================================== */

var fs = require('fs');
var path = require('path');

var DIR = __dirname;
var IGRE_DIR = path.resolve(DIR, '..');
var rijeci = require(path.join(DIR, 'rijeci.js'));

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
    if (zauzeti[id]) id = id + '-' + kat;
    zauzeti[id] = true;
    BANKA.push({ hr: r[0], en: r[1], kat: kat, id: id });
  });
});
var KAT = rijeci.KATEGORIJE;

var KRAJEVI = [
  ['zagreb','Zagreb i okolica'], ['zagorje','Zagorje i Međimurje'],
  ['slavonija','Slavonija i Baranja'], ['sredisnja','Središnja Hrvatska'],
  ['lika','Lika i Kordun'], ['kvarner','Kvarner'], ['istra','Istra'],
  ['dalmacija','Dalmacija'], ['dubrovnik','Dubrovnik i okolica']
];

var SOBE = [
  ['vrata','Vrata tvrđave — kameni ulaz, rešetka, čuvar'],
  ['dvoriste','Dvorište — kaldrma, bunar, razbacani predmeti'],
  ['kuhinja','Kuhinja — ognjište, tave, brašno i jaja'],
  ['knjiznica','Knjižnica — police s knjigama, ljestve, svijeća'],
  ['toranj','Toranj — zvono, stepenice, pogled na krajolik'],
  ['tamnica','Tamnica — lanci, slama, mala rešetka'],
  ['riznica','Riznica — škrinje, zlatnici, svijetlo'],
  ['vrt','Vrt — cvijeće, drvo, klupa, sunce'],
  ['kapelica','Kapelica — kameni svod, svijeće, stari zapisi'],
  ['oruzarnica','Oružarnica — štitovi, mačevi, kovački stol'],
  ['straza','Stražarnica — uski prozor, dalekozor, karta zidina'],
  ['pisarnica','Pisarnica — pergament, tinta, pero, pješčani sat'],
  ['bunar','Bunar — kameni obruč, vjedra, uže, mokra kaldrma'],
  ['konjusnica','Konjušnica — sijeno, konji, sedla'],
  ['podrum','Vinski podrum — bačve, boce, prigušeno svjetlo'],
  ['dvorana','Prijestolna dvorana — prijestolje, zastave, dugi stol']
];

var ZVUKOVI = [
  ['gost-dolazi.mp3','kratki zvon/zvuk kad gost sjedne za stol','05 Konoba']
];

var csv = ['datoteka;vrsta;dimenzije;naslov / opis;koristi'];
function csvRed(a){ csv.push(a.join(';')); }

BANKA.forEach(function (r) {
  csvRed(['rijec-' + r.id + '.png','slika','512×512',
    r.hr + ' — ' + r.en + ' (' + KAT[r.kat].hr + ')','sve igre']);
  csvRed(['rijec-' + r.id + '.mp3','zvuk','—','izgovor: „' + r.hr + '”','sve igre']);
});
KRAJEVI.forEach(function (k) {
  csvRed(['kraj-' + k[0] + '.png','slika','1280×720',
    'panorama kraja: ' + k[1] + ' (vizura iza mjesta)','02 Put oko Hrvatske']);
});
SOBE.forEach(function (s) {
  csvRed(['soba-' + s[0] + '.png','slika','1280×720', s[1],'04 Tvrđava']);
});
ZVUKOVI.forEach(function (z) { csvRed([z[0],'zvuk','—',z[1],z[2]]); });

var brojSlika = BANKA.length + KRAJEVI.length + SOBE.length;
var brojZvuka = BANKA.length + ZVUKOVI.length;

var md = [];
md.push('# Mediji za mini igre — što ubaciti u `mini games media/`');
md.push('');
md.push('Sve datoteke idu **ravno u mapu** `mini-igre/mini games media/` (bez podmapa).');
md.push('Nazivi su bez kvačica i razmaka; igre ih traže točno ovako.');
md.push('');
md.push('**Dok je mapa prazna, sve igre rade** — svaka slika ima ugrađen zamjenski znak, a izgovor');
md.push('se preskače. Mediji su čisti dodatak, ne uvjet.');
md.push('');
md.push('Ukupno: **' + brojSlika + ' slika** + **' + brojZvuka + ' zvučnih datoteka** = ' +
  (brojSlika + brojZvuka) + ' datoteka.');
md.push('');
md.push('Popis se generira iz `_sadrzaj/rijeci.js` naredbom `node _sadrzaj/mediji.js`.');
md.push('Strojno čitljiva inačica: `MEDIJI-popis.csv` (točka-zarez, UTF-8 BOM — otvara se u Excelu).');
md.push('');
md.push('---');
md.push('');
md.push('## 1. Ilustracije riječi — ' + BANKA.length + ' kom · 512×512 px · PNG s prozirnom ili bijelom pozadinom');
md.push('');
md.push('Crna linija ujednačene debljine, plošno bojanje, organska mrlja u boji iza motiva');
md.push('(boja = vrsta riječi), čista pozadina.');
md.push('');
md.push('Boja mrlje po kategoriji: glagoli **zelena** · žive imenice (ljudi, životinje) **narančasta** ·');
md.push('nežive imenice **plava** · apstraktne (vrijeme, osjećaji, škola) **ljubičasta** ·');
md.push('pridjevi/prilozi/boje/brojevi **crvena**.');
md.push('');
Object.keys(KAT).forEach(function (k) {
  var popis = BANKA.filter(function (r) { return r.kat === k; });
  if (!popis.length) return;
  md.push('### ' + KAT[k].hr + ' / ' + KAT[k].en + ' — ' + popis.length + ' kom');
  md.push('');
  md.push('| datoteka | dimenzije | riječ | koristi |');
  md.push('|---|---|---|---|');
  popis.forEach(function (r) {
    md.push('| `rijec-' + r.id + '.png` | 512×512 | ' + r.hr + ' — ' + r.en + ' | sve igre |');
  });
  md.push('');
});
md.push('## 2. Panorame krajeva — ' + KRAJEVI.length + ' kom · 1280×720 px · PNG ili JPG');
md.push('');
md.push('Vizura iza imena mjesta u igri *Put oko Hrvatske*. Široki krajolik bez teksta.');
md.push('');
md.push('| datoteka | dimenzije | opis | koristi |');
md.push('|---|---|---|---|');
KRAJEVI.forEach(function (k) {
  md.push('| `kraj-' + k[0] + '.png` | 1280×720 | panorama kraja: ' + k[1] + ' | 02 Put oko Hrvatske |');
});
md.push('');
md.push('## 3. Sobe tvrđave — ' + SOBE.length + ' kom · 1280×720 px · PNG ili JPG');
md.push('');
md.push('| datoteka | dimenzije | opis | koristi |');
md.push('|---|---|---|---|');
SOBE.forEach(function (s) {
  md.push('| `soba-' + s[0] + '.png` | 1280×720 | ' + s[1] + ' | 04 Tvrđava |');
});
md.push('');
md.push('## 4. Izgovor riječi — ' + BANKA.length + ' kom · MP3, mono, 128 kbps');
md.push('');
md.push('Jedna riječ po datoteci, jasno izgovorena, bez šuma, 0,5–1,5 s.');
md.push('');
md.push('| datoteka | riječ |');
md.push('|---|---|');
BANKA.forEach(function (r) {
  md.push('| `rijec-' + r.id + '.mp3` | ' + r.hr + ' |');
});
md.push('');
md.push('## 5. Zvučni efekti — ' + ZVUKOVI.length + ' kom');
md.push('');
md.push('| datoteka | opis | koristi |');
md.push('|---|---|---|');
ZVUKOVI.forEach(function (z) { md.push('| `' + z[0] + '` | ' + z[1] + ' | ' + z[2] + ' |'); });
md.push('');

fs.writeFileSync(path.join(IGRE_DIR, 'MEDIJI-popis.csv'), '﻿' + csv.join('\r\n') + '\r\n', 'utf8');
fs.writeFileSync(path.join(IGRE_DIR, 'MEDIJI-popis.md'), md.join('\n'), 'utf8');

console.log('MEDIJI-popis.md i .csv osvježeni:');
console.log('  slike: ' + brojSlika + ' · zvukovi: ' + brojZvuka + ' · ukupno ' + (brojSlika + brojZvuka));
