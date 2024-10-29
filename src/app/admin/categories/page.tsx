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
import { createSupabaseServerClient } from "@/supabase/server";
import { SearchIcon } from "lucide-react";
import { cookies } from "next/headers";

export default async function Categories({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const supabase = createSupabaseServerClient(cookies());
  const query = supabase.from("categories").select().order("name");
  if (searchParams.search) {
    query.ilike("name", `%${searchParams.search}%`);
  }
  const { data: categories } = await query;

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">All Categories</h2>
        </div>

        <form className="flex max-w-md ml-auto mb-2 items-center gap-2">
          <Input
            defaultValue={searchParams.search}
            type="search"
            name="search"
            placeholder="Search categories"
          />
          <Button size="icon" className="shrink-0">
            <SearchIcon className="size-5" />
          </Button>
        </form>

        <Table>
          <TableCaption>All categories.</TableCaption>
          <TableHeader>
            <CategoryRowHeader />
          </TableHeader>
          <TableBody>
            {categories?.map((category) => (
              <CategoryRow key={category.id} category={category} />
            ))}
            {!categories?.length && <CategoryRowEmpty />}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
