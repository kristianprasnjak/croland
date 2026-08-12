// napravi-kartice.js — generira 5 demo memorijskih kartica (0/25/50/75/100 %).
//
// Kako radi: učita app.html u jsdom, ubaci hook u zatvorenu IIFE i pusti da
// SAMA aplikacija izračuna valute, otključavanja, rječnik i format kartice.
// Zato kartice ostaju točne i nakon promjene bodova ili pragova u app.html.
//
// Pokretanje (iz korijena projekta):
//   npm install jsdom
//   node memory-kartice/napravi-kartice.js
//
const { JSDOM } = require('jsdom');
const fs = require('fs');

const path = require('path');
const KORIJEN = path.join(__dirname, '..');
const IZLAZ = __dirname;
const APP = path.join(KORIJEN, 'app.html');

// app.html s ubačenim hookom (privremena kopija uz original, da data.js/rjecnik.js rade)
const HOOK = `\n  window.__HOOK = { IGRE: IGRE, getP: function(){return PROGRESS;}, setP: function(o){PROGRESS=o;},\n    podaciKartice: podaciKartice, dodajCjelinuURjecnik: dodajCjelinuURjecnik, kljucIgre: kljucIgre,\n    valute: valute, otkljucano: otkljucano, ABECEDA: ABECEDA, MAX_RAZINA: MAX_RAZINA,\n    TIPOVI: TIPOVI, noveOtkljucane: noveOtkljucane };\n`;
const html = fs.readFileSync(APP, 'utf8');
const rez = html.lastIndexOf('})();\n</script>');
const PRIVREMENI = path.join(KORIJEN, '__kartice-tmp.html');
fs.writeFileSync(PRIVREMENI, html.slice(0, rez) + HOOK + html.slice(rez), 'utf8');
process.on('exit', function () { try { fs.unlinkSync(PRIVREMENI); } catch (e) {} });

const KARTICE = [
  { pct: 0.00, ime: 'Ana',    dat: 'croland-00-nova.json' },
  { pct: 0.25, ime: 'Marko',  dat: 'croland-25-pocetnik.json' },
  { pct: 0.50, ime: 'Petra',  dat: 'croland-50-sredina.json' },
  { pct: 0.75, ime: 'Ivan',   dat: 'croland-75-napredni.json' },
  { pct: 1.00, ime: 'Lucija', dat: 'croland-100-prijedena.json' }
];

const RED_TIPA = { 'Lesson':0, 'Vocabulary':1, 'Grammar':2, 'Practice':3, 'Test':4, 'Daily challenge':5, 'Weekly challenge':6 };

JSDOM.fromFile(PRIVREMENI, { runScripts:'dangerously', resources:'usable', pretendToBeVisual:true })
 .then(dom => new Promise(r => setTimeout(() => r(dom), 3000)))
 .then(dom => {
  const W = dom.window, H = W.__HOOK;

  // --- redoslijed igara: po razini, pa po tipu, pa po stranici ---
  const igre = H.IGRE.filter(g => g.tip).slice().sort((a,b) =>
      (a.razina - b.razina) || ((RED_TIPA[a.tip]??9) - (RED_TIPA[b.tip]??9)) || (a.stranica - b.stranica));
  const bezCjeline = H.IGRE.filter(g => !g.tip);

  // bodovni svemir = sve osim Lesson 0 (koja se ne boduje)
  const bodovne = igre.filter(g => !(g.tip === 'Lesson' && g.razina === 0));
  const UKUPNO = bodovne.reduce((s,g) => s + g.bodovi, 0);

  const sazetak = [];

  KARTICE.forEach(k => {
    const cilj = Math.round(k.pct * UKUPNO);
    const vjezbe = {}, pokrenute = {};
    let osv = 0;

    if (k.pct > 0) {
      // Lesson 0 uvijek u cijelosti (uvodna cjelina, ne nosi bodove)
      igre.filter(g => g.tip==='Lesson' && g.razina===0).forEach(g => {
        vjezbe[H.kljucIgre(g)] = g.bodovi; pokrenute[g.cjelina] = 1;
      });
      for (const g of bodovne) {
        if (osv >= cilj) break;
        const preostalo = cilj - osv;
        const dio = Math.min(g.bodovi, preostalo);
        if (dio <= 0) break;
        vjezbe[H.kljucIgre(g)] = dio;
        pokrenute[g.cjelina] = 1;
        osv += dio;
      }
      if (k.pct === 1) bezCjeline.forEach(g => { vjezbe[H.kljucIgre(g)] = g.bodovi; });
    }

    // --- postavi progress u aplikaciju i pusti je da izračuna ostalo ---
    const P = {
      vjezbe: vjezbe, pokrenute: pokrenute, vidjeno: {}, rjecnik: {},
      slova: {}, abecedaSlavljena: 0, savjeti: {},
      streak: { niz: 0, zadnji: '', bodovi: 0 },
      ime: k.ime, kartica: 1
    };
    H.setP(P);

    // slova: Lesson 0 riješena => cijela abeceda
    if (k.pct > 0) { H.ABECEDA.forEach(s => { P.slova[s] = 1; }); P.abecedaSlavljena = 1; }

    // rječnik: sve natuknice iz cjelina koje su 100% riješene
    const cjeline = {};
    igre.forEach(g => { const key = g.tip+'|'+g.razina; (cjeline[key] = cjeline[key] || []).push(g); });
    Object.keys(cjeline).forEach(key => {
      const [tip, r] = [key.split('|')[0], +key.split('|')[1]];
      const lista = cjeline[key];
      const maks = lista.reduce((s,g)=>s+g.bodovi,0);
      const imam = lista.reduce((s,g)=>s+(vjezbe[H.kljucIgre(g)]||0),0);
      if (maks > 0 && imam >= maks) H.dodajCjelinuURjecnik(tip, r);
    });

    // savjeti: viđeni čim je nešto odigrano
    if (k.pct > 0) { P.savjeti.bodovi = 1; P.savjeti.ponovno = 1; P.savjeti.sat = 1; }

    // vidjeno: aplikacija sama označi sve trenutno otključane cjeline
    H.noveOtkljucane();

    const kartica = H.podaciKartice();
    kartica.izvezeno = new Date(Date.UTC(2026,7,7,12,0,0)).toISOString();
    fs.mkdirSync(IZLAZ, { recursive: true });
    fs.writeFileSync(IZLAZ + '/' + k.dat, JSON.stringify(kartica, null, 2), 'utf8');

    // --- sažetak ---
    const v = H.valute();
    let otklj = {};
    H.TIPOVI.forEach(t => { let n=0; for (let r=1;r<=H.MAX_RAZINA;r++) if (H.otkljucano(t,r)) n=r; otklj[t]=n; });
    sazetak.push({
      dat: k.dat, ime: k.ime, pct: Math.round(k.pct*100),
      bodovi: osv, od: UKUPNO,
      vjezbi: Object.keys(vjezbe).length,
      rijeci: Object.keys(kartica.rjecnik).length,
      valute: v, otkljucano: otklj
    });
  });

  console.log('UKUPNO bodova u igri:', UKUPNO);
  sazetak.forEach(s => console.log(JSON.stringify(s)));
 })
 .catch(e => console.log('ERR', e && e.stack));
