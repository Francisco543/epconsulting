"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/components/layout/Logo";

type NavItem = {
  href: string;
  label: string;
  badge?: number;
  matchExact?: boolean;
};

type Props = {
  messageCount?: number;
  onSignOut: () => Promise<void> | void;
};

export function AdminSidebar({ messageCount = 0, onSignOut }: Props) {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: "/admin", label: "Mensajes", badge: messageCount, matchExact: true },
    { href: "/admin/clientes", label: "Clientes" },
    { href: "/admin/solicitudes", label: "Solicitudes" },
    { href: "/admin/cursos", label: "Cursos" },
  ];

  const isActive = (item: NavItem) =>
    item.matchExact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <aside className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo href="/" />
          <span
            className="text-xs uppercase tracking-[0.22em] text-slate-500"
            style={{ fontFamily: "var(--font-monument)" }}
          >
            Panel admin
          </span>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="rounded-full border border-slate-300 px-3 py-1 text-[11px] text-slate-700 hover:bg-slate-100 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Salir
        </button>
      </div>

      <nav className="rounded-2xl border border-slate-200 bg-white shadow-sm p-2 space-y-1">
        {items.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2 text-[11px] ${
                    active
                      ? "bg-white/15 text-slate-100"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
