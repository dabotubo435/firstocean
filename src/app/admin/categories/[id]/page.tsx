import {
  ProductRow,
  ProductRowEmpty,
  ProductRowHeader,
} from "@/components/product/product-row";
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
import { notFound } from "next/navigation";
import { UpdateCategory } from "./update";

export default async function Category({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string>;
}) {
  const supabase = createSupabaseServerClient(cookies());
  const categoriesQuery = supabase
    .from("categories")
    .select()
    .eq("id", params.id)
    .limit(1)
    .single();

  const productsQuery = supabase
    .from("products")
    .select("*, categories(name)")
    .eq("category_id", params.id)
    .order("created_at", { ascending: false });
  if (searchParams.search) {
    productsQuery.ilike("name", `%${searchParams.search}%`);
  }

  const [{ data: category }, { data: products }] = await Promise.all([
    categoriesQuery,
    productsQuery,
  ]);

  if (!category) notFound();

  return (
    <main>
      <section>
        <UpdateCategory category={category} />
      </section>

      <section className="mt-16">
        <form className="flex max-w-md ml-auto mb-2 items-center gap-2">
          <Input
            defaultValue={searchParams.search}
            type="search"
            name="search"
            placeholder="Search products"
          />
          <Button size="icon" className="shrink-0">
            <SearchIcon className="size-5" />
          </Button>
        </form>

        <Table>
          <TableCaption>Products</TableCaption>
          <TableHeader>
            <ProductRowHeader />
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
            {!products?.length && <ProductRowEmpty />}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
