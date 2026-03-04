/**
 * Configuración central para SEO, metadata y enlaces en emails (reset password, invitaciones).
 * En Vercel definir NEXT_PUBLIC_SITE_URL = https://mepcompliance.com (no NEXT_PUBLIC_SITE_ULR).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mepcompliance.com";

export const SITE_NAME = "MEP Compliance";

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
  "MEP Compliance",
];
