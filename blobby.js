
/* =====================================================================
   BLOBBY — živi lik aplikacije (Blobby Languages)

   BlobbyLik.novi(kontejner, oblacic, opcije) pretvori prazan <div> u Blobbyja
   koji izgovori svoj oblačić kad oblačić dođe na ekran.
     opcije.izvori   – engleski izvor svakog odlomka (DE/ES dobivaju istu glumu)
     opcije.cues     – ručna gluma po odlomku: [{ u: 0..1, izraz, gesta }]
     opcije.preskok  – prikaži ⏩ (račun ima napredak na ovoj ili kasnijoj vježbi)
   Pravila režije: BLOBBY-rezija.md. Laboratorij: blobby-opusteno.html.
   ===================================================================== */
(function () {
  const OBRIS_DATA = [[-14.3, -140.0], [-22.6, -140.0], [-30.7, -139.0], [-38.9, -137.5], [-46.8, -135.2], [-54.5, -132.3], [-62.1, -128.9], [-69.3, -125.0], [-76.2, -120.4], [-82.6, -115.2], [-88.7, -109.7], [-94.4, -103.7], [-99.4, -97.1], [-103.9, -90.1], [-107.9, -82.9], [-111.5, -75.5], [-114.4, -67.7], [-117.0, -59.9], [-118.8, -51.8], [-120.1, -43.7], [-121.3, -35.5], [-122.6, -27.3], [-124.2, -19.3], [-126.7, -11.4], [-129.6, -3.7], [-133.6, 3.6], [-138.1, 10.5], [-143.3, 17.0], [-148.4, 23.5], [-152.9, 30.4], [-156.8, 37.7], [-159.6, 45.4], [-161.6, 53.5], [-162.5, 61.7], [-162.5, 69.9], [-161.2, 78.1], [-159.1, 86.1], [-156.0, 93.7], [-152.0, 101.0], [-146.8, 107.4], [-140.5, 112.8], [-133.7, 117.3], [-126.2, 120.8], [-118.2, 122.9], [-110.0, 124.1], [-101.8, 123.1], [-93.6, 122.5], [-85.3, 122.5], [-77.2, 124.0], [-69.5, 126.8], [-62.0, 130.3], [-54.5, 133.9], [-46.8, 136.8], [-38.9, 139.1], [-30.7, 140.0], [-22.4, 140.0], [-14.2, 139.8], [-6.1, 138.1], [1.8, 135.6], [9.5, 132.6], [16.8, 128.8], [23.8, 124.4], [30.9, 120.2], [38.3, 116.5], [46.1, 113.9], [54.3, 113.0], [62.6, 113.0], [70.9, 113.0], [79.1, 112.1], [87.1, 110.2], [94.9, 107.6], [102.3, 103.9], [109.1, 99.2], [115.2, 93.6], [120.4, 87.2], [124.6, 80.1], [128.0, 72.6], [130.6, 64.7], [132.2, 56.6], [132.5, 48.4], [132.3, 40.1], [131.1, 31.9], [128.8, 24.0], [125.6, 16.4], [121.4, 9.3], [116.3, 2.8], [110.8, -3.4], [105.1, -9.4], [99.1, -15.1], [93.6, -21.2], [89.0, -28.1], [85.2, -35.4], [82.1, -43.1], [79.8, -51.0], [78.0, -59.1], [75.9, -67.1], [73.4, -74.9], [70.3, -82.6], [66.3, -89.8], [61.9, -96.8], [57.1, -103.6], [51.8, -109.9], [45.8, -115.5], [39.3, -120.7], [32.5, -125.4], [25.3, -129.4], [17.8, -132.8], [10.1, -135.7], [2.1, -137.9], [-6.1, -138.9]];
  const ogr0 = (v, a, b) => Math.max(a, Math.min(b, v));

  // ---- režija je zajednička svim Blobbyjima na stranici ----
    const PRAVILA = [
    // vrsta            prepoznaje                                                                                     izraz           gesta        kada
    { vrsta: 'pohvala_velika', re: /^(ČESTITAMO!|You did it\.)/,                                                       izraz: 'smijeh',     gesta: 'juhu',      kada: 'odmah', poslije: 'ponosan' },
    { vrsta: 'pohvala',  re: /^(Bravo|Odlično|Sjajno|Izvrsno|Čestitamo|Divno|Krasno|Fantastično)!/,                       izraz: 'smijeh',     gesta: 'juhu',      kada: 'odmah', poslije: 'veselo' },
    { vrsta: 'pozdrav',  re: /^(Welcome|Hi\b|Hello|There you are)/,                                                      izraz: 'veselo',     gesta: 'pozdrav',   kada: 'odmah' },
    { vrsta: 'sala',     re: /(You're welcome\.|Sneaky, right\?|Efficient, right\?|hate this|suspiciously|hopefully not|it's shy|Enjoy the freedom|Some words are too important)/, izraz: 'namig', gesta: null, kada: 'na_rijeci' },
    { vrsta: 'zamka',    re: /(trap|mistake|Careful|careful)/,                                                           izraz: 'iznenaden',  gesta: null,        kada: 'na_rijeci', poslije: 'znatizelja' },
    { vrsta: 'iznimka',  re: /(exception|rebels|quirks|ignore everything|squeezes)/i,                                    izraz: 'znatizelja', gesta: 'ne_znam',   kada: 'na_rijeci' },
    { vrsta: 'tajna',    re: /(secret|Notice|notice something|Spot the pattern|Recognize|Watch:|Think of it as|The test:|Rule of thumb)/, izraz: 'znatizelja', gesta: 'pokazuje', kada: 'na_rijeci' },
    { vrsta: 'mastanje', re: /(Imagine|dream|What \*would\*)/,                                                            izraz: 'razmislja',  gesta: 'razmislja', kada: 'na_rijeci' },
    { vrsta: 'poziv',    re: /(Let's|Time to|See how far|See if you can|how much do you remember|finish strong|before the timer)/, izraz: 'odlucan', gesta: 'ajmo', kada: 'na_rijeci' },
    { vrsta: 'uputa',    re: /(Tap to reveal|Tap the|tap EN)/,                                                            izraz: 'veselo',     gesta: 'pokazuje',  kada: 'na_rijeci' },
    { vrsta: 'umirivanje', re: /(Don't worry|don't have to|Good news|good news|refreshingly simple|delightfully simple|past the hardest part|recycles)/, izraz: 'veselo', gesta: null, kada: 'na_rijeci' },
    { vrsta: 'uzbudenje', re: /(big day|Summer is coming|Friday night!|December in Croatia)/,                             izraz: 'iznenaden',  gesta: null,        kada: 'odmah', poslije: 'veselo' },
    { vrsta: 'pitanje',  re: /\?\s*$/,                                                                                     izraz: 'znatizelja', gesta: null,        kada: 'na_kraju' },
  ];
    function rastavi(md) {
    const seg = []; const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g; let zadnji = 0, m;
    while ((m = re.exec(md))) {
      if (m.index > zadnji) seg.push({ t: md.slice(zadnji, m.index) });
      const b = m[0].startsWith('**'); seg.push({ t: m[0].slice(b ? 2 : 1, b ? -2 : -1), b, i: !b });
      zadnji = m.index + m[0].length;
    }
    if (zadnji < md.length) seg.push({ t: md.slice(zadnji) });
    return seg;
  }
  // koja gluma ide uz rečenicu i kad (položaj u čistom tekstu)
  let zadnjaGestaBila = false;
  function rezija(md) {
    const cist = rastavi(md).map(x => x.t).join(''), cues = [];
    for (const P of PRAVILA) {
      const m = P.re.exec(cist.replace(/\*/g, '')); if (!m) continue;
      const pos = P.kada === 'odmah' ? 0 : P.kada === 'na_kraju' ? Math.max(0, cist.length - 2) : m.index;
      // najviše jedna gesta po oblačiću, i ne dvije za redom (osim pohvale i pozdrava)
      let gesta = P.gesta;
      if (gesta && zadnjaGestaBila && !/pohvala|pozdrav/.test(P.vrsta)) gesta = null;
      cues.push({ pos, izraz: P.izraz, gesta, vrsta: P.vrsta });
      if (P.poslije) cues.push({ pos: pos + 12, izraz: P.poslije });
      break;   // prva pogođena vrsta određuje glumu rečenice
    }
    if (!cues.length) cues.push({ pos: 0, izraz: 'osmijeh', vrsta: 'pripovijedanje' });
    zadnjaGestaBila = cues.some(c => c.gesta);
    return cues;
  }

  // ---- oblačić i ispis slovo po slovo ----

  // u svakom trenutku govori najviše jedan Blobby; ostali čekaju red
  // red čekanja: govori jedan po jedan, UVIJEK redom na stranici (odozgo prema dolje)
  const cekaju = []; let govoriNetko = false;
  const prije = (a, b) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
  function uRed(ja, fn) { cekaju.push({ ja, fn, od: performance.now() }); sljedeci(); }
  function sljedeci() {
    if (govoriNetko) return;
    for (let i = cekaju.length - 1; i >= 0; i--) if (!cekaju[i].ja.kontejner.isConnected) cekaju.splice(i, 1);
    if (!cekaju.length) return;
    cekaju.sort((a, b) => prije(a.ja.kontejner, b.ja.kontejner) ? -1 : 1);
    const c = cekaju[0];
    // gornji Blobby koji se već vidi, a još nije u redu, ima prednost (čeka se najviše 1,5 s)
    const gornji = SVI.find(o => o !== c.ja && !o.uRedu && o.vidljiv && o.kontejner.isConnected && prije(o.kontejner, c.ja.kontejner));
    if (gornji && performance.now() - c.od < 1500) { setTimeout(sljedeci, 200); return; }
    cekaju.shift(); govoriNetko = true;
    c.fn(() => { govoriNetko = false; setTimeout(sljedeci, 400); });
  }

  // svi Blobbyji na stranici i onaj koji upravo govori (ostali ga povremeno pogledaju)
  const SVI = []; let GOVORNIK = null;
  const normEN = s => String(s || '').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  // gluma za odlomak: ručna, ili iz pravila nad engleskim izvorom (položaj se preslika na prijevod)
  function rezijaZaOdlomak(tekst, izvor, rucni) {
    const n = Math.max(1, tekst.length);
    if (rucni) return rucni.map(c => ({ pos: Math.round((c.u || 0) * n), izraz: c.izraz, gesta: c.gesta })).sort((a, b) => a.pos - b.pos);
    const baza = izvor || tekst, m = Math.max(1, baza.length);
    return rezija(baza).map(c => ({ ...c, pos: Math.round(c.pos / m * n) })).sort((a, b) => a.pos - b.pos);
  }

  let brojac = 0;
  function novi(kontejner, oblacic, opcije) {
    opcije = opcije || {};
    oblacic.classList.add('blobbyCeka');
    const s = 'b' + (++brojac);
    kontejner.innerHTML = `<svg viewBox="-260 -255 520 450" aria-hidden="true">
  <defs>
    <clipPath id="klipOkoL-${s}"><path class="okoKlip"/></clipPath>
    <clipPath id="klipOkoD-${s}"><path class="okoKlip"/></clipPath>
    <clipPath id="klipUsta-${s}"><path id="ustaKlip-${s}"/></clipPath>
  </defs>
  <ellipse id="sjena-${s}" cx="-15" cy="156" rx="150" ry="10" fill="#ebe5d6"/>
  <g id="tijelo-${s}">
    <path id="koza-${s}" fill="#7eabca"/>
    <g id="glava-${s}">
      <g id="lice-${s}" fill="none" stroke="#22385a" stroke-linecap="round" stroke-linejoin="round">
        <ellipse id="obrazL-${s}" fill="#f1a7c1" stroke="none" rx="15" ry="8" opacity="0"/>
        <ellipse id="obrazD-${s}" fill="#f1a7c1" stroke="none" rx="15" ry="8" opacity="0"/>
        <path id="obrvaL-${s}" stroke-width="6"/>
        <path id="obrvaD-${s}" stroke-width="6"/>
        <g id="okoL-${s}">
          <path class="bjelo" fill="#fff" stroke="none"/>
          <g clip-path="url(#klipOkoL-${s})"><g class="zjenica" stroke="none">
            <circle class="sar" fill="#22385a"/><circle cx="5" cy="-6" r="4.6" fill="#fff"/>
          </g></g>
          <path class="zatvoreno" stroke-width="5.5" opacity="0"/>
        </g>
        <g id="okoD-${s}">
          <path class="bjelo" fill="#fff" stroke="none"/>
          <g clip-path="url(#klipOkoD-${s})"><g class="zjenica" stroke="none">
            <circle class="sar" fill="#22385a"/><circle cx="5" cy="-6" r="4.6" fill="#fff"/>
          </g></g>
          <path class="zatvoreno" stroke-width="5.5" opacity="0"/>
        </g>
        <g id="usta-${s}">
          <path id="ustaOblik-${s}" fill="#22385a" stroke-width="4"/>
          <g clip-path="url(#klipUsta-${s})" stroke="none"><ellipse id="jezik-${s}" fill="#ec8aa3"/></g>
        </g>
      </g>
    </g>
  </g>
</svg>`;
    const $ = id => kontejner.querySelector('#' + id + '-' + s);
    const scena = kontejner.querySelector('svg'), tijelo = $('tijelo'), koza = $('koza'), glava = $('glava'), sjena = $('sjena');
  const smanjeno = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const f = n => n.toFixed(1), ogr = (v, a, b) => Math.max(a, Math.min(b, v));
  const glatko = (a, b, x) => { const u = ogr((x - a) / (b - a), 0, 1); return u * u * (3 - 2 * u); };

  // ---------- OPUŠTENO TIJELO (silueta prema Blobby9, visina prema originalu) ----------
  // =====================================================================
  //  TIJELO kao jedna cjelina: obris se mjeri kao udaljenost od središta
  //  u svakom smjeru. Ruke mogu samo "nabubriti" taj obris (glatki maksimum),
  //  pa nikad ne nastaju rupe ni duboke usjekline — koža ih popunjava.
  // =====================================================================
  // donji dio tijela malo sužen (glava ostaje ista)
  const OBRIS = OBRIS_DATA.map(([x, y]) => [-15 + (x + 15) * (1 - 0.13 * glatko(-30, 120, y)), y]);
  const C = [-15, 15], DNO = 140, M = 180;
  const KUT = i => -Math.PI / 2 + (i / M) * 2 * Math.PI;   // od vrha, u smjeru kazaljke
  // osnovni polumjer opuštenog tijela u svakom smjeru (zraka iz središta)
  const R0 = Array.from({ length: M }, (_, i) => {
    const a = KUT(i), dx = Math.cos(a), dy = Math.sin(a); let best = 0;
    for (let j = 0; j < OBRIS.length; j++) {
      const p = OBRIS[j], q = OBRIS[(j + 1) % OBRIS.length];
      const ex = q[0] - p[0], ey = q[1] - p[1], wx = p[0] - C[0], wy = p[1] - C[1];
      const den = dx * ey - dy * ex; if (Math.abs(den) < 1e-9) continue;
      const t = (wx * ey - wy * ex) / den, u = (wx * dy - wy * dx) / den;
      if (t > 0 && u >= 0 && u <= 1) best = Math.max(best, t);
    }
    return best;
  });
  // pogled sprijeda: tijelo je simetrično oko svoje osi (x = -15)
  { const sim = R0.map((r, i) => (r + R0[(M - i) % M]) / 2); sim.forEach((r, i) => { R0[i] = r; }); }
  const smjerOd = p => Math.atan2(p[1] - C[1], p[0] - C[0]);
  const kutnaUdalj = (a, b) => { let d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
  // tri brežuljka na dnu (smjerovi izmjereni iz obrisa)
  const BREZ = [43, 55, 67].map(j => smjerOd(OBRIS[j]));
  const smax = (a, b, k) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.max(a, b) + h * h * k * 0.25; };
  const R0u = a => { const x = ((a + Math.PI / 2) / (2 * Math.PI)) * M; const i = Math.floor(x), u = x - i; return R0[((i % M) + M) % M] * (1 - u) + R0[(((i + 1) % M) + M) % M] * u; };

  // RUKA = deblji kratki "valjak" od 3 kruga, ukorijenjen ispod kože.
  // rame: smjer iz središta (°, 0 = desno, + = dolje); kut: smjer ruke; duljina: koliko izlazi; debljina: polumjer.
  // Granice: ruka nikad ne smije biti tanka ni duga.
  const SPOJ = 24;   // koliko se mekano koža popunjava između ruke i tijela
  const RUKA_GRANICE = { debljina: [24, 32], duljina: [0, 92] };
  function rukaPolumjer(a, ruka) {
    const ps = ruka.rame * Math.PI / 180, ka = ruka.kut * Math.PI / 180;
    const rb = R0u(ps) - ruka.uvuceno;
    const B = [C[0] + Math.cos(ps) * rb, C[1] + Math.sin(ps) * rb];
    const dx = Math.cos(a), dy = Math.sin(a);
    let r = -1e9;
    for (const k of [0, 0.5, 1]) {
      const Q = [B[0] + Math.cos(ka) * ruka.duljina * k, B[1] + Math.sin(ka) * ruka.duljina * k];
      const qx = Q[0] - C[0], qy = Q[1] - C[1];
      const tp = qx * dx + qy * dy, dperp = Math.abs(qx * dy - qy * dx), rho = ruka.debljina * (k === 1 ? 0.96 : 1);
      const s = dperp / rho;
      const v = s < 1 ? tp + rho * Math.sqrt(1 - s * s) : tp - rho * (s - 1) * 1.6;
      r = smax(r, v, 6);
    }
    return r;
  }
  const zrcali = r => ({ ...r, rame: 180 - r.rame, kut: 180 - r.kut });

  // ---- spajanje tijela i ruku kao dvije kapi (glatki minimum udaljenosti) ----
  const smin = (a, b, k) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * 0.25; };
  const KORAK = 5, GX0 = -260, GY0 = -255, GW = Math.ceil(520 / KORAK) + 1, GH = Math.ceil(450 / KORAK) + 1;
  const polje = new Float32Array(GW * GH);
  function udaljOdTijela(px, py, tijelo, rU) {
    let best = 1e9;
    for (let i = 0; i < tijelo.length; i++) {
      const a = tijelo[i], b = tijelo[(i + 1) % tijelo.length];
      const ex = b[0] - a[0], ey = b[1] - a[1], wx = px - a[0], wy = py - a[1];
      const t = Math.max(0, Math.min(1, (wx * ex + wy * ey) / (ex * ex + ey * ey)));
      const dx = wx - ex * t, dy = wy - ey * t, d = dx * dx + dy * dy;
      if (d < best) best = d;
    }
    const dd = Math.sqrt(best);
    const ang = Math.atan2(py - C[1], px - C[0]);
    return Math.hypot(px - C[0], py - C[1]) < rU(ang) ? -dd : dd;
  }
  function udaljOdRuke(px, py, ruka) {
    const ps = ruka.rame * Math.PI / 180, ka = ruka.kut * Math.PI / 180;
    const rb = R0u(ps) - ruka.uvuceno;
    const A = [C[0] + Math.cos(ps) * rb, C[1] + Math.sin(ps) * rb];
    const B = [A[0] + Math.cos(ka) * ruka.duljina, A[1] + Math.sin(ka) * ruka.duljina];
    const ex = B[0] - A[0], ey = B[1] - A[1], wx = px - A[0], wy = py - A[1];
    const L2 = ex * ex + ey * ey;
    const t = L2 > 0 ? Math.max(0, Math.min(1, (wx * ex + wy * ey) / L2)) : 0;
    return Math.hypot(wx - ex * t, wy - ey * t) - ruka.debljina * (1 - 0.06 * t);
  }
  function obrisIzPolja() {
    // marching squares -> najdulja zatvorena petlja
    const veze = new Map(), tocka = new Map();
    const kljucH = (i, j) => j * GW + i, kljucV = (i, j) => GW * GH + j * GW + i;
    const v = (i, j) => polje[j * GW + i];
    const tH = (i, j) => { const a = v(i, j), b = v(i + 1, j), u = a / (a - b); return [GX0 + (i + u) * KORAK, GY0 + j * KORAK]; };
    const tV = (i, j) => { const a = v(i, j), b = v(i, j + 1), u = a / (a - b); return [GX0 + i * KORAK, GY0 + (j + u) * KORAK]; };
    const spoji = (k1, p1, k2, p2) => {
      tocka.set(k1, p1); tocka.set(k2, p2);
      (veze.get(k1) || veze.set(k1, []).get(k1)).push(k2);
      (veze.get(k2) || veze.set(k2, []).get(k2)).push(k1);
    };
    for (let j = 0; j < GH - 1; j++) for (let i = 0; i < GW - 1; i++) {
      const a = v(i, j) < 0, b = v(i + 1, j) < 0, c = v(i + 1, j + 1) < 0, d = v(i, j + 1) < 0;
      const slucaj = (a ? 8 : 0) | (b ? 4 : 0) | (c ? 2 : 0) | (d ? 1 : 0);
      if (slucaj === 0 || slucaj === 15) continue;
      const G = [kljucH(i, j), () => tH(i, j)], D = [kljucV(i + 1, j), () => tV(i + 1, j)],
            Do = [kljucH(i, j + 1), () => tH(i, j + 1)], L = [kljucV(i, j), () => tV(i, j)];
      const par = (x, y) => spoji(x[0], x[1](), y[0], y[1]());
      switch (slucaj) {
        case 1: case 14: par(L, Do); break;
        case 2: case 13: par(Do, D); break;
        case 3: case 12: par(L, D); break;
        case 4: case 11: par(G, D); break;
        case 6: case 9:  par(G, Do); break;
        case 7: case 8:  par(L, G); break;
        case 5: par(L, G); par(Do, D); break;
        case 10: par(G, D); par(L, Do); break;
      }
    }
    let najbolja = [], vidjeno = new Set();
    for (const start of veze.keys()) {
      if (vidjeno.has(start)) continue;
      const petlja = []; let prev = null, cur = start;
      while (cur !== undefined && !vidjeno.has(cur)) {
        vidjeno.add(cur); petlja.push(tocka.get(cur));
        const n = veze.get(cur); const next = n[0] !== prev ? n[0] : n[1];
        prev = cur; cur = next;
      }
      if (petlja.length > najbolja.length) najbolja = petlja;
    }
    return najbolja;
  }

  // ---------- LICE ----------
  // =====================================================================
  //  LICE = nekoliko neovisnih "mišića"; izraz je samo njihova kombinacija.
  // =====================================================================
  const LICE = { oci: [[-30, -58], [36, -58]], obrve: [[-32, -94], [38, -94]], usta: [3, -24] };
  const NEUTRALNO = {
    otvL: 1, otvD: 1,          // gornji kapak: 1 = otvoreno, 0 = zatvoreno
    smijehL: 0.12, smijehD: 0.12, // donji kapak / obraz: 1 = oko postane ^
    kapak: 0,                  // nagib gornjeg kapka: + = odlučno (unutra niže), − = nježno
    zjenica: 1,                // veličina zjenice
    gledX: 0, gledY: 0,        // pogled koji traži izraz (dodaje se slobodnom pogledu)
    obrvaL: 0, obrvaD: 0,      // visina obrva (− = gore)
    obrvaNagib: 0,             // + = unutarnji krajevi gore (suosjećanje), − = dolje (odlučnost)
    osmijeh: 1, otvor: 0, sirina: 1, kosina: 0,
    rumenilo: 0,
  };
  const IZRAZI = {
    osmijeh:     { opis: 'osnovni, prijateljski' },
    veselo:      { opis: 'otvoren osmijeh', smijehL: 0.35, smijehD: 0.35, osmijeh: 1.1, otvor: 0.45, obrvaL: -4, obrvaD: -4 },
    smijeh:      { opis: 'smije se na sav glas', smijehL: 1, smijehD: 1, osmijeh: 1.15, otvor: 1, sirina: 1.1, obrvaL: -6, obrvaD: -6, rumenilo: 0.7 },
    namig:       { opis: 'zaigrano drzak', smijehD: 1, otvD: 0.85, obrvaD: 4, obrvaL: -8, osmijeh: 1.05, kosina: 0.6, smijehL: 0.2 },
    znatizelja:  { opis: 'jedna obrva gore', obrvaD: -13, obrvaL: 2, zjenica: 1.12, osmijeh: 0.5, otvor: 0.18, sirina: 0.7, kosina: 0.4, smijehL: 0.05, smijehD: 0.05 },
    iznenaden:   { opis: 'oho!', otvL: 1.12, otvD: 1.12, smijehL: 0, smijehD: 0, zjenica: 0.75, obrvaL: -15, obrvaD: -15, osmijeh: 0.25, otvor: 0.95, sirina: 0.5 },
    razmislja:   { opis: 'hmm…', gledX: 0.6, gledY: -0.75, obrvaL: -10, obrvaD: 2, osmijeh: 0.12, sirina: 0.55, kosina: -0.9, smijehL: 0.1, smijehD: 0.1, otvL: 0.95, otvD: 0.95 },
    ponosan:     { opis: 'zadovoljan sobom', smijehL: 1, smijehD: 1, osmijeh: 1.2, obrvaL: -3, obrvaD: -3, rumenilo: 0.6 },
    suosjecanje: { opis: 'nakon pogreške: nježan, nikad razočaran', obrvaNagib: 1, obrvaL: -3, obrvaD: -3, osmijeh: 0.6, sirina: 0.8, smijehL: 0.22, smijehD: 0.22, kapak: -0.5 },
    odlucan:     { opis: '"ajmo!"', obrvaNagib: -1, obrvaL: 3, obrvaD: 3, kapak: 0.5, smijehL: 0.25, smijehD: 0.25, osmijeh: 1, otvor: 0.35, sirina: 1.05, kosina: 0.25 },
    sramezljiv:  { opis: 'pohvaljen pa se srami', gledX: -0.6, gledY: 0.6, rumenilo: 1, osmijeh: 0.75, sirina: 0.6, smijehL: 0.4, smijehD: 0.4, obrvaNagib: 0.6 },
    ne_znam:     { opis: 'tko zna…', obrvaL: -10, obrvaD: -10, obrvaNagib: 0.7, osmijeh: 0.3, sirina: 0.75, kosina: -0.5 },
    pospan:      { opis: 'teški kapci', otvL: 0.5, otvD: 0.5, smijehL: 0, smijehD: 0, obrvaL: 3, obrvaD: 3, osmijeh: 0.45, sirina: 0.7 },
    zijeva:      { opis: 'zijevne', otvL: 0.08, otvD: 0.08, smijehL: 0.5, smijehD: 0.5, obrvaNagib: 0.5, osmijeh: 0.2, otvor: 1.2, sirina: 0.55 },
    gleda_desno: { opis: 'pogled prema onome što pokazuje', gledX: 0.95, gledY: 0.1, obrvaL: -6, obrvaD: -6, osmijeh: 1.05, otvor: 0.4, smijehL: 0.25, smijehD: 0.25 },
    gleda_lijevo:{ opis: 'pogled ulijevo', gledX: -0.95, gledY: 0.1, obrvaL: -6, obrvaD: -6, osmijeh: 1.05, otvor: 0.4, smijehL: 0.25, smijehD: 0.25 },
  };
  for (const k in IZRAZI) IZRAZI[k] = { ...NEUTRALNO, ...IZRAZI[k] };
  const F = { ...NEUTRALNO };                      // trenutno stanje lica
  const BRZINA = { otvL: 14, otvD: 14, smijehL: 10, smijehD: 10, kapak: 10, zjenica: 8, gledX: 14, gledY: 14,
                   obrvaL: 11, obrvaD: 11, obrvaNagib: 10, osmijeh: 8, otvor: 10, sirina: 8, kosina: 8, rumenilo: 3 };

  // oko: krug ograničen gornjim kapkom (ravna crta) i donjim kapkom (luk koji se diže kod osmijeha)
  function oko(el, i, otv, smijeh, gx, gy) {
    const [cx, cy] = LICE.oci[i], r = 22, unutra = i ? -1 : 1;   // unutarnji kut oka je prema nosu
    const vrh = x => cy - r + 2 * r * (1 - otv) + F.kapak * 7 * ((x - cx) / r) * unutra;
    const dno = x => cy + r - smijeh * 2 * r * 0.98 * (1 - 0.55 * ((x - cx) / r) ** 2);
    const pts = [];
    for (let k = 0; k < 48; k++) {
      const a = k / 48 * Math.PI * 2, x = cx + r * Math.cos(a);
      let y = cy + r * Math.sin(a);
      y = Math.max(y, vrh(x)); y = Math.min(y, Math.max(dno(x), vrh(x)));
      pts.push([x, y]);
    }
    const oblik = 'M' + pts.map(p => f(p[0]) + ' ' + f(p[1])).join('L') + 'Z';
    const bj = el.querySelector('.bjelo'), zj = el.querySelector('.zjenica'), zatv = el.querySelector('.zatvoreno');
    bj.setAttribute('d', oblik);
    $(i ? 'klipOkoD' : 'klipOkoL').querySelector('.okoKlip').setAttribute('d', oblik);
    el.querySelector('.sar').setAttribute('r', f(13 * F.zjenica));
    // koliko je oko otvoreno u sredini; zjenica sjeda u vidljivi dio oka
    const gornji = Math.max(vrh(cx), cy - r), donji = Math.min(dno(cx), cy + r), h = donji - gornji;
    const sredina = ogr(cy + 3, gornji + 13 * F.zjenica * 0.55, donji - 13 * F.zjenica * 0.35);
    zj.setAttribute('transform', `translate(${f(cx + unutra * 2 + gx * 7)} ${f(sredina + gy * Math.min(6, h * 0.2))})`);
    const vid = glatko(3, 9, h);
    bj.setAttribute('opacity', f(vid)); zj.setAttribute('opacity', f(vid)); zatv.setAttribute('opacity', f(1 - vid));
    const odSmijeha = smijeh > 1 - otv + 0.15;     // zatvorio ga osmijeh (^) ili kapak (‿)
    zatv.setAttribute('d', odSmijeha
      ? `M${cx - 17} ${f(cy + 4)}Q${cx} ${f(cy - 14)} ${cx + 17} ${f(cy + 4)}`
      : `M${cx - 19} ${f(cy)}Q${cx} ${f(cy + 7)} ${cx + 19} ${f(cy)}`);
  }
  function obrva(el, i) {
    const [x, y] = LICE.obrve[i], unutra = i ? -1 : 1, h = (i ? F.obrvaD : F.obrvaL) - Math.max(F.smijehL, F.smijehD) * 3;
    const xu = x + 14 * unutra, xv = x - 14 * unutra;
    const yu = y + h - F.obrvaNagib * 7, yv = y + h + F.obrvaNagib * 2;
    el.setAttribute('d', `M${f(xv)} ${f(yv)}Q${x} ${f(y + h - 7 - F.obrvaNagib * 2)} ${f(xu)} ${f(yu)}`);
  }
  function usta() {
    const [x, y] = LICE.usta, w = 25 * F.sirina, o = F.otvor, k = F.kosina * 6;
    const dolje = 26 * F.osmijeh + o * 24;
    const gore = 8 * F.osmijeh * (1 - Math.min(o, 1) * 0.85) - o * Math.max(0, 1 - F.osmijeh) * 12;
    const d = `M${f(x - w)} ${f(y + k)}Q${x} ${f(y + dolje)} ${f(x + w)} ${f(y - k)}Q${x} ${f(y + gore)} ${f(x - w)} ${f(y + k)}Z`;
    $('ustaOblik').setAttribute('d', d); $('ustaKlip').setAttribute('d', d);
    const j = $('jezik'); j.setAttribute('cx', x); j.setAttribute('cy', f(y + dolje * 0.5));
    j.setAttribute('rx', f(w * 0.5)); j.setAttribute('ry', f(Math.max(0, o - 0.35) * 12));
  }

  // trenutni osnovni izraz (gumbi) i izraz koji nameće gesta
  let osnovniIzraz = 'osmijeh', izrazGeste = null, zadnjiIzraz = 'osmijeh';
  let mikroOd = -1e9, sljedeciMikro = performance.now() + 5000;
  let govori = false, govorOtvor = 0;            // dok se tekst ispisuje, usta se miču po slovima

  // ---------- pogled ----------
  let pokX = 0, pokY = 0, pokVrijeme = -1e9;
  addEventListener('pointermove', e => {
    const pt = scena.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(scena.getScreenCTM().inverse()); pokX = p.x; pokY = p.y; pokVrijeme = performance.now();
  });
  // OKRET tijela: -1 = okrenut nama ulijevo, 0 = sprijeda, +1 = udesno
  let okret = 0, ciljOkret = 0, sljedeciOkret = performance.now() + 3500, fiksniOkret = null;
  const OKRET_MAKS = 32;      // stupnjeva kod okret = ±1 (više od toga lice izlazi preko ruba glave)
  const OS_X = -15, GLAVA_R = 100, LICE_POMAK = -18;   // lice je na osi tijela
  function okreniDio(el, xd) {          // xd = središte dijela u koordinatama crteža lica
    const xf = xd + LICE_POMAK, fi = Math.asin(ogr((xf - OS_X) / GLAVA_R, -0.95, 0.95));
    const th = okret * OKRET_MAKS * Math.PI / 180, nf = ogr(fi + th, -1.45, 1.45);
    const nx = OS_X + GLAVA_R * Math.sin(nf), sk = Math.max(0.15, Math.cos(nf) / Math.cos(fi));
    el.setAttribute('transform', `translate(${f(nx)} 0) scale(${sk.toFixed(3)} 1) translate(${f(-xd)} 0)`);
  }
  let gx = 0, gy = 0, ciljGX = 0, ciljGY = 0, sljedeciPogled = performance.now() + 3000;
  let treptajOd = -1e9, sljedeciTreptaj = performance.now() + 2000;

  // =====================================================================
  //  GESTE — niz ključnih poza (t = udio trajanja). Svaka poza nasljeđuje
  //  prethodnu, a prijelazi su glatki (polako kreće, polako staje).
  //  D / L = desna / lijeva ruka (lijeva je zrcalna), obje = obje ruke.
  //  gnjec: + spljošti, − izduži · skok: odlebdi gore · nagib: vrh tijela u stranu · okret: −1…1
  // =====================================================================
  const O = { rame: 14, kut: 40, duljina: 8, debljina: 27, uvuceno: 24 };          // ruka u odmoru
  const RUKA = {
    gore:     { rame: -4, kut: -72, duljina: 90, debljina: 25, uvuceno: 30 },
    van:      { rame: 6, kut: -8, duljina: 50, debljina: 27, uvuceno: 24 },
    uvucena:  { rame: 14, kut: 40, duljina: 0, debljina: 24, uvuceno: 34 },
    pokazuje: { rame: 0, kut: -16, duljina: 72, debljina: 24, uvuceno: 28 },
    prst:     { rame: -6, kut: -58, duljina: 62, debljina: 24, uvuceno: 28 },   // podignut "prst": hmm…
    sleg:     { rame: -10, kut: -48, duljina: 32, debljina: 26, uvuceno: 27 },
    sake:     { rame: -2, kut: -62, duljina: 58, debljina: 26, uvuceno: 28 },
  };
  const GESTE = {
    pozdrav: { opis: 'maše', ms: 2700, lice: [[0.05, 'veselo'], [0.82, 'osmijeh']], k: [
      { t: 0.08, gnjec: 0.04 },
      { t: 0.24, D: RUKA.gore, okret: -0.4, gnjec: -0.03 },
      { t: 0.33, D: { kut: -50 } }, { t: 0.43, D: { kut: -74 } }, { t: 0.53, D: { kut: -50 } }, { t: 0.63, D: { kut: -74 } },
      { t: 0.74, D: { kut: -64 } }, { t: 0.82 } ] },
    juhu: { opis: 'skok od sreće, obje ruke gore', ms: 1700, lice: [[0.02, 'odlucan'], [0.3, 'smijeh'], [0.88, 'veselo']], k: [
      { t: 0.16, obje: RUKA.uvucena, gnjec: 0.11 },
      { t: 0.40, obje: RUKA.gore, skok: 42, gnjec: -0.09 },
      { t: 0.60, skok: 0, gnjec: 0.08 },
      { t: 0.72, gnjec: -0.02 }, { t: 0.82, gnjec: 0 } ] },
    pokazuje: { opis: 'pokazuje udesno (na oblačić, gumb…)', ms: 2400, lice: [[0.12, 'gleda_desno'], [0.8, 'osmijeh']], k: [
      { t: 0.10, gnjec: 0.03, okret: -0.1 },
      { t: 0.30, D: RUKA.pokazuje, okret: 0.5, nagib: 8 },
      { t: 0.38, D: { duljina: 80 } },
      { t: 0.46, D: { duljina: 72 } }, { t: 0.80 } ] },
    razmislja: { opis: 'hmm… podigne prst, nagne glavu', ms: 3000, lice: [[0.12, 'razmislja'], [0.86, 'osmijeh']], k: [
      { t: 0.24, D: RUKA.prst, okret: 0.25, nagib: -8 },
      { t: 0.34, D: { duljina: 54 } }, { t: 0.42, D: { duljina: 62 } }, { t: 0.50, D: { duljina: 54 } }, { t: 0.58, D: { duljina: 62 } },
      { t: 0.80, nagib: -10 } ] },
    ne_znam: { opis: 'slegne ramenima', ms: 1400, lice: [[0.08, 'ne_znam'], [0.8, 'osmijeh']], k: [
      { t: 0.25, obje: RUKA.sleg, gnjec: 0.05, skok: 5 },
      { t: 0.60 } ] },
    protegne: { opis: 'lijeno se protegne', ms: 3000, lice: [[0.15, 'zijeva'], [0.72, 'pospan'], [0.92, 'osmijeh']], k: [
      { t: 0.15, gnjec: 0.04 },
      { t: 0.50, obje: { ...RUKA.van, duljina: 58, kut: -20 }, gnjec: -0.09, skok: 6 },
      { t: 0.70 }, { t: 0.85, gnjec: 0.03, skok: 0 } ] },
    ajmo: { opis: 'bodri: "ajmo!"', ms: 1600, lice: [[0.04, 'odlucan'], [0.78, 'veselo'], [0.95, 'osmijeh']], k: [
      { t: 0.10, gnjec: 0.05 },
      { t: 0.22, D: { ...RUKA.gore, duljina: 72, kut: -62 }, skok: 8, gnjec: -0.04, okret: -0.15 },
      { t: 0.34, D: { duljina: 38 }, skok: 0, gnjec: 0.04 },
      { t: 0.46, D: { duljina: 78 }, skok: 10, gnjec: -0.05 },
      { t: 0.60, D: { duljina: 45 }, skok: 0, gnjec: 0.02 }, { t: 0.72 } ] },
    sramezljiv: { opis: 'pohvaljen pa se srami', ms: 2600, lice: [[0.1, 'sramezljiv'], [0.86, 'osmijeh']], k: [
      { t: 0.25, obje: RUKA.uvucena, gnjec: 0.06, okret: 0.5, nagib: 6 },
      { t: 0.80 } ] },
    evo_me: { opis: 'pojavi se: čučne pa iskoči', ms: 1400, lice: [[0.04, 'iznenaden'], [0.4, 'smijeh'], [0.82, 'veselo']], k: [
      { t: 0.20, obje: RUKA.uvucena, gnjec: 0.12 },
      { t: 0.45, obje: RUKA.sake, skok: 30, gnjec: -0.07 },
      { t: 0.68, skok: 0, gnjec: 0.06 }, { t: 0.80, gnjec: 0 } ] },
  };
  // zrcalne geste: lijeva i desna ruka zamijene uloge, okret i nagib idu na drugu stranu
  function zrcaliGestu(G, opis) {
    const zr = { gleda_desno: 'gleda_lijevo', gleda_lijevo: 'gleda_desno' };
    return { opis, ms: G.ms, lice: (G.lice || []).map(([t, i]) => [t, zr[i] || i]),
             k: G.k.map(k => { const n = { ...k }; delete n.D; delete n.L;
               if (k.D) n.L = k.D; if (k.L) n.D = k.L;
               if (k.okret !== undefined) n.okret = -k.okret; if (k.nagib !== undefined) n.nagib = -k.nagib; return n; }) };
  }
  GESTE.pokazuje_lijevo = zrcaliGestu(GESTE.pokazuje, 'pokazuje ulijevo');
  // pretvori ključeve u potpune poze (svaka nasljeđuje prethodnu; početak i kraj = odmor)
  const ODMOR_POZA = { D: { ...O }, L: { ...O }, okret: 0, gnjec: 0, skok: 0, nagib: 0 };
  for (const G of Object.values(GESTE)) {
    let pret = ODMOR_POZA; const lista = [{ t: 0, ...ODMOR_POZA }];
    for (const k of G.k) {
      const p = { t: k.t, D: { ...pret.D, ...(k.obje || {}), ...(k.D || {}) }, L: { ...pret.L, ...(k.obje || {}), ...(k.L || {}) },
                  okret: k.okret ?? pret.okret, gnjec: k.gnjec ?? pret.gnjec, skok: k.skok ?? pret.skok, nagib: k.nagib ?? pret.nagib };
      lista.push(p); pret = p;
    }
    lista.push({ t: 1, ...ODMOR_POZA });
    G.poze = lista;
  }
  const lagano = u => u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
  const lr = (a, b, u) => a + (b - a) * u;
  const lrRuka = (a, b, u) => { const o = {}; for (const k in a) o[k] = lr(a[k], b[k], u); return o; };
  function pozaGeste(G, u) {
    const P = G.poze; let i = 0; while (i < P.length - 2 && P[i + 1].t <= u) i++;
    const a = P[i], b = P[i + 1], w = lagano(ogr((u - a.t) / Math.max(1e-6, b.t - a.t), 0, 1));
    let iz = null; for (const [tt, ime] of G.lice || []) if (u >= tt) iz = ime;
    return { D: lrRuka(a.D, b.D, w), L: lrRuka(a.L, b.L, w), okret: lr(a.okret, b.okret, w), gnjec: lr(a.gnjec, b.gnjec, w),
             skok: lr(a.skok, b.skok, w), nagib: lr(a.nagib, b.nagib, w), aktivna: true, izraz: iz };
  }

    // ---- tko pokreće geste: samo režija (nikad sam od sebe) ----
    let gestaIme = 'pozdrav', gestaOd = -1e9, slobodno = false, STAT_LICE = false;
    function pokreni(ime) { if (GESTE[ime]) { gestaIme = ime; gestaOd = performance.now(); } }
    let gesta = function (sad) { const u = (sad - gestaOd) / GESTE[gestaIme].ms; return u >= 0 && u < 1 ? pozaGeste(GESTE[gestaIme], u) : {}; };
    tijelo.addEventListener('pointerdown', () => { pokreni('juhu'); osnovniIzraz = 'osmijeh'; });
    // =====================================================================
    //  GOVOR: oblačić se napuše iz usta → izraste živi šiljak → ispis teksta
    //  (uvijek istim tempom) → šiljak se uvuče. ⏩ (samo uz napredak) ubrza
    //  ostatak 5× i otkriva ga redak po redak.
    // =====================================================================
    const ja = { kontejner, govori: false };
    SVI.push(ja);
    const red0 = kontejner.closest('.blobbyRed') || kontejner.parentElement;
    const SAMOGL = 'aeiouyäöüAEIOUYÄÖÜáéíóúàèìòùñ';
    let oblacicOtvoren = false, ispis = null, izgovoreno = false;
    let stranaOblacica = 1;               // +1 = oblačić desno od Blobbyja, −1 = lijevo
    const odlomci = Array.from(oblacic.querySelectorAll('.odlomak')).length ? Array.from(oblacic.querySelectorAll('.odlomak')) : [oblacic];
    const izvori = opcije.izvori || [];  // engleski izvor svakog odlomka (za režiju na DE/ES)

    // svako slovo u svoj <span>: nevidljivo, ali zauzima svoje mjesto (stranica ne skače)
    const pripremljeni = odlomci.map((p, i) => {
      const znakovi = [], sitnice = [], vrati = [];
      const hodaj = n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment(), st = [];
          for (const ch of n.textContent) { const sp = document.createElement('span'); sp.className = 'bz'; sp.textContent = ch; frag.appendChild(sp); st.push(sp); }
          const nag = n.parentElement && n.parentElement.closest('strong, b');
          st.forEach((sp, k) => znakovi.push({ sp, ch: sp.textContent, naglasak: !!nag && k === 0 }));
          if (st.length) vrati.push({ st, izvorni: n });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          if (n.matches('.zvucnik, .prijevodGumb, button, input, .prijevodTekst')) { if (!n.matches('.prijevodTekst')) { n.classList.add('bzSkriveno'); sitnice.push(n); } return; }
          Array.from(n.childNodes).forEach(hodaj);
        }
      };
      Array.from(p.childNodes).forEach(hodaj);
      const tekst = znakovi.map(z => z.ch).join('');
      return { p, znakovi, sitnice, vrati, tekst, cues: rezijaZaOdlomak(tekst, izvori[i], opcije.cues && opcije.cues[i]) };
    });
    function otkrijSve(o) {
      o.znakovi.forEach(z => z.sp.classList.add('v')); o.sitnice.forEach(e => e.classList.remove('bzSkriveno'));
      // vrati izvorni tekst (rječnik, odabir teksta i sve ostalo rade kao prije)
      o.vrati.forEach(({ st, izvorni }) => { if (st[0].parentNode) { st[0].replaceWith(izvorni); st.slice(1).forEach(x => x.remove()); } });
      o.vrati = [];
    }

    // ---- ⏩: samo kad račun ima napredak na ovoj ili kasnijoj vježbi ----
    let gumbBrzo = null, brzo = false;
    if (opcije.preskok) {
      gumbBrzo = document.createElement('button');
      gumbBrzo.type = 'button'; gumbBrzo.className = 'blobbyBrzo'; gumbBrzo.hidden = true;
      gumbBrzo.setAttribute('aria-label', opcije.natpisBrzo || 'Faster'); gumbBrzo.title = opcije.natpisBrzo || 'Faster';
      gumbBrzo.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6l8 6-8 6zM12 6l8 6-8 6z"/></svg>';
      gumbBrzo.addEventListener('click', e => { e.stopPropagation(); brzo = true; gumbBrzo.hidden = true; });
      oblacic.appendChild(gumbBrzo);
      oblacic.classList.add('imaBrzo');
    }

    // ---- živi šiljak: crta se svaki kadar prema ustima, uvijek malo odmaknut ----
    const NS = 'http://www.w3.org/2000/svg';
    const sloj = document.createElementNS(NS, 'svg'); sloj.setAttribute('class', 'blobbySiljak'); sloj.setAttribute('aria-hidden', 'true');
    const siljak = document.createElementNS(NS, 'path'); sloj.appendChild(siljak);
    red0.appendChild(sloj);
    let siljakDuljina = 0, siljakCilj = 0;
    function crtajSiljak(dt) {
      siljakDuljina += (siljakCilj - siljakDuljina) * (1 - Math.exp(-dt * 12));
      if (siljakDuljina < 0.02) { siljak.setAttribute('d', ''); return; }
      const R = red0.getBoundingClientRect(), B = oblacic.getBoundingClientRect(), U = $('ustaOblik').getBoundingClientRect();
      if (!U.width) { siljak.setAttribute('d', ''); return; }
      const ux = (U.left + U.right) / 2 - R.left, uy = (U.top + U.bottom) / 2 - R.top;
      const bx0 = B.left - R.left, by0 = B.top - R.top, bx1 = B.right - R.left, by1 = B.bottom - R.top;
      // usta iza ili u oblačiću (raspored "viri") — šiljak ne treba
      if (ux > bx0 && ux < bx1 && uy > by0 && uy < by1) { siljak.setAttribute('d', ''); return; }
      // najbliža točka ruba oblačića, malo uvučena od kutova
      const rad = 18;
      const cx = ogr0(ux, bx0 + rad, bx1 - rad), cy = ogr0(uy, by0 + rad, by1 - rad);
      let ex = cx, ey = cy, nx = 0, ny = 0;
      const dl = cx - bx0, dd = bx1 - cx, dg = cy - by0, ddo = by1 - cy;
      const m = Math.min(ux < bx0 ? dl : 1e9, ux > bx1 ? dd : 1e9, uy < by0 ? dg : 1e9, uy > by1 ? ddo : 1e9);
      if (m === dl) { ex = bx0; nx = -1; } else if (m === dd) { ex = bx1; nx = 1; } else if (m === dg) { ey = by0; ny = -1; } else { ey = by1; ny = 1; }
      const vx = ux - ex, vy = uy - ey, dist = Math.hypot(vx, vy);
      const duz = Math.min(26, Math.max(0, dist - 12)) * siljakDuljina;   // 12 px razmaka od usta
      if (duz < 2) { siljak.setAttribute('d', ''); return; }
      const sx = ex + vx / dist * duz, sy = ey + vy / dist * duz;
      const px = -ny, py = nx, s = 9;                                    // pola širine baze
      const a = [ex + px * s - nx * 2, ey + py * s - ny * 2], b = [ex - px * s - nx * 2, ey - py * s - ny * 2];
      siljak.setAttribute('d', `M${a[0].toFixed(1)} ${a[1].toFixed(1)}Q${((a[0] + sx) / 2 + nx * 2).toFixed(1)} ${((a[1] + sy) / 2 + ny * 2).toFixed(1)} ${sx.toFixed(1)} ${sy.toFixed(1)}Q${((b[0] + sx) / 2 + nx * 2).toFixed(1)} ${((b[1] + sy) / 2 + ny * 2).toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}Z`);
    }

    // ---- napuhivanje oblačića iz usta ----
    function napuhni(gotovo) {
      if (smanjeno) { oblacic.classList.add('napuhan'); gotovo(); return; }
      const B = oblacic.getBoundingClientRect(), U = $('ustaOblik').getBoundingClientRect();
      const ox = ((U.left + U.right) / 2 - B.left), oy = ((U.top + U.bottom) / 2 - B.top);
      oblacic.style.transformOrigin = `${ox.toFixed(0)}px ${oy.toFixed(0)}px`;
      oblacic.classList.add('napuhuje');
      requestAnimationFrame(() => requestAnimationFrame(() => oblacic.classList.add('napuhan')));
      setTimeout(() => { oblacic.classList.remove('napuhuje'); gotovo(); }, 520);
    }

    // ---- ULAZAK: dok nije njegov red, nema ga (mjesto je rezervirano); onda uđe u svoju scenu ----
    //   uz oblačić  → izroni iz poda kao duh     na oblačiću → padne odozgo i doskoči     viri → izviri iza ruba
    kontejner.classList.add('blobbySkriven');
    let ulaz = null;
    const NSs = 'http://www.w3.org/2000/svg', defs = scena.querySelector('defs');
    const klipP = document.createElementNS(NSs, 'clipPath'); klipP.id = 'ulaz-' + s;
    const klipR = document.createElementNS(NSs, 'rect'); klipR.setAttribute('x', -500); klipR.setAttribute('width', 1000);
    klipP.appendChild(klipR); defs.appendChild(klipP);
    const omot = document.createElementNS(NSs, 'g'); tijelo.parentNode.insertBefore(omot, tijelo); omot.appendChild(tijelo);
    function klip(v) {
      if (!v) { omot.removeAttribute('clip-path'); return; }
      if (v === 'pod') { klipR.setAttribute('y', -500); klipR.setAttribute('height', 652); }   // ispod poda se ne vidi
      else { klipR.setAttribute('y', -255); klipR.setAttribute('height', 800); }               // iznad scene se ne vidi
      omot.setAttribute('clip-path', `url(#ulaz-${s})`);
    }
    function udji(gotovo) {
      if (!kontejner.classList.contains('blobbySkriven')) { gotovo(); return; }
      const k = red0.className;
      const vrsta = /\br-stoji/.test(k) ? 'pad' : /\br-viri/.test(k) ? 'viri' : 'izron';
      kontejner.classList.remove('blobbySkriven');
      if (smanjeno) { gotovo(); pokreniPetlju(); return; }
      ulaz = { vrsta, od: performance.now(), ms: vrsta === 'pad' ? 950 : 800 };
      pokreniPetlju();
      setTimeout(gotovo, ulaz.ms * (vrsta === 'pad' ? 0.75 : 0.7));
    }
    function stanjeUlaza(sad) {
      const U = { dy: 0, gnj: 0, sjena: 1 };
      if (!ulaz) return U;
      const e = Math.min(1, (sad - ulaz.od) / ulaz.ms);
      if (ulaz.vrsta === 'izron') {
        const k = 1 - Math.pow(1 - e, 3);
        U.dy = (1 - k) * 250 - Math.sin(Math.PI * k) * 8; U.sjena = Math.min(1, e * 3); klip('pod');
      } else if (ulaz.vrsta === 'pad') {
        if (e < 0.48) { const k = e / 0.48; U.dy = -(1 - k * k) * 320; U.gnj = -0.06 * k; U.sjena = k; }
        else { const k = (e - 0.48) / 0.52; U.gnj = 0.14 * Math.sin(k * Math.PI * 2.2) * Math.pow(1 - k, 1.6); }
        klip('vrh');
      } else {
        const k = 1 - Math.pow(1 - e, 3); U.dy = (1 - k) * 170;
      }
      if (e >= 1) { ulaz = null; klip(null); }
      return U;
    }

    function izgovori(gotovo) {
      ja.govori = true; GOVORNIK = ja; ja.oslobodi = gotovo;
      udji(() => napuhni(() => {
        siljakCilj = 1; oblacicOtvoren = true;
        if (gumbBrzo) gumbBrzo.hidden = false;
        let i = 0;
        const dalje = () => {
          if (i >= pripremljeni.length) {
            siljakCilj = 0; oblacicOtvoren = false; ja.govori = false; if (GOVORNIK === ja) GOVORNIK = null;
            if (gumbBrzo) gumbBrzo.remove();
            setTimeout(() => { osnovniIzraz = 'osmijeh'; }, 1600);
            ja.oslobodi = null; gotovo(); return;
          }
          const o = pripremljeni[i++];
          if (smanjeno) { otkrijSve(o); dalje(); return; }
          ispis = { o, k: 0, sljedeci: performance.now() + 250, cues: o.cues.slice(), gotovo: () => setTimeout(dalje, brzo ? 180 : 700) };
        };
        dalje();
      }));
    }
    // trajanje jednog znaka (normalni tempo)
    const trajanje = ch => /[.!?]/.test(ch) ? 320 : /[,;:—]/.test(ch) ? 170 : ch === ' ' ? 24 : 36;
    function primijeniCues(doK, bezGesta) {
      while (ispis.cues.length && ispis.cues[0].pos <= doK) {
        const c = ispis.cues.shift();
        if (c.izraz) osnovniIzraz = c.izraz;
        if (c.gesta && !bezGesta) pokreni(c.gesta === 'pokazuje' && stranaOblacica < 0 ? 'pokazuje_lijevo' : c.gesta);
      }
    }
    function korakIspisa(sad) {
      while (ispis && sad >= ispis.sljedeci) {
        const Z = ispis.o.znakovi;
        if (ispis.k >= Z.length) { govori = false; govorOtvor = 0; otkrijSve(ispis.o); const g = ispis.gotovo; ispis = null; g(); return; }
        if (brzo) {
          // ⏩: cijeli sljedeći redak odjednom, 5× brže od njegovog normalnog trajanja
          const vrh = Z[ispis.k].sp.offsetTop; let k = ispis.k, t = 0;
          while (k < Z.length && Math.abs(Z[k].sp.offsetTop - vrh) < 4) { Z[k].sp.classList.add('v'); t += trajanje(Z[k].ch); k++; }
          primijeniCues(k, true);
          ispis.k = k; govori = true; govorOtvor = 0.35;
          ispis.sljedeci += t / 5;
          continue;
        }
        primijeniCues(ispis.k, false);
        const z = Z[ispis.k];
        z.sp.classList.add('v'); if (z.naglasak) mikroOd = sad;
        ispis.k++; govori = true;
        const ch = z.ch;
        govorOtvor = SAMOGL.includes(ch) ? 0.3 + Math.random() * 0.3 : /\p{L}/u.test(ch) ? 0.1 : 0;
        ispis.sljedeci += trajanje(ch);
      }
    }

    // progovori kad oblačić dođe na ekran (pri svakom dolasku na stranicu)
    new IntersectionObserver(ul => {
      const e = ul[ul.length - 1];
      ja.vidljiv = e.intersectionRatio > 0;
      if (e.intersectionRatio >= 0.35 && !izgovoreno) {
        izgovoreno = true; ja.uRedu = true;
        uRed(ja, gotovo => { if (!kontejner.isConnected) { gotovo(); return; } izgovori(gotovo); });
      }
    }, { threshold: [0, 0.35] }).observe(red0);

    // raspored: oblačić lijevo ili desno od njega (za šiljak i pokazivanje)
    function osvjeziStranu() {
      const K = kontejner.getBoundingClientRect(), B = oblacic.getBoundingClientRect();
      stranaOblacica = (B.left + B.right) / 2 >= (K.left + K.right) / 2 ? 1 : -1;
    }

  // ---------- petlja ----------
  let zadnje = performance.now(), radi = false, vrti = false, zadnjaStrana = -1e9;
  function okvir(sad) {
    // stranica je promijenjena: ovaj Blobby više ne postoji — odmah oslobodi red i stani
    if (!kontejner.isConnected) {
      ispis = null; ja.govori = false; if (GOVORNIK === ja) GOVORNIK = null;
      const i = SVI.indexOf(ja); if (i >= 0) SVI.splice(i, 1);
      if (ja.oslobodi) { const o = ja.oslobodi; ja.oslobodi = null; o(); }
      radi = false; vrti = false; return;
    }
    const dt = Math.min(0.05, Math.max(0, (sad - zadnje) / 1000)); zadnje = sad;
    const t = sad / 1000, amp = smanjeno ? 0.25 : 1;
    korakIspisa(sad);

    // opušteno disanje: polako, duboko
    const dah = amp * Math.sin(t * 1.1);                 // -1..1
    let ist = 1 + 0.012 * dah, sx = 1 - 0.009 * dah;   // udah: malo viši i uži
    const g = gesta(sad);
    const rukaD = { ...O, ...(g.D || {}) };
    const rukaL = zrcali({ ...O, ...(g.L || {}) });
    rukaD.rame += amp * 2 * Math.sin(t * 1.1 + 0.5); rukaL.rame -= amp * 2 * Math.sin(t * 1.1 + 1.7);
    // okret: sam ponekad pogleda u stranu; geste imaju svoj okret
    if (sad > sljedeciOkret) {
      const izbor = [0, 0, 0, 0, -0.25, 0.25];
      ciljOkret = izbor[Math.floor(Math.random() * izbor.length)];
      sljedeciOkret = sad + 3500 + Math.random() * 4500;
    }
    if (govori || oblacicOtvoren) ciljOkret = 0.18 * stranaOblacica;
    const zeljeni = fiksniOkret !== null ? fiksniOkret : (g.aktivna ? g.okret + ciljOkret * 0.2 : ciljOkret);
    okret += (ogr(zeljeni, -1, 1) - okret) * (fiksniOkret !== null ? 1 : 1 - Math.exp(-dt * (g.aktivna ? 12 : 3)));
    // ruka na udaljenoj strani djelomično se skrije iza tijela
    const daleka = okret > 0 ? rukaL : rukaD, ao = Math.abs(okret);
    const mirna = 1 - ogr((daleka.duljina - 8) / 40, 0, 1);   // skriva se samo ruka u mirovanju
    daleka.uvuceno += 10 * ao * mirna; daleka.duljina *= 1 - 0.25 * ao * mirna;
    // koliko su ruke podignute (0..1): ruke vuku tijelo prema gore
    const gore = r => ogr(-Math.sin(r.kut * Math.PI / 180), 0, 1) * ogr((r.duljina - 8) / 70, 0, 1);
    const uD = gore(rukaD), uL = gore(rukaL);
    const lift = ogr(Math.max(uD, uL) * 0.65 + Math.min(uD, uL) * 0.35, 0, 1);
    ist *= 1 + 0.08 * lift; sx /= Math.sqrt(1 + 0.08 * lift);
    const U = stanjeUlaza(sad);
    const gnj = (g.gnjec || 0) + U.gnj, nagib = g.nagib || 0, skok = g.skok || 0;
    ist *= 1 - gnj; sx /= Math.sqrt(1 - gnj);           // gnječenje / istezanje (volumen ostaje)
    for (const r of [rukaD, rukaL]) {
      r.debljina = ogr(r.debljina, ...RUKA_GRANICE.debljina); r.duljina = ogr(r.duljina, ...RUKA_GRANICE.duljina);
    }
    const bb = [amp * 2.5 * Math.sin(t * 0.9), amp * 2.5 * Math.sin(t * 0.9 + 2.1), amp * 2.5 * Math.sin(t * 0.9 + 4.2)];
    // osnovno tijelo (s brežuljcima) u polarnom obliku
    const RB = R0.map((r, i) => { const a = KUT(i); BREZ.forEach((ab, j) => { const d = kutnaUdalj(a, ab) / 0.11; r += bb[j] * Math.exp(-d * d / 2); }); return r; });
    const rU = ang => { const x = ((ang + Math.PI / 2) / (2 * Math.PI)) * M; const i = Math.floor(x), u = x - i; return RB[((i % M) + M) % M] * (1 - u) + RB[(((i + 1) % M) + M) % M] * u; };
    const tijeloPol = RB.map((r, i) => [C[0] + Math.cos(KUT(i)) * r, C[1] + Math.sin(KUT(i)) * r]);
    for (let j = 0; j < GH; j++) for (let i = 0; i < GW; i++) {
      const px = GX0 + i * KORAK, py = GY0 + j * KORAK;
      let dRD = udaljOdRuke(px, py, rukaD), dRL = udaljOdRuke(px, py, rukaL);
      let dd;
      if (Math.min(dRD, dRL) > 60) {           // daleko od ruku: dovoljna je gruba procjena
        const r = Math.hypot(px - C[0], py - C[1]) - rU(Math.atan2(py - C[1], px - C[0]));
        dd = Math.abs(r) > 25 ? r : udaljOdTijela(px, py, tijeloPol, rU);
      } else {
        dd = udaljOdTijela(px, py, tijeloPol, rU);
        dd = smin(dd, dRD, SPOJ); dd = smin(dd, dRL, SPOJ);
      }
      polje[j * GW + i] = dd;
    }
    const pts = obrisIzPolja().map(([x, y]) => [-15 + (x + 15) * sx + (okret * 10 + nagib) * glatko(DNO, -150, y), DNO - (DNO - y) * ist]);
    const NN = pts.length;
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < NN; i++) {
      const p0 = pts[(i - 1 + NN) % NN], p1 = pts[i], p2 = pts[(i + 1) % NN], p3 = pts[(i + 2) % NN];
      d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    koza.setAttribute('d', d + 'Z');
    // lice diše zajedno s glavom
    glava.setAttribute('transform', `translate(${f(-15 * (1 - sx) + okret * 7 + nagib * 0.7)} ${f(DNO * (1 - ist))}) scale(${sx.toFixed(4)} ${ist.toFixed(4)})`);

    const visina = amp * 3 * Math.sin(t * 1.1 - 0.5) - 9 * lift - skok + U.dy;
    tijelo.setAttribute('transform', `translate(0 ${f(visina)})`);
    sjena.setAttribute('rx', f(150 * Math.max(0.2, 1 + Math.min(0, visina) / 200) * U.sjena));

    // pogled: prati pokazivač kad se miče, inače mirno gleda u tebe i ponekad skrene
    if (sad - pokVrijeme < 1500) { ciljGX = ogr(pokX / 260, -0.7, 0.7); ciljGY = ogr((pokY + 50) / 260, -0.6, 0.6); }
    else if (sad > sljedeciPogled && GOVORNIK && GOVORNIK !== ja && Math.random() < 0.6) {
      // drugi Blobby govori: ovaj ga pogleda, kao da sluša
      const K = kontejner.getBoundingClientRect(), G = GOVORNIK.kontejner.getBoundingClientRect();
      ciljGX = ogr((G.left + G.width / 2 - K.left - K.width / 2) / 300, -0.8, 0.8);
      ciljGY = ogr((G.top + G.height / 2 - K.top - K.height / 2) / 300, -0.7, 0.7);
      sljedeciPogled = sad + 1800 + Math.random() * 2500;
    }
    else if (sad > sljedeciPogled) {
      const r = Math.random();
      if (r < 0.5) { ciljGX = 0; ciljGY = 0; } else { ciljGX = (Math.random() * 2 - 1) * 0.6; ciljGY = (Math.random() * 2 - 1) * 0.3; }
      sljedeciPogled = sad + 2500 + Math.random() * 3500;
    }
    // pogled skače brzo (kao pravo oko), ne klizi
    const k = 1 - Math.exp(-dt * 22); gx += (ciljGX - gx) * k; gy += (ciljGY - gy) * k;

    // koji izraz vrijedi sad: gesta ima prednost pred osnovnim
    const ime = (g.aktivna && g.izraz) || osnovniIzraz;
    if (ime !== zadnjiIzraz) {
      const a = IZRAZI[zadnjiIzraz], b = IZRAZI[ime];
      const razlika = Math.abs(a.otvL - b.otvL) + Math.abs(a.smijehL - b.smijehL) + Math.abs(a.obrvaL - b.obrvaL) / 10 + Math.abs(a.otvor - b.otvor);
      if (razlika > 0.6 && b.otvL > 0.5 && b.smijehL < 0.8 && !STAT_LICE) treptajOd = sad;   // kod velike promjene trepne
      zadnjiIzraz = ime;
    }
    const C2 = { ...IZRAZI[ime] };
    // sitni život lica: ponekad kratko podigne obrve
    if (!STAT_LICE && sad > sljedeciMikro) { mikroOd = sad; sljedeciMikro = sad + 4000 + Math.random() * 6000; }
    const mu = (sad - mikroOd) / 450;
    if (mu >= 0 && mu < 1 && !g.aktivna) { const v = Math.sin(mu * Math.PI); C2.obrvaL -= 5 * v; C2.obrvaD -= 5 * v; }
    if (govori) { C2.otvor = Math.max(C2.otvor * 0.5, govorOtvor); C2.sirina *= 0.92 + govorOtvor * 0.2; }
    for (const key in NEUTRALNO) {
      const brz = govori && (key === 'otvor' || key === 'sirina') ? 30 : BRZINA[key];
      F[key] += (C2[key] - F[key]) * (STAT_LICE ? 1 : 1 - Math.exp(-dt * brz));
    }

    if (sad > sljedeciTreptaj && !STAT_LICE) { treptajOd = sad; sljedeciTreptaj = sad + 2500 + Math.random() * 4000; }
    const tu = (sad - treptajOd) / 150, treptaj = tu >= 0 && tu < 1 ? 1 - Math.sin(tu * Math.PI) : 1;

    // pogled: slobodni (pokazivač / lutanje) + ono što izraz traži + okret tijela
    const imaPogled = IZRAZI[ime].gledX !== 0 || IZRAZI[ime].gledY !== 0;
    const gX = ogr((STAT_LICE ? 0 : imaPogled ? gx * 0.2 : gx) + F.gledX + okret * 0.5, -1, 1);
    const gY = ogr((STAT_LICE ? 0 : imaPogled ? gy * 0.2 : gy) + F.gledY, -1, 1);
    oko($('okoL'), 0, F.otvL * treptaj, F.smijehL, gX, gY);
    oko($('okoD'), 1, F.otvD * treptaj, F.smijehD, gX, gY);
    obrva($('obrvaL'), 0); obrva($('obrvaD'), 1);
    usta();
    // obrazi: rumenilo ispod očiju
    [$('obrazL'), $('obrazD')].forEach((el, i) => { const r = F.rumenilo; el.setAttribute('cx', LICE.oci[i][0] + (i ? 4 : -4)); el.setAttribute('cy', LICE.oci[i][1] + 30); el.setAttribute('rx', f(15 * Math.sqrt(r))); el.setAttribute('ry', f(8 * Math.sqrt(r))); el.setAttribute('opacity', f(ogr(r * 6, 0, 1))); });
    // kad se smije, obrazi dignu cijelo lice malo gore
    $('lice').setAttribute('transform', `translate(0 ${f(-3 * Math.max(F.smijehL, F.smijehD))})`);
    const L = LICE;
    okreniDio($('okoL'), L.oci[0][0]); okreniDio($('okoD'), L.oci[1][0]);
    okreniDio($('obrvaL'), L.obrve[0][0]); okreniDio($('obrvaD'), L.obrve[1][0]);
    okreniDio($('usta'), L.usta[0]);
    okreniDio($('obrazL'), L.oci[0][0]); okreniDio($('obrazD'), L.oci[1][0]);
    crtajSiljak(dt);
    if (sad - zadnjaStrana > 500) { zadnjaStrana = sad; osvjeziStranu(); }
    if (radi) requestAnimationFrame(okvir); else vrti = false;
  }
    // petlja radi samo dok je Blobby na ekranu (ili dok govori)
    function pokreniPetlju() { radi = true; if (!vrti) { vrti = true; zadnje = performance.now(); requestAnimationFrame(okvir); } }
    new IntersectionObserver(ul => { if (ul.some(e => e.isIntersecting)) { if (!kontejner.classList.contains('blobbySkriven')) pokreniPetlju(); } else if (!ispis && !ja.govori) radi = false; }).observe(kontejner);
    return { izraz: ime => { osnovniIzraz = ime; }, gesta: pokreni };
  }

  // BLOBBY_EN: engleski početci njegovih rečenica, ISTIM REDOM kao BLOBBY_RECI u index.html
  // (u index-de/es.html prevedeni su na istim mjestima, pa indeks vodi do engleskog izvora).
  const BLOBBY_EN = ["Welcome to your first real Croatian lesson!", "Here's a secret: you already speak some Croatian", "By the end of this lesson you'll describe houses", "To say anything about anything, Croatian needs", "Notice what's missing.", "Bravo! You just built your first Croatian", "You've already used everything on this page", "Every noun has a gender.", "One exception worth knowing.", "Time to read real Croatian!", "In Lesson 1 you described houses, coffee and the sea", "One verb, six forms — and you already know", "Spot the pattern:", "Odlično! You can now introduce yourself", "Here's the complete map of the verb you've been", "When in doubt in Croatia: start with", "Four people introduce themselves", "So far you can describe the world", "And notice something: you often don't even need", "The ending is the name tag.", "Sjajno! You can now say what you and others", "In Lesson 3 your ear learned the endings", "Drop the pronoun:", "A whole day of actions", "You can describe things, introduce people", "Today you get three tiny connector words", "You'll practice them on the warmest topic", "English uses", "Izvrsno! Your Croatian now flows in full", "The test: if English", "A family in one page", "Today is a big day", "Don't worry. Your first case changes exactly", "When a feminine word (ending in", "You just discovered it yourself:", "Čestitamo! You just learned your first Croatian", "What a \"case\" is:", "Your accusative in action", "Last lesson you mastered the", "Things stay the same. People and animals get", "Two quirks to meet today.", "Bravo! You now handle the accusative for", "Croatian likes to mark", "This is why Lesson 3 felt easy", "City life, written the way Croatians actually", "One coffee, one friend, one tram", "We'll practice in the liveliest place possible", "Two exceptions today.", "Sjajno! You can now talk about many things", "With this page your present tense is", "Learn them as words, not rules.", "A school day in the plural", "Summer is coming", "The Croatian future is refreshingly simple", "Recognise the rhythm?", "Odlično! Past lessons gave you the present", "Rule of thumb: the helper", "Summer plans — the kind of message", "Today's lesson is full of words you already know", "The new bit is making things", "The familiar trio again", "Bravo! Things are officially", "Possessives are adjectives at heart", "English speakers: this is the one trap.", "A club, a hobby, and a family that cannot agree", "You can describe, ask, plan and dream in Croatian", "Good news: the past tense recycles something", "Let's talk about yesterday.", "All three are fine", "ČESTITAMO! Lessons 1–10 complete", "The participle shows the speaker's gender", "Your perfekt in the wild", "So far you've mostly been", "Seven little question words and one magic", "And the friendly tag at the end:", "Izvrsno! You can now ask about anything", "No question word? Use", "A present arrives, and nobody will say", "You've been suspiciously agreeable", "Today you learn to refuse soup", "English teachers hate this.", "Bravo! You can now refuse, complain and order", "Croatian negative words need a second ne.", "A family of picky eaters", "Since Lesson 5 you can say where you're", "One tiny ending", "Same u/na logic as before.", "Sjajno! You now know where you're going AND", "Everyone is somewhere different", "December in Croatia: presents for everyone!", "Those endings", "Word order is flexible", "Divno! You can now give, send, bring and write things to anyone", "The dative marks the", "December, and everyone is buying something", "Friday night! You're going out", "Today's case is the instrumental", "Think of it as: the vehicle is your instrument", "ČESTITAMO! Module C is complete", "The most common English-speaker mistake", "Five down, two to go", "A night out and a train ride", "Whose house? Grandma's.", "All three answers use one case", "There is no = nema + genitive.", "Bravo! Belonging, origin and absence", "The genitive answers", "Case toolkit — complete!", "Grandma's house, and the road that leads", "Time to give orders — politely, of course", "Croatian commands are short:", "Odlično! You can now give directions", "Familiar faces:", "A recipe, a set of directions, and a coach", "Imagine: a million euros lands in your account", "Croatian dreams use the", "Krasno! You can now dream, wish and order", "The politeness machine:", "every teacher will thank you", "A million euros, and a perfect day", "Almost every Croatian verb has a twin.", "One twin describes the", "The tell-tale words:", "Fantastično! You've cracked aspect", "Every Croatian verb carries a built-in answer", "The homework trap:", "A letter that took all afternoon", "Twenty lessons ago, your first sentence was", "The final ingredients: five little connectors", "You did it. Twenty lessons ago you knew", "Your last text is someone remembering a summer"];
  const GLAS_EN = ["Welcome to your first real Croatian lesson!", "Here's a secret: you already speak some Croatian. *Hotel*, *banana*, *čokolada*, *restoran* — these are all Croatian words, and you just read them perfectly.", "By the end of this lesson you'll describe houses, cars, the sea and your coffee — in Croatian.", "To say anything about anything, Croatian needs just one little word: **je** (*is*).", "Notice what's missing? No *the*, no *a*. Croatian skips articles entirely. You're welcome.", "Bravo! You just built your first Croatian sentences — with no articles to worry about and spelling you can always trust.", "Your first Croatian flashcard deck — every word sounds exactly as it's written. Tap to reveal meaning & pronunciation.", "You just met them — now catch them! Tap the English meaning before the timer runs out.", "One word, one card. How the endings change is Grammar's job — here just learn the words.", "You've already *used* everything on this page — now let's name it.", "**Every noun has a gender.** You don't have to memorise it — the word's last letter almost always tells you.", "**One exception worth knowing.** *Auto* ends in **-o**, but it is masculine. There are only a handful like it.", "Time to read real Croatian!", "In Lesson 1 you described houses and coffee. Now it's time to talk about *people* — including yourself.", "One verb, six forms — and you already know one of them:", "Spot the pattern: *student* is a man, *studentica* is a woman. Same with *profesor/profesorica*, *doktor/doktorica*. Croatian loves this **-ica** ending.", "Odlično! You can now introduce yourself, describe people, and handle the most important verb in Croatian.", "Everything you need to talk about people, starting with yourself. Tap to reveal.", "The most important verb in Croatian.", "The final round mixes this lesson with everything from Lesson 1 — how much do you remember?", "Here's the complete map of the verb you've been using — the most important verb in Croatian.", "When in doubt in Croatia: start with **vi** — locals will offer you *ti* quickly.", "Four people introduce themselves. See how far you get before you tap EN.", "So far you can *describe* the world: the coffee is good, the day is beautiful. Now you'll make things *happen* in it.", "And notice something: you often don't even need *ja*. The verb ending already tells everyone who's doing it. Efficient, right?", "The ending is the name tag: **-m** = me, **-š** = you, no extra ending = he/she. It works the same for *piti* (pijem, piješ, pije) and *jesti* (jedem, jedeš, jede) — the middle changes a bit, but the endings never lie.", "Sjajno! You can now say what you and others are doing — and you've cracked the verb-ending code that runs the whole language.", "Nine verbs that cover most of your day. Tap to reveal.", "In Lesson 3 your ear learned the endings. Here's the system behind them.", "**Drop the pronoun:** the ending already says who. *Pijem sok.* = *Ja pijem sok.* — both correct, the short one more natural. Keep the pronoun only for emphasis: *JA pijem sok* (me, not you).", "A whole day of actions — see how much you catch on the first read.", "You can describe things, introduce people, and say what everyone's doing. But so far, your Croatian comes out one short sentence at a time.", "Today you get three tiny connector words — **i**, **a**, **ali** — and suddenly your sentences flow: *Tata kuha, a brat uči.* Dad cooks, and my brother studies.", "You'll practice them on the warmest topic there is: **obitelj** — the family.", "English uses \"and\" for the first two — Croatian is more precise. If the second part is a contrast-but-not-conflict, use **a**. If it's a real \"but\", use **ali**.", "Izvrsno! Your Croatian now flows in full, connected sentences — and you can talk about the whole family.", "Start with the people closest to you. Notice how many end in **-a** — Croatian family words are mostly short and warm.", "The test: if English \"and\" could be replaced by \"while/whereas\", Croatian wants **a**. If it's a twist, **ali**.", "A family in one page. See if you can tell who does what.", "Today is a big day. You're going shopping at a Croatian market — and on the way, you'll unlock the thing Croatian is famous for: **cases**.", "Don't worry. Your first case changes exactly *one letter*. Watch:", "When a feminine word (ending in **-a**) becomes the *target* of an action — the thing you drink, buy, or love — its **-a** turns into **-u**. That's the whole rule. Let's go shopping.", "You just discovered it yourself: **-a → -u** when the word is on the receiving end of the action. Grammarians call this the *accusative case* — you can just call it the target form.", "Čestitamo! You just learned your first Croatian case — and survived. One letter changed, a whole grammar door opened.", "Every word here ends in **-a**, and every one of them turns that -a into **-u** the moment you drink it, eat it or buy it. Learn each one as a pair.", "**What a \"case\" is:** Croatian shows a word's *role* in the sentence by changing its ending.", "Your accusative in action", "Last lesson you mastered the *-a → -u* trick for feminine words. Today you take the accusative to the city — and discover something charming about Croatian: it treats *living beings* differently from *things*.", "Things stay the same. People and animals get **-a**. Let's catch that tram.", "Two quirks to meet today: *pas* squeezes into **psa** (*Gledam psa*), and *policajac* drops a letter: **policajca**.", "Bravo! You now handle the accusative for *everything* in the singular — things, food, people and pets.", "Living masculine nouns, each shown with its target form. Five of them squeeze a letter out on the way: **policajac → policajca**, **kupac → kupca**, **pas → psa**.", "Croatian likes to mark *who can be affected* by an action. Things can't care; beings can.", "This is why Lesson 3 felt easy: every object there was a \"no change\" word. Sneaky, right?", "City life, written the way Croatians actually write it.", "One coffee, one friend, one tram — so far, everything came one at a time. Today the world multiplies: *knjiga* becomes *knjige*, *učenik* becomes *učenici*, and verbs finally learn to say **we**, **you all** and **they**.", "We'll practice in the liveliest place possible: a Croatian school full of children and songs.", "One exception today: *dijete* → **djeca** (children). Some words are too important to follow rules.", "Sjajno! You can now talk about many things at once — and your verbs finally have their full present-tense family.", "Masculine nouns take **-i**. Watch the four where a **k** softens into **c** on the way: *učenik → učenici*.", "With this page your present tense is *complete* — all six persons — and nouns can finally come in groups.", "**The rebels.** Four words ignore everything above: *dijete → **djeca***, *brat → **braća***, *čovjek → **ljudi***, *riječ → **riječi***. Learn them as words, not rules.", "A school day in the plural — classmates, books and all.", "Summer is coming — *ljeto dolazi!* Time to make plans: the sea, ice cream, swimming every day...", "The Croatian future is refreshingly simple: take a tiny helper word (**ću** — \"I will\"), add the verb's dictionary form, and you're done. *Plivat ću!* — I will swim! No new endings to learn — and you have already met the helper's negative twin, *neću*, back in Grammar 3.", "Recognize the rhythm? *ću–ćeš–će–ćemo–ćete–će* echoes *sam–si–je–smo–ste–su*.", "Odlično! Past lessons gave you the present; now the future is yours too. Your summer plans are officially in Croatian.", "Croatia in summer, in one deck. **more** is the sea itself; going *na more* is what everyone says for \"to the coast\".", "Rule of thumb: the helper *never* stands first — it's shy, it always leans on another word.", "Summer plans — the kind of message you'll get from a Croatian friend in June.", "Today's lesson is full of words you already know: *hobi, gitara, klub, trener, kapetan, gol...* Sport is international, and so is its vocabulary.", "The new bit: making things *yours*. **Moj** klub, **tvoja** gitara, **naš** trener. And yes — these little words dance with gender exactly like adjectives do. By now, that's your superpower.", "The familiar trio again — consonant / -a / -o(-e). You've done this dance twice already.", "Bravo! Things are officially *yours* now — your club, your guitar, your Croatian.", "Sport speaks Croatian with an accent you'll recognize instantly.", "The possessives are adjectives at heart — they agree with the *thing owned*, not the owner.", "English speakers: this is the one trap.", "A club, a hobby, and a few people who take theirs seriously.", "You can describe, ask, plan and dream in Croatian. One thing is missing: telling stories. *What did you do yesterday?*", "Good news: the past tense recycles something you've known since Lesson 2 — the verb *biti*.", "Let's talk about yesterday.", "All three are fine — *sam* just always leans on the first word.", "ČESTITAMO! Lessons 1–10 complete — you're halfway through the course. You can now speak about the present, the future *and* the past. That's the full timeline of a language.", "Everything for telling stories about yesterday.", "The past participles — your storytelling toolkit.", "The participle shows the speaker's gender.", "Your perfekt in the wild", "So far you've mostly been *telling* — now you'll start *asking*. Today's mission: buy the perfect birthday present.", "Seven little question words and one magic particle — **li** — and every conversation opens up.", "And the friendly tag at the end: *Voliš glazbu, **zar ne**?* — You like music, *don't you*?", "Izvrsno! You can now ask about anything — who, what, where, when, why and how. Conversations are officially two-way.", "Everything you need to ask and wonder.", "No question word? Use **li** — glue it right after the verb.", "A present arrives, and nobody will say who sent it.", "You've been suspiciously agreeable for eleven lessons. Time to fix that.", "Today you learn to refuse soup, reject onions and declare that you *never* drink milk. Croatian negation is delightfully simple — one little word, **ne**, placed right before the verb. Plus two special verbs with attitude. Let's say no!", "English teachers hate this. Croatian grammar requires it. Enjoy the freedom.", "Bravo! You can now refuse, deny and protest — politely and grammatically.", "The complete toolkit for saying no — plus adjectives and cognates.", "In Croatian, negatives stack — and they *must*.", "A family of picky eaters. Nobody agrees about dinner.", "Since Lesson 5 you can say where you're *going*: *Idem u grad.* Today you learn where you *are*: *Ja sam **u gradu**.*", "One tiny ending — **-u** for most words, **-i** for feminine ones — and the whole city becomes describable: at the café, in the park, at the office on a Friday night (hopefully not).", "Same *u/na* logic as before: **u** = inside, **na** = on/at open places & events.", "Sjajno! You now know where you're going AND where you are — the city is fully yours.", "Your map of the town, with the \"being there\" form on every card.", "Same endings, two jobs — the ending tells you whether you've arrived.", "Everyone is somewhere different, and it's Friday night.", "December in Croatia: presents for everyone! But who gets what? *Mami* a scarf, *bratu* a ball, *sestri* a guitar...", "Those endings — **-i** and **-u** — mark the *receiver*. It's the dative case, and good news: you've already seen both endings in the locative. Croatian recycles!", "Word order is flexible — the receiver can come first for emphasis: *Mami kupujem šal, a tati knjigu.*", "Divno! You can now give, send and bring things to anyone — Croatian generosity unlocked.", "Receivers with their dative form, plus the giving verbs.", "The dative marks the *receiver* — the person something goes to.", "December, and everyone is buying something for someone.", "Friday night! You're going out — but *with whom* and *how*?", "Today's case is the instrumental — the case of company and means. It's the last case of this module, and arguably the most social one.", "Think of it as: the vehicle is your instrument. (That's literally why it's called the instrumental!)", "ČESTITAMO! Module C complete — you can ask, refuse, locate, give and accompany. That's five of Croatia's seven cases already under your belt.", "Friends, outings and ways to get there.", "Means of transport (no preposition!) and new verbs.", "The most common English-speaker mistake: \"idem s vlakom\" — you're not *accompanying* the train, you're *using* it. No s!", "Five down, two to go — you're past the hardest part.", "A night out and a train ride, both in the instrumental.", "Whose house? Grandma's. Coffee without what? Without sugar. From where? From Zagreb.", "All three answers live in one case — the **genitive**, the case of *belonging, origin and absence*. It's the last big case of the course, and after dative and locative, its endings will feel like familiar territory.", "*Nema* + genitive says something's missing — one of the most Croatian phrases there is:", "Bravo! Belonging, origin and absence — the genitive completes your everyday case toolkit.", "Grandma's world, with the genitive on every card.", "The genitive answers **koga? / čega?** — and it's Croatia's busiest case.", "**Case toolkit — complete!** Six of seven — only the vocative remains, and you've been using it in dialogues all along.", "Grandma's house, and the road that leads to the sea.", "Time to give orders — politely, of course. Recipes, directions, a bossy football coach: they all run on the **imperative**.", "Croatian commands are short and punchy: *Uzmi!* (take!), *Idi!* (go!), *Miješaj!* (mix!). Today you'll learn them the best way there is: by making pancakes.", "Odlično! You can now give directions, run a kitchen and coach a football team — all in Croatian.", "Commands for recipes and directions — plus the soft \"don't\".", "**Familiar faces:** you've been obeying imperatives all course long: *Izvolite? Oprostite! Dobro došli!* — all commands in disguise.", "A recipe, a set of directions, and a coach who shouts.", "Imagine: a million euros lands in your account. What *would* you do?", "Croatian dreams run on the **conditional**. The recipe is sweet and familiar: the past participle you know from Lesson 10 + a tiny new helper. Let's dream.", "Krasno! You can now dream, wish and order coffee like a true gentleman/lady: *Htio bih...*", "For dreaming out loud.", "**The politeness machine:** the conditional is Croatian's \"please-mode\".", "You'll hear it — but write *bismo/biste*; every teacher will thank you.", "A million euros, and a perfect day nobody has had yet.", "Here's Croatian's deepest secret, saved for near the end: almost every verb has a *twin*.", "One twin describes the *doing*, the other the *getting done*. English needs whole phrases for this — Croatian does it with a prefix. Once you see it, you'll see it everywhere.", "The tell-tale words: *cijeli dan / dugo / svaki dan* → process. *Napokon / odmah / za dvije minute* → done.", "Fantastično! You've cracked aspect — the concept that makes Slavic languages famous. You now hear the difference between *doing* and *done*.", "Verb twins and the time words that go with them.", "Every Croatian verb carries a built-in answer to one question: *is the action complete?*", "**The homework trap:** one prefix, very different conversation.", "A letter that took all afternoon, and a mother who wants to know if it's finished.", "Twenty lessons ago, your first sentence was *Kava je dobra* — three words.", "The final ingredients: five little connectors and one word — *koji* — that glues whole thoughts together. Let's finish strong.", "You did it. Twenty lessons ago you knew *banana* and *hotel*. Now you can:", "The vocabulary of memories — the last batch of the course!", "The final sprint of the course — tap the English meaning!", "Connectors for big thoughts.", "Your last text is someone remembering a summer. Read it slowly."];
  function izvorEN(indeks) {
    const p = BLOBBY_EN[indeks]; if (!p) return null;
    const n = normEN(p);
    return GLAS_EN.find(s => normEN(s).includes(n)) || p;
  }
  window.BlobbyLik = { novi, izvorEN };
})();
