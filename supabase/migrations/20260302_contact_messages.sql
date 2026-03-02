-- Tabla para mensajes de contacto del sitio
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  subject text,
  message text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

comment on table public.contact_messages is 'Mensajes enviados desde el formulario de contacto del sitio web.';

