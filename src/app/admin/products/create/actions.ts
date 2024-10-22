"use server";

import { FormAction } from "@/context/form";
import { validateForm } from "@/utils/validate";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  categoryId: z.string(),
});

export const createProduct: FormAction = async (_, formData) => {
  const { data, errors } = validateForm(createProductSchema, formData);
  if (errors) {
    return { success: false, error: "Validation failed", formErrors: errors };
  }

  console.log(data);
  return { success: false, error: "Failed to create product" };
};
