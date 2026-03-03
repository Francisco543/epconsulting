"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "/areas-practica", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function PageNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 py-5 lg:py-6 border-b border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
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
          </div>
        </div>
      )}
    </>
  );
}
