import { OrderRow, OrderRowHeader } from "@/components/order/order-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { IOrder } from "@/supabase/entities/order";
import { SearchIcon } from "lucide-react";

export default function Orders({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const orders: IOrder[] = [
    {
      id: "1",
      cartId: "11",
      amount: 4500,
      delivered: false,
      paid: false,
    },
    {
      id: "2",
      cartId: "12",
      amount: 12300,
      delivered: false,
      paid: true,
    },
  ];

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Pending Orders</h2>
        </div>

        <form className="flex max-w-md ml-auto mb-2 items-center gap-2">
          <Input
            defaultValue={searchParams.search}
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
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
