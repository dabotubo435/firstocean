"use client";

import { ProductCartItem } from "@/components/product/product-cart-item";
import { Button } from "@/components/ui/button";
import { NextForm } from "@/components/ui/form";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import { notificationStore } from "@/store/notification";
import { currency } from "@/utils/formatter";
import { ActionResult } from "@/utils/types";
import { LoaderCircleIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
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

  const clientCheckout = async (
    state: ActionResult | null
  ): Promise<ActionResult> => {
    const res = await checkout(state);
    if (res.success) {
      refresh();
    }
    return res;
  };
  const [state, handleCheckout, pending] = useActionState(clientCheckout, null);

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
        <h1
          data-hide={state?.success}
          className="text-3xl font-bold capitalize text-center mb-6 data-[hide=true]:invisible"
        >
          Checkout
        </h1>

        {state?.success ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">{state.message}</h2>
            <p>Thank you for placing your order with First Ocean Supermarket</p>
            <Link href="/account">
              <Button variant="link">View orders &rarr;</Button>
            </Link>
          </div>
        ) : (
          <div>
            {state?.error && (
              <h2 className="px-2 py-1 bg-red-500/10 text-red-500 font-medium inline-flex items-center rounded">
                {state.error}
              </h2>
            )}
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

              <NextForm
                action={handleCheckout}
                className="md:col-span-2 mt-4 space-y-2"
              >
                <h3 className="text-lg font-semibold">
                  Total: {currency.format(totalPrice)}
                </h3>
                <Button
                  disabled={!totalPrice}
                  size="lg"
                  className="group w-full rounded"
                  data-pending={pending}
                >
                  <LoaderCircleIcon className="size-5 mr-3 animate-spin hidden group-data-[pending=true]:inline" />
                  <ShoppingCartIcon className="size-5 mr-3 text-base group-data-[pending=true]:hidden" />
                  Checkout
                </Button>
              </NextForm>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
