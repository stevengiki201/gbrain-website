"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

interface ProductFAQProps {
  product: string;
}

const faqData: Record<string, Array<{ question: string; answer: string }>> = {
  media: [
    {
      question: "Does it work on iOS?",
      answer:
        "The Expo Go version works on iOS, but device media scanning is Android-only. iOS build requires Apple Developer account and custom native modules for media library access.",
    },
    {
      question: "Can it play streaming music?",
      answer:
        "No, this is an offline-first local media player. It plays files stored on your device only. No streaming services, no cloud sync.",
    },
    {
      question: "Why no background audio in Expo Go?",
      answer:
        "Expo Go doesn't support foreground services or background audio. For background playback, you need a development build with native configuration.",
    },
    {
      question: "How do I backup my library?",
      answer:
        "The SQLite database is in the app's sandbox. On Android, you can use adb backup or copy the database file from the app's data directory (requires root or adb).",
    },
  ],
  sms: [
    {
      question: "Why do I need adbsms?",
      answer:
        "Modern Android (10+) blocks direct access to content://sms from ADB shell. adbsms is a companion app that exposes SMS via content://adbsms with proper permissions.",
    },
    {
      question: "Does it work without Ollama?",
      answer:
        "Yes, it falls back to rule-based replies automatically when Ollama is not running. You get basic responses without any LLM.",
    },
    {
      question: "Can it send MMS or group messages?",
      answer:
        "Currently SMS only. MMS and group messaging via ADB are unreliable and not implemented.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes. All data (messages, memory, config) stays on your Linux machine. Ollama runs locally. Nothing leaves your network unless you configure webhooks.",
    },
  ],
  phonelink: [
    {
      question: "Does it work over the internet?",
      answer:
        "No, it's a trusted-LAN tool only. For remote access, use a VPN (Tailscale, WireGuard) to connect to your home network.",
    },
    {
      question: "Why no pairing code?",
      answer:
        "This is an early release. Pairing codes, device authentication, and TLS are on the roadmap. Currently any client on the LAN can connect.",
    },
    {
      question: "Does it work on macOS/Windows?",
      answer:
        "The desktop relay is Node.js and works anywhere Node runs. The Android app is Android-only. Web dashboard works in any browser.",
    },
    {
      question: "Can I control multiple phones?",
      answer:
        "Currently only one phone at a time. Multi-device support is planned.",
    },
  ],
  neural: [
    {
      question: "What is MrX?",
      answer:
        "MrX (mrx) is a local coding agent. Describe what to build, it asks clarifying questions, then writes files, installs dependencies, runs builds and tests in your project directory.",
    },
    {
      question: "Does it need internet?",
      answer:
        "The platform runs fully offline with a local Ollama model. Only GitHub integrations and browser automation (if used) need internet.",
    },
    {
      question: "Can I use a different LLM than Ollama?",
      answer:
        "Yes, the platform uses a provider-neutral AIProvider interface. Implementing a new provider (OpenAI, Anthropic, custom) is just implementing one interface.",
    },
    {
      question: "Is the Tauri desktop app ready?",
      answer:
        "The Tauri config is scaffolded but not compiled (needs Rust toolchain). The web dashboard at localhost:5173 is the primary interface.",
    },
  ],
  shulebomba: [
    {
      question: "Who is ShuleBomba for?",
      answer:
        "It is built for primary and secondary school teachers who need to manage several classes, daily attendance and test scores without paperwork.",
    },
    {
      question: "Does ShuleBomba work offline?",
      answer:
        "Yes. Daily tasks such as adding learners, taking roll call, recording marks and reviewing saved records work without internet. You need a connection to install or update the app and for upload, viewing or sync workflows.",
    },
    {
      question: "Can I edit attendance after saving it?",
      answer:
        "Saved roll calls are locked in the app. Check each learner's status carefully before you tap Save Attendance.",
    },
    {
      question: "Can one teacher manage more than one class?",
      answer:
        "Yes. Each class keeps its own learners, subjects, tests and attendance records, and you can switch between them from Home.",
    },
    {
      question: "Where do I download it?",
      answer:
        "Get the official Android release on Google Play at https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en.",
    },
  ],
};

export function ProductFAQ({ product }: ProductFAQProps) {
  const t = useTranslations("product.faq") as (key: string) => string;
  const faqs = faqData[product] || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-background"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2
            id="faq-heading"
            className="font-heading text-display-md text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t("subtitle")}</p>
        </header>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp
                    className="h-5 w-5 text-muted-foreground shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5 text-muted-foreground shrink-0"
                    aria-hidden="true"
                  />
                )}
              </button>
              {openIndex === index && (
                <CardContent className="px-6 pb-6 pt-0">
                  <p className="text-body text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
