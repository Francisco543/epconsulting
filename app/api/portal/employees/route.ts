import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// ─────────────────────────────────────────────────────────────
// GET /api/portal/employees
// Devuelve los empleados activos de la empresa del gestor
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

    const { data: profile } = await supabaseServer
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "gestor") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Obtener la empresa del gestor
    const { data: client } = await supabaseServer
      .from("clients")
      .select("id")
      .eq("gestor_id", user.id)
      .single();

    if (!client) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabaseServer
      .from("employees")
      .select(`
        *,
        employee_course_assignments (
          id,
          status,
          score,
          certificate_url,
          completed_at,
          courses ( id, title )
        )
      `)
      .eq("client_id", client.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/portal/employees:", error);
      return NextResponse.json({ error: "Error al obtener empleados" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("GET /api/portal/employees:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
