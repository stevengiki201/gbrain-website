import { NextResponse, type NextRequest } from "next/server";
import { getRequestAdmin } from "@/lib/auth";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const store = getStore();
  const deviceCounts = new Map<string, number>();
  for (const device of Object.values(store.devices)) {
    deviceCounts.set(device.userId, (deviceCounts.get(device.userId) || 0) + 1);
  }

  const users = Object.values(store.users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      devices: deviceCounts.get(user.id) || 0,
    }))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return NextResponse.json({ users });
}
