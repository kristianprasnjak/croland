# Francuski tečaj — zasebna stranica, zajednički račun i pretplata

Stranica: https://kristianprasnjak.github.io/francais/ (repo `kristianprasnjak/francais`)

## Kako je složeno

| | Gdje |
|---|---|
| Račun (prijava) | zajednički — isti Supabase projekt; isti origin (github.io) pa je prijava s Crolanda odmah aktivna i ovdje |
| Plaćanje (pretplata, kodovi, Plus) | zajedničko — `public.*`, stranica ih čita kroz poglede/omotače u shemi `tecaj_fr` |
| Napredak, bodovi, prijatelji, ljestvica | odvojeno — tablice u shemi `tecaj_fr` |
| Plaćeni sadržaj | `data-plus-fr.json` u bucketu `sadrzaj`, izdaje ga ista funkcija `sadrzaj` |

Stranica je Croland engine (`index.html`) s nekoliko izmjena koje radi `izgradi-fr.js`:
`createClient(..., { db: { schema: 'tecaj_fr' } })`, `data-plus-fr.json`, samo EN sučelje,
vlastiti ključevi u pregledniku (`francais-…` umjesto `croland-…`) i naslov.

## Datoteke

- `igre/*.md` — sadržaj (Croland format). Zasad samo probne `vokabular-01` (besplatno) i `vokabular-02` (plaćeno, za provjeru zaključavanja).
- `osvjezi-fr.js` — parser (kopija `deutsch/lokalno/osvjezi-de.js`).
- `izgradi-fr.js` — gradi `stranica/` i `zasticeno/data-plus-fr.json`.
- `stranica/` — zaseban git repo; to ide na GitHub. Ne uređivati ručno.
- `../objavi-fr.bat` — izgradi, uploadaj plaćeni dio, pošalji na GitHub.
- `../supabase-tecaj-fr.sql` (i `-de.sql` za njemački tečaj) — shema tečaja.

## Jednokratno postavljanje (redom)

1. ✅ (3. 10. 2026) SQL `supabase-tecaj-fr.sql` pokrenut na produkciji.
2. ✅ Shema `tecaj_fr` izložena u Data API.
3. ✅ Redirect URL `https://kristianprasnjak.github.io/francais/**` dodan.
   `https://kristianprasnjak.github.io/francais/**`.
4. ✅ Funkcija `sadrzaj` (v7) dopušta `data-plus-fr.json`; probni `data-plus-fr.json` je u bucketu.
5. ✅ Repo `kristianprasnjak/francais` napravljen, Pages izvor = GitHub Actions, stranica objavljena.
6. `objavi-fr.bat` (prvi put napravi git repo u `stranica/` i pushne).
7. GitHub → repo `francais` → Settings → Pages → Source: **GitHub Actions**.

## Provjereno lokalno (PGlite, Postgres 16)

Migracija prolazi i dvaput zaredom; korisnik s pretplatom u `public` dobiva `ima: true`
kroz `tecaj_fr.moj_pristup()`; francuski napredak ne vidi drugi korisnik i ne dira
`public.progress`; prijatelji (zahtjev → prihvaćanje) rade unutar `tecaj_fr`; brisanje
računa briše i francuske retke (cascade).

## Još nije riješeno

- Izvoz podataka (GDPR, funkcija `racun`) zasad vraća samo Croland napredak — treba dodati `tecaj_fr`.
- AI pomoć (`pomoc`) ima hrvatske upute; za francuski treba svoj prompt.
- Rječnik, pregledi cjelina, mini igre, daily/weekly — za francuski još ne postoje (prazno).
- Tekstovi u sučelju koji spominju hrvatski (npr. abeceda, Blobby) — proći kad stigne pravi sadržaj.
