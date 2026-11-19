import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { hashToken, hasServiceToken, isConfirmedUser } from "@/lib/auth";
import { mutateStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!hasServiceToken(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const devices = await mutateStore((data) => {
    const result: Array<{ id: string; userId: string; token: string; name: string }> = [];
    for (const device of Object.values(data.devices)) {
      if (!device.hosted) continue;
      const user = data.users[device.userId];
      if (!user || !isConfirmedUser(user)) continue;
      const token = randomBytes(32).toString("base64url");
      device.tokenHash = hashToken(token);
      device.lastSeen = new Date().toISOString();
      device.status = { ...device.status, bridge: device.status.phoneDeviceId ? "paired" : "pending", hosted: true };
      result.push({ id: device.id, userId: user.id, token, name: device.name });
    }
    return result;
  });

  return NextResponse.json({ devices });
}
