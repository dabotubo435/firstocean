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

export default function OrdersArchive() {
  const orders: IOrder[] = [
    {
      id: "3",
      cartId: "13",
      amount: 4500,
      delivered: true,
      paid: true,
    },
  ];

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Completed Orders</h2>
        </div>

        <div className="flex max-w-md ml-auto mb-2 items-center gap-2">
          <Input name="search" placeholder="Search orders" />
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
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
