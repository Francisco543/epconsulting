import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServer } from "@/app/lib/supabaseServer";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "MEP Compliance <no-reply@mepcompliance.com.ar>";

// ─────────────────────────────────────────────────────────────
// POST /api/admin/employee-requests/[id]/approve
// Aprueba una solicitud: crea usuarios, envía mails, registra empleados
// ─────────────────────────────────────────────────────────────
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

  try {
    // Obtener solicitud e ítems pendientes
    const { data: empRequest, error: reqError } = await supabaseServer
      .from("employee_requests")
      .select("*, clients(id, company_name), employee_request_items(*)")
      .eq("id", id)
      .single();

    if (reqError || !empRequest) {
      return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
    }
    if (empRequest.status !== "pending") {
      return NextResponse.json({ error: "La solicitud ya fue procesada" }, { status: 400 });
    }

    const items = (empRequest.employee_request_items ?? []) as {
      id: string;
      full_name: string;
      email: string;
      status: string;
    }[];

    const companyName = (empRequest.clients as { company_name: string } | null)?.company_name ?? "";
    const clientId = empRequest.client_id as string;
    const courseId = empRequest.course_id as string | null;

    const results: { id: string; ok: boolean; error?: string }[] = [];

    for (const item of items.filter((i) => i.status === "pending")) {
      try {
        // Crear usuario en Supabase con rol empleado
        const { data: linkData, error: linkError } =
          await supabaseServer.auth.admin.generateLink({
            type: "invite",
            email: item.email,
            options: {
              redirectTo: `${siteUrl}/empleados/callback`,
              data: {
                role: "empleado",
                full_name: item.full_name,
                client_id: clientId,
              },
            },
          });

        if (linkError || !linkData) {
          throw new Error(linkError?.message ?? "Error al generar link de invitación");
        }

        const userId = linkData.user.id;
        const inviteLink = linkData.properties.action_link;

        // Asegurar que el profile tenga el rol correcto
        await supabaseServer
          .from("profiles")
          .update({ role: "empleado", full_name: item.full_name })
          .eq("id", userId);

        // Buscar si ya existe un registro para este user_id (re-aprobación)
        const { data: existingEmployee } = await supabaseServer
          .from("employees")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();

        let employeeRow: { id: string } | null = existingEmployee ?? null;

        if (!existingEmployee) {
          const { data: inserted, error: insertError } = await supabaseServer
            .from("employees")
            .insert({
              client_id: clientId,
              user_id: userId,
              full_name: item.full_name,
              email: item.email,
              status: "active",
            })
            .select("id")
            .single();

          if (insertError || !inserted) {
            throw new Error(insertError?.message ?? "Error al crear el registro de empleado");
          }
          employeeRow = inserted;
        }

        // Asignar el curso si la solicitud lo incluye
        if (courseId && employeeRow?.id) {
          await supabaseServer
            .from("employee_course_assignments")
            .upsert(
              {
                employee_id: employeeRow.id,
                course_id: courseId,
                status: "pending",
              },
              { onConflict: "employee_id,course_id", ignoreDuplicates: true },
            );
        }

        // Marcar ítem como creado
        await supabaseServer
          .from("employee_request_items")
          .update({ status: "created", user_id: userId })
          .eq("id", item.id);

        // Enviar email de invitación
        await resend.emails.send({
          from: FROM_EMAIL,
          to: item.email,
          subject: `Tu acceso a MEP Compliance — ${companyName}`,
          html: buildEmployeeInviteEmail({
            firstName: item.full_name.split(" ")[0],
            companyName,
            inviteLink,
          }),
        });

        results.push({ id: item.id, ok: true });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error desconocido";
        await supabaseServer
          .from("employee_request_items")
          .update({ status: "rejected", error_msg: msg })
          .eq("id", item.id);
        results.push({ id: item.id, ok: false, error: msg });
      }
    }

    // Actualizar estado de la solicitud
    const allOk = results.every((r) => r.ok);
    const anyOk = results.some((r) => r.ok);
    const newStatus = allOk ? "approved" : anyOk ? "approved" : "rejected";

    await supabaseServer
      .from("employee_requests")
      .update({ status: newStatus, reviewed_at: new Date().toISOString() })
      .eq("id", id);

    return NextResponse.json({ ok: true, results, status: newStatus });
  } catch (err) {
    console.error("POST /api/admin/employee-requests/[id]/approve:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/admin/employee-requests/[id]/reject
// Rechaza la solicitud completa sin crear usuarios
// ─────────────────────────────────────────────────────────────
// (Definido en la misma ruta base como variante)

// ─────────────────────────────────────────────────────────────
// Email template para empleado
// ─────────────────────────────────────────────────────────────
function buildEmployeeInviteEmail({
  firstName,
  companyName,
  inviteLink,
}: {
  firstName: string;
  companyName: string;
  inviteLink: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f8f8f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f6;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#1a2e24;padding:32px 40px 28px;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#d4a843;letter-spacing:0.05em;">MEP Compliance</p>
            <p style="margin:6px 0 0;font-size:12px;color:#8fa99c;text-transform:uppercase;letter-spacing:0.12em;">Plataforma de Cursos</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;">Hola, ${firstName} 👋</p>
            <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.6;">
              Fuiste agregado como empleado de <strong style="color:#1a2e24;">${companyName}</strong> en la plataforma de MEP Compliance.<br/>
              Activá tu cuenta para acceder a tus cursos de compliance.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
              <tr>
                <td style="background:#1a2e24;border-radius:8px;">
                  <a href="${inviteLink}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#fff;text-decoration:none;">
                    Activar mi cuenta →
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:13px;color:#94a3b8;">Este link es de un solo uso y expira en 24 hs.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f1f5f9;padding:20px 40px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">MEP Compliance · Buenos Aires, Argentina</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}
