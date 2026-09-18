import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "applications");
const INDEX_FILE = path.join(DATA_DIR, "index.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lexora-admin-2026";

function checkPassword(req: NextRequest): boolean {
  const header = req.headers.get("x-admin-password");
  return header === ADMIN_PASSWORD;
}

// POST /api/careers/admin — validate password
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body?.password === ADMIN_PASSWORD) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// GET /api/careers/admin?load=1 — fetch all applications
export async function GET(req: NextRequest) {
  if (!checkPassword(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = await readFile(INDEX_FILE, "utf-8");
    const applications = JSON.parse(raw);
    return NextResponse.json({ applications });
  } catch {
    return NextResponse.json({ applications: [] });
  }
}
