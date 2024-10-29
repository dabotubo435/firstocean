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

export default async function Products({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const supabase = createSupabaseServerClient(cookies());
  const query = supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });
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
