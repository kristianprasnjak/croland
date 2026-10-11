# Dvorac Vrana — slike

1. `generiraj-dvorac.bat` (korijen projekta) → Gemini slike u `redizajn/dvorac/novo/` prema `popis.json`
   (pozadine soba, naslovna, predmeti u inačicama A i B; parovi star/nov, puna/prazna bačva,
   knjige i kutije tajne sobe rade se kao izmjena istog crteža, da se razlikuju samo u jednome).
2. `python redizajn/dvorac/obradi.py redizajn/dvorac/novo "mini-igre/mini games media/dvorac" A redizajn/dvorac/izbor.json`
   - predmet se izreže iz originala i uzorkuje izravno na zadanu veličinu u art pikselima (popis VEL u skripti),
     pa su svi predmeti i pozadine iste gustoće piksela; tamni obrub ima prednost
   - cijeli set predmeta dijeli jednu paletu (56 boja)
   - pozadine: kvadrat → 160 polja širine, donjih 96 redaka, malo tamnije i hladnije (predmeti iskaču)
   - knjige dobivaju znak na koricama nacrtan pikselima (Gemini znak je premalen)
   - puna bačva: mlaz i čaša vina; prazna: otvoren vrh i paučina (dorisano pikselima)
   - `izbor.json` kaže koja inačica (A/B) ide u igru
   - zapisuje `velicine.json`; njega igra ima ugrađenog (blok VEL u 04-tvrdjava.html)
3. Predmet bez slike igra crta maskom iz koda, pa radi i s nepotpunim setom.
Treba: numpy, scipy, scikit-image, Pillow; `obradi.py` uvozi `redizajn/pikseli.py`.
