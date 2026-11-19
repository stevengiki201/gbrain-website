import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(5000),
  locale: z.enum(["en", "sw"]).default("en"),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, locale } = contactSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "hello@gbrain.tech";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "GBrain Contact <contact@gbrain.tech>";

    if (!apiKey) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            success: false,
            message:
              "Email delivery is not configured. Please email hello@gbrain.tech directly.",
          },
          { status: 503 },
        );
      }
      console.warn("Resend not configured, simulating contact form submission");
      return NextResponse.json({
        success: true,
        message: "Message sent (development mode)",
        demo: true,
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `[GBrain Contact] ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Locale:</strong> ${escapeHtml(locale)}</p>
          <hr />
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        `,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Resend error: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.issues[0]?.message ?? "Invalid form data",
        },
        { status: 400 },
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
