import { NextResponse } from "next/server";
import {
  createContactMessage,
  listContactMessages,
} from "@/app/services/contactService";

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

    await createContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : undefined,
      company: company ? String(company).trim() : undefined,
      subject: subject ? String(subject).trim() : undefined,
      message: message.trim(),
    });

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
    const messages = await listContactMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error in GET /api/contact:", error);
    return NextResponse.json(
      { error: "Error interno al obtener los mensajes" },
      { status: 500 },
    );
  }
}

