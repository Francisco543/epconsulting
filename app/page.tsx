import Hero from "./components/Hero";
import IntroSection from "./components/IntroSection";
import SolucionesSection from "./components/SolucionesSection";
import AboutSectionHero from "./components/AboutSectionHero";
import ContactSectionHero from "./components/ContactSectionHero";
import FaqSection from "./components/FaqSection";
import FooterHero from "./components/FooterHero";
import { SITE_URL } from "./lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Expertos en compliance y prevención de lavado de activos. Revisor Externo Independiente acreditado ante la UIF. Transformamos el cumplimiento normativo en ventaja competitiva para empresas e instituciones financieras en Argentina.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title:
      "MEP Compliance | Expertos en Compliance y Prevención de Lavado de Activos",
    description:
      "Revisor Externo Independiente UIF. Soluciones integrales de compliance, prevención de lavado de activos y gestión de riesgos.",
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#f8f8f6]">
      <Hero />
      <IntroSection />
      <SolucionesSection />
      <AboutSectionHero />
      <ContactSectionHero />
      <FaqSection />
      <FooterHero />
    </main>
  );
}
