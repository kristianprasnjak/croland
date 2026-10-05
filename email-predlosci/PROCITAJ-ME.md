# E-mail predlošci po jeziku (Supabase Auth)

Napisano 05.10.2026. E-mailove za prijavu šalje Supabase Auth (preko Brevo SMTP-a). Predložak je
jedan po vrsti e-maila, a jezik se bira unutar njega prema `user_metadata.jezik` korisnika.

## Odakle dolazi jezik

Aplikacija upisuje `jezik` u `user_metadata`:
- pri registraciji e-mailom (`signUp`, `options.data.jezik`) — zato je već prvi e-mail (potvrda) na pravom jeziku;
- pri svakoj prijavi, ako se razlikuje od jezika stranice (`uskladiJezikRacuna` u `index.html`) — to pokriva Google prijavu, stare račune i promjenu jezika.

Bez jezika ili s nepoznatim jezikom e-mail je na engleskom.

## Postavljanje (jednom, ručno)

**Preduvjet: vlastiti SMTP (Brevo).** Supabase ne dopušta uređivanje predložaka dok se mailovi šalju njegovim ugrađenim servisom (provjereno 05.10.2026.: *"Set up custom SMTP to edit templates"*). Brevo čeka domenu (vidi `PLAN-account-i-naplata.md`, O15). Dotad stižu Supabaseovi zadani engleski mailovi.


Supabase → Authentication → Emails → Templates. Za svaku vrstu zalijepi cijeli sadržaj datoteke u polje *Message body*:

| Supabase predložak | datoteka | Subject |
|---|---|---|
| Confirm signup | `potvrda-registracije.html` | `Croland: confirm your email · E-Mail bestätigen` |
| Reset password | `nova-lozinka.html` | `Croland: reset your password · Passwort zurücksetzen` |
| Change email address | `promjena-emaila.html` | `Croland: confirm your new email · Neue E-Mail bestätigen` |

Naslov (Subject) je dvojezičan jer nije sigurno da Supabase u naslovu podržava uvjete (`{{ if }}`); tijelo e-maila je na jednom jeziku.

**Provjera:** nakon spremanja registriraj probni račun na `index-de.html` (e-mail mora stići na njemačkom), pa na `index.html` zatraži novu lozinku za račun koji je zadnji put bio na engleskom (mora stići na engleskom).

## Novi jezik (npr. španjolski)

U svaku datoteku dodaj blok `{{ else if eq $j "es" }} … ` između njemačkog bloka i `{{ else }}`, a u naslov dodaj španjolski dio.

Predlošci su provjereni Go `text/template` parserom (isti koji koristi Supabase Auth): jezik `de`, `en`, prazan i nepostojeći daju ispravan e-mail.
