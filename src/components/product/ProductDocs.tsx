import { ExternalLink, FileText, Code, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface ProductDocsProps {
  product: string;
}

const docsLinks: Record<
  string,
  Array<{
    title: string;
    href: string;
    description: string;
    icon: React.ReactNode;
  }>
> = {
  media: [
    {
      title: "Getting Started",
      href: "/docs/media/getting-started",
      description: "Install, run, scan media",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Architecture",
      href: "/docs/media/architecture",
      description: "Playback, stores, database",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Web Support",
      href: "/docs/media/web",
      description: "Browser fallbacks & limitations",
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      title: "API Reference",
      href: "/docs/media/api",
      description: "Stores, contexts, engines",
      icon: <FileText className="h-5 w-5" />,
    },
  ],
  sms: [
    {
      title: "Setup Guide",
      href: "/docs/sms/setup",
      description: "Linux + Android + ADB + adbsms",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Configuration",
      href: "/docs/sms/config",
      description: "config.yaml reference",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Voice Bridge",
      href: "/docs/sms/voice",
      description: "Whisper + Piper setup",
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      title: "CLI Reference",
      href: "/docs/sms/cli",
      description: "All bot.main commands",
      icon: <FileText className="h-5 w-5" />,
    },
  ],
  phonelink: [
    {
      title: "Installation",
      href: "/docs/phonelink/install",
      description: "Desktop relay + Android APK",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "CLI Reference",
      href: "/docs/phonelink/cli",
      description: "All phonelink commands",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Dashboard",
      href: "/docs/phonelink/dashboard",
      description: "Web UI features",
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      title: "Security",
      href: "/docs/phonelink/security",
      description: "LAN-only, no TLS, VPN for remote",
      icon: <FileText className="h-5 w-5" />,
    },
  ],
  neural: [
    {
      title: "Quick Start",
      href: "/docs/neural/quickstart",
      description: "Setup + API + Dashboard",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Architecture",
      href: "/docs/neural/architecture",
      description: "Core, providers, engines",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "API Reference",
      href: "/docs/neural/api",
      description: "80+ endpoints",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Subsystems",
      href: "/docs/neural/subsystems",
      description: "MrX, SMS, PhoneLink, AudioLink",
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      title: "Development",
      href: "/docs/neural/development",
      description: "Testing, contributing",
      icon: <Code className="h-5 w-5" />,
    },
  ],
  shulebomba: [
    {
      title: "Overview",
      href: "/docs/shulebomba/overview",
      description: "What it is and who it serves",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Getting Started",
      href: "/docs/shulebomba/getting-started",
      description: "Play Store install and first class",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "How to Use",
      href: "/docs/shulebomba/how-to-use",
      description: "Daily teacher workflow",
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      title: "Why Choose",
      href: "/docs/shulebomba/why-choose",
      description: "Benefits for teachers and schools",
      icon: <Check className="h-5 w-5" />,
    },
    {
      title: "Attendance",
      href: "/docs/shulebomba/attendance",
      description: "Roll call and saved records",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Tests & Scores",
      href: "/docs/shulebomba/tests-and-scores",
      description: "Subjects, marks and editing",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/docs/shulebomba/reports",
      description: "PDF, Excel and Word exports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Privacy & Security",
      href: "/docs/shulebomba/privacy-security",
      description: "Local data and saved roll calls",
      icon: <ExternalLink className="h-5 w-5" />,
    },
  ],
};

export function ProductDocs({ product }: ProductDocsProps) {
  const t = useTranslations("product.docs") as (key: string) => string;
  const links = docsLinks[product] || [];

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
          {links.map((link, index) => (
            <Card
              key={index}
              className="hover:shadow-card-hover transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
                    {link.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={{
                      pathname: "/docs/[product]/[slug]",
                      params: { product, slug: link.href.split("/").pop()! },
                    }}
                    className="flex items-center gap-1"
                  >
                    {t("readMore")}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link href={{ pathname: "/docs/[product]", params: { product } }}>
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("viewAllDocs")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
