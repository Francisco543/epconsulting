import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// ─────────────────────────────────────────────────────────────
// POST /api/admin/employee-requests/[id]/reject
// ─────────────────────────────────────────────────────────────
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const { data: empRequest } = await supabaseServer
      .from("employee_requests")
      .select("status")
      .eq("id", id)
      .single();

    if (!empRequest) {
      return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
    }
    if (empRequest.status !== "pending") {
      return NextResponse.json({ error: "La solicitud ya fue procesada" }, { status: 400 });
    }

    await supabaseServer
      .from("employee_requests")
      .update({ status: "rejected", reviewed_at: new Date().toISOString() })
      .eq("id", id);

    await supabaseServer
      .from("employee_request_items")
      .update({ status: "rejected" })
      .eq("employee_request_id", id)
      .eq("status", "pending");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/admin/employee-requests/[id]/reject:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
