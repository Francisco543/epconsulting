import { supabaseServer } from "@/app/lib/supabaseServer";

export type EmployeeCtx = {
  userId: string;
  employeeId: string;
};

/**
 * Valida Bearer token → rol empleado → devuelve employeeId.
 * Retorna null si la autenticación/autorización falla.
 */
export async function resolveEmployeeCtx(
  authHeader: string | null,
): Promise<EmployeeCtx | null> {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);

  const { data: { user }, error } = await supabaseServer.auth.getUser(token);
  if (error || !user) return null;

  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "empleado") return null;

  const { data: employee } = await supabaseServer
    .from("employees")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!employee) return null;

  return { userId: user.id, employeeId: employee.id };
}

/**
 * Valida que la asignación pertenezca al empleado autenticado.
 * Devuelve el registro completo si ok, null si no.
 */
export async function resolveAssignment(
  assignmentId: string,
  employeeId: string,
) {
  const { data } = await supabaseServer
    .from("employee_course_assignments")
    .select("id, status, employee_id, course_id, score, certificate_url, started_at, completed_at")
    .eq("id", assignmentId)
    .eq("employee_id", employeeId)
    .maybeSingle();

  return data ?? null;
}

/** Inserta un log de actividad (fire-and-forget, no lanza). */
export async function logActivity(opts: {
  assignment_id: string;
  event_type: string;
  chapter_id?: string;
  slide_id?: string;
  metadata?: Record<string, unknown>;
}) {
  await supabaseServer.from("course_activity_logs").insert({
    assignment_id: opts.assignment_id,
    event_type: opts.event_type,
    chapter_id: opts.chapter_id ?? null,
    slide_id: opts.slide_id ?? null,
    metadata: opts.metadata ?? null,
  });
}
