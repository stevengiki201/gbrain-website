import { Star, Github, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

interface ProductHeroProps {
  data: {
    name: string;
    tagline: string;
    description: string;
    icon: string;
    platforms: string[];
    status: string;
    repo?: string;
    playStore?: string;
    apkUrl?: string;
    desktopUrl?: string;
  };
}

export function ProductHero({ data }: ProductHeroProps) {
  const t = useTranslations("product.hero") as (key: string) => string;

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-labelledby="product-title"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-brand-500/5"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl" aria-hidden="true">
              {data.icon}
            </span>
            <div>
              <h1
                id="product-title"
                className="font-heading text-display-lg text-foreground"
              >
                {data.name}
              </h1>
              <p className="text-body-lg text-muted-foreground mt-1">
                {data.tagline}
              </p>
            </div>
          </div>
          <p className="text-body-lg text-foreground mb-8 max-w-2xl">
            {data.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="h-3 w-3" aria-hidden="true" />
              {data.status}
            </span>
            {data.platforms.map((p) => (
              <span
                key={p}
                className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {data.playStore && (
              <Button variant="brand" size="lg" asChild>
                <a
                  href={data.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  {t("getOnPlay")}
                </a>
              </Button>
            )}
            {data.apkUrl && (
              <Button variant="outline" size="lg" asChild>
                <a
                  href={data.apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  {t("downloadApk")}
                </a>
              </Button>
            )}
            {data.repo && (
              <Button variant="ghost" size="lg" asChild>
                <a
                  href={data.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                  {t("viewSource")}
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="mt-16 relative">
          <div className="aspect-video rounded-2xl border bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center overflow-hidden">
            <div className="text-center p-8">
              <span className="text-5xl" aria-hidden="true">
                {data.icon}
              </span>
              <p className="text-foreground font-heading text-xl mt-4">
                {t("previewTitle")}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {t("previewSubtitle")}
              </p>
              <a
                href="#screenshots"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                {t("viewScreenshots")} &darr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
