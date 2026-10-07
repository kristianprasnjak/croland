# Croland ES — stanje rada

Sljedeće: objava (korisnik pokreće `objavi.bat`), zatim 6. završna QA (`IZVJESTAJ.md`, test u pregledniku)

**Odluka korisnika (06.10.2026.): bez recenzija.** Svaka sesija je prevoditelj: prevede korak/razinu, provjere
(`provjeri.py`, `provjeri-stil.py`) moraju biti 0, označi **gotovo** i postavi `Sljedeće: prijevod — <sljedeći korak>`.
Stupac „recenzija“ se više ne koristi.

Ažurira ga svaka sesija na kraju (vidi `UPUTE-prijevod-es.md`). Stanja: — (nije počelo), u radu,
čeka recenziju, recenzija: N nalaza, **gotovo**.

Početno stanje (05.10.2026.): faza 0 gotova. Ništa nije prevedeno; odluke koje ne ovise o jeziku prenesene su iz DE:
- lekcije: 742 retka `=` (hrvatski krivo prepoznat kao engleski) → za prijevod **10 943** jedinstvena stringa;
- sučelje: 424 `=` (kod, hrvatski, imena jezika) i 131 `@blobby` → za prijevod **1 367** redaka (od toga 389 `pregledi.js`);
- pregledi: **588**, rječnik: **2 401** lema.
Prenesene oznake smiju se promijeniti ako nisu točne za španjolski.

| korak | prijevod | recenzija |
|---|---|---|
| 1. glosar + `provjeri-stil.py` | **gotovo** (06.10.2026.) | #1–18 zatvoreni; daljnje recenzije ukinute |
| 2. sučelje + pregledi | **gotovo** (06.10.2026.): sučelje 1 367/1 367, pregledi 588/588; provjeri-stil 0 | — (bez recenzije) |
| 3. rječnik | **gotovo** (06.10.2026.): 2 401/2 401 lema, `rjecnik/es-1…5.tsv`; provjeri-stil 0 `spoji-rjecnik.py`: nedostaje [] (07.10.) | — |
| L0 | **gotovo** (07.10.2026.) | — |
| L01 | **gotovo** (07.10.2026.) | — |
| L02 | **gotovo** (07.10.2026.) | — |
| L03 | **gotovo** (07.10.2026.) | — |
| L04 | **gotovo** (07.10.2026.) | — |
| L05 | **gotovo** (07.10.2026.) | — |
| L06 | **gotovo** (07.10.2026.) | — |
| L07 | **gotovo** (07.10.2026.) | — |
| L08 | **gotovo** (07.10.2026.) | — |
| L09 | **gotovo** (07.10.2026.) | — |
| L10 | **gotovo** (07.10.2026.) | — |
| L11 | **gotovo** (07.10.2026.) | — |
| L12 | **gotovo** (07.10.2026.) | — |
| L13 | **gotovo** (07.10.2026.) | — |
| L14 | **gotovo** (07.10.2026.) | — |
| L15 | **gotovo** (07.10.2026.) | — |
| L16 | **gotovo** (07.10.2026.) | — |
| L17 | **gotovo** (07.10.2026.) | — |
| L18 | **gotovo** (07.10.2026.) | — |
| L19 | **gotovo** (07.10.2026.) | — |
| L20 | **gotovo** (07.10.2026.) | — |
| daily + `*-lekcija1.md` + Blobby | **gotovo** (07.10.2026.): memorija 16 914/16 914 (100 %), Blobby 92/131 (39 zastarjelih) | — |
| 6. završna QA (`IZVJESTAJ.md`) | — | — |

## Otvorene odluke / bilješke

### Korak 4 — lekcije (07.10.2026., prevoditelj)
- Gotovo: **L0, L01–L20** (lekcija, vokabular, gramatika, praksa, test). Po razini: `posao.py dump` svih pet datoteka → `upis` →
  `primijeni.py` → `provjeri.py` **0** → `provjeri-stil.py --samo lekcije` **0 grešaka** (pazi = *usted/ustedes* u objašnjenjima ti/vi i
  dijalozima, *puntuación* = interpunkcija – namjerno).
- Lokalni shell se opet nije pokrenuo („Workspace unavailable“): rad u oblaku na kopijama, vraćeno na računalo. Prije izmjena:
  `prijevod-es.tsv.bak-prije-lekcija`, `STANJE.md.bak-prije-lekcija`, `stil-iznimke.tsv.bak-prije-lekcija`. Nova mapa `croland-es/igre/`
  (izlaz `primijeni.py`, svih 148 datoteka; neprevedeno ostaje engleski) i `croland-es/nedostaje.tsv`. `izvuci.py` pokrenut: memorija i
  `segmenti.tsv` bajt po bajt isti.
- Odluke (vrijede za iduće razine):
  - *je / biti* = *es / está*; u objašnjenjima most „un solo verbo para *ser* y *estar*“; u rečenicama prirodni izbor (*El café está bueno*,
    *La casa es roja*).
  - Mostovi prema španjolskom: izostavljanje zamjenice (*Soy estudiante*), ali glagol ne smije biti prvi (*Studentica sam*, ne *Sam…*);
    nastavci *-m/-š/–* ↔ *leo/lees/lee*; dvostruka negacija (*no trabaja nadie*); *vi* = *ustedes* / *usted*; *a* = „y / mientras que“;
    zarez kao u španjolskom (bez zareza pred *y*, sa zarezom pred *pero*); nacionalnosti veliko slovo u HR, malo u ES; *-ica* ↔ *-a*.
  - Nagovještaji u zagradi: kad zadatak provjerava rod imenice (L01: *Knjiga je ___ (viejo)*) – **leksički oblik (m. jd.)**, da španjolski
    rod ne oda rješenje; kad je osoba već zadana (*Ona je ___ (alta)*, *Ja ___ sok (bebo)*) – oblik koji odgovara hrvatskom odgovoru.
  - Isti engleski string s dva hrvatska roda (*You are very fun* = *zabavna* i *zabavan*) → *Tú eres muy divertido/a*; *I am a student*
    (*student/studentica*) → *Yo soy estudiante*.
  - *Good day! / Dobar dan* → *¡Buen día!* (i u dijalogu L01); *Good morning!* → *¡Buenos días!*; *Izvolite* → *Aquí tiene*;
    *pie (pita)* → *empanada* (karta: *empanada, pastel horneado*; *cake/torta* ostaje *pastel*); *strawberry* → *fresa*;
    *kind (drag)* → *cariñoso*, *polite (ljubazan)* → *amable*; *driver* → *chofer*; *radio* → *la radio*; *Enjoy your meal* → *¡Buen provecho!*
  - „Tap **EN**“ (gumb prijevoda) → „Toca **ES**“ (gumb = `JEZIK_APP.toUpperCase()`).
  - `=` postavljeno za tablične retke koji su u cijelosti hrvatski/simboli (npr. `tab: **-a** | **-a** | velika kuća`).
  - `stil-iznimke.tsv`: 3 nova retka (hrvatska pitanja *Kako [si]?* i *“Kako ste?”* bez ¿; hrvatski dio s ravnim navodnicima).
  - Glosar *ending → terminación* provjera je stroga: i „ending in -a“ prevodi se s *terminación* („con la terminación **-a**“), ne „termina en“.
  - Mostovi L05–L07: akuzativ ↔ španjolske zamjenice (*la bebo*); živo/neživo ↔ *a* personal (*veo a un amigo / veo el tranvía*); *me, te, ga,
    je, nas, vas, ih* ↔ *me, te, lo, la, nos, los*, ali u HR nikad prvi (*Vidim ga* / *Lo veo*); *mi -mo* ↔ *-mos*; množina bez *-s*.
  - Rod zamjenice ide po hrvatskom rodu: *I'm reading it. (the book)* → „Lo estoy leyendo. (el libro – en croata *knjiga*, femenino)“.
  - `stil-iznimke.tsv`: još 2 retka (hrvatski dio s ravnim navodnicima; „picture-to-word game“ nije *Word game*).
  - L08 futur: most *ću + infinitiv* ↔ *voy a + infinitivo* i povijest *nadaré < nadar he*; *helper* → *auxiliar*; rečenice u futuru
    *Nadaré… / Voy a nadar…* (oba prirodna).
  - L09 posvojne: *su* je dvosmislen, pa *his/her/their/your (pl.)* → *de él / de ella / de ellos / de ustedes* („La camiseta de él es azul“);
    nagovještaji u zagradi po vlasniku, bez roda: *(mi) (tu) (de él) (de ella) (de nosotros) (de ustedes) (de ellos)*, *svoj* → *(de él mismo)…*;
    most *nuestro equipo / nuestra pelota* (završetak po stvari). *dres* → *camiseta (del equipo)*, *golman* → *portero*.
  - L10 perfekt: most *he visto* (pomoćni + particip), ali jedan prošli za *vi / veía / he visto*; particip po rodu (španjolski ne).
    Oznake govornika: *(a man)* → *(habla un hombre)*, *(to a friend, m./f.)* → *(a un amigo / a una amiga)*, *(he/she/it)* → *(él/ella/neutro)*.
  - L11 pitanja: hrvatski nema pomoćni *do* kao ni španjolski; *koga* ↔ *¿a quién?*; kategorije PALABRA INTERROGATIVA / PREGUNTA CON LI / COLETILLA;
    *ti/vi* u rečenicama prati hrvatski (*Gdje živiš?* → tú; *Gdje živite?* → ustedes/usted po kontekstu).
  - L12 negacija: španjolski ispušta *no* kad negativna riječ stoji ispred glagola, hrvatski uvijek zadržava *ne* (*Nitko ne dolazi*);
    *ali / nego* ↔ *pero / sino*; *palačinke* → *crepas*.
  - L13 lokativ: španjolski mijenja prijedlog (*a / en*), hrvatski završetak; *gdje / kamo* ↔ *¿dónde? / ¿adónde?*; kategorija O → SOBRE;
    *halo* → *¿Aló? / ¿Bueno?*.
  - L14 dativ: most *le / les* + *a* (*Le compro una bufanda a mamá*) ↔ hrvatski završetak **-i/-u**; *receiver* → *receptor*, *receiver form* → *forma receptora*;
    *pomagati / vjerovati / zahvaliti* ↔ *ayudar a / confiar en / agradecer* (u španjolskom nije uvijek *le*); *mu ga* ↔ *se lo*; *mu / ga* ↔ *le / lo*;
    *godfather, best man* → *padrino*; *Djed Mraz* → *Papá Noel*; dijalog zadržava „— “.
  - L15 instrumental: most *con* (društvo, alat: *escribo con lápiz*, *café con leche*) ↔ *s/sa*, ali vozilo *en tren* ↔ *vlakom* bez prijedloga
    („en español tampoco dices *con tren*“); *sa mnom / s tobom* ↔ *conmigo / contigo*. Nagovještaji: *(conmigo) (contigo) (con usted) (con nosotros)
    (con ellos) (con él/ella)*, vozila *(en tren) (en auto) (en ferry)*; *(with you, a friend)* → *(contigo)*, *(with you, polite)* → *(con usted)*.
    *vrijeme* = *tiempo* (oba značenja, most); *kombi* → *camioneta*, *skuter* → *scooter, motoneta*, *trajekt* → *ferry, transbordador*, *mladić* → *muchacho*,
    *kolegice* → *compañeras de trabajo*, *gljive* → *champiñones*, *sendvič sa sirom* → *sándwich de queso*, *konobar* → *mesero*; kategorije
    CON s/sa (compañía) / SIN PREPOSICIÓN (medio), COMPAÑÍA (s/sa) / MEDIO (sin preposición); „ČESTITAMO!“ ostaje hrvatski. `stil-iznimke.tsv` +6 (hrvatska pitanja bez ¿).
  - L16 genitiv: most *de* (*la casa de mi abuela*, *el olor del café* – vlasnik iza stvari kao u španjolskom; *al lado de, cerca de, detrás de* nose *de*);
    *nema* ↔ *no hay* (ne mijenja se po osobi). Prijedlozi: *pokraj* → *al lado de*, *ispred/iza* → *delante de / detrás de*, *iznad/ispod* → *encima de / debajo de*,
    *kod* → *en casa de*, *iz* → *de, desde (un lugar)*, *od* → *de (alguien, un material)*, *preko* → *por encima de*, *umjesto* → *en vez de*, *osim* → *excepto*,
    *izvan* → *fuera de*; nagovještaji u zagradi isti oblici (*(made of)* → *(hecho de)*, *(at … 's place)* → *(en casa de …)*). Riječi: *ograda* → *cerca*, *trava* → *pasto*,
    *slika* → *cuadro, imagen*, *sudoper* → *fregadero*, *zdjela* → *tazón*, *autocesta* → *autopista*, *šipak* → *rosa mosqueta*, *ručak* → *almuerzo*, *upaliti* → *encender, prender*;
    oglas: *Alquilo*, *habitaciones*, *estacionamiento*. *Ključ je kod mene* → „La llave la tengo yo.“ Kategorije PERTENENCIA / DESPUÉS DE UNA PALABRITA / DESPUÉS DE NEMA /
    PALABRITA / NÚMERO. 3 retka čisto hrvatska → `=`; `stil-iznimke.tsv` +1 (*Nema [problema]!* bez ¡).
  - L17 imperativ: most *miras → mira* (tú imperativ iz prezenta bez -s), *dođi / idi* ↔ *ven / ve* (nepravilni, učiti cijele), *-mo* ↔ *¡Cantemos!*,
    modal + infinitiv kao *puedo / tengo que*. Osoba u španjolskom prati hrvatsku: *ti* → tú (*¡Toma!*), *vi* grupa → ustedes (*¡Agreguen!*), *vi* uljudno → usted
    (*¡Gire a la izquierda!*); oznake *(a un amigo) (a un grupo) (formal) (una persona) (un turista, formal) (el equipo)*. Isti EN string s *ti* i *vi* rješenjem
    (*Don't run across the road!* = *Nemoj trčati* / *Ne trčite*) → neutralno „¡Nada de cruzar la calle corriendo!“. *skrenuti* → *girar, doblar* (u rečenicama *girar*),
    *tava* → *sartén*, *štednjak* → *estufa*, *kružni tok* → *glorieta, rotonda*, *ravno* → *derecho*, *požuriti* → *apurarse*, *tepih* (pred vratima) → *tapete*, *Pij!* → *¡Bebe!*;
    modali u zagradi *(poder) (tener que) (querer)*; *don't* → „no lo hagas“. Kategorije ORDEN / AFIRMACIÓN / PETICIÓN AMABLE / UNA PERSONA (ti) / UN GRUPO (vi).
    6 redaka `=`; `stil-iznimke.tsv` +11 (10 ravnih navodnika u hrvatskom dijelu, 1 usklicnik).
  - L18 kondicional: most „gdje španjolski mijenja završetak (*compré / compraría*), hrvatski mijenja pomoćni (*sam / bih*)“; *Htio / Htjela bih* ↔ *quisiera*;
    *ako* + prezent ↔ *si tengo…*, *da* + prezent / *kad bih* ↔ *si tuviera…, compraría*. Španjolski kondicional ne pokazuje rod, pa oznake ostaju:
    *(habla un hombre / una mujer) (solo mujeres) (dos mujeres) (Marko y yo) (a un grupo) (a un amigo / a una amiga) (a un hombre / a una mujer)*; *(possible)* → *(posible)*,
    *(a dream)* → *(un sueño)*. Riječi: *alarm* → *despertador*, *ljutiti se* → *enojarse*, *smijati se* → *reírse*, *nadati se* → *esperar (tener esperanza)*, *Dogovoreno!* → *¡Trato hecho!*,
    *k meni* → *a mi casa*, *stan* → *departamento*, *Zamislite* → *Imagínense*, *PITALI SMO VAS* → *LES PREGUNTAMOS*. Kartica *bih, bi…* → „auxiliares del condicional (como -ría en compraría)“.
    Kategorije PASÓ (pasado) / DESEO (condicional) / PASADO / FUTURO / CONDICIONAL. 3 retka `=`; `stil-iznimke.tsv` +4 (anketa, ravni navodnici u hrvatskom dijelu).
  - L19 vid: most oprezno (ES-plan §3) – „el español lo dice con palabras extra (*terminar de, todo, estar + -ndo*) ili sa *se* (*comerse, tomarse*)“, i
    „parecido a *escribía / escribí*, ali vid je u glagolu, ne u vremenu, i postoji i u prezentu i futuru“. Prijevodi rečenica: nesvršeni → *estuve + gerundio* /
    imperfecto (*Estuve escribiendo…*, *La abuela leía…*), svršeni → pretérito, *se* (*se comió, se tomó, se lo aprendió*), *terminar de*, *completo*. Kartice parova:
    *escribir → terminar de escribir*, *beber → bebérselo todo*, *cocinar → dejar cocinado*, *mandar → dejar enviado*, *estar comprando → comprar* itd. *Pij! / Popij!* ↔
    *¡Bebe agua! / ¡Tómate el agua!*. *zadaća* → *tarea*, *lektira* → *lectura obligatoria*, *marka* → *estampilla, sello*, *opisati/potpisati/zapisati/prepisati* →
    *describir / firmar / anotar / copiar*; ✓ → *palomita*. Oznake *(a un chico) (a una chica) (con suavidad)*. Kategorije PROCESO / ¡TERMINADO! / PROCESO (imperfectivo) /
    TERMINADO (perfectivo) / GEMELO (mismo significado) / VERBO NUEVO (significado nuevo). 1 redak `=`; `stil-iznimke.tsv` +2.
  - L20 složene rečenice: mostovi *jer/kad/ako/dok/iako/kao* ↔ *porque/cuando/si/mientras/aunque/como*, *koji* ↔ *que / el cual / quien*, *Znam da…* ↔ *sé que…*
    (bez zareza), *Želim da dođeš* ↔ *quiero que vengas*; „bez pomaka vremena“: španjolski kao engleski pomiče (*Dijo que estaba cansado*), hrvatski ne. Relativne rečenice
    u tap-vježbama doslovno (*La ciudad en la que vivo*, *El hombre al que estoy esperando*). Sprint: *which (m./f./n.)* → *que (m./f./n.)*, *which (f., target)* → *que (f., objetivo)*.
    *riva* → *malecón*, *uvala* → *cala*, *diploma* → *diploma, título*, *sličan* → *parecido, similar*, *THE FINAL CHECKPOINT* → *EL PUNTO DE CONTROL FINAL*, *CONGRATULATIONS!* → *¡FELICIDADES!*;
    *(mine)* → *(el mío)*. Kategorije SUJETO / OBJETIVO / LUGAR / MEDIO. 2 retka `=`. Usput ispravljeno L19: *Which prefix?* → „¿Qué prefijo?“.
  - Daily + `*-lekcija1.md` (473 stringa): *+10 points · streak +1* → „+10 puntos · racha +1“; *Sutra: …* → „– Mañana: …“; hrvatske rečenice koje su bile u
    engleskom izvoru (*Neki odgovori citiraju prošle challengee…*, *Jesi li primijetio? Molim je i "please"…*, *Fraza dana*) prevedene na španjolski; mostovi
    *vrijeme* = *tiempo*, *čitam* = *leo* (zamjenica u glagolu), mala slova dana kao u španjolskom; *(good)* itd. u testu L1 → leksički oblik m. jd. (*(bueno)*);
    *doctor* → „médico, doctor (m.) / médica, doctora (f.)“; *tombola* → `=`; `stil-iznimke.tsv` +2 (*banana → bananas*, *3 bananas* – ista riječ u ES).
  - **Blobby** (probni build `izgradi-sucelje.py --jezik es`, nije objavljeno): 73 od 131 redaka `BLOBBY_RECI` prevedeno iz memorije; 58 redaka su početci
    engleskih odlomaka kojih više nema u lekcijama (npr. „Here's a secret: you already speak some Croatian“) – isto u DE (73/58), pa se ne mogu spojiti; to je
    pitanje izvora (`index.html`), ne prijevoda. `nedostaje.tsv` prazan. Build javlja i **2 `T_` bez prijevoda** – novi tekstovi u (necommitanom) `index.html`;
    rješenje: `izvuci-sucelje.py --jezik es` pa prevesti 2 nova retka u `sucelje-es.tsv` (to nije rađeno u ovoj sesiji).
  - Sesija 07.10. (L15–L20, daily): **device shell je radio**, sve izravno na računalu. Kopije prije izmjena: `prijevod-es.tsv`, `stil-iznimke.tsv`, `nedostaje.tsv`,
    `STANJE.md`, `index-es.html`, `pregledi-es.js` → `.bak-prije-L15`. Pomoćne skripte u `croland-es/_radno/` (`stanje.py`, `postavi.py`). Po razini provjeri.py 0 i
    provjeri-stil.py --samo lekcije 0. **Pažnja:** greškom je jednom pokrenut i DE build (`izgradi-sucelje.py --jezik de`), pa su `index-de.html` i `pregledi-de.js`
    ponovno izgrađeni iz trenutnih izvora (isti postupak kao korak 1b u `objavi.bat`; `pregledi-de.js` = HEAD, `index-de.html` sada odgovara necommitanom `index.html`).
    `jezici.json` i hrvatski sadržaj nisu dirani; ništa nije objavljeno.
  - **Dopuna 07.10. (na zahtjev korisnika):** (1) `izvuci-sucelje.py --jezik es` dodao 5 novih redaka iz necommitanog `index.html`; prevedeni:
    *%1 is part of Croland Plus. Portal, Konoba and Gradovi Hrvatske…* → „%1 es parte de Croland Plus. Portal, Konoba y Gradovi Hrvatske son gratis…“,
    *Continue: %1* → „Continuar: %1“, *Unlock with Plus* → „Desbloquear con Plus“, 2 retka koda `=`. Build ES sada **bez UPOZORENJA** (`t_fali` 0); provjeri-stil (sve) 0.
    DE ima ista 2 `T_` bez prijevoda u `sucelje-de.tsv` – nije dirano. (2) `BLOBBY_RECI` u `index.html`: 19 zastarjelih odsječaka zamijenjeno odsječkom
    današnjeg, preformuliranog retka iste lekcije (popis `croland-es/_radno/blobby_map.tsv`, svaki pogađa točno 1 redak memorije); ES Blobby 73 → **92/131**.
    Vrijedi i za EN i DE (Blobby opet govori te retke). Ostalih 39 nema jasnog para u današnjim lekcijama (npr. „Here's a secret: you already speak some Croatian“,
    „Five down, two to go“) – odluka autora: obrisati ih ili upisati nove retke. `index.html` kopija `.bak-prije-blobbyja`, CRLF sačuvan, acorn 8/8 skripti OK;
    `index-de.html` nije ponovno građen (osvježit će ga `objavi.bat`). Kopije: `sucelje-es.tsv`, `pregledi-es.tsv`, `STANJE.md` → `.bak-prije-T2`.
  - **Priprema za objavu (07.10., na zahtjev korisnika)** – kopije `.bak-prije-objave-es`:
    - DE: `izvuci-sucelje.py --jezik de`, prevedena 3 nova retka (*%1 gehört zu Croland Plus…*, *Weiter: %1*, *Mit Plus freischalten*), 19 novih Blobby redaka `@blobby`; DE i ES bez praznih redaka.
    - `index.html` `<head>`: dodan `{ id: 'es', ime: 'Español', stranica: 'index-es.html', izbor: 'Elige tu idioma', opis: 'Explicaciones, pistas y traducciones en español.' }`
      (bez `pravno` → terms/privacy/refund se otvaraju na engleskom); novi retci u sucelje-de/es kao `=`.
    - `croland-jezici/jezici.json`: `es` → `"aktivan": true` (objavi.bat korak 1b gradi DE i ES).
    - `scripts/build.js`: ES datoteke u `FILES` + `podijeliIProvjeri('data-es.js', 'data-es.js', 'data-plus-es.json')`; `uploadaj-sadrzaj.js`: `data-plus-es.json` na zadanom popisu;
      `supabase/functions/sadrzaj/index.ts`: `data-plus-es.json` u `DOZVOLJENE`; `objavi.bat`: samo tekst.
    - Probni build: `izgradi-jezike.py` → de, es bez UPOZORENJA (blobby 92/131); `scripts/build.js` u privremenoj kopiji (u mapi nije dopušteno brisanje `dist/`):
      ES 282 javnih + 1 331 plaćenih vježbi (kao EN/DE).
    - Edge Function `sadrzaj` **deployana 07.10. ~23:55** (dashboard → Code → Deploy updates, na izričit zahtjev korisnika): `DOZVOLJENE` sada uključuje
      `data-plus-es.json`; provjereno nakon osvježavanja stranice. Kod na dashboardu = lokalni (osim komentara u 1. retku).
    - Nije napravljeno: test u pregledniku (§6c, duljina 118 natpisa, promjena jezika) – odgođeno na zahtjev korisnika; e-mail predlošci i terms/privacy na ES (§7, 3–4).


### Provjera na računalu (07.10.2026.)
- Datoteke iz arhive su u mapi (md5 isti kao izvor).
- `spoji-rjecnik.py --jezik es` → lema 2401, prevedeno 2401, `nedostaje: []`, obrnuti ES→HR 2 761.
- Probni build `izgradi-sucelje.py --jezik es` → `index-es.html`, `pregledi-es.js` **bez UPOZORENJA**; acorn parsira sve skripte
  (`index-es.html` 8, `pregledi-es.js`). Blobby: fali 131 – očekivano, gradi se iz lekcija (korak 5). Nije objavljeno, `jezici.json` netaknut.
- Kontekst u `index.html` provjeren: *Matched all* + broj → „Uniste todas: 8“, *Popped all* → „Reventaste todos: 8“ (u redu);
  *Built* + 3/5 → „Armadas: “; `T_('read')` (stanje vježbe čitanja) → „leído“; *DELETE* ostaje jer kod uspoređuje s `'DELETE'` (redak ~14179).
  *PP* → „PP“ + redak u `stil-iznimke.tsv` (prije `=`, build je javljao 1 T_ bez prijevoda). Kopije `.bak-prije-builda`.
- Izgled u pregledniku (duljina natpisa) još nije gledan – za završnu QA (korak 6).

### Korak 3 — rječnik (06.10.2026.)
- `croland-es/rjecnik/es-1.tsv … es-5.tsv` (480/480/480/480/481 redaka), redak `lema<TAB>značenje; značenje`, isti redoslijed kao
  `prijevodi.jsonl`; sve 2 401 leme imaju prijevod (provjereno skriptom: nedostaje 0, višak 0, dupli 0).
- `provjeri-stil.py --jezik es` (sve: sučelje, pregledi, rječnik) → **greške 0**. Pazi u rječniku: *piso* (kat = planta, u redu),
  *billete* (novčanica, u redu), *usted* (vi, kako ste, nemojte – namjerno).
- `isto_kao_engleski` dopunjen s 24 riječi koje su iste u ES (aroma, café, drama, euro, video, yoga…); kalkovi zamijenjeni (*quiz → trivia*,
  *souvenir → recuerdo*, *blazer → saco*, *tour → recorrido*).
- Pravila: glagoli u infinitivu bez „to“; pridjevi u muškom rodu (kao hrvatska lema); ženski oblici imenica (*doktorica → doctora*);
  latinoamerički izbor, uz regionalnu varijantu u zagradi samo gdje je neutralni naziv nejasan (*autobús; camión (MX)*); *voziti → manejar*,
  *dozvola → permiso; licencia (de conducir)*, *torta/kolač → pastel*, *grah → frijoles*, *krumpir → papa*, *mobitel → celular*,
  *parkirati → estacionar*, *hladnjak → refrigerador*, *džemper → suéter*, *traperice → jeans*, *kikiriki → maní; cacahuate*.
  Hrvatski pojmovi bez para opisno: *ćevap*, *burek*, *bura*, *jugo* (→ „viento del sur“, jer je *jugo* na ES sok), *tamburica*, *džezva*.
- `spoji-rjecnik.py --jezik es` pokrenut 07.10.: `nedostaje: []`. Format sam preuzeo iz uputa
  (`croland-de/rjecnik/de-*.tsv` nije bio dostupan za usporedbu) – ako `spoji-rjecnik.py` javi grešku formata, prilagoditi.

### Korak 2 — sučelje + pregledi (06.10.2026.)
- `sucelje-es.tsv`: svih 1 367 praznih redaka prevedeno (nijedan prazan); kao `=` ostavljeni: *Croland · info-v1*, *Croland*, *Croland Plus*,
  *Plus*, *Portal*, *Aa*, *Total*, *Enter* (naziv tipke), kratice padeža *Nom/Gen/Dat/Voc/Loc/Ins* (*Acc* → *Ac*), *PP* (isto u ES).
  `pregledi-es.tsv`: 588/588 (svaki redak prema svom hrvatskom; brojke `=`).
- Provjere: `provjeri-stil.py --jezik es` → **greške 0** (sučelje 1 351, pregledi 583 provjereno); test alata 71/71.
  Pazi 31: naslovi s ikonom (▶ Continuar, ‹ Atrás…) – lažna upozorenja; *(ustedes)* uz „Look! (all of you)“ – namjerno.
  Duljina > 1,5×: 118 natpisa (npr. *Word game → Juego de vocabulario*, *Type → Escribir*) – pogledati izgled kad se napravi build.
- Strojno provjereno: `%1…%n`, HTML oznake, razmaci na početku/kraju fragmenata i `\u2014`/`\u2713` isti kao u izvoru; prijevod ne
  dodaje ' " ` (sigurno za JS).
- `pravila.json` `isto_kao_engleski` dopunjen: singular, plural, extras, ferry, scooter, villa, numeral.
- Odluke: `en-US → es-419`; mjeseci malim slovom; „HR → EN“ → „HR → ES“; postotak s razmakom (`70 %`, fragmenti „ % para aprobar“);
  *future* u pregledima kao *futuro simple* (*Nadaré*); hrvatsko uljudno *Izvolite/Skrenite/Trebate li* → *usted* (*Aquí tiene*, *Gire*, *¿Necesita…?*);
  *Pij!* → *¡Bebe!* (*tomar* = uzeti/piti, pa za naredbu *beber*); *vozač* → *chofer*.
- **Nije napravljeno (nema pristupa računalu u ovoj sesiji):** `izvuci-sucelje.py` (osvježavanje), build `izgradi-sucelje.py --jezik es`
  i pogled u pregledniku. Prvi sljedeći korak na računalu: build, pa provjeriti da ne javlja `UPOZORENJE`.
- Provjeriti u kontekstu `index.html` (fragmenti bez jasnog nastavka): *Matched all* → „Uniste todas: “, *Popped all* → „Reventaste todos: “,
  *Built* → „Armaste “, *read* (js-t) → „leídas“, *reviewed* → „repasado“. *Type DELETE to confirm* ostavljen s **DELETE** jer kod vjerojatno
  uspoređuje upisanu riječ – ako uspoređuje s `T_('DELETE')`, promijeniti u ELIMINAR.

### Korak 1 — ispravci 2 po ponovnoj recenziji (06.10.2026.)
Nalazi #15–18 zatvoreni (stupac `odluka` u `croland-es/recenzija/1-glosar.md`):
- #15 `pravila.json` → `conducir`: novi regex hvata i *conducí, conduje, condujo, condujera/-ese, conduzca*; ne javlja *licencia(s) de conducir*,
  *licencia (de conducir)* (rječnik), *conductor/conducta/conducto/conducción*. Glosar dio 1: *driving licence → licencia de conducir* (glagol ostaje *manejar*).
- #16 `pravila.json`: `rjecnik_internacionalizmi` preimenovan u **`isto_kao_engleski`** (alat čita i stari naziv), dodan *gas*.
  `provjeri-stil.py`: `es == en` nije greška kad string ima 1–2 riječi i sve su na tom popisu (lekcije: *hotel, taxi, piano, idea, color…* — 19; sučelje *Total, Plan*).
  Popis treba dopuniti u koraku 3 (rječnik) kad se pojavi lažna greška.
- #17 glosar dio 1 (novi odjeljak „Riječi iz lekcija s regionalnom zamkom“): **cake → pastel** (*pasteles*, po potrebi *pastelitos*); *tarta* → koristi *pastel*;
  novi „pazi“ *torta* (MX = sendvič) i `glosar_provjera` *cake → pastel* (razina pazi, ne blokira).
- #18 glosar dio 2: *judía verde* → *ejotes (vainitas)*, ne *frijoles verdes*.
- Test alata: `python croland-jezici/test/stil/test-provjeri-stil.py` → **71/71** (+23 slučaja; stari alat i pravila 57/71).
- `provjeri-stil.py --jezik es` → greške 0, pazi 0, duljina 0 (neprevedeno: lekcije 10 943, sučelje 1 367, pregledi 588). `--jezik de` → 0, ne ruši se
  (u oblačnoj kopiji bez DE podataka).
- Mijenjano: `croland-es/pravila.json`, `croland-es/glosar-es.tsv`, `croland-jezici/alati/provjeri-stil.py`, `croland-jezici/test/stil/test-provjeri-stil.py`,
  `croland-es/recenzija/1-glosar.md`, ovaj dokument — sve s kopijama `.bak-prije-ispravaka-2`. `PROCITAJ-ME.md` nije trebalo mijenjati.
- Lokalni shell se opet nije pokrenuo: rad u oblaku na kopijama i vraćeno na računalo. `izvuci.py`/`izvuci-sucelje.py` nisu pokretani (memorije nisu dirane).
- Za recenzenta: pogledati samo izmjene prema `.bak-prije-ispravaka-2` i pokrenuti test alata. Ako je 0 nalaza → korak 1 **gotovo**, `Sljedeće: prijevod — 2. sučelje + pregledi`.

### Korak 1 — ponovna recenzija izmjena (06.10.2026.)
Nalazi: `croland-es/recenzija/1-glosar.md`, odjeljak „Ponovna recenzija“ — **4 nalaza (#15–18)**, stupac `odluka` prazan.
- Nalazi 1–14: ispravci provjereni, odgovaraju odlukama. `test-provjeri-stil.py` → 48/48; `provjeri-stil.py --jezik es` → greške 0
  (lekcije 10 943, sučelje 1 367, pregledi 588 neprevedeno), `--jezik de` → 0.
- #15 `conducir`: propušta *conducí*, *condujera/-ese*; blokira *licencia de conducir* (standard u LatAm) — gotov regex u nalazu.
- #16 `es == en`: ~21 string lekcija (*hotel, taxi, piano, idea, color…*) i 2 sučelja (*Total, Plan*) bili bi greška; popis internacionalizama
  vrijedi samo za rječnik — prijedlog: isti popis i za jednorječne stringove.
- #17 *cake* (61×): glosar ostavlja *pastel / torta*; *torta* = sendvič u MX → odluka *pastel*.
- #18 *judía verde*: ne preporučivati kalk *frijoles verdes* (nisko, 0× u izvoru).
- Za prevoditelja: svaki ispravak pravila → novi slučaj u `test-provjeri-stil.py` (slučajevi iz nalaza su navedeni u tablici).
- Recenzija opet u oblaku na kopijama (lokalni shell se nije pokrenuo); mijenjani samo `recenzija/1-glosar.md` i ovaj dokument
  (kopije `.bak-prije-recenzije-2`). `izvuci.py` nije pokretan.

### Korak 1 — ispravci po recenziji (06.10.2026.)
Svih 14 nalaza iz `croland-es/recenzija/1-glosar.md` zatvoreno (stupac `odluka`). Ukratko:
- `pravila.json`: lažne greške #1–4 uklonjene (*dieciséis/veintiséis*, *escribí*, *conductor/conducta/conducción*, *¿Cuánto vale?*/*No vale*);
  novo: `zabranjeni_navodnici` (« » „ ‚), `rjecnik_izvor` + `rjecnik_internacionalizmi`, regex *echar de menos / enfad- / aparc-*,
  pazi *puntuación*, ` - `, *albaricoque, bocadillo, tarta, zapatillas, camarero*; `glosar_provjera` + *place form*, *base form*, *Word game*; *helper* prihvaća *asistente*.
- `provjeri-stil.py`: `es == en` je greška i za jednu riječ (namjerno isto → `=` ili `stil-iznimke.tsv`); rječnik: značenje jednako
  engleskom značenju leme (`prijevodi.jsonl`) = greška `engleski`; glosar/naslov se u rječniku ne provjeravaju (lema je hrvatska).
- `glosar-es.tsv`: *Word game → Juego de vocabulario*; *helper (AI) → asistente* (gramatički ostaje *auxiliar*); *NAMING → BASE (-a)*;
  *base form → forma base*; *in English* (usporedba jezika → most ili *en inglés*); *How much is it? → ¿Cuánto cuesta?*; novi zabranjeni oblici.
- Novi test alata: `python croland-jezici/test/stil/test-provjeri-stil.py` (48 slučajeva; stari alat 42/48). Svaka buduća promjena pravila → novi slučaj u testu.
- Provjere: `provjeri-stil.py --jezik es` → greške 0 (lekcije 10 943, sučelje 1 367, pregledi 588 neprevedeno); `--jezik de` → 0.
- Lokalni shell se opet nije pokrenuo: rad u oblaku na kopijama, vraćeno s `.bak-prije-ispravaka-1` kopijama. `izvuci.py` nije pokretan.
- Za recenzenta: pogledati samo izmjene (gornje točke) i pokrenuti test alata.


### Korak 1 — recenzija (05.10.2026.)
Nalazi: `croland-es/recenzija/1-glosar.md` — **14 nalaza**, stupac `odluka` prazan (prevoditelj ispravlja ili obrazlaže).
- Lažne greške alata (testirano): *dieciséis/veintiséis* (vosotros-glagol), *Escribí la carta* (voseo), *conductor/conducta*
  (conducir), *¿Cuánto vale?* (vale-uzvik) — #1–4. Bez ispravka bi blokirali ispravne prijevode lekcija.
- Propusti alata: zaostali engleski u jednorječnim natpisima i u rječniku (#5), « » i „ “ (#11), *puntuación* i ` - ` (#12),
  *place form* u `glosar_provjera` (#9), dodatni španjolski regionalizmi (#10).
- Glosar: *Word game* ≠ *Juego de palabras* (#6), AI „helper“ → *asistente* (#7), paralelne kategorije NAMING/TARGET (#8),
  „in English“ kod usporedbe jezika (#13), „base form“ (#14).
- Provjere sada: `provjeri-stil.py --jezik es` → greške 0 (ništa prevedeno; lekcije 10 943, sučelje 1 367, pregledi 588),
  `--jezik de` → 0. Recenzija je opet pokrenuta u oblaku (lokalni shell se nije pokrenuo), na kopijama; ništa nije mijenjano
  osim ove bilješke i nove datoteke recenzije.
- Kad prevoditelj zatvori nalaze: `Sljedeće: recenzija — 1. glosar + provjeri-stil.py` (ponovna recenzija samo izmjena).

### Korak 1 — prijevod (05.10.2026.)
Napravljeno:
- `croland-es/glosar-es.tsv` (dio 1 `en | es | napomena`, ~190 pojmova: tipovi cjelina, valute PL·PV·PG·PP, racha,
  bodovi, rječnik/bilješke/sučelje, račun i naplata, glagoli uputa, naslovi vježbi koji se ponavljaju, mini-igre,
  padeži, vlastiti nazivi oblika iz tečaja, vrijeme/vid, vrste riječi, pravopis; dio 2 `zabranjeno | koristi | razlog`).
- `croland-jezici/alati/provjeri-stil.py --jezik XX` + `croland-es/pravila.json` + prazni `croland-es/stil-iznimke.tsv`;
  dopunjen `croland-jezici/PROCITAJ-ME.md` (tablica alata).
- Provjera sada: `provjeri-stil.py --jezik es` → greške 0 (ništa prevedeno; neprevedeno lekcije 10 943, sučelje 1 367,
  pregledi 588 — iste brojke kao početno stanje); `--jezik de` (nema pravila) → 0, ne ruši se.
- Alat testiran na kopiji s namjerno točnim i krivim prijevodima: hvata vosotros, -áis/-éis, imperativ *Elegid*, voseo
  (*Tenés*), *coche*, uzvik *vale*, ? bez ¿, ¡ bez !, nezatvorene “ ”, ravne " u tekstu, prijevod = engleski;
  ne javlja hrvatske upitnike (**tko?**, *Kako si?*), polja `hr | en`, HTML/kod u sučelju ni dijelove rečenica s “.
  Na 1 367 redaka sučelja nijedna lažna greška za ravne navodnike/kod.

Odluke u glosaru koje vrijedi da recenzent posebno pogleda:
- Test → **Prueba** (ž. rod: *¡Prueba 3 aprobada!*); checkpoint → **punto de control**; track → **área**.
- Nazivi oblika (DE je ovdje bio nedosljedan, Grundform/Benennungsform): naming form → **forma base**, target form →
  **forma objetivo**, receiver form → **forma receptora**, company form → **forma de compañía**, place form → **forma de lugar**;
  little word → **palabrita**; helper → **auxiliar**; twin → **gemelo**; ending → **terminación**.
- the perfect → **el perfecto** (most prema *pretérito perfecto*, uz upozorenje da pokriva sva prošla vremena).
- coche → **auto** (ne *carro*); Daily (traka) → **Desafío**; Match → **Une**; Sort → **Clasifica**; Build → **Arma**;
  score → **puntaje**; Add → **Agregar**; sentence → **oración**; datumi `es-419`.

Kako alat radi (za sve iduće sesije):
- greške (moraju biti 0): `upitnik`, `usklicnik`, `navodnici`, `zabranjeno`, `glosar` (pravila.json `glosar_provjera`:
  ako engleski ima pojam, prijevod mora imati glosarski), `engleski`. Namjerna iznimka → redak u `stil-iznimke.tsv`
  (`en <TAB> pravilo <TAB> razlog`) + bilješka ovdje.
- „pazi“ (ručno, ne broji se): *piso*, *billete*, *añadir*, *usted/ustedes* u tekstu, velika slova u naslovima,
  `sentence`/`helper` iz glosara (helper je i „AI helper“); „duljina“: sučelje, natpisi ≤ 30 znakova, ES > 1,5× EN.
- `--datoteke lekcija-NN.md …` ograničava na jednu razinu (po `segmenti.tsv`) — za recenziju razine.
- Napomena: lokalni shell u ovoj sesiji se nije pokrenuo, pa je rad bio u oblaku; `izvuci.py`/`izvuci-sucelje.py`
  (korak 0.3 uputa) nisu pokrenuti — memorije nisu dirane. Alat je pisan za Windows Python (UTF-8 izlaz).
