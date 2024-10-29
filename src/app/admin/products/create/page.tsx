"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormAction,
  FormFieldError,
  FormMessage,
  FormStatus,
} from "@/context/form";
import { useImageInput } from "@/hooks/use-image-input";
import { createSupabaseClient } from "@/supabase/client";
import { useSupabase } from "@/supabase/hooks";
import { uploadFilename, uploadFullUrl } from "@/utils/upload";
import { validateForm } from "@/utils/validate";
import { LoaderCircleIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { createProduct } from "./actions";

export default function CreateProduct() {
  const imageInput = useImageInput();

  const action: FormAction = async (formState, formData) => {
    if (formData.get("category_id") === "none") {
      formData.delete("category_id");
    }

    const schema = z.object({
      name: z.string(),
      image: z.instanceof(File),
    });
    const form = validateForm(schema, formData);
    if (form.errors) {
      return {
        success: false,
        error: "Validation failed",
        formErrors: form.errors,
      };
    }

    const supabase = createSupabaseClient();
    const filename = uploadFilename(form.data.name, form.data.image);
    const { data, error } = await supabase.storage
      .from("assets")
      .upload(`/products/${filename}`, form.data.image);
    if (error) {
      return {
        success: false,
        error: "Image upload failed",
      };
    }
    formData.set("image", uploadFullUrl(data.fullPath));

    return createProduct(formState, formData);
  };

  const { query: categories } = useSupabase((supabase) =>
    supabase.from("categories").select().order("name")
  );

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Create Product</h2>
        </div>

        <div className="border-t mt-10">
          <div className="pt-6 grid sm:grid-cols-6 md:grid-cols-1 lg:grid-cols-6 gap-4 max-w-3xl">
            <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 flex justify-center">
              <div className="flex gap-1 items-start">
                {imageInput.image ? (
                  <Image
                    src={imageInput.image}
                    alt="Image"
                    width={160}
                    height={160}
                    className="rounded-md aspect-square object-cover"
                  />
                ) : (
                  <div
                    onClick={imageInput.trigger}
                    data-error={imageInput.hasError}
                    className="border-2 data-[error=true]:border-red-400 border-dashed cursor-pointer bg-gray-50 size-40 rounded-md flex items-center justify-center"
                  >
                    <p className="text-xs text-gray-400">Pick image</p>
                  </div>
                )}
                <button
                  onClick={imageInput.trigger}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <SquarePenIcon className="size-4" />
                </button>
              </div>
            </div>

            <div className="sm:col-span-4 md:col-span-1 lg:col-span-4">
              <p className="mb-6 text-base">
                Enter product information to create.
              </p>

              <Form action={action} className="grid gap-4">
                <input
                  required
                  type="file"
                  accept="image/*"
                  name="image"
                  className="hidden"
                  ref={imageInput.ref}
                  onChange={imageInput.onChange}
                />

                <div className="grid gap-2">
                  <label htmlFor="name">Product name</label>
                  <Input
                    required
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                  />
                  <FormFieldError
                    field="name"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="description">Product description</label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    rows={5}
                  />
                  <FormFieldError
                    field="description"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="price">Product price (NGN)</label>
                  <Input
                    required
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Enter product price"
                  />
                  <FormFieldError
                    field="price"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="h-px bg-gray-100"></div>

                <div className="grid gap-2">
                  <label htmlFor="category_id">Category</label>
                  <Select name="category_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {categories?.data?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormFieldError
                    field="category_id"
                    className="text-xs text-red-500"
                  />
                </div>

                <FormMessage className="group-data-[success=false]/form:text-red-500 group-data-[success=true]/form:text-green-500" />

                <FormStatus className="flex justify-end">
                  <Button onClick={imageInput.validate} className="shrink-0">
                    Create product
                    <LoaderCircleIcon className="ml-2 animate-spin size-5 hidden group-data-[pending=true]:inline" />
                  </Button>
                </FormStatus>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
