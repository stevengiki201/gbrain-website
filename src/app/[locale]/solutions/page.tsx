import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { SolutionsContent } from "@/components/sections/SolutionsContent";

interface SolutionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SolutionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale as "en" | "sw";
  const t = await getTranslations({ locale: validLocale });
  return {
    title: t("solutions.meta.title"),
    description: t("solutions.meta.description"),
  };
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = await params;
  const validLocale = locale as "en" | "sw";
  unstable_setRequestLocale(validLocale);
  return <SolutionsContent />;
}
