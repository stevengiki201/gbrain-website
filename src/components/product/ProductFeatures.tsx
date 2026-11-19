import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProductFeaturesProps {
  product: string;
}

const featuresData: Record<
  string,
  Array<{ title: string; description: string; items: string[] }>
> = {
  media: [
    {
      title: "Media Library",
      description: "Automatic scanning and organization",
      items: [
        "Device media scan via expo-media-library",
        "SQLite-backed metadata cache",
        "Songs, videos, artists, albums, genres",
        "Recently added & recently played",
      ],
    },
    {
      title: "Playback",
      description: "Robust audio and video engines",
      items: [
        "expo-audio for music (background-ready with dev build)",
        "expo-video for video with custom full-screen player",
        "Mutual exclusivity: audio pauses video and vice versa",
        "Shuffle, repeat (off/all/one), seek, next/previous",
      ],
    },
    {
      title: "Playlists & Favorites",
      description: "Full playlist management",
      items: [
        "Create, rename, reorder, delete playlists",
        "Add/remove songs with drag-to-reorder",
        "Favorites (heart) with quick access",
        "Playback history with timestamps",
      ],
    },
    {
      title: "Experience",
      description: "Polished, accessible, themeable",
      items: [
        "Persistent mini-player above tab bar",
        "Full-screen music player with queue",
        "Light/dark/system themes with custom palettes",
        "Search across songs and videos",
        "Storage info & manual rescan",
      ],
    },
  ],
  sms: [
    {
      title: "AI Replies",
      description: "Local LLM powered responses",
      items: [
        "Ollama integration (llama3.2, qwen, etc.)",
        "Rule-based fallback when offline",
        "Casual, human-like tone",
        "Conversation memory with SQLite",
      ],
    },
    {
      title: "SMS Management",
      description: "Full send/receive via ADB",
      items: [
        "Reads via adbsms (content://adbsms/inbox)",
        "Sends via intent/compose/isms strategies",
        "Delivery verification in sent folder",
        "Deduplication by SMS _id",
      ],
    },
    {
      title: "Scheduling & Automation",
      description: "Smart timing features",
      items: [
        "Natural language: 'reply at 7pm'",
        "Explicit scheduling with DND windows",
        "Reply cooldown per contact",
        "Auto-reconnect on USB disconnect",
      ],
    },
    {
      title: "Voice Bridge",
      description: "Acoustic call handling",
      items: [
        "Whisper STT (faster-whisper)",
        "Piper TTS (natural Swahili voices)",
        "Echo cancellation & VAD",
        "Half-duplex: capture pauses during playback",
      ],
    },
  ],
  phonelink: [
    {
      title: "Screen Mirroring",
      description: "Real-time display streaming",
      items: [
        "MediaProjection capture (foreground service)",
        "JPEG over dedicated WebSocket",
        "Configurable resolution, FPS, quality",
        "Runs in background, survives screen off",
      ],
    },
    {
      title: "Remote Control",
      description: "Full input simulation",
      items: [
        "Tap, swipe, scroll via AccessibilityService",
        "Back/Home/Recents/Notifications keys",
        "Text input via ACTION_SET_TEXT",
        "Works in most text fields",
      ],
    },
    {
      title: "File Management",
      description: "Complete filesystem access",
      items: [
        "Browse, upload, download, rename, delete",
        "Folder creation, image/text preview",
        "All-files access (MANAGE_EXTERNAL_STORAGE)",
        "Clipboard sync",
      ],
    },
    {
      title: "Device Tools",
      description: "System monitoring & control",
      items: [
        "Lock/wake, ring, toast, open URL",
        "Battery, storage, memory, display, network info",
        "Location via OpenStreetMap",
        "CLI (phonelink) + Web dashboard",
      ],
    },
  ],
  neural: [
    {
      title: "MrX Coding Agent",
      description: "Autonomous development assistant",
      items: [
        "Describe objective → clarifying questions → build",
        "Scoped file read/write/list operations",
        "Runs installs, builds, tests in project dir",
        "Evidence-checked completion",
      ],
    },
    {
      title: "Task Planning & Execution",
      description: "Reasoning + Action engines",
      items: [
        "Structured plans from untrusted model output",
        "Approval gates for consequential steps",
        "Background execution with verification",
        "Cancellation & replanning support",
      ],
    },
    {
      title: "Desktop & Browser Control",
      description: "Observation & interaction",
      items: [
        "Agent Desktop (Linux): snapshot, find, act",
        "Chrome DevTools Protocol: tabs, snapshots, interact",
        "Approval-gated, verified actions",
        "Session-scoped, recovery support",
      ],
    },
    {
      title: "Integrated Subsystems",
      description: "Unified platform",
      items: [
        "GBrain SMS: simulated inbound → app sends via ADB",
        "PhoneLink: ADB device ops (wake, alarm, location)",
        "AudioLink: loopback client for PC↔phone audio",
        "Memory, Knowledge, Communications, Learning engines",
      ],
    },
  ],
};

export function ProductFeatures({ product }: ProductFeaturesProps) {
  const t = useTranslations("product.features") as (key: string) => string;
  const features = featuresData[product] || [];

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-background"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="features-heading"
            className="font-heading text-display-md text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t("subtitle")}</p>
        </header>
        <div className="space-y-12">
          {features.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="md:col-span-1 lg:col-span-1">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {group.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {group.description}
                </p>
              </div>
              <ul className="md:col-span-3 lg:col-span-3 space-y-3">
                {group.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/50"
                  >
                    <Check
                      className="h-5 w-5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-body text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
