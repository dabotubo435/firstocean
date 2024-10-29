"use client";

import { useAuth } from "@/context/auth";
import { CartWithProduct, useCart } from "@/context/cart";
import { notificationStore } from "@/store/notification";
import { Tables } from "@/supabase/types";
import { currency } from "@/utils/formatter";
import { ActionResult } from "@/utils/types";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";

type Props = {
  cartItem: CartWithProduct;
  addToCart: (productId: Tables<"products">["id"]) => Promise<ActionResult>;
  removeFromCart: (
    productId: Tables<"products">["id"]
  ) => Promise<ActionResult>;
  clearFromCart: (productId: Tables<"products">["id"]) => Promise<ActionResult>;
};

export function ProductCartItem({
  cartItem,
  addToCart: addToServerCart,
  removeFromCart: removeFromServerCart,
  clearFromCart: clearFromServerCart,
}: Props) {
  const { session } = useAuth();
  const { notify, notifyUntilRemoved } = useStore(notificationStore);
  const { addToLocalCart, removeFromLocalCart, clearFromLocalCart, refresh } =
    useCart();

  const addToCart = async () => {
    if (!cartItem.product) return;

    if (!session?.user) {
      addToLocalCart(cartItem.product);
      notify(`${cartItem.product.name} added to cart`);
    } else {
      try {
        notifyUntilRemoved(
          <p className="flex items-center">
            <LoaderCircleIcon className="size-4 mr-2 animate-spin" /> Adding
            item to cart
          </p>
        );
        const res = await addToServerCart(cartItem.product.id);
        if (res.success) notify(res.message);
        else notify(res.error);
        refresh();
      } catch (error) {
        notify("Failed to add item to cart");
      }
    }
  };

  const removeFromCart = async () => {
    if (!cartItem.product) return;

    if (!session?.user) {
      removeFromLocalCart(cartItem.product.id);
      notify(`${cartItem.product.name} removed from cart`);
    } else {
      try {
        notifyUntilRemoved(
          <p className="flex items-center">
            <LoaderCircleIcon className="size-4 mr-2 animate-spin" /> Removing
            item from cart
          </p>
        );
        const res = await removeFromServerCart(cartItem.product.id);
        if (res.success) notify(res.message);
        else notify(res.error);
        refresh();
      } catch (error) {
        notify("Failed to remove item from cart");
      }
    }
  };

  const clearFromCart = async () => {
    if (!cartItem.product) return;

    if (!session?.user) {
      clearFromLocalCart(cartItem.product.id);
      notify(`${cartItem.product.name} cleared from cart`);
    } else {
      try {
        notifyUntilRemoved(
          <p className="flex items-center">
            <LoaderCircleIcon className="size-4 mr-2 animate-spin" /> Clearing
            item from cart
          </p>
        );
        const res = await clearFromServerCart(cartItem.product.id);
        if (res.success) notify(res.message);
        else notify(res.error);
        refresh();
      } catch (error) {
        notify("Failed to clear item from cart");
      }
    }
  };

  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-center gap-4">
        <Link
          href={`/products/${cartItem.product_id}`}
          className="relative size-20 aspect-square"
        >
          <Image
            src={cartItem.product?.image ?? "/placeholder.jpg"}
            alt={cartItem.product?.name ?? "[deleted product]"}
            className="object-cover object-center"
            fill
          />
        </Link>
        <div>
          <Link
            href={`/products/${cartItem.product_id}`}
            className="font-medium leading-none hover:underline"
          >
            {cartItem.product?.name ?? "[deleted product]"}
          </Link>
          <p className="font-medium">
            {currency.format(
              (cartItem.product?.price ?? 0) * cartItem.quantity
            )}
          </p>
          <div className="flex items-center mt-1">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white rounded-full size-6"
              onClick={removeFromCart}
            >
              -
            </button>
            <span className="w-10 text-center">{cartItem.quantity}</span>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white size-6 rounded-full"
              onClick={addToCart}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button className="p-3 hover:text-red-500" onClick={clearFromCart}>
        <Trash2Icon className="size-4" />
      </button>
    </div>
  );
}
