/*
  konvertiraj-slike.js — PNG/JPG iz mape `slike/` u WebP u mapu `slike-web/`.

  Originali se NE diraju. Nazivi datoteka ostaju isti (uključujući dijakritiku),
  mijenja se samo ekstenzija: slike/Ananas.png -> slike-web/Ananas.webp

  Priprema (jednom):
      npm install sharp

  Pokretanje:
      node konvertiraj-slike.js

  Skripta je idempotentna — preskače sve što je već konvertirano i nije se
  promijenilo. Nakon dodavanja novih slika samo je pokrenite iznova; obradit
  će isključivo nove.

  Opcije:
      --velicina=512     najveća strana u px (zadano 512)
      --kvaliteta=82     WebP kvaliteta 1-100 (zadano 82)
      --izlaz=slike-web  izlazna mapa
      --ulaz=slike       ulazna mapa
      --sve              ponovno konvertiraj i ono što već postoji
      --probno           samo ispiši što bi se dogodilo, bez pisanja

  Nakon konverzije pokrenite `node osvjezi.js` da se data.js osvježi.
*/

'use strict';

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('\n  Nedostaje paket "sharp". Instalirajte ga s:\n');
  console.error('      npm install sharp\n');
  process.exit(1);
}

// ---------- opcije ----------
function opcija(ime, zadano) {
  const p = process.argv.find((a) => a.startsWith('--' + ime + '='));
  if (!p) return zadano;
  return p.slice(ime.length + 3);
}
const korijen = __dirname;
// path.resolve umjesto join — tako i apsolutne putanje rade
const ULAZ = path.resolve(korijen, opcija('ulaz', 'slike'));
const IZLAZ = path.resolve(korijen, opcija('izlaz', 'slike-web'));
const VELICINA = parseInt(opcija('velicina', '512'), 10);
const KVALITETA = parseInt(opcija('kvaliteta', '82'), 10);
const SVE = process.argv.includes('--sve');
const PROBNO = process.argv.includes('--probno');

const PODRZANO = /\.(png|jpe?g|webp|bmp|tiff?)$/i;

// ---------- pomoćno ----------
function mb(bajta) {
  return (bajta / 1048576).toFixed(1) + ' MB';
}
function kb(bajta) {
  return Math.round(bajta / 1024) + ' KB';
}

// ---------- provjere ----------
if (!fs.existsSync(ULAZ)) {
  console.error('Ne postoji ulazna mapa: ' + ULAZ);
  process.exit(1);
}
if (!PROBNO && !fs.existsSync(IZLAZ)) fs.mkdirSync(IZLAZ, { recursive: true });

const datoteke = fs
  .readdirSync(ULAZ)
  .filter((f) => PODRZANO.test(f))
  .sort();

if (datoteke.length === 0) {
  console.log('U mapi ' + ULAZ + ' nema slika za konverziju.');
  process.exit(0);
}

console.log('');
console.log('  Ulaz:      ' + ULAZ);
console.log('  Izlaz:     ' + IZLAZ);
console.log('  Najveća strana: ' + VELICINA + ' px, kvaliteta ' + KVALITETA);
if (PROBNO) console.log('  PROBNI RAD — ništa se ne zapisuje');
console.log('  Nađeno slika: ' + datoteke.length);
console.log('');

// ---------- obrada ----------
let noveMB = 0;
let stareMB = 0;
let konvertirano = 0;
let preskoceno = 0;
const greske = [];

// Sirov naziv -> naziv s .webp. Nazivi s dijakritikom se ne mijenjaju.
function ciljniNaziv(f) {
  return f.replace(/\.[^.]+$/, '') + '.webp';
}

async function obradi(f) {
  const izvor = path.join(ULAZ, f);
  const cilj = path.join(IZLAZ, ciljniNaziv(f));
  const sIzvor = fs.statSync(izvor);

  // Preskoči ako cilj postoji i noviji je od izvora
  if (!SVE && fs.existsSync(cilj)) {
    const sCilj = fs.statSync(cilj);
    if (sCilj.mtimeMs >= sIzvor.mtimeMs) {
      preskoceno++;
      stareMB += sIzvor.size;
      noveMB += sCilj.size;
      return;
    }
  }

  if (PROBNO) {
    console.log('  [bi konvertirao] ' + f + ' -> ' + path.basename(cilj));
    konvertirano++;
    stareMB += sIzvor.size;
    return;
  }

  await sharp(izvor)
    .resize({
      width: VELICINA,
      height: VELICINA,
      fit: 'inside',           // zadrži proporcije, ne reži
      withoutEnlargement: true // manje slike ostaju kakve su
    })
    .webp({ quality: KVALITETA, effort: 5 })
    .toFile(cilj);

  const sCilj = fs.statSync(cilj);
  stareMB += sIzvor.size;
  noveMB += sCilj.size;
  konvertirano++;

  const posto = Math.round((1 - sCilj.size / sIzvor.size) * 100);
  console.log(
    '  ' + String(konvertirano).padStart(4) + '  ' + f +
    '  ' + kb(sIzvor.size) + ' -> ' + kb(sCilj.size) + '  (-' + posto + '%)'
  );
}

(async function main() {
  for (const f of datoteke) {
    try {
      await obradi(f);
    } catch (e) {
      greske.push(f + ': ' + e.message);
    }
  }

  console.log('');
  console.log('  ---------------------------------------------');
  console.log('  Konvertirano:  ' + konvertirano);
  console.log('  Preskočeno:    ' + preskoceno + ' (već postoji)');
  console.log('  Prije:         ' + mb(stareMB));
  console.log('  Poslije:       ' + mb(noveMB));
  if (stareMB > 0 && noveMB > 0) {
    console.log('  Ušteda:        ' + Math.round((1 - noveMB / stareMB) * 100) + '%');
  }
  console.log('  ---------------------------------------------');

  if (greske.length) {
    console.log('');
    console.log('  GREŠKE (' + greske.length + '):');
    greske.forEach((g) => console.log('    ' + g));
  }

  if (!PROBNO && konvertirano > 0) {
    console.log('');
    console.log('  Sljedeći korak:  node osvjezi.js');
    console.log('  (da se data.js osvježi s novim .webp putanjama)');
  }
  console.log('');
})();
