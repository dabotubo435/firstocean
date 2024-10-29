"use client";

import { ProductCartItem } from "@/components/product/product-cart-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/context/cart";
import { cartStore } from "@/store/cart";
import { currency } from "@/utils/formatter";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand";
import { addToCart, clearFromCart, removeFromCart } from "./checkout/actions";

export function CartModal() {
  const { cart, totalPrice } = useCart();
  const { isOpen, toggle } = useStore(cartStore);

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger className="fixed bottom-4 right-4 flex items-center bg-secondary text-white p-4 rounded-full">
        <ShoppingCartIcon className="size-5 mr-2 text-base" />
        Cart ({cart.length})
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Your Cart</DialogTitle>
        {!cart.length ? (
          <div className="py-16 text-center">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div>
            <div className="overflow-y-auto max-h-80 divide-y">
              {cart.map((cartItem) => (
                <ProductCartItem
                  key={cartItem.product_id}
                  cartItem={cartItem}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  clearFromCart={clearFromCart}
                />
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">
                Total: {currency.format(totalPrice)}
              </h3>
              <Link onClick={toggle} href="/checkout" className="block">
                <Button size="lg" className="w-full rounded">
                  <ShoppingCartIcon className="size-5 mr-3 text-base" />
                  Go to checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
