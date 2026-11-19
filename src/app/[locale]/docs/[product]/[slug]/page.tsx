import { notFound, redirect } from "next/navigation";
import { getPathname } from "@/i18n/navigation";
import { defaultLocale, isValidLocale } from "@/config/i18n";
import { isProductKey, findDoc } from "@/content/docs";

export default async function LegacyDocsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; product: string; slug: string }>;
}) {
  const { locale, product, slug } = await params;
  if (!isProductKey(product) || !findDoc(product, slug)) notFound();
  const active = isValidLocale(locale) ? locale : defaultLocale;
  const path = getPathname({
    locale: active,
    href: {
      pathname: "/products/[product]/docs/[slug]",
      params: { product, slug },
    },
  });
  redirect(active === defaultLocale ? path : `/${active}${path}`);
}
