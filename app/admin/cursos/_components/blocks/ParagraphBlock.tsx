"use client";

import { useRef, useEffect } from "react";
import { type ParagraphBlock } from "../../_types";
import { BlockWrapper } from "./HeadingBlock";

interface Props {
  block: ParagraphBlock;
  onChange: (b: ParagraphBlock) => void;
  onDelete: () => void;
}

export function ParagraphBlockEditor({ block, onChange, onDelete }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== block.text) {
      ref.current.innerText = block.text;
    }
  }, []);

  return (
    <BlockWrapper onDelete={onDelete}>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ ...block, text: e.currentTarget.innerText })}
        className="outline-none text-slate-600 text-base leading-relaxed cursor-text w-full min-h-[1.5em]"
        style={{ fontFamily: "var(--font-inter)" }}
        data-placeholder="Escribí el contenido del párrafo..."
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
