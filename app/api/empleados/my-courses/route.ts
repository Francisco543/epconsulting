import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// ─────────────────────────────────────────────────────────────
// GET /api/empleados/my-courses
// Devuelve los cursos asignados al empleado autenticado,
// con el estado de avance de cada asignación.
// ─────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const { data: { user }, error: userError } = await supabaseServer.auth.getUser(token);
    if (userError || !user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar que sea empleado
    const { data: profile } = await supabaseServer
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "empleado") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Obtener el registro de empleado
    const { data: employee } = await supabaseServer
      .from("employees")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!employee) {
      return NextResponse.json([]);
    }

    // Obtener asignaciones con detalle del curso
    const { data, error } = await supabaseServer
      .from("employee_course_assignments")
      .select(`
        id,
        status,
        assigned_at,
        started_at,
        completed_at,
        score,
        certificate_url,
        courses (
          id,
          title,
          description,
          category,
          estimated_minutes,
          passing_score
        )
      `)
      .eq("employee_id", employee.id)
      .order("assigned_at", { ascending: false });

    if (error) {
      console.error("GET /api/empleados/my-courses:", error);
      return NextResponse.json({ error: "Error al obtener cursos" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("GET /api/empleados/my-courses:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
