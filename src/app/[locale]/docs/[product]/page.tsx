import { notFound, redirect } from "next/navigation";
import { getPathname } from "@/i18n/navigation";
import { defaultLocale, isValidLocale } from "@/config/i18n";
import { isProductKey } from "@/content/docs";

export default async function LegacyProductDocsPage({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product } = await params;
  if (!isProductKey(product)) notFound();
  const active = isValidLocale(locale) ? locale : defaultLocale;
  const path = getPathname({
    locale: active,
    href: { pathname: "/products/[product]/docs", params: { product } },
  });
  redirect(active === defaultLocale ? path : `/${active}${path}`);
}
