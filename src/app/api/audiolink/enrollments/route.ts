import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestUserRecord, hashToken, isConfirmedUser } from "@/lib/auth";
import { mutateStore, newId } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  deviceName: z.string().trim().min(2).max(80).optional(),
  fingerprint: z.string().trim().max(200).optional(),
});

export async function POST(request: NextRequest) {
  const user = getRequestUserRecord(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isConfirmedUser(user)) {
    return NextResponse.json({ error: "Your account must be confirmed before enrolling AudioLink." }, { status: 403 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid enrollment request." }, { status: 400 });

  const bridgeUrl = process.env.GBRAIN_AUDIOLINK_BRIDGE_URL || "https://127.0.0.1:8787";
  if (!z.string().url().safeParse(bridgeUrl).success) {
    return NextResponse.json({ error: "AudioLink bridge URL is not configured correctly." }, { status: 500 });
  }
  if (process.env.NODE_ENV === "production" && !process.env.GBRAIN_AUDIOLINK_BRIDGE_URL) {
    return NextResponse.json({ error: "AudioLink bridge URL is not configured." }, { status: 500 });
  }

  const token = `alwe_${randomBytes(32).toString("base64url")}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
  const result = await mutateStore((data) => {
    const enrollmentId = newId("enr");
    const device = {
      id: newId("dev"),
      userId: user.id,
      name: parsed.data.deviceName || "Hosted AudioLink",
      fingerprint: parsed.data.fingerprint || "",
      tokenHash: hashToken(`hosted_${randomBytes(32).toString("base64url")}`),
      status: { bridge: "pending", hosted: true },
      lastSeen: now.toISOString(),
      pairingCode: null,
      pairingCodeExpiresAt: null,
      hosted: true,
      createdAt: now.toISOString(),
    };
    data.devices[device.id] = device;
    data.enrollments[enrollmentId] = {
      id: enrollmentId,
      tokenHash: hashToken(token),
      userId: user.id,
      deviceId: device.id,
      status: "pending",
      createdAt: now.toISOString(),
      expiresAt,
      usedAt: null,
    };
    data.audits.unshift({
      id: newId("aud"),
      userId: user.id,
      action: "audiolink.enrollment_created",
      detail: { deviceId: device.id, expiresAt },
      createdAt: now.toISOString(),
    });
    return { deviceId: device.id };
  });

  const deepLink = `audiolink://enroll?token=${encodeURIComponent(token)}&bridge=${encodeURIComponent(bridgeUrl)}`;
  return NextResponse.json(
    { deviceId: result.deviceId, token, deepLink, expiresAt },
    { status: 201 },
  );
}
