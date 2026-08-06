-- Ejecutar en el editor SQL de Supabase. La service role se usa solo en el servidor.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null, whatsapp text not null, email text not null, district text not null,
  relationship text not null, approximate_age integer not null, interest text not null,
  preferred_contact_time text not null, comment text not null default '',
  privacy_consent boolean not null, newsletter_consent boolean not null default false,
  source_url text, utm jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
-- No crear políticas públicas. La API inserta con la service role del servidor.
