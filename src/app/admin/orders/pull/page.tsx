import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormAction, FormMessage, FormStatus } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function PullOrder() {
  const findOrder: FormAction = async (_, formData) => {
    "use server";
    const id = formData.get("search");
    if (!id) return { success: false, error: "Order not found" };

    const supabase = createSupabaseServerClient(cookies());
    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("id", id)
      .limit(1)
      .single();
    if (!error) {
      redirect(`/admin/orders/${data.id}`);
    }
    return { success: false, error: "Order not found" };
  };

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Pull Order</h2>
        </div>

        <div className="container max-w-lg p-8 mt-16 bg-muted rounded-xl">
          <p className="text-center text-base mb-6">
            Find an order by Order ID
          </p>
          <Form action={findOrder} className="grid gap-4">
            <Input
              name="search"
              placeholder="Enter Order ID"
              className="h-12"
            />
            <FormMessage className="text-center group-data-[success=false]/form:text-destructive" />
            <FormStatus>
              <Button className="h-12 w-full">
                <LoaderCircleIcon className="size-4 mr-2 animate-spin hidden group-data-[pending=true]:inline" />
                <SearchIcon className="size-4 mr-2 group-data-[pending=true]:hidden" />{" "}
                Pull
              </Button>
            </FormStatus>
          </Form>
        </div>
      </section>
    </main>
  );
}
