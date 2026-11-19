"use client";

import * as React from "react";
import { PanelLeft, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ProductKey } from "@/content/docs";
import { DocsSidebar } from "./DocsSidebar";

export function DocsShell({
  product,
  children,
}: {
  product: ProductKey;
  children: React.ReactNode;
}) {
  const t = useTranslations("docs");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mx-auto flex w-full max-w-[1600px]">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r bg-sidebar lg:block">
        <DocsSidebar product={product} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label={t("closeMenu")}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-[19rem] max-w-[85vw] flex-col border-r bg-sidebar shadow-xl animate-in slide-in-from-left">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("closeMenu")}
              className="absolute right-3 top-4 z-10 rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <DocsSidebar product={product} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="sticky top-16 z-40 flex items-center gap-2 border-b bg-background/95 px-4 py-2.5 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("browse")}
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm font-medium text-foreground"
          >
            <PanelLeft className="h-4 w-4" aria-hidden="true" />
            {t("toc")}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
