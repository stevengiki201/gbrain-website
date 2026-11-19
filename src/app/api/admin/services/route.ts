import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestAdmin } from "@/lib/auth";
import { getStore, mutateStore, newId } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(50).default("General"),
  description: z.string().trim().max(200).default(""),
  healthUrl: z.string().trim().max(300).default(""),
  expectedIntervalSeconds: z.number().int().min(30).max(86_400).default(120),
});

export async function GET(request: NextRequest) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const store = getStore();
  const services = Object.values(store.services)
    .map((service) => ({ ...service, status: store.serviceStatus[service.id] }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid service details." }, { status: 400 });

  const result = await mutateStore((data) => {
    const id = newId("svc");
    const now = new Date().toISOString();
    const service = {
      id,
      name: parsed.data.name,
      category: parsed.data.category,
      description: parsed.data.description,
      healthUrl: parsed.data.healthUrl,
      expectedIntervalSeconds: parsed.data.expectedIntervalSeconds,
      enabled: true,
      createdAt: now,
    };
    data.services[id] = service;
    data.serviceStatus[id] = {
      serviceId: id,
      status: "unknown",
      message: "No health data received yet.",
      latencyMs: null,
      version: "",
      commit: "",
      lastCheckedAt: null,
      lastHeartbeatAt: null,
      metadata: {},
    };
    data.audits.unshift({
      id: newId("aud"),
      userId: admin.id,
      action: "admin.service_created",
      detail: { serviceId: id, name: service.name },
      createdAt: now,
    });
    return service;
  });

  return NextResponse.json({ service: result }, { status: 201 });
}
