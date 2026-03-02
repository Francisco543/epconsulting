"use client";

import Link from "next/link";

export default function FooterNew() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Inicio" },
    { href: "/areas-practica", label: "Áreas de Práctica" },
    { href: "/compliance", label: "Compliance" },
    { href: "/sobre-nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  const legalLinks = [
    { href: "/aviso-legal", label: "Aviso Legal" },
    { href: "/privacidad", label: "Privacidad" },
    { href: "/cookies", label: "Cookies" },
  ];

  return (
    <footer className="relative bg-[#1a1a1a] text-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Logo y descripción */}
          <div className="text-center mb-16">
            <Link href="/" className="inline-block mb-8">
              <svg
                width="130"
                height="40"
                viewBox="0 0 168 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:w-[150px] lg:h-[46px] mx-auto"
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
            <p
              className="text-sm max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: 400,
              }}
            >
              Estudio Jurídico especializado en Prevención del Lavado de Activos
              y la Financiación del Terrorismo. Revisor Externo Independiente
              acreditado ante la UIF.
            </p>
          </div>

          {/* Grid de links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Navegación */}
            <div>
              <h3
                className="text-[11px] uppercase tracking-[0.3em] mb-6"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(255, 255, 255, 0.4)",
                  letterSpacing: "0.3em",
                }}
              >
                Navegación
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-3 text-sm transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontWeight: 400,
                      }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3
                className="text-[11px] uppercase tracking-[0.3em] mb-6"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(255, 255, 255, 0.4)",
                  letterSpacing: "0.3em",
                }}
              >
                Contacto
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:info@mepcompliance.com"
                    className="group inline-flex items-center gap-3 text-sm transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: 400,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:text-white transition-colors">
                      info@mepcompliance.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+541112345678"
                    className="group inline-flex items-center gap-3 text-sm transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: 400,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:text-white transition-colors">
                      +54 11 1234-5678
                    </span>
                  </a>
                </li>
                <li>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(255, 255, 255, 0.5)",
                      fontWeight: 400,
                    }}
                  >
                    Buenos Aires, Argentina
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full mb-12"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(255, 255, 255, 0.4)",
                fontWeight: 400,
              }}
            >
              © {currentYear} Estudio Jurídico Palomeque & Asociados
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] transition-all duration-300 group"
                  style={{
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                  }}
                >
                  <span className="relative">
                    {link.label}
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"
                      style={{ opacity: 0.5 }}
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Accreditation Badge */}
          <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(255, 255, 255, 0.6)",
                letterSpacing: "0.2em",
              }}
            >
              Revisor Externo Independiente UIF
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
