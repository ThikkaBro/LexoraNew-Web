import { NextResponse } from "next/server";
import { Resend } from "resend";

const NEEDS = ["Design", "Build", "Grow", "Not sure"];
const BUDGETS = ["<1k", "1-5k", "5-15k", "15k+"];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, basedIn, need, budget, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !basedIn?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  if (need && !NEEDS.includes(need)) {
    return NextResponse.json({ error: "Invalid need selection." }, { status: 400 });
  }
  if (budget && !BUDGETS.includes(budget)) {
    return NextResponse.json({ error: "Invalid budget selection." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL || "hello@lexoratech.com";

  if (!apiKey) {
    // No RESEND_API_KEY set — logs only. Set RESEND_API_KEY and CONTACT_TO_EMAIL to send real email.
    console.info("[contact] RESEND_API_KEY not set, logging inquiry instead of sending", {
      name,
      email,
      company,
      basedIn,
      need,
      budget,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "LexoraTech website <onboarding@resend.dev>",
      to: toAddress,
      replyTo: email,
      subject: `New project inquiry — ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
        <p><strong>Based in:</strong> ${escapeHtml(basedIn)}</p>
        <p><strong>Need:</strong> ${escapeHtml(need || "—")}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget || "—")}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to send email", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please email hello@lexoratech.com directly." },
      { status: 502 }
    );
  }
}
