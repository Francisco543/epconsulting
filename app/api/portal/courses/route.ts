import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// ─────────────────────────────────────────────────────────────
// GET /api/portal/courses
// Lista los cursos publicados para que el gestor pueda
// seleccionar uno al crear una solicitud de empleados.
// ─────────────────────────────────────────────────────────────
export async function GET(request: Request) {
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
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { data, error } = await supabaseServer
    .from("courses")
    .select("id, title, description, category, estimated_minutes, passing_score")
    .eq("status", "published")
    .order("title", { ascending: true });

  if (error) {
    console.error("GET /api/portal/courses:", error);
    return NextResponse.json({ error: "Error al obtener cursos" }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
