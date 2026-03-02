-- Añadir estado profesional a los mensajes de contacto

alter table public.contact_messages
  add column if not exists status text not null default 'nuevo';

-- Opcional: marcar como leídos los que ya tengan read_at
update public.contact_messages
set status = 'leido'
where read_at is not null
  and status = 'nuevo';

