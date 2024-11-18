import {
  ProductRow,
  ProductRowEmpty,
  ProductRowHeader,
} from "@/components/product/product-row";
import { Button } from "@/components/ui/button";
import { FormStatus, NextForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { createSupabaseServerClient } from "@/supabase/server";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { UpdateCategory } from "./update";

export default async function Category(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const supabase = createSupabaseServerClient(await cookies());
  const categoriesQuery = supabase
    .from("categories")
    .select()
    .eq("id", params.id)
    .single();

  const productsQuery = supabase
    .from("products")
    .select()
    .eq("category_id", params.id)
    .order("name");
  if (searchParams.search) {
    productsQuery.ilike("name", `%${searchParams.search}%`);
  }

  const [{ data: category }, { data: products }] = await Promise.all([
    categoriesQuery,
    productsQuery,
  ]);
  const productsWithCategory = products?.map((product) => ({
    ...product,
    category: category ? { name: category.name } : null,
  }));

  if (!category) notFound();

  return (
    <main>
      <section>
        <UpdateCategory category={category} />
      </section>

      <section className="mt-16">
        <div className="mb-4">
          <h2 className="text-xl">Products</h2>
        </div>

        <NextForm
          action=""
          className="flex max-w-md ml-auto mb-2 items-center gap-2"
        >
          <Input
            defaultValue={searchParams.search}
            type="search"
            name="search"
            placeholder="Search products"
          />
          <FormStatus>
            <Button size="icon" className="shrink-0">
              <SearchIcon className="size-5 group-data-[pending=true]:hidden" />
              <LoaderCircleIcon className="size-5 animate-spin hidden group-data-[pending=true]:inline" />
            </Button>
          </FormStatus>
        </NextForm>

        <Table>
          <TableCaption>Products</TableCaption>
          <TableHeader>
            <ProductRowHeader />
          </TableHeader>
          <TableBody>
            {productsWithCategory?.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
            {!products?.length && <ProductRowEmpty />}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
