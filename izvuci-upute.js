#!/usr/bin/env node
// izvuci-upute.js N — slaze _radno/upute-razina-N.md: DOSLOVNO izvuceni odjeljci iz
// postojecih uputa koji su potrebni za pisanje razine N (nista se ne preformulira).
// Napisano 29.09.2026. uz preradi-vokabular.ps1 v5.
'use strict';
const fs = require('fs'), path = require('path');
const N = parseInt(process.argv[2], 10);
if (!(N >= 13 && N <= 20)) { console.error('Upotreba: node izvuci-upute.js N  (13..20)'); process.exit(1); }
const root = __dirname;
function citaj(f) { return fs.readFileSync(path.join(root, f), 'utf8').replace(/^﻿/, ''); }
// odjeljak od naslova koji odgovara regexu do sljedeceg naslova iste ili vise razine
function odjeljak(f, re) {
  const r = citaj(f).split(/\r?\n/);
  const i = r.findIndex(l => /^#{1,6}\s/.test(l) && re.test(l));
  if (i < 0) return '> (odjeljak ' + re + ' nije nadjen u ' + f + ')\n';
  const lvl = r[i].match(/^#+/)[0].length;
  let j = i + 1;
  while (j < r.length && !(/^#{1,6}\s/.test(r[j]) && r[j].match(/^#+/)[0].length <= lvl)) j++;
  return r.slice(i, j).join('\n').trim() + '\n';
}
const U = 'UPUTE-prosirenje-lekcija-10-20.md', V = 'VODIC-izrada-i-prijevod.md', R = 'REVIEW-razine-L1-L12.md';
const dijelovi = [
  '# Upute za razinu ' + N + ' (izvuceno doslovno iz izvornih dokumenata)\n\n' +
  'Ovo je izvadak, ne sazetak: svaki odjeljak ispod prepisan je bez izmjena. Izvorni dokumenti su u korijenu projekta; otvori ih samo ako ti ovdje nesto nedostaje.\n',
  '---\n## IZ: UPUTE-razine-13-20-nocni.md (cijeli dokument)\n\n' + citaj('UPUTE-razine-13-20-nocni.md'),
  '---\n## IZ: ' + U + '\n\n' + odjeljak(U, /^## 1\./),
  odjeljak(U, /^## 2\./), odjeljak(U, /^## 3\./),
  odjeljak(U, new RegExp('^### L' + N + '\\b')),
  odjeljak(U, /^## 5\./),
  '---\n## IZ: ' + V + '\n\n' + odjeljak(V, /^### C2\./), odjeljak(V, /^### C3\./), odjeljak(V, /^### C4\./), odjeljak(V, /^## Dio F/),
  '---\n## IZ: ' + R + '\n\n' + odjeljak(R, /^## 3\./), odjeljak(R, /^## 4\./),
  '---\n## Redak razine ' + N + ' iz popis lekcija.md\n\n' +
    citaj('popis lekcija.md').split(/\r?\n/).filter(l => new RegExp('(^|[^0-9])' + N + '([^0-9]|$)').test(l)).join('\n') + '\n'
];
const van = path.join(root, '_radno', 'upute-razina-' + N + '.md');
fs.mkdirSync(path.dirname(van), { recursive: true });
fs.writeFileSync(van, dijelovi.join('\n'), 'utf8');
console.log('Zapisano ' + van + ' (' + fs.statSync(van).size + ' B)');
