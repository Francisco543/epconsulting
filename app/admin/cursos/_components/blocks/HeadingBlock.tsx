"use client";

import { useRef, useEffect } from "react";
import { type HeadingBlock } from "../../_types";

interface Props {
  block: HeadingBlock;
  onChange: (b: HeadingBlock) => void;
  onDelete: () => void;
}

export function HeadingBlockEditor({ block, onChange, onDelete }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== block.text) {
      ref.current.innerText = block.text;
    }
  }, []);

  const fontSizes: Record<1 | 2 | 3, string> = {
    1: "text-3xl font-extrabold",
    2: "text-2xl font-bold",
    3: "text-xl font-semibold",
  };

  return (
    <BlockWrapper onDelete={onDelete}>
      <div className="flex items-center gap-2 mb-2">
        {([1, 2, 3] as const).map((l) => (
          <button
            key={l}
            onClick={() => onChange({ ...block, level: l })}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors
              ${block.level === l
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            H{l}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ ...block, text: e.currentTarget.innerText })}
        className={`outline-none text-slate-900 leading-tight cursor-text w-full min-h-[1em] ${fontSizes[block.level]}`}
        style={{ fontFamily: "var(--font-rhymes)" }}
        data-placeholder="Escribí el título..."
      />
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #cbd5e1;
          pointer-events: none;
        }
      `}</style>
    </BlockWrapper>
  );
}

export function BlockWrapper({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) {
  return (
    <div className="group relative rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50/60 px-4 py-3 transition-colors">
      {children}
      <button
        onClick={onDelete}
        title="Eliminar bloque"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 shadow-sm"
      >
        <svg
          className="w-3 h-3 text-slate-400 hover:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
