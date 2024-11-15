"use server";

import { FormAction } from "@/context/form";
import { Resend } from "resend";
import { ContactEmail } from "./email";

export const contact: FormAction = async (_, formData) => {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Please fill out the form" };
  }

  // send contact email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "First Ocean Supermarket <notify@delivery.firstoceansupermarket.com>",
      to: process.env.ADMIN_INBOX_EMAIL!,
      subject: `New contact email - ${data.name}`,
      react: ContactEmail(data),
    });
    return {
      success: true,
      message: "We have received your message, we will contact you soon.",
    };
  } catch (error) {
    return {
      success: false,
      error: "Sorry we could not receive your message, please try again.",
    };
  }
};
