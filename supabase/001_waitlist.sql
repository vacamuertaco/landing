-- Lista de espera de vacamuerta.co
-- Correr en el SQL Editor de AMBOS proyectos de Supabase:
--   vacamuertaco-Production y Vacamuerta-staging.
-- El rol anon solo puede INSERTAR: nadie puede leer la lista desde afuera.
-- Para exportarla: dashboard de Supabase -> Table Editor -> waitlist.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) between 3 and 254),
  lang text not null default 'es' check (lang in ('es', 'en')),
  created_at timestamptz not null default now()
);

-- Un email una sola vez, sin importar mayúsculas/minúsculas.
create unique index if not exists waitlist_email_key
  on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

drop policy if exists "anon can insert waitlist" on public.waitlist;
create policy "anon can insert waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- GRANTs explícitos (RLS por sí solo no alcanza).
grant insert on public.waitlist to anon;
grant select, insert, update, delete on public.waitlist to service_role;
