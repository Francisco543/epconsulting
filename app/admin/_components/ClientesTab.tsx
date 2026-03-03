"use client";

import { useState } from "react";
import {
  listClients,
  createClient,
  type Client,
  type CreateClientInput,
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

const EMPTY_FORM: CreateClientInput = {
  company_name: "",
  cuit: "",
  contact_name: "",
  contact_email: "",
  phone: "",
  industry: "",
  notes: "",
};

type Props = {
  initialClients: Client[];
};

export function ClientesTab({ initialClients }: Props) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateClientInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const set = (field: keyof CreateClientInput, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSaving(true);

    try {
      const newClient = await createClient(form);
      setClients((prev) => [newClient, ...prev]);
      setSuccessMsg(
        `Cliente "${newClient.company_name}" creado. Se envió un email de invitación a ${newClient.contact_email}.`,
      );
      setForm(EMPTY_FORM);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-semibold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-rhymes)" }}
          >
            Clientes
          </h2>
          <p className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            {clients.length} empresa{clients.length !== 1 ? "s" : ""} registrada
            {clients.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setShowForm((v) => !v); setError(null); setSuccessMsg(null); }}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {showForm ? "Cancelar" : "+ Nuevo cliente"}
        </button>
      </div>

      {/* Toast de éxito */}
      {successMsg && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800" style={{ fontFamily: "var(--font-inter)" }}>
          {successMsg}
        </div>
      )}

      {/* Formulario de creación */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-5"
        >
          <h3
            className="text-base font-semibold text-slate-900"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Nuevo cliente
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Empresa *"
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
            <Field
              label="Nombre del gestor *"
              value={form.contact_name ?? ""}
              onChange={(v) => set("contact_name", v)}
              placeholder="Nombre y apellido"
            />
            <Field
              label="Email del gestor *"
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
            <div>
              <label
                className="block text-xs font-semibold text-slate-500 uppercase mb-1.5"
                style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
              >
                Industria
              </label>
              <select
                value={form.industry ?? ""}
                onChange={(e) => set("industry", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <option value="">Seleccionar industria</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-semibold text-slate-500 uppercase mb-1.5"
              style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
            >
              Notas internas
            </label>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Contexto, acuerdos, observaciones..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 resize-none outline-none focus:ring-2 focus:ring-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => { setShowForm(false); setError(null); }}
              className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {saving ? "Creando..." : "Crear cliente y enviar invitación"}
            </button>
          </div>
        </form>
      )}

      {/* Lista de clientes */}
      {clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
            Todavía no hay clientes registrados.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Empresa", "Gestor", "Industria", "Estado", "Alta"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>
                      {c.company_name}
                    </p>
                    {c.cuit && (
                      <p className="text-xs text-slate-400">{c.cuit}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-slate-800" style={{ fontFamily: "var(--font-inter)" }}>
                      {c.contact_name ?? "—"}
                    </p>
                    <p className="text-xs text-slate-400">{c.contact_email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600" style={{ fontFamily: "var(--font-inter)" }}>
                    {c.industry ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        c.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {c.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                    {new Date(c.created_at).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Campo de texto reutilizable
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
