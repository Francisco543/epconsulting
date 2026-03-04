"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import CountUp from "@/components/CountUp";

type AboutSectionHeroProps = {
  linkLabel?: string;
  linkHref?: string;
};

export default function AboutSectionHero({
  linkLabel,
  linkHref,
}: AboutSectionHeroProps) {
  const t = useTranslations("home.about");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const label = linkLabel ?? t("seeMore");
  const href = linkHref ?? "/sobre-nosotros";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-[#f8f8f6] transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ borderTop: "1px solid rgba(26, 26, 26, 0.06)" }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p
            className={`text-[11px] uppercase tracking-[0.35em] mb-4 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(26, 26, 26, 0.5)",
              transitionDelay: "200ms",
            }}
          >
            {t("label")}
          </p>

          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[0.95] mb-4 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#1a1a1a",
              transitionDelay: "300ms",
            }}
          >
            {t("title")}{" "}
            <span style={{ color: "#D4AF37" }}>{t("titleHighlight")}</span>
          </h2>

          <p
            className={`text-sm sm:text-base mb-6 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(26, 26, 26, 0.65)",
              letterSpacing: "0.02em",
              transitionDelay: "400ms",
            }}
          >
            {t("role")}
          </p>

          <div
            className={`w-12 h-px mb-8 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{
              backgroundColor: "#D4AF37",
              transformOrigin: "left",
              transitionDelay: "450ms",
            }}
          />

          <p
            className={`text-base sm:text-lg leading-relaxed mb-10 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(26, 26, 26, 0.8)",
              lineHeight: 1.75,
              transitionDelay: "500ms",
            }}
          >
            {t("bio")}
          </p>

          <div
            className={`flex items-baseline gap-10 sm:gap-14 mb-10 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div>
              <p
                className="text-3xl sm:text-4xl font-light mb-1"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  color: "#1a1a1a",
                  lineHeight: 1,
                }}
              >
                <CountUp
                  to={20}
                  from={0}
                  duration={2}
                  delay={0.4}
                  startWhen={isVisible}
                  onStart={undefined}
                  onEnd={undefined}
                />
                +
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.5)",
                }}
              >
                {t("years")}
              </p>
            </div>
            <div
              className="h-10 w-px shrink-0"
              style={{ backgroundColor: "rgba(26, 26, 26, 0.12)" }}
            />
            <div>
              <p
                className="text-3xl sm:text-4xl font-light mb-1"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  color: "#1a1a1a",
                  lineHeight: 1,
                }}
              >
                REI
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.5)",
                }}
              >
                {t("rei")}
              </p>
            </div>
          </div>

          {href && (
            <div
              className={`transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <Link
                href={href}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] transition-all duration-300"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#1a1a1a",
                }}
              >
                <span className="relative">
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
