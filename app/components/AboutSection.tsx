"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-24 lg:py-32 bg-[#f8f8f6] overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <div
              className={`relative aspect-[4/5] rounded-3xl overflow-hidden transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                boxShadow: "0 20px 60px rgba(26, 26, 26, 0.15)",
              }}
            >
              <Image
                src="/drpalomeque.png"
                alt="Dra. María Eugenia Palomeque"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            {/* Decorative accent dorado */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p
                className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-6"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#D4AF37",
                }}
              >
                LIDERAZGO
              </p>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 lg:mb-8 leading-[0.95]"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 300,
                  color: "#1a1a1a",
                }}
              >
                Dra. María Eugenia
                <br />
                <span style={{ color: "#D4AF37" }}>Palomeque</span>
              </h2>

              <div className="mb-8">
                <p
                  className="text-base sm:text-lg lg:text-xl mb-4"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "#1a1a1a",
                    fontWeight: 500,
                  }}
                >
                  Abogada Principal | REI Acreditado UIF
                </p>
                <div
                  className="h-[2px] w-20"
                  style={{
                    background:
                      "linear-gradient(to right, #D4AF37, transparent)",
                  }}
                />
              </div>

              <div
                className={`space-y-6 mb-10 transition-all duration-700 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(26, 26, 26, 0.8)",
                  }}
                >
                  Lidera nuestro estudio jurídico con más de{" "}
                  <strong style={{ color: "#1a1a1a" }}>
                    15 años de experiencia
                  </strong>{" "}
                  en compliance y prevención de lavado de activos. Actualmente
                  se desempeña como{" "}
                  <strong style={{ color: "#1a1a1a" }}>
                    Chief Compliance Officer
                  </strong>{" "}
                  en Mega QM SA y es{" "}
                  <strong style={{ color: "#1a1a1a" }}>
                    Revisor Externo Independiente
                  </strong>{" "}
                  habilitado por la UIF.
                </p>
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(26, 26, 26, 0.8)",
                  }}
                >
                  Su experiencia en importantes instituciones financieras y su
                  constante actualización en normativas vigentes le permiten
                  brindar asesoramiento estratégico de excelencia, diseñando
                  soluciones personalizadas que protegen y fortalecen las
                  operaciones de nuestros clientes.
                </p>
              </div>

              {/* Credentials */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 transition-all duration-700 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div
                  className="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.05)",
                    borderColor: "rgba(212, 175, 55, 0.2)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#D4AF37" }}
                    >
                      <svg
                        className="w-6 h-6"
                        style={{ color: "#1a1a1a" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{
                          fontFamily: "var(--font-monument)",
                          color: "#1a1a1a",
                        }}
                      >
                        REI Acreditado
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: "var(--font-monument)",
                          color: "rgba(26, 26, 26, 0.6)",
                        }}
                      >
                        UIF
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.05)",
                    borderColor: "rgba(212, 175, 55, 0.2)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#D4AF37" }}
                    >
                      <svg
                        className="w-6 h-6"
                        style={{ color: "#1a1a1a" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{
                          fontFamily: "var(--font-monument)",
                          color: "#1a1a1a",
                        }}
                      >
                        15+ Años
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: "var(--font-monument)",
                          color: "rgba(26, 26, 26, 0.6)",
                        }}
                      >
                        Experiencia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div
                className={`transition-all duration-700 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Link
                  href="/sobre-nosotros"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "#1a1a1a",
                    backgroundColor: "#D4AF37",
                  }}
                >
                  <span>Conocer más sobre nosotros</span>
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
