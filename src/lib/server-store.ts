import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
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
  createdAt: string;
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
  commands: Record<string, CommandRecord>;
  messages: Record<string, SmsCacheRecord[]>;
  audits: AuditRecord[];
}

const dataDir = process.env.GBRAIN_DATA_DIR || path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "gbrain-web.json");
let writeQueue: Promise<unknown> = Promise.resolve();

function emptyStore(): StoreData {
  return { users: {}, devices: {}, commands: {}, messages: {}, audits: [] };
}

function readStore(): StoreData {
  if (!existsSync(storePath)) return emptyStore();
  try {
    const parsed = JSON.parse(readFileSync(storePath, "utf8")) as Partial<StoreData>;
    return { ...emptyStore(), ...parsed };
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
