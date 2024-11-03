import {
  UserOrderRow,
  UserOrderRowEmpty,
  UserOrderRowHeader,
} from "@/components/order/user-order-row";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { createSupabaseServerClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UpdateProfile } from "./update";

export default async function Account() {
  const supabase = createSupabaseServerClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user.id)
    .single();

  return (
    <main>
      <div className="container py-10 flex flex-col sm:flex-row gap-8">
        <section className="justify-self-center sm:justify-self-auto flex flex-col items-center gap-4">
          <div className="size-40 flex items-center justify-center rounded-full border border-primary/50 bg-primary/20">
            <p className="uppercase text-5xl text-secondary">
              {user.email?.[0] ?? "?"}
            </p>
          </div>
          <p>{user.email}</p>
        </section>

        <div className="sm:flex-1 space-y-8">
          <UpdateProfile user={user} profile={profile} />

          <OrderHistory userId={user.id} />
        </div>
      </div>
    </main>
  );
}

async function OrderHistory({ userId }: { userId: string }) {
  const supabase = createSupabaseServerClient(await cookies());
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_products(*, product:products(*))")
    .eq("user_id", userId);

  return (
    <section>
      <h2 className="text-lg mb-4 font-medium">Order history</h2>

      <Table>
        <TableCaption>Recent orders.</TableCaption>
        <TableHeader>
          <UserOrderRowHeader />
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <UserOrderRow key={order.id} order={order} />
          ))}
          {!orders?.length && <UserOrderRowEmpty />}
        </TableBody>
      </Table>
    </section>
  );
}
