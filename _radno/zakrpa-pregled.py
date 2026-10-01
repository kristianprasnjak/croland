# Zakrpa: prozor s pregledom cjeline + vodoravni izbornik Lessons na mobitelu.
# Pokreni u mapi projekta:  python3 zakrpa.py
import sys, io

def zamijeni(s, staro, novo, ime):
    n = s.count(staro)
    if n != 1:
        sys.exit('GRESKA: "%s" nadjeno %d puta' % (ime, n))
    return s.replace(staro, novo)

p = 'index.html'
s = io.open(p, encoding='utf-8').read()
if 'pregledCjeline' in s:
    sys.exit('Zakrpa je vec primijenjena.')

# 1) skripta s tekstovima
s = zamijeni(s, '<script src="rjecnik.js"></script>\n',
             '<script src="rjecnik.js"></script>\n<script src="pregledi.js"></script>\n', 'script tag')

# 2) CSS
CSS = r'''
  /* ================= PREGLED CJELINE =================
     Klik na cjelinu u Lessons prvo otvara kratak pregled (tekstovi u pregledi.js):
     dvije stranice koje se listaju, gumb Start uvijek dolje. Na mobitelu je to
     donji list, na većem ekranu prozor na sredini. Obje stranice leže u istoj
     traci, pa je prozor visok koliko viša od njih i ne skače pri listanju. */
  #pregledSloj {
    position: fixed; inset: 0; z-index: 900; background: rgba(25,23,19,.42);
    display: flex; align-items: center; justify-content: center; padding: 1rem;
    animation: pregledSjena .18s ease;
  }
  @keyframes pregledSjena { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pregledGore { from { transform: translateY(100%); } to { transform: none; } }
  .pregled {
    background: var(--card); border-radius: var(--rad-xl); width: 100%; max-width: 27.5rem;
    max-height: 88vh; display: flex; flex-direction: column; overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,.25); animation: popIn .25s ease;
  }
  .pregledGlava { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem 0; }
  .pregledVrsta { font-size: var(--t-xs); font-weight: 700; text-transform: uppercase; letter-spacing: .07em; }
  .pregledX {
    border: 0; background: none; color: var(--muted); font-size: 1.5rem; line-height: 1;
    cursor: pointer; padding: 0.25rem 0.375rem; margin-right: -0.375rem; font-family: inherit;
  }
  .pregledX:hover { color: var(--ink); }
  .pregledOkvir { overflow: hidden; flex: 1 1 auto; min-height: 0; }
  .pregledTrak { display: flex; align-items: stretch; transition: transform .3s cubic-bezier(.22,1,.36,1); touch-action: pan-y; }
  .pregledStr { flex: 0 0 100%; min-width: 0; padding: 0.625rem 1.5rem 0.5rem; overflow-y: auto; }
  .pregledStr h2 { font-size: var(--t-2xl); line-height: 1.2; margin: 0 0 0.625rem; }
  .pregledPod { color: var(--muted); font-size: var(--t-m); margin: 0 0 0.25rem; }
  .pregledPr { margin: 0 0 0.25rem; font-size: var(--t-m); }
  .pregledPr i { font-weight: 600; color: var(--ink); }
  .pregledPr span { color: var(--muted); }
  .pregledMeta { margin-top: 0.875rem; font-size: var(--t-xs); color: var(--muted); }
  .pregledTab { border-collapse: collapse; width: 100%; font-size: var(--t-m); margin-bottom: 0.625rem; }
  .pregledTab td { padding: 0.3125rem 0.75rem 0.3125rem 0; border-bottom: 1px solid var(--tiho); vertical-align: top; }
  .pregledTab td:first-child { font-weight: 600; font-style: italic; }
  .pregledTab td.jr { white-space: nowrap; }
  .pregledTab td:last-child { color: var(--muted); padding-right: 0; }
  .pregledMreza { border-collapse: collapse; width: 100%; font-size: var(--t-m); margin-bottom: 0.625rem; table-layout: fixed; }
  .pregledMreza td { text-align: center; padding: 0.3125rem 0.25rem; border-bottom: 1px solid var(--tiho); font-weight: 600; font-style: italic; }
  .pregledMreza tr.gl td { color: var(--muted); font-style: normal; font-size: var(--t-s); }
  .pregledRijeci { margin: 0 0 0.375rem; font-size: var(--t-m); line-height: 1.55; }
  .pregledRijeci b { font-weight: 600; }
  .pregledRijeci span { color: var(--muted); }
  .pregledNoga { padding: 0.5rem 1.5rem 1.25rem; }
  .pregledTocke { display: flex; justify-content: center; align-items: center; gap: 0.25rem; margin-bottom: 0.25rem; }
  .pregledTocke button {
    border: 0; background: none; cursor: pointer; padding: 0.375rem; line-height: 0; font-family: inherit;
  }
  .pregledTocke button i { display: block; width: 0.4375rem; height: 0.4375rem; border-radius: 50%; background: var(--rub); }
  .pregledTocke button.na i { background: var(--ink); }
  .pregledTocke .str { color: var(--muted); font-size: 1.125rem; padding: 0.125rem 0.5rem; line-height: 1; }
  .pregledTocke .str:disabled { visibility: hidden; }
  .pregled button.gumb.pregledStart {
    margin-top: 0.25rem; background: var(--zelena); display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .pregledStart svg { width: 0.9em; height: 0.9em; fill: currentColor; }
  @media (max-width: 639.98px) {
    #pregledSloj { align-items: flex-end; padding: 0; }
    .pregled {
      max-width: none; border-radius: var(--rad-xl) var(--rad-xl) 0 0; max-height: 90dvh;
      animation: pregledGore .28s cubic-bezier(.22,1,.36,1);
    }
    .pregled::before {
      content: ""; display: block; width: 2.25rem; height: 4px; border-radius: 2px;
      background: var(--rub); margin: 0.5rem auto 0;
    }
    .pregledGlava { padding-top: 0.5rem; }
    .pregledTocke .str { display: none; }
    .pregledNoga { padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px)); }
  }
  @media (prefers-reduced-motion: reduce) {
    #pregledSloj, .pregled { animation: none; }
    .pregledTrak { transition: none; }
  }

  /* ---- Lessons na mobitelu: razine idu vodoravno ----
     Retci su vrste (Lesson … Test), stupci razine; prstom se lista ulijevo-udesno.
     Stupac s imenima vrsta stoji na mjestu. */
  .mrezaVod { overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x proximity;
    margin-right: -1rem; padding: 0 1rem 0.5rem 0; scrollbar-width: none; }
  .mrezaVod::-webkit-scrollbar { display: none; }
  table.mreza.vod { width: max-content; table-layout: auto; border-spacing: 0.375rem 0.375rem; }
  table.mreza.vod th.razV {
    font-family: var(--naslov); font-weight: 700; font-size: var(--t-s); color: var(--muted);
    text-align: center; padding: 0 0 0.125rem; scroll-snap-align: start;
  }
  table.mreza.vod th.razV.sad { color: var(--ink); }
  table.mreza.vod th.vrstaV {
    position: sticky; left: 0; z-index: 2; background: var(--bg);
    text-align: left; font-size: var(--t-xs); font-weight: 700; padding: 0 0.375rem 0 0; width: 3.75rem;
    box-shadow: 0.375rem 0 0 var(--bg);
  }
  table.mreza.vod th.kutV { position: sticky; left: 0; z-index: 3; background: var(--bg); }
  table.mreza.vod td.faza { width: 3.5rem; min-width: 3.5rem; height: 2.75rem; padding: 0.625rem 0.375rem; }
'''
s = zamijeni(s, '\n</style>', CSS + '</style>', 'kraj stila')

# 3) klik na cjelinu otvara pregled
s = zamijeni(s,
  "'onclick=\"idi(\\'unit\\',\\'' + tip + '\\'," + "' + r + ')\">' +\n          '<div class=\"imeF\">'",
  "'onclick=\"pregledCjeline(\\'' + tip + '\\'," + "' + r + ')\">' +\n          '<div class=\"imeF\">'",
  'onclick cjeline')

# 4) mobitel: ista mreža, okrenuta (retci = vrste, stupci = razine)
s = zamijeni(s,
  "    var html = '<h1 class=\"sekcija\">Lessons</h1>' + (nulaIspod ? '' : plocicaNulaHtml()) +\n      '<div class=\"mrezaOkvir\"><table class=\"mreza\"><thead><tr><th class=\"razF\"></th>';",
  "    if (lessonsMobitel()) { renderLessonsVodoravno(vv, sljedecaZ, zadnjiRedak, nulaIspod); return; }\n" +
  "    var html = '<h1 class=\"sekcija\">Lessons</h1>' + (nulaIspod ? '' : plocicaNulaHtml()) +\n      '<div class=\"mrezaOkvir\"><table class=\"mreza\"><thead><tr><th class=\"razF\"></th>';",
  'grananje mobitel')

JS = r'''
  // ---- Lessons na mobitelu: razine vodoravno ----
  // Ista pravila kao mreža iznad (što je vidljivo, zaključano, pretplata), samo
  // okrenuto: retci su vrste, stupci razine, a lista se prstom ulijevo-udesno.
  var MQ_LESSONS = window.matchMedia ? window.matchMedia('(max-width: 639.98px)') : null;
  function lessonsMobitel() { return !!(MQ_LESSONS && MQ_LESSONS.matches); }
  if (MQ_LESSONS) {
    var naPromjenuLessons = function () {
      if (ZADNJI_VIEW && ZADNJI_VIEW.view === 'lessons' && VIEW && VIEW.querySelector('.mreza')) renderLessons();
    };
    if (MQ_LESSONS.addEventListener) MQ_LESSONS.addEventListener('change', naPromjenuLessons);
    else if (MQ_LESSONS.addListener) MQ_LESSONS.addListener(naPromjenuLessons);
  }

  function celijaLessons(tip, r, t, vv, sljedecaZ, trake) {
    var igre = igreCjeline(tip, r);
    var otklj = igre.length > 0 && otkljucano(tip, r);
    if (!otklj && sljedecaZ[tip] !== r) return '<td class="faza skriven"></td>';
    var id = 'trF' + r + '_' + t;
    if (!otklj) {
      var val = VALUTA_TIPA[tip], pct;
      if (val) {
        var p = prag(tip, r);
        pct = p > 0 ? Math.min(1, vv[val] / p) : 0;
      } else {
        var n = 0;
        TIPOVI.slice(0, 4).forEach(function (t2) { if (otkljucano(t2, r)) n++; });
        pct = n / 4;
      }
      trake.push({ id: id, pct: pct, luk: true });
      return '<td class="faza zakljucano" title="' + esc(tip + ' ' + r + ' — locked') + '">' +
        '<div class="lukOkvir"><svg class="lukZ" viewBox="0 0 36 36" aria-hidden="true">' +
          '<circle class="podloga" cx="18" cy="18" r="15" pathLength="100"/>' +
          '<circle class="puni" id="' + id + '" cx="18" cy="18" r="15" pathLength="100"/></svg>' +
          '<span class="lukBrava">' + IK('brava') + '</span></div></td>';
    }
    var maks = maksCjeline(tip, r), osv = osvojenoCjeline(tip, r);
    var pun = (maks > 0 && osv >= maks);
    var trebaPretplatu = r >= 2 && imaPristup(tip, r) === 'needsSubscription';
    trake.push({ id: id, pct: maks > 0 ? Math.min(1, osv / maks) : 0 });
    return '<td class="faza' + (pun ? ' gotovo' : '') + (trebaPretplatu ? ' pretplata' : '') + '" title="' +
        esc(tip + ' ' + r + (trebaPretplatu ? ' — needs Croland Plus' : (pun ? ' — complete' : ''))) + '" ' +
      'onclick="pregledCjeline(\'' + tip + '\',' + r + ')">' +
      '<div class="tr"><i id="' + id + '"></i></div>' +
      (trebaPretplatu ? '<div class="plusF">' + IK('brava', 'uz') + 'Plus</div>' : '') +
      '</td>';
  }

  function renderLessonsVodoravno(vv, sljedecaZ, zadnjiRedak, nulaIspod) {
    var sad = prvaNedovrsenaLekcija();
    var trake = [];
    var html = '<h1 class="sekcija">Lessons</h1>' + (nulaIspod ? '' : plocicaNulaHtml()) +
      '<div class="mrezaOkvir mrezaVod"><table class="mreza vod"><thead><tr><th class="kutV"></th>';
    for (var r = 1; r <= zadnjiRedak; r++) {
      html += '<th class="razV' + (r === sad ? ' sad' : '') + '" data-r="' + r + '">' + r + '</th>';
    }
    html += '</tr></thead><tbody>';
    TIPOVI.forEach(function (tip, t) {
      html += '<tr><th class="vrstaV" style="color:' + BOJA_TIPA[tip] + '">' + KRATKO_TIPA[tip] + '</th>';
      for (var r2 = 1; r2 <= zadnjiRedak; r2++) html += celijaLessons(tip, r2, t, vv, sljedecaZ, trake);
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    if (nulaIspod) html += plocicaNulaHtml();
    VIEW.innerHTML = html;
    // Stupac s vrstama stoji na mjestu, pa se razine lijepe tik uz njega (scroll-padding).
    // Trenutna razina dolazi u pogled samo ako je iza desnog ruba.
    var okvir = VIEW.querySelector('.mrezaVod');
    var prvi = VIEW.querySelector('th.razV');
    if (okvir && prvi) {
      okvir.style.scrollPaddingLeft = prvi.offsetLeft + 'px';
      var th = VIEW.querySelector('th.razV[data-r="' + sad + '"]');
      if (th && th.offsetLeft + th.offsetWidth > okvir.clientWidth) okvir.scrollLeft = th.offsetLeft - prvi.offsetLeft;
    }
    animirajTrake(trake);
  }

  // ================= PREGLED CJELINE =================
  // Prozor prije ulaska u cjelinu: stranica 1 kaže o čemu je riječ, stranica 2
  // drži ono što je korisno imati pri ruci. Tekstovi su u pregledi.js; cjelina bez
  // teksta ide ravno unutra, kao i prije.
  var PREGLED = null;
  function pregledCjeline(tip, r) {
    var P = window.PREGLEDI && window.PREGLEDI[tip + ' ' + r];
    if (!P) { idi('unit', tip, r); return; }
    zatvoriPregled();
    var igre = igreCjeline(tip, r);
    var meta = '';
    if (igre.length) {
      if (tip === 'Test') {
        meta = igre.length + ' parts · ' + testPrag(igre) + '% to pass · ' + Math.round(testTrajanje(igre) / 60) + ' min';
      } else {
        meta = igre.length + ' steps';
      }
    }
    function pr(par) { return '<p class="pregledPr"><i>' + esc(par[0]) + '</i> <span>' + esc(par[1]) + '</span></p>'; }
    var s1 = '<h2>' + esc(P.h) + '</h2>' +
      (P.s ? '<p class="pregledPod">' + esc(P.s) + '</p>' : '') +
      (P.ex || []).map(pr).join('') +
      (meta ? '<div class="pregledMeta">' + meta + '</div>' : '');
    var s2 = (P.p2 || []).map(function (b) {
      if (b.t) return '<table class="pregledTab">' + b.t.map(function (x) {
        // kratak hrvatski ostaje u jednom retku, prelama se prijevod
        return '<tr><td' + (x[0].length <= 16 ? ' class="jr"' : '') + '>' + esc(x[0]) + '</td><td>' + esc(x[1]) + '</td></tr>';
      }).join('') + '</table>';
      if (b.g) {
        var gl = b.gh || [0];
        return '<table class="pregledMreza">' + b.g.map(function (red, i) {
          return '<tr' + (gl.indexOf(i) >= 0 ? ' class="gl"' : '') + '>' +
            red.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</table>';
      }
      if (b.w) return '<p class="pregledRijeci">' + b.w.map(function (x) {
        return '<b>' + esc(x[0]) + '</b> <span>' + esc(x[1]) + '</span>';
      }).join(' · ') + '</p>';
      return '';
    }).join('');
    var sloj = document.createElement('div');
    sloj.id = 'pregledSloj';
    sloj.innerHTML =
      '<div class="pregled" role="dialog" aria-modal="true" aria-label="' + esc(tip + ' ' + r) + '">' +
        '<div class="pregledGlava"><span class="pregledVrsta" style="color:' + BOJA_TIPA[tip] + '">' + esc(tip + ' ' + r) + '</span>' +
        '<button class="pregledX" aria-label="Close">×</button></div>' +
        '<div class="pregledOkvir"><div class="pregledTrak">' +
          '<div class="pregledStr">' + s1 + '</div><div class="pregledStr">' + s2 + '</div>' +
        '</div></div>' +
        '<div class="pregledNoga">' +
          '<div class="pregledTocke"><button class="str" data-k="-1" aria-label="Previous">‹</button>' +
          '<button class="tocka na" data-s="0" aria-label="Page 1"><i></i></button>' +
          '<button class="tocka" data-s="1" aria-label="Page 2"><i></i></button>' +
          '<button class="str" data-k="1" aria-label="Next">›</button></div>' +
          '<button class="gumb pregledStart"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>Start</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(sloj);
    PREGLED = { tip: tip, r: r, str: 0, sloj: sloj };
    var trak = sloj.querySelector('.pregledTrak');
    pregledNaStranicu(0);
    sloj.addEventListener('click', function (e) {
      if (e.target === sloj || e.target.closest('.pregledX')) { zatvoriPregled(); return; }
      var b = e.target.closest('.pregledTocke button');
      if (b) {
        if (b.hasAttribute('data-s')) pregledNaStranicu(+b.getAttribute('data-s'));
        else pregledNaStranicu(PREGLED.str + (+b.getAttribute('data-k')));
        return;
      }
      if (e.target.closest('.pregledStart')) {
        var cilj = PREGLED; zatvoriPregled(); idi('unit', cilj.tip, cilj.r);
      }
    });
    // povlačenje prstom (ili mišem) lijevo-desno lista stranice
    var x0 = null, y0 = 0;
    trak.addEventListener('pointerdown', function (e) { x0 = e.clientX; y0 = e.clientY; });
    trak.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) pregledNaStranicu(PREGLED.str + (dx < 0 ? 1 : -1));
    });
    trak.addEventListener('pointercancel', function () { x0 = null; });
  }
  function pregledNaStranicu(n) {
    if (!PREGLED) return;
    n = Math.max(0, Math.min(1, n));
    PREGLED.str = n;
    var sl = PREGLED.sloj;
    sl.querySelector('.pregledTrak').style.transform = 'translateX(' + (-100 * n) + '%)';
    sl.querySelectorAll('.pregledTocke .tocka').forEach(function (b, i) { b.classList.toggle('na', i === n); });
    sl.querySelector('.pregledTocke .str[data-k="-1"]').disabled = (n === 0);
    sl.querySelector('.pregledTocke .str[data-k="1"]').disabled = (n === 1);
  }
  function zatvoriPregled() {
    var z = $('pregledSloj'); if (z) z.remove();
    PREGLED = null;
  }
  document.addEventListener('keydown', function (e) {
    if (!PREGLED) return;
    if (e.key === 'Escape') { zatvoriPregled(); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { pregledNaStranicu(1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { pregledNaStranicu(0); e.preventDefault(); }
    else if (e.key === 'Enter' && !(e.target && e.target.closest && e.target.closest('.pregledTocke, .pregledX'))) {
      var cilj = PREGLED; zatvoriPregled(); idi('unit', cilj.tip, cilj.r); e.preventDefault();
    }
  });
  window.pregledCjeline = pregledCjeline;

  // redak prve nedovršene lekcije dovodi u pogled samo ako je ispod ruba ekrana'''
s = zamijeni(s, "\n  // redak prve nedovršene lekcije dovodi u pogled samo ako je ispod ruba ekrana", JS, 'mjesto za JS')

# 5) svaka navigacija zatvara pregled (npr. gumb natrag, izbornik)
s = zamijeni(s, "    ZADNJI_VIEW = { view: view, arg1: arg1, arg2: arg2, arg3: arg3 };\n    oznaciNav(view);",
             "    ZADNJI_VIEW = { view: view, arg1: arg1, arg2: arg2, arg3: arg3 };\n    if (PREGLED) zatvoriPregled();\n    oznaciNav(view);", 'idi zatvara')

io.open(p, 'w', encoding='utf-8', newline='').write(s)

# 6) build: pregledi.js ide i u dist/
b = 'scripts/build.js'
t = io.open(b, encoding='utf-8').read()
if "'pregledi.js'" not in t:
    t = zamijeni(t, "const FILES = ['index.html', 'rjecnik.js',", "const FILES = ['index.html', 'rjecnik.js', 'pregledi.js',", 'build FILES')
    io.open(b, 'w', encoding='utf-8', newline='').write(t)
print('OK')
