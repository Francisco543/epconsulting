import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Aviso Legal | Estudio Jurídico Palomeque & Asociados",
  description: "Aviso legal del Estudio Jurídico Palomeque & Asociados",
};

export default function AvisoLegalPage() {
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
                Legal
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Aviso Legal
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-zinc-700 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  1. Datos Identificativos
                </h2>
                <p>
                  En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, 
                  de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan 
                  los siguientes datos:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Denominación social: Estudio Jurídico Palomeque & Asociados</li>
                  <li>Dirección: Buenos Aires, Argentina</li>
                  <li>Email: info@estudiopalomeque.com</li>
                  <li>Teléfono: +54 11 1234-5678</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  2. Objeto
                </h2>
                <p>
                  El presente aviso legal regula el uso del sitio web <strong>www.estudiopalomeque.com</strong> (en adelante, 
                  el sitio web), del cual es titular Estudio Jurídico Palomeque & Asociados.
                </p>
                <p className="mt-4">
                  La navegación por el sitio web de Estudio Jurídico Palomeque & Asociados implica la aceptación de todas 
                  las disposiciones incluidas en este aviso legal, así como de la política de privacidad y política de cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  3. Condiciones de Uso
                </h2>
                <p>
                  El acceso y uso del sitio web se rige por la legalidad vigente y por el principio de buena fe, comprometiéndose 
                  el usuario a realizar un buen uso de la web. No se permite el uso del sitio web con fines o efectos ilícitos, 
                  prohibidos en este aviso legal, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan 
                  dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los servicios o documentos, archivos 
                  y toda clase de contenidos almacenados en cualquier equipo informático.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  4. Propiedad Intelectual e Industrial
                </h2>
                <p>
                  Estudio Jurídico Palomeque & Asociados es titular de todos los derechos sobre el software del sitio web así como 
                  de los derechos de propiedad industrial e intelectual referidos a los contenidos que se incluyan, a excepción de 
                  los derechos sobre productos y servicios de carácter público que no son propiedad de esta empresa.
                </p>
                <p className="mt-4">
                  Queda prohibida la reproducción, publicación y/o uso no estrictamente privado de los contenidos, totales o parciales, 
                  del sitio web sin el consentimiento previo y por escrito de Estudio Jurídico Palomeque & Asociados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  5. Responsabilidades
                </h2>
                <p>
                  Estudio Jurídico Palomeque & Asociados no se hace responsable de la información y contenidos almacenados en foros, 
                  chats, generadores de blogs, comentarios, redes sociales o cualquier otro medio que permita a terceros publicar 
                  contenidos de forma independiente en la página web.
                </p>
                <p className="mt-4">
                  Sin embargo, y en cumplimiento de lo dispuesto en los artículos 11 y 16 de la LSSI-CE, Estudio Jurídico Palomeque 
                  & Asociados se compromete a retirar o en su caso bloquear aquellos contenidos que puedan afectar o contravenir la 
                  legislación nacional o internacional, derechos de terceros o la moral y el orden público.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  6. Modificaciones
                </h2>
                <p>
                  Estudio Jurídico Palomeque & Asociados se reserva el derecho de realizar sin previo aviso las modificaciones que 
                  considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se 
                  presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  7. Legislación Aplicable
                </h2>
                <p>
                  El presente aviso legal se rige por la legislación argentina. Para cualquier controversia que pudiera derivarse 
                  del acceso o uso del presente sitio web, Estudio Jurídico Palomeque & Asociados y el usuario se someten a los 
                  juzgados y tribunales de Buenos Aires, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  8. Contacto
                </h2>
                <p>
                  Para cualquier consulta o aclaración sobre el presente aviso legal, puede contactarnos a través de:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Email: info@estudiopalomeque.com</li>
                  <li>Teléfono: +54 11 1234-5678</li>
                </ul>
              </section>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-200">
            <p className="text-sm text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
              Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


