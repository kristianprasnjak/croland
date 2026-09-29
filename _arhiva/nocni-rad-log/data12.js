// Provjera Vocabulary 12 u data.js: broj igara, stavke, meta, udio starih riječi, pokrivenost plana, slike u spajanju.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..');
const window = {};
eval(fs.readFileSync(path.join(root, 'data.js'), 'utf8').replace(/^﻿/, ''));
const P = window.PODACI;
const N = process.argv[2] || '12';
const igre = [];
(function walk(o) {
  if (Array.isArray(o)) return o.forEach(walk);
  if (o && typeof o === 'object') {
    if (o.cjelina === 'Vocabulary ' + N && o.format) { igre.push(o); return; }
    Object.values(o).forEach(walk);
  }
})(P);
console.log('igara: ' + igre.length);
const plan = JSON.parse(fs.readFileSync(path.join(root, 'vokabular-plan.json'), 'utf8'))[N].map(x => x.hr);
const stavke = g => g.stavke || g.pitanja || g.parovi || g.kartice || g.rijeci || [];
const vidjeno = {};
for (const g of igre) {
  const s = stavke(g);
  const hr = s.map(x => Array.isArray(x) ? x : (x.polja || Object.values(x))).map(p => g.format === 'upis' ? String(p[1]) : String(p[0]));
  const stare = hr.filter(h => plan.includes(h));
  stare.forEach(h => vidjeno[h] = (vidjeno[h] || 0) + 1);
  console.log(g.format.padEnd(14) + ' ' + String(s.length).padStart(3) + ' stavki, starih ' + stare.length + (s.length ? ' (' + Math.round(100 * stare.length / s.length) + ' %)' : '') + '  meta:' + Object.keys(g.meta || {}).join(',') + ' bodovi:' + g.bodovi +'  | ' + g.naslov);
  if (g.format === 'spajanje') console.log('   bez slike: ' + hr.filter(h => !P.slike[h.toLowerCase()]).join(', '));
}
console.log('stare iz plana koje fale: ' + plan.filter(h => !vidjeno[h]).join(', '));
console.log('stare vise puta: ' + Object.keys(vidjeno).filter(h => vidjeno[h] > 1).join(', '));
if (igre[0]) console.log('kljucevi igre: ' + Object.keys(igre[0]).join(','));
