import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hashToken, verifyPassword } from "@/lib/auth";
import { mutateStore, newId } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
  name: z.string().trim().min(2).max(80).optional(),
  fingerprint: z.string().trim().max(200).optional(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid sign-in details." }, { status: 400 });
  }

  const result = await mutateStore((data) => {
    const user = Object.values(data.users).find((item) => item.email === parsed.data.email);
    if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
      return { error: "Invalid email or password." as const };
    }
    const token = randomBytes(32).toString("base64url");
    const now = new Date().toISOString();
    const device = {
      id: newId("dev"),
      userId: user.id,
      name: parsed.data.name || parsed.data.fingerprint || "GBrain CLI",
      fingerprint: parsed.data.fingerprint || "",
      tokenHash: hashToken(token),
      status: { bridge: "unknown" },
      lastSeen: now,
      pairingCode: null,
      pairingCodeExpiresAt: null,
      createdAt: now,
    };
    data.devices[device.id] = device;
    data.audits.unshift({
      id: newId("aud"),
      userId: user.id,
      action: "device.signed_in",
      detail: { deviceId: device.id, name: device.name },
      createdAt: now,
    });
    return { deviceId: device.id, token, name: device.name };
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  return NextResponse.json(result);
}
