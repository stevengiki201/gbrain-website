import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestUser } from "@/lib/auth";
import { enqueueCommand, isCommandType, publicCommand } from "@/lib/commands";
import { mutateStore } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  type: z.string().min(1).max(64),
  payload: z.record(z.string(), z.unknown()).default({}),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Unsupported command." }, { status: 400 });
  }
  const type = parsed.data.type;
  if (!isCommandType(type)) {
    return NextResponse.json({ error: "Unsupported command." }, { status: 400 });
  }
  const { id } = await context.params;

  const result = await mutateStore((data) => {
    const device = data.devices[id];
    if (!device || device.userId !== user.id) return null;
    return enqueueCommand(data, user.id, id, type, parsed.data.payload);
  });

  if (!result) return NextResponse.json({ error: "Device not found." }, { status: 404 });
  return NextResponse.json({ command: publicCommand(result) }, { status: 201 });
}
