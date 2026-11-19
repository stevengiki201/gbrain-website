export type UserRole = "user" | "confirmed" | "admin";

function csv(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function roleForEmail(email: string): UserRole {
  const normalized = email.trim().toLowerCase();
  if (csv(process.env.GBRAIN_ADMIN_EMAILS).includes(normalized)) return "admin";
  if (csv(process.env.GBRAIN_CONFIRMED_EMAILS).includes(normalized)) return "confirmed";
  return "user";
}

export function isConfirmedRole(role: UserRole | undefined): boolean {
  return role === "confirmed" || role === "admin";
}
