# Noćni rad: razine 13–20 (Lesson, Grammar, Practice, Test)

Napisano 29.09.2026. Brief za Claude Code, koji radi **jednu cjelinu po pozivu** (pokreće ga `preradi-vokabular.ps1`, druga faza, nakon što su gotove Vocabulary 1–20). Svaki poziv je nova sesija, pa sve što treba znati piše ovdje i u datotekama na koje ovaj dokument upućuje.

## Cilj

Razine 13–20 danas su kosturi (4–6 KB po datoteci). Treba ih dovesti na gustoću, strukturu i ton razina 10–12, koje su gotove i pregledane.

Redoslijed po razini: **Lesson → Grammar → Practice → Test**. Vocabulary N je već prerađen u prvoj fazi.

## Što čitati prije pisanja

| Cjelina | Upute | Uzor (gotove, pregledane) |
|---|---|---|
| Lesson | `UPUTE-prosirenje-lekcija-10-20.md` — cijeli dokument, uključujući § 4 specifikaciju za tvoju razinu | `igre/lekcija-10.md`, `lekcija-11.md`, `lekcija-12.md` |
| Grammar | isti dokument, § 1 i § 3 | `igre/gramatika-10.md`, `-11`, `-12` |
| Practice | isti dokument, § 1 i § 3 | `igre/praksa-10.md`, `-11`, `-12` |
| Test | isti dokument, § 1 | `igre/test-10.md`, `-11`, `-12` |

Uvijek pročitaj i: `igre/vokabular-NN.md` iste razine (riječi razine), cjeline iste razine koje su već gotove, `popis lekcija.md` (redak razine), `VODIC-izrada-i-prijevod.md` C2–C4, i `REVIEW-razine-L1-L12.md` § 3–4 (greške koje se ne smiju ponoviti).

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

## Provjera prije kraja

1. `node osvjezi.js` prolazi bez greške.
2. U `data.js` cjelina ima očekivani broj stranica (Lesson 15–19; Grammar, Practice i Test po uzoru na razine 10–12) i svaka stranica ima stavke.
3. Prođi pravila 1–7 za svoju datoteku i ispravi što ne štima.
4. Dopiši u `NOCNI-dnevnik-13-20.md` odjeljak `## <Cjelina> N`: broj stranica, što je dodano u vokabular, odluke koje si donio sam, i sve što treba ljudski pregled.
5. **Tek na kraju** dopiši točno zadani redak (npr. `GOTOVO L13`) u `vokabular-preradba-status.txt`.

## Kad nešto nije jasno

Nitko neće odgovoriti. Odluči razumno, drži se uzora iz razina 10–12, zapiši odluku u dnevnik i dovrši cjelinu.
