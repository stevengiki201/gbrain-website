import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hashToken, hasServiceToken, isConfirmedUser } from "@/lib/auth";
import { mutateStore } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  token: z.string().min(10).max(300),
  deviceId: z.string().trim().min(1).max(128),
  deviceName: z.string().trim().max(128).optional(),
  platform: z.string().trim().max(32).optional(),
  appVersion: z.string().trim().max(32).optional(),
});

export async function POST(request: NextRequest) {
  if (!hasServiceToken(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid enrollment verification." }, { status: 400 });

  const tokenHash = hashToken(parsed.data.token);
  const result = await mutateStore((data) => {
    const enrollment = Object.values(data.enrollments).find(
      (item) => item.status === "pending" && item.tokenHash === tokenHash,
    );
    if (!enrollment) return { error: "Invalid or used enrollment token." as const };
    if (Date.parse(enrollment.expiresAt) <= Date.now()) {
      enrollment.status = "revoked";
      return { error: "Enrollment token expired." as const };
    }
    const user = data.users[enrollment.userId];
    if (!user || !isConfirmedUser(user)) return { error: "Account is not confirmed." as const };
    const device = data.devices[enrollment.deviceId];
    if (!device) return { error: "Hosted device not found." as const };

    enrollment.status = "used";
    enrollment.usedAt = new Date().toISOString();
    device.status = {
      bridge: "paired",
      hosted: true,
      phoneDeviceId: parsed.data.deviceId,
      phoneName: parsed.data.deviceName || "",
    };
    device.lastSeen = enrollment.usedAt;
    data.audits.unshift({
      id: `aud_${enrollment.id}`,
      userId: user.id,
      action: "audiolink.enrollment_verified",
      detail: { deviceId: device.id, phoneDeviceId: parsed.data.deviceId },
      createdAt: enrollment.usedAt,
    });
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      deviceId: device.id,
      deviceName: device.name,
    };
  });

  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}
