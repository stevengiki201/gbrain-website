import { NextResponse, type NextRequest } from "next/server";
import { getRequestAdmin } from "@/lib/auth";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const store = getStore();
  const devices = Object.values(store.devices)
    .map((device) => ({
      id: device.id,
      name: device.name,
      userId: device.userId,
      userEmail: store.users[device.userId]?.email || "",
      hosted: device.hosted,
      lastSeen: device.lastSeen,
      status: device.status,
      createdAt: device.createdAt,
    }))
    .sort((a, b) => Date.parse(b.lastSeen) - Date.parse(a.lastSeen));

  return NextResponse.json({ devices });
}
