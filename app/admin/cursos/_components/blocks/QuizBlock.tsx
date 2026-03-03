"use client";

import { type QuizBlock, type QuizQuestion, type QuizOption, makeId } from "../../_types";
import { BlockWrapper } from "./HeadingBlock";

interface Props {
  block: QuizBlock;
  onChange: (b: QuizBlock) => void;
  onDelete: () => void;
}

export function QuizBlockEditor({ block, onChange, onDelete }: Props) {
  function updateQuestion(qId: string, patch: Partial<QuizQuestion>) {
    onChange({
      ...block,
      questions: block.questions.map((q) => (q.id === qId ? { ...q, ...patch } : q)),
    });
  }

  function addQuestion() {
    onChange({
      ...block,
      questions: [
        ...block.questions,
        {
          id: makeId(),
          text: "Nueva pregunta",
          explanation: "",
          options: [
            { id: makeId(), text: "Opción A", correct: true },
            { id: makeId(), text: "Opción B", correct: false },
          ],
        },
      ],
    });
  }

  function removeQuestion(qId: string) {
    onChange({
      ...block,
      questions: block.questions.filter((q) => q.id !== qId),
    });
  }

  return (
    <BlockWrapper onDelete={onDelete}>
      <div className="space-y-4">
        {block.questions.map((q, qi) => (
          <QuestionEditor
            key={q.id}
            question={q}
            index={qi}
            canDelete={block.questions.length > 1}
            onChange={(patch) => updateQuestion(q.id, patch)}
            onDelete={() => removeQuestion(q.id)}
          />
        ))}

        <button
          onClick={addQuestion}
          className="w-full rounded-xl border-2 border-dashed border-violet-200 py-3 text-xs font-semibold text-violet-500 hover:bg-violet-50 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          + Agregar pregunta
        </button>
      </div>
    </BlockWrapper>
  );
}

function QuestionEditor({
  question,
  index,
  canDelete,
  onChange,
  onDelete,
}: {
  question: QuizQuestion;
  index: number;
  canDelete: boolean;
  onChange: (patch: Partial<QuizQuestion>) => void;
  onDelete: () => void;
}) {
  function updateOption(oId: string, patch: Partial<QuizOption>) {
    onChange({
      options: question.options.map((o) => (o.id === oId ? { ...o, ...patch } : o)),
    });
  }

  function setCorrect(oId: string) {
    onChange({
      options: question.options.map((o) => ({ ...o, correct: o.id === oId })),
    });
  }

  function addOption() {
    onChange({
      options: [
        ...question.options,
        { id: makeId(), text: `Opción ${String.fromCharCode(65 + question.options.length)}`, correct: false },
      ],
    });
  }

  function removeOption(oId: string) {
    onChange({ options: question.options.filter((o) => o.id !== oId) });
  }

  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-4 space-y-3">
      {/* Question header */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-[11px] font-bold mt-0.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {index + 1}
        </span>
        <textarea
          value={question.text}
          onChange={(e) => onChange({ text: e.target.value })}
          rows={2}
          placeholder="Escribí la pregunta..."
          className="flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none resize-none leading-relaxed placeholder:text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
        />
        {canDelete && (
          <button
            onClick={onDelete}
            className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center hover:bg-red-100 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2 pl-8">
        {question.options.map((opt, oi) => (
          <div key={opt.id} className="flex items-center gap-2 group/opt">
            {/* Correct radio */}
            <button
              onClick={() => setCorrect(opt.id)}
              title="Marcar como correcta"
              className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                ${opt.correct
                  ? "border-green-500 bg-green-500"
                  : "border-slate-300 hover:border-green-400"
                }`}
            >
              {opt.correct && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            {/* Option letter */}
            <span
              className="shrink-0 text-[11px] font-bold text-slate-400 w-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {String.fromCharCode(65 + oi)}
            </span>

            {/* Option text */}
            <input
              type="text"
              value={opt.text}
              onChange={(e) => updateOption(opt.id, { text: e.target.value })}
              placeholder={`Opción ${String.fromCharCode(65 + oi)}`}
              className={`flex-1 bg-white rounded-lg border px-2.5 py-1.5 text-sm outline-none transition-colors
                ${opt.correct
                  ? "border-green-300 text-slate-800 font-medium"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 focus:border-slate-400"
                }`}
              style={{ fontFamily: "var(--font-inter)" }}
            />

            {/* Remove option */}
            {question.options.length > 2 && (
              <button
                onClick={() => removeOption(opt.id)}
                className="opacity-0 group-hover/opt:opacity-100 shrink-0 w-5 h-5 rounded flex items-center justify-center hover:bg-red-50 transition-all"
              >
                <svg className="w-3 h-3 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addOption}
          className="text-xs font-medium text-violet-500 hover:text-violet-700 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          + Agregar opción
        </button>
      </div>

      {/* Explanation */}
      <div className="pl-8">
        <input
          type="text"
          value={question.explanation}
          onChange={(e) => onChange({ explanation: e.target.value })}
          placeholder="Explicación opcional (se muestra tras responder)..."
          className="w-full bg-white rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-500 outline-none hover:border-slate-300 focus:border-slate-400 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>
    </div>
  );
}
