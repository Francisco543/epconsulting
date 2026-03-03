import Hero from "./components/sections/Hero";
import IntroSection from "./components/sections/IntroSection";
import SolucionesSection from "./components/sections/SolucionesSection";
import AboutSection from "./components/sections/AboutSection";
import ContactCta from "./components/sections/ContactCta";
import FaqSection from "./components/sections/FaqSection";
import Footer from "./components/layout/Footer";
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
      <AboutSection />
      <ContactCta />
      <FaqSection />
      <Footer />
    </main>
  );
}
