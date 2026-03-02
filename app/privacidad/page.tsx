import Link from "next/link";
import PageNav from "@/app/components/PageNav";
import FooterHero from "@/app/components/FooterHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y protección de datos personales de MEP Compliance. Responsable del tratamiento, derechos del usuario y contacto.",
  openGraph: {
    title: "Política de Privacidad | MEP Compliance",
    description: "Protección de datos personales y derechos del interesado.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
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
            Privacidad
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[0.95] max-w-3xl"
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#F5E6C8",
            }}
          >
            Política de <span style={{ color: "#D4AF37" }}>privacidad</span>
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
                1. Responsable del Tratamiento
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                El responsable del tratamiento de los datos personales recabados
                a través de este sitio web es:
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <li>Denominación: MEP Compliance</li>
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
                2. Datos Personales que Recabamos
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Recabamos los siguientes datos personales cuando usted utiliza
                nuestros servicios o se pone en contacto con nosotros:
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <li>
                  Datos de identificación: nombre, apellidos, DNI o documento de
                  identidad
                </li>
                <li>
                  Datos de contacto: dirección de correo electrónico, número de
                  teléfono, dirección postal
                </li>
                <li>
                  Datos profesionales: empresa, cargo, sector de actividad
                </li>
                <li>
                  Datos de navegación: dirección IP, cookies, datos de
                  navegación
                </li>
                <li>
                  Datos de comunicación: mensajes, consultas, solicitudes de
                  información
                </li>
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
                3. Finalidad del Tratamiento
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Los datos personales que recabamos serán utilizados para las
                siguientes finalidades:
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <li>
                  Gestionar y responder a sus consultas y solicitudes de
                  información
                </li>
                <li>Prestar los servicios jurídicos solicitados</li>
                <li>
                  Enviar comunicaciones comerciales sobre nuestros servicios
                  (con su consentimiento)
                </li>
                <li>Cumplir con las obligaciones legales aplicables</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Gestionar la relación contractual y administrativa</li>
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
                4. Base Jurídica del Tratamiento
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                El tratamiento de sus datos personales se basa en:
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <li>
                  El consentimiento del interesado para el envío de
                  comunicaciones comerciales
                </li>
                <li>La ejecución de un contrato o medidas precontractuales</li>
                <li>El cumplimiento de obligaciones legales aplicables</li>
                <li>
                  El interés legítimo del responsable para mejorar sus servicios
                </li>
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
                5. Conservación de los Datos
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Los datos personales serán conservados durante el tiempo
                necesario para cumplir con la finalidad para la que fueron
                recabados y, en todo caso, durante los plazos establecidos por
                la legislación aplicable. Una vez cumplida la finalidad, los
                datos serán suprimidos de forma segura, salvo que exista una
                obligación legal de conservación.
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
                6. Compartir Datos con Terceros
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                No compartimos sus datos personales con terceros, salvo en los
                siguientes casos:
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <li>
                  Cuando sea necesario para la prestación del servicio
                  solicitado
                </li>
                <li>Cuando exista una obligación legal</li>
                <li>
                  Con proveedores de servicios que actúan como encargados de
                  tratamiento bajo nuestras instrucciones
                </li>
                <li>Con su consentimiento expreso</li>
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
                7. Sus Derechos
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Usted tiene derecho a:
              </p>
              <ul
                className="list-disc pl-6 space-y-2 mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <li>
                  <strong>Acceso:</strong> Obtener información sobre sus datos
                  personales que tratamos
                </li>
                <li>
                  <strong>Rectificación:</strong> Solicitar la corrección de
                  datos inexactos o incompletos
                </li>
                <li>
                  <strong>Supresión:</strong> Solicitar la eliminación de sus
                  datos cuando ya no sean necesarios
                </li>
                <li>
                  <strong>Oposición:</strong> Oponerse al tratamiento de sus
                  datos en determinadas circunstancias
                </li>
                <li>
                  <strong>Limitación:</strong> Solicitar la limitación del
                  tratamiento de sus datos
                </li>
                <li>
                  <strong>Portabilidad:</strong> Recibir sus datos en formato
                  estructurado y de uso común
                </li>
                <li>
                  <strong>Revocación del consentimiento:</strong> Retirar su
                  consentimiento en cualquier momento
                </li>
              </ul>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Para ejercer estos derechos, puede contactarnos en:{" "}
                <strong>info@mepcompliance.com</strong>
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
                8. Seguridad de los Datos
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Implementamos medidas técnicas y organizativas apropiadas para
                proteger sus datos personales contra el acceso no autorizado, la
                pérdida, destrucción o alteración. Sin embargo, ningún sistema
                de transmisión por Internet es completamente seguro.
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
                9. Modificaciones
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Nos reservamos el derecho de modificar esta política de
                privacidad. Las modificaciones serán publicadas en esta página
                con la fecha de última actualización. Le recomendamos revisar
                periódicamente esta política.
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
                10. Contacto
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.8)",
                  lineHeight: 1.75,
                }}
              >
                Para cualquier consulta sobre esta política de privacidad o para
                ejercer sus derechos, puede contactarnos en:
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
