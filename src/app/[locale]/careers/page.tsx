import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { isValidLocale } from "@/config/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "pages.careers" });
  return { title: t("title"), description: t("description") };
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.careers" });
  const roles = t.raw("roles") as string[];

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
        <h2 className="mt-12 font-heading text-heading-xl text-foreground">
          {t("rolesTitle")}
        </h2>
        <Card className="mt-6">
          <CardContent className="space-y-3 p-6">
            {roles.map((role) => (
              <p
                key={role}
                className="flex items-start gap-3 text-body text-foreground"
              >
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {role}
              </p>
            ))}
          </CardContent>
        </Card>
        <Button variant="brand" size="lg" asChild className="mt-10">
          <Link href="/contact">
            {t("cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
