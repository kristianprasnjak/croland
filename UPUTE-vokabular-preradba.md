# Preradba Vocabulary cjelina 1–20

Napisano 29.09.2026. Brief za Claude Code, koji radi **jednu razinu po pozivu** (pokreće ga `preradi-vokabular.ps1`). Svaki poziv je nova sesija bez sjećanja na prethodnu, pa sve što treba znati piše ovdje.

## Cilj

Svaka `igre/vokabular-NN.md` prepisuje se po modelu **upoznaj → izvježbaj jednom → pomiješaj sa starim**:

1. **Upoznaj.** Riječ se veže uz značenje na engleskom (kartice se od 29.09. okreću: lice je engleski, naličje slika, hrvatska riječ, zvučnik i + za rječnik).
2. **Izvježbaj jednom.** Jedna vježba samo s novim riječima, i to proizvodnja (upis), ne prepoznavanje.
3. **Pomiješaj.** Tri do četiri vježbe u kojima je **pola novih, pola starih riječi**. Stare riječi za razinu N stoje u `vokabular-plan.json` pod ključem `"N"` (generira ih `vokabular-stare.js`). Koristi upravo njih, ne biraj sam.

Cjelina ima **6–8 stranica** (do 9 kad razina ima više od 60 riječi), umjesto sadašnjih 13–18.

## Raspored stranica

| # | Format | Riječi | Napomena |
|---|---|---|---|
| 1–3 | `kartice` | nove | Najviše 20 kartica po stranici. Grupiraj po temi (npr. „Food“, „At the table“, „Verbs“). Glagol: `čitati → čitam` ili s tri oblika kao dosad. Imenica koja se mijenja kao meta od L5 nadalje smije nositi par `kava → kavu`. |
| sljedeća | `spajanje` (slika ↔ riječ) **ili** `parovi` | nove | `spajanje` samo ako za **barem 8** novih riječi postoji slika u `slike/` (ime datoteke = riječ, prvo slovo veliko, `.webp`). Inače `parovi`. |
| sljedeća | `upis` (engleski → hrvatski) | nove | 10–15 stavki. Jedini korak „izvježbaj jednom“. |
| sljedeća | `parovi` ili `memorija` | pola/pola | 10–12 parova. |
| sljedeća | `brzina` | pola/pola | 14–20 stavki, `trajanje: 60`. |
| sljedeća | `razvrstavanje` | pola/pola | Stupci po temi, rodu, obitelji riječi (*kuhati · kuhar · kuhinja*) ili po nečemu što ova razina uči (npr. L5 „mijenja se / ostaje isto“, L7 „-i / -e / -a“). |
| zadnja | `upis` ili `slova` | pola/pola | Završno pisanje. `slova` samo za riječi s č, ć, dž, đ, lj, nj, š, ž. |
| (opcija) | `baloni` ili `pamti` | pola/pola | Samo kad razina ima > 60 novih riječi. |

**Razina 1** nema ranijih Vocabulary cjelina: njezine „stare“ riječi su riječi iz Lesson 0 (`igre/lekcija-0.md`) — i one su u planu.

## Koje su riječi „nove“

- **Razine 1–12:** nove riječi su one koje su danas na karticama `vokabular-NN.md`. Zadrži ih sve osim očitih duplikata. Smiješ dodati riječ koju Lesson/Grammar/Practice iste razine koristi, a nema je ni na jednoj kartici tečaja do te razine.
- **Razine 13–20:** današnje datoteke su kosturi od 5 stranica. Popis novih riječi sastavi iz `lekcija-NN.md`, `gramatika-NN.md`, `praksa-NN.md` iste razine i iz retka razine u `popis lekcija.md` (cilj je oko 55 riječi, uz 10 glagola s *ja*-oblikom). Kartice koje nose padežne oblike umjesto riječi (npr. *vlakom*, *s Markom* u V15) pretvori u osnovne riječi; padežni oblik smije stajati kao drugi oblik na kartici (*vlak → vlakom*).

## Pravila sadržaja (obavezna)

- Sintaksa formata: `UPUTE-prosirenje-lekcija-10-20.md`, odjeljak 1. Pravila kvalitete: `VODIC-izrada-i-prijevod.md`, C2 i C4.
- Svaka stranica ima `info:`, `infokratko:` i `opis:`. Sučelje je na engleskom, gradivo na hrvatskom.
- Znak `|` ne smije biti unutar stavke.
- Ne uvodi gramatiku koju razina još nema. Vježbe su na razini riječi; riječ stoji u osnovnom obliku, osim para *naming → target* od L5 i množine od L7 ako je razvrstavanje o tome.
- Distraktori u `izbor` moraju biti netočni sami po sebi i ne smiju se odavati oblikom (VODIC C4.2).
- Prijevod iste riječi mora biti isti kao drugdje u tečaju (npr. *susjed = neighbour*, *mama = mom*). Provjeri grepom po `igre/`.
- **Naslovi (`## …`) nose bodove.** Kad stranica ostaje istog formata i sadržaja (npr. kartice „Close family“), zadrži njezin točan naslov. Nove stranice dobivaju nove naslove.
- Zaglavlje datoteke (`# Naslov` i `cjelina: Vocabulary N`) ostaje nepromijenjeno.
- Svaka riječ koju polaznik vidi mora imati prijevod u `prijevodi.jsonl`. Ako riječ nedostaje u `rjecnik.jsonl`, **ne dodaji je** — zapiši je u dnevnik (vidi dolje).

## Što smiješ mijenjati

Samo `igre/vokabular-NN.md` za razinu koju radiš, plus dnevnik i status. Ne diraj `index.html`, `data.js` (generira ga skripta), druge `igre/*.md`, rječnik ni slike.

## Provjera prije kraja

1. `node osvjezi.js` mora proći bez greške.
2. U `data.js` provjeri da `Vocabulary N` ima 6–9 igara i da svaka ima stavke.
3. Pobroji: u miješanim vježbama udio starih riječi je 40–60 %; svaka stara riječ iz plana za N pojavljuje se barem jednom.
4. Dopiši u `VOKABULAR-dnevnik.md` odjeljak `## Vocabulary N` s: brojem stranica, brojem novih i starih riječi, riječima koje nedostaju u rječniku, riječima bez slike (ako je spajanje zamijenjeno parovima), i svime što je bilo nejasno.
5. **Tek kad je sve gore prošlo**, dopiši redak `GOTOVO N` u `vokabular-preradba-status.txt`. Taj redak runner čita da zna da je razina gotova. Ako nešto nije prošlo, redak ne piši — runner će razinu ponoviti.

## Kad nešto nije jasno

Nitko neće odgovoriti na pitanje — radiš bez nadzora. Odluči razumno, drži se ovog dokumenta i zapiši odluku u dnevnik. Ne staj na pola: bolje gotova razina s bilješkom nego nedovršena datoteka.
