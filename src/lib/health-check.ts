import { getStore, mutateStore, newId, type ServiceHealth } from "./server-store";

async function probe(url: string): Promise<{ status: ServiceHealth; message: string; latencyMs: number }> {
  const started = Date.now();
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    const latencyMs = Date.now() - started;
    return {
      status: !response.ok ? "down" : latencyMs > 2_000 ? "degraded" : "healthy",
      message: `HTTP ${response.status} in ${latencyMs}ms`,
      latencyMs,
    };
  } catch (error) {
    return {
      status: "down",
      message: error instanceof Error ? error.message : "Health probe failed",
      latencyMs: Date.now() - started,
    };
  }
}

export async function runHealthChecks() {
  const baseUrl = process.env.GBRAIN_INTERNAL_BASE_URL || "http://127.0.0.1:3100";
  const targets = Object.values(getStore().services).filter(
    (service) => service.enabled && service.healthUrl.trim(),
  );

  const results: Array<{ serviceId: string; status: ServiceHealth; message: string; latencyMs: number }> = [];
  for (const service of targets) {
    const url = service.healthUrl.startsWith("http")
      ? service.healthUrl
      : new URL(service.healthUrl, baseUrl).toString();
    results.push({ serviceId: service.id, ...(await probe(url)) });
  }

  await mutateStore((data) => {
    const now = new Date().toISOString();
    for (const result of results) {
      const service = data.services[result.serviceId];
      if (!service) continue;
      const previous = data.serviceStatus[service.id]?.status || "unknown";
      const existing = data.serviceStatus[service.id];
      data.serviceStatus[service.id] = {
        serviceId: service.id,
        status: result.status,
        message: result.message,
        latencyMs: result.latencyMs,
        version: existing?.version || "",
        commit: existing?.commit || "",
        lastCheckedAt: now,
        lastHeartbeatAt: existing?.lastHeartbeatAt || null,
        metadata: { healthUrl: service.healthUrl },
      };
      if (previous !== result.status) {
        data.incidents.unshift({
          id: newId("inc"),
          serviceId: service.id,
          status: result.status,
          message: result.message,
          createdAt: now,
        });
      }
    }
    data.audits.unshift({
      id: newId("aud"),
      userId: "system:health-check",
      action: "system.health_check",
      detail: { checked: results.length },
      createdAt: now,
    });
  });

  return { results, checkedAt: new Date().toISOString() };
}
