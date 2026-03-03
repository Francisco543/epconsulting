-- ============================================================
-- COURSE PLAYER: progreso, audit log y certificados
-- ============================================================
-- Ejecutar DESPUÉS de 20260303_course_assignments.sql

-- ─────────────────────────────────────────────────────────────
-- 1. course_slide_progress
--    Una fila por (asignación × diapositiva completada).
--    UNIQUE garantiza idempotencia y previene duplicados.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.course_slide_progress (
  id             uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id  uuid        NOT NULL
                             REFERENCES public.employee_course_assignments(id)
                             ON DELETE CASCADE,
  chapter_id     text        NOT NULL,
  slide_id       text        NOT NULL,
  quiz_answers   jsonb,       -- NULL para slides sin quiz
  completed_at   timestamptz NOT NULL DEFAULT now(),

  UNIQUE (assignment_id, slide_id)
);

CREATE INDEX IF NOT EXISTS idx_csp_assignment ON public.course_slide_progress (assignment_id);

ALTER TABLE public.course_slide_progress ENABLE ROW LEVEL SECURITY;

-- Admin: acceso total
CREATE POLICY "admin_full_course_slide_progress"
  ON public.course_slide_progress FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Empleado: solo ve/inserta su propio progreso
CREATE POLICY "employee_own_slide_progress"
  ON public.course_slide_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.employee_course_assignments eca
      JOIN  public.employees e ON e.id = eca.employee_id
      WHERE eca.id = assignment_id AND e.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- 2. course_activity_logs
--    Audit trail inmutable. Solo el service role puede INSERT.
--    Los empleados y admins pueden leer.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.course_activity_logs (
  id             uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id  uuid        NOT NULL
                             REFERENCES public.employee_course_assignments(id)
                             ON DELETE CASCADE,
  event_type     text        NOT NULL
                             CHECK (event_type IN (
                               'started',
                               'slide_completed',
                               'quiz_submitted',
                               'course_finished',
                               'certificate_generated'
                             )),
  chapter_id     text,
  slide_id       text,
  metadata       jsonb,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cal_assignment ON public.course_activity_logs (assignment_id);
CREATE INDEX IF NOT EXISTS idx_cal_event      ON public.course_activity_logs (event_type);

ALTER TABLE public.course_activity_logs ENABLE ROW LEVEL SECURITY;

-- Admin: lectura total
CREATE POLICY "admin_read_activity_logs"
  ON public.course_activity_logs FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Empleado: solo lee sus propios logs
CREATE POLICY "employee_read_own_logs"
  ON public.course_activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.employee_course_assignments eca
      JOIN  public.employees e ON e.id = eca.employee_id
      WHERE eca.id = assignment_id AND e.user_id = auth.uid()
    )
  );

-- Gestor: puede ver logs de empleados de su empresa
CREATE POLICY "gestor_read_company_logs"
  ON public.course_activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.employee_course_assignments eca
      JOIN public.employees emp ON emp.id = eca.employee_id
      JOIN public.clients c     ON c.id   = emp.client_id
      WHERE eca.id = assignment_id AND c.gestor_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- 3. Storage bucket: certificates (privado)
--    Path convención: {assignment_id}/certificate.pdf
-- ─────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certificates',
  'certificates',
  false,
  5242880,          -- 5 MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Admin: acceso total al bucket
CREATE POLICY "admin_full_certificates"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'certificates'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Empleado: solo puede leer su propio certificado
-- El path es {assignment_id}/certificate.pdf
CREATE POLICY "employee_read_own_certificate"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'certificates'
    AND EXISTS (
      SELECT 1
      FROM public.employee_course_assignments eca
      JOIN public.employees e ON e.id = eca.employee_id
      WHERE e.user_id = auth.uid()
        AND (storage.objects.name = eca.id || '/certificate.pdf')
    )
  );

-- Gestor: puede leer certificados de empleados de su empresa
CREATE POLICY "gestor_read_company_certificates"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'certificates'
    AND EXISTS (
      SELECT 1
      FROM public.employee_course_assignments eca
      JOIN public.employees emp ON emp.id = eca.employee_id
      JOIN public.clients c     ON c.id   = emp.client_id
      WHERE c.gestor_id = auth.uid()
        AND (storage.objects.name = eca.id || '/certificate.pdf')
    )
  );
