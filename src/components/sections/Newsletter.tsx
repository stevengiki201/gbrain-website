"use client";

import { useState } from "react";
import { Mail, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import type { Locale } from "@/config/i18n";

interface NewsletterProps {
  locale: Locale;
}

export function Newsletter({ locale }: NewsletterProps) {
  const t = useTranslations("home.newsletter") as (key: string) => string;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        toast({ title: t("toast.success"), variant: "success" });
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch {
      setStatus("error");
      toast({ title: t("toast.error"), variant: "destructive" });
    }
  };

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-brand-500/5"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <header className="mb-8">
            <h2
              id="newsletter-heading"
              className="font-heading text-display-md text-foreground mb-4"
            >
              {t("title")}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </header>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="email"
                placeholder={t("placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
                required
                disabled={status === "loading" || status === "success"}
                aria-label={t("placeholder")}
              />
            </div>
            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={status === "loading" || status === "success"}
              className="sm:w-auto"
            >
              {status === "loading" && (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              )}
              {status === "success" && (
                <Check className="h-5 w-5" aria-hidden="true" />
              )}
              {status === "idle" && t("button")}
              {status === "loading" && t("loading")}
              {status === "success" && t("success")}
            </Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">{t("privacy")}</p>
        </div>
      </div>
    </section>
  );
}
