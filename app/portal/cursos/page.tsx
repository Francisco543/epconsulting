"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";
import { signOut } from "@/app/services/authService";
import Logo from "@/app/components/layout/Logo";

// ─────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────
type CourseAssignment = {
  id: string;
  status: "pending" | "in_progress" | "completed";
  score: number | null;
  certificate_url: string | null;
  assigned_at: string;
  completed_at: string | null;
  courses: { id: string; title: string; passing_score: number; category: string } | null;
};

type EmployeeWithCourses = {
  id: string;
  full_name: string;
  email: string;
  status: string;
  employee_course_assignments: CourseAssignment[];
};

const statusLabel: Record<string, { label: string; dot: string; badge: string }> = {
  pending:     { label: "Pendiente",   dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-700 border-amber-200" },
  in_progress: { label: "En curso",    dot: "bg-blue-500",   badge: "bg-blue-50 text-blue-700 border-blue-200" },
  completed:   { label: "Completado",  dot: "bg-green-500",  badge: "bg-green-50 text-green-700 border-green-200" },
};

// ─────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────
export default function PortalCursosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeeWithCourses[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) { router.replace("/portal/login"); return; }

      const { data: profile } = await supabase
        .from("profiles").select("full_name, role").eq("id", session.user.id).single();
      if (!profile || profile.role !== "gestor") {
        await supabase.auth.signOut();
        router.replace("/portal/login");
        return;
      }
      setUserName(profile.full_name ?? session.user.email ?? null);

      // Empresa
      const companyRes = await fetch("/api/portal/company");
      if (companyRes.ok) {
        const co = await companyRes.json();
        setCompanyName(co?.company_name ?? null);
      }

      // Empleados con asignaciones
      const empRes = await fetch("/api/portal/employees", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (empRes.ok) {
        const data = await empRes.json() as EmployeeWithCourses[];
        setEmployees(data);
      }

      setLoading(false);
    };
    void init();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Cargando...</p>
      </div>
    );
  }

  // Estadísticas agregadas
  const allAssignments = employees.flatMap((e) => e.employee_course_assignments ?? []);
  const total = allAssignments.length;
  const completed = allAssignments.filter((a) => a.status === "completed").length;
  const inProgress = allAssignments.filter((a) => a.status === "in_progress").length;
  const withCert = allAssignments.filter((a) => a.certificate_url).length;

  // Empleados que tienen al menos una asignación
  const employeesWithCourses = employees.filter((e) => (e.employee_course_assignments ?? []).length > 0);
  const employeesWithoutCourses = employees.filter((e) => (e.employee_course_assignments ?? []).length === 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo href="/portal" />
          <nav className="flex items-center gap-1 text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
            <Link href="/portal" className="hover:text-slate-600 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-slate-600">Cursos</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>
            {companyName ?? userName}
          </span>
          <button
            type="button"
            onClick={async () => { await signOut(); router.replace("/portal/login"); }}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Salir
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        {/* Título */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-rhymes)" }}>
            Cursos asignados
          </h1>
          <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            Seguimiento del progreso de tus empleados en los cursos de compliance.
          </p>
        </div>

        {/* Métricas rápidas */}
        {total > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Asignaciones totales", value: total, color: "text-slate-900" },
              { label: "En curso",             value: inProgress, color: "text-blue-600" },
              { label: "Completadas",          value: completed,  color: "text-green-600" },
              { label: "Certificados emitidos",value: withCert,   color: "text-amber-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm text-center">
                <p className={`text-3xl font-bold ${color}`} style={{ fontFamily: "var(--font-inter)" }}>{value}</p>
                <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Sin datos */}
        {employees.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>
              No hay empleados dados de alta todavía
            </p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Cuando el admin apruebe la solicitud de alta de tus empleados y les asigne cursos, verás el progreso acá.
            </p>
            <Link
              href="/portal/empleados"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ir a Empleados
            </Link>
          </div>
        ) : total === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center space-y-3">
            <p className="text-sm font-medium text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>
              Ningún empleado tiene cursos asignados aún
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              El administrador de MEP Compliance asigna los cursos al aprobar solicitudes de alta. Cuando estén asignados, el progreso aparecerá aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Empleados con cursos */}
            {employeesWithCourses.map((emp) => {
              const assignments = emp.employee_course_assignments ?? [];
              return (
                <div key={emp.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  {/* Header empleado */}
                  <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-50/60 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-slate-600">{emp.full_name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>
                        {emp.full_name}
                      </p>
                      <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>{emp.email}</p>
                    </div>
                    <span className="ml-auto text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                      {assignments.length} curso{assignments.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Lista de cursos */}
                  <div className="divide-y divide-slate-100">
                    {assignments.map((a) => {
                      const course = a.courses;
                      if (!course) return null;
                      const sc = statusLabel[a.status] ?? statusLabel.pending;
                      const passed = a.status === "completed" && a.score !== null && a.score >= course.passing_score;
                      const failed = a.status === "completed" && a.score !== null && a.score < course.passing_score;

                      return (
                        <div key={a.id} className="flex items-center gap-4 px-5 py-4">
                          {/* Icono */}
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate" style={{ fontFamily: "var(--font-inter)" }}>
                              {course.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              {course.category && (
                                <span className="text-[11px] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                                  {course.category}
                                </span>
                              )}
                              <span className="text-[11px] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                                Mín. {course.passing_score}%
                              </span>
                              {a.completed_at && (
                                <span className="text-[11px] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                                  Completado el {new Date(a.completed_at).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Score */}
                          {a.score !== null && (
                            <div className="text-right shrink-0">
                              <p className={`text-lg font-bold ${passed ? "text-green-600" : failed ? "text-red-500" : "text-slate-700"}`} style={{ fontFamily: "var(--font-inter)" }}>
                                {a.score}%
                              </p>
                              <p className="text-[11px] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                                {passed ? "Aprobado" : "Reprobado"}
                              </p>
                            </div>
                          )}

                          {/* Badge status */}
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold shrink-0 ${sc.badge}`} style={{ fontFamily: "var(--font-inter)" }}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {sc.label}
                          </span>

                          {/* Certificado */}
                          {a.certificate_url && (
                            <a
                              href={a.certificate_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Descargar certificado"
                              className="inline-flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1.5 text-[11px] font-semibold text-amber-700 hover:bg-amber-100 transition-colors shrink-0"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Certificado
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Empleados sin cursos asignados */}
            {employeesWithoutCourses.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50/60 border-b border-slate-100">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                    Sin cursos asignados ({employeesWithoutCourses.length})
                  </p>
                </div>
                <div className="divide-y divide-slate-100">
                  {employeesWithoutCourses.map((emp) => (
                    <div key={emp.id} className="flex items-center gap-3 px-5 py-3.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-slate-400">{emp.full_name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-inter)" }}>{emp.full_name}</p>
                        <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>{emp.email}</p>
                      </div>
                      <span className="ml-auto text-xs text-slate-300" style={{ fontFamily: "var(--font-inter)" }}>Sin cursos</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
