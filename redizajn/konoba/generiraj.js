/* Gemini: nove slike za Konobu (11 jela + 12 gostiju).

   Pokretanje (iz korijena projekta):   node redizajn/konoba/generiraj.js
   Samo neke stavke:                    node redizajn/konoba/generiraj.js Čaj gost-03
   Nove varijante iako slika postoji:   node redizajn/konoba/generiraj.js --ponovno Čaj

   API ključ: varijabla okruženja GEMINI_API_KEY ili redak GEMINI_API_KEY=... u .env
   u korijenu projekta. Ključ se ne ispisuje i ne sprema nigdje drugdje.

   Rezultati: redizajn/konoba/novo/<ime>-1.jpg, <ime>-2.jpg …
   Postojeće slike se preskaču, pa ponovno pokretanje dovrši samo ono što fali.
   Treba Node 18 ili noviji (ugrađeni fetch), bez npm paketa. */
const fs = require('fs');
const path = require('path');

const KORIJEN = path.resolve(__dirname, '..', '..');
const POPIS = JSON.parse(fs.readFileSync(path.join(__dirname, 'popis.json'), 'utf8'));
const IZLAZ = path.join(__dirname, 'novo');
const CIJENA = 0.0336;   // $ po slici, 1K (ai.google.dev/pricing, listopad 2026.)

function kljuc() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const env = path.join(KORIJEN, '.env');
  if (fs.existsSync(env)) {
    const red = fs.readFileSync(env, 'utf8').split(/\r?\n/).find(r => /^\s*GEMINI_API_KEY\s*=/.test(r));
    if (red) return red.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '');
  }
  console.error('Nema API ključa. Dodaj redak  GEMINI_API_KEY=tvoj_ključ  u .env u korijenu projekta.');
  process.exit(1);
}

function slikaUlaz(rel) {
  const p = path.join(KORIJEN, rel);
  if (!fs.existsSync(p)) { console.warn('  (nema uzora ' + rel + ' — preskačem ga)'); return null; }
  const ext = path.extname(p).toLowerCase();
  const mime = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';
  return { type: 'image', mime_type: mime, data: fs.readFileSync(p).toString('base64') };
}

/* odgovor: tražimo zadnji blok {type:'image', data:'…'} bilo gdje u JSON-u */
function nadjiSliku(o) {
  let zadnja = null;
  (function hodaj(x) {
    if (!x || typeof x !== 'object') return;
    if (Array.isArray(x)) return x.forEach(hodaj);
    if (typeof x.data === 'string' && x.data.length > 1000 && (x.type === 'image' || /^image\//.test(x.mime_type || x.mimeType || ''))) zadnja = x.data;
    if (x.inlineData && x.inlineData.data) zadnja = x.inlineData.data;
    if (x.inline_data && x.inline_data.data) zadnja = x.inline_data.data;
    Object.values(x).forEach(hodaj);
  })(o);
  return zadnja;
}

async function generiraj(api, stavka, uzori) {
  const predlozak = stavka.vrsta === 'gost' ? POPIS.stil_gost : POPIS.stil_jelo;
  const tijelo = {
    model: POPIS.model,
    input: [{ type: 'text', text: predlozak.replace('{opis}', stavka.opis) }].concat(uzori),
    response_format: { type: 'image', mime_type: 'image/jpeg', /* model vraća samo JPEG */ aspect_ratio: '1:1', image_size: POPIS.velicina }
  };
  const r = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: { 'x-goog-api-key': api, 'Content-Type': 'application/json' },
    body: JSON.stringify(tijelo)
  });
  const tekst = await r.text();
  if (!r.ok) throw new Error('HTTP ' + r.status + ': ' + tekst.slice(0, 300));
  const slika = nadjiSliku(JSON.parse(tekst));
  if (!slika) throw new Error('odgovor nema sliku: ' + tekst.slice(0, 300));
  return Buffer.from(slika, 'base64');
}

(async () => {
  const args = process.argv.slice(2);
  const ponovno = args.includes('--ponovno');
  const samo = args.filter(a => !a.startsWith('--'));
  const stavke = POPIS.stavke.filter(s => !samo.length || samo.includes(s.ime));
  if (!stavke.length) { console.error('Nijedna stavka ne odgovara: ' + samo.join(', ')); process.exit(1); }

  fs.mkdirSync(IZLAZ, { recursive: true });
  const api = kljuc();
  const uzori = {
    jelo: POPIS.uzori_jelo.map(slikaUlaz).filter(Boolean),
    gost: POPIS.uzori_gost.map(slikaUlaz).filter(Boolean)
  };

  let poslano = 0, greske = 0;
  for (const s of stavke) {
    for (let v = 1; v <= POPIS.varijanti; v++) {
      let ime = `${s.ime}-${v}.jpg`;
      if (ponovno) { let n = v; while (fs.existsSync(path.join(IZLAZ, ime))) ime = `${s.ime}-${++n}.jpg`; }
      else if (fs.existsSync(path.join(IZLAZ, ime))) { console.log('✓ već postoji  ' + ime); continue; }
      process.stdout.write('… ' + ime + '  ');
      try {
        const buf = await generiraj(api, s, uzori[s.vrsta]);
        fs.writeFileSync(path.join(IZLAZ, ime), buf);
        poslano++;
        console.log('spremljeno');
      } catch (e) {
        greske++;
        console.log('GREŠKA — ' + e.message);
      }
    }
  }
  console.log(`\nGotovo: ${poslano} novih slika (otprilike $${(poslano * CIJENA).toFixed(2)}), grešaka: ${greske}.`);
  console.log('Slike su u ' + path.relative(KORIJEN, IZLAZ));
})();
