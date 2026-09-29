#!/usr/bin/env node
// provjeri-cjelinu.js igre/<datoteka>.md — brza mehanicka provjera jedne cjeline,
// da se ne mora citati data.js (1,9 MB). Ne zamjenjuje citanje vlastitog teksta:
// pravila 1-7 (gramatika, distraktori, rod, vid, dijalog, logika price) provjerava model.
'use strict';
const fs = require('fs'), path = require('path');
const dat = process.argv[2];
if (!dat) { console.error('Upotreba: node provjeri-cjelinu.js igre/lekcija-14.md'); process.exit(1); }
const root = __dirname, ime = path.basename(dat);
function stranice(p) {
  const r = fs.readFileSync(p, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
  const s = []; let cur = null;
  r.forEach((l, i) => {
    if (/^##\s/.test(l)) { cur = { naslov: l.replace(/^##\s*/, '').trim, meta: {}, stavke: [], red: i + 1 }; cur.naslov = l.replace(/^##\s*/, '').trim(); s.push(cur); return; }
    if (!cur) return;
    const m = l.match(/^([a-zčćšž]+):\s*(.*)$/); if (m && !cur.stavke.length) { cur.meta[m[1]] = m[2]; return; }
    if (/^-\s/.test(l)) cur.stavke.push({ t: l.replace(/^-\s*/, ''), red: i + 1 });
  });
  return s;
}
const s = stranice(path.join(root, dat));
const vrsta = ime.split('-')[0], N = parseInt(ime.match(/(\d+)/)[1], 10);
const FORMATI = new Set('tekst izbor upis kartice razvrstavanje slaganje parovi brzina nastavak dijalog memorija poredak provjera spajanje slova baloni pamti zid'.split(' '));
const greske = [], upoz = [];
console.log(ime + ': ' + s.length + ' stranica');
s.forEach((p, k) => {
  const f = p.meta.format || '?';
  console.log(String(k + 1).padStart(2) + '. [' + f + '] ' + p.naslov + ' — ' + p.stavke.length + ' stavki');
  if (!FORMATI.has(f)) greske.push('str. ' + (k + 1) + ': nepoznat format "' + f + '"');
  if (!p.stavke.length && f !== 'tekst') greske.push('str. ' + (k + 1) + ': nema stavki');
  if (vrsta !== 'test') for (const kl of ['info', 'infokratko', 'opis']) if (!(kl in p.meta) && !(kl === 'opis' && f === 'tekst')) greske.push('str. ' + (k + 1) + ': nema ' + kl + ':');
  if (vrsta === 'test' && !('opis' in p.meta)) greske.push('str. ' + (k + 1) + ': nema opis:');
  if (f === 'spajanje' && p.stavke.length < 8) greske.push('str. ' + (k + 1) + ': spajanje treba >= 8 rijeci sa slikom');
  const brojevi = {}; p.stavke.filter(it => !/^tab:/.test(it.t)).forEach(it => { const b = it.t.split('|').length; brojevi[b] = (brojevi[b] || 0) + 1; });
  const n0 = f === 'tekst' ? 0 : +(Object.keys(brojevi).sort((a, b) => brojevi[b] - brojevi[a])[0] || 0);
  for (const it of p.stavke) {
    if (/^tab:/.test(it.t)) continue;
    const d = it.t.split('|').map(x => x.trim());
    if (d.some(x => x === '')) greske.push('red ' + it.red + ': prazno polje izmedju |');
    if (n0 && d.length !== n0 && !['dijalog', 'izbor', 'provjera', 'nastavak'].includes(f)) upoz.push('red ' + it.red + ': ' + d.length + ' polja, vecina stavki na stranici ima ' + n0);
    if (f === 'izbor' && d.length >= 3) { const ops = d.slice(1); if (new Set(ops).size !== ops.length) greske.push('red ' + it.red + ': ponovljena opcija u izboru'); }
    const kl = '(je|sam|si|smo|ste|su|ću|ćeš|će|ćemo|ćete|ga|mu|joj|ih|im|nam|vam|me|te|se|mi|ti|li)';
    const t = d.join(' / ');
    if (new RegExp('(^|[.!?/]\\s+)(Ću|Ćeš|Će|Ćemo|Ćete|Sam|Si|Smo|Ste|Ga|Mu|Joj|Ih|Im|Se)\\s', '').test(t)) upoz.push('red ' + it.red + ': klitika na pocetku recenice? "' + t.slice(0, 80) + '"');
    const m = t.match(new RegExp('\\b(jer|da|ako|kad|kada|što|koji|koja|koje)\\s+(?!' + kl + '\\b)([a-zčćđšž]+)\\s+' + kl + '\\b', 'i'));
    if (m) upoz.push('red ' + it.red + ': red klitika iza "' + m[1] + '"? "' + m[0] + '" (provjeri; distraktor smije biti netocan)');
  }
});
// naslovi: dupli i nestali (bodovi su vezani uz naslov)
const nasl = s.map(p => p.naslov), dup = nasl.filter((x, i) => nasl.indexOf(x) !== i);
if (dup.length) upoz.push('dupli naslovi: ' + [...new Set(dup)].join('; '));
const bak = path.join(root, 'igre', '_bak-prije-prosirenja', ime);
if (fs.existsSync(bak)) {
  const stari = stranice(bak).map(p => p.naslov).filter(x => !nasl.includes(x));
  if (stari.length) upoz.push('naslovi iz izvorne datoteke koji vise ne postoje (bodovi se odvajaju — namjerno?): ' + stari.join('; '));
}
// usporedba s razinom 12
const u12 = path.join(root, 'igre', ime.replace(/\d+/, '12'));
if (fs.existsSync(u12) && N !== 12) {
  const n12 = stranice(u12).length, raspon = vrsta === 'lekcija' ? [15, 19] : [n12 - 2, n12 + 3];
  console.log('Uzor razina 12: ' + n12 + ' stranica; ocekivano ' + raspon[0] + '-' + raspon[1] + '.');
  if (s.length < raspon[0] || s.length > raspon[1]) upoz.push('broj stranica ' + s.length + ' izvan ocekivanog raspona ' + raspon.join('-'));
}
if (vrsta === 'test' && !nasl.some(x => /earlier levels/i.test(x))) greske.push('test nema stranicu "From the earlier levels"');
console.log(greske.length ? '\nGRESKE (' + greske.length + '):\n- ' + greske.join('\n- ') : '\nGRESKE: nema');
console.log(upoz.length ? 'UPOZORENJA (' + upoz.length + ', provjeri rucno):\n- ' + upoz.join('\n- ') : 'UPOZORENJA: nema');
process.exit(greske.length ? 2 : 0);
