"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/areas-practica", label: "Áreas de Práctica" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-orange-100/50"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo - Estilo Hogan Lovells Premium */}
            <Link
              href="/"
              className="group flex items-center transition-all duration-300 hover:opacity-90"
            >
              <div className="flex items-center">
                {/* Bloque de color con el nombre - con toque naranja */}
                <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-5 py-3 flex flex-col justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500/80">
                  <span
                    className="text-white text-lg font-semibold leading-tight tracking-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Estudio Jurídico
                  </span>
                  <span
                    className="text-white text-lg font-semibold leading-tight tracking-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Palomeque
                  </span>
                </div>
                {/* Texto "& ASOCIADOS" al lado */}
                <div className="ml-4 flex flex-col justify-center">
                  <span
                    className="text-zinc-900 text-xs font-light tracking-[0.2em] uppercase leading-tight"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    & ASOCIADOS
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Centrado */}
            <div className="hidden lg:flex lg:items-center lg:space-x-10 lg:flex-1 lg:justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-700 hover:text-orange-600 transition-all duration-300 relative group"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-500 group-hover:w-full"></span>
                  <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-orange-200/30"></span>
                </Link>
              ))}
            </div>

            {/* Right side icons and menu */}
            <div className="flex items-center space-x-3">
              {/* Search Icon */}
              <button
                className="hidden md:flex p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg transition-all duration-200"
                aria-label="Buscar"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Language/Region Icon */}
              <button
                className="hidden md:flex p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg transition-all duration-200"
                aria-label="Idioma"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </button>

              {/* User/People Icon */}
              <button
                className="hidden md:flex p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg transition-all duration-200"
                aria-label="Nuestro equipo"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg transition-all duration-200 focus:outline-none"
                aria-label="Menú"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu - Estilo profesional premium */}
      {isMenuOpen && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-t border-orange-100/50 shadow-2xl">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Columna 1 - Navegación Principal */}
              <div>
                <h3
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Navegación
                </h3>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-zinc-900 hover:text-orange-600 transition-colors duration-200 block group"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Columna 2 - Información */}
              <div>
                <h3
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Información
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/sobre-nosotros"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-zinc-900 hover:text-orange-600 transition-colors duration-200 block group"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                        Sobre Nosotros
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/oficinas"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-zinc-900 hover:text-orange-600 transition-colors duration-200 block group"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                        Oficinas
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prensa"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-zinc-900 hover:text-orange-600 transition-colors duration-200 block group"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                        Prensa
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/responsabilidad-social"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-zinc-900 hover:text-orange-600 transition-colors duration-200 block group"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                        Responsabilidad Social
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Columna 3 - Redes Sociales */}
              <div>
                <h3
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Conecta con Nosotros
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-3 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-3 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg transition-all duration-200"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para cerrar el menú */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 top-20 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
