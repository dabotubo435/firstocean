import { ProductItem } from "@/components/product/product-item";
import { Skeleton } from "@/components/ui/skeleton";
import { createSupabaseServerClient } from "@/supabase/server";
import { currency } from "@/utils/formatter";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { addToCart } from "../../checkout/actions";
import { AddToCartButton } from "./add-to-cart";

export default async function Products({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient(null);
  const { data: product } = await supabase
    .from("products")
    .select()
    .eq("id", params.id)
    .limit(1)
    .single();
  if (!product) notFound();

  return (
    <main>
      <section className="container py-10">
        <div className="py-10 flex flex-col sm:flex-row gap-8">
          <div className="justify-self-center sm:justify-self-auto">
            <Image
              src={product.image}
              alt={product.name}
              width={140}
              height={140}
              className="w-full aspect-square object-cover object-center"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-xl font-bold capitalize">{product.name}</h1>
            <p>{product.description}</p>
            <div className="flex items-center gap-8">
              <p className="font-medium text-lg">
                {currency.format(product.price)}
              </p>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="container border-t py-10">
        <div className="mb-6">
          <h3 className="text-xl font-medium">Related products</h3>
        </div>
        <Suspense fallback={<ProductsGridLoader />}>
          <RelatedProducts
            productId={product.id}
            categoryId={product.category_id}
          />
        </Suspense>
      </section>
    </main>
  );
}

async function RelatedProducts({
  productId,
  categoryId,
}: {
  productId: number;
  categoryId: number | null;
}) {
  const supabase = createSupabaseServerClient(cookies());
  const query = supabase.from("products").select("*, categories(name)");
  if (categoryId)
    query
      .eq("category_id", categoryId)
      .neq("id", productId)
      .limit(20)
      .order("created_at", { ascending: false });
  const { data: products } = await query;

  return products?.length ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  ) : (
    <div className="py-24 text-center">
      <p>No related products found</p>
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
