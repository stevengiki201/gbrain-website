import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import {
  findDoc,
  isProductKey,
  productNames,
  productPaths,
} from "@/content/docs";
import { isValidLocale } from "@/config/i18n";

type Props = {
  params: Promise<{ locale: string; product: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, product, slug } = await params;
  if (!isValidLocale(locale) || !isProductKey(product)) return {};
  const doc = findDoc(product, slug);
  if (!doc) return {};
  return {
    title: `${doc.title[locale]} — ${productNames[product][locale]}`,
    description: doc.description[locale],
  };
}

export default async function DocsArticlePage({ params }: Props) {
  const { locale, product, slug } = await params;
  if (!isValidLocale(locale) || !isProductKey(product)) notFound();
  const doc = findDoc(product, slug);
  if (!doc) notFound();
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });

  return (
    <div className="py-16 sm:py-24">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={{ pathname: "/docs/[product]", params: { product } }}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {productNames[product][locale]}
          </Link>
        </Button>

        <header>
          <p className="text-sm font-medium text-primary">
            {productNames[product][locale]}
          </p>
          <h1 className="mt-3 font-heading text-display-md text-foreground">
            {doc.title[locale]}
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground">
            {doc.description[locale]}
          </p>
        </header>

        <div className="prose prose-invert mt-12">
          <h2 id="overview">{t("overview")}</h2>
          <ul>
            {doc.topics[locale].map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          {doc.commands && (
            <>
              <h2 id="commands">{t("commands")}</h2>
              <pre className="overflow-x-auto rounded-xl border bg-muted p-4 font-mono text-sm">
                {doc.commands[locale].join("\n")}
              </pre>
            </>
          )}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t pt-8">
          <Button variant="outline" asChild>
            <Link href={productPaths[product]}>{t("relatedProduct")}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/docs">{t("backToDocs")}</Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
