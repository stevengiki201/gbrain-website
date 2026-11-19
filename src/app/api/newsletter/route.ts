import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email().max(254),
  locale: z.enum(["en", "sw"]).default("en"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale } = subscribeSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            success: false,
            message:
              locale === "sw"
                ? "Usajili wa barua pepe haujasanidiwa."
                : "Newsletter signup is not configured.",
          },
          { status: 503 },
        );
      }
      console.warn("Resend not configured, simulating subscription");
      return NextResponse.json({
        success: true,
        message: "Subscribed (development mode)",
        demo: true,
      });
    }

    const response = await fetch("https://api.resend.com/audiences/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        audienceId,
        unsubscribed: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      if (error.message?.includes("already exists")) {
        return NextResponse.json(
          {
            success: false,
            message:
              locale === "sw"
                ? "Barua pepe tayari ipo kwenye orodha"
                : "Email already subscribed",
          },
          { status: 400 },
        );
      }
      throw new Error(`Resend error: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.issues[0]?.message ?? "Invalid email address",
        },
        { status: 400 },
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
