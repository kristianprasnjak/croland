# -*- coding: utf-8 -*-
"""
grad-teren-kodom.py — pločice terena i dijelovi zgrada izračunati kodom.

Zašto: teren se mora bešavno ponavljati. Generatori slika to ne rade pouzdano,
a matematika radi uvijek. Ove pločice su po definiciji bešavne (uzorak se računa
po modulu 32) i koriste točno boje iz palete.

    python grad-teren-kodom.py           # napravi sve u mapu gotovo/
    python grad-teren-kodom.py --demo    # + složi probnu scenu demo-scena.png
"""
import random, sys, os
from PIL import Image

P = {
    "tinta": (0x2B, 0x21, 0x18), "smedja_t": (0x4A, 0x38, 0x26), "smedja": (0x6E, 0x5B, 0x48),
    "smedja_s": (0x8B, 0x61, 0x42), "pijesak_t": (0xC8, 0x9B, 0x72), "pijesak": (0xE8, 0xD8, 0xA8),
    "papir": (0xF3, 0xE7, 0xD4), "bijela": (0xFF, 0xF8, 0xEF),
    "zelena_tt": (0x3F, 0x6B, 0x22), "zelena_t": (0x5E, 0x8F, 0x33),
    "zelena": (0x7C, 0xB3, 0x42), "zelena_s": (0xA8, 0xCF, 0x7A),
    "more_t": (0x2E, 0x6E, 0x93), "more": (0x4A, 0x9B, 0xC4), "more_s": (0x74, 0xBE, 0xDC),
    "kamen_t": (0x63, 0x5A, 0x50), "kamen": (0x8C, 0x80, 0x72), "kamen_s": (0xB9, 0xAC, 0x96),
    "cigla_t": (0x8E, 0x3B, 0x2A), "cigla": (0xC4, 0x55, 0x3D),
    "naranca": (0xE8, 0x62, 0x3A), "zuta_t": (0xE8, 0x9A, 0x2C), "zuta": (0xF4, 0xB9, 0x42),
    "ljubicasta": (0x7B, 0x5E, 0xA7),
}
T = 32


def nova(boja):
    return Image.new("RGBA", (T, T), boja + (255,))


def mrlje(im, boja, koliko, sjeme, velicina=1):
    """Nasumične točkice — modulo T, pa je pločica bešavna."""
    r = random.Random(sjeme)
    px = im.load()
    for _ in range(koliko):
        x, y = r.randrange(T), r.randrange(T)
        for dy in range(velicina):
            for dx in range(velicina):
                px[(x + dx) % T, (y + dy) % T] = boja + (255,)
    return im


def trava(sjeme, cvijece=False, kamencici=False):
    im = nova(P["zelena"])
    mrlje(im, P["zelena_s"], 26, sjeme, 1)
    mrlje(im, P["zelena_t"], 18, sjeme + 1, 1)
    if kamencici:
        mrlje(im, P["kamen_s"], 3, sjeme + 2, 2)
    if cvijece:
        mrlje(im, P["zuta"], 4, sjeme + 3, 2)
        mrlje(im, P["bijela"], 3, sjeme + 4, 2)
    return im


def zemlja():
    im = nova(P["pijesak_t"])
    mrlje(im, P["smedja_s"], 30, 11, 1)
    mrlje(im, P["smedja"], 12, 12, 1)
    return im


def pijesak():
    im = nova(P["pijesak"])
    mrlje(im, P["pijesak_t"], 22, 21, 1)
    mrlje(im, P["bijela"], 10, 22, 1)
    return im


def kaldrma():
    """Kamenje u pomaknutim redovima — šav se poklapa jer je širina djelitelj 32."""
    im = nova(P["kamen_t"])
    px = im.load()
    r = random.Random(31)
    kw, kh = 8, 8
    for ry in range(0, T, kh):
        pomak = (kh // 2) if (ry // kh) % 2 else 0
        for rx in range(-kw, T + kw, kw):
            x0 = rx + pomak
            ton = r.choice([P["kamen"], P["kamen"], P["kamen_s"], P["kamen_t"]])
            for y in range(ry + 1, ry + kh - 1):
                for x in range(x0 + 1, x0 + kw - 1):
                    px[x % T, y % T] = ton + (255,)
    return im


def plocnik():
    im = nova(P["kamen_s"])
    px = im.load()
    for i in range(T):
        px[i, 0] = P["kamen"] + (255,)
        px[0, i] = P["kamen"] + (255,)
        px[i, 16] = P["kamen"] + (255,)
        px[16, i] = P["kamen"] + (255,)
    return im


def voda(duboka=True):
    im = nova(P["more"] if duboka else P["more_s"])
    val = P["more_t"] if duboka else P["more"]
    px = im.load()
    r = random.Random(41 if duboka else 42)
    for _ in range(7):
        y = r.randrange(T)
        x0 = r.randrange(T)
        for d in range(r.randrange(4, 9)):
            px[(x0 + d) % T, y] = val + (255,)
    return im


def daske(vodoravno=True):
    im = nova(P["smedja_s"])
    px = im.load()
    for i in range(T):
        for k in (0, 8, 16, 24):
            if vodoravno:
                px[i, k] = P["smedja_t"] + (255,)
            else:
                px[k, i] = P["smedja_t"] + (255,)
    mrlje(im, P["smedja"], 14, 51, 1)
    return im


def travnjak(svijetli):
    return nova(P["zelena_s"] if svijetli else P["zelena"])


def tartan():
    im = nova(P["naranca"])
    mrlje(im, P["cigla"], 18, 61, 1)
    return im


def crta():
    im = nova(P["zelena"])
    px = im.load()
    for x in range(T):
        for y in range(14, 18):
            px[x, y] = P["bijela"] + (255,)
    return im


def rub(gornja, donja):
    """Prijelaz: gornja polovica jedan teren, donja drugi, nazubljena granica."""
    im = gornja.copy()
    px, dp = im.load(), donja.load()
    r = random.Random(71)
    granica = [16 + r.randrange(-3, 4) for _ in range(T)]
    for x in range(T):
        for y in range(granica[x], T):
            px[x, y] = dp[x, y]
    return im


def zid_kameni():
    im = nova(P["kamen"])
    px = im.load()
    r = random.Random(81)
    for ry in range(0, T, 11):
        pomak = 5 if (ry // 11) % 2 else 0
        for rx in range(-14, T + 14, 14):
            for y in range(ry, min(ry + 10, T)):
                for x in range(rx + pomak, rx + pomak + 13):
                    if 0 <= x < T:
                        px[x, y] = r.choice([P["kamen_s"], P["kamen_s"], P["kamen"]]) + (255,)
            for y in range(ry, min(ry + 11, T)):
                x = (rx + pomak + 13) % T
                px[x, y] = P["kamen_t"] + (255,)
        for x in range(T):
            if ry + 10 < T:
                px[x, ry + 10] = P["kamen_t"] + (255,)
    return im


# ---------- dijelovi zgrade: 5 pločica → sve zgrade ----------
def zgrada_zid(boja="pijesak"):
    im = nova(P[boja])
    mrlje(im, P["papir"], 10, 91, 1)
    return im


def zgrada_krov():
    im = nova(P["cigla"])
    px = im.load()
    for y in range(0, T, 6):
        for x in range(T):
            px[x, y] = P["cigla_t"] + (255,)
    for x in range(0, T, 8):
        for y in range(T):
            px[x, y] = P["cigla_t"] + (255,)
    return im


def zgrada_krov_rub():
    im = zgrada_krov()
    px = im.load()
    for x in range(T):
        for y in range(0, 5):
            px[x, y] = P["tinta"] + (255,)
    return im


def zgrada_vrata(boja="pijesak"):
    im = zgrada_zid(boja)
    px = im.load()
    for y in range(6, T):
        for x in range(8, 24):
            px[x, y] = P["smedja_t"] + (255,)
    for y in range(7, T):
        for x in range(9, 23):
            px[x, y] = P["smedja"] + (255,)
    for y in range(17, 20):
        px[20, y] = P["zuta"] + (255,)
    return im


def zgrada_prozor(boja="pijesak"):
    im = zgrada_zid(boja)
    px = im.load()
    for y in range(8, 24):
        for x in range(8, 24):
            px[x, y] = P["tinta"] + (255,)
    for y in range(9, 23):
        for x in range(9, 23):
            px[x, y] = P["more_s"] + (255,)
    for y in range(9, 23):
        px[15, y] = P["papir"] + (255,)
        px[16, y] = P["papir"] + (255,)
    for x in range(9, 23):
        px[x, 15] = P["papir"] + (255,)
    return im


PLOCICE = {
    "grad-teren-trava-1": lambda: trava(1),
    "grad-teren-trava-2": lambda: trava(2),
    "grad-teren-trava-3": lambda: trava(3, kamencici=True),
    "grad-teren-trava-cvijece": lambda: trava(4, cvijece=True),
    "grad-teren-zemlja": zemlja,
    "grad-teren-kaldrma": kaldrma,
    "grad-teren-plocnik": plocnik,
    "grad-teren-pijesak": pijesak,
    "grad-teren-more": lambda: voda(True),
    "grad-teren-more-plitko": lambda: voda(False),
    "grad-teren-potok": lambda: voda(False),
    "grad-teren-most": lambda: daske(True),
    "grad-teren-parket": lambda: daske(False),
    "grad-teren-travnjak-1": lambda: travnjak(True),
    "grad-teren-travnjak-2": lambda: travnjak(False),
    "grad-teren-atletska-staza": tartan,
    "grad-teren-crta": crta,
    "grad-teren-rub-trava-staza": lambda: rub(trava(1), zemlja()),
    "grad-teren-rub-trava-pijesak": lambda: rub(trava(1), pijesak()),
    "grad-zid-kameni": zid_kameni,
    "grad-zgrada-zid": zgrada_zid,
    "grad-zgrada-krov": zgrada_krov,
    "grad-zgrada-krov-rub": zgrada_krov_rub,
    "grad-zgrada-vrata": zgrada_vrata,
    "grad-zgrada-prozor": zgrada_prozor,
}


def sve(izlaz="gotovo"):
    os.makedirs(izlaz, exist_ok=True)
    for ime, f in PLOCICE.items():
        f().save(os.path.join(izlaz, ime + ".png"))
    return len(PLOCICE)


def demo(izlaz="demo-scena.png", uvecaj=4):
    """Složi malu scenu da se vidi kako pločice rade zajedno."""
    W, H = 20, 14
    karta = [["t"] * W for _ in range(H)]
    for x in range(W):
        for y in range(10, 12):
            karta[y][x] = "p"                     # pijesak
        for y in range(12, H):
            karta[y][x] = "m"                     # more
    for x in range(W):
        karta[9][x] = "rp"                        # rub trava→pijesak
    for y in range(0, 10):
        karta[y][9] = karta[y][10] = "k"          # kaldrma
    for x in range(3, 17):
        karta[6][x] = "k"
    plat = Image.new("RGBA", (W * T, H * T))
    izvor = {"t": trava(1), "t2": trava(2), "t3": trava(3, kamencici=True),
             "k": kaldrma(), "p": pijesak(), "m": voda(True),
             "rp": rub(trava(1), pijesak())}
    import random as _r
    rr = _r.Random(7)
    for y in range(H):
        for x in range(W):
            z = karta[y][x]
            if z == "t":
                z = rr.choice(["t", "t", "t", "t2", "t3"])
            plat.paste(izvor[z], (x * T, y * T))
    # kuća 4×3 iz modula
    zid, krov, krovr = zgrada_zid(), zgrada_krov(), zgrada_krov_rub()
    vrata, prozor = zgrada_vrata(), zgrada_prozor()
    kx, ky = 3, 2
    for i in range(4):
        plat.paste(krovr, ((kx + i) * T, ky * T))
        plat.paste(krov, ((kx + i) * T, (ky + 1) * T))
    for i in range(4):
        plat.paste([zid, prozor, vrata, prozor][i], ((kx + i) * T, (ky + 2) * T), None)
    # druga kuća 3×3
    kx2, ky2 = 13, 2
    for i in range(3):
        plat.paste(krovr, ((kx2 + i) * T, ky2 * T))
        plat.paste(krov, ((kx2 + i) * T, (ky2 + 1) * T))
    for i in range(3):
        plat.paste([prozor, vrata, zid][i], ((kx2 + i) * T, (ky2 + 2) * T))
    # zid uz stazu
    for x in range(3, 8):
        plat.paste(zid_kameni(), (x * T, 8 * T))
    plat = plat.resize((plat.width * uvecaj // 2, plat.height * uvecaj // 2), Image.NEAREST)
    plat.save(izlaz)
    return izlaz


if __name__ == "__main__":
    n = sve()
    print("napravljeno pločica:", n)
    if "--demo" in sys.argv or True:
        print("demo:", demo())
