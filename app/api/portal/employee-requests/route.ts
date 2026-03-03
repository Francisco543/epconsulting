import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

async function getGestorProfile(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);

  const { data: { user }, error } = await supabaseServer.auth.getUser(token);
  if (error || !user) return null;

  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "gestor") return null;
  return profile as { id: string; role: string };
}

async function getGestorClient(gestorId: string) {
  const { data } = await supabaseServer
    .from("clients")
    .select("id")
    .eq("gestor_id", gestorId)
    .single();
  return data;
}

// ─────────────────────────────────────────────────────────────
// GET /api/portal/employee-requests
// Lista solicitudes del gestor autenticado
// ─────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const profile = await getGestorProfile(request.headers.get("Authorization"));
    if (!profile) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data, error } = await supabaseServer
      .from("employee_requests")
      .select(`
        *,
        employee_request_items (*)
      `)
      .eq("created_by", profile.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/portal/employee-requests:", error);
      return NextResponse.json({ error: "Error al obtener solicitudes" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("GET /api/portal/employee-requests:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/portal/employee-requests
// Crea una solicitud con sus ítems
// Body: { items: { full_name: string, email: string }[], notes?: string, course_id?: string }
// ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const profile = await getGestorProfile(request.headers.get("Authorization"));
    if (!profile) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const client = await getGestorClient(profile.id);
    if (!client) {
      return NextResponse.json({ error: "No tenés una empresa asociada" }, { status: 400 });
    }

    const body = await request.json();
    const { items, notes, course_id } = body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "La lista de empleados no puede estar vacía" }, { status: 400 });
    }

    if (!course_id || typeof course_id !== "string") {
      return NextResponse.json({ error: "Debés seleccionar un curso para asignar" }, { status: 400 });
    }

    // Verificar que el curso existe y está publicado
    const { data: course, error: courseError } = await supabaseServer
      .from("courses")
      .select("id")
      .eq("id", course_id)
      .eq("status", "published")
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: "El curso seleccionado no es válido" }, { status: 400 });
    }

    // Validar ítems
    for (const item of items as { full_name?: unknown; email?: unknown }[]) {
      if (!item.full_name || typeof item.full_name !== "string") {
        return NextResponse.json({ error: "Cada empleado debe tener un nombre" }, { status: 400 });
      }
      if (!item.email || typeof item.email !== "string") {
        return NextResponse.json({ error: "Cada empleado debe tener un email" }, { status: 400 });
      }
    }

    // Crear la solicitud
    const { data: empRequest, error: requestError } = await supabaseServer
      .from("employee_requests")
      .insert({
        client_id: client.id,
        created_by: profile.id,
        status: "pending",
        notes: notes?.trim() ?? null,
        course_id,
      })
      .select()
      .single();

    if (requestError || !empRequest) {
      console.error("Error inserting employee_request:", requestError);
      return NextResponse.json({ error: "Error al crear la solicitud" }, { status: 500 });
    }

    // Insertar ítems
    const itemsToInsert = (items as { full_name: string; email: string }[]).map((item) => ({
      employee_request_id: empRequest.id,
      full_name: item.full_name.trim(),
      email: item.email.trim().toLowerCase(),
      status: "pending",
    }));

    const { error: itemsError } = await supabaseServer
      .from("employee_request_items")
      .insert(itemsToInsert);

    if (itemsError) {
      console.error("Error inserting employee_request_items:", itemsError);
      // Rollback: eliminar la solicitud
      await supabaseServer.from("employee_requests").delete().eq("id", empRequest.id);
      return NextResponse.json({ error: "Error al guardar la lista de empleados" }, { status: 500 });
    }

    // Retornar la solicitud con sus ítems
    const { data: full } = await supabaseServer
      .from("employee_requests")
      .select("*, employee_request_items(*)")
      .eq("id", empRequest.id)
      .single();

    return NextResponse.json(full, { status: 201 });
  } catch (err) {
    console.error("POST /api/portal/employee-requests:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
