#!/usr/bin/env python3
"""Izvlaci korisniku vidljive engleske stringove iz index.html (HTML tekst, atributi, JS literali)
i pregledi.js u sucelje-de.tsv (en, de, izvor, redak). Postojeci prijevodi se cuvaju."""
import re, os, csv, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.dirname(os.path.abspath(__file__))
EN = set("the a an is are you your to of in on for with and or but not this that it be can will what how why we our my me no yes all".split())

def eng(s):
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
    for t in re.finditer(r'\b(placeholder|title|aria-label|alt|data-tip)="([^"]+)"', vani):
        s = html.unescape(t.group(2))
        if eng(s): rez.append((s, 'html-attr', base + vani[:t.start()].count('\n') + 1))
    if m.group(1) == 'script':
        js = m.group(2); b2 = src[:m.start(2)].count('\n')
        for t in re.finditer(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"|`((?:[^`\\]|\\.)*)`", js):
            s = next(g for g in t.groups() if g is not None)
            # u JS-u stringovi s HTML-om: izvuci tekst izmedu tagova
            if '<' in s and '>' in s:
                for tt in re.finditer(r'>([^<>]+)<', '>' + s + '<'):
                    x = html.unescape(tt.group(1)).strip()
                    if x and eng(x): rez.append((re.sub(r'\s+', ' ', x), 'js-html', b2 + js[:t.start()].count('\n') + 1))
            elif eng(s):
                rez.append((s, 'js', b2 + js[:t.start()].count('\n') + 1))
    poz = m.end()
vani = src[poz:]; base = src[:poz].count('\n')
for t in re.finditer(r'>([^<>]+)<', vani):
    s = html.unescape(t.group(1)).strip()
    if s and eng(s): rez.append((re.sub(r'\s+', ' ', s), 'html', base + vani[:t.start()].count('\n') + 1))

# pregledi.js
pj = open(os.path.join(ROOT, 'pregledi.js'), encoding='utf-8').read()
for t in re.finditer(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"|`((?:[^`\\]|\\.)*)`", pj):
    s = next(g for g in t.groups() if g is not None)
    if eng(s): rez.append((s, 'pregledi.js', pj[:t.start()].count('\n') + 1))

put = os.path.join(OUT, 'sucelje-de.tsv')
stari = {}
if os.path.exists(put):
    for r in csv.DictReader(open(put, encoding='utf-8'), delimiter='\t'): stari[r['en']] = r['de']
vid, red = {}, []
for s, iz, ln in rez:
    if s not in vid: vid[s] = (iz, ln); red.append(s)
with open(put, 'w', encoding='utf-8', newline='') as fo:
    w = csv.writer(fo, delimiter='\t', lineterminator='\n'); w.writerow(['en', 'de', 'izvor', 'redak'])
    for s in red: w.writerow([s, stari.get(s, ''), *vid[s]])
from collections import Counter
print('jedinstvenih:', len(red), Counter(vid[s][0] for s in red), 'znakova:', sum(map(len, red)))
