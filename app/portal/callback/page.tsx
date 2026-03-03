"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

type State = "loading" | "error";

export default function PortalCallbackPage() {
  const router = useRouter();
  const [state, setState] = useState<State>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Leemos el tipo del hash ANTES de que Supabase limpie la URL.
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const type = params.get("type"); // 'invite' | 'recovery' | 'signup' | null

    // Supabase detecta el hash automáticamente y emite SIGNED_IN.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // invite o recovery → el usuario necesita setear una contraseña
        if (type === "invite" || type === "recovery") {
          router.replace("/portal/configurar-cuenta");
        } else {
          router.replace("/portal");
        }
      }
    });

    // Por si la sesión ya estaba activa
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !hash.includes("access_token")) {
        router.replace("/portal");
      }
    });

    const timeout = setTimeout(() => {
      setState("error");
      setErrorMsg("El link de invitación expiró o ya fue utilizado.");
    }, 10_000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  if (state === "error") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-white shadow-sm p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-inter)" }}>
              Link inválido
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              {errorMsg}
            </p>
          </div>
          <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-inter)" }}>
            Contactá a tu administrador para solicitar una nueva invitación.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-sm p-8 text-center space-y-5">
        <div>
          <p className="text-lg font-bold tracking-wide text-slate-900" style={{ fontFamily: "var(--font-monument)" }}>
            MEP
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-0.5" style={{ fontFamily: "var(--font-monument)" }}>
            Compliance
          </p>
        </div>
        <div className="flex justify-center">
          <svg className="w-8 h-8 animate-spin text-slate-300" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700" style={{ fontFamily: "var(--font-inter)" }}>
            Verificando tu acceso...
          </p>
          <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            Vas a ser redirigido automáticamente.
          </p>
        </div>
      </div>
    </div>
  );
}
