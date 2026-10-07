#!/usr/bin/env node
/**
 * uploadaj-sadrzaj.js — sprema zasticeno/data-plus.json u privatni Supabase bucket "sadrzaj".
 *
 * Zasto postoji: dist/data.js (javno) i data-plus.json (u bucketu) spajaju se u pregledniku
 * po klucu `cjelina|stranica|naslov`. Ako se objavi novi dist/ a u bucketu ostane stari
 * data-plus.json, klucevi se raziđu i cjeline stanu na poruku da sadrzaj nije osvjezen.
 * Zato upload nikad ne smije biti korak koji se zaboravi — objavi.bat ga pokrece automatski.
 *
 * Kljuc se cita iz .env (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) i nikad se ne ispisuje.
 * Svaki pokusaj se zapisuje u zadnji-upload-log.txt, da se neuspjeh moze pogledati poslije.
 *
 * Pokretanje rucno:  node uploadaj-sadrzaj.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = __dirname;
// svaki jezik ima svoj placeni dio; oba moraju biti u bucketu prije objave dist/
// Bez argumenata: Croland (EN + DE sučelje). S argumentima samo te datoteke, npr.
//   node uploadaj-sadrzaj.js data-plus-fr.json   (francuski tečaj, vidi francais/)
const DATOTEKE = process.argv.length > 2 ? process.argv.slice(2) : ['data-plus.json', 'data-plus-de.json', 'data-plus-es.json'];
const LOG = path.join(ROOT, 'zadnji-upload-log.txt');
const BUCKET = 'sadrzaj';

const redci = [];
function zapisi(poruka) {
  const t = new Date().toISOString().replace('T', ' ').slice(0, 19);
  redci.push(t + '  ' + poruka);
  console.log(poruka);
}
function spremiLog() {
  try { fs.writeFileSync(LOG, redci.join('\n') + '\n', 'utf8'); } catch (e) { /* nebitno */ }
}
function odustani(poruka) {
  zapisi('GRESKA: ' + poruka);
  zapisi('(cijeli zapis je u zadnji-upload-log.txt)');
  spremiLog();
  process.exit(1);
}

function citajEnv() {
  const p = path.join(ROOT, '.env');
  if (!fs.existsSync(p)) odustani('nema .env datoteke — bez nje ne znam kljuc za Supabase.');
  const out = {};
  for (const linija of fs.readFileSync(p, 'utf8').replace(/^﻿/, '').split(/\r?\n/)) {
    const m = linija.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

function posalji(metoda, url, kljuc, tijelo) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: metoda,
      headers: {
        Authorization: 'Bearer ' + kljuc,
        apikey: kljuc,
        'Content-Type': 'application/json',
        'Content-Length': tijelo.length,
        // bez ovoga Supabase odbija POST jer datoteka istog imena vec postoji
        'x-upsert': 'true',
        'cache-control': 'no-cache',
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

async function uploadaj(OBJEKT, env) {
  const DATOTEKA = path.join(ROOT, 'zasticeno', OBJEKT);
  zapisi('--- upload: ' + OBJEKT + ' ---');

  if (!fs.existsSync(DATOTEKA)) odustani('nema ' + DATOTEKA + ' — pokreni prvo "npm run build".');

  const tijelo = fs.readFileSync(DATOTEKA);
  try {
    const podaci = JSON.parse(tijelo.toString('utf8'));
    if (!(podaci.igre || []).length) throw new Error('nema ni jedne vjezbe');
    zapisi(OBJEKT + ': ' + podaci.igre.length + ' placenih vjezbi, generirano ' + podaci.generirano);
  } catch (e) {
    odustani(OBJEKT + ' nije ispravan (' + e.message + ') — upload prekinut.');
  }

  const url = env.SUPABASE_URL.replace(/\/+$/, '') + '/storage/v1/object/' + BUCKET + '/' + OBJEKT;
  zapisi('saljem u bucket "' + BUCKET + '" (' + Math.round(tijelo.length / 1024) + ' KB)...');

  // Supabase Storage: POST stvara novu datoteku, PUT mijenja postojecu. x-upsert bi trebao
  // biti dovoljan, ali neke verzije ga na POST-u ignoriraju i vrate 400/409 "already exists",
  // pa se u tom slucaju isto salje jos jednom kao PUT.
  let r;
  try {
    r = await posalji('POST', url, env.SUPABASE_SERVICE_ROLE_KEY, tijelo);
    zapisi('POST -> HTTP ' + r.status);
    if (r.status === 400 || r.status === 409) {
      zapisi('datoteka vec postoji — saljem ponovo kao izmjenu (PUT)...');
      r = await posalji('PUT', url, env.SUPABASE_SERVICE_ROLE_KEY, tijelo);
      zapisi('PUT -> HTTP ' + r.status);
    }
  } catch (e) {
    odustani('upload nije uspio (' + e.message + '). Provjeri internet vezu.');
  }

  if (r.status >= 200 && r.status < 300) {
    zapisi('OK — ' + OBJEKT + ' je u bucketu.');
  } else {
    zapisi('odgovor Supabasea: ' + r.tekst.slice(0, 500));
    odustani('Supabase je odbio upload (HTTP ' + r.status + ').');
  }
}

(async () => {
  const env = citajEnv();
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    odustani('u .env nedostaje SUPABASE_URL ili SUPABASE_SERVICE_ROLE_KEY.');
  }
  for (const objekt of DATOTEKE) await uploadaj(objekt, env);
  spremiLog();
})();
