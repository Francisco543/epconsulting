import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// ─────────────────────────────────────────────────────────────
// GET /api/admin/clients/[id]/employees
// Lista los empleados activos de un cliente
// ─────────────────────────────────────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const { data, error } = await supabaseServer
      .from("employees")
      .select("*")
      .eq("client_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/admin/clients/[id]/employees:", error);
      return NextResponse.json({ error: "Error al obtener empleados" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("GET /api/admin/clients/[id]/employees:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
