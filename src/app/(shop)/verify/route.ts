import { createSupabaseServerClient } from "@/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = createSupabaseServerClient(cookies());

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    // redirect the user to an error page with some instructions
    if (error) return new Response(error.message, { status: 401 });
    // redirect user to specified redirect URL or root of app
    redirect(next);
  }
  return new Response("Invalid verification token", { status: 401 });
}
