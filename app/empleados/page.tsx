"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";
import { signOut } from "@/app/services/authService";
import Logo from "@/app/components/layout/Logo";

type AssignmentStatus = "pending" | "in_progress" | "completed";

type CourseAssignment = {
  id: string;
  status: AssignmentStatus;
  assigned_at: string;
  started_at: string | null;
  completed_at: string | null;
  score: number | null;
  certificate_url: string;
  courses: {
    id: string;
    title: string;
    description: string;
    category: string;
    estimated_minutes: number;
    passing_score: number;
  } | null;
};

async function fetchMyCourses(token: string): Promise<CourseAssignment[]> {
  const res = await fetch("/api/empleados/my-courses", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return (await res.json()) as CourseAssignment[];
}

export default function EmpleadoDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<CourseAssignment[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/empleados/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", session.user.id)
        .single();

      if (!profile || profile.role !== "empleado") {
        await supabase.auth.signOut();
        router.replace("/empleados/login");
        return;
      }

      setUserName(profile.full_name ?? session.user.email ?? null);

      // Empresa del empleado
      const { data: employee } = await supabase
        .from("employees")
        .select("client_id, clients(company_name)")
        .eq("user_id", session.user.id)
        .single();

      if (employee) {
        const cn = (employee.clients as unknown as { company_name: string } | null)?.company_name;
        setCompanyName(cn ?? null);
      }

      setLoading(false);

      // Cursos asignados
      const token = session.access_token;
      fetchMyCourses(token)
        .then(setAssignments)
        .catch(console.error)
        .finally(() => setLoadingCourses(false));
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo href="/empleados" />
          {companyName && (
            <span className="hidden sm:block text-xs text-slate-400 border-l border-slate-200 pl-3" style={{ fontFamily: "var(--font-inter)" }}>
              {companyName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden sm:block" style={{ fontFamily: "var(--font-inter)" }}>
            {userName}
          </span>
          <button
            type="button"
            onClick={async () => { await signOut(); router.replace("/empleados/login"); }}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Salir
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-rhymes)" }}>
            Mis cursos
          </h1>
          <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            Cursos de compliance asignados por {companyName ?? "tu empresa"}.
          </p>
        </div>

        {loadingCourses ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>Cargando cursos...</p>
          </div>
        ) : assignments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>
              Todavía no tenés cursos asignados
            </p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Cuando tu empresa te asigne cursos de compliance aparecerán acá.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {assignments.map((a) => (
              <CourseCard key={a.id} assignment={a} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tarjeta de curso asignado
// ─────────────────────────────────────────────────────────────
function CourseCard({ assignment }: { assignment: CourseAssignment }) {
  const course = assignment.courses;
  if (!course) return null;

  const statusConfig: Record<AssignmentStatus, { label: string; classes: string; dot: string }> = {
    pending:     { label: "Pendiente",    classes: "bg-amber-50  text-amber-700  border-amber-200",  dot: "bg-amber-400"  },
    in_progress: { label: "En progreso",  classes: "bg-blue-50   text-blue-700   border-blue-200",   dot: "bg-blue-500"   },
    completed:   { label: "Completado",   classes: "bg-green-50  text-green-700  border-green-200",  dot: "bg-green-500"  },
  };
  const sc = statusConfig[assignment.status];

  const isCompleted = assignment.status === "completed";
  const hasCertificate = isCompleted && assignment.certificate_url;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Header tarjeta */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${sc.classes}`} style={{ fontFamily: "var(--font-inter)" }}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {sc.label}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1 flex-1">
        <p className="font-semibold text-slate-900 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
          {course.title}
        </p>
        {course.description && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {course.description}
          </p>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 border-t border-slate-100 pt-3" style={{ fontFamily: "var(--font-inter)" }}>
        {course.category && (
          <span className="inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {course.category}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {course.estimated_minutes} min
        </span>
        <span className="inline-flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Nota mín. {course.passing_score}%
        </span>
      </div>

      {/* Score si completado */}
      {isCompleted && assignment.score !== null && (
        <div className={`rounded-xl px-4 py-2.5 flex items-center justify-between ${
          assignment.score >= course.passing_score
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}>
          <span className="text-xs font-medium text-slate-600" style={{ fontFamily: "var(--font-inter)" }}>
            Tu nota
          </span>
          <span className={`text-lg font-bold ${
            assignment.score >= course.passing_score ? "text-green-700" : "text-red-600"
          }`} style={{ fontFamily: "var(--font-inter)" }}>
            {assignment.score}%
          </span>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-2">
        {!isCompleted ? (
          <Link
            href={`/empleados/cursos/${assignment.id}`}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {assignment.status === "pending" ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Comenzar curso
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Continuar
              </>
            )}
          </Link>
        ) : (
          <>
            <Link
              href={`/empleados/cursos/${assignment.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ver resumen
            </Link>
            {hasCertificate && (
              <a
                href={assignment.certificate_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Certificado
              </a>
            )}
          </>
        )}
      </div>

      {/* Fecha asignación */}
      <p className="text-[11px] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
        Asignado el {new Date(assignment.assigned_at).toLocaleDateString("es-AR", { dateStyle: "long" })}
      </p>
    </div>
  );
}
