import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRequestAdmin } from "@/lib/auth";
import { mutateStore } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  role: z.enum(["user", "confirmed", "admin"]),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const admin = getRequestAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const { id } = await context.params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid role." }, { status: 400 });

  const result = await mutateStore((data) => {
    const user = data.users[id];
    if (!user) return { error: "User not found." as const };
    if (user.id === admin.id && parsed.data.role !== "admin") {
      return { error: "You cannot remove your own administrator role." as const };
    }
    if (user.role === "admin" && parsed.data.role !== "admin") {
      const admins = Object.values(data.users).filter((item) => item.role === "admin").length;
      if (admins <= 1) return { error: "At least one administrator must remain." as const };
    }
    const previousRole = user.role;
    user.role = parsed.data.role;
    data.audits.unshift({
      id: `aud_${Date.now()}_${user.id}`,
      userId: admin.id,
      action: "admin.user_role_changed",
      detail: { targetUserId: user.id, email: user.email, previousRole, role: user.role },
      createdAt: new Date().toISOString(),
    });
    return { user: { id: user.id, email: user.email, role: user.role } };
  });

  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}
