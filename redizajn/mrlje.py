"""Uklanja ravnu mrlju (plavu, smeđu…) iza ilustracije i ostavlja bijelu pozadinu.

Kako radi:
 1. bijela pozadina = sve što je gotovo bijelo i povezano s rubom slike
 2. boje mrlje = boje piksela koji dodiruju tu pozadinu, a nisu tamna linija
 3. mrlja = pikseli tih boja povezani s pozadinom (poplava od ruba prema unutra);
    ista boja UNUTAR predmeta ostaje, jer je od mrlje odvaja tamna linija
 4. rubni pikseli (mješavina mrlje i linije) se "operu" — mrlja u njima postaje bijela

Upotreba: python mrlje.py ULAZNA_MAPA IZLAZNA_MAPA [datoteka ...]
"""
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from skimage.color import rgb2lab


def ukloni(rgb, rupe_ok=False):
    a = rgb.astype(np.float32)
    lab = rgb2lab(rgb)
    L = lab[..., 0]
    h, w = L.shape

    # 1. bijela pozadina povezana s rubom
    bijelo = (L > 93) & (np.abs(lab[..., 1]) < 6) & (np.abs(lab[..., 2]) < 6)
    oznake, _ = ndi.label(bijelo)
    rub = np.unique(np.concatenate([oznake[0], oznake[-1], oznake[:, 0], oznake[:, -1]]))
    rub = rub[rub > 0]
    pozadina = np.isin(oznake, rub)

    # 2. boje mrlje: pikseli uz pozadinu koji nisu tamni ni bijeli
    uz = ndi.binary_dilation(pozadina, iterations=3) & ~pozadina & ~bijelo & (L > 40)
    if uz.sum() < 200:
        return rgb, 0.0
    uzorak = lab[uz]
    # dominantne boje: grubo kvantiziranje u Lab i uzimanje najčešćih
    q = np.round(uzorak / np.array([6, 6, 6])).astype(int)
    kljucevi, broj = np.unique(q, axis=0, return_counts=True)
    red = np.argsort(-broj)
    paleta = []
    ukupno = broj.sum()
    for i in red:
        if broj[i] < ukupno * 0.03:
            break
        paleta.append(kljucevi[i] * 6.0)
    if not paleta:
        return rgb, 0.0
    paleta = np.array(paleta)

    # 3. kandidati = blizu neke boje mrlje (ili bijeli); poplava od pozadine
    d = np.min(np.linalg.norm(lab[..., None, :] - paleta[None, None, :, :], axis=-1), axis=-1)
    kand = (d < 14) | bijelo
    oznake2, _ = ndi.label(kand)
    dodir = np.unique(oznake2[pozadina])
    dodir = dodir[dodir > 0]
    mrlja = np.isin(oznake2, dodir) & ~pozadina & ~bijelo
    # rupice unutar mrlje (šum kompresije, sitne točkice) — zatvori
    mrlja = ndi.binary_closing(mrlja, iterations=2) & ~bijelo & (d < 30)

    out = a.copy()
    out[mrlja] = 255

    # 4. rub: pikseli uz mrlju koji su mješavina boje mrlje i tamne linije
    blizu = ndi.binary_dilation(mrlja, iterations=4) & ~mrlja & ~bijelo
    if blizu.any():
        # najbliža boja mrlje (u RGB) za svaki rubni piksel
        pal_rgb = lab2rgb_arr(paleta)
        px = a[blizu]
        dd = np.linalg.norm(px[:, None, :] - pal_rgb[None, :, :], axis=-1)
        m = pal_rgb[np.argmin(dd, axis=1)]
        # px ≈ t*m + (1-t)*k, gdje je k tamna linija (≈ 35)
        k = np.full_like(px, 35.0)
        den = np.sum((m - k) ** 2, axis=1) + 1e-6
        t = np.clip(np.sum((px - k) * (m - k), axis=1) / den, 0, 1)
        ostatak = np.linalg.norm(px - (t[:, None] * m + (1 - t[:, None]) * k), axis=1)
        ok = ostatak < 28        # stvarno je mješavina mrlje i linije
        novo = t[:, None] * 255.0 + (1 - t[:, None]) * k
        px[ok] = novo[ok]
        out[blizu] = px
    # 5. mrlja vidljiva kroz rupe u predmetu (ručka šalice, vrča): zatvoreni
    #    komadi gotovo iste, ravne boje kao mrlja
    glavna = paleta[0]
    d0 = np.linalg.norm(lab - glavna, axis=-1)
    rupe = (d < 10) & ~mrlja & ~pozadina
    oz3, n3 = ndi.label(rupe)
    if n3:
        idx = np.arange(1, n3 + 1)
        vel = ndi.sum(rupe, oz3, idx)
        sd = np.max([ndi.standard_deviation(lab[..., c], oz3, idx) for c in range(3)], axis=0)
        izbor = idx[(vel >= 40) & (sd < 4)]
        if len(izbor) and rupe_ok:
            kom = np.isin(oz3, izbor)
            out[ndi.binary_dilation(kom, iterations=1) & (d < 22)] = 255
            mrlja |= kom
        ukloni.rupe = int(np.isin(oz3, izbor).sum()) if len(izbor) else 0
    else:
        ukloni.rupe = 0
    # 6. blijedi obris: gotovo bijeli pikseli povezani s pozadinom -> čisto bijelo
    lab2 = rgb2lab(np.clip(out, 0, 255).astype(np.uint8))
    svijetlo = (lab2[..., 0] > 86) & (np.hypot(lab2[..., 1], lab2[..., 2]) < 14)
    oz4, _ = ndi.label(svijetlo)
    vani = np.unique(oz4[pozadina]); vani = vani[vani > 0]
    out[np.isin(oz4, vani)] = 255
    udio = mrlja.mean()
    return np.clip(out, 0, 255).astype(np.uint8), float(udio)


def lab2rgb_arr(lab):
    from skimage.color import lab2rgb
    return lab2rgb(lab[None, :, :])[0] * 255.0


# Slike kod kojih se mrlja vidi KROZ predmet (ručka šalice, staklo čaše).
# Samo kod njih se brišu i zatvoreni komadi boje mrlje — kod ostalih bi to
# pojelo dio predmeta iste boje (zdjela juhe, peraje ribe).
RUPE = {'Kava', 'Voda', 'Pivo', 'Sok', 'Limunada', 'Vino', 'Povrće'}


def main():
    ulaz, izlaz = sys.argv[1], sys.argv[2]
    os.makedirs(izlaz, exist_ok=True)
    imena = sys.argv[3:] or sorted(f for f in os.listdir(ulaz) if f.lower().endswith(('.png', '.webp', '.jpg')))
    for ime in imena:
        im = Image.open(os.path.join(ulaz, ime)).convert('RGB')
        rgb = np.asarray(im)
        novo, udio = ukloni(rgb, os.path.splitext(ime)[0] in RUPE)
        Image.fromarray(novo).save(os.path.join(izlaz, os.path.splitext(ime)[0] + '.png'))
        print(f'{ime}: mrlja {udio*100:.1f} % slike, rupe {getattr(ukloni, "rupe", 0)} px')


if __name__ == '__main__':
    main()
