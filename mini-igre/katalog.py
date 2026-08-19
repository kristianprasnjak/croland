# -*- coding: utf-8 -*-
"""
katalog.py — imenovani katalog Kenney pločica za igru Grad.

Svaki unos:  ime: (sheet, stupac, redak, širina, visina)
  sheet 'R' = roguelikeSheet_magenta.png (57×31 pločica, 16px, razmak 1px)
  sheet 'U' = tilemap_packed.png         (27×18 pločica, 16px, bez razmaka)

    python katalog.py            # napravi provjera-katalog.png i grad-atlas.json
"""
import json, os
from PIL import Image, ImageDraw

T = 16
BAZA = "/mnt/user-data/uploads/croland app v0.11/Kenney"

KATALOG = {
    # ---------- teren ----------
    "trava":              ("R", 5, 0, 1, 1),
    "trava-2":            ("R", 5, 1, 1, 1),
    "trava-cvijece-narancasto": ("R", 3, 7, 1, 1),
    "trava-cvijece-bijelo":     ("R", 3, 10, 1, 1),
    "trava-cvijece-plavo":      ("R", 3, 13, 1, 1),
    "zemlja":             ("R", 6, 0, 1, 1),
    "zemlja-2":           ("R", 6, 1, 1, 1),
    "kamen":              ("R", 7, 0, 1, 1),
    "kamen-2":            ("R", 7, 1, 1, 1),
    "pijesak":            ("R", 8, 0, 1, 1),
    "pijesak-2":          ("R", 8, 1, 1, 1),
    "kaldrma":            ("R", 9, 0, 1, 1),
    "more":               ("R", 0, 0, 1, 1),
    "more-2":             ("R", 1, 0, 1, 1),
    "more-val":           ("R", 1, 1, 1, 1),
    "bazen":              ("R", 2, 0, 3, 3),

    # ---------- zidovi i granice (uzorci) ----------
    "zid-cigla-smedja":   ("R", 5, 2, 1, 1),
    "zid-cigla-siva":     ("R", 6, 2, 1, 1),
    "zid-cigla-bijela":   ("R", 7, 2, 1, 1),
    "zid-kamen":          ("R", 8, 2, 1, 1),
    "zid-kamen-2":        ("R", 9, 2, 1, 1),

    # ---------- drveće i zelenilo (2 pločice visine) ----------
    "drvo-zeleno":        ("R", 13, 10, 1, 2),
    "drvo-narancasto":    ("R", 14, 10, 1, 2),
    "drvo-tamnozeleno":   ("R", 15, 10, 1, 2),
    "cempres-zeleni":     ("R", 16, 10, 1, 2),
    "cempres-narancasti": ("R", 17, 10, 1, 2),
    "cempres-tamni":      ("R", 18, 10, 1, 2),
    "zivica-svijetla":    ("R", 19, 10, 1, 1),
    "zivica-tamna":       ("R", 19, 11, 1, 1),
    "grm":                ("R", 22, 10, 1, 1),
    "drvo-plodovi":       ("R", 23, 10, 1, 2),
    "grm-cvjetni":        ("R", 24, 10, 1, 2),
    "grm-mali":           ("R", 26, 10, 1, 2),
    "suho-drvo":          ("R", 27, 10, 1, 2),

    # ---------- krovovi ----------
    "krov-bez":           ("R", 13, 21, 3, 4),
    "krov-smedji":        ("R", 20, 21, 3, 4),
    "krov-sivi":          ("R", 27, 21, 3, 4),

    # ---------- pročelja zgrada ----------
    "procelje-bez":       ("R", 13, 12, 3, 6),
    "procelje-sivo":      ("R", 20, 12, 3, 6),
    "procelje-bez-2":     ("R", 16, 12, 3, 6),
    "procelje-sivo-2":    ("R", 23, 12, 3, 6),

    # ---------- tržnica ----------
    "tenda-narancasta":   ("R", 10, 0, 1, 3),
    "tenda-zelena":       ("R", 11, 0, 1, 3),
    "polica-hrana":       ("R", 13, 6, 1, 1),
    "sanduk-povrce":      ("R", 15, 6, 3, 1),
    "stol-dugi":          ("R", 19, 6, 4, 1),

    # ---------- namještaj ----------
    "ognjiste":           ("R", 13, 0, 1, 1),
    "putokaz-1":          ("R", 19, 0, 1, 1),
    "putokaz-2":          ("R", 20, 0, 1, 1),
    "putokaz-3":          ("R", 21, 0, 1, 1),
    "bacva":              ("R", 23, 0, 1, 1),
    "krevet":             ("R", 14, 2, 1, 2),
    "stolica":            ("R", 19, 2, 1, 1),
    "ormar":              ("R", 28, 3, 1, 2),
    "zrcalo":             ("R", 29, 3, 1, 1),
    "svijeca":            ("R", 16, 7, 1, 1),
    "svijecnjak":         ("R", 19, 8, 1, 1),
    "slika-na-zidu":      ("R", 23, 7, 1, 1),
    "sat":                ("R", 27, 8, 1, 1),
    "komoda":             ("R", 23, 5, 1, 1),

    # ---------- interijeri ----------
    "pod-drveni":         ("R", 6, 3, 1, 1),
    "pod-kamen":          ("R", 7, 3, 1, 1),
    "pod-bijeli":         ("R", 7, 4, 1, 1),
    "pod-smedji":         ("R", 5, 4, 1, 1),
    "zid-unut":           ("R", 8, 3, 1, 1),
    "zid-unut-2":         ("R", 9, 3, 1, 1),
    "polica-knjige":      ("R", 28, 0, 1, 2),
    "pult":               ("R", 19, 6, 1, 1),
    "stol":               ("R", 16, 0, 1, 1),
    "klupa-drvena":       ("R", 18, 4, 1, 1),
    "sanduk":             ("R", 24, 0, 1, 1),

    # ---------- urbano ----------
    "plocnik":            ("U", 9, 1, 1, 1),
    "cesta":              ("U", 1, 16, 1, 1),
    "zebra":              ("U", 3, 16, 1, 1),
    "fenjer":             ("U", 0, 6, 1, 2),
    "klupa":              ("U", 6, 10, 1, 1),
    "ograda-mrezasta":    ("U", 4, 13, 1, 1),
    "drvo-urbano":        ("U", 16, 8, 1, 2),
    "kanta":              ("U", 10, 9, 1, 1),
    "asfalt-crta":        ("U", 3, 17, 1, 1),
    "semafor":            ("U", 6, 6, 1, 2),
    "znak":               ("U", 4, 6, 1, 2),
    "sanduk-voce":        ("U", 4, 11, 1, 1),
    "sanduk-povrce-u":    ("U", 5, 11, 1, 1),
    "klupa-zelena":       ("U", 4, 12, 1, 1),
    "stepenice":          ("U", 0, 12, 2, 3),
    "auto-narancasti":    ("U", 16, 15, 1, 2),
    "auto-crveni":        ("U", 16, 17, 1, 1),
    "vrata-drvena":       ("U", 13, 11, 1, 1),
    "prozor":             ("U", 12, 12, 1, 2),
}

# likovi iz urbanog seta: 4 stupca × 18 redaka = 72 sličice
LIKOVI = {}
for i in range(6):          # 6 skupina po 3 retka
    for j in range(4):      # 4 lika po skupini
        LIKOVI["lik-%d-%d" % (i, j)] = ("U", 23 + j, i * 3, 1, 1)


def ucitaj():
    r = Image.open(os.path.join(BAZA, "Spritesheet", "roguelikeSheet_magenta.png")).convert("RGBA")
    cist = Image.new("RGBA", ((r.width + 1) // 17 * T, (r.height + 1) // 17 * T))
    for row in range((r.height + 1) // 17):
        for col in range((r.width + 1) // 17):
            cist.paste(r.crop((col * 17, row * 17, col * 17 + T, row * 17 + T)), (col * T, row * T))
    u = Image.open(os.path.join(BAZA, "Tilemap", "tilemap_packed.png")).convert("RGBA")
    return {"R": cist, "U": u}


def bez_magente(im):
    im = im.convert("RGBA"); px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            R, G, B, A = px[x, y]
            if R > 200 and B > 200 and G < 80:
                px[x, y] = (0, 0, 0, 0)
    return im


def izrezi(sheets, unos):
    s, c, r, w, h = unos
    return bez_magente(sheets[s].crop((c * T, r * T, (c + w) * T, (r + h) * T)))


def provjera(sheets, izlaz="provjera-katalog.png", U=3):
    stavke = list(KATALOG.items())
    stup = 8
    cw, ch = 76, 96
    red = (len(stavke) + stup - 1) // stup
    plat = Image.new("RGB", (stup * cw, red * ch), (245, 240, 230))
    d = ImageDraw.Draw(plat)
    for i, (ime, unos) in enumerate(stavke):
        cx, cy = (i % stup) * cw, (i // stup) * ch
        im = izrezi(sheets, unos)
        im = im.resize((im.width * U, im.height * U), Image.NEAREST)
        if im.width > cw - 4 or im.height > ch - 22:
            k = min((cw - 4) / im.width, (ch - 22) / im.height)
            im = im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.NEAREST)
        plat.paste(im, (cx + (cw - im.width) // 2, cy + 2 + (ch - 22 - im.height) // 2), im)
        d.rectangle([cx, cy, cx + cw - 1, cy + ch - 1], outline=(210, 200, 185))
        d.text((cx + 3, cy + ch - 18), ime[:15], fill=(40, 33, 24))
        d.text((cx + 3, cy + ch - 9), "%s %d,%d" % (unos[0], unos[1], unos[2]), fill=(140, 128, 114))
    plat.save(izlaz)
    return izlaz


def provjera_likova(sheets, izlaz="provjera-likovi.png", U=4):
    stavke = list(LIKOVI.items())
    stup = 12
    cw, ch = 60, 86
    red = (len(stavke) + stup - 1) // stup
    plat = Image.new("RGB", (stup * cw, red * ch), (245, 240, 230))
    d = ImageDraw.Draw(plat)
    for i, (ime, unos) in enumerate(stavke):
        cx, cy = (i % stup) * cw, (i // stup) * ch
        im = izrezi(sheets, unos)
        im = im.resize((im.width * U, im.height * U), Image.NEAREST)
        plat.paste(im, (cx + (cw - im.width) // 2, cy + 4), im)
        d.text((cx + 3, cy + ch - 16), ime, fill=(40, 33, 24))
        d.text((cx + 3, cy + ch - 7), "%s %d,%d" % (unos[0], unos[1], unos[2]), fill=(140, 128, 114))
    plat.save(izlaz)
    return izlaz


if __name__ == "__main__":
    s = ucitaj()
    print("R:", s["R"].size, " U:", s["U"].size)
    print(provjera(s))
    print(provjera_likova(s))
    sve = dict(KATALOG); sve.update(LIKOVI)
    json.dump({k: {"sheet": v[0], "c": v[1], "r": v[2], "w": v[3], "h": v[4]} for k, v in sve.items()},
              open("grad-atlas.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("unosa u katalogu:", len(sve))
