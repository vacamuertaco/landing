import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;

  // Honeypot: si viene completo es un bot. Respondemos OK y no guardamos nada.
  if (typeof data.company === "string" && data.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email =
    typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const lang = data.lang === "en" ? "en" : "es";

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("[subscribe] faltan NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY");
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // La tabla solo permite INSERT al rol anon (sin SELECT), por eso no
  // pedimos la fila de vuelta.
  const { error } = await supabase.from("waitlist").insert({ email, lang });

  // 23505 = email ya registrado: lo tratamos como éxito para no revelar
  // si una dirección ya estaba en la lista.
  if (error && error.code !== "23505") {
    console.error("[subscribe] insert falló:", error.code, error.message);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
