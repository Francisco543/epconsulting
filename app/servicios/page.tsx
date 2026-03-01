import Link from "next/link";
import PageNav from "@/app/components/PageNav";
import FooterHero from "@/app/components/FooterHero";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Soluciones a medida: análisis de riesgo, políticas y procedimientos, capacitación y auditoría continua. Compliance y REI para instituciones financieras y sujetos obligados. MEP Consulting.",
  alternates: { canonical: `${SITE_URL}/servicios` },
  openGraph: {
    title: "Servicios | Soluciones de compliance a medida",
    description:
      "Análisis de riesgo, políticas PLA/FT, capacitación y auditoría. Revisor Externo Independiente acreditado UIF.",
  },
};

const SERVICIOS = [
  {
    id: "analisis",
    numero: "01",
    titulo: "Análisis de riesgo",
    descCorta:
      "Evaluación personalizada para identificar y priorizar riesgos de compliance en su organización.",
    descLarga:
      "Realizamos un diagnóstico integral de su estructura, procesos y exposición normativa para detectar brechas y priorizar acciones. Incluye mapeo de riesgos PLA/FT, evaluación de controles existentes y recomendaciones priorizadas con plazos y responsables.",
  },
  {
    id: "politicas",
    numero: "02",
    titulo: "Políticas y procedimientos",
    descCorta:
      "Diseño e implementación de marcos normativos adaptados a su sector y tamaño.",
    descLarga:
      "Elaboramos políticas de prevención de lavado de activos, manuales de cumplimiento y procedimientos operativos alineados con la normativa UIF y las mejores prácticas. Todo adaptado a su sector, tamaño y nivel de riesgo, con soporte para su aprobación e implementación interna.",
  },
  {
    id: "capacitacion",
    numero: "03",
    titulo: "Capacitación",
    descCorta:
      "Programas de formación para equipos y líderes en prevención de lavado de activos.",
    descLarga:
      "Cursos y talleres para equipos de cumplimiento, primera línea y alta dirección. Contenidos actualizados en normativa PLA/FT, alertas, reportes y cultura de compliance. Modalidad presencial o virtual, con material de apoyo y certificación.",
  },
  {
    id: "auditoria",
    numero: "04",
    titulo: "Auditoría continua",
    descCorta:
      "Revisión y mejora continua de sus procesos de cumplimiento normativo.",
    descLarga:
      "Como Revisor Externo Independiente acreditado ante la UIF, realizamos auditorías de cumplimiento, pruebas de controles y emisión de informes para sujetos obligados. Trabajamos en ciclos continuos para detectar desvíos a tiempo y fortalecer su programa de compliance.",
  },
];

export default function ServiciosPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a2e24" }}>
      <PageNav />

      {/* Hero */}
      <section
        className="relative w-full py-24 lg:py-32 border-b border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p
            className="text-[11px] uppercase tracking-[0.35em] mb-5"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.5)",
            }}
          >
            Servicios
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[0.95] max-w-3xl"
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#F5E6C8",
            }}
          >
            Soluciones <span style={{ color: "#D4AF37" }}>a medida</span>
          </h1>
          <div
            className="w-14 h-px mt-6 mb-6"
            style={{ backgroundColor: "rgba(212, 175, 55, 0.5)" }}
          />
          <p
            className="max-w-2xl text-base sm:text-lg"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.8)",
              lineHeight: 1.75,
            }}
          >
            Compliance, prevención de lavado de activos y revisión externa
            independiente. Diseñamos cada servicio según su sector, tamaño y
            objetivos.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section
        className="py-20 lg:py-24"
        style={{
          backgroundColor: "#f8f8f6",
          borderBottom: "1px solid rgba(26, 26, 26, 0.06)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-10">
            <h2
              className="text-2xl sm:text-3xl mb-6"
              style={{
                fontFamily: "var(--font-rhymes)",
                fontWeight: 600,
                color: "#1a1a1a",
              }}
            >
              Qué hacemos
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-8"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(26, 26, 26, 0.8)",
                lineHeight: 1.75,
              }}
            >
              Ofrecemos análisis de riesgo, diseño de políticas y
              procedimientos, capacitación y auditoría continua. Trabajamos con
              instituciones financieras y sujetos obligados para cumplir la
              normativa UIF y fortalecer la gestión de compliance.
            </p>
          </div>
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(26, 26, 26, 0.6)",
              letterSpacing: "0.02em",
            }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Análisis de riesgo
            </span>
            <span className="text-neutral-300">·</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Políticas y procedimientos
            </span>
            <span className="text-neutral-300">·</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Capacitación
            </span>
            <span className="text-neutral-300">·</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Auditoría continua
            </span>
          </div>
        </div>
      </section>

      {/* Listado de servicios con anchors */}
      {SERVICIOS.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className="relative py-20 lg:py-28 scroll-mt-24"
          style={{
            backgroundColor: i % 2 === 0 ? "#1a2e24" : "#f8f8f6",
            borderBottom:
              i % 2 === 0
                ? "1px solid #2a3d32"
                : "1px solid rgba(26, 26, 26, 0.06)",
          }}
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start ${
                i % 2 === 0 ? "lg:pl-8 lg:border-l lg:border-[#D4AF37]/20" : ""
              }`}
            >
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <div
                  className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight mb-6"
                  style={{
                    fontFamily: "var(--font-rhymes)",
                    color: "#D4AF37",
                    lineHeight: 0.9,
                  }}
                >
                  {s.numero}
                </div>
                <span
                  className="text-[10px] uppercase tracking-[0.3em] block mb-4"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color:
                      i % 2 === 0
                        ? "rgba(245, 230, 200, 0.45)"
                        : "rgba(26, 26, 26, 0.45)",
                  }}
                >
                  Servicio
                </span>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl leading-tight"
                  style={{
                    fontFamily: "var(--font-rhymes)",
                    fontWeight: 600,
                    color: i % 2 === 0 ? "#F5E6C8" : "#1a1a1a",
                  }}
                >
                  {s.titulo}
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-6 max-w-2xl">
                <p
                  className="text-lg sm:text-xl font-medium leading-snug"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color:
                      i % 2 === 0
                        ? "rgba(245, 230, 200, 0.95)"
                        : "rgba(26, 26, 26, 0.9)",
                    lineHeight: 1.55,
                  }}
                >
                  {s.descCorta}
                </p>
                <div
                  className="w-12 h-px shrink-0"
                  style={{
                    backgroundColor: i % 2 === 0 ? "rgba(212, 175, 55, 0.4)" : "rgba(26, 26, 26, 0.15)",
                  }}
                />
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color:
                      i % 2 === 0
                        ? "rgba(245, 230, 200, 0.75)"
                        : "rgba(26, 26, 26, 0.7)",
                    lineHeight: 1.8,
                  }}
                >
                  {s.descLarga}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        className="py-20 lg:py-28 border-t border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 text-center">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.45)",
            }}
          >
            Revisor Externo Independiente acreditado ante la UIF
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.5rem] mb-5 leading-tight"
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#F5E6C8",
            }}
          >
            ¿Hablamos de tu caso?
          </h2>
          <p
            className="text-base mb-12 max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.75)",
              lineHeight: 1.65,
            }}
          >
            Contanos tu necesidad y te proponemos un plan a medida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#D4AF37] rounded-sm transition-all duration-300 hover:bg-[#D4AF37]/10 w-full sm:w-auto"
              style={{
                fontFamily: "var(--font-monument)",
                color: "#D4AF37",
                fontSize: "13px",
                letterSpacing: "0.08em",
              }}
            >
              Solicitar consulta
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/areas-practica"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#2a3d32] rounded-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-[#1e3329] w-full sm:w-auto"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.85)",
                fontSize: "13px",
                letterSpacing: "0.08em",
              }}
            >
              Ver áreas de práctica
            </Link>
          </div>
        </div>
      </section>

      <FooterHero />
    </div>
  );
}
