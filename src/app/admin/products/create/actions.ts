"use server";

import { FormAction } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { validateForm } from "@/utils/validate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category_id: z.coerce
    .number()
    .optional()
    .transform((val) => val || null),
});

export const createProduct: FormAction = async (_, formData) => {
  const form = validateForm(createProductSchema, formData);
  if (form.errors) {
    return {
      success: false,
      error: "Validation failed",
      formErrors: form.errors,
    };
  }

  const supabase = createSupabaseServerClient(cookies());
  const { error, data } = await supabase
    .from("products")
    .insert(form.data)
    .select()
    .single();
  if (error) {
    console.log(error, form.data);
    return { success: false, error: "Failed to create product" };
  }

  redirect(`/admin/products/${data.id}`);
};
