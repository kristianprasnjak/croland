// Ispise JSON popis string literala i dijelova template literala u JS kodu (stdin).
// [{s: pocetak sadrzaja, e: kraj sadrzaja, q: navodnik ili '`'}] — offseti u UTF-16 jedinicama.
const acorn = require('./node_modules/acorn');
let src = require('fs').readFileSync(0, 'utf8');
const out = [];
for (const t of acorn.tokenizer(src, { ecmaVersion: 'latest', allowHashBang: true, allowReturnOutsideFunction: true })) {
  if (t.type === acorn.tokTypes.string) out.push({ s: t.start + 1, e: t.end - 1, q: src[t.start] });
  else if (t.type === acorn.tokTypes.template) out.push({ s: t.start, e: t.end, q: '`' });
}
process.stdout.write(JSON.stringify(out));
