import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { resolveEmployeeCtx, resolveAssignment, logActivity } from "../../../../_auth";

type CourseContent = {
  chapters: Array<{
    id: string;
    slides: Array<{
      id: string;
      blocks: Array<{ type: string; questions?: Array<{ id: string; options: Array<{ id: string; correct: boolean }> }> }>;
    }>;
  }>;
};

// ─────────────────────────────────────────────────────────────
// POST /api/empleados/courses/[id]/slides/[slideId]/complete
// Body: { chapter_id: string; quiz_answers?: Record<questionId, optionId> }
//
// Validaciones server-side:
//  1. Assignment pertenece al usuario y está in_progress
//  2. El capítulo existe y es accesible (capítulos anteriores completos)
//  3. La diapositiva anterior en el capítulo ya fue completada
//  4. Si la slide tiene QuizBlock: quiz_answers cubre todas las preguntas
//  5. Idempotente: si ya existe el registro, retorna ok sin duplicar
// ─────────────────────────────────────────────────────────────
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; slideId: string }> },
) {
  const { id: assignmentId, slideId } = await params;

  const ctx = await resolveEmployeeCtx(request.headers.get("Authorization"));
  if (!ctx) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const assignment = await resolveAssignment(assignmentId, ctx.employeeId);
  if (!assignment) return NextResponse.json({ error: "Asignación no encontrada" }, { status: 404 });

  if (assignment.status === "completed") {
    return NextResponse.json({ error: "El curso ya fue completado" }, { status: 400 });
  }
  if (assignment.status !== "in_progress") {
    return NextResponse.json({ error: "El curso no está iniciado" }, { status: 400 });
  }

  const body = (await request.json()) as {
    chapter_id: string;
    quiz_answers?: Record<string, string>;
  };
  const { chapter_id, quiz_answers } = body ?? {};

  if (!chapter_id) {
    return NextResponse.json({ error: "chapter_id es requerido" }, { status: 400 });
  }

  // Cargar curso para validar orden
  const { data: courseRow } = await supabaseServer
    .from("courses")
    .select("content, passing_score")
    .eq("id", assignment.course_id)
    .single();

  if (!courseRow) return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });

  const content = courseRow.content as CourseContent;
  const chapters = content.chapters;

  // Validar que el capítulo existe en el curso
  const chapterIndex = chapters.findIndex((c) => c.id === chapter_id);
  if (chapterIndex === -1) {
    return NextResponse.json({ error: "Capítulo inválido" }, { status: 400 });
  }

  const chapter = chapters[chapterIndex];
  const slideIndex = chapter.slides.findIndex((s) => s.id === slideId);
  if (slideIndex === -1) {
    return NextResponse.json({ error: "Diapositiva inválida para el capítulo indicado" }, { status: 400 });
  }

  // Obtener progreso actual
  const { data: progressRows } = await supabaseServer
    .from("course_slide_progress")
    .select("slide_id, chapter_id")
    .eq("assignment_id", assignmentId);

  const completedSlideIds = new Set((progressRows ?? []).map((p) => p.slide_id));

  // Idempotente: si ya está completa, ok
  if (completedSlideIds.has(slideId)) {
    return NextResponse.json({ ok: true, already_completed: true });
  }

  // Validar que todos los capítulos anteriores están completamente terminados
  for (let ci = 0; ci < chapterIndex; ci++) {
    const prevChapter = chapters[ci];
    const allDone = prevChapter.slides.every((s) => completedSlideIds.has(s.id));
    if (!allDone) {
      return NextResponse.json(
        { error: `El capítulo "${prevChapter.id}" no está completado` },
        { status: 400 },
      );
    }
  }

  // Validar que la diapositiva anterior en el mismo capítulo ya fue completada
  if (slideIndex > 0) {
    const prevSlideId = chapter.slides[slideIndex - 1].id;
    if (!completedSlideIds.has(prevSlideId)) {
      return NextResponse.json(
        { error: "Debés completar la diapositiva anterior primero" },
        { status: 400 },
      );
    }
  }

  // Validar quiz si corresponde
  const quizBlock = chapter.slides[slideIndex].blocks.find((b) => b.type === "quiz");
  if (quizBlock) {
    const questions = (quizBlock as { questions: Array<{ id: string }> }).questions;
    if (!quiz_answers) {
      return NextResponse.json({ error: "Debés responder el quiz" }, { status: 400 });
    }
    const unanswered = questions.filter((q) => !quiz_answers[q.id]);
    if (unanswered.length > 0) {
      return NextResponse.json(
        { error: "Debés responder todas las preguntas del quiz" },
        { status: 400 },
      );
    }
  }

  // Insertar progreso
  const { error: insertError } = await supabaseServer
    .from("course_slide_progress")
    .insert({
      assignment_id: assignmentId,
      chapter_id,
      slide_id: slideId,
      quiz_answers: quiz_answers ?? null,
    });

  if (insertError) {
    // Puede ser un duplicate (race condition) — lo tratamos como ok
    if (insertError.code === "23505") {
      return NextResponse.json({ ok: true, already_completed: true });
    }
    console.error("POST slide complete:", insertError);
    return NextResponse.json({ error: "Error al registrar progreso" }, { status: 500 });
  }

  await logActivity({
    assignment_id: assignmentId,
    event_type: quizBlock ? "quiz_submitted" : "slide_completed",
    chapter_id,
    slide_id: slideId,
  });

  return NextResponse.json({ ok: true });
}
