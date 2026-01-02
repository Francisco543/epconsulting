import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PracticeAreasSection from "./components/PracticeAreasSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import StatsSection from "./components/StatsSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PracticeAreasSection />
      <WhyChooseUsSection />
      <StatsSection />
      <CaseStudiesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
