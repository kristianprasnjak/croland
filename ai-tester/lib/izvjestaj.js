// Slaže rezultati/izvjestaj.html iz zapisa. Bez AI-ja — ne troši limit.
import fs from 'fs';
import path from 'path';

const citajL = f => { try { return fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean); } catch (e) { return []; } };
const citajJ = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return d; } };

function ucitajRun(dir, rel, podaci) {
  const st = citajJ(path.join(dir, 'stanje.json'), {});
  const run = {
    rel: rel.replace(/\\/g, '/'),
    ime: st.persona || path.basename(dir),
    ciljano: st.ciljano || null,
    status: st.gotovo ? (st.razlogKraja || 'gotovo') : 'u tijeku',
    platio: !!st.platio,
    dani: citajL(path.join(dir, 'dani.jsonl')),
    vjezbe: citajL(path.join(dir, 'vjezbe.jsonl')),
    biljeske: citajL(path.join(dir, 'biljeske.jsonl')).map(b => ({ ...b, zadnjeRadnje: (b.zadnjeRadnje || []).slice(-5) })),
    tehnicko: Object.values(st.tehnicko || {}).sort((a, b) => b.broj - a.broj),
    trijaza: citajJ(path.join(dir, 'trijaza.json'), null),
    odlazak: citajJ(path.join(dir, 'odlazak.json'), null),
    pamtim: st.pamtim || ''
  };
  // cjeline tečaja (za tablicu i točnost), samo one koje su dotaknute + ukupan broj vježbi
  const dotaknute = new Set(run.vjezbe.map(v => v.cjelina));
  run.cjeline = podaci.tecaj.filter(c => dotaknute.has(c.ime)).map(c => ({ ime: c.ime, naslov: c.naslov, ukupno: c.vjezbe.length }));
  run.ukupnoCjelina = podaci.tecaj.length;
  return run;
}

export async function napraviIzvjestaj(rez, podaci) {
  const runovi = [];
  for (const d of fs.readdirSync(rez, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    if (d.name === 'ciljano') {
      for (const c of fs.readdirSync(path.join(rez, 'ciljano'), { withFileTypes: true }).filter(x => x.isDirectory()).map(x => x.name).sort().reverse()) {
        if (fs.existsSync(path.join(rez, 'ciljano', c, 'stanje.json'))) runovi.push(ucitajRun(path.join(rez, 'ciljano', c), 'ciljano/' + c, podaci));
      }
    } else if (fs.existsSync(path.join(rez, d.name, 'stanje.json'))) runovi.push(ucitajRun(path.join(rez, d.name), d.name, podaci));
  }
  const potrosnja = citajJ(path.join(rez, 'potrosnja.json'), {});
  const odluke = citajJ(path.join(rez, 'odluke.json'), {});
  const podatak = { generirano: new Date().toISOString(), runovi, potrosnja: potrosnja.zadnje || null, odluke };
  const json = JSON.stringify(podatak).replace(/</g, '\\u003c');
  fs.writeFileSync(path.join(rez, 'izvjestaj.html'), HTML.replace('/*PODACI*/null', json));
}

const HTML = String.raw`<!doctype html>
<html lang="hr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Croland AI tester</title>
<style>
:root {
  color-scheme: light;
  --plane: #f9f9f7; --surface: #fcfcfb; --card: #ffffff;
  --ink: #0b0b0b; --ink2: #52514e; --muted: #898781;
  --grid: #e1e0d9; --axis: #c3c2b7; --border: rgba(11,11,11,0.10);
  --s1: #2a78d6; --s2: #eb6834; --s3: #1baf7a;
  --good: #0ca30c; --warning: #fab219; --serious: #ec835a; --critical: #d03b3b;
  --accent: #2a78d6; --wash: rgba(42,120,214,0.08);
}
@media (prefers-color-scheme: dark) {
  :root:where(:not([data-theme="light"])) {
    color-scheme: dark;
    --plane: #0d0d0d; --surface: #1a1a19; --card: #1f1f1e;
    --ink: #ffffff; --ink2: #c3c2b7; --muted: #898781;
    --grid: #2c2c2a; --axis: #383835; --border: rgba(255,255,255,0.10);
    --s1: #3987e5; --s2: #d95926; --s3: #199e70; --accent: #3987e5; --wash: rgba(57,135,229,0.14);
  }
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --plane: #0d0d0d; --surface: #1a1a19; --card: #1f1f1e;
  --ink: #ffffff; --ink2: #c3c2b7; --muted: #898781;
  --grid: #2c2c2a; --axis: #383835; --border: rgba(255,255,255,0.10);
  --s1: #3987e5; --s2: #d95926; --s3: #199e70; --accent: #3987e5; --wash: rgba(57,135,229,0.14);
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--plane); color: var(--ink); font: 15px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
header.top { padding: 20px 16px 8px; max-width: 1180px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: baseline; }
header.top h1 { font-size: 22px; margin: 0; letter-spacing: -0.01em; }
header.top .meta { color: var(--muted); font-size: 13px; }
main { max-width: 1180px; margin: 0 auto; padding: 0 16px 60px; }
.tabs { display: flex; gap: 6px; flex-wrap: wrap; margin: 12px 0 18px; }
.tabs button { border: 1px solid var(--border); background: var(--card); color: var(--ink2); border-radius: 999px; padding: 6px 14px; font: inherit; cursor: pointer; }
.tabs button.on { background: var(--ink); color: var(--plane); border-color: var(--ink); }
.card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 860px) { .grid2, .grid3 { grid-template-columns: 1fr; } }
section { margin: 26px 0; }
h2 { font-size: 17px; margin: 0 0 10px; }
h3 { font-size: 15px; margin: 0 0 6px; }
.sub { color: var(--ink2); font-size: 13px; }
.muted { color: var(--muted); }
.hero { display: flex; flex-wrap: wrap; gap: 12px; }
.tile { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; min-width: 130px; flex: 1; }
.tile .v { font-size: 26px; font-weight: 650; }
.tile .l { color: var(--ink2); font-size: 13px; }
.status { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--ink2); }
.dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex: none; }
.sev3 { background: var(--critical); } .sev2 { background: var(--serious); } .sev1 { background: var(--warning); }
.item { border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; margin-bottom: 10px; background: var(--surface); }
.item.zatvoreno { opacity: .55; }
.item .naslov { font-weight: 600; }
.item .red { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; font-size: 13px; color: var(--ink2); margin-top: 2px; }
.item ol { margin: 6px 0 4px 18px; padding: 0; font-size: 14px; }
.item p { margin: 6px 0; font-size: 14px; }
.chip { display: inline-block; font-size: 12px; padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); color: var(--ink2); background: var(--card); }
.alati { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; align-items: center; }
select, input[type=text], button.mali { font: inherit; font-size: 13px; padding: 4px 8px; border-radius: 8px; border: 1px solid var(--border); background: var(--card); color: var(--ink); }
button.mali { cursor: pointer; }
button.mali:hover { background: var(--wash); }
input[type=text] { flex: 1; min-width: 140px; }
.thumbs { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
.thumbs img { height: 88px; border-radius: 6px; border: 1px solid var(--border); cursor: zoom-in; background: var(--surface); }
.dokaz { font-size: 13px; color: var(--ink2); margin: 3px 0; }
details > summary { cursor: pointer; color: var(--ink2); font-size: 13px; }
.timeline { display: grid; gap: 10px; }
.dan { display: grid; grid-template-columns: 120px 1fr; gap: 12px; border-left: 3px solid var(--grid); padding: 8px 0 8px 12px; }
.dan .kad { font-size: 13px; color: var(--ink2); }
.dan .kad b { color: var(--ink); font-size: 15px; display: block; }
.dan .dnevnik { font-size: 14px; }
.brojke { display: flex; gap: 12px; flex-wrap: wrap; font-size: 12.5px; color: var(--ink2); margin-top: 4px; font-variant-numeric: tabular-nums; }
@media (max-width: 600px) { .dan { grid-template-columns: 1fr; } }
table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
th, td { text-align: left; padding: 7px 8px; border-bottom: 1px solid var(--grid); vertical-align: top; }
th { color: var(--ink2); font-weight: 600; font-size: 12.5px; }
td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
tr.klik { cursor: pointer; } tr.klik:hover td { background: var(--wash); }
.tablewrap { overflow-x: auto; }
.gal { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.gal figure { margin: 0; }
.gal img { width: 100%; border-radius: 8px; border: 1px solid var(--border); cursor: zoom-in; display: block; }
.gal figcaption { font-size: 12px; color: var(--ink2); margin-top: 4px; }
.filteri { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.chart { width: 100%; position: relative; }
.chart svg { width: 100%; height: auto; display: block; overflow: visible; }
.chart .axis text, .chart text.lbl { fill: var(--muted); font-size: 11px; font-variant-numeric: tabular-nums; }
.chart .gridline { stroke: var(--grid); stroke-width: 1; }
.chart .base { stroke: var(--axis); stroke-width: 1; }
.legend { display: flex; gap: 14px; flex-wrap: wrap; font-size: 12.5px; color: var(--ink2); margin: 4px 0 6px; }
.legend span { display: inline-flex; align-items: center; gap: 6px; }
.legend i { width: 14px; height: 3px; border-radius: 2px; display: inline-block; }
.tip { position: fixed; pointer-events: none; background: var(--card); color: var(--ink); border: 1px solid var(--border); border-radius: 8px; padding: 6px 9px; font-size: 12.5px; box-shadow: 0 4px 16px rgba(0,0,0,.14); z-index: 20; display: none; max-width: 260px; }
.lightbox { position: fixed; inset: 0; background: rgba(0,0,0,.8); display: none; align-items: center; justify-content: center; z-index: 30; padding: 16px; flex-direction: column; gap: 8px; }
.lightbox img { max-width: 100%; max-height: 86vh; border-radius: 8px; }
.lightbox div { color: #fff; font-size: 14px; max-width: 700px; text-align: center; }
.prazno { color: var(--muted); font-size: 14px; padding: 8px 0; }
blockquote { margin: 8px 0; padding: 8px 12px; border-left: 3px solid var(--axis); color: var(--ink2); background: var(--surface); border-radius: 0 8px 8px 0; }
.spremljeno { font-size: 12px; color: var(--muted); }
</style>
</head>
<body>
<header class="top">
  <h1>Croland · AI tester</h1>
  <span class="meta" id="meta"></span>
</header>
<main>
  <nav class="tabs" id="tabs"></nav>
  <div id="sadrzaj"></div>
</main>
<div class="tip" id="tip"></div>
<div class="lightbox" id="lb" onclick="this.style.display='none'"><img alt=""><div></div></div>
<script>
const D = /*PODACI*/null;
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const TIP = { bug: 'Bug', zbunjenost: 'Zbunjenost', frustracija: 'Frustracija', dosada: 'Dosada', sadrzaj: 'Sadržaj', svidja: 'Sviđa mu se', ideja: 'Ideja' };
const VAZ = { 3: 'Ozbiljno', 2: 'Primjetno', 1: 'Sitno' };
const STATUSI = [['otvoreno', 'Otvoreno'], ['kasnije', 'Kasnije'], ['ispravljeno', 'Ispravljeno'], ['odbaceno', 'Odbačeno']];
let odluke = Object.assign({}, D.odluke || {});
try { const l = JSON.parse(localStorage.getItem('croland-ai-odluke') || '{}'); for (const k in l) if (!odluke[k] || (l[k].t || 0) > (odluke[k].t || 0)) odluke[k] = l[k]; } catch (e) {}
const naPosluzitelju = location.protocol.startsWith('http');

function spremiOdluke() {
  try { localStorage.setItem('croland-ai-odluke', JSON.stringify(odluke)); } catch (e) {}
  if (naPosluzitelju) fetch('/__ai/odluke', { method: 'POST', body: JSON.stringify(odluke) }).then(r => {
    document.querySelectorAll('.spremljeno').forEach(e => e.textContent = r.ok ? 'spremljeno' : 'nije spremljeno');
  }).catch(() => {});
}
function postaviStatus(id, status) { odluke[id] = Object.assign({}, odluke[id], { status, t: Date.now() }); spremiOdluke(); prikazi(); }
function postaviKomentar(id, k) { odluke[id] = Object.assign({}, odluke[id], { komentar: k, t: Date.now() }); spremiOdluke(); }

function lb(src, opis) { const l = $('#lb'); l.querySelector('img').src = src; l.querySelector('div').textContent = opis || ''; l.style.display = 'flex'; }
function slika(run, s, opis) { if (!s) return ''; const src = run.rel + '/' + s; return '<img loading="lazy" src="' + esc(src) + '" alt="' + esc(opis || '') + '" onclick="lb(this.src, this.alt)">'; }
const sev = v => '<span class="status"><span class="dot sev' + (v || 1) + '"></span>' + VAZ[v || 1] + '</span>';
const fmtDatum = t => t ? new Date(t).toLocaleDateString('hr-HR', { weekday: 'short', day: 'numeric', month: 'numeric' }) : '';

// ---------- grafovi (SVG, bez knjižnica) ----------
const tipEl = $('#tip');
function pokaziTip(e, html) { tipEl.innerHTML = html; tipEl.style.display = 'block'; const x = Math.min(e.clientX + 14, innerWidth - 270); tipEl.style.left = x + 'px'; tipEl.style.top = (e.clientY + 14) + 'px'; }
function sakrijTip() { tipEl.style.display = 'none'; }

function stupci({ podaci, max, oznakaY, boja = 'var(--s1)', crta = null, visina = 180 }) {
  const W = 640, H = visina, L = 34, R = 8, T = 10, B = 26;
  const n = podaci.length || 1, sirina = (W - L - R) / n, bw = Math.max(3, Math.min(36, sirina - 2));
  const y = v => T + (H - T - B) * (1 - v / max);
  let g = '';
  for (const t of [0, 0.5, 1]) { const v = Math.round(max * t); g += '<line class="gridline" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text x="' + (L - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + oznakaY + '</text>'; }
  let s = '';
  podaci.forEach((d, i) => {
    const x = L + i * sirina + (sirina - bw) / 2, v = Math.min(d.v, max), h = Math.max(0, y(0) - y(v));
    const r = Math.min(4, bw / 2, h);
    const put = h > 0 ? 'M' + x + ',' + y(0) + 'V' + (y(v) + r) + 'Q' + x + ',' + y(v) + ' ' + (x + r) + ',' + y(v) + 'H' + (x + bw - r) + 'Q' + (x + bw) + ',' + y(v) + ' ' + (x + bw) + ',' + (y(v) + r) + 'V' + y(0) + 'Z' : '';
    s += '<g class="h" data-tip="' + esc(d.tip) + '"><rect x="' + (L + i * sirina) + '" y="' + T + '" width="' + sirina + '" height="' + (H - T - B) + '" fill="transparent"/>' + (put ? '<path d="' + put + '" fill="' + (d.boja || boja) + '"/>' : '');
    if (crta && d.c != null) s += '<line x1="' + (x - 2) + '" x2="' + (x + bw + 2) + '" y1="' + y(Math.min(d.c, max)) + '" y2="' + y(Math.min(d.c, max)) + '" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>';
    s += '</g>';
    if (n <= 16 || i % Math.ceil(n / 16) === 0) s += '<text class="lbl" x="' + (x + bw / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(d.x) + '</text>';
  });
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="axis">' + g + '<line class="base" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(0) + '" y2="' + y(0) + '"/>' + s + '</svg>';
}

function linije({ x, serije, min = 1, max = 5, visina = 190 }) {
  const W = 640, H = visina, L = 26, R = 70, T = 10, B = 26;
  const n = x.length; const px = i => L + (n <= 1 ? (W - L - R) / 2 : i * (W - L - R) / (n - 1));
  const y = v => T + (H - T - B) * (1 - (v - min) / (max - min));
  let g = '';
  for (let v = min; v <= max; v++) g += '<line class="gridline" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text x="' + (L - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>';
  let s = ''; const oznake = [];
  serije.forEach(se => {
    const pts = se.v.map((v, i) => v == null ? null : [px(i), y(v)]);
    let d = '', pisi = false;
    pts.forEach(p => { if (!p) { pisi = false; return; } d += (pisi ? 'L' : 'M') + p[0] + ',' + p[1]; pisi = true; });
    s += '<path d="' + d + '" fill="none" stroke="' + se.boja + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
    pts.forEach(p => { if (p && n <= 40) s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="' + se.boja + '" stroke="var(--card)" stroke-width="2"/>'; });
    const zadnji = [...pts].reverse().find(Boolean);
    if (zadnji) oznake.push({ x: zadnji[0] + 8, y: zadnji[1] + 4, t: se.ime });
  });
  oznake.sort((a, b) => a.y - b.y);
  for (let i = 1; i < oznake.length; i++) if (oznake[i].y - oznake[i - 1].y < 12) oznake[i].y = oznake[i - 1].y + 12;
  oznake.forEach(o => { s += '<text class="lbl" x="' + o.x + '" y="' + o.y + '" style="fill:var(--ink2)">' + esc(o.t) + '</text>'; });
  let lab = '';
  x.forEach((t, i) => { if (n <= 16 || i % Math.ceil(n / 16) === 0) lab += '<text class="lbl" x="' + px(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(t) + '</text>'; });
  let hov = '';
  x.forEach((t, i) => {
    const w = n <= 1 ? (W - L - R) : (W - L - R) / (n - 1);
    const tip = '<b>Dan ' + esc(t) + '</b><br>' + serije.map(se => '<span class=&quot;dot&quot; style=&quot;background:' + se.boja + '&quot;></span> ' + esc(se.ime) + ': ' + (se.v[i] ?? '–')).join('<br>');
    hov += '<rect class="h" data-tip="' + tip + '" x="' + (px(i) - w / 2) + '" y="' + T + '" width="' + w + '" height="' + (H - T - B) + '" fill="transparent"/>';
  });
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="axis">' + g + '<line class="base" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(min) + '" y2="' + y(min) + '"/>' + s + lab + hov + '</svg>';
}
document.addEventListener('mousemove', e => { const h = e.target.closest && e.target.closest('.h'); if (h && h.dataset.tip) pokaziTip(e, h.dataset.tip); else sakrijTip(); });

// ---------- dijelovi ----------
function kopirajZaClaudea(run, s, gumb) {
  const bil = Object.fromEntries(run.biljeske.map(b => [b.id, b]));
  let t = 'Croland — nalaz AI testera ' + s.id + ': ' + s.naslov + '\n';
  if (s.gdje) t += 'Gdje: ' + s.gdje + '\n';
  if (s.koraci && s.koraci.length) t += 'Koraci:\n' + s.koraci.map((k, i) => (i + 1) + '. ' + k).join('\n') + '\n';
  if (s.ocekivano) t += 'Očekivano: ' + s.ocekivano + '\n';
  if (s.stvarno) t += 'Stvarno: ' + s.stvarno + '\n';
  const dok = (s.dokazi || []).map(id => bil[id]).filter(Boolean);
  if (dok.length) t += 'Dokazi:\n' + dok.slice(0, 5).map(b => '- ' + b.id + ' (dan ' + b.dan + ', ' + (b.vjezba || b.ekran || '') + '): ' + b.tekst + (b.slika ? ' [slika: ai-tester/rezultati/' + run.rel + '/' + b.slika + ']' : '')).join('\n') + '\n';
  t += '\nProvjeri u index.html / data.js je li problem stvaran i ispravi ga. Ako nije stvaran, reci zašto.';
  navigator.clipboard.writeText(t).then(() => { gumb.textContent = 'Kopirano ✓'; setTimeout(() => gumb.textContent = 'Kopiraj za Claudea', 1500); });
}

function stavka(run, s, zaAI, ri) {
  const o = odluke[s.id] || {}; const st = o.status || 'otvoreno';
  const bil = Object.fromEntries(run.biljeske.map(b => [b.id, b]));
  const dok = (s.dokazi || []).map(id => bil[id]).filter(Boolean);
  let h = '<div class="item ' + (['ispravljeno', 'odbaceno'].includes(st) ? 'zatvoreno' : '') + '">';
  h += '<div class="naslov">' + esc(s.id) + ' · ' + esc(s.naslov) + '</div>';
  h += '<div class="red">' + sev(s.vaznost) + '<span>javilo se ' + (s.ucestalost || 1) + '×</span>' + (s.tema ? '<span class="chip">' + esc(s.tema) + '</span>' : '') + (s.gdje ? '<span>' + esc(s.gdje) + '</span>' : '') + '</div>';
  if (zaAI) {
    if (s.koraci && s.koraci.length) h += '<ol>' + s.koraci.map(k => '<li>' + esc(k) + '</li>').join('') + '</ol>';
    if (s.ocekivano) h += '<p><b>Očekivano:</b> ' + esc(s.ocekivano) + '</p>';
    if (s.stvarno) h += '<p><b>Stvarno:</b> ' + esc(s.stvarno) + '</p>';
  } else {
    if (s.opis) h += '<p>' + esc(s.opis) + '</p>';
    if (s.prijedlog) h += '<p><b>Prijedlog:</b> ' + esc(s.prijedlog) + '</p>';
  }
  if (s.napomena) h += '<p class="sub">' + esc(s.napomena) + '</p>';
  if (dok.length) {
    h += '<details><summary>Dokazi (' + dok.length + ')</summary>' + dok.map(b => '<div class="dokaz">' + esc(b.id) + ' · dan ' + esc(b.dan) + ' · ' + esc(b.vjezba || b.ekran || '') + ': „' + esc(b.tekst) + '”</div>').join('');
    h += '<div class="thumbs">' + dok.filter(b => b.slika).slice(0, 6).map(b => slika(run, b.slika, b.id + ': ' + b.tekst)).join('') + '</div></details>';
  }
  h += '<div class="alati"><select onchange="postaviStatus(\'' + esc(s.id) + '\', this.value)">' + STATUSI.map(([v, t]) => '<option value="' + v + '"' + (v === st ? ' selected' : '') + '>' + t + '</option>').join('') + '</select>';
  h += '<input type="text" placeholder="Tvoj komentar…" value="' + esc(o.komentar || '') + '" onchange="postaviKomentar(\'' + esc(s.id) + '\', this.value)">';
  if (zaAI) h += '<button class="mali" data-run="' + ri + '" data-id="' + esc(s.id) + '" onclick="kopiraj(this)">Kopiraj za Claudea</button>';
  h += '</div></div>';
  return h;
}
function kopiraj(g) { const run = D.runovi[+g.dataset.run]; const s = (run.trijaza.za_ai || []).find(x => x.id === g.dataset.id); kopirajZaClaudea(run, s, g); }

function biljeskaHtml(run, b) {
  return '<div class="item"><div class="red">' + sev(b.vaznost) + '<span class="chip">' + esc(TIP[b.tip] || b.tip) + '</span><span>dan ' + esc(b.dan) + (b.vjezba ? ' · ' + esc(b.vjezba) : '') + (b.format ? ' · ' + esc(b.format) : '') + '</span><span class="muted">' + esc(b.id) + (b.izvor === 'auto' ? ' · automatski' : b.izvor === 'pitanje' ? ' · odgovor na pitanje' : b.izvor === 'dnevnik' ? ' · iz dnevnika' : '') + '</span></div>' +
    '<p>' + esc(b.tekst) + '</p>' + (b.pitanje ? '<p class="sub">Pitanje: ' + esc(b.pitanje) + '</p>' : '') +
    (b.zadnjeRadnje && b.zadnjeRadnje.length ? '<details><summary>Što je radio prije</summary><div class="dokaz">' + b.zadnjeRadnje.map(esc).join('<br>') + '</div></details>' : '') +
    (b.slika ? '<div class="thumbs">' + slika(run, b.slika, b.id + ': ' + b.tekst) + '</div>' : '') + '</div>';
}

let aktivni = 0, filter = { tip: '', vaz: '', cj: '' };
function prikaziRun(run, ri) {
  const dani = run.dani, v = run.vjezbe, b = run.biljeske;
  const min = dani.reduce((a, d) => a + (d.minuta || 0), 0);
  const tocnost = v.length ? Math.round(100 * v.reduce((a, x) => a + x.bodovi, 0) / Math.max(1, v.reduce((a, x) => a + (x.max || 0), 0))) : null;
  let h = '';
  const statusTxt = run.ciljano ? 'Ciljani test: ' + run.ciljano : run.status === 'odustao' ? 'Odustao nakon dana ' + (dani.length ? dani[dani.length - 1].dan : '?') : run.status === 'završio tečaj' ? 'Završio tečaj' : 'Test u tijeku';
  h += '<section><div class="hero">';
  h += '<div class="tile"><div class="v">' + esc(run.ime) + '</div><div class="l">' + esc(statusTxt) + (run.platio ? ' · platio pretplatu' : '') + '</div></div>';
  h += '<div class="tile"><div class="v">' + dani.length + '</div><div class="l">dana učenja</div></div>';
  h += '<div class="tile"><div class="v">' + Math.round(min) + ' min</div><div class="l">ukupno vrijeme (procjena)</div></div>';
  h += '<div class="tile"><div class="v">' + v.length + '</div><div class="l">završenih vježbi</div></div>';
  h += '<div class="tile"><div class="v">' + (tocnost == null ? '–' : tocnost + ' %') + '</div><div class="l">prosječni bodovi</div></div>';
  h += '<div class="tile"><div class="v">' + b.length + '</div><div class="l">bilješki</div></div>';
  h += '</div></section>';

  if (run.odlazak) h += '<section class="card"><h2>Zašto je otišao</h2><blockquote>' + esc(run.odlazak.razlog_odlaska) + '</blockquote><div class="grid2"><div><h3>Što bi ga zadržalo</h3><p>' + esc(run.odlazak.sto_bi_me_zadrzalo) + '</p></div><div><h3>Poruka developeru</h3><p>' + esc(run.odlazak.poruka_developeru) + '</p></div><div><h3>Najbolje</h3><p>' + esc(run.odlazak.najbolje) + '</p></div><div><h3>Najgore</h3><p>' + esc(run.odlazak.najgore) + '</p></div></div></section>';

  // trijaža
  const T = run.trijaza;
  if (T) {
    const otv = a => (a || []).filter(s => !['ispravljeno', 'odbaceno'].includes((odluke[s.id] || {}).status)).length;
    h += '<section><h2>Trijaža</h2><p class="sub">Razvrstao jači model ' + new Date(T.vrijeme).toLocaleString('hr-HR') + ' (' + (T.danaObradjeno || '?') + ' dana, ' + (T.biljeskiObradjeno || '?') + ' bilješki). Oznake se spremaju ' + (naPosluzitelju ? 'u mapu rezultati (odluke.json) i koriste se u sljedećoj trijaži. <span class="spremljeno"></span>' : 'samo u ovom pregledniku — otvori izvještaj preko 5-OTVORI-IZVJESTAJ.bat da se spreme i za sljedeću trijažu.') + '</p>';
    if (T.sazetak) h += '<blockquote>' + esc(T.sazetak) + '</blockquote>';
    h += '<div class="grid2"><div><h3>Za ispravak — AI (' + otv(T.za_ai) + ' otvoreno)</h3><p class="sub">Popis je i u datoteci ' + esc(run.rel) + '/za-ispravak.md — daj je Claudeu.</p>';
    const poVaz = (a, c) => (c.vaznost || 0) - (a.vaznost || 0) || (c.ucestalost || 0) - (a.ucestalost || 0);
    h += (T.za_ai || []).slice().sort(poVaz).map(s => stavka(run, s, true, ri)).join('') || '<div class="prazno">Nema.</div>';
    h += '</div><div><h3>Za tebe — odluke (' + otv(T.za_tebe) + ' otvoreno)</h3><p class="sub">Pitanja pedagogije, tempa, gamifikacije i plaćanja.</p>';
    h += (T.za_tebe || []).slice().sort(poVaz).map(s => stavka(run, s, false, ri)).join('') || '<div class="prazno">Nema.</div>';
    h += '</div></div></section>';
  } else {
    h += '<section class="card"><h2>Trijaža</h2><p class="sub">Još nije napravljena (radi se svakih nekoliko dana i na kraju, kad ima limita). Dotad su ispod sve sirove bilješke.</p></section>';
  }

  // grafovi
  if (dani.length) {
    h += '<section><h2>Kako je išlo</h2><div class="grid2">';
    const maxMin = Math.max(10, ...dani.map(d => Math.max(d.minuta || 0, d.budzet || 0))) * 1.1;
    h += '<div class="card"><h3>Minute po danu</h3><div class="legend"><span><i style="background:var(--s1)"></i>stvarno</span><span><i style="background:var(--ink)"></i>plan</span></div><div class="chart">' +
      stupci({ podaci: dani.map(d => ({ x: d.dan, v: d.minuta || 0, c: d.budzet, tip: '<b>Dan ' + d.dan + '</b> · ' + esc(fmtDatum(d.datum)) + '<br>' + (d.minuta || 0) + ' min od planiranih ' + (d.budzet || '?') + '<br>' + (d.vjezbe || 0) + ' vježbi · ' + esc(d.uredaj || '') })), max: Math.ceil(maxMin), oznakaY: '', crta: true }) + '</div></div>';
    const imaRasp = dani.some(d => d.raspolozenje);
    if (imaRasp) h += '<div class="card"><h3>Raspoloženje, frustracija i dosada (1–5)</h3><div class="legend"><span><i style="background:var(--s1)"></i>raspoloženje</span><span><i style="background:var(--s2)"></i>frustracija</span><span><i style="background:var(--s3)"></i>dosada</span></div><div class="chart">' +
      linije({ x: dani.map(d => d.dan), serije: [{ ime: 'raspoloženje', boja: 'var(--s1)', v: dani.map(d => d.raspolozenje) }, { ime: 'frustracija', boja: 'var(--s2)', v: dani.map(d => d.frustracija) }, { ime: 'dosada', boja: 'var(--s3)', v: dani.map(d => d.dosada) }] }) + '</div></div>';
    h += '</div></section>';
  }
  // po cjelinama
  if (run.cjeline.length) {
    const red = run.cjeline.map(c => {
      const vv = v.filter(x => x.cjelina === c.ime); const bb = b.filter(x => (x.vjezba || '').startsWith(c.ime + ' '));
      const bod = vv.reduce((a, x) => a + x.bodovi, 0), mx = vv.reduce((a, x) => a + (x.max || 0), 0);
      return { ...c, zavrseno: new Set(vv.map(x => x.kljuc)).size, tocnost: mx ? Math.round(100 * bod / mx) : null, min: vv.length ? (vv.reduce((a, x) => a + (x.trajanjeMin || 0), 0) / vv.length) : null, bilj: bb.length };
    });
    h += '<section><h2>Po cjelinama</h2><div class="grid2"><div class="card"><h3>Prosječni bodovi po cjelini</h3><div class="chart">' +
      stupci({ podaci: red.map(r => ({ x: r.ime.replace(/^(\w)\w+ /, '$1'), v: r.tocnost || 0, tip: '<b>' + esc(r.ime) + '</b> ' + esc(r.naslov) + '<br>' + (r.tocnost ?? '–') + ' % bodova · ' + r.zavrseno + '/' + r.ukupno + ' vježbi' })), max: 100, oznakaY: '%' }) +
      '</div><p class="sub">L = Lesson, V = Vocabulary, G = Grammar, P = Practice, T = Test.</p></div>';
    h += '<div class="card tablewrap"><table><thead><tr><th>Cjelina</th><th class="num">Vježbe</th><th class="num">Bodovi</th><th class="num">Min/vježbi</th><th class="num">Bilješke</th></tr></thead><tbody>' +
      red.map(r => '<tr class="klik" onclick="filter.cj=\'' + esc(r.ime) + '\';prikazi();document.getElementById(\'svebilj\').scrollIntoView({behavior:\'smooth\'})"><td>' + esc(r.ime) + ' <span class="muted">' + esc(r.naslov) + '</span></td><td class="num">' + r.zavrseno + '/' + r.ukupno + '</td><td class="num">' + (r.tocnost ?? '–') + ' %</td><td class="num">' + (r.min == null ? '–' : r.min.toFixed(1)) + '</td><td class="num">' + r.bilj + '</td></tr>').join('') +
      '</tbody></table><p class="sub">Klik na redak filtrira bilješke te cjeline.</p></div></div></section>';
  }
  // put dan po dan
  if (dani.length && !run.ciljano) {
    h += '<section><h2>' + esc(run.ime) + 'ov put, dan po dan</h2><div class="timeline">';
    for (const d of dani.slice().reverse()) {
      const bb = b.filter(x => x.dan === d.dan);
      h += '<div class="dan"><div class="kad"><b>Dan ' + d.dan + '</b>' + esc(fmtDatum(d.datum)) + '<br>' + esc(d.uredaj || '') + '</div><div><div class="dnevnik">' + esc(d.dnevnik || '') + '</div>' +
        '<div class="brojke"><span>' + (d.minuta || 0) + '/' + (d.budzet || '?') + ' min</span><span>' + (d.vjezbe || 0) + ' vježbi' + (d.maxBodovi ? ' · ' + Math.round(100 * d.bodovi / d.maxBodovi) + ' % bodova' : '') + '</span><span>raspoloženje ' + (d.raspolozenje ?? '–') + ' · frustracija ' + (d.frustracija ?? '–') + ' · dosada ' + (d.dosada ?? '–') + '</span><span>vraća se: ' + esc(d.vracam_se || '–') + '</span>' + (d.platio_bih ? '<span>platio bi: ' + esc(d.platio_bih) + '</span>' : '') + '</div>' +
        (d.zasto ? '<div class="sub">„' + esc(d.zasto) + '”</div>' : '') + (d.prisilniKraj ? '<div class="sub">Dan prekinut: ' + esc(d.prisilniKraj) + '</div>' : '') +
        (bb.length ? '<details><summary>' + bb.length + ' bilješki tog dana</summary>' + bb.map(x => biljeskaHtml(run, x)).join('') + '</details>' : '') + '</div></div>';
    }
    h += '</div></section>';
  } else if (dani.length) {
    h += '<section class="card"><h2>Dojam</h2><p>' + esc(dani[0].dnevnik || '') + '</p><div class="brojke"><span>' + (dani[0].minuta || 0) + ' min</span><span>raspoloženje ' + (dani[0].raspolozenje ?? '–') + ' · frustracija ' + (dani[0].frustracija ?? '–') + ' · dosada ' + (dani[0].dosada ?? '–') + '</span>' + (dani[0].prisilniKraj ? '<span>prekinuto: ' + esc(dani[0].prisilniKraj) + '</span>' : '') + '</div></section>';
  }
  // tehničke greške
  if (run.tehnicko.length) {
    h += '<section><h2>Tehničke greške i nedostajuće datoteke</h2><div class="card tablewrap"><table><thead><tr><th>Vrsta</th><th>Poruka</th><th class="num">Puta</th><th>Prvi put</th><th></th></tr></thead><tbody>' +
      run.tehnicko.slice(0, 80).map(t => '<tr><td>' + esc(t.vrsta) + '</td><td>' + esc(t.poruka) + '</td><td class="num">' + t.broj + '</td><td>dan ' + esc(t.prvi?.dan) + ' · ' + esc(t.prvi?.vjezba || '') + '<br><span class="muted">' + esc(t.prvi?.radnja || '') + '</span></td><td>' + (t.slika ? '<div class="thumbs">' + slika(run, t.slika, t.poruka) + '</div>' : '') + '</td></tr>').join('') +
      '</tbody></table></div></section>';
  }
  // sve bilješke
  h += '<section id="svebilj"><h2>Sve bilješke (' + b.length + ')</h2><div class="filteri">' +
    '<select onchange="filter.tip=this.value;prikazi()"><option value="">sve vrste</option>' + Object.entries(TIP).map(([k, t]) => '<option value="' + k + '"' + (filter.tip === k ? ' selected' : '') + '>' + t + '</option>').join('') + '</select>' +
    '<select onchange="filter.vaz=this.value;prikazi()"><option value="">sve važnosti</option>' + [3, 2, 1].map(k => '<option value="' + k + '"' + (filter.vaz == k ? ' selected' : '') + '>' + VAZ[k] + '</option>').join('') + '</select>' +
    (filter.cj ? '<button class="mali" onclick="filter.cj=\'\';prikazi()">✕ ' + esc(filter.cj) + '</button>' : '') + '</div>';
  const fb = b.filter(x => (!filter.tip || x.tip === filter.tip) && (!filter.vaz || x.vaznost == filter.vaz) && (!filter.cj || (x.vjezba || '').startsWith(filter.cj + ' '))).slice().reverse();
  h += fb.slice(0, 300).map(x => biljeskaHtml(run, x)).join('') || '<div class="prazno">Nema bilješki za ovaj filter.</div>';
  h += '</section>';
  // galerija
  const sl = [...b.filter(x => x.slika).map(x => ({ s: x.slika, o: x.id + ' · ' + (TIP[x.tip] || x.tip) + ': ' + x.tekst })), ...run.tehnicko.filter(t => t.slika).map(t => ({ s: t.slika, o: 'Greška: ' + t.poruka }))];
  if (sl.length) h += '<section><h2>Screenshotovi (' + sl.length + ')</h2><div class="gal">' + sl.slice(-120).reverse().map(x => '<figure>' + slika(run, x.s, x.o) + '<figcaption>' + esc(x.o.slice(0, 90)) + '</figcaption></figure>').join('') + '</div></section>';
  return h;
}

function prikazi() {
  const R = D.runovi;
  if (!R.length) { $('#sadrzaj').innerHTML = '<div class="card">Još nema rezultata. Pokreni 2-PILOT-MIKE.bat, 3-POKRENI-MIKEA.bat ili 4-CILJANI-TEST.bat.</div>'; return; }
  $('#tabs').innerHTML = R.map((r, i) => '<button class="' + (i === aktivni ? 'on' : '') + '" onclick="aktivni=' + i + ';filter={tip:\'\',vaz:\'\',cj:\'\'};prikazi();scrollTo(0,0)">' + esc(r.ciljano ? r.ciljano + ' · ' + r.rel.split('_').slice(-1)[0].slice(0, 10) : r.ime) + '</button>').join('');
  const y = scrollY;
  $('#sadrzaj').innerHTML = prikaziRun(R[aktivni], aktivni);
  scrollTo(0, y);
}
const p = D.potrosnja;
$('#meta').textContent = 'Osvježeno ' + new Date(D.generirano).toLocaleString('hr-HR') + (p && p.tjedno != null ? ' · tjedni limit ' + Math.round(p.tjedno) + ' % (tester ovaj tjedan ~' + Math.max(0, Math.round(p.udioTestera)) + ' %)' : '');
R_init: { const i = D.runovi.findIndex(r => !r.ciljano); aktivni = i >= 0 ? i : 0; }
prikazi();
</script>
</body>
</html>`;
