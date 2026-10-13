"""Gemini originali -> izrezani predmeti (PNG s prozirnošću) i pozadine soba za Dvorac v2.
Bez strogog pixel arta: predmet se izreže iz originala i blago smanji (dulja stranica 384 px),
pa ostaje sav detalj. Pozadina: donje 3/4 kvadrata (4:3), malo svjetlija."""
import numpy as np, sys, os, json
from PIL import Image, ImageEnhance
from scipy import ndimage as ndi
SRC, OUT = sys.argv[1], sys.argv[2]
IZBOR = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else {}
os.makedirs(OUT, exist_ok=True)
PREDMETI = ['vaza','kutija-plava','kaput','sesir','ogledalo','fotelja','pisaci-stol','klavir','stolic','stol-kolac',
 'salica','lonac','zdjela','vrc','vjedro','tava','svijece-nove','svijece-stare','tanjuri-novi','tanjuri-stari','ogledala-stara',
 'knjiga-more','knjiga-ptice','knjiga-konji','knjiga-zvijezde','knjiga-cvijece','kutija-broj','sat','ormar','kutija-sesir',
 'skrinja','jastuk','krevet','boca','bacva-puna','bacva-prazna','stit','mac','kaciga','koplje','oklop',
 'kutija-drvena','kutija-srebrna','kutija-zlatna','kutija-plavazl','kutija-glazbena','kljuc','prsten','svijeca','svijeca-ugasena']
RUPE = {'ogledalo','prsten','kljuc','ogledala-stara','sat'}       # zatvorene bijele rupe su pozadina
IKONE = {
 'knjiga-more':     ['.ww..ww','w..ww..','.......','.ww..ww','w..ww..'],
 'knjiga-ptice':    ['ww...ww','.ww.ww.','..www..','...w...'],
 'knjiga-konji':    ['..ww...','.wwww..','wwwwww.','w..www.','...www.','..wwww.','.wwwww.'],
 'knjiga-zvijezde': ['...w...','..www..','wwwwwww','.wwwww.','..www..','.ww.ww.','.w...w.'],
 'knjiga-cvijece':  ['.w.w.w.','..www..','.wwwww.','..www..','...w...','.wwww..','...w...']}
B = {'k':(36,28,21),'r':(122,31,46),'R':(176,58,52),'w':(232,234,236),'d':(20,15,12),'c':(244,238,226)}

def maska(a, rupe):
    bijelo = (a.min(-1) > 228) & (a.max(-1) - a.min(-1) < 28)
    oz, _ = ndi.label(bijelo)
    rub = np.unique(np.r_[oz[0], oz[-1], oz[:, 0], oz[:, -1]]); rub = rub[rub > 0]
    poz = np.isin(oz, rub)
    if rupe:
        cisto = (a.min(-1) > 238) & (a.max(-1) - a.min(-1) < 16)
        oz2, n = ndi.label(cisto)
        vel = ndi.sum(cisto, oz2, range(1, n + 1))
        poz |= np.isin(oz2, [i + 1 for i, v in enumerate(vel) if v > a.shape[0] * a.shape[1] * 0.0008])
    pred = ~poz
    pred = ndi.binary_opening(pred, iterations=2); pred = ndi.binary_erosion(pred, iterations=3)
    oz3, n = ndi.label(pred)
    if n > 1:
        vel = ndi.sum(pred, oz3, range(1, n + 1)); pred = np.isin(oz3, [i + 1 for i, v in enumerate(vel) if v > vel.max() * 0.02])
    return pred

def blokovi(rgba, uzorak, x0, y0, c):
    for j, r in enumerate(uzorak):
        for i, ch in enumerate(r):
            if ch in B:
                rgba[int(y0 + j * c):int(y0 + (j + 1) * c), int(x0 + i * c):int(x0 + (i + 1) * c)] = B[ch] + (255,)

def izrezi(ime):
    v = IZBOR.get(ime, 'A'); f = f'{SRC}/{ime}-{v}.jpg'
    if not os.path.exists(f): f = f'{SRC}/{ime}-{"B" if v == "A" else "A"}.jpg'
    a = np.asarray(Image.open(f).convert('RGB'))
    m = maska(a.astype(int), ime in RUPE)
    ys, xs = np.where(m); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    rgba = np.dstack([a, (m * 255).astype(np.uint8)])[y0:y1, x0:x1].copy()
    h, w = rgba.shape[:2]
    if ime in IKONE:                       # znak na koricama: u veličini „piksela“ originala
        c = w / 12.0; ik = IKONE[ime]; cx, cy = w * 0.55, h * 0.55
        boja = np.median(rgba[int(cy - 2*c):int(cy + 2*c), int(cx - 2*c):int(cx + 2*c), :3].reshape(-1, 3), axis=0).astype(np.uint8)
        rgba[int(cy - 4.6*c):int(cy + 4.2*c), int(cx - 4.4*c):int(cx + 4.4*c), :3] = boja
        uz = [r.replace('w', 'c') for r in ik]
        blokovi(rgba, uz, cx - len(uz[0]) * c / 2, cy - len(uz) * c / 2, c)
    if ime == 'bacva-puna':                # mlaz i čaša vina
        c = w / 24.0; n = np.zeros((h, int(w + 10 * c), 4), np.uint8); n[:, :w] = rgba; rgba = n
        blokovi(rgba, ['kkkkkkk', 'kRRRRRk', 'krRRRrk', 'krrrrrk', '.krrrk.', '..kkk..', '...k...', '...k...', '.kkkkk.'], w + 1.5 * c, h - 9 * c, c)
        cx = w / 2; tap = h * 0.66
        rgba[int(tap):int(h - c), int(cx - c / 2):int(cx + c / 2)] = B['R'] + (255,)
        blokovi(rgba, ['.rRr.', 'rrrrr'], cx - 2.5 * c, h - 2 * c, c)
    if ime == 'bacva-prazna':              # otvoren, prazan vrh i paučina
        c = w / 24.0
        for yy in range(int(c), int(4 * c)):
            r = np.where(rgba[yy, :, 3] > 0)[0]
            if len(r) > 6: rgba[yy, int(r.min() + 2 * c):int(r.max() - 1.5 * c), :3] = B['d']
        blokovi(rgba, ['w.w..', '.w..w', 'w.ww.', '..w.w', '.w...'], 2 * c, 5 * c, c)
        blokovi(rgba, ['..w.w', 'w..w.', '.ww.w', 'w.w..'], w - 7 * c, 8 * c, c)
    im = Image.fromarray(rgba, 'RGBA')
    s = 384 / max(im.size); im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    im.save(f'{OUT}/{ime}.png', optimize=True); return list(im.size)

info = {}
for ime in PREDMETI: info[ime] = izrezi(ime)
for poz in ['predvorje','blagovaonica','kuhinja','spremiste','knjiznica','sat','spavaca','podrum','oruzarnica','tajna']:
    im = Image.open(f'{SRC}/poz-{poz}-A.jpg').convert('RGB').crop((0, 256, 1024, 1024)).resize((960, 720), Image.LANCZOS)
    ImageEnhance.Brightness(im).enhance(1.12).save(f'{OUT}/poz-{poz}.jpg', quality=84); info['poz-' + poz] = [960, 720]
im = Image.open(f'{SRC}/naslovna-A.jpg').convert('RGB').crop((0, 40, 1024, 727)).resize((960, 644), Image.LANCZOS)
im.save(f'{OUT}/naslovna.jpg', quality=84); info['naslovna'] = [960, 644]
json.dump(info, open(f'{OUT}/velicine.json', 'w'), separators=(',', ':'))
print(len(info), 'datoteka')
