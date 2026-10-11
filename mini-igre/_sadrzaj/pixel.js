/* ==== Pixel temelj (CL-PIXEL-JS) — mjerilo art piksela ====
   Izvor: _sadrzaj/pixel.js — u igre ga ubacuje `node _sadrzaj/ugradi.js`,
   samo u igre koje već imaju oznaku CL-PIXEL-JS. Uzor je Konoba.

   Jedan art piksel = k piksela ZASLONA (cijeli broj), pa su svi pikseli
   jednako veliki i oštri; u CSS-u je to --u = k / devicePixelRatio.
   PX.prilagodi() bira najveći k pri kojem cijela igra stane na ekran:
   u širinu (igra je široka `sirina` art piksela) i u visinu.

   U aplikaciji je igra u okviru (iframe) visokom koliko i sadržaj, pa prava
   visina ekrana dolazi od roditelja: prozor minus zaglavlje.

   Uporaba u igri:
     PX.mjerilo({
       sirina: 158,               // širina igre u art pikselima (+ rub)
       omot: function(){ return O; },   // element čija se širina mjeri
       kMax: 3, kMaxUsko: 2.5,    // najveći k / DPR (široko / mobitel)
       kMin: 1.34,                // najmanji k / DPR
       nakon: function(){ ... }   // poziva se nakon svake promjene mjerila
     });
     PX.prilagodi();              // kad se raspored promijeni
   Ostalo: PX.u() (trenutni --u u CSS px), PX.k(), PX.postavi(k),
   PX.kMin(), PX.kMax(), PX.kPoSirini(), PX.usko(), PX.visinaEkrana(), PX.DPR. */
var PX = (function () {
  var DPR = window.devicePixelRatio || 1;
  var cfg = { sirina: 158, omot: null, kMax: 3, kMaxUsko: 2.5, kMin: 1.34, nakon: null };
  var k = 0, slusa = false;

  function usko() { return window.matchMedia('(max-width:640px)').matches; }
  function visinaEkrana() {
    try {
      if (window.frameElement && window.parent && window.parent !== window) {
        var p = window.parent, zag = p.document.querySelector('header');
        var dno = zag ? Math.max(0, zag.getBoundingClientRect().bottom) : 0;
        return p.innerHeight - dno;
      }
    } catch (e) {}
    return window.innerHeight;
  }
  function kMax() { return Math.floor((usko() ? cfg.kMaxUsko : cfg.kMax) * DPR); }
  function kMin() { return Math.max(1, Math.ceil(cfg.kMin * DPR)); }
  function postavi(n) { k = n; document.documentElement.style.setProperty('--u', (n / DPR) + 'px'); }
  function omot() {
    var o = typeof cfg.omot === 'function' ? cfg.omot() : cfg.omot;
    return o || document.body;
  }
  function kPoSirini() { return Math.floor((omot().clientWidth - 8) * DPR / cfg.sirina); }
  function prilagodi() {
    var ekran = visinaEkrana();
    var n = Math.max(kMin(), Math.min(kMax(), kPoSirini()));
    for (; n > kMin(); n--) {
      postavi(n);
      if (document.body.getBoundingClientRect().height <= ekran) break;
    }
    postavi(Math.max(kMin(), n));
    if (cfg.nakon) cfg.nakon();
  }
  function mjerilo(o) {
    for (var x in o) if (Object.prototype.hasOwnProperty.call(o, x)) cfg[x] = o[x];
    if (slusa) return;
    slusa = true;
    window.addEventListener('resize', prilagodi);
    /* kad se font učita, tekst je drukčije širine — ponovno odmjeri */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(prilagodi);
    try { if (window.frameElement) window.parent.addEventListener('resize', function () { try { prilagodi(); } catch (e) {} }); } catch (e) {}
  }
  return {
    DPR: DPR, usko: usko, visinaEkrana: visinaEkrana, kMax: kMax, kMin: kMin,
    k: function () { return k; }, u: function () { return k / DPR; },
    postavi: postavi, kPoSirini: kPoSirini, prilagodi: prilagodi, mjerilo: mjerilo
  };
})();
