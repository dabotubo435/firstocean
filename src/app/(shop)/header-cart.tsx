"use client";

import { useCart } from "@/context/cart";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export function HeaderCart() {
  const { cart } = useCart();

  return (
    <Link
      href="/checkout"
      className="flex gap-2 items-center hover:bg-primary/20 transition-colors px-2 py-1.5 rounded-md"
    >
      <ShoppingBagIcon className="size-5" /> {cart.length}
    </Link>
  );
}
