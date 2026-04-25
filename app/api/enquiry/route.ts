import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const TO = "jurgen@jurgen.co.za";
const FROM = "jurgen@jurgen.co.za";

export async function POST(req: NextRequest) {
  const token = process.env.POSTMARK_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const get = (key: string) => String(formData.get(key) ?? "").trim();
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const company = get("company");
  const type = get("type");
  const size = get("size");
  const when = get("when");
  const notes = get("notes");

  if (!name || !email || !type) {
    return NextResponse.json(
      { error: "Name, email and shoot type are required." },
      { status: 400 },
    );
  }

  const lines = [
    `New enquiry from headshotcapetown.co.za`,
    ``,
    `Name:        ${name}`,
    `Email:       ${email}`,
    phone && `Phone:       ${phone}`,
    company && `Company:     ${company}`,
    `Shoot type:  ${type}`,
    size && `Team size:   ${size}`,
    when && `Timing:      ${when}`,
    ``,
    notes ? `Notes:\n${notes}` : `(no additional notes)`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <table style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-size:14px;color:#021353;border-collapse:collapse;">
      <tr><td colspan="2" style="padding-bottom:14px;font-weight:600;">New enquiry from headshotcapetown.co.za</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#5a6aa0;">Name</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#5a6aa0;">Email</td><td><a href="mailto:${escapeHtml(email)}" style="color:#022672;">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:4px 16px 4px 0;color:#5a6aa0;">Phone</td><td>${escapeHtml(phone)}</td></tr>` : ""}
      ${company ? `<tr><td style="padding:4px 16px 4px 0;color:#5a6aa0;">Company</td><td>${escapeHtml(company)}</td></tr>` : ""}
      <tr><td style="padding:4px 16px 4px 0;color:#5a6aa0;">Shoot type</td><td>${escapeHtml(type)}</td></tr>
      ${size ? `<tr><td style="padding:4px 16px 4px 0;color:#5a6aa0;">Team size</td><td>${escapeHtml(size)}</td></tr>` : ""}
      ${when ? `<tr><td style="padding:4px 16px 4px 0;color:#5a6aa0;">Timing</td><td>${escapeHtml(when)}</td></tr>` : ""}
      ${notes ? `<tr><td colspan="2" style="padding-top:14px;color:#5a6aa0;">Notes</td></tr><tr><td colspan="2"><pre style="font-family:inherit;white-space:pre-wrap;margin:0;">${escapeHtml(notes)}</pre></td></tr>` : ""}
    </table>
  `;

  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: FROM,
      To: TO,
      ReplyTo: email,
      Subject: `New enquiry from ${name} — Headshot Cape Town`,
      TextBody: lines,
      HtmlBody: html,
      MessageStream: "outbound",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Postmark error:", res.status, body);
    return NextResponse.json(
      { error: "Failed to send. Please email or WhatsApp instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
