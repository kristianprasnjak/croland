# Redizajn slika — „čisto i mirno“

Originali se ne diraju: `slike/` i `slike nekompresirano/` ostaju kakve jesu.

## Mrlje iza ilustracija

    python redizajn/mrlje.py "slike nekompresirano" redizajn/bez-mrlja Kava.png Sir.png
    python redizajn/uokviri.py redizajn/bez-mrlja slike-cisto

`mrlje.py` briše ravnu mrlju i kapljice oko predmeta i ostavlja bijelu pozadinu.
Kod slika gdje se mrlja vidi kroz predmet (ručka šalice, staklo) treba ih dodati
u popis `RUPE` u skripti. `uokviri.py` izreže predmet, centrira ga i spremi kao
512×512 webp u `slike-cisto/`. Treba Python s paketima numpy, scipy,
scikit-image i Pillow.

Igre prvo traže sliku u `slike-cisto/`, pa u `slike/`, pa pokažu emoji.

## Nove slike za Konobu (Gemini)

1. U `.env` u korijenu projekta dodaj redak `GEMINI_API_KEY=tvoj_ključ`
   (ključ iz Google AI Studija, s uključenim plaćanjem).
2. Dvoklik na `generiraj-konoba.bat`.
3. Slike stižu u `redizajn/konoba/novo/` — po 2 varijante za 11 jela i 12 gostiju
   (46 slika, oko 1,5 $ s modelom Nano Banana 2.1 u 1K).

Samo neke stavke: `generiraj-konoba.bat Čaj gost-03`;
još varijanti iako postoje: `generiraj-konoba.bat --ponovno Čaj`.
Opisi i stil su u `redizajn/konoba/popis.json`.
