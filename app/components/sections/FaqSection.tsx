"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    id: "rei",
    question: "¿Qué es un Revisor Externo Independiente (REI)?",
    answer:
      "El Revisor Externo Independiente es un profesional acreditado ante la Unidad de Información Financiera (UIF) que realiza la revisión independiente del sistema de prevención de lavado de activos y financiación del terrorismo de los sujetos obligados. Emite informes que se presentan ante la UIF y contribuyen al cumplimiento normativo y a la transparencia del programa de compliance.",
  },
  {
    id: "sujetos",
    question: "¿Quiénes son sujetos obligados ante la UIF?",
    answer:
      "Son sujetos obligados las entidades y personas que por su actividad quedan alcanzadas por la ley de prevención de lavado de activos y financiación del terrorismo: instituciones financieras, entidades no financieras (casas de cambio, inmobiliarias, etc.), profesionales (abogados, contadores, escribanos en ciertos actos), y otros sectores regulados. La normativa define el listado completo según la actividad.",
  },
  {
    id: "plazos",
    question: "¿En qué plazos responden las consultas?",
    answer:
      "Respondemos consultas iniciales en un plazo de 24 a 48 horas hábiles. Para propuestas o alcance de servicios según la complejidad del proyecto, coordinamos una reunión o llamada y enviamos una propuesta en un plazo acordado. En auditorías REI y proyectos de compliance, los plazos se definen según el cronograma acordado con el cliente.",
  },
  {
    id: "proceso",
    question: "¿Cómo es el proceso típico de trabajo?",
    answer:
      "Tras el primer contacto, realizamos una reunión para conocer su necesidad (análisis de riesgo, políticas, capacitación, REI, etc.). A partir de ahí elaboramos una propuesta con alcance, metodología y plazos. Una vez aprobada, avanzamos según el tipo de servicio: relevamiento, documentación, capacitaciones, auditoría o emisión de informes. Mantenemos comunicación fluida y entregables en los tiempos acordados.",
  },
  {
    id: "alcance",
    question: "¿Trabajan solo en Argentina?",
    answer:
      "No, brindamos servicios a nivel global. Si bien nuestra sede central está en Buenos Aires, trabajamos con organizaciones y sujetos obligados de todo el mundo. Adaptamos nuestro asesoramiento en compliance tanto a los estándares internacionales como a las normativas específicas de cada jurisdicción donde operen nuestros clientes.",
  },
  {
    id: "contacto",
    question: "¿Cómo puedo solicitar una consulta o propuesta?",
    answer:
      "Podés escribirnos por email a info@mepcompliance.com o llamarnos al +54 11 4916-9760. También podés completar el formulario en la página de contacto. Indicá brevemente su sector, tipo de organización y en qué necesitan apoyo (compliance, REI, capacitación, etc.) y te respondemos a la brevedad.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        backgroundColor: "#f8f8f6",
        borderTop: "1px solid rgba(26, 26, 26, 0.06)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <p
          className="text-[11px] uppercase tracking-[0.35em] mb-4"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(26, 26, 26, 0.5)",
          }}
        >
          FAQ
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl leading-[0.95] mb-5"
          style={{
            fontFamily: "var(--font-rhymes)",
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          Preguntas <span style={{ color: "#D4AF37" }}>frecuentes</span>
        </h2>
        <p
          className="text-base mb-12 max-w-xl"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(26, 26, 26, 0.7)",
            lineHeight: 1.65,
          }}
        >
          Respuestas breves sobre nuestros servicios, el REI y cómo trabajamos.
        </p>

        <div className="space-y-0 border-y border-neutral-200/80">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-neutral-200/80 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left transition-colors duration-200 hover:bg-white/50"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span
                    className="flex-1 text-base sm:text-lg font-medium pr-4"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#1a1a1a",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{
                      backgroundColor: isOpen
                        ? "#D4AF37"
                        : "rgba(212, 175, 55, 0.2)",
                      color: isOpen ? "#1a2e24" : "#D4AF37",
                    }}
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    className="pb-5 sm:pb-6 pl-0 pr-12 text-sm sm:text-base leading-relaxed"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(26, 26, 26, 0.78)",
                      lineHeight: 1.75,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="mt-10 text-sm"
          style={{
            fontFamily: "var(--font-monument)",
            color: "rgba(26, 26, 26, 0.6)",
          }}
        >
          ¿No encontrás tu pregunta?{" "}
          <Link
            href="/contacto"
            className="font-medium transition-colors hover:text-[#D4AF37]"
            style={{ color: "#1a1a1a" }}
          >
            Escribinos
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
