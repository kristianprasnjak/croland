#!/usr/bin/env node
/**
 * vokabular-stare.js — bira STARE riječi koje se miješaju u Vocabulary cjelinu razine N.
 * Napisano 29.09.2026. uz UPUTE-vokabular-preradba.md.
 *
 * Pokretanje:  node vokabular-stare.js N
 *
 * Bazen: riječi s kartica (format: kartice) iz igre/vokabular-01.md … vokabular-(N-1).md,
 * plus riječi iz Lesson 0 (igre/lekcija-0.md). Za N = 1 bazen je samo Lesson 0.
 * Datoteke se čitaju u trenutku poziva, pa razina 14 vidi već prerađenu razinu 13.
 *
 * Prednost dobiva riječ koja se NAJDULJE nije pojavila: zadnje pojavljivanje je razina
 * na kojoj je uvedena ili zadnja razina u koju ju je ovaj plan već vratio. Riječi iz
 * razine N-1 uzimaju se tek kad drugih nema dovoljno (ionako su svježe).
 *
 * Rezultat se upisuje u vokabular-plan.json pod ključem "N". Ako ključ već postoji,
 * plan se NE mijenja (ponovljeni pokušaj iste razine dobiva iste riječi).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const N = parseInt(process.argv[2], 10);
if (!(N >= 1 && N <= 20)) { console.error('Upotreba: node vokabular-stare.js N   (N = 1..20)'); process.exit(1); }

const root = __dirname;
const igreDir = path.join(root, 'igre');
const planPut = path.join(root, 'vokabular-plan.json');
const KOLIKO = 24;          // dovoljno za 3-4 miješane vježbe s pola starih riječi

let plan = {};
try { plan = JSON.parse(fs.readFileSync(planPut, 'utf8')); } catch (e) { plan = {}; }
if (plan[String(N)]) {
  console.log('Plan za razinu ' + N + ' već postoji (' + plan[String(N)].length + ' riječi) — ne mijenjam ga.');
  process.exit(0);
}

// osnovni oblik: prije strelice, kose crte i točke-razdjelnika; bez (mn.), (m.) i sl.
function osnovni(hr) {
  let s = String(hr).split(/\s*(?:→|->)\s*/)[0];
  s = s.split(/\s+·\s+/)[0].split(/\s*\/\s*/)[0];
  s = s.replace(/\s*\([^)]*\)\s*$/, '').trim();
  return s;
}
// kratke službene riječi (i, a, je, ovo…) nisu vokabular za ponavljanje
const SLUZBENE = new Set(['i', 'a', 'ali', 'je', 'ovo', 'to', 'ne', 'da', 'li', 'jer', 'u', 'na', 's', 'sa', 'tko', 'što']);
function jeRijec(s) {
  if (!s) return false;
  if (/[!?+….]/.test(s)) return false;        // fraze i obrasci ("ne + glagol", "Dobro sam.")
  if (SLUZBENE.has(s.toLowerCase())) return false;
  if (s.split(/\s+/).length > 2) return false;  // duže fraze nisu "riječ"
  return true;
}
// čita stavke kartica iz jedne .md datoteke
function karticeIz(dat, odKuda) {
  const p = path.join(igreDir, dat);
  if (!fs.existsSync(p)) return [];
  const redovi = fs.readFileSync(p, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
  const van = []; let format = '';
  for (const r of redovi) {
    if (/^##\s/.test(r)) { format = ''; continue; }
    const f = r.match(/^format:\s*(\S+)/); if (f) { format = f[1].trim(); continue; }
    const kart = format === 'kartice' || (odKuda === 0 && (format === 'zid' || format === 'spajanje'));
    if (!kart || !/^-\s/.test(r)) continue;
    const dijelovi = r.replace(/^-\s*/, '').split('|').map(x => x.trim());
    if (dijelovi[0].startsWith('tab:')) continue;
    const hr = osnovni(dijelovi[0]);
    if (!jeRijec(hr)) continue;
    van.push({ hr: hr, en: (dijelovi[1] || '').split(/\s+·\s+/)[0].trim(), od: odKuda });
  }
  return van;
}

// bazen, bez duplikata (prvo pojavljivanje odlučuje razinu uvođenja)
const bazen = new Map();
function dodaj(lista) {
  for (const w of lista) {
    const k = w.hr.toLowerCase();
    if (!bazen.has(k)) bazen.set(k, w);
  }
}
dodaj(karticeIz('lekcija-0.md', 0));
for (let r = 1; r < N; r++) dodaj(karticeIz('vokabular-' + String(r).padStart(2, '0') + '.md', r));

// zadnje pojavljivanje = razina uvođenja ili zadnji povratak po planu
const zadnje = new Map();
for (const [k, w] of bazen) zadnje.set(k, w.od);
for (const kljuc of Object.keys(plan)) {
  const r = parseInt(kljuc, 10);
  if (!(r < N)) continue;
  for (const w of plan[kljuc]) {
    const k = String(w.hr).toLowerCase();
    if (zadnje.has(k) && zadnje.get(k) < r) zadnje.set(k, r);
  }
}

// Izbor je raspoređen po razinama: iz svake ranije razine (i Lesson 0) redom se uzima
// po jedna riječ, i to ona koja je najdulje odsutna — dok ih ne bude KOLIKO. Tako se
// vraćaju riječi iz cijelog tečaja, a ne samo iz najstarije razine. Stabilan poredak:
// isti ulaz daje isti izbor.
function skupiIzbor(dopustiSvjeze) {
  const grupe = new Map();
  for (const k of bazen.keys()) {
    const w = bazen.get(k), z = zadnje.get(k);
    if (!dopustiSvjeze && N > 1 && N - z < 2) continue;   // viđena na prošloj razini
    if (!grupe.has(w.od)) grupe.set(w.od, []);
    grupe.get(w.od).push(k);
  }
  for (const lista of grupe.values()) {
    lista.sort((a, b) => (zadnje.get(a) - zadnje.get(b)) || a.localeCompare(b, 'hr'));
  }
  const razine = [...grupe.keys()].sort((a, b) => a - b);
  const van = [];
  let krug = 0;
  while (van.length < KOLIKO) {
    let dodano = false;
    for (const r of razine) {
      const lista = grupe.get(r);
      if (krug < lista.length && van.length < KOLIKO) { van.push(lista[krug]); dodano = true; }
    }
    if (!dodano) break;
    krug++;
  }
  return van;
}
let kljucevi = skupiIzbor(false);
if (kljucevi.length < KOLIKO) {
  const vec = new Set(kljucevi);
  for (const k of skupiIzbor(true)) { if (kljucevi.length >= KOLIKO) break; if (!vec.has(k)) kljucevi.push(k); }
}
const izbor = kljucevi.map(k => bazen.get(k));

plan[String(N)] = izbor;
fs.writeFileSync(planPut, JSON.stringify(plan, null, 1), 'utf8');
console.log('Razina ' + N + ': ' + izbor.length + ' starih riječi (bazen ' + bazen.size + ').');
console.log(izbor.map(w => w.hr + ' (' + (w.od === 0 ? 'L0' : 'V' + w.od) + ')').join(', '));
