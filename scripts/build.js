// Assembles dist/ — the only folder Netlify publishes — from an explicit allowlist of
// runtime files/folders. Anything not listed here (scratch files, source .md/.txt/.csv,
// backups, dev tooling) can never end up on the live site even by accident.
//
// data.js se NE kopira nego dijeli: u dist/ ide samo besplatni dio, a plaćene vježbe idu u
// zasticeno/data-plus.json, koji se ručno uploada u privatni Supabase bucket. Sve što je u
// dist/ je javno dostupno svakome tko zna adresu, pa plaćeni sadržaj tu ne smije završiti.
const fs = require('fs');
const path = require('path');
const { podijeli, ucitajPodatke, zapisi } = require('./podijeli-podatke');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ZASTICENO = path.join(ROOT, 'zasticeno');

const FILES = ['index.html', 'rjecnik.js', 'terms.html', 'privacy.html'];
const DIRS = ['slike', 'zvuk', 'mini-igre'];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const name of FILES) {
  const src = path.join(ROOT, name);
  if (!fs.existsSync(src)) throw new Error('build: missing required file ' + name);
  fs.copyFileSync(src, path.join(DIST, name));
}

for (const name of DIRS) {
  const src = path.join(ROOT, name);
  if (!fs.existsSync(src)) throw new Error('build: missing required folder ' + name);
  fs.cpSync(src, path.join(DIST, name), { recursive: true });
}

// ---- podjela sadržaja ----
const izvor = path.join(ROOT, 'data.js');
if (!fs.existsSync(izvor)) throw new Error('build: missing required file data.js');
const rezultat = podijeli(ucitajPodatke(izvor));
zapisi({ javniDir: DIST, placeniDir: ZASTICENO }, rezultat);

// ---- brava ----
// Zadnja provjera nad onim što stvarno ide van: ni jedna rečenica iz plaćenih vježbi ne
// smije se naći u dist/data.js. Radije neuspio build nego tiho objavljen sadržaj.
const javniTekst = fs.readFileSync(path.join(DIST, 'data.js'), 'utf8');
const javniPodaci = ucitajPodatke(path.join(DIST, 'data.js'));

// (a) strukturno: zaključana vježba u javnom dijelu mora biti prazna ljuštura
for (const igra of javniPodaci.igre) {
  if (igra.zakljucano && (igra.stavke || []).length) {
    throw new Error('build: zakljucana vjezba ima sadrzaj u dist/data.js — ' + igra.naslov);
  }
}
// (b) strukturno: ni jedan skriveni zvuk ne smije stajati u javnoj mapi
for (const kljuc of Object.keys(rezultat.placeni.zvukovi || {})) {
  if (javniPodaci.zvukovi[kljuc]) {
    throw new Error('build: skriveni zvuk stoji u javnoj mapi — ' + kljuc);
  }
}
// (c) tekstualno: cijeli set zadataka plaćene vježbe ne smije se naći u javnoj datoteci.
// Traži se serijalizirani niz stavki, a ne pojedina rečenica — pojedine rečenice i izrazi
// se legitimno ponavljaju između besplatnih i plaćenih vježbi, pa bi lažno rušili build.
for (const igra of rezultat.placeni.igre) {
  const stavke = igra.stavke || [];
  if (stavke.length < 2) continue;
  const otisak = JSON.stringify(stavke);
  if (otisak.length > 40 && javniTekst.includes(otisak)) {
    throw new Error('build: zadaci placene vjezbe su u dist/data.js — ' + igra.naslov);
  }
}

// (d) ništa se ne smije izgubiti u podjeli: javni + zaštićeni dio moraju dati original
const izvorni = ucitajPodatke(izvor);
const spojenoIgara = javniPodaci.igre.filter((g) => !g.zakljucano).length + rezultat.placeni.igre.length;
if (spojenoIgara !== izvorni.igre.length) {
  throw new Error('build: podjela je izgubila vjezbe — ' + spojenoIgara + ' umjesto ' + izvorni.igre.length);
}
const spojeniZvukovi = Object.assign({}, javniPodaci.zvukovi, rezultat.placeni.zvukovi);
if (Object.keys(spojeniZvukovi).length !== Object.keys(izvorni.zvukovi || {}).length) {
  throw new Error('build: podjela je izgubila zvukove');
}

const kb = (p) => Math.round(fs.statSync(p).size / 1024) + ' KB';
console.log('dist/ built:', FILES.concat(DIRS).join(', '));
console.log('  dist/data.js (javno)      ', kb(path.join(DIST, 'data.js')),
  '·', rezultat.brojke.besplatnih, 'vjezbi,', rezultat.brojke.zvukovaJavno, 'zvukova');
console.log('  zasticeno/data-plus.json  ', kb(path.join(ZASTICENO, 'data-plus.json')),
  '·', rezultat.brojke.placenih, 'vjezbi,', rezultat.brojke.zvukovaSkriveno, 'zvukova');
console.log('  -> zasticeno/data-plus.json uploadaj u Supabase Storage bucket "sadrzaj"');
