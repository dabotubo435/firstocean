"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import { notificationStore } from "@/store/notification";
import { Tables } from "@/supabase/types";
import { LoaderCircleIcon, ShoppingCartIcon } from "lucide-react";
import { useStore } from "zustand";
import { addToCart as addToServerCart } from "../../checkout/actions";

export function AddToCartButton({ product }: { product: Tables<"products"> }) {
  const { session } = useAuth();
  const { notify, notifyUntilRemoved } = useStore(notificationStore);
  const { addToLocalCart, refresh } = useCart();

  const addToCart = async () => {
    if (!session?.user) {
      addToLocalCart(product);
      notify(`${product.name} added to cart`);
    } else {
      try {
        notifyUntilRemoved(
          <p className="flex items-center">
            <LoaderCircleIcon className="size-4 mr-2 animate-spin" /> Adding
            item to cart
          </p>
        );
        const res = await addToServerCart(product.id);
        if (res.success) notify(res.message);
        else notify(res.error);
        refresh();
      } catch (error) {
        notify("Failed to add item to cart");
      }
    }
  };

  return (
    <Button size="sm" onClick={addToCart}>
      <ShoppingCartIcon className="size-4 mr-2" /> Add to cart
    </Button>
  );
}
