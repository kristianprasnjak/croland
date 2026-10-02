#!/usr/bin/env node
/**
 * osvjezi-de.js — njemacka inacica osvjezi.js. Ne mijenja original: ucita ga kao tekst,
 * preusmjeri ulaz/izlaz i pokrene. Tako svaka promjena u osvjezi.js vrijedi i za DE.
 *   ulaz:  croland-de/igre/*.md, croland-de/rjecnik/prijevodi-de.jsonl, rjecnik-de-hr.jsonl
 *   izlaz: data-de.js i rjecnik-de.js u korijenu projekta (uz index-de.html)
 * Pokretanje (iz korijena ili odavde):  node croland-de/osvjezi-de.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
let src = fs.readFileSync(path.join(ROOT, 'osvjezi.js'), 'utf8');

function zamijeni(staro, novo) {
  if (!src.includes(staro)) throw new Error('osvjezi-de: u osvjezi.js nema ocekivanog dijela: ' + staro);
  src = src.split(staro).join(novo);
}
zamijeni("const igreDir = path.join(root, 'igre');", "const igreDir = path.join(root, 'croland-de', 'igre');");
zamijeni("path.join(root, 'data.js')", "path.join(root, 'data-de.js')");
zamijeni("path.join(root, 'rjecnik.js')", "path.join(root, 'rjecnik-de.js')");
zamijeni("for (const r of citajJsonl('prijevodi.jsonl')) prijevodi[r.lema] = r.en;",
         "for (const r of citajJsonl('croland-de/rjecnik/prijevodi-de.jsonl')) prijevodi[r.lema] = r.de;");
zamijeni("for (const r of citajJsonl('rjecnik-en-hr.jsonl')) enHr[r.en] = r.hr;",
         "for (const r of citajJsonl('croland-de/rjecnik/rjecnik-de-hr.jsonl')) enHr[r.de] = r.hr;");
// mini igre se ne ugraduju iz DE builda (dijele se s EN verzijom)
const mi = src.indexOf('// ---- mini igre');
if (mi > 0) src = src.slice(0, mi);
src = src.replace(/^#!.*\n/, '');

const fn = new Function('require', '__dirname', '__filename', 'process', 'module', src);
fn(require, ROOT, path.join(ROOT, 'osvjezi.js'), process, module);
