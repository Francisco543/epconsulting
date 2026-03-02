import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web de MEP Compliance. Uso del sitio, propiedad intelectual y legislación aplicable.",
  openGraph: {
    title: "Términos y Condiciones | MEP Compliance",
    description: "Condiciones de uso del sitio web.",
  },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-200 mb-6">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span
                className="text-xs font-semibold uppercase tracking-wider text-zinc-700"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Términos
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Términos y Condiciones
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div
              className="space-y-8 text-zinc-700 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  1. Aceptación de los Términos
                </h2>
                <p>
                  Al acceder y utilizar el sitio web de Estudio Jurídico
                  Palomeque & Asociados, usted acepta estar sujeto a estos
                  términos y condiciones de uso. Si no está de acuerdo con
                  alguna parte de estos términos, no debe utilizar nuestro sitio
                  web.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  2. Uso del Sitio Web
                </h2>
                <p>
                  El sitio web está destinado únicamente para fines informativos
                  y para facilitar el contacto con Estudio Jurídico Palomeque &
                  Asociados. Usted se compromete a:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>
                    Utilizar el sitio web de manera legal y conforme a estos
                    términos
                  </li>
                  <li>
                    No utilizar el sitio web para fines ilegales o no
                    autorizados
                  </li>
                  <li>
                    No intentar acceder a áreas restringidas del sitio web
                  </li>
                  <li>No interferir con el funcionamiento del sitio web</li>
                  <li>No transmitir virus, malware o código malicioso</li>
                  <li>
                    No recopilar información de otros usuarios sin su
                    consentimiento
                  </li>
                </ul>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  3. Servicios Jurídicos
                </h2>
                <p>
                  La información proporcionada en este sitio web no constituye
                  asesoramiento jurídico. El contenido del sitio web es solo
                  para fines informativos generales y no debe considerarse como
                  consejo legal específico para su situación.
                </p>
                <p className="mt-4">
                  Para recibir asesoramiento jurídico específico, debe contactar
                  directamente con Estudio Jurídico Palomeque & Asociados y
                  establecer una relación profesional formal. La relación
                  profesional se regirá por un contrato de prestación de
                  servicios separado.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  4. Propiedad Intelectual
                </h2>
                <p>
                  Todo el contenido del sitio web, incluyendo pero no limitado a
                  textos, gráficos, logotipos, iconos, imágenes, clips de audio,
                  descargas digitales y compilaciones de datos, es propiedad de
                  Estudio Jurídico Palomeque & Asociados o de sus proveedores de
                  contenido y está protegido por las leyes de propiedad
                  intelectual.
                </p>
                <p className="mt-4">
                  Está prohibida la reproducción, distribución, modificación,
                  creación de obras derivadas, uso público, representación
                  pública, republicación, descarga, almacenamiento o transmisión
                  de cualquier material de nuestro sitio web sin nuestro
                  consentimiento previo por escrito.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  5. Enlaces a Terceros
                </h2>
                <p>
                  Nuestro sitio web puede contener enlaces a sitios web de
                  terceros. Estos enlaces se proporcionan solo para su
                  conveniencia. No tenemos control sobre el contenido de estos
                  sitios web y no asumimos responsabilidad por ellos ni por
                  cualquier pérdida o daño que pueda surgir del uso de dichos
                  sitios web.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  6. Limitación de Responsabilidad
                </h2>
                <p>
                  En la máxima medida permitida por la ley aplicable, Estudio
                  Jurídico Palomeque & Asociados no será responsable de ningún
                  daño directo, indirecto, incidental, especial, consecuente o
                  punitivo que resulte del uso o la imposibilidad de usar
                  nuestro sitio web.
                </p>
                <p className="mt-4">
                  No garantizamos que el sitio web esté libre de errores, virus
                  u otros componentes dañinos, ni que esté disponible de forma
                  ininterrumpida o segura.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  7. Indemnización
                </h2>
                <p>
                  Usted acepta indemnizar y eximir de responsabilidad a Estudio
                  Jurídico Palomeque & Asociados, sus afiliados, directores,
                  empleados y agentes de cualquier reclamo, daño, obligación,
                  pérdida, responsabilidad, costo o deuda, y gastos (incluyendo
                  honorarios de abogados) que surjan de su uso del sitio web o
                  de su violación de estos términos.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  8. Modificaciones
                </h2>
                <p>
                  Nos reservamos el derecho de modificar estos términos y
                  condiciones en cualquier momento. Las modificaciones entrarán
                  en vigor inmediatamente después de su publicación en el sitio
                  web. Su uso continuado del sitio web después de cualquier
                  modificación constituye su aceptación de los términos
                  modificados.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  9. Rescisión
                </h2>
                <p>
                  Nos reservamos el derecho de terminar o suspender su acceso al
                  sitio web, sin previo aviso, por cualquier motivo, incluyendo,
                  entre otros, la violación de estos términos y condiciones.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  10. Ley Aplicable y Jurisdicción
                </h2>
                <p>
                  Estos términos y condiciones se rigen e interpretan de acuerdo
                  con las leyes de la República Argentina. Cualquier disputa que
                  surja de o esté relacionada con estos términos será sometida a
                  la jurisdicción exclusiva de los tribunales de Buenos Aires,
                  Argentina.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  11. Separabilidad
                </h2>
                <p>
                  Si alguna disposición de estos términos se considera inválida
                  o inaplicable, las disposiciones restantes seguirán en pleno
                  vigor y efecto. La disposición inválida será reemplazada por
                  una disposición válida que se acerque más al propósito de la
                  disposición original.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-zinc-900 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  12. Contacto
                </h2>
                <p>
                  Si tiene alguna pregunta sobre estos términos y condiciones,
                  puede contactarnos en:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Email: info@mepcompliance.com</li>
                  <li>Teléfono: +54 11 4916-9760</li>
                </ul>
              </section>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-200">
            <p
              className="text-sm text-zinc-500"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Última actualización:{" "}
              {new Date().toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
