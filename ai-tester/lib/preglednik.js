// Preglednik kojim upravlja AI korisnik.
// - aplikaciju poslužuje lokalno iz foldera projekta (ništa ne ide na internet osim fontova)
// - podmeće lažni Supabase
// - sat je zamrznut dok AI razmišlja i pomiče se samo za "ljudsko" vrijeme svake radnje,
//   pa tajmirane igre i dnevni streak rade pošteno, a jedan dan učenja traje minute.
import { chromium, devices } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.woff2': 'font/woff2', '.ico': 'image/x-icon'
};

// Poslužitelj: /  -> projekt,  /__ai/... -> rezultati (izvještaj, slike), POST /__ai/odluke
export function pokreniPosluzitelj(korijenProjekta, korijenRezultata, port) {
  const srv = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    if (req.method === 'POST' && url === '/__ai/odluke') {
      let tijelo = '';
      req.on('data', d => { tijelo += d; if (tijelo.length > 5e6) req.destroy(); });
      req.on('end', () => {
        try { JSON.parse(tijelo); fs.writeFileSync(path.join(korijenRezultata, 'odluke.json'), tijelo); res.writeHead(200); res.end('ok'); }
        catch (e) { res.writeHead(400); res.end('lose'); }
      });
      return;
    }
    let baza = korijenProjekta, rel = url;
    if (url.startsWith('/__ai/')) { baza = korijenRezultata; rel = url.slice(5); }
    if (rel === '/' || rel === '') rel = url.startsWith('/__ai') ? '/izvjestaj.html' : '/index.html';
    const dat = path.normalize(path.join(baza, rel));
    if (!dat.startsWith(path.normalize(baza))) { res.writeHead(403); res.end(); return; }
    fs.readFile(dat, (e, d) => {
      if (e) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(dat).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(d);
    });
  });
  return new Promise((ok, ne) => {
    srv.once('error', ne);
    srv.listen(port, '127.0.0.1', () => ok(srv));
  });
}

// ---- kod koji se izvršava u stranici: sažeti "pogled" na ekran ----
function snimiEkranUPregledniku(opts) {
  const slike = window.__aiSlike || {};
  document.querySelectorAll('[data-ai]').forEach(e => e.removeAttribute('data-ai'));
  const W = innerWidth, H = innerHeight;
  const vidljiv = el => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) < 0.05) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  };
  const INTER = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY'];
  const interaktivan = el => {
    if (INTER.includes(el.tagName)) return !(el.tagName === 'INPUT' && el.type === 'hidden');
    if (el.hasAttribute('onclick') || el.getAttribute('role') === 'button' || el.isContentEditable) return true;
    if (el.tabIndex >= 0 && el !== document.body) return true;
    const c = getComputedStyle(el).cursor;
    if (c === 'pointer' || c === 'grab') { const p = el.parentElement; return !p || getComputedStyle(p).cursor !== c; }
    return false;
  };
  const opisSlike = img => {
    const src = decodeURIComponent((img.getAttribute('src') || img.getAttribute('href') || '').split('/').pop() || '')
      .replace(/\.[a-z0-9]+$/i, '').toLowerCase();
    const en = slike[src];
    if (img.alt && img.alt.trim()) return 'slika: ' + img.alt.trim();
    return en ? 'slika: ' + en : (src ? 'slika' : '');
  };
  // tipkovnice sa slovima sažmi u jedan redak
  const tipkovnice = new Set();
  document.querySelectorAll('body *').forEach(el => {
    const k = el.children;
    if (k.length < 12 || !vidljiv(el)) return;
    let slova = 0;
    for (const c of k) { const t = (c.innerText || '').trim().toLowerCase(); if (/^(a|b|c|č|ć|d|dž|đ|e|f|g|h|i|j|k|l|lj|m|n|nj|o|p|r|s|š|t|u|v|z|ž|⌫|␣|space)$/.test(t)) slova++; }
    if (slova >= 12 && slova / k.length > 0.8) tipkovnice.add(el);
  });
  const HINT = /(tocn|točn|kriv|correct|wrong|greska|pogres|odabr|aktiv|selected|active|done|gotov|zaklj|locked|disabled|uspjeh|pogod|oznac|rijes|riješ|potros|zavrs|okren|otvor|flip)/i;
  const polozaj = r => {
    const v = r.top < H * 0.33 ? 'gore' : r.top < H * 0.66 ? 'sredina' : 'dolje';
    const h = r.left + r.width / 2 < W * 0.33 ? 'lijevo' : r.left + r.width / 2 > W * 0.66 ? 'desno' : '';
    return (v + (h ? '-' + h : ''));
  };
  const linije = []; let buf = ''; let n = 0;
  const flush = () => { const t = buf.replace(/\s+/g, ' ').trim(); if (t) linije.push(t); buf = ''; };
  const BLOK = /^(block|flex|grid|list-item|table|table-row|flow-root)$/;
  const opisElementa = el => {
    let t = '';
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      const tip = el.type === 'checkbox' || el.type === 'radio' ? el.type + (el.checked ? ' ✓' : '') : 'polje za upis';
      t = tip + (el.placeholder ? ' "' + el.placeholder + '"' : '') + (el.value && el.type !== 'password' ? ' = "' + el.value + '"' : '');
    } else if (el.tagName === 'SELECT') {
      t = 'izbornik: ' + [...el.options].map(o => o.text).join(' / ');
    } else {
      t = (el.innerText || '').replace(/\s+/g, ' ').trim();
      const imgs = [...el.querySelectorAll('img, image')].map(opisSlike).filter(Boolean);
      if (imgs.length) t = (t ? t + ' ' : '') + '[' + imgs.join(', ') + ']';
      if (!t) t = (el.getAttribute('aria-label') || el.getAttribute('title') || '').trim();
      const nat = (el.getAttribute('aria-label') || el.getAttribute('title') || '').trim();
      if (t && t.length <= 2 && nat) t = t + ' (' + nat + ')';
      if (!t) t = 'ikona bez natpisa';
    }
    if (t.length > 90) t = t.slice(0, 87) + '…';
    const r = el.getBoundingClientRect();
    const oznake = [];
    if (el.disabled || el.getAttribute('aria-disabled') === 'true') oznake.push('onemogućeno');
    const kl = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || '';
    String(kl).split(/\s+/).filter(c => HINT.test(c)).slice(0, 3).forEach(c => oznake.push(c));
    if (r.top > H) oznake.push('niže, treba se pomaknuti'); else if (r.bottom < 0) oznake.push('više gore');
    else {
      const cx = Math.min(W - 1, Math.max(0, r.left + r.width / 2)), cy = Math.min(H - 1, Math.max(0, r.top + r.height / 2));
      const t = document.elementFromPoint(cx, cy);
      if (t && t !== el && !el.contains(t) && !t.contains(el)) {
        // pokriva li ga traka/tipkovnica pričvršćena na dno ekrana? Onda se samo treba pomaknuti.
        let fiksno = false;
        for (let a = t; a && a !== document.body; a = a.parentElement) { const ps = getComputedStyle(a).position; if (ps === 'fixed' || ps === 'sticky') { fiksno = true; break; } }
        if (fiksno) oznake.push('niže, treba se pomaknuti');
        else {
          const pt = (t.getAttribute('title') || t.innerText || t.className || t.tagName).toString().replace(/\s+/g, ' ').trim().slice(0, 30);
          oznake.push('prekriven: "' + pt + '"');
        }
      }
    }
    if (t === 'ikona bez natpisa' || t.length <= 2) oznake.push(polozaj(r));
    return t + (oznake.length ? ' {' + oznake.join(', ') + '}' : '');
  };
  const hod = (cvor) => {
    if (cvor.nodeType === 3) { buf += ' ' + cvor.nodeValue; return; }
    if (cvor.nodeType !== 1) return;
    const el = cvor;
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'svg'].includes(el.tagName) && el.tagName !== 'svg') return;
    if (el.tagName === 'svg' && !interaktivan(el)) return;
    if (!vidljiv(el)) return;
    // izvučene ladice/paneli (fixed, izvan ekrana) — korisnik ih ne vidi
    const poz = getComputedStyle(el).position;
    if (poz === 'fixed' || poz === 'sticky') {
      const r = el.getBoundingClientRect();
      if (r.right <= 1 || r.left >= W - 1 || r.bottom <= 1 || r.top >= H - 1) return;
    }
    if (tipkovnice.has(el)) {
      flush();
      const prvi = [...el.children].find(vidljiv);
      linije.push('(tipkovnica s hrvatskim slovima — za pisanje koristi radnju "upisi")');
      return;
    }
    if (interaktivan(el)) {
      flush();
      n++; el.setAttribute('data-ai', String(n));
      linije.push('[' + n + '] ' + opisElementa(el));
      return;
    }
    if (el.tagName === 'IMG') { const o = opisSlike(el); if (o) buf += ' [' + o + ']'; return; }
    const blok = BLOK.test(getComputedStyle(el).display);
    if (blok) flush();
    for (const c of el.childNodes) hod(c);
    if (blok) flush();
  };
  // Otvoren prozor (modal) preko cijele aplikacije? Onda korisnik vidi samo njega.
  let korijen = document.body, modal = false;
  const kandidati = [...document.querySelectorAll('body *')].filter(el => {
    const cs = getComputedStyle(el);
    if (cs.position !== 'fixed' && cs.position !== 'absolute') return false;
    if (!vidljiv(el)) return false;
    const r = el.getBoundingClientRect();
    return r.width >= W * 0.9 && r.height >= H * 0.7 && r.top <= H * 0.15 && el.querySelector('button, a, input, [onclick]');
  });
  if (kandidati.length) {
    // najgornji po točki u sredini ekrana
    const top = document.elementFromPoint(W / 2, H / 2);
    const m = kandidati.find(k => k.contains(top));
    if (m) { korijen = m; modal = true; }
  }
  if (modal) linije.push('(otvoren je prozor preko aplikacije — iza njega se ništa ne može kliknuti)');
  hod(korijen);
  flush();
  // spoji uzastopne duplikate i skrati
  const izlaz = [];
  for (const l of linije) if (izlaz[izlaz.length - 1] !== l) izlaz.push(l);
  let tekst = izlaz.join('\n');
  if (tekst.length > opts.max) tekst = tekst.slice(0, opts.max) + '\n… (stranica je duža — radnja "pomakni" ne pomaže AI-u, ali sve bitno je iznad)';
  // gdje smo: naslov + aktivna vježba
  const h2 = document.querySelector('#view h2, h1, h2');
  const akt = document.querySelector('.vnav.aktivna');
  const oc = akt ? akt.getAttribute('onclick') || '' : '';
  const m = oc.match(/idi\('unit',\s*'([^']+)',\s*(\d+),\s*(\d+)\)/);
  return {
    tekst, brojElemenata: n,
    naslov: h2 ? h2.innerText.trim().slice(0, 120) : '',
    vjezba: m ? { tip: m[1], razina: +m[2], indeks: +m[3], naslov: (akt.getAttribute('title') || '') } : null
  };
}

export class Preglednik {
  constructor({ korijen, port, podaci, zapisnik, mobitel = true, vidljivo = false }) {
    Object.assign(this, { korijen, port, podaci, zapisnik, mobitel, vidljivo });
    this.greske = []; this.zvukovi = []; this.dogadjaji = [];
    this.virtualnoMs = 0;
  }

  async otvori({ stanjeDatoteka, datum, sjemeBaze }) {
    if (!this.browser) {
      // Na Windowsu koristi Edge koji je već instaliran (nema preuzimanja); inače Chrome ili Playwrightov Chromium.
      let zadnja = null;
      for (const kanal of [process.env.AI_TESTER_KANAL, 'msedge', 'chrome', undefined].filter((k, i, a) => a.indexOf(k) === i)) {
        if (kanal === '') continue;
        try { this.browser = await chromium.launch({ headless: !this.vidljivo, ...(kanal ? { channel: kanal } : {}) }); break; }
        catch (e) { zadnja = e; }
      }
      if (!this.browser) throw new Error('Nije moguće pokrenuti preglednik (Edge/Chrome/Chromium): ' + String(zadnja && zadnja.message).split('\n')[0]);
    }
    const uredaj = this.mobitel ? devices['iPhone 13'] : { viewport: { width: 1366, height: 820 }, deviceScaleFactor: 1 };
    const opcije = { ...uredaj, locale: 'en-US', timezoneId: 'Europe/Zagreb' };
    if (stanjeDatoteka && fs.existsSync(stanjeDatoteka)) opcije.storageState = stanjeDatoteka;
    this.ctx = await this.browser.newContext(opcije);
    await this.ctx.clock.install({ time: datum });
    const lazni = fs.readFileSync(new URL('./lazni-supabase.js', import.meta.url), 'utf8');
    await this.ctx.route('https://cdn.jsdelivr.net/npm/@supabase/**', r => r.fulfill({ contentType: 'text/javascript', body: lazni }));
    await this.ctx.route(/stripe\.com|js\.stripe/, r => r.abort());
    await this.ctx.exposeFunction('__aiTesterDogadjaj', s => { try { this.dogadjaji.push(JSON.parse(s)); } catch (e) {} });
    await this.ctx.addInitScript(({ slike, sjeme }) => {
      window.__aiSlike = slike;
      if (sjeme && !localStorage.getItem('__lazna_baza')) localStorage.setItem('__lazna_baza', sjeme);
      window.__aiZvukovi = [];
      const play = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function () {
        try { window.__aiZvukovi.push(this.currentSrc || this.src || ''); } catch (e) {}
        return play.apply(this, arguments).catch(() => {});
      };
      if (window.speechSynthesis) {
        const sp = window.speechSynthesis.speak.bind(window.speechSynthesis);
        window.speechSynthesis.speak = u => { try { window.__aiZvukovi.push('tts:' + u.text); } catch (e) {} };
      }
    }, { slike: this.podaci.slike, sjeme: sjemeBaze ? JSON.stringify(sjemeBaze) : null });
    this.page = await this.ctx.newPage();
    this.page.on('console', m => { if (m.type() === 'error') this.greska('konzola', m.text()); });
    this.page.on('pageerror', e => this.greska('js', e.message));
    this.page.on('requestfailed', r => {
      const u = r.url();
      if (u.startsWith('http://127.0.0.1') && !/\.(mp3|ogg|wav)$/i.test(u)) this.greska('mreza', 'Nije učitano: ' + u.replace(/^http:\/\/127\.0\.0\.1:\d+/, ''));
    });
    this.page.on('response', r => {
      const u = r.url();
      if (u.startsWith('http://127.0.0.1') && r.status() >= 400) this.greska('mreza', r.status() + ' ' + decodeURIComponent(u.replace(/^http:\/\/127\.0\.0\.1:\d+/, '')));
    });
    this.page.on('dialog', d => { this.greska('dijalog', d.type() + ': ' + d.message()); d.accept().catch(() => {}); });
    await this.page.goto(`http://127.0.0.1:${this.port}/`, { waitUntil: 'domcontentloaded' });
    await this.pusti(2500);
  }

  greska(vrsta, poruka) {
    if (/favicon|ERR_ABORTED.*stripe|fonts\.g|Failed to load resource|ERR_TUNNEL|ERR_INTERNET|ERR_NAME_NOT/i.test(poruka)) return;
    this.greske.push({ vrsta, poruka: String(poruka).slice(0, 400), t: Date.now() });
  }

  // pusti da prođe "ljudsko" vrijeme (sat stranice) + malo stvarnog za animacije
  async pusti(ms) {
    ms = Math.max(200, Math.round(ms));
    this.virtualnoMs += ms;
    try {
      const korak = 250;
      for (let t = 0; t < ms; t += korak) await this.page.clock.runFor(Math.min(korak, ms - t));
    } catch (e) { /* stranica se možda upravo učitava */ }
    await this.page.waitForTimeout(Math.min(600, 150 + ms / 20));
    try { await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }); } catch (e) {}
  }

  // Kao pusti(), ali usput "gleda" ekran, da uhvati ono što se pojavi pa nestane
  // (okrenuta karta, slike koje bljesnu, poruka "Correct!"). Vraća te retke.
  async pustiIGledaj(ms) {
    ms = Math.max(300, Math.round(ms));
    const vidjeno = new Map();   // normalizirani redak -> redak s brojem (da AI zna KOJA je karta bila što)
    const uzmi = async () => {
      try {
        const t = await this.page.evaluate(snimiEkranUPregledniku, { max: 5000 });
        for (const l of t.tekst.split('\n')) {
          const k = l.replace(/^\[\d+\] /, '').replace(/\s*\{[^}]*\}\s*$/, '');
          if (!vidjeno.has(k)) vidjeno.set(k, l.replace(/\s*\{[^}]*\}\s*$/, ''));
        }
      } catch (e) {}
    };
    let proslo = 0;
    for (const k of [250, 600, 900, 1200, 1500, 2000, 3000]) {
      if (proslo >= ms) break;
      const d = Math.min(k, ms - proslo);
      try { await this.page.clock.runFor(d); } catch (e) {}
      proslo += d;
      await this.page.waitForTimeout(80);
      await uzmi();
    }
    if (proslo < ms) { try { await this.page.clock.runFor(ms - proslo); } catch (e) {} }
    this.virtualnoMs += ms;
    await this.page.waitForTimeout(Math.min(600, 150 + ms / 20));
    try { await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }); } catch (e) {}
    return vidjeno;
  }

  async pogled(maxZnakova = 3500) {
    for (let i = 0; i < 3; i++) {
      try {
        const p = await this.page.evaluate(snimiEkranUPregledniku, { max: maxZnakova });
        p.hash = crypto.createHash('md5').update(p.tekst).digest('hex').slice(0, 10);
        this.zadnjiPogled = p;
        return p;
      } catch (e) { await this.page.waitForTimeout(500); }
    }
    return { tekst: '(ekran se ne može pročitati)', hash: 'x', naslov: '', vjezba: null, brojElemenata: 0 };
  }

  async preuzmiZvukove() {
    let z = [];
    try { z = await this.page.evaluate(() => { const a = window.__aiZvukovi || []; window.__aiZvukovi = []; return a; }); } catch (e) {}
    return z.map(s => {
      if (s.startsWith('tts:')) return s.slice(4);
      const ime = decodeURIComponent(s.split('/').pop() || '').toLowerCase();
      if (!ime) return null;
      return this.podaci.zvukovi[ime] || ime.replace(/\.[a-z0-9]+$/, '');
    }).filter(Boolean);
  }

  // Napredak iz lažne baze (prijavljen) ili iz sessionStoragea (gost, Lesson 0)
  async napredak() {
    try {
      return await this.page.evaluate(() => {
        let v = {};
        try { const g = JSON.parse(sessionStorage.getItem('croland_l0_handoff') || 'null'); if (g && g.vjezbe) Object.assign(v, g.vjezbe); } catch (e) {}
        try { const b = JSON.parse(localStorage.getItem('__lazna_baza') || 'null'); const r = b && b.tablice && b.tablice.progress && b.tablice.progress[0]; if (r && r.vjezbe) Object.assign(v, r.vjezbe); } catch (e) {}
        return v;
      });
    } catch (e) { return {}; }
  }

  async element(n) {
    const loc = this.page.locator(`[data-ai="${n}"]`);
    if (await loc.count() === 0) throw new Error('Element [' + n + '] više ne postoji na ekranu');
    return loc.first();
  }

  // Izvrši radnju koju je AI odabrao. Vraća opis za zapis.
  async izvrsi(r) {
    const rad = String(r.radnja || '').toLowerCase();
    if (rad === 'klik') {
      const el = await this.element(r.n);
      const opis = (r._opis || (await el.innerText().catch(() => '')) || '').replace(/\s+/g, ' ').trim().slice(0, 60);
      // kao čovjek: pomakni stranicu da je element na sredini ekrana (iznad trake/tipkovnice na dnu)
      await el.evaluate(n => n.scrollIntoView({ block: 'center', inline: 'center' })).catch(() => {});
      await this.page.waitForTimeout(120);
      try { await el.click({ timeout: 1500 }); return `klik [${r.n}] "${opis}"`; }
      catch (e) { /* miče se, animira se ili je prekriven — probaj kao čovjek: dodir na točku */ }
      const info = await el.evaluate(async n => {
        const a = n.getBoundingClientRect();
        await new Promise(res => setTimeout(res, 200));
        const b = n.getBoundingClientRect();
        const mice = Math.abs(a.left - b.left) + Math.abs(a.top - b.top) > 2;
        const moj = t => t && (t === n || n.contains(t));
        // čovjek dodirne vidljivi dio elementa — traži točku koja nije prekrivena
        const tocke = [[.5, .5], [.3, .3], [.7, .3], [.3, .7], [.7, .7], [.15, .5], [.85, .5], [.5, .15], [.5, .85]];
        for (const [fx, fy] of tocke) {
          const x = b.left + b.width * fx, y = b.top + b.height * fy;
          if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
          if (moj(document.elementFromPoint(x, y))) return { x, y, mice, pokriva: null };
        }
        const x = b.left + b.width / 2, y = b.top + b.height / 2;
        const top = document.elementFromPoint(x, y);
        let pokriva = null;
        if (!mice && top && !moj(top) && !top.contains(n)) {
          pokriva = (top.innerText || top.getAttribute('title') || top.id || String(top.className) || top.tagName).toString().replace(/\s+/g, ' ').trim().slice(0, 60) || top.tagName;
        }
        return { x, y, mice, pokriva };
      }).catch(() => null);
      if (!info) throw new Error('Element [' + r.n + '] se ne može kliknuti');
      if (info.pokriva) this.greska('prekriveno', `"${opis}" je potpuno prekriven elementom "${info.pokriva}" i kad je na sredini ekrana — dodir pogađa taj element`);
      await this.page.mouse.click(info.x, info.y);
      return `klik [${r.n}] "${opis}"` + (info.pokriva ? ` (prekriveno: ${info.pokriva})` : '');
    }
    if (rad === 'upisi') {
      let el = null;
      if (r.n) el = await this.element(r.n);
      else {
        const aktivan = await this.page.evaluate(() => { const a = document.activeElement; return !!(a && /INPUT|TEXTAREA/.test(a.tagName)); });
        if (!aktivan) {
          const loc = this.page.locator('input:visible, textarea:visible');
          if (await loc.count()) el = loc.first();
        }
      }
      if (el) { await el.click({ timeout: 3000 }).catch(() => {}); await el.fill('').catch(() => {}); }
      await this.page.keyboard.type(String(r.tekst || ''), { delay: 20 });
      if (r.enter) await this.page.keyboard.press('Enter');
      return `upis "${r.tekst}"${r.enter ? ' + Enter' : ''}`;
    }
    if (rad === 'tipka') { await this.page.keyboard.press(String(r.tipka || 'Enter')); return 'tipka ' + r.tipka; }
    if (rad === 'natrag') {
      // tipka "natrag" preglednika — ali nikad izvan aplikacije
      const prije = this.page.url();
      await this.page.goBack({ timeout: 5000 }).catch(() => {});
      if (!this.page.url().startsWith(`http://127.0.0.1:${this.port}/`)) { await this.page.goto(prije).catch(() => {}); return 'natrag (nema kamo — ostao u aplikaciji)'; }
      return 'natrag (preglednik)';
    }
    if (rad === 'biljeska' || rad === 'pogledaj') return 'čekanje';
    if (rad === 'pomakni') { await this.page.mouse.wheel(0, 600); return 'pomak dolje'; }
    if (rad === 'cekaj') return 'čekanje';
    throw new Error('Nepoznata radnja: ' + rad);
  }

  async slika(datoteka, cijelaStranica = false) {
    try {
      await this.page.screenshot({ path: datoteka, type: 'jpeg', quality: 62, scale: 'css', fullPage: cijelaStranica });
      return true;
    } catch (e) { return false; }
  }

  async slikaBase64() {
    try {
      const b = await this.page.screenshot({ type: 'jpeg', quality: 55, scale: 'css' });
      return b.toString('base64');
    } catch (e) { return null; }
  }

  async idiNa(tip, razina, indeks = 0) {
    await this.page.evaluate(([t, r, i]) => { if (typeof idi === 'function') idi('unit', t, r, i); }, [tip, razina, indeks]);
    await this.pusti(1500);
  }

  async spremiStanje(datoteka) { try { await this.ctx.storageState({ path: datoteka }); } catch (e) {} }

  async zatvori() { try { await this.ctx.close(); } catch (e) {} this.ctx = null; }
  async ugasi() { try { await this.browser?.close(); } catch (e) {} this.browser = null; }
}
