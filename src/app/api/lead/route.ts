import { NextResponse } from "next/server";

/* Lead intake for both the quote form and the "chat with Jason" widget.
   Sends a clean, on-brand notification through Brevo transactional email.
   The API key lives only in server env — it never reaches the browser. */

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  property?: string;
  services?: string[] | string;
  notes?: string;
  company?: string; // honeypot
  source?: string; // "Quote form" | "Live chat"
};

const BRAND = {
  navy: "#04121f",
  trench: "#0b2233",
  hydro: "#1da9e8",
  ink: "#0f2537",
  mist: "#5b7488",
};

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: string, link?: string): string {
  const inner = link ? `<a href="${link}" style="color:${BRAND.hydro};text-decoration:none;">${value}</a>` : value;
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e7eef3;vertical-align:top;width:132px;">
        <span style="font:600 11px/1.4 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.mist};">${label}</span>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #e7eef3;font:600 16px/1.5 Arial,sans-serif;color:${BRAND.ink};">${inner || "—"}</td>
    </tr>`;
}

function buildEmail(d: LeadPayload) {
  const name = esc(d.name) || "New lead";
  const phone = esc(d.phone);
  const phoneDigits = String(d.phone ?? "").replace(/[^\d+]/g, "");
  const email = esc(d.email);
  const property = esc(d.property);
  const services = Array.isArray(d.services) ? d.services.map(esc).join(", ") : esc(d.services);
  const notes = esc(d.notes);
  const source = esc(d.source) || "Website";

  const subject = `New quote request — ${name}${property ? ` (${property})` : ""}`;

  const html = `<!doctype html><html><body style="margin:0;background:#eef4f8;padding:24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px -16px rgba(6,24,38,.35);">
    <tr><td style="background:${BRAND.navy};padding:26px 28px;">
      <div style="font:800 20px/1 Arial,sans-serif;color:#fff;letter-spacing:.02em;">OFF THE <span style="color:${BRAND.hydro};">MUSCLE</span></div>
      <div style="font:600 11px/1.5 Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:${BRAND.hydro};margin-top:6px;">New lead · ${source}</div>
    </td></tr>
    <tr><td style="padding:26px 28px 8px;">
      <p style="font:700 20px/1.3 Arial,sans-serif;color:${BRAND.ink};margin:0 0 4px;">You've got a new quote request.</p>
      <p style="font:400 14px/1.6 Arial,sans-serif;color:${BRAND.mist};margin:0 0 8px;">${email ? "Hit reply to answer this customer directly." : "No email given — call or text the number below."}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Name", name)}
        ${row("Phone", phone, phoneDigits ? `tel:${phoneDigits}` : undefined)}
        ${row("Email", email, email ? `mailto:${email}` : undefined)}
        ${row("Property", property)}
        ${row("Needs washing", services)}
        ${row("Notes", notes)}
      </table>
    </td></tr>
    <tr><td style="padding:14px 28px 28px;">
      ${phoneDigits ? `<a href="tel:${phoneDigits}" style="display:inline-block;background:${BRAND.hydro};color:#04121f;font:700 14px/1 Arial,sans-serif;text-decoration:none;padding:14px 22px;border-radius:999px;">Call ${phone}</a>` : ""}
    </td></tr>
    <tr><td style="background:#f4f8fb;padding:16px 28px;font:400 12px/1.6 Arial,sans-serif;color:${BRAND.mist};">
      Sent automatically from the Off The Muscle website · ${source}
    </td></tr>
  </table>
  </body></html>`;

  const text =
    `New quote request (${source})\n\n` +
    `Name: ${d.name || "—"}\nPhone: ${d.phone || "—"}\nEmail: ${d.email || "—"}\n` +
    `Property: ${d.property || "—"}\nNeeds washing: ${services || "—"}\nNotes: ${d.notes || "—"}\n\n` +
    (d.email ? "Reply to this email to reach the customer." : "No email given — call or text the number above.");

  return { subject, html, text };
}

export async function POST(req: Request) {
  let d: LeadPayload;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // honeypot — pretend success so bots don't learn anything
  if (d.company) return NextResponse.json({ ok: true });

  if (!d.name && !d.phone && !d.email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  const fromEmail = process.env.LEAD_FROM_EMAIL || toEmail;
  if (!apiKey || !toEmail || !fromEmail) {
    console.error("[lead] missing email env (BREVO_API_KEY / LEAD_TO_EMAIL / LEAD_FROM_EMAIL)");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const { subject, html, text } = buildEmail(d);

  const body = {
    sender: { email: fromEmail, name: process.env.LEAD_FROM_NAME || "Off The Muscle Website" },
    to: [{ email: toEmail, name: process.env.LEAD_TO_NAME || "Off The Muscle" }],
    // client hits reply → goes to the customer (falls back to their own inbox)
    replyTo: d.email ? { email: d.email, name: d.name || d.email } : { email: toEmail },
    subject,
    htmlContent: html,
    textContent: text,
  };

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(body),
    });
    const detail = await res.text();
    if (!res.ok) {
      console.error("[lead] brevo error", res.status, detail);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    console.log("[lead] sent via brevo", res.status, `from=${fromEmail} to=${toEmail}`, detail);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] network error", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
