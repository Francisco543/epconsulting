-- ──────────────────────────────────────────────────────────────
-- CURSOS: tabla + storage buckets + RLS
-- ──────────────────────────────────────────────────────────────

-- Buckets de almacenamiento ─────────────────────────────────────
-- course-content: imágenes de diapositivas, cards, portadas (público)
-- course-signatures: plantillas PDF de firma para certificados (privado)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-content',
  'course-content',
  true,
  10485760, -- 10 MB
  ARRAY['image/jpeg','image/png','image/webp','image/gif']
) ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-signatures',
  'course-signatures',
  false,
  5242880, -- 5 MB
  ARRAY['application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies ──────────────────────────────────────────────

DROP POLICY IF EXISTS "Admins upload course content"    ON storage.objects;
DROP POLICY IF EXISTS "Public read course content"      ON storage.objects;
DROP POLICY IF EXISTS "Admins delete course content"    ON storage.objects;
DROP POLICY IF EXISTS "Admins manage signatures"        ON storage.objects;

CREATE POLICY "Admins upload course content"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'course-content' AND public.is_admin(auth.uid()));

CREATE POLICY "Public read course content"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'course-content');

CREATE POLICY "Admins delete course content"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'course-content' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins manage signatures"
  ON storage.objects FOR ALL TO authenticated
  USING   (bucket_id = 'course-signatures' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'course-signatures' AND public.is_admin(auth.uid()));

-- Tabla de cursos ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.courses (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title            text        NOT NULL DEFAULT 'Nuevo curso',
  description      text        NOT NULL DEFAULT '',
  category         text        NOT NULL DEFAULT '',
  passing_score    integer     NOT NULL DEFAULT 80
                               CHECK (passing_score >= 0 AND passing_score <= 100),
  estimated_minutes integer    NOT NULL DEFAULT 30
                               CHECK (estimated_minutes > 0),
  status           text        NOT NULL DEFAULT 'draft'
                               CHECK (status IN ('draft', 'published')),
  -- Estructura completa del curso: capítulos → diapositivas → bloques
  content          jsonb       NOT NULL DEFAULT '{"chapters":[]}'::jsonb,
  -- URL del PDF de firma para generar certificados
  signature_url    text        NOT NULL DEFAULT '',
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Admins: acceso total
CREATE POLICY "Admins full access on courses"
  ON public.courses FOR ALL TO authenticated
  USING   (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Gestores y empleados: solo leer cursos publicados
CREATE POLICY "Authenticated users read published courses"
  ON public.courses FOR SELECT TO authenticated
  USING (status = 'published');

-- Trigger: actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_courses_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS courses_updated_at ON public.courses;
CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_courses_updated_at();
