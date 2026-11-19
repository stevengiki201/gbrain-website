import { Github, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, type StaticPathname } from "@/i18n/navigation";

const footerLinks: Record<
  string,
  Array<{ href: StaticPathname; labelKey: string }>
> = {
  products: [
    { href: "/products/media", labelKey: "footer.products.media" },
    { href: "/products/sms", labelKey: "footer.products.sms" },
    { href: "/products/phonelink", labelKey: "footer.products.phonelink" },
    { href: "/products/neural", labelKey: "footer.products.neural" },
  ],
  company: [
    { href: "/about", labelKey: "footer.company.about" },
    { href: "/blog", labelKey: "footer.company.blog" },
    { href: "/careers", labelKey: "footer.company.careers" },
    { href: "/contact", labelKey: "footer.company.contact" },
  ],
  resources: [
    { href: "/docs", labelKey: "footer.resources.docs" },
    { href: "/blog", labelKey: "footer.resources.blog" },
    { href: "/blog", labelKey: "footer.resources.community" },
    { href: "/support", labelKey: "footer.resources.support" },
  ],
  legal: [
    { href: "/legal/privacy", labelKey: "footer.legal.privacy" },
    { href: "/legal/terms", labelKey: "footer.legal.terms" },
    { href: "/legal/cookies", labelKey: "footer.legal.cookies" },
    { href: "/security", labelKey: "footer.legal.security" },
  ],
};

const socialLinks = [
  { href: "https://github.com/stevengiki201", icon: Github, label: "GitHub" },
  { href: "mailto:hello@gbrain.tech", icon: Mail, label: "Email" },
];

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t bg-muted/30" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="GBrain Technologies Home"
            >
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <rect width="32" height="32" rx="8" fill="currentColor" />
                <path
                  d="M8 12h16M8 16h12M8 20h8"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-heading text-xl font-bold tracking-tight">
                GBrain
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-body-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {(["products", "company", "resources", "legal"] as const).map(
            (group) => (
              <nav key={group} aria-label={t(`footer.${group}.title`)}>
                <h3 className="font-heading font-semibold">
                  {t(`footer.${group}.title`)}
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks[group].map((link, index) => (
                    <li key={`${link.href}-${index}`}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ),
          )}
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-body-sm text-muted-foreground">
              © {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-body-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t("footer.address")}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a
                  href="mailto:hello@gbrain.tech"
                  className="transition-colors hover:text-foreground"
                >
                  hello@gbrain.tech
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
