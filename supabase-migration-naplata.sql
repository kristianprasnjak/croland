-- Croland — naplata preko Paddlea, kodovi, nova stranica računa.
-- Pokrenuti jednom u Supabase SQL editoru, POSLIJE supabase-schema.sql,
-- supabase-postavke.sql, supabase-progress-drustveno.sql i supabase-ai-pomoc.sql.
-- Smije se pokrenuti i više puta (if not exists / create or replace / on conflict).
--
-- Što radi:
--   • pretplate        — jedna Paddle pretplata po korisniku (piše je samo webhook)
--   • pristup_kodom    — do kad korisnik ima Plus iz iskorištenih kodova
--   • kupnje_kodova    — jedna Custom kupnja (N kodova jedne vrste)
--   • kodovi           — pojedinačni kodovi CRO-XXXX-XXXX
--   • paddle_events    — idempotencija webhooka
--   • veze.vise        — korisnik koda smije kupcu pokazati i lekcije i datume
--   • postavke         — cijene i javni Paddle podaci; početak naplate 1. 11. 2026.
--   • funkcije         — jedno mjesto koje odlučuje tko ima Plus (plus_stanje),
--                        pregled/iskorištavanje kodova, popis kupčevih kodova
--
-- Stripe tablica i stupci se NE brišu ovdje (nema ih tko čitati, a brisanje je nepovratno).
-- Kad Paddle proradi, mogu se ukloniti ručno:
--   drop table public.stripe_events;
--   alter table public.profiles drop column stripe_customer_id, drop column stripe_subscription_id,
--     drop column subscription_status, drop column price_id, drop column current_period_end;

-- ============================================================
-- tablice
-- ============================================================
create table if not exists public.pretplate (
  user_id uuid primary key references auth.users(id) on delete cascade,
  paddle_customer_id text,
  paddle_subscription_id text unique,
  paket text check (paket in ('tjedan', 'mjesec', 'godina')),          -- paket koji će se iduće naplatiti
  placeni_paket text check (placeni_paket in ('tjedan', 'mjesec', 'godina')), -- paket trenutnog plaćenog razdoblja
  status text,               -- Paddle: active | trialing | past_due | paused | canceled
  vrijedi_do timestamptz,    -- kraj trenutnog plaćenog razdoblja
  auto_obnova boolean not null default true,  -- false = otkazana, vrijedi do vrijedi_do
  cijena_iznos numeric,      -- cijena paketa koja se naplaćuje (s PDV-om), za prikaz
  valuta text,
  updated_at timestamptz not null default now()
);
alter table public.pretplate enable row level security;
drop policy if exists "pretplate: vlasnik cita" on public.pretplate;
create policy "pretplate: vlasnik cita" on public.pretplate
  for select to authenticated using (auth.uid() = user_id);

create table if not exists public.pristup_kodom (
  user_id uuid primary key references auth.users(id) on delete cascade,
  vrijedi_do timestamptz not null,
  updated_at timestamptz not null default now()
);
alter table public.pristup_kodom enable row level security;
drop policy if exists "pristup_kodom: vlasnik cita" on public.pristup_kodom;
create policy "pristup_kodom: vlasnik cita" on public.pristup_kodom
  for select to authenticated using (auth.uid() = user_id);

create table if not exists public.kupnje_kodova (
  id uuid primary key default gen_random_uuid(),
  -- set null: kodovi vrijede i kad kupac obriše račun (odluka 3. 10. 2026.)
  kupac uuid references auth.users(id) on delete set null,
  vrsta text not null check (vrsta in ('tjedan', 'mjesec', 'godina')),
  kolicina int not null check (kolicina > 0),
  iznos numeric,
  valuta text,
  paddle_transaction_id text unique,
  stanje text not null default 'placeno' check (stanje in ('placeno', 'vraceno')),
  created_at timestamptz not null default now()
);
alter table public.kupnje_kodova enable row level security;
drop policy if exists "kupnje_kodova: kupac cita" on public.kupnje_kodova;
create policy "kupnje_kodova: kupac cita" on public.kupnje_kodova
  for select to authenticated using (auth.uid() = kupac);

create table if not exists public.kodovi (
  kod text primary key,                       -- CRO-XXXX-XXXX
  kupnja_id uuid references public.kupnje_kodova(id) on delete cascade,
  vrsta text not null check (vrsta in ('tjedan', 'mjesec', 'godina')),
  vrijedi_za_unos_do timestamptz not null,    -- 2 godine od kupnje
  iskoristio uuid references auth.users(id) on delete set null,
  iskoristeno_at timestamptz,
  ponisten boolean not null default false,    -- povrat novca prije unosa
  created_at timestamptz not null default now()
);
create index if not exists kodovi_kupnja_idx on public.kodovi (kupnja_id);
alter table public.kodovi enable row level security;
-- Bez politika: kodove čitaju i mijenjaju samo funkcije ispod. Inače bi tko god
-- mogao listati tuđe neiskorištene kodove.

create table if not exists public.paddle_events (
  id text primary key,
  processed_at timestamptz not null default now()
);
alter table public.paddle_events enable row level security;

-- Ograničenje broja pokušaja unosa koda (kao `trazenja` za ID-ove).
create table if not exists public.unosi_kodova (
  user_id uuid not null references auth.users(id) on delete cascade,
  dan date not null default current_date,
  broj int not null default 0,
  primary key (user_id, dan)
);
alter table public.unosi_kodova enable row level security;

alter table public.veze add column if not exists vise boolean not null default false;

-- ============================================================
-- postavke
-- ============================================================
insert into public.postavke (kljuc, vrijednost, opis) values (
  'cijene',
  '{"tjedan": 5, "mjesec": 10, "godina": 60, "valuta": "EUR",
    "popust_eksponent": 0.150515, "popust_pod": 0.333333, "max_kodova": 2000}'::jsonb,
  'Cijene s PDV-om, iste za sve. Paketi: moraju se slagati s cijenama u Paddleu. Custom: cijena po kodu = osnovica × n^-eksponent, najmanje pod × osnovica (50 % popusta na 100 kodova).'
) on conflict (kljuc) do nothing;

insert into public.postavke (kljuc, vrijednost, opis) values (
  'paddle',
  '{"okruzenje": "sandbox", "client_token": null}'::jsonb,
  'Javni Paddle podaci za preglednik. client_token = Paddle → Developer tools → Authentication → Client-side token. okruzenje: sandbox | production. Dok je client_token null, kupnja javlja da još nije dostupna.'
) on conflict (kljuc) do nothing;

-- Do početka naplate sve je besplatno, i to je ujedno trenutak kad se kupnja otvara.
-- Produljenje = promijeniti samo ovaj datum.
update public.postavke
   set vrijednost = '"2026-11-01T00:00:00+01:00"'::jsonb, updated_at = now()
 where kljuc = 'svima_pristup_do';

-- ============================================================
-- pomoćne funkcije
-- ============================================================
create or replace function public.akcija_do()
returns timestamptz
language plpgsql stable security definer set search_path = public
as $$
declare t timestamptz;
begin
  select (vrijednost #>> '{}')::timestamptz into t from public.postavke where kljuc = 'svima_pristup_do';
  return t;
exception when others then
  return null;   -- tipfeler u datumu ne smije nikome pokloniti sadržaj
end;
$$;

create or replace function public.trajanje_koda(vrsta text)
returns interval
language sql immutable
as $$
  select case vrsta when 'tjedan' then interval '7 days'
                    when 'mjesec' then interval '1 month'
                    when 'godina' then interval '1 year' end;
$$;

-- "cro7k2mq9xd", "CRO 7K2M Q9XD" → "CRO-7K2M-Q9XD"
create or replace function public.normaliziraj_kod(k text)
returns text
language sql immutable
as $$
  select case
    when length(regexp_replace(upper(coalesce(k, '')), '[^A-Z0-9]', '', 'g')) = 11
     and left(regexp_replace(upper(k), '[^A-Z0-9]', '', 'g'), 3) = 'CRO'
    then 'CRO-' || substr(regexp_replace(upper(k), '[^A-Z0-9]', '', 'g'), 4, 4)
         || '-' || substr(regexp_replace(upper(k), '[^A-Z0-9]', '', 'g'), 8, 4)
    else upper(trim(coalesce(k, '')))
  end;
$$;

-- ============================================================
-- tko ima Plus — jedino mjesto odluke (i za server i za preglednik)
-- ============================================================
create or replace function public.plus_stanje(p_uid uuid)
returns table (ima boolean, razlog text, do_kad timestamptz)
language plpgsql stable security definer set search_path = public
as $$
declare
  komp boolean;
  s_do timestamptz;
  k_do timestamptz;
  a_do timestamptz;
  ukupno timestamptz;
begin
  select p.komplimentarno into komp from public.profiles p where p.id = p_uid;
  if coalesce(komp, false) then
    return query select true, 'komplimentarno'::text, 'infinity'::timestamptz; return;
  end if;
  select case
           when pr.status in ('active', 'trialing') then pr.vrijedi_do
           -- neuspjela naplata: Paddle još pokušava, korisnik zadržava pristup 14 dana
           when pr.status = 'past_due' then pr.vrijedi_do + interval '14 days'
         end
    into s_do from public.pretplate pr where pr.user_id = p_uid;
  select pk.vrijedi_do into k_do from public.pristup_kodom pk where pk.user_id = p_uid;
  a_do := public.akcija_do();
  ukupno := greatest(s_do, k_do, a_do);   -- greatest preskače null
  return query select
    coalesce(ukupno > now(), false),
    case when s_do > now() then 'pretplata'
         when k_do > now() then 'kod'
         when a_do > now() then 'akcija'
         else null end,
    ukupno;
end;
$$;

-- Sve što stranica računa treba znati o pristupu, u jednom pozivu.
create or replace function public.moj_pristup()
returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  me uuid := auth.uid();
  st record;
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  select * into st from public.plus_stanje(me);
  return jsonb_build_object(
    'ima', st.ima,
    'razlog', st.razlog,
    'plus_do', st.do_kad,
    'akcija_do', public.akcija_do(),
    'komplimentarno', coalesce((select p.komplimentarno from public.profiles p where p.id = me), false),
    'kod_do', (select pk.vrijedi_do from public.pristup_kodom pk where pk.user_id = me),
    'pretplata', (select jsonb_build_object(
        'paket', pr.paket, 'placeni_paket', pr.placeni_paket, 'status', pr.status,
        'vrijedi_do', pr.vrijedi_do, 'auto_obnova', pr.auto_obnova,
        'cijena_iznos', pr.cijena_iznos, 'valuta', pr.valuta)
      from public.pretplate pr where pr.user_id = me),
    'ima_kupnje', exists (select 1 from public.kupnje_kodova kk where kk.kupac = me)
  );
end;
$$;

-- ============================================================
-- kodovi
-- ============================================================
-- Pregled prije unosa: što kod daje i od koga je. Ne troši kod.
create or replace function public.pregled_koda(p_kod text)
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare
  me uuid := auth.uid();
  k public.kodovi%rowtype;
  kupac uuid;
  koliko int;
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  insert into public.unosi_kodova as u (user_id, dan, broj) values (me, current_date, 1)
  on conflict (user_id, dan) do update set broj = u.broj + 1
  returning u.broj into koliko;
  if koliko > 30 then return jsonb_build_object('stanje', 'previse'); end if;

  select * into k from public.kodovi where kod = public.normaliziraj_kod(p_kod);
  if not found then return jsonb_build_object('stanje', 'nema'); end if;
  if k.ponisten then return jsonb_build_object('stanje', 'ponisten'); end if;
  if k.iskoristio is not null then return jsonb_build_object('stanje', 'iskoristen'); end if;
  if k.vrijedi_za_unos_do < now() then
    return jsonb_build_object('stanje', 'istekao', 'unos_do', k.vrijedi_za_unos_do);
  end if;
  select kk.kupac into kupac from public.kupnje_kodova kk where kk.id = k.kupnja_id;
  return jsonb_build_object(
    'stanje', 'ok',
    'kod', k.kod,
    'vrsta', k.vrsta,
    'od_koga', case when kupac is null or kupac = me then null
                    else coalesce((select jb.nadimak from public.javni_bodovi jb where jb.user_id = kupac), 'Someone') end,
    'vlastiti', kupac = me
  );
end;
$$;

-- Iskorištavanje. Zove ga samo edge funkcija `racun` (service role), jer kod
-- pretplatnika najprije treba pomaknuti datum naplate u Paddleu.
--   p_produzi_pristup = true  → vrijeme se dodaje u pristup_kodom
--   p_produzi_pristup = false → samo se označi kod i zapiše veza; vrijeme dodaje Paddle
create or replace function public.iskoristi_kod(p_uid uuid, p_kod text, p_vise boolean, p_produzi_pristup boolean)
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare
  k public.kodovi%rowtype;
  kupac uuid;
  pocetak timestamptz;
  novi timestamptz;
  s_do timestamptz;
begin
  update public.kodovi
     set iskoristio = p_uid, iskoristeno_at = now()
   where kod = public.normaliziraj_kod(p_kod)
     and iskoristio is null and not ponisten and vrijedi_za_unos_do > now()
  returning * into k;
  if not found then return jsonb_build_object('stanje', 'nevazeci'); end if;

  select kk.kupac into kupac from public.kupnje_kodova kk where kk.id = k.kupnja_id;
  if kupac is not null and kupac <> p_uid then
    -- Već postojeće prijateljstvo se ne dira (jedan red po paru).
    insert into public.veze (gledatelj, gledani, izvor, stanje, kod, vise)
    values (kupac, p_uid, 'kod', 'prihvaceno', k.kod, coalesce(p_vise, false))
    on conflict (gledatelj, gledani) do nothing;
  end if;

  if p_produzi_pristup then
    select case when pr.status in ('active', 'trialing', 'past_due') then pr.vrijedi_do end
      into s_do from public.pretplate pr where pr.user_id = p_uid;
    -- Vrijeme koda teče tek kad završi sve što korisnik već ima:
    -- besplatno razdoblje, otkazana pretplata ili raniji kodovi.
    pocetak := greatest(now(), public.akcija_do(), s_do,
                        (select pk.vrijedi_do from public.pristup_kodom pk where pk.user_id = p_uid));
    novi := pocetak + public.trajanje_koda(k.vrsta);
    insert into public.pristup_kodom (user_id, vrijedi_do, updated_at) values (p_uid, novi, now())
    on conflict (user_id) do update set vrijedi_do = excluded.vrijedi_do, updated_at = now();
  end if;

  return jsonb_build_object('stanje', 'ok', 'kod', k.kod, 'vrsta', k.vrsta, 'novi_do', novi);
end;
$$;

-- Vraća kod ako pomicanje datuma u Paddleu nije uspjelo.
create or replace function public.vrati_kod(p_uid uuid, p_kod text)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  update public.kodovi set iskoristio = null, iskoristeno_at = null
   where kod = public.normaliziraj_kod(p_kod) and iskoristio = p_uid;
  delete from public.veze where gledani = p_uid and izvor = 'kod' and kod = public.normaliziraj_kod(p_kod);
end;
$$;

-- Izdavanje kodova nakon plaćene Custom kupnje (webhook). Idempotentno po transakciji.
create or replace function public.izdaj_kodove(p_kupac uuid, p_vrsta text, p_kolicina int,
                                               p_iznos numeric, p_valuta text, p_txn text)
returns int
language plpgsql security definer set search_path = public
as $$
declare
  abeceda constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';  -- bez 0, O, 1, I
  kid uuid;
  kandidat text;
  i int;
  j int;
  izdano int := 0;
begin
  if exists (select 1 from public.kupnje_kodova where paddle_transaction_id = p_txn) then return 0; end if;
  insert into public.kupnje_kodova (kupac, vrsta, kolicina, iznos, valuta, paddle_transaction_id)
  values (p_kupac, p_vrsta, p_kolicina, p_iznos, p_valuta, p_txn)
  returning id into kid;
  for i in 1..p_kolicina loop
    loop
      kandidat := 'CRO-';
      for j in 1..8 loop
        if j = 5 then kandidat := kandidat || '-'; end if;
        kandidat := kandidat || substr(abeceda, 1 + floor(random() * length(abeceda))::int, 1);
      end loop;
      exit when not exists (select 1 from public.kodovi where kod = kandidat);
    end loop;
    insert into public.kodovi (kod, kupnja_id, vrsta, vrijedi_za_unos_do)
    values (kandidat, kid, p_vrsta, now() + interval '2 years');
    izdano := izdano + 1;
  end loop;
  return izdano;
end;
$$;

-- Povrat novca (Paddle adjustment): neiskorišteni kodovi prestaju vrijediti,
-- iskorišteni ostaju (odluka 3. 10. 2026.).
create or replace function public.ponisti_kupnju(p_txn text)
returns int
language plpgsql security definer set search_path = public
as $$
declare n int;
begin
  update public.kupnje_kodova set stanje = 'vraceno' where paddle_transaction_id = p_txn;
  update public.kodovi k set ponisten = true
    from public.kupnje_kodova kk
   where kk.id = k.kupnja_id and kk.paddle_transaction_id = p_txn and k.iskoristio is null;
  get diagnostics n = row_count;
  return n;
end;
$$;

-- Kupčev popis kodova. Nadimak i bodovi korisnika samo ako ih korisnik nije sakrio.
create or replace function public.moji_kodovi()
returns table (kod text, vrsta text, kupljeno timestamptz, unos_do timestamptz,
               stanje text, iskoristeno_at timestamptz, nadimak text, bodovi int, kupnja_vracena boolean)
language plpgsql stable security definer set search_path = public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  return query
  select k.kod, k.vrsta, kk.created_at, k.vrijedi_za_unos_do,
         case when k.ponisten then 'ponisten'
              when k.iskoristio is not null or k.iskoristeno_at is not null then 'iskoristen'
              when k.vrijedi_za_unos_do < now() then 'istekao'
              else 'slobodan' end,
         k.iskoristeno_at,
         case when v.stanje = 'prihvaceno' then jb.nadimak end,
         case when v.stanje = 'prihvaceno' then jb.lp + jb.vp + jb.gp + jb.pp end,
         kk.stanje = 'vraceno'
    from public.kodovi k
    join public.kupnje_kodova kk on kk.id = k.kupnja_id
    left join public.veze v on v.gledatelj = me and v.gledani = k.iskoristio and v.izvor = 'kod'
    left join public.javni_bodovi jb on jb.user_id = k.iskoristio
   where kk.kupac = me
   order by kk.created_at desc, k.kod;
end;
$$;

-- Korisnikov popis ljudi čije je kodove iskoristio, s postavkama vidljivosti.
create or replace function public.moji_darivatelji()
returns table (kupac uuid, nadimak text, skriveno boolean, vise boolean)
language plpgsql stable security definer set search_path = public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  return query
  select v.gledatelj, coalesce(jb.nadimak, 'Someone'), v.stanje = 'blokirano', v.vise
    from public.veze v
    left join public.javni_bodovi jb on jb.user_id = v.gledatelj
   where v.gledani = me and v.izvor = 'kod';
end;
$$;

create or replace function public.postavi_vidljivost_kupcu(p_kupac uuid, p_skriveno boolean, p_vise boolean)
returns void
language plpgsql security definer set search_path = public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  update public.veze
     set stanje = case when p_skriveno then 'blokirano' else 'prihvaceno' end,
         vise = coalesce(p_vise, false)
   where gledatelj = p_kupac and gledani = me and izvor = 'kod';
end;
$$;

-- moji_ljudi: razrada (sazetak) sada vidljiva i kad ju je korisnik koda izrijekom
-- dopustio kupcu (veze.vise), ne samo kad je progres javan svima.
create or replace function public.moji_ljudi()
returns table (
  druga_id uuid, javni_id text, nadimak text,
  lp int, vp int, gp int, pp int,
  progres_javan boolean, sazetak jsonb, zadnja_aktivnost timestamptz,
  smjer text, izvor text, vrijedi_do timestamptz
)
language plpgsql security definer set search_path = public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  return query
  select jb.user_id, jb.javni_id, jb.nadimak,
         jb.lp, jb.vp, jb.gp, jb.pp,
         (jb.progres_javan or (v.izvor = 'kod' and v.vise)),
         case when jb.progres_javan or (v.izvor = 'kod' and v.vise) then jb.sazetak else '{}'::jsonb end,
         jb.zadnja_aktivnost,
         'veza'::text, v.izvor, v.vrijedi_do
    from public.veze v
    join public.javni_bodovi jb on jb.user_id = v.gledani
   where v.gledatelj = me
     and v.stanje = 'prihvaceno'
     and (v.vrijedi_do is null or v.vrijedi_do > now())
  union all
  select jb.user_id, jb.javni_id, jb.nadimak,
         0, 0, 0, 0, false, '{}'::jsonb, null::timestamptz,
         'poslan'::text, v.izvor, v.vrijedi_do
    from public.veze v
    join public.javni_bodovi jb on jb.user_id = v.gledani
   where v.gledatelj = me and v.stanje = 'ceka'
  union all
  select jb.user_id, jb.javni_id, jb.nadimak,
         0, 0, 0, 0, false, '{}'::jsonb, null::timestamptz,
         'primljen'::text, v.izvor, v.vrijedi_do
    from public.veze v
    join public.javni_bodovi jb on jb.user_id = v.gledatelj
   where v.gledani = me and v.stanje = 'ceka';
end;
$$;

-- ============================================================
-- prava
-- ============================================================
grant select on public.pretplate, public.pristup_kodom, public.kupnje_kodova to authenticated;

revoke execute on function public.plus_stanje(uuid) from public, anon, authenticated;
revoke execute on function public.iskoristi_kod(uuid, text, boolean, boolean) from public, anon, authenticated;
revoke execute on function public.vrati_kod(uuid, text) from public, anon, authenticated;
revoke execute on function public.izdaj_kodove(uuid, text, int, numeric, text, text) from public, anon, authenticated;
revoke execute on function public.ponisti_kupnju(text) from public, anon, authenticated;
grant execute on function public.plus_stanje(uuid) to service_role;
grant execute on function public.iskoristi_kod(uuid, text, boolean, boolean) to service_role;
grant execute on function public.vrati_kod(uuid, text) to service_role;
grant execute on function public.izdaj_kodove(uuid, text, int, numeric, text, text) to service_role;
grant execute on function public.ponisti_kupnju(text) to service_role;

grant execute on function public.moj_pristup() to authenticated;
grant execute on function public.pregled_koda(text) to authenticated;
grant execute on function public.moji_kodovi() to authenticated;
grant execute on function public.moji_darivatelji() to authenticated;
grant execute on function public.postavi_vidljivost_kupcu(uuid, boolean, boolean) to authenticated;
grant execute on function public.moji_ljudi() to authenticated;

-- ============================================================
-- za testiranje bez Paddlea (pokrenuti ručno kad zatreba, NE dio migracije)
-- ============================================================
-- Izdaj 5 mjesečnih kodova "kupcu" (uuid iz Authentication → Users) i pogledaj ih:
--   select public.izdaj_kodove('<uuid-kupca>', 'mjesec', 5, 0, 'EUR', 'test-' || gen_random_uuid());
--   select kod from public.kodovi order by created_at desc limit 5;
-- Simuliraj Paddle pretplatu:
--   insert into public.pretplate (user_id, paket, placeni_paket, status, vrijedi_do, auto_obnova, cijena_iznos, valuta)
--   values ('<uuid>', 'godina', 'godina', 'active', now() + interval '1 year', true, 60, 'EUR');
