import Link from "next/link";
import PageNav from "@/app/components/PageNav";
import FooterHero from "@/app/components/FooterHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description:
    "Aviso legal y condiciones de uso del sitio web de MEP Compliance. Datos identificativos, propiedad intelectual y legislación aplicable.",
  openGraph: {
    title: "Aviso Legal | MEP Compliance",
    description: "Condiciones de uso y datos identificativos del sitio.",
  },
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a2e24" }}>
      <PageNav />

      {/* Hero */}
      <section
        className="relative w-full py-20 lg:py-28 border-b border-[#2a3d32]"
        style={{ backgroundColor: "#1a2e24" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p
            className="text-[11px] uppercase tracking-[0.35em] mb-4"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.5)",
            }}
          >
            Legal
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[0.95] max-w-3xl"
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#F5E6C8",
            }}
          >
            Aviso <span style={{ color: "#D4AF37" }}>legal</span>
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section
        className="py-16 lg:py-24"
        style={{
          backgroundColor: "#f8f8f6",
          borderBottom: "1px solid rgba(26, 26, 26, 0.06)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="space-y-10">
            <section>
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                1. Datos Identificativos
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                En cumplimiento con el deber de información recogido en artículo
                10 de la Ley 34/2002, de 11 de julio, de Servicios de la
                Sociedad de la Información y del Comercio Electrónico, a
                continuación se reflejan los siguientes datos:
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <li>Denominación social: MEP Compliance</li>
                <li>Dirección: Buenos Aires, Argentina</li>
                <li>Email: info@mepcompliance.com</li>
                <li>Teléfono: +54 11 4916-9760</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                2. Objeto
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                El presente aviso legal regula el uso del sitio web (en
                adelante, el sitio web), del cual es titular MEP Compliance.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                La navegación por el sitio web de MEP Compliance implica la
                aceptación de todas las disposiciones incluidas en este aviso
                legal, así como de la política de privacidad y política de
                cookies.
              </p>
            </section>

            <section>
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                3. Condiciones de Uso
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                El acceso y uso del sitio web se rige por la legalidad vigente y
                por el principio de buena fe, comprometiéndose el usuario a
                realizar un buen uso de la web. No se permite el uso del sitio
                web con fines o efectos ilícitos, prohibidos en este aviso
                legal, lesivos de los derechos e intereses de terceros, o que de
                cualquier forma puedan dañar, inutilizar, sobrecargar,
                deteriorar o impedir la normal utilización de los servicios o
                documentos, archivos y toda clase de contenidos almacenados en
                cualquier equipo informático.
              </p>
            </section>

            <section>
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                4. Propiedad Intelectual e Industrial
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                MEP Compliance es titular de todos los derechos sobre el
                software del sitio web así como de los derechos de propiedad
                industrial e intelectual referidos a los contenidos que se
                incluyan, a excepción de los derechos sobre productos y
                servicios de carácter público que no son propiedad de esta
                empresa.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Queda prohibida la reproducción, publicación y/o uso no
                estrictamente privado de los contenidos, totales o parciales,
                del sitio web sin el consentimiento previo y por escrito de MEP
                Compliance.
              </p>
            </section>

            <section>
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                5. Responsabilidades
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                MEP Compliance no se hace responsable de la información y
                contenidos almacenados en foros, chats, generadores de blogs,
                comentarios, redes sociales o cualquier otro medio que permita a
                terceros publicar contenidos de forma independiente en la página
                web.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Sin embargo, y en cumplimiento de lo dispuesto en los artículos
                11 y 16 de la LSSI-CE, MEP Compliance se compromete a retirar o
                en su caso bloquear aquellos contenidos que puedan afectar o
                contravenir la legislación nacional o internacional, derechos de
                terceros o la moral y el orden público.
              </p>
            </section>

            <section>
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                6. Modificaciones
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                MEP Compliance se reserva el derecho de realizar sin previo
                aviso las modificaciones que considere oportunas en su portal,
                pudiendo cambiar, suprimir o añadir tanto los contenidos y
                servicios que se presten a través de la misma como la forma en
                la que éstos aparezcan presentados o localizados en su portal.
              </p>
            </section>

            <section>
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                7. Legislación Aplicable
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                El presente aviso legal se rige por la legislación argentina.
                Para cualquier controversia que pudiera derivarse del acceso o
                uso del presente sitio web, MEP Compliance y el usuario se
                someten a los juzgados y tribunales de Buenos Aires, renunciando
                expresamente a cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            <section>
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                8. Contacto
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Para cualquier consulta o aclaración sobre el presente aviso
                legal, puede contactarnos a través de:
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <li>Email: info@mepcompliance.com</li>
                <li>Teléfono: +54 11 4916-9760</li>
              </ul>
            </section>
          </div>

          <div className="mt-14 pt-8 border-t border-[#2a3d32]/20">
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-monument)",
                color: "rgba(26, 26, 26, 0.5)",
              }}
            >
              Última actualización:{" "}
              {new Date().toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-monument)", color: "#1a1a1a" }}
            >
              <span className="relative">
                Volver al inicio
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                ←
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FooterHero />
    </div>
  );
}
