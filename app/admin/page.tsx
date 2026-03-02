"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";
import { signOut } from "@/app/services/authService";
import {
  listContactMessages,
  type ContactMessage,
} from "@/app/services/contactService";
export default function AdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }
      try {
        const dataMessages = await listContactMessages();
        setMessages(dataMessages);
      } catch (error) {
        console.error("Error loading contact messages", error);
      }
      setLoading(false);
    };
    void init();
  }, [router]);

  const selected = messages.find((m) => m.id === selectedId) ?? messages[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1
            className="text-2xl font-semibold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-rhymes)" }}
          >
            Bandeja de entrada
          </h1>
          <button
            type="button"
            onClick={async () => {
              try {
                await signOut();
              } finally {
                router.replace("/admin/login");
              }
            }}
            className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            className="border-b border-slate-100 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-500"
            style={{ fontFamily: "var(--font-monument)" }}
          >
            Mensajes de contacto
          </div>
          <div className="max-h-[540px] overflow-y-auto">
            {loading && (
              <div className="px-4 py-6 text-sm text-slate-500">
                Cargando mensajes...
              </div>
            )}
            {!loading && messages.length === 0 && (
              <div className="px-4 py-6 text-sm text-slate-500">
                Aún no hay mensajes.
              </div>
            )}
            {messages.map((msg) => (
              <button
                key={msg.id}
                type="button"
                onClick={() => setSelectedId(msg.id)}
                className={`w-full text-left px-4 py-3 border-b border-slate-100 last:border-b-0 transition-colors ${
                  selected?.id === msg.id ? "bg-slate-50" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="text-sm font-medium truncate"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "#0f172a",
                    }}
                  >
                    {msg.name}
                  </p>
                  <span className="text-[11px] text-slate-500">
                    {new Date(msg.created_at).toLocaleString("es-AR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-1">
                  {msg.email} {msg.company ? `· ${msg.company}` : ""}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        {selected ? (
          <div className="space-y-4">
            <div>
              <h2
                className="text-xl font-semibold mb-1 tracking-tight text-slate-900"
                style={{ fontFamily: "var(--font-rhymes)" }}
              >
                {selected.name}
              </h2>
              <p className="text-sm text-slate-600">
                {selected.email}
                {selected.phone && ` · ${selected.phone}`}
                {selected.company && ` · ${selected.company}`}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Enviado el{" "}
                {new Date(selected.created_at).toLocaleString("es-AR", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <hr className="border-slate-100" />
            <div
              className="text-sm leading-relaxed whitespace-pre-wrap text-slate-800"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {selected.message}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Seleccione un mensaje a la izquierda.
          </p>
        )}
      </div>
    </div>
  );
}
