import { getLocale, getTranslations } from "next-intl/server";
import PageNav from "@/app/components/layout/PageNav";
import Footer from "@/app/components/layout/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("title"),
    description: locale === "en" ? "Legal notice and terms of use of the MEP Compliance website." : "Aviso legal y condiciones de uso del sitio web de MEP Compliance.",
    openGraph: { title: `${t("title")} | MEP Compliance`, description: locale === "en" ? "Terms of use and site identification data." : "Condiciones de uso y datos identificativos del sitio." },
    robots: { index: true, follow: true },
  };
}

export default async function AvisoLegalPage() {
  const locale = await getLocale();
  const t = await getTranslations("legal");
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
            {t("title")}
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
              ? "MEP Compliance. For any legal enquiry, contact info@mepcompliance.com or +54 11 4916-9760."
              : "MEP Compliance. Para cualquier consulta de carácter legal, contactenos en info@mepcompliance.com o al +54 11 4916-9760."}
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
