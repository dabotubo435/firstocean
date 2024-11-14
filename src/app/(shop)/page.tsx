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
    <main>
      <section>
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

        <div className="flex px-6 justify-between items-center mt-8 max-w-4xl mx-auto gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary">
            Welcome to First Ocean Supermarket!
          </h1>
          <Button size="lg">
            <Link href="/products">Shop now &rarr;</Link>
          </Button>
        </div>
        <p className="text-center mt-5 mb-8 text-secondary">
          The best place to find your everyday essentials.
        </p>
      </section>

      {/* About the Shop Section */}
      <section className="container">
        <Collapsible className="group max-w-xl mx-auto border rounded-2xl p-4">
          <CollapsibleTrigger asChild>
            <h2 className="text-xl text-center font-semibold text-primary mb-6">
              Welcome to First Ocean Supermarket, your premier shopping
              destination
            </h2>
          </CollapsibleTrigger>
          <div className="text-gray-600 text-center space-y-4 text-base overflow-hidden">
            <p className="opacity-0 max-h-0 group-data-[state=open]:opacity-100 group-data-[state=open]:max-h-80 transition-[max-height,opacity] duration-500">
              located in Ikosi-Ketu, Lagos. We offer a wide variety of
              high-quality products, from fresh produce to international brands,
              all at competitive prices. Our modern store provides a welcoming
              environment, with knowledgeable staff ready to assist. We
              prioritize customer satisfaction by delivering excellent service,
              convenience, and quality. Whether you're a regular shopper or a
              first-time visitor, First Ocean Supermarket ensures an exceptional
              shopping experience every time.
            </p>
          </div>
          <CollapsibleTrigger className="w-full flex flex-col items-center justify-center py-1">
            <span className="text-xs text-muted-foreground">
              View <span className="group-data-[state=open]:hidden">more</span>
              <span className="hidden group-data-[state=open]:inline">
                less
              </span>
            </span>
            <ChevronDownIcon className="size-4 group-data-[state=open]:scale-y-[-1] transition-transform duration-500" />
          </CollapsibleTrigger>
        </Collapsible>
      </section>

      {/* Shop by Category Section */}
      <section className="container py-10">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          Shop by Category
        </h2>
        <Suspense fallback={<CategoriesGridLoader />}>
          <CategoriesGrid />
        </Suspense>
      </section>

      {/* Popular Products Section  */}
      <section className="container py-10">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          Our Popular Products
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories?.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.id}`}
          className="bg-primary py-4 text-center text-white rounded-lg hover:bg-primary/80"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

function CategoriesGridLoader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-14" />
      ))}
    </div>
  );
}

async function ProductsGrid() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const supabase = createSupabaseServerAnonymousClient();
  console.log("fetching popular products");
  const { data: products } = await supabase
    .from("products")
    .select()
    .limit(30)
    .order("created_at", { ascending: false });

  return products?.length ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
