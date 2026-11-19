import { useTranslations } from "next-intl";

const stats = [
  { value: "4", labelKey: "products", suffix: "+" },
  { value: "12", labelKey: "phases", suffix: "" },
  { value: "100%", labelKey: "offline", suffix: "" },
  { value: "∞", labelKey: "scalable", suffix: "" },
];

export function Stats() {
  const t = useTranslations("home.stats") as (key: string) => string;

  return (
    <section className="py-20 bg-muted/30" aria-labelledby="stats-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6">
              <div className="font-heading text-display-lg text-primary font-bold">
                {stat.value}
                <span className="text-base font-normal text-muted-foreground">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-body text-muted-foreground mt-2">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
