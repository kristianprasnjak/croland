-- Croland — globalne postavke pristupa.
-- Pokrenuti jednom u Supabase SQL editoru (SQL Editor → New query → Run).
--
-- Postoji zbog jedne stvari: pravila o pristupu se moraju moći mijenjati BEZ novog buildа.
-- Aplikacija i Netlify funkcija oboje čitaju iz ove tablice, pa je promjena ovdje odmah
-- vidljiva svima, bez deploya.

create table public.postavke (
  kljuc text primary key,
  vrijednost jsonb,
  opis text,
  updated_at timestamptz not null default now()
);

alter table public.postavke enable row level security;

-- Namjerno čitljivo svima, i neprijavljenima: ovdje nema ničeg tajnog, samo datum akcije.
-- Pisati može isključivo service-role ključ (Netlify funkcije) ili ti iz Table editora.
create policy "postavke: svi mogu citati"
  on public.postavke for select
  to anon, authenticated
  using (true);

-- ---- akcija "upadaj" ----
-- Dok je ovaj datum u budućnosti, SVATKO tko je prijavljen ima puni pristup, bez plaćanja.
-- Kad datum prođe, pristup se sam vraća na "samo pretplatnici" — nikoga ne treba izbacivati.
--
-- Kako mijenjati (Table editor → postavke → red 'svima_pristup_do' → stupac vrijednost):
--   produljiti akciju  → upiši novi datum, npr. "2026-09-30T23:59:59+02:00"
--   prekinuti odmah    → upiši null
-- Navodnici oko datuma su obavezni, jer je stupac jsonb.
insert into public.postavke (kljuc, vrijednost, opis) values (
  'svima_pristup_do',
  '"2026-08-31T23:59:59+02:00"'::jsonb,
  'Dok ovaj trenutak nije prosao, svaki prijavljeni korisnik ima puni pristup bez pretplate. null = akcija ugasena.'
);
