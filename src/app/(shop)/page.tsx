import billboard from "@/assets/images/billboard.jpg";
import ProductGrid from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "Dairy & Eggs",
  "Beverages",
  "Canned",
  "Snacks",
  "Health and Beauty",
  "Toiletries",
];

export default function Home() {
  return (
    <main>
      <section>
        <div className="bg-secondary">
          <Image
            src={billboard}
            alt="Billboard"
            className="max-h-80 object-contain"
          />
        </div>
        <div className="flex px-6 justify-between items-center mt-8 max-w-4xl mx-auto gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary">
            Welcome to First Ocean Supermarket!
          </h1>
          <Button size="lg">
            <Link href="/products">Shop now &rarr;</Link>
          </Button>
        </div>
        <p className="text-center mt-5 mb-8 text-secondary">
          The best place to find your everyday essentials.
        </p>
      </section>

      {/* About the Shop Section */}
      <section className="container py-10">
        <h2 className="text-3xl text-center font-semibold text-primary mb-6">
          About First Ocean Store
        </h2>
        <div className="text-gray-600 text-center space-y-4 text-base">
          <p>
            Welcome to First Ocean Supermarket, a world-class shopping
            destination located in the heart of Ikosi-Ketu, Lagos State,
            Nigeria. Since our inception, we have been committed to providing an
            exceptional retail experience, offering a wide variety of
            high-quality products at competitive prices, all in a modern and
            welcoming environment.
          </p>
          <p>
            At First Ocean Supermarket, we believe that shopping should be more
            than just a transaction – it should be an experience. Our shelves
            are meticulously stocked with a diverse range of products, including
            fresh produce, pantry staples, gourmet foods, household essentials,
            and specialty items from around the world. Whether you are sourcing
            local favorites or international brands, we ensure that our
            selection meets the needs of every customer.
          </p>
          <p>
            Our commitment to excellence goes beyond our products. We pride
            ourselves on delivering unparalleled customer service. Our
            knowledgeable and friendly staff are always on hand to assist,
            ensuring that your shopping experience is seamless and enjoyable. At
            First Ocean, we continually strive to set new standards in
            convenience, quality, and service.
          </p>
          <p>
            With a spacious, clean, and easily navigable store layout, we aim to
            make your shopping both comfortable and efficient. Whether you are a
            regular customer or visiting us for the first time, you can trust
            First Ocean Supermarket to provide an extraordinary shopping
            experience every time.
          </p>
          <p>
            Experience the difference at First Ocean Supermarket – where quality
            meets convenience, and customers are always our top priority.
          </p>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="container py-10">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={
                "/categories/" + category.replaceAll(" ", "-").toLowerCase()
              }
              className="bg-primary py-4 text-center text-white rounded-lg hover:bg-primary/80"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products Section  */}
      <section className="container py-10">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Our Popular Products
        </h2>
        <ProductGrid />
      </section>
    </main>
  );
}
