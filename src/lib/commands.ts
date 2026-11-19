import { newId, type CommandRecord, type StoreData } from "./server-store";

export const COMMAND_TYPES = [
  "sms.send",
  "sms.history",
  "bridge.status",
  "pairing.code",
  "tasks.list",
  "ai.chat",
] as const;

export type CommandType = (typeof COMMAND_TYPES)[number];

export function isCommandType(value: string): value is CommandType {
  return (COMMAND_TYPES as readonly string[]).includes(value);
}

export function enqueueCommand(
  data: StoreData,
  userId: string,
  deviceId: string,
  type: CommandType,
  payload: Record<string, unknown>,
): CommandRecord {
  const now = new Date().toISOString();
  const command: CommandRecord = {
    id: newId("cmd"),
    userId,
    deviceId,
    type,
    payload,
    status: "pending",
    result: null,
    createdAt: now,
    updatedAt: now,
  };
  data.commands[command.id] = command;
  return command;
}

export function publicCommand(command: CommandRecord) {
  return {
    id: command.id,
    deviceId: command.deviceId,
    type: command.type,
    payload: command.payload,
    status: command.status,
    result: command.result,
    createdAt: command.createdAt,
    updatedAt: command.updatedAt,
  };
}
