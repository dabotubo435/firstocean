import {
  OrderProductRow,
  OrderProductRowEmpty,
  OrderProductRowHeader,
} from "@/components/order/order-product-row";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { createSupabaseServerClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { UpdateOrder } from "./update";

export default async function Order(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const supabase = createSupabaseServerClient(await cookies());
  const { data: order } = await supabase
    .from("orders")
    .select("*, order_products(*, product:products(*))")
    .eq("id", params.id)
    .single();
  if (!order) notFound();

  return (
    <main>
      <section className="grid lg:grid-cols-5 gap-8 xl:gap-12">
        <div className="lg:col-span-3">
          <UpdateOrder order={order} />
        </div>
        <div className="lg:col-span-2">
          <OrderUserProfile userId={order.user_id} />
        </div>
      </section>

      <section className="mt-16">
        <Table>
          <TableCaption>Order products.</TableCaption>
          <TableHeader>
            <OrderProductRowHeader />
          </TableHeader>
          <TableBody>
            {order.order_products?.map((orderProduct) => (
              <OrderProductRow
                key={orderProduct.product_id}
                orderProduct={orderProduct}
              />
            ))}
            {!order.order_products?.length && <OrderProductRowEmpty />}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}

async function OrderUserProfile({ userId }: { userId: string }) {
  const supabase = createSupabaseServerClient(await cookies());
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  return (
    <div className="pt-6">
      <h2 className="mb-2 text-base font-semibold">User information</h2>

      <div className="divide-y">
        <div className="flex items-center justify-between py-4">
          <p>Email</p>
          <p>{profile?.email || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p>Name</p>
          <p>{profile?.name || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p>Address</p>
          <p>{profile?.address || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p>City</p>
          <p>{profile?.city || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p>State/Province</p>
          <p>{profile?.state || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p>Country</p>
          <p>{profile?.country || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p>Nationality</p>
          <p>{profile?.nationality || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
