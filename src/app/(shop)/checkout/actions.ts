"use server";

import nodemailer from "nodemailer";

type ActionResult =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      error?: string;
    };

export async function checkout(
  email: string,
  cartItems: any[]
): Promise<ActionResult> {
  if (!cartItems.length) {
    return { success: false, error: "Missing cart items or email" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Order Confirmation",
    html: `
      <h1>Thank you for your order!</h1>
      <p>Here are the details of your order:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Product</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems
            .map(
              (item: any) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  item.title
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  item.quantity
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">₦${
                  item.price
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">₦${(
                  item.price * item.quantity
                ).toFixed(2)}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
      <h2>Total: ₦${cartItems
        .reduce(
          (total: number, item: any) => total + item.price * item.quantity,
          0
        )
        .toFixed(2)}</h2>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Order placed successfully" };
  } catch (error) {
    return { success: false, error: "Failed to place order" };
  }
}
