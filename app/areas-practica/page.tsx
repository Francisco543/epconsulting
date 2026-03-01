import Link from "next/link";
import PageNav from "@/app/components/PageNav";
import FooterHero from "@/app/components/FooterHero";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Áreas de práctica",
  description:
    "Expertise en diseño de procesos, REI, capacitación, auditoría, comités de compliance y asistencia ante reguladores. Servicios integrales de PLA/FT y cumplimiento normativo.",
  alternates: { canonical: `${SITE_URL}/areas-practica` },
  openGraph: {
    title: "Áreas de práctica | Expertise en compliance",
    description:
      "Diseño de procesos, REI UIF, capacitación, auditoría, comités y requerimientos regulatorios.",
  },
};

const AREAS = [
  {
    id: "1",
    number: "01",
    title: "Diseño de Procesos",
    description:
      "Elaboración y adecuación de políticas y procedimientos para su implementación y cumplimiento normativo. Manuales. Códigos. Lineamientos.",
  },
  {
    id: "2",
    number: "02",
    title: "REI",
    description:
      "Revisor Externo Independiente ante la UIF. Emisión y presentación de informes de revisión externa independiente para sujetos obligados.",
  },
  {
    id: "3",
    number: "03",
    title: "Capacitación",
    description:
      "Diseño y elaboración de programas de capacitación para los distintos niveles de recursos humanos.",
  },
  {
    id: "4",
    number: "04",
    title: "Auditoría",
    description:
      "Control interno global de identificación, evaluación, mitigación y monitoreo de riesgos de LA/FT. Revisión integral y mejoras.",
  },
  {
    id: "5",
    number: "05",
    title: "Comité",
    description:
      "Participación en Comité de Compliance o PLA&FT. Redacción de minutas. Seguimiento de temas tratados.",
  },
  {
    id: "6",
    number: "06",
    title: "Requerimientos",
    description:
      "Asistencia en requerimientos o procesos de supervisión de organismos de control y reguladores.",
  },
];

export default function AreasPracticaPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a2e24" }}>
      <PageNav />

      {/* Hero */}
      <section
        className="relative w-full py-20 lg:py-28 border-b border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p
            className="text-[11px] uppercase tracking-[0.35em] mb-4"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.5)",
            }}
          >
            Expertise
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[0.95] max-w-3xl"
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#F5E6C8",
            }}
          >
            Áreas de <span style={{ color: "#D4AF37" }}>práctica</span>
          </h1>
          <div
            className="w-12 h-px my-6"
            style={{ backgroundColor: "#D4AF37" }}
          />
          <p
            className="text-base sm:text-lg max-w-2xl"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.75)",
              lineHeight: 1.7,
            }}
          >
            Servicios integrales de compliance: diseño de procesos, REI, capacitación, auditoría, comités y asistencia ante reguladores.
          </p>
          <p
            className="mt-4 text-sm"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.45)",
              letterSpacing: "0.02em",
            }}
          >
            Metodología probada en cada área · Acompañamos en una o varias líneas según su necesidad
          </p>
        </div>
      </section>

      {/* Intro */}
      <section
        className="py-16 lg:py-20"
        style={{
          backgroundColor: "#f8f8f6",
          borderBottom: "1px solid rgba(26, 26, 26, 0.06)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div
            className="max-w-3xl py-8 px-6 sm:px-10 rounded-[38% 62% 55% 45% / 52% 40% 60% 48%] border border-neutral-200/80 bg-white/70 shadow-sm"
            style={{ boxShadow: "0 4px 24px -4px rgba(26, 26, 26, 0.08)" }}
          >
            <h2
              className="text-2xl sm:text-3xl mb-6"
              style={{
                fontFamily: "var(--font-rhymes)",
                fontWeight: 600,
                color: "#1a1a1a",
              }}
            >
              Soluciones especializadas
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(26, 26, 26, 0.8)",
                lineHeight: 1.75,
              }}
            >
              Trabajamos en cada área con metodología probada y enfoque en cumplimiento normativo PLA/FT. Podemos acompañarlos en una o varias líneas según su necesidad.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de áreas */}
      <section
        className="py-16 lg:py-24 border-t border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.map((area) => (
              <Link
                key={area.id}
                href={`/areas-practica/${area.id}`}
                className="group flex flex-col justify-between p-8 lg:p-10 min-h-[280px] rounded-2xl border border-[#2a3d32] bg-[#1a2e24] hover:bg-[#1e3329] hover:border-[#D4AF37]/40 hover:-translate-y-0.5 transition-all duration-300 ease-out"
              >
                <div>
                  <span
                    className="inline-block text-[11px] uppercase tracking-[0.25em] mb-5 transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(245, 230, 200, 0.45)",
                    }}
                  >
                    {area.number}
                  </span>
                  <h3
                    className="text-xl lg:text-2xl mb-4 leading-tight transition-colors duration-300 group-hover:text-[#D4AF37]"
                    style={{
                      fontFamily: "var(--font-rhymes)",
                      color: "rgba(245, 230, 200, 0.9)",
                      fontWeight: 500,
                    }}
                  >
                    {area.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed line-clamp-3"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(245, 230, 200, 0.6)",
                      lineHeight: 1.7,
                    }}
                  >
                    {area.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <span
                    className="text-[11px] uppercase tracking-[0.2em] transition-all duration-300 group-hover:text-[#D4AF37]"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(245, 230, 200, 0.65)",
                    }}
                  >
                    Ver más
                  </span>
                  <span
                    className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5"
                    style={{ fontFamily: "var(--font-monument)" }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
          <div
            className="w-full max-w-2xl mx-auto py-16 lg:py-20 px-8 sm:px-12 text-center"
            style={{
              backgroundColor: "#1e3329",
              border: "1px solid #2a3d32",
              boxShadow: "0 25px 60px -20px rgba(26, 46, 36, 0.35)",
              borderRadius: "42% 58% 55% 45% / 52% 38% 62% 48%",
            }}
          >
            <h2
              className="text-2xl sm:text-3xl mb-4"
              style={{
                fontFamily: "var(--font-rhymes)",
                fontWeight: 600,
                color: "#F5E6C8",
              }}
            >
              ¿Hablamos de tu caso?
            </h2>
            <p
              className="text-sm sm:text-base mb-10 max-w-md mx-auto"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.75)",
              }}
            >
              Contanos en qué área necesitás apoyo y te proponemos un plan.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] rounded-sm transition-all duration-300 hover:bg-[#D4AF37]/10"
              style={{
                fontFamily: "var(--font-monument)",
                color: "#D4AF37",
                fontSize: "13px",
                letterSpacing: "0.08em",
              }}
            >
              Contacto
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterHero />
    </div>
  );
}
