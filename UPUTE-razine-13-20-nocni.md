# Noćni rad: razine 13–20 (Lesson, Grammar, Practice, Test)

Napisano 29.09.2026. Brief za Claude Code, koji radi **jednu cjelinu po pozivu** (pokreće ga `preradi-vokabular.ps1`, druga faza, nakon što su gotove Vocabulary 1–20). Svaki poziv je nova sesija, pa sve što treba znati piše ovdje i u datotekama na koje ovaj dokument upućuje.

## Cilj

Razine 13–20 danas su kosturi (4–6 KB po datoteci). Treba ih dovesti na gustoću, strukturu i ton razina 10–12, koje su gotove i pregledane.

Redoslijed po razini: **Lesson → Grammar → Practice → Test**. Vocabulary N je već prerađen u prvoj fazi.

## Što čitati prije pisanja

**Od v5 (30.09.) jedna sesija radi cijelu razinu:** Lesson → Grammar → Practice → Test, redom, i nakon svake cjeline odmah upisuje njezin `GOTOVO` redak. Ako neka cjelina razine već ima `GOTOVO`, preskoči je.

1. **Upute:** `_radno/upute-razina-N.md` — doslovni izvadak svih odjeljaka koji vrijede za razinu N (ovaj dokument, `UPUTE-prosirenje-lekcija-10-20.md` § 1–3, § 4 za tvoju razinu i § 5, `VODIC` C2–C4 i F, `REVIEW` § 3–4, redak iz `popis lekcija.md`). Pročitaj ga **jednom, cijelog**, na početku sesije. Izvorne dokumente otvaraj samo ako ti u izvatku nešto nedostaje.
2. **Uzori** (gotovi, pregledani), prije pisanja svake cjeline:

| Cjelina | Obavezni uzor | Drugi uzor (za raznolikost) |
|---|---|---|
| Lesson | `igre/lekcija-12.md` | `igre/lekcija-11.md` |
| Grammar | `igre/gramatika-12.md` | `igre/gramatika-11.md` |
| Practice | `igre/praksa-12.md` | `igre/praksa-11.md` |
| Test | `igre/test-12.md` | `igre/test-11.md` |

3. `igre/vokabular-NN.md` iste razine (riječi razine) i izvorni kostur cjeline koju pišeš. Cjeline iste razine koje si u ovoj sesiji već napisao imaš u kontekstu — ne čitaj ih ponovno.

**Ako datoteka cjeline već izgleda proširena** (prekinut raniji pokušaj, npr. zbog limita), ne počinji ispočetka: pročitaj je, provjeri po pravilima i dovrši.

**Štednja bez gubitka kvalitete:** svaku datoteku zapiši jednim `Write` kad je gotova (ne gradi je nizom sitnih izmjena); `data.js` (1,9 MB) nikad ne otvaraj — za provjeru služi `provjeri-cjelinu.js`; dnevnik ne čitaj, samo mu dopiši odjeljak na kraj.

## Pravila koja proizlaze iz pregleda razina 1–12 (obavezna)

1. **U bodovanom zadatku (točan odgovor ili distraktor) smije biti samo gramatika koja je uvedena** do te razine ili na toj stranici. Pasivne riječi u tekstovima su u redu, ali ih navedi u napomeni *Passive words*.
2. **Distraktor mora biti stvarno netočan hrvatski.** Ne nudi kao grešku gramatičnu rečenicu s drugim redom riječi ili naglašenim oblikom (*Konobar vidi nas*, *Sutra hoću plivati* su bili takve greške).
3. Klitike: *je, sam, ću, ga, mu, se, li…* stoje na drugom mjestu, i iza veznika *jer, da, ako, kad* (*jer je danas*, ne *jer danas je*).
4. Perfekt i kondicional uvijek nude **oba roda** polaznika; za skupinu samih žena *-le*, za srednji rod množine *-la*.
5. Vid: za jednokratni završeni događaj svršeni glagol (*stići*, ne *stizati*) — i prije L19, u primjerima.
6. **Dijalog reagira na izbor**: barem jedna replika po dijalogu komentira ono što je igrač odabrao. NPC ne smije pretpostaviti rod igrača.
7. **Practice je raznolik**: uz tekstove s pitanjima barem jedna zagonetka (odgovor se izvodi, ne čita) i barem jedan tekst iz stvarnog svijeta (oglas, poruka, jelovnik, karta, raspored, recept…). Priče moraju biti logične i dosljedne između teksta, pitanja i `poredak` stranice.
8. Svaka riječ koju Lesson/Practice uvodi kao aktivnu mora biti na karticama `vokabular-NN.md`. Ako fali, **dodaj je na postojeću stranicu kartica** u `vokabular-NN.md` (ne mijenjaj druge stranice tamo).
9. Test ima stranicu *From the earlier levels* i pokriva cijelu razinu; L15 i L20 su modulni testovi (Modul C, završni).

## Što smiješ mijenjati

Samo datoteku cjeline koju radiš (`igre/lekcija-NN.md`, `gramatika-NN.md`, `praksa-NN.md` ili `test-NN.md`), iznimno kartice u `igre/vokabular-NN.md` (pravilo 8), plus dnevnik i status. Prije pisanja spremi kopiju izvorne datoteke u `igre/_bak-prije-prosirenja/` ako tamo još nije. Zaglavlje (`# Naslov`, `cjelina: …`) ostaje. Postojeći naslovi stranica (`## …`) koji ostaju istog formata zadržavaju točan naslov (bodovi su vezani uz njih).

## Provjera prije kraja (za svaku cjelinu)

1. `node osvjezi.js` prolazi bez greške.
2. `node provjeri-cjelinu.js igre/<datoteka>.md` — nema GRESAKA; svako UPOZORENJE pogledaj i ispravi ili u dnevniku obrazloži zašto je u redu.
3. **Pročitaj svoj tekst još jednom, stavku po stavku,** i prođi pravila 1–7: skripta hvata samo mehaniku (format, prazna polja, broj stranica, očite klitike); gramatiku, distraktore, rod, vid, dijaloge i logiku priče provjeravaš ti.
4. Dopiši u `DNEVNIK-razine-13-20.md` odjeljak `## <Cjelina> N`: broj stranica, što je dodano u vokabular, odluke koje si donio sam, i sve što treba ljudski pregled.
5. **Tek na kraju** dopiši točno zadani redak (npr. `GOTOVO L14`) u `vokabular-preradba-status.txt`, pa prijeđi na sljedeću cjelinu razine.

## Kad nešto nije jasno

Nitko neće odgovoriti. Odluči razumno, drži se uzora iz razina 10–12, zapiši odluku u dnevnik i dovrši cjelinu.
