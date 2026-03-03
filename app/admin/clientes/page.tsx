"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AdminShell } from "@/app/admin/_components/AdminShell";
import { listClients, type Client } from "@/app/services/clientService";

// Componente interno que usa useSearchParams (requiere Suspense)
function CreatedToast({
  onMessage,
}: {
  onMessage: (msg: string | null) => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const created = searchParams.get("created");
    onMessage(
      created
        ? `Cliente "${decodeURIComponent(created)}" creado. Invitación enviada.`
        : null,
    );
  }, [searchParams, onMessage]);
  return null;
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    listClients()
      .then(setClients)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleToastMessage = (msg: string | null) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setSuccessMsg(msg);
    if (msg) toastTimer.current = setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <AdminShell>
      <Suspense fallback={null}>
        <CreatedToast onMessage={handleToastMessage} />
      </Suspense>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-semibold tracking-tight text-slate-900"
              style={{ fontFamily: "var(--font-rhymes)" }}
            >
              Clientes
            </h1>
            <p
              className="text-sm text-slate-500 mt-0.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {loading
                ? "Cargando..."
                : `${clients.length} empresa${clients.length !== 1 ? "s" : ""} registrada${clients.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Link
            href="/admin/clientes/nuevo"
            className="inline-flex items-center gap-1.5 shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo cliente
          </Link>
        </div>

        {/* Toast éxito */}
        {successMsg && (
          <div
            className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <svg
              className="w-4 h-4 shrink-0 text-green-600"
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
            {successMsg}
          </div>
        )}

        {/* Lista */}
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
            <p
              className="text-sm text-slate-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cargando clientes...
            </p>
          </div>
        ) : clients.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center space-y-4">
            <p
              className="text-sm text-slate-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Todavía no hay clientes registrados.
            </p>
            <Link
              href="/admin/clientes/nuevo"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Crear el primero
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  {["Empresa", "Gestor", "Industria", "Estado", "Alta", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p
                        className="font-semibold text-slate-900"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {c.company_name}
                      </p>
                      {c.cuit && (
                        <p className="text-xs text-slate-400">{c.cuit}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p
                        className="text-slate-800"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {c.contact_name ?? "—"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {c.contact_email}
                      </p>
                    </td>
                    <td
                      className="px-4 py-3 text-slate-600"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {c.industry ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td
                      className="px-4 py-3 text-xs text-slate-400"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {new Date(c.created_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <ActionButton
                          href={`/admin/clientes/${c.id}`}
                          label="Ver ficha"
                          icon={<IconEye />}
                          variant="default"
                        />
                        <ActionButton
                          href={`/admin/clientes/${c.id}/editar`}
                          label="Editar"
                          icon={<IconPencil />}
                          variant="default"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Componentes internos
// ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
        status === "active"
          ? "bg-green-100 text-green-800"
          : "bg-slate-100 text-slate-600"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {status === "active" ? "Activo" : "Inactivo"}
    </span>
  );
}

type ActionButtonProps =
  | {
      href: string;
      label: string;
      icon: React.ReactNode;
      variant: "default" | "danger";
      onClick?: never;
    }
  | {
      href?: never;
      label: string;
      icon: React.ReactNode;
      variant: "default" | "danger";
      onClick: () => void;
    };

function ActionButton({
  href,
  label,
  icon,
  variant,
  onClick,
}: ActionButtonProps) {
  const base =
    "group relative flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-150";
  const styles =
    variant === "danger"
      ? `${base} border-transparent text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600`
      : `${base} border-transparent text-slate-400 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-800`;

  const tooltip = (
    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
      {label}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={styles} aria-label={label}>
        {icon}
        {tooltip}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles}
      aria-label={label}
    >
      {icon}
      {tooltip}
    </button>
  );
}

function IconEye() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828A2 2 0 0110.414 16H8v-2.414a2 2 0 01.586-1.414z"
      />
    </svg>
  );
}
