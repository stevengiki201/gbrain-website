import type { SmsCacheRecord, StoreData } from "./server-store";

export interface IncomingSms {
  smsId?: string;
  folder?: string;
  address?: string;
  body?: string;
  dateMs?: number;
  msgType?: number;
  status?: SmsCacheRecord["status"];
}

export function upsertMessages(data: StoreData, userId: string, messages: IncomingSms[]): number {
  const existing = data.messages[userId] ?? [];
  const byId = new Map<string, SmsCacheRecord>(
    existing.map((message) => [message.smsId, message] as const),
  );
  const now = new Date().toISOString();

  for (const message of messages) {
    const address = message.address ?? "";
    const body = message.body ?? "";
    const smsId = message.smsId || `${address}:${message.dateMs ?? 0}:${body.slice(0, 32)}`;
    const previous = byId.get(smsId);
    byId.set(smsId, {
      smsId,
      folder: message.folder ?? "inbox",
      address,
      body,
      dateMs: message.dateMs ?? 0,
      msgType: message.msgType ?? 0,
      status: message.status ?? previous?.status ?? "unknown",
      updatedAt: now,
    });
  }

  data.messages[userId] = [...byId.values()]
    .sort((a, b) => b.dateMs - a.dateMs)
    .slice(0, 1000);
  return messages.length;
}
