# -*- coding: utf-8 -*-
"""
grad-karta.py — gradi kartu grada 80×60 i sprema je kao grad-karta.json.
Uz to crta pregled grad-pregled.png da se vidi što je nastalo.

    python grad-karta.py
"""
import json, random
from PIL import Image
import importlib.util, os

spec = importlib.util.spec_from_file_location("kat", os.path.join(os.path.dirname(os.path.abspath(__file__)), "katalog.py"))
kat = importlib.util.module_from_spec(spec); spec.loader.exec_module(kat)

W, H = 80, 60
T = 16
r = random.Random(20260817)

# ---------------- slojevi ----------------
teren = [["t"] * W for _ in range(H)]     # znak -> ime u atlasu
objekti = []                               # {"ime":..., "x":..., "y":...}
vrata = []                                 # {"x","y","kamo","ime"}
natpisi = []                               # {"x","y","hr","en"}
zone = []                                  # {"ime","x","y","w","h"}

TEREN_ZNAK = {
    "t": "trava", "T": "trava-2",
    "1": "trava-cvijece-narancasto", "2": "trava-cvijece-bijelo", "3": "trava-cvijece-plavo",
    "z": "zemlja", "Z": "zemlja-2",
    "k": "kaldrma", "K": "kamen",
    "p": "pijesak", "P": "pijesak-2",
    "m": "more", "M": "more-2", "v": "more-val",
    "c": "cesta", "C": "asfalt-crta", "b": "zebra",
    "l": "plocnik",
}
NEPROHODNO_TEREN = set("mMv")


def pravokutnik(x, y, w, h, znak):
    for j in range(max(0, y), min(H, y + h)):
        for i in range(max(0, x), min(W, x + w)):
            teren[j][i] = znak


def sarena_trava():
    for j in range(H):
        for i in range(W):
            if teren[j][i] != "t":
                continue
            q = r.random()
            if q < 0.14: teren[j][i] = "T"
            elif q < 0.17: teren[j][i] = "1"
            elif q < 0.19: teren[j][i] = "2"
            elif q < 0.205: teren[j][i] = "3"


def stavi(ime, x, y):
    objekti.append({"ime": ime, "x": x, "y": y})


# ---------------- 1. osnovni teren ----------------
# more i plaža na dnu
pravokutnik(0, 54, W, 6, "m")
for i in range(W):
    teren[53][i] = "v"
pravokutnik(0, 50, W, 3, "p")

# ---------------- 2. ceste ----------------
def cesta_vodoravna(y):
    pravokutnik(0, y, W, 1, "l")
    pravokutnik(0, y + 1, W, 2, "c")
    pravokutnik(0, y + 3, W, 1, "l")
    for i in range(2, W, 4):
        teren[y + 1][i] = "C"


def cesta_okomita(x):
    for j in range(H):
        if teren[j][0] == "m":
            break
        if j >= 50:
            break
        teren[j][x - 1] = "l"
        teren[j][x] = "c"
        teren[j][x + 1] = "c"
        teren[j][x + 2] = "l"


cesta_vodoravna(13)    # Ulica stube
cesta_vodoravna(28)    # Glavna ulica
cesta_vodoravna(45)    # Obalna cesta
cesta_okomita(21)
cesta_okomita(46)
cesta_okomita(66)

# zebre
for (x, y) in [(21, 14), (21, 29), (46, 14), (46, 29), (46, 46), (66, 29), (66, 46)]:
    teren[y][x] = "b"; teren[y][x + 1] = "b"
    teren[y + 1][x] = "b"; teren[y + 1][x + 1] = "b"

# trg — kaldrma
pravokutnik(30, 17, 13, 10, "k")
# školsko dvorište
pravokutnik(4, 18, 12, 8, "K")
# riva
pravokutnik(0, 47, W, 3, "k")

sarena_trava()

# ---------------- 3. zgrade ----------------
PROCELJA = ["procelje-bez", "procelje-sivo", "procelje-bez-2", "procelje-sivo-2"]


def zgrada(x, y, ime_pr, naziv_hr, naziv_en, kamo=None):
    """Pročelje je 3×6; vrata su u donjem srednjem stupcu."""
    for j in range(y - 1, y + 7):
        for i in range(x - 1, x + 4):
            if 0 <= i < W and 0 <= j < H and teren[j][i] in "tT123":
                teren[j][i] = "l"
    stavi(ime_pr, x, y)
    vx, vy = x + 1, y + 5
    if kamo:
        vrata.append({"x": vx, "y": vy, "kamo": kamo, "ime": naziv_hr})
    natpisi.append({"x": x + 1, "y": y - 1, "hr": naziv_hr, "en": naziv_en, "z": 1})
    zone.append({"ime": naziv_hr, "x": x, "y": y, "w": 3, "h": 6})


# --- Dućani (desno gore) ---
zgrada(52, 20, "procelje-bez",  "Pekara",   "bakery",       "pekara")
zgrada(57, 20, "procelje-sivo", "Tržnica",  "market",       "trznica")
zgrada(62, 20, "procelje-bez-2","Konoba",   "tavern",       "konoba")
# --- Školski kvart (lijevo gore) ---
zgrada(5, 6, "procelje-sivo-2", "Škola",     "school",      "skola")
zgrada(10, 6, "procelje-bez",   "Knjižnica", "library",     "knjiznica")
# --- Gornji grad ---
zgrada(30, 4, "procelje-sivo",  "Crkva",     "church",      "crkva")
zgrada(36, 5, "procelje-bez-2", "Vidikovac", "viewpoint",   None)
# --- Stambeno (lijevo dolje) ---
zgrada(4, 33, "procelje-bez",   "Tvoja kuća", "your house", "kuca")
zgrada(9, 33, "procelje-sivo",  "Susjedi",    "neighbours", None)
zgrada(14, 33, "procelje-bez-2","Ambulanta",  "clinic",     "ambulanta")
# --- Zanatska (desno dolje) ---
zgrada(52, 33, "procelje-sivo", "Pošta",   "post office",   "posta")
zgrada(57, 33, "procelje-bez",  "Muzej",   "museum",        "muzej")
zgrada(62, 33, "procelje-sivo-2","Kino",   "cinema",        "kino")
# --- Sportski kvart (skroz desno) ---
zgrada(71, 20, "procelje-sivo", "Dvorana", "sports hall",   "dvorana")
# --- Riva ---
zgrada(24, 40, "procelje-bez-2", "Ribarska kućica", "fisherman's hut", "ribarska")

# ---------------- 4. sportski teren ----------------
pravokutnik(70, 33, 9, 10, "K")
natpisi.append({"x": 72, "y": 32, "hr": "Stadion", "en": "stadium"})

# ---------------- 5. zelenilo i sitnice ----------------
DRVECE = ["drvo-zeleno", "drvo-narancasto", "drvo-tamnozeleno",
          "cempres-zeleni", "cempres-tamni", "drvo-plodovi"]


def slobodno(x, y, w=1, h=2):
    for j in range(y, y + h):
        for i in range(x, x + w):
            if not (0 <= i < W and 0 <= j < H):
                return False
            if teren[j][i] not in "tT123":
                return False
    for o in objekti:
        u = kat.KATALOG.get(o["ime"])
        if not u:
            continue
        ow, oh = u[3], u[4]
        if not (x + w <= o["x"] or o["x"] + ow <= x or y + h <= o["y"] or o["y"] + oh <= y):
            return False
    return True


# park (sredina dolje)
pravokutnik(28, 33, 16, 10, "t")

ZELENE_ZONE = [
    (0, 0, 20, 12, 0.30),     # šumska staza, gusto
    (24, 0, 28, 12, 0.12),    # gornji grad, rijetko
    (56, 0, 24, 12, 0.22),    # sjeveroistok
    (28, 33, 16, 10, 0.26),   # park
    (0, 33, 20, 10, 0.07),    # stambeno, tek pokoje
    (50, 33, 16, 10, 0.07),   # zanatska
    (0, 17, 4, 10, 0.15),
    (44, 17, 6, 10, 0.10),
]
for (zx, zy, zw, zh, gustoca) in ZELENE_ZONE:
    for _ in range(int(zw * zh * gustoca * 2)):
        x, y = zx + r.randrange(zw), zy + r.randrange(zh)
        if slobodno(x, y):
            stavi(r.choice(DRVECE), x, y)
    for _ in range(int(zw * zh * gustoca)):
        x, y = zx + r.randrange(zw), zy + r.randrange(zh)
        if slobodno(x, y, 1, 1):
            stavi(r.choice(["grm", "grm-mali", "grm-cvjetni", "zivica-svijetla"]), x, y)

# drvored uz glavne ceste
for x in range(3, W - 3, 5):
    for y in (11, 26, 43):
        if slobodno(x, y):
            stavi("drvo-zeleno" if x % 10 else "cempres-zeleni", x, y)

# klupe i fenjeri uz ceste
for x in range(4, W - 4, 7):
    for y in (12, 27, 44):
        if teren[y][x] in "tT123":
            stavi(r.choice(["klupa", "fenjer", "kanta"]), x, y)

# štandovi na trgu
for i, x in enumerate(range(31, 41, 3)):
    stavi("tenda-narancasta" if i % 2 else "tenda-zelena", x, 19)
    stavi("sanduk-povrce", x - 1, 23)

# molo i barke na rivi
for x in range(10, 16):
    teren[50][x] = "k"; teren[51][x] = "k"; teren[52][x] = "k"

# ---------------- 6. natpisi po gradu ----------------
for (x, y, hr, en) in [
    (21, 12, "GLAVNA ULICA", "main street"),
    (46, 12, "TRG", "town square"),
    (33, 16, "TRŽNI TRG — utorkom i petkom", "market square — Tuesdays and Fridays"),
    (5, 17, "ŠKOLSKO DVORIŠTE", "school yard"),
    (70, 32, "SPORTSKI CENTAR", "sports centre"),
    (2, 46, "OBALNA CESTA", "coastal road"),
    (12, 49, "LUČICA", "small harbour"),
    (30, 3, "GORNJI GRAD", "upper town"),
]:
    natpisi.append({"x": x, "y": y, "hr": hr, "en": en})
    if teren[y][x] in "tT123k":
        stavi("putokaz-1", x, y)

# ---------------- 7. prolaznost ----------------
prolaz = [[1] * W for _ in range(H)]
for j in range(H):
    for i in range(W):
        if teren[j][i] in NEPROHODNO_TEREN:
            prolaz[j][i] = 0
PROLAZNI_OBJEKTI = {"putokaz-1", "putokaz-2", "putokaz-3"}
for o in objekti:
    u = kat.KATALOG.get(o["ime"])
    if not u:
        continue
    w, h = u[3], u[4]
    for j in range(o["y"], o["y"] + h):
        for i in range(o["x"], o["x"] + w):
            if 0 <= i < W and 0 <= j < H:
                # krošnja drveta je iznad glave — blokira se samo donja pločica
                if h == 2 and j == o["y"] and o["ime"].startswith(("drvo", "cempres")):
                    continue
                prolaz[j][i] = 0
for v in vrata:
    prolaz[v["y"]][v["x"]] = 1

# ---------------- 8. spremi ----------------
podaci = {
    "w": W, "h": H, "T": T,
    "teren": ["".join(red) for red in teren],
    "znakovi": TEREN_ZNAK,
    "prolaz": ["".join(str(c) for c in red) for red in prolaz],
    "objekti": objekti,
    "vrata": vrata,
    "natpisi": natpisi,
    "pocetak": {"x": 5, "y": 40},
}
json.dump(podaci, open("grad-karta.json", "w", encoding="utf-8"), ensure_ascii=False)
print("karta: %d×%d, objekata %d, vrata %d, natpisa %d"
      % (W, H, len(objekti), len(vrata), len(natpisi)))

# ---------------- 9. pregled ----------------
sheets = kat.ucitaj()
plat = Image.new("RGBA", (W * T, H * T))
for j in range(H):
    for i in range(W):
        ime = TEREN_ZNAK[teren[j][i]]
        plat.paste(kat.izrezi(sheets, kat.KATALOG[ime]), (i * T, j * T))
for o in sorted(objekti, key=lambda o: o["y"]):
    u = kat.KATALOG.get(o["ime"])
    if u:
        plat.alpha_composite(kat.izrezi(sheets, u), (o["x"] * T, o["y"] * T))
lik = kat.izrezi(sheets, kat.LIKOVI["lik-0-0"])
plat.alpha_composite(lik, (podaci["pocetak"]["x"] * T, podaci["pocetak"]["y"] * T))
plat.convert("RGB").save("grad-pregled.png")
print("pregled: grad-pregled.png", plat.size)
