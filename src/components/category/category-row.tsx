import { Tables } from "@/supabase/types";
import Image from "next/image";
import Link from "next/link";
import { TableCell, TableHead, TableRow } from "../ui/table";

export function CategoryRowHeader() {
  return (
    <TableRow>
      <TableHead className="w-[120px]">Category ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead className="text-right">View</TableHead>
    </TableRow>
  );
}

export function CategoryRowEmpty() {
  return (
    <TableRow>
      <TableCell
        colSpan={3}
        className="text-center text-muted-foreground py-16"
      >
        No products found
      </TableCell>
    </TableRow>
  );
}

type Props = {
  category: Tables<"categories">;
};

export function CategoryRow({ category }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium text-center p-3">
        {category.id}
      </TableCell>
      <TableCell className="p-3">
        <Link
          href={`/admin/categories/${category.id}`}
          className="flex gap-2 items-center"
        >
          <Image
            src={category.image ?? "/placeholder.jpg"}
            alt={category.name}
            width={40}
            height={40}
            className="aspect-square object-cover"
          />
          <p>{category.name}</p>
        </Link>
      </TableCell>
      <TableCell className="text-right p-3">
        <Link
          href={`/admin/categories/${category.id}`}
          className="hover:underline"
        >
          View category &rarr;
        </Link>
      </TableCell>
    </TableRow>
  );
}
