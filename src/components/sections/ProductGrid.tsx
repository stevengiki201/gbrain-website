import {
  Monitor,
  MessageSquare,
  Smartphone,
  Brain,
  BookOpen,
  ArrowRight,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link, type StaticPathname } from "@/i18n/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  href: StaticPathname;
  tag: string;
  tagColor: string;
  features: string[];
  platform: string[];
  status: "released" | "beta" | "alpha";
}

const products: Product[] = [
  {
    id: "media",
    name: "GBrain Media Player",
    description:
      "Offline-first music & video player for Android. Scan local media, create playlists, enjoy persistent playback — all without cloud.",
    icon: <Monitor className="h-6 w-6" />,
    href: "/products/media",
    tag: "Released",
    tagColor: "bg-green-500/20 text-green-500",
    features: [
      "Local media scanning",
      "Playlists & favorites",
      "Mini-player",
      "Light/dark themes",
      "Expo Go compatible",
    ],
    platform: ["Android", "Web (limited)"],
    status: "released",
  },
  {
    id: "sms",
    name: "GBrain SMS + AudioLink",
    description:
      "AI-powered SMS assistant with local Ollama brain. Voice calls via acoustic bridge (Whisper + Piper). Works over USB/ADB.",
    icon: <MessageSquare className="h-6 w-6" />,
    href: "/products/sms",
    tag: "Beta",
    tagColor: "bg-yellow-500/20 text-yellow-500",
    features: [
      "Ollama-powered replies",
      "Local memory",
      "Scheduled messages",
      "Voice calls (STT/TTS)",
      "WhatsApp auto-reply",
    ],
    platform: ["Linux", "Android"],
    status: "beta",
  },
  {
    id: "phonelink",
    name: "PhoneLink",
    description:
      "Wireless Android remote management from Linux desktop. Screen mirroring, file transfer, remote control — no USB, no cloud.",
    icon: <Smartphone className="h-6 w-6" />,
    href: "/products/phonelink",
    tag: "Released v1.1",
    tagColor: "bg-green-500/20 text-green-500",
    features: [
      "Screen mirroring (MediaProjection)",
      "Remote tap/swipe/type",
      "File manager",
      "System monitoring",
      "CLI + Web dashboard",
    ],
    platform: ["Linux", "Android"],
    status: "released",
  },
  {
    id: "neural",
    name: "GBrain Neural System",
    description:
      "Modular AI execution platform. MrX coding agent, device automation, browser/desktop control, SMS/PhoneLink/AudioLink integration.",
    icon: <Brain className="h-6 w-6" />,
    href: "/products/neural",
    tag: "Alpha (Phases 1-12)",
    tagColor: "bg-purple-500/20 text-purple-500",
    features: [
      "MrX coding agent",
      "Task planning & execution",
      "Desktop/browser control",
      "Memory & knowledge",
      "Multi-subsystem platform",
    ],
    platform: ["Linux", "Web", "Desktop (Tauri)"],
    status: "alpha",
  },
  {
    id: "shulebomba",
    name: "ShuleBomba",
    description:
      "Offline-first class management for teachers. Track attendance, test scores and reports across multiple classes.",
    icon: <BookOpen className="h-6 w-6" />,
    href: "/products/shulebomba",
    tag: "Released v1.0.3",
    tagColor: "bg-amber-500/20 text-amber-500",
    features: [
      "Multi-class management",
      "Quick roll call",
      "Test scores by subject",
      "PDF, Excel & Word reports",
      "Offline-first",
    ],
    platform: ["Android", "Web (limited)"],
    status: "released",
  },
];

export function ProductGrid() {
  const t = useTranslations("home.products");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {products.map((product) => (
        <article key={product.id} className="group">
          <Link href={product.href} className="block">
            <Card className="h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-12 h-12 rounded-xl",
                      product.id === "media" && "bg-blue-500/10 text-blue-500",
                      product.id === "sms" && "bg-green-500/10 text-green-500",
                      product.id === "phonelink" &&
                        "bg-orange-500/10 text-orange-500",
                      product.id === "neural" &&
                        "bg-purple-500/10 text-purple-500",
                      product.id === "shulebomba" &&
                        "bg-amber-500/10 text-amber-500",
                    )}
                  >
                    {product.icon}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      product.tagColor,
                    )}
                  >
                    {product.tag}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-body-sm text-muted-foreground mb-4 flex-1">
                  {t(`descriptions.${product.id}`)}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.platform.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <span className="flex w-full items-center justify-start gap-2 text-sm font-medium text-primary">
                  {t("viewDetails")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </CardContent>
            </Card>
          </Link>
        </article>
      ))}
    </div>
  );
}
