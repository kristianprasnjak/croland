#!/usr/bin/env python3
"""izvuci-sucelje.py --jezik XX - izvlaci korisniku vidljive engleske stringove iz index.html
(HTML tekst, atributi, JS literali, cijeli T_('...')) i pregledi.js u <mapa>/sucelje-XX.tsv
(en, XX, izvor, redak) i <mapa>/pregledi-XX.tsv. Postojeci prijevodi se cuvaju; redak koji vise
ne postoji u izvoru ispada. Pokreni nakon svake izmjene teksta u index.html ili pregledi.js."""
import re, os, csv, html, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L
from jezici_lib import js_literali
J, _ = L.iz_argumenata()
K = J.kod
ROOT = L.ROOT
EN = set("the a an is are you your to of in on for with and or but not this that it be can will what how why we our my me no yes all".split())

# siri engleski rjecnik: rijeci iz engleskih segmenata lekcija, bez rijeci koje se javljaju u hrvatskim
def _vokab():
    import csv as _c
    en, hr = {}, set()
    if not os.path.exists(J.segmenti):
        raise SystemExit(f'Nema {J.segmenti} - prvo pokreni izvuci.py --jezik {K}')
    for r in _c.DictReader(open(J.segmenti, encoding='utf-8'), delimiter='\t'):
        ws = re.findall(r"[a-z']+", r['tekst'].lower())
        if r['jezik'] == 'en':
            for w in ws: en[w] = en.get(w, 0) + 1
        elif r['jezik'] == 'hr': hr.update(ws)
    return {w for w, n in en.items() if (n >= 3 and w not in hr and len(w) > 1) or (n >= 1 and len(w) > 3 and w not in hr)} | {'of', 'to', 'in', 'on', 'at', 'by', 'or', 'and', 'the', 'is', 'up', 'no', 'ago'}
VOK = _vokab()
# + UI rijeci kojih nema u lekcijama
VOK |= {'threshold', 'passed', 'mark', 'points', 'streak', 'restarts', 'chose', 'privacy', 'terms'}

def eng1(s):
    t = s.strip()
    w0 = re.findall(r"[A-Za-z']+", t)
    if (len(w0) >= 3 and not re.search(r'[{}]|=>|\bfunction\b|\breturn\b|\bvar\b|\(\)|rgba?\(|^https?:|^[#/]|^\.\w', t)
            and sum(x.lower() in VOK for x in w0) >= 0.6 * len(w0)):
        return True
    if re.search(r'[{};]|=>|\bfunction\b|\breturn\b|rgba?\(|^https?:|^[.#/]', t): return False
    w0 = re.findall(r"[A-Za-z']+", t)
    if w0 and len(t) < 200 and re.search(r'[A-Za-z]{2}', t):
        # tekst s barem jednom engleskom rijeci iz lekcija, a nije identifikator
        frag = s != s.strip() or re.search(r'[:→↻‹›]\s*$|^\s*[·—–%.,]', s)
        if (len(w0) >= 2 or frag or re.search(r'^[A-Z][a-z]+( \d+)?[:!?.]?$', t)) and sum(x.lower() in VOK for x in w0) >= max(1, (len(w0) + 1) // 2):
            return True
    t = s.strip()
    if len(t) < 2 or not re.search(r'[A-Za-z]{2}', t): return False
    if re.fullmatch(r'[\w.#:\-\[\]=>~*+,() ]*\{?', t) and ' ' not in t.strip(): 
        # jedna rijec: prihvati samo ako pocinje velikim slovom i nije identifikator/klasa
        return bool(re.fullmatch(r'[A-Z][a-z]+[!?.]?', t))
    if re.search(r'[{};]|=>|\bfunction\b|\bvar\b|\bconst\b|\breturn\b|px\b|rgba?\(|#[0-9a-f]{3,6}\b|^\.|^#|\(\)|\$\{', t): 
        if '${' not in t: return False
    if re.search(r'^(https?:|/|\.\./|[a-z-]+:[a-z])', t): return False
    w = re.findall(r"[A-Za-z']+", t)
    if not w: return False
    if any(x.lower() in EN for x in w): return True
    return t[0].isupper() and len(w) >= 2

def eng(s): return eng1(s) or eng2(s)

# Drugi prolaz: popis engleskih rijeci (_alati/engleske-rijeci.txt, iz wordfreq). Hvata ono sto
# heuristika iznad propusti (simboli, emoji, kratke poruke: '▶ Continue', 'Saving…', 'Perfect! 🌟').
# Gola mala rijec bez ikakvog znaka ('paused', 'week') se NE uzima: to je cesto kljuc u kodu —
# takav tekst sucelja treba oznaciti s T_('...').
ENG_LISTA = {l.strip() for l in open(os.path.join(L.POMOCNI, 'engleske-rijeci.txt'), encoding='utf-8')
             if l.strip() and not l.startswith('#')}
def eng2(s):
    t = s.strip()
    if not t or re.search(r'[{};]|=>|\bfunction\b|rgba?\(|^https?:|^[.#/\[]|\d(px|rem|em|vw|vh|ms|deg)\b|="|^[\w-]+:[\w(-]', t):
        return False
    w = re.findall(r"[A-Za-z][A-Za-z']*", t)
    if not w: return False
    if len(w) == 1 and re.fullmatch(r"[A-Za-z][a-z']*", t): return False      # gola rijec: mozda kljuc
    if len(w) == 1 and re.fullmatch(r"[A-Za-z][\w-]*", t) and not t[0].isupper(): return False
    en = [x for x in w if x.lower() in ENG_LISTA]
    return len(en) >= 1 and len(en) / len(w) >= 0.5

rez = []   # (tekst, izvor, redak)
src = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
# razdvoji <script> i <style> blokove
poz = 0
for m in re.finditer(r'<(script|style)[^>]*>(.*?)</\1>', src, re.S):
    vani = src[poz:m.start()]
    base = src[:poz].count('\n')
    # HTML tekst
    for t in re.finditer(r'>([^<>]+)<', vani):
        s = html.unescape(t.group(1)).strip()
        if s and eng(s): rez.append((re.sub(r'\s+', ' ', s), 'html', base + vani[:t.start()].count('\n') + 1))
    for t in re.finditer(r'\b(placeholder|title|aria-label|alt|data-tip|data-kratko)="([^"]+)"', vani):
        s = html.unescape(t.group(2))
        if eng(s): rez.append((s, 'html-attr', base + vani[:t.start()].count('\n') + 1))
    if m.group(1) == 'script':
        js = m.group(2); b2 = src[:m.start(2)].count('\n')
        for a, b, q in js_literali(js):
            s = js[a:b]
            # T_('...') je oznaceni tekst sucelja: uzima se cijeli (s mjestima %1 i s HTML-om)
            if js[max(0, a - 4):a - 1].endswith('T_('):
                rez.append((s, 'js-t', b2 + js[:a].count('\n') + 1)); continue
            # u JS-u stringovi s HTML-om: izvuci tekst izmedu tagova
            if '<' in s and '>' in s:
                for tt in re.finditer(r'>([^<>]+)<', '>' + s + '<'):
                    x0 = html.unescape(tt.group(1)); x = x0.strip()
                    if x and eng(x0): rez.append((re.sub(r'\s+', ' ', x), 'js-html', b2 + js[:a].count('\n') + 1))
                for tt in re.finditer(r'\b(placeholder|title|aria-label|alt|data-tip|data-kratko)="([^"]+)"', s):
                    x = html.unescape(tt.group(2))
                    if eng(x): rez.append((x, 'js-attr', b2 + js[:a].count('\n') + 1))
            elif eng(s):
                rez.append((s, 'js', b2 + js[:a].count('\n') + 1))
    poz = m.end()
vani = src[poz:]; base = src[:poz].count('\n')
for t in re.finditer(r'>([^<>]+)<', vani):
    s = html.unescape(t.group(1)).strip()
    if s and eng(s): rez.append((re.sub(r'\s+', ' ', s), 'html', base + vani[:t.start()].count('\n') + 1))

# pregledi.js
pj = open(os.path.join(ROOT, 'pregledi.js'), encoding='utf-8').read()
for a, b, q in js_literali(pj):
    s = pj[a:b]
    if eng(s): rez.append((s, 'pregledi.js', pj[:a].count('\n') + 1))

put = J.sucelje
stari = {}
if os.path.exists(put):
    for r in csv.DictReader(open(put, encoding='utf-8'), delimiter='\t'): stari[r['en']] = r[K]
vid, red = {}, []
for s, iz, ln in rez:
    if s not in vid: vid[s] = (iz, ln); red.append(s)
    elif vid[s][0] == 'js-t' and iz != 'js-t': vid[s] = (iz, ln)   # vrijedi i izvan T_ -> globalni prijevod
with open(put, 'w', encoding='utf-8', newline='') as fo:
    w = csv.writer(fo, delimiter='\t', lineterminator='\n'); w.writerow(['en', K, 'izvor', 'redak'])
    for s in red: w.writerow([s, stari.get(s, ''), *vid[s]])
from collections import Counter
print(f'[{K}] jedinstvenih:', len(red), Counter(vid[s][0] for s in red), 'znakova:', sum(map(len, red)))

# ---- pregledi-XX.tsv: engleska mjesta u pregledi.js po polozaju (en, hr) ----
from jezici_lib import pregledi_mjesta
pput = J.pregledi_tsv
pstari = {}
if os.path.exists(pput):
    for r in csv.DictReader(open(pput, encoding='utf-8'), delimiter='\t'): pstari[(r['en'], r['hr'])] = r[K]
pred = {}
for m in pregledi_mjesta(pj):
    pred.setdefault((m['v'], m['hr']), m['kljuc'] + ':' + m['uloga'])
with open(pput, 'w', encoding='utf-8', newline='') as fo:
    w = csv.writer(fo, delimiter='\t', lineterminator='\n'); w.writerow(['en', 'hr', K, 'gdje'])
    for (en, hr), g in pred.items(): w.writerow([en, hr, pstari.get((en, hr), ''), g])
print(f'[{K}] pregledi:', len(pred), 'mjesta, neprevedeno:', sum(1 for k in pred if not pstari.get(k)))
