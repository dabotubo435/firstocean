"use client";

import { ProductCartItem } from "@/components/product/product-cart-item";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import { notificationStore } from "@/store/notification";
import { currency } from "@/utils/formatter";
import { ShoppingCartIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import {
  addToCart,
  checkout,
  clearFromCart,
  clearCart as clearServerCart,
  removeFromCart,
} from "./actions";

export default function Checkout() {
  const { cart, totalPrice, clearLocalCart, refresh } = useCart();
  const { session } = useAuth();
  const { notify } = useStore(notificationStore);
  const router = useRouter();

  const handleCheckout = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    } else {
      const res = await checkout();
      if (res.success) {
        alert(res.message);
      } else {
        alert(res.error);
      }
    }
  };

  const clearCart = async () => {
    if (!session?.user) {
      clearLocalCart();
      notify(`Cart cleared`);
    } else {
      try {
        const res = await clearServerCart();
        if (res.success) notify(res.message);
        else notify(res.error);
        refresh();
      } catch (error) {
        notify("Failed to clear cart");
      }
    }
  };

  return (
    <main>
      <section className="container py-10">
        <h1 className="text-3xl font-bold capitalize text-center mb-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-6 lg:grid-cols-7 gap-8">
          <div className="md:col-span-4 lg:col-span-5">
            <div className="divide-y">
              {cart.map((cartItem) => (
                <ProductCartItem
                  key={cartItem.product_id}
                  cartItem={cartItem}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  clearFromCart={clearFromCart}
                />
              ))}
              {!cart.length && (
                <div className="flex justify-center items-center py-20">
                  <p>No items in cart</p>
                </div>
              )}
            </div>
            {!!cart.length && (
              <div className="mt-8">
                <Button size="sm" variant="outline" onClick={clearCart}>
                  Clear cart <Trash2Icon className="size-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          <div className="md:col-span-2 mt-4 space-y-2">
            <h3 className="text-lg font-semibold">
              Total: {currency.format(totalPrice)}
            </h3>
            <Button
              disabled={!totalPrice}
              onClick={handleCheckout}
              size="lg"
              className="w-full rounded"
            >
              <ShoppingCartIcon className="size-5 mr-3 text-base" />
              Checkout
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
