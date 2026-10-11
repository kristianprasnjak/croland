"""Gemini „pixel art“ -> pravi pixel art.

Gemini crta sliku koja IZGLEDA kao pixel art: 1024×1024 s „pikselima“ od
~30 px, mutnim rubovima, JPEG šumom i stotinama nijansi. Ova skripta:
  1. pronađe mrežu (veličinu i pomak „piksela“) posebno po x i po y
  2. svaku ćeliju svede na jednu boju (medijan sredine ćelije)
  3. bijelu pozadinu povezanu s rubom pretvori u prozirnost
  4. sve slike u setu svede na ZAJEDNIČKU paletu (k-means u Lab prostoru),
     pa set izgleda kao da ga je crtala ista ruka
  5. spremi sliku u pravoj rezoluciji (npr. 32×32), centriranu na platnu

Upotreba:
  python redizajn/pikseli.py ULAZNA_MAPA IZLAZNA_MAPA [--boja 32] [--platno 32]
                             [--grupe A,B] [--pregled pregled.png]
  --grupe A,B : imena koja sadrže "-A" dobiju jednu paletu, "-B" drugu
                (kad se uspoređuju dva stila, ne smiju dijeliti paletu)
"""
import sys, os, argparse
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from skimage.color import rgb2lab, lab2rgb


def rubni_signal(a, os_):
    """zbroj razlika susjednih piksela okomito na os — vrhovi su granice ćelija"""
    g = np.abs(np.diff(a.astype(np.float32), axis=os_)).sum(axis=2)
    return g.mean(axis=1 - os_)


def _ocjena(s, p, o):
    n = len(s)
    idx = np.round(o + np.arange(0, n / p) * p).astype(int)
    idx = idx[(idx >= 0) & (idx < n)]
    if len(idx) < 4:
        return -1e9
    return np.maximum.reduce([s[np.clip(idx + d, 0, n - 1)] for d in (-1, 0, 1)]).mean()


def nadji_mrezu(sig, pmin=6.0, pmax=80.0):
    """perioda p i pomak o: granice ćelija su na o + k*p.
    Višekratnici prave periode (2p, 3p…) imaju jednako dobru ocjenu, pa se
    bira NAJMANJA perioda čija je ocjena blizu najbolje."""
    s = (sig - sig.mean()) / (sig.std() + 1e-6)
    rez = []
    n = len(s)
    # Gemini mrežu gotovo uvijek dijeli točno: 1024/32, 1024/40, 1024/50…
    # pa se te periode isprobaju sigurno, a uz njih i gruba ljestvica
    kandidati = sorted(set([n / N for N in range(8, 140) if pmin <= n / N <= pmax] +
                           list(np.arange(pmin, pmax, 0.25))))
    for p in kandidati:
        rez.append(max((_ocjena(s, p, o), p, o) for o in np.arange(0, p, max(1.0, p / 24))))
    maks = max(r[0] for r in rez)
    v, p, o = next(r for r in rez if r[0] >= 0.75 * maks)
    # fino podešavanje oko odabrane periode
    return max(((_ocjena(s, pp, oo), pp, oo) for pp in np.arange(p - 0.5, p + 0.5, 0.05)
                for oo in np.arange(max(0, o - 1.5), o + 1.5, 0.25)), key=lambda r: r[0])[1:]


def uzorkuj(a, px, ox, py, oy):
    h, w, _ = a.shape
    xs = np.arange(ox, w, px); ys = np.arange(oy, h, py)
    if xs[0] > px * 0.5: xs = np.r_[xs[0] - px, xs]
    if ys[0] > py * 0.5: ys = np.r_[ys[0] - py, ys]
    nx, ny = len(xs), len(ys)
    out = np.zeros((ny, nx, 3), np.uint8)
    for j, y0 in enumerate(ys):
        for i, x0 in enumerate(xs):
            x1, x2 = int(round(x0 + px * 0.25)), int(round(x0 + px * 0.75))
            y1, y2 = int(round(y0 + py * 0.25)), int(round(y0 + py * 0.75))
            x1, y1 = max(0, x1), max(0, y1)
            x2, y2 = min(w, max(x2, x1 + 1)), min(h, max(y2, y1 + 1))
            blok = a[y1:y2, x1:x2].reshape(-1, 3)
            out[j, i] = np.median(blok, axis=0) if len(blok) else 255
    return out


def prozirnost(c):
    lab = rgb2lab(c)
    bijelo = (lab[..., 0] > 90) & (np.hypot(lab[..., 1], lab[..., 2]) < 8)
    oz, _ = ndi.label(bijelo)
    rub = np.unique(np.r_[oz[0], oz[-1], oz[:, 0], oz[:, -1]]); rub = rub[rub > 0]
    return ~np.isin(oz, rub)       # True = predmet


def kmeans_lab(boje, k, it=30, seed=1):
    rng = np.random.default_rng(seed)
    x = rgb2lab(boje[None].astype(np.uint8))[0]
    k = min(k, len(np.unique(boje, axis=0)))
    c = x[rng.choice(len(x), k, replace=False)]
    for _ in range(it):
        d = ((x[:, None] - c[None]) ** 2).sum(-1)
        l = d.argmin(1)
        for j in range(k):
            m = l == j
            if m.any(): c[j] = x[m].mean(0)
    return c


def na_paletu(c, maska, pal_lab):
    lab = rgb2lab(c)
    d = ((lab[..., None, :] - pal_lab[None, None]) ** 2).sum(-1)
    l = d.argmin(-1)
    rgb = np.clip(lab2rgb(pal_lab[None])[0] * 255, 0, 255).round().astype(np.uint8)
    out = np.zeros(c.shape[:2] + (4,), np.uint8)
    out[..., :3] = rgb[l]
    out[..., 3] = np.where(maska, 255, 0)
    return out


def na_platno(rgba, platno):
    ys, xs = np.where(rgba[..., 3] > 0)
    if not len(ys): return rgba
    k = rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = k.shape[:2]
    P = max(platno, h, w)
    out = np.zeros((P, P, 4), np.uint8)
    y0, x0 = (P - h) // 2, (P - w) // 2
    if h < P: y0 = P - h - max(0, (P - h) // 4)   # predmet malo niže (stoji na šanku)
    out[y0:y0 + h, x0:x0 + w] = k
    return out


def smanji(rgba, cilj):
    """Pixel art veći od `cilj` polja svede na `cilj` (po većoj stranici).
    Svako novo polje uzme najčešću boju ispod sebe, ali tamni obrub ima
    prednost čim pokriva barem trećinu polja — tako obrubi ostaju neprekinuti."""
    ys, xs = np.where(rgba[..., 3] > 0)
    if not len(ys): return rgba
    k = rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = k.shape[:2]
    if max(h, w) <= cilj: return k
    f = cilj / max(h, w)
    H, W = max(1, round(h * f)), max(1, round(w * f))
    out = np.zeros((H, W, 4), np.uint8)
    L = rgb2lab(k[..., :3])[..., 0]
    for j in range(H):
        y1, y2 = int(j / f), max(int(j / f) + 1, int((j + 1) / f))
        for i in range(W):
            x1, x2 = int(i / f), max(int(i / f) + 1, int((i + 1) / f))
            blok = k[y1:y2, x1:x2].reshape(-1, 4); lb = L[y1:y2, x1:x2].reshape(-1)
            vid = blok[:, 3] > 0
            if vid.mean() < 0.5: continue
            b, l = blok[vid], lb[vid]
            tamno = l < 28
            if tamno.mean() >= 0.34: b = b[tamno]
            boje, br = np.unique(b[:, :3], axis=0, return_counts=True)
            out[j, i, :3] = boje[br.argmax()]; out[j, i, 3] = 255
    return out


def iz_izvora(a, c, m, cilj):
    """Umjesto da se gotov pixel art smanjuje (gubi oči, osmijeh), predmet se
    iznova uzorkuje iz IZVORNE slike na mrežu od `cilj` polja po većoj stranici.
    Svako polje = medijan (Lab) sredine polja; pozadina se ponovno traži na
    rezultatu, pa nema svijetlog ruba."""
    h, w = m.shape; H, W = a.shape[:2]
    ys, xs = np.where(m)
    sy, sx = H / h, W / w
    y0, y1 = ys.min() * sy, (ys.max() + 1) * sy
    x0, x1 = xs.min() * sx, (xs.max() + 1) * sx
    s = max(y1 - y0, x1 - x0) / cilj
    nh, nw = max(1, round((y1 - y0) / s)), max(1, round((x1 - x0) / s))
    # malo okvira bijele oko predmeta, da prozirnost nađe pozadinu
    out = np.full((nh + 2, nw + 2, 3), 255, np.uint8)
    for j in range(nh):
        for i in range(nw):
            yy0 = int(y0 + j * s + s * .2); yy1 = max(yy0 + 1, int(y0 + (j + 1) * s - s * .2))
            xx0 = int(x0 + i * s + s * .2); xx1 = max(xx0 + 1, int(x0 + (i + 1) * s - s * .2))
            blok = a[yy0:yy1, xx0:xx1].reshape(-1, 3)
            if len(blok): out[j + 1, i + 1] = np.median(blok, axis=0)
    return out, prozirnost(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('ulaz'); ap.add_argument('izlaz')
    ap.add_argument('--boja', type=int, default=32)
    ap.add_argument('--platno', type=int, default=32)
    ap.add_argument('--grupe', default='')
    ap.add_argument('--vece', default='', help='npr. gost=40: imena koja sadrže "gost" dobiju platno 40')
    ap.add_argument('--pregled', default='')
    ap.add_argument('--izvor', default='', help='npr. gost: ta imena se uzorkuju iz izvora točno na platno-2 (i povećavaju)')
    ar = ap.parse_args()
    os.makedirs(ar.izlaz, exist_ok=True)
    imena = sorted(f for f in os.listdir(ar.ulaz) if f.lower().endswith(('.jpg', '.png', '.webp')) and '.staro-' not in f)

    sirovo = {}
    for f in imena:
        a = np.asarray(Image.open(os.path.join(ar.ulaz, f)).convert('RGB'))
        px, ox = nadji_mrezu(rubni_signal(a, 1))
        py, oy = nadji_mrezu(rubni_signal(a, 0))
        # „pikseli“ su kvadratni: ako je jedna os uhvatila dvostruku periodu, uzmi manju
        if py > 1.6 * px: py, oy = nadji_mrezu(rubni_signal(a, 0), pmax=px * 1.3)
        if px > 1.6 * py: px, ox = nadji_mrezu(rubni_signal(a, 1), pmax=py * 1.3)
        c = uzorkuj(a, px, ox, py, oy)
        m = prozirnost(c)
        P = ar.platno
        for pravilo in [x for x in ar.vece.split(',') if '=' in x]:
            kljuc, v = pravilo.split('=')
            if kljuc in f: P = int(v)
        ys, xs = np.where(m)
        vel = max(ys.max() - ys.min(), xs.max() - xs.min()) + 1 if len(ys) else 0
        izv = any(k and k in f for k in ar.izvor.split(','))
        if izv and vel != P - 2:
            c, m = iz_izvora(a, c, m, P - 2)
            print(f'  {f}: {vel} polja -> iz izvora na {P - 2}')
        sirovo[f] = (c, m)
        print(f'{f}: mreža {px:.1f}×{py:.1f} px -> {c.shape[1]}×{c.shape[0]}')

    grupe = [g for g in ar.grupe.split(',') if g] or ['']
    for g in grupe:
        clan = [f for f in imena if (f'-{g}' in f if g else True)]
        if not clan: continue
        sve = np.concatenate([sirovo[f][0][sirovo[f][1]] for f in clan])
        pal = kmeans_lab(sve, ar.boja)
        print(f'grupa {g or "sve"}: {len(clan)} slika, paleta {len(pal)} boja')
        for f in clan:
            c, m = sirovo[f]
            P = ar.platno
            for pravilo in [x for x in ar.vece.split(',') if '=' in x]:
                kljuc, v = pravilo.split('=')
                if kljuc in f: P = int(v)
            rgba = na_platno(smanji(na_paletu(c, m, pal), P - 2), P)
            Image.fromarray(rgba, 'RGBA').save(os.path.join(ar.izlaz, os.path.splitext(f)[0] + '.png'))

    if ar.pregled:
        izl = sorted(os.listdir(ar.izlaz)); Z = 4; S = 40 * Z
        cols = 8; rows = (len(izl) + cols - 1) // cols
        o = Image.new('RGB', (cols * (S + 8) + 8, rows * (S + 8) + 8), (236, 228, 216))
        for i, f in enumerate(izl):
            im = Image.open(os.path.join(ar.izlaz, f)); im = im.resize((im.width * Z, im.height * Z), Image.NEAREST)
            o.paste(im, (8 + (i % cols) * (S + 8), 8 + (i // cols) * (S + 8)), im)
        o.save(ar.pregled)


if __name__ == '__main__':
    main()
