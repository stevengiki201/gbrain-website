import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Newsletter } from "@/components/sections/Newsletter";
import { Link } from "@/i18n/navigation";
import { blogPosts } from "@/content/blog";
import { isValidLocale } from "@/config/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <div className="flex flex-col">
      <section
        className="py-20 sm:py-28 lg:py-36 bg-gradient-to-br from-primary/5 via-background to-brand-500/5"
        aria-labelledby="blog-hero-title"
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1
            id="blog-hero-title"
            className="font-heading text-display-xl text-foreground"
          >
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-muted-foreground">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32" aria-label={t("hero.title")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug}>
                <Card className="h-full transition-shadow hover:shadow-card-hover">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
                    <Tag
                      className="h-10 w-10 text-primary"
                      aria-hidden="true"
                    />
                    <span className="absolute left-4 top-4 rounded bg-primary/90 px-2 py-1 text-xs text-primary-foreground">
                      {post.category}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <time dateTime={post.date}>{post.date}</time>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mb-2 line-clamp-2 font-heading text-lg font-semibold text-foreground">
                      {post.title[locale]}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-body-sm text-muted-foreground">
                      {post.excerpt[locale]}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="w-full justify-start"
                    >
                      <Link
                        href={{
                          pathname: "/blog/[slug]",
                          params: { slug: post.slug },
                        }}
                      >
                        {t("readMore")}
                        <ArrowRight
                          className="ml-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter locale={locale} />
    </div>
  );
}
