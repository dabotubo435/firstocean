import { Tables } from "@/supabase/types";
import { currency } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { TableCell, TableHead, TableRow } from "../ui/table";

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

type Props = {
  product: Tables<"products"> & {
    categories: Pick<Tables<"categories">, "name"> | null;
  };
};

export function ProductRow({ product }: Props) {
  return (
    <TableRow className="overflow-x-scroll">
      <TableCell className="font-medium p-2 text-center">
        {product.id}
      </TableCell>
      <TableCell className="p-2">
        <Link
          href={`/admin/products/${product.id}`}
          className="flex gap-2 items-center"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={40}
            height={40}
            className="aspect-square object-cover"
          />
          <p>{product.name}</p>
        </Link>
      </TableCell>
      <TableCell className="p-2">
        {product.category_id && (
          <Link
            href={`/admin/categories/${product.category_id}`}
            className="hover:underline"
          >
            {product.categories?.name}
          </Link>
        )}
      </TableCell>
      <TableCell className="p-2 font-medium">
        {currency.format(product.price)}
      </TableCell>
      <TableCell className="text-right p-2">
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
