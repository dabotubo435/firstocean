"use server";

import { FormAction } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { ActionResult } from "@/utils/types";
import { validateForm } from "@/utils/validate";
import { expireTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const updateCategorySchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  image: z.string().optional(),
});

export const updateCategory: FormAction = async (_, formData) => {
  const form = validateForm(updateCategorySchema, formData);
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
    .update(form.data)
    .eq("id", form.data.id)
    .select()
    .single();
  if (error) {
    console.log(error, form.data);
    return { success: false, error: "Failed to update category" };
  }

  expireTag("categories", `categories:${data.id}`);
  return { success: true, message: "Category updated" };
};

export const deleteCategory = async (id: number): Promise<ActionResult> => {
  const supabase = createSupabaseServerClient(await cookies());
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { success: false, error: "Failed to delete category" };
  }

  expireTag("categories", `categories:${id}`);
  redirect("/admin/categories");
};
