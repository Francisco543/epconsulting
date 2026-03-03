"use client";

import { type CalloutBlock, type CalloutVariant } from "../../_types";
import { BlockWrapper } from "./HeadingBlock";

const VARIANTS: { value: CalloutVariant; label: string; cls: string; iconCls: string }[] = [
  { value: "info", label: "Info", cls: "bg-blue-50 border-blue-200", iconCls: "text-blue-500" },
  { value: "tip", label: "Tip", cls: "bg-green-50 border-green-200", iconCls: "text-green-600" },
  { value: "warning", label: "Atención", cls: "bg-amber-50 border-amber-200", iconCls: "text-amber-500" },
  { value: "important", label: "Importante", cls: "bg-red-50 border-red-200", iconCls: "text-red-500" },
];

const ICONS: Record<CalloutVariant, React.ReactNode> = {
  info: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  tip: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  important: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

interface Props {
  block: CalloutBlock;
  onChange: (b: CalloutBlock) => void;
  onDelete: () => void;
}

export function CalloutBlockEditor({ block, onChange, onDelete }: Props) {
  const cfg = VARIANTS.find((v) => v.value === block.variant)!;

  return (
    <BlockWrapper onDelete={onDelete}>
      {/* Variant selector */}
      <div className="flex items-center gap-1.5 mb-3">
        {VARIANTS.map((v) => (
          <button
            key={v.value}
            onClick={() => onChange({ ...block, variant: v.value })}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all
              ${block.variant === v.value
                ? `${v.cls} border-current opacity-100 shadow-sm`
                : "bg-slate-100 border-slate-200 text-slate-400 hover:opacity-70"
              }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Callout card */}
      <div className={`rounded-xl border-l-4 p-4 space-y-1.5 ${cfg.cls}`}>
        <div className="flex items-center gap-2">
          <span className={cfg.iconCls}>{ICONS[block.variant]}</span>
          <input
            type="text"
            value={block.title}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="Título del destacado"
            className="bg-transparent text-sm font-semibold text-slate-800 outline-none flex-1 placeholder:text-slate-400"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
        <textarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Texto de la nota destacada..."
          rows={2}
          className="w-full bg-transparent text-sm text-slate-600 outline-none resize-none leading-relaxed placeholder:text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>
    </BlockWrapper>
  );
}
