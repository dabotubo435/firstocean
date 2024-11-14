import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { createSupabaseServerAdminClient } from "../server";

export async function adminGetPendingOrdersCount() {
  "use cache";
  cacheLife("hours");
  cacheTag("orders");

  const supabase = createSupabaseServerAdminClient();
  console.log("fetching pending orders count");
  return await supabase
    .from("orders")
    .select("*", { count: "estimated" })
    .eq("delivered", false);
}

export async function adminGetOrdersCompletionPercentage() {
  "use cache";
  cacheLife("hours");
  cacheTag("orders");

  const supabase = createSupabaseServerAdminClient();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const [{ count: totalCount }, { count: deliveredCount }] = await Promise.all([
    supabase
      .from("orders")
      .select("*", { count: "estimated" })
      .gte("created_at", thirtyDaysAgo),
    supabase
      .from("orders")
      .select("*", { count: "estimated" })
      .gte("created_at", thirtyDaysAgo)
      .eq("delivered", true),
  ]);
  return totalCount ? ((deliveredCount ?? 0) * 100) / totalCount : 0;
}
