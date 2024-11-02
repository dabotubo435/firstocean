import {
  OrderRow,
  OrderRowEmpty,
  OrderRowHeader,
} from "@/components/order/order-row";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { createSupabaseServerClient } from "@/supabase/server";
import { cookies } from "next/headers";

export default async function Orders() {
  const supabase = createSupabaseServerClient(cookies());
  const { data: orders } = await supabase
    .from("orders")
    .select()
    .eq("delivered", false)
    .order("created_at", { ascending: false });

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Pending Orders</h2>
        </div>

        <Table>
          <TableCaption>Pending orders.</TableCaption>
          <TableHeader>
            <OrderRowHeader />
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
            {!orders?.length && <OrderRowEmpty />}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
