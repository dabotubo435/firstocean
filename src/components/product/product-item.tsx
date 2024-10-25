import { useCart } from "@/context/cart";
import { IProduct } from "@/supabase/entities/product";
import { currency } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: IProduct;
};

export function ProductItem({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div key={product.id} className="border p-2.5 rounded-lg shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="group relative mb-4 block"
      >
        <Image
          src={product.image}
          alt={product.title}
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
        {product.title}
      </Link>
      <p className="text-xs sm:text-sm text-primary font-bold mb-2">
        {currency.format(product.price)}
      </p>
      <button
        className="bg-secondary text-xs sm:text-sm text-white py-2 px-4 rounded hover:bg-secondary/80 w-full"
        onClick={() => addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
}
