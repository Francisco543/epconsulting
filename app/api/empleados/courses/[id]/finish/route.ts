import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { resolveEmployeeCtx, resolveAssignment, logActivity } from "../../_auth";
import { generateCertificatePDF } from "@/app/lib/generateCertificate";

type QuizQuestion = {
  id: string;
  options: Array<{ id: string; correct: boolean }>;
};
type CourseContent = {
  chapters: Array<{
    id: string;
    slides: Array<{
      id: string;
      blocks: Array<{ type: string; questions?: QuizQuestion[] }>;
    }>;
  }>;
};

// ─────────────────────────────────────────────────────────────
// POST /api/empleados/courses/[id]/finish
// Valida que todas las slides estén completadas, calcula el
// score server-side, genera el certificado PDF si aprueba.
// ─────────────────────────────────────────────────────────────
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: assignmentId } = await params;

  const ctx = await resolveEmployeeCtx(request.headers.get("Authorization"));
  if (!ctx) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const assignment = await resolveAssignment(assignmentId, ctx.employeeId);
  if (!assignment) return NextResponse.json({ error: "Asignación no encontrada" }, { status: 404 });

  if (assignment.status === "completed") {
    return NextResponse.json({
      ok: true,
      already_completed: true,
      score: assignment.score,
      certificate_url: assignment.certificate_url,
    });
  }
  if (assignment.status !== "in_progress") {
    return NextResponse.json({ error: "El curso no está iniciado" }, { status: 400 });
  }

  // Cargar curso completo (con correct: true — solo server-side)
  const { data: courseRow } = await supabaseServer
    .from("courses")
    .select("content, passing_score, title, signature_url")
    .eq("id", assignment.course_id)
    .single();

  if (!courseRow) return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });

  const content = courseRow.content as CourseContent;
  const chapters = content.chapters;

  // Obtener todo el progreso registrado
  const { data: progressRows } = await supabaseServer
    .from("course_slide_progress")
    .select("slide_id, quiz_answers")
    .eq("assignment_id", assignmentId);

  const progressMap = new Map(
    (progressRows ?? []).map((p) => [p.slide_id, p.quiz_answers as Record<string, string> | null]),
  );

  // Validar que TODAS las slides estén completadas
  const allSlides = chapters.flatMap((ch) => ch.slides);
  const missing = allSlides.filter((s) => !progressMap.has(s.id));
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Todavía hay ${missing.length} diapositiva(s) sin completar` },
      { status: 400 },
    );
  }

  // Calcular score server-side
  let totalQuestions = 0;
  let correctAnswers = 0;

  for (const chapter of chapters) {
    for (const slide of chapter.slides) {
      const quizBlock = slide.blocks.find((b) => b.type === "quiz");
      if (!quizBlock) continue;

      const questions = (quizBlock as { questions: QuizQuestion[] }).questions;
      const answers = progressMap.get(slide.id) ?? {};

      for (const question of questions) {
        totalQuestions++;
        const selectedOptionId = answers[question.id];
        const correctOption = question.options.find((o) => o.correct);
        if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
          correctAnswers++;
        }
      }
    }
  }

  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;
  const passed = score >= courseRow.passing_score;
  const now = new Date().toISOString();

  // Datos del empleado para el certificado
  const { data: employee } = await supabaseServer
    .from("employees")
    .select("full_name, clients(company_name)")
    .eq("id", ctx.employeeId)
    .single();

  const employeeName = (employee as unknown as { full_name: string } | null)?.full_name ?? "Empleado";
  const companyName =
    (employee?.clients as unknown as { company_name: string } | null)?.company_name ?? "";

  let certificateUrl: string | null = null;

  if (passed) {
    try {
      // Obtener imagen de firma si existe
      let signatureImageUrl: string | undefined;
      if (courseRow.signature_url) {
        // Generar URL firmada temporal para incrustar en el PDF
        const { data: signedData } = await supabaseServer.storage
          .from("course-signatures")
          .createSignedUrl(
            courseRow.signature_url.replace(/.*\/course-signatures\//, ""),
            300, // 5 minutos, suficiente para generar el PDF
          );
        if (signedData?.signedUrl) {
          signatureImageUrl = signedData.signedUrl;
        }
      }

      const pdfBuffer = await generateCertificatePDF({
        assignmentId,
        employeeName,
        courseTitle: courseRow.title as string,
        companyName,
        completedAt: now,
        score,
        passingScore: courseRow.passing_score as number,
        signatureImageUrl,
      });

      const filePath = `${assignmentId}/certificate.pdf`;

      await supabaseServer.storage
        .from("certificates")
        .upload(filePath, pdfBuffer, {
          contentType: "application/pdf",
          upsert: true,
        });

      // Signed URL de larga duración (10 años)
      const { data: signedData } = await supabaseServer.storage
        .from("certificates")
        .createSignedUrl(filePath, 60 * 60 * 24 * 365 * 10);

      certificateUrl = signedData?.signedUrl ?? null;

      await logActivity({
        assignment_id: assignmentId,
        event_type: "certificate_generated",
        metadata: { score, certificate_path: filePath },
      });
    } catch (certErr) {
      console.error("Error generating certificate:", certErr);
      // No bloqueamos la finalización del curso si el PDF falla
    }
  }

  // Actualizar la asignación
  const { error: updateError } = await supabaseServer
    .from("employee_course_assignments")
    .update({
      status: "completed",
      completed_at: now,
      score,
      certificate_url: certificateUrl,
    })
    .eq("id", assignmentId);

  if (updateError) {
    console.error("POST /finish update:", updateError);
    return NextResponse.json({ error: "Error al finalizar el curso" }, { status: 500 });
  }

  await logActivity({
    assignment_id: assignmentId,
    event_type: "course_finished",
    metadata: { score, passed, total_questions: totalQuestions, correct_answers: correctAnswers },
  });

  return NextResponse.json({
    ok: true,
    score,
    passed,
    passing_score: courseRow.passing_score,
    certificate_url: certificateUrl,
  });
}
