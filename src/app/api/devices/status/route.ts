import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestDevice } from "@/lib/auth";
import { mutateStore } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  status: z.record(z.string(), z.unknown()).default({}),
});

export async function POST(request: NextRequest) {
  const device = getRequestDevice(request);
  if (!device) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

  await mutateStore((data) => {
    const current = data.devices[device.id];
    current.status = parsed.data.status;
    current.lastSeen = new Date().toISOString();
  });
  return NextResponse.json({ ok: true });
}
