import Link from "next/link";
import PageNav from "@/app/components/PageNav";
import FooterHero from "@/app/components/FooterHero";
import AboutSectionHero from "@/app/components/AboutSectionHero";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conocé a MEP Consulting: más de 20 años de experiencia en compliance y PLA/FT. Liderados por la Dra. María Eugenia Palomeque, Revisor Externo Independiente acreditado ante la UIF.",
  alternates: { canonical: `${SITE_URL}/sobre-nosotros` },
  openGraph: {
    title: "Sobre nosotros | MEP Consulting",
    description:
      "Equipo especializado en compliance y prevención de lavado de activos. Dra. Palomeque, REI UIF. Más de 20 años de experiencia.",
  },
};

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a2e24" }}>
      <PageNav />

      {/* Hero bloque */}
      <section
        className="relative w-full py-20 lg:py-28 border-b border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p
            className="text-[11px] uppercase tracking-[0.35em] mb-4"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.5)",
            }}
          >
            Nosotros
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[0.95] max-w-3xl"
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#F5E6C8",
            }}
          >
            Sobre <span style={{ color: "#D4AF37" }}>nosotros</span>
          </h1>
          <p
            className="mt-6 text-base sm:text-lg max-w-2xl"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.75)",
              lineHeight: 1.7,
            }}
          >
            Una consultora especializada en compliance y prevención del lavado
            de activos, con más de 20 años de experiencia y acreditación REI
            UIF.
          </p>
        </div>
      </section>

      {/* Intro firma */}
      <section
        className="py-16 lg:py-24"
        style={{
          backgroundColor: "#f8f8f6",
          borderBottom: "1px solid rgba(26, 26, 26, 0.06)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2
              className="text-2xl sm:text-3xl mb-6"
              style={{
                fontFamily: "var(--font-rhymes)",
                fontWeight: 600,
                color: "#1a1a1a",
              }}
            >
              Nuestra misión
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-6"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(26, 26, 26, 0.8)",
                lineHeight: 1.75,
              }}
            >
              Acompañamos a instituciones financieras, empresas y demás Sujetos
              Obligados a gestionar y diseñar sus programas de compliance y
              controles internos. Asimismo ofrecemos servicios de Revisoría
              Externa Independiente, habilitados por la Unidad de Información
              Financiera (UIF).
            </p>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(26, 26, 26, 0.8)",
                lineHeight: 1.75,
              }}
            >
              Trabajamos con equipos internos y autoridades para reducir
              riesgos, fortalecer controles y cumplir con la normativa vigente
              de manera eficiente y sostenible.
            </p>
          </div>
        </div>
      </section>

      {/* Bloque Dra. Palomeque — mismo componente que en home */}
      <AboutSectionHero linkLabel="Contactar" linkHref="/contacto" />

      {/* CTA */}
      <section
        className="py-16 lg:py-24 border-t border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
          <h2
            className="text-2xl sm:text-3xl mb-4"
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#F5E6C8",
            }}
          >
            Hablemos
          </h2>
          <p
            className="text-sm sm:text-base mb-10 max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.75)",
            }}
          >
            ¿Necesitás asesoramiento en compliance o REI? Escribinos y te
            respondemos a la brevedad.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] rounded-sm transition-all duration-300 hover:bg-[#D4AF37]/10"
            style={{
              fontFamily: "var(--font-monument)",
              color: "#D4AF37",
              fontSize: "13px",
              letterSpacing: "0.08em",
            }}
          >
            Ir a contacto
            <span>→</span>
          </Link>
        </div>
      </section>

      <FooterHero />
    </div>
  );
}
