export type ClientStatus = "active" | "inactive";

export type Client = {
  id: string;
  company_name: string;
  cuit: string | null;
  contact_name: string | null;
  contact_email: string;
  phone: string | null;
  industry: string | null;
  status: ClientStatus;
  notes: string | null;
  gestor_id: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateClientInput = {
  company_name: string;
  cuit?: string;
  contact_name?: string;
  contact_email: string;
  phone?: string;
  industry?: string;
  notes?: string;
};

export async function listClients(): Promise<Client[]> {
  const response = await fetch("/api/admin/clients", { method: "GET" });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al obtener los clientes");
  }

  return (await response.json()) as Client[];
}

export async function createClient(input: CreateClientInput): Promise<Client> {
  const response = await fetch("/api/admin/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(body.error ?? "Error al crear el cliente");
  }

  const { client } = (await response.json()) as { client: Client };
  return client;
}

export async function getClient(id: string): Promise<Client> {
  const response = await fetch(`/api/admin/clients/${id}`, { method: "GET" });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(body.error ?? "Error al obtener el cliente");
  }

  return (await response.json()) as Client;
}

export type UpdateClientInput = Partial<
  Pick<
    Client,
    | "company_name"
    | "cuit"
    | "contact_name"
    | "contact_email"
    | "phone"
    | "industry"
    | "notes"
    | "status"
  >
>;

export async function updateClient(
  id: string,
  input: UpdateClientInput,
): Promise<Client> {
  const response = await fetch(`/api/admin/clients/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(body.error ?? "Error al actualizar el cliente");
  }

  return (await response.json()) as Client;
}

