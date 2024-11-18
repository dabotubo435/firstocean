import { ProductItem } from "@/components/product/product-item";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FormStatus, NextForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/supabase/data/categories";
import { createSupabaseServerAnonymousClient } from "@/supabase/server";
import {
  CheckIcon,
  ChevronDownIcon,
  LoaderCircleIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { addToCart } from "../checkout/actions";

export default async function Products(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  return (
    <main className="container max-w-6xl">
      <section className="flex flex-col sm:flex-row gap-4 sm:divide-x">
        <div className="sm:w-48 md:w-60">
          <Collapsible defaultOpen className="group">
            <CollapsibleTrigger className="w-full mb-6 flex items-center justify-between">
              <p className="font-medium mb-1">Filter Categories</p>
              <ChevronDownIcon className="size-4 group-data-[state=open]:rotate-180 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Suspense>
                <CategoriesList searchParams={props.searchParams} />
              </Suspense>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="flex-1 sm:pl-2">
          <Suspense>
            <FilterSearch searchParams={props.searchParams} />
          </Suspense>

          <Suspense fallback={<ProductsGridLoader />}>
            <ProductsGrid searchParams={props.searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

async function FilterSearch(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex justify-between items-center gap-4 mb-8">
      <Suspense>
        <Button
          data-hide={!searchParams.category}
          variant="outline"
          className="text-xs data-[hide=true]:hidden"
          asChild
        >
          <Link href="/products">
            <XIcon className="size-4 mr-1" /> Clear filter
          </Link>
        </Button>
      </Suspense>

      <NextForm
        action=""
        className="flex flex-1 max-w-md ml-auto items-center gap-2"
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
  );
}

async function CategoriesList(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const { data: categories } = await getCategories();

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
    <div className="divide-y max-h-40 overflow-y-scroll">
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

async function ProductsGrid(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const supabase = createSupabaseServerAnonymousClient();
  const query = supabase.from("products").select().order("name");
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
    <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
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
    <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );
}
