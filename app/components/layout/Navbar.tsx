"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link as I18nLink, usePathname } from "@/i18n/navigation";
import { LogoIcon } from "./Logo";

function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const q = (l: string) => `${pathname}${pathname.includes("?") ? "&" : "?"}locale=${l}`;
  return (
    <div className="hidden sm:flex items-center gap-1 border border-neutral-200 rounded-full p-0.5">
      <a
        href={q("es")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          locale === "es" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
        }`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        ES
      </a>
      <a
        href={q("en")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          locale === "en" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
        }`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        EN
      </a>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("common.nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname() || "/";
  const locale = useLocale();
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
    { href: "/", label: t("home") },
    { href: "/areas-practica", label: t("areas") },
    { href: "/servicios", label: t("services") },
    { href: "/sobre-nosotros", label: t("about") },
    { href: "/contacto", label: t("contact") },
  ];

  return (
    <>
      {/* Container principal más compacto */}
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 xl:px-12 pt-2 pb-2">
        <nav
          className={`transition-all duration-500 ease-out ${
            isScrolled
              ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5"
              : "bg-white/90 backdrop-blur-md"
          } rounded-full`}
        >
          <div className="mx-auto max-w-[1600px] px-3 lg:px-6">
            <div className="flex h-12 lg:h-14 items-center justify-between">
              {/* Logo unificado */}
              <I18nLink href="/" className="inline-flex items-center transition-opacity duration-300 hover:opacity-90" aria-label="MEP Compliance - Inicio">
                <LogoIcon />
              </I18nLink>

              {/* Desktop Navigation - Centrado */}
              <div className="hidden lg:flex lg:items-center lg:space-x-10 xl:space-x-12">
                {navLinks.map((link) => (
                  <I18nLink
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors duration-300 tracking-wide"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </I18nLink>
                ))}
              </div>

              {/* Right side - Language selector */}
              <div className="flex items-center gap-3">
                <LocaleSwitcher />

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-neutral-900 transition-opacity duration-200 hover:opacity-60"
                  aria-label={t("menu")}
                >
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <span
                      className={`block h-[2px] bg-neutral-900 transition-all duration-300 ${
                        isMenuOpen ? "rotate-45 translate-y-[9px]" : ""
                      }`}
                    ></span>
                    <span
                      className={`block h-[2px] bg-neutral-900 transition-all duration-300 ${
                        isMenuOpen ? "opacity-0" : ""
                      }`}
                    ></span>
                    <span
                      className={`block h-[2px] bg-neutral-900 transition-all duration-300 ${
                        isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                      }`}
                    ></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Full Screen */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-white z-40 lg:hidden"
            style={{ paddingTop: "140px" }}
          >
            <div className="px-8 py-12">
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <I18nLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 text-2xl font-medium text-neutral-900 hover:text-neutral-600 transition-colors duration-200 border-b border-neutral-100"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </I18nLink>
                ))}
              </nav>
              {/* Selector de idioma en menú móvil */}
              <div className="flex sm:hidden items-center gap-2 pt-6 border-t border-neutral-100 mt-4">
                <span className="text-sm text-neutral-500 mr-2" style={{ fontFamily: "var(--font-inter)" }}>{tCommon("lang")}:</span>
                <a href={`${pathname}${pathname.includes("?") ? "&" : "?"}locale=es`} onClick={() => setIsMenuOpen(false)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${locale === "es" ? "bg-neutral-900 text-white" : "text-neutral-600 bg-neutral-100 hover:bg-neutral-200"}`} style={{ fontFamily: "var(--font-inter)" }}>ES</a>
                <a href={`${pathname}${pathname.includes("?") ? "&" : "?"}locale=en`} onClick={() => setIsMenuOpen(false)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${locale === "en" ? "bg-neutral-900 text-white" : "text-neutral-600 bg-neutral-100 hover:bg-neutral-200"}`} style={{ fontFamily: "var(--font-inter)" }}>EN</a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
