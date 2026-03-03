import { supabase } from "@/app/lib/supabaseClient";

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

export type EmployeeRequestStatus = "pending" | "approved" | "rejected";
export type EmployeeRequestItemStatus = "pending" | "created" | "rejected";

export type EmployeeRequestItem = {
  id: string;
  employee_request_id: string;
  full_name: string;
  email: string;
  status: EmployeeRequestItemStatus;
  user_id: string | null;
  error_msg: string | null;
  created_at: string;
};

export type EmployeeRequest = {
  id: string;
  client_id: string;
  created_by: string;
  status: EmployeeRequestStatus;
  notes: string | null;
  course_id: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  employee_request_items: EmployeeRequestItem[];
};

export type CreateEmployeeRequestInput = {
  items: { full_name: string; email: string }[];
  notes?: string;
  course_id: string;
};

export type PortalCourse = {
  id: string;
  title: string;
  description: string;
  category: string;
  estimated_minutes: number;
  passing_score: number;
};

// ─────────────────────────────────────────────────────────────
// Obtiene el token de sesión para pasarlo al API
// ─────────────────────────────────────────────────────────────
async function getAuthHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─────────────────────────────────────────────────────────────
// Listar solicitudes del gestor
// ─────────────────────────────────────────────────────────────
export async function listEmployeeRequests(): Promise<EmployeeRequest[]> {
  const headers = await getAuthHeader();
  const res = await fetch("/api/portal/employee-requests", {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Error al obtener solicitudes");
  }

  return (await res.json()) as EmployeeRequest[];
}

// ─────────────────────────────────────────────────────────────
// Crear solicitud
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// Listar empleados activos de la empresa del gestor
// ─────────────────────────────────────────────────────────────
export async function listPortalEmployees(): Promise<Employee[]> {
  const headers = await getAuthHeader();
  const res = await fetch("/api/portal/employees", { method: "GET", headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Error al obtener empleados");
  }

  return (await res.json()) as Employee[];
}

export async function createEmployeeRequest(
  input: CreateEmployeeRequestInput,
): Promise<EmployeeRequest> {
  const headers = await getAuthHeader();
  const res = await fetch("/api/portal/employee-requests", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Error al crear la solicitud");
  }

  return (await res.json()) as EmployeeRequest;
}

// ─────────────────────────────────────────────────────────────
// Listar cursos publicados disponibles para asignar
// ─────────────────────────────────────────────────────────────
export async function listPortalCourses(): Promise<PortalCourse[]> {
  const headers = await getAuthHeader();
  const res = await fetch("/api/portal/courses", { method: "GET", headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Error al obtener cursos");
  }

  return (await res.json()) as PortalCourse[];
}
