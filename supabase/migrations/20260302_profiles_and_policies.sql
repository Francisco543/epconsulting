-- Perfiles de usuario y políticas RLS para acceso admin

-- Extensión necesaria para gen_random_uuid en muchos proyectos Supabase
create extension if not exists "pgcrypto";

-- Tabla de perfiles vinculada a auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Perfiles de usuario vinculados a auth.users, incluyendo flag de administrador.';

-- Trigger para mantener updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute procedure public.set_updated_at();

-- Función auxiliar para comprobar si un usuario es admin
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = uid),
    false
  );
$$;

-- Trigger opcional: crear profile al crear usuario en auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

-- RLS para profiles
alter table public.profiles enable row level security;

-- Perfil propio: lectura
drop policy if exists "Read own profile" on public.profiles;
create policy "Read own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

-- Perfil propio: actualización
drop policy if exists "Update own profile" on public.profiles;
create policy "Update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Admin: acceso completo a todos los perfiles
drop policy if exists "Admin manage profiles" on public.profiles;
create policy "Admin manage profiles"
on public.profiles
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- --------------------------------------------------
-- RLS para contact_messages (solo admins pueden leer)
-- --------------------------------------------------

alter table public.contact_messages enable row level security;

-- Cualquiera (anon/authenticated) puede insertar mensajes desde el sitio
drop policy if exists "Insert contact messages from site" on public.contact_messages;
create policy "Insert contact messages from site"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

-- Solo admins pueden leer / gestionar mensajes
drop policy if exists "Admin manage contact messages" on public.contact_messages;
create policy "Admin manage contact messages"
on public.contact_messages
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

