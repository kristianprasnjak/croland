-- Croland — Progress: javni bodovi i veze medu ljudima.
-- Pokrenuti jednom u Supabase SQL editoru, POSLIJE supabase-schema.sql.
-- Ne dira postojece tablice osim sto prosiruje okidac handle_new_user.

-- ============================================================
-- javni_bodovi
-- ============================================================
-- Ono malo sto o nekome smiju vidjeti ljudi iz njegovog kruga. Namjerno je
-- odvojeno od `progress`: taj red nosi i postavke, savjete i imena, a RLS u
-- Postgresu radi na razini retka — ili se vidi sve ili nista. Ovako se dijeli
-- tocno ono sto treba i nista vise.
create table if not exists public.javni_bodovi (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nadimak text,
  javni_id text unique,
  lp int not null default 0,
  vp int not null default 0,
  gp int not null default 0,
  pp int not null default 0,
  -- false: krug vidi samo cetiri broja. true: vidi i razradu po cjelinama.
  progres_javan boolean not null default false,
  -- po cjelini: {"Vocabulary 7": [77, 191], ...} — taman za mrezu, nista vise
  sazetak jsonb not null default '{}'::jsonb,
  -- PODACI.generirano u trenutku upisa: isti broj bodova znaci drugi postotak
  -- kad se doda gradivo, pa se bez ovoga uspoređuju dvije razlicite skale
  verzija_sadrzaja text,
  zadnja_aktivnost timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.javni_bodovi enable row level security;

-- ---- generiranje javnog ID-a ----
-- Pet znakova bez 0 i O. 34^5 = 45,4 milijuna kombinacija; sudar rjesava petlja.
create or replace function public.novi_javni_id()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  abeceda constant text := 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  kandidat text;
  i int;
  pokusaj int := 0;
begin
  loop
    kandidat := '';
    for i in 1..5 loop
      kandidat := kandidat || substr(abeceda, 1 + floor(random() * length(abeceda))::int, 1);
    end loop;
    exit when not exists (select 1 from public.javni_bodovi where javni_id = kandidat);
    pokusaj := pokusaj + 1;
    if pokusaj > 50 then
      raise exception 'ne mogu naci slobodan javni_id';
    end if;
  end loop;
  return kandidat;
end;
$$;

-- ---- politike ----
create policy "javni_bodovi: vlasnik cita svoj"
  on public.javni_bodovi for select
  to authenticated
  using (auth.uid() = user_id);

create policy "javni_bodovi: vlasnik upisuje svoj"
  on public.javni_bodovi for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "javni_bodovi: vlasnik mijenja svoj"
  on public.javni_bodovi for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Politika kojom veza cita tudi red stoji nize, iza tablice `veze`.

-- ============================================================
-- veze
-- ============================================================
-- Jedan red = "gledatelj smije vidjeti gledanog". Namjerno jednosmjerno:
-- prijateljstvo je uzajamno (dva reda), a odnos platitelja i korisnika koda
-- nije. Sve pod jednim krovom, jer u aplikaciji postoji samo jedan popis.
create table if not exists public.veze (
  gledatelj uuid not null references auth.users(id) on delete cascade,
  gledani   uuid not null references auth.users(id) on delete cascade,
  izvor  text not null default 'zahtjev',      -- 'zahtjev' | 'kod'
  stanje text not null default 'ceka',         -- 'ceka' | 'prihvaceno' | 'blokirano'
  kod text,                                    -- popunjen samo kad je izvor 'kod'
  vrijedi_do timestamptz,                      -- isto; kod-veza istekne sama
  created_at timestamptz not null default now(),
  primary key (gledatelj, gledani),
  constraint veze_nije_sam_sa_sobom check (gledatelj <> gledani),
  constraint veze_izvor_ok check (izvor in ('zahtjev', 'kod')),
  constraint veze_stanje_ok check (stanje in ('ceka', 'prihvaceno', 'blokirano'))
);

create index if not exists veze_gledani_idx on public.veze (gledani);

alter table public.veze enable row level security;

create policy "veze: sudionik cita"
  on public.veze for select
  to authenticated
  using (auth.uid() = gledatelj or auth.uid() = gledani);

-- Zahtjev smijem napraviti samo u svoje ime i samo kao 'ceka'. Jedina iznimka
-- je uzvratni red pri prihvacanju: njega smijem odmah upisati kao 'prihvaceno',
-- ali tek kad je onaj drugi smjer vec prihvacen. Kod-veze upisuje samo
-- service-role (naplata), pa za njih ovdje nema politike.
create policy "veze: sam trazim"
  on public.veze for insert
  to authenticated
  with check (
    auth.uid() = gledatelj
    and izvor = 'zahtjev'
    and (
      stanje = 'ceka'
      or (
        stanje = 'prihvaceno'
        and exists (
          select 1 from public.veze v
          where v.gledatelj = veze.gledani
            and v.gledani = auth.uid()
            and v.stanje = 'prihvaceno'
        )
      )
    )
  );

-- Odgovara onaj koga se gleda: on prihvaca, odbija ili blokira.
create policy "veze: gledani odgovara"
  on public.veze for update
  to authenticated
  using (auth.uid() = gledani and izvor = 'zahtjev')
  with check (auth.uid() = gledani and izvor = 'zahtjev');

-- Vezu raskida bilo koja strana.
create policy "veze: sudionik brise"
  on public.veze for delete
  to authenticated
  using (auth.uid() = gledatelj or auth.uid() = gledani);

-- Namjerno NEMA politike koja bi drugima dala izravan select nad javni_bodovi.
-- Tudje se cita jedino kroz moji_ljudi() nize, a ta funkcija sama odluci sto smije
-- van: bodovi uvijek, razrada samo ako je covjek svoj progres postavio na javno.
-- Da politika postoji, razrada bi curila i onima koji su je drzali zatvorenom.

-- ============================================================
-- trazenja — ogranicenje na pretragu po ID-u
-- ============================================================
-- Bez ovoga bi bot mogao proseta prostor ID-ova i pokupiti nadimke, a nadimak
-- ce kod dobrog dijela ljudi biti ime i prezime.
create table if not exists public.trazenja (
  user_id uuid not null references auth.users(id) on delete cascade,
  dan date not null default current_date,
  broj int not null default 0,
  primary key (user_id, dan)
);

alter table public.trazenja enable row level security;
-- Bez politika: dira ju samo security-definer funkcija ispod.

-- ============================================================
-- funkcije koje klijent zove
-- ============================================================

-- Osigura da moj red u javni_bodovi postoji i vrati moj javni ID i nadimak.
create or replace function public.moj_javni_racun()
returns table (javni_id text, nadimak text, progres_javan boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then
    raise exception 'nije prijavljen';
  end if;

  insert into public.javni_bodovi (user_id, javni_id)
  values (me, public.novi_javni_id())
  on conflict (user_id) do nothing;

  -- red je mogao nastati prije ove migracije, bez ID-a
  update public.javni_bodovi jb
     set javni_id = public.novi_javni_id()
   where jb.user_id = me and jb.javni_id is null;

  return query
    select jb.javni_id, jb.nadimak, jb.progres_javan
      from public.javni_bodovi jb
     where jb.user_id = me;
end;
$$;

-- Traženje po ID-u. Vraca samo nadimak i je li veza vec u tijeku — nikad e-mail
-- i nikad uuid. Trideset upita dnevno je vise nego dovoljno za covjeka.
create or replace function public.nadji_po_id(kod text)
returns table (nadimak text, stanje text)
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  meta uuid;
  koliko int;
begin
  if me is null then
    raise exception 'nije prijavljen';
  end if;

  kod := upper(trim(coalesce(kod, '')));
  if length(kod) <> 5 then
    raise exception 'ID ima tocno pet znakova';
  end if;

  insert into public.trazenja as t (user_id, dan, broj) values (me, current_date, 1)
  on conflict (user_id, dan) do update set broj = t.broj + 1
  returning t.broj into koliko;

  if koliko > 30 then
    raise exception 'previse pretraga danas — pokusaj sutra';
  end if;

  select jb.user_id into meta from public.javni_bodovi jb where jb.javni_id = kod;
  if meta is null or meta = me then
    return;   -- prazan rezultat: "nema takvog"
  end if;

  return query
    select jb.nadimak,
           coalesce((select v.stanje from public.veze v
                      where v.gledatelj = me and v.gledani = meta), 'nema')
      from public.javni_bodovi jb
     where jb.user_id = meta;
end;
$$;

-- Posalji zahtjev po ID-u. Uuid druge osobe nikad ne izlazi iz baze.
create or replace function public.posalji_zahtjev(kod text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  meta uuid;
begin
  if me is null then
    raise exception 'nije prijavljen';
  end if;

  kod := upper(trim(coalesce(kod, '')));
  select jb.user_id into meta from public.javni_bodovi jb where jb.javni_id = kod;
  if meta is null then return 'nema'; end if;
  if meta = me then return 'to si ti'; end if;

  if exists (select 1 from public.veze v
              where v.gledatelj = meta and v.gledani = me and v.stanje = 'blokirano') then
    return 'nema';   -- blokiranom se ne javlja da je blokiran
  end if;

  insert into public.veze (gledatelj, gledani, izvor, stanje)
  values (me, meta, 'zahtjev', 'ceka')
  on conflict (gledatelj, gledani) do nothing;

  return 'poslano';
end;
$$;

-- Prihvati ili odbij zahtjev. Prihvacanje otvara oba smjera odjednom, jer je
-- prijateljstvo uzajamno: onaj tko je poslao zahtjev time je i sam pristao.
create or replace function public.odgovori_na_zahtjev(od uuid, prihvati boolean)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then
    raise exception 'nije prijavljen';
  end if;

  if not exists (select 1 from public.veze v
                  where v.gledatelj = od and v.gledani = me
                    and v.izvor = 'zahtjev' and v.stanje = 'ceka') then
    return 'nema zahtjeva';
  end if;

  if not prihvati then
    delete from public.veze where gledatelj = od and gledani = me and izvor = 'zahtjev';
    return 'odbijeno';
  end if;

  update public.veze set stanje = 'prihvaceno'
   where gledatelj = od and gledani = me and izvor = 'zahtjev';

  insert into public.veze (gledatelj, gledani, izvor, stanje)
  values (me, od, 'zahtjev', 'prihvaceno')
  on conflict (gledatelj, gledani) do update set stanje = 'prihvaceno';

  return 'prihvaceno';
end;
$$;

-- Raskini vezu u oba smjera.
create or replace function public.raskini_vezu(druga uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;
  delete from public.veze
   where izvor = 'zahtjev'
     and ((gledatelj = me and gledani = druga) or (gledatelj = druga and gledani = me));
  return 'raskinuto';
end;
$$;

-- Cijeli popis za stranicu Progress, u jednom pozivu: prihvaceni ljudi,
-- zahtjevi koje sam poslao i oni koje sam primio.
create or replace function public.moji_ljudi()
returns table (
  druga_id uuid,
  javni_id text,
  nadimak text,
  lp int, vp int, gp int, pp int,
  progres_javan boolean,
  sazetak jsonb,
  zadnja_aktivnost timestamptz,
  smjer text,      -- 'veza' | 'poslan' | 'primljen'
  izvor text,
  vrijedi_do timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'nije prijavljen'; end if;

  return query
  -- prihvaceni: one koje ja smijem gledati
  select jb.user_id, jb.javni_id, jb.nadimak,
         jb.lp, jb.vp, jb.gp, jb.pp,
         jb.progres_javan,
         case when jb.progres_javan then jb.sazetak else '{}'::jsonb end,
         jb.zadnja_aktivnost,
         'veza'::text, v.izvor, v.vrijedi_do
    from public.veze v
    join public.javni_bodovi jb on jb.user_id = v.gledani
   where v.gledatelj = me
     and v.stanje = 'prihvaceno'
     and (v.vrijedi_do is null or v.vrijedi_do > now())

  union all
  -- zahtjevi koje sam poslao i cekaju odgovor
  select jb.user_id, jb.javni_id, jb.nadimak,
         0, 0, 0, 0, false, '{}'::jsonb, null::timestamptz,
         'poslan'::text, v.izvor, v.vrijedi_do
    from public.veze v
    join public.javni_bodovi jb on jb.user_id = v.gledani
   where v.gledatelj = me and v.stanje = 'ceka'

  union all
  -- zahtjevi koje su meni poslali
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
-- Supabase novim objektima u shemi `public` obicno sam dodijeli ova prava, ali
-- se to da promijeniti, pa stoje izrijekom. RLS iznad je taj koji stvarno cuva
-- podatke; ovo samo otvara vrata do njih.
grant usage on schema public to authenticated;
grant select, insert, update on public.javni_bodovi to authenticated;
grant select, insert, update, delete on public.veze to authenticated;
grant execute on function public.moj_javni_racun() to authenticated;
grant execute on function public.nadji_po_id(text) to authenticated;
grant execute on function public.posalji_zahtjev(text) to authenticated;
grant execute on function public.odgovori_na_zahtjev(uuid, boolean) to authenticated;
grant execute on function public.raskini_vezu(uuid) to authenticated;
grant execute on function public.moji_ljudi() to authenticated;
-- `trazenja` namjerno ostaje bez ijednog prava: dira ju samo funkcija iznad.

-- ============================================================
-- novi korisnici dobivaju javni red odmah
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  insert into public.progress (user_id) values (new.id);
  insert into public.javni_bodovi (user_id, javni_id)
  values (new.id, public.novi_javni_id());
  return new;
end;
$$;

-- ============================================================
-- postojeci korisnici
-- ============================================================
-- Jednokratno: svi koji su se registrirali prije ove migracije dobivaju red.
insert into public.javni_bodovi (user_id, javni_id)
select u.id, public.novi_javni_id()
  from auth.users u
 where not exists (select 1 from public.javni_bodovi jb where jb.user_id = u.id);
