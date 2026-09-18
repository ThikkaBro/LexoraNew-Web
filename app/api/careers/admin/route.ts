import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lexora-admin-2026";

function checkPassword(pw: string | null): boolean {
  return pw === ADMIN_PASSWORD;
}

async function loadApplications(): Promise<object[]> {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    // ── Production: read from Upstash Redis ────────────────────────────────
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Get all application IDs (newest first — lpush adds to front)
    const ids = await redis.lrange("career:apps", 0, -1) as string[];
    if (!ids || ids.length === 0) return [];

    // Fetch each application hash
    const apps = await Promise.all(
      ids.map((id) => redis.hgetall(`career:app:${id}`))
    );

    return apps.filter(Boolean) as object[];
  } else {
    // ── Dev: read from local JSON file ─────────────────────────────────────
    const { readFile } = await import("fs/promises");
    const indexFile = path.join(
      process.cwd(),
      "data",
      "applications",
      "index.json"
    );
    try {
      return JSON.parse(await readFile(indexFile, "utf-8"));
    } catch {
      return [];
    }
  }
}

// POST /api/careers/admin — validate password
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (checkPassword(body?.password)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// GET /api/careers/admin?load=1 — fetch all applications
export async function GET(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (!checkPassword(pw)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await loadApplications();
  return NextResponse.json({ applications });
}
