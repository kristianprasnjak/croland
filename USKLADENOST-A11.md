# Usklađenost tečaja s ispitom A1.1

**Provjereno: 18. 10. 2026.** Ponoviti kad izađe pravilnik (rok usklađivanja je 4. 12. 2026., vidi niže).

## 1. Što je službeno poznato

Izvor: Zakon o izmjenama i dopunama Zakona o strancima, NN 55/2026 (27. 5. 2026.).
https://narodne-novine.nn.hr/clanci/sluzbeni/2026_05_55_692.html

- **Čl. 92.a st. 1:** državljanin treće zemlje koji je u RH najmanje godinu dana na dozvoli za boravak i rad (čl. 97., produljena, ili čl. 110. t. 32.) dužan je položiti ispit poznavanja hrvatskog jezika i **latiničnog pisma**.
- **St. 2:** standardizirani ispit za osnovnu razinu (**A1.1**) provode: škole stranih jezika sa suglasnošću ministra rada (vaučeri), sveučilišta i njihove sastavnice te ustanove za obrazovanje odraslih sa suglasnošću ministarstva obrazovanja.
- **St. 3:** trošak ispita snosi poslodavac.
- **St. 5:** dokaz je i završen program obrazovanja odraslih na razini A1.1 ili višoj kod takve ustanove.
- **St. 7 i 8:** izuzeti su oni sa školovanjem u RH, govornici južnoslavenskih jezika i sezonski radnici.
- **St. 9:** način polaganja i trošak propisuje ministar unutarnjih poslova pravilnikom iz čl. 154. st. 4., uz suglasnost ministra obrazovanja.
- **Čl. 70:** zakon je na snazi od **4. 6. 2026.**, a obveza (čl. 92.a st. 1, 4 i 6) godinu dana kasnije, od **4. 6. 2027.** Datumi u PLAN-A11.md su točni. (Neki komercijalni izvori pišu "15. 5. 2026." To je datum izglasavanja, ne stupanja na snagu.)
- **Čl. 69 st. 3:** ministar mora uskladiti *Pravilnik o polaganju ispita iz poznavanja hrvatskoga jezika i latiničnog pisma u postupku odobrenja dugotrajnog boravišta* (NN 100/21) u roku od šest mjeseci, dakle **do 4. 12. 2026.** Format A1.1 najvjerojatnije će stići tim putem.

**Format, trajanje, bodovi i prag još nisu objavljeni** (provjerio sam NN, e-savjetovanja i MUP). Kruži i dokument s e-savjetovanja (GetDocx 17006), ali on je za dugotrajno boravište (B1) i ne spominje A1.1. Za usporedbu, taj model (B1) ima pet dijelova: slušanje, čitanje, jezične strukture, pisanje i govor. Prag je 60 % na pisanom dijelu, a pisanje i govor ocjenjuju se s "zadovoljio / nije zadovoljio". Kad A1.1 izađe, moguće je da se u njemu pojavi i dio "jezične strukture", kojeg u našem probnom ispitu nema. Zato je format parametriziran (`ispit` u `a11-sadrzaj/teme.json`).

Neslužbeni opisi (škole, savjetnici) slažu se oko sadržaja: predstavljanje, osobni podaci, brojevi, natpisi (i sigurnosni na radu), jednostavne upute, obrasci i latinica. HZZ vaučeri: najmanje 70 sati, a programi se prilagođavaju sektorima (graditeljstvo, turizam i ugostiteljstvo, proizvodnja, prehrambena industrija, zdravstvo i socijalna skrb, prijevoz, telekomunikacije, osobne usluge).

## 2. Tečaj (L0–L20) prema A1.1

Gramatički tečaj nadilazi A1.1: padeži, futur, perfekt, kondicional i vid su razina A2/B1. To nije problem, ali **put do ispita kroz tečaj je predug**. Radnik koji treba A1.1 ne smije morati proći 20 razina. Zato je modul A1.1 zaseban i tematski, a gramatika je samo onoliko koliko treba za fraze.

Pokrivenost vokabulara (broj pojava u stavkama `data.js`, ≥3 = dobro):

| Tema | Pokriveno | Nedostaje ili je slabo |
|---|---|---|
| Osobni podaci | 7/13 | *zovem se* (1×), *radim kao*, *prezime*, *oženjen / udana*, *državljanstvo* |
| Snalaženje | 8/10 | ***ne razumijem***, ***ponovite*** (ključno za usmeni dio) |
| Brojevi, datum, sat | 15/18 | **mjeseci gotovo nema** (siječanj–studeni 0×, prosinac 6×, kolovoz 2×); *datum*, *tisuću* slabo |
| Kupovina | 7/10 | *blagajna*, *gotovina*, *popust* |
| Grad i prijevoz | 14/15 | *vozni red* |
| **Posao** | 10/22 | *smjena, radno vrijeme, bolovanje, godišnji, ugovor, prekovremeni, kaciga, zaštitna oprema, gradilište, skladište, čistač(ica)*; *slobodan dan* 1× |
| **Zdravlje** | 6/14 | *liječnik, trbuh, hitna, ambulanta (samo slika), osiguranje*; *lijek, bolestan, temperatura* slabo |
| **Dokumenti** | 4/14 | *obrazac, OIB, putovnica, osobna iskaznica, policija, MUP, zahtjev, prijava, šalter*; *termin* 1× |
| Stanovanje | 7/14 | *najam / najamnina / stanarina, režije, struja, grijanje* |
| **Natpisi** | 6/15 | *ZABRANJENO, OPASNOST, PAZI, NE PUŠITI, GURAJ / VUCI, WC, ZAUZETO, RADNO VRIJEME* |

Mjereno je grubo, prepoznavanjem nizova u tekstu, pa su moguće sitne lažne pojave. Smjer nalaza je ipak jasan.

**Vještine:** slušanja ima puno (5610 zvukova), a čitanje je pokriveno formatom *tekst* (338). Pisanje postoji kao *upis*, ali **nema ispunjavanja obrasca**, a baš to neslužbeni izvori navode kao zadatak. Govor postoji samo u LRWS-u (mikrofon), nema strukturiranog predstavljanja ni odgovaranja na pitanja.

**Latinica:** zakon je izričito traži, a tečaj nigdje ne poučava abecedu (0 vježbi o slovima; L0 i traka abecede pretpostavljaju da korisnik već čita latinicu). Ciljana skupina (nepalski, hindski, bengalski, sinhalski, urdu, arapski) često ne čita latinicu. **Ovo je najveća praznina.**

**Jezik:** cijeli tečaj je na engleskom (DE i ES samo kao jezik objašnjenja). Za ciljanu skupinu modul A1.1 s uputama na materinskom jeziku nije ukras nego uvjet.

## 3. Što je promijenjeno odmah (18. 10.)

- Dodana tema **0 "Latinica i snalaženje"** (`latinica`): abeceda, č ć dž đ lj nj š ž, sricanje imena, velika tiskana slova za obrasce, *Ne razumijem. Ponovite, molim. Polako, molim.*
- PLAN-A11.md: datumi potvrđeni iz NN, rok za pravilnik i prioriteti za F4 (niže).

## 4. Preporuke za F4 (banka zadataka)

1. **Redoslijed:** Latinica → Dokumenti (obrazac!) → Posao → Natpisi → Zdravlje → Brojevi (s mjesecima) → ostalo.
2. **Obrazac** kao vlastiti tip zadatka: ime, prezime, datum rođenja, državljanstvo, adresa, OIB, telefon, potpis. Isti tip služi pisanju u probnom ispitu.
3. **Posao po sektorima:** jezgra je zajednička (smjena, plaća, šef, slobodan dan, bolovanje, zaštitna oprema), a uz nju idu kratki dodaci za graditeljstvo, ugostiteljstvo, proizvodnju i skladište, čišćenje i njegu.
4. **Natpisi** kao slike pravih natpisa: sigurnosni (OPASNOST, ZABRANJEN PRISTUP, OBAVEZNA ZAŠTITNA OPREMA), vrata (GURAJ / VUCI), radno vrijeme.
5. **Govor:** predstavljanje u 5 rečenica (*Zovem se… Dolazim iz… Živim u… Radim kao… Imam … godina.*) i 3 pitanja.
6. **Mjeseci i datumi** i u glavni tečaj (L11 *Questions & Numbers* ili L18), ne samo u A1.1.
7. Preporuke "ponovi u tečaju" u A1.1 vežu se na `tecaj` (L2, L4, L5, L6, L13, L16, L18).

## 5. Pratiti

- NN i e-savjetovanja: izmjena pravilnika NN 100/21 (rok 4. 12. 2026.).
- Popis ovlaštenih ustanova (MZOM, link na stranici MUP-a) i njihovi ogledni ispiti.
- Kad izađe format: promijeniti `ispit` u `teme.json`, postaviti `sluzbeno: true`, maknuti napomenu "neslužbeno".
