import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function PullOrder() {
  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Pull Order</h2>
        </div>

        <div className="container max-w-sm p-8 mt-16 bg-muted rounded-xl">
          <p className="text-center mb-6">
            {"Find an order by entering it's order ID"}
          </p>
          <form className="grid gap-4">
            <Input name="search" placeholder="Enter Order ID" />
            <Button className="shrink-0">
              <SearchIcon className="size-4 mr-2" /> Pull
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
