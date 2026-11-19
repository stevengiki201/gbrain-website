import { NextResponse, type NextRequest } from "next/server";
import { getRequestUser } from "@/lib/auth";
import { publicCommand } from "@/lib/commands";
import { getStore } from "@/lib/server-store";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await context.params;
  const command = getStore().commands[id];
  if (!command || command.userId !== user.id) {
    return NextResponse.json({ error: "Command not found." }, { status: 404 });
  }
  return NextResponse.json({ command: publicCommand(command) });
}
