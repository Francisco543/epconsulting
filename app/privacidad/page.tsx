import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Política de Privacidad | Estudio Jurídico Palomeque & Asociados",
  description: "Política de privacidad del Estudio Jurídico Palomeque & Asociados",
};

export default function PrivacidadPage() {
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
                Privacidad
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Política de Privacidad
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-zinc-700 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  1. Responsable del Tratamiento
                </h2>
                <p>
                  El responsable del tratamiento de los datos personales recabados a través de este sitio web es:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Denominación: Estudio Jurídico Palomeque & Asociados</li>
                  <li>Dirección: Buenos Aires, Argentina</li>
                  <li>Email: info@estudiopalomeque.com</li>
                  <li>Teléfono: +54 11 1234-5678</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  2. Datos Personales que Recabamos
                </h2>
                <p>
                  Recabamos los siguientes datos personales cuando usted utiliza nuestros servicios o se pone en contacto con nosotros:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Datos de identificación: nombre, apellidos, DNI o documento de identidad</li>
                  <li>Datos de contacto: dirección de correo electrónico, número de teléfono, dirección postal</li>
                  <li>Datos profesionales: empresa, cargo, sector de actividad</li>
                  <li>Datos de navegación: dirección IP, cookies, datos de navegación</li>
                  <li>Datos de comunicación: mensajes, consultas, solicitudes de información</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  3. Finalidad del Tratamiento
                </h2>
                <p>
                  Los datos personales que recabamos serán utilizados para las siguientes finalidades:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Gestionar y responder a sus consultas y solicitudes de información</li>
                  <li>Prestar los servicios jurídicos solicitados</li>
                  <li>Enviar comunicaciones comerciales sobre nuestros servicios (con su consentimiento)</li>
                  <li>Cumplir con las obligaciones legales aplicables</li>
                  <li>Mejorar nuestros servicios y experiencia de usuario</li>
                  <li>Gestionar la relación contractual y administrativa</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  4. Base Jurídica del Tratamiento
                </h2>
                <p>
                  El tratamiento de sus datos personales se basa en:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>El consentimiento del interesado para el envío de comunicaciones comerciales</li>
                  <li>La ejecución de un contrato o medidas precontractuales</li>
                  <li>El cumplimiento de obligaciones legales aplicables</li>
                  <li>El interés legítimo del responsable para mejorar sus servicios</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  5. Conservación de los Datos
                </h2>
                <p>
                  Los datos personales serán conservados durante el tiempo necesario para cumplir con la finalidad para la que 
                  fueron recabados y, en todo caso, durante los plazos establecidos por la legislación aplicable. Una vez cumplida 
                  la finalidad, los datos serán suprimidos de forma segura, salvo que exista una obligación legal de conservación.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  6. Compartir Datos con Terceros
                </h2>
                <p>
                  No compartimos sus datos personales con terceros, salvo en los siguientes casos:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Cuando sea necesario para la prestación del servicio solicitado</li>
                  <li>Cuando exista una obligación legal</li>
                  <li>Con proveedores de servicios que actúan como encargados de tratamiento bajo nuestras instrucciones</li>
                  <li>Con su consentimiento expreso</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  7. Sus Derechos
                </h2>
                <p>
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Acceso:</strong> Obtener información sobre sus datos personales que tratamos</li>
                  <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos</li>
                  <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios</li>
                  <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en determinadas circunstancias</li>
                  <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento de sus datos</li>
                  <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado y de uso común</li>
                  <li><strong>Revocación del consentimiento:</strong> Retirar su consentimiento en cualquier momento</li>
                </ul>
                <p className="mt-4">
                  Para ejercer estos derechos, puede contactarnos en: <strong>info@estudiopalomeque.com</strong>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  8. Seguridad de los Datos
                </h2>
                <p>
                  Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso 
                  no autorizado, la pérdida, destrucción o alteración. Sin embargo, ningún sistema de transmisión por Internet 
                  es completamente seguro.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  9. Modificaciones
                </h2>
                <p>
                  Nos reservamos el derecho de modificar esta política de privacidad. Las modificaciones serán publicadas en 
                  esta página con la fecha de última actualización. Le recomendamos revisar periódicamente esta política.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  10. Contacto
                </h2>
                <p>
                  Para cualquier consulta sobre esta política de privacidad o para ejercer sus derechos, puede contactarnos en:
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


