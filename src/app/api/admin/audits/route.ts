import { NextResponse, type NextRequest } from "next/server";
import { getRequestAdmin } from "@/lib/auth";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const store = getStore();
  const audits = [...store.audits]
    .reverse()
    .slice(0, 200)
    .map((audit) => ({
      ...audit,
      actorEmail: store.users[audit.userId]?.email || audit.userId,
    }));

  return NextResponse.json({ audits });
}
