#!/usr/bin/env python3
"""Gradi njemacko sucelje bez diranja originala:
   index.html  -> index-de.html   (tekstovi iz sucelje-de.tsv, data-de.js / rjecnik-de.js / pregledi-de.js)
   pregledi.js -> pregledi-de.js
Zamjena ide istim prolazom kao izvuci-sucelje.py (HTML tekst, atributi, JS literali), pa se
mijenja samo ono sto je izvuceno — kod, kljucevi i klase ostaju netaknuti.
BLOBBY_RECI se gradi iz prijevodne memorije (odsjecak engleskog retka -> cijeli njemacki redak)."""
import re, os, csv, html, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.dirname(os.path.abspath(__file__))

def ucitaj_tsv():
    d = {}
    for r in csv.DictReader(open(os.path.join(OUT, 'sucelje-de.tsv'), encoding='utf-8'), delimiter='\t'):
        if r['de'] and r['de'] not in ('@blobby', '='): d[r['en']] = r['de']
    return d
TR = ucitaj_tsv()
stat = {'html': 0, 'attr': 0, 'js': 0, 'jshtml': 0}

def norm(s): return re.sub(r'\s+', ' ', s).strip()

def esc_js(de, q):
    # prijevod je pisan kao sadrzaj literala; dodaj escape samo gdje fali
    out = re.sub(r'(?<!\\)' + re.escape(q), '\\\\' + q, de) if q != '`' else de.replace('`', '\\`')
    return out.replace('\n', '\\n')

def zamijeni_tekst_cvora(txt, kind, q=None):
    """txt = sirovi tekst izmedu > i <. Vrati prevedeni (cuva razmake oko)."""
    s = norm(html.unescape(txt))
    if not s or s not in TR: return txt
    lead = txt[:len(txt) - len(txt.lstrip())]; trail = txt[len(txt.rstrip()):]
    de = TR[s]
    de = de.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;') if '&' not in s and '<' not in s else de
    if q: de = esc_js(de, q)
    stat[kind] += 1
    return lead + de + trail

def prevedi_html_dio(vani):
    vani = re.sub(r'>([^<>]+)<', lambda m: '>' + zamijeni_tekst_cvora(m.group(1), 'html') + '<', vani)
    def attr(m):
        s = html.unescape(m.group(2))
        if s in TR:
            stat['attr'] += 1
            return m.group(1) + '="' + html.escape(TR[s], quote=True) + '"'
        return m.group(0)
    vani = re.sub(r'\b(placeholder|title|aria-label|alt|data-tip)="([^"]+)"', attr, vani)
    return re.sub(r'data-kratko="([^"]+)"', lambda m: 'data-kratko="' + KRATKO.get(m.group(1), m.group(1)) + '"', vani)

from sucelje_lib import js_literali
def prevedi_js(js):
    dijelovi, poz = [], 0
    for a, b, q in js_literali(js):
        s = js[a:b]
        novi = None
        if '<' in s and '>' in s:
            novi = re.sub(r'>([^<>]+)<', lambda t: '>' + zamijeni_tekst_cvora(t.group(1), 'jshtml', q) + '<', '>' + s + '<')[1:-1]
            def _attr(t):
                v = html.unescape(t.group(2))
                if v not in TR: return t.group(0)
                stat['attr'] += 1
                return t.group(1) + '="' + esc_js(html.escape(TR[v], quote=True), q) + '"'
            novi = re.sub(r'\b(placeholder|title|aria-label|alt|data-tip)="([^"]+)"', _attr, novi)
        elif s in TR:
            if s in KOD:
                # identifikator (tip vjezbe, tipka, zaglavlje, font): prevedi samo kao
                # vrijednost u mapi prikaznih imena (IME_TIPA_DUGO, KRATKO_TIPA)
                prije = js[max(0, a - 41):a - (0 if q == '`' else 1)]
                if s in ('Daily challenge', 'Weekly challenge'):
                    smije = not re.search(r"(===|!==|idi\('unit',)\s*$", prije)
                else:
                    smije = bool(re.search(r'\b(Lesson|Vocabulary|Grammar|Practice|Test): $', prije))
                if not smije:
                    stat['preskoceno'] = stat.get('preskoceno', 0) + 1
                    continue
            stat['js'] += 1
            novi = esc_js(TR[s], q)
        if novi is not None and novi != s:
            dijelovi.append(js[poz:a]); dijelovi.append(novi); poz = b
    dijelovi.append(js[poz:])
    return ''.join(dijelovi)

# jednorijecni stringovi koji su u kodu kljucevi/identifikatori, ne tekst
KOD = {'Daily challenge', 'Weekly challenge', 'Lesson', 'Vocabulary', 'Grammar', 'Practice', 'Test', 'Enter', 'Escape', 'End', 'Home',
       'Authorization', 'Inter', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'POST', 'NFC'}
KRATKO = {'Home': 'Start', 'Lessons': 'Lektionen', 'Words': 'Wörter', 'Games': 'Spiele',
          'Daily': 'Täglich', 'Progress': 'Fortschritt', 'You': 'Du', 'Options': 'Optionen'}

# ---- BLOBBY: odsjecak engleskog retka -> njemacki redak iz memorije ----
def blobby_norm(s): return re.sub(r'\s+', ' ', re.sub(r'[*_`]', '', s or '')).strip().lower()
MEM = []
for r in csv.reader(open(os.path.join(OUT, 'prijevod-de.tsv'), encoding='utf-8'), delimiter='\t'):
    if len(r) > 1 and r[1] and r[1] != '=' and r[0] != 'en': MEM.append((blobby_norm(r[0]), r[1]))
def blobby_de(fr):
    n = blobby_norm(fr.encode().decode('unicode_escape') if '\\' in fr else fr)
    kand = [de for en, de in MEM if n and n in en]
    return min(kand, key=len) if kand else None

def prevedi_blobby(js):
    m = re.search(r'var BLOBBY_RECI = \[(.*?)\];', js, re.S)
    if not m: return js, 0, []
    stavke = re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(1))
    novi, fali = [], []
    for s in stavke:
        de = blobby_de(s)
        if de: novi.append(de)
        else: fali.append(s); novi.append(s)
    tijelo = '\n' + ',\n'.join('    ' + '"' + blobby_norm(x).replace('\\', '\\\\').replace('"', '\\"') + '"' for x in novi) + '\n  '
    return js[:m.start(1)] + tijelo + js[m.end(1):], len(stavke) - len(fali), fali

# ---- zakrpe koda: imena tipova/cjelina samo u prikazu (kljucevi ostaju engleski) ----
DE_FUNKCIJE = (
    "  // [DE] prikazna imena tipova i cjelina; interni kljucevi (Lesson 1 ...) ostaju engleski\n"
    "  function deTip(t) { return ({ Lesson: 'Lektion', Vocabulary: 'Wortschatz', Grammar: 'Grammatik', Practice: 'Praxis', Test: 'Test',"
    " 'Daily challenge': 'Tägliche Challenge', 'Weekly challenge': 'Wöchentliche Challenge' })[t] || t; }\n"
    "  function deCjelina(c) { return String(c == null ? '' : c).replace(/^(Lesson|Vocabulary|Grammar|Practice|Test|Daily challenge|Weekly challenge)\\b/, function (m) { return deTip(m); }); }\n")
ZAKRPE = [  # (staro, novo, ocekivani broj pojavljivanja)
    ("var JEZIK_STRANICE = 'en',", "var JEZIK_STRANICE = 'de',", 1),
    ("  var JEZIK_APP = 'en';", "  var JEZIK_APP = 'de';", 1),
    ("'/sadrzaj?f=data-plus.json'", "'/sadrzaj?f=data-plus-de.json'", 1),
    ("  var TIPOVI = ['Lesson', 'Vocabulary', 'Grammar', 'Practice', 'Test'];\n",
     "  var TIPOVI = ['Lesson', 'Vocabulary', 'Grammar', 'Practice', 'Test'];\n" + DE_FUNKCIJE, 1),
    ("var imena = lista.map(function (c) { return c.tip + ' ' + c.razina; });",
     "var imena = lista.map(function (c) { return deTip(c.tip) + ' ' + c.razina; });", 1),
    ("'▶ Next: ' + dalje.tip + ' '", "'▶ Next: ' + deTip(dalje.tip) + ' '", 1),
    ("'▶ Start ' + c.tip + ' '", "'▶ Start ' + deTip(c.tip) + ' '", 1),
    ("naslov: (igre[0] && igre[0].cjelinaNaslov) || (tip + ' ' + razina),",
     "naslov: (igre[0] && igre[0].cjelinaNaslov) || (deTip(tip) + ' ' + razina),", 1),
    ("naslov: (igre[0] && igre[0].cjelinaNaslov) || (tip + ' ' + r) };",
     "naslov: (igre[0] && igre[0].cjelinaNaslov) || (deTip(tip) + ' ' + r) };", 1),
    ("esc(z.naslov + ' — ' + z.tip + ' '", "esc(z.naslov + ' — ' + deTip(z.tip) + ' '", 1),
    ("esc(z.tip + ' ' + z.razina)", "esc(deTip(z.tip) + ' ' + z.razina)", 2),
    ("esc(tip + ' ' + r", "esc(deTip(tip) + ' ' + r", 6),
    ("'<div class=\"imeF\">' + tip + ' ' + r", "'<div class=\"imeF\">' + deTip(tip) + ' ' + r", 2),
    ("'Daily challenge' : tip + ' ' + razina)", "'Daily challenge' : deTip(tip) + ' ' + razina)", 2),
    ("')\">Next: ' + sljedeci.tip + ' '", "')\">Next: ' + deTip(sljedeci.tip) + ' '", 1),
    ("IK('brava', 'uz') + sljedeci.tip + ' '", "IK('brava', 'uz') + deTip(sljedeci.tip) + ' '", 1),
    ("' still waiting in ' + tip + ' '", "' still waiting in ' + deTip(tip) + ' '", 1),
    ("'</b> more → ' + tip + ' '", "'</b> more → ' + deTip(tip) + ' '", 1),
    ("esc(nas || (tip + ' ' + razina))", "esc(nas || (deTip(tip) + ' ' + razina))", 1),
    ("esc(meta.tip + ' ' + meta.razina)", "esc(deTip(meta.tip) + ' ' + meta.razina)", 1),
    ("'<span class=\"dugo\">' + tip + '", "'<span class=\"dugo\">' + deTip(tip) + '", 1),
    ("'<div class=\"progGlava\" style=\"color:' + BOJA_TIPA[t] + '\">' + t + '</div>'",
     "'<div class=\"progGlava\" style=\"color:' + BOJA_TIPA[t] + '\">' + deTip(t) + '</div>'", 2),
    ("'<span class=\"gdje\">' + esc(x.cjelina) + '</span>'", "'<span class=\"gdje\">' + esc(deCjelina(x.cjelina)) + '</span>'", 1),
]
MNOZINA = {'note': ('Notiz', 'Notizen'), 'exercise': ('Übung', 'Übungen'), 'word': ('Wort', 'Wörter')}
def zakrpaj(src):
    for staro, novo, n in ZAKRPE:
        k = src.count(staro)
        if k != n: raise SystemExit(f'ZAKRPA: ocekivano {n}x, nadjeno {k}x: {staro}')
        src = src.replace(staro, novo)
    def mn(m):
        if m.group(2) not in MNOZINA: return m.group(0)
        j, v = MNOZINA[m.group(2)]
        return f"({m.group(3)} === 1 ? '{m.group(1)}{j}' : '{m.group(1)}{v}')"
    return re.sub(r"'(\s?)(\w+)' \+ \(([\w.]+) === 1 \? '' : 's'\)", mn, src)

# ---- index.html ----
src = zakrpaj(open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read())
dijelovi, poz = [], 0
blob_ok, blob_fali = 0, []
for m in re.finditer(r'<(script|style)([^>]*)>(.*?)</\1>', src, re.S):
    dijelovi.append(prevedi_html_dio(src[poz:m.start()]))
    tijelo = m.group(3)
    if m.group(1) == 'script':
        if 'BLOBBY_RECI' in tijelo:
            tijelo, blob_ok, blob_fali = prevedi_blobby(prevedi_js(tijelo))
        else:
            tijelo = prevedi_js(tijelo)
    dijelovi.append('<' + m.group(1) + m.group(2) + '>' + tijelo + '</' + m.group(1) + '>')
    poz = m.end()
dijelovi.append(prevedi_html_dio(src[poz:]))
out = ''.join(dijelovi)
for staro, novo in [('<script src="data.js"></script>', '<script src="data-de.js"></script>'),
                    ('<script src="rjecnik.js"></script>', '<script src="rjecnik-de.js"></script>'),
                    ('<script src="pregledi.js"></script>', '<script src="pregledi-de.js"></script>'),
                    ('<html lang="en">', '<html lang="de">'),
                    ("tg.className = 'prijevodGumb'; tg.textContent = 'EN';", "tg.className = 'prijevodGumb'; tg.textContent = 'DE';")]:
    if staro not in out: print('UPOZORENJE: nije nadjeno:', staro)
    out = out.replace(staro, novo)
open(os.path.join(ROOT, 'index-de.html'), 'w', encoding='utf-8').write(out)

pj = open(os.path.join(ROOT, 'pregledi.js'), encoding='utf-8').read()
open(os.path.join(ROOT, 'pregledi-de.js'), 'w', encoding='utf-8').write(prevedi_js(pj))
print('zamjene:', stat, '| blobby:', blob_ok, 'prevedeno, fali:', blob_fali)
