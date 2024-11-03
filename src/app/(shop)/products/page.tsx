import { ProductItem } from "@/components/product/product-item";
import { Button } from "@/components/ui/button";
import { FormStatus, NextForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { createSupabaseServerAnonymousClient } from "@/supabase/server";
import { CheckIcon, LoaderCircleIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { addToCart } from "../checkout/actions";

export default async function Products(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  return (
    <main className="p-10 px-5 md:px-16">
      <div className="grid sm:grid-cols-5 sm:divide-x gap-4">
        <div className="sm:col-span-1">
          <p className="mb-6">Filter categories</p>
          <Suspense fallback={null}>
            <CategoriesList searchParams={searchParams} />
          </Suspense>
        </div>

        <div className="sm:col-span-4 sm:px-4">
          <div className="flex justify-between items-center gap-4 mb-8">
            <Button
              data-hide={!searchParams.category}
              variant="outline"
              className="text-xs data-[hide=true]:invisible"
              asChild
            >
              <Link href="/products">
                <XIcon className="size-4 mr-1" /> Clear filter
              </Link>
            </Button>

            <NextForm
              action=""
              className="flex flex-1 max-w-md items-center gap-2"
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
          </div>

          <Suspense fallback={<ProductsGridLoader />}>
            <ProductsGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function CategoriesList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const supabase = createSupabaseServerAnonymousClient();
  const { data: categories } = await supabase
    .from("categories")
    .select()
    .order("name");

  const categoriesSearch = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
    ? [searchParams.category]
    : [];
  // convert multiple nextjs searchParams to URLSearchParams
  const params = new URLSearchParams(searchParams);
  if (Array.isArray(searchParams.category)) {
    params.delete("category");
    for (const val of searchParams.category) {
      params.append("category", val);
    }
  }

  return (
    <div className="divide-y">
      {categories?.map((category) => {
        const checked = categoriesSearch.includes(category.id.toString());
        const clone = new URLSearchParams(params);
        if (checked) clone.delete("category", category.id.toString());
        else clone.append("category", category.id.toString());

        return (
          <Link
            key={category.id}
            href={`/products?${clone}`}
            className="py-2 group hover:text-primary text-xs flex justify-between items-center"
          >
            <span>{category.name}</span>
            <span
              data-checked={checked}
              className="bg-zinc-100 group data-[checked=true]:bg-primary p-px"
            >
              <CheckIcon className="size-3 invisible group-data-[checked=true]:visible text-white" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

async function ProductsGrid({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const supabase = createSupabaseServerAnonymousClient();
  const query = supabase
    .from("products")
    .select()
    .order("created_at", { ascending: false });
  if (searchParams.search) query.ilike("image", `%${searchParams.search}%`);
  if (searchParams.search) query.ilike("image", `%${searchParams.search}%`);
  const categoriesSearch = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
    ? [searchParams.category]
    : [];
  if (categoriesSearch.length) query.in("category_id", categoriesSearch);
  const { data: products } = await query;

  return products?.length ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  ) : (
    <div className="py-24 text-center">
      <p>No products found</p>
    </div>
  );
}

function ProductsGridLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="h-80" />
      ))}
    </div>
  );
}
