import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function PullProduct() {
  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Pull Product</h2>
        </div>

        <div className="container max-w-sm p-8 mt-16 bg-muted rounded-xl">
          <p className="text-center mb-6">
            {"Find a product by entering it's product ID"}
          </p>
          <form className="grid gap-4">
            <Input name="search" placeholder="Enter Product ID" />
            <Button className="shrink-0">
              <SearchIcon className="size-4 mr-2" /> Pull
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
