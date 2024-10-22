"use server";

import { FormAction } from "@/context/form";
import { validateForm } from "@/utils/validate";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string(),
});

export const createCategory: FormAction = async (_, formData) => {
  const { data, errors } = validateForm(createCategorySchema, formData);
  if (errors) {
    return { success: false, error: "Validation failed", formErrors: errors };
  }

  console.log(data);
  return { success: false, error: "Failed to create category" };
};
