/**
 * Metadatos SEO por área de práctica (para generateMetadata).
 * Mantener en sync con el contenido de areas-practica/[id]/page.tsx
 */
export const areasPracticaSeo: Record<
  string,
  { title: string; description: string }
> = {
  "1": {
    title: "Diseño de Procesos",
    description:
      "Políticas y procedimientos de compliance, manuales y lineamientos para su implementación y cumplimiento normativo. MEP Consulting.",
  },
  "2": {
    title: "REI",
    description:
      "Revisor Externo Independiente acreditado ante la UIF. Informes de revisión externa para sujetos obligados en PLA/FT. MEP Consulting.",
  },
  "3": {
    title: "Capacitación",
    description:
      "Programas de capacitación en compliance y prevención de lavado de activos para todos los niveles. MEP Consulting.",
  },
  "4": {
    title: "Auditoría",
    description:
      "Auditorías de cumplimiento y evaluación de riesgos LA/FT. Revisión de controles internos y planes de acción. MEP Consulting.",
  },
  "5": {
    title: "Comité",
    description:
      "Participación en Comités de Compliance y PLA&FT. Redacción de minutas y seguimiento. MEP Consulting.",
  },
  "6": {
    title: "Requerimientos",
    description:
      "Asistencia en requerimientos y procesos de supervisión de organismos de control y reguladores. MEP Consulting.",
  },
};
