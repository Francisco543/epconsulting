import { supabaseServer } from "@/app/lib/supabaseServer";
import { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

// POST /api/admin/courses/[id]/signature — subir PDF de firma
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

  if (file.type !== "application/pdf") {
    return Response.json({ error: "Solo se permiten archivos PDF." }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "El PDF supera el límite de 5 MB." }, { status: 400 });
  }

  const path = `${id}/signature.pdf`;
  const arrayBuffer = await file.arrayBuffer();

  // Subir (upsert para reemplazar si ya existe)
  const { data, error } = await supabaseServer.storage
    .from("course-signatures")
    .upload(path, arrayBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // Generar URL firmada (válida por 10 años — es un asset admin)
  const { data: signedData, error: signErr } = await supabaseServer.storage
    .from("course-signatures")
    .createSignedUrl(data.path, 60 * 60 * 24 * 365 * 10);

  if (signErr || !signedData) {
    return Response.json({ error: "No se pudo generar la URL firmada." }, { status: 500 });
  }

  // Actualizar el registro del curso con la URL
  const { error: updateErr } = await supabaseServer
    .from("courses")
    .update({ signature_url: signedData.signedUrl })
    .eq("id", id);

  if (updateErr) {
    return Response.json({ error: updateErr.message }, { status: 500 });
  }

  return Response.json({ url: signedData.signedUrl }, { status: 201 });
}

// DELETE /api/admin/courses/[id]/signature — eliminar firma
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  const { error: storageErr } = await supabaseServer.storage
    .from("course-signatures")
    .remove([`${id}/signature.pdf`]);

  if (storageErr) {
    return Response.json({ error: storageErr.message }, { status: 500 });
  }

  const { error } = await supabaseServer
    .from("courses")
    .update({ signature_url: "" })
    .eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
