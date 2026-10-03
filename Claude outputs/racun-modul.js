  // ================= ACCOUNT =================
  // Stranica računa: unos koda, plan, kodovi, postavke, podaci. Plan i pravila su u
  // PLAN-account-i-naplata.md. Tko ima Plus i do kad odlučuje baza (moj_pristup /
  // plus_stanje); ova stranica samo prikazuje i šalje radnje edge funkcijama
  // `paddle-checkout` i `racun`.
  //
  // Stanja plana:  free → paketi + Custom
  //                pretplata → samo njezin plan (bez ponuda), Custom sklopljen
  //                kod → do kad vrijedi, paketi i Custom sklopljeni
  //                komplimentarno → poklonjeni Plus
  // Za vrijeme besplatnog razdoblja (postavke.svima_pristup_do) stranica izgleda kao
  // poslije, a pokušaj kupnje javlja do kad je pristup besplatan.

  var ACC = { paket: 'godina', vrsta: 'mjesec', n: 10, kodovi: null, darivatelji: null, javni: null };
  var ACC_IME = { tjedan: 'Weekly', mjesec: 'Monthly', godina: 'Yearly' };
  var ACC_JED = { tjedan: 'week', mjesec: 'month', godina: 'year' };
  var ACC_KOD_KLJUC = 'croland.kodZaUnos';

  function accCijene() {
    var c = POSTAVKE.cijene || {};
    return {
      tjedan: Number(c.tjedan) || 5, mjesec: Number(c.mjesec) || 10, godina: Number(c.godina) || 60,
      valuta: c.valuta || 'EUR',
      e: Number(c.popust_eksponent) || Math.log(2) / Math.log(100),
      pod: Number(c.popust_pod) || 1 / 3,
      max: Number(c.max_kodova) || 2000
    };
  }
  // Ista formula kao na serveru (_shared/lib.ts → cijenaKodova) i u cjenik.html.
  function accCijenaKodova(vrsta, n) {
    var c = accCijene();
    var faktor = Math.max(Math.pow(n, -c.e), c.pod);
    var poKodu = Math.round(c[vrsta] * faktor * 100) / 100;
    return { poKodu: poKodu, ukupno: Math.round(poKodu * n * 100) / 100, popust: Math.round((1 - faktor) * 100) };
  }
  function accNovac(x) {
    var c = accCijene();
    var cijeli = Math.abs(x - Math.round(x)) < 0.005;
    try {
      return Number(x).toLocaleString('en-IE', { style: 'currency', currency: c.valuta,
        minimumFractionDigits: cijeli ? 0 : 2, maximumFractionDigits: 2 });
    } catch (e) { return x + ' ' + c.valuta; }
  }
  function accDatum(d) {
    var t = (d instanceof Date) ? d : new Date(d);
    if (isNaN(t)) return '';
    return t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function accDodaj(od, vrsta) {
    var d = new Date(od.getTime());
    if (vrsta === 'tjedan') d.setDate(d.getDate() + 7);
    else if (vrsta === 'mjesec') {
      var dan = d.getDate();
      d.setDate(1); d.setMonth(d.getMonth() + 1);
      d.setDate(Math.min(dan, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
    }
    else d.setFullYear(d.getFullYear() + 1);
    return d;
  }
  function accBesplatnoDo() {
    return akcijaAktivna() ? new Date(Date.parse(POSTAVKE.svima_pristup_do)) : null;
  }
  function accPretplata() {
    var p = ENTITLEMENT && ENTITLEMENT.pretplata;
    return (p && ['active', 'trialing', 'past_due', 'paused'].indexOf(p.status) !== -1) ? p : null;
  }
  // Koji plan stranica prikazuje. Besplatno razdoblje se namjerno ne računa: stranica
  // tada izgleda kao Free, jer tako će izgledati kad naplata krene.
  function accStanje() {
    if (ENTITLEMENT && ENTITLEMENT.komplimentarno) return 'komplimentarno';
    if (accPretplata()) return 'pretplata';
    if (ENTITLEMENT && ENTITLEMENT.kod_do && Date.parse(ENTITLEMENT.kod_do) > Date.now()) return 'kod';
    return 'free';
  }
  function accPozoviRacun(tijelo) {
    return fetch(FUNKCIJE_URL + '/racun', {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, zaglavljaFunkcije()),
      body: JSON.stringify(tijelo)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) { j._status = r.status; return j; });
    });
  }

  // ---- modal ----
  function accModal(html, naZatvaranje) {
    var star = $('accOverlay'); if (star) star.remove();
    var ov = document.createElement('div'); ov.id = 'accOverlay';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(29,27,23,.5);z-index:100;' +
      'display:flex;align-items:center;justify-content:center;padding:16px;';
    var m = document.createElement('div'); m.className = 'otkljModal accModal';
    m.innerHTML = html;
    ov.appendChild(m);
    var zatvori = function () { ov.remove(); if (naZatvaranje) naZatvaranje(); };
    ov.onclick = function (e) { if (e.target === ov) zatvori(); };
    document.body.appendChild(ov);
    Array.prototype.forEach.call(m.querySelectorAll('[data-zatvori]'), function (b) { b.onclick = zatvori; });
    return { el: m, zatvori: zatvori };
  }
  function accPoruka(naslov, tekst) {
    accModal('<h2>' + naslov + '</h2><p class="otkljPod">' + tekst + '</p>' +
      '<div class="accGumbi"><button class="gumb" data-zatvori>OK</button></div>');
  }

  // ---- kupnja ----
  var PADDLE_UCITAN = null;   // Promise
  function accUcitajPaddle() {
    if (PADDLE_UCITAN) return PADDLE_UCITAN;
    PADDLE_UCITAN = new Promise(function (ok, ne) {
      var s = document.createElement('script');
      s.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      s.onload = function () {
        var p = POSTAVKE.paddle || {};
        try {
          if (p.okruzenje !== 'production') window.Paddle.Environment.set('sandbox');
          window.Paddle.Initialize({ token: p.client_token, eventCallback: accPaddleDogadaj });
          ok(window.Paddle);
        } catch (e) { ne(e); }
      };
      s.onerror = function () { PADDLE_UCITAN = null; ne(new Error('paddle.js')); };
      document.head.appendChild(s);
    });
    return PADDLE_UCITAN;
  }
  function accPaddleDogadaj(e) {
    if (!e || e.name !== 'checkout.completed') return;
    try { window.Paddle.Checkout.close(); } catch (x) {}
    accModal('<h2>Thank you!</h2><p class="otkljPod" id="accHvala">Payment received. Updating your account…</p>');
    // Webhook stiže za koju sekundu; pristup i kodovi se dohvaćaju dok ne stignu.
    var pokusaji = 0;
    (function pokusaj() {
      pokusaji++;
      ACC.kodovi = null;
      ucitajEntitlement(function () {
        var gotovo = accStanje() === 'pretplata' || (ENTITLEMENT && ENTITLEMENT.ima_kupnje);
        if (gotovo || pokusaji >= 8) {
          resetirajPlusSadrzaj(); ucitajPlusSadrzaj();
          var o = $('accOverlay'); if (o) o.remove();
          osvjeziHeader();
          if (ZADNJI_VIEW && ZADNJI_VIEW.view === 'account') renderAccount();
          if (!gotovo) accPoruka('Almost there', 'Your payment went through, but your account hasn\'t updated yet. ' +
            'Refresh the page in a minute.');
          return;
        }
        setTimeout(pokusaj, 2000);
      });
    })();
  }
  function accKupi(tijelo) {
    var besplatno = accBesplatnoDo();
    if (besplatno) {
      accPoruka('Access is free until ' + accDatum(besplatno),
        'Everything is unlocked for everyone until then. Plans and codes go on sale on ' + accDatum(besplatno) + '.');
      return;
    }
    if (!POSTAVKE.paddle || !POSTAVKE.paddle.client_token) {
      accPoruka('Not available yet', 'Purchases open soon. Please check back in a few days.');
      return;
    }
    accModal('<h2>Opening checkout…</h2><p class="otkljPod">Payments are handled securely by Paddle.</p>');
    fetch(FUNKCIJE_URL + '/paddle-checkout', {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, zaglavljaFunkcije()),
      body: JSON.stringify(tijelo)
    }).then(function (r) { return r.json().then(function (j) { j._status = r.status; return j; }); })
      .then(function (j) {
        if (!j.transaction_id) {
          if (j.error === 'vec-pretplacen') accPoruka('You already have a plan', 'Use “Change plan” to switch.');
          else if (j.error === 'besplatno') accPoruka('Access is free right now', 'Plans go on sale on ' + accDatum(j.do) + '.');
          else accPoruka('Not available yet', 'Purchases open soon. Please check back in a few days.');
          return;
        }
        return accUcitajPaddle().then(function (P) {
          var o = $('accOverlay'); if (o) o.remove();
          P.Checkout.open({ transactionId: j.transaction_id, customer: { email: j.email } });
        });
      })
      .catch(function () { accPoruka('Something went wrong', 'Checkout could not be opened. Please try again.'); });
  }

  // ---- kod ----
  function accPokreniKod(kod) {
    kod = String(kod || '').trim();
    var g = $('accKodGreska');
    var greska = function (t) { if (g) { g.textContent = t; g.hidden = !t; } };
    greska('');
    if (!kod) return;
    var gumb = $('accKodGumb'); if (gumb) gumb.disabled = true;
    supa.rpc('pregled_koda', { p_kod: kod }).then(function (res) {
      if (gumb) gumb.disabled = false;
      if (res.error) { greska('Codes aren\'t available yet. Please try again later.'); return; }
      var r = res.data || {};
      if (r.stanje === 'nema') return greska('We don\'t recognise this code. Codes look like CRO-XXXX-XXXX.');
      if (r.stanje === 'iskoristen') return greska('This code has already been used.');
      if (r.stanje === 'istekao') return greska('This code could only be redeemed until ' + accDatum(r.unos_do) + '.');
      if (r.stanje === 'ponisten') return greska('This code is no longer valid.');
      if (r.stanje === 'previse') return greska('Too many attempts today. Please try again tomorrow.');
      if (r.stanje !== 'ok') return greska('This code can\'t be used.');
      accDijalogKoda(r);
    });
  }
  function accDijalogKoda(r) {
    var jed = '1 ' + ACC_JED[r.vrsta];
    var p = accPretplata();
    var html;
    var odKoga = r.od_koga
      ? '<p class="accSitno">This code is from <b>' + esc(r.od_koga) + '</b>. They\'ll see your display name and points — ' +
        'you can hide this anytime in Account settings.</p>' +
        '<label class="accKvacica"><input type="checkbox" id="accVise"> Also let ' + esc(r.od_koga) +
        ' see my lessons and activity dates</label>'
      : '';
    if (p && p.auto_obnova && p.status !== 'paused' && p.vrijedi_do) {
      var stara = new Date(p.vrijedi_do), nova = accDodaj(stara, r.vrsta);
      html = '<h2>Extend your Plus by ' + jed + '?</h2>' +
        '<p class="otkljPod">Your next payment moves from <b>' + accDatum(stara) + '</b> to <b>' + accDatum(nova) +
        '</b>. Nothing else changes.</p>' + odKoga +
        '<div class="accGumbi"><button class="gumb gumbSivi" data-zatvori>Not now</button>' +
        '<button class="gumb" id="accKodDa">Extend to ' + accDatum(nova) + '</button></div>';
    } else {
      var pocetak = new Date();
      [accBesplatnoDo(), p && p.vrijedi_do ? new Date(p.vrijedi_do) : null,
       ENTITLEMENT && ENTITLEMENT.kod_do ? new Date(ENTITLEMENT.kod_do) : null].forEach(function (d) {
        if (d && d > pocetak) pocetak = d;
      });
      var kraj = accDodaj(pocetak, r.vrsta);
      var kasnije = pocetak > new Date(Date.now() + 60000);
      html = '<h2>' + (kasnije ? 'Add ' + jed + ' of Croland Plus?' : 'Activate ' + jed + ' of Croland Plus?') + '</h2>' +
        '<p class="otkljPod">' + (kasnije
          ? 'It starts on <b>' + accDatum(pocetak) + '</b>, when your current access ends, and runs until <b>' + accDatum(kraj) + '</b>.'
          : 'Everything unlocked until <b>' + accDatum(kraj) + '</b>.') +
        ' No card needed, and it won\'t renew on its own.</p>' + odKoga +
        '<div class="accGumbi"><button class="gumb gumbSivi" data-zatvori>Not now</button>' +
        '<button class="gumb" id="accKodDa">Activate</button></div>';
    }
    var m = accModal(html);
    $('accKodDa').onclick = function () {
      var b = this; b.disabled = true; b.textContent = 'Working…';
      var vise = !!($('accVise') && $('accVise').checked);
      accPozoviRacun({ radnja: 'iskoristi_kod', kod: r.kod, vise: vise }).then(function (j) {
        m.zatvori();
        if (!j.ok) {
          accPoruka('Code not redeemed', j.error === 'nevazeci'
            ? 'This code was just used or is no longer valid.'
            : 'Something went wrong and the code was not used. Please try again.');
          return;
        }
        try { sessionStorage.removeItem(ACC_KOD_KLJUC); } catch (e) {}
        ACC.darivatelji = null;
        ucitajEntitlement(function () {
          resetirajPlusSadrzaj(); ucitajPlusSadrzaj(); osvjeziHeader();
          renderAccount();
          accPoruka('Done!', j.nacin === 'pretplata'
            ? 'Your next payment is now on ' + accDatum(j.novi_do) + '.'
            : 'You have Croland Plus until ' + accDatum(j.novi_do) + '.');
        });
      }).catch(function () { m.zatvori(); accPoruka('Something went wrong', 'The code was not used. Please try again.'); });
    };
  }
  // Link croland…/?redeem=CRO-XXXX-XXXX: kod se pamti kroz prijavu i otvara se Account s njim.
  function pokupiKodIzAdrese() {
    var m = /[?&]redeem=([A-Za-z0-9-]+)/.exec(window.location.search);
    if (!m) return;
    try { sessionStorage.setItem(ACC_KOD_KLJUC, m[1]); } catch (e) {}
    try { history.replaceState(null, '', window.location.pathname); } catch (e) {}
  }
  pokupiKodIzAdrese();
  function provjeriKodIzAdrese() {
    var kod = null;
    try { kod = sessionStorage.getItem(ACC_KOD_KLJUC); } catch (e) {}
    if (!kod) return;
    if (!imaRacun()) { prikaziModalPrijava({ view: 'account' }); return; }
    if (!ZADNJI_VIEW || ZADNJI_VIEW.view !== 'account') idi('account');
  }

  // ---- crtanje ----
  function accPaketi() {
    var c = accCijene();
    var godisnjeMjesecno = Math.round((1 - c.godina / (c.mjesec * 12)) * 100);
    var kartice = ['tjedan', 'mjesec', 'godina'].map(function (k) {
      var pod = k === 'tjedan' ? 'Renews weekly' : k === 'mjesec' ? 'Renews monthly'
        : 'Just ' + accNovac(c.godina / 12) + ' a month';
      return '<button type="button" class="accCijena" data-paket="' + k + '" aria-pressed="' + (ACC.paket === k) + '">' +
        (k === 'godina' && godisnjeMjesecno > 0 ? '<span class="accVrpca">Save ' + godisnjeMjesecno + '%</span>' : '') +
        '<span class="accCNaz">' + ACC_IME[k] + '</span>' +
        '<span class="accCIznos">' + accNovac(c[k]) + '<small> / ' + ACC_JED[k] + '</small></span>' +
        '<span class="accCPod">' + pod + '</span></button>';
    }).join('');
    return '<div class="accCijene">' + kartice + '</div>' +
      '<button class="gumb accSiroki" id="accKupiPaket">Continue with ' + ACC_IME[ACC.paket].toLowerCase() + '</button>' +
      '<p class="accSitno accSredina">Cancel anytime. Prices include VAT. Payments by Paddle.</p>';
  }
  function accCustom() {
    var c = accCijene();
    var r = accCijenaKodova(ACC.vrsta, ACC.n);
    var klizac = Math.round(Math.log(ACC.n) / Math.log(c.max) * 1000);
    return '<p class="accSitno" style="margin-top:0">Pick a length and how many. You get codes to use yourself, give away or sell — ' +
      'the more you take, the less each one costs. Codes can be redeemed within 2 years.</p>' +
      '<div class="accVrste">' + ['tjedan', 'mjesec', 'godina'].map(function (k) {
        return '<button type="button" class="accVrsta" data-vrsta="' + k + '" aria-pressed="' + (ACC.vrsta === k) + '">' +
          '<b>1 ' + ACC_JED[k] + '</b><small>' + accNovac(c[k]) + '</small></button>';
      }).join('') + '</div>' +
      '<div class="accKolicina"><label for="accN">Codes</label>' +
        '<input type="number" id="accN" min="1" max="' + c.max + '" value="' + ACC.n + '">' +
        '<input type="range" id="accNR" min="0" max="1000" value="' + klizac + '" aria-label="Number of codes"></div>' +
      '<div class="accZbroj"><div><div class="accUkupno">' + accNovac(r.ukupno) + '</div>' +
        '<div class="accSitno">' + ACC.n + ' × ' + accNovac(r.poKodu) +
        (r.popust > 0 ? ' · <span class="accPopust">−' + r.popust + '%</span>' : '') + ' · one-time payment</div></div>' +
        '<button class="gumb" id="accKupiKodove">Buy ' + ACC.n + (ACC.n === 1 ? ' code' : ' codes') + '</button></div>';
  }
  function accPlan() {
    var st = accStanje();
    var p = accPretplata();
    var c = accCijene();
    if (st === 'komplimentarno') {
      return '<div class="accPloca accPlan accJePlus"><div class="accPlanIme">Croland Plus</div>' +
        '<p class="accSitno" style="margin:.25rem 0 0">A gift from Croland — no end date, nothing to pay.</p></div>';
    }
    if (st === 'pretplata') {
      var dalje = p.placeni_paket && p.paket && p.placeni_paket !== p.paket;
      var trenutni = p.placeni_paket || p.paket;
      var red =
        '<dt>Plan</dt><dd>' + (ACC_IME[trenutni] || 'Plus') + (p.cijena_iznos && !dalje ? ' · ' + accNovac(Number(p.cijena_iznos)) +
          ' / ' + ACC_JED[trenutni] : '') + '</dd>' +
        (p.status === 'paused' ? '<dt>Status</dt><dd>Paused</dd>'
          : p.auto_obnova ? '<dt>Renews</dt><dd>' + accDatum(p.vrijedi_do) + '</dd>'
          : '<dt>Ends</dt><dd>' + accDatum(p.vrijedi_do) + ' · won\'t renew</dd>') +
        (dalje ? '<dt>Then</dt><dd>' + ACC_IME[p.paket] + (p.cijena_iznos ? ' · ' + accNovac(Number(p.cijena_iznos)) + ' / ' + ACC_JED[p.paket] : '') + '</dd>' : '');
      return '<div class="accPloca accPlan accJePlus">' +
        '<div class="accPlanVrh"><div class="accPlanIme">Croland Plus</div>' +
          '<span class="accZnacka ' + (p.status === 'past_due' ? 'accZnUpoz">Payment issue' : 'accZnOk">Active') + '</span></div>' +
        (p.status === 'past_due' ? '<p class="accUpozorenje">We couldn\'t take your last payment. Please update your card ' +
          'under Manage subscription — you keep Plus in the meantime.</p>' : '') +
        '<dl class="accRedovi">' + red + '</dl>' +
        '<div class="accGumbiL">' +
          (p.auto_obnova ? '<button class="gumb" id="accPromjena">Change plan</button>'
            : '<button class="gumb" id="accNastavi">Keep my subscription</button>') +
          '<button class="gumb gumbSivi" id="accPortal">Manage subscription</button></div>' +
        '<p class="accSitno">Cancel, update your card or download invoices on Paddle\'s secure page.</p></div>' +
        '<details class="accPloca accSklop"><summary>Buy codes for others</summary>' + accCustom() + '</details>';
    }
    if (st === 'kod') {
      return '<div class="accPloca accPlan accJePlus"><div class="accPlanVrh"><div class="accPlanIme">Croland Plus</div>' +
          '<span class="accZnacka accZnOk">Active</span></div>' +
        '<dl class="accRedovi"><dt>From</dt><dd>Codes</dd><dt>Until</dt><dd>' + accDatum(ENTITLEMENT.kod_do) +
          ' · doesn\'t renew</dd></dl></div>' +
        '<details class="accPloca accSklop"><summary>Keep Plus after ' + accDatum(ENTITLEMENT.kod_do) + '</summary>' +
          '<p class="accSitno" style="margin-top:0">Start a plan now and your remaining code time is added to it — ' +
          'nothing is lost.</p>' + accPaketi() + '</details>' +
        '<details class="accPloca accSklop"><summary>Buy codes (Custom)</summary>' + accCustom() + '</details>';
    }
    return '<div class="accPloca accPlan">' +
        '<div class="accPlanIme">Free plan</div>' +
        '<p class="accSitno" style="margin:.25rem 0 1.1rem">Level 1 on every track, daily challenges and mini games. ' +
          'Croland Plus opens every level.</p>' +
        accPaketi() + '</div>' +
      '<div class="accPloca"><h2 class="accNaslov">Custom</h2>' + accCustom() + '</div>';
  }
  function accMojiKodovi() {
    if (!(ENTITLEMENT && ENTITLEMENT.ima_kupnje)) return '';
    return '<div class="accPloca" id="accKodovi"><h2 class="accNaslov">My codes</h2>' +
      '<p class="accSitno">Loading…</p></div>';
  }
  function accPostavke() {
    var u = SESSION.user;
    var pr = ((u.app_metadata && u.app_metadata.providers) || []);
    var imaLozinku = pr.indexOf('email') !== -1;
    return '<div class="accPloca"><h2 class="accNaslov">Account settings</h2>' +
      '<div class="accStavka"><div class="accTxt"><div class="accSNas">Display name</div>' +
        '<div class="accSOpis">Shown to friends and to whoever gave you a code. Never your email.</div>' +
        '<div class="accRed"><input id="accIme" maxlength="40" placeholder="the name others see" value="' +
          esc((ACC.javni && ACC.javni.nadimak) || '') + '"><button class="gumb gumbSivi" id="accSpremiIme">Save</button></div>' +
        '<div class="accSOpis" id="accImePoruka"></div></div></div>' +
      '<div class="accStavka"><div class="accTxt"><div class="accSNas">Email</div><div class="accSOpis">' + esc(u.email || '') +
        '</div></div><button class="gumb gumbSivi" id="accEmail">Change</button></div>' +
      '<div class="accStavka"><div class="accTxt"><div class="accSNas">Password</div><div class="accSOpis">' +
        (imaLozinku ? 'Used to log in with your email.' : 'You log in with Google. You can also set a password.') +
        '</div></div><button class="gumb gumbSivi" id="accLozinka">' + (imaLozinku ? 'Change' : 'Set a password') + '</button></div>' +
      '<div class="accStavka"><div class="accTxt"><div class="accSNas">Sessions</div><div class="accSOpis">' +
        'Log out on every device where you\'re signed in.</div></div>' +
        '<button class="gumb gumbSivi" id="accSvuda">Log out everywhere</button></div>' +
      '<div id="accDarivatelji"></div>' +
      '</div>';
  }
  function accPodaci() {
    return '<div class="accPloca accOpasno"><h2 class="accNaslov">Your data</h2>' +
      '<div class="accStavka"><div class="accTxt"><div class="accSNas">Download your data</div><div class="accSOpis">' +
        'Account, progress, points, saved words, friends, codes and AI help conversations, as a JSON file.</div></div>' +
        '<button class="gumb gumbSivi" id="accIzvoz">Download</button></div>' +
      '<div class="accStavka"><div class="accTxt"><div class="accSNas">Delete account</div><div class="accSOpis">' +
        'Permanently removes your account and all progress.</div></div>' +
        '<button class="gumb accGumbOpasno" id="accBrisi">Delete account</button></div></div>';
  }

  function renderAccount() {
    if (!imaRacun()) { prikaziModalPrijava({ view: 'account' }); return; }
    var u = SESSION.user;
    var st = accStanje();
    var ime = (ACC.javni && ACC.javni.nadimak) || (u.email || '').split('@')[0];
    var pr = ((u.app_metadata && u.app_metadata.providers) || []);
    var nacin = pr.indexOf('google') !== -1 ? 'signed in with Google' : 'signed in with email';
    var kodIzAdrese = null;
    try { kodIzAdrese = sessionStorage.getItem(ACC_KOD_KLJUC); } catch (e) {}

    VIEW.innerHTML = '<div class="acc">' +
      '<h1 class="sekcija">Account</h1>' +
      '<div class="accKodTraka"><label for="accKodUnos">Have a code?</label>' +
        '<input id="accKodUnos" placeholder="CRO-XXXX-XXXX" autocomplete="off" spellcheck="false" value="' + esc(kodIzAdrese || '') + '">' +
        '<button class="gumb" id="accKodGumb">Redeem</button>' +
        '<p class="accKodGreska" id="accKodGreska" hidden></p></div>' +
      '<div class="accPloca accJa"><div class="accAvatar" id="accAvatar">' + esc((ime || '?').charAt(0).toUpperCase()) + '</div>' +
        '<div class="accJaTxt"><div class="accJaIme"><span id="accJaIme">' + esc(ime) + '</span>' +
          (st === 'free' ? ' <span class="accZnacka">Free</span>' : ' <span class="accZnacka accZnPlus">Plus</span>') + '</div>' +
          '<div class="accSOpis">' + esc(u.email || '') + ' · ' + nacin +
            (u.created_at ? ' · member since ' + new Date(u.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : '') +
          '</div></div>' +
        '<button class="gumb gumbSivi accOdjava" id="btnOdjava">Log out</button></div>' +
      accPlan() +
      accMojiKodovi() +
      accPostavke() +
      accPodaci() +
      '<p class="accSitno accSredina"><a href="privacy.html">Privacy Policy</a> · <a href="terms.html">Terms of Service</a></p>' +
      '</div>';

    accVezi();
    if (kodIzAdrese) accPokreniKod(kodIzAdrese);
    if (!ACC.javni) {
      supa.rpc('moj_javni_racun').then(function (res) {
        ACC.javni = (res.data && res.data[0]) || { nadimak: null };
        var n = ACC.javni.nadimak;
        if (!n) return;
        // Na mjestu, bez ponovnog crtanja — unos koda i otvoreni dijalog ostaju netaknuti.
        var e1 = $('accJaIme'); if (e1) e1.textContent = n;
        var e2 = $('accAvatar'); if (e2) e2.textContent = n.charAt(0).toUpperCase();
        var e3 = $('accIme'); if (e3 && !e3.value && document.activeElement !== e3) e3.value = n;
      });
    }
    accCrtajKodove();
    accCrtajDarivatelje();
  }

  function accVezi() {
    $('btnOdjava').onclick = function () { odjava(function () { ACC.javni = null; ACC.kodovi = null; ACC.darivatelji = null; renderMain(); }); };
    var unos = $('accKodUnos');
    $('accKodGumb').onclick = function () { accPokreniKod(unos.value); };
    unos.onkeydown = function (e) { if (e.key === 'Enter') accPokreniKod(unos.value); };

    Array.prototype.forEach.call(document.querySelectorAll('.accCijena'), function (b) {
      b.onclick = function () { ACC.paket = b.getAttribute('data-paket'); accOsvjeziPakete(); };
    });
    var kp = $('accKupiPaket');
    if (kp) kp.onclick = function () { accKupi({ tip: 'paket', paket: ACC.paket }); };
    accVeziCustom();

    var pp = $('accPromjena'); if (pp) pp.onclick = accPromjenaPaketa;
    var po = $('accPortal'); if (po) po.onclick = function () {
      var b = this; b.disabled = true;
      accPozoviRacun({ radnja: 'portal' }).then(function (j) {
        b.disabled = false;
        if (j.url) window.open(j.url, '_blank', 'noopener');
        else accPoruka('Not available', 'Subscription management isn\'t available right now. Please try again later.');
      });
    };
    var na = $('accNastavi'); if (na) na.onclick = function () {
      var b = this; b.disabled = true;
      accPozoviRacun({ radnja: 'nastavi' }).then(function (j) {
        if (!j.ok) { b.disabled = false; accPoruka('Not available', 'Please try again later.'); return; }
        ucitajEntitlement(renderAccount);
      });
    };

    $('accSpremiIme').onclick = function () {
      var ime = $('accIme').value.trim().slice(0, 40);
      var por = $('accImePoruka'); por.textContent = 'Saving…';
      supa.from('javni_bodovi').update({ nadimak: ime || null, updated_at: new Date().toISOString() })
        .eq('user_id', SESSION.user.id).then(function (res) {
          if (res.error) { por.textContent = 'Could not save — try again.'; return; }
          if (ACC.javni) ACC.javni.nadimak = ime || null;
          if (typeof DRUSTVO !== 'undefined' && DRUSTVO.ja) DRUSTVO.ja.nadimak = ime || null;
          por.textContent = ime ? 'Saved.' : 'Cleared — people see only your ID.';
        });
    };
    $('accEmail').onclick = accPromjenaEmaila;
    $('accLozinka').onclick = function () { accNovaLozinka(false); };
    $('accSvuda').onclick = function () {
      var b = this; b.disabled = true;
      supa.auth.signOut({ scope: 'global' }).then(function () {
        odjava(function () { ACC.javni = null; ACC.kodovi = null; renderMain(); });
      });
    };
    $('accIzvoz').onclick = accIzvoz;
    $('accBrisi').onclick = accBrisanje;
  }
  function accOsvjeziPakete() {
    Array.prototype.forEach.call(document.querySelectorAll('.accCijena'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-paket') === ACC.paket));
    });
    var kp = $('accKupiPaket'); if (kp) kp.textContent = 'Continue with ' + ACC_IME[ACC.paket].toLowerCase();
  }
  function accVeziCustom() {
    var n = $('accN'); if (!n) return;
    var c = accCijene();
    var osvjezi = function () {
      Array.prototype.forEach.call(document.querySelectorAll('.accVrsta'), function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-vrsta') === ACC.vrsta));
      });
      var r = accCijenaKodova(ACC.vrsta, ACC.n);
      var z = document.querySelector('.accZbroj');
      if (z) {
        z.querySelector('.accUkupno').textContent = accNovac(r.ukupno);
        z.querySelector('.accSitno').innerHTML = ACC.n + ' × ' + accNovac(r.poKodu) +
          (r.popust > 0 ? ' · <span class="accPopust">−' + r.popust + '%</span>' : '') + ' · one-time payment';
      }
      $('accKupiKodove').textContent = 'Buy ' + ACC.n + (ACC.n === 1 ? ' code' : ' codes');
    };
    Array.prototype.forEach.call(document.querySelectorAll('.accVrsta'), function (b) {
      b.onclick = function () { ACC.vrsta = b.getAttribute('data-vrsta'); osvjezi(); };
    });
    n.oninput = function () {
      var v = Math.round(Number(n.value));
      if (!(v >= 1)) return;
      ACC.n = Math.min(c.max, v);
      $('accNR').value = Math.round(Math.log(ACC.n) / Math.log(c.max) * 1000);
      osvjezi();
    };
    n.onblur = function () { n.value = ACC.n; };
    $('accNR').oninput = function () {
      ACC.n = Math.max(1, Math.round(Math.exp(this.value / 1000 * Math.log(c.max))));
      n.value = ACC.n; osvjezi();
    };
    $('accKupiKodove').onclick = function () { accKupi({ tip: 'kodovi', vrsta: ACC.vrsta, kolicina: ACC.n }); };
  }

  function accPromjenaPaketa() {
    var p = accPretplata(); if (!p) return;
    var trenutni = p.paket;
    var izbor = trenutni === 'godina' ? 'mjesec' : 'godina';
    var c = accCijene();
    var crtaj = function () {
      return '<h2>Change plan</h2><p class="otkljPod">You\'re on <b>' + ACC_IME[p.placeni_paket || trenutni] +
        '</b>, paid until <b>' + accDatum(p.vrijedi_do) + '</b>. The new plan starts then — you keep everything you\'ve paid for.</p>' +
        '<div class="accVrste">' + ['tjedan', 'mjesec', 'godina'].map(function (k) {
          return '<button type="button" class="accVrsta" data-pk="' + k + '" aria-pressed="' + (izbor === k) + '"' +
            (k === trenutni ? ' disabled' : '') + '><b>' + ACC_IME[k] + '</b><small>' +
            (k === trenutni ? 'current' : accNovac(c[k]) + ' / ' + ACC_JED[k]) + '</small></button>';
        }).join('') + '</div>' +
        '<div class="accGumbi"><button class="gumb gumbSivi" data-zatvori>Cancel</button>' +
        '<button class="gumb" id="accPromjenaDa">Switch to ' + ACC_IME[izbor] + ' on ' + accDatum(p.vrijedi_do) + '</button></div>';
    };
    var m = accModal(crtaj());
    var vezi = function () {
      Array.prototype.forEach.call(m.el.querySelectorAll('[data-pk]'), function (b) {
        b.onclick = function () { izbor = b.getAttribute('data-pk'); m.el.innerHTML = crtaj(); veziSve(); };
      });
      $('accPromjenaDa').onclick = function () {
        var b = this; b.disabled = true; b.textContent = 'Working…';
        accPozoviRacun({ radnja: 'promijeni_paket', paket: izbor }).then(function (j) {
          m.zatvori();
          if (!j.ok) { accPoruka('Not available', 'Your plan couldn\'t be changed right now. Please try again later.'); return; }
          ucitajEntitlement(renderAccount);
        });
      };
    };
    var veziSve = function () {
      Array.prototype.forEach.call(m.el.querySelectorAll('[data-zatvori]'), function (b) { b.onclick = m.zatvori; });
      vezi();
    };
    vezi();
  }

  function accPromjenaEmaila() {
    var m = accModal('<h2>Change email</h2><p class="otkljPod">We\'ll send a confirmation link to the new address.</p>' +
      '<div class="poljeP"><label for="accNoviEmail">New email</label><input id="accNoviEmail" type="email" autocomplete="email"></div>' +
      '<p class="greskaP" id="accEmailPoruka"></p>' +
      '<div class="accGumbi"><button class="gumb gumbSivi" data-zatvori>Cancel</button><button class="gumb" id="accEmailDa">Send link</button></div>');
    $('accEmailDa').onclick = function () {
      var e = String($('accNoviEmail').value || '').trim();
      var por = $('accEmailPoruka');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) { por.textContent = 'Enter a valid email address.'; return; }
      this.disabled = true;
      supa.auth.updateUser({ email: e }, { emailRedirectTo: POVRATAK_PRIJAVE }).then(function (res) {
        if (res.error) { por.textContent = res.error.message || 'Could not change email.'; $('accEmailDa').disabled = false; return; }
        m.el.innerHTML = '<h2>Check your inbox</h2><p class="otkljPod">Click the link we sent to <b>' + esc(e) +
          '</b> (and, if asked, the one sent to your current address) to finish the change.</p>' +
          '<div class="accGumbi"><button class="gumb" id="accOk">OK</button></div>';
        $('accOk').onclick = m.zatvori;
      });
    };
  }
  // oporavak = true: dolazak preko linka "Forgot password" iz maila
  function accNovaLozinka(oporavak) {
    var m = accModal('<h2>' + (oporavak ? 'Choose a new password' : 'New password') + '</h2>' +
      '<div class="poljeP"><label for="accNovaL">New password</label>' +
        '<input id="accNovaL" type="password" autocomplete="new-password" placeholder="at least 6 characters"></div>' +
      '<p class="greskaP" id="accLPoruka"></p>' +
      '<div class="accGumbi"><button class="gumb gumbSivi" data-zatvori>Cancel</button><button class="gumb" id="accLDa">Save password</button></div>');
    setTimeout(function () { var f = $('accNovaL'); if (f) f.focus(); }, 60);
    $('accLDa').onclick = function () {
      var l = String($('accNovaL').value || '');
      var por = $('accLPoruka');
      if (l.length < 6) { por.textContent = 'Use at least 6 characters.'; return; }
      this.disabled = true;
      supa.auth.updateUser({ password: l }).then(function (res) {
        if (res.error) { por.textContent = res.error.message || 'Could not save the password.'; $('accLDa').disabled = false; return; }
        m.el.innerHTML = '<h2>Password saved</h2><p class="otkljPod">Use it next time you log in with your email.</p>' +
          '<div class="accGumbi"><button class="gumb" id="accOk">OK</button></div>';
        $('accOk').onclick = m.zatvori;
      });
    };
  }

  function accCrtajKodove() {
    var okvir = $('accKodovi'); if (!okvir) return;
    var crtaj = function () {
      okvir = $('accKodovi'); if (!okvir) return;
      var redovi = ACC.kodovi || [];
      if (!redovi.length) { okvir.innerHTML = '<h2 class="accNaslov">My codes</h2><p class="accSitno">No codes yet.</p>'; return; }
      var slobodni = redovi.filter(function (r) { return r.stanje === 'slobodan'; }).length;
      var html = '<h2 class="accNaslov">My codes</h2>' +
        '<p class="accSitno" style="margin-top:-.4rem">' + redovi.length + ' codes · ' + slobodni + ' unused. ' +
        'Anyone with a code can redeem it — share them however you like.</p>' +
        '<div class="accTablicaOkvir"><table class="accKodoviT"><thead><tr><th>Code</th><th>Status</th><th class="accSkrijMob">Points</th><th></th></tr></thead><tbody>';
      var zadnjiDan = null;
      redovi.forEach(function (r) {
        var dan = accDatum(r.kupljeno);
        if (dan !== zadnjiDan) {
          zadnjiDan = dan;
          html += '<tr class="accGrupa"><td colspan="4">Bought ' + dan + ' · redeem by ' + accDatum(r.unos_do) + '</td></tr>';
        }
        var stanje = r.stanje === 'slobodan' ? '<span class="accStKod accSlob">Unused</span> · 1 ' + ACC_JED[r.vrsta]
          : r.stanje === 'iskoristen' ? '<span class="accStKod">Redeemed</span> by <b>' + esc(r.nadimak || 'Someone') + '</b>' +
              (r.iskoristeno_at ? ' · ' + accDatum(r.iskoristeno_at) : '')
          : r.stanje === 'istekao' ? '<span class="accStKod">Expired</span>'
          : '<span class="accStKod">Cancelled</span>';
        html += '<tr><td><code>' + esc(r.kod) + '</code></td><td>' + stanje + '</td>' +
          '<td class="accSkrijMob">' + (r.bodovi != null ? r.bodovi : '') + '</td><td class="accAkcije">' +
          (r.stanje === 'slobodan' ? '<button class="accVeza" data-kopiraj="' + esc(r.kod) + '">Copy</button> · ' +
            '<button class="accVeza" data-link="' + esc(r.kod) + '">Link</button>' : '') + '</td></tr>';
      });
      html += '</tbody></table></div>' +
        '<div class="accGumbiL"><button class="gumb gumbSivi" id="accCsv">Download CSV</button>' +
        '<button class="gumb gumbSivi" id="accIspis">Print unused codes</button></div>';
      okvir.innerHTML = html;
      var kopiraj = function (t, b) {
        try { navigator.clipboard.writeText(t); } catch (e) {}
        var star = b.textContent; b.textContent = 'Copied'; setTimeout(function () { b.textContent = star; }, 1500);
      };
      Array.prototype.forEach.call(okvir.querySelectorAll('[data-kopiraj]'), function (b) {
        b.onclick = function () { kopiraj(b.getAttribute('data-kopiraj'), b); };
      });
      Array.prototype.forEach.call(okvir.querySelectorAll('[data-link]'), function (b) {
        b.onclick = function () { kopiraj(POVRATAK_PRIJAVE + '?redeem=' + b.getAttribute('data-link'), b); };
      });
      $('accCsv').onclick = function () {
        var csv = 'code,length,status,bought,redeem_by,redeemed_by,redeemed_at,link\n' + redovi.map(function (r) {
          return [r.kod, ACC_JED[r.vrsta], r.stanje === 'slobodan' ? 'unused' : r.stanje === 'iskoristen' ? 'redeemed'
            : r.stanje === 'istekao' ? 'expired' : 'cancelled', String(r.kupljeno).slice(0, 10), String(r.unos_do).slice(0, 10),
            '"' + String(r.nadimak || '').replace(/"/g, '""') + '"', r.iskoristeno_at ? String(r.iskoristeno_at).slice(0, 10) : '',
            POVRATAK_PRIJAVE + '?redeem=' + r.kod].join(',');
        }).join('\n');
        accPreuzmi('croland-codes.csv', csv, 'text/csv');
      };
      $('accIspis').onclick = function () { accIspisKodova(redovi.filter(function (r) { return r.stanje === 'slobodan'; })); };
    };
    if (ACC.kodovi) { crtaj(); return; }
    supa.rpc('moji_kodovi').then(function (res) { ACC.kodovi = res.data || []; crtaj(); });
  }
  function accIspisKodova(kodovi) {
    if (!kodovi.length) { accPoruka('Nothing to print', 'All your codes have been used.'); return; }
    var w = window.open('', '_blank');
    if (!w) return;
    var kartice = kodovi.map(function (r) {
      return '<div class="k"><div class="n">Croland Plus</div><div class="t">1 ' + ACC_JED[r.vrsta] + ' of Croatian</div>' +
        '<div class="c">' + esc(r.kod) + '</div><div class="u">Redeem at ' + esc(POVRATAK_PRIJAVE) + '?redeem=' + esc(r.kod) +
        '<br>by ' + accDatum(r.unos_do) + '</div></div>';
    }).join('');
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Croland codes</title><style>' +
      'body{font-family:system-ui,sans-serif;margin:1cm}.g{display:grid;grid-template-columns:repeat(2,1fr);gap:.5cm}' +
      '.k{border:1px dashed #999;border-radius:8px;padding:.5cm;break-inside:avoid}.n{font-weight:700;font-size:14pt}' +
      '.t{color:#555;margin:.1cm 0 .3cm}.c{font:600 16pt ui-monospace,Consolas,monospace;letter-spacing:.05em}' +
      '.u{font-size:8pt;color:#666;margin-top:.3cm;word-break:break-all}</style></head><body><div class="g">' + kartice +
      '</div><script>window.onload=function(){window.print()}<\/script></body></html>');
    w.document.close();
  }
  function accCrtajDarivatelje() {
    var crtaj = function () {
      var okvir = $('accDarivatelji'); if (!okvir) return;
      var ljudi = ACC.darivatelji || [];
      if (!ljudi.length) { okvir.innerHTML = ''; return; }
      okvir.innerHTML = '<div class="accStavka accStavkaStup"><div class="accSNas">People who gave you codes</div>' +
        ljudi.map(function (p, i) {
          return '<div class="accDariv"><b>' + esc(p.nadimak) + '</b>' +
            '<label class="accKvacica"><input type="checkbox" data-sakrij="' + i + '"' + (p.skriveno ? ' checked' : '') +
              '> Hide my name and points from them</label>' +
            '<label class="accKvacica"><input type="checkbox" data-vise="' + i + '"' + (p.vise ? ' checked' : '') +
              (p.skriveno ? ' disabled' : '') + '> Also share my lessons and activity dates</label></div>';
        }).join('') + '</div>';
      var spremi = function (i) {
        var p = ljudi[i];
        supa.rpc('postavi_vidljivost_kupcu', { p_kupac: p.kupac, p_skriveno: p.skriveno, p_vise: p.vise }).then(function () {});
      };
      Array.prototype.forEach.call(okvir.querySelectorAll('[data-sakrij]'), function (c) {
        c.onchange = function () { var i = +c.getAttribute('data-sakrij'); ljudi[i].skriveno = c.checked; if (c.checked) ljudi[i].vise = false; spremi(i); crtaj(); };
      });
      Array.prototype.forEach.call(okvir.querySelectorAll('[data-vise]'), function (c) {
        c.onchange = function () { var i = +c.getAttribute('data-vise'); ljudi[i].vise = c.checked; spremi(i); };
      });
    };
    if (ACC.darivatelji) { crtaj(); return; }
    supa.rpc('moji_darivatelji').then(function (res) { ACC.darivatelji = res.error ? [] : (res.data || []); crtaj(); });
  }

  function accPreuzmi(ime, sadrzaj, tip) {
    var blob = new Blob([sadrzaj], { type: tip + ';charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = ime;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  // Izvoz radi u pregledniku: RLS ionako dopušta čitati samo svoje redove.
  function accIzvoz() {
    var b = $('accIzvoz'); if (b) { b.disabled = true; b.textContent = 'Preparing…'; }
    var me = SESSION.user.id;
    var u = SESSION.user;
    var izlaz = { exported_at: new Date().toISOString(),
      account: { id: u.id, email: u.email, created_at: u.created_at, sign_in: (u.app_metadata || {}).providers } };
    var upiti = [
      ['progress', supa.from('progress').select('*').eq('user_id', me)],
      ['public_profile', supa.from('javni_bodovi').select('*').eq('user_id', me)],
      ['access', supa.rpc('moj_pristup')],
      ['subscription', supa.from('pretplate').select('*').eq('user_id', me)],
      ['code_purchases', supa.from('kupnje_kodova').select('*').eq('kupac', me)],
      ['codes_bought', supa.rpc('moji_kodovi')],
      ['people', supa.rpc('moji_ljudi')],
      ['code_givers', supa.rpc('moji_darivatelji')],
      ['ai_help_conversations', supa.from('ai_razgovori').select('*').eq('user_id', me)]
    ];
    Promise.all(upiti.map(function (u2) {
      return Promise.resolve(u2[1]).then(function (res) { izlaz[u2[0]] = res.error ? null : res.data; }, function () { izlaz[u2[0]] = null; });
    })).then(function () {
      accPreuzmi('croland-data-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify(izlaz, null, 2), 'application/json');
      if (b) { b.disabled = false; b.textContent = 'Download'; }
    });
  }
  function accBrisanje() {
    var p = accPretplata();
    var imaKupnje = ENTITLEMENT && ENTITLEMENT.ima_kupnje;
    var m = accModal('<h2>Delete your account?</h2><ul class="accPopis">' +
        '<li>Your progress, points, streak, saved words and friends are erased.</li>' +
        (p ? '<li>Your subscription is cancelled now. The rest of the paid period is not refunded.</li>' : '') +
        (imaKupnje ? '<li>Codes you bought stay valid for whoever has them. <button class="accVeza" id="accBrisiCsv">Download them first</button>.</li>' : '') +
        '<li>This can\'t be undone.</li></ul>' +
      '<div class="poljeP"><label for="accPotvrda">Type <b>DELETE</b> to confirm</label><input id="accPotvrda" autocomplete="off"></div>' +
      '<p class="greskaP" id="accBrisiPoruka"></p>' +
      '<div class="accGumbi"><button class="gumb gumbSivi" data-zatvori>Cancel</button>' +
      '<button class="gumb accGumbOpasnoPun" id="accBrisiDa" disabled>Delete forever</button></div>');
    var csv = $('accBrisiCsv');
    if (csv) csv.onclick = function () {
      supa.rpc('moji_kodovi').then(function (res) { ACC.kodovi = res.data || []; var c = $('accCsv'); if (c) c.click(); else accCrtajKodove(); });
    };
    $('accPotvrda').oninput = function () { $('accBrisiDa').disabled = this.value.trim().toUpperCase() !== 'DELETE'; };
    $('accBrisiDa').onclick = function () {
      var b = this; b.disabled = true; b.textContent = 'Deleting…';
      accPozoviRacun({ radnja: 'obrisi_racun' }).then(function (j) {
        if (!j.ok) {
          b.disabled = false; b.textContent = 'Delete forever';
          $('accBrisiPoruka').textContent = 'Your account couldn\'t be deleted right now. Please try again, or email us.';
          return;
        }
        m.zatvori();
        ACC.javni = null; ACC.kodovi = null; ACC.darivatelji = null;
        odjava(function () { renderMain(); banerPoruka('Your account has been deleted.'); });
      }).catch(function () { b.disabled = false; b.textContent = 'Delete forever'; });
    };
  }
