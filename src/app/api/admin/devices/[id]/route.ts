import { NextResponse, type NextRequest } from "next/server";
import { getRequestAdmin } from "@/lib/auth";
import { mutateStore, newId } from "@/lib/server-store";

export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const { id } = await context.params;
  const result = await mutateStore((data) => {
    const device = data.devices[id];
    if (!device) return { error: "Device not found." as const };
    const userEmail = data.users[device.userId]?.email || "";
    delete data.devices[id];
    for (const command of Object.values(data.commands)) {
      if (command.deviceId === id && command.status === "pending") command.status = "failed";
    }
    data.audits.unshift({
      id: newId("aud"),
      userId: admin.id,
      action: "admin.device_revoked",
      detail: { deviceId: id, userEmail },
      createdAt: new Date().toISOString(),
    });
    return { ok: true };
  });

  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}
