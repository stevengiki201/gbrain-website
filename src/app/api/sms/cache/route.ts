import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestDevice } from "@/lib/auth";
import { mutateStore } from "@/lib/server-store";
import { upsertMessages } from "@/lib/sms-cache";

export const runtime = "nodejs";

const messageSchema = z.object({
  smsId: z.string().max(200).optional(),
  sms_id: z.string().max(200).optional(),
  folder: z.string().max(40).optional(),
  address: z.string().max(200).optional(),
  body: z.string().max(8000).optional(),
  dateMs: z.coerce.number().int().optional(),
  date_ms: z.coerce.number().int().optional(),
  msgType: z.coerce.number().int().optional(),
  msg_type: z.coerce.number().int().optional(),
});

const schema = z.object({
  messages: z.array(messageSchema).max(1000),
});

export async function POST(request: NextRequest) {
  const device = getRequestDevice(request);
  if (!device) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid messages." }, { status: 400 });

  const normalized = parsed.data.messages.map((message) => ({
    smsId: message.smsId ?? message.sms_id,
    folder: message.folder,
    address: message.address,
    body: message.body,
    dateMs: message.dateMs ?? message.date_ms,
    msgType: message.msgType ?? message.msg_type,
  }));

  const count = await mutateStore((data) => upsertMessages(data, device.userId, normalized));
  return NextResponse.json({ ok: true, count });
}
