"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { locales, localeNames, localeFlags, type Locale } from "@/config/i18n";
import { useLocale, useTranslations } from "next-intl";
import {
  Link,
  usePathname,
  useRouter,
  type StaticPathname,
} from "@/i18n/navigation";

const navigation: Array<{ href: StaticPathname; labelKey: string }> = [
  { href: "/products", labelKey: "nav.products" },
  { href: "/solutions", labelKey: "nav.solutions" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/blog", labelKey: "nav.blog" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = React.useState(false);
  const t = useTranslations("common");
  const currentLocale = useLocale() as Locale;

  const isActive = (href: StaticPathname) => pathname === href;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname as Parameters<typeof router.replace>[0], {
      locale: newLocale,
    });
    setLocaleMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t("skipToContent")}
      </a>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label={t("mainNavigation")}
      >
        <div className="flex items-center gap-8">
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

          <div className="hidden md:flex md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocaleMenuOpen(!localeMenuOpen)}
              aria-label={t("selectLanguage")}
              aria-expanded={localeMenuOpen}
              aria-haspopup="true"
            >
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true">{localeFlags[currentLocale]}</span>
                <span className="hidden sm:inline">
                  {localeNames[currentLocale]}
                </span>
                <ChevronDown className="h-4 w-4" />
              </span>
            </Button>

            {localeMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLocaleMenuOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-xl border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => handleLocaleChange(loc)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                        loc === currentLocale
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <span aria-hidden="true">{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("theme.light") : t("theme.dark")}
          >
            <Sun
              className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              aria-hidden="true"
            />
            <Moon
              className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              aria-hidden="true"
            />
          </Button>

          <Button
            variant="brand"
            size="lg"
            asChild
            className="hidden sm:inline-flex"
          >
            <Link href="/contact">{t("nav.contact")}</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t bg-background animate-in slide-in-from-top"
        >
          <div className="space-y-2 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-3 py-2 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("theme.light")}
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("theme.dark")}
                  </>
                )}
              </Button>
            </div>
            <Button variant="brand" className="w-full" asChild>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                {t("nav.contact")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
