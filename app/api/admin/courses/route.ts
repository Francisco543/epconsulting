import { supabaseServer } from "@/app/lib/supabaseServer";
import { NextRequest } from "next/server";

// GET /api/admin/courses — lista de cursos (sin contenido completo)
export async function GET() {
  const { data, error } = await supabaseServer
    .from("courses")
    .select("id, title, description, category, passing_score, estimated_minutes, status, signature_url, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data ?? []);
}

// POST /api/admin/courses — crear nuevo curso
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const {
    title = "Nuevo curso",
    description = "",
    category = "",
    passing_score = 80,
    estimated_minutes = 30,
    status = "draft",
    content = { chapters: [] },
  } = body;

  const { data, error } = await supabaseServer
    .from("courses")
    .insert({
      title,
      description,
      category,
      passing_score,
      estimated_minutes,
      status,
      content,
    })
    .select("*")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}
