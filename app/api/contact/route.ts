import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, company, subject, message } = body ?? {};

    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !message ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Datos inválidos" },
        { status: 400 },
      );
    }

    const { error } = await supabaseServer.from("contact_messages").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : null,
      company: company ? String(company).trim() : null,
      subject: subject ? String(subject).trim() : null,
      message: message.trim(),
    });

    if (error) {
      console.error("Supabase error inserting contact message:", error);
      return NextResponse.json(
        { error: "Error al guardar el mensaje" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/contact:", error);
    return NextResponse.json(
      { error: "Error interno al enviar el mensaje" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching contact messages:", error);
      return NextResponse.json(
        { error: "Error al obtener los mensajes" },
        { status: 500 },
      );
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("Error in GET /api/contact:", error);
    return NextResponse.json(
      { error: "Error interno al obtener los mensajes" },
      { status: 500 },
    );
  }
}

