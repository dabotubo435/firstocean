"use server";

import { FormAction } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { validateForm } from "@/utils/validate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string(),
  image: z.string(),
});

export const createCategory: FormAction = async (_, formData) => {
  const form = validateForm(createCategorySchema, formData);
  if (form.errors) {
    return {
      success: false,
      error: "Validation failed",
      formErrors: form.errors,
    };
  }

  const supabase = createSupabaseServerClient(await cookies());
  const { error, data } = await supabase
    .from("categories")
    .insert(form.data)
    .select()
    .single();
  if (error) {
    console.log(error, form.data);
    return { success: false, error: "Failed to create category" };
  }

  redirect(`/admin/categories/${data.id}`);
};
