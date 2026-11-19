import {
  Shield,
  Smartphone,
  Globe,
  Code,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Shield,
    titleKey: "features.localFirst.title",
    descKey: "features.localFirst.desc",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Lock,
    titleKey: "features.privacy.title",
    descKey: "features.privacy.desc",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Smartphone,
    titleKey: "features.offline.title",
    descKey: "features.offline.desc",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Layers,
    titleKey: "features.fullStack.title",
    descKey: "features.fullStack.desc",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Globe,
    titleKey: "features.africa.title",
    descKey: "features.africa.desc",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Code,
    titleKey: "features.open.title",
    descKey: "features.open.desc",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

export function WhyGBrain() {
  const t = useTranslations("home.why") as (key: string) => string;

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-background"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t("badge")}
          </span>
          <h2
            id="why-heading"
            className="font-heading text-display-md text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t("subtitle")}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-card-hover transition-shadow"
            >
              <CardContent className="p-6">
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                    feature.bg,
                    feature.color,
                  )}
                >
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  {t(feature.descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
