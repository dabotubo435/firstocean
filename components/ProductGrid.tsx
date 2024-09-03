"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useCart } from '../context/CartContext';
import CartModal from '../components/CartModal';
import Notification from '../components/Notification';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);

  // Formatter for price with commas
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN', // Nigerian Naira
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification({ show: true, message: `${product.title} added to cart!` });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {products.map((product: Product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-lg text-green-700 font-bold mb-2">{formatter.format(product.price)}</p>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Include the Cart Modal */}
      <CartModal />

      {/* Notification Component */}
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
};

export default ProductGrid;
