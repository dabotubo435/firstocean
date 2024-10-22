"use client";

import { useCart } from "@/context/cart";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export function HeaderCart() {
  const { cartItems } = useCart();

  return (
    <Link href="/checkout" className="flex gap-2 items-center">
      <ShoppingBagIcon className="size-5" /> {cartItems.length}
    </Link>
  );
}
