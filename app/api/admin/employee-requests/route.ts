import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// ─────────────────────────────────────────────────────────────
// GET /api/admin/employee-requests
// Lista todas las solicitudes (con cliente, gestor e ítems)
// ?status=pending|approved|rejected  (por defecto: pending)
// ─────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") ?? "pending";

    const { data, error } = await supabaseServer
      .from("employee_requests")
      .select(`
        *,
        employee_request_items (*),
        clients (id, company_name),
        profiles!employee_requests_created_by_fkey (id, full_name, email)
      `)
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/admin/employee-requests:", error);
      return NextResponse.json({ error: "Error al obtener solicitudes" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("GET /api/admin/employee-requests:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
