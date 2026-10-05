#!/usr/bin/env python3
"""primijeni.py --jezik XX [datoteke...] - iz igre/*.md i <mapa>/prijevod-XX.tsv gradi <mapa>/igre/*.md.
Hrvatski sadrzaj se ne dira; engleski se zamjenjuje prijevodom iz memorije.
Neprevedeni stringovi ostaju na engleskom i ispisuju se u <mapa>/nedostaje.tsv."""
import os, csv, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L
import izvuci as X
J, samo = L.iz_argumenata()          # samo = npr. ['lekcija-05.md']
X.postavi(J)
os.makedirs(J.igre, exist_ok=True)
mem = {}
with open(J.memorija, encoding='utf-8') as fi:
    for r in csv.DictReader(fi, delimiter='\t'):
        if r[J.kod].strip(): mem[r['en']] = r[J.kod]
nedostaje = {}
def tr(txt, jez):
    if txt in mem:
        return txt if mem[txt] == '=' else mem[txt]
    nedostaje[txt] = nedostaje.get(txt, 0) + 1
    return txt
gotove = 0
for f in X.datoteke():
    if samo and f not in samo: continue
    X.segmenti.clear()
    redovi = X.obradi(f, tr)
    open(os.path.join(J.igre, f), 'w', encoding='utf-8', newline='\n').write('\n'.join(redovi))
    gotove += 1
with open(J.nedostaje, 'w', encoding='utf-8', newline='') as fo:
    w = csv.writer(fo, delimiter='\t', lineterminator='\n'); w.writerow(['en', 'puta'])
    for k, v in nedostaje.items(): w.writerow([k, v])
print(f'[{J.kod}] datoteka: {gotove}  neprevedenih stringova: {len(nedostaje)}')
