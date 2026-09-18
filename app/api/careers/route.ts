import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "applications");
const INDEX_FILE = path.join(DATA_DIR, "index.json");


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const linkedin = formData.get("linkedin") as string;
    const coverNote = formData.get("coverNote") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // ── Save CV file to disk ──────────────────────────────────────────────────
    let savedFileName: string | null = null;
    let cvBuffer: Buffer | null = null;

    if (cvFile && cvFile.size > 0) {
      const bytes = await cvFile.arrayBuffer();
      cvBuffer = Buffer.from(bytes);
      const ext = path.extname(cvFile.name) || ".pdf";
      const ts = Date.now();
      savedFileName = `${ts}-${name.replace(/\s+/g, "_").toLowerCase()}${ext}`;
      await mkdir(DATA_DIR, { recursive: true });
      await writeFile(path.join(DATA_DIR, savedFileName), cvBuffer);
    }

    // ── Save application metadata to index.json ───────────────────────────────
    await mkdir(DATA_DIR, { recursive: true });
    let index: object[] = [];
    try {
      const raw = await readFile(INDEX_FILE, "utf-8");
      index = JSON.parse(raw);
    } catch {
      // file doesn't exist yet — that's fine
    }

    const application = {
      id: Date.now().toString(),
      name,
      email,
      linkedin: linkedin || null,
      coverNote: coverNote || null,
      cvFileName: savedFileName,
      appliedAt: new Date().toISOString(),
    };
    index.push(application);
    await writeFile(INDEX_FILE, JSON.stringify(index, null, 2));

    // ── Send email via Resend ─────────────────────────────────────────────────
    // All addresses here receive the full notification with CV attached.
    const primaryEmail = process.env.CAREERS_EMAIL || "careers@lexoratech.com";
    const ccEmail = process.env.CAREERS_CC_EMAIL || "hello@lexoratech.com";
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);

      const attachments = cvBuffer && savedFileName
        ? [{ filename: savedFileName, content: cvBuffer }]
        : [];

      await resend.emails.send({
        from: "LexoraTech Careers <careers@lexoratech.com>",
        to: [primaryEmail, ccEmail],
        subject: `New Application — Marketing Specialist: ${name}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #08090A; color: #F7F8F8; padding: 32px; border-radius: 8px;">
            <div style="margin-bottom: 24px;">
              <img src="https://lexoratech.com/icon.svg" width="32" height="32" alt="LexoraTech" style="margin-bottom: 8px;" />
              <h1 style="margin: 0; font-size: 1.25rem; letter-spacing: -0.02em;">New Job Application</h1>
              <p style="margin: 4px 0 0; color: #8A8F98; font-size: 0.875rem;">Marketing Specialist — LexoraTech</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #8A8F98; font-size: 0.8125rem; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.875rem;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #8A8F98; font-size: 0.8125rem;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.875rem;"><a href="mailto:${email}" style="color: #7EA6FF;">${email}</a></td>
              </tr>
              ${linkedin ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #8A8F98; font-size: 0.8125rem;">LinkedIn</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.875rem;"><a href="${linkedin}" style="color: #7EA6FF;" target="_blank">${linkedin}</a></td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; color: #8A8F98; font-size: 0.8125rem;">Applied</td>
                <td style="padding: 10px 0; font-size: 0.875rem;">${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</td>
              </tr>
            </table>

            ${coverNote ? `
            <div style="background: #0D0E10; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; color: #8A8F98; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Cover Note</p>
              <p style="margin: 0; font-size: 0.875rem; line-height: 1.65; white-space: pre-wrap;">${coverNote}</p>
            </div>` : ""}

            ${savedFileName ? `<p style="color: #8A8F98; font-size: 0.8125rem; margin: 0;">📎 CV attached to this email.</p>` : `<p style="color: #8A8F98; font-size: 0.8125rem; margin: 0;">No CV attached.</p>`}

            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.07);">
              <a href="https://lexoratech.com/admin/careers" style="font-size: 0.8125rem; color: #7EA6FF;">View all applicants →</a>
            </div>
          </div>
        `,
        attachments,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[careers/route] error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
