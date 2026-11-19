import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import { docIcons } from "@/components/docs/docIcons";
import {
  docSections,
  docs,
  isProductKey,
  productDescriptions,
  productNames,
  productPaths,
} from "@/content/docs";
import { isValidLocale } from "@/config/i18n";

type Props = { params: Promise<{ locale: string; product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, product } = await params;
  if (!isValidLocale(locale) || !isProductKey(product)) return {};
  return {
    title: `${tProductDocs(locale)} — ${productNames[product][locale]}`,
    description: productDescriptions[product][locale],
  };
}

function tProductDocs(locale: "en" | "sw") {
  return locale === "sw" ? "Dokumentasi" : "Documentation";
}

export default async function ProductDocsHomePage({ params }: Props) {
  const { locale, product } = await params;
  if (!isValidLocale(locale) || !isProductKey(product)) notFound();
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });
  const Icon = docIcons[product];
  const sections = docSections[product];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
      <DocsBreadcrumbs
        items={[
          { label: t("allProducts"), href: "/products" },
          { label: productNames[product][locale], href: productPaths[product] },
          { label: t("productDocs") },
        ]}
      />

      <header className="flex items-start gap-5">
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {t("title")}
          </p>
          <h1 className="mt-2 font-heading text-display-sm text-foreground">
            {productNames[product][locale]}
          </h1>
          <p className="mt-3 max-w-2xl text-body text-muted-foreground">
            {productDescriptions[product][locale]}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {docs[product].length} {t("guides").toLowerCase()}
          </p>
        </div>
      </header>

      <div className="mt-14 space-y-14">
        {sections.map((section, index) => (
          <section key={section.id} aria-labelledby={`section-${section.id}`}>
            <div className="flex items-baseline gap-3 border-b pb-4">
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2
                id={`section-${section.id}`}
                className="font-heading text-heading-lg text-foreground"
              >
                {section.title[locale]}
              </h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {section.slugs.map((slug) => {
                const page = docs[product].find((item) => item.slug === slug);
                if (!page) return null;
                return (
                  <Link
                    key={slug}
                    href={{
                      pathname: "/products/[product]/docs/[slug]",
                      params: { product, slug },
                    }}
                    className="group rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-card-hover"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                        <FileText className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <ArrowRight
                        className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                      {page.title[locale]}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {page.description[locale]}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
