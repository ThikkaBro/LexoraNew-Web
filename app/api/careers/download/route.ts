import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lexora-admin-2026";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pw   = searchParams.get("pw");
  const file = searchParams.get("file");

  if (pw !== ADMIN_PASSWORD) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!file) {
    return new NextResponse("Missing file parameter", { status: 400 });
  }

  // If it's a full Vercel Blob URL, redirect to it directly
  if (file.startsWith("https://")) {
    return NextResponse.redirect(file);
  }

  // Otherwise it's a local filename — serve from disk (dev only)
  if (file.includes("..") || file.includes("/")) {
    return new NextResponse("Invalid file path", { status: 400 });
  }

  try {
    const { readFile } = await import("fs/promises");
    const filePath = path.join(process.cwd(), "data", "applications", file);
    const buffer   = await readFile(filePath);
    const ext      = path.extname(file).toLowerCase();

    const contentType =
      ext === ".pdf"
        ? "application/pdf"
        : ext === ".docx"
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "application/octet-stream";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${file}"`,
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
