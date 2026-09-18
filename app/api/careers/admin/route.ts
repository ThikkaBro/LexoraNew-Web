import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lexora-admin-2026";

function checkPassword(pw: string | null): boolean {
  return pw === ADMIN_PASSWORD;
}

// Helper to resolve Upstash / Redis credentials across any Vercel integration naming
function getRedisCredentials(): { url?: string; token?: string } {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REST_API_URL ||
    process.env.UPSTASH_URL ||
    process.env.KV_REST_API_URL ||
    process.env.STORAGE_REST_API_URL ||
    process.env.STORAGE_URL ||
    process.env.REDIS_URL;

  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REST_API_TOKEN ||
    process.env.UPSTASH_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.STORAGE_TOKEN ||
    process.env.REDIS_TOKEN;

  if (url && token) {
    return { url, token };
  }
  return {};
}

interface StoredApplication {
  id: string;
  name: string;
  email: string;
  linkedin?: string | null;
  coverNote?: string | null;
  expectedSalary?: string | null;
  cvFileName?: string | null;
  cvUrl?: string | null;
  appliedAt?: string;
  [key: string]: unknown;
}

async function loadApplications(): Promise<StoredApplication[]> {
  const { url, token } = getRedisCredentials();

  if (url && token) {
    try {
      // ── Production: read from Upstash Redis ────────────────────────────────
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({ url, token });

      // Get all application IDs
      const ids = (await redis.lrange("career:apps", 0, -1)) as string[];
      if (!ids || ids.length === 0) return [];

      // Fetch each application hash in parallel
      const apps = await Promise.all(
        ids.map(async (id) => {
          try {
            const data = await redis.hgetall(`career:app:${id}`);
            return data as StoredApplication | null;
          } catch (err) {
            console.error(`[careers/admin] Error loading app ${id}:`, err);
            return null;
          }
        })
      );

      const validApps = apps.filter((a): a is StoredApplication => Boolean(a && a.id));

      // Sort newest first by appliedAt
      validApps.sort((a, b) => {
        const timeA = a.appliedAt ? new Date(a.appliedAt).getTime() : 0;
        const timeB = b.appliedAt ? new Date(b.appliedAt).getTime() : 0;
        return timeB - timeA;
      });

      return validApps;
    } catch (redisErr) {
      console.error("[careers/admin] Redis fetch failed:", redisErr);
      return [];
    }
  }

  // ── Dev: read from local JSON file ───────────────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    try {
      const { readFile } = await import("fs/promises");
      const indexFile = path.join(
        process.cwd(),
        "data",
        "applications",
        "index.json"
      );
      const raw = await readFile(indexFile, "utf-8");
      const list = JSON.parse(raw) as StoredApplication[];
      list.sort((a, b) => {
        const timeA = a.appliedAt ? new Date(a.appliedAt).getTime() : 0;
        const timeB = b.appliedAt ? new Date(b.appliedAt).getTime() : 0;
        return timeB - timeA;
      });
      return list;
    } catch {
      return [];
    }
  }

  return [];
}

// POST /api/careers/admin — validate password
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (checkPassword(body?.password)) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET /api/careers/admin?load=1 — fetch all applications
export async function GET(req: NextRequest) {
  try {
    const pw = req.headers.get("x-admin-password");
    if (!checkPassword(pw)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await loadApplications();
    return NextResponse.json({ applications });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
