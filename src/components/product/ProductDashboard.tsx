import { ExternalLink, MonitorSmartphone, QrCode, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

interface ProductDashboardProps {
  dashboardUrl: string;
}

export function ProductDashboard({ dashboardUrl }: ProductDashboardProps) {
  const t = useTranslations("product.dashboard") as (key: string) => string;
  const steps = [t("step1"), t("step2"), t("step3")];
  const icons = [Zap, QrCode, MonitorSmartphone];

  return (
    <section
      id="dashboard"
      className="py-20 sm:py-24 lg:py-32 bg-muted/30"
      aria-labelledby="dashboard-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
              {t("eyebrow")}
            </p>
            <h2
              id="dashboard-heading"
              className="font-heading text-display-md text-foreground mb-4"
            >
              {t("title")}
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="brand" size="lg" asChild>
                <a
                  href={dashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  {t("open")}
                  <ExternalLink className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-5">
              {t("urlLabel")}:{" "}
              <code className="rounded bg-background px-2 py-1 text-foreground">
                {dashboardUrl}
              </code>
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("stepsTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {steps.map((step, index) => {
                const Icon = icons[index];
                return (
                  <div key={step} className="flex gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-relaxed text-foreground pt-2">
                      {step}
                    </p>
                  </div>
                );
              })}
              <p className="rounded-lg bg-primary/5 border border-primary/20 p-4 text-sm text-muted-foreground">
                {t("note")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
