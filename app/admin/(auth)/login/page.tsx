"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { signInWithEmailPassword } from "@/app/services/authService";
import { LogoIcon } from "@/app/components/layout/Logo";

export default function AdminLoginPage() {
  const t = useTranslations("auth.adminLogin");
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
    } catch {
      setError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 opacity-70">
        <svg className="w-full h-full" viewBox="0 0 100vw 100vh" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="admin-fabric" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="white" />
              <path d="M0,30 Q15,20 30,30 T60,30" stroke="#f1f5f9" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M30,0 Q20,15 30,30 T30,60" stroke="#e2e8f0" strokeWidth="1" fill="none" opacity="0.5" />
            </pattern>
            <linearGradient id="adminWave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#admin-fabric)" />
          <path d="M0,15 Q20vw,5 40vw,15 T80vw,15 L100vw,15 L100vw,100vh L0,100vh Z" fill="url(#adminWave1)" />
        </svg>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 p-10 space-y-8 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="w-full h-20 mx-auto flex items-center justify-center">
                <Link href="/" aria-label="MEP Compliance - Inicio">
                  <LogoIcon />
                </Link>
              </div>
              <div className="space-y-3">
                <p className="text-[#D4AF37] font-semibold text-lg" style={{ fontFamily: "var(--font-rhymes)" }}>
                  MEP Compliance Panel
                </p>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
                  {t("subtitle")}
                </p>
              </div>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 focus:border-[#D4AF37] transition-all duration-300"
                    placeholder="admin@mepcompliance.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>
                    {t("password")}
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 focus:border-[#D4AF37] transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-500" style={{ fontFamily: "var(--font-inter)" }}>{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#e7c85a] hover:from-[#e7c85a] hover:to-[#D4AF37] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-500 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isSubmitting ? "…" : t("submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
