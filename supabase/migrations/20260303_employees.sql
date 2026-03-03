-- ============================================================
-- EMPLEADOS: solicitudes de alta + tabla de empleados
-- ============================================================
-- Ejecutar DESPUÉS de 20260303_clients.sql

-- ─────────────────────────────────────────────────────────────
-- 1. Helper: is_employee(uid)
-- ─────────────────────────────────────────────────────────────
create or replace function public.is_employee(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(
    (select role = 'empleado' from public.profiles where id = uid),
    false
  );
$$;

-- ─────────────────────────────────────────────────────────────
-- 2. Solicitudes de alta de empleados (creadas por el gestor)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.employee_requests (
  id           uuid        primary key default gen_random_uuid(),
  client_id    uuid        not null references public.clients(id) on delete cascade,
  created_by   uuid        not null references public.profiles(id) on delete cascade,
  status       text        not null default 'pending',
  notes        text,
  reviewed_at  timestamptz,
  reviewed_by  uuid        references public.profiles(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint employee_requests_status_check
    check (status in ('pending', 'approved', 'rejected'))
);

comment on table public.employee_requests is
  'Solicitudes de alta de empleados enviadas por el gestor al admin.';

drop trigger if exists set_employee_requests_updated_at on public.employee_requests;
create trigger set_employee_requests_updated_at
  before update on public.employee_requests
  for each row
  execute procedure public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 3. Items de cada solicitud (uno por empleado a dar de alta)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.employee_request_items (
  id                   uuid        primary key default gen_random_uuid(),
  employee_request_id  uuid        not null references public.employee_requests(id) on delete cascade,
  full_name            text        not null,
  email                text        not null,
  status               text        not null default 'pending',
  user_id              uuid        references public.profiles(id) on delete set null,
  error_msg            text,
  created_at           timestamptz not null default now(),
  constraint employee_request_items_status_check
    check (status in ('pending', 'created', 'rejected'))
);

comment on table public.employee_request_items is
  'Líneas de una solicitud de alta: un empleado por fila.';

-- ─────────────────────────────────────────────────────────────
-- 4. Empleados dados de alta (post aprobación del admin)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.employees (
  id          uuid        primary key default gen_random_uuid(),
  client_id   uuid        not null references public.clients(id) on delete cascade,
  user_id     uuid        references public.profiles(id) on delete set null,
  full_name   text        not null,
  email       text        not null,
  status      text        not null default 'active',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint employees_status_check check (status in ('active', 'inactive'))
);

comment on table public.employees is
  'Empleados activos de cada cliente, creados al aprobar una solicitud.';

drop trigger if exists set_employees_updated_at on public.employees;
create trigger set_employees_updated_at
  before update on public.employees
  for each row
  execute procedure public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 5. RLS: employee_requests
-- ─────────────────────────────────────────────────────────────
alter table public.employee_requests enable row level security;

drop policy if exists "Admin manage employee_requests" on public.employee_requests;
create policy "Admin manage employee_requests"
  on public.employee_requests for all to authenticated
  using  (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "Gestor view own employee_requests" on public.employee_requests;
create policy "Gestor view own employee_requests"
  on public.employee_requests for select to authenticated
  using (created_by = auth.uid());

drop policy if exists "Gestor insert employee_requests" on public.employee_requests;
create policy "Gestor insert employee_requests"
  on public.employee_requests for insert to authenticated
  with check (created_by = auth.uid());

-- ─────────────────────────────────────────────────────────────
-- 6. RLS: employee_request_items
-- ─────────────────────────────────────────────────────────────
alter table public.employee_request_items enable row level security;

drop policy if exists "Admin manage employee_request_items" on public.employee_request_items;
create policy "Admin manage employee_request_items"
  on public.employee_request_items for all to authenticated
  using  (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "Gestor view own request items" on public.employee_request_items;
create policy "Gestor view own request items"
  on public.employee_request_items for select to authenticated
  using (
    exists (
      select 1 from public.employee_requests r
      where r.id = employee_request_id and r.created_by = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- 7. RLS: employees
-- ─────────────────────────────────────────────────────────────
alter table public.employees enable row level security;

drop policy if exists "Admin manage employees" on public.employees;
create policy "Admin manage employees"
  on public.employees for all to authenticated
  using  (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "Gestor view own employees" on public.employees;
create policy "Gestor view own employees"
  on public.employees for select to authenticated
  using (
    exists (
      select 1 from public.clients c
      where c.id = client_id and c.gestor_id = auth.uid()
    )
  );

drop policy if exists "Empleado view self" on public.employees;
create policy "Empleado view self"
  on public.employees for select to authenticated
  using (user_id = auth.uid());
