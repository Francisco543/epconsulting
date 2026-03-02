"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function ContactSectionHero() {
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

  const contactItems = [
    {
      label: "Email",
      value: "info@mepcompliance.com",
      href: "mailto:info@mepcompliance.com",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
      delay: 0,
    },
    {
      label: "Teléfono",
      value: "+54 11 4916-9760",
      href: "tel:+541149169760",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
      delay: 1,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Blob orgánico: bordes redondeados asimétricos */}
        <div
          className="relative w-full max-w-4xl mx-auto py-20 lg:py-28 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center text-center"
          style={{
            backgroundColor: "#1a2e24",
            border: "1px solid #2a3d32",
            boxShadow: "0 25px 60px -20px rgba(26, 46, 36, 0.35)",
            borderRadius: "42% 58% 55% 45% / 52% 38% 62% 48%",
          }}
        >
          <div className="w-full max-w-xl">
            <p
              className={`text-[11px] uppercase tracking-[0.35em] mb-4 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.5)",
                transitionDelay: "150ms",
              }}
            >
              Contacto
            </p>

            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-4 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                fontFamily: "var(--font-rhymes)",
                fontWeight: 600,
                color: "#F5E6C8",
                transitionDelay: "250ms",
              }}
            >
              Hablemos
            </h2>

            <div
              className={`mx-auto w-12 h-px mb-8 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{
                backgroundColor: "#D4AF37",
                transformOrigin: "center",
                transitionDelay: "320ms",
              }}
            />

            <p
              className={`text-base sm:text-lg leading-relaxed mb-6 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.8)",
                lineHeight: 1.65,
                transitionDelay: "400ms",
              }}
            >
              Estamos listos para ayudarte a transformar el cumplimiento
              normativo en ventaja competitiva.
            </p>
            <p
              className={`text-[11px] uppercase tracking-[0.2em] mb-10 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.45)",
                transitionDelay: "420ms",
              }}
            >
              Consulta sin compromiso · Respondemos en 24 a 48 horas
            </p>

            <div className="space-y-4 mb-10">
              {contactItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-center gap-5 sm:gap-6 p-5 sm:p-6 rounded-xl border border-[#2a3d32] bg-[#1e3329]/50 hover:bg-[#1e3329] hover:border-[#D4AF37]/40 transition-all duration-300 ease-out hover:-translate-y-0.5 text-left ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${450 + item.delay * 70}ms`,
                  }}
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1a2e24] transition-all duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] mb-1"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(245, 230, 200, 0.5)",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-base sm:text-lg break-all sm:break-normal font-medium"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "#F5E6C8",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div
              className={`transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "620ms" }}
            >
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] transition-all duration-300"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#D4AF37",
                }}
              >
                <span className="relative">
                  Enviar mensaje
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
