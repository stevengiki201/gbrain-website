import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestDevice } from "@/lib/auth";
import { mutateStore } from "@/lib/server-store";
import { upsertMessages } from "@/lib/sms-cache";

export const runtime = "nodejs";

const schema = z.object({
  status: z.enum(["done", "failed"]).default("done"),
  result: z.record(z.string(), z.unknown()).default({}),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const device = getRequestDevice(request);
  if (!device) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid result." }, { status: 400 });
  const { id } = await context.params;

  const updated = await mutateStore((data) => {
    const command = data.commands[id];
    if (!command || command.deviceId !== device.id) return null;
    command.status = parsed.data.status;
    command.result = parsed.data.result;
    command.updatedAt = new Date().toISOString();
    device.lastSeen = command.updatedAt;

    const messages = parsed.data.result.messages;
    if (command.type === "sms.history" && Array.isArray(messages)) {
      upsertMessages(data, device.userId, messages as never);
    }
    if (command.type === "sms.send" && parsed.data.result.ok === true && parsed.data.result.sent === true) {
      const smsId = command.payload.smsId;
      const pending = (data.messages[device.userId] ?? []).filter(
        (message) => message.status === "queued" && (smsId ? message.smsId === smsId : message.address === command.payload.to),
      );
      for (const message of pending) message.status = "dispatched";
    }
    return true;
  });

  if (!updated) return NextResponse.json({ error: "Command not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
