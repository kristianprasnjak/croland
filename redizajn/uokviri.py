"""Izreže predmet (sve što nije bijelo), centrira ga u kvadrat s malim rubom
i spremi kao 512×512 webp. Upotreba: python uokviri.py ULAZ IZLAZ [rub=0.06]"""
import sys, os
import numpy as np
from PIL import Image
ulaz, izlaz = sys.argv[1], sys.argv[2]
rub = float(sys.argv[3]) if len(sys.argv) > 3 else 0.06
os.makedirs(izlaz, exist_ok=True)
for f in sorted(os.listdir(ulaz)):
    im = Image.open(os.path.join(ulaz, f)).convert('RGB')
    a = np.asarray(im).astype(int)
    ne = (255 * 3 - a.sum(2)) > 24
    ys, xs = np.where(ne)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    s = max(y1 - y0, x1 - x0)
    s = int(s / (1 - 2 * rub))
    cy, cx = (y0 + y1) // 2, (x0 + x1) // 2
    plat = Image.new('RGB', (s, s), (255, 255, 255))
    plat.paste(im.crop((cx - s // 2, cy - s // 2, cx - s // 2 + s, cy - s // 2 + s)), (0, 0))
    # crop izvan slike daje crno — zato ga ponovno obojimo bijelo
    p = np.asarray(plat).copy()
    xx0, yy0 = cx - s // 2, cy - s // 2
    maska = np.zeros(p.shape[:2], bool)
    yy, xx = np.mgrid[0:s, 0:s]
    maska |= (xx + xx0 < 0) | (xx + xx0 >= im.width) | (yy + yy0 < 0) | (yy + yy0 >= im.height)
    p[maska] = 255
    Image.fromarray(p).resize((512, 512), Image.LANCZOS).save(os.path.join(izlaz, os.path.splitext(f)[0] + '.webp'), quality=86, method=6)
    print(f, f'predmet {x1-x0}×{y1-y0}')
