#!/usr/bin/env node
/**
 * osvjezi-jezik.js --jezik XX — inacica osvjezi.js za jezik uputa XX. Ne mijenja original:
 * ucita ga kao tekst, preusmjeri ulaz/izlaz i pokrene. Svaka promjena u osvjezi.js vrijedi i za XX.
 *   ulaz:  <mapa>/igre/*.md, <mapa>/rjecnik/prijevodi-XX.jsonl, <mapa>/rjecnik/rjecnik-XX-hr.jsonl
 *   izlaz: data-XX.js i rjecnik-XX.js u korijenu projekta (uz index-XX.html)
 * Pokretanje (iz bilo koje mape):  node croland-jezici/alati/osvjezi-jezik.js --jezik de
 *   --samo-kljucevi   ne gradi ponovno, samo upise kljuceve u postojeci data-XX.js
 *
 * KLJUC NAPRETKA: napredak vjezbe se sprema pod cjelina|stranica|naslov. Naslov je preveden, pa
 * bi isti korisnik na drugom jeziku vidio svoje vjezbe kao neodigrane. Zato svaka vjezba u
 * data-XX.js dobije `kljuc` = engleski naslov iste vjezbe (isti kljuc kao u engleskoj verziji),
 * a index.html ga koristi umjesto naslova (kljucIgre). Vjezbe se sparuju po redu iz istog izvora;
 * ako se cjelina, stranica ili format bilo gdje ne poklope, build stane.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const argv = process.argv.slice(2);
let kod = null;
argv.forEach((a, i) => { if (a === '--jezik') kod = argv[i + 1]; else if (a.startsWith('--jezik=')) kod = a.slice(8); });
const SAMO_KLJUCEVI = argv.includes('--samo-kljucevi');
const JEZICI = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'jezici.json'), 'utf8')).jezici;
if (!kod || !JEZICI[kod]) {
  console.error('Nedostaje ili nepoznat --jezik XX. Jezici: ' + Object.keys(JEZICI).join(', '));
  process.exit(1);
}
const mapa = JEZICI[kod].mapa;   // npr. croland-de (relativno prema korijenu)
let src = fs.readFileSync(path.join(ROOT, 'osvjezi.js'), 'utf8');

function zamijeni(staro, novo) {
  if (!src.includes(staro)) throw new Error('osvjezi-jezik: u osvjezi.js nema ocekivanog dijela: ' + staro);
  src = src.split(staro).join(novo);
}
const js = s => JSON.stringify(s);
zamijeni("const igreDir = path.join(root, 'igre');", `const igreDir = path.join(root, ${js(mapa)}, 'igre');`);
zamijeni("path.join(root, 'data.js')", `path.join(root, ${js('data-' + kod + '.js')})`);
zamijeni("path.join(root, 'rjecnik.js')", `path.join(root, ${js('rjecnik-' + kod + '.js')})`);
zamijeni("for (const r of citajJsonl('prijevodi.jsonl')) prijevodi[r.lema] = r.en;",
         `for (const r of citajJsonl(${js(mapa + '/rjecnik/prijevodi-' + kod + '.jsonl')})) prijevodi[r.lema] = r[${js(kod)}];`);
zamijeni("for (const r of citajJsonl('rjecnik-en-hr.jsonl')) enHr[r.en] = r.hr;",
         `for (const r of citajJsonl(${js(mapa + '/rjecnik/rjecnik-' + kod + '-hr.jsonl')})) enHr[r[${js(kod)}]] = r.hr;`);
// mini igre se ne ugraduju iz builda jezika (dijele se s engleskom verzijom)
const mi = src.indexOf('// ---- mini igre');
if (mi > 0) src = src.slice(0, mi);
src = src.replace(/^#!.*\n/, '');

const os = require('os');
const izvorOsvjezi = fs.readFileSync(path.join(ROOT, 'osvjezi.js'), 'utf8');
function pokreni(kod_) {
  const fn = new Function('require', '__dirname', '__filename', 'process', 'module', kod_);
  fn(require, ROOT, path.join(ROOT, 'osvjezi.js'), process, module);
}
if (!SAMO_KLJUCEVI) pokreni(src);

// ---- kljucevi napretka: engleski naslov iste vjezbe ----
function ucitajPodatke(put) {
  const t = fs.readFileSync(put, 'utf8');
  const i = t.indexOf('window.PODACI = ');
  if (i < 0) throw new Error('osvjezi-jezik: nema window.PODACI u ' + put);
  const kraj = t.lastIndexOf(';');
  return { glava: t.slice(0, i + 'window.PODACI = '.length), obj: JSON.parse(t.slice(i + 'window.PODACI = '.length, kraj)), rep: t.slice(kraj) };
}
// engleski izvor: isti osvjezi.js na igre/, ali u privremene datoteke (data.js se ne dira)
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'croland-kljuc-'));
let enSrc = izvorOsvjezi;
const mi2 = enSrc.indexOf('// ---- mini igre');
if (mi2 > 0) enSrc = enSrc.slice(0, mi2);
enSrc = enSrc.replace(/^#!.*\n/, '')
  .split("path.join(root, 'data.js')").join(JSON.stringify(path.join(tmp, 'data.js')))
  .split("path.join(root, 'rjecnik.js')").join(JSON.stringify(path.join(tmp, 'rjecnik.js')));
const log = console.log; console.log = () => {};
try { pokreni(enSrc); } finally { console.log = log; }
const en = ucitajPodatke(path.join(tmp, 'data.js')).obj.igre;
fs.rmSync(tmp, { recursive: true, force: true });

const putJezika = path.join(ROOT, 'data-' + kod + '.js');
const P = ucitajPodatke(putJezika);
const igre = P.obj.igre;
if (igre.length !== en.length) throw new Error(`osvjezi-jezik: ${igre.length} vjezbi u data-${kod}.js, a ${en.length} u engleskom izvoru`);
let razlicitih = 0;
P.obj.igre = igre.map((g, i) => {
  const e = en[i];
  if (g.cjelina !== e.cjelina || g.stranica !== e.stranica || g.format !== e.format) {
    throw new Error(`osvjezi-jezik: vjezba ${i} se ne poklapa (${g.cjelina}|${g.stranica}|${g.format} / ${e.cjelina}|${e.stranica}|${e.format})`);
  }
  const novi = {};
  for (const k of Object.keys(g)) {
    if (k === 'kljuc') continue;
    novi[k] = g[k];
    if (k === 'naslov' && e.naslov !== g.naslov) { novi.kljuc = e.naslov; razlicitih++; }
  }
  return novi;
});
fs.writeFileSync(putJezika, P.glava + JSON.stringify(P.obj, null, 2) + P.rep, 'utf8');
console.log(`data-${kod}.js: kljuc napretka (engleski naslov) upisan za ${razlicitih} od ${igre.length} vjezbi`);
