import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hasServiceToken } from "@/lib/auth";
import { mutateStore, newId } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  serviceId: z.string().trim().min(1).max(80).default("hosted-cli"),
  status: z.enum(["healthy", "degraded", "down", "unknown"]),
  message: z.string().trim().max(300).default(""),
  latencyMs: z.number().int().min(0).max(600_000).nullable().default(null),
  version: z.string().trim().max(50).default(""),
  commit: z.string().trim().max(80).default(""),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export async function POST(request: NextRequest) {
  if (!hasServiceToken(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid heartbeat." }, { status: 400 });

  const result = await mutateStore((data) => {
    const service = data.services[parsed.data.serviceId];
    if (!service) return { error: "Unknown service." as const };
    const previous = data.serviceStatus[service.id]?.status || "unknown";
    const now = new Date().toISOString();
    data.serviceStatus[service.id] = {
      serviceId: service.id,
      status: parsed.data.status,
      message: parsed.data.message,
      latencyMs: parsed.data.latencyMs,
      version: parsed.data.version,
      commit: parsed.data.commit,
      lastCheckedAt: now,
      lastHeartbeatAt: now,
      metadata: parsed.data.metadata,
    };
    if (previous !== parsed.data.status) {
      data.incidents.unshift({
        id: newId("inc"),
        serviceId: service.id,
        status: parsed.data.status,
        message: parsed.data.message || `Status changed from ${previous} to ${parsed.data.status}`,
        createdAt: now,
      });
    }
    data.audits.unshift({
      id: newId("aud"),
      userId: `service:${service.id}`,
      action: "service.heartbeat",
      detail: { status: parsed.data.status, message: parsed.data.message },
      createdAt: now,
    });
    return { serviceId: service.id, status: parsed.data.status };
  });

  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json(result);
}
