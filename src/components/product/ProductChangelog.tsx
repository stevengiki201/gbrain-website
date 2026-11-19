import { Github, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

interface ProductChangelogProps {
  product: string;
}

const changelogData: Record<
  string,
  Array<{
    version: string;
    date: string;
    changes: string[];
    breaking?: boolean;
  }>
> = {
  media: [
    {
      version: "1.0.0",
      date: "2026-11-15",
      changes: [
        "Initial release",
        "Device media scanning with expo-media-library",
        "SQLite-backed library with songs, videos, artists, albums",
        "Persistent mini-player + full-screen music player",
        "Video playback with expo-video",
        "Playlists (create, rename, reorder, add/remove, delete)",
        "Favorites, history, search, settings",
        "Light/dark/system themes",
        "Expo Go compatible (no config plugins)",
        "Web support with localStorage fallback",
      ],
    },
  ],
  sms: [
    {
      version: "0.9.0",
      date: "2026-11-14",
      changes: [
        "Voice bridge: Whisper STT + Piper TTS",
        "Acoustic call handling (speakerphone bridge)",
        "Echo cancellation & VAD improvements",
        "Swahili voice support (sw_CD)",
        "WhatsApp auto-reply via notifications",
        "Natural language scheduling ('reply at 7pm')",
        "Delivery verification in adbsms sent folder",
        "Rotating logs, auto-reconnect, deduplication",
      ],
    },
  ],
  phonelink: [
    {
      version: "1.1.0",
      date: "2026-11-16",
      changes: [
        "Screen mirroring with MediaProjection",
        "Foreground service for background capture",
        "Remote control: tap, swipe, scroll, keys, typing",
        "File manager: browse, upload, download, rename, delete",
        "System monitoring: battery, storage, memory, display, network",
        "Lock/wake, ring, clipboard, toast, open URL, location",
        "CLI (phonelink) + Web dashboard on :7842",
        "Release APK: PhoneLink-v1.1.0-screen.apk (98 MB)",
      ],
    },
  ],
  neural: [
    {
      version: "0.1.0",
      date: "2026-11-16",
      changes: [
        "Phases 1-12 complete",
        "FastAPI backend + React/Vite dashboard",
        "Ollama provider with capability detection",
        "Neural Core + Context Engine",
        "Reasoning Engine + Action Engine",
        "Agents, Skills, Tools with permissions",
        "Memory + Knowledge (lexical retrieval)",
        "Device Engine (pairing, telemetry, PC control)",
        "Automations + Integrations (GitHub, browser)",
        "Security Engine (auth, approvals, audit)",
        "Desktop Engine (Agent Desktop) + Browser Engine (CDP)",
        "MrX coding agent (mrx subsystem)",
        "Communication Engine (inbox/desktop/webhook)",
        "Learning Engine (deterministic reviews)",
        "GBrain SMS subsystem (simulated inbound)",
        "PhoneLink subsystem (ADB device ops)",
        "AudioLink subsystem (loopback client)",
      ],
    },
  ],
};

export function ProductChangelog({ product }: ProductChangelogProps) {
  const t = useTranslations("product.changelog") as (key: string) => string;
  const releases = changelogData[product] || [];

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-muted/30"
      aria-labelledby="changelog-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2
              id="changelog-heading"
              className="font-heading text-display-md text-foreground mb-2"
            >
              {t("title")}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <Button variant="ghost" asChild>
            <a
              href={`https://github.com/gbrain-tech/${product === "media" ? "gbrain-media" : product === "sms" ? "gbrain-sms" : product === "phonelink" ? "phonelink" : "gbrain-neural"}/releases`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("viewOnGitHub")}
            </a>
          </Button>
        </header>
        <div className="space-y-6">
          {releases.map((release, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Tag className="h-6 w-6 text-primary" aria-hidden="true" />
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      v{release.version}
                      {release.breaking && (
                        <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive">
                          Breaking
                        </span>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {release.date}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {release.changes.map((change, changeIndex) => (
                    <li
                      key={changeIndex}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
