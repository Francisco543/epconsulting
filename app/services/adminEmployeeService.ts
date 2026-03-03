export type AdminEmployeeRequest = {
  id: string;
  client_id: string;
  created_by: string;
  status: "pending" | "approved" | "rejected";
  notes: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  employee_request_items: {
    id: string;
    full_name: string;
    email: string;
    status: "pending" | "created" | "rejected";
    user_id: string | null;
    error_msg: string | null;
  }[];
  clients: { id: string; company_name: string } | null;
  profiles: { id: string; full_name: string | null; email: string } | null;
};

export type Employee = {
  id: string;
  client_id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

// ─────────────────────────────────────────────────────────────
// Listar solicitudes (filtradas por status)
// ─────────────────────────────────────────────────────────────
export async function listEmployeeRequests(
  status: "pending" | "approved" | "rejected" = "pending",
): Promise<AdminEmployeeRequest[]> {
  const res = await fetch(`/api/admin/employee-requests?status=${status}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Error al obtener solicitudes");
  }
  return (await res.json()) as AdminEmployeeRequest[];
}

// ─────────────────────────────────────────────────────────────
// Aprobar solicitud
// ─────────────────────────────────────────────────────────────
export async function approveEmployeeRequest(
  id: string,
): Promise<{ ok: boolean; results: { id: string; ok: boolean; error?: string }[] }> {
  const res = await fetch(`/api/admin/employee-requests/${id}/approve`, {
    method: "POST",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Error al aprobar la solicitud");
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────
// Rechazar solicitud
// ─────────────────────────────────────────────────────────────
export async function rejectEmployeeRequest(id: string): Promise<void> {
  const res = await fetch(`/api/admin/employee-requests/${id}/reject`, {
    method: "POST",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Error al rechazar la solicitud");
  }
}

// ─────────────────────────────────────────────────────────────
// Listar empleados de un cliente
// ─────────────────────────────────────────────────────────────
export async function listClientEmployees(clientId: string): Promise<Employee[]> {
  const res = await fetch(`/api/admin/clients/${clientId}/employees`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Error al obtener empleados");
  }
  return (await res.json()) as Employee[];
}
