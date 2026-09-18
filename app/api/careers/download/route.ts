import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "applications");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lexora-admin-2026";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pw = searchParams.get("pw");
  const file = searchParams.get("file");

  if (pw !== ADMIN_PASSWORD) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!file || file.includes("..") || file.includes("/")) {
    return new NextResponse("Invalid file", { status: 400 });
  }

  try {
    const filePath = path.join(DATA_DIR, file);
    const buffer = await readFile(filePath);
    const ext = path.extname(file).toLowerCase();
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
