import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestDevice } from "@/lib/auth";
import { mutateStore } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  code: z.string().trim().min(4).max(16).nullable(),
  expiresAt: z.string().datetime().nullable().optional(),
});

export async function POST(request: NextRequest) {
  const device = getRequestDevice(request);
  if (!device) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid pairing code." }, { status: 400 });

  await mutateStore((data) => {
    const current = data.devices[device.id];
    current.pairingCode = parsed.data.code;
    current.pairingCodeExpiresAt = parsed.data.expiresAt ?? null;
    current.lastSeen = new Date().toISOString();
  });
  return NextResponse.json({ ok: true });
}
