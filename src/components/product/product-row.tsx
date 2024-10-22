import { IProduct } from "@/supabase/entities/product";
import { currency } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { TableCell, TableHead, TableRow } from "../ui/table";

type Props = {
  product: IProduct;
};

export function ProductRowHeader() {
  return (
    <TableRow>
      <TableHead className="w-[100px]">Product ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Category</TableHead>
      <TableHead>Price</TableHead>
      <TableHead className="text-right">View</TableHead>
    </TableRow>
  );
}

export function ProductRowEmpty() {
  return (
    <TableRow>
      <TableCell
        colSpan={5}
        className="text-center text-muted-foreground py-16"
      >
        No products found
      </TableCell>
    </TableRow>
  );
}

export function ProductRow({ product }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell className="flex gap-2 items-center">
        <Image src={product.image} alt={product.title} width={40} height={40} />
        <p>{product.title}</p>
      </TableCell>
      <TableCell>
        <Link
          href={`/admin/categories/${product.category}`}
          className="hover:underline"
        >
          {product.category}
        </Link>
      </TableCell>
      <TableCell>{currency.format(product.price)}</TableCell>
      <TableCell className="text-right">
        <Link
          href={`/admin/products/${product.id}`}
          className="hover:underline"
        >
          View product &rarr;
        </Link>
      </TableCell>
    </TableRow>
  );
}
