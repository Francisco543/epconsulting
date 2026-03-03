"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CircularText from "@/components/CircularText";
import Logo from "@/app/components/Logo";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bottomCurve, setBottomCurve] = useState(24);
  const [navFloating, setNavFloating] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateCurve = () => {
      const scrollY = window.scrollY;
      setNavFloating(scrollY > 60);
      const threshold = 350;
      const minRadius = 24;
      const maxRadius = 96;
      const progress = Math.min(scrollY / threshold, 1);
      const radius = Math.round(minRadius + progress * (maxRadius - minRadius));
      setBottomCurve(radius);
    };
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCurve);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateCurve();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const navLinks = [
    { href: "/areas-practica", label: "Servicios" },
    { href: "/sobre-nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <div className="relative">
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#1a2e24] transition-[border-radius] duration-150 ease-out"
        style={{
          borderRadius: `0 0 ${bottomCurve}px ${bottomCurve}px`,
        }}
      >
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 transition-[border-radius] duration-150 ease-out"
          style={{
            borderRadius: `0 0 ${bottomCurve}px ${bottomCurve}px`,
            overflow: "hidden",
          }}
        >
          <Image
            src="/office.png"
            alt=""
            fill
            className="object-cover object-center blur-[2px]"
            priority
          />
          {/* Overlay suave para legibilidad sin tapar el fondo */}
          <div
            className="absolute inset-0 transition-[border-radius] duration-150 ease-out"
            style={{
              borderRadius: `0 0 ${bottomCurve}px ${bottomCurve}px`,
              background:
                "linear-gradient(135deg, rgba(26, 54, 40, 0.55) 0%, rgba(26, 46, 36, 0.45) 50%, rgba(20, 38, 30, 0.4) 100%)",
            }}
          />
          <div
            className="absolute inset-0 transition-[border-radius] duration-150 ease-out"
            style={{
              borderRadius: `0 0 ${bottomCurve}px ${bottomCurve}px`,
              background:
                "linear-gradient(to right, rgba(26, 54, 40, 0.35), transparent 50%)",
            }}
          />
        </div>

        {/* Navbar del landing (sobre el hero y fijo al hacer scroll) */}
        <nav
          className={`left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 py-3 lg:py-4 transition-all duration-300 ease-out ${
            navFloating ? "fixed top-0 shadow-lg" : "absolute top-0"
          }`}
          style={{
            backgroundColor: navFloating ? "#1a2e24" : "transparent",
            boxShadow: navFloating ? "0 4px 24px rgba(0, 0, 0, 0.15)" : "none",
          }}
        >
          <div className="flex items-center justify-between">
            <Logo href="/" />

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#D4AF37]"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(245, 230, 200, 0.85)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-sm border border-[#D4AF37]/50 transition-all duration-300 hover:border-[#D4AF37]"
              aria-label="Menú"
            >
              <div className="w-6 h-4 flex flex-col justify-between">
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                  style={{ backgroundColor: "#D4AF37" }}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                  style={{ backgroundColor: "#D4AF37" }}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                  style={{ backgroundColor: "#D4AF37" }}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-20 flex-1 flex flex-col justify-end min-h-0">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pb-28 lg:pb-36 pt-20">
            <div className="max-w-2xl">
              <div
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.35em] mb-3"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(245, 230, 200, 0.6)",
                  }}
                >
                  Años de experiencia
                </p>
                <p
                  className="text-5xl sm:text-6xl lg:text-7xl font-light mb-8 leading-none tracking-tight"
                  style={{
                    fontFamily: "var(--font-rhymes)",
                    color: "#F5E6C8",
                  }}
                >
                  20+
                </p>
              </div>
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-[3.75rem] leading-[0.96] mb-6 transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#F5E6C8",
                  transitionDelay: "80ms",
                }}
              >
                Su Socio Estratégico en{" "}
                <span style={{ color: "#D4AF37" }}>Compliance</span>
              </h1>
              <div
                className={`w-14 h-px mb-6 transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                }`}
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.6)",
                  transformOrigin: "left",
                  transitionDelay: "140ms",
                }}
              />
              <p
                className={`text-base sm:text-lg lg:text-xl leading-relaxed mb-6 max-w-lg transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.9)",
                  lineHeight: 1.65,
                  transitionDelay: "160ms",
                }}
              >
                Transformamos el cumplimiento normativo en ventaja competitiva
                para tu organización.
              </p>
              <p
                className={`text-[10px] uppercase tracking-[0.28em] mb-10 transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.45)",
                  transitionDelay: "200ms",
                }}
              >
                Revisor Externo Independiente acreditado ante la UIF
              </p>
              <div
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "220ms" }}
              >
                <Link
                  href="/sobre-nosotros"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "#D4AF37",
                  }}
                >
                  <span className="relative">
                    Conocer más
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Círculo EXPERTOS EN COMPLIANCE */}
        <div
          className="absolute rounded-full pointer-events-none z-30 flex items-center justify-center"
          style={{
            width: "104px",
            height: "104px",
            bottom: "56px",
            right: "32px",
            border: "2px solid #D4AF37",
            backgroundColor: "rgba(26, 54, 40, 0.6)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="relative w-[76px] h-[76px] flex items-center justify-center">
            <CircularText
              text="EXPERTOS EN COMPLIANCE • "
              spinDuration={25}
              onHover="speedUp"
              className="circular-text-hero"
            />
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-bounce">
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-monument)", color: "#D4AF37" }}
          >
            Scroll
          </span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: "#1a2e24" }}
        >
          <div className="px-6 pt-24 pb-12">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-4 text-2xl transition-colors border-b border-[#D4AF37]/20"
                  style={{
                    fontFamily: "var(--font-rhymes)",
                    color: "#F5E6C8",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-12">
              <span
                className="text-lg"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  color: "rgba(245, 230, 200, 0.8)",
                }}
              >
                MEP Compliance
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
