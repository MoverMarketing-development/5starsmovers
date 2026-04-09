import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#0d0f12] text-white">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
