-- Fix RLS recursion for profiles/contact_messages and add helper is_admin()

-- Función auxiliar para chequear si un usuario es admin
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

-- Actualizar políticas en public.profiles
alter table public.profiles enable row level security;

drop policy if exists "Admin manage profiles" on public.profiles;
create policy "Admin manage profiles"
on public.profiles
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Actualizar políticas en public.contact_messages
alter table public.contact_messages enable row level security;

drop policy if exists "Admin manage contact messages" on public.contact_messages;
create policy "Admin manage contact messages"
on public.contact_messages
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

