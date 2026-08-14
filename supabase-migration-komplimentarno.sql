-- Run once in the Supabase SQL editor — adds complimentary-access support to an already-applied
-- schema (supabase-schema.sql already has this column for fresh installs; this is the delta
-- for the croland project, where the schema was applied before this column existed).

alter table public.profiles
  add column komplimentarno boolean not null default false;

-- To grant someone free lifetime access: Table editor → profiles → find their row →
-- set komplimentarno to true. No Stripe involved, and the webhook never touches this column.
