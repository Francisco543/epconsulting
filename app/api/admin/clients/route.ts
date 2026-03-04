import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_URL } from "@/app/lib/site";
import { supabaseServer } from "@/app/lib/supabaseServer";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "MEP Compliance <no-reply@mepcompliance.com.ar>";

// ─────────────────────────────────────────────────────────────
// GET /api/admin/clients  → lista todos los clientes
// ─────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
      return NextResponse.json({ error: "Error al obtener los clientes" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Unexpected error in GET /api/admin/clients:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/admin/clients  → crea cliente + usuario gestor + envía mail
// ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company_name, cuit, contact_name, contact_email, phone, industry, notes } =
      body ?? {};

    if (!company_name || typeof company_name !== "string") {
      return NextResponse.json({ error: "El nombre de la empresa es requerido" }, { status: 400 });
    }
    if (!contact_email || typeof contact_email !== "string") {
      return NextResponse.json({ error: "El email de contacto es requerido" }, { status: 400 });
    }

    // 1. Generar invite link de Supabase para el gestor
    //    Esto crea el usuario en auth.users y dispara handle_new_user()
    //    que a su vez crea el profile con role='gestor'
    const siteUrl = SITE_URL.replace(/\/$/, "");

    const { data: linkData, error: linkError } =
      await supabaseServer.auth.admin.generateLink({
        type: "invite",
        email: contact_email.trim(),
        options: {
          redirectTo: `${siteUrl}/portal/callback`,
          data: {
            role: "gestor",
            full_name: contact_name?.trim() ?? "",
          },
        },
      });

    if (linkError || !linkData) {
      console.error("Error generating invite link:", linkError);
      return NextResponse.json(
        { error: linkError?.message ?? "Error al crear el usuario gestor" },
        { status: 500 },
      );
    }

    const gestorId = linkData.user.id;
    const inviteLink = linkData.properties.action_link;

    // 2. Aseguramos que el profile tiene full_name y role='gestor'
    //    (el trigger lo inserta pero puede que no tenga full_name si vino vacío)
    await supabaseServer
      .from("profiles")
      .update({ full_name: contact_name?.trim() ?? null, role: "gestor" })
      .eq("id", gestorId);

    // 3. Insertar el cliente en la tabla clients
    const { data: client, error: clientError } = await supabaseServer
      .from("clients")
      .insert({
        company_name: company_name.trim(),
        cuit: cuit?.trim() ?? null,
        contact_name: contact_name?.trim() ?? null,
        contact_email: contact_email.trim(),
        phone: phone?.trim() ?? null,
        industry: industry?.trim() ?? null,
        notes: notes?.trim() ?? null,
        gestor_id: gestorId,
        status: "active",
      })
      .select()
      .single();

    if (clientError) {
      console.error("Error inserting client:", clientError);
      return NextResponse.json({ error: "Error al crear el cliente" }, { status: 500 });
    }

    // 4. Enviar email de bienvenida + link de acceso vía Resend
    const firstName = contact_name?.split(" ")[0] ?? "gestor";

    await resend.emails.send({
      from: FROM_EMAIL,
      to: contact_email.trim(),
      subject: `Bienvenido a MEP Compliance — Activá tu cuenta`,
      html: buildInviteEmail({ firstName, companyName: company_name, inviteLink }),
    });

    return NextResponse.json({ ok: true, client }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error in POST /api/admin/clients:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────
// Template del email de invitación
// ─────────────────────────────────────────────────────────────
function buildInviteEmail({
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
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f8f8f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1a2e24;padding:32px 40px 28px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#d4a843;letter-spacing:0.05em;">
                MEP Compliance
              </p>
              <p style="margin:6px 0 0;font-size:12px;color:#8fa99c;text-transform:uppercase;letter-spacing:0.12em;">
                Plataforma de Gestión
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;">
                Hola, ${firstName} 👋
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.6;">
                Tu empresa <strong style="color:#1a2e24;">${companyName}</strong> fue dada de alta en la plataforma de MEP Compliance.
                Activá tu cuenta para comenzar a gestionar tus accesos y cursos de compliance.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
                <tr>
                  <td style="background:#1a2e24;border-radius:8px;">
                    <a href="${inviteLink}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.02em;">
                      Activar mi cuenta →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px;font-size:13px;color:#94a3b8;">
                Este link es de un solo uso y expira en 24 hs. Si no solicitaste este acceso podés ignorar este correo.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;padding:20px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                MEP Compliance · Buenos Aires, Argentina<br/>
                Ante cualquier consulta respondé este correo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
