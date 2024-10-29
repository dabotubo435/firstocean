import {
  ProductRow,
  ProductRowEmpty,
  ProductRowHeader,
} from "@/components/product/product-row";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { createSupabaseServerClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { UpdateProduct } from "./update";

export default async function Product({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient(cookies());
  const { data: product } = await supabase
    .from("products")
    .select()
    .eq("id", params.id)
    .limit(1)
    .single();
  if (!product) notFound();

  return (
    <main>
      <section>
        <UpdateProduct product={product} />
      </section>

      {product.category_id && (
        <section className="mt-6">
          <Suspense>
            <RelatedProducts
              productId={product.id}
              categoryId={product.category_id}
            />
          </Suspense>
        </section>
      )}
    </main>
  );
}

async function RelatedProducts({
  productId,
  categoryId,
}: {
  productId: number;
  categoryId: number;
}) {
  const supabase = createSupabaseServerClient(cookies());
  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("category_id", categoryId)
    .neq("id", productId)
    .limit(20)
    .order("created_at", { ascending: false });

  return (
    <Table>
      <TableCaption>Related products</TableCaption>
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
  );
}
