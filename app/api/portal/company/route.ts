import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

// GET /api/portal/company
// Devuelve los datos de la empresa del gestor autenticado (sin exponer la tabla entera)
export async function GET(request: Request) {
  try {
    // Obtener el JWT del header de autorización que envía el cliente
    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar el token y obtener el usuario
    const { data: userData, error: userError } =
      await supabaseServer.auth.getUser(token);

    if (userError || !userData.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = userData.user.id;

    // Verificar que el usuario es gestor
    const { data: profile } = await supabaseServer
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (!profile || profile.role !== "gestor") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Obtener la empresa vinculada al gestor
    const { data: company, error: companyError } = await supabaseServer
      .from("clients")
      .select("id, company_name, cuit, industry, status")
      .eq("gestor_id", userId)
      .single();

    if (companyError || !company) {
      return NextResponse.json(null);
    }

    return NextResponse.json(company);
  } catch (err) {
    console.error("Error in GET /api/portal/company:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
