#!/usr/bin/env python3
"""izgradi-jezike.py [--jezik XX] - build svih aktivnih jezika iz croland-jezici/jezici.json
(ili samo jednoga s --jezik). Za svaki jezik redom:
  1. node osvjezi-jezik.js --jezik XX   -> data-XX.js, rjecnik-XX.js
  2. izgradi-sucelje.py --jezik XX      -> index-XX.html, pregledi-XX.js
Ovo poziva objavi.bat (korak 1b). Lekcije jezika (<mapa>/igre) se ne grade ovdje: one se
mijenjaju samo kad se mijenja prijevod (primijeni.py), i commitaju se."""
import os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L
argv = sys.argv[1:]
if '--jezik' in argv or any(a.startswith('--jezik=') for a in argv):
    kodovi = [L.iz_argumenata(argv)[0].kod]
else:
    kodovi = [k for k, c in L.svi_jezici().items() if c.get('aktivan')]
for k in kodovi:
    print(f'--- jezik {k} ---', flush=True)
    subprocess.run(['node', os.path.join(L.ALATI, 'osvjezi-jezik.js'), '--jezik', k], check=True)
    subprocess.run([sys.executable, os.path.join(L.ALATI, 'izgradi-sucelje.py'), '--jezik', k], check=True)
print('gotovo:', ', '.join(kodovi) or '(nema aktivnih jezika)')
