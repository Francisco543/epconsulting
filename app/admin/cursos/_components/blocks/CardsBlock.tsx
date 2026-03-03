"use client";

import { useRef, useState } from "react";
import { type CardsBlock, type CardItem, makeId } from "../../_types";
import { BlockWrapper } from "./HeadingBlock";
import { useCourseEditor } from "../CourseEditorContext";

interface Props {
  block: CardsBlock;
  onChange: (b: CardsBlock) => void;
  onDelete: () => void;
}

const EMOJI_SUGGESTIONS = [
  "✅", "📌", "💡", "⚠️", "🔍", "📊", "🎯", "🔒",
  "📋", "⚖️", "🏆", "🚀", "💼", "🛡️", "📝", "🌐",
];

// ── Editor principal ──────────────────────────────────────────

export function CardsBlockEditor({ block, onChange, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);

  function updateItem(id: string, patch: Partial<CardItem>) {
    onChange({
      ...block,
      items: block.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    });
  }

  function addItem() {
    const newItem: CardItem = {
      id: makeId(),
      emoji: "✨",
      imageUrl: "",
      useImage: false,
      title: "Punto clave",
      description: "Agregá la descripción que se mostrará al dar vuelta la card.",
    };
    onChange({ ...block, items: [...block.items, newItem] });
    setEditingId(newItem.id);
  }

  function removeItem(id: string) {
    onChange({ ...block, items: block.items.filter((it) => it.id !== id) });
    if (editingId === id) setEditingId(null);
  }

  return (
    <BlockWrapper onDelete={onDelete}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
            Columnas
          </span>
          {([2, 3, 4] as const).map((c) => (
            <button
              key={c}
              onClick={() => onChange({ ...block, columns: c })}
              className={`w-7 h-7 rounded-md text-xs font-bold transition-colors
                ${block.columns === c ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {c}
            </button>
          ))}
        </div>
        {/* Flip hint */}
        <span className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-100 rounded-full px-2.5 py-1" style={{ fontFamily: "var(--font-inter)" }}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Las cards se dan vuelta al hacer clic
        </span>
      </div>

      {/* Cards grid */}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${block.columns}, minmax(0, 1fr))` }}
      >
        {block.items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <FlipCard
              item={item}
              isEditing={editingId === item.id}
              canDelete={block.items.length > 1}
              onOpenEdit={() => setEditingId(editingId === item.id ? null : item.id)}
              onDelete={() => removeItem(item.id)}
            />
            {/* Inline edit panel */}
            {editingId === item.id && (
              <CardEditPanel
                item={item}
                onChange={(patch) => updateItem(item.id, patch)}
                onClose={() => setEditingId(null)}
              />
            )}
          </div>
        ))}

        {/* Add card button */}
        <button
          onClick={addItem}
          className="rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 min-h-[200px] hover:border-slate-300 hover:bg-slate-50/60 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-xs font-medium text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Agregar card</p>
        </button>
      </div>
    </BlockWrapper>
  );
}

// ── Flip Card ─────────────────────────────────────────────────
// Frente: imagen/emoji + título + hint
// Dorso: descripción + botón volver

function FlipCard({
  item,
  isEditing,
  canDelete,
  onOpenEdit,
  onDelete,
}: {
  item: CardItem;
  isEditing: boolean;
  canDelete: boolean;
  onOpenEdit: () => void;
  onDelete: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group/fc relative select-none"
      style={{ perspective: "1000px", height: "210px" }}
    >
      {/* Admin controls — top-right */}
      <div
        className="absolute top-2 right-2 z-20 flex gap-1 opacity-0 group-hover/fc:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onOpenEdit}
          title="Editar card"
          className={`w-6 h-6 rounded-md flex items-center justify-center shadow-sm border transition-colors
            ${isEditing
              ? "bg-slate-900 border-slate-900 text-white"
              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828A2 2 0 0110.414 16H8v-2.414a2 2 0 01.586-1.414z" />
          </svg>
        </button>
        {canDelete && (
          <button
            onClick={onDelete}
            title="Eliminar card"
            className="w-6 h-6 rounded-md bg-white border border-red-200 flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
          >
            <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Inner — 3D flip container */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white"
          style={{ backfaceVisibility: "hidden" }}
          onClick={() => setFlipped(true)}
        >
          {/* Image or emoji area (top ~55%) */}
          {item.useImage && item.imageUrl ? (
            <div className="h-[55%] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-[55%] bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
              <span className="text-5xl leading-none select-none drop-shadow-sm">{item.emoji}</span>
            </div>
          )}

          {/* Bottom: title + flip hint */}
          <div className="px-3.5 pt-2.5 pb-2 h-[45%] flex flex-col justify-between">
            <p
              className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.title || "Sin título"}
            </p>
            {/* Flip hint */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
              <svg
                className="w-3 h-3 shrink-0 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Clic para más info</span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl cursor-pointer border border-indigo-200 shadow-md bg-linear-to-br from-slate-900 to-slate-800 flex flex-col justify-between p-4 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          onClick={() => setFlipped(false)}
        >
          {/* Decorative dots */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-white">
              <circle cx="10" cy="10" r="3"/><circle cx="30" cy="10" r="3"/><circle cx="50" cy="10" r="3"/><circle cx="70" cy="10" r="3"/><circle cx="90" cy="10" r="3"/>
              <circle cx="10" cy="30" r="3"/><circle cx="30" cy="30" r="3"/><circle cx="50" cy="30" r="3"/><circle cx="70" cy="30" r="3"/><circle cx="90" cy="30" r="3"/>
              <circle cx="10" cy="50" r="3"/><circle cx="30" cy="50" r="3"/><circle cx="50" cy="50" r="3"/><circle cx="70" cy="50" r="3"/><circle cx="90" cy="50" r="3"/>
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center gap-2 relative z-10">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-indigo-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.title}
            </p>
            <p
              className="text-xs text-slate-200 leading-relaxed line-clamp-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.description || "Sin descripción"}
            </p>
          </div>

          {/* Flip back */}
          <div className="flex justify-end mt-2 relative z-10">
            <span
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
              Volver
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card edit panel ───────────────────────────────────────────

function CardEditPanel({
  item,
  onChange,
  onClose,
}: {
  item: CardItem;
  onChange: (patch: Partial<CardItem>) => void;
  onClose: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useCourseEditor();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadImage(file);
      onChange({ imageUrl: url, useImage: true });
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-3 animate-in slide-in-from-top-1 duration-150">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
          Editar card
        </span>
        <button onClick={onClose} className="w-5 h-5 rounded-md flex items-center justify-center hover:bg-slate-200 transition-colors">
          <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Visual: emoji or image */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
          Visual (frente)
        </p>
        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white border border-slate-200">
            <button
              onClick={() => onChange({ useImage: false })}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${!item.useImage ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Emoji
            </button>
            <button
              onClick={() => item.imageUrl ? onChange({ useImage: true }) : fileRef.current?.click()}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${item.useImage ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Imagen
            </button>
          </div>

          {/* Emoji picker (if emoji mode) */}
          {!item.useImage && (
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-2xl leading-none mr-1">{item.emoji}</span>
              {EMOJI_SUGGESTIONS.map((em) => (
                <button
                  key={em}
                  onClick={() => onChange({ emoji: em })}
                  className={`text-base rounded-md px-1 py-0.5 transition-colors hover:bg-white ${item.emoji === em ? "bg-white shadow-sm" : ""}`}
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          {/* Image controls (if image mode) */}
          {item.useImage && (
            <div className="flex items-center gap-2">
              {item.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-md object-cover border border-slate-200" />
              )}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {uploading ? <span className="w-3 h-3 border border-slate-300 border-t-slate-600 rounded-full animate-spin" /> : null}
                {uploading ? "Subiendo..." : item.imageUrl ? "Cambiar" : "Subir imagen"}
              </button>
              {item.imageUrl && (
                <button
                  onClick={() => onChange({ imageUrl: "", useImage: false })}
                  className="text-[11px] text-red-400 hover:text-red-600 transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Quitar
                </button>
              )}
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        {uploadError && <p className="text-[11px] text-red-500" style={{ fontFamily: "var(--font-inter)" }}>{uploadError}</p>}
      </div>

      {/* Front title */}
      <div>
        <label className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 mb-1" style={{ fontFamily: "var(--font-inter)" }}>
          Título (frente)
        </label>
        <input
          type="text"
          value={item.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Título de la card"
          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Back description */}
      <div>
        <label className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 mb-1" style={{ fontFamily: "var(--font-inter)" }}>
          Descripción (dorso)
        </label>
        <textarea
          value={item.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Texto que se muestra al dar vuelta la card..."
          rows={3}
          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none resize-none focus:ring-2 focus:ring-slate-300 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>
    </div>
  );
}
