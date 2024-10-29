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
import { Tables } from "@/supabase/types";
import { uploadFilename, uploadFullUrl } from "@/utils/upload";
import { validateForm } from "@/utils/validate";
import { LoaderCircleIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { deleteCategory, updateCategory } from "./actions";

export function UpdateCategory({
  category,
}: {
  category: Tables<"categories">;
}) {
  const imageInput = useImageInput();

  const action: FormAction = async (formState, formData) => {
    const schema = z.object({
      name: z.string(),
      image: z.instanceof(File).optional(),
    });
    const form = validateForm(schema, formData);
    if (form.errors) {
      return {
        success: false,
        error: "Validation failed",
        formErrors: form.errors,
      };
    }
    if (form.data.image?.size) {
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
    } else formData.delete("image");

    return updateCategory(formState, formData);
  };

  const deleteAction = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await deleteCategory(category.id);
    if (res?.success === false) {
      alert(res.error);
    }
  };

  const placeholderImage = imageInput.image || category.image;

  return (
    <div className="pt-6 grid sm:grid-cols-6 md:grid-cols-1 lg:grid-cols-6 gap-4 max-w-3xl">
      <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 flex justify-center">
        <div className="flex gap-1 items-start">
          {placeholderImage ? (
            <Image
              src={placeholderImage}
              alt={category.name}
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
        <h2 className="mb-6 text-base font-semibold">{category.name}</h2>

        <Form action={action} className="grid gap-4">
          <input type="hidden" name="id" defaultValue={category.id} />

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
              defaultValue={category.name}
              required
              id="name"
              name="name"
              placeholder="Enter category name"
            />
            <FormFieldError field="name" className="text-xs text-red-500" />
          </div>

          <FormMessage className="group-data-[success=false]/form:text-red-500 group-data-[success=true]/form:text-green-500" />

          <FormStatus className="flex justify-end gap-4">
            <Button onClick={deleteAction} type="button" variant="outline">
              Delete
            </Button>

            <Button className="shrink-0">
              Update category
              <LoaderCircleIcon className="ml-2 animate-spin size-5 hidden group-data-[pending=true]:inline" />
            </Button>
          </FormStatus>
        </Form>
      </div>
    </div>
  );
}
