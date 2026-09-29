// Čita data.js i rjecnik.js iz projekta, da tester zna:
//  - što prikazuje koja slika (engleski, kao što bi je čovjek "vidio"),
//  - koju rečenicu izgovara koja zvučna datoteka,
//  - redoslijed cjelina i vježbi (za ciljane testove i mjerenje napretka).
import fs from 'fs';
import path from 'path';
import vm from 'vm';

function ucitajWindowVar(datoteka, ime) {
  const kod = fs.readFileSync(datoteka, 'utf8').replace(/^﻿/, '');
  const kontekst = { window: {} };
  vm.createContext(kontekst);
  vm.runInContext(kod, kontekst, { filename: path.basename(datoteka) });
  return kontekst.window[ime];
}

const TIPOVI_REDOSLIJED = ['Lesson', 'Vocabulary', 'Grammar', 'Practice', 'Test'];

export function ucitajPodatke(korijen) {
  const P = ucitajWindowVar(path.join(korijen, 'data.js'), 'PODACI') || {};
  let R = {};
  try { R = ucitajWindowVar(path.join(korijen, 'rjecnik.js'), 'RJECNIK') || {}; } catch (e) { R = {}; }
  const prijevodi = R.prijevodi || {};

  // hr -> en iz rječnika i iz parova u vježbama
  const hrEn = {};
  for (const [hr, en] of Object.entries(prijevodi)) hrEn[hr.toLowerCase()] = Array.isArray(en) ? en[0] : en;
  for (const g of (P.igre || [])) {
    if (!Array.isArray(g.stavke)) continue;
    for (const s of g.stavke) {
      if (Array.isArray(s) && s.length === 2 && typeof s[0] === 'string' && typeof s[1] === 'string'
        && s[0].length < 40 && !hrEn[s[0].toLowerCase()]) hrEn[s[0].toLowerCase()] = s[1];
    }
  }

  // datoteka slike -> engleski opis
  const slike = {};
  for (const [kljuc, dat] of Object.entries(P.slike || {})) {
    const ime = decodeURIComponent(path.basename(dat)).replace(/\.[a-z0-9]+$/i, '').toLowerCase();
    slike[ime] = hrEn[kljuc.toLowerCase()] || hrEn[ime] || null;
  }

  // datoteka zvuka -> tekst
  const zvukovi = {};
  for (const [tekst, dat] of Object.entries(P.zvukovi || {})) {
    zvukovi[decodeURIComponent(path.basename(dat)).toLowerCase()] = tekst;
  }

  // cjeline po redu
  const igre = (P.igre || []).filter(g => g.cjelina);
  const cjeline = {};
  for (const g of igre) {
    const m = String(g.cjelina).match(/^(.+?)\s*(\d+)$/);
    if (!m) continue;
    const c = cjeline[g.cjelina] || (cjeline[g.cjelina] = {
      ime: g.cjelina, tip: m[1].trim(), razina: parseInt(m[2], 10), naslov: g.cjelinanaslov || '', vjezbe: []
    });
    c.vjezbe.push(g);
  }
  for (const c of Object.values(cjeline)) c.vjezbe.sort((a, b) => (a.sortkljuc || 0) - (b.sortkljuc || 0));
  const tecaj = Object.values(cjeline)
    .filter(c => TIPOVI_REDOSLIJED.includes(c.tip))
    .sort((a, b) => a.razina - b.razina || TIPOVI_REDOSLIJED.indexOf(a.tip) - TIPOVI_REDOSLIJED.indexOf(b.tip));

  const kljucIgre = g => (g.cjelina || '') + '|' + g.stranica + '|' + g.naslov;
  const poKljucu = {};
  for (const g of igre) poKljucu[kljucIgre(g)] = g;

  return { slike, zvukovi, cjeline, tecaj, kljucIgre, poKljucu, brojVjezbi: igre.length };
}

// Napredak "kao da je učenik prošao sve prije zadane cjeline" — realističan, ne savršen.
export function napredakDo(podaci, ciljnaCjelina, sjeme = 1) {
  let s = sjeme;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const vjezbe = {}, pokrenute = {};
  const idx = podaci.tecaj.findIndex(c => c.ime.toLowerCase() === ciljnaCjelina.toLowerCase());
  if (idx < 0) throw new Error('Ne postoji cjelina "' + ciljnaCjelina + '". Primjeri: ' +
    podaci.tecaj.slice(0, 6).map(c => c.ime).join(', ') + ' ...');
  let t = Date.now() - idx * 3600e3 * 20;
  for (const c of podaci.tecaj.slice(0, idx)) {
    pokrenute[c.ime] = (t += 3600e3 * 20);
    for (const g of c.vjezbe) {
      if (rnd() < 0.07) continue;                     // poneka preskočena
      const max = g.bodovi || 1;
      vjezbe[podaci.kljucIgre(g)] = Math.max(1, Math.round(max * (0.55 + rnd() * 0.45)));
    }
  }
  return { vjezbe, pokrenute, cjelina: podaci.tecaj[idx] };
}
