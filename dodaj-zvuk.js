#!/usr/bin/env node
/**
 * dodaj-zvuk.js — nadopunjuje recenice.txt i rijeci.txt onim što u data.js nema MP3.
 *
 * Redoslijed:
 *   1. osvježi.bat            (ili: node osvjezi.js)   -> data.js
 *   2. node dodaj-zvuk.js                              -> recenice.txt / rijeci.txt
 *   3. generiraj-zvuk.ps1                              -> zvuk\*.mp3
 *   4. osvježi.bat                                     -> data.js s novim zvukovima
 *
 * Bez argumenata gleda cijeli tečaj. Uz argument gleda samo te cjeline:
 *   node dodaj-zvuk.js "Lesson 10" "Vocabulary 9"
 *
 * Ništa ne briše i ne mijenja postojeće retke — samo dopisuje na kraj.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const root = __dirname;

const norm = t => String(t).normalize('NFC').toLowerCase().trim()
  .replace(/\s+/g, ' ').replace(/[\s.!?…]+$/, '');

// iz kojih se formata čita hrvatski tekst i iz kojeg polja
const PRVO_POLJE = ['kartice', 'parovi', 'memorija', 'brzina', 'spajanje', 'baloni', 'slova', 'slaganje', 'poredak'];

function ucitajPodatke() {
  const s = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
  const i = s.indexOf('{');
  return JSON.parse(s.slice(i).trim().replace(/;$/, ''));
}

function kandidati(d, filtar) {
  const recenice = new Set(), rijeci = new Set();
  for (const g of d.igre) {
    if (filtar.length && filtar.indexOf(g.cjelina) === -1) continue;
    for (const st of g.stavke || []) {
      let polja = [];
      if (g.format === 'dijalog') polja = st.slice(1);          // npc/ti + replike
      else if (PRVO_POLJE.indexOf(g.format) !== -1) polja = [st[0]];
      for (const polje of polja) {
        const t = String(polje == null ? '' : polje);
        // preskoči sve što nije čista rečenica/riječ za izgovor
        if (/___|→|\[|\]|\*|tab:|^en:/i.test(t)) continue;
        // "moj / moja / moje" i "gledao / gledala / gledali" -> tri zasebna oblika
        for (const dio of t.split(' / ')) {
          const w = dio.trim();
          if (!w || w === '-' || w === '—') continue;
          if (norm(w) in d.zvukovi) continue;
          (/[ .!?,]/.test(w) ? recenice : rijeci).add(w);
        }
      }
    }
  }
  return { recenice: [...recenice], rijeci: [...rijeci] };
}

function dopisi(datoteka, novi) {
  const p = path.join(root, datoteka);
  const staro = fs.existsSync(p) ? fs.readFileSync(p, 'utf8').split(/\r?\n/).map(norm) : [];
  const zaDodati = novi.filter(x => staro.indexOf(norm(x)) === -1);
  if (zaDodati.length) fs.appendFileSync(p, '\r\n' + zaDodati.join('\r\n') + '\r\n');
  return zaDodati;
}

const filtar = process.argv.slice(2);
const d = ucitajPodatke();
const k = kandidati(d, filtar);
const noveRecenice = dopisi('recenice.txt', k.recenice);
const noveRijeci = dopisi('rijeci.txt', k.rijeci);

console.log('Pregledano: ' + (filtar.length ? filtar.join(', ') : 'cijeli tečaj'));
console.log('Bez zvuka: ' + k.recenice.length + ' rečenica, ' + k.rijeci.length + ' riječi.');
console.log('Dopisano u recenice.txt: ' + noveRecenice.length);
console.log('Dopisano u rijeci.txt:   ' + noveRijeci.length);
if (noveRecenice.length || noveRijeci.length) {
  console.log('\nSljedeći korak: generiraj-zvuk.ps1, pa opet osvježi.bat');
} else {
  console.log('\nSve je već na popisu — nema novih redaka.');
}
