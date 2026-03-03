"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";
import { signOut } from "@/app/services/authService";
import Logo from "@/app/components/layout/Logo";
import {
  listEmployeeRequests,
  listPortalEmployees,
  createEmployeeRequest,
  listPortalCourses,
  type EmployeeRequest,
  type Employee,
  type PortalCourse,
} from "@/app/services/employeeRequestService";

type CourseAssignmentSummary = {
  id: string;
  status: "pending" | "in_progress" | "completed";
  score: number | null;
  certificate_url: string | null;
  completed_at: string | null;
  courses: { id: string; title: string } | null;
};

type EmployeeWithCourses = Employee & {
  employee_course_assignments?: CourseAssignmentSummary[];
};

type Tab = "empleados" | "solicitudes";
type Row = { full_name: string; email: string };

const ROWS_PER_PAGE = 10;

export default function PortalEmpleadosPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("empleados");

  // Tab empleados
  const [employees, setEmployees] = useState<EmployeeWithCourses[]>([]);
  const [loadingEmps, setLoadingEmps] = useState(true);

  // Tab solicitudes
  const [requests, setRequests] = useState<EmployeeRequest[]>([]);
  const [loadingReqs, setLoadingReqs] = useState(true);

  // Form nueva solicitud
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState<Row[]>([{ full_name: "", email: "" }]);
  const [notes, setNotes] = useState("");
  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Cursos disponibles para asignar
  const [availableCourses, setAvailableCourses] = useState<PortalCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Auth check ───
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.replace("/portal/login");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", session.user.id)
        .single();
      if (!profile || profile.role !== "gestor") {
        await supabase.auth.signOut();
        router.replace("/portal/login");
        return;
      }
      setUserName(profile.full_name ?? session.user.email ?? null);
      const res = await fetch("/api/portal/company");
      if (res.ok) {
        const c = await res.json();
        setCompanyName(c?.company_name ?? null);
      }
      setChecking(false);
    });
  }, [router]);

  // ─── Cargar datos ───
  useEffect(() => {
    if (checking) return;
    listPortalEmployees()
      .then(setEmployees)
      .catch(console.error)
      .finally(() => setLoadingEmps(false));
    listEmployeeRequests()
      .then(setRequests)
      .catch(console.error)
      .finally(() => setLoadingReqs(false));
  }, [checking]);

  // ─── Cargar cursos al abrir el form ───
  useEffect(() => {
    if (!showForm || availableCourses.length > 0) return;
    setLoadingCourses(true);
    listPortalCourses()
      .then(setAvailableCourses)
      .catch(console.error)
      .finally(() => setLoadingCourses(false));
  }, [showForm, availableCourses.length]);

  // ─── Excel upload ───
  const handleExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (file.name.endsWith(".csv") || file.name.endsWith(".tsv")) {
      const text = await file.text();
      const lines = text.split("\n").filter(Boolean);
      const parsed: Row[] = [];
      for (const line of lines) {
        const parts = line
          .split(/[,\t;]/)
          .map((s) => s.replace(/["']/g, "").trim());
        const nameIdx = parts.findIndex((p) => !p.includes("@"));
        const emailIdx = parts.findIndex((p) => p.includes("@"));
        if (nameIdx !== -1 && emailIdx !== -1) {
          parsed.push({ full_name: parts[nameIdx], email: parts[emailIdx] });
        }
      }
      if (parsed.length === 0) {
        setFormError("No se encontraron filas válidas en el archivo.");
        return;
      }
      setRows(parsed);
      setPage(1);
      setFormError(null);
      return;
    }

    try {
      const XLSX: typeof import("xlsx") = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
        defval: "",
      });
      const parsed: Row[] = data
        .map((row: Record<string, string>) => {
          const keys = Object.keys(row);
          const nameKey =
            keys.find(
              (k) =>
                k.toLowerCase().includes("nombre") ||
                k.toLowerCase().includes("name"),
            ) ?? keys[0];
          const emailKey =
            keys.find(
              (k) =>
                k.toLowerCase().includes("email") ||
                k.toLowerCase().includes("mail"),
            ) ?? keys[1];
          return {
            full_name: String(row[nameKey] ?? "").trim(),
            email: String(row[emailKey] ?? "").trim(),
          };
        })
        .filter((r: Row) => r.full_name && r.email.includes("@"));
      if (parsed.length === 0) {
        setFormError("No se encontraron columnas válidas (nombre/email).");
        return;
      }
      setRows(parsed);
      setPage(1);
      setFormError(null);
    } catch {
      setFormError("Error al leer el archivo. Probá exportarlo como CSV.");
    }
  };

  // ─── Row helpers ───
  const setRow = (i: number, field: keyof Row, val: string) =>
    setRows((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)),
    );
  const addRow = () =>
    setRows((prev) => [...prev, { full_name: "", email: "" }]);
  const removeRow = (i: number) =>
    setRows((prev) =>
      prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev,
    );

  // ─── Submit ───
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const valid = rows.filter((r) => r.full_name.trim() && r.email.trim());
    if (valid.length === 0) {
      setFormError("Agregá al menos un empleado con nombre y email.");
      return;
    }
    if (!selectedCourseId) {
      setFormError("Seleccioná un curso para asignar a los empleados.");
      return;
    }
    setSaving(true);
    try {
      const newReq = await createEmployeeRequest({
        items: valid,
        notes,
        course_id: selectedCourseId,
      });
      setRequests((prev) => [newReq, ...prev]);
      setSuccessMsg(
        `Solicitud enviada con ${valid.length} empleado${valid.length !== 1 ? "s" : ""}. El admin la revisará pronto.`,
      );
      setRows([{ full_name: "", email: "" }]);
      setNotes("");
      setSelectedCourseId("");
      setShowForm(false);
      setTab("solicitudes");
      setTimeout(() => setSuccessMsg(null), 6000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setSaving(false);
    }
  };

  // ─── Paginación form ───
  const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
  const pagedRows = rows.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE,
  );
  const pagedStart = (page - 1) * ROWS_PER_PAGE;

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p
          className="text-sm text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Cargando...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo href="/portal" />
          <nav
            className="flex items-center gap-1 text-xs text-slate-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Link
              href="/portal"
              className="hover:text-slate-600 transition-colors"
            >
              Inicio
            </Link>
            <span>/</span>
            <span className="text-slate-600">Empleados</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="hidden sm:block text-sm text-slate-500"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {companyName ?? userName}
          </span>
          <button
            type="button"
            onClick={async () => {
              await signOut();
              router.replace("/portal/login");
            }}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Salir
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-semibold text-slate-900"
              style={{ fontFamily: "var(--font-rhymes)" }}
            >
              Empleados
            </h1>
            <p
              className="text-sm text-slate-500 mt-0.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Gestioná el equipo de {companyName ?? "tu empresa"}.
            </p>
          </div>
          {tab === "solicitudes" && (
            <button
              type="button"
              onClick={() => {
                setShowForm((v) => !v);
                setFormError(null);
              }}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {showForm ? (
                "Cancelar"
              ) : (
                <>
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
                  Nueva solicitud
                </>
              )}
            </button>
          )}
        </div>

        {/* Toast éxito */}
        {successMsg && (
          <div
            className="flex items-start gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <svg
              className="w-4 h-4 shrink-0 mt-0.5 text-green-600"
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

        {/* ─── Tabs ─── */}
        <div className="flex gap-1 border-b border-slate-200">
          {[
            {
              id: "empleados" as Tab,
              label: "Empleados",
              count: employees.length,
            },
            {
              id: "solicitudes" as Tab,
              label: "Solicitudes",
              count: pendingCount > 0 ? pendingCount : undefined,
              countLabel: "pendiente",
            },
          ].map(({ id, label, count, countLabel }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setTab(id);
                setShowForm(false);
              }}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === id
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {label}
              {count !== undefined && (
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    tab === id
                      ? "bg-slate-900 text-white"
                      : countLabel === "pendiente"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                  {countLabel ? ` ${countLabel}${count !== 1 ? "s" : ""}` : ""}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════
            TAB: EMPLEADOS
        ═══════════════════════════════════════ */}
        {tab === "empleados" && (
          <div>
            {loadingEmps ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
                <p
                  className="text-sm text-slate-400"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Cargando empleados...
                </p>
              </div>
            ) : employees.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-sm font-medium text-slate-700"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Todavía no hay empleados dados de alta
                  </p>
                  <p
                    className="text-xs text-slate-400 mt-1 max-w-xs mx-auto"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Enviá una solicitud desde la pestaña de Solicitudes y el
                    admin la aprobará.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTab("solicitudes");
                    setShowForm(true);
                  }}
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
                  Enviar solicitud de alta
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
                  <p
                    className="text-xs font-semibold text-slate-500 uppercase tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {employees.length} empleado
                    {employees.length !== 1 ? "s" : ""} activo
                    {employees.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setTab("solicitudes");
                      setShowForm(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
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
                    Agregar más
                  </button>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Nombre</th>
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Email</th>
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Estado</th>
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Cursos / Certificados</th>
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Alta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(employees as EmployeeWithCourses[]).map((emp) => {
                      const assignments = emp.employee_course_assignments ?? [];
                      const completed = assignments.filter((a) => a.status === "completed");
                      const inProgress = assignments.filter((a) => a.status === "in_progress");
                      const withCert = completed.filter((a) => a.certificate_url);
                      return (
                        <tr key={emp.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-3 font-medium text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-slate-600">{emp.full_name.charAt(0).toUpperCase()}</span>
                              </div>
                              {emp.full_name}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-slate-500 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{emp.email}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                              emp.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                            }`} style={{ fontFamily: "var(--font-inter)" }}>
                              {emp.status === "active" ? "Activo" : "Inactivo"}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex flex-wrap gap-1.5">
                              {assignments.length === 0 ? (
                                <span className="text-xs text-slate-300" style={{ fontFamily: "var(--font-inter)" }}>Sin cursos</span>
                              ) : (
                                <>
                                  {inProgress.length > 0 && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700" style={{ fontFamily: "var(--font-inter)" }}>
                                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                                      {inProgress.length} en curso
                                    </span>
                                  )}
                                  {completed.length > 0 && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700" style={{ fontFamily: "var(--font-inter)" }}>
                                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                      {completed.length} completado{completed.length !== 1 ? "s" : ""}
                                    </span>
                                  )}
                                  {withCert.map((a) => (
                                    <a
                                      key={a.id}
                                      href={a.certificate_url!}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={`Ver certificado: ${a.courses?.title ?? "Curso"}`}
                                      className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                                      style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      Certificado
                                    </a>
                                  ))}
                                </>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                            {new Date(emp.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════
            TAB: SOLICITUDES
        ═══════════════════════════════════════ */}
        {tab === "solicitudes" && (
          <div className="space-y-4">
            {/* Form nueva solicitud */}
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                  <div>
                    <h2
                      className="text-sm font-semibold text-slate-900"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Nueva solicitud de alta
                    </h2>
                    <p
                      className="text-xs text-slate-500 mt-0.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Cargá empleados a mano o importá desde CSV/Excel.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.tsv,.xlsx,.xls"
                      className="hidden"
                      onChange={handleExcel}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      Importar CSV / Excel
                    </button>
                  </div>
                </div>

                {/* Tabla editable */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/40">
                        <th
                          className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400 w-8"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          #
                        </th>
                        <th
                          className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          Nombre completo
                        </th>
                        <th
                          className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          Email
                        </th>
                        <th className="w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {pagedRows.map((row, i) => {
                        const idx = pagedStart + i;
                        return (
                          <tr
                            key={idx}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            <td
                              className="px-4 py-2 text-xs text-slate-400 tabular-nums"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {idx + 1}
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={row.full_name}
                                onChange={(e) =>
                                  setRow(idx, "full_name", e.target.value)
                                }
                                placeholder="Nombre y apellido"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-300"
                                style={{ fontFamily: "var(--font-inter)" }}
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="email"
                                value={row.email}
                                onChange={(e) =>
                                  setRow(idx, "email", e.target.value)
                                }
                                placeholder="empleado@empresa.com"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-300"
                                style={{ fontFamily: "var(--font-inter)" }}
                              />
                            </td>
                            <td className="px-2 py-2">
                              <button
                                type="button"
                                onClick={() => removeRow(idx)}
                                disabled={rows.length === 1}
                                className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Footer tabla: agregar fila + paginación */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/40">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={addRow}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
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
                      Agregar fila
                    </button>
                    <span
                      className="text-xs text-slate-400"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {rows.filter((r) => r.full_name && r.email).length} de{" "}
                      {rows.length} completo{rows.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPage(p)}
                            className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                              p === page
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {p}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {/* Selector de curso */}
                <div className="px-6 py-4 border-t border-slate-100 space-y-2">
                  <label
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-400"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Curso a asignar{" "}
                    <span className="text-red-500 normal-case font-normal">
                      *obligatorio
                    </span>
                  </label>
                  {loadingCourses ? (
                    <div className="flex items-center gap-2 py-2">
                      <svg
                        className="w-4 h-4 animate-spin text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      <span
                        className="text-sm text-slate-400"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        Cargando cursos...
                      </span>
                    </div>
                  ) : availableCourses.length === 0 ? (
                    <p
                      className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      No hay cursos publicados disponibles. El admin debe
                      publicar al menos un curso.
                    </p>
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {availableCourses.map((course) => {
                        const selected = selectedCourseId === course.id;
                        return (
                          <button
                            key={course.id}
                            type="button"
                            onClick={() => setSelectedCourseId(course.id)}
                            className={`text-left rounded-xl border px-4 py-3 transition-all ${
                              selected
                                ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p
                                  className={`text-sm font-semibold truncate ${selected ? "text-white" : "text-slate-900"}`}
                                  style={{ fontFamily: "var(--font-inter)" }}
                                >
                                  {course.title}
                                </p>
                                {course.category && (
                                  <p
                                    className={`text-xs mt-0.5 ${selected ? "text-slate-300" : "text-slate-400"}`}
                                    style={{ fontFamily: "var(--font-inter)" }}
                                  >
                                    {course.category}
                                  </p>
                                )}
                              </div>
                              <div
                                className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                  selected
                                    ? "border-white bg-white"
                                    : "border-slate-300"
                                }`}
                              >
                                {selected && (
                                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                                )}
                              </div>
                            </div>
                            <div
                              className={`flex items-center gap-3 mt-2 text-xs ${selected ? "text-slate-300" : "text-slate-400"}`}
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              <span>{course.estimated_minutes} min</span>
                              <span>·</span>
                              <span>Nota mín. {course.passing_score}%</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Notas */}
                <div className="px-6 py-4 border-t border-slate-100 space-y-2">
                  <label
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-400"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Notas para el admin (opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Área, departamento, fecha de ingreso..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 resize-none outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>

                {/* Botones */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
                  <div>
                    {formError && (
                      <p
                        className="text-sm text-red-600"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {formError}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormError(null);
                      }}
                      className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {saving ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        "Enviar solicitud"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Lista de solicitudes */}
            {loadingReqs ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center">
                <p
                  className="text-sm text-slate-400"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Cargando solicitudes...
                </p>
              </div>
            ) : requests.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
                <p
                  className="text-sm text-slate-400"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Todavía no enviaste ninguna solicitud.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => (
                  <RequestCard
                    key={req.id}
                    request={req}
                    courses={availableCourses}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tarjeta de solicitud (colapsable)
// ─────────────────────────────────────────────────────────────
function RequestCard({
  request,
  courses,
}: {
  request: EmployeeRequest;
  courses: PortalCourse[];
}) {
  const [open, setOpen] = useState(false);
  const total = request.employee_request_items.length;
  const created = request.employee_request_items.filter(
    (i) => i.status === "created",
  ).length;
  const courseTitle = request.course_id
    ? (courses.find((c) => c.id === request.course_id)?.title ??
      "Curso asignado")
    : null;

  const statusConfig = {
    pending: {
      label: "Pendiente de revisión",
      classes: "bg-amber-100 text-amber-700",
    },
    approved: { label: "Aprobada", classes: "bg-green-100 text-green-700" },
    rejected: { label: "Rechazada", classes: "bg-red-100 text-red-600" },
  };
  const sc = statusConfig[request.status];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/60 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${sc.classes}`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {sc.label}
          </span>
          <span
            className="text-sm text-slate-700"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {total} empleado{total !== 1 ? "s" : ""}
            {request.status === "approved" &&
              ` · ${created} dado${created !== 1 ? "s" : ""} de alta`}
          </span>
          {courseTitle && (
            <span
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[11px] font-medium text-blue-700"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {courseTitle}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-xs text-slate-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {new Date(request.created_at).toLocaleDateString("es-AR", {
              dateStyle: "medium",
            })}
          </span>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100">
          {request.notes && (
            <p
              className="px-5 py-3 text-xs text-slate-500 border-b border-slate-100"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="font-semibold text-slate-600">Notas:</span>{" "}
              {request.notes}
            </p>
          )}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100">
                <th
                  className="px-5 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Nombre
                </th>
                <th
                  className="px-5 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Email
                </th>
                <th
                  className="px-5 py-2.5 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-400"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {request.employee_request_items.map((item) => {
                const cfg = {
                  pending: {
                    label: "Pendiente",
                    cls: "bg-amber-100 text-amber-700",
                  },
                  created: {
                    label: "Creado",
                    cls: "bg-green-100 text-green-700",
                  },
                  rejected: {
                    label: "Rechazado",
                    cls: "bg-red-100 text-red-600",
                  },
                }[item.status];
                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td
                      className="px-5 py-2.5 text-slate-800"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.full_name}
                    </td>
                    <td
                      className="px-5 py-2.5 text-slate-500 text-xs"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.email}
                    </td>
                    <td className="px-5 py-2.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${cfg.cls}`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {cfg.label}
                      </span>
                      {item.error_msg && (
                        <p
                          className="text-[11px] text-red-500 mt-0.5"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {item.error_msg}
                        </p>
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
