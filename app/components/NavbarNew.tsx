"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
      {/* Navbar flotante más compacto */}
      <nav
        className="fixed top-0 left-0 right-0 w-full"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: 9999,
          width: "100%",
          margin: 0,
          padding: "4px 12px",
        }}
      >
        <div
          style={{
            padding: "4px 12px",
          }}
        >
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
              <Image
                src="/logo.png"
                alt="MEP Compliance"
                width={120}
                height={32}
                priority
                style={{
                  width: "auto",
                  height: "32px",
                  objectFit: "contain",
                  transition: "all 0.2s ease-out",
                }}
              />
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
