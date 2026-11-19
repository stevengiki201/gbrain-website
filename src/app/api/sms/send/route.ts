import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestUser } from "@/lib/auth";
import { enqueueCommand, publicCommand } from "@/lib/commands";
import { mutateStore } from "@/lib/server-store";
import { upsertMessages } from "@/lib/sms-cache";

export const runtime = "nodejs";

const schema = z.object({
  deviceId: z.string().min(1),
  to: z.string().trim().min(3).max(30),
  message: z.string().trim().min(1).max(2000),
});

export async function POST(request: NextRequest) {
  const user = getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Choose a PC and enter a recipient and message." }, { status: 400 });
  }

  const result = await mutateStore((data) => {
    const device = data.devices[parsed.data.deviceId];
    if (!device || device.userId !== user.id) return null;
    const command = enqueueCommand(data, user.id, device.id, "sms.send", {
      to: parsed.data.to,
      message: parsed.data.message,
    });
    const smsId = `local_${command.id}`;
    command.payload.smsId = smsId;
    upsertMessages(data, user.id, [
      {
        smsId,
        folder: "sent",
        address: parsed.data.to,
        body: parsed.data.message,
        dateMs: Date.now(),
        msgType: 2,
        status: "queued",
      },
    ]);
    data.audits.unshift({
      id: `aud_${command.id}`,
      userId: user.id,
      action: "sms.send_queued",
      detail: { deviceId: device.id, to: parsed.data.to, commandId: command.id },
      createdAt: new Date().toISOString(),
    });
    return command;
  });

  if (!result) return NextResponse.json({ error: "PC not found." }, { status: 404 });
  return NextResponse.json({ command: publicCommand(result) }, { status: 201 });
}
