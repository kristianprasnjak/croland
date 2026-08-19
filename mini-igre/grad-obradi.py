# -*- coding: utf-8 -*-
"""
grad-obradi.py — pretvara ono što Gemini vrati u prave sličice za igru.

Gemini nikad ne vraća pravi 32×32 pixel art: vraća veliku sliku koja *izgleda*
kao pixel art. Ova skripta radi ostatak:

  1. makne magenta pozadinu (#FF00FF) → prozirnost
  2. obreže na sadržaj
  3. smanji na točnu veličinu (površinsko uprosječivanje, pa oštro)
  4. svede boje na paletu iz grad-paleta.py
  5. spremi PNG s ispravnim nazivom

Priprema (jednom):
    pip install pillow

Jedna slika:
    python grad-obradi.py ulaz.png grad-teren-trava-1.png 32 32

Cijela mapa prema popisu (CSV iz GRAD-slike-popis.csv):
    python grad-obradi.py --popis GRAD-slike-popis.csv --ulaz sirovo --izlaz gotovo
    (traži datoteku sirovo/<naziv>.png za svaki redak; preskače što ne postoji)

Ploča s više sličica odjednom (npr. 4×4 mreža):
    python grad-obradi.py --ploca ploca.png --stupaca 4 --redaka 4 --izlaz komadi

Provjera bešavnosti pločice (složi je 4×4 i spremi pregled):
    python grad-obradi.py --pregled grad-teren-trava-1.png
"""
import argparse, csv, os, sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Nedostaje Pillow.  pip install pillow")

try:
    from grad_paleta import PALETA
except ImportError:
    try:
        import importlib.util
        _s = importlib.util.spec_from_file_location(
            "gp", os.path.join(os.path.dirname(os.path.abspath(__file__)), "grad-paleta.py"))
        _m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
        PALETA = _m.PALETA
    except Exception:
        sys.exit("Ne mogu učitati grad-paleta.py — mora biti u istoj mapi.")

BOJE = [tuple(int(h[i:i+2], 16) for i in (1, 3, 5)) for h, _ in PALETA]


def bez_magente(im, prag=90):
    """Magenta (i sve blizu nje) postaje prozirno."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r > 255 - prag and b > 255 - prag and g < prag:
                px[x, y] = (0, 0, 0, 0)
    return im


def obrezi(im):
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def na_paletu(im):
    """Svaki neprozirni piksel na najbližu boju iz palete."""
    px = im.load()
    w, h = im.size
    keš = {}
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 128:
                px[x, y] = (0, 0, 0, 0)
                continue
            k = (r, g, b)
            if k not in keš:
                keš[k] = min(BOJE, key=lambda c: (c[0]-r)**2 * 3 + (c[1]-g)**2 * 4 + (c[2]-b)**2 * 2)
            c = keš[k]
            px[x, y] = (c[0], c[1], c[2], 255)
    return im


def uklopi(im, sirina, visina, prizemno=True):
    """Doda prozirni rub tako da omjer odgovara cilju — da se sličica ne razvuče.
    prizemno = sadržaj se lijepi na dno okvira (likovi i zgrade stoje na tlu)."""
    w, h = im.size
    ciljni = sirina / float(visina)
    trenutni = w / float(h)
    if abs(ciljni - trenutni) < 0.01:
        return im
    if trenutni > ciljni:               # preširoko → dodaj visinu
        nh = int(round(w / ciljni)); nw = w
    else:                                # previsoko → dodaj širinu
        nw = int(round(h * ciljni)); nh = h
    plat = Image.new("RGBA", (nw, nh), (0, 0, 0, 0))
    plat.paste(im, ((nw - w) // 2, nh - h if prizemno else (nh - h) // 2))
    return plat


BEZ_OBREZIVANJA = ("grad-teren-", "grad-unut-pod", "grad-unut-zid", "grad-zid-", "grad-zivica")
NIJE_PRIZEMNO = ("grad-teren-", "grad-unut-pod", "grad-unut-zid", "grad-sjena", "grad-portret-")


def obradi(ulaz, izlaz, sirina, visina, obrezuj=True):
    naziv = os.path.basename(izlaz)
    if naziv.startswith(BEZ_OBREZIVANJA):
        obrezuj = False
    im = Image.open(ulaz)
    im = bez_magente(im)
    if obrezuj:
        im = obrezi(im)
        im = uklopi(im, sirina, visina, prizemno=not naziv.startswith(NIJE_PRIZEMNO))
    # površinsko uprosječivanje daje čišći rezultat od izravnog NEAREST-a
    im = im.resize((sirina, visina), Image.BOX)
    im = na_paletu(im)
    os.makedirs(os.path.dirname(os.path.abspath(izlaz)), exist_ok=True)
    im.save(izlaz)
    return izlaz


def isijeci_plocu(ploca, stupaca, redaka, izlaz):
    im = Image.open(ploca).convert("RGBA")
    w, h = im.size
    kw, kh = w // stupaca, h // redaka
    os.makedirs(izlaz, exist_ok=True)
    n = 0
    for r in range(redaka):
        for s in range(stupaca):
            dio = im.crop((s * kw, r * kh, (s + 1) * kw, (r + 1) * kh))
            dio.save(os.path.join(izlaz, "komad-%02d.png" % (n + 1)))
            n += 1
    return n


def pregled(putanja, puta=4, uvecaj=6):
    im = Image.open(putanja).convert("RGBA")
    w, h = im.size
    plat = Image.new("RGBA", (w * puta, h * puta))
    for y in range(puta):
        for x in range(puta):
            plat.paste(im, (x * w, y * h))
    plat = plat.resize((plat.width * uvecaj, plat.height * uvecaj), Image.NEAREST)
    izl = os.path.splitext(putanja)[0] + "-pregled.png"
    plat.save(izl)
    return izl


def main():
    p = argparse.ArgumentParser(add_help=True)
    p.add_argument("ulaz", nargs="?")
    p.add_argument("izlaz", nargs="?")
    p.add_argument("sirina", nargs="?", type=int)
    p.add_argument("visina", nargs="?", type=int)
    p.add_argument("--popis")
    p.add_argument("--ulaz-mapa", "--ulaz", dest="ulaz_mapa", default="sirovo")
    p.add_argument("--izlaz-mapa", "--izlaz", dest="izlaz_mapa", default="gotovo")
    p.add_argument("--ploca")
    p.add_argument("--stupaca", type=int, default=4)
    p.add_argument("--redaka", type=int, default=4)
    p.add_argument("--pregled")
    p.add_argument("--bez-obrezivanja", action="store_true")
    a = p.parse_args()

    if a.pregled:
        print("pregled:", pregled(a.pregled)); return

    if a.ploca:
        n = isijeci_plocu(a.ploca, a.stupaca, a.redaka, a.izlaz_mapa)
        print("isječeno %d komada u %s/" % (n, a.izlaz_mapa)); return

    if a.popis:
        ok = fali = 0
        with open(a.popis, encoding="utf-8-sig") as f:
            for red in csv.DictReader(f, delimiter=";"):
                naziv = red["datoteka"]
                izvor = os.path.join(a.ulaz_mapa, naziv)
                if not os.path.exists(izvor):
                    fali += 1; continue
                obradi(izvor, os.path.join(a.izlaz_mapa, naziv),
                       int(red["sirina"]), int(red["visina"]), not a.bez_obrezivanja)
                ok += 1
        print("obrađeno %d, još nema %d" % (ok, fali)); return

    if not (a.ulaz and a.izlaz and a.sirina and a.visina):
        p.print_help(); return
    print("spremljeno:", obradi(a.ulaz, a.izlaz, a.sirina, a.visina, not a.bez_obrezivanja))


if __name__ == "__main__":
    main()
