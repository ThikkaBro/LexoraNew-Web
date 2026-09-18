import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import path from "path";

export const maxDuration = 30;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Helper to resolve Upstash / Redis credentials across ANY Vercel integration prefix.
// When Upstash is added via Vercel Marketplace, it injects env vars with the user's
// chosen prefix, e.g. STORAGE_REDIS_REST_URL, KV_REDIS_REST_URL, UPSTASH_REDIS_REST_URL.
// Instead of guessing every possible prefix, we scan ALL env vars for an Upstash URL.
function getRedisCredentials(): { url: string; token: string } | null {
  // 1. Try well-known variable names first (fastest path)
  const knownUrlKeys = [
    "UPSTASH_REDIS_REST_URL",
    "KV_REST_API_URL",
    "KV_REDIS_REST_URL",
    "STORAGE_REDIS_REST_URL",
    "REDIS_URL",
  ];
  const knownTokenKeys = [
    "UPSTASH_REDIS_REST_TOKEN",
    "KV_REST_API_TOKEN",
    "KV_REDIS_REST_TOKEN",
    "STORAGE_REDIS_REST_TOKEN",
    "REDIS_TOKEN",
  ];

  for (const k of knownUrlKeys) {
    const url = process.env[k];
    if (url) {
      // Find the matching token: replace URL/url in the key name with TOKEN/token
      const tokenKey = k.replace(/_URL$/, "_TOKEN");
      const token = process.env[tokenKey];
      if (token) {
        console.log(`[careers] Redis credentials found via ${k} / ${tokenKey}`);
        return { url, token };
      }
    }
  }
  // Also check known token keys independently
  for (const k of knownTokenKeys) {
    const token = process.env[k];
    if (token) {
      const urlKey = k.replace(/_TOKEN$/, "_URL");
      const url = process.env[urlKey];
      if (url) {
        console.log(`[careers] Redis credentials found via ${urlKey} / ${k}`);
        return { url, token };
      }
    }
  }

  // 2. Fallback: scan ALL env vars for anything with "upstash.io" in the value
  const allKeys = Object.keys(process.env);
  for (const key of allKeys) {
    const val = process.env[key] || "";
    if (val.includes("upstash.io") && (key.includes("URL") || key.includes("url"))) {
      // Found a URL — now find its companion token
      const base = key.replace(/_?URL$/i, "");
      const tokenKey = allKeys.find(
        (k) => k.startsWith(base) && (k.includes("TOKEN") || k.includes("token"))
      );
      if (tokenKey && process.env[tokenKey]) {
        console.log(`[careers] Redis credentials auto-detected via ${key} / ${tokenKey}`);
        return { url: val, token: process.env[tokenKey]! };
      }
    }
  }

  // 3. Log what env vars ARE available (names only, no values) for debugging
  const redisLike = allKeys.filter(
    (k) => /redis|upstash|kv|storage/i.test(k)
  );
  if (redisLike.length > 0) {
    console.warn("[careers] Found Redis-like env vars but couldn't pair URL+TOKEN:", redisLike);
  } else {
    console.warn("[careers] No Redis/Upstash env vars found at all. Available env var names:", allKeys.filter(k => !k.startsWith("npm_")).slice(0, 30));
  }

  return null;
}

// ── Resilient file storage ───────────────────────────────────────────────────
// Saves CV to Vercel Blob in production, or local disk in development.
// Never throws — fails gracefully so candidate application is never blocked.
async function saveFile(buffer: Buffer, fileName: string): Promise<string | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // 1. Try Vercel Blob (production cloud storage)
  if (token) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(`careers/${fileName}`, buffer, {
        access: "public",
        token,
      });
      console.log("[careers] CV uploaded to Vercel Blob:", blob.url);
      return blob.url;
    } catch (blobErr) {
      console.error("[careers] Vercel Blob upload failed:", blobErr);
    }
  } else {
    console.warn("[careers] BLOB_READ_WRITE_TOKEN is not set in environment.");
  }

  // 2. Local filesystem fallback (local dev only - serverless is read-only)
  if (process.env.NODE_ENV !== "production") {
    try {
      const { writeFile, mkdir } = await import("fs/promises");
      const dir = path.join(process.cwd(), "data", "applications");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, fileName), buffer);
      return `/api/careers/download?file=${encodeURIComponent(fileName)}`;
    } catch (fsErr) {
      console.error("[careers] Local filesystem save failed:", fsErr);
    }
  }

  return null;
}

// ── Resilient metadata storage ────────────────────────────────────────────────
// Saves applicant to Upstash Redis, or local JSON in development.
// Never throws.
async function saveApplication(application: Record<string, unknown>): Promise<boolean> {
  const creds = getRedisCredentials();

  // 1. Try Upstash Redis (production database)
  if (creds) {
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({ url: creds.url, token: creds.token });
      const id = application.id as string;
      await redis.hset(`career:app:${id}`, application);
      await redis.lpush("career:apps", id);
      console.log("[careers] Application saved to Upstash Redis, ID:", id);
      return true;
    } catch (redisErr) {
      console.error("[careers] Upstash Redis save error:", redisErr);
    }
  }

  // 2. Local JSON fallback (local dev only)
  if (process.env.NODE_ENV !== "production") {
    try {
      const { writeFile, mkdir, readFile } = await import("fs/promises");
      const dir = path.join(process.cwd(), "data", "applications");
      const indexFile = path.join(dir, "index.json");
      await mkdir(dir, { recursive: true });
      let index: unknown[] = [];
      try {
        index = JSON.parse(await readFile(indexFile, "utf-8"));
      } catch {
        // First run
      }
      index.push(application);
      await writeFile(indexFile, JSON.stringify(index, null, 2));
      return true;
    } catch (fsErr) {
      console.error("[careers] Local JSON save failed:", fsErr);
    }
  }

  return false;
}

// ── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Vercel serverless has a 4.5 MB request limit. Check content length early.
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 4.5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 4.5 MB limit. Please upload a smaller CV or compress your PDF." },
        { status: 413 }
      );
    }

    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (formErr) {
      console.error("[careers] Failed to parse form data:", formErr);
      return NextResponse.json(
        { error: "Unable to process the uploaded form. If your CV file is large, please upload a smaller file." },
        { status: 400 }
      );
    }

    const name           = ((formData.get("name")           as string) || "").trim();
    const email          = ((formData.get("email")          as string) || "").trim();
    const linkedin       = ((formData.get("linkedin")       as string) || "").trim();
    const coverNote      = ((formData.get("coverNote")      as string) || "").trim();
    const expectedSalary = ((formData.get("expectedSalary") as string) || "").trim();
    const cvFile         = formData.get("cv") as File | null;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // ── Handle CV upload ────────────────────────────────────────────────────
    let cvUrl: string | null      = null;
    let cvFileName: string | null = null;
    let cvBuffer: Buffer | null   = null;

    if (cvFile && cvFile.size > 0) {
      try {
        const bytes = await cvFile.arrayBuffer();
        cvBuffer = Buffer.from(bytes);
        const originalName = cvFile.name || "resume.pdf";
        const ext = path.extname(originalName) || ".pdf";
        const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
        cvFileName = `${Date.now()}-${sanitizedName}${ext}`;
        cvUrl = await saveFile(cvBuffer, cvFileName);
      } catch (cvErr) {
        console.error("[careers] Error processing CV file buffer:", cvErr);
      }
    }

    // ── Save application record ─────────────────────────────────────────────
    const applicationId = Date.now().toString();
    const application: Record<string, unknown> = {
      id:             applicationId,
      name,
      email,
      linkedin:       linkedin  || null,
      coverNote:      coverNote || null,
      expectedSalary: expectedSalary || null,
      cvFileName,
      cvUrl,
      appliedAt:      new Date().toISOString(),
    };

    // Save metadata (never throws)
    await saveApplication(application);

    // ── Send email notification via Resend ──────────────────────────────────
    const resendKey    = process.env.RESEND_API_KEY;
    const primaryEmail = process.env.CAREERS_EMAIL    || "careers@lexoratech.com";
    const ccEmail      = process.env.CAREERS_CC_EMAIL || "hello@lexoratech.com";

    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const attachments = cvBuffer && cvFileName
          ? [{ filename: cvFileName, content: cvBuffer }]
          : [];

        const emailHtml = `
          <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#08090A;color:#F7F8F8;padding:32px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);">
            <div style="margin-bottom:24px;">
              <span style="font-size:0.75rem;color:#7EA6FF;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">LexoraTech Careers</span>
              <h1 style="margin:6px 0 0;font-size:1.35rem;letter-spacing:-0.02em;color:#FFFFFF;">New Job Application</h1>
              <p style="margin:4px 0 0;color:#8A8F98;font-size:0.875rem;">Role: Marketing Specialist</p>
            </div>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;width:140px;">Applicant Name</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;color:#F7F8F8;font-weight:500;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;">Email Address</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;"><a href="mailto:${email}" style="color:#7EA6FF;text-decoration:none;">${email}</a></td>
              </tr>
              ${linkedin ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;">LinkedIn</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;"><a href="${linkedin}" style="color:#7EA6FF;text-decoration:none;" target="_blank">${linkedin}</a></td></tr>` : ""}
              ${expectedSalary ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;">Expected Salary</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;color:#7EA6FF;font-weight:600;">${expectedSalary}</td></tr>` : ""}
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#8A8F98;font-size:0.8125rem;">Applied At</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.875rem;color:#C1C7CD;">${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</td>
              </tr>
              ${cvUrl ? `<tr><td style="padding:10px 0;color:#8A8F98;font-size:0.8125rem;">CV Storage Link</td><td style="padding:10px 0;font-size:0.875rem;"><a href="${cvUrl}" style="color:#7EA6FF;" target="_blank">Open Uploaded CV</a></td></tr>` : ""}
            </table>
            ${coverNote ? `
              <div style="background:#0D0E10;border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:16px;margin-bottom:24px;">
                <p style="margin:0 0 8px;color:#8A8F98;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Cover Note</p>
                <p style="margin:0;font-size:0.875rem;line-height:1.65;white-space:pre-wrap;color:#D3D7DC;">${coverNote}</p>
              </div>` : ""}
            <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;">
              <p style="color:#8A8F98;font-size:0.8125rem;margin:0;">${cvFileName ? `📎 Attached: ${cvFileName}` : "No file attached."}</p>
              <a href="https://lexoratech.com/admin/careers" style="font-size:0.8125rem;color:#7EA6FF;text-decoration:none;font-weight:500;">Admin Dashboard →</a>
            </div>
          </div>
        `;

        // Try primary from address
        try {
          await resend.emails.send({
            from: "LexoraTech Careers <careers@lexoratech.com>",
            to: [primaryEmail, ccEmail],
            subject: `New Application — Marketing Specialist: ${name}`,
            html: emailHtml,
            attachments,
          });
          console.log("[careers] Notification email successfully sent via careers@lexoratech.com");
        } catch (domainErr) {
          // If custom domain is not yet verified in Resend, fall back to onboarding@resend.dev
          console.warn("[careers] Custom domain send failed, trying onboarding@resend.dev fallback:", domainErr);
          await resend.emails.send({
            from: "LexoraTech Careers <onboarding@resend.dev>",
            to: [primaryEmail],
            subject: `New Application — Marketing Specialist: ${name}`,
            html: emailHtml,
            attachments,
          });
          console.log("[careers] Notification email sent via onboarding@resend.dev");
        }
      } catch (emailErr) {
        // Never let email failure abort the applicant's submission
        console.error("[careers] Email notification failed (data was still preserved):", emailErr);
      }
    } else {
      console.log("[careers] RESEND_API_KEY is not configured — skipping email dispatch");
    }

    // ── Success response ────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      id: applicationId,
      cvSaved: Boolean(cvUrl),
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "An unexpected server error occurred.";
    console.error("[careers] Unhandled error during career application processing:", err);
    return NextResponse.json(
      { error: `Unable to submit application: ${message}` },
      { status: 500 }
    );
  }
}
