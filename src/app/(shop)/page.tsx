import billboard from "@/assets/images/billboard.jpg";
import { ProductItem } from "@/components/product/product-item";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createSupabaseServerAnonymousClient } from "@/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { addToCart } from "./checkout/actions";

export default function Home() {
  return (
    <main>
      <section>
        <div className="bg-secondary">
          <Image
            src={billboard}
            alt="Billboard"
            className="max-h-80 object-contain"
          />
        </div>
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
      <section className="container py-10">
        <h2 className="text-3xl text-center font-semibold text-primary mb-6">
          About First Ocean Store
        </h2>
        <div className="faq-container">
          <div className="faq-item" onClick={() => toggleFAQ('faq1')}>
            <div className="faq-question">Who are we?</div>
            <div id="faq1" className="faq-answer hidden">
              We are a world-class shopping destination located in the heart of Ikosi-Ketu, Lagos State, Nigeria. Since our inception, we have been committed to providing an exceptional retail experience.
            </div>
          </div>
          <div className="faq-item" onClick={() => toggleFAQ('faq2')}>
            <div className="faq-question">What do we offer?</div>
            <div id="faq2" className="faq-answer hidden">
              Our shelves are stocked with a diverse range of products, including fresh produce, pantry staples, gourmet foods, household essentials, and specialty items from around the world.
            </div>
          </div>
          <div className="faq-item" onClick={() => toggleFAQ('faq3')}>
            <div className="faq-question">Why choose us?</div>
            <div id="faq3" className="faq-answer hidden">
              We pride ourselves on delivering unparalleled customer service, ensuring that your shopping experience is seamless and enjoyable.
            </div>
          </div>
        </div>
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

function toggleFAQ(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle('hidden');
  }
}

// Other functions remain unchanged


async function CategoriesGrid() {
  const supabase = createSupabaseServerAnonymousClient();
  const { data: categories } = await supabase
    .from("categories")
    .select()
    .order("name");

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
  const supabase = createSupabaseServerAnonymousClient();
  const { data: products } = await supabase
    .from("products")
    .select()
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
