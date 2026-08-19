# -*- coding: utf-8 -*-
"""Paleta Crolanda za pixel art — 24 boje. Generira grad-paleta.png kao referencu za Gemini."""
from PIL import Image, ImageDraw

PALETA = [
    ("#2B2118", "tinta — obrub svega"),
    ("#4A3826", "tamna smeđa — sjene, drvo"),
    ("#6E5B48", "smeđa — greda, deblo"),
    ("#8B6142", "srednja smeđa — daske, zemlja"),
    ("#C89B72", "svijetla smeđa — pijesak staze, zid"),
    ("#E8D8A8", "pijesak, žbuka"),
    ("#F3E7D4", "papir — svijetla podloga"),
    ("#FFF8EF", "najsvjetlije — odsjaj, bijelo"),
    ("#3F6B22", "najtamnija zelena — sjena krošnje"),
    ("#5E8F33", "tamna zelena — krošnja"),
    ("#7CB342", "zelena — trava"),
    ("#A8CF7A", "svijetla zelena — osvijetljena trava"),
    ("#2E6E93", "tamno more"),
    ("#4A9BC4", "more"),
    ("#74BEDC", "plitko more, nebo"),
    ("#635A50", "tamni kamen"),
    ("#8C8072", "kamen"),
    ("#B9AC96", "svijetli kamen, kaldrma"),
    ("#8E3B2A", "tamna cigla"),
    ("#C4553D", "cigla, crijep"),
    ("#E8623A", "narančasta — naglasak"),
    ("#E89A2C", "tamno žuta"),
    ("#F4B942", "žuta — Croland naglasak"),
    ("#7B5EA7", "ljubičasta — rijedak naglasak"),
]

def napravi(putanja="grad-paleta.png", kocka=64):
    stup = 6
    red = (len(PALETA) + stup - 1) // stup
    im = Image.new("RGB", (stup * kocka, red * kocka), "#FFF8EF")
    d = ImageDraw.Draw(im)
    for i, (hx, _) in enumerate(PALETA):
        x, y = (i % stup) * kocka, (i // stup) * kocka
        d.rectangle([x, y, x + kocka - 1, y + kocka - 1], fill=hx)
    im.save(putanja)
    return putanja

if __name__ == "__main__":
    print(napravi())
    print("\n".join("%s  %s" % p for p in PALETA))
