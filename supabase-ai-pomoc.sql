-- AI pomoć u lebdećem infu (27.09.2026.)
-- Pokreće se jednom: Supabase → SQL Editor → New query → zalijepi sve → Run.
-- Smije se pokrenuti i ponovno (ne briše postojeće razgovore).

-- 1) Razgovori: jedan red po korisniku i vježbi. Piše ih samo funkcija "pomoc"
--    (service role), a korisnik smije čitati i brisati svoje.
create table if not exists public.ai_razgovori (
  user_id    uuid not null references auth.users(id) on delete cascade,
  kljuc      text not null,                 -- "cjelina|stranica|naslov"
  poruke     jsonb not null default '[]',   -- [{u:'user'|'ai', t:'...', v:'2026-09-27T...'}]
  updated_at timestamptz not null default now(),
  primary key (user_id, kljuc)
);
alter table public.ai_razgovori enable row level security;
drop policy if exists "ai_razgovori citam svoje" on public.ai_razgovori;
create policy "ai_razgovori citam svoje" on public.ai_razgovori for select using (auth.uid() = user_id);
drop policy if exists "ai_razgovori brisem svoje" on public.ai_razgovori;
create policy "ai_razgovori brisem svoje" on public.ai_razgovori for delete using (auth.uid() = user_id);

-- 2) Brojač pitanja po korisniku i danu (dan po zagrebačkom vremenu).
create table if not exists public.ai_upotreba (
  user_id uuid not null references auth.users(id) on delete cascade,
  dan     date not null,
  broj    int  not null default 0,
  primary key (user_id, dan)
);
alter table public.ai_upotreba enable row level security;
drop policy if exists "ai_upotreba citam svoje" on public.ai_upotreba;
create policy "ai_upotreba citam svoje" on public.ai_upotreba for select using (auth.uid() = user_id);

-- 3) Ukupni dnevni brojač za cijelu aplikaciju (kočnica troška). Nitko ga ne vidi osim funkcije.
create table if not exists public.ai_upotreba_ukupno (
  dan  date primary key,
  broj int  not null default 0
);
alter table public.ai_upotreba_ukupno enable row level security;

-- Uzmi jedno pitanje: vraća novi broj korisnikovih pitanja danas,
-- -1 ako je korisnik potrošio svoj limit, -2 ako je potrošen ukupni dnevni limit.
create or replace function public.ai_uzmi_poruku(p_user uuid, p_limit int, p_ukupni_limit int)
returns int language plpgsql security definer set search_path = public as $$
declare
  d date := (now() at time zone 'Europe/Zagreb')::date;
  n int; u int;
begin
  insert into ai_upotreba_ukupno(dan, broj) values (d, 0) on conflict (dan) do nothing;
  update ai_upotreba_ukupno set broj = broj + 1 where dan = d and broj < p_ukupni_limit returning broj into u;
  if u is null then return -2; end if;

  insert into ai_upotreba(user_id, dan, broj) values (p_user, d, 0) on conflict (user_id, dan) do nothing;
  update ai_upotreba set broj = broj + 1 where user_id = p_user and dan = d and broj < p_limit returning broj into n;
  if n is null then
    update ai_upotreba_ukupno set broj = broj - 1 where dan = d;
    return -1;
  end if;
  return n;
end $$;

-- Vrati pitanje ako Gemini nije odgovorio (korisnik ne plaća tuđu grešku).
create or replace function public.ai_vrati_poruku(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
declare d date := (now() at time zone 'Europe/Zagreb')::date;
begin
  update ai_upotreba set broj = broj - 1 where user_id = p_user and dan = d and broj > 0;
  update ai_upotreba_ukupno set broj = broj - 1 where dan = d and broj > 0;
end $$;

-- Funkcije smije zvati samo server (service role), ne preglednik.
revoke execute on function public.ai_uzmi_poruku(uuid, int, int) from public, anon, authenticated;
revoke execute on function public.ai_vrati_poruku(uuid) from public, anon, authenticated;
grant execute on function public.ai_uzmi_poruku(uuid, int, int) to service_role;
grant execute on function public.ai_vrati_poruku(uuid) to service_role;
