import { supabaseServer } from "@/app/lib/supabaseServer";
import { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// POST /api/admin/courses/[id]/images — subir imagen de contenido
export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params;

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return Response.json({ error: "Formulario inválido" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return Response.json({ error: "Archivo requerido" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json({ error: "Tipo de archivo no permitido. Usá JPG, PNG, WebP o GIF." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return Response.json({ error: "El archivo supera el límite de 10 MB." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${id}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabaseServer.storage
    .from("course-content")
    .upload(filename, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabaseServer.storage
    .from("course-content")
    .getPublicUrl(data.path);

  return Response.json({ url: publicUrl }, { status: 201 });
}
