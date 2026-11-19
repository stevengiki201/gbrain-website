import { NextResponse, type NextRequest } from "next/server";
import { getRequestAdmin } from "@/lib/auth";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const store = getStore();
  const enrollments = Object.values(store.enrollments)
    .map((enrollment) => ({
      id: enrollment.id,
      status: enrollment.status,
      createdAt: enrollment.createdAt,
      expiresAt: enrollment.expiresAt,
      usedAt: enrollment.usedAt,
      userEmail: store.users[enrollment.userId]?.email || "",
      deviceId: enrollment.deviceId,
      deviceName: store.devices[enrollment.deviceId]?.name || "",
    }))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return NextResponse.json({ enrollments });
}
