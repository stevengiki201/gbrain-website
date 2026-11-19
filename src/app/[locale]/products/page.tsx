import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { isValidLocale } from "@/config/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "home.products" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home.products" });

  return (
    <div className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="font-heading text-display-md text-foreground">
            {t("title")}
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>
        <ProductGrid />
      </div>
    </div>
  );
}
