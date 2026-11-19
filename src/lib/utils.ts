import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: string = "en"): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(
  date: Date | string,
  locale: string = "en",
): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return locale === "sw" ? "sasa hivi" : "just now";
  if (diffMins < 60)
    return locale === "sw"
      ? `dakika ${diffMins} zilizopita`
      : `${diffMins}m ago`;
  if (diffHours < 24)
    return locale === "sw"
      ? `masaa ${diffHours} yaliyopita`
      : `${diffHours}h ago`;
  if (diffDays < 7)
    return locale === "sw" ? `siku ${diffDays} zilizopita` : `${diffDays}d ago`;
  return formatDate(d, locale);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SITE_URL || "https://gbrain.tech"}${path}`;
}
