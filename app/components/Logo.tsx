"use client";

import Link from "next/link";
import { Scale } from "lucide-react";

/**
 * Logo MEP Consulting — icono legal/compliance (Lucide) + texto MEP.
 */
export function LogoIcon({
  fillLight = "#F5E6C8",
  fillGold = "#D4AF37",
}: {
  fillLight?: string;
  fillGold?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="shrink-0 w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-md border border-[#D4AF37]/4 bg-[#D4AF37]/10 text-[#D4AF37]">
        <Scale
          size={18}
          strokeWidth={2}
          className="w-4 h-4 lg:w-[18px] lg:h-[18px]"
          aria-hidden
        />
      </span>
      <span
        className="font-semibold tracking-tight text-xl lg:text-2xl"
        style={{
          fontFamily: "var(--font-rhymes)",
          color: fillLight,
          letterSpacing: "-0.02em",
        }}
      >
        MEP
      </span>
    </span>
  );
}

export default function Logo({
  href = "/",
  fillLight = "#F5E6C8",
  fillGold = "#D4AF37",
  className: extraClass,
}: {
  href?: string;
  fillLight?: string;
  fillGold?: string;
  className?: string;
}) {
  const content = <LogoIcon fillLight={fillLight} fillGold={fillGold} />;
  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center transition-opacity duration-300 hover:opacity-90 ${extraClass ?? ""}`}
        aria-label="MEP Consulting - Inicio"
      >
        {content}
      </Link>
    );
  }
  return <span className={extraClass}>{content}</span>;
}
