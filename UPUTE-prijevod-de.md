# Nastavak prijevoda Crolanda na njemački

Napisano 01.10.2026. Brief za sesiju koja nastavlja prijevod. Sve je u `croland-de/` — prvo pročitaj `croland-de/PROCITAJ-ME.md`.

## Postupak (jedna razina po krugu)

Razina N = `lekcija-NN.md`, `vokabular-NN.md`, `gramatika-NN.md`, `praksa-NN.md`, `test-NN.md`. Redom: L4, L5, … L20, na kraju `daily-*.md` i ostalo.

```
cd croland-de
python3 posao.py dump lekcija-NN.md vokabular-NN.md > _radno/en.txt   # numerirani neprevedeni stringovi
# napiši _radno/de.txt: isti brojevi, redak "N<TAB>njemački prijevod"
python3 posao.py upis _radno/de.txt
# isto za gramatika-NN, praksa-NN, test-NN
python3 primijeni.py && python3 provjeri-de.py && python3 posao.py stanje
```

`dump` pamti popis u `_radno/posao.json`; `upis` mora doći prije sljedećeg `dump`.

## Pravila prijevoda

1. Prevodi **samo engleski**. Hrvatski dio retka (*Kava je dobra*, `tab:` ćelije s hrvatskim, `[praznine]`) ostaje znak po znak isti.
2. String koji je zapravo hrvatski (npr. `GRAD`, `star`, `drag`, `on`, `-a`, kategorije `JA/TI`, `More nije toplo.`) → `=`.
3. `en:` prefiks ostaje (`en: Das Haus ist groß.`).
4. Obraćanje *du*, „navodnici“, –, markdown netaknut. Ton kao u engleskom: kratko, toplo, bez birokracije.
5. Mostovi prema engleskom → mostovi prema njemačkom (vidi PROCITAJ-ME). Ne prevodi doslovno „like English …“.
6. Pazi na **odavanje rješenja**: njemački rod/padež u ponuđenom odgovoru ne smije otkriti točan hrvatski odgovor; *Sie sind* označi *(höflich)* ili *(Plural)* kad o tome ovisi odgovor.
7. Isti engleski string = isti njemački prijevod svugdje (memorija to radi sama) — zato prevodi tako da vrijedi u svakom kontekstu, ili dodaj iznimku.
8. „Tap the English meaning“ → „deutsche Bedeutung“; „English above“ → „Oben Deutsch“; gumb **EN** → **DE**.
