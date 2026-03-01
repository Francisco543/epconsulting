/**
 * Configuración central para SEO y metadata.
 * Sobrescribir con NEXT_PUBLIC_SITE_URL en producción (ej: https://www.mepconsulting.com.ar).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mepconsulting.com.ar";

export const SITE_NAME = "MEP Consulting";

export const DEFAULT_OG_IMAGE = "/og-image.png"; // Crear imagen 1200x630 para redes sociales

export const DEFAULT_DESCRIPTION =
  "Revisor Externo Independiente acreditado ante la UIF. Soluciones integrales de compliance, prevención de lavado de activos (PLA/FT) y gestión de riesgos para empresas e instituciones financieras en Argentina.";

export const KEYWORDS = [
  "compliance",
  "prevención lavado de activos",
  "PLA",
  "FT",
  "UIF",
  "Revisor Externo Independiente",
  "REI",
  "sujetos obligados",
  "normativa financiera",
  "Argentina",
  "MEP Consulting",
];
