"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailPassword } from "@/app/services/authService";
import Logo from "@/app/components/layout/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithEmailPassword(email, password);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas o error al iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Fondo estilo internoapp: textura + ondas claras */}
      <div className="absolute inset-0 opacity-70">
        <svg
          className="w-full h-full"
          viewBox="0 0 100vw 100vh"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="fabric"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect width="60" height="60" fill="white" />
              <path
                d="M0,30 Q15,20 30,30 T60,30"
                stroke="#f1f5f9"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M30,0 Q20,15 30,30 T30,60"
                stroke="#e2e8f0"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
              />
              <circle cx="15" cy="15" r="1.5" fill="#cbd5e1" opacity="0.7" />
              <circle cx="45" cy="45" r="1" fill="#94a3b8" opacity="0.6" />
              <circle cx="30" cy="30" r="0.5" fill="#64748b" opacity="0.4" />
            </pattern>

            <linearGradient id="softWave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#f8fafc" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#f1f5f9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="softWave2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="softWave3" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="softWave4" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
            </linearGradient>

            <radialGradient id="accent1" cx="30%" cy="20%" r="40%">
              <stop offset="0%" stopColor="#58EEAD" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="accent2" cx="70%" cy="80%" r="35%">
              <stop offset="0%" stopColor="#010000" stopOpacity="0.12" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="accent3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#58EEAD" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#fabric)" />

          <path
            d="M0,15 Q20vw,5 40vw,15 T80vw,15 Q90vw,10 100vw,15 L100vw,100vh L0,100vh Z"
            fill="url(#softWave1)"
          />
          <path
            d="M0,35 Q25vw,25 50vw,35 T100vw,35 L100vw,100vh L0,100vh Z"
            fill="url(#softWave2)"
          />
          <path
            d="M0,55 Q30vw,45 60vw,55 T100vw,55 L100vw,100vh L0,100vh Z"
            fill="url(#softWave3)"
          />
          <path
            d="M0,75 Q35vw,65 70vw,75 T100vw,75 L100vw,100vh L0,100vh Z"
            fill="url(#softWave4)"
          />

          <circle cx="30%" cy="20%" r="25%" fill="url(#accent1)" />
          <circle cx="70%" cy="80%" r="20%" fill="url(#accent2)" />
          <circle cx="50%" cy="50%" r="30%" fill="url(#accent3)" />
        </svg>
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 p-10 space-y-8 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-full h-20 mx-auto flex items-center justify-center">
                  <Logo href="/" />
                </div>
              </div>

              <div className="space-y-3">
                <p
                  className="text-[#D4AF37] font-semibold text-lg"
                  style={{ fontFamily: "var(--font-rhymes)" }}
                >
                  MEP Compliance Panel
                </p>
                <p
                  className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Acceso seguro para gestionar mensajes y operaciones internas
                  del estudio, manteniendo la confidencialidad de la
                  información.
                </p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700"
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
                    className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 focus:border-[#D4AF37] transition-all duration-300 hover:bg-white shadow-sm"
                    placeholder="admin@mepcompliance.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 focus:border-[#D4AF37] transition-all duration-300 hover:bg-white shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <p
                  className="text-sm text-red-500"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#e7c85a] hover:from-[#e7c85a] hover:to-[#D4AF37] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="relative flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Ingresando...</span>
                    </>
                  ) : (
                    <span>Iniciar sesión</span>
                  )}
                </span>
              </button>
            </form>

            <div className="pt-2 text-center">
              <p
                className="text-xs text-slate-500"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Acceso restringido. Sólo personal autorizado de MEP Compliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && showToast && (
        <div className="pointer-events-none fixed bottom-6 right-6 z-20">
          <div className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-red-500/40 bg-[#1b0c0c]/95 px-4 py-3 shadow-xl">
            <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-red-500/15 flex items-center justify-center">
              <span className="text-red-400 text-sm">!</span>
            </div>
            <div>
              <p
                className="text-sm font-medium text-red-100"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Error al iniciar sesión
              </p>
              <p
                className="mt-1 text-xs text-red-200/80"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Verificá tu email y contraseña. Si el problema persiste,
                contactá al administrador del sitio.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
