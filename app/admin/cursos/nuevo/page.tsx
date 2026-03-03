"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/app/admin/_components/AdminShell";
import { createCourse } from "@/app/services/courseService";
import { makeEmptyCourse } from "../_types";

const CATEGORIES = [
  "Prevención de Lavado de Activos (PLA/FT)",
  "Regulación e Integridad (REI)",
  "Actualización UIF",
  "Ética y Conducta",
  "Protección de Datos",
  "Seguridad de la Información",
  "Otro",
];

export default function NuevoCursoPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [passingScore, setPassingScore] = useState(80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    try {
      const empty = makeEmptyCourse();
      const course = await createCourse({
        title: title.trim(),
        description: description.trim(),
        category,
        passing_score: passingScore,
        estimated_minutes: estimatedMinutes,
        content: { chapters: empty.chapters },
      });
      router.push(`/admin/cursos/${course.id}/editar`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "No se pudo crear el curso");
      setLoading(false);
    }
  }

  return (
    <AdminShell>
      <div className="max-w-2xl space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
          <Link href="/admin/cursos" className="hover:text-slate-600 transition-colors">Cursos</Link>
          <span>/</span>
          <span className="text-slate-600">Nuevo curso</span>
        </nav>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900" style={{ fontFamily: "var(--font-rhymes)" }}>
            Nuevo curso
          </h1>
          <p className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            Completá los datos básicos y después editás el contenido en el editor.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3" style={{ fontFamily: "var(--font-inter)" }}>
            {error}
          </p>
        )}

        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100"
        >
          {/* Identificación */}
          <div className="p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
              Identificación
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  Nombre del curso *
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Prevención de Lavado de Activos 2026"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  Descripción
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Breve descripción del objetivo y contenido del curso."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 resize-none outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  Categoría
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <option value="">Seleccionar categoría</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Configuración */}
          <div className="p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
              Configuración
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minutes" className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  Duración estimada (min)
                </label>
                <input
                  id="minutes"
                  type="number" min={1} max={480}
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <div>
                <label htmlFor="score" className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  Nota mínima de aprobación (%)
                </label>
                <div className="relative">
                  <input
                    id="score"
                    type="number" min={0} max={100}
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>%</span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                  El empleado aprueba si supera este puntaje en la evaluación.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50/60 rounded-b-2xl flex items-center justify-between">
            <Link href="/admin/cursos" className="text-sm text-slate-500 hover:text-slate-800 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
              ← Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors disabled:opacity-60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Crear y editar contenido
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
