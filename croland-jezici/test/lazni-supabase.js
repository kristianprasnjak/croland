// Lazni supabase-js za regresijski test: prijavljen korisnik s pretplatom i djelomicnim napretkom
// (ili gost, ako je window.__GOST). Napredak se racuna iz window.PODACI, pa kljucevi odgovaraju
// jeziku stranice.
(function () {
  function napredak() {
    var v = {}, igre = (window.PODACI && window.PODACI.igre) || [];
    var pune = { 'Lesson 1': 1, 'Vocabulary 1': 1, 'Grammar 1': 1, 'Practice 1': 1, 'Lesson 2': 1 };
    var pola = { 'Vocabulary 2': 1, 'Grammar 2': 1, 'Test 1': 1, 'Lesson 3': 1 };
    igre.forEach(function (g, i) {
      var k = (g.cjelina || '') + '|' + (g.stranica || 0) + '|' + g.naslov;
      if (pune[g.cjelina]) v[k] = g.bodovi || 5;
      else if (pola[g.cjelina] && i % 2 === 0) v[k] = Math.max(1, Math.floor((g.bodovi || 5) / 2));
    });
    var slova = {}; 'abcčćdđefghijklmnoprsštuvzž'.split('').forEach(function (c, i) { if (i % 3) slova[c] = 1; });
    return {
      user_id: 'u1', vjezbe: v, pokrenute: { 'Lesson 1': 1, 'Lesson 2': 1, 'Grammar 2': 1 }, vidjeno: {},
      rjecnik: {
        more: { hr: 'more', en: 'sea', jez: 'en', rod: 's', broj: '', izvor: 'Lesson 1' },
        kava: { hr: 'kava', en: 'coffee', jez: 'en', rod: 'ž', broj: '', izvor: 'Lesson 1' },
        grad: { hr: 'grad', en: 'city', jez: 'en', rod: 'm', broj: '', izvor: 'Lesson 2' },
        dobar: { hr: 'dobar', en: 'good', jez: 'en', rod: '', broj: '', izvor: 'Lesson 1' }
      },
      slova: slova, abeceda_slavljena: false, savjeti: {}, streak: { niz: 3, zadnji: '', bodovi: 40 },
      ime: 'Ana', mini_igre: {}, postavke: { jezik: window.__JEZIK || 'en' }
    };
  }
  var user = { id: 'u1', email: 'ana@example.com', created_at: '2026-01-01T00:00:00Z',
    user_metadata: { jezik: window.__JEZIK || 'en' }, app_metadata: { providers: ['email'] } };
  var session = window.__GOST ? null : { access_token: 't', user: user };
  function rez(d) { return Promise.resolve({ data: d, error: null }); }
  var RPC = {
    moj_pristup: { ima: true, razlog: 'pretplata', plus_do: '2026-11-05T00:00:00Z', kod_do: null, komplimentarno: false, ima_kupnje: false,
      pretplata: { status: 'active', paket: 'mjesec', placeni_paket: 'mjesec', auto_obnova: true, vrijedi_do: '2026-11-05T00:00:00Z', cijena_iznos: 7.99 } },
    moj_javni_racun: { user_id: 'u1', nadimak: 'Ana', kod: 'ANA-1234', progres_javan: false },
    moji_ljudi: [], moji_kodovi: [], moji_darivatelji: []
  };
  function tablica(t) {
    if (t === 'progress') {
      try { var sp = localStorage.getItem('__lazni_progress'); if (sp) return JSON.parse(sp); } catch (e) {}
      return napredak();
    }
    if (t === 'postavke') return [];
    return null;
  }
  function upit(t) {
    var p = new Proxy({}, { get: function (o, k) {
      if (k === 'then') { var d = tablica(t); return function (a, b) { return rez(Array.isArray(d) || d === null ? (d || []) : [d]).then(a, b); }; }
      if (k === 'maybeSingle' || k === 'single') return function () { return rez(tablica(t)); };
      if (k === 'upsert' && t === 'progress') return function (r) { try { localStorage.setItem('__lazni_progress', JSON.stringify(r)); } catch (e) {} return p; };
      return function () { return p; };
    } });
    return p;
  }
  window.supabase = { createClient: function () {
    return {
      auth: {
        onAuthStateChange: function (cb) { setTimeout(function () { cb('INITIAL_SESSION', session); }, 0); return { data: { subscription: { unsubscribe: function () {} } } }; },
        getSession: function () { return rez({ session: session }); },
        getUser: function () { return rez({ user: session && user }); },
        updateUser: function () { return rez({ user: user }); },
        signOut: function () { return rez({}); },
        signInWithPassword: function () { return rez({}); }, signUp: function () { return rez({}); },
        signInWithOAuth: function () { return rez({}); }, resetPasswordForEmail: function () { return rez({}); }
      },
      from: upit,
      rpc: function (n) { return rez(RPC[n] !== undefined ? RPC[n] : null); }
    };
  } };
})();
