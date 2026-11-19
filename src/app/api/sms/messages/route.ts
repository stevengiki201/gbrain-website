import { NextResponse, type NextRequest } from "next/server";
import { getRequestUser } from "@/lib/auth";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const messages = (getStore().messages[user.id] ?? []).slice(0, 500);
  return NextResponse.json({ messages });
}
