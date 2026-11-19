import { useTranslations } from "next-intl";

export function TrustStrip() {
  const t = useTranslations("home.trust") as (key: string) => string;

  const trusts = [
    { icon: "🏆", label: t("items.award"), value: t("items.awardValue") },
    { icon: "👥", label: t("items.users"), value: t("items.usersValue") },
    {
      icon: "🌍",
      label: t("items.countries"),
      value: t("items.countriesValue"),
    },
    { icon: "⭐", label: t("items.rating"), value: t("items.ratingValue") },
    { icon: "🔒", label: t("items.privacy"), value: t("items.privacyValue") },
    {
      icon: "📱",
      label: t("items.platforms"),
      value: t("items.platformsValue"),
    },
  ];

  return (
    <section
      className="border-y py-12 bg-muted/30"
      aria-label="Trust indicators"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          {trusts.map((item, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-4xl mb-2" aria-hidden="true">
                {item.icon}
              </div>
              <div className="font-heading text-2xl font-bold text-foreground">
                {item.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
