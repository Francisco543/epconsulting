"use client";

import Link from "next/link";

interface FooterHeroProps {
  clipRadius: number;
  opacity: number;
  phaseProgress: number;
}

export default function FooterHero({
  clipRadius,
  opacity,
  phaseProgress,
}: FooterHeroProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section
      className="fixed top-0 left-0 w-full h-screen z-60 will-change-transform"
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
            className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-16"
            style={{
              opacity: opacity,
              transform: `translateY(${
                opacity < 1 ? (1 - opacity) * 30 : 0
              }px)`,
            }}
          >
            <div className="text-center">
              {/* Logo */}
              <Link
                href="/"
                className="inline-block mb-12 transition-opacity duration-300 hover:opacity-80"
              >
                <svg
                  width="130"
                  height="40"
                  viewBox="0 0 168 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:w-[150px] lg:h-[46px]"
                >
                  <path d="M0 52L16 2L32 52H23L16 28L9 52H0Z" fill="#FFFFFF" />
                  <path d="M26 52L42 2L58 52H49L42 28L35 52H26Z" fill="#D4AF37" />
                  <path
                    d="M68 2H102V12H80V22H99V32H80V42H102V52H68V2Z"
                    fill="#FFFFFF"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M112 2H138C147.941 2 156 10.059 156 20C156 29.941 147.941 38 138 38H124V52H112V2ZM124 12V28H136C140.418 28 144 24.418 144 20C144 15.582 140.418 12 136 12H124Z"
                    fill="#FFFFFF"
                  />
                  <circle cx="164" cy="6" r="4" fill="#D4AF37" />
                </svg>
              </Link>

              {/* Descripción */}
              <p
                className="text-sm max-w-xl mx-auto mb-16 leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(255, 255, 255, 0.65)",
                  fontWeight: 400,
                }}
              >
                Estudio Jurídico especializado en Prevención del Lavado de
                Activos y la Financiación del Terrorismo.
              </p>

              {/* Links principales */}
              <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
                <Link
                  href="/"
                  className="group text-sm transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 400,
                  }}
                >
                  <span className="relative">
                    Inicio
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </Link>
                <Link
                  href="/sobre-nosotros"
                  className="group text-sm transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 400,
                  }}
                >
                  <span className="relative">
                    Nosotros
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </Link>
                <Link
                  href="/servicios"
                  className="group text-sm transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 400,
                  }}
                >
                  <span className="relative">
                    Servicios
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </Link>
                <Link
                  href="/areas-practica"
                  className="group text-sm transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 400,
                  }}
                >
                  <span className="relative">
                    Áreas de Práctica
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </Link>
                <Link
                  href="/contacto"
                  className="group text-sm transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 400,
                  }}
                >
                  <span className="relative">
                    Contacto
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </Link>
              </div>

              {/* Contacto */}
              <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
                <a
                  href="mailto:info@estudiopalomeque.com"
                  className="group text-sm transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 400,
                  }}
                >
                  <span className="relative">
                    info@estudiopalomeque.com
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </a>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  •
                </span>
                <a
                  href="tel:+541112345678"
                  className="group text-sm transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 400,
                  }}
                >
                  <span className="relative">
                    +54 11 1234-5678
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </a>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full max-w-md mx-auto mb-12"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              />

              {/* Bottom */}
              <div className="space-y-6">
                {/* Accreditation */}
                <div className="flex items-center justify-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  <span
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(255, 255, 255, 0.6)",
                      letterSpacing: "0.3em",
                    }}
                  >
                    Revisor Externo Independiente UIF
                  </span>
                </div>

                {/* Copyright y Legal */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(255, 255, 255, 0.4)",
                      fontWeight: 400,
                    }}
                  >
                    © {currentYear} Estudio Jurídico Palomeque & Asociados
                  </p>
                  <span
                    className="hidden sm:block text-xs"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    •
                  </span>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/aviso-legal"
                      className="text-[10px] uppercase tracking-[0.2em] transition-all duration-300 group"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.4)",
                        fontWeight: 400,
                        letterSpacing: "0.2em",
                      }}
                    >
                      <span className="relative">
                        Aviso Legal
                        <span
                          className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                        />
                      </span>
                    </Link>
                    <Link
                      href="/privacidad"
                      className="text-[10px] uppercase tracking-[0.2em] transition-all duration-300 group"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.4)",
                        fontWeight: 400,
                        letterSpacing: "0.2em",
                      }}
                    >
                      <span className="relative">
                        Privacidad
                        <span
                          className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicador de scroll up */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-70"
            style={{
              opacity: phaseProgress > 0.7 ? 1 : 0,
              transition: "opacity 0.3s ease-out",
            }}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-monument)", color: "#D4AF37" }}
              >
                Scroll Up
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 19V5M12 5L5 12M12 5L19 12"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

