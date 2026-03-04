"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const FAQ_IDS = ["rei", "sujetos", "plazos", "proceso", "alcance", "contacto"] as const;

export default function FaqSection() {
  const t = useTranslations("home.faq");
  const [openId, setOpenId] = useState<string | null>(FAQ_IDS[0]);
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
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        backgroundColor: "#f8f8f6",
        borderTop: "1px solid rgba(26, 26, 26, 0.06)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <p
          className="text-[11px] uppercase tracking-[0.35em] mb-4"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(26, 26, 26, 0.5)",
          }}
        >
          {t("label")}
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl leading-[0.95] mb-5"
          style={{
            fontFamily: "var(--font-rhymes)",
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          {t("title")} <span style={{ color: "#D4AF37" }}>{t("titleHighlight")}</span>
        </h2>
        <p
          className="text-base mb-12 max-w-xl"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(26, 26, 26, 0.7)",
            lineHeight: 1.65,
          }}
        >
          {t("description")}
        </p>

        <div className="space-y-0 border-y border-neutral-200/80">
          {FAQ_IDS.map((id, index) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className="border-b border-neutral-200/80 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : id)}
                  className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left transition-colors duration-200 hover:bg-white/50"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${id}`}
                  id={`faq-question-${id}`}
                >
                  <span
                    className="flex-1 text-base sm:text-lg font-medium pr-4"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#1a1a1a",
                      lineHeight: 1.4,
                    }}
                  >
                    {t(`items.${id}.q`)}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{
                      backgroundColor: isOpen
                        ? "#D4AF37"
                        : "rgba(212, 175, 55, 0.2)",
                      color: isOpen ? "#1a2e24" : "#D4AF37",
                    }}
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${id}`}
                  role="region"
                  aria-labelledby={`faq-question-${id}`}
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    className="pb-5 sm:pb-6 pl-0 pr-12 text-sm sm:text-base leading-relaxed"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(26, 26, 26, 0.78)",
                      lineHeight: 1.75,
                    }}
                  >
                    {t(`items.${id}.a`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="mt-10 text-sm"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(26, 26, 26, 0.6)",
          }}
        >
          {t("contactPrompt")}{" "}
          <Link
            href="/contacto"
            className="font-medium transition-colors hover:text-[#D4AF37]"
            style={{ color: "#1a1a1a" }}
          >
            {t("contactLink")}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
