"use client";

import Logo from "@/app/components/Logo";

export type AdminTab = "messages" | "clients" | "courses";

type Props = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  messageCount: number;
  onSignOut: () => Promise<void> | void;
};

export function AdminSidebar({
  activeTab,
  onTabChange,
  messageCount,
  onSignOut,
}: Props) {
  const items: { id: AdminTab; label: string; badge?: number }[] = [
    { id: "messages", label: "Mensajes", badge: messageCount },
    { id: "clients", label: "Clientes" },
    { id: "courses", label: "Cursos" },
  ];

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
        >
          Salir
        </button>
      </div>

      <nav className="rounded-2xl border border-slate-200 bg-white shadow-sm p-2 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
              activeTab === item.id
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span
                className={`inline-flex items-center justify-center rounded-full px-2 text-[11px] ${
                  activeTab === item.id
                    ? "bg-white/15 text-slate-100"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}

