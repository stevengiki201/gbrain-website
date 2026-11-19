import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { WhyGBrain } from "@/components/sections/WhyGBrain";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale as "en" | "sw";
  const t = await getTranslations({ locale: validLocale });
  return {
    title: t("home.meta.title"),
    description: t("home.meta.description"),
    openGraph: {
      title: t("home.meta.ogTitle"),
      description: t("home.meta.ogDescription"),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale as "en" | "sw";
  const t = await getTranslations({ locale: validLocale, namespace: "home" });

  return (
    <div className="flex flex-col">
      <Hero />
      <TrustStrip />
      <section
        className="py-20 sm:py-24 lg:py-32"
        aria-labelledby="products-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2
              id="products-heading"
              className="font-heading text-display-md text-foreground mb-4"
            >
              {t("products.title")}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {t("products.subtitle")}
            </p>
          </header>
          <ProductGrid />
        </div>
      </section>
      <WhyGBrain />
      <Stats />
      <Testimonials />
      <Newsletter locale={validLocale} />
    </div>
  );
}
