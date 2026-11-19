import { redirect } from "next/navigation";
import { SmsDashboard } from "@/components/dashboard/SmsDashboard";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SmsDashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/dashboard/sms/login");
  return (
    <main>
      <SmsDashboard user={user} />
    </main>
  );
}
