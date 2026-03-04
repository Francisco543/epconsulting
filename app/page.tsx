import { getLocale } from "next-intl/server";
import Hero from "./components/sections/Hero";
import IntroSection from "./components/sections/IntroSection";
import SolucionesSection from "./components/sections/SolucionesSection";
import AboutSection from "./components/sections/AboutSection";
import ContactCta from "./components/sections/ContactCta";
import FaqSection from "./components/sections/FaqSection";
import Footer from "./components/layout/Footer";
import { SITE_URL } from "./lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";
  return {
    title: isEn ? "Home" : "Inicio",
    description: isEn
      ? "Experts in compliance and anti-money laundering. Independent External Reviewer accredited with the FIU. We turn regulatory compliance into a competitive advantage for companies and financial institutions in Argentina."
      : "Expertos en compliance y prevención de lavado de activos. Revisor Externo Independiente acreditado ante la UIF. Transformamos el cumplimiento normativo en ventaja competitiva para empresas e instituciones financieras en Argentina.",
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: isEn
        ? "MEP Compliance | Experts in Compliance and Anti-Money Laundering"
        : "MEP Compliance | Expertos en Compliance y Prevención de Lavado de Activos",
      description: isEn
        ? "Independent External Reviewer FIU. Comprehensive compliance, anti-money laundering and risk management solutions."
        : "Revisor Externo Independiente UIF. Soluciones integrales de compliance, prevención de lavado de activos y gestión de riesgos.",
      url: SITE_URL,
    },
  };
}

export default async function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#f8f8f6]">
      <Hero />
      <IntroSection />
      <SolucionesSection />
      <AboutSection />
      <ContactCta />
      <FaqSection />
      <Footer />
    </main>
  );
}
