import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { routing } from "@/../i18n";

export const {
  Link,
  redirect,
  permanentRedirect,
  getPathname,
  usePathname,
  useRouter,
} = createLocalizedPathnamesNavigation({
  locales: routing.locales,
  localePrefix: routing.localePrefix,
  pathnames: routing.pathnames,
});

export type StaticPathname = Exclude<
  keyof typeof routing.pathnames,
  `${string}[${string}]${string}`
>;
