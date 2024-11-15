import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProduct() {
  return (
    <main className="container max-w-6xl space-y-8">
      <section className="flex flex-col sm:flex-row gap-8">
        <div className="justify-self-center sm:justify-self-auto">
          <Skeleton
            style={{
              width: 140,
              height: 140,
            }}
            className="rounded-none"
          />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-7 w-60 font-bold capitalize" />
          <Skeleton className="h-8 w-64 font-bold capitalize" />
          <Skeleton className="h-20 w-80 font-bold capitalize" />
        </div>
      </section>

      <section className="border-t py-8">
        <div className="mb-6">
          <h3 className="text-xl font-medium">Related products</h3>
        </div>
        <ProductsGridLoader />
      </section>
    </main>
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
