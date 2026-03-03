"use client";

import { useState } from "react";
import {
  type Chapter,
  type Slide,
  type ActiveLocation,
  makeEmptySlide,
  makeQuizSlide,
} from "../_types";

interface SlidePanelProps {
  chapters: Chapter[];
  active: ActiveLocation;
  onSelect: (loc: ActiveLocation) => void;
  onAddSlide: (chapterId: string, type: "content" | "quiz") => void;
  onDeleteSlide: (chapterId: string, slideId: string) => void;
  onMoveSlide: (chapterId: string, slideId: string, dir: "up" | "down") => void;
  onAddChapter: () => void;
  onDeleteChapter: (chapterId: string) => void;
  onUpdateChapterTitle: (chapterId: string, title: string) => void;
  onMoveChapter: (chapterId: string, dir: "up" | "down") => void;
}

export function SlidePanel({
  chapters,
  active,
  onSelect,
  onAddSlide,
  onDeleteSlide,
  onMoveSlide,
  onAddChapter,
  onDeleteChapter,
  onUpdateChapterTitle,
  onMoveChapter,
}: SlidePanelProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggleCollapse(chapterId: string) {
    setCollapsed((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  }

  const totalSlides = chapters.reduce((acc, c) => acc + c.slides.length, 0);

  return (
    <div className="w-56 shrink-0 flex flex-col border-r border-slate-200 bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-slate-200 bg-white flex items-center justify-between">
        <span
          className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Capítulos
        </span>
        <span
          className="text-[10px] text-slate-400 tabular-nums"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {chapters.length} cap · {totalSlides} diapos
        </span>
      </div>

      {/* Chapter list */}
      <div className="flex-1 overflow-y-auto py-2 space-y-2 px-2">
        {chapters.map((chapter, chIdx) => (
          <ChapterGroup
            key={chapter.id}
            chapter={chapter}
            chapterIndex={chIdx}
            totalChapters={chapters.length}
            activeSlideId={active.chapterId === chapter.id ? active.slideId : null}
            collapsed={!!collapsed[chapter.id]}
            onToggleCollapse={() => toggleCollapse(chapter.id)}
            onSelectSlide={(slideId) => onSelect({ chapterId: chapter.id, slideId })}
            onAddSlide={(type) => onAddSlide(chapter.id, type)}
            onDeleteSlide={(slideId) => onDeleteSlide(chapter.id, slideId)}
            onMoveSlide={(slideId, dir) => onMoveSlide(chapter.id, slideId, dir)}
            onDelete={() => onDeleteChapter(chapter.id)}
            onUpdateTitle={(t) => onUpdateChapterTitle(chapter.id, t)}
            onMoveChapter={(dir) => onMoveChapter(chapter.id, dir)}
          />
        ))}
      </div>

      {/* Add chapter */}
      <div className="p-2 border-t border-slate-200 bg-white">
        <button
          onClick={onAddChapter}
          className="w-full flex items-center gap-2 rounded-lg border border-dashed border-indigo-200 px-3 py-2 text-xs font-semibold text-indigo-500 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo capítulo
        </button>
      </div>
    </div>
  );
}

// ── Chapter group ────────────────────────────────────────────

function ChapterGroup({
  chapter,
  chapterIndex,
  totalChapters,
  activeSlideId,
  collapsed,
  onToggleCollapse,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
  onMoveSlide,
  onDelete,
  onUpdateTitle,
  onMoveChapter,
}: {
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  activeSlideId: string | null;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onSelectSlide: (slideId: string) => void;
  onAddSlide: (type: "content" | "quiz") => void;
  onDeleteSlide: (slideId: string) => void;
  onMoveSlide: (slideId: string, dir: "up" | "down") => void;
  onDelete: () => void;
  onUpdateTitle: (title: string) => void;
  onMoveChapter: (dir: "up" | "down") => void;
}) {
  const isActiveChapter = activeSlideId !== null;

  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${isActiveChapter ? "border-indigo-200 shadow-sm" : "border-slate-200"}`}>
      {/* Chapter header */}
      <div className={`flex items-center gap-1 px-2 py-1.5 group/ch ${isActiveChapter ? "bg-indigo-50" : "bg-white"}`}>
        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="shrink-0 w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 transition-colors"
        >
          <svg
            className={`w-3 h-3 text-slate-400 transition-transform ${collapsed ? "-rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Chapter number badge */}
        <span
          className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black
            ${isActiveChapter ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {chapterIndex + 1}
        </span>

        {/* Chapter title (inline edit) */}
        <input
          type="text"
          value={chapter.title}
          onChange={(e) => onUpdateTitle(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={`flex-1 min-w-0 text-[11px] font-semibold bg-transparent outline-none truncate border-b border-transparent hover:border-slate-300 focus:border-indigo-400 transition-colors
            ${isActiveChapter ? "text-indigo-700" : "text-slate-700"}`}
          style={{ fontFamily: "var(--font-inter)" }}
        />

        {/* Chapter actions (on hover) */}
        <div className="hidden group-hover/ch:flex items-center gap-0.5 shrink-0">
          {chapterIndex > 0 && (
            <button
              onClick={() => onMoveChapter("up")}
              className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-200"
              title="Subir capítulo"
            >
              <svg className="w-2.5 h-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
          {chapterIndex < totalChapters - 1 && (
            <button
              onClick={() => onMoveChapter("down")}
              className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-200"
              title="Bajar capítulo"
            >
              <svg className="w-2.5 h-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          {totalChapters > 1 && (
            <button
              onClick={onDelete}
              className="w-5 h-5 rounded flex items-center justify-center hover:bg-red-100"
              title="Eliminar capítulo"
            >
              <svg className="w-2.5 h-2.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Slides list */}
      {!collapsed && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-2 py-2 space-y-1">
          {chapter.slides.map((slide, sIdx) => (
            <SlideThumb
              key={slide.id}
              slide={slide}
              slideIndex={sIdx}
              totalSlides={chapter.slides.length}
              active={slide.id === activeSlideId}
              onSelect={() => onSelectSlide(slide.id)}
              onDelete={() => onDeleteSlide(slide.id)}
              onMoveUp={() => onMoveSlide(slide.id, "up")}
              onMoveDown={() => onMoveSlide(slide.id, "down")}
            />
          ))}

          {/* Add slide buttons */}
          <div className="pt-1 flex items-center gap-1">
            <button
              onClick={() => onAddSlide("content")}
              className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 py-1.5 text-[10px] font-semibold text-slate-400 hover:border-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
              title="Agregar diapositiva"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Diapo
            </button>
            <button
              onClick={() => onAddSlide("quiz")}
              className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-dashed border-violet-200 py-1.5 text-[10px] font-semibold text-violet-400 hover:border-violet-400 hover:bg-violet-50 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
              title="Agregar evaluación"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Slide thumbnail ──────────────────────────────────────────

function SlideThumb({
  slide,
  slideIndex,
  totalSlides,
  active,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  slide: Slide;
  slideIndex: number;
  totalSlides: number;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const hasQuiz = slide.blocks.some((b) => b.type === "quiz");

  return (
    <div
      onClick={onSelect}
      className={`group/th relative flex items-center gap-2 rounded-lg border px-2.5 py-2 cursor-pointer transition-all
        ${active
          ? "border-slate-800 bg-slate-900 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
        }`}
    >
      {/* Index */}
      <span
        className={`shrink-0 text-[10px] font-bold tabular-nums w-4 text-center
          ${active ? "text-slate-300" : "text-slate-400"}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {slideIndex + 1}
      </span>

      {/* Slide info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[11px] font-medium truncate leading-tight
            ${active ? "text-white" : "text-slate-700"}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {slide.title || "Sin título"}
        </p>
        <p
          className={`text-[10px] mt-0.5 ${active ? "text-slate-400" : "text-slate-400"}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {slide.blocks.length} {slide.blocks.length === 1 ? "bloque" : "bloques"}
          {hasQuiz && " · "}
          {hasQuiz && <span className={active ? "text-violet-300" : "text-violet-500"}>quiz</span>}
        </p>
      </div>

      {/* Has cover image indicator */}
      {slide.coverImageUrl && (
        <span className={`shrink-0 w-2 h-2 rounded-full ${active ? "bg-sky-300" : "bg-sky-400"}`} title="Tiene imagen de portada" />
      )}

      {/* Slide actions on hover */}
      <div
        className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover/th:flex items-center gap-0.5 bg-white/95 rounded-md px-0.5 shadow-sm border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {slideIndex > 0 && (
          <button onClick={onMoveUp} className="w-4 h-5 flex items-center justify-center hover:bg-slate-100 rounded">
            <svg className="w-2.5 h-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
        {slideIndex < totalSlides - 1 && (
          <button onClick={onMoveDown} className="w-4 h-5 flex items-center justify-center hover:bg-slate-100 rounded">
            <svg className="w-2.5 h-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
        {totalSlides > 1 && (
          <button onClick={onDelete} className="w-4 h-5 flex items-center justify-center hover:bg-red-50 rounded">
            <svg className="w-2.5 h-2.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
