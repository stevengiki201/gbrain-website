export const DEFAULT_PHONELINK_DASHBOARD_URL =
  "http://phonelink.localhost:7842";

export function getPhonelinkDashboardUrl(): string {
  const configured = process.env.NEXT_PUBLIC_PHONELINK_DASHBOARD_URL?.trim();
  if (!configured) return DEFAULT_PHONELINK_DASHBOARD_URL;

  try {
    const parsed = new URL(configured);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return DEFAULT_PHONELINK_DASHBOARD_URL;
    }
    return configured.replace(/\/+$/, "");
  } catch {
    return DEFAULT_PHONELINK_DASHBOARD_URL;
  }
}
