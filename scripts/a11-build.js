// A1.1 (Extras): gradi zasticeni sadrzaj za mini-igre/a11.html.
//
//   a11-sadrzaj/teme.json      -> zasticeno/a11-plus.json        (teme, zadaci, format ispita, popis jezika)
//   a11-jezici/upute-en.tsv    -> zasticeno/a11-upute-en.json    (izvor uputa)
//   a11-jezici/upute-XX.tsv    -> zasticeno/a11-upute-XX.json    (kljuc | en | XX; prazno = engleski)
//
// Sve ide u zasticeno/ (privatni bucket "sadrzaj"), nista u dist/. Modul je u mini-igre/ i javan je,
// ali bez ovih datoteka je prazna ljuska. Pokrece ga scripts/build.js; moze i rucno:
//   node scripts/a11-build.js
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const JEZICI_DIR = path.join(ROOT, 'a11-jezici');
const SADRZAJ = path.join(ROOT, 'a11-sadrzaj', 'teme.json');
const ZASTICENO = path.join(ROOT, 'zasticeno');

function citajTsv(datoteka) {
  // Vraca [{kljuc, stupci:[...]}]. Prvi redak je zaglavlje, # i prazni redci se preskacu.
  const redci = fs.readFileSync(datoteka, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
  const zaglavlje = redci.shift().split('\t');
  const out = [];
  redci.forEach((r, i) => {
    if (!r.trim() || r.charAt(0) === '#') return;
    const s = r.split('\t');
    if (!s[0]) throw new Error('a11: prazan kljuc u ' + path.basename(datoteka) + ' redak ' + (i + 2));
    out.push({ kljuc: s[0], stupci: s.slice(1), red: i + 2 });
  });
  return { zaglavlje, redci: out };
}

function umetci(t) { return (String(t).match(/%\d/g) || []).sort().join(','); }

function izgradi() {
  const jezici = JSON.parse(fs.readFileSync(path.join(JEZICI_DIR, 'jezici.json'), 'utf8')).jezici;
  const aktivni = jezici.filter((j) => j.aktivan);
  if (!aktivni.length || aktivni[0].kod !== 'en') throw new Error('a11: engleski mora biti prvi aktivni jezik (izvor uputa)');

  // ---- izvor: engleski ----
  const en = {};
  citajTsv(path.join(JEZICI_DIR, 'upute-en.tsv')).redci.forEach((r) => {
    if (en[r.kljuc] !== undefined) throw new Error('a11: dvostruki kljuc ' + r.kljuc + ' u upute-en.tsv');
    en[r.kljuc] = r.stupci[0] || '';
  });

  // ---- sadrzaj ----
  const sadrzaj = JSON.parse(fs.readFileSync(SADRZAJ, 'utf8'));
  const ids = new Set();
  sadrzaj.teme.forEach((t) => {
    if (ids.has(t.id)) throw new Error('a11: dvostruka tema ' + t.id);
    ids.add(t.id);
    if (en['tema.' + t.id] === undefined) throw new Error('a11: tema ' + t.id + ' nema kljuc tema.' + t.id + ' u upute-en.tsv');
  });

  fs.mkdirSync(ZASTICENO, { recursive: true });
  const generirano = new Date().toISOString();
  const plus = {
    a11: true,
    verzija: sadrzaj.verzija,
    generirano,
    jezici: aktivni.map((j) => ({ kod: j.kod, ime: j.ime, zastava: j.zastava, dir: j.dir, font: j.font, status: j.status })),
    teme: sadrzaj.teme,
    ispit: sadrzaj.ispit,
  };
  fs.writeFileSync(path.join(ZASTICENO, 'a11-plus.json'), JSON.stringify(plus));
  const izlaz = ['a11-plus.json'];

  // ---- upute po jeziku ----
  aktivni.forEach((j) => {
    let tekstovi = {};
    let prevedeno = 0;
    if (j.kod === 'en') {
      tekstovi = en; prevedeno = Object.keys(en).length;
    } else {
      const dat = path.join(JEZICI_DIR, 'upute-' + j.kod + '.tsv');
      if (!fs.existsSync(dat)) throw new Error('a11: jezik ' + j.kod + ' je aktivan, a nema ' + path.basename(dat));
      citajTsv(dat).redci.forEach((r) => {
        if (en[r.kljuc] === undefined) return;            // kljuc vise ne postoji u izvoru
        const t = (r.stupci[1] || '').trim();
        if (!t) return;                                   // neprevedeno: modul pokaze engleski
        if (umetci(t) !== umetci(en[r.kljuc])) throw new Error('a11: ' + j.kod + ' ' + r.kljuc + ' nema iste %1/%2 kao engleski');
        tekstovi[r.kljuc] = t; prevedeno++;
      });
    }
    const ime = 'a11-upute-' + j.kod + '.json';
    fs.writeFileSync(path.join(ZASTICENO, ime), JSON.stringify({ a11: true, jezik: j.kod, dir: j.dir, generirano, tekstovi }));
    izlaz.push(ime + ' (' + prevedeno + '/' + Object.keys(en).length + ')');
  });

  return { izlaz, teme: sadrzaj.teme.length, zadataka: sadrzaj.teme.reduce((n, t) => n + (t.zadaci || []).length, 0) };
}

module.exports = { izgradi };
if (require.main === module) {
  const r = izgradi();
  console.log('a11: ' + r.teme + ' tema, ' + r.zadataka + ' zadataka ->', r.izlaz.join(', '));
}
