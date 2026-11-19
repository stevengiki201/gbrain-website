import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { roleForEmail, type UserRole } from "./roles";

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  role: UserRole;
}

export interface DeviceRecord {
  id: string;
  userId: string;
  name: string;
  fingerprint: string;
  tokenHash: string;
  status: Record<string, unknown>;
  lastSeen: string;
  pairingCode: string | null;
  pairingCodeExpiresAt: string | null;
  hosted: boolean;
  createdAt: string;
}

export interface EnrollmentRecord {
  id: string;
  tokenHash: string;
  userId: string;
  deviceId: string;
  status: "pending" | "used" | "revoked";
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
}

export interface CommandRecord {
  id: string;
  userId: string;
  deviceId: string;
  type: string;
  payload: Record<string, unknown>;
  status: "pending" | "dispatched" | "done" | "failed";
  result: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface SmsCacheRecord {
  smsId: string;
  folder: string;
  address: string;
  body: string;
  dateMs: number;
  msgType: number;
  status: "queued" | "dispatched" | "sent" | "failed" | "unknown";
  updatedAt: string;
}

export interface AuditRecord {
  id: string;
  userId: string;
  action: string;
  detail: Record<string, unknown>;
  createdAt: string;
}

export type ServiceHealth = "healthy" | "degraded" | "down" | "unknown";

export interface ServiceRecord {
  id: string;
  name: string;
  category: string;
  description: string;
  healthUrl: string;
  expectedIntervalSeconds: number;
  enabled: boolean;
  createdAt: string;
}

export interface ServiceStatusRecord {
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

export interface IncidentRecord {
  id: string;
  serviceId: string;
  status: ServiceHealth;
  message: string;
  createdAt: string;
}

export interface StoreData {
  users: Record<string, UserRecord>;
  devices: Record<string, DeviceRecord>;
  enrollments: Record<string, EnrollmentRecord>;
  commands: Record<string, CommandRecord>;
  messages: Record<string, SmsCacheRecord[]>;
  audits: AuditRecord[];
  services: Record<string, ServiceRecord>;
  serviceStatus: Record<string, ServiceStatusRecord>;
  incidents: IncidentRecord[];
}

const dataDir = process.env.GBRAIN_DATA_DIR || path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "gbrain-web.json");
let writeQueue: Promise<unknown> = Promise.resolve();

function defaultServices(now: string): ServiceRecord[] {
  return [
    {
      id: "website",
      name: "GBrain Website",
      category: "Core",
      description: "Company website and dashboard APIs",
      healthUrl: "/api/health",
      expectedIntervalSeconds: 60,
      enabled: true,
      createdAt: now,
    },
    {
      id: "gbrain-sms",
      name: "GBrain SMS Bridge",
      category: "Communication",
      description: "Hosted AudioLink signaling and SMS relay",
      healthUrl: process.env.GBRAIN_SMS_BRIDGE_URL || "http://127.0.0.1:8787/v1/health",
      expectedIntervalSeconds: 60,
      enabled: true,
      createdAt: now,
    },
    {
      id: "hosted-cli",
      name: "Hosted CLI Daemon",
      category: "Communication",
      description: "Server-side gbrain-cli command relay",
      healthUrl: "",
      expectedIntervalSeconds: 120,
      enabled: true,
      createdAt: now,
    },
    {
      id: "neural",
      name: "GBrain Neural System",
      category: "Intelligence",
      description: "AI training and inference services",
      healthUrl: process.env.GBRAIN_NEURAL_URL || "",
      expectedIntervalSeconds: 180,
      enabled: true,
      createdAt: now,
    },
    {
      id: "phonelink",
      name: "PhoneLink",
      category: "Devices",
      description: "Desktop-to-phone remote control service",
      healthUrl: process.env.GBRAIN_PHONELINK_URL || "",
      expectedIntervalSeconds: 180,
      enabled: true,
      createdAt: now,
    },
    {
      id: "media-player",
      name: "GBrain Media Player",
      category: "Media",
      description: "Cross-platform media playback client",
      healthUrl: "",
      expectedIntervalSeconds: 300,
      enabled: true,
      createdAt: now,
    },
  ];
}

function emptyServiceStatus(serviceId: string): ServiceStatusRecord {
  return {
    serviceId,
    status: "unknown",
    message: "No health data received yet.",
    latencyMs: null,
    version: "",
    commit: "",
    lastCheckedAt: null,
    lastHeartbeatAt: null,
    metadata: {},
  };
}

function emptyStore(): StoreData {
  const now = new Date().toISOString();
  const services: Record<string, ServiceRecord> = {};
  const serviceStatus: Record<string, ServiceStatusRecord> = {};
  for (const service of defaultServices(now)) {
    services[service.id] = service;
    serviceStatus[service.id] = emptyServiceStatus(service.id);
  }
  return {
    users: {},
    devices: {},
    enrollments: {},
    commands: {},
    messages: {},
    audits: [],
    services,
    serviceStatus,
    incidents: [],
  };
}

function readStore(): StoreData {
  if (!existsSync(storePath)) return emptyStore();
  try {
    const parsed = JSON.parse(readFileSync(storePath, "utf8")) as Partial<StoreData>;
    const base = emptyStore();
    const store: StoreData = {
      ...base,
      ...parsed,
      users: parsed.users ?? {},
      devices: parsed.devices ?? {},
      enrollments: parsed.enrollments ?? {},
      commands: parsed.commands ?? {},
      messages: parsed.messages ?? {},
      audits: parsed.audits ?? [],
      services: parsed.services ?? base.services,
      serviceStatus: parsed.serviceStatus ?? base.serviceStatus,
      incidents: parsed.incidents ?? [],
    };
    for (const user of Object.values(store.users)) {
      const role = roleForEmail(user.email);
      user.role = role === "user" ? user.role || role : role;
    }
    for (const device of Object.values(store.devices)) {
      device.hosted = Boolean(device.hosted);
    }
    for (const service of defaultServices(new Date().toISOString())) {
      if (!store.services[service.id]) store.services[service.id] = service;
      if (!store.serviceStatus[service.id]) {
        store.serviceStatus[service.id] = emptyServiceStatus(service.id);
      }
    }
    return store;
  } catch {
    return emptyStore();
  }
}

function writeStore(data: StoreData): void {
  mkdirSync(dataDir, { recursive: true });
  const temporary = `${storePath}.${process.pid}.tmp`;
  writeFileSync(temporary, JSON.stringify(data, null, 2), "utf8");
  renameSync(temporary, storePath);
}

export function getStore(): StoreData {
  return readStore();
}

export async function mutateStore<T>(mutator: (data: StoreData) => T | Promise<T>): Promise<T> {
  const operation = writeQueue.then(async () => {
    const data = readStore();
    const result = await mutator(data);
    writeStore(data);
    return result;
  });
  writeQueue = operation.catch(() => undefined);
  return operation;
}

export function newId(prefix: string): string {
  return `${prefix}_${randomUUID().replace(/-/g, "")}`;
}
