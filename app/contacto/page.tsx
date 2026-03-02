"use client";

import { useState } from "react";
import PageNav from "@/app/components/PageNav";
import FooterHero from "@/app/components/FooterHero";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Consulta desde MEP Compliance");
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    );
    window.location.href = `mailto:info@mepcompliance.com?subject=${subject}&body=${body}`;
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
                className="text-xl sm:text-2xl mb-6"
                style={{
                  fontFamily: "var(--font-rhymes)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Enviar mensaje
              </h2>
              <p
                className="text-sm mb-8"
                style={{
                  fontFamily: "var(--font-monument)",
                  color: "rgba(26, 26, 26, 0.7)",
                  lineHeight: 1.65,
                }}
              >
                Completá el formulario y te contestamos por email.
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
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#D4AF37] rounded-sm transition-all duration-300 hover:opacity-90"
                    style={{
                      fontFamily: "var(--font-monument)",
                      color: "#1a2e24",
                      backgroundColor: "#D4AF37",
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Enviar mensaje
                    <span>→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterHero />
    </div>
  );
}
