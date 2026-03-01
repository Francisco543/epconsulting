"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Logo from "@/app/components/Logo";

export default function FooterHero() {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();
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
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/sobre-nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/areas-practica", label: "Áreas de Práctica" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <footer
      ref={sectionRef}
      className={`relative w-full transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        backgroundColor: "#1a2e24",
        borderTop: "1px solid #2a3d32",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Logo href="/" className="inline-block mb-10" />

          <p
            className="text-sm max-w-xl mx-auto mb-12 leading-relaxed"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.72)",
            }}
          >
            MEP Compliance. Especialistas en prevención del lavado de activos,
            financiación del terrorismo y compliance. Revisor Externo
            Independiente acreditado ante la UIF.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group text-sm transition-all duration-300"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.8)",
                }}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-12">
            <a
              href="mailto:info@estudiopalomeque.com"
              className="group text-sm transition-all duration-300"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.8)",
              }}
            >
              <span className="relative">
                info@estudiopalomeque.com
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
            <span
              className="text-[10px]"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.35)",
              }}
            >
              •
            </span>
            <a
              href="tel:+541112345678"
              className="group text-sm transition-all duration-300"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(245, 230, 200, 0.8)",
              }}
            >
              <span className="relative">
                +54 11 1234-5678
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </div>

          <div
            className="h-px w-full max-w-sm mx-auto mb-10"
            style={{ backgroundColor: "rgba(245, 230, 200, 0.12)" }}
          />

          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span
                className="text-[10px] uppercase tracking-[0.28em]"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.55)",
                }}
              >
                Revisor Externo Independiente UIF
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <p
                className="text-xs"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.45)",
                }}
              >
                © {currentYear} MEP Compliance
              </p>
              <span
                className="hidden sm:block text-xs"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.25)",
                }}
              >
                •
              </span>
              <div className="flex items-center gap-6">
                <Link
                  href="/aviso-legal"
                  className="text-[10px] uppercase tracking-[0.2em] transition-all duration-300 group"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(245, 230, 200, 0.5)",
                  }}
                >
                  <span className="relative">
                    Aviso Legal
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
                <Link
                  href="/privacidad"
                  className="text-[10px] uppercase tracking-[0.2em] transition-all duration-300 group"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(245, 230, 200, 0.5)",
                  }}
                >
                  <span className="relative">
                    Privacidad
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
