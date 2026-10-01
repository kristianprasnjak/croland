#!/usr/bin/env python3
"""primijeni.py - iz igre/*.md i prijevod-de.tsv gradi croland-de/igre/*.md (njemacka verzija).
Hrvatski sadrzaj se ne dira; engleski se zamjenjuje prijevodom iz memorije.
Neprevedeni stringovi ostaju na engleskom i ispisuju se u nedostaje.tsv."""
import os, csv, sys
import izvuci as X
OUT_IGRE = os.path.join(X.OUT, 'igre')
os.makedirs(OUT_IGRE, exist_ok=True)
mem = {}
with open(os.path.join(X.OUT, 'prijevod-de.tsv'), encoding='utf-8') as fi:
    for r in csv.DictReader(fi, delimiter='\t'):
        if r['de'].strip(): mem[r['en']] = r['de']
nedostaje = {}
def tr(txt, jez):
    if txt in mem:
        return txt if mem[txt] == '=' else mem[txt]
    nedostaje[txt] = nedostaje.get(txt, 0) + 1
    return txt
samo = sys.argv[1:]          # npr. lekcija-05.md
gotove = 0
for f in X.datoteke():
    if samo and f not in samo: continue
    X.segmenti.clear(); nedostaje_prije = len(nedostaje)
    redovi = X.obradi(f, tr)
    open(os.path.join(OUT_IGRE, f), 'w', encoding='utf-8', newline='\n').write('\n'.join(redovi))
    gotove += 1
with open(os.path.join(X.OUT, 'nedostaje.tsv'), 'w', encoding='utf-8', newline='') as fo:
    w = csv.writer(fo, delimiter='\t', lineterminator='\n'); w.writerow(['en', 'puta'])
    for k, v in nedostaje.items(): w.writerow([k, v])
print(f'datoteka: {gotove}  neprevedenih stringova: {len(nedostaje)}')
