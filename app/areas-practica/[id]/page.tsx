"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageNav from "@/app/components/PageNav";
import FooterHero from "@/app/components/FooterHero";

const AREA_IDS = ["1", "2", "3", "4", "5", "6"];

const practiceAreasData: Record<
  string,
  {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    fullDescription: string;
    number: string;
    icon: React.ReactNode;
    services: string[];
    benefits: string[];
  }
> = {
  "1": {
    id: "1",
    title: "Diseño de Procesos",
    shortTitle: "Diseño",
    number: "01",
    description:
      "Elaboración y Adecuación de Políticas y Procedimientos para su Implementación y Cumplimiento Normativo.",
    fullDescription:
      "Nuestro equipo especializado desarrolla políticas y procedimientos personalizados que se adaptan perfectamente a las necesidades específicas de su organización. Trabajamos en la elaboración de manuales, códigos y lineamientos que aseguran el cumplimiento normativo y optimizan los procesos internos de compliance.",
    icon: (
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    services: [
      "Elaboración de Políticas y Procedimientos",
      "Adecuación de Manuales de Compliance",
      "Desarrollo de Códigos de Conducta",
      "Lineamientos para Sujetos Obligados",
      "Documentación de Procesos Internos",
      "Actualización Normativa Continua",
    ],
    benefits: [
      "Cumplimiento normativo garantizado",
      "Procesos optimizados y eficientes",
      "Documentación clara y accesible",
      "Reducción de riesgos operativos",
    ],
  },
  "2": {
    id: "2",
    title: "REI",
    shortTitle: "REI",
    number: "02",
    description:
      "Revisor Externo Independiente: Unidad de Información Financiera (UIF).",
    fullDescription:
      "Como Revisor Externo Independiente acreditado ante la UIF, brindamos servicios de revisión externa independiente para sujetos obligados. Emitimos y presentamos informes especializados que evalúan el cumplimiento normativo en materia de prevención de lavado de activos y financiación del terrorismo, asegurando la transparencia y el cumplimiento regulatorio.",
    icon: (
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    services: [
      "Revisión Externa Independiente",
      "Emisión de Informes REI ante UIF",
      "Evaluación de Cumplimiento Normativo",
      "Análisis de Procesos PLA&FT",
      "Recomendaciones de Mejora",
      "Seguimiento y Monitoreo Continuo",
    ],
    benefits: [
      "Acreditación UIF garantizada",
      "Informes profesionales y detallados",
      "Cumplimiento regulatorio asegurado",
      "Identificación proactiva de riesgos",
    ],
  },
  "3": {
    id: "3",
    title: "Capacitación",
    shortTitle: "Capacitación",
    number: "03",
    description:
      "Diseño y Elaboración de Programas de Capacitación para los distintos niveles de recursos humanos.",
    fullDescription:
      "Desarrollamos programas de capacitación especializados y personalizados para todos los niveles de su organización. Nuestros programas están diseñados para fortalecer las competencias en compliance, prevención de lavado de activos y gestión de riesgos, asegurando que su equipo esté preparado para enfrentar los desafíos regulatorios actuales.",
    icon: (
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    services: [
      "Programas de Capacitación Personalizados",
      "Capacitación para Ejecutivos",
      "Capacitación para Personal Operativo",
      "Talleres Especializados",
      "Material Didáctico Actualizado",
      "Seguimiento y Evaluación",
    ],
    benefits: [
      "Equipos altamente capacitados",
      "Conocimiento actualizado normativo",
      "Cultura de compliance fortalecida",
      "Reducción de errores operativos",
    ],
  },
  "4": {
    id: "4",
    title: "Auditoría",
    shortTitle: "Auditoría",
    number: "04",
    description:
      "Control interno global de identificación, evaluación, mitigación y monitoreo de Riesgos de LA/FT.",
    fullDescription:
      "Realizamos auditorías exhaustivas y especializadas para identificar, evaluar y mitigar riesgos de lavado de activos y financiación del terrorismo. Nuestro enfoque integral permite detectar deficiencias, proponer mejoras y establecer controles efectivos que protegen su organización y aseguran el cumplimiento normativo.",
    icon: (
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    services: [
      "Auditorías de Cumplimiento Normativo",
      "Evaluación de Riesgos LA/FT",
      "Revisión de Controles Internos",
      "Identificación de Brechas",
      "Plan de Acción Correctiva",
      "Monitoreo Continuo",
    ],
    benefits: [
      "Identificación temprana de riesgos",
      "Mejora continua de procesos",
      "Cumplimiento normativo verificado",
      "Optimización de controles internos",
    ],
  },
  "5": {
    id: "5",
    title: "Comité",
    shortTitle: "Comité",
    number: "05",
    description:
      "Participación en Comité de Compliance o PLA&FT. Redacción de Minutas. Seguimiento de temas tratados.",
    fullDescription:
      "Ofrecemos participación experta en Comités de Compliance y PLA&FT, proporcionando asesoramiento estratégico, redacción profesional de minutas y seguimiento exhaustivo de los temas tratados. Nuestro acompañamiento asegura que los comités funcionen de manera efectiva y cumplan con sus responsabilidades regulatorias.",
    icon: (
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    services: [
      "Participación en Comités de Compliance",
      "Asesoramiento Estratégico",
      "Redacción de Minutas Profesionales",
      "Seguimiento de Acuerdos",
      "Preparación de Agendas",
      "Análisis de Tendencias Regulatorias",
    ],
    benefits: [
      "Comités eficientes y productivos",
      "Documentación profesional",
      "Seguimiento sistemático",
      "Decisiones informadas",
    ],
  },
  "6": {
    id: "6",
    title: "Requerimientos",
    shortTitle: "Requerimientos",
    number: "06",
    description:
      "Asistencia en Requerimientos o Procesos de Supervisión de Organismos de Control/Reguladores.",
    fullDescription:
      "Brindamos asistencia especializada en la atención de requerimientos y procesos de supervisión de organismos de control y reguladores. Nuestro equipo experto le ayuda a preparar respuestas completas, documentación adecuada y estrategias efectivas para gestionar procesos de supervisión de manera exitosa.",
    icon: (
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    services: [
      "Asistencia en Requerimientos Regulatorios",
      "Preparación de Respuestas",
      "Gestión de Procesos de Supervisión",
      "Documentación Completa",
      "Estrategias de Cumplimiento",
      "Representación ante Organismos",
    ],
    benefits: [
      "Respuestas profesionales y completas",
      "Cumplimiento de plazos",
      "Reducción de riesgos regulatorios",
      "Gestión eficiente de procesos",
    ],
  },
};

export default function PracticeAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const area = practiceAreasData[id];
  const currentIndex = AREA_IDS.indexOf(id);
  const prevId = currentIndex > 0 ? AREA_IDS[currentIndex - 1] : null;
  const nextId = currentIndex >= 0 && currentIndex < AREA_IDS.length - 1 ? AREA_IDS[currentIndex + 1] : null;
  const prevArea = prevId ? practiceAreasData[prevId] : null;
  const nextArea = nextId ? practiceAreasData[nextId] : null;

  const [heroVisible, setHeroVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [benefitsVisible, setBenefitsVisible] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === servicesRef.current) setServicesVisible(entry.isIntersecting);
          if (entry.target === benefitsRef.current) setBenefitsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (benefitsRef.current) observer.observe(benefitsRef.current);
    return () => observer.disconnect();
  }, [id]);

  if (!area) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#1a2e24" }}>
        <PageNav />
        <div className="flex items-center justify-center min-h-[60vh] px-6">
          <div className="text-center">
            <h1
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-rhymes)",
                color: "#F5E6C8",
              }}
            >
              Área no encontrada
            </h1>
            <Link
              href="/areas-practica"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90"
              style={{
                fontFamily: "var(--font-monument)",
                color: "#D4AF37",
              }}
            >
              ← Volver a áreas de práctica
            </Link>
          </div>
        </div>
        <FooterHero />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a2e24" }}>
      <PageNav />

      {/* Hero — full viewport, número gigante, scroll cue */}
      <section
        className="relative min-h-screen flex flex-col justify-between overflow-hidden border-b border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        {/* Número gigante de fondo */}
        <div
          className="absolute inset-0 flex items-center justify-end pr-0 lg:pr-[10%] pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="text-[28vw] lg:text-[22rem] font-light leading-[0.85] tabular-nums transition-all duration-1000 ease-out"
            style={{
              fontFamily: "var(--font-rhymes)",
              color: "#D4AF37",
              opacity: heroVisible ? 0.07 : 0,
            }}
          >
            {area.number}
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 lg:pt-12 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div
              className={`lg:col-span-5 transition-all duration-1000 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p
                className="text-[11px] uppercase tracking-[0.38em] mb-6"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.45)",
                }}
              >
                Área de práctica
              </p>
              <div
                className="text-[4rem] sm:text-[5rem] lg:text-[6.5rem] font-light tabular-nums mb-8"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  color: "#D4AF37",
                  lineHeight: 0.9,
                }}
              >
                {area.number}
              </div>
              <div className="inline-flex p-5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37]">
                {area.icon as React.ReactNode}
              </div>
            </div>
            <div
              className={`lg:col-span-7 lg:pl-8 transition-all duration-1000 ease-out delay-150 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] 2xl:text-[4.5rem] leading-[0.92] mb-8"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#F5E6C8",
                  letterSpacing: "-0.02em",
                }}
              >
                {area.title}
              </h1>
              <div
                className="w-16 h-0.5 mb-8"
                style={{ backgroundColor: "#D4AF37" }}
              />
              <p
                className="text-lg sm:text-xl lg:text-2xl max-w-2xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.88)",
                  lineHeight: 1.65,
                }}
              >
                {area.fullDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className={`relative z-10 flex flex-col items-center pb-10 transition-all duration-700 delay-700 ${
            heroVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="text-[10px] uppercase tracking-[0.3em] mb-3"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.4)",
            }}
          >
            Scroll
          </span>
          <div
            className="w-px h-12 rounded-full"
            style={{
              background: "linear-gradient(to bottom, rgba(212, 175, 55, 0.6), transparent)",
            }}
          />
        </div>
      </section>

      {/* Servicios — editorial, numerado, scroll reveal */}
      <section
        ref={servicesRef}
        className="py-24 lg:py-36"
        style={{
          backgroundColor: "#f8f8f6",
          borderBottom: "1px solid rgba(26, 26, 26, 0.06)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div
            className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20 transition-all duration-700 ease-out ${
              servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-baseline gap-6">
              <span
                className="text-6xl lg:text-7xl font-light tabular-nums"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  color: "#D4AF37",
                  lineHeight: 1,
                }}
              >
                01
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  letterSpacing: "-0.02em",
                }}
              >
                Nuestros servicios
              </h2>
            </div>
            <p
              className="text-base sm:text-lg max-w-md"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(26, 26, 26, 0.65)",
                lineHeight: 1.6,
              }}
            >
              Alcance concreto de esta área de práctica.
            </p>
          </div>

          <ul className="space-y-0">
            {area.services.map((service, index) => (
              <li
                key={index}
                className={`group border-b border-neutral-200/80 transition-all duration-500 ease-out ${
                  servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-6 sm:py-8 hover:bg-white/60 transition-colors duration-300">
                  <span
                    className="shrink-0 text-2xl sm:text-3xl font-light tabular-nums w-12"
                    style={{
                      fontFamily: "var(--font-rhymes)",
                      color: "rgba(26, 26, 26, 0.35)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="text-lg sm:text-xl lg:text-2xl font-medium leading-snug group-hover:text-[#1a2e24] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(26, 26, 26, 0.88)",
                    }}
                  >
                    {service}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Beneficios — impacto, scroll reveal */}
      <section
        ref={benefitsRef}
        className="py-24 lg:py-36 border-t border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div
            className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20 transition-all duration-700 ease-out ${
              benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-baseline gap-6">
              <span
                className="text-6xl lg:text-7xl font-light tabular-nums"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  color: "#D4AF37",
                  lineHeight: 1,
                }}
              >
                02
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#F5E6C8",
                  letterSpacing: "-0.02em",
                }}
              >
                Beneficios clave
              </h2>
            </div>
            <p
              className="text-base sm:text-lg max-w-md"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.6)",
                lineHeight: 1.6,
              }}
            >
              Lo que su organización obtiene con nuestro acompañamiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {area.benefits.map((benefit, index) => (
              <div
                key={index}
                className={`group flex items-start gap-6 p-8 lg:p-10 rounded-2xl border border-[#2a3d32] bg-[#1e3329]/40 hover:bg-[#1e3329] hover:border-[#D4AF37]/50 transition-all duration-500 ease-out hover:-translate-y-1 ${
                  benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1a2e24] transition-all duration-300">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p
                  className="text-lg sm:text-xl font-medium leading-snug pt-1"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(245, 230, 200, 0.95)",
                  }}
                >
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navegación prev/next área */}
      <section
        className="py-12 lg:py-16 border-t border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
            {prevArea ? (
              <Link
                href={`/areas-practica/${prevId}`}
                className="group flex items-center gap-4 py-4 sm:py-0 text-left transition-opacity hover:opacity-90"
              >
                <span
                  className="text-[#D4AF37] transition-transform duration-300 group-hover:-translate-x-1"
                  style={{ fontFamily: "var(--font-monument)" }}
                >
                  ←
                </span>
                <div>
                  <span
                    className="block text-[10px] uppercase tracking-[0.25em] mb-1"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(245, 230, 200, 0.45)",
                    }}
                  >
                    Área anterior
                  </span>
                  <span
                    className="text-lg font-medium"
                    style={{
                      fontFamily: "var(--font-rhymes)",
                      color: "#F5E6C8",
                    }}
                  >
                    {prevArea.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            <Link
              href="/areas-practica"
              className="text-center sm:absolute left-1/2 sm:-translate-x-1/2 text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-[#D4AF37]"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.5)",
              }}
            >
              Todas las áreas
            </Link>
            {nextArea ? (
              <Link
                href={`/areas-practica/${nextId}`}
                className="group flex items-center gap-4 py-4 sm:py-0 justify-end sm:justify-start sm:flex-row-reverse text-right sm:text-left transition-opacity hover:opacity-90"
              >
                <span
                  className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1"
                  style={{ fontFamily: "var(--font-monument)" }}
                >
                  →
                </span>
                <div>
                  <span
                    className="block text-[10px] uppercase tracking-[0.25em] mb-1"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(245, 230, 200, 0.45)",
                    }}
                  >
                    Siguiente área
                  </span>
                  <span
                    className="text-lg font-medium"
                    style={{
                      fontFamily: "var(--font-rhymes)",
                      color: "#F5E6C8",
                    }}
                  >
                    {nextArea.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA — blob premium */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
          <div
            className="w-full max-w-2xl mx-auto py-20 lg:py-24 px-8 sm:px-14 text-center"
            style={{
              backgroundColor: "#1e3329",
              border: "1px solid #2a3d32",
              boxShadow: "0 30px 70px -24px rgba(26, 46, 36, 0.4)",
              borderRadius: "42% 58% 55% 45% / 52% 38% 62% 48%",
            }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.3em] mb-4"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.5)",
              }}
            >
              Siguiente paso
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] mb-4 leading-tight"
              style={{
                fontFamily: "var(--font-rhymes)",
                fontWeight: 600,
                color: "#F5E6C8",
                letterSpacing: "-0.02em",
              }}
            >
              ¿Listo para comenzar?
            </h2>
            <p
              className="text-base sm:text-lg mb-10 max-w-md mx-auto"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.78)",
                lineHeight: 1.6,
              }}
            >
              Contáctenos para conocer cómo podemos ayudarle con {area.title}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#D4AF37] rounded-sm transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#1a2e24] font-medium"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#D4AF37",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                }}
              >
                Solicitar consulta
                <span>→</span>
              </Link>
              <Link
                href="/areas-practica"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#2a3d32] rounded-sm transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-[#1a2e24]"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.9)",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                }}
              >
                ← Ver otras áreas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterHero />
    </div>
  );
}
