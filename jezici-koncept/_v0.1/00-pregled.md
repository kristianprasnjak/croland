# Koncept tečajeva — 13 jezika · pregled

Verzija 0.1, 20.10.2026. Status: **koncept** (skraćena faza 1 + skraćena faza 2), još neprovjeren.
Svaki jezik ima svoju datoteku u ovoj mapi; ovdje je ono što je zajedničko i usporedno.

Za njemački postoji detaljni plan (`DE-plan-tecaja.md`, `DE-gramaticka-kraljeznica.md`);
`de.md` ga samo sažima u isti oblik kao ostale, ne zamjenjuje ga.

---

## 1. Zajednički kostur (vrijedi za sve jezike dok se ne kaže drukčije)

| | |
|---|---|
| Struktura | **Lesson 0** (glasovi, pismo) + **20 razina × 5 cjelina** |
| Cjeline razine | **Lesson** (uvod u temu i gramatiku) · **Vocabulary** · **Grammar** · **Practice** (priče, tekstovi) · **Test** |
| Tempo | 1 razina ≈ 1 tjedan, 25–35 min dnevno |
| Moduli (veći testovi) | nakon L6, L12, L16 i završni L20 (može se pomaknuti po jeziku) |
| Vokabular | A1: 45–65 novih riječi po razini · A2: 70–80 · azijski jezici i arapski manje, uz znakove |
| Pravilo kralježnice | nijedan oblik ne smije se pojaviti u rečenici prije razine u kojoj se uči (osim kao zamrznuta fraza, i tada je označen) |
| Priča | jedan glavni lik i mali stalni krug likova kroz cijeli tečaj; svaka razina je jedan tjedan njihova života |
| Naslovi u tablicama | radni naslovi na engleskom, kao u postojećim datotekama; nisu izvor ni prednost engleskog sučelja |

### Model jezika sučelja: izvor + promišljeni prijevod

Objašnjenja se pišu jednom (izvor), a prevode se **s uputom**, ne mehanički. Svaki koncept zato ima odjeljak
„Izazovi po materinskom jeziku“, koji je ulaz za taj sloj prijevoda:

- **što je za govornika tog jezika lako** → objašnjenje se smije skratiti, uz usporedbu („kao u hrvatskom…“);
- **što je teško ili zavodljivo** → objašnjenje se proširuje, dodaju se primjeri i vježba više;
- **lažni prijatelji, tipične greške, izgovor** → dodatne napomene samo u tom jeziku sučelja.

Izazovi su u konceptima razrađeni za **hrvatski i engleski** kao prva dva jezika sučelja, s kratkom napomenom
za ostale skupine (slavenski, romanski, germanski, ostali).

---

## 2. Usporedna tablica

Težina: 1 = vrlo lako, 5 = vrlo teško (procjena za prvih 20 razina).

| Jezik | Datoteka | Cilj nakon L20 | Razine | Pismo | Vokabular ukupno | Glavni izazov | Težina HR | Težina EN |
|---|---|---|---|---|---|---|---|---|
| Francuski | `fr.md` | A2 | L0 + 20 | latinica | ≈ 1300 | izgovor i pravopis, glagoli, *passé composé* | 3 | 2 |
| Engleski | `en.md` | A2+ (prema B1) | L0 + 20 | latinica | ≈ 1500 | izgovor, glagolska vremena, članovi | 2 | — |
| Njemački | `de.md` | A1 + jezgra A2 | L0 + 20 | latinica | ≈ 1350 | rod, padeži, red riječi | 3 | 3 |
| Talijanski | `it.md` | A2 | L0 + 20 | latinica | ≈ 1300 | članovi, *essere/avere*, spojeni prijedlozi | 2 | 2 |
| Španjolski | `es.md` | A2 | L0 + 20 | latinica | ≈ 1300 | *ser/estar*, dva prošla vremena, subjuntivo | 2 | 2 |
| Portugalski | `pt.md` | A2 | L0 + 20 | latinica | ≈ 1300 | izgovor (nazali), varijanta BR/PT, *ser/estar* | 2 | 2 |
| Ruski | `ru.md` | A2 | L0 + 20 | ćirilica | ≈ 1200 | naglasak i redukcija, padeži, glagoli kretanja | 2 | 4 |
| Interslavenski | `isv.md` | B1 (slavenski) / A2 (ostali) | L0 + 16 | latinica (+ ćirilica) | ≈ 1400 | razlikovanje od materinskog slavenskog jezika | 1 | 4 |
| Esperanto | `eo.md` | B1 | L0 + 18 | latinica (ĉ ĝ ĥ ĵ ŝ ŭ) | ≈ 1400 | tvorba riječi, akuzativ *-n*, korelativi | 1 | 2 |
| Latinski | `la.md` | čitanje prilagođenih tekstova | L0 + 20 | latinica | ≈ 1200 | padeži, glagolski sustav, slobodan red riječi | 3 | 4 |
| Kineski (mandarinski) | `zh.md` | HSK 2 / A2− | L0 + 20 | hanzi + pinyin | ≈ 600 riječi, ≈ 450 znakova | tonovi, znakovi | 5 | 5 |
| Japanski | `ja.md` | A2− (JLPT N5) | L0a + L0b + 20 | hiragana, katakana, kanji | ≈ 800 riječi, ≈ 120 kanjija | tri pisma, red riječi, razine uljudnosti | 5 | 5 |
| Arapski (MSA) | `ar.md` | A1+ / A2− | L0a + L0b + 20 | arapsko pismo (RTL) | ≈ 800 | pismo, glasovi, korijeni i obrasci | 5 | 5 |

Gdje je razina manje od 20 (interslavenski, esperanto), to je namjerno: jezici su pravilni i za
dio polaznika vrlo bliski, pa bi 20 razina značilo umjetno rastezanje. Gdje ima više L0 cjelina
(japanski, arapski), pismo se ne može svladati u jednoj.

---

## 3. Odluke koje treba donijeti prije faze 3

Globalne:

1. **Fiksnih 20 razina ili po jeziku?** Prijedlog: 20 je norma; odstupanja (16, 18, dodatni L0) dopuštena uz obrazloženje u konceptu. Utječe na cjenik i prikaz napretka u aplikaciji.
2. **Jedan glavni lik po jeziku ili zajednički lik koji putuje?** Prijedlog: po jeziku (lik živi u zemlji jezika), ali iste uloge u krugu likova (cimer, susjed, kolega, starija osoba, dijete), da se mehanike priče mogu dijeliti.
3. **Upis teksta za druga pisma** (ćirilica, kana, hanzi, arapsko pismo): vlastita tipkovnica u aplikaciji (kao hrvatska tipkovnica) ili prepoznavanje latiničnog upisa (pinyin, romaji)? Prijedlog: vlastita tipkovnica za ćirilicu i arapsko pismo, upis preko pinyina i romajija s izborom znaka za kineski i japanski.
4. **Zvuk:** postoji li dovoljno dobar TTS za sve jezike (posebno latinski, interslavenski, esperanto)? Za latinski treba odluka o izgovoru (vidi `la.md`).

Po jeziku (detalji u datotekama):

| Jezik | Odluka |
|---|---|
| Portugalski | brazilski ili europski portugalski kao glavni |
| Španjolski | europski ili latinoamerički kao glavni (*vosotros*, *ustedes*, izgovor *c/z*) |
| Engleski | britanski ili američki pravopis i izgovor |
| Arapski | samo MSA ili MSA + jedan dijalekt (egipatski / levantski) za razgovor |
| Kineski | pojednostavljeni znakovi (prijedlog) ili tradicionalni |
| Latinski | klasični ili crkveni izgovor; cilj čitanje ili i govor |
| Interslavenski | latinica kao glavna, ćirilica opcija; koji standard (medžuslovjansky.com) |
| Japanski | kada se ukida romaji (prijedlog: nakon L0b nema ga u tekstu, samo kao pomoć) |

---

## 4. Prijedlog redoslijeda izrade

1. **Njemački** — najdalje je odmakao; na njemu se dovršava procedura.
2. **Francuski, talijanski, španjolski, portugalski** — romanski blok: drugi i ostali jezici u bloku mogu dobrim dijelom slijediti rješenja prvoga.
3. **Engleski** — velika publika; drukčiji problemi (izgovor, vremena), malo gramatike oblika.
4. **Ruski, interslavenski** — slavenski blok; za govornike hrvatskog brzo, za ostale treba više objašnjenja.
5. **Esperanto, latinski** — manja publika, jasna struktura; latinski traži drukčiji cilj (čitanje).
6. **Kineski, japanski, arapski** — najviše novih mehanika (pismo, tonovi, upis); bolje kad je procedura stabilna.

---

## 5. Sljedeći koraci

- **Provjera ovog koncepta** (faza 1–2): neovisna sesija prolazi svaku datoteku po popisu kontrola
  (pokrivenost CEFR razine, redoslijed preduvjeta, opterećenje po razini, krše li rane razine kralježnicu,
  jesu li izazovi po materinskom jeziku točni), piše izvještaj, nalazi se ugrađuju.
- **Dnevnik iskustava**: zapisati što se tijekom izrade koncepta pokazalo kao zajedničko pravilo.
- Za jezik koji ide prvi u izradu: puna faza 1 (kao `DE-gramaticka-kraljeznica.md`) i puna faza 2 (kao `DE-plan-tecaja.md`).
