"""Iz obrađenih sprajtova (pikseli.py) složi mapu koju igra čita:
   mini-igre/mini games media/konoba/
     <id>.png         jelo 32×32 (šank)
     <id>-mini.png    jelo 16×16 (na stolu gosta) — pravo pixel smanjenje, ista gustoća
     gostNN.png, gostNN-sretan.png, gostNN-ljut.png   portreti 40×40
     zid.png, drvo.png, ploca.png, rep.png             dijelovi sučelja
Upotreba: python ugradi.py OBRAĐENO KIT IZLAZ [--stil A]"""
import sys, os, shutil, argparse
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import pikseli

ap = argparse.ArgumentParser()
ap.add_argument('obradeno'); ap.add_argument('kit'); ap.add_argument('izlaz')
ap.add_argument('--stil', default='A')
ar = ap.parse_args()
os.makedirs(ar.izlaz, exist_ok=True)
n = 0
for f in sorted(os.listdir(ar.obradeno)):
    if not f.endswith('.png') or f'-{ar.stil}' not in f: continue
    ime = f.replace(f'-{ar.stil}', '')            # juha-A.png -> juha.png, gost03-A-ljut.png -> gost03-ljut.png
    shutil.copy(os.path.join(ar.obradeno, f), os.path.join(ar.izlaz, ime)); n += 1
    if not ime.startswith('gost'):
        rgba = np.asarray(Image.open(os.path.join(ar.obradeno, f)).convert('RGBA'))
        mini = pikseli.na_platno(pikseli.smanji(rgba, 15), 16)
        Image.fromarray(mini, 'RGBA').save(os.path.join(ar.izlaz, ime.replace('.png', '-mini.png'))); n += 1
for f in os.listdir(ar.kit):
    shutil.copy(os.path.join(ar.kit, f), os.path.join(ar.izlaz, f)); n += 1
print(n, 'datoteka u', ar.izlaz)
