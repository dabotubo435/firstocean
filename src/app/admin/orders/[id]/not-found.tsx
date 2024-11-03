import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormStatus } from "@/context/form";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import NextForm from "next/form";
import { redirect } from "next/navigation";

export default function OrderNotFound() {
  const findOrder = async (formData: FormData) => {
    "use server";
    redirect(`/admin/orders/${formData.get("id")}`);
  };

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Order not found</h2>
        </div>

        <div className="container max-w-lg p-8 mt-16 bg-muted rounded-xl">
          <p className="text-center text-base mb-6">
            Sorry we could not find that order
          </p>
          <NextForm action={findOrder} className="grid gap-4">
            <Input name="id" placeholder="Enter Order ID" className="h-12" />
            <FormStatus>
              <Button className="h-12 w-full">
                <LoaderCircleIcon className="size-4 mr-2 animate-spin hidden group-data-[pending=true]:inline" />
                <SearchIcon className="size-4 mr-2 group-data-[pending=true]:hidden" />{" "}
                Pull
              </Button>
            </FormStatus>
          </NextForm>
        </div>
      </section>
    </main>
  );
}
