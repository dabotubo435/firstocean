import {
  CategoryRow,
  CategoryRowEmpty,
  CategoryRowHeader,
} from "@/components/category/category-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { ICategory } from "@/supabase/entities/category";
import { SearchIcon } from "lucide-react";

export default function Categories() {
  const categories: ICategory[] = [
    {
      id: "1",
      category_name: "Snacks",
    },
    {
      id: "2",
      category_name: "Clothing",
    },
    {
      id: "3",
      category_name: "Food",
    },
  ];

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">All Categories</h2>
        </div>

        <div className="flex max-w-md ml-auto mb-2 items-center gap-2">
          <Input placeholder="Search categories" />
          <Button size="icon" className="shrink-0">
            <SearchIcon className="size-5" />
          </Button>
        </div>

        <Table>
          <TableCaption>All categories.</TableCaption>
          <TableHeader>
            <CategoryRowHeader />
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <CategoryRow key={category.id} category={category} />
            ))}
            {!categories.length && <CategoryRowEmpty />}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
