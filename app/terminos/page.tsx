import { getLocale, getTranslations } from "next-intl/server";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "terms" });
  return {
    title: t("title"),
    description:
      locale === "en"
        ? "Terms and conditions of use of the MEP Compliance website."
        : "Términos y condiciones de uso del sitio web de MEP Compliance. Uso del sitio, propiedad intelectual y legislación aplicable.",
    openGraph: { title: `${t("title")} | MEP Compliance`, description: locale === "en" ? "Website terms of use." : "Condiciones de uso del sitio web." },
    robots: { index: true, follow: true },
  };
}

export default async function TerminosPage() {
  const locale = await getLocale();
  const t = await getTranslations("terms");
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-200 mb-6">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700" style={{ fontFamily: "var(--font-inter)" }}>
                {t("label")}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              {t("title")}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
          </div>
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-zinc-700 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  {locale === "en" ? "1. Acceptance of Terms" : "1. Aceptación de los Términos"}
                </h2>
                <p>
                  {locale === "en"
                    ? "By accessing and using the MEP Compliance website, you agree to be bound by these terms and conditions of use. If you do not agree with any part of these terms, you must not use our website."
                    : "Al acceder y utilizar el sitio web de Estudio Jurídico Palomeque & Asociados, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web."}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  {locale === "en" ? "2. Use of the Website" : "2. Uso del Sitio Web"}
                </h2>
                <p>
                  {locale === "en"
                    ? "The website is intended solely for informational purposes and to facilitate contact with MEP Compliance. You agree to use the website in a lawful manner and in accordance with these terms."
                    : "El sitio web está destinado únicamente para fines informativos y para facilitar el contacto con Estudio Jurídico Palomeque & Asociados. Usted se compromete a utilizar el sitio web de manera legal y conforme a estos términos."}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  {locale === "en" ? "3. Contact" : "3. Contacto"}
                </h2>
                <p>
                  {locale === "en"
                    ? "For any questions regarding these terms, you may contact us at info@mepcompliance.com or +54 11 4916-9760."
                    : "Para cualquier consulta respecto de estos términos, puede contactarnos en info@mepcompliance.com o al +54 11 4916-9760."}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
