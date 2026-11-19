import { Download, Github, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface ProductDownloadProps {
  product: string;
  data: {
    playStore?: string;
    apkUrl?: string;
    desktopUrl?: string;
    repo?: string;
    platforms: string[];
    status: string;
  };
}

export function ProductDownload({ product, data }: ProductDownloadProps) {
  const t = useTranslations("product.download") as (key: string) => string;

  const requirements: Record<string, string[]> = {
    media: ["Android 7.0+", "Expo Go (for development)", "Media permissions"],
    sms: [
      "Linux (Ubuntu 20.04+)",
      "Python 3.10+",
      "Android phone with USB debugging",
      "adbsms app installed",
      "Ollama (optional, for AI replies)",
    ],
    phonelink: [
      "Linux (Ubuntu 20.04+)",
      "Node.js 18+",
      "Android 9+",
      "Same Wi-Fi network",
    ],
    neural: [
      "Linux/macOS/Windows (WSL)",
      "Python 3.10+",
      "Node.js 18+",
      "Ollama",
      "Rust toolchain (for Tauri desktop)",
    ],
  };

  const reqs = requirements[product] || [];

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-background"
      aria-labelledby="download-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="download-heading"
            className="font-heading text-display-md text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t("subtitle")}</p>
        </header>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" aria-hidden="true" />
                  {t("downloads.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.playStore && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    asChild
                  >
                    <a
                      href={data.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex-1 text-left">
                        <div className="font-medium">Google Play Store</div>
                        <div className="text-sm text-muted-foreground">
                          Official release, auto-updates
                        </div>
                      </span>
                      <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {data.apkUrl && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    asChild
                  >
                    <a
                      href={data.apkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex-1 text-left">
                        <div className="font-medium">Direct APK Download</div>
                        <div className="text-sm text-muted-foreground">
                          Latest release from GitHub
                        </div>
                      </span>
                      <Download className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {data.desktopUrl && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    asChild
                  >
                    <a
                      href={data.desktopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex-1 text-left">
                        <div className="font-medium">Desktop Installer</div>
                        <div className="text-sm text-muted-foreground">
                          Linux AppImage / Windows installer
                        </div>
                      </span>
                      <Download className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {data.repo && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    asChild
                  >
                    <a
                      href={data.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex-1 text-left">
                        <div className="font-medium">Source Code</div>
                        <div className="text-sm text-muted-foreground">
                          MIT licensed on GitHub
                        </div>
                      </span>
                      <Github className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {!data.playStore &&
                  !data.apkUrl &&
                  !data.desktopUrl &&
                  !data.repo && (
                    <Button
                      variant="brand"
                      className="w-full justify-start gap-3"
                      asChild
                    >
                      <Link href="/contact">
                        <Download className="h-5 w-5" aria-hidden="true" />
                        {t("requestAccess")}
                      </Link>
                    </Button>
                  )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5" aria-hidden="true" />
                  {t("requirements.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {reqs.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <Check
                        className="h-5 w-5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-body text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-primary-foreground">
                    <strong>{t("requirements.note")}</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
