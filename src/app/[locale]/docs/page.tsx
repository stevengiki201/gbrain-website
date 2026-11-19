import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { docs, productKeys, productNames } from "@/content/docs";
import { isValidLocale } from "@/config/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "docs" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function DocsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });

  return (
    <div className="flex flex-col">
      <section className="py-20 sm:py-28 bg-gradient-to-br from-primary/5 via-background to-brand-500/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-display-lg text-foreground">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {productKeys.map((product) => (
              <Card
                key={product}
                className="hover:shadow-card-hover transition-shadow"
              >
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-heading text-xl">
                    {productNames[product][locale]}
                  </CardTitle>
                  <p className="text-body-sm text-muted-foreground">
                    {docs[product].length} {t("guides").toLowerCase()}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href={{
                        pathname: "/docs/[product]",
                        params: { product },
                      }}
                    >
                      {t("guides")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
