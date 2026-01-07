"use client";

import Link from "next/link";

interface ContactSectionHeroProps {
  clipRadius: number;
  opacity: number;
  phaseProgress: number;
}

export default function ContactSectionHero({
  clipRadius,
  opacity,
  phaseProgress,
}: ContactSectionHeroProps) {
  return (
    <section
      className="fixed top-0 left-0 w-full h-screen z-50 will-change-transform"
      style={{
        clipPath: `circle(${clipRadius}% at 60px calc(100% - 60px))`,
        pointerEvents: phaseProgress > 0.5 ? "auto" : "none",
      }}
    >
      <div className="w-full h-full bg-[#f8f8f6] p-3 sm:p-4 lg:p-5">
        <div
          className="w-full h-full bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center"
          style={{ borderRadius: "24px" }}
        >
          {/* Contenido principal */}
          <div
            className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16"
            style={{
              opacity: opacity,
              transform: `translateY(${
                opacity < 1 ? (1 - opacity) * 30 : 0
              }px)`,
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              {/* PreTitle */}
              <p
                className="text-[11px] uppercase tracking-[0.5em] mb-6"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(255, 255, 255, 0.4)",
                  letterSpacing: "0.5em",
                }}
              >
                CONTACTO
              </p>

              {/* Título */}
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.95]"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 300,
                  color: "#fff",
                }}
              >
                Hablemos
              </h2>

              {/* Descripción */}
              <p
                className="text-base sm:text-lg leading-[1.7] mb-12"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: 400,
                }}
              >
                Estamos listos para ayudarte a transformar el cumplimiento
                normativo en ventaja competitiva.
              </p>

              {/* Contact Info */}
              <div className="space-y-6 mb-12">
                {/* Email */}
                <a
                  href="mailto:info@estudiopalomeque.com"
                  className="group flex items-center justify-center gap-4 p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-[#1a1a1a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p
                      className="text-[11px] uppercase tracking-[0.2em] mb-1"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.5)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      Email
                    </p>
                    <p
                      className="text-lg"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "#fff",
                        fontWeight: 500,
                      }}
                    >
                      info@estudiopalomeque.com
                    </p>
                  </div>
                </a>

                {/* Teléfono */}
                <a
                  href="tel:+541112345678"
                  className="group flex items-center justify-center gap-4 p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-[#1a1a1a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p
                      className="text-[11px] uppercase tracking-[0.2em] mb-1"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.5)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      Teléfono
                    </p>
                    <p
                      className="text-lg"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "#fff",
                        fontWeight: 500,
                      }}
                    >
                      +54 11 1234-5678
                    </p>
                  </div>
                </a>
              </div>

              {/* CTA */}
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] transition-all duration-300"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#D4AF37",
                  letterSpacing: "0.25em",
                  fontWeight: 500,
                }}
              >
                <span className="relative">
                  Enviar mensaje
                  <span
                    className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                    style={{ opacity: 0.5 }}
                  />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
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

