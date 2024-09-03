"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import { useCart } from '../../context/CartContext';
import CartModal from '../../components/CartModal';
import Notification from '../../components/Notification';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductsByCategory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const router = useRouter();
  const { category } = router.query; // Get category from the URL
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (category) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', category);

        if (error) {
          console.error('Error fetching products:', error);
        } else {
          setProducts(data || []);
        }
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification({ show: true, message: `${product.title} added to cart!` });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  // Formatter for price with commas
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN', // Nigerian Naira
  });

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6 capitalize text-center">{category} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No products found for this category.</p>
        ) : (
          products.map((product: Product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-lg text-green-700 font-bold mb-4">{formatter.format(product.price)}</p>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Include the Cart Modal */}
      <CartModal />

      {/* Notification Component */}
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
};

export default ProductsByCategory;
