#!/usr/bin/env python3
"""novi-jezik.py --jezik XX - pripremi mapu novog jezika (mora vec biti upisan u jezici.json):
  <mapa>/iznimke.tsv        kopija iznimki prepoznavanja iz prvog postojeceg jezika (vrijede za sve jezike)
  <mapa>/segmenti.tsv, prijevod-XX.tsv     (izvuci.py; stupac XX prazan)
  <mapa>/sucelje-XX.tsv, pregledi-XX.tsv   (izvuci-sucelje.py; stupac XX prazan)
  <mapa>/igre/, rjecnik/, _radno/
Postojece datoteke se ne prepisuju (memorije samo dobiju nove retke), pa je sigurno pokrenuti ponovno."""
import os, shutil, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L
J, _ = L.iz_argumenata()
for d in (J.mapa, J.igre, J.rjecnik, J.radno):
    os.makedirs(d, exist_ok=True)
if not os.path.exists(J.iznimke):
    for k, c in L.svi_jezici().items():
        izv = os.path.join(L.ROOT, c['mapa'], 'iznimke.tsv')
        if k != J.kod and os.path.exists(izv):
            shutil.copyfile(izv, J.iznimke); print('iznimke.tsv kopirane iz', c['mapa']); break
for s in ('izvuci.py', 'izvuci-sucelje.py'):
    subprocess.run([sys.executable, os.path.join(L.ALATI, s), '--jezik', J.kod], check=True)
print(f'Mapa {J.cfg["mapa"]} spremna. Dalje: prevodi se u {os.path.basename(J.memorija)}, '
      f'{os.path.basename(J.sucelje)} i {os.path.basename(J.pregledi_tsv)} (vidi croland-jezici/PROCITAJ-ME.md).')
