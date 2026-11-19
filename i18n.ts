import createMiddleware from "next-intl/middleware";
import { getRequestConfig as createGetRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "./src/config/i18n";

export const routing = {
  locales,
  defaultLocale,
  localePrefix: "as-needed" as const,
  pathnames: {
    "/": "/",
    "/about": { en: "/about", sw: "/kuhusu" },
    "/contact": { en: "/contact", sw: "/mawasiliano" },
    "/blog": { en: "/blog", sw: "/blogu" },
    "/blog/[slug]": { en: "/blog/[slug]", sw: "/blogu/[slug]" },
    "/products": { en: "/products", sw: "/bidhaa" },
    "/products/media": { en: "/products/media", sw: "/bidhaa/media" },
    "/products/sms": { en: "/products/sms", sw: "/bidhaa/sms" },
    "/products/phonelink": {
      en: "/products/phonelink",
      sw: "/bidhaa/phonelink",
    },
    "/products/neural": { en: "/products/neural", sw: "/bidhaa/neural" },
    "/solutions": { en: "/solutions", sw: "/suluhisho" },
    "/docs": { en: "/docs", sw: "/docs" },
    "/docs/[product]": { en: "/docs/[product]", sw: "/docs/[product]" },
    "/docs/[product]/[slug]": {
      en: "/docs/[product]/[slug]",
      sw: "/docs/[product]/[slug]",
    },
    "/careers": { en: "/careers", sw: "/kazi" },
    "/support": { en: "/support", sw: "/msaada" },
    "/security": { en: "/security", sw: "/usalama" },
    "/admin": { en: "/admin", sw: "/admin" },
    "/legal/privacy": { en: "/legal/privacy", sw: "/sheria/faragha" },
    "/legal/terms": { en: "/legal/terms", sw: "/sheria/vigezo" },
    "/legal/cookies": { en: "/legal/cookies", sw: "/sheria/cookies" },
  },
};

export const middleware = createMiddleware(routing);

const requestConfig = createGetRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale as (typeof locales)[number])
    ? (locale as (typeof locales)[number])
    : defaultLocale;

  return {
    messages: (await import(`./src/messages/${validLocale}.json`)).default,
  };
});

export const getRequestConfig = requestConfig;
export default requestConfig;
