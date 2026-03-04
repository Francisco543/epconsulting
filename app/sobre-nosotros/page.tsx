import { getLocale, getTranslations } from "next-intl/server";
import PageNav from "@/app/components/layout/PageNav";
import Footer from "@/app/components/layout/Footer";
import AboutSection from "@/app/components/sections/AboutSection";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";
  return {
    title: isEn ? "About us" : "Sobre nosotros",
    description: isEn
      ? "Meet MEP Compliance: over 20 years of experience in compliance and AML/CFT. Led by Dr. María Eugenia Palomeque, Independent External Reviewer accredited with the FIU."
      : "Conocé a MEP Compliance: más de 20 años de experiencia en compliance y PLA/FT. Liderados por la Dra. María Eugenia Palomeque, Revisor Externo Independiente acreditado ante la UIF.",
    alternates: { canonical: `${SITE_URL}/sobre-nosotros` },
    openGraph: {
      title: isEn ? "About us | MEP Compliance" : "Sobre nosotros | MEP Compliance",
      description: isEn
        ? "Team specialized in compliance and anti-money laundering. Dr. Palomeque, FIU REI. Over 20 years of experience."
        : "Equipo especializado en compliance y prevención de lavado de activos. Dra. Palomeque, REI UIF. Más de 20 años de experiencia.",
    },
  };
}

export default async function SobreNosotrosPage() {
  const locale = await getLocale();
  const t = await getTranslations("aboutPage");
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a2e24" }}>
      <PageNav />
      <section
        className="relative w-full py-20 lg:py-28 border-b border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p
            className="text-[11px] uppercase tracking-[0.35em] mb-4"
            style={{ fontFamily: "var(--font-monument)", color: "rgba(245, 230, 200, 0.5)" }}
          >
            {t("label")}
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[0.95] max-w-3xl"
            style={{ fontFamily: "var(--font-rhymes)", fontWeight: 600, color: "#F5E6C8" }}
          >
            {t("title")} <span style={{ color: "#D4AF37" }}>{t("titleHighlight")}</span>
          </h1>
          <p
            className="mt-6 text-base sm:text-lg max-w-2xl"
            style={{ fontFamily: "var(--font-monument)", color: "rgba(245, 230, 200, 0.75)", lineHeight: 1.7 }}
          >
            {t("subtitle")}
          </p>
        </div>
      </section>
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#f8f8f6", borderBottom: "1px solid rgba(26, 26, 26, 0.06)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AboutSection linkLabel={locale === "en" ? "Contact" : "Contactar"} linkHref="/contacto" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
