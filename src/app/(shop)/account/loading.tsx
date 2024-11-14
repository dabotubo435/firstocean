import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingAccount() {
  return (
    <main>
      <div className="container py-10 flex flex-col sm:flex-row gap-8">
        <section className="justify-self-center sm:justify-self-auto flex flex-col items-center gap-4">
          <Skeleton className="size-40 rounded-full border" />
          <Skeleton className="h-5 w-full" />
        </section>

        <div className="sm:flex-1 space-y-8">
          <section>
            <Skeleton className="h-10 mb-1" />
            <div className="divide-y">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-[53px] rounded-none" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
