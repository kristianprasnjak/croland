# Zakrpa 2: novi izgled izbornika Lessons na mobitelu i prozora s pregledom.
# Ide preko zakrpe 1 (zakrpa-pregled.py). Pokreni u mapi projekta:  python3 _radno/zakrpa2-izgled.py
import sys, io

p = 'index.html'
s = io.open(p, encoding='utf-8').read()
if 'pregledCjeline' not in s:
    sys.exit('Prvo treba zakrpa 1 (zakrpa-pregled.py).')
if 'jedinicaKart' in s:
    sys.exit('Zakrpa 2 je vec primijenjena.')

def izmedju(s, poc, kraj, novo, ime):
    i = s.find(poc)
    if i < 0 or s.find(poc, i + 1) >= 0: sys.exit('GRESKA: pocetak "%s"' % ime)
    j = s.find(kraj, i)
    if j < 0: sys.exit('GRESKA: kraj "%s"' % ime)
    return s[:i] + novo + s[j:]

# ------------------------------------------------------------------ CSS
CSS = r'''
  /* ================= PREGLED CJELINE =================
     Klik na cjelinu prvo otvara kratak pregled (tekstovi u pregledi.js).
     Gore traka u boji vrste s naslovom, ispod dvije kartice (Overview / Cheat sheet)
     koje se listaju prstom ili dodirom na karticu, a Start je uvijek na dnu.
     Na mobitelu je to donji list, na većem ekranu prozor na sredini. Obje stranice
     leže u istoj traci, pa je prozor visok koliko viša i ne skače pri listanju. */
  #pregledSloj {
    position: fixed; inset: 0; z-index: 900; background: rgba(25,23,19,.45);
    display: flex; align-items: center; justify-content: center; padding: 1rem;
    animation: pregledSjena .18s ease;
  }
  @keyframes pregledSjena { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pregledGore { from { transform: translateY(100%); } to { transform: none; } }
  .pregled {
    --boja: var(--plava);
    --tint: var(--tiho);
    --tint: color-mix(in srgb, var(--boja) 11%, var(--card));
    --tintJaki: color-mix(in srgb, var(--boja) 22%, var(--card));
    background: var(--card); border-radius: var(--rad-xl); width: 100%; max-width: 27.5rem;
    max-height: 88vh; display: flex; flex-direction: column; overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,.28); animation: popIn .25s ease;
  }
  .pregledVrh { background: var(--tint); padding: 1rem 1.25rem 1rem; position: relative; }
  .pregledRed1 { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
  .pregledVrsta {
    display: inline-flex; align-items: center; gap: 0.375rem;
    font-size: var(--t-xs); font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--boja);
  }
  .pregledVrsta i { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--boja); }
  .pregledX {
    border: 0; background: var(--card); color: var(--muted); width: 2rem; height: 2rem; border-radius: 50%;
    font-size: 1.25rem; line-height: 1; cursor: pointer; font-family: inherit; flex: none;
    display: flex; align-items: center; justify-content: center;
  }
  .pregledX:hover { color: var(--ink); }
  .pregledVrh h2 { font-size: var(--t-2xl); line-height: 1.2; margin: 0.375rem 0 0.5rem; }
  .pregledCipovi { display: flex; flex-wrap: wrap; gap: 0.375rem; }
  .pregledCip {
    display: inline-flex; align-items: center; gap: 0.3125rem; background: var(--card);
    border-radius: 999px; padding: 0.1875rem 0.625rem; font-size: var(--t-xs); color: var(--muted); font-weight: 600;
  }
  .pregledCip .ikn { width: 0.9em; height: 0.9em; }
  .pregledCip.gotov { color: var(--zelena); }
  .pregledKartice { display: flex; gap: 0.25rem; margin: 0.875rem 1.25rem 0; padding: 0.1875rem; background: var(--tiho); border-radius: 999px; }
  .pregledKartice button {
    flex: 1; border: 0; background: none; border-radius: 999px; padding: 0.4375rem 0.5rem; cursor: pointer;
    font-family: inherit; font-size: var(--t-s); font-weight: 600; color: var(--muted);
    transition: background .2s, color .2s;
  }
  .pregledKartice button.na { background: var(--card); color: var(--ink); box-shadow: 0 1px 3px rgba(0,0,0,.12); }
  .pregledOkvir { overflow: hidden; flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }
  .pregledTrak { flex: 1 1 auto; min-height: 0; display: flex; align-items: stretch; transition: transform .3s cubic-bezier(.22,1,.36,1); touch-action: pan-y; }
  .pregledStr { flex: 0 0 100%; min-width: 0; padding: 0.875rem 1.25rem 0.25rem; overflow-y: auto; }
  .pregledPod { color: var(--muted); font-size: var(--t-m); margin: 0 0 0.75rem; }
  .pregledPr {
    border-left: 3px solid var(--boja); background: var(--tint); border-radius: 0 var(--rad-s) var(--rad-s) 0;
    padding: 0.5rem 0.75rem; margin: 0 0 0.5rem;
  }
  .pregledPr b { display: block; font-weight: 700; font-size: var(--t-l); line-height: 1.35; }
  .pregledPr span { display: block; color: var(--muted); font-size: var(--t-s); line-height: 1.35; }
  .pregledParovi { margin: 0 0 0.75rem; }
  .pregledPar {
    display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 0.75rem; row-gap: 0;
    padding: 0.4375rem 0; border-bottom: 1px solid var(--tiho);
  }
  .pregledPar:last-child { border-bottom: 0; }
  .pregledPar b { font-weight: 700; flex: 0 1 auto; min-width: 45%; }
  .pregledPar span { color: var(--muted); font-size: var(--t-s); flex: 1 1 auto; }
  .pregledMreza {
    border-collapse: separate; border-spacing: 0; width: 100%; table-layout: fixed;
    margin: 0 0 0.75rem; border-radius: var(--rad-m); overflow: hidden; background: var(--tiho);
  }
  .pregledMreza td { text-align: center; padding: 0.4375rem 0.25rem; font-weight: 700; font-size: var(--t-m); }
  .pregledMreza tr + tr td { border-top: 1px solid var(--card); }
  .pregledMreza tr.gl td { background: var(--tint); color: var(--boja); font-weight: 600; font-size: var(--t-s); }
  .pregledRijeci { display: flex; flex-wrap: wrap; gap: 0.375rem; margin: 0 0 0.75rem; }
  .pregledRijec {
    display: inline-flex; align-items: baseline; gap: 0.3125rem; border: 1px solid var(--rub);
    border-radius: 999px; padding: 0.25rem 0.6875rem; font-size: var(--t-s); background: var(--card);
  }
  .pregledRijec b { font-weight: 700; }
  .pregledRijec span { color: var(--muted); }
  .pregledNoga { padding: 0.5rem 1.25rem 1.25rem; }
  .pregled button.gumb.pregledStart {
    margin-top: 0; background: var(--boja); display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    min-height: 3rem; border-radius: var(--rad-l); font-size: var(--t-l);
  }
  .pregledStart svg { width: 0.85em; height: 0.85em; fill: currentColor; }
  @media (max-width: 639.98px) {
    #pregledSloj { align-items: flex-end; padding: 0; }
    .pregled {
      max-width: none; border-radius: 1.375rem 1.375rem 0 0; max-height: 92dvh;
      animation: pregledGore .3s cubic-bezier(.22,1,.36,1);
    }
    .pregledVrh { padding-top: 1.25rem; }
    .pregledVrh::before {
      content: ""; position: absolute; left: 50%; top: 0.4375rem; width: 2.25rem; height: 4px;
      margin-left: -1.125rem; border-radius: 2px; background: var(--tintJaki);
    }
    .pregledNoga { padding-bottom: calc(0.875rem + env(safe-area-inset-bottom, 0px)); }
    /* osnovni font na mobitelu je velik, pa je list gušći nego prozor na računalu */
    .pregledVrh { padding: 1.125rem 1rem 0.75rem; }
    .pregledVrh h2 { font-size: var(--t-xl); }
    .pregledX { width: 1.75rem; height: 1.75rem; font-size: 1.1rem; }
    .pregledKartice { margin: 0.625rem 1rem 0; }
    .pregledKartice button { padding: 0.3125rem 0.5rem; font-size: var(--t-xs); }
    .pregledStr { padding: 0.625rem 1rem 0.125rem; }
    .pregledPr { padding: 0.375rem 0.625rem; margin-bottom: 0.375rem; }
    .pregledPr b { font-size: var(--t-m); }
    .pregledPar { padding: 0.3125rem 0; font-size: var(--t-m); }
    .pregledMreza td { padding: 0.3125rem 0.25rem; font-size: var(--t-s); }
    .pregledRijec { padding: 0.1875rem 0.5625rem; font-size: var(--t-xs); }
    .pregledNoga { padding-left: 1rem; padding-right: 1rem; padding-top: 0.375rem; }
    .pregled button.gumb.pregledStart { min-height: 2.75rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    #pregledSloj, .pregled { animation: none; }
    .pregledTrak, .jedinice { transition: none; scroll-behavior: auto; }
  }

  /* ---- Lessons na mobitelu: jedna kartica po razini, listaju se vodoravno ----
     Gore traka s brojevima razina (skok na razinu), ispod kartice: naslov razine i
     pet redaka (Lesson … Test) s trakom napretka. Sljedeća kartica viri s desna. */
  .razineTraka {
    display: flex; gap: 0.375rem; overflow-x: auto; scrollbar-width: none;
    margin: 0 -1rem 0.75rem; padding: 0.125rem 1rem; scroll-padding: 0 1rem;
  }
  .razineTraka::-webkit-scrollbar { display: none; }
  .razineTraka button {
    flex: none; min-width: 2.25rem; height: 2.25rem; border-radius: 999px; border: 1px solid var(--rub);
    background: var(--card); color: var(--muted); font-family: var(--naslov); font-weight: 700;
    font-size: var(--t-s); cursor: pointer; padding: 0 0.5rem;
  }
  .razineTraka button.gotova { color: var(--zelena); border-color: var(--zelena); }
  .razineTraka button.zakljucana { background: var(--tiho); border-style: dashed; }
  .razineTraka button.na { background: var(--ink); color: var(--card); border-color: var(--ink); }
  .jedinice {
    display: flex; gap: 0.75rem; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
    margin: 0 -1rem; padding: 0.25rem 1rem 1rem; scroll-padding: 0 1rem; overscroll-behavior-x: contain;
    scroll-behavior: smooth;
  }
  .jedinice::-webkit-scrollbar { display: none; }
  .jedinicaKart {
    flex: 0 0 calc(100% - 2.5rem); min-width: 0; scroll-snap-align: start; background: var(--card);
    border: 1px solid var(--rub); border-radius: var(--rad-xl); padding: 0.875rem 0.75rem 0.375rem;
    box-shadow: 0 2px 10px rgba(25,23,19,.05);
  }
  .jedinicaGlava { padding: 0 0.25rem 0.625rem; }
  .jedinicaBroj { font-size: var(--t-xs); font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .07em; }
  .jedinicaNaslov { font-family: var(--naslov); font-weight: 700; font-size: var(--t-xl); line-height: 1.25; margin-top: 0.125rem; }
  .jedinicaPostotak { height: 0.25rem; border-radius: 2px; background: var(--tiho); margin-top: 0.625rem; overflow: hidden; }
  .jedinicaPostotak i { display: block; height: 100%; background: var(--zelena); border-radius: 2px; }
  .fazaRed {
    --boja: var(--plava);
    display: flex; align-items: center; gap: 0.625rem; width: 100%; min-height: 3.5rem;
    border: 0; border-top: 1px solid var(--tiho); background: none; padding: 0.5rem 0.25rem;
    font-family: inherit; color: var(--ink); text-align: left; cursor: pointer;
  }
  .fazaRed:active { background: var(--tiho); }
  .fazaZnak {
    flex: none; width: 2.25rem; height: 2.25rem; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center;
    background: var(--tiho);
    background: color-mix(in srgb, var(--boja) 14%, var(--card));
    color: var(--boja); font-weight: 800; font-size: var(--t-s); font-family: var(--naslov);
  }
  .fazaZnak .ikn { width: 1.05rem; height: 1.05rem; }
  .fazaTekst { flex: 1; min-width: 0; }
  .fazaIme { display: block; font-weight: 600; font-size: var(--t-m); }
  .fazaPod { display: block; font-size: var(--t-xs); color: var(--muted); line-height: 1.3; }
  .fazaTr { display: block; height: 0.3125rem; border-radius: 3px; background: var(--tiho); margin-top: 0.3125rem; overflow: hidden; }
  .fazaTr i { display: block; height: 100%; width: 0; background: var(--boja); border-radius: 3px; transition: width .7s cubic-bezier(.22,1,.36,1); }
  .fazaDesno { flex: none; font-size: var(--t-xs); font-weight: 700; color: var(--muted); text-align: right; }
  .fazaDesno:empty { display: none; }
  .fazaDesno .ikn { width: 1.1rem; height: 1.1rem; }
  .fazaRed.gotovo .fazaZnak { background: var(--zelena); color: #fff; }
  .fazaRed.gotovo .fazaDesno { color: var(--zelena); }
  .fazaRed.zakljucano { cursor: default; color: var(--muted); }
  .fazaRed.zakljucano .fazaZnak { background: var(--tiho); color: var(--muted); }
  .fazaRed.zakljucano .fazaTr i { background: var(--zlatna); }
  .fazaRed.zakljucano:active { background: none; }
  .fazaRed.pretplata .fazaDesno { color: var(--zlatna); }
'''
s = izmedju(s, '\n  /* ================= PREGLED CJELINE =================', '</style>', CSS, 'CSS')

# ------------------------------------------------------------------ JS
JS = r'''  // ---- Lessons na mobitelu: jedna kartica po razini ----
  // Ista pravila kao mreža na većem ekranu (što je otključano, sljedeća zaključana,
  // pretplata), ali razina je kartica s pet redaka, a kartice se listaju vodoravno.
  var MQ_LESSONS = window.matchMedia ? window.matchMedia('(max-width: 639.98px)') : null;
  function lessonsMobitel() { return !!(MQ_LESSONS && MQ_LESSONS.matches); }
  if (MQ_LESSONS) {
    var naPromjenuLessons = function () {
      if (ZADNJI_VIEW && ZADNJI_VIEW.view === 'lessons' && VIEW && VIEW.querySelector('.mreza, .jedinice')) renderLessons();
    };
    if (MQ_LESSONS.addEventListener) MQ_LESSONS.addEventListener('change', naPromjenuLessons);
    else if (MQ_LESSONS.addListener) MQ_LESSONS.addListener(naPromjenuLessons);
  }
  var IME_TIPA_DUGO = { Lesson: 'Lesson', Vocabulary: 'Vocabulary', Grammar: 'Grammar', Practice: 'Practice', Test: 'Test' };
  var ZNAK_TIPA = { Lesson: 'L', Vocabulary: 'V', Grammar: 'G', Practice: 'P', Test: 'T' };

  function naslovRazine(r) {
    var g = igreCjeline('Lesson', r)[0];
    var n = g && g.cjelinaNaslov ? String(g.cjelinaNaslov) : '';
    if (n) return n.split(':')[0].trim();
    var P = window.PREGLEDI && window.PREGLEDI['Lesson ' + r];
    return P ? P.h : ('Level ' + r);
  }

  function redLessons(tip, r, vv, sljedecaZ, trake) {
    var igre = igreCjeline(tip, r);
    var otklj = igre.length > 0 && otkljucano(tip, r);
    var P = window.PREGLEDI && window.PREGLEDI[tip + ' ' + r];
    var pod = P ? P.h : '';
    var id = 'trM' + r + '_' + TIPOVI.indexOf(tip);
    var boja = 'style="--boja:' + BOJA_TIPA[tip] + '"';
    if (!otklj) {
      var pct = 0, vidljivPostotak = (sljedecaZ[tip] === r);
      if (vidljivPostotak) {
        var val = VALUTA_TIPA[tip];
        if (val) { var p = prag(tip, r); pct = p > 0 ? Math.min(1, vv[val] / p) : 0; }
        else { var n = 0; TIPOVI.slice(0, 4).forEach(function (t2) { if (otkljucano(t2, r)) n++; }); pct = n / 4; }
        trake.push({ id: id, pct: pct });
      }
      return '<div class="fazaRed zakljucano" ' + boja + ' title="' + esc(tip + ' ' + r + ' — locked') + '">' +
        '<span class="fazaZnak">' + IK('brava') + '</span>' +
        '<span class="fazaTekst"><span class="fazaIme">' + IME_TIPA_DUGO[tip] + '</span>' +
          (vidljivPostotak ? '<span class="fazaTr"><i id="' + id + '"></i></span>' : '<span class="fazaPod">Locked</span>') +
        '</span>' +
        '<span class="fazaDesno">' + (vidljivPostotak ? Math.round(pct * 100) + '%' : '') + '</span></div>';
    }
    var maks = maksCjeline(tip, r), osv = osvojenoCjeline(tip, r);
    var pun = (maks > 0 && osv >= maks);
    var trebaPretplatu = r >= 2 && imaPristup(tip, r) === 'needsSubscription';
    var udio = maks > 0 ? Math.min(1, osv / maks) : 0;
    trake.push({ id: id, pct: udio });
    var desno = pun ? IK('kvaka') : (trebaPretplatu ? 'Plus' : (udio > 0 ? Math.round(udio * 100) + '%' : ''));
    return '<button class="fazaRed' + (pun ? ' gotovo' : '') + (trebaPretplatu ? ' pretplata' : '') + '" ' + boja +
        ' onclick="pregledCjeline(\'' + tip + '\',' + r + ')">' +
      '<span class="fazaZnak">' + (pun ? IK('kvaka') : ZNAK_TIPA[tip]) + '</span>' +
      '<span class="fazaTekst"><span class="fazaIme">' + IME_TIPA_DUGO[tip] + '</span>' +
        (pod ? '<span class="fazaPod">' + esc(pod) + '</span>' : '') +
        '<span class="fazaTr"><i id="' + id + '"></i></span></span>' +
      '<span class="fazaDesno">' + desno + '</span></button>';
  }

  function renderLessonsVodoravno(vv, sljedecaZ, zadnjiRedak, nulaIspod) {
    var sad = prvaNedovrsenaLekcija();
    if (sad > zadnjiRedak) sad = zadnjiRedak;
    var trake = [];
    var gumbi = '', kartice = '';
    for (var r = 1; r <= zadnjiRedak; r++) {
      var uk = 0, osv = 0, ijedna = false;
      TIPOVI.forEach(function (tip) {
        if (igreCjeline(tip, r).length && otkljucano(tip, r)) { ijedna = true; uk += maksCjeline(tip, r); osv += osvojenoCjeline(tip, r); }
      });
      var gotova = uk > 0 && osv >= uk;
      gumbi += '<button data-r="' + r + '" class="' + (gotova ? 'gotova' : '') + (ijedna ? '' : ' zakljucana') + '"' +
        ' aria-label="Level ' + r + '">' + (gotova ? '✓' : r) + '</button>';
      var redovi = '';
      TIPOVI.forEach(function (tip) {
        if (igreCjeline(tip, r).length === 0 && !(window.PREGLEDI && window.PREGLEDI[tip + ' ' + r])) return;
        redovi += redLessons(tip, r, vv, sljedecaZ, trake);
      });
      kartice += '<section class="jedinicaKart" data-r="' + r + '">' +
        '<div class="jedinicaGlava"><div class="jedinicaBroj">Level ' + r + '</div>' +
        '<div class="jedinicaNaslov">' + esc(naslovRazine(r)) + '</div>' +
        (ijedna ? '<div class="jedinicaPostotak"><i style="width:' + (uk > 0 ? Math.round(osv / uk * 100) : 0) + '%"></i></div>' : '') +
        '</div>' + redovi + '</section>';
    }
    VIEW.innerHTML = '<h1 class="sekcija">Lessons</h1>' + (nulaIspod ? '' : plocicaNulaHtml()) +
      '<div class="razineTraka">' + gumbi + '</div>' +
      '<div class="jedinice">' + kartice + '</div>' +
      (nulaIspod ? plocicaNulaHtml() : '');
    var traka = VIEW.querySelector('.razineTraka'), niz = VIEW.querySelector('.jedinice');
    var rub = parseFloat(getComputedStyle(niz).paddingLeft) || 16;
    function oznaci(r) {
      traka.querySelectorAll('button').forEach(function (b) { b.classList.toggle('na', +b.getAttribute('data-r') === r); });
      var b = traka.querySelector('button[data-r="' + r + '"]');
      if (b) {
        var l = b.offsetLeft - traka.offsetLeft, d = l + b.offsetWidth;
        if (l < traka.scrollLeft + 16 || d > traka.scrollLeft + traka.clientWidth - 16)
          traka.scrollLeft = l - traka.clientWidth / 2 + b.offsetWidth / 2;
      }
    }
    function idiNa(r, glatko) {
      var k = niz.querySelector('.jedinicaKart[data-r="' + r + '"]');
      if (!k) return;
      var prije = niz.style.scrollBehavior;
      if (!glatko) niz.style.scrollBehavior = 'auto';
      niz.scrollLeft = k.offsetLeft - niz.offsetLeft - rub;
      if (!glatko) niz.style.scrollBehavior = prije;
      oznaci(r);
    }
    traka.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (b) idiNa(+b.getAttribute('data-r'), true);
    });
    var cekaj = null;
    niz.addEventListener('scroll', function () {
      if (cekaj) cancelAnimationFrame(cekaj);
      cekaj = requestAnimationFrame(function () {
        var kart = niz.querySelectorAll('.jedinicaKart'), naj = 1, min = 1e9;
        kart.forEach(function (k) {
          var d = Math.abs(k.offsetLeft - niz.offsetLeft - rub - niz.scrollLeft);
          if (d < min) { min = d; naj = +k.getAttribute('data-r'); }
        });
        oznaci(naj);
      });
    });
    idiNa(sad, false);
    animirajTrake(trake);
  }

  // ================= PREGLED CJELINE =================
  // Prozor prije ulaska u cjelinu: Overview kaže o čemu je riječ, Cheat sheet drži
  // ono što je korisno imati pri ruci. Tekstovi su u pregledi.js; cjelina bez
  // teksta ide ravno unutra, kao i prije.
  var PREGLED = null;
  function pregledCjeline(tip, r) {
    var P = window.PREGLEDI && window.PREGLEDI[tip + ' ' + r];
    if (!P) { idi('unit', tip, r); return; }
    zatvoriPregled();
    var igre = igreCjeline(tip, r);
    var cipovi = [];
    if (igre.length) {
      cipovi.push(IK('popis') + igre.length + (tip === 'Test' ? ' parts' : ' steps'));
      if (tip === 'Test') {
        cipovi.push(IK('zastava') + testPrag(igre) + '% to pass');
        cipovi.push(IK('sat') + Math.round(testTrajanje(igre) / 60) + ' min');
      }
      var maks = maksCjeline(tip, r), osv = osvojenoCjeline(tip, r);
      if (maks > 0 && osv >= maks) cipovi.push('<span class="gotov">' + IK('kvaka') + 'Complete</span>');
      else if (osv > 0 && maks > 0) cipovi.push(Math.round(osv / maks * 100) + '% done');
    }
    var cipHtml = cipovi.map(function (c) {
      var gotov = c.indexOf('class="gotov"') >= 0;
      return '<span class="pregledCip' + (gotov ? ' gotov' : '') + '">' + c.replace(/<span class="gotov">|<\/span>$/g, '') + '</span>';
    }).join('');
    function par(x) { return '<div class="pregledPr"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }
    var s1 = (P.s ? '<p class="pregledPod">' + esc(P.s) + '</p>' : '') + (P.ex || []).map(par).join('');
    // susjedni popisi riječi slažu se u jedan, da se čipovi gušće slože
    var blokovi = [];
    (P.p2 || []).forEach(function (b) {
      var z = blokovi[blokovi.length - 1];
      if (b.w && z && z.w) z.w = z.w.concat(b.w); else blokovi.push(b.w ? { w: b.w.slice() } : b);
    });
    var s2 = blokovi.map(function (b) {
      if (b.t) return '<div class="pregledParovi">' + b.t.map(function (x) {
        return '<div class="pregledPar"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>';
      }).join('') + '</div>';
      if (b.g) {
        var gl = b.gh || [0];
        return '<table class="pregledMreza">' + b.g.map(function (red, i) {
          return '<tr' + (gl.indexOf(i) >= 0 ? ' class="gl"' : '') + '>' +
            red.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</table>';
      }
      if (b.w) return '<div class="pregledRijeci">' + b.w.map(function (x) {
        return '<span class="pregledRijec"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></span>';
      }).join('') + '</div>';
      return '';
    }).join('');
    var sloj = document.createElement('div');
    sloj.id = 'pregledSloj';
    sloj.innerHTML =
      '<div class="pregled" role="dialog" aria-modal="true" aria-label="' + esc(tip + ' ' + r) + '" style="--boja:' + BOJA_TIPA[tip] + '">' +
        '<div class="pregledVrh">' +
          '<div class="pregledRed1"><span class="pregledVrsta"><i></i>' + esc(tip + ' ' + r) + '</span>' +
          '<button class="pregledX" aria-label="Close">×</button></div>' +
          '<h2>' + esc(P.h) + '</h2>' +
          (cipHtml ? '<div class="pregledCipovi">' + cipHtml + '</div>' : '') +
        '</div>' +
        '<div class="pregledKartice" role="tablist">' +
          '<button class="na" data-s="0" role="tab">Overview</button>' +
          '<button data-s="1" role="tab">Cheat sheet</button></div>' +
        '<div class="pregledOkvir"><div class="pregledTrak">' +
          '<div class="pregledStr">' + s1 + '</div><div class="pregledStr">' + s2 + '</div>' +
        '</div></div>' +
        '<div class="pregledNoga">' +
          '<button class="gumb pregledStart"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>Start</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(sloj);
    PREGLED = { tip: tip, r: r, str: 0, sloj: sloj };
    var trak = sloj.querySelector('.pregledTrak');
    pregledNaStranicu(0);
    sloj.addEventListener('click', function (e) {
      if (e.target === sloj || e.target.closest('.pregledX')) { zatvoriPregled(); return; }
      var b = e.target.closest('.pregledKartice button');
      if (b) { pregledNaStranicu(+b.getAttribute('data-s')); return; }
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
    sl.querySelectorAll('.pregledKartice button').forEach(function (b, i) {
      b.classList.toggle('na', i === n); b.setAttribute('aria-selected', i === n ? 'true' : 'false');
    });
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
    else if (e.key === 'Enter' && !(e.target && e.target.closest && e.target.closest('.pregledKartice, .pregledX'))) {
      var cilj = PREGLED; zatvoriPregled(); idi('unit', cilj.tip, cilj.r); e.preventDefault();
    }
  });
  window.pregledCjeline = pregledCjeline;
'''
s = izmedju(s, '  // ---- Lessons na mobitelu: razine vodoravno ----', '\n  // redak prve nedovršene lekcije dovodi u pogled', JS, 'JS')

io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('OK')
