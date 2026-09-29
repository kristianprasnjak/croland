// Lažni Supabase za AI testiranje.
// Tester ga podmeće umjesto prave knjižnice (cdn.jsdelivr.net/.../supabase.js), pa aplikacija
// misli da razgovara s bazom, a zapravo sve ostaje u pregledniku (localStorage '__lazna_baza').
// U pravu bazu se NIŠTA ne upisuje. index.html se ne mijenja.
(function () {
  var KLJUC = '__lazna_baza';
  function citaj() {
    try { return JSON.parse(localStorage.getItem(KLJUC)) || {}; } catch (e) { return {}; }
  }
  function spremi(b) { try { localStorage.setItem(KLJUC, JSON.stringify(b)); } catch (e) {} }
  function javi(tip, podaci) {
    try { if (window.__aiTesterDogadjaj) window.__aiTesterDogadjaj(JSON.stringify({ tip: tip, podaci: podaci })); } catch (e) {}
  }
  var B = citaj();
  B.tablice = B.tablice || {};
  spremi(B);

  var slusaci = [];
  function obavijesti(dogadjaj) {
    var s = B.sesija || null;
    slusaci.forEach(function (cb) { kasnije(function () { cb(dogadjaj, s); }); });
  }
  function novaSesija() {
    var id = B.korisnikId || 'ai-tester';
    if (!B.korisnikStvoren) B.korisnikStvoren = new Date().toISOString();
    B.sesija = {
      access_token: 'lazni-token', token_type: 'bearer', expires_in: 3600 * 24 * 365,
      user: { id: id, email: (B.email || 'tester@test.local'), created_at: B.korisnikStvoren,
        app_metadata: { provider: 'email' }, user_metadata: {} }
    };
    if (!B.tablice.profiles) B.tablice.profiles = [{ id: id, subscription_status: null, komplimentarno: false }];
    spremi(B);
    return B.sesija;
  }
  // Tester zamrzava sat (setTimeout ne teče dok AI razmišlja), pa baza odgovara bez timera.
  function kasnije(fn) { Promise.resolve().then(function () { return Promise.resolve(); }).then(fn); }
  var ok = function (data) { return Promise.resolve({ data: data, error: null }); };

  function Upit(tablica) {
    this.t = tablica; this.op = 'select'; this.filteri = []; this.jedan = false; this.vrijednost = null;
  }
  Upit.prototype.select = function () { if (this.op !== 'upsert' && this.op !== 'insert' && this.op !== 'update') this.op = 'select'; return this; };
  Upit.prototype.eq = function (k, v) { this.filteri.push([k, v]); return this; };
  ['neq', 'gt', 'gte', 'lt', 'lte', 'in', 'is', 'like', 'ilike'].forEach(function (m) { Upit.prototype[m] = function () { return this; }; });
  ['order', 'limit', 'range'].forEach(function (m) { Upit.prototype[m] = function () { return this; }; });
  Upit.prototype.maybeSingle = function () { this.jedan = true; return this; };
  Upit.prototype.single = function () { this.jedan = true; return this; };
  Upit.prototype.upsert = function (v) { this.op = 'upsert'; this.vrijednost = v; return this; };
  Upit.prototype.insert = function (v) { this.op = 'insert'; this.vrijednost = v; return this; };
  Upit.prototype.update = function (v) { this.op = 'update'; this.vrijednost = v; return this; };
  Upit.prototype['delete'] = function () { this.op = 'delete'; return this; };
  Upit.prototype.izvrsi = function () {
    B = citaj(); B.tablice = B.tablice || {};
    var redovi = B.tablice[this.t] || [];
    var f = this.filteri;
    var pase = function (r) { return f.every(function (p) { return r[p[0]] === undefined || r[p[0]] === p[1]; }); };
    var uid = B.sesija && B.sesija.user && B.sesija.user.id;
    if (this.op === 'select') {
      var nadeni = redovi.filter(pase);
      return { data: this.jedan ? (nadeni[0] || null) : nadeni, error: null };
    }
    if (this.op === 'upsert' || this.op === 'insert') {
      var nizovi = Array.isArray(this.vrijednost) ? this.vrijednost : [this.vrijednost];
      var kljuc = (this.t === 'progress' || this.t === 'javni_bodovi' || this.t === 'ai_upotreba') ? 'user_id' : 'id';
      nizovi.forEach(function (n) {
        if (!n[kljuc] && uid) n[kljuc] = uid;
        var i = redovi.findIndex(function (r) { return r[kljuc] === n[kljuc] && (kljuc !== 'id' || n.id); });
        if (i >= 0) redovi[i] = Object.assign({}, redovi[i], n); else redovi.push(n);
      });
      B.tablice[this.t] = redovi; spremi(B);
      javi('upis', { tablica: this.t, op: this.op, redak: this.t === 'progress' ? nizovi[0] : undefined });
      return { data: nizovi, error: null };
    }
    if (this.op === 'update') {
      var v = this.vrijednost;
      redovi.forEach(function (r, i) { if (pase(r)) redovi[i] = Object.assign({}, r, v); });
      B.tablice[this.t] = redovi; spremi(B);
      return { data: null, error: null };
    }
    if (this.op === 'delete') {
      B.tablice[this.t] = redovi.filter(function (r) { return !pase(r); }); spremi(B);
      return { data: null, error: null };
    }
    return { data: null, error: null };
  };
  Upit.prototype.then = function (a, b) {
    var self = this;
    return new Promise(function (res) { kasnije(function () { res(self.izvrsi()); }); }).then(a, b);
  };
  Upit.prototype['catch'] = function (b) { return this.then(null, b); };

  var klijent = {
    from: function (t) { return new Upit(t); },
    rpc: function (ime) {
      if (ime === 'moj_javni_racun') return ok([]);
      if (ime === 'moji_ljudi') return ok([]);
      return Promise.resolve({ data: null, error: { message: 'Nije dostupno u testu' } });
    },
    auth: {
      getSession: function () { B = citaj(); return ok({ session: B.sesija || null }); },
      getUser: function () { B = citaj(); return ok({ user: B.sesija ? B.sesija.user : null }); },
      onAuthStateChange: function (cb) {
        slusaci.push(cb);
        B = citaj();
        var s = B.sesija || null;
        kasnije(function () { cb('INITIAL_SESSION', s); });
        return { data: { subscription: { unsubscribe: function () {} } } };
      },
      signUp: function (o) {
        B = citaj(); B.email = o && o.email; var s = novaSesija();
        javi('registracija', { email: B.email });
        kasnije(function () { obavijesti('SIGNED_IN'); });
        return ok({ user: s.user, session: s });
      },
      signInWithPassword: function (o) {
        B = citaj(); B.email = o && o.email; var s = novaSesija();
        javi('prijava', { email: B.email });
        kasnije(function () { obavijesti('SIGNED_IN'); });
        return ok({ user: s.user, session: s });
      },
      signInWithOAuth: function () {
        B = citaj(); B.email = 'google@test.local'; novaSesija();
        javi('prijava', { google: true });
        kasnije(function () { location.reload(); });
        return ok({});
      },
      signOut: function () {
        B = citaj(); B.sesija = null; spremi(B);
        javi('odjava', {});
        obavijesti('SIGNED_OUT');
        return Promise.resolve({ error: null });
      },
      resetPasswordForEmail: function () { return ok({}); },
      updateUser: function () { return ok({}); },
      exchangeCodeForSession: function () { return ok({}); }
    }
  };

  window.supabase = { createClient: function () { return klijent; } };

  // Pozivi Edge funkcija (fetch prema .../functions/v1/...)
  var praviFetch = window.fetch.bind(window);
  window.fetch = function (url, opcije) {
    var u = String(url && url.url ? url.url : url);
    if (u.indexOf('/functions/v1/') === -1) return praviFetch(url, opcije);
    var odg = function (status, tijelo) {
      return Promise.resolve(new Response(JSON.stringify(tijelo), { status: status, headers: { 'Content-Type': 'application/json' } }));
    };
    if (u.indexOf('/sadrzaj') !== -1) return odg(200, { url: '/zasticeno/data-plus.json' });
    if (u.indexOf('/pomoc') !== -1) {
      var pitanje = '';
      try { pitanje = JSON.parse(opcije && opcije.body).poruka; } catch (e) {}
      javi('ai_pomoc', { pitanje: pitanje });
      return odg(200, { odgovor: '(AI help is switched off during testing. Your question was recorded.)', iskoristeno: 1 });
    }
    if (u.indexOf('/create-checkout-session') !== -1) {
      B = citaj();
      var p = (B.tablice.profiles || [])[0];
      if (p) { p.subscription_status = 'active'; spremi(B); }
      javi('placanje', {});
      return odg(200, { url: location.pathname + '?checkout=success' });
    }
    if (u.indexOf('portal') !== -1) return odg(200, { url: location.pathname });
    return odg(200, {});
  };
})();
