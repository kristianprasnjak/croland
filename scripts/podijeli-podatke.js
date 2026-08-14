// Dijeli puni data.js na dva dijela:
//   • javni  — besplatne vježbe + "kosturi" plaćenih (naslov, broj bodova, ali BEZ sadržaja)
//   • plaćeni — samo sadržaj zaključanih vježbi, ide u privatni Supabase bucket
//
// Pravilo pristupa je preslikano iz imaPristup() u index.html i mora ostati u koraku s njim:
//   Lesson 0, Daily/Weekly challenge, mini igre i sve razine <= 1 su besplatne,
//   razina 2 i dalje traži pretplatu.
//
// Kosturi postoje zato što naslovnica i tablica lekcija moraju moći prikazati zaključane
// razine — njihov naslov, broj vježbi i "x/y bodova čeka". Bez kostura bi sve od razine 2
// naviše pisalo "coming soon". Zadržan je i `naslov`, jer se iz njega gradi ključ pod kojim
// je napredak već spremljen (kljucIgre); bez njega bi već osvojeni bodovi u zaključanoj
// cjelini pokazivali nulu.
'use strict';

const fs = require('fs');
const path = require('path');

const BESPLATNI_TIPOVI = new Set(['Daily challenge', 'Weekly challenge', 'MiniGame']);
const ZADNJA_BESPLATNA_RAZINA = 1;

function parsirajCjelinu(c) {
  if (!c) return null;
  const m = String(c).match(/^(.+?)\s*(\d+)$/);
  if (!m) return null;
  return { tip: m[1].trim(), razina: parseInt(m[2], 10) };
}

function jeBesplatna(igra) {
  const pc = parsirajCjelinu(igra.cjelina);
  if (!pc) return true;                                  // vježbe bez cjeline — nikad zaključane
  if (BESPLATNI_TIPOVI.has(pc.tip)) return true;
  return pc.razina <= ZADNJA_BESPLATNA_RAZINA;
}

function kostur(igra) {
  return {
    cjelina: igra.cjelina,
    cjelinanaslov: igra.cjelinanaslov,
    stranica: igra.stranica,
    format: igra.format,
    naslov: igra.naslov,
    bodovi: igra.bodovi,
    stavke: [],
    zakljucano: true,
  };
}

// ---- zvukovi ----
// Mapa zvukova je preslikana iz index.html (kljucZvuka / rijeciZvuka / bezZagrada) i mora
// ostati u koraku s njom. Razlog postojanja: ključevi te mape su same rečenice iz vježbi,
// pa bi javna mapa odala sadržaj plaćenih lekcija i bez samih vježbi.
// U javnom dijelu ostaju samo zvukovi do kojih se može doći iz besplatnih vježbi, plus sve
// pojedinačne riječi (rječnik ih treba, a riječ sama po sebi nije sadržaj lekcije).
function rijeciZvuka(txt) {
  return String(txt).toLowerCase().split(/\s+/)
    .map((w) => w.replace(/[.,!?;:…„“”"'’()\[\]\-–—*\/\\]+/g, ''))
    .filter(Boolean);
}

function kljucZvuka(s) {
  s = String(s);
  if (s.normalize) s = s.normalize('NFC');
  return s.toLowerCase()
    .replace(/[*"„“”»«:<>|\\\/?]/g, '')
    .replace(/^[\s—–-]+/, '')
    .replace(/\s+/g, ' ').trim()
    .replace(/[\s.!…]+$/, '');
}

function bezZagrada(txt) {
  return String(txt).replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
}

function kandidatiZvuka(txt) {
  const out = [];
  const dodaj = (t) => {
    if (!t) return;
    out.push(kljucZvuka(t));
    const ws = rijeciZvuka(t);
    if (ws.length === 1) out.push(ws[0]);
  };
  dodaj(txt);
  const b = bezZagrada(txt);
  if (b && b !== String(txt)) dodaj(b);
  return out;
}

function sviTekstovi(igra) {
  const out = [];
  const hodaj = (v) => {
    if (typeof v === 'string') out.push(v);
    else if (Array.isArray(v)) v.forEach(hodaj);
  };
  hodaj(igra.stavke);
  if (igra.naslov) out.push(igra.naslov);
  return out;
}

function podijeliZvukove(zvukovi, besplatne) {
  const javni = {};
  const placeni = {};
  const trazeni = new Set();
  for (const igra of besplatne) {
    for (const t of sviTekstovi(igra)) {
      for (const k of kandidatiZvuka(t)) trazeni.add(k);
    }
  }
  for (const [k, v] of Object.entries(zvukovi || {})) {
    // jedna riječ = natuknica, ne sadržaj lekcije — ostaje javna zbog rječnika
    const jednaRijec = rijeciZvuka(k).length <= 1;
    if (jednaRijec || trazeni.has(k)) javni[k] = v;
    else placeni[k] = v;
  }
  return { javni, placeni };
}

function ucitajPodatke(putanja) {
  const tekst = fs.readFileSync(putanja, 'utf8').replace(/^﻿/, '');
  const od = tekst.indexOf('{');
  const doo = tekst.lastIndexOf('}');
  if (od === -1 || doo === -1) throw new Error('podjela: ne mogu naći JSON u ' + putanja);
  return JSON.parse(tekst.slice(od, doo + 1));
}

function podijeli(podaci) {
  const besplatne = [];
  const placene = [];
  for (const igra of podaci.igre || []) {
    (jeBesplatna(igra) ? besplatne : placene).push(igra);
  }

  const zvuk = podijeliZvukove(podaci.zvukovi, besplatne);

  const javni = {
    generirano: podaci.generirano,
    slike: podaci.slike,
    zvukovi: zvuk.javni,
    igre: besplatne.concat(placene.map(kostur)),
  };

  // Sigurnosna brava: ni jedna zaključana vježba ne smije iznijeti svoj sadržaj u javni dio.
  for (const igra of javni.igre) {
    if (igra.zakljucano && igra.stavke && igra.stavke.length) {
      throw new Error('podjela: zaključana vježba je zadržala sadržaj — ' + igra.naslov);
    }
  }

  return {
    javni,
    placeni: { generirano: podaci.generirano, igre: placene, zvukovi: zvuk.placeni },
    brojke: {
      besplatnih: besplatne.length,
      placenih: placene.length,
      zvukovaJavno: Object.keys(zvuk.javni).length,
      zvukovaSkriveno: Object.keys(zvuk.placeni).length,
    },
  };
}

function zapisi(izlaz, rezultat) {
  const zaglavlje = '// Automatski generirano — ne uredjivati rucno.\n' +
    '// Javni dio sadrzaja. Placene vjezbe su ovdje samo kao kosturi, bez sadrzaja.\n';
  fs.writeFileSync(
    path.join(izlaz.javniDir, 'data.js'),
    zaglavlje + 'window.PODACI = ' + JSON.stringify(rezultat.javni) + ';\n',
    'utf8'
  );
  fs.mkdirSync(izlaz.placeniDir, { recursive: true });
  fs.writeFileSync(
    path.join(izlaz.placeniDir, 'data-plus.json'),
    JSON.stringify(rezultat.placeni),
    'utf8'
  );
}

module.exports = { podijeli, ucitajPodatke, zapisi, jeBesplatna, parsirajCjelinu };

// Ručno pokretanje: node podijeli-podatke.js <data.js> <javni-dir> <placeni-dir>
if (require.main === module) {
  const [izvor, javniDir, placeniDir] = process.argv.slice(2);
  const rezultat = podijeli(ucitajPodatke(izvor));
  zapisi({ javniDir, placeniDir }, rezultat);
  const kb = (p) => Math.round(fs.statSync(p).size / 1024) + ' KB';
  console.log('besplatnih vjezbi:', rezultat.brojke.besplatnih, '| placenih:', rezultat.brojke.placenih);
  console.log('javni  data.js      ->', kb(path.join(javniDir, 'data.js')));
  console.log('privatni data-plus.json ->', kb(path.join(placeniDir, 'data-plus.json')));
}
