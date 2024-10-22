"use client";

import { CartItem } from "@/components/product/cart-item";
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

export function CartModal() {
  const { cartItems, totalPrice, setQuantityInCart } = useCart();
  const { isOpen, toggle } = useStore(cartStore);

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger className="fixed bottom-4 right-4 flex items-center bg-green-600 text-white p-4 rounded-full">
        <ShoppingCartIcon className="size-5 mr-2 text-base" />
        Cart ({cartItems.length})
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Your Cart</DialogTitle>
        {cartItems.length === 0 ? (
          <div className="py-16 text-center">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div>
            <div className="overflow-y-auto max-h-80 divide-y">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
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
