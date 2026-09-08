// Zakrpa: ubacuje stranicu Progress u index.html. Sve promjene su sidrene na tocan
// tekst; ako se ijedno sidro ne nade, nista se ne pise.
const fs = require('fs');
const PUT = 'index.html';
let h = fs.readFileSync(PUT, 'utf8');
const css = fs.readFileSync('Claude outputs/blok-css.txt', 'utf8');
const js  = fs.readFileSync('Claude outputs/blok-js.txt', 'utf8');
const izvorno = h;
let n = 0;

function zamijeni(oznaka, staro, novo) {
  const i = h.indexOf(staro);
  if (i < 0) { console.error('SIDRO NIJE NADENO: ' + oznaka); process.exit(1); }
  if (h.indexOf(staro, i + 1) >= 0) { console.error('SIDRO NIJE JEDINSTVENO: ' + oznaka); process.exit(1); }
  h = h.slice(0, i) + novo + h.slice(i + staro.length);
  n++;
  console.log('ok: ' + oznaka);
}

// 1) CSS pred kraj stilova
zamijeni('css', '\n</style>\n</head>', '\n' + css + '\n</style>\n</head>');

// 2) stavka u navu
zamijeni('nav',
  '    <a data-view="account" data-kratko="You" onclick="idi(\'account\')">User account</a>',
  '    <a data-view="progress" data-kratko="Progress" onclick="idi(\'progress\')">Progress</a>\n' +
  '    <a data-view="account" data-kratko="You" onclick="idi(\'account\')">User account</a>');

// 3) valute u zaglavlju vode na Progress
zamijeni('valute',
  '  <div class="valute" id="valuteHeader"></div>',
  '  <div class="valute" id="valuteHeader" onclick="idi(\'progress\')" title="Open Progress"></div>');

// 4) oznacavanje aktivne stavke
zamijeni('oznaciNav',
  "      dictionary: 'dictionary', mini: 'mini', daily: 'daily', account: 'account',\n" +
  "      options: 'options' };",
  "      dictionary: 'dictionary', mini: 'mini', daily: 'daily', account: 'account',\n" +
  "      progress: 'progress', options: 'options' };");

// 5) vrata: Progress trazi racun, ali nikad pretplatu
zamijeni('vrata',
  "    } else if (view === 'miniIgra') {\n" +
  "      var pristupM = imaPristup('MiniGame', 0);\n" +
  "      if (pristupM === 'ucitavanje') { renderUcitavanje(); return; }\n" +
  "      if (pristupM === 'needsAccount') { prikaziModalPrijava({ view: view, arg1: arg1, arg2: arg2, arg3: arg3 }); return; }\n" +
  "    }",
  "    } else if (view === 'miniIgra') {\n" +
  "      var pristupM = imaPristup('MiniGame', 0);\n" +
  "      if (pristupM === 'ucitavanje') { renderUcitavanje(); return; }\n" +
  "      if (pristupM === 'needsAccount') { prikaziModalPrijava({ view: view, arg1: arg1, arg2: arg2, arg3: arg3 }); return; }\n" +
  "    } else if (view === 'progress') {\n" +
  "      // Progress trazi racun, ali NIKAD pretplatu: i onaj tko placa drugima, i onaj\n" +
  "      // tko je odigrao jednu vjezbu, vide sve sto o sebi imaju.\n" +
  "      if (!SESSION_SPREMNA) { renderUcitavanje(); return; }\n" +
  "      if (!imaRacun()) { prikaziModalPrijava({ view: view }); return; }\n" +
  "    }");

// 6) grana u usmjerivacu
zamijeni('ruta',
  "    else if (view === 'options') renderOptions();",
  "    else if (view === 'progress') renderProgress();\n" +
  "    else if (view === 'options') renderOptions();");

// 7) glavni blok koda
zamijeni('js', '\n  function renderAccount() {', '\n' + js + '\n  function renderAccount() {');

// 8) javni bodovi idu uz progress
zamijeni('posalji',
  "  function posaljiProgress() {\n" +
  "    if (!imaRacun()) return;\n" +
  "    var payload = redakOdPROGRESS();",
  "  function posaljiProgress() {\n" +
  "    if (!imaRacun()) return;\n" +
  "    posaljiJavneBodove();\n" +
  "    var payload = redakOdPROGRESS();");

// 9) odjava brise ono sto smo znali o tudim ljudima
zamijeni('reset',
  "  function ucitajProgress(cb) {\n" +
  "    if (!imaRacun()) {",
  "  function ucitajProgress(cb) {\n" +
  "    DRUSTVO.stanje = 'ne'; DRUSTVO.ja = null; DRUSTVO.ljudi = []; DRUSTVO.poruka = '';\n" +
  "    ZADNJI_JAVNI = '';\n" +
  "    if (!imaRacun()) {");

if (n !== 9) { console.error('ocekivano 9 zahvata, bilo ' + n); process.exit(1); }
fs.writeFileSync('index.html.bak-prije-progressa', izvorno);
fs.writeFileSync(PUT, h);
console.log('gotovo — ' + n + ' zahvata, ' + Math.round(h.length / 1024) + ' kB');
