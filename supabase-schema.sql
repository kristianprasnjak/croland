-- Croland — Supabase schema for accounts + subscriptions.
-- Run this once in the Supabase project's SQL editor (Database > SQL Editor > New query).

-- ============ profiles ============
-- One row per auth.users row. Written only by the Netlify Functions (service-role key,
-- bypasses RLS). The client may only read its own row.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  subscription_status text,
  price_id text,
  current_period_end timestamptz,
  -- Manually flipped in the table editor to grant free lifetime access, no Stripe involved.
  -- The webhook (netlify/functions/stripe-webhook.js) never writes this column.
  komplimentarno boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: owner can read"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- No insert/update/delete policy for `authenticated` — writes only via service-role key
-- from create-checkout-session.js / stripe-webhook.js.

-- ============ progress ============
-- One row per user. This *is* the entire client-side game state (formerly PROGRESS +
-- per-mini-game localStorage + settings localStorage), consolidated server-side.
-- The client reads/writes its own row directly using the user's own session.
create table public.progress (
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

alter table public.progress enable row level security;

create policy "progress: owner can read"
  on public.progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "progress: owner can insert"
  on public.progress for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "progress: owner can update"
  on public.progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============ stripe_events ============
-- Webhook idempotency ledger. Service-role only — no policies granted to `authenticated`,
-- so RLS (enabled, zero policies) blocks all client access by default.
create table public.stripe_events (
  id text primary key,
  processed_at timestamptz not null default now()
);

alter table public.stripe_events enable row level security;

-- ============ auto-provision on signup ============
-- Every signup (email or Google) gets a bare profiles + progress row automatically,
-- so the client never has to create one itself.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  insert into public.progress (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
