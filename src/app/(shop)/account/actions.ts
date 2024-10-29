"use server";

import { FormAction } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { validateForm } from "@/utils/validate";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  nationality: z.string().optional(),
});

export const updateProfile: FormAction = async (_, formData) => {
  const form = validateForm(updateProfileSchema, formData);
  if (form.errors) {
    return {
      success: false,
      error: "Validation failed",
      formErrors: form.errors,
    };
  }

  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };
  if (!user.email)
    return {
      success: false,
      error: "No email address associated with your account",
    };

  const { error } = await supabase
    .from("profiles")
    .upsert(
      { ...form.data, user_id: user.id, email: user.email },
      { onConflict: "user_id" }
    )
    .eq("user_id", user.id)
    .select();
  if (error) {
    console.log(error, form.data);
    return { success: false, error: "Failed to update profile" };
  }

  revalidatePath("/account");
  return { success: true, message: "Profile updated " };
};
