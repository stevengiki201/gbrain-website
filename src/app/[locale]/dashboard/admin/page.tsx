import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getSessionUser, isAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect("/dashboard/sms/login");
  if (!isAdminUser(user)) redirect("/dashboard/sms");
  return (
    <main>
      <AdminDashboard user={user} />
    </main>
  );
}
