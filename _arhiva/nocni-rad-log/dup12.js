const fs = require('fs'), path = require('path');
const igre = path.join(__dirname, '..', '..', 'igre');
function osn(hr) {
  let s = String(hr).split(/\s*(?:→|->)\s*/)[0];
  s = s.split(/\s+·\s+/)[0].split(/\s*\/\s*/)[0];
  s = s.replace(/\s*\([^)]*\)\s*$/, '').trim();
  return s.toLowerCase().replace(/[?!.]$/, '');
}
function kart(dat) {
  const p = path.join(igre, dat);
  if (!fs.existsSync(p)) return [];
  const r = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  let f = ''; const v = [];
  for (const l of r) {
    if (/^##\s/.test(l)) { f = ''; continue; }
    const m = l.match(/^format:\s*(\S+)/); if (m) { f = m[1]; continue; }
    if (f !== 'kartice' || !/^-\s/.test(l)) continue;
    const d = l.replace(/^-\s*/, '').split('|');
    v.push({ hr: d[0].trim(), en: (d[1] || '').trim() });
  }
  return v;
}
const idx = {};
const files = ['lekcija-0.md'];
for (let i = 1; i <= 11; i++) { const n = String(i).padStart(2, '0'); files.push('lekcija-' + n + '.md', 'vokabular-' + n + '.md', 'gramatika-' + n + '.md', 'praksa-' + n + '.md'); }
for (const f of files) for (const k of kart(f)) { const o = osn(k.hr); (idx[o] = idx[o] || []).push(f.replace('.md', '') + ':' + k.en); }
const same = {};
for (const f of ['lekcija-12.md', 'gramatika-12.md', 'praksa-12.md']) for (const k of kart(f)) { const o = osn(k.hr); (same[o] = same[o] || []).push(f); }
const src = process.argv[2] || 'vokabular-12.md';
for (const k of kart(src)) {
  const o = osn(k.hr);
  console.log((idx[o] ? 'DUP ' : '    ') + k.hr + ' | ' + k.en + (idx[o] ? '  <= ' + idx[o].join('; ') : '') + (same[o] ? '  [12: ' + same[o].join(',') + ']' : ''));
}
if (process.argv[3] === 'l12') for (const k of kart('lekcija-12.md')) { const o = osn(k.hr); console.log('L12 ' + (idx[o] ? 'DUP ' : '    ') + k.hr + ' | ' + k.en); }
