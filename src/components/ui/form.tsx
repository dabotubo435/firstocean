"use client";

import Form from "next/form";
import { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

export const NextForm = Form;

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
