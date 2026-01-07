"use client";

import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";

interface AboutSectionHeroProps {
  clipRadius: number;
  opacity: number;
  phaseProgress: number;
}

export default function AboutSectionHero({
  clipRadius,
  opacity,
  phaseProgress,
}: AboutSectionHeroProps) {
  return (
    <section
      className="fixed top-0 left-0 w-full h-screen z-40 will-change-transform"
      style={{
        clipPath: `circle(${clipRadius}% at 60px calc(100% - 60px))`,
        pointerEvents: phaseProgress > 0.5 ? "auto" : "none",
      }}
    >
      <div className="w-full h-full bg-[#f8f8f6] p-3 sm:p-4 lg:p-5">
        <div
          className="w-full h-full bg-[#D4AF37] relative overflow-hidden"
          style={{ borderRadius: "24px" }}
        >
          {/* Imagen en el bottom derecho */}
          <div
            className="absolute right-3 sm:right-4 lg:right-5 bottom-0 w-48 sm:w-56 lg:w-72"
            style={{ zIndex: 10 }}
          >
            <div className="relative aspect-3/4">
              <Image
                src="/drpalomeque.png"
                alt="Dra. María Eugenia Palomeque"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Contenido principal */}
          <div className="relative h-full flex items-center">
            <div
              className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16"
              style={{
                opacity: opacity,
                transform: `translateY(${
                  opacity < 1 ? (1 - opacity) * 30 : 0
                }px)`,
              }}
            >
              <div className="max-w-2xl mx-auto text-center lg:text-left">
                {/* PreTitle */}
                <p
                  className="text-[11px] uppercase tracking-[0.5em] mb-6"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "#1a1a1a",
                    opacity: 0.4,
                    letterSpacing: "0.5em",
                  }}
                >
                  LIDERAZGO
                </p>

                {/* Título */}
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-[0.95]"
                  style={{
                    fontFamily: "var(--font-rhymes)",
                    fontWeight: 300,
                    color: "#1a1a1a",
                  }}
                >
                  Dra. María Eugenia
                  <br />
                  <span style={{ color: "#fff" }}>Palomeque</span>
                </h2>

                {/* Subtítulo */}
                <p
                  className="text-base sm:text-lg mb-8"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(26, 26, 26, 0.65)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  Abogada Principal · REI Acreditado UIF
                </p>

                {/* Descripción */}
                <p
                  className="text-base sm:text-lg leading-[1.7] mb-10"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(26, 26, 26, 0.8)",
                    fontWeight: 400,
                  }}
                >
                  Con más de 20 años de experiencia en compliance y prevención
                  de lavado de activos, lidera nuestro estudio jurídico
                  transformando el cumplimiento normativo en ventaja
                  competitiva. Su trayectoria incluye posiciones de liderazgo en
                  importantes instituciones financieras, donde se desempeñó como
                  Chief Compliance Officer. Es Revisor Externo Independiente
                  habilitado por la UIF.
                </p>

                {/* Stats */}
                <div className="flex items-baseline gap-10 mb-10">
                  <div>
                    <p
                      className="text-5xl sm:text-6xl font-light mb-2"
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
                        delay={0.3}
                        startWhen={opacity > 0.5}
                        onStart={undefined}
                        onEnd={undefined}
                      />
                      +
                    </p>
                    <p
                      className="text-[11px] uppercase tracking-[0.2em]"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(26, 26, 26, 0.5)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      Años
                    </p>
                  </div>
                  <div
                    className="h-10 w-px self-stretch"
                    style={{
                      backgroundColor: "rgba(26, 26, 26, 0.12)",
                    }}
                  />
                  <div>
                    <p
                      className="text-5xl sm:text-6xl font-light mb-2"
                      style={{
                        fontFamily: "var(--font-rhymes)",
                        color: "#1a1a1a",
                        lineHeight: 1,
                      }}
                    >
                      REI
                    </p>
                    <p
                      className="text-[11px] uppercase tracking-[0.2em]"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(26, 26, 26, 0.5)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      UIF
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/sobre-nosotros"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "#1a1a1a",
                    letterSpacing: "0.25em",
                    fontWeight: 500,
                  }}
                >
                  <span className="relative">
                    Conocer más
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#1a1a1a] transition-all duration-300 group-hover:w-full"
                      style={{ opacity: 0.3 }}
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
      </div>
    </section>
  );
}
