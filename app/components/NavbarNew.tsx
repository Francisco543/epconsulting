"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavbarNew() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/areas-practica", label: "Áreas de Práctica" },
    { href: "/compliance", label: "Compliance" },
    { href: "/sobre-nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      {/* Navbar Flotante - Fijo arriba */}
      <nav
        className="fixed top-0 left-0 right-0 w-full p-3 sm:p-4 lg:p-5"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: 9999,
          width: "100%",
          margin: 0,
          padding: "12px 16px",
        }}
      >
        <div style={{ padding: "16px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                transition: "opacity 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg
                width="130"
                height="40"
                viewBox="0 0 168 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "130px",
                  height: "40px",
                  transition: "all 0.4s ease-out",
                }}
              >
                <path
                  d="M0 52L16 2L32 52H23L16 28L9 52H0Z"
                  fill={isScrolled ? "#1a1a1a" : "#FFFFFF"}
                  style={{ transition: "fill 0.4s ease-out" }}
                />
                <path d="M26 52L42 2L58 52H49L42 28L35 52H26Z" fill="#D4AF37" />
                <path
                  d="M68 2H102V12H80V22H99V32H80V42H102V52H68V2Z"
                  fill={isScrolled ? "#1a1a1a" : "#FFFFFF"}
                  style={{ transition: "fill 0.4s ease-out" }}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M112 2H138C147.941 2 156 10.059 156 20C156 29.941 147.941 38 138 38H124V52H112V2ZM124 12V28H136C140.418 28 144 24.418 144 20C144 15.582 140.418 12 136 12H124Z"
                  fill={isScrolled ? "#1a1a1a" : "#FFFFFF"}
                  style={{ transition: "fill 0.4s ease-out" }}
                />
                <circle cx="164" cy="6" r="4" fill="#D4AF37" />
              </svg>
            </Link>

            {/* Navbar derecha */}
            <div className="hidden lg:flex lg:items-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backdropFilter: "blur(12px)",
                  borderRadius: "9999px",
                  background: isScrolled
                    ? "rgba(26, 26, 26, 0.95)"
                    : "rgba(255, 255, 255, 0.92)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.08)",
                  border: isScrolled
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(255, 255, 255, 0.6)",
                  transition: "background 0.4s ease-out, border 0.4s ease-out",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 8px",
                  }}
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        position: "relative",
                        padding: "10px 16px",
                        fontSize: "13px",
                        fontFamily: "var(--font-monument)",
                        color: isScrolled
                          ? "rgba(255,255,255,0.7)"
                          : "rgb(115, 115, 115)",
                        textDecoration: "none",
                        transition: "color 0.4s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#D4AF37";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isScrolled
                          ? "rgba(255,255,255,0.7)"
                          : "rgb(115, 115, 115)";
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div
                  style={{
                    width: "1px",
                    height: "32px",
                    background: isScrolled
                      ? "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)"
                      : "linear-gradient(to bottom, transparent, rgb(229, 229, 229), transparent)",
                    transition: "background 0.4s ease-out",
                  }}
                />

                <Link
                  href="/contacto"
                  style={{
                    padding: "10px 20px",
                    fontSize: "13px",
                    fontFamily: "var(--font-monument)",
                    color: isScrolled ? "#D4AF37" : "#1a1a1a",
                    backgroundColor: isScrolled
                      ? "rgba(212, 175, 55, 0.1)"
                      : "transparent",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    transition: "all 0.4s ease-out",
                  }}
                >
                  Contactar
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 bg-transparent border-none cursor-pointer"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Menú"
            >
              <div
                style={{
                  width: "24px",
                  height: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: "2px",
                    backgroundColor: isScrolled ? "#1a1a1a" : "#fff",
                    transition: "all 0.4s ease-out",
                    transform: isMenuOpen
                      ? "rotate(45deg) translateY(9px)"
                      : "none",
                  }}
                ></span>
                <span
                  style={{
                    display: "block",
                    height: "2px",
                    backgroundColor: isScrolled ? "#1a1a1a" : "#fff",
                    transition: "all 0.4s ease-out",
                    opacity: isMenuOpen ? 0 : 1,
                  }}
                ></span>
                <span
                  style={{
                    display: "block",
                    height: "2px",
                    backgroundColor: isScrolled ? "#1a1a1a" : "#fff",
                    transition: "all 0.4s ease-out",
                    transform: isMenuOpen
                      ? "rotate(-45deg) translateY(-9px)"
                      : "none",
                  }}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#1a1a1a",
            zIndex: 40,
            display: "block",
          }}
          className="lg:hidden"
        >
          <div
            style={{
              paddingTop: "128px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            <nav
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "16px 0",
                    fontSize: "20px",
                    fontFamily: "var(--font-monument)",
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
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
