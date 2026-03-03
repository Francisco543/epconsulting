import { type Course, type Chapter } from "@/app/admin/cursos/_types";

// ── Tipos de respuesta de la API ──────────────────────────────

export type CourseRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  passing_score: number;
  estimated_minutes: number;
  status: "draft" | "published";
  signature_url: string;
  created_at: string;
  updated_at: string;
};

export type CourseDetail = CourseRow & {
  content: { chapters: Chapter[] };
};

export type CreateCourseInput = {
  title: string;
  description?: string;
  category?: string;
  passing_score?: number;
  estimated_minutes?: number;
  content?: { chapters: Chapter[] };
};

export type UpdateCourseInput = Partial<{
  title: string;
  description: string;
  category: string;
  passing_score: number;
  estimated_minutes: number;
  status: "draft" | "published";
  content: { chapters: Chapter[] };
  signature_url: string;
}>;

// ── Lista de cursos ───────────────────────────────────────────

export async function listCourses(): Promise<CourseRow[]> {
  const res = await fetch("/api/admin/courses");
  if (!res.ok) throw new Error("No se pudieron cargar los cursos");
  return res.json();
}

// ── Crear curso ───────────────────────────────────────────────

export async function createCourse(input: CreateCourseInput): Promise<CourseDetail> {
  const res = await fetch("/api/admin/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "No se pudo crear el curso");
  }
  return res.json();
}

// ── Obtener curso completo ────────────────────────────────────

export async function getCourse(id: string): Promise<CourseDetail> {
  const res = await fetch(`/api/admin/courses/${id}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "No se pudo cargar el curso");
  }
  return res.json();
}

// ── Actualizar curso ──────────────────────────────────────────

export async function updateCourse(id: string, input: UpdateCourseInput): Promise<CourseDetail> {
  const res = await fetch(`/api/admin/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "No se pudo guardar el curso");
  }
  return res.json();
}

// ── Eliminar curso ────────────────────────────────────────────

export async function deleteCourse(id: string): Promise<void> {
  const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "No se pudo eliminar el curso");
  }
}

// ── Subir imagen de contenido ─────────────────────────────────

export async function uploadCourseImage(courseId: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/admin/courses/${courseId}/images`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "No se pudo subir la imagen");
  }

  const { url } = await res.json();
  return url as string;
}

// ── Subir firma PDF ───────────────────────────────────────────

export async function uploadCourseSignature(courseId: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/admin/courses/${courseId}/signature`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "No se pudo subir la firma");
  }

  const { url } = await res.json();
  return url as string;
}

// ── Eliminar firma PDF ────────────────────────────────────────

export async function deleteCourseSignature(courseId: string): Promise<void> {
  const res = await fetch(`/api/admin/courses/${courseId}/signature`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "No se pudo eliminar la firma");
  }
}
