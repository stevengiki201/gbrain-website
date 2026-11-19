import { NextResponse, type NextRequest } from "next/server";
import { getRequestAdmin } from "@/lib/auth";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const store = getStore();
  const users = Object.values(store.users);
  const devices = Object.values(store.devices);
  const statuses = Object.values(store.serviceStatus);

  return NextResponse.json({
    counts: {
      users: users.length,
      pendingUsers: users.filter((user) => user.role === "user").length,
      confirmedUsers: users.filter((user) => user.role !== "user").length,
      services: Object.keys(store.services).length,
      devices: devices.length,
      hostedDevices: devices.filter((device) => device.hosted).length,
      pendingEnrollments: Object.values(store.enrollments).filter((item) => item.status === "pending").length,
      incidents24h: store.incidents.filter((item) => Date.parse(item.createdAt) > Date.now() - 86_400_000).length,
    },
    serviceHealth: {
      healthy: statuses.filter((item) => item.status === "healthy").length,
      degraded: statuses.filter((item) => item.status === "degraded").length,
      down: statuses.filter((item) => item.status === "down").length,
      unknown: statuses.filter((item) => item.status === "unknown").length,
    },
    recentIncidents: [...store.incidents].reverse().slice(0, 6),
    recentAudits: [...store.audits].reverse().slice(0, 8),
    generatedAt: new Date().toISOString(),
  });
}
