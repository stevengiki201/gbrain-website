import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

interface LegalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale as "en" | "sw";
  unstable_setRequestLocale(validLocale);
  const t = await getTranslations({ locale: validLocale });
  return {
    title: t("legal.cookies.meta.title"),
    description: t("legal.cookies.meta.description"),
  };
}

export default async function CookiesPage({ params }: LegalPageProps) {
  const { locale } = await params;
  const validLocale = locale as "en" | "sw";
  unstable_setRequestLocale(validLocale);
  const t = await getTranslations({
    locale: validLocale,
    namespace: "legal.cookies",
  });

  const renderItems = (key: string) => {
    const items = t.raw(key) as string[];
    return items?.map((item: string, index: number) => (
      <li key={index}>{item}</li>
    ));
  };

  return (
    <div className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="font-heading text-display-lg text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-body-lg text-muted-foreground">
            {t("lastUpdated")}{" "}
            {new Date().toLocaleDateString(
              locale === "sw" ? "sw-TZ" : "en-US",
              { year: "numeric", month: "long", day: "numeric" },
            )}
          </p>
        </header>

        <article className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {t("sections.what.title")}
            </h2>
            <p className="text-body text-muted-foreground">
              {t("sections.what.content")}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {t("sections.types.title")}
            </h2>
            <p className="text-body text-muted-foreground mb-4">
              {t("sections.types.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-body text-muted-foreground">
              {renderItems("sections.types.items")}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {t("sections.purpose.title")}
            </h2>
            <p className="text-body text-muted-foreground mb-4">
              {t("sections.purpose.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-body text-muted-foreground">
              {renderItems("sections.purpose.items")}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {t("sections.thirdParty.title")}
            </h2>
            <p className="text-body text-muted-foreground mb-4">
              {t("sections.thirdParty.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-body text-muted-foreground">
              {renderItems("sections.thirdParty.items")}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {t("sections.consent.title")}
            </h2>
            <p className="text-body text-muted-foreground mb-4">
              {t("sections.consent.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-body text-muted-foreground">
              {renderItems("sections.consent.items")}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {t("sections.manage.title")}
            </h2>
            <p className="text-body text-muted-foreground mb-4">
              {t("sections.manage.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-body text-muted-foreground">
              {renderItems("sections.manage.items")}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {t("sections.changes.title")}
            </h2>
            <p className="text-body text-muted-foreground">
              {t("sections.changes.content")}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              {t("sections.contact.title")}
            </h2>
            <p className="text-body text-muted-foreground">
              {t("sections.contact.content")}
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
