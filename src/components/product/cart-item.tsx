import { useCart } from "@/context/cart";
import { IProduct } from "@/supabase/entities/product";
import { currency } from "@/utils/formatter";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: IProduct;
  quantity: number;
};

export function CartItem({ product, quantity }: Props) {
  const { totalPrice, setQuantityInCart } = useCart();

  return (
    <div key={product.id} className="flex justify-between items-center py-3">
      <div className="flex items-center gap-4">
        <Link
          href={`/products/${product.id}`}
          className="relative size-20 aspect-square"
        >
          <Image
            src={product.image}
            alt={product.title}
            className="object-cover object-center"
            fill
          />
        </Link>
        <div>
          <Link
            href={`/products/${product.id}`}
            className="font-semibold leading-none hover:underline"
          >
            {product.title}
          </Link>
          <p className="text-green-400 font-semibold">
            {currency.format(product.price * quantity)}
          </p>
          <div className="flex items-center mt-1">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white rounded-full size-6"
              onClick={() => setQuantityInCart(product.id, quantity - 1)}
            >
              -
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white size-6 rounded-full"
              onClick={() => setQuantityInCart(product.id, quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        className="p-3 hover:text-red-500"
        onClick={() => setQuantityInCart(product.id, 0)}
      >
        <XIcon className="size-4" />
      </button>
    </div>
  );
}
