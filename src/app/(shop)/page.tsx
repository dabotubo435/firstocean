import { ProductItem } from "@/components/product/product-item";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/supabase/data/categories";
import { createSupabaseServerAnonymousClient } from "@/supabase/server";
import { ChevronDownIcon } from "lucide-react";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { addToCart } from "./checkout/actions";

export default function Home() {
  return (
    <main className="!pt-0 space-y-12">
      <section className="container max-w-6xl px-0">
        <Carousel opts={{ loop: true }}>
          <CarouselPrevious />
          <CarouselContent>
            {Array.from({ length: 11 }).map((_, i) => (
              <CarouselItem key={i} className="relative h-80 md:h-96">
                <Image
                  fill
                  priority
                  src={`/slideshow/slide-${i + 1}.jpg`}
                  alt={`slide ${i + 1}`}
                  className="absolute inset-0 object-cover object-center"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>

        <div className="mt-4 px-4 lg:px-0 flex flex-col items-center sm:flex-row sm:items-start sm:justify-between gap-x-2 gap-y-4">
          <Collapsible className="group flex flex-col items-center sm:items-start text-center sm:text-left">
            <CollapsibleTrigger asChild>
              <h1 className="text-lg lg:text-xl font-bold text-secondary">
                Welcome to First Ocean Supermarket! your premier shopping
                destination
              </h1>
            </CollapsibleTrigger>
            <p className="pointer-events-none group-data-[state=open]:pointer-events-auto py-2 opacity-0 max-h-0 group-data-[state=open]:opacity-100 group-data-[state=open]:max-h-80 transition-[max-height,opacity] duration-500">
              Located in Ikosi-Ketu, Lagos. We offer a wide variety of
              high-quality products, from fresh produce to international brands,
              all at competitive prices. Our modern store provides a welcoming
              environment, with knowledgeable staff ready to assist. We
              prioritize customer satisfaction by delivering excellent service,
              convenience, and quality. Whether you're a regular shopper or a
              first-time visitor, First Ocean Supermarket ensures an exceptional
              shopping experience every time.
            </p>
            <CollapsibleTrigger className="flex flex-col sm:flex-row items-center justify-center gap-x-1">
              <span className="text-xs text-muted-foreground">
                View{" "}
                <span className="group-data-[state=open]:hidden">more</span>
                <span className="hidden group-data-[state=open]:inline">
                  less
                </span>
              </span>
              <ChevronDownIcon className="size-4 group-data-[state=open]:-rotate-180 transition-transform duration-500" />
            </CollapsibleTrigger>
          </Collapsible>

          <Button size="lg">
            <Link href="/products">Shop now &rarr;</Link>
          </Button>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="container max-w-6xl">
        <h2 className="text-xl font-semibold text-center text-primary mb-6">
          Shop by Category
        </h2>
        <Suspense fallback={<CategoriesGridLoader />}>
          <CategoriesGrid />
        </Suspense>
      </section>

      {/* Popular Products Section  */}
      <section className="container max-w-6xl">
        <h2 className="text-xl font-semibold text-center text-primary mb-6">
          Shop Products
        </h2>
        <Suspense fallback={<ProductsGridLoader />}>
          <ProductsGrid />
        </Suspense>
      </section>
    </main>
  );
}

async function CategoriesGrid() {
  const { data: categories } = await getCategories();

  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
      {categories?.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.id}`}
          className="border py-3 text-center rounded-md hover:bg-primary/80"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

function CategoriesGridLoader() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-10" />
      ))}
    </div>
  );
}

async function ProductsGrid() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const supabase = createSupabaseServerAnonymousClient();
  const { data: products } = await supabase
    .from("products")
    .select()
    .limit(30)
    .order("created_at", { ascending: false });

  return products?.length ? (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
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
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );
}
