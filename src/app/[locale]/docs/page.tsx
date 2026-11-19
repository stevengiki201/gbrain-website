import { redirect } from "next/navigation";
import { getPathname } from "@/i18n/navigation";
import { defaultLocale, isValidLocale } from "@/config/i18n";

export default async function LegacyDocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const active = isValidLocale(locale) ? locale : defaultLocale;
  const path = getPathname({ locale: active, href: "/products" });
  redirect(active === defaultLocale ? path : `/${active}${path}`);
}
