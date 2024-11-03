"use server";

import { FormAction } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { ActionResult } from "@/utils/types";
import { validateForm } from "@/utils/validate";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const updateProductSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  image: z.string().optional(),
  description: z.string(),
  price: z.coerce.number(),
  category_id: z.coerce
    .number()
    .optional()
    .transform((val) => val || null),
});

export const updateProduct: FormAction = async (_, formData) => {
  const form = validateForm(updateProductSchema, formData);
  if (form.errors) {
    return {
      success: false,
      error: "Validation failed",
      formErrors: form.errors,
    };
  }

  const supabase = createSupabaseServerClient(await cookies());
  const { error, data } = await supabase
    .from("products")
    .update(form.data)
    .eq("id", form.data.id)
    .select()
    .single();
  if (error) {
    console.log(error, form.data);
    return { success: false, error: "Failed to update product" };
  }

  revalidatePath(`/admin/products/${data.id}`);
  return { success: true, message: "Product updated" };
};

export const deleteProduct = async (id: number): Promise<ActionResult> => {
  const supabase = createSupabaseServerClient(await cookies());
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { success: false, error: "Failed to delete product" };
  }
  redirect("/admin/products");
};
