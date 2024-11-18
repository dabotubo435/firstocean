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

export default async function Products(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const supabase = createSupabaseServerClient(await cookies());
  const query = supabase
    .from("products")
    .select("*, category:categories(name)")
    .order("name");
  if (searchParams.search) {
    query.ilike("name", `%${searchParams.search}%`);
  }
  const { data: products } = await query;

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">All Products</h2>
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
          <TableCaption>All products.</TableCaption>
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
