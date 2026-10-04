#!/usr/bin/env node
/**
 * izgradi-fr.js — gradi francusku stranicu (zaseban GitHub Pages repo) iz Croland enginea.
 *
 *   node francais/izgradi-fr.js
 *
 * Ulaz:   francais/igre/*.md          sadržaj tečaja (Croland format)
 *         index.html                  Croland engine (ista aplikacija)
 * Izlaz:  francais/stranica/          sve što ide na GitHub (repo kristianprasnjak/francais)
 *         zasticeno/data-plus-fr.json plaćeni dio -> Supabase bucket "sadrzaj"
 *
 * Što je zajedničko s Crolandom: račun (Supabase Auth) i plaćanje (pretplate, kodovi).
 * Što je odvojeno: napredak, bodovi, prijatelji — shema `tecaj_fr` u istoj bazi
 * (supabase-tecaj-fr.sql). Stranica to dobiva jednom izmjenom: createClient(..., { db: { schema } }).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { podijeli, ucitajPodatke, zapisi } = require('../scripts/podijeli-podatke');

const SHEMA = 'tecaj_fr';
const NAZIV = 'Croland Français';
const PLACENI = 'data-plus-fr.json';
const PREFIKS = 'francais';          // ključevi u pregledniku (isti origin kao Croland!)

const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'stranica');
const ZASTICENO = path.join(ROOT, 'zasticeno');
const PRIVREMENO = path.join(__dirname, 'data-fr.js');

// ---- 1. sadržaj: francais/igre -> francais/data-fr.js (isti parser kao njemački) ----
execFileSync(process.execPath, [path.join(__dirname, 'osvjezi-fr.js')], { stdio: 'inherit' });

// ---- 2. index.html: Croland engine + izmjene za francuski ----
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
function zamijeni(staro, novo, opis) {
  const prije = html;
  html = typeof staro === 'string' ? html.split(staro).join(novo) : html.replace(staro, novo);
  if (html === prije) throw new Error('izgradi-fr: nije nađeno u index.html — ' + opis +
    ' (engine se promijenio; prilagodi izgradi-fr.js)');
}
// napredak/bodovi/prijatelji u vlastitoj shemi; račun i plaćanje idu kroz poglede u public
zamijeni('window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)',
  "window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { db: { schema: '" + SHEMA + "' } })",
  'createClient');
// plaćeni dio francuskog
zamijeni("/sadrzaj?f=data-plus.json", "/sadrzaj?f=" + PLACENI, 'sadrzaj?f=data-plus.json');
// samo jedno sučelje (EN); njemačka Croland stranica ovdje ne postoji
zamijeni("STRANICE = { en: 'index.html', de: 'index-de.html' }", "STRANICE = { en: 'index.html' }", 'STRANICE');
zamijeni("JEZIK_STRANICA = { en: 'index.html', de: 'index-de.html' }", "JEZIK_STRANICA = { en: 'index.html' }", 'JEZIK_STRANICA');
zamijeni(/,\s*\{ id: 'de', ime: 'Deutsch'[^}]*\}/, '', 'JEZICI de');
// Isti origin (kristianprasnjak.github.io) = isti localStorage. Prijava se namjerno
// dijeli (ključ sb-...-auth-token ostaje), a sve ostalo dobiva vlastiti prefiks.
for (const k of ["'croland-mini-'", "'croland.jezik'", "'croland.nakonJezika'", "'croland_l0_handoff'",
                 "'croland_posle_prijave'", "'croland-ikone'", "'croland-pocetni-izgled'"]) {
  zamijeni(k, k.replace('croland', PREFIKS), k);
}
zamijeni(/<title>[^<]*<\/title>/, '<title>' + NAZIV + '</title>', 'title');
zamijeni('<html lang="en">', '<html lang="en" data-tecaj="fr">', 'html lang');

// ---- 3. složi stranicu ----
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) {
  if (f === '.git' || f === '.github' || f === 'README.md') continue;   // repo ostaje repo
  try { fs.rmSync(path.join(OUT, f), { recursive: true, force: true }); } catch (e) { /* bez prava brisanja: datoteka se ionako prepisuje */ }
}
fs.writeFileSync(path.join(OUT, 'index.html'), html, 'utf8');
for (const f of ['terms.html', 'privacy.html']) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
// rječnik i pregledi su hrvatski — francuski ih zasad nema (prazni, da engine ne pukne)
fs.writeFileSync(path.join(OUT, 'rjecnik.js'), '// francuski rjecnik: jos ne postoji\nwindow.RJECNIK = {"leme":[]};\n', 'utf8');
const pregledi = path.join(__dirname, 'pregledi-fr.js');
fs.copyFileSync(fs.existsSync(pregledi) ? pregledi : path.join(ROOT, 'pregledi.js'), path.join(OUT, 'pregledi.js'));
// slike se ne kopiraju: data.js pokazuje na ../croland/slike/ (isti origin). Zvuk je francuski.
if (fs.existsSync(path.join(__dirname, 'zvuk'))) fs.cpSync(path.join(__dirname, 'zvuk'), path.join(OUT, 'zvuk'), { recursive: true });
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

// ---- 4. podjela: javno u stranicu, plaćeno u zasticeno/ ----
const rezultat = podijeli(ucitajPodatke(PRIVREMENO));
zapisi({ javniDir: OUT, placeniDir: ZASTICENO }, rezultat, { javni: 'data.js', placeni: PLACENI });
const javni = ucitajPodatke(path.join(OUT, 'data.js'));
for (const g of javni.igre) {
  if (g.zakljucano && (g.stavke || []).length) throw new Error('izgradi-fr: zaključana vježba ima sadržaj u javnom data.js — ' + g.naslov);
}
const spojeno = javni.igre.filter((g) => !g.zakljucano).length + rezultat.placeni.igre.length;
if (spojeno !== ucitajPodatke(PRIVREMENO).igre.length) throw new Error('izgradi-fr: podjela je izgubila vježbe');

console.log('francais/stranica/ gotova ·', rezultat.brojke.besplatnih, 'besplatnih,', rezultat.brojke.placenih, 'plaćenih vježbi');
console.log('  plaćeni dio: zasticeno/' + PLACENI + '  ->  node uploadaj-sadrzaj.js ' + PLACENI);
