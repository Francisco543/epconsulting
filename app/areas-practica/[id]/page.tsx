"use client";

import { use } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const practiceAreasData: Record<
  string,
  {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    fullDescription: string;
    number: string;
    icon: JSX.Element;
    gradient: string;
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
    gradient: "from-orange-500 via-orange-400 to-amber-500",
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
    gradient: "from-amber-500 via-orange-500 to-orange-600",
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
    gradient: "from-orange-600 via-orange-500 to-amber-600",
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
    gradient: "from-amber-600 via-orange-600 to-orange-700",
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
    gradient: "from-orange-500 via-amber-500 to-orange-600",
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
    gradient: "from-orange-600 via-orange-700 to-amber-700",
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

  if (!area) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Área no encontrada</h1>
            <Link href="/" className="text-orange-600 hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20"></div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Number and Icon */}
            <div className="lg:col-span-4">
              <div className="flex flex-col items-center lg:items-start">
                {/* Large Number */}
                <div
                  className={`text-9xl font-bold bg-gradient-to-br ${area.gradient} bg-clip-text text-transparent mb-8`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {area.number}
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${area.gradient} text-white shadow-2xl mb-8`}
                >
                  {area.icon}
                </div>

                {/* Badge */}
                <div className="px-4 py-2 bg-orange-100 rounded-full border border-orange-200">
                  <span
                    className="text-sm font-semibold text-orange-700 uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Área de Práctica
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-8">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 mb-6 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {area.title}
              </h1>
              <p
                className="text-xl md:text-2xl text-zinc-600 leading-relaxed mb-8 max-w-3xl"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {area.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nuestros Servicios
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {area.services.map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-amber-500"></div>
                  </div>
                  <p
                    className="text-zinc-700 font-medium leading-relaxed group-hover:text-zinc-900 transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {service}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Beneficios Clave
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {area.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <p
                  className="text-lg text-zinc-700 font-medium pt-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="text-center p-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl shadow-2xl">
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              ¿Listo para comenzar?
            </h2>
            <p
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contáctenos para conocer cómo podemos ayudarle con {area.title}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-zinc-50 transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Solicitar Consulta
              </Link>
              <Link
                href="/areas-practica"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Ver Otras Áreas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
