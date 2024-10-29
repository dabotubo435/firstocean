"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormAction,
  FormFieldError,
  FormMessage,
  FormStatus,
} from "@/context/form";
import { useImageInput } from "@/hooks/use-image-input";
import { createSupabaseClient } from "@/supabase/client";
import { uploadFilename, uploadFullUrl } from "@/utils/upload";
import { validateForm } from "@/utils/validate";
import { LoaderCircleIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { createCategory } from "./actions";

export default function CreateCategory() {
  const imageInput = useImageInput();

  const action: FormAction = async (formState, formData) => {
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
      .upload(`/categories/${filename}`, form.data.image);
    if (error) {
      return {
        success: false,
        error: "Image upload failed",
      };
    }
    formData.set("image", uploadFullUrl(data.fullPath));

    return createCategory(formState, formData);
  };

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Create Category</h2>
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
                Enter category information to create.
              </p>

              <Form action={action} className="grid gap-4">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="hidden"
                  ref={imageInput.ref}
                  onChange={imageInput.onChange}
                />

                <div className="grid gap-2">
                  <label htmlFor="name">Category name</label>
                  <Input
                    required
                    id="name"
                    name="name"
                    placeholder="Enter category name"
                  />
                  <FormFieldError
                    field="name"
                    className="text-xs text-red-500"
                  />
                </div>

                <FormMessage className="group-data-[success=false]/form:text-red-500 group-data-[success=true]/form:text-green-500" />

                <FormStatus className="flex justify-end">
                  <Button className="shrink-0">
                    Create category
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
