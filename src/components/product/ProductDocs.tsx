import { ArrowRight, BookOpen, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useLocale, useTranslations } from "next-intl";
import { isValidLocale } from "@/config/i18n";
import { Link } from "@/i18n/navigation";
import {
  docs,
  isProductKey,
  productNames,
  type ProductKey,
} from "@/content/docs";

interface ProductDocsProps {
  product: string;
}

const icons = [BookOpen, FileText, ExternalLink];

export function ProductDocs({ product }: ProductDocsProps) {
  const t = useTranslations("product.docs") as (key: string) => string;
  const docsT = useTranslations("docs");
  const rawLocale = useLocale();
  const locale = isValidLocale(rawLocale) ? rawLocale : "en";
  if (!isProductKey(product)) return null;
  const key = product as ProductKey;
  const links = docs[key].slice(0, 6);

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-muted/30"
      aria-labelledby="docs-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="docs-heading"
            className="font-heading text-display-md text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t("subtitle")}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((link, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Card
                key={link.slug}
                className="hover:shadow-card-hover transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {link.title[locale]}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {link.description[locale]}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href={{
                        pathname: "/products/[product]/docs/[slug]",
                        params: { product: key, slug: link.slug },
                      }}
                      className="flex items-center gap-1"
                    >
                      {t("readMore")}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link
              href={{
                pathname: "/products/[product]/docs",
                params: { product: key },
              }}
            >
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("viewAllDocs")}
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {docsT("productDocsNote", { product: productNames[key][locale] })}
        </p>
      </div>
    </section>
  );
}
