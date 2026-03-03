import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

const UPDATABLE_FIELDS = [
  "company_name",
  "cuit",
  "contact_name",
  "contact_email",
  "phone",
  "industry",
  "notes",
  "status",
] as const;

// ─────────────────────────────────────────────────────────────
// GET /api/admin/clients/[id]  → obtiene un cliente
// ─────────────────────────────────────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseServer
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/admin/clients/[id]:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────
// PATCH /api/admin/clients/[id]  → actualiza campos del cliente
// ─────────────────────────────────────────────────────────────
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;

    const patch: Record<string, unknown> = {};
    for (const field of UPDATABLE_FIELDS) {
      if (field in body) patch[field] = body[field];
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json(
        { error: "No hay campos válidos para actualizar" },
        { status: 400 },
      );
    }

    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabaseServer
      .from("clients")
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating client:", error);
      return NextResponse.json({ error: "Error al actualizar el cliente" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("PATCH /api/admin/clients/[id]:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// DELETE intencionalmente no implementado: eliminar un cliente borraría en cascada
// empleados, solicitudes y certificaciones. Usá status = "inactive" para deshabilitar.
export async function DELETE() {
  return NextResponse.json(
    { error: "No está permitido eliminar clientes. Cambiá el estado a 'inactivo' si necesitás deshabilitarlo." },
    { status: 405 },
  );
}
