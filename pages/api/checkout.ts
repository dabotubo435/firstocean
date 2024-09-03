import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cartItems, email } = req.body;

    if (!cartItems || cartItems.length === 0 || !email) {
      return res.status(400).json({ error: 'Missing cart items or email' });
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare HTML email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Order Confirmation',
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
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.title}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">₦${item.price}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">₦${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `
              )
              .join('')}
          </tbody>
        </table>
        <h2>Total: ₦${cartItems
          .reduce((total: number, item: any) => total + item.price * item.quantity, 0)
          .toFixed(2)}</h2>
      `,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send order email' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
