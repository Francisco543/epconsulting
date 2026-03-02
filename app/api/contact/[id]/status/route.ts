import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

type Params = {
  params: Promise<{ id: string }>;
};

const ALLOWED_STATUS = ["nuevo", "leido", "archivado"] as const;

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const rawStatus = body?.status;
    const status =
      typeof rawStatus === "string" ? rawStatus : String(rawStatus ?? "");

    if (
      !id ||
      !ALLOWED_STATUS.includes(status as (typeof ALLOWED_STATUS)[number])
    ) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from("contact_messages")
      .update({
        status,
        ...(status === "leido" ? { read_at: new Date().toISOString() } : {}),
      })
      .eq("id", id);

    if (error) {
      console.error("Supabase error updating contact status:", error);
      return NextResponse.json(
        { error: "Error al actualizar el estado" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in PATCH /api/contact/[id]/status:", error);
    return NextResponse.json(
      { error: "Error interno al actualizar el estado" },
      { status: 500 },
    );
  }
}
