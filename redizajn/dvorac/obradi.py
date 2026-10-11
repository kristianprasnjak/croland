"""Gemini slike -> sprajtovi za Dvorac, svi u istoj gustoći piksela.
Predmet se izreže iz originala i uzorkuje izravno na zadanu veličinu (art pikseli
u sceni 160×96), tamni obrub ima prednost; cijeli set dijeli jednu paletu.
Pozadine: kvadrat se uzorkuje na 160 polja i reže donjih 96 redaka."""
import os, sys, json, numpy as np
from PIL import Image
from scipy import ndimage as ndi
from skimage.color import rgb2lab, lab2rgb
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
import pikseli as P

ULAZ, IZLAZ, VAR = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv) > 3 else 'A')
# izbor.json: {"vaza": "B", ...} — koja inačica ide u igru (zadano VAR, pa druga ako fali)
IZBOR = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else {}
os.makedirs(IZLAZ, exist_ok=True)
# najveća stranica predmeta u art pikselima
VEL = {'vaza':34,'kutija-plava':18,'kaput':30,'sesir':18,'ogledalo':44,
 'fotelja':30,'pisaci-stol':30,'klavir':34,'stolic':24,'stol-kolac':24,
 'salica':13,'lonac':22,'zdjela':18,'vrc':20,'vjedro':20,'tava':24,
 'svijece-nove':22,'svijece-stare':22,'tanjuri-novi':20,'tanjuri-stari':20,'ogledala-stara':28,
 'knjiga-more':32,'knjiga-ptice':32,'knjiga-konji':32,'knjiga-zvijezde':32,'knjiga-cvijece':32,
 'kutija-broj':22,'sat':40,
 'ormar':52,'kutija-sesir':18,'skrinja':30,'jastuk':18,'krevet':54,
 'boca':15,'bacva-puna':32,'bacva-prazna':32,
 'stit':26,'mac':30,'kaciga':18,'koplje':52,'oklop':48,
 'kutija-drvena':20,'kutija-srebrna':20,'kutija-zlatna':20,'kutija-plavazl':20,'kutija-glazbena':20,
 'kljuc':22,'prsten':16,'svijeca':16,'svijeca-ugasena':16}

def maska_pozadine(a):
    """bijela pozadina povezana s rubom (na smanjenoj slici, pa povećano)"""
    m = Image.fromarray(a).resize((256, 256), Image.BILINEAR)
    s = np.asarray(m).astype(int)
    bijelo = (s.min(-1) > 225) & (s.max(-1) - s.min(-1) < 30)
    oz, _ = ndi.label(bijelo)
    rub = np.unique(np.r_[oz[0], oz[-1], oz[:, 0], oz[:, -1]]); rub = rub[rub > 0]
    poz = np.isin(oz, rub)
    poz = np.asarray(Image.fromarray((poz * 255).astype(np.uint8)).resize(a.shape[1::-1], Image.NEAREST)) > 127
    return ~poz

def uzorkuj(a, fg, T):
    ys, xs = np.where(fg)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    s = max(y1 - y0, x1 - x0) / T
    H, W = max(1, round((y1 - y0) / s)), max(1, round((x1 - x0) / s))
    L = rgb2lab(a.astype(np.uint8))[..., 0]
    out = np.zeros((H, W, 4), np.uint8)
    for j in range(H):
        for i in range(W):
            ya, yb = int(y0 + j * s), int(y0 + (j + 1) * s); xa, xb = int(x0 + i * s), int(x0 + (i + 1) * s)
            m = fg[ya:yb, xa:xb]
            if m.mean() < 0.5: continue
            yc0, yc1 = int(ya + (yb - ya) * .2), max(int(ya + (yb - ya) * .2) + 1, int(yb - (yb - ya) * .2))
            xc0, xc1 = int(xa + (xb - xa) * .2), max(int(xa + (xb - xa) * .2) + 1, int(xb - (xb - xa) * .2))
            b = a[ya:yb, xa:xb][m]; l = L[ya:yb, xa:xb][m]
            tamno = l < 25
            if tamno.mean() >= 0.30: b = b[tamno]
            else:
                c = a[yc0:yc1, xc0:xc1][fg[yc0:yc1, xc0:xc1]]
                if len(c): b = c
            out[j, i, :3] = np.median(b, axis=0); out[j, i, 3] = 255
    return out

def uzorkuj_pozadinu(a, W=160, H=96):
    s = a.shape[1] / W
    rows = int(round(a.shape[0] / s))
    out = np.zeros((rows, W, 3), np.uint8)
    for j in range(rows):
        for i in range(W):
            ya, yb = int(j * s + s * .25), max(int(j * s + s * .25) + 1, int((j + 1) * s - s * .25))
            xa, xb = int(i * s + s * .25), max(int(i * s + s * .25) + 1, int((i + 1) * s - s * .25))
            out[j, i] = np.median(a[ya:yb, xa:xb].reshape(-1, 3), axis=0)
    return out[rows - H:]

def paleta(px, k, seed=1):
    return P.kmeans_lab(px, k, it=25, seed=seed)

def na_pal(rgb, pal):
    lab = rgb2lab(rgb[None].astype(np.uint8))[0] if rgb.ndim == 2 else rgb2lab(rgb.astype(np.uint8))
    d = ((lab[..., None, :] - pal[None]) ** 2).sum(-1) if rgb.ndim == 2 else ((lab[..., None, :] - pal[None, None]) ** 2).sum(-1)
    col = np.clip(lab2rgb(pal[None])[0] * 255, 0, 255).round().astype(np.uint8)
    return col[d.argmin(-1)]

# ---------- predmeti ----------
spr, sve = {}, []
for ime, T in VEL.items():
    v = IZBOR.get(ime, VAR)
    f = os.path.join(ULAZ, f'{ime}-{v}.jpg')
    if not os.path.exists(f): f = os.path.join(ULAZ, f'{ime}-{"B" if v == "A" else "A"}.jpg')
    if not os.path.exists(f): continue
    a = np.asarray(Image.open(f).convert('RGB'))
    rgba = uzorkuj(a, maska_pozadine(a), T)
    spr[ime] = rgba; sve.append(rgba[rgba[..., 3] > 0][:, :3])
pal = paleta(np.concatenate(sve), 56)
IKONE = {
 'knjiga-more':     ['.ww..ww','w..ww..','.......','.ww..ww','w..ww..'],
 'knjiga-ptice':    ['ww...ww','.ww.ww.','..www..','...w...'],
 'knjiga-konji':    ['..ww...','.wwww..','wwwwww.','w..www.','...www.','..wwww.','.wwwww.'],
 'knjiga-zvijezde': ['...w...','..www..','wwwwwww','.wwwww.','..www..','.ww.ww.','.w...w.'],
 'knjiga-cvijece':  ['.w.w.w.','..www..','.wwwww.','..www..','...w...','.wwww..','...w...']}
def ikona(rgba, ik):
    # središte korica obojiti bojom korica, pa nacrtati znak dvostruko (2×2 piksela)
    m = rgba[..., 3] > 0; ys, xs = np.where(m)
    cx, cy = (xs.min() + xs.max()) // 2 + 1, int(ys.min() + (ys.max() - ys.min()) * 0.55)
    oko = rgba[cy - 6:cy + 7, cx - 6:cx + 7, :3].reshape(-1, 3)
    L = oko.sum(1); kor = np.median(oko[L >= np.percentile(L, 40)], axis=0).astype(np.uint8)
    rgba[cy - 8:cy + 7, cx - 8:cx + 7, :3] = kor
    h, w = len(ik), len(ik[0]); y0, x0 = cy - h, cx - w
    for j, r in enumerate(ik):
        for i, ch in enumerate(r):
            if ch == 'w': rgba[y0 + 2 * j:y0 + 2 * j + 2, x0 + 2 * i:x0 + 2 * i + 2, :3] = (244, 238, 226)
BOJE = {'k': (36, 28, 21), 'r': (122, 31, 46), 'R': (176, 58, 52), 'w': (226, 230, 232), 'g': (150, 156, 162), 'd': (24, 18, 14)}
def crtaj(rgba, maska, x0, y0):
    for j, r in enumerate(maska):
        for i, ch in enumerate(r):
            if ch in BOJE and 0 <= y0 + j < rgba.shape[0] and 0 <= x0 + i < rgba.shape[1]:
                rgba[y0 + j, x0 + i, :3] = BOJE[ch]; rgba[y0 + j, x0 + i, 3] = 255
def bacva_puna(rgba):
    # šire platno: čaša crnog vina do bačve i mlaz iz pipe
    h, w = rgba.shape[:2]; n = np.zeros((h, w + 9, 4), np.uint8); n[:, :w] = rgba
    crtaj(n, ['kkkkkkk', 'kRRRRRk', 'krRRRrk', 'krrrrrk', '.krrrk.', '..kkk..', '...k...', '...k...', '.kkkkk.'], w + 1, h - 9)
    ys, xs = np.where(rgba[..., 3] > 0); cx = (xs.min() + xs.max()) // 2
    tap = int(ys.min() + (ys.max() - ys.min()) * 0.62)
    for y in range(tap + 3, h - 1): n[y, cx, :3] = BOJE['R']; n[y, cx, 3] = 255
    crtaj(n, ['.rRr.', 'rrrrr'], cx - 2, h - 2)
    return n
def bacva_prazna(rgba):
    # otvoren, prazan vrh i paučina
    ys, xs = np.where(rgba[..., 3] > 0); y0, x0, x1 = ys.min(), xs.min(), xs.max()
    for y in range(y0 + 1, y0 + 4):
        r = np.where(rgba[y, :, 3] > 0)[0]
        if len(r) > 4: rgba[y, r.min() + 2:r.max() - 1, :3] = BOJE['d']
    crtaj(rgba, ['w.w..', '.w..w', 'w.ww.', '..w.w', '.w...'], x0 + 2, y0 + 5)
    crtaj(rgba, ['..w.w', 'w..w.', '.ww.w', 'w.w..'], x1 - 6, y0 + 8)
info = {}
for ime, rgba in list(spr.items()):
    m = rgba[..., 3] > 0
    rgba[m, :3] = na_pal(rgba[m, :3], pal)
    if ime in IKONE: ikona(rgba, IKONE[ime])
    if ime == 'bacva-puna': rgba = bacva_puna(rgba)
    if ime == 'bacva-prazna': bacva_prazna(rgba)
    spr[ime] = rgba
    Image.fromarray(rgba, 'RGBA').save(os.path.join(IZLAZ, ime + '.png'))
    info[ime] = [rgba.shape[1], rgba.shape[0]]
# ---------- pozadine ----------
for f in sorted(os.listdir(ULAZ)):
    if not f.startswith('poz-') or not f.endswith(f'-{VAR}.jpg'): continue
    a = np.asarray(Image.open(os.path.join(ULAZ, f)).convert('RGB'))
    p = uzorkuj_pozadinu(a)
    p = np.clip(p.astype(float) * 0.80 + np.array([-3, 0, 9]), 0, 255).astype(np.uint8)   # tamnije i hladnije: predmeti iskaču
    pp = paleta(p.reshape(-1, 3), 28, seed=2)
    p = na_pal(p.reshape(-1, 3), pp).reshape(p.shape)
    ime = f.replace(f'-{VAR}.jpg', '')
    Image.fromarray(p).save(os.path.join(IZLAZ, ime + '.png')); info[ime] = [160, 96]
f = os.path.join(ULAZ, f'naslovna-{VAR}.jpg')
if os.path.exists(f):
    a = np.asarray(Image.open(f).convert('RGB'))
    p = uzorkuj_pozadinu(a, 128, 128)
    pp = paleta(p.reshape(-1, 3), 28, seed=3)
    Image.fromarray(na_pal(p.reshape(-1, 3), pp).reshape(p.shape)).save(os.path.join(IZLAZ, 'naslovna.png')); info['naslovna'] = [128, 128]
json.dump(info, open(os.path.join(IZLAZ, 'velicine.json'), 'w'), indent=0)
print(len(info), 'datoteka')
