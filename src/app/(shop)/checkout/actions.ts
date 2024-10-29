"use server";

import { createSupabaseServerClient } from "@/supabase/server";
import { Tables, TablesInsert } from "@/supabase/types";
import { ActionResult } from "@/utils/types";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { OrderCheckoutEmail } from "./email";

export async function checkout(): Promise<ActionResult> {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  // get cart
  const { data: cart } = await supabase
    .from("carts")
    .select("*, product:products(*)")
    .eq("user_id", user.id);
  if (!cart?.length) return { success: false, error: "Cart is empty" };

  const totalPrice = cart.reduce(
    (total, { product, quantity }) => total + (product?.price ?? 0) * quantity,
    0
  );

  // create order
  const { data: order } = await supabase
    .from("orders")
    .insert({
      amount: totalPrice,
      user_id: user.id,
    })
    .select()
    .single();
  if (!order) return { success: false, error: "Failed to create order" };

  // add cart products to order
  const { data: orderProducts } = await supabase
    .from("order_products")
    .insert(
      cart.map(
        (cartItem): TablesInsert<"order_products"> => ({
          order_id: order.id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
        })
      )
    )
    .select("*, product:products(*)");
  if (!orderProducts)
    return { success: false, error: "Failed to create order" };

  // clear cart
  const res = await supabase
    .from("carts")
    .delete()
    .eq("user_id", user.id)
    .select();
  if (res.error) console.log(res.error);

  // send order email
  if (user.email) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const res = await resend.emails.send({
      from: "First Ocean Supermarket <checkout@firstoceansupermarket.com>",
      to: user.email,
      subject: `Order #${order.id} - Order confirmation`,
      react: OrderCheckoutEmail({ totalPrice, orderProducts }),
    });
    if (res.error) console.log(res.error);
  }

  return { success: true, message: "Order placed successfully" };
}

export const addToCart = async (
  productId: Tables<"products">["id"]
): Promise<ActionResult> => {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: product } = await supabase
    .from("products")
    .select()
    .eq("id", productId)
    .limit(1)
    .single();
  if (!product) return { success: false, error: "Product not found" };

  const { data: cart } = await supabase
    .from("carts")
    .upsert({ user_id: user.id, product_id: product.id })
    .select()
    .single();
  if (!cart) return { success: false, error: "Failed to get cart" };

  const { data: updatedCart } = await supabase
    .from("carts")
    .update({ quantity: cart.quantity + 1 })
    .eq("product_id", cart.product_id)
    .eq("user_id", cart.user_id)
    .select()
    .single();
  if (!updatedCart) {
    return { success: false, error: "Failed to add item to cart" };
  }

  return { success: true, message: `${product.name} added to cart` };
};

export const removeFromCart = async (
  productId: Tables<"products">["id"]
): Promise<ActionResult> => {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: product } = await supabase
    .from("products")
    .select()
    .eq("id", productId)
    .limit(1)
    .single();
  if (!product) return { success: false, error: "Product not found" };

  const { data: cart } = await supabase
    .from("carts")
    .upsert({ user_id: user.id, product_id: product.id })
    .select()
    .single();
  if (!cart) return { success: false, error: "Failed to get cart" };

  if (cart.quantity > 1) {
    const { data: updatedCart } = await supabase
      .from("carts")
      .update({ quantity: cart.quantity - 1 })
      .eq("product_id", cart.product_id)
      .eq("user_id", cart.user_id)
      .select()
      .single();
    if (!updatedCart) {
      return { success: false, error: "Failed to remove item from cart" };
    }
  } else {
    const { data: removedCart } = await supabase
      .from("carts")
      .delete()
      .eq("product_id", cart.product_id)
      .eq("user_id", cart.user_id)
      .select()
      .single();
    if (!removedCart) {
      return { success: false, error: "Failed to remove item from cart" };
    }
  }

  return { success: true, message: `${product.name} removed to cart` };
};

export const clearFromCart = async (
  productId: Tables<"products">["id"]
): Promise<ActionResult> => {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: product } = await supabase
    .from("products")
    .select()
    .eq("id", productId)
    .limit(1)
    .single();
  if (!product) return { success: false, error: "Product not found" };

  const { data: cart } = await supabase
    .from("carts")
    .upsert({ user_id: user.id, product_id: product.id })
    .select()
    .single();
  if (!cart) return { success: false, error: "Failed to get cart" };

  const { data: removedCart } = await supabase
    .from("carts")
    .delete()
    .eq("product_id", cart.product_id)
    .eq("user_id", cart.user_id)
    .select()
    .single();
  if (!removedCart) {
    return { success: false, error: "Failed to clear item from cart" };
  }

  return { success: true, message: `${product.name} cleared from cart` };
};

export const clearCart = async (): Promise<ActionResult> => {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: clearedCarts } = await supabase
    .from("carts")
    .delete()
    .eq("user_id", user.id)
    .select();
  if (!clearedCarts) {
    return { success: false, error: "Failed to clear cart" };
  }

  return { success: true, message: `Cart cleared` };
};
