"use client";

import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import { notificationStore } from "@/store/notification";
import { Tables } from "@/supabase/types";
import { currency } from "@/utils/formatter";
import { ActionResult } from "@/utils/types";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";

type Props = {
  product: Tables<"products">;
  addToCart(productId: Tables<"products">["id"]): Promise<ActionResult>;
};

export function ProductItem({ product, addToCart: addToServerCart }: Props) {
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
    <div key={product.id} className="border p-2.5 rounded-lg shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="group relative mb-4 block"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={140}
          height={140}
          className="w-full aspect-square object-cover object-center"
        />
        <div className="absolute flex items-center justify-center inset-0 duration-300 group-hover:bg-black/30 transition-colors">
          <p className="text-white invisible group-hover:visible text-xs md:text-sm">
            View product &rarr;
          </p>
        </div>
      </Link>
      <Link
        href={`/products/${product.id}`}
        className="text-xs sm:text-sm font-semibold hover:underline"
      >
        {product.name}
      </Link>
      <p className="text-xs sm:text-sm text-primary font-bold mb-2">
        {currency.format(product.price)}
      </p>
      <button
        onClick={addToCart}
        className="bg-secondary text-xs sm:text-sm text-white py-2 px-4 rounded hover:bg-secondary/80 w-full"
      >
        Add to cart
      </button>
    </div>
  );
}
