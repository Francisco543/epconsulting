"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 50);
    }, 0);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const slides = [
    {
      preTitle: "Estudio Jurídico Especializado",
      title: "Prevención del Lavado de Activos",
      titleHighlight: "y Financiación del Terrorismo",
      subtitle:
        "Revisor Externo Independiente acreditado ante la Unidad de Información Financiera (UIF). Soluciones integrales de compliance para proteger su organización.",
      link: "/servicios",
      linkText: "Conocer nuestros servicios",
    },
    {
      preTitle: "Asesoramiento Estratégico",
      title: "Cumplimiento Normativo",
      titleHighlight: "y Gestión de Riesgos",
      subtitle:
        "Diseñamos políticas y procedimientos personalizados que aseguran el cumplimiento regulatorio y optimizan la gestión de riesgos de su organización.",
      link: "/areas-practica",
      linkText: "Explorar áreas de práctica",
    },
  ];

  const currentContent = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/14907581-uhd_3840_2160_60fps.mp4" type="video/mp4" />
        </video>

        {/* Professional overlay - White on left, transparent on right for video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

        {/* Orange fade overlay - Subtle and elegant */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 via-transparent to-transparent"></div>

        {/* Enhanced mask - Strong white on left, clear video on right */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"
          style={{
            maskImage:
              "linear-gradient(to right, black 0%, black 40%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 40%, transparent 55%)",
          }}
        ></div>

        {/* Subtle top gradient - minimal */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent"></div>
      </div>

      {/* Content Panel - Professional backdrop for better readability */}
      <div className="relative z-20 h-full flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-1/2 bg-gradient-to-r from-white/95 via-white/85 to-transparent"></div>

        <div className="relative z-30 mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-12">
          <div
            className={`max-w-3xl transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Pre-title - Professional badge */}
            <div className="mb-7">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-white/95 backdrop-blur-md rounded-full border border-zinc-200/60 shadow-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                <span
                  className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-700"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {currentContent.preTitle}
                </span>
              </div>
            </div>

            {/* Main Heading - Professional typography */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900 mb-7 leading-[1.08] tracking-tight transition-all duration-1000 delay-150 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {currentContent.title}
              <br />
              <span className="text-zinc-800">
                {currentContent.titleHighlight}
              </span>
            </h1>

            {/* Professional divider with orange accent */}
            <div className="h-0.5 w-20 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 mb-7 shadow-sm"></div>

            {/* Subtitle - Enhanced readability */}
            <p
              className={`text-lg md:text-xl text-zinc-700 mb-9 leading-relaxed max-w-2xl font-light transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {currentContent.subtitle}
            </p>

            {/* Trust Indicators - Professional styling */}
            <div
              className={`flex items-center gap-8 mb-9 transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    className="text-base font-bold text-zinc-900"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Acreditado UIF
                  </div>
                  <div
                    className="text-xs text-zinc-600 font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    REI Habilitado
                  </div>
                </div>
              </div>
              <div className="h-10 w-px bg-zinc-300"></div>
              <div>
                <div
                  className="text-base font-bold text-zinc-900"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  15+ Años
                </div>
                <div
                  className="text-xs text-zinc-600 font-medium"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Experiencia
                </div>
              </div>
            </div>

            {/* CTA Buttons - Professional and prominent */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href={currentContent.link}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-base rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-100"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span>{currentContent.linkText}</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-md border-2 border-zinc-300 text-zinc-900 font-semibold text-base rounded-lg hover:border-orange-500 hover:text-orange-600 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span>Contactar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Indicators - Professional */}
      <div className="absolute bottom-16 left-0 right-0 z-30">
        <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`group relative transition-all duration-500 ${
                  currentSlide === index
                    ? "w-14 h-1.5"
                    : "w-10 h-1.5 hover:w-12"
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    currentSlide === index
                      ? "bg-zinc-900 shadow-md"
                      : "bg-zinc-300 group-hover:bg-zinc-500"
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
