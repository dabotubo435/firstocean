import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./types";

const _createSupabaseServerClient = (
  cookieStore: Awaited<ReturnType<typeof cookies>> | null
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore?.getAll() ?? [];
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore?.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export const createSupabaseServerClient = (
  cookieStore: Awaited<ReturnType<typeof cookies>>
) => _createSupabaseServerClient(cookieStore);

export const createSupabaseServerAnonymousClient = () =>
  _createSupabaseServerClient(null);

export const createSupabaseServerAdminClient = () => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
      },
    }
  );
};
