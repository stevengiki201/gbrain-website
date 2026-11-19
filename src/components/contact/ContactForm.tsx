"use client";

import React from "react";
import { useState } from "react";
import { Mail, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/config/i18n";

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations("contact") as (key: string) => string;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast({ title: t("toast.success"), variant: "success" });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setStatus("error");
      toast({ title: t("toast.error"), variant: "destructive" });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("info.email.title"),
      value: "hello@gbrain.tech",
      href: "mailto:hello@gbrain.tech",
    },
    {
      icon: MapPin,
      title: t("info.address.title"),
      value: "Dar es Salaam, Tanzania",
      href: null,
    },
  ];

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 bg-background"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2
              id="contact-form-heading"
              className="font-heading text-display-md text-foreground mb-4"
            >
              {t("form.title")}
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              {t("form.subtitle")}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label={t("form.name")}
                  placeholder={t("form.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={status === "loading" || status === "success"}
                />
                <Input
                  label={t("form.email")}
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={status === "loading" || status === "success"}
                />
              </div>
              <Input
                label={t("form.subject")}
                placeholder={t("form.subjectPlaceholder")}
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                disabled={status === "loading" || status === "success"}
              />
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1.5"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  placeholder={t("form.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  disabled={status === "loading" || status === "success"}
                />
              </div>
              <Button
                type="submit"
                variant="brand"
                size="lg"
                className="w-full"
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading" && (
                  <Loader2
                    className="h-5 w-5 animate-spin mr-2"
                    aria-hidden="true"
                  />
                )}
                {status === "success" && (
                  <CheckCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                )}
                {status === "idle" && (
                  <>
                    <Send className="h-5 w-5 mr-2" aria-hidden="true" />
                    {t("form.submit")}
                  </>
                )}
                {status === "loading" && t("form.sending")}
                {status === "success" && t("form.sent")}
              </Button>
            </form>
            {status === "success" && (
              <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300">
                {t("form.successMessage")}
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
                {t("form.errorMessage")}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
              {t("info.title")}
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {item.title}
                      </h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-primary hover:underline mt-1 inline-block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground mt-1">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-muted/50 border">
              <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                {t("info.business.title")}
              </h4>
              <p className="text-body-sm text-muted-foreground mb-4">
                {t("info.business.desc")}
              </p>
              <Button variant="outline" asChild>
                <Link
                  href={{ pathname: "/contact", query: { business: "true" } }}
                >
                  {t("info.business.cta")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
