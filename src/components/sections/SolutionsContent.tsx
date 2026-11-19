import { Check, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Link, type StaticPathname } from "@/i18n/navigation";

const solutions: Array<{ key: string; href: StaticPathname }> = [
  { key: "personal", href: "/products/media" },
  { key: "business", href: "/contact" },
  { key: "developer", href: "/products/neural" },
  { key: "education", href: "/contact" },
  { key: "automation", href: "/products/neural" },
  { key: "media", href: "/products/media" },
];

export function SolutionsContent() {
  const t = useTranslations("solutions");

  return (
    <div className="flex flex-col">
      <section
        className="py-20 sm:py-28 lg:py-36 bg-gradient-to-br from-primary/5 via-background to-brand-500/5"
        aria-labelledby="solutions-hero-title"
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1
            id="solutions-hero-title"
            className="font-heading text-display-lg text-foreground"
          >
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-body-lg text-muted-foreground">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32" aria-label={t("hero.title")}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {solutions.map(({ key, href }) => {
            const features = t.raw(`${key}.features`) as string[];
            return (
              <Card
                key={key}
                className="flex h-full flex-col hover:shadow-card-hover transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="font-heading text-xl">
                    {t(`${key}.title`)}
                  </CardTitle>
                  <p className="text-body-sm text-muted-foreground">
                    {t(`${key}.desc`)}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="space-y-2">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-body-sm text-foreground"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="mt-auto pt-6"
                  >
                    <Link href={href}>
                      {t(`${key}.cta`)}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        className="py-20 bg-muted/30"
        aria-labelledby="custom-solution-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="custom-solution-heading"
            className="font-heading text-display-md text-foreground"
          >
            {t("custom.title")}
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            {t("custom.subtitle")}
          </p>
          <Button variant="brand" size="lg" asChild className="mt-8">
            <Link href="/contact">{t("custom.cta")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
