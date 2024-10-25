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
import { IOrder } from "@/supabase/entities/order";
import { InfoIcon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default async function Admin() {
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
    {
      id: "3",
      cartId: "13",
      amount: 4500,
      delivered: true,
      paid: true,
    },
  ];

  return (
    <main className="space-y-8">
      <section className="grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="border bg-muted p-3 rounded-2xl flex flex-col">
          <p className="text-sm sm:text-lg font-semibold">Pending orders</p>
          <p className="font-semibold text-xl sm:text-2xl mt-6">320,392,000</p>

          <div className="my-4">
            <form action="/admin/orders" className="flex items-center gap-2">
              <Input name="search" placeholder="Enter order ID" />
              <Button size="icon" className="shrink-0">
                <SearchIcon className="size-5" />
              </Button>
            </form>
            <p className="text-xs px-1 mt-1">
              Enter Order ID to search for order
            </p>
          </div>

          <div>
            <Button asChild size="sm" variant="outline">
              <Link href="/admin/orders">View orders &rarr;</Link>
            </Button>
          </div>
        </div>

        <div className="border bg-muted p-3 rounded-2xl flex flex-col">
          <p className="text-sm sm:text-lg font-semibold">Products</p>
          <p className="font-semibold text-xl sm:text-2xl mt-6">320,392,000</p>

          <div className="my-4">
            <p className="opacity-80 text-sm sm:text-base">420 unlisted</p>
          </div>

          <div className="mt-auto">
            <div className="flex gap-2 items-center justify-between">
              <Button asChild size="sm" variant="link" className="px-0">
                <Link href="/admin/products">View products &rarr;</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/admin/products/create">
                  <PlusIcon className="size-4 mr-1" /> Create
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border bg-muted p-3 rounded-2xl flex flex-col">
          <p className="text-sm sm:text-lg font-semibold">Categories</p>
          <p className="font-semibold text-xl sm:text-2xl mt-6">320,392,000</p>

          <div className="mt-auto">
            <div className="flex gap-2 items-center justify-between">
              <Button size="sm" variant="link" className="px-0">
                <Link href="/admin/categories">View categories &rarr;</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/admin/categories/create">
                  <PlusIcon className="size-4 mr-1" /> Create
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border bg-muted p-3 rounded-2xl flex flex-col">
          <p className="text-sm sm:text-lg font-semibold">Summary</p>
          <div className="flex items-baseline gap-2">
            <p className="font-semibold text-3xl sm:text-4xl mt-6">98%</p>
            <span className="text-base sm:text-lg">order completion</span>
          </div>

          <div className="mt-auto">
            <p className="text-xs flex items-center">
              <InfoIcon className="size-3 mr-1" />
              <span>Summary is taken from the last 30 days</span>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl">Recent orders</h2>
        </div>

        <Table>
          <TableCaption>Recent orders.</TableCaption>
          <TableHeader>
            <OrderRowHeader />
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
            {!orders.length && <OrderRowEmpty />}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
