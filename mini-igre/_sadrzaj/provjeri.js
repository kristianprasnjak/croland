/* Headless provjera svih igara — node _sadrzaj/provjeri.js */
var fs = require('fs'), path = require('path');
var { JSDOM } = require(process.env.JSDOM_PATH || 'jsdom');
var DIR = path.resolve(__dirname, '..');
var igre = fs.readdirSync(DIR).filter(f => /^\d\d-.*\.html$/.test(f)).sort();
var pao = 0;

/* jsdom nema canvas ni audio — te poruke nisu greške igre */
function okolina(p) {
  return /getContext|HTMLMediaElement|canvas npm package|clearRect|fillStyle|AudioContext/.test(p);
}

igre.forEach(function (f) {
  var html = fs.readFileSync(path.join(DIR, f), 'utf8');
  var greske = [];
  var dom;
  try {
    dom = new JSDOM(html, {
      runScripts: 'dangerously', pretendToBeVisual: true, url: 'file:///' + f,
      virtualConsole: new (require(process.env.JSDOM_PATH || 'jsdom').VirtualConsole)()
        .on('jsdomError', e => { if (!okolina(e.message)) greske.push('jsdomError: ' + e.message); })
        .on('error', e => { if (!okolina(String(e))) greske.push('error: ' + e); })
    });
  } catch (e) { greske.push('DOM: ' + e.message); }

  if (dom) {
    var w = dom.window;
    try {
      var CL = w.CL;
      if (!CL) greske.push('CL nije definiran');
      else {
        if (CL.BANKA.length < 800) greske.push('banka premala: ' + CL.BANKA.length);
        if (CL.RECENICE.length < 300) greske.push('malo rečenica');
        if (typeof CL.recenica !== 'function') greske.push('nema CL.recenica');
        if (typeof CL.praznina !== 'function') greske.push('nema CL.praznina');
        if (typeof CL.savjetZastor !== 'function') greske.push('nema CL.savjetZastor');
        if (typeof CL.razinaZa !== 'function') greske.push('nema CL.razinaZa');
        if (!CL.recenica(3)) greske.push('recenica(3) prazna');
        if (!CL.praznina(2)) greske.push('praznina(2) prazna');
        if (!CL.dijalozi(5).length) greske.push('nema dijaloga');
        [1,2,3,4,5].forEach(function(r){
          if(!CL.recenice(r).length) greske.push('nema rečenica razine ' + r);
          if(!CL.praznine(r).length) greske.push('nema praznina razine ' + r);
        });
        var svj = CL.svjezeRijeci(10);
        if (svj.length !== 10) greske.push('svjezeRijeci vraća ' + svj.length);
      }
      if (!w.IGRA_ID) greske.push('nema IGRA_ID');
      if (!w.IGRA_MAKS) greske.push('nema IGRA_MAKS');
      if (typeof w.pokreniBezKraja !== 'function') greske.push('nema beskonačni način (pokreniBezKraja)');
      if (html.indexOf('beskonacno:') < 0) greske.push('kraj() se ne poziva s beskonacno:');
      /* svi CL.po(...) pozivi s doslovnim id-em moraju postojati u banci */
      var logika = html.split('/*[/SADRZAJ]*/').slice(1).join('');
      var ids = {}; (w.CL ? w.CL.BANKA : []).forEach(function (r) { ids[r.id] = 1; });
      var m, re = /CL\.po\('([a-z0-9-]+)'\)/g;
      while ((m = re.exec(logika))) if (!ids[m[1]]) greske.push('CL.po nepostojeći id: ' + m[1]);
    } catch (e) { greske.push('provjera: ' + e.message); }
  }

  if (greske.length) { pao++; console.log('  ✗ ' + f); greske.forEach(g => console.log('      ' + g)); }
  else console.log('  ✓ ' + f);
  if (dom) dom.window.close();
});

console.log('\n' + (igre.length - pao) + '/' + igre.length + ' igara prolazi.');
process.exit(pao ? 1 : 0);
