-- Croland — zaseban tečaj u vlastitoj shemi: tecaj_de
-- Generirano iz supabase-tecaj-predlozak (vidi francais/PROCITAJ-ME.md). Pokrenuti JEDNOM
-- u Supabase SQL editoru. Smije se pokrenuti i ponovno (sve je "if not exists"/"or replace").
--
-- Načelo: račun i plaćanje su ZAJEDNIČKI (shema public), a napredak, bodovi i prijatelji
-- su ODVOJENI po tečaju (ova shema). Stranica tečaja radi s
-- createClient(..., { db: { schema: 'tecaj_de' } }), pa svaki .from()/.rpc() ide ovamo.
-- Ono što je zajedničko (profil, pretplata, kodovi, postavke, AI limit) ovdje postoji kao
-- pogled ili funkcija-omotač koja samo prosljeđuje u public.
-- U public se NIŠTA ne mijenja: Croland radi točno kao prije.
--
-- Poslije pokretanja: Project Settings → Data API → Exposed schemas → dodati tecaj_de.

create schema if not exists tecaj_de;

create table if not exists tecaj_de.progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  vjezbe jsonb not null default '{}'::jsonb,
  pokrenute jsonb not null default '{}'::jsonb,
  vidjeno jsonb not null default '{}'::jsonb,
  rjecnik jsonb not null default '{}'::jsonb,
  slova jsonb not null default '{}'::jsonb,
  abeceda_slavljena boolean not null default false,
  savjeti jsonb not null default '{}'::jsonb,
  streak jsonb not null default '{}'::jsonb,
  ime text,
  mini_igre jsonb not null default '{}'::jsonb,
  postavke jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Stupci koje public.progress dobije kasnijim migracijama prepišu se automatski,
-- da klijentski upsert nikad ne udari u nepostojeći stupac.
do $$
declare c record;
begin
  for c in
    select column_name, data_type, udt_name, column_default, is_nullable
      from information_schema.columns
     where table_schema = 'public' and table_name = 'progress'
       and column_name not in (select column_name from information_schema.columns
                                where table_schema = 'tecaj_de' and table_name = 'progress')
  loop
    execute format('alter table tecaj_de.progress add column %I %s%s%s',
      c.column_name,
      case when c.data_type = 'ARRAY' then c.udt_name::regtype::text
           when c.data_type = 'USER-DEFINED' then c.udt_name
           else c.data_type end,
      case when c.column_default is not null then ' default ' || c.column_default else '' end,
      case when c.is_nullable = 'NO' and c.column_default is not null then ' not null' else '' end);
  end loop;
end $$;

alter table tecaj_de.progress enable row level security;
drop policy if exists "progress: owner can read" on tecaj_de.progress;
drop policy if exists "progress: owner can insert" on tecaj_de.progress;
drop policy if exists "progress: owner can update" on tecaj_de.progress;
create policy "progress: owner can read" on tecaj_de.progress for select to authenticated using (auth.uid() = user_id);
create policy "progress: owner can insert" on tecaj_de.progress for insert to authenticated with check (auth.uid() = user_id);
create policy "progress: owner can update" on tecaj_de.progress for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists tecaj_de.javni_bodovi (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nadimak text,
  javni_id text unique,
  lp int not null default 0,
  vp int not null default 0,
  gp int not null default 0,
  pp int not null default 0,
  progres_javan boolean not null default false,
  sazetak jsonb not null default '{}'::jsonb,
  verzija_sadrzaja text,
  zadnja_aktivnost timestamptz,
  updated_at timestamptz not null default now()
);
alter table tecaj_de.javni_bodovi enable row level security;
drop policy if exists "javni_bodovi: vlasnik cita svoj" on tecaj_de.javni_bodovi;
drop policy if exists "javni_bodovi: vlasnik upisuje svoj" on tecaj_de.javni_bodovi;
drop policy if exists "javni_bodovi: vlasnik mijenja svoj" on tecaj_de.javni_bodovi;
create policy "javni_bodovi: vlasnik cita svoj" on tecaj_de.javni_bodovi for select to authenticated using (auth.uid() = user_id);
create policy "javni_bodovi: vlasnik upisuje svoj" on tecaj_de.javni_bodovi for insert to authenticated with check (auth.uid() = user_id);
create policy "javni_bodovi: vlasnik mijenja svoj" on tecaj_de.javni_bodovi for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Prijatelji su po tečaju. Kod-veze (kupac koda gleda korisnika koda) ostaju u public,
-- jer su dio plaćanja; ovdje postoje samo zahtjevi.
create table if not exists tecaj_de.veze (
  gledatelj uuid not null references auth.users(id) on delete cascade,
  gledani   uuid not null references auth.users(id) on delete cascade,
  izvor  text not null default 'zahtjev',
  stanje text not null default 'ceka',
  kod text,
  vrijedi_do timestamptz,
  vise boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (gledatelj, gledani),
  constraint veze_nije_sam_sa_sobom check (gledatelj <> gledani),
  constraint veze_izvor_ok check (izvor in ('zahtjev', 'kod')),
  constraint veze_stanje_ok check (stanje in ('ceka', 'prihvaceno', 'blokirano'))
);
create index if not exists veze_gledani_idx on tecaj_de.veze (gledani);
alter table tecaj_de.veze enable row level security;
drop policy if exists "veze: sudionik cita" on tecaj_de.veze;
drop policy if exists "veze: sam trazim" on tecaj_de.veze;
drop policy if exists "veze: gledani odgovara" on tecaj_de.veze;
drop policy if exists "veze: sudionik brise" on tecaj_de.veze;
create policy "veze: sudionik cita" on tecaj_de.veze for select to authenticated
  using (auth.uid() = gledatelj or auth.uid() = gledani);
create policy "veze: sam trazim" on tecaj_de.veze for insert to authenticated
  with check (
    auth.uid() = gledatelj and izvor = 'zahtjev'
    and (stanje = 'ceka'
         or (stanje = 'prihvaceno' and exists (
               select 1 from tecaj_de.veze v
                where v.gledatelj = veze.gledani and v.gledani = auth.uid() and v.stanje = 'prihvaceno'))));
create policy "veze: gledani odgovara" on tecaj_de.veze for update to authenticated
  using (auth.uid() = gledani and izvor = 'zahtjev') with check (auth.uid() = gledani and izvor = 'zahtjev');
create policy "veze: sudionik brise" on tecaj_de.veze for delete to authenticated
  using (auth.uid() = gledatelj or auth.uid() = gledani);

create table if not exists tecaj_de.trazenja (
  user_id uuid not null references auth.users(id) on delete cascade,
  dan date not null default current_date,
  broj int not null default 0,
  primary key (user_id, dan)
);
alter table tecaj_de.trazenja enable row level security;

create or replace function tecaj_de.novi_javni_id()
returns text language plpgsql security definer set search_path = tecaj_de, public
as $$
declare
  abeceda constant text := 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  kandidat text; i int; pokusaj int := 0;
begin
  loop
    kandidat := '';
    for i in 1..5 loop
      kandidat := kandidat || substr(abeceda, 1 + floor(random() * length(abeceda))::int, 1);
    end loop;
    exit when not exists (select 1 from tecaj_de.javni_bodovi where javni_id = kandidat);
    pokusaj := pokusaj + 1;
    if pokusaj > 50 then raise exception 'ne mogu naci slobodan javni_id'; end if;
  end loop;
  return kandidat;
end;
$$;

create or replace function tecaj_de.moj_javni_racun()
returns table (javni_id text, nadimak text, progres_javan boolean)
language plpgsql security definer set search_path = tecaj_de, public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  insert into tecaj_de.javni_bodovi (user_id, javni_id) values (me, tecaj_de.novi_javni_id())
  on conflict (user_id) do nothing;
  update tecaj_de.javni_bodovi jb set javni_id = tecaj_de.novi_javni_id()
   where jb.user_id = me and jb.javni_id is null;
  return query select jb.javni_id, jb.nadimak, jb.progres_javan
                 from tecaj_de.javni_bodovi jb where jb.user_id = me;
end;
$$;

create or replace function tecaj_de.nadji_po_id(kod text)
returns table (nadimak text, stanje text)
language plpgsql security definer set search_path = tecaj_de, public
as $$
declare me uuid := auth.uid(); meta uuid; koliko int;
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  kod := upper(trim(coalesce(kod, '')));
  if length(kod) <> 5 then raise exception 'ID ima tocno pet znakova'; end if;
  insert into tecaj_de.trazenja as t (user_id, dan, broj) values (me, current_date, 1)
  on conflict (user_id, dan) do update set broj = t.broj + 1 returning t.broj into koliko;
  if koliko > 30 then raise exception 'previse pretraga danas — pokusaj sutra'; end if;
  select jb.user_id into meta from tecaj_de.javni_bodovi jb where jb.javni_id = kod;
  if meta is null or meta = me then return; end if;
  return query
    select jb.nadimak,
           coalesce((select v.stanje from tecaj_de.veze v where v.gledatelj = me and v.gledani = meta), 'nema')
      from tecaj_de.javni_bodovi jb where jb.user_id = meta;
end;
$$;

create or replace function tecaj_de.posalji_zahtjev(kod text)
returns text language plpgsql security definer set search_path = tecaj_de, public
as $$
declare me uuid := auth.uid(); meta uuid;
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  kod := upper(trim(coalesce(kod, '')));
  select jb.user_id into meta from tecaj_de.javni_bodovi jb where jb.javni_id = kod;
  if meta is null then return 'nema'; end if;
  if meta = me then return 'to si ti'; end if;
  if exists (select 1 from tecaj_de.veze v where v.gledatelj = meta and v.gledani = me and v.stanje = 'blokirano') then
    return 'nema';
  end if;
  insert into tecaj_de.veze (gledatelj, gledani, izvor, stanje) values (me, meta, 'zahtjev', 'ceka')
  on conflict (gledatelj, gledani) do nothing;
  return 'poslano';
end;
$$;

create or replace function tecaj_de.odgovori_na_zahtjev(od uuid, prihvati boolean)
returns text language plpgsql security definer set search_path = tecaj_de, public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  if not exists (select 1 from tecaj_de.veze v where v.gledatelj = od and v.gledani = me
                    and v.izvor = 'zahtjev' and v.stanje = 'ceka') then
    return 'nema zahtjeva';
  end if;
  if not prihvati then
    delete from tecaj_de.veze where gledatelj = od and gledani = me and izvor = 'zahtjev';
    return 'odbijeno';
  end if;
  update tecaj_de.veze set stanje = 'prihvaceno' where gledatelj = od and gledani = me and izvor = 'zahtjev';
  insert into tecaj_de.veze (gledatelj, gledani, izvor, stanje) values (me, od, 'zahtjev', 'prihvaceno')
  on conflict (gledatelj, gledani) do update set stanje = 'prihvaceno';
  return 'prihvaceno';
end;
$$;

create or replace function tecaj_de.raskini_vezu(druga uuid)
returns text language plpgsql security definer set search_path = tecaj_de, public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  delete from tecaj_de.veze
   where izvor = 'zahtjev'
     and ((gledatelj = me and gledani = druga) or (gledatelj = druga and gledani = me));
  return 'raskinuto';
end;
$$;

create or replace function tecaj_de.moji_ljudi()
returns table (
  druga_id uuid, javni_id text, nadimak text,
  lp int, vp int, gp int, pp int,
  progres_javan boolean, sazetak jsonb, zadnja_aktivnost timestamptz,
  smjer text, izvor text, vrijedi_do timestamptz
)
language plpgsql security definer set search_path = tecaj_de, public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  return query
  select jb.user_id, jb.javni_id, jb.nadimak, jb.lp, jb.vp, jb.gp, jb.pp,
         (jb.progres_javan or (v.izvor = 'kod' and v.vise)),
         case when jb.progres_javan or (v.izvor = 'kod' and v.vise) then jb.sazetak else '{}'::jsonb end,
         jb.zadnja_aktivnost, 'veza'::text, v.izvor, v.vrijedi_do
    from tecaj_de.veze v join tecaj_de.javni_bodovi jb on jb.user_id = v.gledani
   where v.gledatelj = me and v.stanje = 'prihvaceno' and (v.vrijedi_do is null or v.vrijedi_do > now())
  union all
  select jb.user_id, jb.javni_id, jb.nadimak, 0, 0, 0, 0, false, '{}'::jsonb, null::timestamptz,
         'poslan'::text, v.izvor, v.vrijedi_do
    from tecaj_de.veze v join tecaj_de.javni_bodovi jb on jb.user_id = v.gledani
   where v.gledatelj = me and v.stanje = 'ceka'
  union all
  select jb.user_id, jb.javni_id, jb.nadimak, 0, 0, 0, 0, false, '{}'::jsonb, null::timestamptz,
         'primljen'::text, v.izvor, v.vrijedi_do
    from tecaj_de.veze v join tecaj_de.javni_bodovi jb on jb.user_id = v.gledatelj
   where v.gledani = me and v.stanje = 'ceka';
end;
$$;

-- ZAJEDNIČKO: račun i plaćanje. security_invoker = pogled radi s pravima prijavljenog
-- korisnika, pa vrijede RLS i prava tablica u public — ništa više.
create or replace view tecaj_de.profiles      with (security_invoker = true) as select * from public.profiles;
create or replace view tecaj_de.pretplate     with (security_invoker = true) as select * from public.pretplate;
create or replace view tecaj_de.kupnje_kodova with (security_invoker = true) as select * from public.kupnje_kodova;
create or replace view tecaj_de.postavke      with (security_invoker = true) as select * from public.postavke;
create or replace view tecaj_de.ai_razgovori  with (security_invoker = true) as select * from public.ai_razgovori;
create or replace view tecaj_de.ai_upotreba   with (security_invoker = true) as select * from public.ai_upotreba;

create or replace function tecaj_de.moj_pristup() returns jsonb
language sql stable as $$ select public.moj_pristup() $$;

create or replace function tecaj_de.pregled_koda(p_kod text) returns jsonb
language sql as $$ select public.pregled_koda(p_kod) $$;

-- Ove tri vraćaju tablice čiji se oblik mijenjao po migracijama; omotač se gradi iz
-- stvarnog potpisa funkcije u public.
do $$
declare f text;
begin
  foreach f in array array['moji_kodovi', 'moji_darivatelji', 'postavi_vidljivost_kupcu'] loop
    execute (
      select format(
        'create or replace function tecaj_de.%I(%s) returns %s language sql as $w$ select %s public.%I(%s) $w$',
        p.proname,
        pg_get_function_arguments(p.oid),
        pg_get_function_result(p.oid),
        case when p.proretset then '* from' else '' end,
        p.proname,
        coalesce((select string_agg(quote_ident(a), ', ' order by o)
                    from unnest(p.proargnames[1:p.pronargs]) with ordinality as t(a, o)), ''))
        from pg_proc p join pg_namespace n on n.oid = p.pronamespace
       where n.nspname = 'public' and p.proname = f
       limit 1);
  end loop;
end $$;

grant usage on schema tecaj_de to anon, authenticated, service_role;
grant select, insert, update on tecaj_de.progress to authenticated;
grant select, insert, update on tecaj_de.javni_bodovi to authenticated;
grant select, insert, update, delete on tecaj_de.veze to authenticated;
grant all on all tables in schema tecaj_de to service_role;
grant select, insert, update, delete on tecaj_de.profiles, tecaj_de.pretplate, tecaj_de.kupnje_kodova,
  tecaj_de.ai_razgovori, tecaj_de.ai_upotreba to authenticated;
grant select on tecaj_de.postavke to anon, authenticated;

revoke execute on all functions in schema tecaj_de from public, anon;
grant execute on all functions in schema tecaj_de to authenticated, service_role;
revoke execute on function tecaj_de.novi_javni_id() from authenticated;
