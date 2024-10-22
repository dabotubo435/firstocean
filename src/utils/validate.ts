import { AnyZodObject, z } from "zod";

type ValidationResult<T> =
  | {
      data: T;
      errors: undefined;
    }
  | {
      data: undefined;
      errors: Record<string, string>;
    };

export function validateForm<T extends AnyZodObject>(
  schema: T,
  formData: FormData
): ValidationResult<z.infer<T>> {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (result.success) {
    return { data: result.data, errors: undefined };
  }

  const errors: Record<string, string> = {};
  for (const field in result.error?.formErrors.fieldErrors) {
    const fieldErrors = result.error?.formErrors.fieldErrors[field];
    if (fieldErrors?.length) {
      errors[field] = fieldErrors[0];
    }
  }
  return { data: undefined, errors: errors };
}
