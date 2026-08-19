# -*- coding: utf-8 -*-
"""gen_igra.py — sastavi 01-grad-v2.html s ugrađenom kartom i atlasom."""
import json, io, os, importlib.util

d = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("kat", os.path.join(d, "katalog.py"))
kat = importlib.util.module_from_spec(spec); spec.loader.exec_module(kat)

karta = json.load(open(os.path.join(d, "grad-karta.json"), encoding="utf-8"))
unutra = json.load(open(os.path.join(d, "interijeri.json"), encoding="utf-8"))
atlas = {k: {"s": v[0], "c": v[1], "r": v[2], "w": v[3], "h": v[4]}
         for k, v in list(kat.KATALOG.items()) + list(kat.LIKOVI.items())}

HTML = r"""<!DOCTYPE html>
<html lang="hr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Croland — Grad v2</title>
<style>
:root{--papir:#FFF8EF;--papir2:#F3E7D4;--tinta:#2B2118;--meko:#8C8072;--zut:#F4B942;--zel:#7CB342;
  --crta:3px solid var(--tinta)}
*{box-sizing:border-box}
body{margin:0;background:var(--papir);color:var(--tinta);
  font:15px/1.5 ui-sans-serif,system-ui,"Segoe UI",Roboto,sans-serif;overscroll-behavior:none}
.omot{max-width:900px;margin:0 auto;padding:8px 8px 24px}
header{display:flex;gap:10px;align-items:center;background:var(--papir2);border:var(--crta);
  border-radius:14px;padding:8px 12px;margin-bottom:8px;flex-wrap:wrap}
header .ime{font-weight:800;font-size:17px}
header .pod{font-size:12px;color:var(--meko);text-transform:uppercase;letter-spacing:.5px}
header .znak{margin-left:auto;display:flex;gap:8px}
header .znak span{background:#fff;border:2px solid var(--tinta);border-radius:9px;padding:3px 9px;
  font-size:13px;font-weight:700}
.ploha{background:var(--papir2);border:var(--crta);border-radius:16px;padding:10px;
  display:flex;flex-direction:column;gap:10px;align-items:center}
#platno{image-rendering:pixelated;display:block;margin:0 auto;
  border:var(--crta);border-radius:12px;background:#6ab04c}
.dpad{display:grid;grid-template-columns:repeat(3,56px);grid-template-rows:repeat(3,56px);gap:6px}
.dpad button{font-size:20px;border:var(--crta);border-radius:12px;background:#fff;
  box-shadow:0 3px 0 var(--tinta);cursor:pointer;touch-action:manipulation}
.dpad button:active{transform:translateY(3px);box-shadow:none}
.dpad .prazno{visibility:hidden}
.dpad .akcija{background:var(--zut)}
.traka{width:100%;background:#fff;border:2px solid var(--tinta);border-radius:12px;padding:7px 12px;
  font-size:13.5px;min-height:38px}
.traka b{color:var(--zel)}
.oblacic{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:9;
  background:var(--papir);border:var(--crta);border-radius:14px;padding:12px 18px;max-width:560px;
  width:calc(100% - 32px);box-shadow:0 6px 0 rgba(43,33,24,.25)}
.oblacic .hr{font-size:17px;font-weight:700}
.oblacic .en{font-size:13px;color:var(--meko);margin-top:3px}
.oblacic .dalje{font-size:12px;color:var(--meko);margin-top:8px;text-align:right}
@media (max-width:640px){
  .omot{padding:6px 6px 16px}
  header{padding:6px 10px;margin-bottom:6px}
  header .ime{font-size:15px}
  header .pod{display:none}
  .ploha{padding:7px;gap:7px}
  .traka{font-size:12.5px;padding:5px 9px;min-height:32px}
  .dpad{grid-template-columns:repeat(3,50px);grid-template-rows:repeat(3,50px);gap:5px}
}
</style></head><body>
<div class="omot">
  <header>
    <div><div class="ime">Grad</div><div class="pod">v2 · svijet u izradi</div></div>
    <div class="znak"><span id="zPoz">0, 0</span><span id="zZona">—</span></div>
  </header>
  <div class="ploha">
    <div class="traka" id="traka">Strelice ili WASD za kretanje. Razmaknica čita natpise i otvara vrata.</div>
    <canvas id="platno"></canvas>
    <div class="dpad">
      <span class="prazno"></span><button data-s="u">▲</button><span class="prazno"></span>
      <button data-s="l">◀</button><button class="akcija" data-s="x">✋</button><button data-s="r">▶</button>
      <span class="prazno"></span><button data-s="d">▼</button><span class="prazno"></span>
    </div>
  </div>
</div>
<script>
var KARTA = __KARTA__;
var ATLAS = __ATLAS__;
var UNUTRA = __UNUTRA__;

/* ---------------- ljudi ----------------
   gdje: 'grad' ili id interijera. Pozicije vani se po potrebi
   same pomaknu na najbliže slobodno polje. */
var NPC = [
  /* stambeno */
  {id:'mara',      ime:'Baka Mara',          lik:'lik-4-2', gdje:'grad', x:7,  y:38, poz:'Dobar dan. Vi ste onaj novi iz zgrade preko puta?'},
  {id:'tomislav',  ime:'Susjed Tomislav',    lik:'lik-3-1', gdje:'grad', x:12, y:39, poz:'O, susjed! Ako ti ikad zatreba alat, samo reci.'},
  {id:'iva',       ime:'Iva',                lik:'lik-1-3', gdje:'grad', x:6,  y:43, poz:'Bok! Ja sam Iva, a ono je moja sestra. Ista sam ja, samo brža!'},
  {id:'ana',       ime:'Ana',                lik:'lik-1-3', gdje:'grad', x:9,  y:43, poz:'Bok! Ja sam Ana. Što god ti Iva kaže — i ja to kažem.'},
  /* trg */
  {id:'svirac',    ime:'Svirač Rene',        lik:'lik-2-0', gdje:'grad', x:33, y:24, poz:'Slušaj ovu: „More, more, plavo more…” Sam sam je složio.'},
  {id:'novinarka', ime:'Prodavačica Vera',   lik:'lik-1-1', gdje:'grad', x:39, y:22, poz:'Novine! Sve novosti iz grada. A i ono što nije u novinama znam.'},
  {id:'starac',    ime:'Starac Jure',        lik:'lik-5-2', gdje:'grad', x:36, y:25, poz:'Sjedni malo, mladosti. Kamo svi žure?'},
  /* dućani — vani */
  {id:'dostavljac',ime:'Dostavljač',         lik:'lik-3-0', gdje:'grad', x:55, y:27, poz:'Oprosti, žurim! Tri paketa do dva sata.'},
  /* školski kvart */
  {id:'luka',      ime:'Dječak Luka',        lik:'lik-0-3', gdje:'grad', x:9,  y:21, poz:'Bok! Ideš u školu? Ja bježim iz nje. Šalim se!'},
  {id:'sara',      ime:'Učenica Sara',       lik:'lik-1-2', gdje:'grad', x:12, y:22, poz:'Ako nešto ne razumiješ, pitaj mene. Ja sve znam. Skoro sve.'},
  /* zanatska */
  {id:'zoran',     ime:'Poštar Zoran',       lik:'lik-2-3', gdje:'grad', x:54, y:39, poz:'Pisma, paketi, računi… Uvijek nešto nosim. Danas i tebi nešto imam.'},
  {id:'ema',       ime:'Turistkinja Ema',    lik:'lik-1-0', gdje:'grad', x:59, y:40, poz:'Oprosti — govoriš li hrvatski? Ja tek učim. Muzej je predivan!'},
  /* gornji grad */
  {id:'ruza',      ime:'Starica Ruža',       lik:'lik-4-3', gdje:'grad', x:28, y:9,  poz:'Polako, dijete… sve polako. Grad je star, ima vremena.'},
  {id:'klesar',    ime:'Klesar Šime',        lik:'lik-3-3', gdje:'grad', x:39, y:10, poz:'Ovaj kamen? Stariji od nas obojice. Drži pola grada.'},
  {id:'slaven',    ime:'Vozač Slaven',       lik:'lik-2-2', gdje:'grad', x:44, y:9,  poz:'Autobus ide preko cijelog grada. Dvije kune… ovaj, dva novčića!'},
  /* park */
  {id:'vrtlar',    ime:'Vrtlar Zdravko',     lik:'lik-3-2', gdje:'grad', x:31, y:36, poz:'Vidiš ove ruže? Sadio sam ih kad si ti bio ovolicni.'},
  {id:'sanja',     ime:'Sanja sa psom',      lik:'lik-1-1', gdje:'grad', x:37, y:38, poz:'Ne boj se, ne grize. Samo laje na golubove.'},
  {id:'petra',     ime:'Liječnica Petra',    lik:'lik-1-2', gdje:'grad', x:41, y:40, poz:'Šetnja svaki dan — pola zdravlja. Druga polovica je juha.'},
  /* riva */
  {id:'mate',      ime:'Ribar Mate',         lik:'lik-5-0', gdje:'grad', x:12, y:48, poz:'Jutros u pet sam bio na moru. More ti sve kaže, samo treba slušati.'},
  {id:'anka',      ime:'Ribarica Anka',      lik:'lik-4-1', gdje:'grad', x:17, y:48, poz:'Svježa riba! Jutrošnja! Kilogram, pola kile, koliko trebaš?'},
  {id:'hans',      ime:'Turist Hans',        lik:'lik-2-1', gdje:'grad', x:30, y:48, poz:'Entschuldigung… ovaj… gdje je… plaža? Molim? Danke!'},
  {id:'dijete1',   ime:'Dijete s udicom',    lik:'lik-0-3', gdje:'grad', x:24, y:49, poz:'Ništa ne grize već dva sata. Ali ne odustajem!'},
  /* sportski kvart */
  {id:'boris',     ime:'Trener Boris',       lik:'lik-3-0', gdje:'grad', x:72, y:37, poz:'Trči! Dodaj! Stani! …Ne ti, ne ti. Ti samo gledaj.'},
  {id:'dario',     ime:'Vratar Dario',       lik:'lik-2-0', gdje:'grad', x:75, y:40, poz:'Jučer smo pobijedili dva-jedan. Ja sam obranio sve. Skoro sve.'},
  {id:'lana',      ime:'Atletičarka Lana',   lik:'lik-1-0', gdje:'grad', x:71, y:41, poz:'Sto metara za trinaest sekundi. A ti? Hajde, mjerim ti!'},
  {id:'kreso',     ime:'Navijač Krešo',      lik:'lik-5-1', gdje:'grad', x:77, y:36, poz:'U nedjelju je utakmica! Cijeli grad dolazi. I ti dođi!'},
  /* interijeri */
  {id:'vesna',     ime:'Pekarica Vesna',     lik:'lik-1-1', gdje:'pekara',    x:5,  y:4, poz:'Dobro jutro! Izvolite?'},
  {id:'jela',      ime:'Jela',               lik:'lik-4-1', gdje:'trznica',   x:4,  y:5, poz:'Rajčice, mlade krumpire, luk! Sve jutros ubrano.'},
  {id:'ivo',       ime:'Konobar Ivo',        lik:'lik-2-2', gdje:'konoba',    x:11, y:4, poz:'Sjedni gdje hoćeš. Danas imamo grah, a grah je zakon.'},
  {id:'damir',     ime:'Učitelj Damir',      lik:'lik-3-1', gdje:'skola',     x:7,  y:4, poz:'Uđi, uđi. Baš govorimo o rodu imenica. Znaš li koji je rod „more”?'},
  {id:'bruno',     ime:'Knjižničar Bruno',   lik:'lik-5-3', gdje:'knjiznica', x:12, y:4, poz:'Dobar dan. Vidim po licu — ne razumijete ni riječ, je li tako?'},
  {id:'nada',      ime:'Šalterica Nada',     lik:'lik-1-2', gdje:'posta',     x:5,  y:4, poz:'Izvolite? Pisma na šalter jedan, paketi na dva. Ja sam oba.'},
  {id:'filip',     ime:'Čuvar Filip',        lik:'lik-3-3', gdje:'muzej',     x:3,  y:4, poz:'Dobar dan. Ne dirajte izloške. Ni onda kad mislite da nitko ne gleda.'},
  {id:'mario',     ime:'Razvodnik Mario',    lik:'lik-2-3', gdje:'kino',      x:12, y:5, poz:'Karte, molim! Film počinje za deset minuta.'},
  {id:'petra2',    ime:'Sestra Marija',      lik:'lik-1-0', gdje:'ambulanta', x:11, y:4, poz:'Doktorica je u šetnji. Ako nije hitno, sjednite. Ako je hitno — trčite za njom.'},
  {id:'ante',      ime:'Don Ante',           lik:'lik-5-2', gdje:'crkva',     x:7,  y:4, poz:'Mir s tobom. Zvono zvoni u podne i u sedam. Po njemu se ravna pola grada.'},
  {id:'stipe',     ime:'Domar Stipe',        lik:'lik-4-0', gdje:'dvorana',   x:3,  y:4, poz:'Ključevi od svega su kod mene. I od dvorane, i od svlačionice, i od priče.'},
  {id:'kata',      ime:'Spremačica Kata',    lik:'lik-4-2', gdje:'skola',     x:3,  y:6, poz:'Pazi, oprano je! Hodaj uz rub, kao svi.'}
];
var MEDIJ = 'mini games media/';
var T = 16, VID_W = 22, VID_H = 12;

/* naziv dijela grada prema položaju */
function zonaNa(x, y){
  if (y >= 50) return 'Plaža';
  if (y >= 47) return 'Riva';
  if (y >= 45) return 'Obalna cesta';
  if (y >= 32){
    if (x <= 20) return 'Stambeno naselje';
    if (x <= 46) return 'Park';
    if (x <= 66) return 'Zanatska četvrt';
    return 'Sportski kvart';
  }
  if (y >= 28) return 'Glavna ulica';
  if (y >= 17){
    if (x <= 20) return 'Školski kvart';
    if (x <= 46) return 'Trg';
    if (x <= 66) return 'Dućani';
    return 'Sportski kvart';
  }
  if (y >= 13) return 'Ulica stube';
  if (x <= 22) return 'Školski kvart';
  if (x <= 52) return 'Gornji grad';
  return 'Sjeverni kvart';
}

var C = document.getElementById('platno');
C.width = VID_W * T; C.height = VID_H * T;
var G = C.getContext('2d');
G.imageSmoothingEnabled = false;

var SHEET = {};
var ucitano = 0, treba = 2;
['R','U'].forEach(function(k, i){
  var im = new Image();
  im.onload = function(){ ucitano++; if (ucitano === treba) kreni(); };
  im.onerror = function(){ ucitano++; if (ucitano === treba) kreni(); };
  im.src = MEDIJ + (k === 'R' ? 'kenney-rogue.png' : 'kenney-urban.png');
  SHEET[k] = im;
});
/* roguelike sheet ima 1px razmak između pločica, urban nema */
var RAZMAK = { R: 1, U: 0 };

var S = {
  x: KARTA.pocetak.x, y: KARTA.pocetak.y, smjer: 'd',
  kam: {x:0, y:0}, korak: 0, poruka: null,
  gdje: 'grad', povratak: null, bodovi: 0, pogledi: 0
};
function soba(){ return S.gdje === 'grad' ? null : UNUTRA[S.gdje]; }
function sirina(){ var s = soba(); return s ? s.w : KARTA.w; }
function visina(){ var s = soba(); return s ? s.h : KARTA.h; }

function crtajPlocicu(ime, px, py){
  var a = ATLAS[ime]; if (!a) return;
  var im = SHEET[a.s]; if (!im || !im.complete || !im.naturalWidth) return;
  var g = RAZMAK[a.s];
  G.drawImage(im, a.c * (T + g), a.r * (T + g), a.w * T + (a.w - 1) * g, a.h * T + (a.h - 1) * g,
              px, py, a.w * T, a.h * T);
}

/* roguelike se mora crtati pločicu-po-pločicu zbog razmaka */
function crtajUnos(ime, px, py){
  var a = ATLAS[ime]; if (!a) return;
  var im = SHEET[a.s]; if (!im || !im.complete || !im.naturalWidth) return;
  var g = RAZMAK[a.s];
  for (var j = 0; j < a.h; j++){
    for (var i = 0; i < a.w; i++){
      G.drawImage(im, (a.c + i) * (T + g), (a.r + j) * (T + g), T, T,
                  px + i * T, py + j * T, T, T);
    }
  }
}

function stegni(v, a, b){ return v < a ? a : (v > b ? b : v); }
function ciljKamere(){
  return {
    x: stegni(S.x * T + T/2 - C.width/2,  0, Math.max(0, sirina() * T - C.width)),
    y: stegni(S.y * T + T/2 - C.height/2, 0, Math.max(0, visina() * T - C.height))
  };
}
var kamAnim = null;
function pratiKameru(odmah){
  var c = ciljKamere();
  if (odmah){ S.kam = c; if (kamAnim) cancelAnimationFrame(kamAnim); kamAnim = null; crtaj(); return; }
  if (kamAnim) return;
  kamAnim = requestAnimationFrame(function korakK(){
    var c = ciljKamere();
    S.kam.x += (c.x - S.kam.x) * 0.25;
    S.kam.y += (c.y - S.kam.y) * 0.25;
    if (Math.abs(c.x - S.kam.x) < 0.5 && Math.abs(c.y - S.kam.y) < 0.5){
      S.kam = c; kamAnim = null; crtaj(); return;
    }
    crtaj(); kamAnim = requestAnimationFrame(korakK);
  });
}

var LIK = { d: 'lik-0-0', l: 'lik-0-1', r: 'lik-0-1', u: 'lik-0-2' };

function crtaj(){
  var kx = Math.round(S.kam.x), ky = Math.round(S.kam.y);
  G.clearRect(0, 0, C.width, C.height);
  var sb = soba();
  var x0 = Math.max(0, Math.floor(kx / T)), x1 = Math.min(sirina(), Math.ceil((kx + C.width) / T) + 1);
  var y0 = Math.max(0, Math.floor(ky / T)), y1 = Math.min(visina(), Math.ceil((ky + C.height) / T) + 1);
  for (var j = y0; j < y1; j++){
    for (var i = x0; i < x1; i++){
      var ime = sb ? sb.teren[j][i] : KARTA.znakovi[KARTA.teren[j][i]];
      crtajUnos(ime, i * T - kx, j * T - ky);
    }
  }
  var popis = sb ? sb.objekti : KARTA.objekti;
  for (var n = 0; n < popis.length; n++){
    var o = popis[n];
    if (o.x < x0 - 4 || o.x > x1 + 4 || o.y < y0 - 8 || o.y > y1 + 4) continue;
    crtajUnos(o.ime, o.x * T - kx, o.y * T - ky);
  }
  if (!sb){
    /* imena zgrada — pločica iznad krova */
    G.textAlign = 'center'; G.textBaseline = 'middle';
    for (var t2 = 0; t2 < KARTA.natpisi.length; t2++){
      var na = KARTA.natpisi[t2];
      if (!na.z) continue;
      if (na.x < x0 - 3 || na.x > x1 + 3 || na.y < y0 - 1 || na.y > y1 + 1) continue;
      var cx = na.x * T - kx + T / 2, cy = na.y * T - ky + 5;
      G.font = 'bold 7px system-ui, sans-serif';
      var w2 = G.measureText(na.hr).width + 6;
      G.fillStyle = 'rgba(255,248,239,.92)';
      G.fillRect(cx - w2 / 2, cy - 5, w2, 10);
      G.strokeStyle = '#2B2118'; G.lineWidth = 1;
      G.strokeRect(cx - w2 / 2 + .5, cy - 4.5, w2 - 1, 9);
      G.fillStyle = '#2B2118';
      G.fillText(na.hr, cx, cy + .5);
    }
    for (var n2 = 0; n2 < KARTA.vrata.length; n2++){
      var vv = KARTA.vrata[n2];
      if (vv.x < x0 || vv.x > x1 || vv.y < y0 || vv.y > y1) continue;
      var px2 = vv.x * T - kx, py2 = vv.y * T - ky;
      G.fillStyle = '#4A3826';
      G.fillRect(px2 + 3, py2, T - 6, T - 3);
      G.fillStyle = '#2B2118';
      G.fillRect(px2 + 3, py2, T - 6, 2);
      G.fillStyle = '#F4B942';
      G.fillRect(px2 + T - 6, py2 + 7, 2, 2);
      G.fillStyle = '#8C8072';
      G.fillRect(px2 + 2, py2 + T - 3, T - 4, 3);
    }
  } else {
    var iz = sb.izlaz;
    var px3 = iz.x * T - kx, py3 = (iz.y - 1) * T - ky;
    G.fillStyle = '#C4553D';
    G.fillRect(px3 + 2, py3 + T - 6, T - 4, 6);
    G.fillStyle = '#8E3B2A';
    G.fillRect(px3 + 2, py3 + T - 6, T - 4, 1);
  }
  /* ljudi */
  for (var nn = 0; nn < NPC.length; nn++){
    var np = NPC[nn];
    if (np.gdje !== S.gdje) continue;
    if (np.x < x0 - 1 || np.x > x1 || np.y < y0 - 1 || np.y > y1) continue;
    crtajUnos(np.lik, np.x * T - kx, np.y * T - ky);
  }
  /* igrač */
  var sl = LIK[S.smjer] || LIK.d;
  var px = S.x * T - kx, py = S.y * T - ky;
  G.save();
  if (S.smjer === 'l'){ G.translate(px + T, py); G.scale(-1, 1); crtajUnos(sl, 0, 0); }
  else { crtajUnos(sl, px, py); }
  G.restore();
  document.getElementById('zPoz').textContent = S.x + ', ' + S.y;
}

function prohodnoTeren(x, y, gdje){
  if (x < 0 || y < 0) return false;
  var sb = gdje === 'grad' ? null : UNUTRA[gdje];
  var w = sb ? sb.w : KARTA.w, h = sb ? sb.h : KARTA.h;
  if (x >= w || y >= h) return false;
  return (sb ? sb.prolaz[y][x] : KARTA.prolaz[y][x]) === '1';
}
function npcNa(x, y, gdje){
  for (var i = 0; i < NPC.length; i++){
    var n = NPC[i];
    if (n.gdje === gdje && n.x === x && n.y === y) return n;
  }
  return null;
}
function prohodno(x, y){
  if (npcNa(x, y, S.gdje)) return false;
  return prohodnoTeren(x, y, S.gdje);
}
/* vanjski NPC-evi na zauzetom polju se pomaknu na najbliže slobodno */
(function namjesti(){
  NPC.forEach(function(n){
    if (n.gdje !== 'grad') return;
    if (prohodnoTeren(n.x, n.y, 'grad')) return;
    for (var r = 1; r < 8; r++){
      for (var dy = -r; dy <= r; dy++){
        for (var dx = -r; dx <= r; dx++){
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
          if (prohodnoTeren(n.x + dx, n.y + dy, 'grad')){
            n.x += dx; n.y += dy; return;
          }
        }
      }
    }
  });
})();
function natpisNa(x, y){
  for (var i = 0; i < KARTA.natpisi.length; i++){
    var n = KARTA.natpisi[i];
    if (Math.abs(n.x - x) <= 1 && Math.abs(n.y - y) <= 1) return n;
  }
  return null;
}
function vrataNa(x, y){
  for (var i = 0; i < KARTA.vrata.length; i++){
    var v = KARTA.vrata[i];
    if (v.x === x && v.y === y) return v;
  }
  return null;
}

function poruka(hr, en){
  zatvoriPoruku();
  var d = document.createElement('div');
  d.className = 'oblacic';
  d.innerHTML = '<div class="hr">' + hr + '</div>' + (en ? '<div class="en">' + en + '</div>' : '') +
                '<div class="dalje">razmaknica / klik ▸</div>';
  d.onclick = zatvoriPoruku;
  document.body.appendChild(d);
  S.poruka = d;
}
function zatvoriPoruku(){ if (S.poruka){ S.poruka.remove(); S.poruka = null; } }

function pomak(dx, dy, smjer){
  if (S.poruka){ zatvoriPoruku(); return; }
  S.smjer = smjer;
  var nx = S.x + dx, ny = S.y + dy;
  if (!prohodno(nx, ny)){ crtaj(); nagovijesti(); return; }
  S.x = nx; S.y = ny; S.korak++;
  var sb = soba();
  if (sb && S.y >= sb.izlaz.y && S.x === sb.izlaz.x){ izadi(); return; }
  if (!sb){
    var v = vrataNa(S.x, S.y);
    if (v){ udi(v.kamo, v.ime); return; }
  }
  pratiKameru(); nagovijesti();
}

function osvjeziZonu(){
  var z = document.getElementById('zZona');
  var sb = soba();
  z.textContent = sb ? sb.naslov : zonaNa(S.x, S.y);
}
function nagovijesti(){
  osvjeziZonu();
  var t = document.getElementById('traka');
  var covjek = susjedniNpc();
  if (covjek){ t.innerHTML = '<b>' + covjek.ime + '</b> — pritisni ✋ za razgovor'; return; }
  if (S.gdje !== 'grad'){
    var sb = soba();
    t.innerHTML = (S.x === sb.izlaz.x && S.y >= sb.izlaz.y - 1)
      ? '<b>Izlaz</b> — korak prema dolje vodi van'
      : 'Unutra si: <b>' + sb.naslov + '</b>. Izlaz je otirač na dnu.';
    return;
  }
  var v = vrataNa(S.x, S.y - 1);
  var n = natpisNa(S.x, S.y);
  if (v) t.innerHTML = '<b>' + v.ime + '</b> — korak gore vodi unutra';
  else if (n) t.innerHTML = 'Natpis: <b>' + n.hr + '</b> — pritisni ✋ za prijevod';
  else t.textContent = 'Strelice ili WASD za kretanje. Razmaknica čita natpise i otvara vrata.';
}

function udi(id, imeMjesta){
  var sb = UNUTRA[id];
  if (!sb){ poruka('Vrata su zaključana.', ''); return; }
  S.povratak = { x: S.x, y: S.y };
  S.gdje = id; S.x = sb.ulaz.x; S.y = sb.ulaz.y; S.smjer = 'u';
  document.querySelector('header .ime').textContent = sb.naslov;
  pratiKameru(true); nagovijesti();
}
function izadi(){
  if (S.gdje === 'grad') return;
  S.gdje = 'grad';
  if (S.povratak){ S.x = S.povratak.x; S.y = S.povratak.y + 1; }
  S.smjer = 'd';
  document.querySelector('header .ime').textContent = 'Grad';
  pratiKameru(true); nagovijesti();
}

function susjedniNpc(){
  var okolo = [[0,-1],[0,1],[-1,0],[1,0]];
  for (var i = 0; i < okolo.length; i++){
    var n = npcNa(S.x + okolo[i][0], S.y + okolo[i][1], S.gdje);
    if (n) return n;
  }
  return null;
}
function akcija(){
  if (S.poruka){ zatvoriPoruku(); return; }
  var covjek = susjedniNpc();
  if (covjek){
    poruka('<span style="color:var(--zel)">' + covjek.ime + ':</span> ' + covjek.poz, '');
    return;
  }
  if (S.gdje !== 'grad'){
    var sb = soba();
    if (S.x === sb.izlaz.x && S.y >= sb.izlaz.y - 1){ izadi(); return; }
    poruka('Ovdje nema nikoga.', '');
    return;
  }
  var v = vrataNa(S.x, S.y) || vrataNa(S.x, S.y - 1);
  if (v){ udi(v.kamo, v.ime); return; }
  var n = natpisNa(S.x, S.y);
  if (n){ poruka(n.hr, n.en); return; }
  poruka('Ovdje nema ničega.', '');
}

var TIPKE = {
  ArrowUp:['u',0,-1], ArrowDown:['d',0,1], ArrowLeft:['l',-1,0], ArrowRight:['r',1,0],
  w:['u',0,-1], s:['d',0,1], a:['l',-1,0], d:['r',1,0],
  W:['u',0,-1], S:['d',0,1], A:['l',-1,0], D:['r',1,0]
};
document.addEventListener('keydown', function(e){
  if (e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); akcija(); return; }
  var m = TIPKE[e.key];
  if (m){ e.preventDefault(); pomak(m[1], m[2], m[0]); }
});
document.querySelector('.dpad').addEventListener('click', function(e){
  var b = e.target.closest('button'); if (!b) return;
  var s = b.dataset.s;
  if (s === 'x'){ akcija(); return; }
  var m = { u:['u',0,-1], d:['d',0,1], l:['l',-1,0], r:['r',1,0] }[s];
  pomak(m[1], m[2], m[0]);
});

/* platno se skalira na cijeli broj — pikseli ostaju oštri */
function slozi(){
  var omot = document.querySelector('.ploha');
  var dostupnoW = omot.clientWidth - 22;
  var dostupnoH = window.innerHeight - 250;          // zaglavlje, traka i tipke
  var k = Math.min(dostupnoW / C.width, dostupnoH / C.height);
  k = k >= 1 ? Math.floor(k) : Math.max(0.5, Math.round(k * 20) / 20);
  C.style.width = Math.round(C.width * k) + 'px';
  C.style.height = Math.round(C.height * k) + 'px';
}
window.addEventListener('resize', slozi);

function kreni(){
  slozi();
  osvjeziZonu();
  pratiKameru(true);
  nagovijesti();
  var im = SHEET.R;
  if (!im.naturalWidth){
    document.getElementById('traka').innerHTML =
      '<b>Nema sličica.</b> Datoteke <code>kenney-rogue.png</code> i <code>kenney-urban.png</code> ' +
      'moraju biti u mapi <code>mini games media/</code>.';
  }
}
</script>
</body></html>
"""

html = (HTML.replace("__KARTA__", json.dumps(karta, ensure_ascii=False))
            .replace("__ATLAS__", json.dumps(atlas, ensure_ascii=False))
            .replace("__UNUTRA__", json.dumps(unutra, ensure_ascii=False)))
io.open(os.path.join(d, "01-grad-v2.html"), "w", encoding="utf-8").write(html)
print("01-grad-v2.html:", len(html), "znakova")
