"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import CircularText from "@/components/CircularText";
import AboutSectionHero from "./AboutSectionHero";
import ContactSectionHero from "./ContactSectionHero";
import FooterHero from "./FooterHero";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollProgress < 0.1) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
          setIsVisible(true);
        }, 300);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [scrollProgress]);

  // Scroll animation optimizado con RAF
  const handleScroll = useCallback(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Progreso extendido para incluir todas las secciones (0 a 2.0)
    const progress = Math.min(scrollY / (windowHeight * 1.5), 2.0);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Inicializar valores al montar
    const initialScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(handleScroll);
    };
    initialScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const navLinks = [
    { href: "/areas-practica", label: "Expertise" },
    { href: "/servicios", label: "Servicios" },
    { href: "/sobre-nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  const slides = [
    {
      preTitle: "NUESTRO COMPROMISO",
      title: "Simplificamos,",
      titleLine2: "con significado",
      subtitle:
        "Mientras otros complican las cosas, nosotros hacemos el compliance simple",
      link: "/servicios",
      linkText: "DESCUBRA SUS VENTAJAS",
    },
    {
      preTitle: "REVISOR EXTERNO UIF",
      title: "Protegemos,",
      titleLine2: "con excelencia",
      subtitle:
        "Implementamos soluciones de cumplimiento que generan valor real para su organización",
      link: "/areas-practica",
      linkText: "CONOZCA NUESTRAS ÁREAS",
    },
  ];

  const currentContent = slides[currentSlide];

  // FASE 1: El círculo dorado se expande (0 a 0.5 de scroll)
  const phase1Progress = Math.min(scrollProgress * 2, 1);
  const maxClipRadius = 110;
  const clipRadius = Math.min(phase1Progress * 150, maxClipRadius);
  const circleSize = 100 + phase1Progress * 100;

  // Opacidad del contenido del hero
  const heroContentOpacity = Math.max(1 - phase1Progress * 2.5, 0);

  // Opacidad del contenido de la sección dorada
  const goldSectionOpacity =
    phase1Progress > 0.25 ? Math.min((phase1Progress - 0.25) * 2, 1) : 0;

  // FASE 2: El negro se expande desde abajo-izquierda (0.5 a 1 de scroll)
  const phase2Progress = scrollProgress > 0.5 ? (scrollProgress - 0.5) * 2 : 0;
  const blackMaxRadius = 105;
  const blackClipRadius = Math.min(phase2Progress * 150, blackMaxRadius);
  const blackSectionOpacity =
    phase2Progress > 0.2 ? Math.min((phase2Progress - 0.2) * 1.5, 1) : 0;

  // FASE 3: AboutSection se expande (1 a 1.33 de scroll)
  const phase3Progress =
    scrollProgress > 1 ? Math.min((scrollProgress - 1) * 3, 1) : 0;
  const aboutMaxRadius = 110;
  const aboutClipRadius = Math.min(phase3Progress * 150, aboutMaxRadius);
  const aboutSectionOpacity =
    phase3Progress > 0.2 ? Math.min((phase3Progress - 0.2) * 1.5, 1) : 0;

  // FASE 4: ContactSection se expande (1.33 a 1.66 de scroll)
  const phase4Progress =
    scrollProgress > 1.33 ? Math.min((scrollProgress - 1.33) * 3, 1) : 0;
  const contactMaxRadius = 110;
  const contactClipRadius = Math.min(phase4Progress * 150, contactMaxRadius);
  const contactSectionOpacity =
    phase4Progress > 0.2 ? Math.min((phase4Progress - 0.2) * 1.5, 1) : 0;

  // FASE 5: Footer aparece (1.66 a 2.0 de scroll)
  const phase5Progress =
    scrollProgress > 1.66 ? Math.min((scrollProgress - 1.66) * 3, 1) : 0;
  const footerMaxRadius = 200;
  const footerClipRadius = Math.min(phase5Progress * 200, footerMaxRadius);
  const footerOpacity =
    phase5Progress > 0.2 ? Math.min((phase5Progress - 0.2) * 1.5, 1) : 0;

  return (
    <div ref={containerRef} className="relative">
      {/* Spacer para scroll */}
      <div style={{ height: "300vh" }} />

      {/* Hero Section - Fixed */}
      <section className="fixed top-0 left-0 w-full h-screen bg-[#f8f8f6] p-3 sm:p-4 lg:p-5 z-10">
        <div className="relative h-screen w-full">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "24px" }}
          >
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                borderRadius: "24px",
                clipPath: "inset(0 round 24px)",
                WebkitClipPath: "inset(0 round 24px)",
              }}
            >
              <source
                src="/14907581-uhd_3840_2160_60fps.mp4"
                type="video/mp4"
              />
            </video>

            {/* Overlays */}
            <div
              className="absolute inset-0 bg-black/30"
              style={{ borderRadius: "24px" }}
            />
            <div
              className="absolute inset-0"
              style={{
                borderRadius: "24px",
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2), transparent)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                borderRadius: "24px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.2))",
              }}
            />

            {/* Hero Content */}
            <div
              className="relative z-20 h-full flex flex-col justify-end pb-16 lg:pb-24 px-6 sm:px-8 lg:px-12"
              style={{
                opacity: heroContentOpacity,
                transition: "opacity 0.3s ease-out",
              }}
            >
              <div className="max-w-5xl">
                <div
                  className={`transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <p
                    className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-6 lg:mb-8"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#D4AF37",
                    }}
                  >
                    {currentContent.preTitle}
                  </p>

                  <h1
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] mb-6 lg:mb-8 leading-[0.95] transition-all duration-700 delay-75 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      fontFamily: "var(--font-rhymes)",
                      fontWeight: 300,
                      color: "#F5E6C8",
                    }}
                  >
                    {currentContent.title}
                    <br />
                    <span style={{ color: "#D4AF37" }}>
                      {currentContent.titleLine2}
                    </span>
                  </h1>

                  <p
                    className={`text-base sm:text-lg lg:text-xl max-w-2xl mb-10 lg:mb-14 leading-relaxed transition-all duration-700 delay-150 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#F5E6C8",
                    }}
                  >
                    {currentContent.subtitle}
                  </p>

                  <div
                    className={`transition-all duration-700 delay-200 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    <Link
                      href={currentContent.link}
                      className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "#D4AF37",
                      }}
                    >
                      <span>{currentContent.linkText}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Slide Indicators */}
              <div
                className="absolute bottom-6 lg:bottom-8 right-36 sm:right-40 lg:right-48 z-30"
                style={{ opacity: heroContentOpacity }}
              >
                <div className="flex items-center gap-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (currentSlide !== index) {
                          setIsVisible(false);
                          setTimeout(() => {
                            setCurrentSlide(index);
                            setIsVisible(true);
                          }, 300);
                        }
                      }}
                      className="transition-all duration-300"
                      style={{
                        width: currentSlide === index ? "32px" : "16px",
                        height: "2px",
                        backgroundColor:
                          currentSlide === index
                            ? "#D4AF37"
                            : "rgba(212, 175, 55, 0.4)",
                      }}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Dorada - Revelada con clip-path circular */}
      <section
        className="fixed top-0 left-0 w-full h-screen z-20 will-change-transform"
        style={{
          clipPath: `circle(${clipRadius}% at 60px calc(100% - 60px))`,
        }}
      >
        <div className="w-full h-full bg-[#f8f8f6] p-3 sm:p-4 lg:p-5">
          <div
            className="w-full h-full bg-[#D4AF37] flex items-center justify-center overflow-hidden relative"
            style={{ borderRadius: "24px" }}
          >
            <div
              className="flex flex-col items-center justify-center text-center px-8 max-w-3xl relative z-20"
              style={{
                opacity: goldSectionOpacity,
                transform: `translateY(${
                  goldSectionOpacity < 1 ? (1 - goldSectionOpacity) * 30 : 0
                }px)`,
                transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              }}
            >
              <p
                className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-6"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#1a1a1a",
                  opacity: 0.6,
                }}
              >
                SOBRE NOSOTROS
              </p>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-[0.95]"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  color: "#1a1a1a",
                  fontWeight: 300,
                }}
              >
                Expertos en
                <br />
                <span style={{ color: "#fff" }}>Compliance</span>
              </h2>

              <p
                className="text-base sm:text-lg lg:text-xl max-w-xl mb-10 leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.7)",
                }}
              >
                Más de 15 años transformando el cumplimiento normativo en una
                ventaja competitiva
              </p>

              <Link
                href="/compliance"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 pointer-events-auto"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#D4AF37",
                  backgroundColor: "#1a1a1a",
                }}
              >
                Conocer más
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Negra - Se expande desde abajo-izquierda */}
      <section
        className="fixed top-0 left-0 w-full h-screen z-30 will-change-transform"
        style={{
          clipPath: `circle(${blackClipRadius}% at 60px calc(100% - 60px))`,
          pointerEvents:
            phase2Progress > 0.5 && phase3Progress < 0.3 ? "auto" : "none",
        }}
      >
        <div className="w-full h-full bg-[#f8f8f6] p-3 sm:p-4 lg:p-5">
          <div
            className="w-full h-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden relative"
            style={{ borderRadius: "24px" }}
          >
            <div
              className="flex flex-col items-center justify-center text-center px-8 max-w-4xl"
              style={{
                opacity: blackSectionOpacity,
                transform: `translateY(${
                  blackSectionOpacity < 1 ? (1 - blackSectionOpacity) * 40 : 0
                }px)`,
                transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              }}
            >
              <p
                className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-6"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#D4AF37",
                }}
              >
                NUESTROS SERVICIOS
              </p>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-[0.95]"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  color: "#F5E6C8",
                  fontWeight: 300,
                }}
              >
                Soluciones
                <br />
                <span style={{ color: "#D4AF37" }}>a medida</span>
              </h2>

              <p
                className="text-base sm:text-lg lg:text-xl max-w-xl mb-10 leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(245, 230, 200, 0.7)",
                }}
              >
                Cada empresa es única. Diseñamos estrategias de compliance
                personalizadas que se adaptan a sus necesidades específicas.
              </p>

              <Link
                href="/servicios"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "#1a1a1a",
                  backgroundColor: "#D4AF37",
                }}
              >
                Ver servicios
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AboutSection - Se expande desde abajo-izquierda */}
      <AboutSectionHero
        clipRadius={aboutClipRadius}
        opacity={aboutSectionOpacity}
        phaseProgress={phase3Progress}
      />

      {/* ContactSection - Se expande desde abajo-izquierda */}
      <ContactSectionHero
        clipRadius={contactClipRadius}
        opacity={contactSectionOpacity}
        phaseProgress={phase4Progress}
      />

      {/* FooterHero - Se expande desde abajo-izquierda */}
      <FooterHero
        clipRadius={footerClipRadius}
        opacity={footerOpacity}
        phaseProgress={phase5Progress}
      />

      {/* Navbar Flotante */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 lg:p-5">
        <div className="py-4 lg:py-6 px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center transition-all duration-300 hover:opacity-85"
            >
              <svg
                width="130"
                height="40"
                viewBox="0 0 168 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:w-[150px] lg:h-[46px]"
              >
                <path d="M0 52L16 2L32 52H23L16 28L9 52H0Z" fill="#FFFFFF" />
                <path d="M26 52L42 2L58 52H49L42 28L35 52H26Z" fill="#D4AF37" />
                <path
                  d="M68 2H102V12H80V22H99V32H80V42H102V52H68V2Z"
                  fill="#FFFFFF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M112 2H138C147.941 2 156 10.059 156 20C156 29.941 147.941 38 138 38H124V52H112V2ZM124 12V28H136C140.418 28 144 24.418 144 20C144 15.582 140.418 12 136 12H124Z"
                  fill="#FFFFFF"
                />
                <circle cx="164" cy="6" r="4" fill="#D4AF37" />
              </svg>
            </Link>

            <div className="hidden lg:flex items-center">
              <div
                className="flex items-center backdrop-blur-md rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.92)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
              >
                <div className="flex items-center px-2 py-1.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 py-2.5 text-[13px] transition-all duration-300 group"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgb(115, 115, 115)",
                      }}
                    >
                      <span className="relative z-10 group-hover:text-[#D4AF37]">
                        {link.label}
                      </span>
                      <span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "rgb(245, 245, 245)",
                        }}
                      />
                    </Link>
                  ))}
                </div>

                <div
                  className="w-px h-8"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgb(229, 229, 229), transparent)",
                  }}
                />

                <div
                  className="flex items-center gap-2 mx-1.5 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                  }}
                >
                  <span
                    className="text-[13px] tracking-[0.12em] uppercase"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#D4AF37",
                      fontWeight: 500,
                    }}
                  >
                    EP
                  </span>
                  <span
                    className="text-[13px] tracking-[0.05em]"
                    style={{
                      fontFamily: "var(--font-rhymes)",
                      color: "#ffffff",
                    }}
                  >
                    Consulting
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
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
        </div>
      </nav>

      {/* Círculo decorativo dorado fijo en esquina inferior izquierda */}
      <div
        className="fixed bottom-0 left-0 pointer-events-none will-change-transform"
        style={{
          background: "#f8f8f6",
          borderTopRightRadius: "60%",
          width: "120px",
          height: "120px",
          zIndex: 100,
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none will-change-transform"
        style={{
          backgroundColor: "#D4AF37",
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          bottom: "5px",
          left: "5px",
          zIndex: 101,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.3s ease-out, height 0.3s ease-out",
        }}
      >
        <div
          style={{
            width: `${circleSize * 0.7}px`,
            height: `${circleSize * 0.7}px`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularText
            text="EXPERTOS EN COMPLIANCE • "
            spinDuration={25}
            onHover="speedUp"
            className="circular-text-hero"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-neutral-900 z-40 lg:hidden">
          <div className="px-6 pt-24 pb-12">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-4 text-2xl transition-colors border-b border-neutral-800"
                  style={{ fontFamily: "var(--font-rhymes)", color: "#D4AF37" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-12">
              <span
                className="text-lg"
                style={{ fontFamily: "var(--font-rhymes)", color: "#fff" }}
              >
                EP Consulting
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Indicador de scroll */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        style={{
          opacity: scrollProgress < 0.15 ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-monument)", color: "#D4AF37" }}
          >
            Scroll
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
