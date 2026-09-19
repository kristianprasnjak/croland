/* Croland — slikovni izazov, zajednički motor (daily i weekly).

   Jedna slika, popis pojmova. Klik na predmet ga obasja, igrač upisuje hrvatsku
   riječ. Weekly nosi dvadesetak pojmova, daily njih pet — razlika je samo u
   podacima, mehanika je ista.

   Pojedini izazov je tanka HTML datoteka koja postavi window.IZAZOV i učita
   izazov/motor.css + izazov/motor.js. Motor sam iscrta cijelo sučelje, pa u toj
   datoteci nema ni markupa ni logike — samo podaci. Vidi izazov/PREDLOZAK.html.

   window.IZAZOV = {
     id:      'kuhinja',                     // kratka oznaka, bez razmaka
     vrsta:   'daily',                       // 'daily' ili 'weekly'
     ime:     'Kuhinja',                     // hrvatski naziv scene
     stil:    'the kitchen',                 // engleski podnaslov
     slika:   'slike/kuhinja.webp',          // put relativno na HTML datoteku
     w: 1024, h: 572,                        // prave dimenzije slike u pikselima
     kljuc:   'croland.daily.kuhinja.2026-09-20',   // localStorage ključ napretka
     mini:    'croland-mini-kuhinja',        // neobavezno; zadano 'croland-mini-<id>'
     uvod:    'Five things...',              // neobavezno: rečenica u uputama
     pojmovi: [ {id, x, y, w, h, o:[...]} ]  // x,y,w,h u postotcima slike
   }

   Dovršen izazov javlja aplikaciji (ako je u okviru): parent.crolandIzazovGotov(
   {id, vrsta, ukupno}) — ondje se pali streak. */
(function(){
"use strict";

var K = window.IZAZOV;
if (!K || !K.pojmovi || !K.pojmovi.length){
  document.body.innerHTML = '<p style="padding:24px;font:700 16px system-ui">'+
    'izazov/motor.js: nedostaje window.IZAZOV s pojmovima.</p>';
  return;
}

var IMG_W = K.w || 1024, IMG_H = K.h || 572;
var KLJUC = K.kljuc || ('croland.izazov.' + K.id);
var MINI  = K.mini  || ('croland-mini-' + K.id);
var VRSTA = (K.vrsta === 'weekly') ? 'weekly' : 'daily';
var NASLOV = VRSTA === 'weekly' ? 'Weekly Challenge' : 'Daily Challenge';

var POJMOVI = K.pojmovi;
/* sitni čuvar: makni slučajne "nije" natuknice ako ostanu iz pripreme */
POJMOVI.forEach(function(p){ p.o = (p.o||[]).filter(function(s){ return s.indexOf(" nije")<0; }); });
var UKUPNO = POJMOVI.length;

/* ───────────── sučelje ───────────── */
document.title = 'Croland — ' + NASLOV + ': ' + (K.ime || K.id);
document.body.innerHTML =
  '<div class="app" id="app">'+
    '<div class="traka">'+
      '<a class="natrag" href="../index.html" id="gNatrag" title="Back">←</a>'+
      '<div class="ime"><span class="dugo">'+esc(NASLOV)+'</span><span class="kratko">'+esc(K.ime||'')+'</span>'+
        '<small><span class="dugo">'+esc(K.ime||'')+(K.stil ? ' · '+esc(K.stil) : '')+'</span>'+
        '<span class="kratko">'+(VRSTA==='weekly'?'Weekly':'Daily')+'</span></small></div>'+
      '<span class="znak" id="brojac">0 / 0</span>'+
      '<button class="gi" id="gManje" title="Zoom out" aria-label="Zoom out">−</button>'+
      '<button class="gi" id="gVise" title="Zoom in" aria-label="Zoom in">+</button>'+
      '<button class="gi glavni" id="gPokazi" title="Signal every word still missing">✨<small>Show</small></button>'+
      '<button class="gi" id="gInfo" title="How it works">?</button>'+
    '</div>'+
    '<div class="scena" id="scena">'+
      '<div class="platno" id="platno">'+
        '<img id="slika" src="'+esc(K.slika||'')+'" alt="'+esc(K.stil||K.ime||'')+'">'+
      '</div>'+
      '<form class="upis" id="upis" autocomplete="off">'+
        '<div class="natuknica" id="natuknica">Type it in Croatian</div>'+
        '<div class="kutija">'+
          '<button type="button" class="mali" id="gZatvori" title="Close">✕</button>'+
          '<input id="polje" type="text" inputmode="text" autocomplete="off" autocorrect="off" '+
            'autocapitalize="off" spellcheck="false" enterkeyhint="done" placeholder="…">'+
          '<button type="submit" class="mali ok" title="Check">→</button>'+
        '</div>'+
      '</form>'+
      '<div class="poruka" id="poruka"></div>'+
    '</div>'+
  '</div>'+
  '<div class="zastor" id="zastor"><div class="kut" id="kut"></div></div>';

/* ───────────── pomoćno ───────────── */
function $(s){ return document.querySelector(s); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, function(z){
  return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[z]; }); }
var DIJA = {"č":"c","ć":"c","ž":"z","š":"s","đ":"d","dž":"d"};
function ocisti(s){
  return String(s||"").toLowerCase().trim()
    .replace(/[čćžšđ]/g, function(z){ return DIJA[z]; })
    .replace(/[^a-z0-9šđčćž ]+/g,"")
    .replace(/\s+/g," ").trim();
}
function stisni(a,b,c){ return Math.min(Math.max(a,b),c); }

/* ───────────── stanje ───────────── */
var scena = $("#scena"), platno = $("#platno"), upis = $("#upis"),
    polje = $("#polje"), poruka = $("#poruka"), brojac = $("#brojac"),
    natuknica = $("#natuknica"), zastor = $("#zastor"), kut = $("#kut");

var S = { k:1, tx:0, ty:0, aktivan:null, rijeseni:{}, pocetak:Date.now() };
var kmin = .2, kmax = 6, kpocetni = 1;

try{
  var spremljeno = JSON.parse(localStorage.getItem(KLJUC) || "{}");
  if (spremljeno && spremljeno.rijeseni) S.rijeseni = spremljeno.rijeseni;
}catch(e){}

function spremi(){
  try{
    localStorage.setItem(KLJUC, JSON.stringify({rijeseni:S.rijeseni}));
    var n = Object.keys(S.rijeseni).length;
    localStorage.setItem(MINI, JSON.stringify(
      n >= UKUPNO ? {naplaceno:n} : {najbolje:n}
    ));
  }catch(e){}
}

/* Dovršen izazov javi aplikaciji — ondje se pali daily streak. */
function javiGotovo(){
  try{
    if (window.parent && window.parent !== window &&
        typeof window.parent.crolandIzazovGotov === "function"){
      window.parent.crolandIzazovGotov({id:K.id, vrsta:VRSTA, ukupno:UKUPNO});
    }
  }catch(e){}
}

/* ───────────── crtanje točaka ───────────── */
POJMOVI.forEach(function(p){
  var d = document.createElement("div");
  d.className = "tocka";
  d.style.left   = p.x + "%";
  d.style.top    = p.y + "%";
  d.style.width  = p.w + "%";
  d.style.height = p.h + "%";
  d.innerHTML = '<i class="kvaka">✓</i>';
  platno.appendChild(d);
  p.el = d;
  p.povrsina = p.w * p.h;
  p.sredinaX = p.x + p.w/2;
});

function osvjeziStanja(){
  var n = 0;
  POJMOVI.forEach(function(p){
    var r = !!S.rijeseni[p.id];
    if (r) n++;
    p.el.classList.toggle("rijesen", r);
  });
  brojac.textContent = n + " / " + UKUPNO;
  return n;
}

/* ───────────── transformacija ───────────── */
function primijeni(glatko){
  platno.classList.toggle("glatko", !!glatko);
  platno.style.width  = IMG_W + "px";
  platno.style.height = IMG_H + "px";
  platno.style.transform = "translate("+S.tx+"px,"+S.ty+"px) scale("+S.k+")";
  platno.style.setProperty("--inv", 1/S.k);
  if (glatko) setTimeout(function(){ platno.classList.remove("glatko"); }, 320);
}

/* Traka za upis pokriva vrh scene dok je otvorena, pa slika tada živi ispod
   nje: kad je niža od preostalog prostora, u njemu se centrira; kad je viša,
   smije se pomicati sve do te granice. Bez toga bi pojam pri vrhu slike ostao
   zauvijek skriven ispod trake — a zumirati ga ne smijemo. */
function gornjiOdmak(){
  return upis.classList.contains("vidi") ? upis.offsetHeight : 0;
}
function granice(){
  var vw = scena.clientWidth, vh = scena.clientHeight, gore = gornjiOdmak();
  var dw = IMG_W*S.k, dh = IMG_H*S.k, vhu = vh - gore;
  S.tx = dw <= vw ? (vw-dw)/2 : stisni(S.tx, vw-dw, 0);
  S.ty = dh <= vhu ? gore + (vhu-dh)/2 : stisni(S.ty, vh-dh, gore);
}

function postavi(){
  var vw = scena.clientWidth, vh = scena.clientHeight;
  if (!vw || !vh) return;
  var uklopi = Math.min(vw/IMG_W, vh/IMG_H);
  var portret = vh > vw*0.95;
  /* na mobitelu je slika po defaultu zumirana i zauzima većinu zaslona */
  kpocetni = portret ? Math.max(uklopi, (vh*0.86)/IMG_H) : uklopi;
  kmin = uklopi * 0.9;
  kmax = Math.max(uklopi*4, kpocetni*2.6);
}

function pocetniPogled(){
  postavi();
  S.k = kpocetni;
  var vw = scena.clientWidth, vh = scena.clientHeight;
  S.tx = (vw - IMG_W*S.k)/2;
  S.ty = (vh - IMG_H*S.k)/2;
  granice(); primijeni(false);
}

/* Zumiranje je u rukama igrača — klik ga nikad ne mijenja. Jedino što klik smije
   je gurnuti pogled toliko da obasjani pojam ne ostane ispod trake za upis ili
   ispod tipkovnice; mjerilo ostaje isto. */
function uvidik(p, glatko){
  if (!p) return;
  var vw = scena.clientWidth, vh = scena.clientHeight;
  var gore = gornjiOdmak() + 10;
  var l = p.x/100*IMG_W*S.k + S.tx,            t = p.y/100*IMG_H*S.k + S.ty;
  var r = (p.x+p.w)/100*IMG_W*S.k + S.tx,      b = (p.y+p.h)/100*IMG_H*S.k + S.ty;
  var dx = 0, dy = 0;
  if (r > vw-10) dx = (vw-10) - r;
  if (l + dx < 10) dx = 10 - l;
  if (b > vh-10) dy = (vh-10) - b;
  if (t + dy < gore) dy = gore - t;
  if (!dx && !dy) return;
  S.tx += dx; S.ty += dy;
  granice(); primijeni(glatko !== false);
}

/* ───────────── zumiranje na zahtjev ───────────── */
function zumiraj(faktor, sx, sy){
  var cilj = stisni(S.k*faktor, kmin, kmax);
  if (cilj === S.k) return;
  if (sx == null){ sx = scena.clientWidth/2; sy = scena.clientHeight/2; }
  S.tx = sx - (sx - S.tx)*(cilj/S.k);
  S.ty = sy - (sy - S.ty)*(cilj/S.k);
  S.k = cilj;
  granice(); primijeni(true);
  if (S.aktivan) setTimeout(function(){ uvidik(S.aktivan); }, 300);
}

/* ───────────── pogađanje ───────────── */
function pogodi(kx, ky){
  var r = scena.getBoundingClientRect();
  var ix = (kx - r.left - S.tx)/S.k / IMG_W * 100;
  var iy = (ky - r.top  - S.ty)/S.k / IMG_H * 100;
  var nadjen = null;
  POJMOVI.forEach(function(p){
    if (S.rijeseni[p.id]) return;
    if (ix >= p.x && ix <= p.x+p.w && iy >= p.y && iy <= p.y+p.h){
      if (!nadjen || p.povrsina < nadjen.povrsina) nadjen = p;
    }
  });
  return nadjen;
}

function mimo(kx, ky){
  var r = scena.getBoundingClientRect();
  var d = document.createElement("div");
  d.className = "mimo";
  d.style.left = (kx-r.left)+"px"; d.style.top = (ky-r.top)+"px";
  scena.appendChild(d);
  setTimeout(function(){ d.remove(); }, 520);
}

function otvori(p){
  if (S.aktivan) S.aktivan.el.classList.remove("aktivan");
  S.aktivan = p;
  p.el.classList.add("aktivan");
  upis.classList.add("vidi");
  upis.classList.remove("krivo");
  natuknica.textContent = "Type it in Croatian";
  polje.value = "";
  polje.focus();
  granice(); primijeni(true);      /* slika sjeda ispod trake */
  uvidik(p);
}

function zatvori(){
  if (S.aktivan) S.aktivan.el.classList.remove("aktivan");
  S.aktivan = null;
  upis.classList.remove("vidi");
  polje.blur();
  granice(); primijeni(true);
}

function javi(t, vrsta){
  poruka.textContent = t;
  poruka.className = "poruka vidi" + (vrsta ? " "+vrsta : "");
  clearTimeout(javi._t);
  javi._t = setTimeout(function(){ poruka.className = "poruka"; }, 1600);
}

upis.addEventListener("submit", function(e){
  e.preventDefault();
  var p = S.aktivan; if (!p) return;
  var u = ocisti(polje.value);
  if (!u) return;
  var dobro = p.o.some(function(o){ return ocisti(o) === u; });
  if (dobro){
    S.rijeseni[p.id] = 1;
    spremi();
    p.el.classList.remove("aktivan");
    var n = osvjeziStanja();
    zatvori();
    javi("Correct!", "dobro");
    if (n === UKUPNO){ javiGotovo(); setTimeout(kraj, 700); }
  } else {
    upis.classList.remove("krivo");
    void upis.offsetWidth;
    upis.classList.add("krivo");
    natuknica.textContent = "Not that one — try again";
    polje.select();
  }
});

$("#gZatvori").addEventListener("click", zatvori);

/* ───────────── signal: svi neriješeni, s lijeva na desno ───────────── */
var signalRadi = false;

function bljesak(p){
  p.el.classList.remove("signal"); void p.el.offsetWidth;
  p.el.classList.add("signal");
  setTimeout(function(){ p.el.classList.remove("signal"); }, 900);
}

function signal(){
  if (signalRadi) return;
  var ostali = POJMOVI.filter(function(p){ return !S.rijeseni[p.id]; })
                      .sort(function(a,b){ return a.sredinaX - b.sredinaX; });
  if (!ostali.length){ javi("Everything found!", "dobro"); return; }
  zatvori();
  signalRadi = true;

  var vw = scena.clientWidth, vh = scena.clientHeight;
  S.k = Math.min(S.k, kpocetni);                 /* ne prelijeći u punom zumu */
  var dw = IMG_W*S.k;
  granice();

  /* cijela slika stane — samo kaskada s lijeva na desno */
  if (dw <= vw + 2){
    S.tx = (vw-dw)/2; granice(); primijeni(true);
    ostali.forEach(function(p,i){ setTimeout(function(){ bljesak(p); }, 320 + i*120); });
    setTimeout(function(){ signalRadi = false; }, 320 + ostali.length*120 + 900);
    return;
  }

  /* slika je šira od zaslona — jedan prelet s lijeva na desno */
  var poc = 0, kra = vw - dw;                    /* tx ide 0 → negativno */
  S.tx = poc; granice(); primijeni(true);
  var T = stisni((dw/vw)*1400, 2200, 5200);

  /* trenutak bljeska svakog pojma: kad dođe na sredinu zaslona */
  var crta = vw*0.5;
  var raspored = ostali.map(function(p){
    var treba = crta - p.sredinaX/100*IMG_W*S.k;  /* tx pri kojem je na crti */
    var u = stisni(treba/kra, 0, 1);
    return {p:p, t:u*T};
  });
  for (var i=1;i<raspored.length;i++)
    if (raspored[i].t < raspored[i-1].t + 95) raspored[i].t = raspored[i-1].t + 95;

  var t0 = 0, prekid = false;
  function stani(){ prekid = true; }
  scena.addEventListener("pointerdown", stani, {once:true});

  function korak(sad){
    if (prekid){ signalRadi = false; return; }
    if (!t0) t0 = sad;
    var u = stisni((sad-t0)/T, 0, 1);
    S.tx = poc + (kra-poc)*u;
    granice(); primijeni(false);
    var proteklo = sad - t0;
    for (var j=raspored.length-1;j>=0;j--)
      if (proteklo >= raspored[j].t){ bljesak(raspored[j].p); raspored.splice(j,1); }
    if (u < 1 || raspored.length) requestAnimationFrame(korak);
    else setTimeout(function(){
      signalRadi = false;
      scena.removeEventListener("pointerdown", stani);
    }, 900);
  }
  setTimeout(function(){ requestAnimationFrame(korak); }, 330);
}
$("#gPokazi").addEventListener("click", signal);
$("#gManje").addEventListener("click", function(){ zumiraj(1/1.35); });
$("#gVise").addEventListener("click", function(){ zumiraj(1.35); });

/* Unutar aplikacije ← vraća na Daily challenge, a ne na datoteku pored. */
$("#gNatrag").addEventListener("click", function(e){
  try{
    if (window.parent && window.parent !== window && window.parent.idi){
      e.preventDefault(); window.parent.idi("daily");
    }
  }catch(err){}
});

/* ───────────── pan / zoom / tap ───────────── */
var prsti = new Map(), pocetnaUdaljenost = 0, pocetnoK = 1, pocetnaSredina = null;
var tapPoc = null, zadnjiTap = 0;

scena.addEventListener("pointerdown", function(e){
  scena.setPointerCapture(e.pointerId);
  prsti.set(e.pointerId, {x:e.clientX, y:e.clientY});
  if (prsti.size === 1){
    tapPoc = {x:e.clientX, y:e.clientY, t:Date.now()};
    scena.classList.add("vuce");
  } else if (prsti.size === 2){
    tapPoc = null;
    var t = Array.from(prsti.values());
    pocetnaUdaljenost = Math.hypot(t[0].x-t[1].x, t[0].y-t[1].y) || 1;
    pocetnoK = S.k;
    pocetnaSredina = {x:(t[0].x+t[1].x)/2, y:(t[0].y+t[1].y)/2};
  }
});

scena.addEventListener("pointermove", function(e){
  if (!prsti.has(e.pointerId)) return;
  var prije = prsti.get(e.pointerId);
  prsti.set(e.pointerId, {x:e.clientX, y:e.clientY});
  if (prsti.size === 1){
    var dx = e.clientX - prije.x, dy = e.clientY - prije.y;
    if (tapPoc && Math.hypot(e.clientX-tapPoc.x, e.clientY-tapPoc.y) > 10) tapPoc = null;
    S.tx += dx; S.ty += dy;
    granice(); primijeni(false);
  } else if (prsti.size === 2){
    var t = Array.from(prsti.values());
    var d = Math.hypot(t[0].x-t[1].x, t[0].y-t[1].y) || 1;
    var novo = stisni(pocetnoK * (d/pocetnaUdaljenost), kmin, kmax);
    var r = scena.getBoundingClientRect();
    var sx = pocetnaSredina.x - r.left, sy = pocetnaSredina.y - r.top;
    S.tx = sx - (sx - S.tx) * (novo/S.k);
    S.ty = sy - (sy - S.ty) * (novo/S.k);
    S.k = novo;
    granice(); primijeni(false);
  }
});

function gotov(e){
  if (!prsti.has(e.pointerId)) return;
  prsti.delete(e.pointerId);
  if (prsti.size === 0){
    scena.classList.remove("vuce");
    if (tapPoc && Date.now()-tapPoc.t < 500){
      var sada = Date.now();
      var tp = tapPoc;                       /* tapPoc se briše odmah ispod */
      if (sada - zadnjiTap < 300){ zadnjiTap = 0; dvoklik(tp.x, tp.y); tapPoc = null; return; }
      zadnjiTap = sada;
      setTimeout(function(){
        if (zadnjiTap !== sada) return;
        var p = pogodi(tp.x, tp.y);
        if (p) otvori(p);
        else { zatvori(); mimo(tp.x, tp.y); }
      }, 200);
    }
    tapPoc = null;
  }
}
scena.addEventListener("pointerup", gotov);
scena.addEventListener("pointercancel", gotov);

function dvoklik(kx, ky){
  var r = scena.getBoundingClientRect();
  var cilj = (S.k > kpocetni*1.4) ? kpocetni : Math.min(kmax, kpocetni*2.2);
  zumiraj(cilj/S.k, kx-r.left, ky-r.top);
}

scena.addEventListener("wheel", function(e){
  e.preventDefault();
  var cilj = stisni(S.k * (e.deltaY < 0 ? 1.12 : 1/1.12), kmin, kmax);
  var r = scena.getBoundingClientRect();
  var sx = e.clientX-r.left, sy = e.clientY-r.top;
  S.tx = sx - (sx - S.tx)*(cilj/S.k);
  S.ty = sy - (sy - S.ty)*(cilj/S.k);
  S.k = cilj;
  granice(); primijeni(false);
}, {passive:false});

document.addEventListener("keydown", function(e){
  if (e.key === "Escape") { zatvori(); zastor.classList.remove("vidi"); }
});

/* ───────────── tipkovnica / visina ───────────── */
function visina(){
  var v = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
  document.documentElement.style.setProperty("--visina", v + "px");
  granice(); primijeni(false);
}
if (window.visualViewport){
  window.visualViewport.addEventListener("resize", function(){
    visina();
    if (S.aktivan) setTimeout(function(){ if (S.aktivan) uvidik(S.aktivan); }, 60);
  });
}
window.addEventListener("resize", function(){ visina(); postavi(); granice(); primijeni(false); });
window.addEventListener("orientationchange", function(){ setTimeout(pocetniPogled, 260); });

/* ───────────── zastor ───────────── */
function panel(html){ kut.innerHTML = html; zastor.classList.add("vidi"); }
zastor.addEventListener("click", function(e){ if (e.target === zastor) zastor.classList.remove("vidi"); });

function upute(){
  var uvod = K.uvod || (UKUPNO + ' things are hiding in this picture. Tap one — it lights up — '+
             'then type its Croatian name.');
  panel(
    '<h3>'+esc(K.ime||'')+'</h3>'+
    '<p>'+esc(uvod)+'</p>'+
    '<ul>'+
      '<li>Diacritics are optional: <b>cokolada</b> counts as <b>čokolada</b>.</li>'+
      '<li>Singular or plural, both fine. Common synonyms too.</li>'+
      '<li>Get it right and the object is ticked off for good.</li>'+
      '<li>Lost? <b>✨ Show</b> flashes everything still missing, left to right.</li>'+
      '<li>Zoom is yours: pinch, double-tap or the − / + buttons. Tapping an object never changes it.</li>'+
      '<li>Drag to move around the picture.</li>'+
    '</ul>'+
    '<button class="g glavni" id="_z">Got it</button>'+
    '<button class="g" id="_r">Start over</button>'
  );
  $("#_z").onclick = function(){ zastor.classList.remove("vidi"); };
  $("#_r").onclick = function(){
    if (!confirm("Clear all found words?")) return;
    S.rijeseni = {}; spremi(); osvjeziStanja();
    zastor.classList.remove("vidi"); pocetniPogled();
  };
}
$("#gInfo").addEventListener("click", upute);

function kraj(){
  konfeti();
  panel(
    '<h3>All '+UKUPNO+'!</h3>'+
    '<p>'+(K.kraj ? esc(K.kraj) : 'You named every object in the picture — in Croatian.')+'</p>'+
    '<button class="g glavni" id="_z">Nice</button>'+
    '<button class="g" id="_r">Play again</button>'
  );
  $("#_z").onclick = function(){ zastor.classList.remove("vidi"); };
  $("#_r").onclick = function(){
    S.rijeseni = {}; spremi(); osvjeziStanja();
    zastor.classList.remove("vidi"); pocetniPogled();
  };
}

function konfeti(){
  var boje = ["#F4B942","#E8623A","#2FA8A0","#7B5EA7","#7CB342","#3E7CB1"];
  for (var i=0;i<70;i++){
    (function(i){
      var d = document.createElement("i");
      d.className = "konfet";
      d.style.background = boje[i % boje.length];
      d.style.left = (Math.random()*100) + "vw";
      d.style.top = "-20px";
      d.style.transform = "rotate("+(Math.random()*360)+"deg)";
      document.body.appendChild(d);
      var trajanje = 1600 + Math.random()*1400;
      d.animate(
        [{transform:"translateY(0) rotate(0deg)",opacity:1},
         {transform:"translateY("+(window.innerHeight+60)+"px) rotate("+(560+Math.random()*560)+"deg)",opacity:.9}],
        {duration:trajanje, easing:"cubic-bezier(.3,.7,.6,1)"}
      ).onfinish = function(){ d.remove(); };
    })(i);
  }
}

/* ───────────── start ───────────── */
function start(){
  visina();
  pocetniPogled();
  var n = osvjeziStanja();
  if (n >= UKUPNO) javiGotovo();          /* već riješen: streak se ionako pali jednom na dan */
  if (!localStorage.getItem(KLJUC+".vidio")){
    try{ localStorage.setItem(KLJUC+".vidio","1"); }catch(e){}
    upute();
  }
}
var slika = $("#slika");
if (slika.complete && slika.naturalWidth) start();
else slika.addEventListener("load", start);
slika.addEventListener("error", function(){
  platno.style.background = "var(--papir2)";
  javi("Image not found: " + (K.slika||""), "lose");
  start();
});
})();
