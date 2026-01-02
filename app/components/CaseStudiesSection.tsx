"use client";

import { useState } from "react";
import Link from "next/link";

export default function CaseStudiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const caseStudies = [
    {
      id: 1,
      title: "Implementación Integral de Compliance para Institución Financiera",
      description:
        "Diseño e implementación completa de políticas y procedimientos de PLA&FT para una institución financiera líder, asegurando cumplimiento normativo y reducción de riesgos.",
      category: "Compliance",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Auditoría y Optimización de Procesos PLA&FT",
      description:
        "Auditoría exhaustiva y rediseño de procesos para una empresa multinacional, identificando brechas y optimizando la gestión de riesgos de lavado de activos.",
      category: "Auditoría",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Asesoramiento Estratégico en Protección de Datos Personales",
      description:
        "Desarrollo de políticas integrales de protección de datos personales y capacitación especializada para cumplimiento con normativas locales e internacionales.",
      category: "Protección de Datos",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Gestión Integral de Riesgos para Sujeto Obligado UIF",
      description:
        "Implementación de sistema completo de gestión de riesgos y diseño de políticas personalizadas para sujeto obligado ante la UIF, incluyendo capacitación continua.",
      category: "Gestión de Riesgos",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    },
  ];

  const visibleStudies = caseStudies.slice(currentIndex, currentIndex + 4);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (caseStudies.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (caseStudies.length - 3)) % (caseStudies.length - 3));
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Casos de Estudio
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-zinc-50 transition-all duration-300 hover:scale-110 group"
            aria-label="Anterior"
          >
            <svg
              className="w-6 h-6 text-zinc-900 group-hover:text-zinc-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-zinc-50 transition-all duration-300 hover:scale-110 group"
            aria-label="Siguiente"
          >
            <svg
              className="w-6 h-6 text-zinc-900 group-hover:text-zinc-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleStudies.map((study, index) => (
              <Link
                key={study.id}
                href={`/casos-estudio/${study.id}`}
                className="group relative h-[500px] overflow-hidden rounded-lg bg-zinc-900 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${study.image})` }}
                ></div>

                {/* Dark Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-zinc-900/70 to-zinc-900/50 transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-80" : "opacity-90"
                  }`}
                ></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  {/* Category Badge */}
                  <div className="self-start">
                    <span
                      className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {study.category}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div className="mt-auto">
                    <h3
                      className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-white/95 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {study.title}
                    </h3>
                    <p
                      className={`text-white/80 text-sm leading-relaxed transition-all duration-500 ${
                        hoveredIndex === index
                          ? "opacity-100 max-h-32"
                          : "opacity-0 max-h-0 overflow-hidden"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {study.description}
                    </p>

                    {/* CTA Arrow - Appears on hover */}
                    <div
                      className={`mt-4 flex items-center gap-2 text-white font-medium text-sm transition-all duration-500 ${
                        hoveredIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <span>Ver caso completo</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-lg"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: caseStudies.length - 3 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-zinc-900"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/casos-estudio"
            className="inline-flex items-center gap-2 text-zinc-900 font-semibold hover:gap-4 transition-all duration-300 group"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>Ver todos los casos de estudio</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M7 17L17 7M7 7h10v10"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
