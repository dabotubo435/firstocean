"use server";

import { FormAction } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { ActionResult } from "@/utils/types";
import { validateForm } from "@/utils/validate";
import { expireTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const updateOrderSchema = z.object({
  id: z.coerce.number(),
  amount: z.coerce.number(),
  paid: z.enum(["true", "false"]).transform((value) => value === "true"),
  delivered: z.enum(["true", "false"]).transform((value) => value === "true"),
});

export const updateOrder: FormAction = async (_, formData) => {
  const form = validateForm(updateOrderSchema, formData);
  if (form.errors) {
    return {
      success: false,
      error: "Validation failed",
      formErrors: form.errors,
    };
  }

  const supabase = createSupabaseServerClient(await cookies());
  const { error, data } = await supabase
    .from("orders")
    .update(form.data)
    .eq("id", form.data.id)
    .select()
    .single();
  if (error) {
    console.log(error, form.data);
    return { success: false, error: "Failed to update order" };
  }

  expireTag("orders");
  return { success: true, message: "Order updated" };
};

export const deleteOrder = async (id: number): Promise<ActionResult> => {
  const supabase = createSupabaseServerClient(await cookies());
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { success: false, error: "Failed to delete order" };
  }

  expireTag("orders");
  redirect("/admin/orders");
};
