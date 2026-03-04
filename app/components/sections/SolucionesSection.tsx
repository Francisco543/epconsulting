"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function SolucionCard({
  title,
  desc,
  href,
  index,
  isVisible,
  delay,
  viewMore,
}: {
  title: string;
  desc: string;
  href: string;
  index: number;
  isVisible: boolean;
  delay: number;
  viewMore: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group flex flex-col justify-between h-full border-b border-r border-[#2a3d32] p-8 lg:p-10 min-h-[260px] bg-[#1a2e24] hover:bg-[#1e3329] transition-all duration-300 ease-out md:border-r lg:last:border-r-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="transition-all duration-500 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: `${delay * 80}ms`,
        }}
      >
        <span
          className="inline-block text-[11px] uppercase tracking-[0.25em] mb-5 transition-colors duration-300"
          style={{
            fontFamily: "var(--font-monument)",
            color: hovered ? "#D4AF37" : "rgba(245, 230, 200, 0.45)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="text-xl lg:text-2xl mb-4 leading-tight transition-colors duration-300"
          style={{
            fontFamily: "var(--font-rhymes)",
            color: hovered ? "#F5E6C8" : "rgba(245, 230, 200, 0.9)",
            fontWeight: 500,
          }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(245, 230, 200, 0.6)",
            lineHeight: 1.7,
          }}
        >
          {desc}
        </p>
      </div>
      <div
        className="mt-6 flex items-center gap-2 transition-all duration-500 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-8px)",
          transitionDelay: `${delay * 80 + 60}ms`,
        }}
      >
        <span
          className="text-[11px] uppercase tracking-[0.2em] transition-all duration-300 group-hover:translate-x-0.5"
          style={{
            fontFamily: "var(--font-monument)",
            color: hovered ? "#D4AF37" : "rgba(245, 230, 200, 0.4)",
          }}
        >
          {viewMore}
        </span>
        <span
          className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ fontFamily: "var(--font-monument)" }}
        >
          →
        </span>
      </div>
    </Link>
  );
}

const CARD_KEYS = [
  { key: "politicas", href: "/servicios#politicas", delay: 1 },
  { key: "analisis", href: "/servicios#analisis", delay: 0 },
  { key: "capacitacion", href: "/servicios#capacitacion", delay: 2 },
  { key: "auditoria", href: "/servicios#auditoria", delay: 3 },
] as const;

export default function SolucionesSection() {
  const t = useTranslations("home.soluciones");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen flex flex-col overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        backgroundColor: "#1a2e24",
        borderTop: "1px solid #2a3d32",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 lg:pt-24 pb-6 shrink-0">
        <p
          className="text-[11px] uppercase tracking-[0.35em] mb-3"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(245, 230, 200, 0.5)",
          }}
        >
          {t("label")}
        </p>
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-5"
          style={{
            fontFamily: "var(--font-rhymes)",
            color: "#F5E6C8",
            fontWeight: 600,
          }}
        >
          {t("title")} <span style={{ color: "#D4AF37" }}>{t("titleHighlight")}</span>
        </h2>
        <p
          className="text-base max-w-2xl"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(245, 230, 200, 0.7)",
            lineHeight: 1.65,
          }}
        >
          {t("description")}
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 flex-1 min-h-0 items-stretch">
          {CARD_KEYS.map((card, index) => (
            <SolucionCard
              key={card.href}
              title={t(`cards.${card.key}.title`)}
              desc={t(`cards.${card.key}.desc`)}
              href={card.href}
              index={index}
              isVisible={isVisible}
              delay={card.delay}
              viewMore={t("viewMore")}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-12 text-center shrink-0">
        <Link
          href="/servicios"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] transition-all duration-300"
          style={{
            fontFamily: "var(--font-monument)",
            color: "#F5E6C8",
          }}
        >
          <span className="relative">
            {t("viewAllServices")}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
