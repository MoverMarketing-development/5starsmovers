"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deletePost(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  return {};
}
