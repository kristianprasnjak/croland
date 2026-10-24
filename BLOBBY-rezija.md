# Blobby — režija i pravila

Blobby je živi lik aplikacije (`blobby.js`). Ovdje su sva pravila kako i kad govori i glumi.
Laboratorij za pokrete i izraze: `blobby-opusteno.html`.

## Gdje se pojavljuje

Samo tamo gdje nam se obraća, gdje nije preozbiljno i gdje treba razbiti napetost:

- **Lekcije:** svaki redak s Blobbyjevom rečenicom (rečenice iz `blobby-glas.md`; prepoznaje ih `BLOBBY_RECI` u `index.html`).
- **Unit complete:** završni ekran cjeline.

Ne pojavljuje se:

- na ozbiljnim mjestima: plaćanje, prijava, postavke
- uz nebitne međurezultate
- tijekom samih vježbi
- na marginama zaslona (one su za papiriće i lebdeće ikone)

## Kako progovori

1. Kad oblačić dođe na ekran, **napuše se iz njegovih usta** do konačne veličine. Mjesto je rezervirano unaprijed, pa stranica ne skače.
2. Tek tada **izraste živi šiljak**. Svaki kadar se izračuna prema njegovim ustima i uvijek ostane malo odmaknut, a prati ga dok se miče.
3. **Tekst se ispisuje** slovo po slovo, uvijek istim tempom, pri svakom dolasku na stranicu. Usta prate slova. Naglašena (podebljana) riječ kratko podigne obrve.
4. Kad je tekst ispisan, **šiljak se uvuče** i nestane. Tekst ostaje.

Tempo: slovo 36 ms, razmak 24 ms, zarez i crtica 170 ms, kraj rečenice 320 ms, 0,7 s između odlomaka.

**⏩** stoji u donjem desnom kutu oblačića, ali samo kad račun ima bodove na toj vježbi ili na bilo kojoj kasnijoj vježbi iste cjeline. Klik na njega ispiše ostatak teksta redak po redak (cijeli redak odjednom), oko 5 puta brže. Gluma se pritom ne preskače, ali se geste izostave.

## Više Blobbyja na stranici

- Govori uvijek samo jedan, a ostali čekaju red.
- Ostali kuliraju: dišu, trepću i povremeno pogledaju onoga koji govori.
- Blobby koji nije na ekranu ne troši ništa.

## Raspored prema količini teksta

Izbor ovisi o tekstu i nije nasumičan, pa ista stranica uvijek izgleda isto. Dva Blobbyja za redom na istoj stranici nikad nemaju isti raspored: "uz" se zrcali s lijeve na desnu stranu, a ostali se izmjenjuju.

| tekst | računalo | mobitel |
|---|---|---|
| kratak (do 70 znakova) | uz oblačić | uz oblačić |
| srednji (do 220 znakova) | uz oblačić | stoji na oblačiću, cijeli vidljiv |
| dugačak | stoji na oblačiću | viri iza gornjeg ruba (jedini slučaj kad se dio njega skriva) |

## Vrste rečenica → gluma

Pravila se provjeravaju redom, a prva pogođena vrsta određuje glumu rečenice. Gluma kreće kad ispis dođe do riječi koja ju je izazvala. Za njemačku i španjolsku verziju pravila se primjenjuju na engleski izvor iste rečenice, a položaj se preslika na prijevod.

| vrsta | prepoznaje se po | izraz | gesta |
|---|---|---|---|
| velika pohvala | ČESTITAMO!, You did it. | smijeh → ponosan | juhu |
| pohvala | Bravo! Odlično! Sjajno! Izvrsno! Čestitamo! Divno! Krasno! Fantastično! | smijeh → veselo | juhu |
| pozdrav | Welcome, Hi, Hello, There you are | veselo | pozdrav |
| šala | You're welcome. · Sneaky, right? · Efficient, right? · hate this · suspiciously · hopefully not · it's shy · Enjoy the freedom | namig | — |
| zamka | trap, mistake, careful | iznenađen → znatiželja | — |
| iznimka | exception, rebels, quirks, ignore everything, squeezes | znatiželja | ne znam |
| tajna / uzorak | secret, Notice, Spot the pattern, Recognize, Watch:, Think of it as, The test:, Rule of thumb | znatiželja | pokazuje (prema oblačiću) |
| maštanje | Imagine, dream | razmišlja | razmišlja |
| poziv | Let's, Time to, See how far, See if you can, how much do you remember, finish strong | odlučan | ajmo |
| uputa | Tap to reveal, Tap the, tap EN | veselo | pokazuje |
| umirivanje | Don't worry, don't have to, Good news, refreshingly / delightfully simple, past the hardest part, recycles | veselo | — |
| uzbuđenje | big day, Summer is coming, Friday night!, December in Croatia | iznenađen → veselo | — |
| pitanje | rečenica završava upitnikom | znatiželja | — |
| pripovijedanje | sve ostalo | osmijeh | — |

Pravila umjerenosti:

1. Najviše jedna gesta po rečenici.
2. Nikad dvije geste za redom. Iznimke su pohvala i pozdrav.
3. Između rečenica Blobby se vraća na osmijeh.
4. Nikad nije razočaran.

## Unit complete

Koliko se veseli ovisi o napretku u ovoj sesiji (bodovi u cjelini otkad ju je korisnik u ovoj sesiji prvi put otvorio) i o ukupnom postotku cjeline.

| stanje | poruka | gluma |
|---|---|---|
| novi bodovi i 100 % | Every single point in this unit is yours. You mastered it! | smijeh + juhu → ponosan |
| novi bodovi, ≥ 80 % | +N points today! This unit is almost all yours. | smijeh + juhu → veselo |
| novi bodovi, 50–79 % | +N points today. More than half is behind you — keep going! | veselo → odlučan + ajmo |
| novi bodovi, < 50 % | +N points today. Every point counts — this is how it starts. | veselo → ponosan |
| bez novih, 100 % | Still perfect. Nothing left to win here — on to the next one? | ponosan → namig |
| bez novih, ima bodova | No new points this time — only your best run counts, so nothing was lost. | suosjećanje → veselo + ajmo |
| nijedan bod | Let's try one exercise — the first points are the most fun. | odlučan + ajmo → veselo |

Poruke se prevode kao i ostalo sučelje (`sucelje-de.tsv`, `sucelje-es.tsv`).

## Održavanje

- **Nova Blobbyjeva rečenica:** upiši je u `blobby-glas.md` i dodaj njezin početak u `BLOBBY_RECI` u `index.html`. Ista lista mora stajati i kao `BLOBBY_EN` u `blobby.js`, istim redom. Ako se liste ne poklapaju, prijevodi dobivaju glumu pogrešne rečenice.
- **`blobby.js`** je na popisu datoteka za objavu (`scripts/build.js`).
- Za smanjeno gibanje (postavka sustava) tekst se pojavi odmah, a nema ni napuhivanja ni gesta.
