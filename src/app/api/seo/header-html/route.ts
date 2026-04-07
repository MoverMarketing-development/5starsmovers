import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("seo_settings")
      .select("header_html")
      .eq("page_path", path)
      .single();

    return NextResponse.json({ html: data?.header_html ?? "" });
  } catch {
    return NextResponse.json({ html: "" });
  }
}
