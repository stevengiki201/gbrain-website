import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { docs, isProductKey, productNames } from "@/content/docs";
import { isValidLocale } from "@/config/i18n";

type Props = { params: Promise<{ locale: string; product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, product } = await params;
  if (!isValidLocale(locale) || !isProductKey(product)) return {};
  const t = await getTranslations({ locale, namespace: "docs" });
  return {
    title: `${productNames[product][locale]} — ${t("title")}`,
    description: t("meta.description"),
  };
}

export default async function DocsProductPage({ params }: Props) {
  const { locale, product } = await params;
  if (!isValidLocale(locale) || !isProductKey(product)) notFound();
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });

  return (
    <div className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/docs">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("backToDocs")}
          </Link>
        </Button>
        <h1 className="font-heading text-display-md text-foreground">
          {productNames[product][locale]}
        </h1>
        <p className="mt-4 text-body-lg text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {docs[product].map((doc) => (
            <Card
              key={doc.slug}
              className="hover:shadow-card-hover transition-shadow"
            >
              <CardHeader>
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="font-heading text-lg">
                  {doc.title[locale]}
                </CardTitle>
                <p className="text-body-sm text-muted-foreground">
                  {doc.description[locale]}
                </p>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={{
                      pathname: "/docs/[product]/[slug]",
                      params: { product, slug: doc.slug },
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
    </div>
  );
}
