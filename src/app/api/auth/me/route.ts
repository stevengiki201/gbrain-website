import { NextResponse, type NextRequest } from "next/server";
import { getRequestUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  return NextResponse.json({ user: getRequestUser(request) });
}
