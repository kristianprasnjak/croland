# -*- coding: utf-8 -*-
"""interijeri.py — gradi unutrašnjosti zgrada i sprema ih u interijeri.json"""
import json, os, importlib.util, random

d = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("kat", os.path.join(d, "katalog.py"))
kat = importlib.util.module_from_spec(spec); spec.loader.exec_module(kat)

r = random.Random(7)

# id: (naslov, pod, zid, [(ime, x, y), ...])
SOBE = {
    "kuca": ("Tvoja kuća", "pod-kamen", "zid-unut", [
        ("krevet", 2, 3), ("ormar", 4, 3), ("stol", 8, 4), ("stolica", 7, 4),
        ("stolica", 9, 4), ("sat", 6, 2), ("slika-na-zidu", 10, 2), ("sanduk", 12, 6)]),
    "pekara": ("Pekara", "pod-bijeli", "zid-unut", [
        ("pult", 4, 5), ("pult", 5, 5), ("pult", 6, 5), ("pult", 7, 5),
        ("polica-hrana", 3, 3), ("polica-hrana", 5, 3), ("polica-hrana", 7, 3),
        ("ognjiste", 10, 3), ("sanduk", 12, 6), ("bacva", 2, 7)]),
    "trznica": ("Tržnica", "pod-kamen", "zid-unut-2", [
        ("sanduk-povrce", 2, 4), ("sanduk-povrce", 6, 4), ("sanduk-povrce", 10, 4),
        ("stol-dugi", 2, 6), ("stol-dugi", 8, 6),
        ("tenda-narancasta", 3, 2), ("tenda-zelena", 8, 2), ("bacva", 13, 6)]),
    "konoba": ("Konoba", "pod-smedji", "zid-unut", [
        ("stol", 3, 4), ("stolica", 2, 4), ("stolica", 4, 4),
        ("stol", 8, 4), ("stolica", 7, 4), ("stolica", 9, 4),
        ("stol", 3, 7), ("stolica", 2, 7), ("stolica", 4, 7),
        ("pult", 11, 3), ("pult", 12, 3), ("bacva", 13, 6), ("ognjiste", 6, 2)]),
    "skola": ("Škola", "pod-kamen", "zid-unut", [
        ("klupa-drvena", 3, 5), ("klupa-drvena", 5, 5), ("klupa-drvena", 7, 5),
        ("klupa-drvena", 3, 7), ("klupa-drvena", 5, 7), ("klupa-drvena", 7, 7),
        ("stol", 7, 3), ("polica-knjige", 12, 3), ("sat", 5, 2), ("slika-na-zidu", 9, 2)]),
    "knjiznica": ("Knjižnica", "pod-drveni", "zid-unut", [
        ("polica-knjige", 2, 3), ("polica-knjige", 4, 3), ("polica-knjige", 6, 3),
        ("polica-knjige", 8, 3), ("polica-knjige", 10, 3),
        ("polica-knjige", 2, 6), ("polica-knjige", 4, 6), ("polica-knjige", 6, 6),
        ("pult", 12, 5), ("stol", 12, 7), ("sat", 7, 2)]),
    "posta": ("Pošta", "pod-bijeli", "zid-unut-2", [
        ("pult", 4, 5), ("pult", 5, 5), ("pult", 8, 5), ("pult", 9, 5),
        ("sanduk", 2, 3), ("sanduk", 12, 3), ("komoda", 12, 6), ("sat", 6, 2)]),
    "muzej": ("Muzej", "pod-kamen", "zid-unut-2", [
        ("slika-na-zidu", 3, 2), ("slika-na-zidu", 6, 2), ("slika-na-zidu", 9, 2),
        ("zrcalo", 12, 3), ("komoda", 3, 5), ("komoda", 7, 5), ("komoda", 11, 5),
        ("bacva", 2, 7), ("svijecnjak", 13, 7)]),
    "kino": ("Kino", "pod-smedji", "zid-unut", [
        ("klupa-drvena", 3, 5), ("klupa-drvena", 5, 5), ("klupa-drvena", 7, 5),
        ("klupa-drvena", 9, 5), ("klupa-drvena", 3, 7), ("klupa-drvena", 5, 7),
        ("klupa-drvena", 7, 7), ("klupa-drvena", 9, 7), ("pult", 12, 6)]),
    "ambulanta": ("Ambulanta", "pod-bijeli", "zid-unut", [
        ("krevet", 3, 4), ("krevet", 6, 4), ("krevet", 9, 4),
        ("komoda", 12, 4), ("klupa-drvena", 3, 7), ("klupa-drvena", 5, 7),
        ("sat", 7, 2), ("zrcalo", 12, 2)]),
    "crkva": ("Crkva", "pod-kamen", "zid-unut-2", [
        ("klupa-drvena", 4, 5), ("klupa-drvena", 6, 5), ("klupa-drvena", 8, 5),
        ("klupa-drvena", 4, 7), ("klupa-drvena", 6, 7), ("klupa-drvena", 8, 7),
        ("svijecnjak", 3, 3), ("svijecnjak", 11, 3), ("stol", 7, 3)]),
    "dvorana": ("Sportska dvorana", "pod-drveni", "zid-unut", [
        ("klupa-drvena", 2, 7), ("klupa-drvena", 4, 7), ("klupa-drvena", 12, 7),
        ("sanduk", 2, 3), ("sanduk", 13, 3), ("sat", 7, 2)]),
    "ribarska": ("Ribarska kućica", "pod-smedji", "zid-unut", [
        ("bacva", 2, 3), ("bacva", 3, 3), ("sanduk", 12, 3), ("sanduk", 12, 4),
        ("stol", 6, 5), ("stolica", 5, 5), ("ognjiste", 9, 2)]),
}

W, H = 22, 12   # točno vidno polje, pa nema praznine oko sobe
izlaz = {}
for sid, (naslov, pod, zid, namjestaj) in SOBE.items():
    teren = [[pod] * W for _ in range(H)]
    for i in range(W):
        teren[0][i] = zid
        teren[1][i] = zid
    prolaz = [[1] * W for _ in range(H)]
    for i in range(W):
        prolaz[0][i] = 0; prolaz[1][i] = 0; prolaz[H - 1][i] = 0
    for j in range(H):
        prolaz[j][0] = 0; prolaz[j][W - 1] = 0
    namjestaj = list(namjestaj) + [("bacva", 18, 3), ("sanduk", 19, 8), ("slika-na-zidu", 16, 2)]
    objekti = []
    for (ime, x, y) in namjestaj:
        u = kat.KATALOG.get(ime)
        if not u:
            continue
        objekti.append({"ime": ime, "x": x, "y": y})
        for jj in range(y, y + u[4]):
            for ii in range(x, x + u[3]):
                if 0 <= ii < W and 0 <= jj < H:
                    prolaz[jj][ii] = 0
    # izlaz: otirač na dnu u sredini
    vx, vy = W // 2, H - 2
    prolaz[vy][vx] = 1
    prolaz[H - 1][vx] = 1
    izlaz[sid] = {
        "naslov": naslov, "w": W, "h": H,
        "pod": pod, "zid": zid,
        "teren": [[c for c in red] for red in teren],
        "prolaz": ["".join(str(c) for c in red) for red in prolaz],
        "objekti": objekti,
        "izlaz": {"x": vx, "y": H - 1},
        "ulaz": {"x": vx, "y": vy},
    }

json.dump(izlaz, open(os.path.join(d, "interijeri.json"), "w", encoding="utf-8"), ensure_ascii=False)
print("interijera:", len(izlaz))
