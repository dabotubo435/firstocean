import { Tables } from "@/supabase/types";
import { currency } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { TableCell, TableHead, TableRow } from "../ui/table";

export function OrderProductRowHeader() {
  return (
    <TableRow>
      <TableHead className="w-[100px]">Product ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead className="text-right">View</TableHead>
    </TableRow>
  );
}

export function OrderProductRowEmpty() {
  return (
    <TableRow>
      <TableCell
        colSpan={5}
        className="text-center text-muted-foreground py-16"
      >
        No order products found
      </TableCell>
    </TableRow>
  );
}

type Props = {
  orderProduct: Tables<"order_products"> & {
    product: Tables<"products"> | null;
  };
};

export function OrderProductRow({
  orderProduct: { product, product_id, quantity },
}: Props) {
  return (
    <TableRow className="overflow-x-scroll">
      <TableCell className="font-medium p-2 text-center">
        {product_id}
      </TableCell>
      <TableCell className="p-2">
        <Link
          href={`/admin/products/${product_id}`}
          className="flex gap-2 items-center"
        >
          <Image
            src={product?.image ?? "/placeholder.jpg"}
            alt={product?.name ?? "[deleted product]"}
            width={40}
            height={40}
            className="aspect-square object-cover"
          />
          <p>{product?.name ?? "[deleted product]"}</p>
        </Link>
      </TableCell>
      <TableCell className="p-2 font-medium">
        {currency.format(product?.price ?? 0)}
      </TableCell>
      <TableCell className="p-2">{quantity}</TableCell>
      <TableCell className="text-right p-2">
        <Link
          href={`/admin/products/${product_id}`}
          className="hover:underline"
        >
          View product &rarr;
        </Link>
      </TableCell>
    </TableRow>
  );
}
