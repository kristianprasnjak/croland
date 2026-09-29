// Kandidati za nove riječi V13: duplikat na karticama L0–L12, V1–V12, G1–G12, P1–P12? lema u rječniku? prijevod? slika? prijevod drugdje u igre/?
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..'), igre = path.join(root, 'igre');
const lin = f => fs.readFileSync(path.join(root, f), 'utf8').split(/\r?\n/).filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);
const rj = lin('rjecnik.jsonl'), pr = lin('prijevodi.jsonl');
const prMap = {}; for (const p of pr) prMap[p.lema.toLowerCase()] = p.en;
const lemSet = new Set(rj.map(e => e.lema.toLowerCase()));
const oblik = {};
for (const e of rj) { const l = e.lema.toLowerCase(); const walk = o => { if (!o) return; if (typeof o === 'string') { (oblik[o.toLowerCase()] = oblik[o.toLowerCase()] || new Set()).add(l); } else if (typeof o === 'object') Object.values(o).forEach(walk); }; walk(e.oblici); }
const slike = new Set(fs.readdirSync(path.join(root, 'slike')).map(f => f.replace(/\.webp$/i, '').toLowerCase()));
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
function toks(hr) { return hr.replace(/\([^)]*\)/g, '').split(/\s*(?:→|\/|,|·)\s*/).map(s => s.trim().toLowerCase().replace(/[?!.…]/g, '').trim()).filter(Boolean); }
const files = ['lekcija-0.md'];
for (let i = 1; i <= 12; i++) { const n = String(i).padStart(2, '0'); files.push('lekcija-' + n + '.md', 'vokabular-' + n + '.md', 'gramatika-' + n + '.md', 'praksa-' + n + '.md'); }
const all = []; for (const f of files) for (const k of kart(f)) all.push({ f, hr: k.hr, en: k.en });
const l13 = []; for (const f of ['lekcija-13.md', 'gramatika-13.md', 'praksa-13.md']) for (const k of kart(f)) l13.push({ f, hr: k.hr });
const sviMd = fs.readdirSync(igre).filter(f => f.endsWith('.md') && !f.startsWith('vokabular-13'));
const tekst = {}; for (const f of sviMd) tekst[f] = fs.readFileSync(path.join(igre, f), 'utf8').split(/\r?\n/);
const kand = fs.readFileSync(process.argv[2], 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
for (const w of kand) {
  const t = toks(w); const osn = t[0];
  const hits = all.filter(a => toks(a.hr).some(x => t.includes(x)));
  const same = l13.filter(a => toks(a.hr).some(x => t.includes(x)));
  const lem = lemSet.has(osn) ? 'LEMA' : (oblik[osn] ? 'oblik:' + [...oblik[osn]].join(',') : 'NEMA-LEME');
  const en = prMap[osn] ? JSON.stringify(prMap[osn]) : 'NEMA-PRIJEVODA';
  const sl = slike.has(osn) ? 'SLIKA' : '-';
  const drugdje = new Set();
  const re = new RegExp('^-\\s*' + osn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(\\s*(→|/|\\())?[^|]*\\|\\s*([^|]+)', 'i');
  for (const f in tekst) for (const l of tekst[f]) { const m = l.match(re); if (m) drugdje.add(f.replace('.md', '') + '=' + m[3].trim()); }
  console.log((hits.length ? 'DUP ' : '    ') + w + ' | ' + lem + ' | ' + en + ' | ' + sl + (hits.length ? ' | <= ' + hits.map(h => h.f.replace('.md', '') + '[' + h.hr + ']').join('; ') : '') + (same.length ? ' | [13: ' + same.map(s => s.f.replace('.md', '')).join(',') + ']' : '') + (drugdje.size ? ' | igre: ' + [...drugdje].slice(0, 6).join('; ') : ''));
}
