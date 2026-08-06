import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { leadSchema, normalizePeruvianPhone } from "@/lib/lead-schema";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string) {
  const now = Date.now(); const current = attempts.get(ip);
  if (!current || current.resetAt < now) { attempts.set(ip, { count: 1, resetAt: now + 10 * 60_000 }); return false; }
  current.count += 1; return current.count > 5;
}
async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token }); if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const result = await response.json() as { success?: boolean }; return result.success === true;
}
export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 20_000) return NextResponse.json({ message: "La solicitud es demasiado grande." }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ message: "Has realizado varios intentos. Espera unos minutos antes de volver a enviar." }, { status: 429 });
  let json: unknown; try { json = await request.json(); } catch { return NextResponse.json({ message: "No pudimos leer la solicitud." }, { status: 400 }); }
  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) { const fields = Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])); return NextResponse.json({ message: "Revisa los campos indicados.", fields }, { status: 422 }); }
  if (parsed.data.website) return NextResponse.json({ ok: true });
  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip === "unknown" ? null : ip))) return NextResponse.json({ message: "No pudimos validar el control de seguridad. Inténtalo nuevamente." }, { status: 400 });
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { console.error("Lead storage is not configured"); return NextResponse.json({ message: "El canal de contacto está temporalmente en configuración. Inténtalo más tarde." }, { status: 503 }); }
  const lead = { name: parsed.data.name, whatsapp: normalizePeruvianPhone(parsed.data.whatsapp), email: parsed.data.email.toLowerCase(), district: parsed.data.district, relationship: parsed.data.relationship, approximate_age: parsed.data.age, interest: parsed.data.interest, preferred_contact_time: parsed.data.contactTime, comment: parsed.data.comment, privacy_consent: parsed.data.consent, newsletter_consent: parsed.data.newsletter, source_url: parsed.data.source || null, utm: parsed.data.utm, created_at: new Date().toISOString() };
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.from("leads").insert(lead); if (error) { console.error("Lead persistence failed", error.code); return NextResponse.json({ message: "No pudimos registrar tu solicitud. Inténtalo nuevamente." }, { status: 502 }); }
  const resendKey = process.env.RESEND_API_KEY, to = process.env.LEADS_NOTIFICATION_EMAIL, from = process.env.RESEND_FROM_EMAIL;
  if (resendKey && to && from) { try { const resend = new Resend(resendKey); await resend.emails.send({ from, to, subject: `Nueva solicitud VivaMayor: ${lead.interest}`, text: `Nombre: ${lead.name}\nWhatsApp: ${lead.whatsapp}\nCorreo: ${lead.email}\nDistrito: ${lead.district}\nRelación: ${lead.relationship}\nEdad aproximada: ${lead.approximate_age}\nInterés: ${lead.interest}\nHorario: ${lead.preferred_contact_time}\nComentario: ${lead.comment || "—"}` }); } catch (mailError) { console.error("Lead saved but notification failed", mailError); } }
  return NextResponse.json({ ok: true }, { status: 201 });
}
