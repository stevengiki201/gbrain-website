import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { attachSession, createSessionToken, hashPassword, publicUser } from "@/lib/auth";
import { roleForEmail } from "@/lib/roles";
import { mutateStore, newId } from "@/lib/server-store";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(200),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid name, email, and password of at least 8 characters." }, { status: 400 });
  }

  const { name, email, password } = parsed.data;
  const result = await mutateStore((data) => {
    const existing = Object.values(data.users).find((user) => user.email === email);
    if (existing) return { error: "An account with that email already exists." as const };
    const user = {
      id: newId("usr"),
      email,
      name,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      role: roleForEmail(email),
    };
    data.users[user.id] = user;
    data.messages[user.id] = [];
    return { user };
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  const response = NextResponse.json({ user: publicUser(result.user) }, { status: 201 });
  attachSession(response, createSessionToken(result.user.id));
  return response;
}
