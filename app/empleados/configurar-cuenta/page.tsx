"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";
import { updatePassword } from "@/app/services/authService";
import Logo from "@/app/components/layout/Logo";

export default function EmpleadoConfigurarCuentaPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace("/empleados/login"); return; }
      setUserEmail(session.user.email ?? null);
      setChecking(false);
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres."); return; }
    if (password !== confirm) { setError("Las contraseñas no coinciden."); return; }
    setSaving(true);
    try {
      await updatePassword(password);
      router.replace("/empleados");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><svg className="w-7 h-7 animate-spin text-slate-300" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg></div>;
  }

  const reqs = [
    { ok: password.length >= 8, text: "Al menos 8 caracteres" },
    { ok: /[A-Z]/.test(password), text: "Al menos una mayúscula" },
    { ok: /[0-9]/.test(password), text: "Al menos un número" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <ellipse cx="80%" cy="15%" rx="320" ry="220" fill="#1a2e2406" />
        <ellipse cx="20%" cy="85%" rx="280" ry="200" fill="#d4a84308" />
      </svg>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 px-8 py-10 space-y-7">
            <div className="flex justify-center"><Logo href="/" /></div>

            <div className="text-center">
              <h1 className="text-2xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-rhymes)" }}>
                Configurá tu contraseña
              </h1>
              <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>
                Elegí una contraseña para acceder a tus cursos.
              </p>
              {userEmail && <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "var(--font-inter)" }}>{userEmail}</p>}
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-inter)" }}>Requisitos</p>
              {reqs.map(({ ok, text }) => (
                <p key={text} className={`flex items-center gap-2 text-xs transition-colors ${ok ? "text-green-700" : "text-slate-400"}`} style={{ fontFamily: "var(--font-inter)" }}>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    {ok ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />}
                  </svg>
                  {text}
                </p>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Nueva contraseña</label>
                <div className="relative">
                  <input
                    id="password" type={show ? "text" : "password"} required value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition-all focus:border-[#1a2e24] focus:bg-white focus:ring-2 focus:ring-[#1a2e24]/10"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                  <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" aria-label="Mostrar/ocultar">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      {show
                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>}
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm" className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Confirmá la contraseña</label>
                <input
                  id="confirm" type={show ? "text" : "password"} required value={confirm}
                  onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••"
                  className={`w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 ${confirm && confirm !== password ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-[#1a2e24] focus:ring-[#1a2e24]/10"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                {confirm && confirm !== password && <p className="mt-1.5 text-xs text-red-600" style={{ fontFamily: "var(--font-inter)" }}>Las contraseñas no coinciden.</p>}
              </div>

              {error && <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>{error}</p>}

              <button
                type="submit"
                disabled={saving || password !== confirm || password.length < 8}
                className="mt-1 w-full rounded-lg bg-[#1a2e24] py-3 text-sm font-semibold text-white hover:bg-[#243d30] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {saving ? "Guardando..." : "Guardar contraseña e ingresar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
