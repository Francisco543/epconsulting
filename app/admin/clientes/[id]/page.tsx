"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/app/admin/_components/AdminShell";
import {
  getClient,
  type Client,
} from "@/app/services/clientService";

export default function ClienteViewPage() {
  const { id } = useParams<{ id: string }>();

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getClient(id)
      .then(setClient)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
            Cargando ficha...
          </p>
        </div>
      </AdminShell>
    );
  }

  if (notFound || !client) {
    return (
      <AdminShell>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>
            Cliente no encontrado.
          </p>
          <Link href="/admin/clientes" className="text-sm text-slate-700 underline">
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
          <Link href="/admin/clientes" className="hover:text-slate-600 transition-colors">
            Clientes
          </Link>
          <span>/</span>
          <span className="text-slate-600">{client.company_name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar inicial */}
            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0">
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-rhymes)" }}
              >
                {client.company_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1
                  className="text-2xl font-semibold tracking-tight text-slate-900"
                  style={{ fontFamily: "var(--font-rhymes)" }}
                >
                  {client.company_name}
                </h1>
                <StatusBadge status={client.status} />
              </div>
              <p
                className="text-sm text-slate-500 mt-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Alta:{" "}
                {new Date(client.created_at).toLocaleDateString("es-AR", {
                  dateStyle: "long",
                })}
                {client.cuit && ` · CUIT ${client.cuit}`}
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/admin/clientes/${id}/editar`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828A2 2 0 0110.414 16H8v-2.414a2 2 0 01.586-1.414z" />
              </svg>
              Editar
            </Link>
          </div>
        </div>

        {/* Tarjetas de información */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Empresa">
            <InfoRow label="Razón social" value={client.company_name} />
            <InfoRow label="CUIT" value={client.cuit} />
            <InfoRow label="Industria" value={client.industry} />
            <InfoRow label="Teléfono" value={client.phone} />
          </InfoCard>

          <InfoCard title="Contacto / Gestor">
            <InfoRow label="Nombre" value={client.contact_name} />
            <InfoRow label="Email" value={client.contact_email} mono={false} />
            {client.gestor_id && (
              <InfoRow label="ID de usuario" value={client.gestor_id} mono />
            )}
          </InfoCard>
        </div>

        {/* Notas internas */}
        {client.notes && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-2">
            <p
              className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Notas internas
            </p>
            <p
              className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {client.notes}
            </p>
          </div>
        )}

        {/* Pie técnico */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-1 rounded-xl border border-slate-100 bg-slate-50/60 px-5 py-3 text-xs text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>
            <span className="text-slate-500 font-medium">ID</span>{" "}
            <span className="font-mono">{client.id}</span>
          </span>
          <span>
            <span className="text-slate-500 font-medium">Creado</span>{" "}
            {new Date(client.created_at).toLocaleString("es-AR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
          <span>
            <span className="text-slate-500 font-medium">Actualizado</span>{" "}
            {new Date(client.updated_at).toLocaleString("es-AR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>

    </AdminShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Info card / row
// ─────────────────────────────────────────────────────────────
function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-3">
      <p
        className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {title}
      </p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </span>
      <span
        className={`text-sm text-slate-800 ${mono ? "font-mono text-xs" : ""}`}
        style={{ fontFamily: mono ? undefined : "var(--font-inter)" }}
      >
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-slate-100 text-slate-500"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {status === "active" ? "Activo" : "Inactivo"}
    </span>
  );
}
