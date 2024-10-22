import {
  ProductRow,
  ProductRowEmpty,
  ProductRowHeader,
} from "@/components/product/product-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { IProduct } from "@/supabase/entities/product";
import { SearchIcon } from "lucide-react";

export default function Products() {
  const products: IProduct[] = [];

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">All Products</h2>
        </div>

        <div className="flex max-w-md ml-auto mb-2 items-center gap-2">
          <Input placeholder="Search products" />
          <Button size="icon" className="shrink-0">
            <SearchIcon className="size-5" />
          </Button>
        </div>

        <Table>
          <TableCaption>All products.</TableCaption>
          <TableHeader>
            <ProductRowHeader />
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
            {!products.length && <ProductRowEmpty />}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
