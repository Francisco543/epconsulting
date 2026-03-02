"use client";

import { useRef } from "react";
import Navbar from "@/app/components/Navbar";
import FooterNew from "@/app/components/FooterNew";
import ScrollReveal from "@/components/ScrollReveal";

export default function CompliancePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={scrollContainerRef} className="min-h-screen bg-[#f8f8f6]">
        <main className="relative">
          {/* Hero Section - Normal, no fixed */}
          <section className="relative w-full h-screen bg-[#f8f8f6]">
            <Navbar />

            <div className="w-full h-full p-3 sm:p-4 lg:p-5">
              <div className="w-full h-full bg-[#1a1a1a] rounded-3xl overflow-hidden relative flex items-center justify-center">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl opacity-5"></div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-5xl px-6 sm:px-8 lg:px-12">
                  <p
                    className="text-[11px] uppercase tracking-[0.5em] mb-8"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(255, 255, 255, 0.4)",
                      letterSpacing: "0.5em",
                    }}
                  >
                    COMPLIANCE
                  </p>

                  <h1
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-10 leading-[0.95]"
                    style={{
                      fontFamily: "var(--font-rhymes)",
                      fontWeight: 300,
                      color: "#fff",
                    }}
                  >
                    Expertos en
                    <br />
                    <span style={{ color: "#D4AF37" }}>Compliance</span>
                  </h1>

                  <p
                    className="text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: 400,
                    }}
                  >
                    Más de 20 años transformando el cumplimiento normativo en
                    una ventaja competitiva.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Scroll Reveal Text Section */}
          <div className="py-40 bg-[#f8f8f6] relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Círculos grandes decorativos - más visibles */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "800px",
                  height: "800px",
                  top: "-300px",
                  left: "-300px",
                  background:
                    "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 50%, transparent 80%)",
                  filter: "blur(60px)",
                }}
              ></div>
              <div
                className="absolute rounded-full"
                style={{
                  width: "700px",
                  height: "700px",
                  bottom: "-250px",
                  right: "-250px",
                  background:
                    "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.03) 50%, transparent 80%)",
                  filter: "blur(70px)",
                }}
              ></div>
              <div
                className="absolute rounded-full"
                style={{
                  width: "400px",
                  height: "400px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(26, 26, 26, 0.04) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }}
              ></div>

              {/* Formas geométricas abstractas - más visibles */}
              <div
                className="absolute"
                style={{
                  width: "400px",
                  height: "400px",
                  top: "15%",
                  right: "5%",
                  background:
                    "linear-gradient(135deg, rgba(212, 175, 55, 0.06) 0%, rgba(212, 175, 55, 0.02) 50%, transparent 80%)",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  transform: "rotate(45deg)",
                  filter: "blur(20px)",
                }}
              ></div>
              <div
                className="absolute"
                style={{
                  width: "350px",
                  height: "350px",
                  bottom: "10%",
                  left: "5%",
                  background:
                    "linear-gradient(45deg, rgba(26, 26, 26, 0.05) 0%, rgba(26, 26, 26, 0.02) 50%, transparent 80%)",
                  borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%",
                  transform: "rotate(-25deg)",
                  filter: "blur(25px)",
                }}
              ></div>
              <div
                className="absolute"
                style={{
                  width: "300px",
                  height: "300px",
                  top: "60%",
                  right: "15%",
                  background:
                    "linear-gradient(225deg, rgba(212, 175, 55, 0.05) 0%, transparent 60%)",
                  clipPath:
                    "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                  transform: "rotate(20deg)",
                  filter: "blur(15px)",
                }}
              ></div>

              {/* Líneas decorativas - más visibles */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.08 }}
              >
                <defs>
                  <linearGradient
                    id="lineGradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="lineGradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,250 Q 300,150 600,250 T 1200,250"
                  stroke="url(#lineGradient1)"
                  strokeWidth="3"
                  fill="none"
                  style={{ transform: "translateY(25%)" }}
                />
                <path
                  d="M 100,450 Q 400,350 700,450 T 1300,450"
                  stroke="url(#lineGradient1)"
                  strokeWidth="2.5"
                  fill="none"
                  style={{ transform: "translateY(55%)" }}
                />
                <path
                  d="M 200,100 Q 500,50 800,100 T 1400,100"
                  stroke="url(#lineGradient2)"
                  strokeWidth="2"
                  fill="none"
                  style={{ transform: "translateY(10%)" }}
                />
              </svg>

              {/* Círculos pequeños decorativos adicionales */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "120px",
                  height: "120px",
                  top: "20%",
                  left: "15%",
                  background:
                    "radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.06) 50%, transparent 80%)",
                  filter: "blur(20px)",
                }}
              ></div>
              <div
                className="absolute rounded-full"
                style={{
                  width: "100px",
                  height: "100px",
                  bottom: "30%",
                  right: "20%",
                  background:
                    "radial-gradient(circle, rgba(26, 26, 26, 0.15) 0%, rgba(26, 26, 26, 0.05) 50%, transparent 80%)",
                  filter: "blur(18px)",
                }}
              ></div>
              <div
                className="absolute rounded-full"
                style={{
                  width: "140px",
                  height: "140px",
                  top: "65%",
                  left: "8%",
                  background:
                    "radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(212, 175, 55, 0.05) 50%, transparent 80%)",
                  filter: "blur(22px)",
                }}
              ></div>
              <div
                className="absolute rounded-full"
                style={{
                  width: "90px",
                  height: "90px",
                  top: "35%",
                  right: "25%",
                  background:
                    "radial-gradient(circle, rgba(212, 175, 55, 0.14) 0%, transparent 70%)",
                  filter: "blur(15px)",
                }}
              ></div>
              <div
                className="absolute rounded-full"
                style={{
                  width: "110px",
                  height: "110px",
                  bottom: "45%",
                  left: "20%",
                  background:
                    "radial-gradient(circle, rgba(26, 26, 26, 0.12) 0%, transparent 70%)",
                  filter: "blur(16px)",
                }}
              ></div>

              {/* Formas adicionales */}
              <div
                className="absolute"
                style={{
                  width: "200px",
                  height: "200px",
                  top: "30%",
                  left: "12%",
                  background:
                    "linear-gradient(45deg, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  transform: "rotate(-20deg)",
                  filter: "blur(15px)",
                }}
              ></div>
              <div
                className="absolute"
                style={{
                  width: "180px",
                  height: "180px",
                  bottom: "40%",
                  right: "15%",
                  background:
                    "linear-gradient(135deg, rgba(26, 26, 26, 0.1) 0%, transparent 70%)",
                  borderRadius: "50%",
                  filter: "blur(12px)",
                }}
              ></div>
            </div>

            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div
                  style={{
                    fontFamily: "var(--font-rhymes)",
                    fontWeight: 300,
                    color: "#1a1a1a",
                  }}
                >
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={1}
                    containerClassName="text-center"
                    textClassName="text-[150px] leading-[0.95]"
                  >
                    Transformamos el cumplimiento normativo en ventaja
                    competitiva
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>

          {/* Services/Features Section */}
          <section className="py-40 bg-[#f8f8f6] relative overflow-hidden">
            {/* Fondo decorativo ultra minimalista */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 175, 55, 0.015) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(26, 26, 26, 0.01) 0%, transparent 50%)",
                }}
              ></div>
            </div>

            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
              {/* Section Header - Más refinado */}
              <div className="text-center mb-24">
                <div className="inline-flex items-center gap-2 mb-8">
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "#D4AF37" }}
                  ></div>
                  <p
                    className="text-[10px] uppercase tracking-[0.4em]"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(26, 26, 26, 0.35)",
                      letterSpacing: "0.4em",
                      fontWeight: 500,
                    }}
                  >
                    NUESTROS SERVICIOS
                  </p>
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "#D4AF37" }}
                  ></div>
                </div>
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-[0.92] tracking-tight"
                  style={{
                    fontFamily: "var(--font-rhymes)",
                    fontWeight: 300,
                    color: "#1a1a1a",
                  }}
                >
                  Soluciones
                  <br />
                  <span style={{ color: "#D4AF37" }}>Integrales</span>
                </h2>
              </div>

              {/* Services Grid - Diseño premium */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: "Asesoramiento Estratégico",
                    description:
                      "Estrategias personalizadas para optimizar sus procesos de compliance y gestión de riesgos.",
                  },
                  {
                    title: "Auditoría y Revisión",
                    description:
                      "Evaluaciones exhaustivas para detectar áreas de mejora y garantizar el cumplimiento normativo.",
                  },
                  {
                    title: "Capacitación Especializada",
                    description:
                      "Programas de formación en Prevención de Lavado de Activos y Financiación del Terrorismo.",
                  },
                  {
                    title: "Políticas y Procedimientos",
                    description:
                      "Desarrollo e implementación de políticas de compliance adaptadas a su organización.",
                  },
                  {
                    title: "Revisor Externo Independiente",
                    description:
                      "Servicios de REI acreditados ante la UIF para sujetos obligados.",
                  },
                  {
                    title: "Gestión de Riesgos",
                    description:
                      "Identificación, evaluación y mitigación de riesgos de compliance y operacionales.",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden"
                    style={{
                      borderRadius: "24px",
                    }}
                  >
                    {/* Fondo principal con glassmorphism mejorado */}
                    <div
                      className="relative h-full p-10 transition-all duration-700 ease-out"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
                        backdropFilter: "blur(30px) saturate(180%)",
                        WebkitBackdropFilter: "blur(30px) saturate(180%)",
                        border: "1px solid rgba(26, 26, 26, 0.04)",
                        boxShadow:
                          "0 2px 8px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(212, 175, 55, 0.15)";
                        e.currentTarget.style.boxShadow =
                          "0 24px 48px rgba(0, 0, 0, 0.06), 0 12px 24px rgba(212, 175, 55, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)";
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(26, 26, 26, 0.04)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.9)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Overlay dorado sutil al hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(212, 175, 55, 0.02) 0%, rgba(212, 175, 55, 0.01) 50%, transparent 100%)",
                          borderRadius: "24px",
                        }}
                      ></div>

                      {/* Número decorativo ultra sutil */}
                      <div
                        className="absolute top-8 right-8 text-6xl opacity-[0.02] group-hover:opacity-[0.04] transition-all duration-700"
                        style={{
                          fontFamily: "var(--font-rhymes)",
                          fontWeight: 300,
                          color: "#1a1a1a",
                          lineHeight: 1,
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Contenido */}
                      <div className="relative z-10">
                        <h3
                          className="text-2xl mb-5 leading-tight transition-all duration-500"
                          style={{
                            fontFamily: "var(--font-rhymes)",
                            fontWeight: 300,
                            color: "#1a1a1a",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#D4AF37";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#1a1a1a";
                          }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="text-[14px] leading-relaxed"
                          style={{
                            fontFamily: "var(--font-monument)",
                            color: "rgba(26, 26, 26, 0.6)",
                            fontWeight: 400,
                            lineHeight: "1.75",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {service.description}
                        </p>
                      </div>

                      {/* Línea decorativa dorada elegante */}
                      <div
                        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
                        style={{
                          width: "0%",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.width = "40%";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.width = "0%";
                        }}
                      ></div>

                      {/* Punto dorado decorativo */}
                      <div
                        className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"
                        style={{
                          backgroundColor: "#D4AF37",
                          transform: "scale(0)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(0)";
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="relative bg-[#f8f8f6]">
            {/* Stats Section */}
            <div className="py-32 bg-[#1a1a1a]">
              <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="text-center">
                    <div
                      className="text-7xl sm:text-8xl mb-6"
                      style={{
                        fontFamily: "var(--font-rhymes)",
                        fontWeight: 300,
                        color: "#D4AF37",
                        lineHeight: 1,
                      }}
                    >
                      20+
                    </div>
                    <p
                      className="text-[11px] uppercase tracking-[0.3em] mb-3"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.5)",
                        letterSpacing: "0.3em",
                      }}
                    >
                      Años
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      de experiencia
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="text-7xl sm:text-8xl mb-6"
                      style={{
                        fontFamily: "var(--font-rhymes)",
                        fontWeight: 300,
                        color: "#D4AF37",
                        lineHeight: 1,
                      }}
                    >
                      REI
                    </div>
                    <p
                      className="text-[11px] uppercase tracking-[0.3em] mb-3"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.5)",
                        letterSpacing: "0.3em",
                      }}
                    >
                      UIF
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      Acreditado
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="text-7xl sm:text-8xl mb-6"
                      style={{
                        fontFamily: "var(--font-rhymes)",
                        fontWeight: 300,
                        color: "#D4AF37",
                        lineHeight: 1,
                      }}
                    >
                      100+
                    </div>
                    <p
                      className="text-[11px] uppercase tracking-[0.3em] mb-3"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.5)",
                        letterSpacing: "0.3em",
                      }}
                    >
                      Clientes
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      satisfechos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <FooterNew />
      </div>
    </>
  );
}
