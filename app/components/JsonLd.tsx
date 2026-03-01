import { SITE_URL, SITE_NAME } from "@/app/lib/site";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-og.png`,
    description:
      "Estudio jurídico especializado en compliance, prevención del lavado de activos y financiación del terrorismo. Revisor Externo Independiente acreditado ante la UIF.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@estudiopalomeque.com",
      telephone: "+54-11-1234-5678",
      contactType: "customer service",
      areaServed: "AR",
      availableLanguage: "Spanish",
    },
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Compliance, prevención de lavado de activos y REI. Soluciones a medida para instituciones financieras y sujetos obligados.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "es-AR",
    potentialAction: {
      "@type": "ReadAction",
      target: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />
    </>
  );
}
