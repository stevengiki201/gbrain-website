import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  FileText,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import { DocCallout } from "@/components/docs/DocCallout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePlaceholder } from "@/components/docs/DocImagePlaceholder";
import { DocsToc, type TocItem } from "@/components/docs/DocsToc";
import { FeedbackButtons } from "@/components/docs/FeedbackButtons";
import {
  findDoc,
  getDocDetail,
  getDocNeighbors,
  getSectionForDoc,
  isProductKey,
  productNames,
} from "@/content/docs";
import { isValidLocale, type Locale } from "@/config/i18n";

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

export default async function ProductDocsArticlePage({ params }: Props) {
  const { locale, product, slug } = await params;
  if (!isValidLocale(locale) || !isProductKey(product)) notFound();
  const doc = findDoc(product, slug);
  if (!doc) notFound();
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });
  const activeLocale = locale as Locale;
  const detail = getDocDetail(product, slug);
  const section = getSectionForDoc(product, slug);
  const { previous, next } = getDocNeighbors(product, slug);

  const toc: TocItem[] = [
    { id: "overview", label: t("overview") },
    ...(detail?.prerequisites
      ? [{ id: "prerequisites", label: t("prerequisites") }]
      : []),
    { id: "walkthrough", label: t("walkthrough") },
    ...(doc.commands ? [{ id: "commands", label: t("commands") }] : []),
    ...(detail ? [{ id: "preview", label: t("preview") }] : []),
    ...(doc.links ? [{ id: "links", label: t("links") }] : []),
  ];

  return (
    <div className="mx-auto flex max-w-6xl gap-12 px-4 py-12 sm:px-8 sm:py-16">
      <article className="min-w-0 max-w-3xl flex-1">
        <DocsBreadcrumbs
          items={[
            { label: t("allProducts"), href: "/products" },
            { label: productNames[product][activeLocale], product },
            { label: t("productDocs"), docs: product },
            { label: doc.title[activeLocale] },
          ]}
        />

        <header>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            {section?.title[activeLocale] ??
              productNames[product][activeLocale]}
          </span>
          <h1 className="mt-4 font-heading text-display-sm text-foreground">
            {doc.title[activeLocale]}
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground">
            {doc.description[activeLocale]}
          </p>
        </header>

        <div className="mt-12">
          <section id="overview" className="scroll-mt-28">
            <h2 className="font-heading text-heading-lg text-foreground">
              {t("overview")}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {detail?.intro[activeLocale] ?? doc.description[activeLocale]}
            </p>
          </section>

          {detail?.prerequisites && (
            <section id="prerequisites" className="mt-12 scroll-mt-28">
              <h2 className="font-heading text-heading-lg text-foreground">
                {t("prerequisites")}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {detail.prerequisites[activeLocale].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border bg-muted/30 px-3.5 py-3 text-sm text-foreground"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="walkthrough" className="mt-12 scroll-mt-28">
            <h2 className="font-heading text-heading-lg text-foreground">
              {t("walkthrough")}
            </h2>
            <ol className="mt-5 flex flex-col gap-5">
              {doc.topics[activeLocale].map((topic, index) => (
                <li key={topic} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-primary/10 font-mono text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-foreground">
                    {topic}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {doc.commands && (
            <section id="commands" className="mt-12 scroll-mt-28">
              <h2 className="font-heading text-heading-lg text-foreground">
                {t("commands")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("commandsHint")}
              </p>
              <CodeBlock
                code={doc.commands[activeLocale].join("\n")}
                language="shell"
                copyLabel={t("copy")}
                copiedLabel={t("copied")}
              />
            </section>
          )}

          {detail && (
            <section id="preview" className="mt-12 scroll-mt-28">
              <h2 className="font-heading text-heading-lg text-foreground">
                {t("preview")}
              </h2>
              <DocImagePlaceholder
                label={detail.image.label[activeLocale]}
                caption={detail.image.caption[activeLocale]}
                placeholderLabel={t("placeholder")}
                hint={t("placeholderHint")}
              />
              <DocCallout callout={detail.callout} locale={activeLocale} />
            </section>
          )}

          {doc.links && (
            <section id="links" className="mt-12 scroll-mt-28">
              <h2 className="font-heading text-heading-lg text-foreground">
                {t("links")}
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {doc.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-accent"
                    >
                      {link.label[activeLocale]}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <FeedbackButtons
          title={t("helpfulTitle")}
          yesLabel={t("helpfulYes")}
          noLabel={t("helpfulNo")}
          thanksLabel={t("helpfulThanks")}
        />

        <nav
          aria-label={t("pagination")}
          className="mt-10 grid gap-3 border-t pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={{
                pathname: "/products/[product]/docs/[slug]",
                params: { product, slug: previous.slug },
              }}
              className="group rounded-2xl border p-4 transition-colors hover:border-primary/40"
            >
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {t("previous")}
              </span>
              <span className="mt-1.5 block text-sm font-medium text-foreground group-hover:text-primary">
                {previous.title[activeLocale]}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={{
                pathname: "/products/[product]/docs/[slug]",
                params: { product, slug: next.slug },
              }}
              className="group rounded-2xl border p-4 text-right transition-colors hover:border-primary/40 sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                {t("next")}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1.5 block text-sm font-medium text-foreground group-hover:text-primary">
                {next.title[activeLocale]}
              </span>
            </Link>
          )}
        </nav>
      </article>

      <aside className="hidden w-56 shrink-0 xl:block">
        <DocsToc items={toc} title={t("onThisPage")} />
      </aside>
    </div>
  );
}
