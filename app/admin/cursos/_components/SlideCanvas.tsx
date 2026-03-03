"use client";

import { useRef, useState } from "react";
import { type Slide, type Block, type BlockType, makeBlock } from "../_types";
import { HeadingBlockEditor } from "./blocks/HeadingBlock";
import { ParagraphBlockEditor } from "./blocks/ParagraphBlock";
import { ImageBlockEditor } from "./blocks/ImageBlock";
import { CardsBlockEditor } from "./blocks/CardsBlock";
import { CalloutBlockEditor } from "./blocks/CalloutBlock";
import { DividerBlockEditor } from "./blocks/DividerBlock";
import { QuizBlockEditor } from "./blocks/QuizBlock";
import { BlockPalette } from "./BlockPalette";

interface SlideCanvasProps {
  slide: Slide;
  chapterTitle: string;
  onChange: (slide: Slide) => void;
}

export function SlideCanvas({ slide, chapterTitle, onChange }: SlideCanvasProps) {
  const coverFileRef = useRef<HTMLInputElement>(null);

  // ── Drag & Drop state ─────────────────────────────────────
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  // Flag: only allow drag when initiated from the grip handle
  const canDragRef = useRef(false);

  // ── Block mutations ───────────────────────────────────────

  function updateBlock(blockId: string, updated: Block) {
    onChange({ ...slide, blocks: slide.blocks.map((b) => (b.id === blockId ? updated : b)) });
  }

  function deleteBlock(blockId: string) {
    onChange({ ...slide, blocks: slide.blocks.filter((b) => b.id !== blockId) });
  }

  function addBlock(type: BlockType) {
    onChange({ ...slide, blocks: [...slide.blocks, makeBlock(type)] });
  }

  // ── Drag & Drop handlers ──────────────────────────────────

  function handleDragStart(e: React.DragEvent, idx: number) {
    if (!canDragRef.current) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
    setDragIndex(idx);
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    if (dragIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    // Determinar si soltamos arriba o abajo del bloque según posición del cursor
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const newDropIndex = e.clientY < midY ? idx : idx + 1;
    if (newDropIndex !== dropIndex) setDropIndex(newDropIndex);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (dragIndex === null || dropIndex === null) return;

    const from = dragIndex;
    const to = dropIndex;

    // No-op: mismo lugar
    if (to === from || to === from + 1) {
      reset();
      return;
    }

    const blocks = [...slide.blocks];
    const [item] = blocks.splice(from, 1);
    const insertAt = to > from ? to - 1 : to;
    blocks.splice(insertAt, 0, item);
    onChange({ ...slide, blocks });
    reset();
  }

  function handleDragEnd() {
    reset();
  }

  function reset() {
    setDragIndex(null);
    setDropIndex(null);
    canDragRef.current = false;
  }

  // ── Cover image ────────────────────────────────────────────

  function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ ...slide, coverImageUrl: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  }

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="flex gap-0 flex-1 overflow-hidden min-w-0">
      {/* ── Canvas ── */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">

          {/* Chapter + slide header */}
          <div className="mb-5 space-y-1">
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {chapterTitle}
            </p>
            <div className="flex items-start gap-2">
              <input
                type="text"
                value={slide.title}
                onChange={(e) => onChange({ ...slide, title: e.target.value })}
                className="flex-1 min-w-0 text-lg font-bold text-slate-800 bg-transparent outline-none border-b border-transparent hover:border-slate-200 focus:border-slate-400 pb-0.5 transition-colors"
                style={{ fontFamily: "var(--font-rhymes)" }}
                placeholder="Título de la diapositiva..."
              />
              <button
                onClick={() => slide.coverImageUrl ? onChange({ ...slide, coverImageUrl: "" }) : coverFileRef.current?.click()}
                title={slide.coverImageUrl ? "Quitar imagen de portada" : "Agregar imagen de portada"}
                className={`shrink-0 flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-semibold transition-colors
                  ${slide.coverImageUrl
                    ? "border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100"
                    : "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                  }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                </svg>
                {slide.coverImageUrl ? "Portada ✓" : "Portada"}
              </button>
              <input ref={coverFileRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </div>

            {slide.coverImageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.coverImageUrl} alt="Portada de diapositiva" className="w-full h-36 object-cover" />
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 mb-3" />

          {/* Blocks list */}
          {slide.blocks.length === 0 ? (
            <EmptyCanvas onAddBlock={addBlock} />
          ) : (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {slide.blocks.map((block, idx) => (
                <div key={block.id}>
                  {/* Drop indicator ANTES del bloque */}
                  <DropIndicator active={dropIndex === idx && dragIndex !== null && dragIndex !== idx} />

                  {/* Block row */}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`group/item relative flex items-start gap-1 transition-opacity
                      ${dragIndex === idx ? "opacity-40" : "opacity-100"}`}
                  >
                    {/* ── Grip handle ── */}
                    <div
                      className="shrink-0 w-5 flex flex-col items-center gap-0.5 pt-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity"
                      onMouseDown={() => { canDragRef.current = true; }}
                      onMouseUp={() => { canDragRef.current = false; }}
                      onMouseLeave={() => { canDragRef.current = false; }}
                      title="Arrastrar para reordenar"
                    >
                      <GripIcon />
                    </div>

                    {/* ── Block editor ── */}
                    <div className="flex-1 min-w-0">
                      <BlockEditor
                        block={block}
                        onChange={(b) => updateBlock(block.id, b)}
                        onDelete={() => deleteBlock(block.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Drop indicator DESPUÉS del último bloque */}
              <DropIndicator
                active={
                  dropIndex === slide.blocks.length &&
                  dragIndex !== null &&
                  dragIndex !== slide.blocks.length - 1
                }
              />

              {/* Add block row */}
              <div className="group/add flex items-center gap-2 py-2 opacity-0 hover:opacity-100 transition-opacity mt-1">
                <div className="flex-1 h-px bg-slate-100" />
                <button
                  onClick={() => addBlock("paragraph")}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 px-2 transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar bloque
                </button>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right palette ── */}
      <div className="w-52 shrink-0 border-l border-slate-200 bg-slate-50 overflow-y-auto">
        <div className="p-3">
          <BlockPalette onAddBlock={addBlock} />
        </div>
      </div>
    </div>
  );
}

// ── Drop indicator line ───────────────────────────────────────

function DropIndicator({ active }: { active: boolean }) {
  return (
    <div
      className={`relative h-2 my-0.5 transition-all duration-150 ${active ? "h-4" : ""}`}
    >
      {active && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {/* Circle */}
          <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
          {/* Line */}
          <div className="flex-1 h-0.5 bg-indigo-400 rounded-full" />
        </div>
      )}
    </div>
  );
}

// ── Grip icon ─────────────────────────────────────────────────

function GripIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-slate-300 cursor-grab active:cursor-grabbing"
      viewBox="0 0 10 16"
      fill="currentColor"
    >
      {/* 6 dots (2 cols × 3 rows) */}
      <circle cx="2.5" cy="2.5" r="1.5" />
      <circle cx="7.5" cy="2.5" r="1.5" />
      <circle cx="2.5" cy="8"   r="1.5" />
      <circle cx="7.5" cy="8"   r="1.5" />
      <circle cx="2.5" cy="13.5" r="1.5" />
      <circle cx="7.5" cy="13.5" r="1.5" />
    </svg>
  );
}

// ── Block router ──────────────────────────────────────────────

function BlockEditor({
  block,
  onChange,
  onDelete,
}: {
  block: Block;
  onChange: (b: Block) => void;
  onDelete: () => void;
}) {
  switch (block.type) {
    case "heading":
      return <HeadingBlockEditor block={block} onChange={onChange as (b: typeof block) => void} onDelete={onDelete} />;
    case "paragraph":
      return <ParagraphBlockEditor block={block} onChange={onChange as (b: typeof block) => void} onDelete={onDelete} />;
    case "image":
      return <ImageBlockEditor block={block} onChange={onChange as (b: typeof block) => void} onDelete={onDelete} />;
    case "cards":
      return <CardsBlockEditor block={block} onChange={onChange as (b: typeof block) => void} onDelete={onDelete} />;
    case "callout":
      return <CalloutBlockEditor block={block} onChange={onChange as (b: typeof block) => void} onDelete={onDelete} />;
    case "divider":
      return <DividerBlockEditor block={block} onChange={onChange as (b: typeof block) => void} onDelete={onDelete} />;
    case "quiz":
      return <QuizBlockEditor block={block} onChange={onChange as (b: typeof block) => void} onDelete={onDelete} />;
  }
}

// ── Empty canvas ──────────────────────────────────────────────

function EmptyCanvas({ onAddBlock }: { onAddBlock: (t: BlockType) => void }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 py-14 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
        Usá el panel de la derecha para agregar bloques.
      </p>
      <div className="flex items-center justify-center gap-2">
        <button onClick={() => onAddBlock("heading")} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>+ Título</button>
        <button onClick={() => onAddBlock("paragraph")} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>+ Párrafo</button>
        <button onClick={() => onAddBlock("image")} className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-600 hover:bg-sky-100 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>+ Imagen</button>
        <button onClick={() => onAddBlock("quiz")} className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-600 hover:bg-violet-100 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>+ Quiz</button>
      </div>
    </div>
  );
}
