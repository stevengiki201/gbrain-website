import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { isAdminRole, isConfirmedRole } from "./roles";
import { getStore, type DeviceRecord, type UserRecord } from "./server-store";

const SESSION_COOKIE = "gbrain_session";
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSessionSecret(): string {
  const configured = process.env.SESSION_SECRET;
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set in production.");
  }
  return "dev-only-change-this-secret";
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: UserRecord["role"];
}

interface SessionPayload {
  userId: string;
  expiresAt: number;
}

function hmac(value: string): string {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, expected] = stored.split(":");
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, "hex");
  if (actual.length !== expectedBuffer.length) return false;
  return timingSafeEqual(actual, expectedBuffer);
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createSessionToken(userId: string): string {
  const payload: SessionPayload = {
    userId,
    expiresAt: Date.now() + SESSION_AGE_SECONDS * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${hmac(encoded)}`;
}

function decodeSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = hmac(encoded);
  if (signature.length !== expected.length) return null;
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.userId || payload.expiresAt < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function publicUser(user: UserRecord): PublicUser {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export function isConfirmedUser(user: PublicUser | UserRecord | null): boolean {
  return Boolean(user && isConfirmedRole(user.role));
}

export function isAdminUser(user: PublicUser | UserRecord | null): boolean {
  return Boolean(user && isAdminRole(user.role));
}

export function hasCronSecret(request: NextRequest): boolean {
  const configured = process.env.CRON_SECRET;
  const supplied = request.headers.get("x-cron-secret");
  if (!configured || !supplied) return false;
  const expected = Buffer.from(configured);
  const actual = Buffer.from(supplied);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function hasServiceToken(request: NextRequest): boolean {
  const configured = process.env.GBRAIN_SERVICE_TOKEN;
  const supplied = request.headers.get("x-service-token");
  if (!configured || !supplied) return false;
  const expected = Buffer.from(configured);
  const actual = Buffer.from(supplied);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function serviceTokenConfigured(): boolean {
  return Boolean(process.env.GBRAIN_SERVICE_TOKEN);
}

function userFromToken(token: string | undefined): UserRecord | null {
  const payload = decodeSessionToken(token);
  if (!payload) return null;
  return getStore().users[payload.userId] ?? null;
}

export async function getSessionUser(): Promise<PublicUser | null> {
  const cookieStore = await cookies();
  const user = userFromToken(cookieStore.get(SESSION_COOKIE)?.value);
  return user ? publicUser(user) : null;
}

export function getRequestUser(request: NextRequest): PublicUser | null {
  const user = userFromToken(request.cookies.get(SESSION_COOKIE)?.value);
  return user ? publicUser(user) : null;
}

export function getRequestUserRecord(request: NextRequest): UserRecord | null {
  return userFromToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export function getRequestAdmin(request: NextRequest): UserRecord | null {
  const user = getRequestUserRecord(request);
  return isAdminUser(user) ? user : null;
}

export function getRequestDevice(request: NextRequest): DeviceRecord | null {
  const token = request.headers.get("x-device-token");
  if (!token) return null;
  const tokenHash = hashToken(token);
  return Object.values(getStore().devices).find((device) => device.tokenHash === tokenHash) ?? null;
}

export function attachSession(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_AGE_SECONDS,
  });
}

export function clearSession(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
