import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { resolveEmployeeCtx, resolveAssignment, logActivity } from "../../_auth";

// ─────────────────────────────────────────────────────────────
// POST /api/empleados/courses/[id]/start
// Marca la asignación como in_progress. Idempotente.
// ─────────────────────────────────────────────────────────────
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: assignmentId } = await params;

  const ctx = await resolveEmployeeCtx(request.headers.get("Authorization"));
  if (!ctx) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const assignment = await resolveAssignment(assignmentId, ctx.employeeId);
  if (!assignment) return NextResponse.json({ error: "Asignación no encontrada" }, { status: 404 });

  // Idempotente: si ya está en progreso o completado, no hacer nada
  if (assignment.status !== "pending") {
    return NextResponse.json({ ok: true, status: assignment.status });
  }

  const { error } = await supabaseServer
    .from("employee_course_assignments")
    .update({ status: "in_progress", started_at: new Date().toISOString() })
    .eq("id", assignmentId);

  if (error) {
    console.error("POST /start:", error);
    return NextResponse.json({ error: "Error al iniciar el curso" }, { status: 500 });
  }

  await logActivity({ assignment_id: assignmentId, event_type: "started" });

  return NextResponse.json({ ok: true, status: "in_progress" });
}
