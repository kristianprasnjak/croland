# Slikovni izazov — kako se radi novi

Od 20. rujna 2026. daily challenge ima isti oblik kao weekly: **jedna slika, pojmovi
koji se upisuju na hrvatskom**. Razlika je samo u broju — weekly ~20, daily ~5.

## Datoteke

```
izazov/motor.css      izgled (zajednički)
izazov/motor.js       mehanika (zajednička): zum, pan, upis, signal, spremanje
izazov/PREDLOZAK.html kostur novog izazova
daily/<datum>-<id>.html    dnevni izazovi (5 pojmova)
daily/slike/<id>.webp      slike dnevnih izazova
weekly/<datum>-<id>.html   tjedni izazovi (~20 pojmova)
weekly/slike/<id>.webp     slike tjednih izazova
```

Pojedini izazov je ~35 redaka: postavi `window.IZAZOV` i učita motor. Nikakvog
koda, samo podaci.

## Postupak za novi daily

1. **Slika.** Gemini prompt po uzoru na `Weekly challenge/GEMINI-promptovi.md`, ali
   manja scena: 5-8 predmeta, od toga 5 koji se traže. Ista paleta i linija kao
   weekly slike. Bez ijednog slova i broja na slici. 16:9, spremi kao `.webp` u
   `daily/slike/`.
2. **Kopiraj** `izazov/PREDLOZAK.html` u `daily/2026-09-20-kuhinja.html`.
3. **Podaci.** Upiši `id`, `ime`, `stil`, `slika`, prave dimenzije slike (`w`, `h`)
   i `kljuc` (`croland.daily.<id>.<datum>` — ključ mora biti jedinstven, po njemu
   se pamti napredak).
4. **Okviri pojmova.** `x, y, w, h` u postotcima. Najbrže: otvori sliku u pregledniku
   na 1024 px širine, očitaj piksele i podijeli s pravom širinom/visinom × 100.
   Okvir smije biti malo veći od predmeta — prst nije precizan.
5. **Odgovori** (`o`): mala slova, bez kvačica, jednina i množina, akuzativ, čest
   sinonim i dijalektalni oblik (npr. `rajcica` i `paradajz`). Motor sam skida
   kvačice s onoga što igrač upiše, pa ih ovdje ne treba.
6. **Upiši u `index.html`**, u popis `DAILY_SLIKE` — `id`, `dat`, `ime`, `stil`,
   `datum` (ISO, `YYYY-MM-DD`, taj dan se izazov pojavljuje), `pojmova`, `kljuc`, `opis`.
7. **Provjeri** u pregledniku: svaki pojam se pogodi klikom, brojač raste,
   ✨ Show ih redom obasja, na kraju ide konfet.

## Bodovi

Slikovni izazovi ne nose bodove vježbi — kao i weekly. Daily nosi **streak**: kad
igrač nađe svih pet, motor javi aplikaciji (`parent.crolandIzazovGotov`) i dan se
upisuje u niz. Bodovi niza idu u sve četiri valute, kao i dosad.

## Stari format

Dailyji prije 20. rujna 2026. bili su priča + vježbe (`igre/daily-*.md`, `data.js`).
Ostaju kao arhiva i i dalje rade za svoje datume; novi se rade samo u ovom obliku.

## Priča uz sliku (od 27.09.2026.)

Daily dobiva i kratku priču: 3–5 hrvatskih rečenica u kojima se pojmovi sa slike javljaju
u raznim oblicima (*u kadi, iz čaše, pred ogledalom*), i njihovi engleski prijevodi izmiješani
u drugom stupcu. Igrač spaja parove. Jedna rečenica smije pokriti više pojmova.

- U podacima izazova: `recenice: [ {hr:'...', en:'...'}, ... ]` (vidi `daily/2026-09-27-kupaonica.html`).
- Samo pasivna gramatika: oblici se vide, ali se ne traže u upisu.
- Priča je vidljiva cijelo vrijeme: ispod slike na mobitelu (može se skupiti), desno na širokom ekranu.
- Izazov je dovršen (i streak se pali) tek kad su nađeni svi pojmovi **i** spojene sve rečenice.
- Engleski stupac je izmiješan uvijek istim redom za isti izazov, i nijedna rečenica ne stoji
  točno nasuprot svom paru.
- Pravilo tragova vrijedi i ovdje: ime, broj ili internacionalizam ne smije odati par sam od sebe.
- Slika: original ide u `slike nekompresirano/daily/`, a u `daily/slike/` samo WebP 1024 px
  (mapa `daily/` se cijela objavljuje).
