import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Shield,
  Smartphone,
  Globe,
  Code,
  Zap,
  Users,
  Award,
  Star,
  Heart,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { isValidLocale } from "@/config/i18n";

export const dynamic = "force-dynamic";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

const team = [
  {
    name: "Steve Giki",
    role: "Founder & Lead Developer",
    bio: "Building practical, privacy-first software and local AI tools for Africa.",
    avatar: "SG",
  },
];

const values = [
  {
    icon: Shield,
    titleKey: "values.privacy.title",
    descKey: "values.privacy.desc",
  },
  {
    icon: Smartphone,
    titleKey: "values.offline.title",
    descKey: "values.offline.desc",
  },
  {
    icon: Globe,
    titleKey: "values.africa.title",
    descKey: "values.africa.desc",
  },
  { icon: Code, titleKey: "values.open.title", descKey: "values.open.desc" },
  {
    icon: Zap,
    titleKey: "values.practical.title",
    descKey: "values.practical.desc",
  },
  { icon: Heart, titleKey: "values.care.title", descKey: "values.care.desc" },
];

const timeline = [
  {
    year: "2024",
    titleKey: "timeline.2024.title",
    descKey: "timeline.2024.desc",
  },
  {
    year: "2025",
    titleKey: "timeline.2025.title",
    descKey: "timeline.2025.desc",
  },
  {
    year: "2026",
    titleKey: "timeline.2026.title",
    descKey: "timeline.2026.desc",
  },
];

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale });
  return {
    title: t("about.meta.title"),
    description: t("about.meta.description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="flex flex-col">
      <section
        className="relative py-20 sm:py-28 lg:py-40 overflow-hidden"
        aria-labelledby="about-hero-title"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-brand-500/5"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t("hero.badge")}
            </span>
            <h1
              id="about-hero-title"
              className="font-heading text-display-xl text-foreground mb-6"
            >
              {t("hero.title")}
            </h1>
            <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {t("hero.team")}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4" /> {t("hero.awards")}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4" /> {t("hero.rating")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-24 lg:py-32 bg-background"
        aria-labelledby="mission-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2
              id="mission-heading"
              className="font-heading text-display-md text-foreground mb-4"
            >
              {t("mission.title")}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {t("mission.subtitle")}
            </p>
          </header>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="font-heading text-xl font-semibold mb-4">
                {t("mission.vision")}
              </h3>
              <p className="text-body text-muted-foreground">
                {t("mission.visionDesc")}
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="font-heading text-xl font-semibold mb-4">
                {t("mission.mission")}
              </h3>
              <p className="text-body text-muted-foreground">
                {t("mission.missionDesc")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-24 lg:py-32 bg-muted/30"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2
              id="values-heading"
              className="font-heading text-display-md text-foreground mb-4"
            >
              {t("values.title")}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {t("values.subtitle")}
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-card-hover transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <value.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {t(value.titleKey)}
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  {t(value.descKey)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-24 lg:py-32 bg-background"
        aria-labelledby="timeline-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2
              id="timeline-heading"
              className="font-heading text-display-md text-foreground mb-4"
            >
              {t("timeline.title")}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {t("timeline.subtitle")}
            </p>
          </header>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative pl-8 border-l border-primary/20"
              >
                <div
                  className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary border-4 bg-background"
                  aria-hidden="true"
                />
                <div className="text-sm font-mono text-primary mb-1">
                  {item.year}
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {t(item.titleKey)}
                </h3>
                <p className="text-body text-muted-foreground">
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-24 lg:py-32 bg-background"
        aria-labelledby="team-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2
              id="team-heading"
              className="font-heading text-display-md text-foreground mb-4"
            >
              {t("team.title")}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {t("team.subtitle")}
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary text-2xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-primary mb-4">{member.role}</p>
                <p className="text-body-sm text-muted-foreground">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-brand-500/5"
        aria-labelledby="careers-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="careers-heading"
            className="font-heading text-display-md text-foreground mb-4"
          >
            {t("careers.title")}
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("careers.subtitle")}
          </p>
          <Button variant="brand" size="xl" asChild>
            <Link href="/careers">{t("careers.cta")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
