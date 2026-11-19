import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { isValidLocale } from "@/config/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "pages.support" });
  return { title: t("title"), description: t("description") };
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.support" });

  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-display-md text-foreground">
          {t("title")}
        </h1>
        <p className="mt-4 text-body-lg text-muted-foreground">
          {t("description")}
        </p>
        <p className="prose prose-invert mt-10">{t("body")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="brand" size="lg" asChild>
            <Link href="/contact">
              {t("cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/docs">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {locale === "sw" ? "Dokumentasi" : "Documentation"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
