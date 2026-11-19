import { NextResponse, type NextRequest } from "next/server";
import { getRequestUser } from "@/lib/auth";
import { mutateStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await context.params;
  const removed = await mutateStore((data) => {
    const device = data.devices[id];
    if (!device || device.userId !== user.id) return false;
    delete data.devices[id];
    for (const command of Object.values(data.commands)) {
      if (command.deviceId === id && command.status === "pending") command.status = "failed";
    }
    data.audits.unshift({
      id: `aud_${Date.now()}`,
      userId: user.id,
      action: "device.removed",
      detail: { deviceId: id },
      createdAt: new Date().toISOString(),
    });
    return true;
  });
  if (!removed) return NextResponse.json({ error: "Device not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
