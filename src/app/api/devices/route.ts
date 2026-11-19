import { NextResponse, type NextRequest } from "next/server";
import { getRequestUser } from "@/lib/auth";
import { publicDevice } from "@/lib/device-view";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const devices = Object.values(getStore().devices)
    .filter((device) => device.userId === user.id)
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
    .map(publicDevice);
  return NextResponse.json({ devices });
}
