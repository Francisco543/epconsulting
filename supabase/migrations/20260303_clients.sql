-- ============================================================
-- CLIENTES (empresas) + ROL GESTOR
-- ============================================================
-- Ejecutar DESPUÉS de las migraciones de profiles existentes.

-- ─────────────────────────────────────────────────────────────
-- 1. Agregar columna "role" a profiles
--    Posibles valores: 'admin' | 'gestor' | 'employee'
--    Los admins actuales (is_admin = true) pasan a role = 'admin'
--    Los nuevos usuarios creados por el sistema son 'gestor' por defecto
-- ─────────────────────────────────────────────────────────────
alter table public.profiles
  add column if not exists role text not null default 'gestor';

-- Sincronizar admins existentes
update public.profiles
set role = 'admin'
where is_admin = true;

-- ─────────────────────────────────────────────────────────────
-- 2. Actualizar handle_new_user para leer role desde metadatos
--    Cuando creamos un usuario gestor vía Admin API pasamos
--    { role: 'gestor', full_name: '...' } en user_metadata.
-- ─────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', null),
    coalesce(new.raw_user_meta_data->>'role', 'gestor')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- ─────────────────────────────────────────────────────────────
-- 3. Helper: is_gestor(uid)
-- ─────────────────────────────────────────────────────────────
create or replace function public.is_gestor(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(
    (select role = 'gestor' from public.profiles where id = uid),
    false
  );
$$;

-- ─────────────────────────────────────────────────────────────
-- 4. Tabla clients (empresas cliente de MEP)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.clients (
  id            uuid        primary key default gen_random_uuid(),
  company_name  text        not null,
  cuit          text,
  contact_name  text,
  contact_email text        not null,
  phone         text,
  industry      text,
  status        text        not null default 'active',
  notes         text,
  gestor_id     uuid        references public.profiles(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.clients is
  'Empresas clientes de MEP Compliance. Cada cliente está vinculado a un usuario con role=gestor.';

-- Trigger updated_at
drop trigger if exists set_clients_updated_at on public.clients;
create trigger set_clients_updated_at
  before update on public.clients
  for each row
  execute procedure public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 5. RLS para clients
-- ─────────────────────────────────────────────────────────────
alter table public.clients enable row level security;

-- Admins: acceso completo
drop policy if exists "Admin manage clients" on public.clients;
create policy "Admin manage clients"
  on public.clients
  for all
  to authenticated
  using  (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- Gestor: solo puede ver la empresa que le corresponde
-- (No puede ver, editar ni eliminar otras empresas ni la tabla entera)
drop policy if exists "Gestor view own client" on public.clients;
create policy "Gestor view own client"
  on public.clients
  for select
  to authenticated
  using (gestor_id = auth.uid());
