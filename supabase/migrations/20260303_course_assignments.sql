-- ─────────────────────────────────────────────────────────────
-- Migración: asignaciones de cursos a empleados
-- ─────────────────────────────────────────────────────────────

-- 1. Agregar course_id a employee_requests (el gestor elige qué curso
--    se asignará al aprobar la solicitud)
ALTER TABLE public.employee_requests
  ADD COLUMN IF NOT EXISTS course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL;

-- 2. Tabla de asignaciones empleado ↔ curso
CREATE TABLE IF NOT EXISTS public.employee_course_assignments (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id      uuid        NOT NULL REFERENCES public.employees(id)  ON DELETE CASCADE,
  course_id        uuid        NOT NULL REFERENCES public.courses(id)     ON DELETE CASCADE,
  assigned_at      timestamptz NOT NULL DEFAULT now(),
  status           text        NOT NULL DEFAULT 'pending'
                               CHECK (status IN ('pending', 'in_progress', 'completed')),
  started_at       timestamptz,
  completed_at     timestamptz,
  score            integer     CHECK (score >= 0 AND score <= 100),
  certificate_url  text        NOT NULL DEFAULT '',

  UNIQUE (employee_id, course_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_eca_employee ON public.employee_course_assignments (employee_id);
CREATE INDEX IF NOT EXISTS idx_eca_course   ON public.employee_course_assignments (course_id);

-- RLS
ALTER TABLE public.employee_course_assignments ENABLE ROW LEVEL SECURITY;

-- Admins: acceso total
CREATE POLICY "admin_full_employee_course_assignments"
  ON public.employee_course_assignments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Empleados: pueden ver sus propias asignaciones
CREATE POLICY "employee_view_own_assignments"
  ON public.employee_course_assignments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.employees e
      WHERE e.id = employee_course_assignments.employee_id
        AND e.user_id = auth.uid()
    )
  );

-- Gestores: pueden ver las asignaciones de los empleados de su empresa
CREATE POLICY "gestor_view_company_assignments"
  ON public.employee_course_assignments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.employees e
      JOIN public.clients c ON c.id = e.client_id
      WHERE e.id = employee_course_assignments.employee_id
        AND c.gestor_id = auth.uid()
    )
  );
