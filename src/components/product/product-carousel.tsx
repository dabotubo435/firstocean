import Image from "next/image";

export function ProductCarousel() {
  return (
    <div className="top-0 left-0 bottom-0 w-full bg-gray-800 text-white p-4 z-10">
      <div className="flex gap-2">
        <div>
          <Image
            src="/images/banner1.jpg"
            alt="Banner 1"
            className="h-full object-cover"
            width={320}
            height={320}
          />
        </div>
        <div>
          <Image
            src="/images/banner2.jpg"
            alt="Banner 2"
            className="h-full object-cover"
            width={320}
            height={320}
          />
        </div>
        <div>
          <Image
            src="/images/banner3.jpeg"
            alt="Banner 3"
            className="h-full object-cover"
            width={320}
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
