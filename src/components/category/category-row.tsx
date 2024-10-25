import { ICategory } from "@/supabase/entities/category";
import Image from "next/image";
import Link from "next/link";
import { TableCell, TableHead, TableRow } from "../ui/table";

type Props = {
  category: ICategory;
};

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

export function CategoryRow({ category }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell className="flex gap-2 items-center">
        <Image
          src="/banner.jpg"
          alt={category.category_name}
          width={40}
          height={40}
        />
        <p>{category.category_name}</p>
      </TableCell>
      <TableCell className="text-right">
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
