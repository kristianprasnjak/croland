# AI pomoć — postavljanje

Napravljeno 27.09.2026. AI pomoć je dio lebdećeg infa (tipka ℹ): ispod pravila i opisa vježbe
stoji „Ask about this page“. Učenik pita, AI vidi što je na ekranu i odgovara.

## Kako radi

- **Razgovor po vježbi.** Svaka vježba ima svoj razgovor. Čuva se u Supabaseu (tablica `ai_razgovori`)
  i vidi se na svakom uređaju, dok ga korisnik ne obriše tipkom *Start over*.
- **Limit.** 20 pitanja dnevno po korisniku (dan po zagrebačkom vremenu). Broj preostalih pitanja
  prikazuje se tek od 10. pitanja. Ako Gemini ne odgovori, pitanje se ne broji.
- **Ukupna kočnica.** Zadano isključena (trošak drži prepaid kredit). Uključuje se. Mijenja se
  retkom `AI_DNEVNI_UKUPNO=` u `.env` i ponovnim pokretanjem `objavi-ai-pomoc.bat`.
- **Tko može.** Pretplatnici i komplimentarni računi: 20 pitanja dnevno. Prijavljeni bez pretplate: 1 pitanje dnevno.
- **Test.** U testovima se lebdeći info ne prikazuje, pa ni AI.
- **Ključ** je samo u Supabaseu (tajna `GEMINI_API_KEY`). U stranici ga nema.

Postavke (sve u `.env`, pa `objavi-ai-pomoc.bat`):

| Redak | Značenje | Zadano |
|---|---|---|
| `GEMINI_MODEL=` | točan naziv modela iz AI Studija | `gemini-3.1-flash-lite` |
| `AI_PRAVILO=` | `A` = smije odmah dati odgovor uz objašnjenje · `B` = prvo samo uputi na pravilo | `A` |
| `AI_DNEVNI_UKUPNO=` | najviše pitanja dnevno za cijelu aplikaciju | isključeno |

## Koraci (redom)

1. **Naziv modela.** U AI Studiju izaberi Gemini 3.1 Flash-Lite; ispod naziva sivim slovima piše
   točan naziv (npr. `gemini-3.1-flash-lite` ili `gemini-3.1-flash-lite-preview`). Javi ga Claudeu
   ili ga sam dopiši u `.env` kao `GEMINI_MODEL=...`.
2. **Baza.** Supabase → SQL Editor → New query → zalijepi cijeli `supabase-ai-pomoc.sql` → Run.
   Treba pisati *Success*.
3. **Funkcija.** Dvoklik na `objavi-ai-pomoc.bat`. Prenese ključ i objavi funkciju `pomoc`.
4. **Stranica.** Uobičajeno objavljivanje (`objavi.bat`). Tek tada korisnici vide AI u infu.

## Datoteke

- `supabase-ai-pomoc.sql` — tablice `ai_razgovori`, `ai_upotreba`, `ai_upotreba_ukupno` i dvije funkcije za limit.
- `supabase/functions/pomoc/index.ts` — funkcija; ovdje su i upute za AI (`UPUTE`).
- `index.html` — dio „AI POMOĆ U LEBDEĆEM INFU“ (JS) i stilovi `.ai*` uz `#panelInfo`.
- `objavi-ai-pomoc.bat` — tajne + objava funkcije.
- Kopija `index.html` prije izmjene: `_arhiva/index.html.bak-prije-ai`.
