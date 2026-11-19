import type { DeviceRecord } from "./server-store";

export function publicDevice(device: DeviceRecord) {
  const expiresAt = device.pairingCodeExpiresAt ? Date.parse(device.pairingCodeExpiresAt) : 0;
  const pairingCode = device.pairingCode && Number.isFinite(expiresAt) && expiresAt > Date.now()
    ? device.pairingCode
    : null;

  return {
    id: device.id,
    name: device.name,
    fingerprint: device.fingerprint,
    status: device.status,
    lastSeen: device.lastSeen,
    pairingCode,
    pairingCodeExpiresAt: pairingCode ? device.pairingCodeExpiresAt : null,
    createdAt: device.createdAt,
  };
}
