# Njemački tečaj — dva jezika sučelja (hrvatski i engleski)

Verzija 1, 29.09.2026. Odluka: **sučelje i objašnjenja na hrvatskom**, a **engleska verzija nastaje
istodobno**, u istom prolazu, ne kao kasniji prijevod. Ovaj dokument kaže što to mijenja u sadržaju,
formatu i kodu. Vrijedi uz `DE-gramaticka-kraljeznica.md`, `DE-plan-tecaja.md` i `DE-detaljni-plan.md`.

---

## 1. Načelo: jedan njemački, dva objašnjenja

Tečaj ima tri sloja. Samo jedan ovisi o jeziku polaznika.

| Sloj | Primjeri | Jezik |
|---|---|---|
| **Njemački sadržaj** | rečenice, dijalozi, priče, zadaci, točni i krivi odgovori, zvuk | **zajednički** — piše se jednom |
| **Objašnjenja i upute** | `info:`, pravila, *Culture note*, upute zadataka, Blobby | **dva teksta**: hrvatski i engleski |
| **Most prema materinskom jeziku** | „kao hrvatski akuzativ“, „kao engleski *him*“ | **dva različita teksta** — ne prevode se, pišu se svaki za sebe |

Posljedica: kad se popravi njemačka rečenica, popravak vrijedi za obje verzije. Kad se popravi
objašnjenje, popravljaju se oba jezika u istom koraku.

---

## 2. Pravila pisanja (dopuna pravila kvalitete iz `VODIC…` C4)

1. **Jezgra objašnjenja ne smije ovisiti o materinskom jeziku.** Pravilo mora biti razumljivo
   samo za sebe. Usporedbe idu u zaseban redak *Most* (`most-hr:`, `most-en:`), koji se smije
   izostaviti.
   - Jezgra: *U akuzativu se mijenja samo muški rod: der → den, ein → einen.*
   - `most-hr:` *Isto pitanje kao u hrvatskom (koga? što?), ali se promjena vidi na članu, ne na imenici.*
   - `most-en:` *Like English he → him — but here it happens to the article.*
2. **Hrvatski ima svoje prednosti i treba ih koristiti.** Polaznik iz Hrvatske zna padeže, rod i
   razliku *ti/Vi*. Hrvatski *most* smije biti kraći i hrabriji (npr. „njemački ima četiri padeža,
   ti znaš sedam“). Engleski *most* mora objasniti više.
3. **Rod polaznika u hrvatskom tekstu.** Engleski ga ne pokazuje, hrvatski da (*Jesi li spreman?*).
   Hrvatske upute pišu se rodno neutralno (*Spremno? Idemo.*, *Bravo!*, *Tvoj rezultat*), a gdje to
   nije moguće, s oba oblika (*spreman/spremna*). Vrijedi i za Blobbyja.
4. **Obraćanje u hrvatskom sučelju: *ti*.** Kao u većini aplikacija za učenje. *Vi* se pojavljuje
   samo u sadržaju kad se uči njemački *Sie*.
5. **Nema igre riječi u jezgri.** Šala koja radi samo na jednom jeziku ide u *most* ili se piše dvaput,
   drukčije. Blobbyjev humor se **prilagođava, ne prevodi** — dva zapisa glasa:
   `blobby-glas-de-hr.md` i `blobby-glas-de-en.md`.
6. **Zadaci s prijevodom** („Što znači *Kuli*?“, „Type it in German“) imaju ponuđene odgovore na
   jeziku polaznika. Tragovi u odgovorima (pravilo 33 % iz C4.2) mjere se **za svaki jezik posebno**,
   jer hrvatski padeži i rod mogu odati točan odgovor kad engleski ne odaje.
7. **Lažni prijatelji su po jeziku.** Hrvatski: *Kuli* nije „kula“, *Gift* je „otrov“, *Lokal* je
   „birtija“. Engleski: *will* nije „will“, *Gift* nije „gift“, *bekommen* nije „become“.
   Svaka razina ima popis za oba jezika u Grammar cjelini.
8. **Duljina:** hrvatski tekst je oko 10–20 % dulji od engleskog. Gumbi i naslovi moraju imati mjesta
   za dulju verziju.
9. **Gramatički nazivi:** hrvatski ima školske nazive (*akuzativ, pridjev, glagol, odvojivi glagol*);
   engleski koristi *accusative, adjective, separable verb*. Popis naziva je zajednički (odjeljak 5).
10. **Kultura za dvije publike.** *Culture note* piše se tako da radi za oboje; hrvatski smije dodati
    redak koji se tiče Hrvata (npr. radnici u Njemačkoj i Austriji, *Gastarbeiter* povijest, Beč i Graz).

---

## 3. Likovi: Anna postaje most između dviju publika

Anna je bila Kanađanka, što radi samo za englesku publiku. Prijedlog:

**Ana Horvat (28), rođena u Torontu u hrvatskoj obitelji.** Doma je govorila hrvatski, vani engleski.
Seli se u Berlin zbog posla. Za hrvatskog polaznika ona je „naša“, za engleskog je Kanađanka.
Njemački je za nju jednako nov kao za oba polaznika.

- Na njemačkom ostaje *Anna* (tako se ime piše u Njemačkoj), u hrvatskim objašnjenjima *Ana*.
- L1: *Ich heiße Anna und komme aus Kanada. Ich spreche Englisch und Kroatisch.*
- Oma Hilde, Jonas, Frau Yilmaz, Herr Schulz i Lena ostaju.
- Jedan novi sporedni lik za hrvatsku publiku: **Marko**, Anin bratić koji radi u Grazu (Austrija).
  Donosi austrijske riječi (*Jänner, Paradeiser*) i priče o radu u inozemstvu. Pojavljuje se u
  nekoliko Practice priča (L7, L11, L17).

---

## 4. Format sadržaja (`.md` i parser)

Jedna `.md` datoteka po cjelini, s oba jezika. Njemački se nikad ne duplicira.

**Naslov stranice i ključ bodova.** U Crolandu su bodovi vezani uz naslov stranice. S dva jezika naslov
više ne može biti ključ. Svaka stranica dobiva stalni `id:`:

```
## Samo se der mijenja
id: l04-akkusativ-pravilo
naslov-en: Only der changes
format: tekst
info: U akuzativu se mijenja samo muški rod: der → den, ein → einen.
info-en: In the accusative only the masculine changes: der → den, ein → einen.
most-hr: Isto pitanje kao u hrvatskom (koga? što?), ali se promjena vidi na članu.
most-en: Like English he → him — but here it happens to the article.
- Ich habe [einen] Bruder. | Imam brata. // I have a brother.
```

- `##` naslov je hrvatski (primarni jezik), `naslov-en:` engleski.
- Meta-ključevi s nastavkom `-en` su engleska verzija; bez nastavka hrvatska.
- U stavkama se prijevod piše kao `hrvatski // engleski`. Parser dijeli na ` // `.
- `most-hr` i `most-en` su neobavezni i prikazuju se kao zaseban okvir.
- Build (`osvjezi.js`) iz istih datoteka pravi `data-hr.js` i `data-en.js`. **Build pada** ako
  stranica ima jedan jezik, a nema drugi (ista „brava“ kao za plaćeni sadržaj).

**Rječnik:** `DE-rjecnik-800.tsv` već ima oba prijevoda. Za aplikaciju:
`rjecnik-de.jsonl` (lema, član, množina, oblici) + `prijevodi-de-hr.jsonl` + `prijevodi-de-en.jsonl`.

---

## 5. Kod

1. **Tekstovi sučelja** (gumbi, izbornici, poruke) izdvajaju se iz `index.html` u `ui-hr.json` i
   `ui-en.json`. Danas su na engleskom i ugrađeni u kod.
2. **Izbor jezika** pri prvom posjetu (po jeziku preglednika) i u postavkama; sprema se u profil.
3. **Jezični profil tečaja** (`jezik.js`, preporuka iz `VODIC…` E1): njemačka tipkovnica
   *ä ö ü ß*, prihvaćanje *ss / ae* uz napomenu, velika slova imenica kao greška koja se boduje blaže.
4. **Pojmovnik gramatičkih naziva** (`pojmovi.json`): isti ključ, dva naziva
   (`akkusativ` → *akuzativ* / *accusative*).
5. **Domena i trgovina:** jedna aplikacija, dva jezika; Stripe cijena u eurima za obje verzije.

---

## 6. Radni tijek

- Svaka cjelina se piše **u jednoj sesiji na oba jezika**: prvo njemački sadržaj, pa hrvatska
  objašnjenja, pa engleska, pa *most* za svaki jezik.
- Revizijski alat dobiva prekidač jezika. Svaka stranica se odigra **barem jednom na hrvatskom**;
  engleska verzija se provjerava uzorkom i skriptom (nedostaje li polje, je li duljina u redu).
- Skripta za provjeru (iz kralježnice) dobiva dvije nove provjere: jesu li oba jezika prisutna i
  koliko tragova ima u odgovorima po jeziku.
- Pilot (L0 + L1) radi se odmah dvojezično, da se format provjeri na stvarnoj lekciji prije serije.

---

## 7. Što se mijenja u postojećim dokumentima

| Dokument | Promjena |
|---|---|
| `DE-gramaticka-kraljeznica.md` | Publika: hrvatski (primarno) i engleski; ostalo bez promjene |
| `DE-plan-tecaja.md` | Anna → Ana Horvat iz Toronta; novi lik Marko u Grazu; kultura za obje publike |
| `DE-detaljni-plan.md` | naslovi stranica dvojezični (`##` hrvatski + `naslov-en`); primjeri ostaju |
| `DE-review-plana.md` | odluka 2.1 donesena: varijanta (c), ublažena pisanjem u jednom prolazu |
| `DE-rjecnik-800.tsv` | bez promjene (već dvojezičan) |
