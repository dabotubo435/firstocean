import { ProductCarousel } from "@/components/product/product-carousel";
import Image from "next/image";

export default function Products() {
  return (
    <main className="p-10 px-5 md:px-16">
      <ProductCarousel />
      <Image
        src="/banner.jpg"
        width={1000}
        height={300}
        alt="banner"
        className="my-5 w-full h-[300px] object-contain"
      />
    </main>
  );
}
