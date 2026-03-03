"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/app/admin/_components/AdminShell";
import { ConfirmModal } from "@/app/admin/_components/ConfirmModal";
import { listCourses, deleteCourse, type CourseRow } from "@/app/services/courseService";

export default function CursosPage() {
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<CourseRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCourse(deleteTarget.id);
      setCourses((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al eliminar");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-semibold tracking-tight text-slate-900"
              style={{ fontFamily: "var(--font-rhymes)" }}
            >
              Cursos
            </h1>
            <p
              className="text-sm text-slate-500 mt-0.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Creá y publicá cursos de compliance con diapositivas, cards y evaluaciones.
            </p>
          </div>
          <Link
            href="/admin/cursos/nuevo"
            className="inline-flex items-center gap-1.5 shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo curso
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3" style={{ fontFamily: "var(--font-inter)" }}>
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={() => setDeleteTarget(course)}
              />
            ))}
          </div>
        )}
      </div>

      {deleteTarget && (
        <ConfirmModal
          isOpen={!!deleteTarget}
          title={`¿Eliminar "${deleteTarget.title}"?`}
          description="Se eliminarán el contenido, las imágenes y la firma del curso. Esta acción no se puede deshacer."
          variant="danger"
          confirmLabel="Sí, eliminar"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminShell>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-8 py-16 text-center space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
        <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>Todavía no hay cursos</p>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
          Creá tu primer curso de compliance con diapositivas personalizadas, cards y evaluación final.
        </p>
      </div>
      <Link
        href="/admin/cursos/nuevo"
        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Crear primer curso
      </Link>
    </div>
  );
}

function CourseCard({ course, onDelete }: { course: CourseRow; onDelete: () => void }) {
  const statusCfg = {
    draft: { label: "Borrador", cls: "bg-slate-100 text-slate-600" },
    published: { label: "Publicado", cls: "bg-green-100 text-green-700" },
  } as const;
  const sc = statusCfg[course.status];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-1.5 bg-slate-900" />
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
            {course.title}
          </h2>
          <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${sc.cls}`} style={{ fontFamily: "var(--font-inter)" }}>
            {sc.label}
          </span>
        </div>
        {course.description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2" style={{ fontFamily: "var(--font-inter)" }}>
            {course.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.estimated_minutes} min
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Aprueba con {course.passing_score}%
          </span>
          {course.signature_url && (
            <span className="flex items-center gap-1 text-green-500" title="Tiene firma para certificados">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Firma
            </span>
          )}
        </div>
      </div>
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={onDelete}
          className="text-xs text-red-400 hover:text-red-600 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Eliminar
        </button>
        <Link
          href={`/admin/cursos/${course.id}/editar`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828A2 2 0 0110.414 16H8v-2.414a2 2 0 01.586-1.414z" />
          </svg>
          Editar
        </Link>
      </div>
    </div>
  );
}
