"use client";

import { type DividerBlock } from "../../_types";
import { BlockWrapper } from "./HeadingBlock";

interface Props {
  block: DividerBlock;
  onChange: (b: DividerBlock) => void;
  onDelete: () => void;
}

export function DividerBlockEditor({ onDelete }: Props) {
  return (
    <BlockWrapper onDelete={onDelete}>
      <div className="py-2">
        <hr className="border-slate-200" />
      </div>
    </BlockWrapper>
  );
}
