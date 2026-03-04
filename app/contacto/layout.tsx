import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { SITE_URL } from "@/app/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";
  return {
    title: isEn ? "Contact" : "Contacto",
    description: isEn
      ? "Get in touch with MEP Compliance. Experts in compliance and anti-money laundering in Argentina."
      : "Contactá a MEP Compliance. Expertos en compliance y prevención de lavado de activos en Argentina.",
    alternates: { canonical: `${SITE_URL}/contacto` },
    openGraph: {
      title: isEn ? "Contact | MEP Compliance" : "Contacto | MEP Compliance",
      url: `${SITE_URL}/contacto`,
    },
  };
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
