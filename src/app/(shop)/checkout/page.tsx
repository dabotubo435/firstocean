"use client";

import { CartItem } from "@/components/product/cart-item";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { currency } from "@/utils/formatter";
import { ShoppingCartIcon } from "lucide-react";
import { checkout } from "./actions";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();

  const handleCheckout = async () => {
    const res = await checkout("test@gmail.com", cartItems);
    if (res.success) {
      clearCart();
      alert(res.message);
    } else {
      alert(res.error);
    }
  };

  return (
    <main>
      <section className="container py-10">
        <h1 className="text-3xl font-bold capitalize text-center mb-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-6 lg:grid-cols-7 gap-8">
          <div className="md:col-span-4 lg:col-span-5 divide-y">
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>

          <div className="md:col-span-2 mt-4 space-y-2">
            <h3 className="text-lg font-semibold">
              Total: {currency.format(totalPrice)}
            </h3>
            <Button
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
