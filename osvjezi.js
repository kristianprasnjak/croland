#!/usr/bin/env node
/**
 * osvjezi.js — Node inačica osvjezi.ps1 (isti ulaz, isti izlaz).
 * Postoji jer poslužitelji nisu Windows: isti data.js se može generirati u CI-ju.
 *
 * Pokretanje:  node osvjezi.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = __dirname;
const igreDir = path.join(root, 'igre');

const tipRang = { lesson: 1, vocabulary: 2, grammar: 3, practice: 4, test: 5 };

// ============ BODOVANJE ============
// Tri sastojka, tim redom:
//   1. baza po formatu    — koliko posla trazi sama mehanika
//   2. kolicina sadrzaja  — uska korekcija (±20 %), NE glavni pokretac
//   3. razina             — glavni pokretac, geometrijski rast
// Zbog uskog pojasa pod 2. rast po razini je zajamceno monoton: najgori omjer
// izmedu iste vrste vjezbe na razini 10 i razini 1 je 0.8/1.2 × 2.56 = 1.71.

// osnovni bodovi po formatu (moze se pregaziti s "bodovi: N" u odjeljku md-a)
const bazaBodova = {
  tekst: 4, kartice: 5, dijalog: 5, parovi: 5, memorija: 5,
  brzina: 6, izbor: 6, slaganje: 6, razvrstavanje: 6, poredak: 6,
  nastavak: 6,
  upis: 7, provjera: 10,
  // mehanike lekcije 0
  spajanje: 5, baloni: 6, vlak: 6, slova: 6, pamti: 6, zid: 2
};

// Ocekivana kolicina po vjezbi. Za mehanike koje uzorkuju to je velicina uzorka
// (vidi uzorak(...) u app.html), za ostale razumna referenca.
const ocekivanoStavki = {
  izbor: 5, upis: 5, slaganje: 5, parovi: 5, memorija: 8, provjera: 10,
  razvrstavanje: 12, nastavak: 8, spajanje: 12, pamti: 3, baloni: 6,
  tekst: 6, kartice: 12, dijalog: 8, poredak: 8, slova: 3, zid: 30
};
const POJAS_DOLJE = 0.8, POJAS_GORE = 1.2;   // koliko kolicina sadrzaja smije pomaknuti bazu

// Rast po razini. Geometrijski, jer kasne cjeline moraju nositi ozbiljne bodove:
//   R1 ×1.00 · R5 ×1.52 · R10 ×2.56 · R15 ×4.31 · R19 ×6.54 · R20 ×7.26
const RAST_PO_RAZINI = 1.11;
// Daily challenge se NE skalira: u valute() se pretvara preko udjela
// (tezina × osvojeno/maksimum), pa apsolutni bodovi ionako otpadaju —
// svaki dnevni izazov vrijedi 5 LP + 5 VP + 5 GP + 5 PP bez obzira na njih.

function parseBlok(linije) {
  const r = { format: null, meta: {}, stavke: [], naslov: null, broj: null, cjelina: null };
  for (const line of linije) {
    const t = String(line).trim();
    if (/^[-\s|:>]*$/.test(t)) continue;                       // prazno / separatori / citati
    let m;
    if ((m = t.match(/^#\s+(.+)$/))) { r.naslov = m[1].trim(); continue; }
    if ((m = t.match(/^[-*]\s+(.+)$/))) {
      const parts = m[1].split('|').map(x => x.trim()).filter(Boolean);
      if (parts.length) r.stavke.push(parts);
      continue;
    }
    if ((m = t.match(/^format:\s*(\S+)/))) { r.format = m[1].trim(); continue; }
    if ((m = t.match(/^broj:\s*(\d+)/))) { r.broj = parseInt(m[1], 10); continue; }
    if ((m = t.match(/^cjelina:\s*(.+)$/))) { r.cjelina = m[1].trim(); continue; }
    if ((m = t.match(/^(\w+):\s*(.+)$/))) { r.meta[m[1].toLowerCase()] = m[2].trim(); continue; }
  }
  return r;
}

const igre = [];
for (const naziv of fs.readdirSync(igreDir).filter(f => f.toLowerCase().endsWith('.md')).sort()) {
  const puni = path.join(igreDir, naziv);
  const lines = fs.readFileSync(puni, 'utf8').split(/\r?\n/);

  const blokovi = [];
  let cur = { naslov: null, linije: [] };
  blokovi.push(cur);
  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) { cur = { naslov: m[1].trim(), linije: [] }; blokovi.push(cur); }
    else cur.linije.push(line);
  }

  const header = parseBlok(blokovi[0].linije);
  const cjelina = header.cjelina;
  const cjelinaNaslov = header.naslov;
  const brojFile = header.broj !== null ? header.broj : 9999;

  const sekcije = blokovi.slice(1);
  if (sekcije.length === 0) {
    if (header.format && header.stavke.length) {
      igre.push({
        cjelina, cjelinanaslov: null, stranica: 1, broj: brojFile,
        format: header.format, naslov: header.naslov || path.basename(naziv, '.md'),
        meta: header.meta, stavke: header.stavke
      });
    }
  } else {
    let str = 0;
    for (const s of sekcije) {
      const g = parseBlok(s.linije);
      if (g.format && g.stavke.length) {
        str++;
        igre.push({
          cjelina: g.cjelina || cjelina, cjelinanaslov: cjelinaNaslov, stranica: str, broj: brojFile,
          format: g.format, naslov: s.naslov, meta: g.meta, stavke: g.stavke
        });
      }
    }
  }
}

// sortiranje + bodovi
for (const g of igre) {
  let kljuc = 100000000 + g.broj * 100 + g.stranica;
  const m = g.cjelina ? g.cjelina.match(/^(.+?)\s*(\d+)$/) : null;
  if (m) {
    const tip = m[1].trim().toLowerCase();
    const razina = parseInt(m[2], 10);
    if (tipRang[tip]) kljuc = razina * 100000 + tipRang[tip] * 1000 + g.stranica;
    else if (tip === 'daily challenge') kljuc = 50000000 + razina * 1000 + g.stranica;
    else kljuc = 90000000 + razina * 1000 + g.stranica;
  }
  g.sortkljuc = kljuc;

  let b;
  if (Object.prototype.hasOwnProperty.call(g.meta, 'bodovi')) {
    b = parseInt(g.meta.bodovi, 10);
  } else {
    const n = g.stavke.length;
    // 1. baza po formatu
    let baza = bazaBodova[g.format] !== undefined ? bazaBodova[g.format] : 5;
    // 2. kolicina sadrzaja — samo uska korekcija, da veca vjezba vrijedi malo vise
    const ocek = ocekivanoStavki[g.format];
    if (ocek) {
      const f = Math.min(POJAS_GORE, Math.max(POJAS_DOLJE, n / ocek));
      baza = baza * f;
    }
    // 3. razina — glavni pokretac
    let mn = 1.0;
    if (m) {
      const tip2 = m[1].trim().toLowerCase();
      const raz = parseInt(m[2], 10);
      // daily/weekly challenge namjerno ostaju bez rasta (v. komentar uz RAST_PO_RAZINI)
      // Lesson 0 je nebodovana uvodna cjelina — nikad ispod baze
      if (tipRang[tip2]) mn = Math.pow(RAST_PO_RAZINI, Math.max(0, raz - 1));
    }
    // PowerShell [Math]::Round koristi banker's rounding
    const v = baza * mn;
    const dolje = Math.floor(v), ost = v - dolje;
    let zaokr;
    if (Math.abs(ost - 0.5) < 1e-9) zaokr = (dolje % 2 === 0) ? dolje : dolje + 1;
    else zaokr = Math.round(v);
    b = Math.max(1, zaokr);
  }
  g.bodovi = b;
}
igre.sort((a, b) => (a.sortkljuc - b.sortkljuc) || String(a.naslov).localeCompare(String(b.naslov)));

// slike: naziv datoteke = hrvatska rijec/fraza
const slike = {};
const slikeDir = path.join(root, 'slike');
if (fs.existsSync(slikeDir)) {
  for (const f of fs.readdirSync(slikeDir).sort()) {
    if (!/\.(jpe?g|png|gif|webp|bmp|avif|svg)$/i.test(f)) continue;
    const k = path.basename(f, path.extname(f)).toLowerCase().trim().replace(/[\s.!?]+$/, '');
    if (k && !(k in slike)) slike[k] = 'slike/' + f;
  }
}

// zvukovi: NFC, mala slova, sazeti razmaci, bez zavrsne interpunkcije
const zvukovi = {};
const zvukDir = path.join(root, 'zvuk');
if (fs.existsSync(zvukDir)) {
  for (const f of fs.readdirSync(zvukDir).sort()) {
    if (!/\.(mp3|wav|ogg|m4a|webm)$/i.test(f)) continue;
    let k = path.basename(f, path.extname(f)).normalize('NFC').toLowerCase().trim();
    k = k.replace(/\s+/g, ' ').replace(/[\s.!?…]+$/, '');
    if (k && !(k in zvukovi)) zvukovi[k] = 'zvuk/' + f;
  }
}

function dvije(n) { return String(n).padStart(2, '0'); }
const d = new Date();
const generirano = d.getFullYear() + '-' + dvije(d.getMonth() + 1) + '-' + dvije(d.getDate()) + ' ' +
  dvije(d.getHours()) + ':' + dvije(d.getMinutes()) + ':' + dvije(d.getSeconds());

const obj = { generirano, slike, zvukovi, igre };
const js = '// Automatski generirano putem osvjezi.bat - ne uredjivati rucno\r\n' +
  'window.PODACI = ' + JSON.stringify(obj, null, 2) + ';\r\n';
fs.writeFileSync(path.join(root, 'data.js'), '﻿' + js, 'utf8');

console.log('data.js osvjezen - broj igara: ' + igre.length +
  ', broj slika: ' + Object.keys(slike).length +
  ', broj zvukova: ' + Object.keys(zvukovi).length);

// ---- rjecnik.js: tri .jsonl datoteke -> window.RJECNIK ----
function citajJsonl(ime) {
  const p = path.join(root, ime);
  if (!fs.existsSync(p)) return [];
  return fs.readFileSync(p, 'utf8').replace(/^﻿/, '').split(/\r?\n/)
    .filter(l => l.trim()).map(l => JSON.parse(l));
}
const leme = citajJsonl('rjecnik.jsonl');
const prijevodi = {};
for (const r of citajJsonl('prijevodi.jsonl')) prijevodi[r.lema] = r.en;
const enHr = {};
for (const r of citajJsonl('rjecnik-en-hr.jsonl')) enHr[r.en] = r.hr;

const rjJs = '// Automatski generirano putem osvjezi.bat - ne uredjivati rucno\r\n' +
  'window.RJECNIK = ' + JSON.stringify({ leme, prijevodi, enHr }) + ';\r\n';
fs.writeFileSync(path.join(root, 'rjecnik.js'), '﻿' + rjJs, 'utf8');

console.log('rjecnik.js osvjezen - broj lema: ' + leme.length);
