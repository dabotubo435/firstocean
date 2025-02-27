import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormAction, FormMessage } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function PullProduct() {
  const findOrder: FormAction = async (_, formData) => {
    "use server";
    const id = formData.get("search");
    if (!id) return { success: false, error: "Product not found" };

    const supabase = createSupabaseServerClient(await cookies());
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", id)
      .single();
    if (!error) redirect(`/admin/products/${data.id}`);
    return { success: false, error: "Product not found" };
  };

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Pull Product</h2>
        </div>

        <div className="container max-w-lg p-8 mt-16 bg-muted rounded-xl">
          <p className="text-center text-base mb-6">
            Find product by product ID
          </p>
          <Form action={findOrder} className="grid gap-4">
            <Input
              name="search"
              placeholder="Enter Product ID"
              className="h-12"
            />
            <FormMessage className="text-center group-data-[success=false]/form:text-destructive" />
            <Button className="h-12 w-full">
              <LoaderCircleIcon className="size-4 mr-2 animate-spin hidden group-data-[pending=true]/form:inline" />
              <SearchIcon className="size-4 mr-2 group-data-[pending=true]/form:hidden" />
              Pull
            </Button>
          </Form>
        </div>
      </section>
    </main>
  );
}
