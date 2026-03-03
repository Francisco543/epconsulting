"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/app/admin/_components/AdminShell";
import { createClient, type CreateClientInput } from "@/app/services/clientService";

const INDUSTRIES = [
  "Financiero / Bancario",
  "Seguros",
  "Mercado de Capitales",
  "Criptoactivos / VASPs",
  "Contabilidad / Auditoría",
  "Legal / Notarial",
  "Inmobiliario",
  "Automotriz",
  "Salud",
  "Tecnología",
  "Otro",
];

const EMPTY: CreateClientInput = {
  company_name: "",
  cuit: "",
  contact_name: "",
  contact_email: "",
  phone: "",
  industry: "",
  notes: "",
};

export default function NuevoClientePage() {
  const router = useRouter();
  const [form, setForm] = useState<CreateClientInput>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof CreateClientInput, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const newClient = await createClient(form);
      router.push(
        `/admin/clientes?created=${encodeURIComponent(newClient.company_name)}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setSaving(false);
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6 max-w-3xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-xs text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Link href="/admin/clientes" className="hover:text-slate-600 transition-colors">
            Clientes
          </Link>
          <span>/</span>
          <span className="text-slate-600">Nuevo cliente</span>
        </nav>

        {/* Header */}
        <div>
          <h1
            className="text-2xl font-semibold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-rhymes)" }}
          >
            Nuevo cliente
          </h1>
          <p
            className="text-sm text-slate-500 mt-0.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Al crear la empresa se enviará una invitación por email al gestor designado.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100"
        >
          {/* Sección: empresa */}
          <div className="p-6 space-y-4">
            <h2
              className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Datos de la empresa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Razón social *"
                value={form.company_name}
                onChange={(v) => set("company_name", v)}
                placeholder="Nombre de la empresa"
                required
              />
              <Field
                label="CUIT"
                value={form.cuit ?? ""}
                onChange={(v) => set("cuit", v)}
                placeholder="30-12345678-9"
              />
              <SelectField
                label="Industria"
                value={form.industry ?? ""}
                onChange={(v) => set("industry", v)}
                options={INDUSTRIES}
              />
            </div>
          </div>

          {/* Sección: gestor */}
          <div className="p-6 space-y-4">
            <h2
              className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contacto / Gestor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Nombre"
                value={form.contact_name ?? ""}
                onChange={(v) => set("contact_name", v)}
                placeholder="Nombre y apellido"
              />
              <Field
                label="Email *"
                value={form.contact_email}
                onChange={(v) => set("contact_email", v)}
                placeholder="gestor@empresa.com"
                type="email"
                required
              />
              <Field
                label="Teléfono"
                value={form.phone ?? ""}
                onChange={(v) => set("phone", v)}
                placeholder="+54 11 1234-5678"
              />
            </div>
          </div>

          {/* Sección: notas */}
          <div className="p-6 space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Notas internas
            </h2>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
              rows={4}
              placeholder="Contexto, acuerdos, observaciones..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 resize-none outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50/60 rounded-b-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/clientes"
                className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ← Cancelar
              </Link>
              {error && (
                <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Crear y enviar invitación
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-componentes
// ─────────────────────────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="block text-xs font-semibold text-slate-500 uppercase mb-1.5"
        style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-300"
        style={{ fontFamily: "var(--font-inter)" }}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label
        className="block text-xs font-semibold text-slate-500 uppercase mb-1.5"
        style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <option value="">Seleccionar industria</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
