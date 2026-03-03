import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// ─────────────────────────────────────────────────────────────
// GET /api/portal/employees/[employeeId]/certificate?assignmentId=...
// Devuelve una signed URL del certificado del empleado.
// Solo accesible por el gestor de la misma empresa o por admin.
// ─────────────────────────────────────────────────────────────
export async function GET(
  request: Request,
  { params }: { params: Promise<{ employeeId: string }> },
) {
  const { employeeId } = await params;
  const url = new URL(request.url);
  const assignmentId = url.searchParams.get("assignmentId");

  if (!assignmentId) {
    return NextResponse.json({ error: "assignmentId es requerido" }, { status: 400 });
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const { data: { user }, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  // Verificar que el empleado existe y obtener su empresa
  const { data: employee } = await supabaseServer
    .from("employees")
    .select("id, client_id, clients(gestor_id)")
    .eq("id", employeeId)
    .single();

  if (!employee) return NextResponse.json({ error: "Empleado no encontrado" }, { status: 404 });

  // Autorización: admin tiene acceso total; gestor solo a empleados de su empresa
  if (profile.role !== "admin") {
    const gestorId = (employee.clients as unknown as { gestor_id: string } | null)?.gestor_id;
    if (profile.role !== "gestor" || gestorId !== user.id) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }
  }

  // Verificar que la asignación pertenece al empleado y tiene certificado
  const { data: assignment } = await supabaseServer
    .from("employee_course_assignments")
    .select("id, certificate_url, status, score, courses(title)")
    .eq("id", assignmentId)
    .eq("employee_id", employeeId)
    .single();

  if (!assignment) return NextResponse.json({ error: "Asignación no encontrada" }, { status: 404 });
  if (!assignment.certificate_url) {
    return NextResponse.json({ error: "El empleado no tiene certificado para este curso" }, { status: 404 });
  }

  // El certificate_url ya es una signed URL de larga duración — la devolvemos directamente.
  // Si hubiera expirado (improbable, son 10 años), regeneramos.
  const filePath = `${assignmentId}/certificate.pdf`;
  const { data: freshSigned } = await supabaseServer.storage
    .from("certificates")
    .createSignedUrl(filePath, 60 * 60); // 1 hora para descarga

  return NextResponse.json({
    certificate_url: freshSigned?.signedUrl ?? assignment.certificate_url,
    course_title: (assignment.courses as unknown as { title: string } | null)?.title ?? "",
    score: assignment.score,
    status: assignment.status,
  });
}
