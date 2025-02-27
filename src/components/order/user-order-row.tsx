import { Tables } from "@/supabase/types";
import { currency } from "@/utils/formatter";
import { CheckIcon, InfoIcon } from "lucide-react";
import { ProductInactiveCartItem } from "../product/product-inactive-cart-item";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TableCell, TableHead, TableRow } from "../ui/table";

export function UserOrderRowHeader() {
  return (
    <TableRow>
      <TableHead className="w-[100px]">Order ID</TableHead>
      <TableHead>Paid</TableHead>
      <TableHead>Delivered</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead className="text-right">View</TableHead>
    </TableRow>
  );
}

export function UserOrderRowEmpty() {
  return (
    <TableRow>
      <TableCell
        colSpan={5}
        className="text-center text-muted-foreground py-16"
      >
        No orders found
      </TableCell>
    </TableRow>
  );
}

type OrderProduct = Tables<"order_products"> & {
  product: Tables<"products"> | null;
};
type Props = {
  order: Tables<"orders"> & { order_products: OrderProduct[] };
};

export function UserOrderRow({ order }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>
        {order.paid ? (
          <p className="text-green-600 flex items-center">
            <CheckIcon className="size-3.5 mr-1" />{" "}
            <span className="hidden lg:inline">Paid</span>
          </p>
        ) : (
          <p className="text-yellow-600 flex items-center">
            <InfoIcon className="size-3.5 mr-1" />{" "}
            <span className="hidden lg:inline">Pending payment</span>
          </p>
        )}
      </TableCell>
      <TableCell>
        {order.delivered ? (
          <p className="text-green-600 flex items-center">
            <CheckIcon className="size-3.5 mr-1" />{" "}
            <span className="hidden lg:inline">Delivered</span>
          </p>
        ) : (
          <p className="text-yellow-600 flex items-center">
            <InfoIcon className="size-3.5 mr-1" />{" "}
            <span className="hidden lg:inline">Pending delivery</span>
          </p>
        )}
      </TableCell>
      <TableCell className="font-medium">
        {currency.format(order.amount)}
      </TableCell>
      <TableCell className="text-right">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              View items ({order.order_products.length})
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Order Items</DialogTitle>
            <DialogDescription className="sr-only">
              View order items
            </DialogDescription>
            <div>
              <div className="overflow-y-auto max-h-80 divide-y">
                {order.order_products.map(
                  ({ product_id, product, quantity }) => (
                    <ProductInactiveCartItem
                      key={product_id}
                      product={product}
                      quantity={quantity}
                    />
                  )
                )}
              </div>

              <div className="mt-4">
                <p className="text-base text-right font-medium">
                  Total: {currency.format(order.amount)}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
