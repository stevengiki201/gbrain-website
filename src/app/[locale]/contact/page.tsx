import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { isValidLocale } from "@/config/i18n";

export const dynamic = "force-dynamic";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale });
  return {
    title: t("contact.meta.title"),
    description: t("contact.meta.description"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="flex flex-col">
      <section
        className="py-20 sm:py-28 lg:py-40 bg-gradient-to-br from-primary/5 via-background to-brand-500/5"
        aria-labelledby="contact-hero-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            id="contact-hero-title"
            className="font-heading text-display-xl text-foreground mb-6"
          >
            {t("hero.title")}
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <ContactForm locale={locale} />
    </div>
  );
}
