import { supabaseServer } from "@/app/lib/supabaseServer";
import { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/courses/[id] — detalle completo con contenido
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: error.code === "PGRST116" ? 404 : 500 });
  }

  return Response.json(data);
}

// PUT /api/admin/courses/[id] — actualizar (metadata y/o contenido)
export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => null);

  if (!body) {
    return Response.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const allowed = [
    "title",
    "description",
    "category",
    "passing_score",
    "estimated_minutes",
    "status",
    "content",
    "signature_url",
  ];

  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return Response.json({ error: "Sin campos para actualizar" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("courses")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}

// DELETE /api/admin/courses/[id] — eliminar curso y sus archivos
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  // 1. Obtener el curso para saber si tiene firma
  const { data: course } = await supabaseServer
    .from("courses")
    .select("signature_url")
    .eq("id", id)
    .single();

  // 2. Eliminar imágenes del curso en storage (carpeta del curso)
  const { data: files } = await supabaseServer.storage
    .from("course-content")
    .list(id);

  if (files && files.length > 0) {
    const paths = files.map((f) => `${id}/${f.name}`);
    await supabaseServer.storage.from("course-content").remove(paths);
  }

  // 3. Eliminar firma PDF si existe
  if (course?.signature_url) {
    await supabaseServer.storage
      .from("course-signatures")
      .remove([`${id}/signature.pdf`]);
  }

  // 4. Eliminar el registro
  const { error } = await supabaseServer
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
