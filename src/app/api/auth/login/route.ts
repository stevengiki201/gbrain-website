import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { attachSession, createSessionToken, publicUser, verifyPassword } from "@/lib/auth";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  const user = Object.values(getStore().users).find((item) => item.email === parsed.data.email);
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ user: publicUser(user) });
  attachSession(response, createSessionToken(user.id));
  return response;
}
