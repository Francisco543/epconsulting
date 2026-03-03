"use client";

import { type BlockType } from "../_types";

interface PaletteItem {
  type: BlockType;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  border: string;
  bg: string;
}

const PALETTE_ITEMS: PaletteItem[] = [
  {
    type: "heading",
    label: "Título",
    description: "H1, H2 o H3",
    color: "text-slate-600",
    border: "border-slate-200 hover:border-slate-300",
    bg: "hover:bg-slate-50",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    ),
  },
  {
    type: "paragraph",
    label: "Párrafo",
    description: "Texto libre",
    color: "text-slate-600",
    border: "border-slate-200 hover:border-slate-300",
    bg: "hover:bg-slate-50",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h10" />
      </svg>
    ),
  },
  {
    type: "image",
    label: "Imagen",
    description: "JPG, PNG, WebP",
    color: "text-sky-600",
    border: "border-sky-100 hover:border-sky-300",
    bg: "hover:bg-sky-50",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    type: "cards",
    label: "Cards",
    description: "Grilla de tarjetas",
    color: "text-indigo-600",
    border: "border-indigo-100 hover:border-indigo-300",
    bg: "hover:bg-indigo-50",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  {
    type: "callout",
    label: "Destacado",
    description: "Info / Tip / Atención",
    color: "text-amber-600",
    border: "border-amber-100 hover:border-amber-300",
    bg: "hover:bg-amber-50",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    type: "quiz",
    label: "Pregunta",
    description: "Multiple choice",
    color: "text-violet-600",
    border: "border-violet-100 hover:border-violet-300",
    bg: "hover:bg-violet-50",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    type: "divider",
    label: "Separador",
    description: "Línea divisoria",
    color: "text-slate-400",
    border: "border-slate-200 hover:border-slate-300",
    bg: "hover:bg-slate-50",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
      </svg>
    ),
  },
];

interface BlockPaletteProps {
  onAddBlock: (type: BlockType) => void;
}

export function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  return (
    <div>
      <p
        className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Agregar bloque
      </p>
      <div className="space-y-1">
        {PALETTE_ITEMS.map((item) => (
          <button
            key={item.type}
            onClick={() => onAddBlock(item.type)}
            className={`w-full flex items-center gap-2.5 rounded-lg border bg-white px-3 py-2 transition-colors text-left ${item.border} ${item.bg}`}
          >
            <span className={`${item.color} shrink-0`}>{item.icon}</span>
            <div>
              <p
                className="text-xs font-semibold text-slate-700 leading-none"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.label}
              </p>
              <p
                className="text-[10px] text-slate-400 mt-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
