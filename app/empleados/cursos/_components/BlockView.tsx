"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Tipos (espejo de _types.ts del admin, sin helpers de edición)
// ─────────────────────────────────────────────────────────────
export type Block =
  | { id: string; type: "heading"; text: string; level: 1 | 2 | 3 }
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "image"; url: string; alt: string; caption: string; size: "small" | "medium" | "large" | "full"; align: "left" | "center" | "right" }
  | { id: string; type: "cards"; columns: 2 | 3 | 4; items: CardItem[] }
  | { id: string; type: "callout"; variant: "info" | "tip" | "warning" | "important"; title: string; text: string }
  | { id: string; type: "divider" }
  | { id: string; type: "quiz"; questions: QuizQuestion[] };

export type CardItem = {
  id: string;
  emoji: string;
  imageUrl: string;
  useImage: boolean;
  title: string;
  description: string;
};

export type QuizOption = { id: string; text: string };
export type QuizQuestion = {
  id: string;
  text: string;
  explanation: string;
  options: QuizOption[];
};

// ─────────────────────────────────────────────────────────────
// Router de bloques (solo lectura)
// ─────────────────────────────────────────────────────────────
type BlockViewProps = {
  block: Block;
  /** Para CardsBlock: notifica cuando todas las cards fueron flippeadas */
  onAllCardsFlipped?: () => void;
  /** Para QuizBlock: entrega las respuestas al completar */
  onQuizSubmit?: (answers: Record<string, string>) => Promise<void>;
};

export function BlockView({ block, onAllCardsFlipped, onQuizSubmit }: BlockViewProps) {
  switch (block.type) {
    case "heading":   return <HeadingView block={block} />;
    case "paragraph": return <ParagraphView block={block} />;
    case "image":     return <ImageView block={block} />;
    case "callout":   return <CalloutView block={block} />;
    case "divider":   return <DividerView />;
    case "cards":
      return <CardsView block={block} onAllFlipped={onAllCardsFlipped} />;
    case "quiz":
      return <QuizView block={block} onSubmit={onQuizSubmit} />;
  }
}

// ─────────────────────────────────────────────────────────────
// HeadingView
// ─────────────────────────────────────────────────────────────
function HeadingView({ block }: { block: Extract<Block, { type: "heading" }> }) {
  const sizes = { 1: "text-3xl", 2: "text-2xl", 3: "text-xl" };
  return (
    <p
      className={`font-bold text-slate-900 leading-tight ${sizes[block.level]}`}
      style={{ fontFamily: "var(--font-rhymes)" }}
    >
      {block.text}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────
// ParagraphView
// ─────────────────────────────────────────────────────────────
function ParagraphView({ block }: { block: Extract<Block, { type: "paragraph" }> }) {
  return (
    <p className="text-slate-700 leading-relaxed text-base" style={{ fontFamily: "var(--font-inter)" }}>
      {block.text}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────
// ImageView
// ─────────────────────────────────────────────────────────────
function ImageView({ block }: { block: Extract<Block, { type: "image" }> }) {
  if (!block.url) return null;
  const sizeClass = { small: "max-w-xs", medium: "max-w-md", large: "max-w-xl", full: "w-full" }[block.size];
  const alignClass = { left: "mr-auto", center: "mx-auto", right: "ml-auto" }[block.align];
  return (
    <figure className={`${alignClass} ${sizeClass}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={block.url} alt={block.alt} className="rounded-xl w-full object-cover" />
      {block.caption && (
        <figcaption className="text-center text-xs text-slate-400 mt-2" style={{ fontFamily: "var(--font-inter)" }}>
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─────────────────────────────────────────────────────────────
// CalloutView
// ─────────────────────────────────────────────────────────────
const calloutStyles = {
  info:      { wrap: "bg-blue-50 border-blue-200",   icon: "ℹ️", title: "text-blue-800",  text: "text-blue-700" },
  tip:       { wrap: "bg-green-50 border-green-200", icon: "💡", title: "text-green-800", text: "text-green-700" },
  warning:   { wrap: "bg-amber-50 border-amber-200", icon: "⚠️", title: "text-amber-800", text: "text-amber-700" },
  important: { wrap: "bg-red-50 border-red-200",     icon: "🔴", title: "text-red-800",   text: "text-red-700" },
};

function CalloutView({ block }: { block: Extract<Block, { type: "callout" }> }) {
  const s = calloutStyles[block.variant];
  return (
    <div className={`rounded-xl border px-4 py-3.5 ${s.wrap}`}>
      <p className={`font-semibold text-sm mb-1 ${s.title}`} style={{ fontFamily: "var(--font-inter)" }}>
        {s.icon} {block.title}
      </p>
      <p className={`text-sm leading-relaxed ${s.text}`} style={{ fontFamily: "var(--font-inter)" }}>
        {block.text}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DividerView
// ─────────────────────────────────────────────────────────────
function DividerView() {
  return <hr className="border-slate-200 my-2" />;
}

// ─────────────────────────────────────────────────────────────
// CardsView — flip cards con tracking de vistas
// ─────────────────────────────────────────────────────────────
function CardsView({
  block,
  onAllFlipped,
}: {
  block: Extract<Block, { type: "cards" }>;
  onAllFlipped?: () => void;
}) {
  const [flippedSet, setFlippedSet] = useState<Set<string>>(new Set());
  const notifiedRef = useRef(false);

  const markFlipped = (cardId: string) => {
    setFlippedSet((prev) => {
      const next = new Set(prev).add(cardId);
      return next;
    });
  };

  // Notificar cuando todas están flippeadas
  useEffect(() => {
    if (
      !notifiedRef.current &&
      block.items.length > 0 &&
      block.items.every((item) => flippedSet.has(item.id))
    ) {
      notifiedRef.current = true;
      onAllFlipped?.();
    }
  }, [flippedSet, block.items, onAllFlipped]);

  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[block.columns];

  return (
    <div className={`grid grid-cols-1 ${cols} gap-4`}>
      {block.items.map((item) => (
        <FlipCard
          key={item.id}
          item={item}
          flipped={flippedSet.has(item.id)}
          onFlip={() => markFlipped(item.id)}
          onUnflip={() => {}} // puede volver, ya está marcada
        />
      ))}
    </div>
  );
}

function FlipCard({
  item,
  flipped,
  onFlip,
  onUnflip,
}: {
  item: CardItem;
  flipped: boolean;
  onFlip: () => void;
  onUnflip: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggle = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    if (next) onFlip();
    else onUnflip();
  };

  return (
    <div
      onClick={toggle}
      className="cursor-pointer select-none"
      style={{ perspective: "1000px", height: "200px" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Frente */}
        <div
          style={{ backfaceVisibility: "hidden", position: "absolute", inset: 0 }}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center gap-2 px-4 py-3"
        >
          {item.useImage && item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.title} className="w-14 h-14 object-cover rounded-xl" />
          ) : (
            <span className="text-3xl">{item.emoji || "📌"}</span>
          )}
          <p className="font-semibold text-slate-900 text-center text-sm leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
            {item.title}
          </p>
          <p className="text-[11px] text-slate-400 tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>
            Clic para más info
          </p>
        </div>

        {/* Dorso */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            transform: "rotateY(180deg)",
          }}
          className="rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center gap-3 px-4 py-3"
        >
          <p className="text-indigo-300 font-semibold text-sm text-center" style={{ fontFamily: "var(--font-inter)" }}>
            {item.title}
          </p>
          <p className="text-slate-300 text-xs text-center leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QuizView — preguntas + submit al servidor
// ─────────────────────────────────────────────────────────────
type QuizState = "answering" | "submitting" | "submitted";

export function QuizView({
  block,
  onSubmit,
}: {
  block: Extract<Block, { type: "quiz" }>;
  onSubmit?: (answers: Record<string, string>) => Promise<void>;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [state, setState] = useState<QuizState>("answering");
  const [error, setError] = useState<string | null>(null);

  const allAnswered = block.questions.every((q) => answers[q.id]);

  const handleSubmit = async () => {
    if (!allAnswered || !onSubmit) return;
    setState("submitting");
    setError(null);
    try {
      await onSubmit(answers);
      setState("submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar respuestas");
      setState("answering");
    }
  };

  return (
    <div className="space-y-6">
      {block.questions.map((q, qi) => (
        <div key={q.id} className="space-y-3">
          <p className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            <span className="text-slate-400 mr-2">{qi + 1}.</span>
            {q.text}
          </p>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const selected = answers[q.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={state === "submitting" || state === "submitted"}
                  onClick={() => {
                    if (state !== "answering") return;
                    setAnswers((prev) => ({ ...prev, [q.id]: opt.id }));
                  }}
                  className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-all ${
                    selected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  } ${state !== "answering" ? "cursor-default" : ""}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {state === "submitted" ? (
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700" style={{ fontFamily: "var(--font-inter)" }}>
          ✓ Respuestas enviadas. Podés continuar al siguiente paso.
        </div>
      ) : (
        <div className="space-y-2">
          {error && (
            <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>{error}</p>
          )}
          <button
            type="button"
            disabled={!allAnswered || state === "submitting"}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {state === "submitting" ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar respuestas"
            )}
          </button>
          {!allAnswered && (
            <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
              Respondé todas las preguntas para continuar
            </p>
          )}
        </div>
      )}
    </div>
  );
}
