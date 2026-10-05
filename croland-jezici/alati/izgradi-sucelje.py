#!/usr/bin/env python3
"""izgradi-sucelje.py --jezik XX - gradi sucelje jezika XX bez diranja originala:
   index.html  -> index-XX.html   (tekstovi iz <mapa>/sucelje-XX.tsv; data-XX.js / rjecnik-XX.js / pregledi-XX.js)
   pregledi.js -> pregledi-XX.js  (po polozaju, iz <mapa>/pregledi-XX.tsv)
Zamjena ide istim prolazom kao izvuci-sucelje.py (HTML tekst, atributi, JS literali), pa se
mijenja samo ono sto je izvuceno — kod, kljucevi i klase ostaju netaknuti.

Nema zakrpa koda po jeziku: sve sto ovisi o jeziku je u samom index.html kao i18n kuka
(T_('...') za recenice s mjestima %1, tipIme()/cjelinaIme() za imena tipova i cjelina,
JEZIK_APP iz registra u <head>). Build mijenja samo:
  - var JEZIK_STRANICE = 'en'  ->  'XX'   (jedini redak koji odreduje jezik stranice)
  - <html lang>, i <script src> za data.js, rjecnik.js, pregledi.js
  - prikazani tekst (HTML tekst, atributi, JS literali, T_ literali) iz sucelje-XX.tsv
  - BLOBBY_RECI iz prijevodne memorije lekcija
Ako bilo koji od tih dijelova nije nadjen, build stane (nema tihog propusta)."""
import re, os, csv, html, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L
from jezici_lib import js_literali, pregledi_mjesta
J, _ = L.iz_argumenata()
K = J.kod
ROOT = L.ROOT
ATRIBUTI = r'\b(placeholder|title|aria-label|alt|data-tip|data-kratko)="([^"]+)"'

def ucitaj_tsv():
    d, t = {}, {}
    if not os.path.exists(J.sucelje):
        raise SystemExit(f'Nema {J.sucelje} - prvo pokreni izvuci-sucelje.py --jezik {K}')
    for r in csv.DictReader(open(J.sucelje, encoding='utf-8'), delimiter='\t'):
        if r[K] and r[K] not in ('@blobby', '='):
            t[r['en']] = r[K]
            # redak koji postoji samo kao T_('...') prevodi se SAMO unutar T_( ): isti string drugdje
            # u kodu moze biti kljuc (npr. status 'paused')
            if r['izvor'] != 'js-t': d[r['en']] = r[K]
    return d, t
TR, TT = ucitaj_tsv()
stat = {'html': 0, 'attr': 0, 'js': 0, 'jshtml': 0, 't': 0}

# Rijeci koje su u kodu kljucevi/identifikatori (tip vjezbe, tipka, zaglavlje, font). Izvan T_( )
# se nikad ne prevode; gdje su prikazani tekst, kod ih pise kao T_('...') ili tipIme(...).
KOD = {'Daily challenge', 'Weekly challenge', 'Lesson', 'Vocabulary', 'Grammar', 'Practice', 'Test', 'Enter', 'Escape',
       'End', 'Home', 'Authorization', 'Inter', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'POST', 'NFC'}

def norm(s): return re.sub(r'\s+', ' ', s).strip()

def esc_js(prijevod, q):
    # prijevod je pisan kao sadrzaj literala; dodaj escape samo gdje fali
    out = re.sub(r'(?<!\\)' + re.escape(q), '\\\\' + q, prijevod) if q != '`' else prijevod.replace('`', '\\`')
    return out.replace('\n', '\\n')

def zamijeni_tekst_cvora(txt, kind, q=None):
    """txt = sirovi tekst izmedu > i <. Vrati prevedeni (cuva razmake oko)."""
    s = norm(html.unescape(txt))
    if not s or s not in TR: return txt
    lead = txt[:len(txt) - len(txt.lstrip())]; trail = txt[len(txt.rstrip()):]
    p = TR[s]
    p = p.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;') if '&' not in s and '<' not in s else p
    if q: p = esc_js(p, q)
    stat[kind] += 1
    return lead + p + trail

def prevedi_html_dio(vani):
    vani = re.sub(r'>([^<>]+)<', lambda m: '>' + zamijeni_tekst_cvora(m.group(1), 'html') + '<', vani)
    def attr(m):
        s = html.unescape(m.group(2))
        if s in TR:
            stat['attr'] += 1
            return m.group(1) + '="' + html.escape(TR[s], quote=True) + '"'
        return m.group(0)
    return re.sub(ATRIBUTI, attr, vani)

def prevedi_js(js):
    dijelovi, poz = [], 0
    for a, b, q in js_literali(js):
        s = js[a:b]
        novi = None
        if js[max(0, a - 4):a - 1].endswith('T_('):
            # oznaceni tekst sucelja: cijeli literal odjednom (mjesta %1, %2 moraju ostati ista)
            if s in TT:
                if sorted(re.findall(r'%\d', s)) != sorted(re.findall(r'%\d', TT[s])):
                    raise SystemExit(f'T_: prijevod ne cuva mjesta %n: {s!r} -> {TT[s]!r}')
                stat['t'] += 1
                dijelovi.append(js[poz:a]); dijelovi.append(esc_js(TT[s], q)); poz = b
            else:
                stat['t_fali'] = stat.get('t_fali', 0) + 1
            continue
        if '<' in s and '>' in s:
            novi = re.sub(r'>([^<>]+)<', lambda t: '>' + zamijeni_tekst_cvora(t.group(1), 'jshtml', q) + '<', '>' + s + '<')[1:-1]
            def _attr(t):
                v = html.unescape(t.group(2))
                if v not in TR: return t.group(0)
                stat['attr'] += 1
                return t.group(1) + '="' + esc_js(html.escape(TR[v], quote=True), q) + '"'
            novi = re.sub(ATRIBUTI, _attr, novi)
        elif s in TR:
            if s in KOD:
                stat['kod'] = stat.get('kod', 0) + 1
                continue
            stat['js'] += 1
            novi = esc_js(TR[s], q)
        if novi is not None and novi != s:
            dijelovi.append(js[poz:a]); dijelovi.append(novi); poz = b
    dijelovi.append(js[poz:])
    return ''.join(dijelovi)

# ---- BLOBBY: odsjecak engleskog retka -> redak na jeziku XX iz memorije lekcija ----
def blobby_norm(s): return re.sub(r'\s+', ' ', re.sub(r'[*_`]', '', s or '')).strip().lower()
MEM = []
if os.path.exists(J.memorija):
    for r in csv.reader(open(J.memorija, encoding='utf-8'), delimiter='\t'):
        if len(r) > 1 and r[1] and r[1] != '=' and r[0] != 'en': MEM.append((blobby_norm(r[0]), r[1]))
def blobby_prijevod(fr):
    n = blobby_norm(fr.encode().decode('unicode_escape') if '\\' in fr else fr)
    kand = [p for en, p in MEM if n and n in en]
    return min(kand, key=len) if kand else None

def prevedi_blobby(js):
    m = re.search(r'var BLOBBY_RECI = \[(.*?)\];', js, re.S)
    if not m: return js, 0, []
    stavke = re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(1))
    novi, fali = [], []
    for s in stavke:
        p = blobby_prijevod(s)
        if p: novi.append(p)
        else: fali.append(s); novi.append(s)
    tijelo = '\n' + ',\n'.join('    ' + '"' + blobby_norm(x).replace('\\', '\\\\').replace('"', '\\"') + '"' for x in novi) + '\n  '
    return js[:m.start(1)] + tijelo + js[m.end(1):], len(stavke) - len(fali), fali

def zamijeni_tocno(src, staro, novo, n=1):
    k = src.count(staro)
    if k != n: raise SystemExit(f'BUILD: ocekivano {n}x, nadjeno {k}x: {staro}')
    return src.replace(staro, novo)

# ---- index.html ----
izvor_index = os.path.join(ROOT, 'index.html')
src = open(izvor_index, encoding='utf-8').read()
# jedini redak koji odreduje jezik stranice (JEZIK_APP ga cita iz registra u <head>)
src = zamijeni_tocno(src, "var JEZIK_STRANICE = 'en',", f"var JEZIK_STRANICE = '{K}',")
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
for staro, novo in [('<script src="data.js"></script>', f'<script src="{J.data}"></script>'),
                    ('<script src="rjecnik.js"></script>', f'<script src="{J.rjecnik_js}"></script>'),
                    ('<script src="pregledi.js"></script>', f'<script src="{J.pregledi_js}"></script>'),
                    ('<html lang="en">', f'<html lang="{K}">')]:
    out = zamijeni_tocno(out, staro, novo)
for i, m in enumerate(re.finditer(r'<script>(.*?)</script>', out, re.S)):
    ok, gr = L.js_parsira(m.group(1))
    if not ok: raise SystemExit(f'BUILD: <script> br. {i + 1} u {J.index} se ne parsira (acorn): {gr}')
L.pisi(os.path.join(ROOT, J.index), out, kao=izvor_index)

# ---- pregledi.js: prevodi se po POLOZAJU (naslov, opis, drugi clan para), iz pregledi-XX.tsv ----
# Ne ide kroz globalni TR: kratki stringovi (npr. 'is', 'more') znace razlicito u sucelju i u
# pregledima, a 'more' je u pregledima hrvatska rijec.
PT = {}
if os.path.exists(J.pregledi_tsv):
    for r in csv.DictReader(open(J.pregledi_tsv, encoding='utf-8'), delimiter='\t'):
        if r[K]: PT[(r['en'], r['hr'])] = r[K]
izvor_pregledi = os.path.join(ROOT, 'pregledi.js')
pj = open(izvor_pregledi, encoding='utf-8').read()
dij, poz, pfali = [], 0, []
for m in sorted(pregledi_mjesta(pj), key=lambda x: x['s']):
    p = PT.get((m['v'], m['hr']))
    if not p: pfali.append(m['v']); continue
    q = pj[m['s'] - 1]
    dij.append(pj[poz:m['s']]); dij.append(esc_js(p, q)); poz = m['e']
dij.append(pj[poz:])
pj_out = ''.join(dij)
ok, gr = L.js_parsira(pj_out)
if not ok: raise SystemExit(f'BUILD: {J.pregledi_js} se ne parsira (acorn): {gr}')
L.pisi(os.path.join(ROOT, J.pregledi_js), pj_out, kao=izvor_pregledi)
if pfali: print(f'UPOZORENJE: pregledi bez prijevoda ({os.path.basename(J.pregledi_tsv)}):', pfali[:20], len(pfali))
if stat.get('t_fali'): print(f'UPOZORENJE: {stat["t_fali"]} T_ literala bez prijevoda u {os.path.basename(J.sucelje)} (ostaju engleski)')
print(f'[{K}] {J.index}, {J.pregledi_js} | zamjene:', stat, '| blobby:', blob_ok, 'prevedeno, fali:', len(blob_fali))
