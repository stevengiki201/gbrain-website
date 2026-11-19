import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

interface ProductScreenshotsProps {
  product: string;
}

const screenshotsData: Record<
  string,
  Array<{ src: string; alt: string; caption: string }>
> = {
  media: [
    {
      src: "/products/media/home.png",
      alt: "Home dashboard with recently added",
      caption: "Home dashboard",
    },
    {
      src: "/products/media/music.png",
      alt: "Music library with mini-player",
      caption: "Music library",
    },
    {
      src: "/products/media/player.png",
      alt: "Full-screen music player",
      caption: "Full-screen player",
    },
    {
      src: "/products/media/playlists.png",
      alt: "Playlist management",
      caption: "Playlists",
    },
    {
      src: "/products/media/video.png",
      alt: "Video player",
      caption: "Video playback",
    },
    {
      src: "/products/media/settings.png",
      alt: "Settings with themes",
      caption: "Settings & themes",
    },
  ],
  sms: [
    {
      src: "/products/sms/dashboard.png",
      alt: "SMS bot dashboard",
      caption: "Bot dashboard",
    },
    {
      src: "/products/sms/conversation.png",
      alt: "Conversation view",
      caption: "Conversation",
    },
    {
      src: "/products/sms/voice.png",
      alt: "Voice call interface",
      caption: "Voice bridge",
    },
    {
      src: "/products/sms/settings.png",
      alt: "Configuration",
      caption: "Settings",
    },
  ],
  phonelink: [
    {
      src: "/products/phonelink/dashboard.png",
      alt: "Web dashboard",
      caption: "Web dashboard",
    },
    {
      src: "/products/phonelink/screen.png",
      alt: "Screen mirroring",
      caption: "Screen mirroring",
    },
    {
      src: "/products/phonelink/files.png",
      alt: "File manager",
      caption: "File manager",
    },
    {
      src: "/products/phonelink/cli.png",
      alt: "CLI interface",
      caption: "CLI (phonelink)",
    },
  ],
  neural: [
    {
      src: "/products/neural/dashboard.png",
      alt: "Neural dashboard",
      caption: "Main dashboard",
    },
    {
      src: "/products/neural/mrx.png",
      alt: "MrX coding agent",
      caption: "MrX agent",
    },
    {
      src: "/products/neural/desktop.png",
      alt: "Desktop control",
      caption: "Desktop control",
    },
    {
      src: "/products/neural/browser.png",
      alt: "Browser control",
      caption: "Browser control",
    },
    {
      src: "/products/neural/tasks.png",
      alt: "Task execution",
      caption: "Task engine",
    },
  ],
};

export function ProductScreenshots({ product }: ProductScreenshotsProps) {
  const t = useTranslations("product.screenshots") as (key: string) => string;
  const screenshots = screenshotsData[product] || [];

  if (screenshots.length === 0) return null;

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-muted/30"
      aria-labelledby="screenshots-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="screenshots-heading"
            className="font-heading text-display-md text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t("subtitle")}</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((screenshot, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <p className="font-medium text-foreground">
                  {screenshot.caption}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          {t("placeholderNote")}
        </p>
      </div>
    </section>
  );
}
