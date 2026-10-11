/* Gemini — slike prema popisu (JSON). Zajedničko za sve redizajne.

   Pokretanje (iz korijena projekta):
     node redizajn/gemini.js redizajn/konoba-pixel/popis.json
     node redizajn/gemini.js redizajn/konoba-pixel/popis.json juha-A gost09-B-sretan
     node redizajn/gemini.js redizajn/konoba-pixel/popis.json --ponovno juha-A

   Popis:
     { "model": "...", "velicina": "1K", "izlaz": "redizajn/konoba-pixel/novo",
       "stavke": [ { "ime": "juha-A", "prompt": "...", "uzori": ["putanja.webp"] },
                   { "ime": "gost09-A-sretan", "prompt": "...", "iz": "gost09-A" } ] }
   "iz" = stavka se radi kao izmjena već napravljene slike (npr. drugi izraz
   lica istog lika); ta slika se pošalje kao ulaz, pa se čeka da ona postoji.

   API ključ: GEMINI_API_KEY iz okruženja ili iz .env u korijenu projekta.
   Postojeće slike se preskaču — ponovno pokretanje dovrši samo ono što fali. */
const fs = require('fs');
const path = require('path');

const KORIJEN = path.resolve(__dirname, '..');
const CIJENA = 0.0336;

function kljuc() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const env = path.join(KORIJEN, '.env');
  if (fs.existsSync(env)) {
    const red = fs.readFileSync(env, 'utf8').split(/\r?\n/).find(r => /^\s*GEMINI_API_KEY\s*=/.test(r));
    if (red) return red.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '');
  }
  console.error('Nema API ključa (GEMINI_API_KEY u .env).');
  process.exit(1);
}
function slikaUlaz(p) {
  if (!fs.existsSync(p)) return null;
  const ext = path.extname(p).toLowerCase();
  const mime = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';
  return { type: 'image', mime_type: mime, data: fs.readFileSync(p).toString('base64') };
}
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
async function posalji(api, model, velicina, ulaz) {
  const r = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: { 'x-goog-api-key': api, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model, input: ulaz,
      response_format: { type: 'image', mime_type: 'image/jpeg', aspect_ratio: '1:1', image_size: velicina }
    })
  });
  const tekst = await r.text();
  if (!r.ok) throw new Error('HTTP ' + r.status + ': ' + tekst.slice(0, 300));
  const s = nadjiSliku(JSON.parse(tekst));
  if (!s) throw new Error('odgovor nema sliku: ' + tekst.slice(0, 300));
  return Buffer.from(s, 'base64');
}

(async () => {
  const args = process.argv.slice(2);
  const popisPut = args.find(a => a.endsWith('.json'));
  if (!popisPut) { console.error('Upotreba: node redizajn/gemini.js <popis.json> [imena…] [--ponovno]'); process.exit(1); }
  const POPIS = JSON.parse(fs.readFileSync(path.resolve(KORIJEN, popisPut), 'utf8'));
  const ponovno = args.includes('--ponovno');
  const samo = args.filter(a => !a.startsWith('--') && a !== popisPut);
  const IZLAZ = path.resolve(KORIJEN, POPIS.izlaz);
  fs.mkdirSync(IZLAZ, { recursive: true });
  const api = kljuc();

  /* redoslijed: prvo stavke bez "iz", pa izvedenice (njihov izvor mora postojati) */
  const stavke = POPIS.stavke.filter(s => !samo.length || samo.includes(s.ime));
  stavke.sort((a, b) => (a.iz ? 1 : 0) - (b.iz ? 1 : 0));

  let novih = 0, gresaka = 0;
  for (const s of stavke) {
    const cilj = path.join(IZLAZ, s.ime + '.jpg');
    if (fs.existsSync(cilj) && !ponovno) { console.log('✓ već postoji  ' + s.ime); continue; }
    const ulaz = [{ type: 'text', text: s.prompt }];
    if (s.iz) {
      const izvor = slikaUlaz(path.join(IZLAZ, s.iz + '.jpg'));
      if (!izvor) { console.log('… ' + s.ime + '  preskačem — nema izvora ' + s.iz); gresaka++; continue; }
      ulaz.push(izvor);
    }
    (s.uzori || POPIS.uzori || []).forEach(u => { const x = slikaUlaz(path.resolve(KORIJEN, u)); if (x) ulaz.push(x); });
    process.stdout.write('… ' + s.ime + '  ');
    try {
      const buf = await posalji(api, POPIS.model, POPIS.velicina || '1K', ulaz);
      if (fs.existsSync(cilj)) fs.renameSync(cilj, cilj.replace(/\.jpg$/, '.staro-' + Date.now() + '.jpg'));
      fs.writeFileSync(cilj, buf);
      novih++; console.log('spremljeno');
    } catch (e) { gresaka++; console.log('GREŠKA — ' + e.message); }
  }
  console.log(`\nGotovo: ${novih} novih slika (otprilike $${(novih * CIJENA).toFixed(2)}), grešaka: ${gresaka}.`);
  console.log('Slike su u ' + path.relative(KORIJEN, IZLAZ));
})();
