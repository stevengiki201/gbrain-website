import { NextResponse, type NextRequest } from "next/server";
import { hasCronSecret } from "@/lib/auth";
import { runHealthChecks } from "@/lib/health-check";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!hasCronSecret(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return NextResponse.json(await runHealthChecks());
}
