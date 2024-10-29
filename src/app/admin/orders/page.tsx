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

export default async function Orders({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const supabase = createSupabaseServerClient(cookies());
  const query = supabase.from("orders").select().eq("delivered", false);
  if (searchParams.search) {
    query.ilike("id", `%${searchParams.search}%`);
  }
  const { data: orders } = await query;

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Pending Orders</h2>
        </div>

        <form className="flex max-w-md ml-auto mb-2 items-center gap-2">
          <Input
            defaultValue={searchParams.search}
            type="search"
            name="search"
            placeholder="Search orders"
          />
          <Button size="icon" className="shrink-0">
            <SearchIcon className="size-5" />
          </Button>
        </form>

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
