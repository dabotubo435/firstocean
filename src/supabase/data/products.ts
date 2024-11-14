import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import {
  createSupabaseServerAdminClient,
  createSupabaseServerAnonymousClient,
} from "../server";

export async function getProduct(id: number) {
  "use cache";
  cacheLife("hours");
  cacheTag(`products:${id}`);

  const supabase = createSupabaseServerAnonymousClient();
  console.log("fetching product", id);
  return await supabase.from("products").select().eq("id", id).single();
}

export async function adminGetTotalProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const supabase = createSupabaseServerAdminClient();
  console.log("fetching total products count");
  return await supabase.from("products").select("*", { count: "estimated" });
}
