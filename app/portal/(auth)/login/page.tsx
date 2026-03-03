"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailPassword, sendPasswordResetEmail } from "@/app/services/authService";
import Logo from "@/app/components/layout/Logo";

type View = "login" | "forgot" | "forgot-sent";

export default function PortalLoginPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!error) return;
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithEmailPassword(email, password);
      router.push("/portal");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
        window.location.origin;
      await sendPasswordResetEmail(email, `${siteUrl}/portal/callback`);
      setView("forgot-sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Fondo decorativo */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <ellipse cx="15%" cy="20%" rx="320" ry="220" fill="#1a2e2408" />
        <ellipse cx="85%" cy="80%" rx="280" ry="200" fill="#d4a84310" />
      </svg>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 px-8 py-10">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Logo href="/" />
            </div>

            {/* ── Vista: LOGIN ── */}
            {view === "login" && (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-2xl font-semibold text-slate-900 mb-2" style={{ fontFamily: "var(--font-rhymes)" }}>
                    Portal de empresa
                  </h1>
                  <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>
                    Ingresá con tu cuenta de gestor para administrar tu empresa
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[#1a2e24] focus:bg-white focus:ring-2 focus:ring-[#1a2e24]/10"
                      style={{ fontFamily: "var(--font-inter)" }}
                      placeholder="gestor@empresa.com"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="password"
                        className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        Contraseña
                      </label>
                      <button
                        type="button"
                        onClick={() => { setView("forgot"); setError(null); }}
                        className="text-xs text-[#1a2e24] hover:underline underline-offset-2 transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[#1a2e24] focus:bg-white focus:ring-2 focus:ring-[#1a2e24]/10"
                      style={{ fontFamily: "var(--font-inter)" }}
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full rounded-lg bg-[#1a2e24] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#243d30] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {isSubmitting ? "Ingresando..." : "Ingresar al portal"}
                  </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                  ¿Problemas para ingresar?{" "}
                  <a href="mailto:info@mepcompliance.com.ar" className="text-[#1a2e24] underline underline-offset-2">
                    Contactanos
                  </a>
                </p>
              </>
            )}

            {/* ── Vista: OLVIDÉ CONTRASEÑA ── */}
            {view === "forgot" && (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-2xl font-semibold text-slate-900 mb-2" style={{ fontFamily: "var(--font-rhymes)" }}>
                    Recuperar acceso
                  </h1>
                  <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>
                    Te enviamos un link para que puedas crear una contraseña nueva.
                  </p>
                </div>

                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <label
                      htmlFor="reset-email"
                      className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Email
                    </label>
                    <input
                      id="reset-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[#1a2e24] focus:bg-white focus:ring-2 focus:ring-[#1a2e24]/10"
                      style={{ fontFamily: "var(--font-inter)" }}
                      placeholder="gestor@empresa.com"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[#1a2e24] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#243d30] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar link de recuperación"}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => { setView("login"); setError(null); }}
                  className="mt-5 w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  ← Volver al inicio de sesión
                </button>
              </>
            )}

            {/* ── Vista: EMAIL ENVIADO ── */}
            {view === "forgot-sent" && (
              <div className="text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-rhymes)" }}>
                    Revisá tu email
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    Enviamos un link de recuperación a{" "}
                    <span className="font-medium text-slate-800">{email}</span>.
                    Hace clic en el link para crear tu nueva contraseña.
                  </p>
                </div>
                <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
                  El link expira en 1 hora. Si no lo recibiste revisá la carpeta de spam.
                </p>
                <button
                  type="button"
                  onClick={() => { setView("login"); setError(null); }}
                  className="text-sm text-[#1a2e24] underline underline-offset-2 hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Volver al inicio de sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast de error */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-white px-5 py-3.5 shadow-xl">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="text-sm font-medium text-red-700" style={{ fontFamily: "var(--font-inter)" }}>
            {error ?? "Credenciales incorrectas"}
          </p>
        </div>
      </div>
    </div>
  );
}
