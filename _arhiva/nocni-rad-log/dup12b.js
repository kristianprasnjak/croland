const fs = require('fs'), path = require('path');
const igre = path.join(__dirname, '..', '..', 'igre');
function kart(dat) {
  const p = path.join(igre, dat); if (!fs.existsSync(p)) return [];
  const r = fs.readFileSync(p, 'utf8').split(/\r?\n/); let f = ''; const v = [];
  for (const l of r) {
    if (/^##\s/.test(l)) { f = ''; continue; }
    const m = l.match(/^format:\s*(\S+)/); if (m) { f = m[1]; continue; }
    if (f !== 'kartice' || !/^-\s/.test(l)) continue;
    const d = l.replace(/^-\s*/, '').split('|'); v.push({ hr: d[0].trim(), en: (d[1] || '').trim() });
  }
  return v;
}
const files = ['lekcija-0.md'];
for (let i = 1; i <= 11; i++) { const n = String(i).padStart(2, '0'); files.push('lekcija-' + n + '.md', 'vokabular-' + n + '.md', 'gramatika-' + n + '.md', 'praksa-' + n + '.md'); }
const all = []; for (const f of files) for (const k of kart(f)) all.push({ f: f, hr: k.hr, en: k.en });
function toks(hr) { return hr.replace(/\([^)]*\)/g, '').split(/\s*(?:→|\/|,|·)\s*/).map(s => s.trim().toLowerCase().replace(/[?!.…]/g, '').trim()).filter(Boolean); }
const src = process.argv[2] || 'vokabular-12.md';
for (const k of kart(src)) {
  const t = toks(k.hr); const hits = all.filter(a => toks(a.hr).some(x => t.includes(x)));
  if (hits.length) console.log(k.hr + '  <= ' + hits.map(h => h.f.replace('.md', '') + ' [' + h.hr + ' | ' + h.en + ']').join('; '));
}
