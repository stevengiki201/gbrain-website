import {
  ArrowRight,
  Sparkles,
  Shield,
  Smartphone,
  Globe,
  Code,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 lg:py-40"
      aria-labelledby="hero-title"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-brand-500/5"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>{t("badge")}</span>
          </div>
          <h1
            id="hero-title"
            className="font-heading text-display-xl text-foreground mb-6 animate-slide-up"
          >
            {t("headline")}
          </h1>
          <p
            className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            {t("subheadline")}
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              variant="brand"
              size="xl"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/products">
                {t("cta.primary")}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/contact">{t("cta.secondary")}</Link>
            </Button>
          </div>
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" aria-hidden="true" />
              {t("trust.localFirst")}
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="h-4 w-4" aria-hidden="true" />
              {t("trust.offlineReady")}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" aria-hidden="true" />
              {t("trust.africaBuilt")}
            </span>
            <span className="flex items-center gap-1.5">
              <Code className="h-4 w-4" aria-hidden="true" />
              {t("trust.openSource")}
            </span>
          </div>
        </div>
        <div
          className="mt-20 relative animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <div className="relative rounded-2xl border bg-card/50 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b px-4 py-3 bg-muted/50">
              <div className="flex gap-1.5">
                <div
                  className="h-3 w-3 rounded-full bg-red-500"
                  aria-hidden="true"
                />
                <div
                  className="h-3 w-3 rounded-full bg-yellow-500"
                  aria-hidden="true"
                />
                <div
                  className="h-3 w-3 rounded-full bg-green-500"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 text-center text-sm text-muted-foreground font-mono">
                gbrain.tech
              </div>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
                    <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span className="font-mono text-sm text-primary">
                      On-Device AI
                    </span>
                  </div>
                  <p className="text-muted-foreground text-body-sm">
                    {t("demo.caption")}
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 border flex items-center justify-center overflow-hidden">
                    <div className="text-center p-8">
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400 mb-4">
                        <span
                          className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
                          aria-hidden="true"
                        />
                        <span>{t("demo.live")}</span>
                      </div>
                      <p className="text-foreground font-mono text-lg">
                        {t("demo.running")}
                      </p>
                      <p className="text-muted-foreground text-sm mt-2">
                        {t("demo.offline")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500/10 px-4 py-2 mb-4">
                    <Smartphone
                      className="h-5 w-5 text-brand-500"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-sm text-brand-500">
                      Mobile First
                    </span>
                  </div>
                  <p className="text-muted-foreground text-body-sm">
                    {t("demo.caption")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
