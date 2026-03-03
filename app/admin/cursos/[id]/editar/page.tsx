"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  type Course,
  type Slide,
  type Chapter,
  type CourseStatus,
  type ActiveLocation,
  makeEmptyCourse,
  makeEmptySlide,
  makeQuizSlide,
  makeEmptyChapter,
  findSlide,
  findChapter,
  flatSlideIndex,
  totalSlides,
} from "../../_types";
import { SlidePanel } from "../../_components/SlidePanel";
import { SlideCanvas } from "../../_components/SlideCanvas";
import { CourseEditorProvider } from "../../_components/CourseEditorContext";
import {
  getCourse,
  updateCourse,
  uploadCourseSignature,
  deleteCourseSignature,
} from "@/app/services/courseService";
import { ConfirmModal } from "@/app/admin/_components/ConfirmModal";
import { useRouter } from "next/navigation";

// ── Helpers de mutación ──────────────────────────────────────

function patchChapter(
  course: Course,
  chapterId: string,
  patch: Partial<Chapter>,
): Course {
  return {
    ...course,
    chapters: course.chapters.map((c) =>
      c.id === chapterId ? { ...c, ...patch } : c,
    ),
    updated_at: new Date().toISOString(),
  };
}

function patchSlide(
  course: Course,
  chapterId: string,
  slideId: string,
  patch: Partial<Slide>,
): Course {
  const chapter = findChapter(course, chapterId);
  if (!chapter) return course;
  return patchChapter(course, chapterId, {
    slides: chapter.slides.map((s) =>
      s.id === slideId ? { ...s, ...patch } : s,
    ),
  });
}

// ── Página principal ─────────────────────────────────────────

export default function EditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [active, setActive] = useState<ActiveLocation>({
    chapterId: "",
    slideId: "",
  });
  const [loadError, setLoadError] = useState("");
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [showSettings, setShowSettings] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Cargar curso ──────────────────────────────────────────
  useEffect(() => {
    getCourse(params.id)
      .then((row) => {
        const content = row.content ?? { chapters: [] };
        const loaded: Course = {
          id: row.id,
          title: row.title,
          description: row.description,
          category: row.category,
          passing_score: row.passing_score,
          estimated_minutes: row.estimated_minutes,
          status: row.status as CourseStatus,
          chapters: content.chapters ?? [],
          signature_url: row.signature_url,
          created_at: row.created_at,
          updated_at: row.updated_at,
        };

        // Si viene sin capítulos (creado vacío) añadir uno por defecto
        if (loaded.chapters.length === 0) {
          const empty = makeEmptyCourse();
          loaded.chapters = empty.chapters;
        }

        setCourse(loaded);
        const firstChapter = loaded.chapters[0];
        setActive({
          chapterId: firstChapter.id,
          slideId: firstChapter.slides[0]?.id ?? "",
        });
      })
      .catch((e) => setLoadError(e.message));
  }, [params.id]);

  // ── Auto-save debounced ───────────────────────────────────
  const autosave = useCallback((updated: Course) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSaveState("saving");
    debounceRef.current = setTimeout(async () => {
      try {
        await updateCourse(updated.id, {
          title: updated.title,
          description: updated.description,
          category: updated.category,
          passing_score: updated.passing_score,
          estimated_minutes: updated.estimated_minutes,
          status: updated.status,
          content: { chapters: updated.chapters },
        });
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2500);
      } catch {
        setSaveState("error");
      }
    }, 1200);
  }, []);

  function setCourse_(updated: Course) {
    setCourse(updated);
    autosave(updated);
  }

  // ── Slide mutations ───────────────────────────────────────

  function handleSlideChange(slide: Slide) {
    if (!course) return;
    setCourse_(patchSlide(course, active.chapterId, active.slideId, slide));
  }

  function handleAddSlide(chapterId: string, type: "content" | "quiz") {
    if (!course) return;
    const chapter = findChapter(course, chapterId);
    if (!chapter) return;
    const newSlide = type === "quiz" ? makeQuizSlide() : makeEmptySlide();
    setCourse_(
      patchChapter(course, chapterId, {
        slides: [...chapter.slides, newSlide],
      }),
    );
    setActive({ chapterId, slideId: newSlide.id });
  }

  function handleDeleteSlide(chapterId: string, slideId: string) {
    if (!course) return;
    const chapter = findChapter(course, chapterId);
    if (!chapter || chapter.slides.length <= 1) return;
    const slides = chapter.slides.filter((s) => s.id !== slideId);
    setCourse_(patchChapter(course, chapterId, { slides }));
    if (active.slideId === slideId)
      setActive({ chapterId, slideId: slides[0].id });
  }

  function handleMoveSlide(
    chapterId: string,
    slideId: string,
    dir: "up" | "down",
  ) {
    if (!course) return;
    const chapter = findChapter(course, chapterId);
    if (!chapter) return;
    const slides = [...chapter.slides];
    const idx = slides.findIndex((s) => s.id === slideId);
    const target = dir === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= slides.length) return;
    [slides[idx], slides[target]] = [slides[target], slides[idx]];
    setCourse_(patchChapter(course, chapterId, { slides }));
  }

  // ── Chapter mutations ─────────────────────────────────────

  function handleAddChapter() {
    if (!course) return;
    const newChapter = makeEmptyChapter(course.chapters.length + 1);
    setCourse_({
      ...course,
      chapters: [...course.chapters, newChapter],
      updated_at: new Date().toISOString(),
    });
    setActive({ chapterId: newChapter.id, slideId: newChapter.slides[0].id });
  }

  function handleDeleteChapter(chapterId: string) {
    if (!course || course.chapters.length <= 1) return;
    const chapters = course.chapters.filter((c) => c.id !== chapterId);
    setCourse_({ ...course, chapters, updated_at: new Date().toISOString() });
    if (active.chapterId === chapterId) {
      setActive({
        chapterId: chapters[0].id,
        slideId: chapters[0].slides[0].id,
      });
    }
  }

  function handleUpdateChapterTitle(chapterId: string, title: string) {
    if (!course) return;
    setCourse_(patchChapter(course, chapterId, { title }));
  }

  function handleMoveChapter(chapterId: string, dir: "up" | "down") {
    if (!course) return;
    const chapters = [...course.chapters];
    const idx = chapters.findIndex((c) => c.id === chapterId);
    const target = dir === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= chapters.length) return;
    [chapters[idx], chapters[target]] = [chapters[target], chapters[idx]];
    setCourse_({ ...course, chapters, updated_at: new Date().toISOString() });
  }

  // ── Navigation ────────────────────────────────────────────

  function navigatePrev() {
    if (!course) return;
    const chapter = findChapter(course, active.chapterId);
    if (!chapter) return;
    const sIdx = chapter.slides.findIndex((s) => s.id === active.slideId);
    if (sIdx > 0) {
      setActive({
        chapterId: active.chapterId,
        slideId: chapter.slides[sIdx - 1].id,
      });
    } else {
      const cIdx = course.chapters.findIndex((c) => c.id === active.chapterId);
      if (cIdx > 0) {
        const prev = course.chapters[cIdx - 1];
        setActive({
          chapterId: prev.id,
          slideId: prev.slides[prev.slides.length - 1].id,
        });
      }
    }
  }

  function navigateNext() {
    if (!course) return;
    const chapter = findChapter(course, active.chapterId);
    if (!chapter) return;
    const sIdx = chapter.slides.findIndex((s) => s.id === active.slideId);
    if (sIdx < chapter.slides.length - 1) {
      setActive({
        chapterId: active.chapterId,
        slideId: chapter.slides[sIdx + 1].id,
      });
    } else {
      const cIdx = course.chapters.findIndex((c) => c.id === active.chapterId);
      if (cIdx < course.chapters.length - 1) {
        const next = course.chapters[cIdx + 1];
        setActive({ chapterId: next.id, slideId: next.slides[0].id });
      }
    }
  }

  // ── Loading / error states ────────────────────────────────

  if (loadError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <p
          className="text-sm text-red-600"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {loadError}
        </p>
        <Link
          href="/admin/cursos"
          className="text-xs text-slate-500 hover:underline"
        >
          ← Volver a cursos
        </Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
      </div>
    );
  }

  const activeSlide = findSlide(course, active.chapterId, active.slideId);
  const activeChapter = findChapter(course, active.chapterId);
  const flatIdx = flatSlideIndex(course, active.chapterId, active.slideId);
  const total = totalSlides(course);

  return (
    <CourseEditorProvider courseId={params.id}>
      <div className="flex flex-col h-screen bg-white overflow-hidden">
        {/* ── Top bar ──────────────────────────────────────────── */}
        <header className="h-12 shrink-0 border-b border-slate-200 bg-white flex items-center gap-3 px-4 shadow-sm z-10">
          <Link
            href="/admin/cursos"
            className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            title="Volver a cursos"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>

          <div className="w-px h-4 bg-slate-200 shrink-0" />

          {/* Course title */}
          <input
            type="text"
            value={course.title}
            onChange={(e) => setCourse_({ ...course, title: e.target.value })}
            className="flex-1 min-w-0 bg-transparent text-sm font-bold text-slate-900 outline-none border-b border-transparent hover:border-slate-300 focus:border-slate-500 pb-0.5 transition-colors"
            style={{ fontFamily: "var(--font-rhymes)" }}
          />

          {activeChapter && (
            <span
              className="text-[11px] text-slate-400 shrink-0 hidden md:block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {activeChapter.title}
            </span>
          )}

          <div className="w-px h-4 bg-slate-200 shrink-0" />

          {/* Status toggle */}
          <StatusToggle
            status={course.status}
            onChange={(s) => setCourse_({ ...course, status: s })}
          />

          <div className="w-px h-4 bg-slate-200 shrink-0" />

          {/* Save indicator */}
          <SaveIndicator state={saveState} />

          {/* Settings gear */}
          <button
            onClick={() => setShowSettings(true)}
            title="Configuración del curso"
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* Publish btn */}
          <button
            onClick={() =>
              setCourse_({
                ...course,
                status: course.status === "published" ? "draft" : "published",
              })
            }
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors
              ${
                course.status === "published"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {course.status === "published" ? (
              <>
                <CheckIcon />
                &nbsp;Publicado
              </>
            ) : (
              <>
                <SendIcon />
                &nbsp;Publicar
              </>
            )}
          </button>
        </header>

        {/* ── Editor body ───────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          <SlidePanel
            chapters={course.chapters}
            active={active}
            onSelect={setActive}
            onAddSlide={handleAddSlide}
            onDeleteSlide={handleDeleteSlide}
            onMoveSlide={handleMoveSlide}
            onAddChapter={handleAddChapter}
            onDeleteChapter={handleDeleteChapter}
            onUpdateChapterTitle={handleUpdateChapterTitle}
            onMoveChapter={handleMoveChapter}
          />

          {activeSlide && activeChapter ? (
            <SlideCanvas
              slide={activeSlide}
              chapterTitle={activeChapter.title}
              onChange={handleSlideChange}
            />
          ) : (
            <div
              className="flex-1 flex items-center justify-center text-slate-400 text-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Seleccioná una diapositiva
            </div>
          )}
        </div>

        {/* ── Bottom nav ────────────────────────────────────────── */}
        <footer className="h-9 shrink-0 border-t border-slate-200 bg-white flex items-center px-4 gap-3">
          <button
            onClick={navigatePrev}
            disabled={flatIdx === 0}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Anterior
          </button>

          <div className="flex-1 flex items-center justify-center gap-3 overflow-hidden">
            {course.chapters.map((ch) => (
              <div key={ch.id} className="flex items-center gap-1">
                <span
                  className="text-[9px] font-bold uppercase text-slate-300 mr-0.5 hidden sm:block"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {ch.title.slice(0, 4)}
                </span>
                {ch.slides.map((sl) => {
                  const isActive =
                    sl.id === active.slideId && ch.id === active.chapterId;
                  const hasQuiz = sl.blocks.some((b) => b.type === "quiz");
                  return (
                    <button
                      key={sl.id}
                      onClick={() =>
                        setActive({ chapterId: ch.id, slideId: sl.id })
                      }
                      title={sl.title}
                      className={`rounded-full transition-all ${
                        isActive
                          ? hasQuiz
                            ? "w-4 h-2 bg-violet-500"
                            : "w-4 h-2 bg-slate-700"
                          : "w-2 h-2 bg-slate-200 hover:bg-slate-400"
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <span
            className="text-[11px] text-slate-400 shrink-0 tabular-nums"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {flatIdx + 1} / {total}
          </span>

          <button
            onClick={navigateNext}
            disabled={flatIdx === total - 1}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Siguiente
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </footer>
      </div>

      {/* ── Settings modal ─────────────────────────────────────── */}
      {showSettings && (
        <CourseSettingsModal
          course={course}
          onClose={() => setShowSettings(false)}
          onUpdateCourse={(patch) => setCourse_({ ...course, ...patch })}
        />
      )}
    </CourseEditorProvider>
  );
}

// ── Settings Modal ────────────────────────────────────────────

function CourseSettingsModal({
  course,
  onClose,
  onUpdateCourse,
}: {
  course: Course;
  onClose: () => void;
  onUpdateCourse: (patch: Partial<Course>) => void;
}) {
  const signatureFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [confirmDeleteSig, setConfirmDeleteSig] = useState(false);

  async function handleSignatureUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadCourseSignature(course.id, file);
      onUpdateCourse({ signature_url: url });
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteSignature() {
    setUploading(true);
    try {
      await deleteCourseSignature(course.id);
      onUpdateCourse({ signature_url: "" });
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setUploading(false);
      setConfirmDeleteSig(false);
    }
  }

  const CATEGORIES = [
    "Prevención de Lavado de Activos (PLA/FT)",
    "Regulación e Integridad (REI)",
    "Actualización UIF",
    "Ética y Conducta",
    "Protección de Datos",
    "Seguridad de la Información",
    "Otro",
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2
            className="text-base font-bold text-slate-900"
            style={{ fontFamily: "var(--font-rhymes)" }}
          >
            Configuración del curso
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Metadata */}
          <section className="space-y-4">
            <h3
              className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Información general
            </h3>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Descripción
              </label>
              <textarea
                rows={3}
                value={course.description}
                onChange={(e) =>
                  onUpdateCourse({ description: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 resize-none outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-300"
                style={{ fontFamily: "var(--font-inter)" }}
                placeholder="Descripción del curso..."
              />
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Categoría
              </label>
              <select
                value={course.category}
                onChange={(e) => onUpdateCourse({ category: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <option value="">Sin categoría</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Duración (min)
                </label>
                <input
                  type="number"
                  min={1}
                  max={480}
                  value={course.estimated_minutes}
                  onChange={(e) =>
                    onUpdateCourse({
                      estimated_minutes: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Nota mínima (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={course.passing_score}
                  onChange={(e) =>
                    onUpdateCourse({ passing_score: Number(e.target.value) })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>
          </section>

          {/* Signature PDF */}
          <section className="space-y-3">
            <div>
              <h3
                className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Firma para certificados
              </h3>
              <p
                className="text-xs text-slate-400 mt-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Subí un PDF con la firma que se usará para generar los
                certificados digitales. El certificado incluirá el nombre del
                curso, del empleado y la fecha de aprobación.
              </p>
            </div>

            {course.signature_url ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold text-green-800"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Firma cargada
                  </p>
                  <p
                    className="text-xs text-green-600 truncate mt-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    signature.pdf
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => signatureFileRef.current?.click()}
                    className="text-xs font-semibold text-green-700 hover:text-green-900 transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Reemplazar
                  </button>
                  <button
                    onClick={() => setConfirmDeleteSig(true)}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signatureFileRef.current?.click()}
                disabled={uploading}
                className="w-full rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 py-8 hover:border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold text-slate-600"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        Subir PDF de firma
                      </p>
                      <p
                        className="text-xs text-slate-400 mt-0.5"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        Solo PDF · máx 5 MB
                      </p>
                    </div>
                  </>
                )}
              </button>
            )}

            <input
              ref={signatureFileRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleSignatureUpload}
            />

            {uploadError && (
              <p
                className="text-xs text-red-500"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {uploadError}
              </p>
            )}

            {/* Certificate preview info */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                El certificado incluirá
              </p>
              {[
                "Nombre del empleado",
                "Nombre del curso",
                "Fecha de aprobación",
                "Puntuación obtenida",
                "Firma (desde el PDF cargado)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-green-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span
                    className="text-xs text-slate-600"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/60">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Confirm delete signature */}
      <ConfirmModal
        isOpen={confirmDeleteSig}
        title="¿Quitar la firma?"
        description="Se eliminará el PDF de firma de este curso. Los certificados ya generados no se verán afectados."
        variant="danger"
        confirmLabel="Sí, quitar"
        loading={uploading}
        onConfirm={handleDeleteSignature}
        onCancel={() => setConfirmDeleteSig(false)}
      />
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────

function StatusToggle({
  status,
  onChange,
}: {
  status: CourseStatus;
  onChange: (s: CourseStatus) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-100 shrink-0">
      {(["draft", "published"] as CourseStatus[]).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
            status === s
              ? s === "published"
                ? "bg-green-600 text-white shadow-sm"
                : "bg-white text-slate-700 shadow-sm"
              : "text-slate-400 hover:text-slate-600"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {s === "draft" ? "Borrador" : "Publicado"}
        </button>
      ))}
    </div>
  );
}

function SaveIndicator({
  state,
}: {
  state: "idle" | "saving" | "saved" | "error";
}) {
  if (state === "idle") return <span className="w-20 shrink-0" />;
  return (
    <span
      className="text-[11px] flex items-center gap-1 shrink-0 w-20"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {state === "saving" && (
        <>
          <span className="w-2.5 h-2.5 border border-slate-300 border-t-slate-500 rounded-full animate-spin" />
          <span className="text-slate-400">Guardando...</span>
        </>
      )}
      {state === "saved" && (
        <>
          <svg
            className="w-3 h-3 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-slate-400">Guardado</span>
        </>
      )}
      {state === "error" && (
        <>
          <svg
            className="w-3 h-3 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="text-red-400">Error</span>
        </>
      )}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}
