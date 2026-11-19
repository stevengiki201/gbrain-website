import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { isValidLocale } from "@/config/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "pages.security" });
  return { title: t("title"), description: t("description") };
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.security" });
  const items = t.raw("items") as string[];

  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-heading text-display-md text-foreground">
          {t("title")}
        </h1>
        <p className="mt-4 text-body-lg text-muted-foreground">
          {t("description")}
        </p>
        <p className="prose prose-invert mt-10">{t("body")}</p>
        <h2 className="mt-12 font-heading text-heading-xl text-foreground">
          {t("itemsTitle")}
        </h2>
        <Card className="mt-6">
          <CardContent className="space-y-3 p-6">
            {items.map((item) => (
              <p
                key={item}
                className="flex items-start gap-3 text-body text-foreground"
              >
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </p>
            ))}
          </CardContent>
        </Card>
        <Button variant="brand" size="lg" asChild className="mt-10">
          <Link href="/legal/privacy">
            {t("cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
