"use client";

import { useState } from 'react';
import Link from "next/link";
import ProductGrid from '../components/ProductGrid';
import CartModal from '../components/CartModal';
import Notification from '../components/Notification';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Footer from './Footer';

const HomePage = () => {
  const { cartItems } = useCart();
  const [notification, setNotification] = useState({ show: false, message: '' });

  return (
    <div className="bg-white">
     
      {/* Banner Section */}
      <div className="bg-green-100 py-10 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-green-700">
              Welcome to First Ocean Supermarket!
            </h1>
            <p className="text-lg mt-4 text-green-600">
              The best place to find your everyday essentials.
            </p>
            <Link href="/Products">
                <button className="bg-green-600 text-white py-3 px-6 rounded mt-6 hover:bg-green-700">
                Shop Now
                </button>
            </Link>
          </div>
          <div className="relative w-full lg:w-1/2 h-64">
            <Image
              src="/banner-image.webp" // Add appropriate banner image path
              alt="Shop Banner"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      {/* About the Shop Section */}
      <section className="container mx-auto my-8 text-center">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">About First Ocean Store</h2>
        <p className="text-lg text-gray-600">
        Welcome to First Ocean Supermarket, a world-class shopping destination located in the heart of Ikosi-Ketu, Lagos State, Nigeria. Since our inception, we have been committed to providing an exceptional retail experience, offering a wide variety of high-quality products at competitive prices, all in a modern and welcoming environment.

        </p>
        <p className="text-lg text-gray-600 mt-4">
        At First Ocean Supermarket, we believe that shopping should be more than just a transaction – it should be an experience. Our shelves are meticulously stocked with a diverse range of products, including fresh produce, pantry staples, gourmet foods, household essentials, and specialty items from around the world. Whether you're sourcing local favorites or international brands, we ensure that our selection meets the needs of every customer.

        </p>
        <p className="text-lg text-gray-600 mt-4">
        Our commitment to excellence goes beyond our products. We pride ourselves on delivering unparalleled customer service. Our knowledgeable and friendly staff are always on hand to assist, ensuring that your shopping experience is seamless and enjoyable. At First Ocean, we continually strive to set new standards in convenience, quality, and service.

        </p>
        <p  className="text-lg text-gray-600 mt-4">
        With a spacious, clean, and easily navigable store layout, we aim to make your shopping both comfortable and efficient. Whether you're a regular customer or visiting us for the first time, you can trust First Ocean Supermarket to provide an extraordinary shopping experience every time.

        </p>
        <p className="text-lg text-gray-600 mt-4">
        Experience the difference at First Ocean Supermarket – where quality meets convenience, and customers are always our top priority.
        </p>
      </section>

      {/* Shop by Category Section */}
      <section className="container mx-auto my-8">
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {['Dairy & Eggs', 'Beverages', 'Canned', 'Snacks', 'Health and Beauty', 'Toiletries'].map(
            (category) => (
              <div
                key={category}
                className="bg-green-200 py-4 text-center rounded-lg hover:bg-green-300 cursor-pointer"
              >
                {category}
              </div>
            )
          )}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="container mx-auto my-8">
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">Our Popular Products</h2>
        <ProductGrid />
      </section>

      {/* Cart Modal & Notification Components */}
      <CartModal />
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
};

export default HomePage;
