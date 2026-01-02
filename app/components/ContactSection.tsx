"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative py-32 bg-white overflow-hidden border-t border-zinc-200">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Information */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-200 mb-6">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span
                className="text-xs font-semibold uppercase tracking-wider text-zinc-700"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Contacto
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hablemos de su
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                Proyecto
              </span>
            </h2>

            <p
              className="text-xl text-zinc-600 mb-12 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Estamos aquí para ayudarle. Contáctenos para una consulta
              inicial y descubra cómo podemos apoyar sus necesidades de
              compliance y prevención de lavado de activos.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4 p-6 bg-zinc-50 rounded-xl border border-zinc-200 hover:border-orange-500 transition-all duration-300 hover:shadow-lg group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider text-zinc-600 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Email
                  </h3>
                  <a
                    href="mailto:info@estudiopalomeque.com"
                    className="text-lg text-zinc-900 hover:text-orange-600 transition-colors font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    info@estudiopalomeque.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-zinc-50 rounded-xl border border-zinc-200 hover:border-orange-500 transition-all duration-300 hover:shadow-lg group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider text-zinc-600 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Teléfono
                  </h3>
                  <a
                    href="tel:+541112345678"
                    className="text-lg text-zinc-900 hover:text-orange-600 transition-colors font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    +54 11 1234-5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-zinc-50 rounded-xl border border-zinc-200 hover:border-orange-500 transition-all duration-300 hover:shadow-lg group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider text-zinc-600 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Ubicación
                  </h3>
                  <p
                    className="text-lg text-zinc-900 font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="p-6 bg-zinc-50 rounded-xl border border-orange-500/20">
              <h3
                className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Horario de Atención
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span
                    className="text-zinc-700 font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Lunes - Viernes
                  </span>
                  <span
                    className="text-zinc-600"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    9:00 - 18:00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-zinc-700 font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Sábados
                  </span>
                  <span
                    className="text-zinc-600"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Con cita previa
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-8 bg-white rounded-2xl border border-zinc-200 shadow-xl">
                <div className="space-y-6">
                  {/* Name */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-semibold text-zinc-700 mb-2 uppercase tracking-wider transition-colors ${
                        focusedField === "name" ? "text-orange-600" : ""
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-4 bg-white border-2 rounded-lg transition-all duration-200 text-zinc-900 placeholder:text-zinc-400 ${
                        focusedField === "name"
                          ? "border-orange-500 ring-4 ring-orange-500/10"
                          : "border-zinc-300 hover:border-zinc-400"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-semibold text-zinc-700 mb-2 uppercase tracking-wider transition-colors ${
                        focusedField === "email" ? "text-orange-600" : ""
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-4 bg-white border-2 rounded-lg transition-all duration-200 text-zinc-900 placeholder:text-zinc-400 ${
                        focusedField === "email"
                          ? "border-orange-500 ring-4 ring-orange-500/10"
                          : "border-zinc-300 hover:border-zinc-400"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                      placeholder="Ej: juan.perez@empresa.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className={`block text-sm font-semibold text-zinc-700 mb-2 uppercase tracking-wider transition-colors ${
                        focusedField === "phone" ? "text-orange-600" : ""
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-white border-2 rounded-lg transition-all duration-200 text-zinc-900 placeholder:text-zinc-400 ${
                        focusedField === "phone"
                          ? "border-orange-500 ring-4 ring-orange-500/10"
                          : "border-zinc-300 hover:border-zinc-400"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                      placeholder="Ej: +54 11 1234-5678"
                    />
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <label
                      htmlFor="company"
                      className={`block text-sm font-semibold text-zinc-700 mb-2 uppercase tracking-wider transition-colors ${
                        focusedField === "company" ? "text-orange-600" : ""
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Empresa / Organización
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-white border-2 rounded-lg transition-all duration-200 text-zinc-900 placeholder:text-zinc-400 ${
                        focusedField === "company"
                          ? "border-orange-500 ring-4 ring-orange-500/10"
                          : "border-zinc-300 hover:border-zinc-400"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                      placeholder="Ej: Empresa S.A."
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className={`block text-sm font-semibold text-zinc-700 mb-2 uppercase tracking-wider transition-colors ${
                        focusedField === "message" ? "text-orange-600" : ""
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={6}
                      className={`w-full px-4 py-4 bg-white border-2 rounded-lg transition-all duration-200 text-zinc-900 placeholder:text-zinc-400 resize-none ${
                        focusedField === "message"
                          ? "border-orange-500 ring-4 ring-orange-500/10"
                          : "border-zinc-300 hover:border-zinc-400"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                      placeholder="Cuéntenos sobre su consulta o proyecto. Estaremos encantados de ayudarle..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span>Enviar Consulta</span>
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Privacy Note */}
              <p
                className="text-sm text-zinc-500 text-center leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Al enviar este formulario, acepta nuestra{" "}
                <Link
                  href="/privacidad"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  Política de Privacidad
                </Link>
                . Sus datos serán tratados con la máxima confidencialidad.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
