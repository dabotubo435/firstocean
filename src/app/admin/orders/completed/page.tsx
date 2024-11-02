import {
  OrderRow,
  OrderRowEmpty,
  OrderRowHeader,
} from "@/components/order/order-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { createSupabaseServerClient } from "@/supabase/server";
import { SearchIcon } from "lucide-react";
import { cookies } from "next/headers";

export default async function OrdersArchive() {
  const supabase = createSupabaseServerClient(cookies());
  const { data: orders } = await supabase
    .from("orders")
    .select()
    .eq("delivered", true)
    .order("created_at", { ascending: false });

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Completed Orders</h2>
        </div>

        <div className="flex max-w-md ml-auto mb-2 items-center gap-2">
          <Input type="search" name="search" placeholder="Search orders" />
          <Button size="icon" className="shrink-0">
            <SearchIcon className="size-5" />
          </Button>
        </div>

        <Table>
          <TableCaption>All completed orders.</TableCaption>
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
