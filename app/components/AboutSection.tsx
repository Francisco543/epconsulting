"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative py-32 bg-white overflow-hidden border-t border-zinc-200">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-zinc-200">
              <Image
                src="/drpalomeque.png"
                alt="Dra. María Eugenia Palomeque"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-orange-500/30 rounded-2xl -z-10"></div>
          </div>

          {/* Right Column - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-200 mb-6">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span
                className="text-xs font-semibold uppercase tracking-wider text-zinc-700"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Liderazgo
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Dra. María Eugenia
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                Palomeque
              </span>
            </h2>

            <div className="mb-8">
              <p
                className="text-xl text-orange-600 font-semibold mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Abogada Principal | REI Acreditado UIF
              </p>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
            </div>

            <div className="space-y-6 mb-8">
              <p
                className="text-lg text-zinc-700 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Lidera nuestro estudio jurídico con más de <strong className="text-zinc-900">15 años de experiencia</strong> en 
                compliance y prevención de lavado de activos. Actualmente se desempeña como 
                <strong className="text-zinc-900"> Chief Compliance Officer</strong> en Mega QM SA y es 
                <strong className="text-zinc-900"> Revisor Externo Independiente</strong> habilitado por la UIF.
              </p>
              <p
                className="text-lg text-zinc-700 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Su experiencia en importantes instituciones financieras y su constante actualización 
                en normativas vigentes le permiten brindar asesoramiento estratégico de excelencia, 
                diseñando soluciones personalizadas que protegen y fortalecen las operaciones de nuestros clientes.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-orange-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-zinc-900"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      REI Acreditado
                    </p>
                    <p
                      className="text-xs text-zinc-600"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      UIF
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-orange-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-zinc-900"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      15+ Años
                    </p>
                    <p
                      className="text-xs text-zinc-600"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Experiencia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 hover:scale-105 active:scale-100"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>Conocer más sobre nosotros</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
