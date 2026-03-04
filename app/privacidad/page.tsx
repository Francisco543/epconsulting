import { getLocale, getTranslations } from "next-intl/server";
import PageNav from "@/app/components/layout/PageNav";
import Footer from "@/app/components/layout/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";
  return {
    title: isEn ? "Privacy Policy" : "Política de Privacidad",
    description: isEn
      ? "Privacy policy and personal data protection of MEP Compliance."
      : "Política de privacidad y protección de datos personales de MEP Compliance.",
    openGraph: {
      title: isEn ? "Privacy Policy | MEP Compliance" : "Política de Privacidad | MEP Compliance",
      description: isEn ? "Personal data protection and data subject rights." : "Protección de datos personales y derechos del interesado.",
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacidadPage() {
  const locale = await getLocale();
  const t = await getTranslations("privacy");
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
            {locale === "en" ? "Privacy " : "Política de "}
            <span style={{ color: "#D4AF37" }}>{locale === "en" ? "policy" : "privacidad"}</span>
          </h1>
        </div>
      </section>
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#f8f8f6", borderBottom: "1px solid rgba(26, 26, 26, 0.06)" }}
      >
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <p className="text-zinc-700 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {locale === "en"
              ? "MEP Compliance processes your personal data in accordance with applicable regulations. For any request regarding your data, contact us at info@mepcompliance.com."
              : "MEP Compliance trata sus datos personales de acuerdo con la normativa aplicable. Para cualquier solicitud respecto de sus datos, contactenos en info@mepcompliance.com."}
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
