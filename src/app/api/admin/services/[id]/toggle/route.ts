import { NextResponse, type NextRequest } from "next/server";
import { getRequestAdmin } from "@/lib/auth";
import { mutateStore, newId } from "@/lib/server-store";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const { id } = await context.params;
  const result = await mutateStore((data) => {
    const service = data.services[id];
    if (!service) return { error: "Service not found." as const };
    service.enabled = !service.enabled;
    data.audits.unshift({
      id: newId("aud"),
      userId: admin.id,
      action: "admin.service_monitoring_toggled",
      detail: { serviceId: id, enabled: service.enabled },
      createdAt: new Date().toISOString(),
    });
    return { serviceId: id, enabled: service.enabled };
  });

  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}
