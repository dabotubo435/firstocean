import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import {
  createSupabaseServerAdminClient,
  createSupabaseServerAnonymousClient,
} from "../server";

export async function getCategories() {
  "use cache";
  cacheLife("days");
  cacheTag("categories");

  const supabase = createSupabaseServerAnonymousClient();
  return await supabase.from("categories").select().order("name");
}

export async function adminGetTotalCategories() {
  "use cache";
  cacheLife("days");
  cacheTag("categories");

  const supabase = createSupabaseServerAdminClient();
  return await supabase.from("categories").select("*", { count: "estimated" });
}
