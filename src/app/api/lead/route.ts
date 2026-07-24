import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

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
  elapsedMs?: number; // ms between form render and submit — bots submit instantly
};

/* ---------------------------------------------------------------------------
   Abuse protection. This endpoint emails the owner's real inbox, so an open
   POST is a spam vector. Layers: honeypot, submit-speed check, per-IP rate
   limit, field caps, and link heuristics on fields that should never contain
   URLs. Deliberately fails "silently ok" for bot-shaped traffic so probing
   scripts learn nothing about which rule caught them.
--------------------------------------------------------------------------- */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // opportunistic sweep so the map can't grow without bound on a warm instance
  if (hits.size > 2000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

const cap = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);
// name/phone containing a URL is a near-certain spam signature
const LINKY = /(https?:\/\/|www\.|\[url|<a\s|\br\/)/i;

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

const EMAIL_FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function row(label: string, value: string, link?: string): string {
  const shown = value || "—";
  const inner = link && value
    ? `<a href="${link}" style="color:${BRAND.hydro};text-decoration:none;font-weight:600;">${shown}</a>`
    : `<span style="color:${value ? BRAND.ink : "#a9bcc9"};">${shown}</span>`;
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #eef3f7;vertical-align:top;width:130px;">
        <span style="font:600 11px/1.5 ${EMAIL_FONT};letter-spacing:.07em;text-transform:uppercase;color:${BRAND.mist};">${label}</span>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #eef3f7;font:500 15px/1.6 ${EMAIL_FONT};">${inner}</td>
    </tr>`;
}

function buildEmail(d: LeadPayload) {
  /* Keep RAW values for the subject + plaintext part (they are not HTML — an
     escaped "&" would literally render as "&amp;"), and escape only where the
     value is interpolated into the HTML body. */
  const rawName = String(d.name ?? "").trim() || "New lead";
  const rawPhone = String(d.phone ?? "").trim();
  const rawEmail = String(d.email ?? "").trim();
  const rawProperty = String(d.property ?? "").trim();
  const rawServices = Array.isArray(d.services) ? d.services.join(", ") : String(d.services ?? "").trim();
  const rawNotes = String(d.notes ?? "").trim();
  const rawSource = String(d.source ?? "").trim() || "Website";

  const name = esc(rawName);
  const phone = esc(rawPhone);
  const phoneDigits = rawPhone.replace(/[^\d+]/g, "");
  const email = esc(rawEmail);
  const property = esc(rawProperty);
  const services = esc(rawServices);
  const notes = esc(rawNotes);
  const source = esc(rawSource);

  const subject = `New quote request — ${rawName}${rawProperty ? ` (${rawProperty})` : ""}`;

  const stamp = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
  }).format(new Date());

  const font = EMAIL_FONT;
  const btn = (label: string, href: string, primary = false) =>
    `<a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:13px 24px;border-radius:8px;text-decoration:none;font:600 15px/1 ${font};${
      primary
        ? `background:${BRAND.hydro};color:#ffffff;`
        : `background:#ffffff;color:${BRAND.ink};border:1px solid #d5e2ec;`
    }">${label}</a>`;

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#eef3f7;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${name}${rawPhone ? ` · ${phone}` : ""}${rawServices ? ` · ${services}` : ""}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef3f7;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #dce7ef;border-radius:12px;overflow:hidden;">

        <!-- header -->
        <tr><td style="background:${BRAND.navy};padding:22px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;width:44px;">
              <img src="${SITE.url}/images/email-logo.png" width="38" height="38" alt="" style="display:block;border:0;">
            </td>
            <td style="vertical-align:middle;padding-left:12px;">
              <div style="font:700 16px/1.2 ${font};color:#ffffff;letter-spacing:.04em;">OFF THE <span style="color:${BRAND.hydro};">MUSCLE</span></div>
              <div style="font:400 12px/1.4 ${font};color:#8fb3c9;margin-top:2px;">Pressure Cleaning · South Florida</div>
            </td>
            <td align="right" style="vertical-align:middle;">
              <span style="display:inline-block;background:rgba(29,169,232,.16);color:${BRAND.hydro};font:600 11px/1 ${font};letter-spacing:.08em;text-transform:uppercase;padding:7px 11px;border-radius:5px;">${source}</span>
            </td>
          </tr></table>
        </td></tr>

        <!-- lead headline -->
        <tr><td style="padding:30px 32px 22px;border-bottom:1px solid #eaf0f5;">
          <div style="font:600 12px/1 ${font};letter-spacing:.1em;text-transform:uppercase;color:${BRAND.mist};">New quote request</div>
          <div style="font:700 26px/1.25 ${font};color:${BRAND.ink};margin-top:10px;">${name}</div>
          <div style="font:400 13px/1.5 ${font};color:${BRAND.mist};margin-top:6px;">${stamp}</div>
        </td></tr>

        <!-- details -->
        <tr><td style="padding:8px 32px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Phone", phone, phoneDigits ? `tel:${phoneDigits}` : undefined)}
            ${row("Email", email, rawEmail ? `mailto:${rawEmail}` : undefined)}
            ${row("Property", property)}
            ${row("Needs washing", services)}
            ${row("Notes", notes)}
          </table>
        </td></tr>

        <!-- actions -->
        <tr><td style="padding:24px 32px 8px;">
          ${phoneDigits ? btn("Call", `tel:${phoneDigits}`, true) : ""}
          ${phoneDigits ? btn("Text", `sms:${phoneDigits}`) : ""}
          ${rawEmail ? btn("Email", `mailto:${rawEmail}`) : ""}
        </td></tr>
        <tr><td style="padding:4px 32px 28px;">
          <div style="font:400 13px/1.6 ${font};color:${BRAND.mist};">
            ${rawEmail
              ? "Replying to this email goes straight to the customer."
              : "No email provided — reach this customer by phone or text."}
          </div>
        </td></tr>

        <!-- footer -->
        <tr><td style="background:#f6f9fb;border-top:1px solid #eaf0f5;padding:16px 32px;">
          <div style="font:400 12px/1.6 ${font};color:#8aa1b3;">
            Sent from the Off The Muscle website · ${source}
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;

  const text =
    `NEW QUOTE REQUEST — ${rawSource}\n${stamp}\n\n` +
    `Name:          ${rawName}\n` +
    `Phone:         ${rawPhone || "—"}\n` +
    `Email:         ${rawEmail || "—"}\n` +
    `Property:      ${rawProperty || "—"}\n` +
    `Needs washing: ${rawServices || "—"}\n` +
    `Notes:         ${rawNotes || "—"}\n\n` +
    (rawEmail
      ? "Replying to this email goes straight to the customer."
      : "No email provided — reach this customer by phone or text.");

  return { subject, html, text };
}

/* Compact lead SMS — same field order as the email, trimmed to stay cheap.
   Each Brevo SMS credit ~= 160 GSM-7 chars, so notes are capped hard. */
function buildSms(d: LeadPayload): string {
  const name = String(d.name ?? "").trim() || "New lead";
  const phone = String(d.phone ?? "").trim();
  const email = String(d.email ?? "").trim();
  const property = String(d.property ?? "").trim();
  const services = Array.isArray(d.services) ? d.services.join(", ") : String(d.services ?? "").trim();
  const notes = String(d.notes ?? "").trim();
  const source = String(d.source ?? "").trim() || "Website";

  const lines = [`New OTM lead (${source})`, name];
  if (phone) lines.push(phone);
  if (email) lines.push(email);
  if (property) lines.push(property + (services ? `: ${services}` : ""));
  else if (services) lines.push(services);
  if (notes) lines.push(`Notes: ${notes.length > 90 ? notes.slice(0, 87) + "…" : notes}`);
  return lines.join("\n");
}

/* Fire-and-forget SMS. Never blocks or fails the lead — email is the source of
   truth; SMS is a bonus ping. No-op unless a recipient is configured. */
async function sendLeadSms(apiKey: string, content: string) {
  const toRaw = process.env.LEAD_SMS_TO;
  if (!toRaw) return;
  // Brevo wants E.164 digits, no "+". Assume US if 10 digits.
  let digits = toRaw.replace(/[^\d]/g, "");
  if (digits.length === 10) digits = "1" + digits;
  const sender = (process.env.LEAD_SMS_SENDER || "OTM").slice(0, 11);
  try {
    const res = await fetch("https://api.brevo.com/v3/transactionalSMS/sms", {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ type: "transactional", sender, recipient: digits, content }),
    });
    const detail = await res.text();
    if (!res.ok) console.error("[lead] brevo SMS error", res.status, detail);
    else console.log("[lead] SMS sent", res.status, `to=${digits}`, detail);
  } catch (err) {
    console.error("[lead] SMS network error", err);
  }
}

export async function POST(req: Request) {
  if (!(req.headers.get("content-type") || "").includes("application/json")) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  let raw: LeadPayload;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // honeypot — pretend success so bots don't learn anything
  if (raw.company) return NextResponse.json({ ok: true });

  // humans take a beat to fill a form; instant submits are scripted
  if (typeof raw.elapsedMs === "number" && raw.elapsedMs >= 0 && raw.elapsedMs < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    console.warn("[lead] rate limited", ip);
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  // clamp every field so an oversized payload can't become a wall of spam
  const servicesArr = Array.isArray(raw.services)
    ? raw.services.slice(0, 12).map((s) => cap(s, 60)).filter(Boolean)
    : cap(raw.services, 300);
  const d: LeadPayload = {
    name: cap(raw.name, 80),
    phone: cap(raw.phone, 32),
    email: cap(raw.email, 120),
    property: cap(raw.property, 60),
    services: servicesArr,
    notes: cap(raw.notes, 1500),
    source: cap(raw.source, 40) || "Website",
  };

  // a real customer's name or phone never contains a link
  if (LINKY.test(d.name || "") || LINKY.test(d.phone || "")) {
    console.warn("[lead] dropped link-spam", ip);
    return NextResponse.json({ ok: true });
  }

  // a lead with no way to reply is worthless — and is what junk submissions look like
  if (!d.phone && !d.email) {
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
    // bonus SMS ping — awaited so it runs before the function freezes, but its
    // own try/catch means it can never turn a delivered lead into an error
    await sendLeadSms(apiKey, buildSms(d));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] network error", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
