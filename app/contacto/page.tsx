"use client";

import { useState } from "react";
import PageNav from "@/app/components/layout/PageNav";
import Footer from "@/app/components/layout/Footer";

const contactItems = [
  {
    label: "Email",
    value: "info@mepcompliance.com",
    href: "mailto:info@mepcompliance.com",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    label: "Teléfono",
    value: "+54 11 4916-9760",
    href: "tel:+541149169760",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
  },
];

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending contact form", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8f6" }}>
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
            Contacto
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[0.95] max-w-3xl"
            style={{
              fontFamily: "var(--font-rhymes)",
              fontWeight: 600,
              color: "#F5E6C8",
            }}
          >
            Hablemos
          </h1>
          <p
            className="mt-6 text-base sm:text-lg max-w-2xl"
            style={{
              fontFamily: "var(--font-monument)",
              color: "rgba(245, 230, 200, 0.75)",
              lineHeight: 1.7,
            }}
          >
            Estamos listos para ayudarte a transformar el cumplimiento normativo
            en ventaja competitiva.
          </p>
        </div>
      </section>

      {/* Contacto: datos + formulario — fondo claro */}
      <section
        className="py-16 lg:py-24"
        style={{
          backgroundColor: "#f8f8f6",
          borderBottom: "1px solid rgba(26, 26, 26, 0.08)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Columna izquierda: datos de contacto */}
            <div className="lg:col-span-5">
              <h2
                className="text-xl sm:text-2xl mb-6"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Datos de contacto
              </h2>
              <p
                className="text-sm mb-8"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.7)",
                  lineHeight: 1.65,
                }}
              >
                Escribinos por email o llamanos. Te respondemos a la brevedad.
              </p>
              <div className="space-y-4">
                {contactItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-5 p-5 rounded-xl border border-neutral-200 bg-white hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300 ease-out"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[10px] uppercase tracking-[0.2em] mb-1"
                        style={{
                          fontFamily: "var(--font-monument)",
                          color: "rgba(26, 26, 26, 0.5)",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-base sm:text-lg break-all sm:break-normal font-medium"
                        style={{
                          fontFamily: "var(--font-monument)",
                          color: "#1a1a1a",
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Columna derecha: formulario */}
            <div className="lg:col-span-7">
              <h2
                className="text-xl sm:text-2xl mb-2"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Enviar mensaje
              </h2>
              <p
                className="text-sm mb-10"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.7)",
                  lineHeight: 1.65,
                }}
              >
                Completá el formulario y te contestamos por email. Los datos se
                almacenan de forma segura y sólo se utilizan para responder tu
                consulta.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] uppercase tracking-[0.2em] mb-2"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(26, 26, 26, 0.6)",
                    }}
                  >
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-200 placeholder:text-neutral-400"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#1a1a1a",
                      fontSize: "15px",
                    }}
                    placeholder="Su nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] uppercase tracking-[0.2em] mb-2"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(26, 26, 26, 0.6)",
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-200 placeholder:text-neutral-400"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#1a1a1a",
                      fontSize: "15px",
                    }}
                    placeholder="su@email.com"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[10px] uppercase tracking-[0.2em] mb-2"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(26, 26, 26, 0.6)",
                      }}
                    >
                      Teléfono (opcional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-200 placeholder:text-neutral-400"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "#1a1a1a",
                        fontSize: "15px",
                      }}
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-[10px] uppercase tracking-[0.2em] mb-2"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "rgba(26, 26, 26, 0.6)",
                      }}
                    >
                      Empresa / Organización (opcional)
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-200 placeholder:text-neutral-400"
                      style={{
                        fontFamily: "var(--font-monument)",
                        color: "#1a1a1a",
                        fontSize: "15px",
                      }}
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] uppercase tracking-[0.2em] mb-2"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "rgba(26, 26, 26, 0.6)",
                    }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-200 resize-y min-h-[120px] placeholder:text-neutral-400"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#1a1a1a",
                      fontSize: "15px",
                    }}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  />
                </div>
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#D4AF37] rounded-sm transition-all duration-300 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#1a2e24",
                      backgroundColor: "#D4AF37",
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    {!isSubmitting && <span>→</span>}
                  </button>
                  <div className="min-h-[20px]">
                    {submitStatus === "success" && (
                      <p
                        className="text-xs text-emerald-700"
                        style={{ fontFamily: "var(--font-monument)" }}
                      >
                        Gracias por tu mensaje. Te responderemos a la brevedad.
                      </p>
                    )}
                    {submitStatus === "error" && (
                      <p
                        className="text-xs text-red-600"
                        style={{ fontFamily: "var(--font-monument)" }}
                      >
                        Hubo un error al enviar el mensaje. Intentalo de nuevo en
                        unos minutos.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
