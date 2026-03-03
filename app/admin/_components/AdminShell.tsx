"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";
import { signOut } from "@/app/services/authService";
import { AdminSidebar } from "./AdminSidebar";

type Props = {
  children: React.ReactNode;
  messageCount?: number;
};

export function AdminShell({ children, messageCount = 0 }: Props) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      router.replace("/admin/login");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <span
          className="text-sm text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Verificando sesión...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10">
        <div className="flex gap-8 items-start">
          <div className="w-[260px] shrink-0">
            <AdminSidebar messageCount={messageCount} onSignOut={handleSignOut} />
          </div>
          <section className="flex-1 min-w-0">{children}</section>
        </div>
      </main>
    </div>
  );
}
