import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import path from "path";

export const maxDuration = 30;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ── Storage helpers ──────────────────────────────────────────────────────────
//
// Strategy:
//   Production (Vercel): CV file → Vercel Blob, metadata → Upstash Redis
//   Local dev           : CV file → local disk,  metadata → local JSON file
//
// This lets you run locally without any cloud accounts, while the live site
// persists everything permanently.

async function saveFile(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // ── Vercel Blob (production) ────────────────────────────────────────────
    const { put } = await import("@vercel/blob");
    const blob = await put(`careers/${fileName}`, buffer, {
      access: "private",
      contentType: fileName.endsWith(".pdf")
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    return blob.url;
  } else {
    // ── Local filesystem fallback (dev) ────────────────────────────────────
    const { writeFile, mkdir } = await import("fs/promises");
    const dir = path.join(process.cwd(), "data", "applications");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, fileName), buffer);
    return `/api/careers/download?file=${encodeURIComponent(fileName)}`;
  }
}

async function saveApplication(application: object): Promise<void> {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    // ── Upstash Redis (production) ─────────────────────────────────────────
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    const app = application as { id: string };
    // Store each application as a hash, and track all IDs in a list
    await redis.hset(`career:app:${app.id}`, application as Record<string, unknown>);
    await redis.lpush("career:apps", app.id);
  } else {
    // ── Local JSON fallback (dev) ──────────────────────────────────────────
    const { writeFile, mkdir, readFile } = await import("fs/promises");
    const dir = path.join(process.cwd(), "data", "applications");
    const indexFile = path.join(dir, "index.json");
    await mkdir(dir, { recursive: true });
    let index: object[] = [];
    try {
      index = JSON.parse(await readFile(indexFile, "utf-8"));
    } catch {
      // first run — start fresh
    }
    index.push(application);
    await writeFile(indexFile, JSON.stringify(index, null, 2));
  }
}

// ── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Guard: reject bodies over 10 MB
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Please upload a CV under 10 MB." },
        { status: 413 }
      );
    }

    const formData = await req.formData();
    const name           = formData.get("name") as string;
    const email          = formData.get("email") as string;
    const linkedin       = formData.get("linkedin") as string;
    const coverNote      = formData.get("coverNote") as string;
    const expectedSalary = formData.get("expectedSalary") as string;
    const cvFile         = formData.get("cv") as File | null;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // ── Handle CV file ──────────────────────────────────────────────────────
    let cvUrl: string | null = null;
    let cvFileName: string | null = null;
    let cvBuffer: Buffer | null = null;

    if (cvFile && cvFile.size > 0) {
      const bytes = await cvFile.arrayBuffer();
      cvBuffer = Buffer.from(bytes);
      const ext = path.extname(cvFile.name) || ".pdf";
      cvFileName = `${Date.now()}-${name.replace(/\s+/g, "_").toLowerCase()}${ext}`;
      cvUrl = await saveFile(cvBuffer, cvFileName);
    }

    // ── Save application record ─────────────────────────────────────────────
    const application = {
      id:             Date.now().toString(),
      name,
      email,
      linkedin:       linkedin || null,
      coverNote:      coverNote || null,
      expectedSalary: expectedSalary || null,
      cvFileName,
      cvUrl,
      appliedAt:      new Date().toISOString(),
    };
    await saveApplication(application);

    // ── Send email via Resend ───────────────────────────────────────────────
    const resendKey   = process.env.RESEND_API_KEY;
    const primaryEmail = process.env.CAREERS_EMAIL   || "careers@lexoratech.com";
    const ccEmail      = process.env.CAREERS_CC_EMAIL || "hello@lexoratech.com";

    if (resendKey) {
      const resend = new Resend(resendKey);
      const attachments =
        cvBuffer && cvFileName
          ? [{ filename: cvFileName, content: cvBuffer }]
          : [];

      await resend.emails.send({
        from: "LexoraTech Careers <careers@lexoratech.com>",
        to: [primaryEmail, ccEmail],
        subject: `New Application — Marketing Specialist: ${name}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#08090A;color:#F7F8F8;padding:32px;border-radius:8px;">
            <div style="margin-bottom:24px;">
              <h1 style="margin:0;font-size:1.25rem;letter-spacing:-0.02em;">New Job Application</h1>
              <p style="margin:4px 0 0;color:#8A8F98;font-size:0.875rem;">Marketing Specialist — LexoraTech</p>
            </div>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;width:140px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;"><a href="mailto:${email}" style="color:#7EA6FF;">${email}</a></td>
              </tr>
              ${linkedin ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;">LinkedIn</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;"><a href="${linkedin}" style="color:#7EA6FF;" target="_blank">${linkedin}</a></td></tr>` : ""}
              ${expectedSalary ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;">Expected Salary</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;color:#7EA6FF;font-weight:500;">${expectedSalary}</td></tr>` : ""}
              <tr>
                <td style="padding:10px 0;color:#8A8F98;font-size:0.8125rem;">Applied</td>
                <td style="padding:10px 0;font-size:0.875rem;">${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</td>
              </tr>
            </table>
            ${coverNote ? `<div style="background:#0D0E10;border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:16px;margin-bottom:24px;"><p style="margin:0 0 8px;color:#8A8F98;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;">Cover Note</p><p style="margin:0;font-size:0.875rem;line-height:1.65;white-space:pre-wrap;">${coverNote}</p></div>` : ""}
            <p style="color:#8A8F98;font-size:0.8125rem;margin:0;">${cvFileName ? "📎 CV attached." : "No CV uploaded."}</p>
            <div style="margin-top:32px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.07);">
              <a href="https://lexoratech.com/admin/careers" style="font-size:0.8125rem;color:#7EA6FF;">View all applicants →</a>
            </div>
          </div>`,
        attachments,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[careers/route] error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
