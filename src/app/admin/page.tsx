import {
  OrderRow,
  OrderRowEmpty,
  OrderRowHeader,
} from "@/components/order/order-row";
import { Button } from "@/components/ui/button";
import { FormStatus, NextForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { adminGetTotalCategories } from "@/supabase/data/categories";
import {
  adminGetOrdersCompletionPercentage,
  adminGetPendingOrdersCount,
} from "@/supabase/data/orders";
import { adminGetTotalProducts } from "@/supabase/data/products";
import { createSupabaseServerClient } from "@/supabase/server";
import { InfoIcon, LoaderCircleIcon, PlusIcon, SearchIcon } from "lucide-react";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Admin() {
  return (
    <main className="space-y-8">
      <section className="grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Suspense>
          <PendingOrders />
          <Products />
          <Categories />
          <Summary />
        </Suspense>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl">Recent orders</h2>
        </div>
        <Suspense>
          <Orders />
        </Suspense>
      </section>
    </main>
  );
}

async function PendingOrders() {
  const { count } = await adminGetPendingOrdersCount();

  const findOrder = async (formData: FormData) => {
    "use server";
    redirect(`/admin/orders/${formData.get("id")}`);
  };

  return (
    <div className="border bg-muted p-3 rounded-2xl flex flex-col">
      <p className="text-sm sm:text-lg font-semibold">Pending orders</p>
      <p className="font-semibold text-xl sm:text-2xl mt-6">
        {(count ?? 0).toLocaleString()}
      </p>

      <div className="my-4">
        <NextForm action={findOrder} className="flex items-center gap-2">
          <Input type="tel" name="id" placeholder="Enter order ID" />
          <FormStatus>
            <Button size="icon" className="shrink-0">
              <SearchIcon className="size-5 group-data-[pending=true]:hidden" />
              <LoaderCircleIcon className="size-5 animate-spin hidden group-data-[pending=true]:inline" />
            </Button>
          </FormStatus>
        </NextForm>
        <p className="text-xs px-1 mt-1">Enter Order ID to search for order</p>
      </div>

      <div>
        <Button asChild size="sm" variant="outline">
          <Link href="/admin/orders">View orders &rarr;</Link>
        </Button>
      </div>
    </div>
  );
}

async function Products() {
  const { count } = await adminGetTotalProducts();

  return (
    <div className="border bg-muted p-3 rounded-2xl flex flex-col">
      <p className="text-sm sm:text-lg font-semibold">Products</p>
      <p className="font-semibold text-xl sm:text-2xl mt-6">
        {(count ?? 0).toLocaleString()}
      </p>

      <div className="my-4">
        <p className="opacity-80 text-sm sm:text-base">Products in stock</p>
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
  );
}

async function Categories() {
  const { count } = await adminGetTotalCategories();

  return (
    <div className="border bg-muted p-3 rounded-2xl flex flex-col">
      <p className="text-sm sm:text-lg font-semibold">Categories</p>
      <p className="font-semibold text-xl sm:text-2xl mt-6">
        {(count ?? 0).toLocaleString()}
      </p>

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
  );
}

async function Summary() {
  "use cache";
  cacheLife("hours");
  cacheTag("orders");

  const percentage = await adminGetOrdersCompletionPercentage();

  return (
    <div className="border bg-muted p-3 rounded-2xl flex flex-col">
      <p className="text-sm sm:text-lg font-semibold">Summary</p>
      <div className="flex items-baseline gap-2">
        <p className="font-semibold text-3xl sm:text-4xl mt-6">
          {percentage.toFixed(2)}%
        </p>
        <span className="text-base sm:text-lg">order completion</span>
      </div>

      <div className="mt-auto">
        <p className="text-xs flex items-center">
          <InfoIcon className="size-3 mr-1" />
          <span>Summary is taken from the last 30 days</span>
        </p>
      </div>
    </div>
  );
}

async function Orders() {
  const supabase = createSupabaseServerClient(await cookies());
  const { data: orders } = await supabase
    .from("orders")
    .select()
    .order("created_at", { ascending: false });

  return (
    <Table>
      <TableCaption>Recent orders.</TableCaption>
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
  );
}
