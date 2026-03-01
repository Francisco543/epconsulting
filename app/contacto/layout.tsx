import type { Metadata } from "next";
import { SITE_URL } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a MEP Consulting para asesoramiento en compliance, prevención de lavado de activos y REI. Respondemos a la brevedad. Buenos Aires, Argentina.",
  alternates: { canonical: `${SITE_URL}/contacto` },
  openGraph: {
    title: "Contacto | MEP Consulting",
    description:
      "Escribinos o llamanos para consultas en compliance, PLA/FT y Revisor Externo Independiente.",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
