import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { blogPosts, findPost } from "@/content/blog";
import { isValidLocale } from "@/config/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = findPost(slug);
  if (!post) return {};
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    openGraph: {
      type: "article",
      title: post.title[locale],
      description: post.excerpt[locale],
      publishedTime: post.date,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const post = findPost(slug);
  if (!post) notFound();
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  const nextPost =
    blogPosts[
      (blogPosts.findIndex((item) => item.slug === slug) + 1) % blogPosts.length
    ];

  return (
    <article className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("hero.title")}
          </Link>
        </Button>

        <header>
          <span className="inline-flex rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {post.category}
          </span>
          <h1 className="mt-4 font-heading text-display-md text-foreground">
            {post.title[locale]}
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground">
            {post.excerpt[locale]}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert mt-12">
          {post.content[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border bg-muted/30 p-6">
          <p className="text-sm text-muted-foreground">{t("readMore")}</p>
          <Button variant="ghost" asChild className="mt-2">
            <Link
              href={{
                pathname: "/blog/[slug]",
                params: { slug: nextPost.slug },
              }}
            >
              {nextPost.title[locale]}
              <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
