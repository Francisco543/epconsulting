"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/areas-practica", label: "Áreas de Práctica" },
    { href: "/contacto", label: "Contacto" },
  ];

  const practiceAreas = [
    { href: "/areas-practica/1", label: "Diseño de Procesos" },
    { href: "/areas-practica/2", label: "REI" },
    { href: "/areas-practica/3", label: "Capacitación" },
    { href: "/areas-practica/4", label: "Auditoría" },
    { href: "/areas-practica/5", label: "Comité" },
    { href: "/areas-practica/6", label: "Requerimientos" },
  ];

  const legalLinks = [
    { href: "/aviso-legal", label: "Aviso Legal" },
    { href: "/privacidad", label: "Política de Privacidad" },
    { href: "/cookies", label: "Política de Cookies" },
    { href: "/terminos", label: "Términos y Condiciones" },
  ];

  return (
    <footer className="relative bg-zinc-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="border-b border-zinc-800">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <Link href="/" className="inline-block mb-6">
                  <div className="flex items-center">
                    <div className="bg-white px-4 py-2.5 flex flex-col justify-center border-l-4 border-orange-500">
                      <span
                        className="text-zinc-900 text-lg font-semibold leading-tight tracking-tight"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        Estudio Jurídico
                      </span>
                      <span
                        className="text-zinc-900 text-lg font-semibold leading-tight tracking-tight"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        Palomeque
                      </span>
                    </div>
                    <div className="ml-3 flex flex-col justify-center">
                      <span
                        className="text-white text-xs font-light tracking-[0.2em] uppercase leading-tight"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        & ASOCIADOS
                      </span>
                    </div>
                  </div>
                </Link>
                <p
                  className="text-zinc-400 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Estudio Jurídico especializado en Prevención del Lavado de
                  Activos y la Financiación del Terrorismo. Revisor Externo
                  Independiente acreditado ante la UIF.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3
                  className="text-sm font-semibold uppercase tracking-wider text-white mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Navegación
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-zinc-400 hover:text-orange-400 transition-colors duration-200 text-sm group inline-flex items-center gap-2"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice Areas */}
              <div>
                <h3
                  className="text-sm font-semibold uppercase tracking-wider text-white mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Áreas de Práctica
                </h3>
                <ul className="space-y-3">
                  {practiceAreas.map((area) => (
                    <li key={area.href}>
                      <Link
                        href={area.href}
                        className="text-zinc-400 hover:text-orange-400 transition-colors duration-200 text-sm group inline-flex items-center gap-2"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {area.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3
                  className="text-sm font-semibold uppercase tracking-wider text-white mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Contacto
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p
                        className="text-zinc-400 text-sm"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        Buenos Aires, Argentina
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <a
                        href="mailto:info@estudiopalomeque.com"
                        className="text-zinc-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        info@estudiopalomeque.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <a
                        href="tel:+541112345678"
                        className="text-zinc-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        +54 11 1234-5678
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-zinc-400">
              <p style={{ fontFamily: "var(--font-inter)" }}>
                © {currentYear} Estudio Jurídico Palomeque & Asociados. Todos
                los derechos reservados.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 hover:text-orange-400 transition-colors duration-200 text-xs uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Accreditation Badge */}
          <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span
                className="text-xs text-zinc-300 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Revisor Externo Independiente UIF
              </span>
            </div>
            <div className="h-4 w-px bg-zinc-700 hidden md:block"></div>
            <p
              className="text-xs text-zinc-500 text-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Acreditado ante la Unidad de Información Financiera
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


