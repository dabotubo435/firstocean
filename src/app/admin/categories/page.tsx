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
import { FormStatus } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import NextForm from "next/form";
import { cookies } from "next/headers";

export default async function Categories(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const supabase = createSupabaseServerClient(await cookies());
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

        <NextForm
          action=""
          className="flex max-w-md ml-auto mb-2 items-center gap-2"
        >
          <Input
            defaultValue={searchParams.search}
            type="search"
            name="search"
            placeholder="Search categories"
          />
          <FormStatus>
            <Button size="icon" className="shrink-0">
              <SearchIcon className="size-5 group-data-[pending=true]:hidden" />
              <LoaderCircleIcon className="size-5 animate-spin hidden group-data-[pending=true]:inline" />
            </Button>
          </FormStatus>
        </NextForm>

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
