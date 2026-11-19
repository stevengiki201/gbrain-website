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

export interface StoreData {
  users: Record<string, UserRecord>;
  devices: Record<string, DeviceRecord>;
  enrollments: Record<string, EnrollmentRecord>;
  commands: Record<string, CommandRecord>;
  messages: Record<string, SmsCacheRecord[]>;
  audits: AuditRecord[];
}

const dataDir = process.env.GBRAIN_DATA_DIR || path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "gbrain-web.json");
let writeQueue: Promise<unknown> = Promise.resolve();

function emptyStore(): StoreData {
  return { users: {}, devices: {}, enrollments: {}, commands: {}, messages: {}, audits: [] };
}

function readStore(): StoreData {
  if (!existsSync(storePath)) return emptyStore();
  try {
    const parsed = JSON.parse(readFileSync(storePath, "utf8")) as Partial<StoreData>;
    const store = { ...emptyStore(), ...parsed };
    for (const user of Object.values(store.users)) {
      user.role = user.role || roleForEmail(user.email);
    }
    for (const device of Object.values(store.devices)) {
      device.hosted = Boolean(device.hosted);
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
