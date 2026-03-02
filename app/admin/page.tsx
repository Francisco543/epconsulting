"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";
import { signOut } from "@/app/services/authService";
import {
  listContactMessages,
  type ContactMessage,
  type ContactMessageStatus,
  updateContactMessageStatus,
} from "@/app/services/contactService";
import {
  AdminSidebar,
  type AdminTab,
} from "./_components/AdminSidebar";

export default function AdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("messages");
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
    <div className="flex min-h-[600px] gap-8 items-start">
      {/* Sidebar fijo a la izquierda */}
      <div className="w-[260px] shrink-0">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          messageCount={messages.length}
          onSignOut={async () => {
            try {
              await signOut();
            } finally {
              router.replace("/admin/login");
            }
          }}
        />
      </div>

      {/* Contenido según sección */}
      <section className="flex-1">
        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8">
            <div>
              <div className="mb-4">
                <h2
                  className="text-xl font-semibold tracking-tight text-slate-900"
                  style={{ fontFamily: "var(--font-rhymes)" }}
                >
                  Bandeja de entrada
                </h2>
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
                        selected?.id === msg.id
                          ? "bg-slate-50"
                          : "hover:bg-slate-50"
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
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3
                        className="text-xl font-semibold mb-1 tracking-tight text-slate-900"
                        style={{ fontFamily: "var(--font-rhymes)" }}
                      >
                        {selected.name}
                      </h3>
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
                    <div className="flex items-center gap-2">
                      {(["nuevo", "leido", "archivado"] as ContactMessageStatus[]).map(
                        (status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={async () => {
                              const prev = messages;
                              const updated = prev.map((m) =>
                                m.id === selected.id ? { ...m, status } : m,
                              );
                              setMessages(updated);
                              try {
                                await updateContactMessageStatus(selected.id, status);
                              } catch (err) {
                                console.error(err);
                                setMessages(prev);
                              }
                            }}
                            className={`rounded-full px-3 py-1 text-[11px] border transition-colors ${
                              selected.status === status
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {status === "nuevo"
                              ? "Nuevo"
                              : status === "leido"
                              ? "Leído"
                              : "Archivado"}
                          </button>
                        ),
                      )}
                    </div>
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
        )}

        {activeTab === "clients" && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm space-y-4">
            <h2
              className="text-xl font-semibold tracking-tight text-slate-900"
              style={{ fontFamily: "var(--font-rhymes)" }}
            >
              Clientes
            </h2>
            <p
              className="text-sm text-slate-600"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Aquí vas a poder gestionar la base de clientes de MEP Compliance:
              datos de contacto, estado de los servicios y documentación clave.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Clientes activos",
                  body: "Listado de clientes con servicios vigentes, próximos vencimientos y responsable asignado.",
                },
                {
                  title: "Seguimiento comercial",
                  body: "Oportunidades, propuestas enviadas y próximos pasos acordados con cada cliente.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-4"
                >
                  <h3
                    className="text-sm font-semibold text-slate-900 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-xs text-slate-600 leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm space-y-4">
            <h2
              className="text-xl font-semibold tracking-tight text-slate-900"
              style={{ fontFamily: "var(--font-rhymes)" }}
            >
              Cursos de compliance
            </h2>
            <p
              className="text-sm text-slate-600"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Sección pensada para la gestión de cursos de compliance con
              certificado: contenidos, ediciones, inscriptos y emisión de
              certificados.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Catálogo de cursos",
                  body: "Listado de cursos (PLA/FT, REI, actualización UIF, etc.) con su estado de publicación.",
                },
                {
                  title: "Inscriptos y certificados",
                  body: "Panel para ver quién completó cada curso y generar certificados personalizados.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-4"
                >
                  <h3
                    className="text-sm font-semibold text-slate-900 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-xs text-slate-600 leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
