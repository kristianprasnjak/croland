# Grad v2 — popis slika za proizvodnju

Sve za igru `01-grad`. Bez animacija — **jedna sličica po stavci, jedan frame**.
Ilustracije riječi (`rijec-*.png`) nisu ovdje: one su zajedničke svim igrama i
mogu zauvijek ostati emoji.

| razina | komada | ukupno piksela | stane u kvadrat |
|---|---|---|---|
| Razina 1 — obavezno | 60 | 327.168 | 572×572 |
| Razina 2 — portreti | 38 | 155.648 | 395×395 |
| Razina 3 — likovi na karti | 37 | 56.832 | 239×239 |
| Razina 4 — interijeri i sitnice | 45 | 76.800 | 278×278 |
| **sve zajedno** | **180** | **616.448** | **786×786** |

Za osjećaj mjere: **cijela obavezna razina 1 stane u jednu sliku 572×572** —
manje piksela nego jedna današnja fotografija iz mape `slike/`.

---

## Pravila za sve slike

| | |
|---|---|
| osnovna pločica | **32×32 px** |
| format | PNG, prozirna pozadina, bez anti-aliasa |
| paleta | **16–24 boje za cijelu igru**, zajednička svim slikama |
| skaliranje u igri | ×1 na mobitelu, ×2 na računalu (cijeli broj, nikad 1,5×) |
| lik | 32×48 — stopala na dnu okvira, glava viri iznad pločice |
| zgrada | višekratnik 32; vrata su **uvijek u donjem redu**, poravnata s pločicom |
| sjena | ne crta se u sličicu — dodaje je igra iz `grad-sjena.png` |
| naziv datoteke | bez kvačica i razmaka, točno kako piše u tablicama |
| gdje ide | `mini-igre/mini games media/`, bez podmapa |

Dok datoteka ne postoji, igra crta emoji zamjenu — pa se može ubacivati komad
po komad, bez ijedne izmjene koda.

### Što ostaje emoji (namjerno)

Klupe, fenjeri, sandučići, bicikli, koševi, table, sav namještaj u interijerima,
sve ikone sučelja, svi sporedni likovi i svih 903 ilustracije riječi. Emoji pada
samo ondje gdje se pločice moraju spajati preko ruba — a to je točno razina 1.

---

## Razina 1 — teren — 20 kom · 20.480 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-teren-trava-1.png` | 32×32 | osnovna trava, mirna tekstura bez uzorka koji se ponavlja |
| 2 | `grad-teren-trava-2.png` | 32×32 | trava, varijanta s nekoliko vlati — razbija ponavljanje |
| 3 | `grad-teren-trava-3.png` | 32×32 | trava s kamenčićem, rijetka varijanta (1 od 10 pločica) |
| 4 | `grad-teren-trava-cvijece.png` | 32×32 | trava s tri-četiri sitna cvijeta |
| 5 | `grad-teren-zemlja.png` | 32×32 | utabana zemljana staza, park i šumska staza |
| 6 | `grad-teren-kaldrma.png` | 32×32 | kaldrma, glavna ulica i trg |
| 7 | `grad-teren-plocnik.png` | 32×32 | betonski pločnik uz ceste |
| 8 | `grad-teren-pijesak.png` | 32×32 | plaža |
| 9 | `grad-teren-more.png` | 32×32 | morska površina, statična, bez pjene |
| 10 | `grad-teren-more-plitko.png` | 32×32 | plićak — svjetliji ton, ide uz obalu |
| 11 | `grad-teren-potok.png` | 32×32 | voda u parku, uža nijansa od mora |
| 12 | `grad-teren-most.png` | 32×32 | daske mosta preko potoka |
| 13 | `grad-teren-stube.png` | 32×32 | kamene stube, Ulica stube i Gornji grad |
| 14 | `grad-teren-parket.png` | 32×32 | parket sportske dvorane |
| 15 | `grad-teren-travnjak-1.png` | 32×32 | travnjak stadiona, svjetlija pruga |
| 16 | `grad-teren-travnjak-2.png` | 32×32 | travnjak stadiona, tamnija pruga |
| 17 | `grad-teren-atletska-staza.png` | 32×32 | crvena tartan staza oko stadiona |
| 18 | `grad-teren-crta.png` | 32×32 | bijela crta igrališta, ravni komad |
| 19 | `grad-teren-rub-trava-staza.png` | 32×32 | prijelaz trava→staza, jedan rub (ostatak se dobiva rotacijom) |
| 20 | `grad-teren-rub-trava-pijesak.png` | 32×32 | prijelaz trava→pijesak |

## Razina 1 — granice — 6 kom · 6.144 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-zid-kameni.png` | 32×32 | suhozid, granica zona i vrtova |
| 2 | `grad-ograda-drvena.png` | 32×32 | drvena ograda, vodoravni komad |
| 3 | `grad-ograda-mrezasta.png` | 32×32 | mrežasta ograda, stadion i igralište |
| 4 | `grad-zivica.png` | 32×32 | živica oko parka |
| 5 | `grad-obala-kamena.png` | 32×32 | kameni rub obale prema moru |
| 6 | `grad-molo-rub.png` | 32×32 | rub mola u lučici, daske i bitva |

## Razina 1 — zgrade — 17 kom · 248.832 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-zgrada-kuca-igrac.png` | 128×96 | tvoja kuća — prepoznatljiva, drukčija boja škura |
| 2 | `grad-zgrada-kuca-1.png` | 96×96 | obična kuća, varijanta A |
| 3 | `grad-zgrada-kuca-2.png` | 96×96 | obična kuća, varijanta B |
| 4 | `grad-zgrada-kuca-3.png` | 96×96 | obična kuća, varijanta C — dvokatnica |
| 5 | `grad-zgrada-knjiznica.png` | 128×96 | knjižnica, veliki prozori |
| 6 | `grad-zgrada-skola.png` | 160×128 | škola, ulaz sa stubama, sat na pročelju |
| 7 | `grad-zgrada-pekara.png` | 128×96 | pekara, izlog s kruhom, tenda |
| 8 | `grad-zgrada-trznica.png` | 160×96 | natkrivena tržnica, otvorena strana sa štandovima |
| 9 | `grad-zgrada-konoba.png` | 128×96 | konoba, stolovi ispred, loza |
| 10 | `grad-zgrada-posta.png` | 128×96 | pošta, žuti detalj, sandučić uz ulaz |
| 11 | `grad-zgrada-muzej.png` | 160×128 | muzej, stupovi, kameno pročelje |
| 12 | `grad-zgrada-kino.png` | 128×96 | kino, plakat i natpis |
| 13 | `grad-zgrada-ambulanta.png` | 128×96 | ambulanta, bijelo pročelje |
| 14 | `grad-zgrada-crkva.png` | 128×160 | crkva sa zvonikom — najviša građevina u gradu |
| 15 | `grad-zgrada-ribarska-kucica.png` | 96×96 | ribarska kućica na rivi, mreže uz zid |
| 16 | `grad-zgrada-dvorana.png` | 192×128 | sportska dvorana, zaobljeni krov, veliki ulaz |
| 17 | `grad-zgrada-stadion.png` | 192×128 | ulaz na stadion s dijelom tribine |

## Razina 1 — krupni objekti — 12 kom · 45.056 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-objekt-drvo-1.png` | 64×64 | listopadno drvo, gusta krošnja |
| 2 | `grad-objekt-drvo-2.png` | 64×64 | drvo, druga silueta — za raznolikost |
| 3 | `grad-objekt-cempres.png` | 32×64 | čempres, Gornji grad i groblje |
| 4 | `grad-objekt-palma.png` | 64×80 | palma na rivi |
| 5 | `grad-objekt-grm.png` | 32×32 | grm, popuna uz zidove |
| 6 | `grad-objekt-fontana.png` | 64×64 | fontana na trgu |
| 7 | `grad-objekt-paviljon.png` | 96×64 | paviljon u parku, otvoren |
| 8 | `grad-objekt-tribina.png` | 96×64 | komad tribine, ponavlja se vodoravno |
| 9 | `grad-objekt-gol.png` | 64×48 | nogometni gol s mrežom |
| 10 | `grad-objekt-kos.png` | 32×64 | košarkaški koš na stupu |
| 11 | `grad-objekt-semafor.png` | 64×48 | semafor s rezultatom na stadionu |
| 12 | `grad-objekt-vidikovac.png` | 64×64 | kameni vidikovac s ogradom, Gornji grad |

## Razina 1 — igrač — 4 kom · 6.144 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-lik-igrac-d.png` | 32×48 | igrač okrenut prema dolje (prema gledatelju) |
| 2 | `grad-lik-igrac-g.png` | 32×48 | igrač okrenut prema gore (leđa) |
| 3 | `grad-lik-igrac-l.png` | 32×48 | igrač okrenut lijevo |
| 4 | `grad-lik-igrac-r.png` | 32×48 | igrač okrenut desno (može biti zrcaljeni lijevi) |

## Razina 1 — pomoćno — 1 kom · 512 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-sjena.png` | 32×16 | zajednička ovalna sjena ispod svakog emoji-objekta |

## Razina 2 — portreti — 38 kom · 155.648 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-portret-igrac.png` | 64×64 | portret uz replike igrača |
| 2 | `grad-portret-mara.png` | 64×64 | portret uz repliku — Baka Mara, susjeda |
| 3 | `grad-portret-tomislav.png` | 64×64 | portret uz repliku — susjed Tomislav |
| 4 | `grad-portret-iva.png` | 64×64 | portret uz repliku — blizanka Iva |
| 5 | `grad-portret-ana.png` | 64×64 | portret uz repliku — blizanka Ana |
| 6 | `grad-portret-bruno.png` | 64×64 | portret uz repliku — knjižničar Bruno |
| 7 | `grad-portret-svirac.png` | 64×64 | portret uz repliku — ulični svirač |
| 8 | `grad-portret-novinarka.png` | 64×64 | portret uz repliku — prodavačica novina |
| 9 | `grad-portret-starac.png` | 64×64 | portret uz repliku — starac na klupi |
| 10 | `grad-portret-vesna.png` | 64×64 | portret uz repliku — prodavačica u pekari Vesna |
| 11 | `grad-portret-jela.png` | 64×64 | portret uz repliku — Jela s tržnice |
| 12 | `grad-portret-ivo.png` | 64×64 | portret uz repliku — konobar Ivo |
| 13 | `grad-portret-dostavljac.png` | 64×64 | portret uz repliku — dostavljač |
| 14 | `grad-portret-damir.png` | 64×64 | portret uz repliku — učitelj Damir |
| 15 | `grad-portret-luka.png` | 64×64 | portret uz repliku — dječak Luka |
| 16 | `grad-portret-sara.png` | 64×64 | portret uz repliku — učenica Sara |
| 17 | `grad-portret-kata.png` | 64×64 | portret uz repliku — spremačica Kata |
| 18 | `grad-portret-zoran.png` | 64×64 | portret uz repliku — poštar Zoran |
| 19 | `grad-portret-nada.png` | 64×64 | portret uz repliku — šalterica Nada |
| 20 | `grad-portret-ema.png` | 64×64 | portret uz repliku — Ema iz muzeja |
| 21 | `grad-portret-filip.png` | 64×64 | portret uz repliku — čuvar Filip |
| 22 | `grad-portret-razvodnik.png` | 64×64 | portret uz repliku — razvodnik u kinu |
| 23 | `grad-portret-zupnik.png` | 64×64 | portret uz repliku — župnik |
| 24 | `grad-portret-ruza.png` | 64×64 | portret uz repliku — starica Ruža |
| 25 | `grad-portret-klesar.png` | 64×64 | portret uz repliku — klesar |
| 26 | `grad-portret-slaven.png` | 64×64 | portret uz repliku — vozač Slaven |
| 27 | `grad-portret-mate.png` | 64×64 | portret uz repliku — ribar Mate |
| 28 | `grad-portret-anka.png` | 64×64 | portret uz repliku — ribarica Anka |
| 29 | `grad-portret-turist.png` | 64×64 | portret uz repliku — turist s kartom |
| 30 | `grad-portret-djeca.png` | 64×64 | portret uz repliku — djeca koja pecaju |
| 31 | `grad-portret-vrtlar.png` | 64×64 | portret uz repliku — vrtlar |
| 32 | `grad-portret-zena-psom.png` | 64×64 | portret uz repliku — žena sa psom |
| 33 | `grad-portret-petra.png` | 64×64 | portret uz repliku — liječnica Petra |
| 34 | `grad-portret-boris.png` | 64×64 | portret uz repliku — trener Boris |
| 35 | `grad-portret-dario.png` | 64×64 | portret uz repliku — vratar Dario |
| 36 | `grad-portret-lana.png` | 64×64 | portret uz repliku — atletičarka Lana |
| 37 | `grad-portret-stipe.png` | 64×64 | portret uz repliku — domar Stipe |
| 38 | `grad-portret-kreso.png` | 64×64 | portret uz repliku — navijač Krešo |

## Razina 3 — likovi na karti — 37 kom · 56.832 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-lik-mara.png` | 32×48 | lik na karti, jedan pogled — Baka Mara, susjeda |
| 2 | `grad-lik-tomislav.png` | 32×48 | lik na karti, jedan pogled — susjed Tomislav |
| 3 | `grad-lik-iva.png` | 32×48 | lik na karti, jedan pogled — blizanka Iva |
| 4 | `grad-lik-ana.png` | 32×48 | lik na karti, jedan pogled — blizanka Ana |
| 5 | `grad-lik-bruno.png` | 32×48 | lik na karti, jedan pogled — knjižničar Bruno |
| 6 | `grad-lik-svirac.png` | 32×48 | lik na karti, jedan pogled — ulični svirač |
| 7 | `grad-lik-novinarka.png` | 32×48 | lik na karti, jedan pogled — prodavačica novina |
| 8 | `grad-lik-starac.png` | 32×48 | lik na karti, jedan pogled — starac na klupi |
| 9 | `grad-lik-vesna.png` | 32×48 | lik na karti, jedan pogled — prodavačica u pekari Vesna |
| 10 | `grad-lik-jela.png` | 32×48 | lik na karti, jedan pogled — Jela s tržnice |
| 11 | `grad-lik-ivo.png` | 32×48 | lik na karti, jedan pogled — konobar Ivo |
| 12 | `grad-lik-dostavljac.png` | 32×48 | lik na karti, jedan pogled — dostavljač |
| 13 | `grad-lik-damir.png` | 32×48 | lik na karti, jedan pogled — učitelj Damir |
| 14 | `grad-lik-luka.png` | 32×48 | lik na karti, jedan pogled — dječak Luka |
| 15 | `grad-lik-sara.png` | 32×48 | lik na karti, jedan pogled — učenica Sara |
| 16 | `grad-lik-kata.png` | 32×48 | lik na karti, jedan pogled — spremačica Kata |
| 17 | `grad-lik-zoran.png` | 32×48 | lik na karti, jedan pogled — poštar Zoran |
| 18 | `grad-lik-nada.png` | 32×48 | lik na karti, jedan pogled — šalterica Nada |
| 19 | `grad-lik-ema.png` | 32×48 | lik na karti, jedan pogled — Ema iz muzeja |
| 20 | `grad-lik-filip.png` | 32×48 | lik na karti, jedan pogled — čuvar Filip |
| 21 | `grad-lik-razvodnik.png` | 32×48 | lik na karti, jedan pogled — razvodnik u kinu |
| 22 | `grad-lik-zupnik.png` | 32×48 | lik na karti, jedan pogled — župnik |
| 23 | `grad-lik-ruza.png` | 32×48 | lik na karti, jedan pogled — starica Ruža |
| 24 | `grad-lik-klesar.png` | 32×48 | lik na karti, jedan pogled — klesar |
| 25 | `grad-lik-slaven.png` | 32×48 | lik na karti, jedan pogled — vozač Slaven |
| 26 | `grad-lik-mate.png` | 32×48 | lik na karti, jedan pogled — ribar Mate |
| 27 | `grad-lik-anka.png` | 32×48 | lik na karti, jedan pogled — ribarica Anka |
| 28 | `grad-lik-turist.png` | 32×48 | lik na karti, jedan pogled — turist s kartom |
| 29 | `grad-lik-djeca.png` | 32×48 | lik na karti, jedan pogled — djeca koja pecaju |
| 30 | `grad-lik-vrtlar.png` | 32×48 | lik na karti, jedan pogled — vrtlar |
| 31 | `grad-lik-zena-psom.png` | 32×48 | lik na karti, jedan pogled — žena sa psom |
| 32 | `grad-lik-petra.png` | 32×48 | lik na karti, jedan pogled — liječnica Petra |
| 33 | `grad-lik-boris.png` | 32×48 | lik na karti, jedan pogled — trener Boris |
| 34 | `grad-lik-dario.png` | 32×48 | lik na karti, jedan pogled — vratar Dario |
| 35 | `grad-lik-lana.png` | 32×48 | lik na karti, jedan pogled — atletičarka Lana |
| 36 | `grad-lik-stipe.png` | 32×48 | lik na karti, jedan pogled — domar Stipe |
| 37 | `grad-lik-kreso.png` | 32×48 | lik na karti, jedan pogled — navijač Krešo |

## Razina 4 — interijeri i sitnice — 45 kom · 76.800 px

| # | datoteka | veličina | što je |
|---|---|---|---|
| 1 | `grad-unut-pod-drveni.png` | 32×32 | drveni pod — kuća, knjižnica |
| 2 | `grad-unut-pod-plocice.png` | 32×32 | pločice — ambulanta, pekara |
| 3 | `grad-unut-pod-kamen.png` | 32×32 | kameni pod — crkva, muzej |
| 4 | `grad-unut-pod-tepison.png` | 32×32 | tepison — kino, škola |
| 5 | `grad-unut-zid-1.png` | 32×32 | unutarnji zid, obojan |
| 6 | `grad-unut-zid-2.png` | 32×32 | unutarnji zid s lamperijom |
| 7 | `grad-unut-zid-3.png` | 32×32 | kameni unutarnji zid |
| 8 | `grad-unut-prozor.png` | 32×32 | unutarnji prozor |
| 9 | `grad-unut-vrata.png` | 32×32 | unutarnja vrata / izlaz |
| 10 | `grad-unut-otirac.png` | 32×32 | otirač na izlazu — mjesto povratka van |
| 11 | `grad-unut-pult-drveni.png` | 64×32 | pult, konoba i pekara |
| 12 | `grad-unut-pult-kamen.png` | 64×32 | kameni pult, tržnica |
| 13 | `grad-unut-salter.png` | 64×32 | šalter s pregradom, pošta |
| 14 | `grad-unut-police-knjige.png` | 32×64 | police s knjigama |
| 15 | `grad-unut-police-roba.png` | 32×64 | police s robom |
| 16 | `grad-unut-vitrina.png` | 64×32 | staklena vitrina — muzej, pekara |
| 17 | `grad-unut-stand-1.png` | 64×48 | tržnični štand s voćem |
| 18 | `grad-unut-stand-2.png` | 64×48 | tržnični štand s povrćem |
| 19 | `grad-unut-stol.png` | 64×32 | stol |
| 20 | `grad-unut-stolica.png` | 32×32 | stolica |
| 21 | `grad-unut-klupa-skolska.png` | 64×32 | školska klupa |
| 22 | `grad-unut-ploca.png` | 64×48 | školska ploča |
| 23 | `grad-unut-krevet.png` | 32×64 | krevet |
| 24 | `grad-unut-ormar.png` | 32×64 | ormar |
| 25 | `grad-unut-pec.png` | 32×48 | krušna peć |
| 26 | `grad-unut-kasa.png` | 32×32 | blagajna |
| 27 | `grad-unut-sanduk.png` | 32×32 | sanduk / kutija |
| 28 | `grad-unut-tepih-1.png` | 64×64 | tepih, topli ton |
| 29 | `grad-unut-tepih-2.png` | 64×64 | tepih, hladni ton |
| 30 | `grad-unut-sat.png` | 32×32 | zidni sat |
| 31 | `grad-unut-biljka.png` | 32×32 | biljka u loncu |
| 32 | `grad-unut-oltar.png` | 64×48 | oltar u crkvi |
| 33 | `grad-unut-klupa-crkva.png` | 64×32 | crkvena klupa |
| 34 | `grad-unut-svijecnjak.png` | 32×48 | svijećnjak |
| 35 | `grad-unut-mreza.png` | 32×32 | ribarska mreža na zidu |
| 36 | `grad-unut-sanduk-riba.png` | 32×32 | sanduk s ribom |
| 37 | `grad-unut-svlacionica-klupa.png` | 64×32 | klupa u svlačionici |
| 38 | `grad-unut-ormaric.png` | 32×48 | ormarić u svlačionici |
| 39 | `grad-vanj-klupa.png` | 64×32 | klupa u parku i na trgu |
| 40 | `grad-vanj-fenjer.png` | 32×64 | ulični fenjer |
| 41 | `grad-vanj-sanducic.png` | 32×32 | poštanski sandučić |
| 42 | `grad-vanj-kos-smece.png` | 32×32 | koš za smeće |
| 43 | `grad-vanj-tabla.png` | 32×32 | tabla s natpisom, čita se razmaknicom |
| 44 | `grad-vanj-plakat.png` | 32×48 | plakat na zidu |
| 45 | `grad-vanj-bicikl.png` | 32×32 | bicikl naslonjen na zid |

---

## Redoslijed crtanja

1. **Uzorak:** `grad-teren-trava-1`, `grad-teren-kaldrma`, `grad-zgrada-pekara`,
   `grad-objekt-drvo-1`, `grad-lik-igrac-d`. Pet slika — po njima se zaključa paleta.
2. Ostatak terena i granica (24 kom) — time cijeli grad prestaje biti zelena ploha.
3. Zgrade (17) — najveći skok dojma.
4. Krupni objekti (12) i igrač (3 preostala smjera).
5. Stani. Pogledaj igru u pokretu prije nego kreneš na portrete.
