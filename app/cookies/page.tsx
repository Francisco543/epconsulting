import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies del sitio web de MEP Consulting. Uso de cookies, tipos y gestión de preferencias.",
  openGraph: {
    title: "Política de Cookies | MEP Consulting",
    description: "Información sobre el uso de cookies en nuestro sitio.",
  },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
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
                Cookies
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Política de Cookies
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-zinc-700 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  1. ¿Qué son las Cookies?
                </h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet, smartphone) 
                  cuando visita un sitio web. Las cookies permiten que el sitio web recuerde sus acciones y preferencias durante 
                  un período de tiempo, por lo que no tiene que volver a configurarlas cada vez que regrese al sitio o navegue 
                  de una página a otra.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  2. Tipos de Cookies que Utilizamos
                </h2>
                
                <h3 className="text-xl font-semibold text-zinc-900 mb-3 mt-6" style={{ fontFamily: "var(--font-playfair)" }}>
                  2.1. Cookies Técnicas (Necesarias)
                </h3>
                <p>
                  Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar. Permiten funciones 
                  básicas como la navegación por la página y el acceso a áreas seguras del sitio web.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Finalidad:</strong> Garantizar el correcto funcionamiento del sitio web</li>
                  <li><strong>Duración:</strong> Sesión o persistentes</li>
                  <li><strong>Gestión:</strong> No requieren consentimiento</li>
                </ul>

                <h3 className="text-xl font-semibold text-zinc-900 mb-3 mt-6" style={{ fontFamily: "var(--font-playfair)" }}>
                  2.2. Cookies de Análisis
                </h3>
                <p>
                  Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, proporcionándonos 
                  información sobre las áreas visitadas, el tiempo de permanencia y cualquier problema encontrado.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Finalidad:</strong> Análisis estadístico del uso del sitio web</li>
                  <li><strong>Duración:</strong> Persistentes (hasta 2 años)</li>
                  <li><strong>Gestión:</strong> Requieren consentimiento</li>
                </ul>

                <h3 className="text-xl font-semibold text-zinc-900 mb-3 mt-6" style={{ fontFamily: "var(--font-playfair)" }}>
                  2.3. Cookies de Preferencias
                </h3>
                <p>
                  Estas cookies permiten que el sitio web recuerde información que cambia la forma en que el sitio se comporta 
                  o se ve, como su idioma preferido o la región en la que se encuentra.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Finalidad:</strong> Recordar sus preferencias y configuraciones</li>
                  <li><strong>Duración:</strong> Persistentes (hasta 1 año)</li>
                  <li><strong>Gestión:</strong> Requieren consentimiento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  3. Cookies de Terceros
                </h2>
                <p>
                  Nuestro sitio web puede utilizar servicios de terceros que instalan cookies en su dispositivo. Estos servicios 
                  incluyen:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Google Analytics:</strong> Para análisis de tráfico y comportamiento de usuarios</li>
                  <li><strong>Redes Sociales:</strong> Para compartir contenido en redes sociales</li>
                </ul>
                <p className="mt-4">
                  Estas cookies están sujetas a las políticas de privacidad de los respectivos terceros.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  4. Gestión de Cookies
                </h2>
                <p>
                  Puede gestionar sus preferencias de cookies de las siguientes formas:
                </p>
                
                <h3 className="text-xl font-semibold text-zinc-900 mb-3 mt-6" style={{ fontFamily: "var(--font-playfair)" }}>
                  4.1. A través de la Configuración del Navegador
                </h3>
                <p>
                  La mayoría de los navegadores permiten gestionar las preferencias de cookies. Puede configurar su navegador 
                  para rechazar cookies o para que le avise cuando un sitio web intente colocar una cookie en su dispositivo.
                </p>
                <p className="mt-4">
                  Enlaces a las instrucciones de los principales navegadores:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Google Chrome</li>
                  <li>Mozilla Firefox</li>
                  <li>Safari</li>
                  <li>Microsoft Edge</li>
                </ul>

                <h3 className="text-xl font-semibold text-zinc-900 mb-3 mt-6" style={{ fontFamily: "var(--font-playfair)" }}>
                  4.2. A través de Nuestro Panel de Configuración
                </h3>
                <p>
                  Puede gestionar sus preferencias de cookies a través del panel de configuración que aparece en su primera 
                  visita al sitio web o accediendo a la configuración de cookies en cualquier momento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  5. Consecuencias de Desactivar las Cookies
                </h2>
                <p>
                  Si decide desactivar las cookies, algunas funcionalidades del sitio web pueden no estar disponibles o no 
                  funcionar correctamente. Las cookies técnicas son necesarias para el funcionamiento básico del sitio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  6. Actualizaciones de esta Política
                </h2>
                <p>
                  Podemos actualizar esta política de cookies periódicamente para reflejar cambios en las cookies que utilizamos 
                  o por otras razones operativas, legales o regulatorias. Le recomendamos revisar esta política regularmente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  7. Contacto
                </h2>
                <p>
                  Si tiene alguna pregunta sobre nuestra política de cookies, puede contactarnos en:
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


