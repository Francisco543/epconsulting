"use client";

import { useRef, useState } from "react";
import { type ImageBlock } from "../../_types";
import { BlockWrapper } from "./HeadingBlock";
import { useCourseEditor } from "../CourseEditorContext";

interface Props {
  block: ImageBlock;
  onChange: (b: ImageBlock) => void;
  onDelete: () => void;
}

const SIZE_OPTIONS = [
  { value: "small",  label: "S",       maxW: "max-w-xs" },
  { value: "medium", label: "M",       maxW: "max-w-md" },
  { value: "large",  label: "L",       maxW: "max-w-xl" },
  { value: "full",   label: "Full",    maxW: "max-w-full" },
] as const;

const ALIGN_OPTIONS = [
  { value: "left",   icon: <AlignLeftIcon /> },
  { value: "center", icon: <AlignCenterIcon /> },
  { value: "right",  icon: <AlignRightIcon /> },
] as const;

export function ImageBlockEditor({ block, onChange, onDelete }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useCourseEditor();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadImage(file);
      onChange({
        ...block,
        url,
        alt: block.alt || file.name.replace(/\.[^.]+$/, ""),
      });
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
      // Reset input
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const sizeConfig = SIZE_OPTIONS.find((s) => s.value === block.size)!;
  const alignClass =
    block.align === "left" ? "mr-auto" : block.align === "right" ? "ml-auto" : "mx-auto";

  return (
    <BlockWrapper onDelete={onDelete}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-60"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {uploading ? (
            <span className="w-3 h-3 border border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
          {block.url ? "Cambiar imagen" : uploading ? "Subiendo..." : "Subir imagen"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

        {block.url && (
          <>
            <div className="w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-1">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => onChange({ ...block, size: s.value })}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors
                    ${block.size === s.value ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-0.5">
              {ALIGN_OPTIONS.map((a) => (
                <button
                  key={a.value}
                  onClick={() => onChange({ ...block, align: a.value })}
                  className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors
                    ${block.align === a.value ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                >
                  {a.icon}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {uploadError && (
        <p className="text-xs text-red-500 mb-2" style={{ fontFamily: "var(--font-inter)" }}>{uploadError}</p>
      )}

      {block.url ? (
        <div className={`${alignClass} ${sizeConfig.maxW}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.alt || "imagen"}
            className="w-full h-auto rounded-xl object-cover border border-slate-200 shadow-sm"
          />
          <input
            type="text"
            value={block.caption}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Agregar pie de foto..."
            className="w-full mt-2 text-xs text-slate-400 bg-transparent text-center outline-none border-b border-transparent hover:border-slate-200 focus:border-slate-400 pb-0.5 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <input
            type="text"
            value={block.alt}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            placeholder="Texto alternativo (accesibilidad)..."
            className="w-full mt-1.5 text-[10px] text-slate-300 bg-transparent outline-none border-b border-transparent hover:border-slate-200 focus:border-slate-400 pb-0.5 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-3 py-12 hover:border-slate-300 hover:bg-slate-100/50 transition-colors disabled:opacity-60"
        >
          {uploading ? (
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>Subí una imagen</p>
                <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>JPG, PNG, WebP · máx 10 MB</p>
              </div>
            </>
          )}
        </button>
      )}
    </BlockWrapper>
  );
}

function AlignLeftIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h10M4 14h16M4 18h10" /></svg>;
}
function AlignCenterIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 10h10M4 14h16M7 18h10" /></svg>;
}
function AlignRightIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M10 10h10M4 14h16M10 18h10" /></svg>;
}
