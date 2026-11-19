"use client";

import * as React from "react";
import { ChevronDown, LifeBuoy, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  docSections,
  docs,
  productNames,
  productPaths,
  type ProductKey,
} from "@/content/docs";
import { isValidLocale } from "@/config/i18n";
import { docIcons } from "./docIcons";
import { cn } from "@/lib/utils";

type DocsSidebarProps = {
  product: ProductKey;
  onNavigate?: () => void;
};

export function DocsSidebar({ product, onNavigate }: DocsSidebarProps) {
  const t = useTranslations("docs");
  const locale = useLocale();
  const activeLocale = isValidLocale(locale) ? locale : "en";
  const pathname = usePathname();
  const [query, setQuery] = React.useState("");

  const currentSlug = pathname.split("/").filter(Boolean)[3];
  const Icon = docIcons[product];

  const normalizedQuery = query.trim().toLowerCase();
  const filteredSections = React.useMemo(() => {
    const sections = docSections[product];
    if (!normalizedQuery) return sections;
    const matches = (text: string) =>
      text.toLowerCase().includes(normalizedQuery);
    return sections
      .map((section) => ({
        ...section,
        slugs: section.slugs.filter((slug) => {
          const page = docs[product].find((item) => item.slug === slug);
          return (
            page &&
            (matches(page.title[activeLocale]) ||
              matches(page.description[activeLocale]) ||
              matches(slug))
          );
        }),
      }))
      .filter((section) => section.slugs.length > 0);
  }, [normalizedQuery, product, activeLocale]);

  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto px-4 py-6 lg:px-5">
      <div>
        <Link
          href={{ pathname: "/products/[product]/docs", params: { product } }}
          onClick={onNavigate}
          className="flex items-center gap-2.5 font-heading text-base font-semibold text-foreground"
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="truncate">
            {productNames[product][activeLocale]}
          </span>
        </Link>
        <p className="mt-2 px-1 text-xs uppercase tracking-wide text-muted-foreground">
          {t("title")}
        </p>
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search")}
          aria-label={t("search")}
          className="h-10 w-full rounded-xl border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <nav aria-label={t("toc")} className="flex flex-col gap-6">
        {filteredSections.map((section) => {
          const isOpen = normalizedQuery ? true : !collapsed[section.id];
          return (
            <div key={section.id}>
              <button
                type="button"
                onClick={() =>
                  setCollapsed((current) => ({
                    ...current,
                    [section.id]: !current[section.id],
                  }))
                }
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {section.title[activeLocale]}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <ul className="mt-1 flex flex-col gap-0.5 border-l pl-3">
                  {section.slugs.map((slug) => {
                    const page = docs[product].find(
                      (item) => item.slug === slug,
                    );
                    if (!page) return null;
                    const active = slug === currentSlug;
                    return (
                      <li key={slug}>
                        <Link
                          href={{
                            pathname: "/products/[product]/docs/[slug]",
                            params: { product, slug },
                          }}
                          onClick={onNavigate}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "block rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                            active
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground",
                          )}
                        >
                          {page.title[activeLocale]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
        {normalizedQuery && filteredSections.length === 0 && (
          <p className="px-2 text-sm text-muted-foreground">{t("noResults")}</p>
        )}
      </nav>

      <div className="mt-auto space-y-1 border-t pt-5">
        <Link
          href="/products"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {t("allProducts")}
        </Link>
        <Link
          href={productPaths[product]}
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <LifeBuoy className="h-4 w-4" aria-hidden="true" />
          {t("productPage")}
        </Link>
      </div>
    </div>
  );
}
