"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticeAreasSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const practiceAreas = [
    {
      id: "1",
      title: "Diseño de Procesos",
      shortTitle: "Diseño",
      description:
        "Elaboración y Adecuación de Políticas y Procedimientos para su Implementación y Cumplimiento Normativo. Manuales. Códigos. Lineamientos.",
      number: "01",
      icon: (
        <svg
          className="w-12 h-12"
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
    },
    {
      id: "2",
      title: "REI",
      shortTitle: "REI",
      description:
        "Revisor Externo Independiente: Unidad de Información Financiera (UIF). Emisión y presentación ante la UIF de informes de revisión externa independiente vinculados al cumplimiento normativo de los Sujetos Obligados.",
      number: "02",
      icon: (
        <svg
          className="w-12 h-12"
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
    },
    {
      id: "3",
      title: "Capacitación",
      shortTitle: "Capacitación",
      description:
        "Diseño y Elaboración de Programas de Capacitación para los distintos niveles de recursos humanos.",
      number: "03",
      icon: (
        <svg
          className="w-12 h-12"
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
    },
    {
      id: "4",
      title: "Auditoría",
      shortTitle: "Auditoría",
      description:
        "Control interno global de identificación, evaluación, mitigación y monitoreo de Riesgos de LA/FT. Revisión integral para la identificación de deficiencias o mejoras a aplicar.",
      number: "04",
      icon: (
        <svg
          className="w-12 h-12"
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
    },
    {
      id: "5",
      title: "Comité",
      shortTitle: "Comité",
      description:
        "Participación en Comité de Compliance o PLA&FT. Redacción de Minutas. Seguimiento de temas tratados.",
      number: "05",
      icon: (
        <svg
          className="w-12 h-12"
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
    },
    {
      id: "6",
      title: "Requerimientos",
      shortTitle: "Requerimientos",
      description:
        "Asistencia en Requerimientos o Procesos de Supervisión de Organismos de Control/Reguladores.",
      number: "06",
      icon: (
        <svg
          className="w-12 h-12"
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
    },
  ];

  return (
    <section className="relative py-40 bg-white overflow-hidden border-t border-zinc-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header - Premium Design */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-50 rounded-full border border-zinc-200 mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span
              className="text-sm font-semibold uppercase tracking-wider text-zinc-700"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Nuestros Servicios
            </span>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          </div>
          
          <h2
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-zinc-900 mb-8 leading-[0.9] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Soluciones
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent">
              Especializadas
            </span>
          </h2>
          
          <p
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Servicios integrales de compliance diseñados para proteger y fortalecer su organización
          </p>
        </div>

        {/* Practice Areas Grid - Premium Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {practiceAreas.map((area, index) => (
            <Link
              key={area.id}
              href={`/areas-practica/${area.id}`}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full p-8 bg-white border-2 border-zinc-200 rounded-2xl hover:border-orange-500 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Number - Large and prominent */}
                <div className="relative z-10 mb-6">
                  <div
                    className={`text-7xl md:text-8xl font-bold text-zinc-200 group-hover:text-transparent group-hover:bg-gradient-to-br ${area.gradient} group-hover:bg-clip-text transition-all duration-500`}
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {area.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div
                    className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${area.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    {area.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4 group-hover:text-orange-600 transition-colors duration-300 leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {area.title}
                  </h3>
                  <p
                    className="text-zinc-600 leading-relaxed mb-6 line-clamp-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {area.description}
                  </p>

                  {/* CTA Arrow */}
                  <div className="flex items-center gap-3 text-orange-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    <span className="text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                      Conocer más
                    </span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section - Premium */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <p
              className="text-lg text-zinc-600"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ¿Necesita una solución personalizada?
            </p>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105 active:scale-100"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>Contactar con un especialista</span>
              <svg
                className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
