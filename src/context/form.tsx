"use client";

import { ActionResult } from "@/utils/types";
import { ComponentPropsWithoutRef, createContext, useContext } from "react";
import { useFormState, useFormStatus } from "react-dom";

export type FormState<Data = undefined> = ActionResult<Data> | null;
export type FormAction<Data = undefined> = (
  state: FormState<Data>,
  formData: FormData
) => Promise<FormState<Data>>;

const FormContext = createContext<FormState<any> | undefined>(undefined);

export function Form({
  action,
  className,
  ...props
}: { action: FormAction<any> } & Omit<
  ComponentPropsWithoutRef<"form">,
  "action"
>) {
  const [state, formAction] = useFormState(action, null);

  return (
    <FormContext.Provider value={state}>
      <form
        {...props}
        action={formAction}
        data-success={state?.success}
        className={`${className} group/form`}
      />
    </FormContext.Provider>
  );
}

export function FormMessage({
  type,
  ...props
}: Omit<ComponentPropsWithoutRef<"p">, "children"> & {
  type?: "error" | "message";
}) {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("FormMessage must be used within a Form provider");
  }
  if (context === null) return null;
  if (type === "message" && !context.success) return null;
  if (type === "error" && context.success) return null;
  return <p {...props}>{context.success ? context.message : context.error}</p>;
}

export function FormFieldError({
  field,
  ...props
}: Omit<ComponentPropsWithoutRef<"p">, "children"> & { field: string }) {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("FormMessage must be used within a Form provider");
  }
  if (context === null) return null;
  if (context.success) return null;
  const error = context.formErrors?.[field];
  if (!error) return null;
  return <p {...props}>{error}</p>;
}

export function FormStatus({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const status = useFormStatus();
  return (
    <div
      {...props}
      className={`${className} group`}
      data-pending={status.pending}
    />
  );
}
