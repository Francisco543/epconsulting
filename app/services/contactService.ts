export type ContactMessageStatus = "nuevo" | "leido" | "archivado";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  created_at: string;
  read_at: string | null;
  status: ContactMessageStatus;
};

type CreateContactInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
};

export async function createContactMessage(input: CreateContactInput) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al enviar el mensaje de contacto");
  }
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  const response = await fetch("/api/contact", { method: "GET" });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al obtener los mensajes de contacto");
  }

  const data = (await response.json()) as ContactMessage[];
  return data;
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageStatus,
) {
  const response = await fetch(`/api/contact/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al actualizar el estado del mensaje");
  }
}

