import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/admin-nav";
import { auth } from "@/lib/auth";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-layout">
      <AdminNav email={session.user.email} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
