import { type NextRequest } from "next/server";
import { updateSession } from "./supabase/middleware";

export async function middleware(req: NextRequest) {
  const supabaseResponse = updateSession(req);

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
