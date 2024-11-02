"use client";

import { Tables } from "@/supabase/types";
import { currency } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Tables<"products"> | null;
  quantity: number;
};

export function ProductInactiveCartItem({ product, quantity }: Props) {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-center gap-4">
        <Link
          href={product ? `/products/${product.id}` : ""}
          aria-disabled={!product}
          className="relative size-12 aspect-square"
        >
          <Image
            src={product?.image ?? "/placeholder.jpg"}
            alt={product?.name ?? "[deleted product]"}
            className="object-cover object-center"
            fill
          />
        </Link>
        <div>
          <Link
            href={product ? `/products/${product.id}` : ""}
            aria-disabled={!product}
            className="leading-none hover:underline"
          >
            {product?.name ?? "[deleted product]"}
          </Link>
          <p>{currency.format(product?.price ?? 0)}</p>
        </div>
      </div>
      <div className="text-right">
        <p>x{quantity}</p>
        <p className="font-medium">
          {currency.format((product?.price ?? 0) * quantity)}
        </p>
      </div>
    </div>
  );
}
