"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/app/admin/_components/AdminShell";
import {
  getClient,
  updateClient,
  type Client,
  type UpdateClientInput,
} from "@/app/services/clientService";

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

export default function ClienteEditarPage() {
  const { id } = useParams<{ id: string }>();

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState<UpdateClientInput>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getClient(id)
      .then((data) => {
        setClient(data);
        setForm({
          company_name: data.company_name,
          cuit: data.cuit ?? "",
          contact_name: data.contact_name ?? "",
          contact_email: data.contact_email,
          phone: data.phone ?? "",
          industry: data.industry ?? "",
          notes: data.notes ?? "",
          status: data.status,
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (field: keyof UpdateClientInput, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaved(false);
    setSaving(true);
    try {
      const updated = await updateClient(id, form);
      setClient(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20">
          <p
            className="text-sm text-slate-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Cargando datos...
          </p>
        </div>
      </AdminShell>
    );
  }

  if (notFound || !client) {
    return (
      <AdminShell>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p
            className="text-sm text-slate-500"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Cliente no encontrado.
          </p>
          <Link
            href="/admin/clientes"
            className="text-sm text-slate-700 underline"
          >
            Volver a clientes
          </Link>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="space-y-6 max-w-3xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-xs text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Link
            href="/admin/clientes"
            className="hover:text-slate-600 transition-colors"
          >
            Clientes
          </Link>
          <span>/</span>
          <Link
            href={`/admin/clientes/${id}`}
            className="hover:text-slate-600 transition-colors"
          >
            {client.company_name}
          </Link>
          <span>/</span>
          <span className="text-slate-600">Editar</span>
        </nav>

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-semibold tracking-tight text-slate-900"
              style={{ fontFamily: "var(--font-rhymes)" }}
            >
              Editar empresa
            </h1>
            <p
              className="text-sm text-slate-500 mt-0.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {client.company_name}
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSave}
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
                value={form.company_name ?? ""}
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
              <div>
                <label
                  className="block text-xs font-semibold text-slate-500 uppercase mb-1.5"
                  style={{
                    fontFamily: "var(--font-inter)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Estado
                </label>
                <div className="flex gap-2">
                  {(["active", "inactive"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("status", s)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors ${
                        form.status === s
                          ? s === "active"
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {s === "active" ? "Activo" : "Inactivo"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sección: contacto */}
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
                value={form.contact_email ?? ""}
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

          {/* Footer del form */}
          <div className="px-6 py-4 bg-slate-50/60 rounded-b-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/clientes/${id}`}
                className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ← Cancelar
              </Link>
              {saveError && (
                <p
                  className="text-sm text-red-600"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {saveError}
                </p>
              )}
              {saved && (
                <span
                  className="flex items-center gap-1.5 text-sm text-green-700"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Guardado
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-componentes de formulario
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
