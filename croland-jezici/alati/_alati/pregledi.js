// Ispise mjesta u pregledi.js koja su na engleskom (po polozaju u strukturi, ne po pogadanju):
//   h, s; drugi clan para u ex / t / w; celije zaglavlja (prvi redak) u g koje su engleske (vidi ENG_G).
// Izlaz: JSON [{s, e, v, kljuc, uloga}] — s/e su offseti sadrzaja literala (bez navodnika), u UTF-16.
const acorn = require('acorn'); const fs = require('fs');
const src = fs.readFileSync(0, 'utf8');
const ENG_G = new Set(JSON.parse(process.argv[2] || '[]'));
const ast = acorn.parse(src, { ecmaVersion: 'latest' });
const out = [];
function lit(n, kljuc, uloga, hr) {
  if (n && n.type === 'Literal' && typeof n.value === 'string') out.push({ s: n.start + 1, e: n.end - 1, v: n.value, kljuc, uloga, hr: hr || '' });
}
function obj(o) {
  for (const p of o.properties) {
    const kljuc = p.key.value || p.key.name;
    const c = p.value;
    if (c.type !== 'ObjectExpression') continue;
    for (const q of c.properties) {
      const k = q.key.name || q.key.value;
      if (k === 'h' || k === 's') lit(q.value, kljuc, k);
      else if (k === 'ex') q.value.elements.forEach(par => lit(par.elements[1], kljuc, 'ex', par.elements[0].value));
      else if (k === 'p2') q.value.elements.forEach(blok => blok.properties.forEach(b => {
        const bk = b.key.name || b.key.value;
        if (bk === 't' || bk === 'w') b.value.elements.forEach(par => lit(par.elements[1], kljuc, bk, par.elements[0].value));
        else if (bk === 'g') { const red0 = b.value.elements[0]; red0.elements.forEach(c2 => { if (ENG_G.has(c2.value)) lit(c2, kljuc, 'g'); }); }
      }));
    }
  }
}
(function walk(n) {
  if (!n || typeof n !== 'object') return;
  if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && (n.left.property.name === 'PREGLEDI')) { obj(n.right); return; }
  for (const k in n) { const v = n[k]; if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v.type === 'string') walk(v); }
})(ast);
process.stdout.write(JSON.stringify(out));
