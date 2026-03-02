"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * Logo MEP Compliance — imagen principal del sitio.
 */
export function LogoIcon() {
  return (
    <span className="inline-flex items-center">
      <Image
        src="/logo2.png"
        alt="MEP Compliance"
        width={170}
        height={52}
        priority
        className="h-10 w-auto lg:h-12"
        style={{
          objectFit: "contain",
        }}
      />
    </span>
  );
}

export default function Logo({
  href = "/",
  className: extraClass,
}: {
  href?: string;
  className?: string;
}) {
  const content = <LogoIcon />;
  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center transition-opacity duration-300 hover:opacity-90 ${extraClass ?? ""}`}
        aria-label="MEP Compliance - Inicio"
      >
        {content}
      </Link>
    );
  }
  return <span className={extraClass}>{content}</span>;
}
