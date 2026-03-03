import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { resolveEmployeeCtx, resolveAssignment } from "../../_auth";

// ─────────────────────────────────────────────────────────────
// GET /api/empleados/courses/[id]/player
// Devuelve contenido del curso + progreso del empleado.
// El cliente NUNCA recibe las respuestas correctas del quiz.
// ─────────────────────────────────────────────────────────────
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: assignmentId } = await params;

  const ctx = await resolveEmployeeCtx(request.headers.get("Authorization"));
  if (!ctx) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const assignment = await resolveAssignment(assignmentId, ctx.employeeId);
  if (!assignment) return NextResponse.json({ error: "Asignación no encontrada" }, { status: 404 });

  // Cargar curso (sin exponer correct: true de las opciones al cliente todavía)
  const { data: course, error: courseError } = await supabaseServer
    .from("courses")
    .select("id, title, description, category, estimated_minutes, passing_score, status, content, signature_url")
    .eq("id", assignment.course_id)
    .eq("status", "published")
    .single();

  if (courseError || !course) {
    return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
  }

  // Progreso actual: IDs de slides completadas
  const { data: progress } = await supabaseServer
    .from("course_slide_progress")
    .select("slide_id, chapter_id, completed_at")
    .eq("assignment_id", assignmentId);

  const completedSlideIds = (progress ?? []).map((p) => p.slide_id);

  // Sanitizar el contenido del curso: eliminar correct:true de las opciones
  // para que el cliente no pueda hacer trampa inspeccionando la respuesta.
  const sanitizedContent = sanitizeCourseContent(course.content as CourseContent);

  // Empresa del empleado (para el certificado eventual)
  const { data: employee } = await supabaseServer
    .from("employees")
    .select("full_name, email, clients(company_name)")
    .eq("id", ctx.employeeId)
    .single();

  return NextResponse.json({
    assignment: {
      id: assignment.id,
      status: assignment.status,
      started_at: assignment.started_at,
      completed_at: assignment.completed_at,
      score: assignment.score,
      certificate_url: assignment.certificate_url,
    },
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      estimated_minutes: course.estimated_minutes,
      passing_score: course.passing_score,
      content: sanitizedContent,
    },
    completed_slide_ids: completedSlideIds,
    employee_name: (employee as { full_name: string } | null)?.full_name ?? "",
  });
}

// ─── Tipos ────────────────────────────────────────────────────

type CourseContent = {
  chapters: Array<{
    id: string;
    title: string;
    description: string;
    slides: Array<{
      id: string;
      title: string;
      coverImageUrl: string;
      blocks: Array<Record<string, unknown>>;
    }>;
  }>;
};

// Elimina correct:true de todas las opciones de quiz.
function sanitizeCourseContent(content: CourseContent): CourseContent {
  return {
    chapters: content.chapters.map((ch) => ({
      ...ch,
      slides: ch.slides.map((sl) => ({
        ...sl,
        blocks: sl.blocks.map((block) => {
          if (block.type !== "quiz") return block;
          return {
            ...block,
            questions: (block.questions as Array<{
              id: string;
              text: string;
              explanation: string;
              options: Array<{ id: string; text: string; correct: boolean }>;
            }>).map((q) => ({
              ...q,
              // Omitir correct del cliente
              options: q.options.map(({ id, text }) => ({ id, text })),
            })),
          };
        }),
      })),
    })),
  };
}
