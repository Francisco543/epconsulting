"use client";

import { useState, useEffect, useRef } from "react";

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    compliance: 0,
    projects: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const stats = [
    {
      id: "years",
      targetValue: 15,
      suffix: "+",
      label: "Años de Experiencia",
      description: "En compliance y prevención de lavado de activos",
    },
    {
      id: "compliance",
      targetValue: 100,
      suffix: "%",
      label: "Cumplimiento Normativo",
      description: "Garantizado en todos nuestros proyectos",
    },
    {
      id: "uif",
      isText: true,
      text: "UIF",
      label: "Acreditación Oficial",
      description: "Revisor Externo Independiente habilitado",
    },
    {
      id: "projects",
      targetValue: 50,
      suffix: "+",
      label: "Proyectos Exitosos",
      description: "En instituciones financieras y sujetos obligados",
    },
  ];

  // Intersection Observer para detectar cuando la sección es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      {
        threshold: 0.3, // Se activa cuando el 30% de la sección es visible
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animación de contadores cuando la sección es visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500; // 2.5 segundos
    const startTime = Date.now();

    // Función de easing suave (ease-out)
    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      // Actualizar contadores con animación suave
      setCounters({
        years: Math.floor(15 * easedProgress),
        compliance: Math.floor(100 * easedProgress),
        projects: Math.floor(50 * easedProgress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Asegurar valores finales exactos
        setCounters({
          years: 15,
          compliance: 100,
          projects: 50,
        });
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  const getDisplayValue = (stat: typeof stats[0]) => {
    if (stat.isText) {
      return stat.text;
    }

    switch (stat.id) {
      case "years":
        return `${counters.years}${stat.suffix}`;
      case "compliance":
        return `${counters.compliance}${stat.suffix}`;
      case "projects":
        return `${counters.projects}${stat.suffix}`;
      default:
        return stat.text || "";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-zinc-900 overflow-hidden border-t border-zinc-800"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div
                className="text-6xl md:text-7xl font-bold text-white mb-4 transition-all duration-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {getDisplayValue(stat)}
              </div>
              <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </h3>
              <p
                className="text-zinc-400 text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
