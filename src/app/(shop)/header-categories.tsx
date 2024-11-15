import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getCategories } from "@/supabase/data/categories";
import Link from "next/link";

export async function HeaderCategories() {
  const { data: categories } = await getCategories();

  return (
    <DropdownMenuContent className="max-h-80 min-w-48 overflow-y-scroll">
      {categories?.map((category, index) => (
        <DropdownMenuItem
          key={index}
          asChild
          className="flex text-xs gap-2 items-center p-2 cursor-pointer hover:bg-gray-200"
        >
          <Link href={`/products?category=${category.id}`}>
            {category.name}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}
