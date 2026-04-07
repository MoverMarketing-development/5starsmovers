import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/admin/posts");

  return (
    <div className="min-h-screen bg-[#0d0f12] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffdc00] text-[#111318]">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white font-display">5 Star Admin</h1>
            <p className="mt-1 text-sm text-white/40">Sign in to manage your content</p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
