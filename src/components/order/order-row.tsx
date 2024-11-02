import { Tables } from "@/supabase/types";
import { currency } from "@/utils/formatter";
import { CheckIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { TableCell, TableHead, TableRow } from "../ui/table";

export function OrderRowHeader() {
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

export function OrderRowEmpty() {
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

type Props = {
  order: Tables<"orders">;
};

export function OrderRow({ order }: Props) {
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
        <Link href={`/admin/orders/${order.id}`} className="hover:underline">
          View order &rarr;
        </Link>
      </TableCell>
    </TableRow>
  );
}
