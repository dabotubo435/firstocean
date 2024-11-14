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
  console.log("fetching categories");
  return await supabase.from("categories").select().order("name");
}

export async function adminGetTotalCategories() {
  "use cache";
  cacheLife("days");
  cacheTag("categories");

  const supabase = createSupabaseServerAdminClient();
  console.log("fetching total categories count");
  return await supabase.from("categories").select("*", { count: "estimated" });
}
