import { IOrder } from "@/supabase/entities/order";
import { currency } from "@/utils/formatter";
import Link from "next/link";
import { TableCell, TableHead, TableRow } from "../ui/table";

type Props = {
  order: IOrder;
};

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

export function OrderRow({ order }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>{order.paid ? "Yes" : "No"}</TableCell>
      <TableCell>{order.delivered ? "Yes" : "No"}</TableCell>
      <TableCell>{currency.format(order.amount)}</TableCell>
      <TableCell className="text-right">
        <Link href={`/admin/orders/${order.id}`} className="hover:underline">
          View order &rarr;
        </Link>
      </TableCell>
    </TableRow>
  );
}
