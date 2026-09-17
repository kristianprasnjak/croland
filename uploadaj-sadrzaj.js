#!/usr/bin/env node
/**
 * uploadaj-sadrzaj.js — sprema zasticeno/data-plus.json u privatni Supabase bucket "sadrzaj".
 *
 * Zasto postoji: dist/data.js (javno) i data-plus.json (u bucketu) spajaju se u pregledniku
 * po klucu `cjelina|stranica|naslov`. Ako se objavi novi dist/ a u bucketu ostane stari
 * data-plus.json, klucevi se raziđu i cjeline stanu na "Loading this unit...". Zato upload
 * nikad ne smije biti korak koji se zaboravi — objavi.bat ga pokrece automatski.
 *
 * Kljuc se cita iz .env (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) i nikad se ne ispisuje.
 * Pokretanje rucno:  node uploadaj-sadrzaj.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = __dirname;
const DATOTEKA = path.join(ROOT, 'zasticeno', 'data-plus.json');
const BUCKET = 'sadrzaj';
const OBJEKT = 'data-plus.json';

function citajEnv() {
  const p = path.join(ROOT, '.env');
  if (!fs.existsSync(p)) {
    throw new Error('Nema .env datoteke — bez nje ne znam kljuc za Supabase.');
  }
  const out = {};
  for (const linija of fs.readFileSync(p, 'utf8').replace(/^﻿/, '').split(/\r?\n/)) {
    const m = linija.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

function posalji(url, kljuc, tijelo) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + kljuc,
        'Content-Type': 'application/json',
        'Content-Length': tijelo.length,
        // bez ovoga Supabase odbija upload jer datoteka istog imena vec postoji
        'x-upsert': 'true',
      },
    }, (res) => {
      let tekst = '';
      res.on('data', (d) => { tekst += d; });
      res.on('end', () => resolve({ status: res.statusCode, tekst }));
    });
    req.on('error', reject);
    req.write(tijelo);
    req.end();
  });
}

(async () => {
  if (!fs.existsSync(DATOTEKA)) {
    console.error('GRESKA: nema ' + DATOTEKA + ' — pokreni prvo "npm run build".');
    process.exit(1);
  }
  const env = citajEnv();
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('GRESKA: u .env nedostaje SUPABASE_URL ili SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(1);
  }

  const tijelo = fs.readFileSync(DATOTEKA);
  // sanity check: mora biti ispravan JSON sa vjezbama, da se u bucket ne uploada smece
  let broj = 0;
  try {
    const podaci = JSON.parse(tijelo.toString('utf8'));
    broj = (podaci.igre || []).length;
    if (!broj) throw new Error('nema ni jedne vjezbe');
    console.log('data-plus.json: ' + broj + ' placenih vjezbi, generirano ' + podaci.generirano);
  } catch (e) {
    console.error('GRESKA: data-plus.json nije ispravan (' + e.message + ') — upload prekinut.');
    process.exit(1);
  }

  const url = env.SUPABASE_URL.replace(/\/+$/, '') +
    '/storage/v1/object/' + BUCKET + '/' + OBJEKT;
  console.log('Uploadam u bucket "' + BUCKET + '"...');

  let r;
  try {
    r = await posalji(url, env.SUPABASE_SERVICE_ROLE_KEY, tijelo);
  } catch (e) {
    console.error('GRESKA: upload nije uspio (' + e.message + '). Provjeri internet.');
    process.exit(1);
  }

  if (r.status >= 200 && r.status < 300) {
    console.log('OK — sadrzaj je u bucketu (' + Math.round(tijelo.length / 1024) + ' KB).');
  } else {
    console.error('GRESKA: Supabase je odgovorio ' + r.status + ': ' + r.tekst.slice(0, 300));
    process.exit(1);
  }
})();
