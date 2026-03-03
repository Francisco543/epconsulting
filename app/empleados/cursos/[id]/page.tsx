"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";
import Logo from "@/app/components/layout/Logo";
import { BlockView, type Block, type QuizQuestion } from "../_components/BlockView";

// ─────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────
type Slide = { id: string; title: string; coverImageUrl: string; blocks: Block[] };
type Chapter = { id: string; title: string; description: string; slides: Slide[] };
type CourseData = {
  id: string;
  title: string;
  description: string;
  category: string;
  estimated_minutes: number;
  passing_score: number;
  content: { chapters: Chapter[] };
};
type AssignmentData = {
  id: string;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  score: number | null;
  certificate_url: string | null;
};
type PlayerData = {
  assignment: AssignmentData;
  course: CourseData;
  completed_slide_ids: string[];
  employee_name: string;
};

type PlayerScreen =
  | "loading"
  | "error"
  | "intro"
  | "playing"
  | "chapter_checkpoint"
  | "finished";

// ─────────────────────────────────────────────────────────────
// Helpers de fetch
// ─────────────────────────────────────────────────────────────
async function apiCall(url: string, token: string, opts?: RequestInit) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(opts?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? "Error de red");
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────
// Página principal del player
// ─────────────────────────────────────────────────────────────
export default function CoursePlayerPage() {
  const { id: assignmentId } = useParams<{ id: string }>();
  const router = useRouter();

  const [screen, setScreen] = useState<PlayerScreen>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Estado de progreso local (se sincroniza con el servidor)
  const [completedSlideIds, setCompletedSlideIds] = useState<Set<string>>(new Set());

  // Posición actual en el curso
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Control de "siguiente" habilitado
  const [canAdvance, setCanAdvance] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  // Para el checkpoint de capítulo
  const [nextChapterTitle, setNextChapterTitle] = useState("");

  // Resultado final
  const [finishResult, setFinishResult] = useState<{
    score: number;
    passed: boolean;
    passing_score: number;
    certificate_url: string | null;
  } | null>(null);

  // Notificación de errores no bloqueantes
  const [toastError, setToastError] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastError(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastError(null), 5000);
  };

  // ─── Init ────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/empleados/login"); return; }

      const { data: profile } = await supabase
        .from("profiles").select("role").eq("id", session.user.id).single();
      if (!profile || profile.role !== "empleado") {
        await supabase.auth.signOut();
        router.replace("/empleados/login");
        return;
      }

      setToken(session.access_token);

      try {
        const data = await apiCall(
          `/api/empleados/courses/${assignmentId}/player`,
          session.access_token,
        ) as PlayerData;

        setPlayerData(data);
        setCompletedSlideIds(new Set(data.completed_slide_ids));

        // Si ya estaba completado, ir directo a la pantalla final
        if (data.assignment.status === "completed") {
          setFinishResult({
            score: data.assignment.score ?? 0,
            passed: (data.assignment.score ?? 0) >= data.course.passing_score,
            passing_score: data.course.passing_score,
            certificate_url: data.assignment.certificate_url,
          });
          setScreen("finished");
          return;
        }

        // Calcular posición de reanudación
        const { chIdx, slIdx } = findResumePosition(data.course.content.chapters, new Set(data.completed_slide_ids));
        setCurrentChapterIndex(chIdx);
        setCurrentSlideIndex(slIdx);

        setScreen(data.assignment.status === "pending" ? "intro" : "playing");
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Error al cargar el curso");
        setScreen("error");
      }
    };
    void init();
  }, [assignmentId, router]);

  // ─── Calcular canAdvance cuando cambia la slide ───────────────
  const currentSlide = playerData?.course.content.chapters[currentChapterIndex]?.slides[currentSlideIndex];

  useEffect(() => {
    if (!currentSlide) return;
    // Si la slide ya fue completada en el servidor, puede avanzar directamente
    if (completedSlideIds.has(currentSlide.id)) {
      setCanAdvance(true);
      return;
    }
    // Slides sin cards ni quiz: se habilita al entrar
    const hasCards = currentSlide.blocks.some((b) => b.type === "cards");
    const hasQuiz  = currentSlide.blocks.some((b) => b.type === "quiz");
    if (!hasCards && !hasQuiz) {
      setCanAdvance(true);
    } else {
      setCanAdvance(false);
    }
  }, [currentSlide, completedSlideIds]);

  // ─── Handlers ────────────────────────────────────────────────

  const handleStart = useCallback(async () => {
    if (!token) return;
    try {
      await apiCall(`/api/empleados/courses/${assignmentId}/start`, token, { method: "POST" });
      setScreen("playing");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Error al iniciar");
    }
  }, [assignmentId, token]);

  /** Llamado cuando todas las cards de una slide fueron flippeadas */
  const handleAllCardsFlipped = useCallback(() => {
    if (!currentSlide) return;
    const hasQuiz = currentSlide.blocks.some((b) => b.type === "quiz");
    if (!hasQuiz) setCanAdvance(true);
  }, [currentSlide]);

  /** Llamado cuando el quiz fue enviado al servidor */
  const handleQuizSubmit = useCallback(async (answers: Record<string, string>) => {
    if (!token || !currentSlide || !playerData) throw new Error("Estado inválido");

    const chapter = playerData.course.content.chapters[currentChapterIndex];
    await apiCall(
      `/api/empleados/courses/${assignmentId}/slides/${currentSlide.id}/complete`,
      token,
      {
        method: "POST",
        body: JSON.stringify({ chapter_id: chapter.id, quiz_answers: answers }),
      },
    );
    setCompletedSlideIds((prev) => new Set(prev).add(currentSlide.id));
    setCanAdvance(true);
  }, [token, currentSlide, playerData, currentChapterIndex, assignmentId]);

  /** Avanzar: completa la slide actual (si no tiene quiz) y va a la siguiente */
  const handleNext = useCallback(async () => {
    if (!token || !playerData || !currentSlide || advancing) return;
    const chapters = playerData.course.content.chapters;
    const chapter = chapters[currentChapterIndex];

    setAdvancing(true);
    try {
      // Marcar slide como completa (si no es quiz — los quiz se marcan en handleQuizSubmit)
      const hasQuiz = currentSlide.blocks.some((b) => b.type === "quiz");
      if (!hasQuiz && !completedSlideIds.has(currentSlide.id)) {
        await apiCall(
          `/api/empleados/courses/${assignmentId}/slides/${currentSlide.id}/complete`,
          token,
          { method: "POST", body: JSON.stringify({ chapter_id: chapter.id }) },
        );
        setCompletedSlideIds((prev) => new Set(prev).add(currentSlide.id));
      }

      const isLastSlideOfChapter = currentSlideIndex === chapter.slides.length - 1;
      const isLastChapter = currentChapterIndex === chapters.length - 1;

      if (isLastSlideOfChapter && isLastChapter) {
        // Fin del curso
        const result = await apiCall(
          `/api/empleados/courses/${assignmentId}/finish`,
          token,
          { method: "POST" },
        ) as { score: number; passed: boolean; passing_score: number; certificate_url: string | null };
        setFinishResult(result);
        setScreen("finished");
      } else if (isLastSlideOfChapter) {
        // Checkpoint de capítulo
        setNextChapterTitle(chapters[currentChapterIndex + 1].title);
        setScreen("chapter_checkpoint");
      } else {
        // Siguiente slide del mismo capítulo
        setCurrentSlideIndex((i) => i + 1);
        setCanAdvance(false);
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Error al avanzar");
    } finally {
      setAdvancing(false);
    }
  }, [token, playerData, currentSlide, advancing, currentChapterIndex, currentSlideIndex, completedSlideIds, assignmentId]);

  const handleContinueToNextChapter = () => {
    setCurrentChapterIndex((i) => i + 1);
    setCurrentSlideIndex(0);
    setCanAdvance(false);
    setScreen("playing");
  };

  // ─── Renders por pantalla ─────────────────────────────────────

  if (screen === "loading") return <LoadingScreen />;
  if (screen === "error")   return <ErrorScreen message={errorMsg} />;
  if (!playerData)          return <LoadingScreen />;

  const { course, employee_name } = playerData;
  const chapters = course.content.chapters;
  const totalSlides = chapters.reduce((acc, ch) => acc + ch.slides.length, 0);
  const completedCount = completedSlideIds.size;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Logo href="/empleados" />
          <span className="hidden sm:block text-xs text-slate-400 border-l border-slate-200 pl-3 max-w-xs truncate" style={{ fontFamily: "var(--font-inter)" }}>
            {course.title}
          </span>
        </div>
        {screen === "playing" && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>
              {completedCount}/{totalSlides} diapos
            </span>
            <div className="w-32 h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-500"
                style={{ width: `${totalSlides > 0 ? (completedCount / totalSlides) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
        <Link
          href="/empleados"
          className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ← Mis cursos
        </Link>
      </header>

      {/* Toast de error */}
      {toastError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg" style={{ fontFamily: "var(--font-inter)" }}>
          {toastError}
        </div>
      )}

      {screen === "intro" && (
        <IntroScreen course={course} onStart={handleStart} />
      )}

      {screen === "playing" && currentSlide && (
        <PlayingScreen
          chapters={chapters}
          currentChapterIndex={currentChapterIndex}
          currentSlideIndex={currentSlideIndex}
          currentSlide={currentSlide}
          completedSlideIds={completedSlideIds}
          canAdvance={canAdvance}
          advancing={advancing}
          onNext={handleNext}
          onAllCardsFlipped={handleAllCardsFlipped}
          onQuizSubmit={handleQuizSubmit}
          onNavigate={(chIdx, slIdx) => {
            // Solo permite navegar a slides completadas o la actual
            const targetSlide = chapters[chIdx]?.slides[slIdx];
            if (!targetSlide) return;
            const isAccessible =
              completedSlideIds.has(targetSlide.id) ||
              (chIdx === currentChapterIndex && slIdx === currentSlideIndex);
            if (!isAccessible) return;
            setCurrentChapterIndex(chIdx);
            setCurrentSlideIndex(slIdx);
          }}
        />
      )}

      {screen === "chapter_checkpoint" && (
        <ChapterCheckpointScreen
          completedChapterTitle={chapters[currentChapterIndex].title}
          nextChapterTitle={nextChapterTitle}
          onContinue={handleContinueToNextChapter}
        />
      )}

      {screen === "finished" && finishResult && (
        <FinishedScreen
          result={finishResult}
          courseName={course.title}
          employeeName={employee_name}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pantalla: Intro
// ─────────────────────────────────────────────────────────────
function IntroScreen({
  course,
  onStart,
}: {
  course: CourseData;
  onStart: () => void;
}) {
  const chapters = course.content.chapters;
  const totalSlides = chapters.reduce((a, c) => a + c.slides.length, 0);

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg space-y-8">
        {/* Badge categoría */}
        {course.category && (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600" style={{ fontFamily: "var(--font-inter)" }}>
            {course.category}
          </span>
        )}

        <div>
          <h1 className="text-3xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-rhymes)" }}>
            {course.title}
          </h1>
          <p className="text-slate-500 mt-3 leading-relaxed text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            {course.description}
          </p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "📚", label: "Capítulos", value: chapters.length },
            { icon: "🕒", label: "Duración", value: `${course.estimated_minutes} min` },
            { icon: "🎯", label: "Nota mínima", value: `${course.passing_score}%` },
          ].map(({ icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>{value}</p>
              <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Índice de capítulos */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
              Contenido del curso — {totalSlides} diapositivas
            </p>
          </div>
          {chapters.map((ch, i) => (
            <div key={ch.id} className="px-5 py-3 border-b border-slate-100 last:border-b-0 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-[10px] font-bold">{i + 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800" style={{ fontFamily: "var(--font-inter)" }}>{ch.title}</p>
                <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>{ch.slides.length} diapositiva{ch.slides.length !== 1 ? "s" : ""}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instrucciones */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 space-y-2">
          <p className="text-sm font-semibold text-amber-800" style={{ fontFamily: "var(--font-inter)" }}>Antes de empezar</p>
          <ul className="space-y-1 text-xs text-amber-700" style={{ fontFamily: "var(--font-inter)" }}>
            <li>• Debés completar cada diapositiva antes de avanzar a la siguiente.</li>
            <li>• Las cards tienen información extra: flippeálas todas para continuar.</li>
            <li>• Los capítulos son checkpoints: no podés saltarte ninguno.</li>
            <li>• El quiz es evaluado automáticamente al enviarlo.</li>
            <li>• Al alcanzar la nota mínima se genera tu certificado automáticamente.</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="w-full rounded-xl bg-slate-900 px-6 py-4 text-base font-semibold text-white hover:bg-slate-700 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Comenzar curso →
        </button>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// Pantalla: Playing
// ─────────────────────────────────────────────────────────────
function PlayingScreen({
  chapters,
  currentChapterIndex,
  currentSlideIndex,
  currentSlide,
  completedSlideIds,
  canAdvance,
  advancing,
  onNext,
  onAllCardsFlipped,
  onQuizSubmit,
  onNavigate,
}: {
  chapters: Chapter[];
  currentChapterIndex: number;
  currentSlideIndex: number;
  currentSlide: Slide;
  completedSlideIds: Set<string>;
  canAdvance: boolean;
  advancing: boolean;
  onNext: () => void;
  onAllCardsFlipped: () => void;
  onQuizSubmit: (answers: Record<string, string>) => Promise<void>;
  onNavigate: (chIdx: number, slIdx: number) => void;
}) {
  const chapter = chapters[currentChapterIndex];
  const isLastSlideOfLastChapter =
    currentChapterIndex === chapters.length - 1 &&
    currentSlideIndex === chapter.slides.length - 1;

  const hasQuiz = currentSlide.blocks.some((b) => b.type === "quiz");
  const alreadyCompleted = completedSlideIds.has(currentSlide.id);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white overflow-y-auto">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
            Contenido
          </p>
        </div>
        {chapters.map((ch, ci) => {
          const chapterComplete = ch.slides.every((s) => completedSlideIds.has(s.id));
          const isCurrent = ci === currentChapterIndex;
          // Un capítulo es accesible si todos los anteriores están completos
          const prevComplete = ci === 0 || chapters.slice(0, ci).every((c) =>
            c.slides.every((s) => completedSlideIds.has(s.id))
          );
          const chapterLocked = !prevComplete;

          return (
            <div key={ch.id}>
              <div className={`flex items-center gap-2 px-4 py-2.5 ${isCurrent ? "bg-slate-50" : ""}`}>
                {chapterComplete ? (
                  <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : chapterLocked ? (
                  <svg className="w-3.5 h-3.5 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                )}
                <p className={`text-xs font-semibold truncate ${chapterLocked ? "text-slate-300" : "text-slate-700"}`} style={{ fontFamily: "var(--font-inter)" }}>
                  {ch.title}
                </p>
              </div>
              {ch.slides.map((sl, si) => {
                const done = completedSlideIds.has(sl.id);
                const isCurrentSlide = ci === currentChapterIndex && si === currentSlideIndex;
                const slideLocked = chapterLocked || (!done && !(ci === currentChapterIndex && si === currentSlideIndex));

                return (
                  <button
                    key={sl.id}
                    type="button"
                    disabled={slideLocked}
                    onClick={() => onNavigate(ci, si)}
                    className={`w-full text-left flex items-center gap-2 pl-8 pr-4 py-2 text-xs transition-colors ${
                      isCurrentSlide
                        ? "bg-slate-900 text-white"
                        : done
                        ? "text-slate-600 hover:bg-slate-50"
                        : "text-slate-300 cursor-default"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {done && !isCurrentSlide ? (
                      <svg className="w-3 h-3 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCurrentSlide ? "bg-white" : "bg-slate-300"}`} />
                    )}
                    <span className="truncate">{sl.title}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </aside>

      {/* Canvas principal */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-10 space-y-6 pb-32">
          {/* Header de la slide */}
          <div className="space-y-1">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
              {chapter.title}
            </p>
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-rhymes)" }}>
              {currentSlide.title}
            </h2>
          </div>

          {currentSlide.coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentSlide.coverImageUrl}
              alt=""
              className="w-full rounded-2xl object-cover max-h-48"
            />
          )}

          {/* Bloques */}
          <div className="space-y-5">
            {currentSlide.blocks.map((block) => (
              <BlockView
                key={block.id}
                block={block}
                onAllCardsFlipped={onAllCardsFlipped}
                onQuizSubmit={hasQuiz && !alreadyCompleted ? onQuizSubmit : undefined}
              />
            ))}
          </div>
        </div>

        {/* Barra de navegación inferior fija */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between z-10">
          <div className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
            Cap. {currentChapterIndex + 1} / {chapters.length} · Diapo {currentSlideIndex + 1} / {chapter.slides.length}
          </div>

          {!canAdvance && !alreadyCompleted && (
            <p className="text-xs text-slate-400 hidden sm:block" style={{ fontFamily: "var(--font-inter)" }}>
              {currentSlide.blocks.some((b) => b.type === "cards")
                ? "Flippeá todas las cards para continuar"
                : hasQuiz
                ? "Respondé y enviá el quiz para continuar"
                : ""}
            </p>
          )}

          <button
            type="button"
            disabled={(!canAdvance && !alreadyCompleted) || advancing}
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {advancing ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : null}
            {isLastSlideOfLastChapter ? "Finalizar curso" : "Siguiente →"}
          </button>
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pantalla: Chapter Checkpoint
// ─────────────────────────────────────────────────────────────
function ChapterCheckpointScreen({
  completedChapterTitle,
  nextChapterTitle,
  onContinue,
}: {
  completedChapterTitle: string;
  nextChapterTitle: string;
  onContinue: () => void;
}) {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2" style={{ fontFamily: "var(--font-inter)" }}>
            Capítulo completado
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-rhymes)" }}>
            "{completedChapterTitle}"
          </h2>
          <p className="text-slate-500 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            Excelente progreso. Ya podés continuar con el siguiente capítulo.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1" style={{ fontFamily: "var(--font-inter)" }}>
            Siguiente
          </p>
          <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>
            {nextChapterTitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Continuar →
        </button>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// Pantalla: Finished
// ─────────────────────────────────────────────────────────────
function FinishedScreen({
  result,
  courseName,
  employeeName,
}: {
  result: { score: number; passed: boolean; passing_score: number; certificate_url: string | null };
  courseName: string;
  employeeName: string;
}) {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto ${result.passed ? "bg-green-100" : "bg-amber-100"}`}>
          <span className="text-5xl">{result.passed ? "🏆" : "📚"}</span>
        </div>

        <div>
          <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${result.passed ? "text-green-600" : "text-amber-600"}`} style={{ fontFamily: "var(--font-inter)" }}>
            {result.passed ? "Curso aprobado" : "Curso completado"}
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-rhymes)" }}>
            {result.passed ? `¡Felicitaciones, ${employeeName.split(" ")[0]}!` : "Seguí intentando"}
          </h2>
          <p className="text-slate-500 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            {result.passed
              ? `Completaste el curso "${courseName}" con éxito.`
              : `Completaste el curso pero la nota no alcanzó el mínimo requerido (${result.passing_score}%).`}
          </p>
        </div>

        {/* Score */}
        <div className={`rounded-2xl border p-6 ${result.passed ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
          <p className={`text-5xl font-bold mb-1 ${result.passed ? "text-green-700" : "text-amber-700"}`} style={{ fontFamily: "var(--font-inter)" }}>
            {result.score}%
          </p>
          <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>
            Nota obtenida · Mínimo requerido: {result.passing_score}%
          </p>
        </div>

        {/* Certificado */}
        {result.passed && result.certificate_url && (
          <a
            href={result.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar certificado PDF
          </a>
        )}

        {result.passed && !result.certificate_url && (
          <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
            El certificado está siendo generado, estará disponible en breve.
          </p>
        )}

        <Link
          href="/empleados"
          className="block text-sm text-slate-500 hover:text-slate-800 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ← Volver a Mis cursos
        </Link>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// Pantallas auxiliares
// ─────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Cargando curso...</p>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <p className="text-sm text-red-500" style={{ fontFamily: "var(--font-inter)" }}>{message}</p>
      <Link href="/empleados" className="text-sm text-slate-600 underline" style={{ fontFamily: "var(--font-inter)" }}>
        Volver a Mis cursos
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Calcular posición de reanudación
// ─────────────────────────────────────────────────────────────
function findResumePosition(
  chapters: Chapter[],
  completedIds: Set<string>,
): { chIdx: number; slIdx: number } {
  for (let ci = 0; ci < chapters.length; ci++) {
    for (let si = 0; si < chapters[ci].slides.length; si++) {
      if (!completedIds.has(chapters[ci].slides[si].id)) {
        return { chIdx: ci, slIdx: si };
      }
    }
  }
  // Todo completado
  return { chIdx: chapters.length - 1, slIdx: chapters[chapters.length - 1].slides.length - 1 };
}
