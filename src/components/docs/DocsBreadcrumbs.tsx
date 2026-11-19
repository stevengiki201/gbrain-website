import { ChevronRight, Home } from "lucide-react";
import { Link, type StaticPathname } from "@/i18n/navigation";
import { productPaths, type ProductKey } from "@/content/docs";

export type Crumb = {
  label: string;
  href?: StaticPathname;
  product?: ProductKey;
  docs?: ProductKey;
};

export function DocsBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded px-1 py-0.5 hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">GBrain</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-1.5"
          >
            <ChevronRight
              className="h-3.5 w-3.5 opacity-60"
              aria-hidden="true"
            />
            {item.product ? (
              <Link
                href={productPaths[item.product]}
                className="rounded px-1 py-0.5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : item.docs ? (
              <Link
                href={{
                  pathname: "/products/[product]/docs",
                  params: { product: item.docs },
                }}
                className="rounded px-1 py-0.5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : item.href ? (
              <Link
                href={item.href}
                className="rounded px-1 py-0.5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="px-1 py-0.5 text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
