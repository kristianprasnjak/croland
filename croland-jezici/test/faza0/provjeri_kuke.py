# Provjera kuka na razini izraza: za svaku pretvorbu (staro -> novo) izvrsi
#   EN: staro  vs novo                         -> mora biti isto
#   DE: stari build(staro) vs novi build(novo)  -> isto, osim namjernih ispravaka
# s istim vrijednostima varijabli (N = 1 i N = 3). Dijelovi koji nisu izraz (definicije, sort...)
# se preskacu i ispisuju.
import json, re, subprocess, sys, importlib.util
sys.path.insert(0, '/home/claude/test')
from kuke import KUKE

def ucitaj(ime, put):
    spec = importlib.util.spec_from_file_location(ime, put)
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
SB = ucitaj('stari_builder', '/home/claude/test/stari_builder.py')
NB = ucitaj('novi_builder', '/home/claude/test/novi_builder.py')

def stari_de(js):
    for staro, novo, n in SB.ZAKRPE:
        js = js.replace(staro, novo)
    def mn(m):
        if m.group(2) not in SB.MNOZINA: return m.group(0)
        j, v = SB.MNOZINA[m.group(2)]
        return f"({m.group(3)} === 1 ? '{m.group(1)}{j}' : '{m.group(1)}{v}')"
    js = re.sub(r"'(\s?)(\w+)' \+ \(([\w.]+) === 1 \? '' : 's'\)", mn, js)
    return SB.prevedi_js(js)

def novi_de(js): return NB.prevedi_js(js)

def kao_izraz(s):
    """Pokusaj od isjecka napraviti JS izraz; vrati None ako ne ide."""
    t = s.strip()
    t = re.sub(r'^(var\s+\w+\s*=|[\w.]+\s*=(?!=)|\w+\s*:|[?:]\s|\+\s)', '', t).strip()
    t = re.sub(r'(;|,|\s\+)$', '', t).strip()
    t = re.sub(r'(;|,)$', '', t).strip()
    return t

DEF_EN = """
var IME_TIPA = { Lesson: 'Lesson', Vocabulary: 'Vocabulary', Grammar: 'Grammar', Practice: 'Practice', Test: 'Test', 'Daily challenge': 'Daily challenge', 'Weekly challenge': 'Weekly challenge' };
"""
JS = r"""
const fs = require('fs');
const zad = JSON.parse(fs.readFileSync(0, 'utf8'));
function T_(s) { var a = arguments; return String(s).replace(/%(\d)/g, function (m, i) { return a[+i] != null ? String(a[+i]) : m; }); }
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function okolina(N, deMapa) {
  const IME_TIPA = deMapa || { Lesson: 'Lesson', Vocabulary: 'Vocabulary', Grammar: 'Grammar', Practice: 'Practice', Test: 'Test', 'Daily challenge': 'Daily challenge', 'Weekly challenge': 'Weekly challenge' };
  const tipIme = t => IME_TIPA[t] || t;
  const e = {
    T_, esc, tipIme, IME_TIPA, BOJA_TIPA: { Grammar: 'var(--g)' }, window: { PREGLEDI: { 'Lesson 1': { h: 'P1' }, 'Lesson 3': { h: 'P3' }, 'Lektion 1': { h: 'KRIVO' } } },
    kljucCjeline: (t, r) => t + ' ' + r,
    deCjelina: c => String(c == null ? '' : c).replace(/^(Lesson|Vocabulary|Grammar|Practice|Test|Daily challenge|Weekly challenge)\b/, m => ({ Lesson: 'Lektion', Vocabulary: 'Wortschatz', Grammar: 'Grammatik', Practice: 'Praxis', Test: 'Test', 'Tägliche Challenge': 'Tägliche Challenge', 'Wöchentliche Challenge': 'Wöchentliche Challenge' })[m] || m),
    cjelinaIme: c => String(c == null ? '' : c).replace(/^(Lesson|Vocabulary|Grammar|Practice|Test|Daily challenge|Weekly challenge)\b/, m => tipIme(m)),
    deTip: t => ({ Lesson: 'Lektion', Vocabulary: 'Wortschatz', Grammar: 'Grammatik', Practice: 'Praxis', Test: 'Test', 'Tägliche Challenge': 'Tägliche Challenge', 'Wöchentliche Challenge': 'Wöchentliche Challenge' })[t] || t,
    IK: (a, b) => '[IK:' + a + (b ? ',' + b : '') + ']',
    broj: x => 'B' + x, brojProcitanih: () => N + 1, prag: () => N * 10, trakaSlusanja: x => 'TRAKA(' + x + ')', pokaziSavjetRj: x => 'SAVJET(' + x + ')',
    brzaKarticaHtml: function () { return 'BK(' + Array.prototype.join.call(arguments, '|') + ')'; }, dailyPodnaslov: () => 'DP',
    lista: [{ tip: 'Grammar', razina: N }], dalje: { tip: 'Vocabulary', razina: N }, c: { tip: 'Test', razina: N },
    z: { broj: N, maks: N * 7, osv: N * 2, tip: 'Practice', razina: N, naslov: 'Naslov' },
    g: { ime: 'Igra "X" & Y', maks: N * 9, emo: 'E', stil: 'S' }, T: { i: N, igre: { length: N + 4 }, prag: 60 },
    parovi: { length: N + 1 }, linije: { length: N + 2 }, zadaci: { length: N + 5 }, MINI_IGRE: { length: N + 6 },
    dani: { length: 10 + N }, st: { niz: N }, x: { o: N, m: N * 4, cjelina: 'Daily challenge 12', ost: N },
    sp: { prag: N + 50, razina: 4 }, meta: { tip: 'Grammar', razina: N, stranica: 2, naslov: 'X' },
    sljedeci: { tip: 'Practice', razina: N + 1 }, wtLekcije: N === 1 ? [4] : [5, 2, 9],
    tip: 'Lesson', t: 'Grammar', kod: 'ANA-1', nas: '', igre: [{ cjelinaNaslov: 'CN' }], natragView: N === 1 ? 'daily' : 'lessons',
    prosao: N === 1, val: N === 1 ? '' : 'LP', o: N === 1 ? 0 : N, m: N * 5, n: N, d: N, dod: N + 2, ukupno: N + 7, ukupnoRj: N + 3,
    cedBroj: N, rj: N, ostalo: N, sad: N, uk: N * 3, cilj: N + 9, preostalo: N + 11, greske: N, bodovi: N, kazna: N, spojeno: N,
    tocno: N, post: N * 30, prg: 60, razina: N, r: N, krugova: N + 2, AI_LIMIT: 20, gotovih: N, dOdr: N, dDio: N, MAX_RAZINA: 20,
    cijeliOsv: N * 100, cijeliMaks: 9999, ima: N, trebaPretplatu: N === 3, pun: N === 1, uL0: () => N === 1, rijeseno: N,
    nz: N, maks: N * 8, uk: N * 4, preostalo2: N, ukupnoL0: N + 20, novihRijeci: N - 1, sek: N * 600, prije: N * 3, osv: N * 6,
    TEST: { preostalo: N * 61 }, mmss: x => 'MM:' + x, progGranica: N + 2, e: 'a@b.c', r: { od_koga: 'Ana <x>' }, igre: [1, 2, 3], razlog: 'time', pct: N * 9,
    sviPuni: N === 1, idF: 'idF', indeks: N, kls: 'k', st2: 0
  };
  return e;
}
function izvrsi(izraz, N, deMapa) {
  const e = okolina(N, deMapa);
  const imena = Object.keys(e);
  try { return String(Function(...imena, 'return (' + izraz + ');')(...imena.map(k => e[k]))); }
  catch (er) { return 'GRESKA: ' + er.message; }
}
const DEMAPA = { Lesson: 'Lektion', Vocabulary: 'Wortschatz', Grammar: 'Grammatik', Practice: 'Praxis', Test: 'Test', 'Daily challenge': 'Tägliche Challenge', 'Weekly challenge': 'Wöchentliche Challenge' };
const out = zad.map(z => [1, 3].map(N => ({
  en: [izvrsi(z.en_staro, N), izvrsi(z.en_novo, N)],
  de: [izvrsi(z.de_staro, N), izvrsi(z.de_novo, N, DEMAPA)] })));
process.stdout.write(JSON.stringify(out));
"""
# isjecci s neuparenim navodnicima: cijeli izraz rucno
ZAMJENA = {
    "'<span class=\"dugo\">' + tip + '</span>": ("'<span class=\"dugo\">' + tip + '</span>'", "'<span class=\"dugo\">' + tipIme(tip) + '</span>'"),
    "aria-label=\"Play ' + esc(g.ime) + ' full screen\">'": (
        "'<button class=\"miniPoster\" onclick=\"miniCijeliUdi()\" aria-label=\"Play ' + esc(g.ime) + ' full screen\">'",
        "'<button class=\"miniPoster\" onclick=\"miniCijeliUdi()\" aria-label=\"' + esc(T_('Play %1 full screen', g.ime)) + '\">'"),
    ": 'Lesson' + (wtLekcije.length > 1 ? 's' : '') + ' ' +\n          wtLekcije.slice().sort(function (a, b) { return a - b; }).join(', '));": (
        "'Lesson' + (wtLekcije.length > 1 ? 's' : '') + ' ' + wtLekcije.slice().sort(function (a, b) { return a - b; }).join(', ')",
        "(wtLekcije.length > 1 ? T_('Lessons %1', wtLekcije.slice().sort(function (a, b) { return a - b; }).join(', ')) : T_('Lesson %1', wtLekcije.join(', ')))"),
    "h += '<div class=\"metaS\">' + z.broj + ' exercise' + (z.broj === 1 ? '' : 's') +": (
        "'<div class=\"metaS\">' + z.broj + ' exercise' + (z.broj === 1 ? '' : 's') + ' · ' + z.maks + ' points waiting</div>'",
        "'<div class=\"metaS\">' + (z.broj === 1 ? T_('%1 exercise', z.broj) : T_('%1 exercises', z.broj)) + ' · ' + z.maks + ' points waiting</div>'"),
    "ostalo, tip + ' ' + razina)": ("T_('<strong>%1 points</strong> are still waiting in %2', ostalo, tip + ' ' + razina)",
                                     "T_('<strong>%1 points</strong> are still waiting in %2', ostalo, tipIme(tip) + ' ' + razina)"),
    "esc(tip + ' ' + r": ("esc(tip + ' ' + r + ' — locked')", "esc(tipIme(tip) + ' ' + r + ' — locked')"),
    "naslov: (igre[0] && igre[0].cjelinaNaslov) || (tip + ' ' + r) };": ("(null) || (tip + ' ' + r)", "(null) || (tipIme(tip) + ' ' + r)"),
    "'title=\"Open ' + esc(g.ime) + '\"": ("'title=\"Open ' + esc(g.ime) + '\"><div class=\"e\">'", "'title=\"' + esc(T_('Open %1', g.ime)) + '\"><div class=\"e\">'"),
}
zad, preskoceno = [], []
for staro, novo, n in KUKE:
    if staro in ZAMJENA: staro, novo = ZAMJENA[staro]
    if staro.startswith("<span><strong>'"): staro, novo = "'" + staro, "'" + novo
    if staro.lstrip().startswith('? '):
        def bal(x):
            x = x.strip().rstrip(',;')
            while x.count(')') > x.count('(') and x.endswith(')'): x = x[:-1].rstrip()
            return x
        for uvjet in ('true', 'false'):
            a, b = '(' + uvjet + ' ' + bal(staro) + ')', '(' + uvjet + ' ' + bal(novo) + ')'
            zad.append({'izv': uvjet + ' ' + staro, 'en_staro': a, 'en_novo': b, 'de_staro': stari_de(a), 'de_novo': novi_de(b)})
        continue
    a, b = kao_izraz(staro), kao_izraz(novo)
    zad.append({'izv': staro, 'en_staro': a, 'en_novo': b,
                'de_staro': kao_izraz(stari_de(staro)), 'de_novo': kao_izraz(novi_de(novo))})
r = subprocess.run(['node', '-e', JS], input=json.dumps(zad).encode(), capture_output=True)
if r.returncode: print(r.stderr.decode()); sys.exit(1)
rez = json.loads(r.stdout)
ok = en_razl = de_razl = 0
for z, rr in zip(zad, rez):
    for N, x in zip((1, 3), rr):
        if any(v.startswith('GRESKA') for v in x['en'] + x['de']):
            preskoceno.append((z['izv'][:90].replace('\n', ' '), [v for v in x['en'] + x['de'] if v.startswith('GRESKA')][0][:60])); break
        if x['en'][0] != x['en'][1]:
            en_razl += 1; print(f'EN RAZLIKA N={N}: {z["izv"][:80]!r}\n   staro: {x["en"][0]!r}\n   novo:  {x["en"][1]!r}')
        if x['de'][0] != x['de'][1]:
            de_razl += 1; print(f'DE razlika N={N}: {z["izv"][:80]!r}\n   staro: {x["de"][0]!r}\n   novo:  {x["de"][1]!r}')
        else: ok += 1
print(f'\nprovjereno (izraz x N): {ok + de_razl}, EN razlika: {en_razl}, DE razlika: {de_razl}, preskoceno (nije izraz): {len(set(preskoceno))}')
for p in sorted(set(preskoceno)): print('  -', p)
