"use client";

export default function WhyChooseUsSection() {
  const advantages = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Acreditación Oficial UIF",
      description:
        "Revisor Externo Independiente habilitado por la UIF. Garantizamos cumplimiento normativo y respaldo regulatorio para su organización.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      title: "Experiencia en Grandes Instituciones",
      description:
        "Nuestro equipo cuenta con experiencia comprobada en instituciones financieras líderes, asegurando soluciones probadas y efectivas.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Conocimiento Actualizado",
      description:
        "Mantenemos formación continua en normativas vigentes y mejores prácticas internacionales, asegurando asesoramiento al día.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Soluciones Personalizadas",
      description:
        "Cada organización es única. Diseñamos políticas, procedimientos y estrategias adaptadas específicamente a su negocio y necesidades.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Respuesta Ágil",
      description:
        "Entendemos la urgencia de los requerimientos regulatorios. Ofrecemos atención rápida y eficiente para procesos de supervisión.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Confidencialidad Total",
      description:
        "Manejamos su información con la máxima discreción y seguridad, cumpliendo con los más altos estándares de confidencialidad profesional.",
    },
  ];

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-200 mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span
              className="text-xs font-semibold uppercase tracking-wider text-zinc-700"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Nuestras Ventajas
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ¿Por qué elegirnos?
          </h2>
          <p
            className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Ofrecemos soluciones integrales de compliance con el respaldo de
            acreditación oficial y experiencia comprobada en el sector financiero
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl border border-zinc-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {advantage.icon}
              </div>
              <h3
                className="text-2xl font-bold text-zinc-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {advantage.title}
              </h3>
              <p
                className="text-zinc-600 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
