import { NextResponse, type NextRequest } from "next/server";
import { getRequestDevice } from "@/lib/auth";
import { publicCommand } from "@/lib/commands";
import { mutateStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const device = getRequestDevice(request);
  if (!device) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const command = await mutateStore((data) => {
    const pending = Object.values(data.commands)
      .filter((item) => item.deviceId === device.id && item.status === "pending")
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))[0];
    if (!pending) return null;
    pending.status = "dispatched";
    pending.updatedAt = new Date().toISOString();
    data.devices[device.id].lastSeen = pending.updatedAt;
    return publicCommand(pending);
  });

  return NextResponse.json({ command });
}
