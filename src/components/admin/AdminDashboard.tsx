"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type Section = "overview" | "users" | "services" | "devices" | "enrollments" | "audits";
type Role = "user" | "confirmed" | "admin";
type ServiceHealth = "healthy" | "degraded" | "down" | "unknown";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  devices: number;
}

interface ServiceStatus {
  serviceId: string;
  status: ServiceHealth;
  message: string;
  latencyMs: number | null;
  version: string;
  commit: string;
  lastCheckedAt: string | null;
  lastHeartbeatAt: string | null;
  metadata: Record<string, unknown>;
}

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  healthUrl: string;
  expectedIntervalSeconds: number;
  enabled: boolean;
  createdAt: string;
  status?: ServiceStatus;
}

interface DeviceItem {
  id: string;
  name: string;
  userEmail: string;
  hosted: boolean;
  lastSeen: string;
  status: Record<string, unknown>;
  createdAt: string;
}

interface EnrollmentItem {
  id: string;
  status: string;
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
  userEmail: string;
  deviceId: string;
  deviceName: string;
}

interface AuditItem {
  id: string;
  userId: string;
  actorEmail: string;
  action: string;
  detail: Record<string, unknown>;
  createdAt: string;
}

interface IncidentItem {
  id: string;
  serviceId: string;
  status: ServiceHealth;
  message: string;
  createdAt: string;
}

interface Overview {
  counts: Record<string, number>;
  serviceHealth: Record<string, number>;
  recentIncidents: IncidentItem[];
  recentAudits: AuditItem[];
  generatedAt: string;
}

const sections: Array<{ id: Section; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "services", label: "Services" },
  { id: "devices", label: "Devices" },
  { id: "enrollments", label: "Enrollments" },
  { id: "audits", label: "Audit log" },
];

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    cache: "no-store",
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "never";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function statusClass(status: ServiceHealth): string {
  if (status === "healthy") return "bg-green-500/10 text-green-600";
  if (status === "degraded") return "bg-amber-500/10 text-amber-600";
  if (status === "down") return "bg-destructive/10 text-destructive";
  return "bg-muted text-muted-foreground";
}

export function AdminDashboard({ user }: { user: { email: string } }) {
  const [active, setActive] = useState<Section>("overview");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [audits, setAudits] = useState<AuditItem[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [newService, setNewService] = useState({
    name: "",
    category: "General",
    description: "",
    healthUrl: "",
    expectedIntervalSeconds: 120,
  });

  const load = useCallback(async () => {
    try {
      const [overviewData, usersData, servicesData, devicesData, enrollmentsData, auditsData] =
        await Promise.all([
          apiFetch<Overview>("/api/admin/overview"),
          apiFetch<{ users: AdminUser[] }>("/api/admin/users"),
          apiFetch<{ services: ServiceItem[] }>("/api/admin/services"),
          apiFetch<{ devices: DeviceItem[] }>("/api/admin/devices"),
          apiFetch<{ enrollments: EnrollmentItem[] }>("/api/admin/enrollments"),
          apiFetch<{ audits: AuditItem[] }>("/api/admin/audits"),
        ]);
      setOverview(overviewData);
      setUsers(usersData.users);
      setServices(servicesData.services);
      setDevices(devicesData.devices);
      setEnrollments(enrollmentsData.enrollments);
      setAudits(auditsData.audits);
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load admin data.");
    }
  }, []);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 15_000);
    return () => window.clearInterval(timer);
  }, [load]);

  async function runAction(key: string, action: () => Promise<void>, message: string) {
    setBusy(key);
    setNotice("");
    setError("");
    try {
      await action();
      setNotice(message);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Action failed.");
    } finally {
      setBusy("");
    }
  }

  async function updateRole(userId: string, role: Role) {
    await runAction(
      `role:${userId}`,
      async () => {
        await apiFetch(`/api/admin/users/${userId}/role`, {
          method: "POST",
          body: JSON.stringify({ role }),
        });
      },
      "User role updated.",
    );
  }

  async function toggleService(serviceId: string) {
    await runAction(
      `service:${serviceId}`,
      async () => {
        await apiFetch(`/api/admin/services/${serviceId}/toggle`, { method: "POST" });
      },
      "Service monitoring updated.",
    );
  }

  async function checkServices() {
    await runAction(
      "check",
      async () => {
        await apiFetch("/api/admin/services/check", { method: "POST" });
      },
      "Health checks completed.",
    );
  }

  async function addService() {
    await runAction(
      "add-service",
      async () => {
        await apiFetch("/api/admin/services", {
          method: "POST",
          body: JSON.stringify(newService),
        });
        setNewService({
          name: "",
          category: "General",
          description: "",
          healthUrl: "",
          expectedIntervalSeconds: 120,
        });
      },
      "Service added.",
    );
  }

  async function revokeDevice(deviceId: string) {
    await runAction(
      `device:${deviceId}`,
      async () => {
        await apiFetch(`/api/admin/devices/${deviceId}`, { method: "DELETE" });
      },
      "Device revoked.",
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">GBrain Company</p>
          <h1 className="font-heading text-3xl font-bold">Administrator console</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => void load()} disabled={Boolean(busy)}>
            Refresh
          </Button>
          <Button variant="brand" onClick={() => void checkServices()} loading={busy === "check"}>
            Run health checks
          </Button>
        </div>
      </header>

      <nav className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            size="sm"
            variant={active === section.id ? "brand" : "outline"}
            onClick={() => setActive(section.id)}
          >
            {section.label}
          </Button>
        ))}
      </nav>

      {notice && <p className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm">{notice}</p>}
      {error && <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}

      {active === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(overview?.counts || {}).map(([key, value]) => (
              <Card key={key}>
                <CardContent className="p-6">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm capitalize text-muted-foreground">{key.replace(/([A-Z])/g, " $1")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service health</CardTitle>
                <CardDescription>Live status across registered company systems.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(overview?.serviceHealth || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                    <span className="capitalize">{key}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent incidents</CardTitle>
                <CardDescription>Status changes detected by probes and heartbeats.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {overview?.recentIncidents.length ? (
                  overview.recentIncidents.map((incident) => (
                    <div key={incident.id} className="rounded-lg border p-3 text-sm">
                      <p className="font-medium">{incident.serviceId}: {incident.status}</p>
                      <p className="text-muted-foreground">{incident.message}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(incident.createdAt)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No incidents recorded.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {active === "users" && (
        <Card>
          <CardHeader>
            <CardTitle>User access</CardTitle>
            <CardDescription>Confirm accounts or grant administrator access.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {users.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.email}</p>
                  <p className="text-xs text-muted-foreground">{item.devices} device(s) · joined {formatDate(item.createdAt)}</p>
                </div>
                <select
                  aria-label={`Role for ${item.email}`}
                  className="h-10 rounded-xl border bg-background px-3 text-sm"
                  value={item.role}
                  disabled={Boolean(busy)}
                  onChange={(event) => void updateRole(item.id, event.target.value as Role)}
                >
                  <option value="user">Unconfirmed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {active === "services" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Register service</CardTitle>
              <CardDescription>Add a system to the company monitoring console.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Input label="Name" value={newService.name} onChange={(event) => setNewService({ ...newService, name: event.target.value })} />
              <Input label="Category" value={newService.category} onChange={(event) => setNewService({ ...newService, category: event.target.value })} />
              <Input label="Health URL" value={newService.healthUrl} placeholder="https://service.example.com/health" onChange={(event) => setNewService({ ...newService, healthUrl: event.target.value })} />
              <Input label="Interval seconds" type="number" value={String(newService.expectedIntervalSeconds)} onChange={(event) => setNewService({ ...newService, expectedIntervalSeconds: Number(event.target.value) })} />
              <Input label="Description" value={newService.description} onChange={(event) => setNewService({ ...newService, description: event.target.value })} />
              <div className="flex items-end">
                <Button variant="brand" onClick={() => void addService()} loading={busy === "add-service"} disabled={!newService.name.trim()}>
                  Add service
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass(service.status?.status || "unknown")}`}>
                      {service.status?.status || "unknown"}
                    </span>
                  </div>
                  <CardDescription>{service.category} · {service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">{service.status?.message || "No health data received yet."}</p>
                  <p className="text-xs text-muted-foreground">Checked: {formatDate(service.status?.lastCheckedAt)}</p>
                  <p className="text-xs text-muted-foreground">Heartbeat: {formatDate(service.status?.lastHeartbeatAt)}</p>
                  <p className="text-xs text-muted-foreground">Latency: {service.status?.latencyMs ?? "—"} ms</p>
                  <Button
                    size="sm"
                    variant={service.enabled ? "outline" : "brand"}
                    onClick={() => void toggleService(service.id)}
                    loading={busy === `service:${service.id}`}
                  >
                    {service.enabled ? "Disable monitoring" : "Enable monitoring"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {active === "devices" && (
        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>Local and hosted AudioLink devices registered on the website.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {devices.map((device) => (
              <div key={device.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-muted-foreground">{device.userEmail || "no owner"}</p>
                  <p className="text-xs text-muted-foreground">{device.hosted ? "hosted" : "local"} · last seen {formatDate(device.lastSeen)}</p>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => void revokeDevice(device.id)}
                  loading={busy === `device:${device.id}`}
                >
                  Revoke
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {active === "enrollments" && (
        <Card>
          <CardHeader>
            <CardTitle>QR enrollments</CardTitle>
            <CardDescription>One-time hosted AudioLink registration tokens.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="rounded-xl border p-4 text-sm">
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="font-medium">{enrollment.userEmail}</p>
                  <p className="uppercase text-muted-foreground">{enrollment.status}</p>
                </div>
                <p className="text-muted-foreground">{enrollment.deviceName || enrollment.deviceId}</p>
                <p className="text-xs text-muted-foreground">Created {formatDate(enrollment.createdAt)} · expires {formatDate(enrollment.expiresAt)} · used {formatDate(enrollment.usedAt)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {active === "audits" && (
        <Card>
          <CardHeader>
            <CardTitle>Audit log</CardTitle>
            <CardDescription>Administrative and system actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {audits.map((audit) => (
              <div key={audit.id} className="rounded-xl border p-4 text-sm">
                <p className="font-medium">{audit.action}</p>
                <p className="text-muted-foreground">{audit.actorEmail} · {formatDate(audit.createdAt)}</p>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-2 text-xs">{JSON.stringify(audit.detail)}</pre>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
