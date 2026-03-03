"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";
import { signOut } from "@/app/services/authService";
import Logo from "@/app/components/layout/Logo";

export default function PortalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        router.replace("/portal/login");
        return;
      }

      // Cargar profile y empresa del gestor
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

      // Cargar la empresa del gestor desde la API
      const res = await fetch("/api/portal/company");
      if (res.ok) {
        const company = await res.json();
        setCompanyName(company?.company_name ?? null);
      }

      setLoading(false);
    };
    void init();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
          Cargando...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar del portal */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <Logo href="/portal" />
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>
            {userName}
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

      {/* Contenido */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1
            className="text-2xl font-semibold text-slate-900"
            style={{ fontFamily: "var(--font-rhymes)" }}
          >
            {companyName ? `Bienvenido, ${companyName}` : "Portal de empresa"}
          </h1>
          <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            Desde acá vas a poder gestionar los empleados y sus cursos de compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/portal/empleados"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-900 group-hover:text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>
                Empleados
              </h2>
              <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Solicitá el alta de empleados para que puedan acceder a los cursos de compliance.
            </p>
          </Link>

          <Link
            href="/portal/cursos"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-900 group-hover:text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>
                Cursos asignados
              </h2>
              <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Seguí el progreso de los empleados en los cursos de compliance.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
