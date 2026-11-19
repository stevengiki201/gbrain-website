import { NextResponse, type NextRequest } from "next/server";
import { getRequestAdmin } from "@/lib/auth";
import { runHealthChecks } from "@/lib/health-check";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  return NextResponse.json(await runHealthChecks());
}
