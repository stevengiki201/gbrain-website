import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

const testimonials = [
  {
    quoteKey: "1.quote",
    authorKey: "1.author",
    roleKey: "1.role",
    companyKey: "1.company",
  },
  {
    quoteKey: "2.quote",
    authorKey: "2.author",
    roleKey: "2.role",
    companyKey: "2.company",
  },
  {
    quoteKey: "3.quote",
    authorKey: "3.author",
    roleKey: "3.role",
    companyKey: "3.company",
  },
];

export function Testimonials() {
  const t = useTranslations("home.testimonials") as (key: string) => string;

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="testimonials-heading"
            className="font-heading text-display-md text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t("subtitle")}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-muted/50">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Quote
                  className="h-8 w-8 text-muted-foreground/30 mb-4"
                  aria-hidden="true"
                />
                <blockquote className="text-body text-foreground mb-6">
                  {t(testimonial.quoteKey)}
                </blockquote>
                <footer>
                  <div className="font-medium text-foreground">
                    {t(testimonial.authorKey)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t(testimonial.roleKey)} @ {t(testimonial.companyKey)}
                  </div>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
