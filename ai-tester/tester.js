// Croland AI tester — glavni program.
//   node tester.js persona mike            jedna osoba kroz tečaj, dan po dan, dok ne odustane ili završi
//   node tester.js ciljano "Grammar 12"    jedna cjelina, s napretkom kao da je sve prije prošao
//   node tester.js izvjestaj               složi izvještaj i otvori ga u pregledniku
//   node tester.js trijaza mike            (ponovno) razvrstaj nalaze jačim modelom
//   node tester.js limiti                  pokaži koliko je limita potrošeno
// Dodaci: --vidljivo (vidi se preglednik), --pilot (samo 2 dana), --persona ime, --puta N
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { ucitajPodatke, napredakDo } from './lib/podaci.js';
import { Preglednik, pokreniPosluzitelj } from './lib/preglednik.js';
import { Model, LimitGreska, izvuciJson } from './lib/model.js';
import * as P from './lib/pravila.js';
import { napraviIzvjestaj } from './lib/izvjestaj.js';
import { napraviTrijazu } from './lib/trijaza.js';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJEKT = path.resolve(DIR, '..');
const REZ = path.join(DIR, 'rezultati');
fs.mkdirSync(REZ, { recursive: true });
const CFG = JSON.parse(fs.readFileSync(path.join(DIR, 'postavke.json'), 'utf8'));

const argv = process.argv.slice(2);
const zastavica = ime => argv.includes('--' + ime);
const opcija = (ime, def) => { const i = argv.indexOf('--' + ime); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };
const argumenti = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--') && ['persona', 'puta'].includes(argv[i - 1].slice(2))));

// ---------- pomoćno ----------
const sad = () => new Date().toLocaleString('hr-HR');
function log(...a) { console.log('[' + new Date().toLocaleTimeString('hr-HR') + ']', ...a); }
function citajJson(f, def) { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return def; } }
function pisiJson(f, o) { fs.writeFileSync(f + '.tmp', JSON.stringify(o, null, 2)); fs.renameSync(f + '.tmp', f); }
function dodaj(f, o) { fs.appendFileSync(f, JSON.stringify(o) + '\n'); }
const spavaj = ms => new Promise(r => setTimeout(r, ms));
const slucajno = (a, b) => a + Math.random() * (b - a);
function raspon(s, def) { const m = String(s || '').match(/(\d+)\s*-\s*(\d+)/); return m ? [+m[1], +m[2]] : def; }
const DANI_TJ = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'];

function ucitajPersonu(ime) {
  const f = path.join(DIR, 'persone', ime.toLowerCase() + '.md');
  if (!fs.existsSync(f)) throw new Error('Nema persone ' + f);
  const t = fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
  const m = t.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  const post = {};
  if (m) for (const l of m[1].split('\n')) { const k = l.match(/^\s*([a-z_]+)\s*:\s*(.+?)\s*$/i); if (k) post[k[1]] = k[2]; }
  let opis = m ? m[2] : t;
  const crta = opis.split(/\n---\s*\n/);
  if (crta.length > 1) opis = crta.slice(1).join('\n');
  return { ime: post.ime || ime, kljuc: ime.toLowerCase(), post, opis: opis.trim() };
}

// Windows: ne daj računalu da zaspi dok tester radi
let budan = null;
function drziBudnim() {
  if (process.platform !== 'win32' || budan) return;
  const ps = `Add-Type -Name P -Namespace W -MemberDefinition '[DllImport("kernel32.dll")] public static extern uint SetThreadExecutionState(uint e);'; [W.P]::SetThreadExecutionState(0x80000001) | Out-Null; while ($true) { Start-Sleep -Seconds 60 }`;
  try { budan = spawn('powershell', ['-NoProfile', '-Command', ps], { stdio: 'ignore', windowsHide: true }); } catch (e) {}
  const ugasi = () => { try { budan && budan.kill(); } catch (e) {} };
  process.on('exit', ugasi);
  process.on('SIGINT', () => { ugasi(); process.exit(130); });
}

// ---------- potrošnja i kočnica ----------
const POTROSNJA = path.join(REZ, 'potrosnja.json');
async function kocnica(model, izvjestajFn) {
  const p = citajJson(POTROSNJA, {});
  p.pozivi = (p.pozivi || 0);
  const l = await model.procitajLimite();
  const zapis = { vrijeme: new Date().toISOString() };
  let pauzaDo = null, razlog = '';
  if (l && l.seven_day && typeof l.seven_day.posto === 'number') {
    const r = l.seven_day.resetira || 0;
    if (!p.tjedan || Math.abs((p.tjedan.reset || 0) - r) > 3 * 3600e3) p.tjedan = { reset: r, pocetno: l.seven_day.posto };
    const udio = l.seven_day.posto - p.tjedan.pocetno;
    zapis.tjedno = l.seven_day.posto; zapis.udioTestera = udio;
    p.zadnje = { tjedno: l.seven_day.posto, petosatno: l.five_hour?.posto ?? null, udioTestera: udio, reset: r, vrijeme: Date.now() };
    if (udio >= CFG.tjedni_udio_max_posto) { pauzaDo = r; razlog = `tester je ovaj tjedan potrošio ${udio.toFixed(0)} % tjednog limita (granica ${CFG.tjedni_udio_max_posto} %)`; }
    else if (l.seven_day.posto >= CFG.ukupni_limit_stop_posto) { pauzaDo = r; razlog = `tjedni limit je na ${l.seven_day.posto.toFixed(0)} %`; }
  } else {
    // postotak nije dostupan — rezervna kočnica po broju poziva
    if (!p.rezerva || Date.now() - p.rezerva.od > 7 * 864e5) p.rezerva = { od: Date.now(), pozivi: 0 };
    p.rezerva.pozivi = p.rezerva.pozivi || 0;
    if (p.rezerva.pozivi >= CFG.rezervna_kocnica_poziva_tjedno) { pauzaDo = p.rezerva.od + 7 * 864e5; razlog = 'rezervna kočnica: ' + p.rezerva.pozivi + ' poziva ovaj tjedan'; }
  }
  if (!pauzaDo && l && l.five_hour && l.five_hour.posto >= 97) { pauzaDo = l.five_hour.resetira; razlog = 'petosatni limit je pun'; }
  pisiJson(POTROSNJA, p);
  if (pauzaDo) await pauziraj(pauzaDo, razlog, izvjestajFn);
  return l;
}
function brojiPoziv(n = 1) {
  const p = citajJson(POTROSNJA, {});
  p.pozivi = (p.pozivi || 0) + n;
  if (p.rezerva) p.rezerva.pozivi = (p.rezerva.pozivi || 0) + n;
  pisiJson(POTROSNJA, p);
}
async function pauziraj(doKad, razlog, izvjestajFn) {
  if (!doKad || doKad < Date.now()) doKad = Date.now() + 30 * 60e3;
  doKad += 3 * 60e3;
  log(`PAUZA: ${razlog}.`);
  try { izvjestajFn && await izvjestajFn(); log('Privremeni izvještaj je spreman: ai-tester\\rezultati\\izvjestaj.html'); } catch (e) { log('Izvještaj nije složen:', e.message); }
  log(`Nastavljam oko ${new Date(doKad).toLocaleString('hr-HR')}. Prozor ostavi otvoren (Ctrl+C prekida — kasnije se nastavlja gdje je stalo).`);
  while (Date.now() < doKad) await spavaj(Math.min(10 * 60e3, doKad - Date.now()));
}

// ---------- zapisivanje ----------
class Zapis {
  constructor(dir) {
    this.dir = dir; fs.mkdirSync(path.join(dir, 'slike'), { recursive: true });
    const b = fs.existsSync(path.join(dir, 'biljeske.jsonl')) ? fs.readFileSync(path.join(dir, 'biljeske.jsonl'), 'utf8').split('\n').filter(Boolean).length : 0;
    this.brojBiljeski = b;
  }
  f(ime) { return path.join(this.dir, ime); }
  cinjenica(o) { dodaj(this.f('dogadjaji.jsonl'), o); }
  vjezba(o) { dodaj(this.f('vjezbe.jsonl'), o); }
  dan(o) { dodaj(this.f('dani.jsonl'), o); }
  biljeska(o) { this.brojBiljeski++; o.id = 'B' + String(this.brojBiljeski).padStart(4, '0'); dodaj(this.f('biljeske.jsonl'), o); return o.id; }
  imeSlike(oznaka) { return 'slike/' + oznaka.replace(/[^a-z0-9_-]/gi, '_') + '.jpg'; }
}

// ---------- jedan dan (ili ciljani test) ----------
function rijeci(t) { return new Set(String(t).toLowerCase().match(/[\p{L}]{2,}/gu) || []); }
function ljudskoVrijeme(radnja, stariEkran, noviEkran) {
  let ms = 2500 + Math.random() * 2000;
  if (radnja.radnja === 'upisi') ms += 1200 + String(radnja.tekst || '').length * 350;
  if (radnja.radnja === 'cekaj') ms = 3000;
  if (radnja.radnja === 'pomakni') ms = 1200;
  const stare = rijeci(stariEkran); let nove = 0;
  for (const w of rijeci(noviEkran)) if (!stare.has(w)) nove++;
  ms += Math.min(25000, nove * 280);   // čitanje novog teksta
  return ms;
}
const PLACANJE_RE = /(subscri|upgrade|unlock|per month|\/month|€|\$\s?\d|start (your )?(free )?trial|create (a|your) (free )?account|sign up to|log in to continue)/i;

async function odigrajDan(ctx) {
  const { st, danas, pr, model, zapis, persona, podaci, sustav, ciljano } = ctx;
  const maxKoraka = ciljano ? (CFG.max_koraka_ciljano || 160) : CFG.max_koraka_po_danu;
  let neuspjeh = null, zvukovi = [], zadnjaRadnja = null, zahtjevSlike = false;
  const pitanjaNaCekanju = danas.pitanjaNaCekanju || (danas.pitanjaNaCekanju = []);
  let prosliEkran = '';
  const zaglavlje = () => {
    const vmin = (pr.virtualnoMs / 60000);
    let z = ciljano
      ? `CILJANI TEST: ${ciljano.opis}\nVRIJEME: ${vmin.toFixed(0)} min od početka.`
      : `DAN ${danas.dan} (${DANI_TJ[new Date(danas.datum).getDay()]} ${new Date(danas.datum).toLocaleDateString('hr-HR')}), ${danas.uredaj}. VRIJEME: ${vmin.toFixed(0)}/${danas.budzet} min.`;
    if (danas.napomena) z += '\n' + danas.napomena;
    return z;
  };
  while (true) {
    if (danas.koraci >= maxKoraka) { danas.prisilniKraj = 'dosegnut najveći broj koraka za dan'; break; }
    const vmin = pr.virtualnoMs / 60000;
    if (!ciljano && vmin > danas.budzet * 1.6) { danas.prisilniKraj = 'vrijeme dana uvelike prekoračeno'; break; }
    if (ciljano && vmin > 60) { danas.prisilniKraj = 'ciljani test traje dulje od 60 min'; break; }

    const v = await pr.pogled();
    const situacije = pitanjaNaCekanju.splice(0);
    let slikaZaAI = false;

    // gdje je: vježba / cjelina
    let vjezbaKljuc = v.naslov || '?', format = null, cjelinaIme = null;
    if (v.vjezba) {
      cjelinaIme = v.vjezba.tip + ' ' + v.vjezba.razina;
      vjezbaKljuc = cjelinaIme + ' #' + (v.vjezba.indeks + 1);
      const c = podaci.cjeline[cjelinaIme];
      format = c && c.vjezbe[v.vjezba.indeks] ? c.vjezbe[v.vjezba.indeks].format : null;
      if (!st.videneCjeline.includes(v.vjezba.tip) && P.PITANJA_CJELINA[v.vjezba.tip]) {
        st.videneCjeline.push(v.vjezba.tip); situacije.push(P.PITANJA_CJELINA[v.vjezba.tip]);
      }
      if (format && !st.videniFormati.includes(format)) {
        st.videniFormati.push(format); situacije.push(P.PITANJE_NOVI_FORMAT); slikaZaAI = true;
      }
      if (ciljano && cjelinaIme.toLowerCase() !== ciljano.cjelina.toLowerCase()) {
        danas.vanCilja = (danas.vanCilja || 0) + 1;
        if (danas.vanCilja === 2) situacije.push('Više nisi u cjelini ' + ciljano.cjelina + '. Ako si je završio, završi test (kraj_dana).');
        if (danas.vanCilja > 8) { danas.prisilniKraj = 'izašao iz ciljane cjeline'; break; }
      }
    }
    if (vjezbaKljuc !== danas.vjezbaSad) { danas.vjezbaSad = vjezbaKljuc; danas.vjezbaOd = pr.virtualnoMs; danas.pitanoDugo = false; }
    else if (!danas.pitanoDugo && pr.virtualnoMs - danas.vjezbaOd > 7 * 60e3 && v.vjezba) {
      danas.pitanoDugo = true; situacije.push(P.pitanjeDugo(Math.round((pr.virtualnoMs - danas.vjezbaOd) / 60e3)));
    }
    if (PLACANJE_RE.test(v.tekst) && (danas.dan - (st.zadnjePlacanjePitanje ?? -99)) >= 3) {
      st.zadnjePlacanjePitanje = danas.dan; situacije.push(P.PITANJE_PLACANJE); slikaZaAI = true;
    }
    if (danas.koraci === 0 && danas.pauza > 1) situacije.push(P.pitanjePovratka(danas.pauza));

    // zapeo?
    if (zadnjaRadnja && zadnjaRadnja !== 'cekaj' && zadnjaRadnja !== 'pogledaj' && v.hash === danas.zadnjiHash) danas.isti = (danas.isti || 0) + 1;
    else if (v.hash !== danas.zadnjiHash) danas.isti = 0;
    danas.zadnjiHash = v.hash;
    if (danas.isti === 3) situacije.push(P.PITANJE_ZAPEO);
    if (danas.isti >= 6) {
      const sl = zapis.imeSlike(`zapeo_d${danas.dan}_k${danas.koraci}`);
      await pr.slika(path.join(zapis.dir, sl));
      zapis.biljeska({ izvor: 'auto', tip: 'bug', vaznost: 2, tekst: `Korisnik je zapeo: ekran se nije promijenio kroz 6 radnji zaredom (${vjezbaKljuc}). Tester je ponovno učitao aplikaciju.`,
        dan: danas.dan, vmin: +(pr.virtualnoMs / 60e3).toFixed(1), ekran: v.naslov, vjezba: vjezbaKljuc, format, slika: sl, zadnjeRadnje: danas.povijest.slice(-6) });
      danas.isti = 0;
      await pr.page.goto(`http://127.0.0.1:${CFG.port}/`).catch(() => {});
      await pr.pusti(2500);
      continue;
    }

    // slika za AI?
    if (zahtjevSlike && (danas.slikeAI || 0) < CFG.slike_za_ai_po_danu) slikaZaAI = true;
    zahtjevSlike = false;
    let slikaB64 = null;
    if (slikaZaAI) { slikaB64 = await pr.slikaBase64(); danas.slikeAI = (danas.slikeAI || 0) + 1; }

    const upit = P.upitKoraka({
      zaglavlje: zaglavlje() + ((danas.koraci < 4 || !v.vjezba || ciljano) && st.pamtim ? '\nPAMTIŠ OD PRIJE:\n' + st.pamtim : ''),
      povijest: danas.povijest.slice(-8), situacije, zvukovi, neuspjeh, ekran: v.tekst,
      vrijemeIsteklo: !ciljano && vmin >= danas.budzet
    });
    let odg = null, sirovo = '';
    const t0 = Date.now();
    sirovo = await model.pitaj({ model: CFG.model_korisnik, sustav, tekst: upit, slikaBase64: slikaB64 });
    brojiPoziv();
    odg = izvuciJson(sirovo);
    if (!odg || !odg.radnja) {
      sirovo = await model.pitaj({ model: CFG.model_korisnik, sustav, tekst: upit + '\n(Odgovori ISKLJUČIVO jednim JSON objektom.)' });
      brojiPoziv();
      odg = izvuciJson(sirovo) || { radnja: 'cekaj', misao: 'neispravan odgovor modela' };
    }
    danas.koraci++;
    const trajanjeModela = Date.now() - t0;

    // bilješka
    const bl = odg.biljeska;
    if (bl && typeof bl === 'object' && bl.tekst) {
      const id = 'd' + danas.dan + '_k' + danas.koraci;
      const sl = zapis.imeSlike(id);
      const ok = await pr.slika(path.join(zapis.dir, sl));
      const bid = zapis.biljeska({ izvor: situacije.length ? 'pitanje' : 'ai', pitanje: situacije.join(' | ') || undefined,
        tip: String(bl.tip || 'ideja').toLowerCase(), vaznost: Math.max(1, Math.min(3, +bl.vaznost || 1)), tekst: String(bl.tekst).slice(0, 600),
        dan: danas.dan, datum: danas.datum, vmin: +(pr.virtualnoMs / 60e3).toFixed(1), ekran: v.naslov, vjezba: vjezbaKljuc, format,
        slika: ok ? sl : null, zadnjeRadnje: danas.povijest.slice(-6), uredaj: danas.uredaj });
      danas.biljeske.push(bid + ' ' + bl.tip + ': ' + String(bl.tekst).slice(0, 140));
      log(`  ✎ ${bl.tip} (${bl.vaznost}): ${String(bl.tekst).slice(0, 110)}`);
    }

    const rad = String(odg.radnja).toLowerCase();
    zadnjaRadnja = rad;
    if (rad === 'kraj_dana') { danas.povijest.push(`${danas.koraci}. kraj dana`); break; }
    if (rad === 'pogledaj') { zahtjevSlike = true; danas.povijest.push(`${danas.koraci}. (pogledao ekran)`); continue; }

    // izvrši
    const greskePrije = pr.greske.length;
    let opis = '';
    neuspjeh = null;
    if (odg.n != null) {
      const red = v.tekst.split('\n').find(l => l.startsWith('[' + odg.n + '] '));
      if (red) odg._opis = red.slice(String(odg.n).length + 3).replace(/\s*\{[^}]*\}\s*$/, '');
    }
    try { opis = await pr.izvrsi(odg); }
    catch (e) { neuspjeh = String(e.message).split('\n')[0].slice(0, 160); opis = rad + ' [NEUSPJEH]'; }
    await pr.pusti(ljudskoVrijeme(odg, prosliEkran || v.tekst, v.tekst));
    prosliEkran = v.tekst;
    zvukovi = await pr.preuzmiZvukove();

    // završene vježbe (napredak u lažnoj bazi ili gostujući napredak)
    {
      const nove = await pr.napredak();
      {
        for (const [k, b] of Object.entries(nove)) {
          const staro = st.vjezbe[k] || 0;
          if (b > staro) {
            st.vjezbe[k] = b;
            const g = podaci.poKljucu[k];
            const max = g ? (g.bodovi || 0) : 0;
            const zap = { dan: danas.dan, vmin: +(pr.virtualnoMs / 60e3).toFixed(1), kljuc: k, cjelina: g?.cjelina || k.split('|')[0],
              naslov: g?.naslov || '', format: g?.format || null, bodovi: b, max, trajanjeMin: +((pr.virtualnoMs - (danas.vjezbaOd || 0)) / 60e3).toFixed(1), prvi: staro === 0 };
            zapis.vjezba(zap); danas.vjezbe.push(zap);
            if (max && b / max < 0.5 && staro === 0) pitanjaNaCekanju.push(P.pitanjeLosRezultat(b, max));
          }
        }
      }
    }
    // događaji iz lažne baze
    for (const d of pr.dogadjaji.splice(0)) {
      if (d.tip === 'placanje') {
        st.platio = true; zapis.cinjenica({ tip: 'placanje', dan: danas.dan, vmin: +(pr.virtualnoMs / 60e3).toFixed(1) });
        log('  $ Mike je odlučio platiti pretplatu (lažno plaćanje).');
      } else if (d.tip === 'registracija' || d.tip === 'prijava') {
        zapis.cinjenica({ tip: d.tip, dan: danas.dan, vmin: +(pr.virtualnoMs / 60e3).toFixed(1) });
      } else if (d.tip === 'ai_pomoc') {
        zapis.biljeska({ izvor: 'auto', tip: 'zbunjenost', vaznost: 1, tekst: 'Tražio je AI pomoć: "' + String(d.podaci.pitanje || '').slice(0, 300) + '"',
          dan: danas.dan, vmin: +(pr.virtualnoMs / 60e3).toFixed(1), ekran: v.naslov, vjezba: vjezbaKljuc, format, zadnjeRadnje: danas.povijest.slice(-4) });
      }
    }

    // tehničke greške (jedinstvene)
    for (const g of pr.greske.slice(greskePrije)) {
      const kljuc = g.vrsta + '|' + g.poruka.replace(/\d{6,}/g, '#').slice(0, 200);
      const t = st.tehnicko[kljuc] || (st.tehnicko[kljuc] = { vrsta: g.vrsta, poruka: g.poruka, broj: 0, prvi: { dan: danas.dan, vjezba: vjezbaKljuc, radnja: opis } });
      t.broj++;
      if (t.broj === 1 && g.vrsta !== 'mreza') {
        const sl = zapis.imeSlike('greska_d' + danas.dan + '_k' + danas.koraci);
        if (await pr.slika(path.join(zapis.dir, sl))) t.slika = sl;
      }
    }

    const ishod = neuspjeh ? 'nije uspjelo' : '';
    danas.povijest.push(`${danas.koraci}. ${opis}${ishod ? ' → ' + ishod : ''}`);
    if (danas.povijest.length > 30) danas.povijest.splice(0, danas.povijest.length - 30);
    zapis.cinjenica({ tip: 'korak', dan: danas.dan, korak: danas.koraci, vmin: +(pr.virtualnoMs / 60e3).toFixed(2), ekran: v.naslov, vjezba: vjezbaKljuc, format,
      radnja: opis, misao: odg.misao || '', neuspjeh: neuspjeh || undefined, zvuk: zvukovi.length ? zvukovi : undefined, ms: trajanjeModela });
    process.stdout.write(`  ${danas.koraci}. ${opis.slice(0, 70)}${odg.misao ? '  — ' + String(odg.misao).slice(0, 50) : ''}\n`);

    if (danas.koraci % 10 === 0) await ctx.spremi();
    if (danas.koraci % 25 === 0 && !ciljano) await kocnica(model, ctx.izvjestaj);
  }
}

// sažetak dana za AI (za dnevnik)
function sazetakDana(danas, pr) {
  const l = [];
  l.push(`Trajanje: ${(pr.virtualnoMs / 60e3).toFixed(0)} min (planirao si ${danas.budzet || '?'}), ${danas.koraci} radnji.`);
  if (danas.vjezbe.length) {
    l.push('Završene vježbe:');
    for (const v of danas.vjezbe.slice(0, 25)) l.push(`- ${v.cjelina}: "${v.naslov}" ${v.bodovi}/${v.max} bod.`);
  } else l.push('Nijedna vježba nije završena.');
  if (danas.biljeske.length) { l.push('Tvoje bilješke danas:'); danas.biljeske.slice(0, 12).forEach(b => l.push('- ' + b)); }
  if (danas.prisilniKraj) l.push('(Sesiju je zaustavio testni sustav — ' + danas.prisilniKraj + '. To NIJE bila odluka aplikacije ni tvoja; ne ubrajaj to u dojam o aplikaciji.)');
  l.push('Zadnje radnje:'); danas.povijest.slice(-6).forEach(p => l.push('  ' + p));
  return l.join('\n');
}

// ---------- persona ----------
async function pokreniPersonu(ime) {
  const persona = ucitajPersonu(ime);
  const podaci = ucitajPodatke(PROJEKT);
  const dir = path.join(REZ, persona.kljuc);
  const zapis = new Zapis(dir);
  const fStanje = zapis.f('stanje.json'), fPreg = zapis.f('preglednik.json');
  const st = citajJson(fStanje, null) || {
    persona: persona.ime, pocetak: new Date().toISOString(), dan: 0, pomakDana: 0, pamtim: '', dnevnici: [],
    videneCjeline: [], videniFormati: [], vjezbe: {}, tehnicko: {}, zadnjePlacanjePitanje: null, gotovo: false, platio: false,
    frustriraniDani: 0, zadnjaTrijaza: 0, danas: null, skala: 1
  };
  if (st.gotovo) { log(`${persona.ime} je već završio (${st.razlogKraja}). Za novi početak obriši mapu rezultati\\${persona.kljuc}.`); return; }
  const pocetniDatum = (persona.post.pocetni_datum && persona.post.pocetni_datum !== 'danas') ? new Date(persona.post.pocetni_datum + 'T00:00:00') : new Date(st.pocetak);
  pocetniDatum.setHours(0, 0, 0, 0);
  const model = new Model();
  const sustav = P.sustavKorisnika(persona.opis);
  const srv = await pokreniPosluzitelj(PROJEKT, REZ, CFG.port);
  const pr = new Preglednik({ korijen: PROJEKT, port: CFG.port, podaci, vidljivo: zastavica('vidljivo') });
  drziBudnim();
  const izvjestaj = async () => napraviIzvjestaj(REZ, podaci);
  const pilot = zastavica('pilot');
  let danaOdigrano = 0;
  log(`Pokrećem personu ${persona.ime}. Rezultati: ai-tester\\rezultati\\${persona.kljuc}`);
  const limitPrije = await kocnica(model, izvjestaj);
  if (limitPrije?.seven_day) log(`Tjedni limit: ${limitPrije.seven_day.posto.toFixed(0)} %  |  petosatni: ${limitPrije.five_hour?.posto?.toFixed(0) ?? '?'} %`);
  else log('Postotak limita nije dostupan — radi rezervna kočnica po broju poziva (postavke.json).');

  try {
    while (!st.gotovo && st.dan < CFG.max_dana) {
      if (!st.danas) {
        const dan = st.dan + 1;
        const datum = new Date(pocetniDatum.getTime() + st.pomakDana * 864e5);
        const vikend = datum.getDay() === 0 || datum.getDay() === 6;
        const [m1, m2] = raspon(vikend ? persona.post.minuta_vikend : persona.post.minuta_radni_dan, vikend ? [25, 40] : [15, 20]);
        const [h1, h2] = raspon(vikend ? persona.post.sat_vikend : persona.post.sat_radni_dan, vikend ? [10, 17] : [19, 22]);
        const ur = vikend ? (persona.post.uredaj_vikend || 'pola-pola') : (persona.post.uredaj_radni_dan || 'mobitel');
        const uredaj = ur === 'pola-pola' ? (Math.random() < 0.5 ? 'mobitel' : 'laptop') : ur;
        datum.setHours(Math.floor(slucajno(h1, h2)), Math.floor(slucajno(0, 59)));
        st.danas = { dan, datum: datum.getTime(), uredaj, budzet: Math.round(slucajno(m1, m2)), koraci: 0, povijest: [], vjezbe: [], biljeske: [],
          pauza: st.zadnjiRazmak || 1, vms: 0,
          napomena: st.frustriraniDani >= 2 ? `(Zadnja ${st.frustriraniDani} dana bila su ti frustrirajuća.)` : '' };
        pisiJson(fStanje, st);
      }
      const danas = st.danas;
      log(`— DAN ${danas.dan} · ${new Date(danas.datum).toLocaleString('hr-HR')} · ${danas.uredaj} · plan ${danas.budzet} min${danas.koraci ? ' (nastavak)' : ''}`);
      await kocnica(model, izvjestaj);
      pr.mobitel = danas.uredaj !== 'laptop';
      pr.virtualnoMs = danas.vms || 0; pr.greske = []; pr.dogadjaji = [];
      await pr.otvori({ stanjeDatoteka: fPreg, datum: danas.datum + (danas.vms || 0) });
      const ctx = { st, danas, pr, model, zapis, persona, podaci, sustav, izvjestaj,
        spremi: async () => { danas.vms = pr.virtualnoMs; await pr.spremiStanje(fPreg); pisiJson(fStanje, st); } };
      await igrajSOporavkom(ctx, () => odigrajDan(ctx));
      danas.vms = pr.virtualnoMs;
      await pr.spremiStanje(fPreg);
      await pr.zatvori();

      // kraj dana
      const zag = `Ti si ${persona.ime}. Dan ${danas.dan}.`;
      let kraj = null;
      await igrajSOporavkom(ctx, async () => {
        const t = await model.pitaj({ model: CFG.model_korisnik, sustav, tekst: P.upitKrajaDana({ zaglavlje: zag, sazetakDana: sazetakDana(danas, pr), pamtim: st.pamtim }), maxTokena: 900 });
        brojiPoziv(); kraj = izvuciJson(t);
      });
      kraj = kraj || { dnevnik: '(dnevnik nije zapisan)', vracam_se: 'sutra' };
      if (kraj.pamtim) st.pamtim = String(kraj.pamtim).split('\n').slice(0, 12).join('\n');
      for (const b of (Array.isArray(kraj.biljeske) ? kraj.biljeske.slice(0, 2) : [])) {
        if (b && b.tekst) zapis.biljeska({ izvor: 'dnevnik', tip: String(b.tip || 'ideja').toLowerCase(), vaznost: Math.max(1, Math.min(3, +b.vaznost || 1)), tekst: String(b.tekst).slice(0, 600), dan: danas.dan, datum: danas.datum });
      }
      const frustr = +kraj.frustracija || 0;
      st.frustriraniDani = frustr >= 4 ? st.frustriraniDani + 1 : 0;
      const razmak = { sutra: 1, za_2_dana: 2, za_3_dana: 3, za_tjedan: 7 }[kraj.vracam_se] || 1;
      const zapisDana = { dan: danas.dan, datum: danas.datum, uredaj: danas.uredaj, budzet: danas.budzet, minuta: +(pr.virtualnoMs / 60e3).toFixed(1), koraci: danas.koraci,
        vjezbe: danas.vjezbe.length, bodovi: danas.vjezbe.reduce((a, v) => a + v.bodovi, 0), maxBodovi: danas.vjezbe.reduce((a, v) => a + (v.max || 0), 0),
        cjeline: [...new Set(danas.vjezbe.map(v => v.cjelina))], dnevnik: kraj.dnevnik, raspolozenje: +kraj.raspolozenje || null, frustracija: frustr || null,
        dosada: +kraj.dosada || null, napredak: +kraj.osjecaj_napretka || null, vracam_se: kraj.vracam_se, zasto: kraj.zasto, platio_bih: kraj.platio_bih,
        prisilniKraj: danas.prisilniKraj || null, biljeske: danas.biljeske.length };
      zapis.dan(zapisDana);
      st.dnevnici.push(`Dan ${danas.dan}: ${kraj.dnevnik}`); if (st.dnevnici.length > 8) st.dnevnici.shift();
      log(`  Dnevnik: ${String(kraj.dnevnik || '').slice(0, 220)}`);
      log(`  Raspoloženje ${kraj.raspolozenje}/5 · frustracija ${kraj.frustracija}/5 · dosada ${kraj.dosada}/5 · vraća se: ${kraj.vracam_se} (${kraj.zasto || ''})`);

      st.dan = danas.dan; st.danas = null; st.pomakDana += razmak; st.zadnjiRazmak = razmak;
      danaOdigrano++;

      // završio tečaj?
      const zadnja = podaci.tecaj[podaci.tecaj.length - 1];
      const zavrseneZadnje = zadnja.vjezbe.filter(g => st.vjezbe[podaci.kljucIgre(g)]).length;
      if (zavrseneZadnje >= zadnja.vjezbe.length * 0.6) { st.gotovo = true; st.razlogKraja = 'završio tečaj'; }

      if (kraj.vracam_se === 'ne') {
        st.gotovo = true; st.razlogKraja = 'odustao';
        await igrajSOporavkom(ctx, async () => {
          const t = await model.pitaj({ model: CFG.model_korisnik, sustav, tekst: P.upitOdlaska({ zaglavlje: zag, pamtim: st.pamtim, dnevnici: st.dnevnici.join('\n') }), maxTokena: 900 });
          brojiPoziv();
          const o = izvuciJson(t) || { razlog_odlaska: t };
          pisiJson(zapis.f('odlazak.json'), { ...o, dan: danas.dan, datum: danas.datum });
          log(`  ${persona.ime} je ODUSTAO nakon dana ${danas.dan}: ${String(o.razlog_odlaska || '').slice(0, 200)}`);
        });
      }
      pisiJson(fStanje, st);
      await izvjestaj().catch(e => log('izvještaj:', e.message));

      if (st.gotovo || st.dan - st.zadnjaTrijaza >= CFG.trijaza_svakih_dana) {
        try {
          await kocnica(model, izvjestaj);
          log('Trijaža (jači model razvrstava nalaze)…');
          await napraviTrijazu({ dir, rez: REZ, model, cfg: CFG, persona: persona.ime });
          brojiPoziv();
          st.zadnjaTrijaza = st.dan; pisiJson(fStanje, st);
          await izvjestaj();
          log('Trijaža gotova.');
        } catch (e) {
          if (e instanceof LimitGreska) log('Trijaža preskočena zbog limita — napravit će se kasnije.');
          else log('Trijaža nije uspjela:', e.message);
        }
      }
      if (pilot && danaOdigrano >= 2) {
        log('PILOT gotov (2 dana). Pogledaj izvještaj i potrošnju (node tester.js limiti). Nastavak: 3-POKRENI-MIKEA.bat');
        break;
      }
    }
    if (st.gotovo) log(`${persona.ime}: kraj — ${st.razlogKraja}. Izvještaj: ai-tester\\rezultati\\izvjestaj.html`);
  } finally {
    await pr.ugasi(); srv.close();
  }
}

// Ako udari limit usred posla: spremi, složi izvještaj, pričekaj, nastavi.
async function igrajSOporavkom(ctx, fn) {
  for (let pokusaj = 0; pokusaj < 50; pokusaj++) {
    try { return await fn(); }
    catch (e) {
      if (e instanceof LimitGreska) {
        await ctx.spremi?.().catch(() => {});
        await pauziraj(e.resetira, 'dosegnut limit (' + (e.vrsta || 'Claude') + ')', ctx.izvjestaj);
        continue;
      }
      if (String(e.message).startsWith('PRIJAVA')) throw e;
      log('Greška:', String(e.message).slice(0, 300));
      await ctx.spremi?.().catch(() => {});
      if (pokusaj >= 5) throw e;
      await spavaj(pokusaj < 2 ? 5000 : 30000);
      // greška modela: samo ponovi isti korak; greška preglednika: vrati se na početnu
      if (!String(e.message).startsWith('Model:')) {
        try { if (ctx.pr && ctx.pr.page) { await ctx.pr.page.goto(`http://127.0.0.1:${CFG.port}/`).catch(() => {}); await ctx.pr.pusti(2000); } } catch (e2) {}
      }
    }
  }
}

// ---------- ciljani test ----------
async function pokreniCiljano(cjelina) {
  const persona = ucitajPersonu(opcija('persona', 'mike'));
  const podaci = ucitajPodatke(PROJEKT);
  const puta = Math.max(1, parseInt(opcija('puta', '1'), 10) || 1);
  const model = new Model();
  const sustav = P.sustavKorisnika(persona.opis);
  const srv = await pokreniPosluzitelj(PROJEKT, REZ, CFG.port);
  const pr = new Preglednik({ korijen: PROJEKT, port: CFG.port, podaci, vidljivo: zastavica('vidljivo') });
  drziBudnim();
  const izvjestaj = async () => napraviIzvjestaj(REZ, podaci);
  try {
    await kocnica(model, izvjestaj);
    for (let i = 1; i <= puta; i++) {
      const seed = napredakDo(podaci, cjelina, 7 + i * 31);
      const c = seed.cjelina;
      const oznaka = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
      const dir = path.join(REZ, 'ciljano', c.ime.replace(/\s+/g, '-') + '_' + oznaka + (puta > 1 ? '_' + i : ''));
      const zapis = new Zapis(dir);
      const sada = Date.now();
      const sesija = { access_token: 'lazni-token', token_type: 'bearer', expires_in: 31536000,
        user: { id: 'ai-tester', email: 'mike@test.local', created_at: new Date(sada - 40 * 864e5).toISOString(), app_metadata: { provider: 'email' }, user_metadata: {} } };
      const baza = { korisnikId: 'ai-tester', email: 'mike@test.local', korisnikStvoren: sesija.user.created_at, sesija,
        tablice: { profiles: [{ id: 'ai-tester', subscription_status: 'active', komplimentarno: false }],
          progress: [{ user_id: 'ai-tester', vjezbe: seed.vjezbe, pokrenute: seed.pokrenute, vidjeno: {}, rjecnik: {}, slova: {}, abeceda_slavljena: true,
            savjeti: {}, streak: { niz: 4, zadnji: '', bodovi: 0 }, ime: persona.ime, mini_igre: {}, postavke: { skala: 10 } }] } };
      const prethodna = podaci.tecaj[podaci.tecaj.findIndex(x => x.ime === c.ime) - 1];
      const st = { persona: persona.ime, ciljano: c.ime, videneCjeline: ['Lesson', 'Vocabulary', 'Grammar', 'Practice', 'Test', 'Daily challenge'], videniFormati: [], vjezbe: { ...seed.vjezbe }, tehnicko: {}, zadnjePlacanjePitanje: 0, skala: 1,
        pamtim: `Već tjednima učiš s Crolandom i imaš pretplatu. Prošao si sve od Lesson 0 do ${prethodna ? prethodna.ime + ' (' + prethodna.naslov + ')' : 'ovdje'}, s prosječno oko 75 % bodova — neke stvari znaš, neke si zaboravio.\nZnaš kako aplikacija radi. Danas otvaraš ${c.ime} — ${c.naslov}.` };
      const danas = { dan: 1, datum: sada, uredaj: zastavica('laptop') ? 'laptop' : 'mobitel', budzet: 45, koraci: 0, povijest: [], vjezbe: [], biljeske: [], pauza: 1 };
      log(`CILJANI TEST ${i}/${puta}: ${c.ime} — ${c.naslov} (${c.vjezbe.length} vježbi). Rezultati: ${path.relative(DIR, dir)}`);
      pr.mobitel = danas.uredaj !== 'laptop'; pr.virtualnoMs = 0; pr.greske = []; pr.dogadjaji = [];
      await pr.otvori({ datum: sada, sjemeBaze: baza });
      await pr.idiNa(c.tip, c.razina, 0);
      const opis = `Prošao si sve prije cjeline "${c.ime} — ${c.naslov}" (prosječno oko 75 % bodova). Sad radiš samo tu cjelinu, od prve do zadnje vježbe, kao i inače. Kad je gotova (ili odustaneš), kraj_dana.`;
      const ctx = { st, danas, pr, model, zapis, persona, podaci, sustav, izvjestaj, ciljano: { cjelina: c.ime, opis },
        spremi: async () => { pisiJson(zapis.f('stanje.json'), { ...st, danas }); } };
      await igrajSOporavkom(ctx, () => odigrajDan(ctx));
      await pr.zatvori();
      let kraj = null;
      await igrajSOporavkom(ctx, async () => {
        const t = await model.pitaj({ model: CFG.model_korisnik, sustav, tekst: P.upitKrajaDana({ zaglavlje: `Ti si ${persona.ime}. Ciljani test cjeline ${c.ime}.`, sazetakDana: sazetakDana(danas, pr), pamtim: '' }) });
        brojiPoziv(); kraj = izvuciJson(t) || {};
      });
      zapis.dan({ dan: 1, datum: sada, uredaj: danas.uredaj, minuta: +(pr.virtualnoMs / 60e3).toFixed(1), koraci: danas.koraci, vjezbe: danas.vjezbe.length,
        bodovi: danas.vjezbe.reduce((a, v) => a + v.bodovi, 0), maxBodovi: danas.vjezbe.reduce((a, v) => a + (v.max || 0), 0), cjeline: [c.ime],
        dnevnik: kraj.dnevnik, raspolozenje: +kraj.raspolozenje || null, frustracija: +kraj.frustracija || null, dosada: +kraj.dosada || null,
        napredak: +kraj.osjecaj_napretka || null, prisilniKraj: danas.prisilniKraj || null, biljeske: danas.biljeske.length });
      for (const b of (Array.isArray(kraj.biljeske) ? kraj.biljeske.slice(0, 2) : [])) if (b && b.tekst) zapis.biljeska({ izvor: 'dnevnik', tip: String(b.tip || 'ideja'), vaznost: +b.vaznost || 1, tekst: String(b.tekst), dan: 1 });
      pisiJson(zapis.f('stanje.json'), { ...st, gotovo: true, razlogKraja: 'ciljani test', ciljano: c.ime });
      log(`  Gotovo: ${danas.vjezbe.length}/${c.vjezbe.length} vježbi, ${danas.biljeske.length} bilješki. ${String(kraj.dnevnik || '').slice(0, 200)}`);
      try { await napraviTrijazu({ dir, rez: REZ, model, cfg: CFG, persona: persona.ime + ' — ' + c.ime }); brojiPoziv(); }
      catch (e) { log('Trijaža preskočena:', e.message.slice(0, 120)); }
      await izvjestaj();
    }
  } finally { await pr.ugasi(); srv.close(); }
  log('Izvještaj: ai-tester\\rezultati\\izvjestaj.html (ili 5-OTVORI-IZVJESTAJ.bat)');
}

// ---------- izvještaj (poslužitelj za spremanje oznaka) ----------
async function posluziIzvjestaj() {
  const podaci = ucitajPodatke(PROJEKT);
  await napraviIzvjestaj(REZ, podaci);
  let port = CFG.port + 1;
  const srv = await pokreniPosluzitelj(PROJEKT, REZ, port);
  const url = `http://127.0.0.1:${port}/__ai/izvjestaj.html`;
  log('Izvještaj: ' + url + '  (oznake "ispravljeno / odbačeno" se spremaju dok je ovaj prozor otvoren)');
  if (process.platform === 'win32') spawn('cmd', ['/c', 'start', '', url], { stdio: 'ignore', detached: true });
  log('Zatvori prozor (ili Ctrl+C) kad završiš.');
  await new Promise(() => {});
}

// ---------- glavno ----------
async function glavno() {
  const naredba = (argumenti[0] || '').toLowerCase();
  if (naredba === 'persona') return pokreniPersonu(argumenti[1] || 'mike');
  if (naredba === 'ciljano') {
    if (!argumenti[1]) throw new Error('Napiši cjelinu, npr: node tester.js ciljano "Grammar 12"');
    return pokreniCiljano(argumenti.slice(1).join(' '));
  }
  if (naredba === 'izvjestaj') return posluziIzvjestaj();
  if (naredba === 'trijaza') {
    const model = new Model();
    const ime = (argumenti[1] || 'mike').toLowerCase();
    await napraviTrijazu({ dir: path.join(REZ, ime), rez: REZ, model, cfg: CFG, persona: ime });
    await napraviIzvjestaj(REZ, ucitajPodatke(PROJEKT));
    return log('Trijaža gotova.');
  }
  if (naredba === 'limiti') {
    const l = await new Model().procitajLimite();
    const p = citajJson(POTROSNJA, {});
    if (!l) log('Postotak limita trenutno nije dostupan.');
    else log(`Tjedni: ${l.seven_day?.posto?.toFixed(1) ?? '?'} % (reset ${l.seven_day?.resetira ? new Date(l.seven_day.resetira).toLocaleString('hr-HR') : '?'}) · petosatni: ${l.five_hour?.posto?.toFixed(1) ?? '?'} %`);
    if (p.tjedan && l?.seven_day) log(`Tester je ovaj tjedan potrošio oko ${(l.seven_day.posto - p.tjedan.pocetno).toFixed(1)} % (granica ${CFG.tjedni_udio_max_posto} %). Ukupno poziva: ${p.pozivi || 0}.`);
    return;
  }
  if (naredba === 'provjera') {
    const m = new Model();
    let zadnja = null;
    for (const [i, model] of [CFG.model_korisnik, CFG.model_korisnik, 'haiku', 'sonnet'].entries()) {
      try {
        const t = await m.pitaj({ model, sustav: 'Reply with the single word: OK', tekst: 'ping' });
        brojiPoziv();
        log(`Claude (${model}) odgovara: ${t}`);
        if (model !== CFG.model_korisnik) log(`UPOZORENJE: ${CFG.model_korisnik} nije radio, a ${model} jest. Javi to Claudeu u razgovoru.`);
        return;
      } catch (e) {
        zadnja = e;
        log(`Pokušaj ${i + 1} (${model}) nije uspio: ${String(e.message).slice(0, 400)}`);
        if (String(e.message).startsWith('PRIJAVA')) break;
        await spavaj(5000);
      }
    }
    throw zadnja;
  }
  console.log('Upotreba: node tester.js persona mike | ciljano "Grammar 12" | izvjestaj | trijaza mike | limiti | provjera');
}

glavno().then(() => process.exit(0)).catch(e => {
  console.error('\nGREŠKA: ' + (e && e.message ? e.message : e));
  if (/PRIJAVA|login|auth|Nema persone|Ne postoji cjelina|EADDRINUSE/i.test(String(e && e.message))) {
    if (/EADDRINUSE/.test(String(e.message))) console.error('Tester (ili izvještaj) već radi u drugom prozoru. Zatvori ga pa pokušaj opet.');
    if (/PRIJAVA|login|auth/i.test(String(e.message))) console.error('Pokreni 1-INSTALIRAJ.bat i prijavi se svojim Claude računom.');
    process.exit(2);   // greška koju ponovno pokretanje ne rješava
  }
  process.exit(1);
});
