"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/app/admin/_components/AdminShell";
import { ConfirmModal } from "@/app/admin/_components/ConfirmModal";
import {
  listEmployeeRequests,
  approveEmployeeRequest,
  rejectEmployeeRequest,
  type AdminEmployeeRequest,
} from "@/app/services/adminEmployeeService";

type StatusFilter = "pending" | "approved" | "rejected";

export default function SolicitudesPage() {
  const [filter, setFilter] = useState<StatusFilter>("pending");
  const [requests, setRequests] = useState<AdminEmployeeRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [approveTarget, setApproveTarget] = useState<AdminEmployeeRequest | null>(null);
  const [rejectTarget, setRejectTarget] = useState<AdminEmployeeRequest | null>(null);
  const [processing, setProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const load = async (status: StatusFilter) => {
    setLoading(true);
    try {
      const data = await listEmployeeRequests(status);
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(filter); }, [filter]);

  const handleApprove = async () => {
    if (!approveTarget) return;
    setProcessing(true);
    try {
      const result = await approveEmployeeRequest(approveTarget.id);
      const ok = result.results.filter((r) => r.ok).length;
      const fail = result.results.filter((r) => !r.ok).length;
      setFeedback({
        ok: ok > 0,
        msg: fail === 0
          ? `${ok} empleado${ok !== 1 ? "s" : ""} dado${ok !== 1 ? "s" : ""} de alta correctamente.`
          : `${ok} creado${ok !== 1 ? "s" : ""}, ${fail} con error. Revisá los detalles.`,
      });
      await load(filter);
    } catch (err) {
      setFeedback({ ok: false, msg: err instanceof Error ? err.message : "Error al aprobar" });
    } finally {
      setProcessing(false);
      setApproveTarget(null);
      setTimeout(() => setFeedback(null), 6000);
    }
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    setProcessing(true);
    try {
      await rejectEmployeeRequest(rejectTarget.id);
      setFeedback({ ok: false, msg: "Solicitud rechazada." });
      await load(filter);
    } catch (err) {
      setFeedback({ ok: false, msg: err instanceof Error ? err.message : "Error al rechazar" });
    } finally {
      setProcessing(false);
      setRejectTarget(null);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900" style={{ fontFamily: "var(--font-rhymes)" }}>
            Solicitudes de empleados
          </h1>
          <p className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            Revisá y aprobá las solicitudes de alta enviadas por los gestores.
          </p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
            feedback.ok
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-amber-200 bg-amber-50 text-amber-800"
          }`} style={{ fontFamily: "var(--font-inter)" }}>
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              {feedback.ok
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />}
            </svg>
            {feedback.msg}
          </div>
        )}

        {/* Filtros */}
        <div className="flex gap-2">
          {(["pending", "approved", "rejected"] as StatusFilter[]).map((s) => {
            const labels = { pending: "Pendientes", approved: "Aprobadas", rejected: "Rechazadas" };
            return (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors ${
                  filter === s
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {labels[s]}
              </button>
            );
          })}
        </div>

        {/* Lista */}
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
            <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Cargando...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
              No hay solicitudes {filter === "pending" ? "pendientes" : filter === "approved" ? "aprobadas" : "rechazadas"}.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onApprove={() => setApproveTarget(req)}
                onReject={() => setRejectTarget(req)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!approveTarget}
        variant="default"
        title="Aprobar solicitud"
        description={`¿Confirmás el alta de ${approveTarget?.employee_request_items.length ?? 0} empleado${(approveTarget?.employee_request_items.length ?? 0) !== 1 ? "s" : ""} de "${approveTarget?.clients?.company_name}"? Se crearán sus usuarios y se les enviará un email de invitación.`}
        confirmLabel="Sí, aprobar y enviar invitaciones"
        loading={processing}
        onConfirm={handleApprove}
        onCancel={() => setApproveTarget(null)}
      />

      <ConfirmModal
        isOpen={!!rejectTarget}
        variant="danger"
        title="Rechazar solicitud"
        description={`¿Estás seguro de rechazar la solicitud de "${rejectTarget?.clients?.company_name}"? Los empleados no serán dados de alta.`}
        confirmLabel="Sí, rechazar"
        loading={processing}
        onConfirm={handleReject}
        onCancel={() => setRejectTarget(null)}
      />
    </AdminShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Tarjeta de solicitud
// ─────────────────────────────────────────────────────────────
function RequestCard({
  request,
  onApprove,
  onReject,
}: {
  request: AdminEmployeeRequest;
  onApprove: () => void;
  onReject: () => void;
}) {
  const [open, setOpen] = useState(false);
  const items = request.employee_request_items;

  const statusConfig = {
    pending: { label: "Pendiente", classes: "bg-amber-100 text-amber-700" },
    approved: { label: "Aprobada", classes: "bg-green-100 text-green-700" },
    rejected: { label: "Rechazada", classes: "bg-red-100 text-red-600" },
  };
  const sc = statusConfig[request.status];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header de la card */}
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${sc.classes}`} style={{ fontFamily: "var(--font-inter)" }}>
              {sc.label}
            </span>
            <span className="text-sm font-semibold text-slate-900 truncate" style={{ fontFamily: "var(--font-inter)" }}>
              {request.clients?.company_name ?? "—"}
            </span>
            <span className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
              · {request.profiles?.full_name ?? request.profiles?.email ?? "gestor"} · {items.length} empleado{items.length !== 1 ? "s" : ""}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            Enviada el {new Date(request.created_at).toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short" })}
          </p>
          {request.notes && (
            <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
              <span className="font-semibold">Notas:</span> {request.notes}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {request.status === "pending" && (
            <>
              <button
                type="button"
                onClick={onApprove}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Aprobar
              </button>
              <button
                type="button"
                onClick={onReject}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Rechazar
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
            aria-label="Ver detalle"
          >
            <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Detalle colapsable */}
      {open && (
        <div className="border-t border-slate-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Nombre</th>
                <th className="px-5 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Email</th>
                <th className="px-5 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const cfg = {
                  pending: { label: "Pendiente", cls: "bg-amber-100 text-amber-700" },
                  created: { label: "Creado", cls: "bg-green-100 text-green-700" },
                  rejected: { label: "Rechazado", cls: "bg-red-100 text-red-600" },
                }[item.status];
                return (
                  <tr key={item.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-5 py-2.5 text-slate-800" style={{ fontFamily: "var(--font-inter)" }}>{item.full_name}</td>
                    <td className="px-5 py-2.5 text-slate-500 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{item.email}</td>
                    <td className="px-5 py-2.5">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${cfg.cls}`} style={{ fontFamily: "var(--font-inter)" }}>
                        {cfg.label}
                      </span>
                      {item.error_msg && (
                        <p className="text-[11px] text-red-500 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{item.error_msg}</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
