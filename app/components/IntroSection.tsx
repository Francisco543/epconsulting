"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function IntroSection() {
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
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-[#f8f8f6] transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ borderTop: "1px solid rgba(26, 26, 26, 0.06)" }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-20 lg:pt-28 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
          <div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
              style={{
                fontFamily: "var(--font-rhymes)",
                fontWeight: 600,
                color: "#1a1a1a",
              }}
            >
              Expertos en{" "}
              <span style={{ color: "#D4AF37" }}>Compliance</span>
            </h2>
            <div
              className="w-14 h-px mt-6 mb-8"
              style={{ backgroundColor: "rgba(212, 175, 55, 0.4)" }}
            />
            <p
              className="text-sm max-w-md"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(26, 26, 26, 0.55)",
                letterSpacing: "0.02em",
              }}
            >
              Revisor Externo Independiente acreditado ante la UIF · Más de 20 años de experiencia
            </p>
          </div>
          <div>
            <p
              className="text-base sm:text-lg leading-relaxed mb-8"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(26, 26, 26, 0.78)",
                lineHeight: 1.75,
              }}
            >
              Acompañamos a instituciones financieras y empresas en el diseño e implementación de programas de cumplimiento normativo. Soluciones a medida que reducen riesgos y fortalecen la confianza de clientes y reguladores.
            </p>
            <Link
              href="/sobre-nosotros"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] transition-all duration-300"
              style={{
                fontFamily: "var(--font-monument)",
                color: "#1a1a1a",
              }}
            >
              <span className="relative">
                Conocer más
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
