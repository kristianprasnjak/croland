// Provjera: svaka hrvatska riječ u vokabular-12.md ima lemu (ili oblik) u rjecnik.jsonl i prijevod leme u prijevodi.jsonl.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..');
const lin = f => fs.readFileSync(path.join(root, f), 'utf8').split(/\r?\n/).filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);
const rj = lin('rjecnik.jsonl'), pr = lin('prijevodi.jsonl');
const prSet = new Set(pr.map(p => p.lema.toLowerCase()));
const oblik = {};
for (const e of rj) {
  const l = e.lema.toLowerCase(); (oblik[l] = oblik[l] || new Set()).add(e.lema.toLowerCase());
  const walk = o => { if (!o) return; if (typeof o === 'string') { const k = o.toLowerCase(); (oblik[k] = oblik[k] || new Set()).add(l); } else if (typeof o === 'object') for (const v of Object.values(o)) walk(v); };
  walk(e.oblici);
}
const src = fs.readFileSync(path.join(root, 'igre', process.argv[2] || 'vokabular-12.md'), 'utf8').split(/\r?\n/);
const words = new Set(); let fmt = '';
for (const l of src) {
  const m = l.match(/^format:\s*(\S+)/); if (m) { fmt = m[1]; continue; }
  if (!/^-\s/.test(l)) continue;
  const d = l.replace(/^-\s*/, '').split('|').map(s => s.trim());
  const hrPolja = fmt === 'upis' ? [d[1]] : (fmt === 'razvrstavanje' ? [d[0]] : [d[0]]);
  for (const p of hrPolja) for (const w of p.replace(/\([^)]*\)/g, '').split(/[^A-Za-zčćđšžČĆĐŠŽ]+/)) if (w) words.add(w.toLowerCase());
}
for (const w of [...words].sort()) {
  const leme = oblik[w];
  if (!leme) { console.log('NEMA U RJECNIKU: ' + w); continue; }
  const bezPr = [...leme].filter(l => !prSet.has(l));
  if (bezPr.length === leme.size) console.log('NEMA PRIJEVODA: ' + w + ' (leme: ' + [...leme].join(',') + ')');
}
console.log('provjereno rijeci: ' + words.size);
