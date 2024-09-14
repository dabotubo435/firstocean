"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import Notification from './Notification';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
  }
  

const ProductList: React.FC = () => {
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
    <div className='mt-10'>
        <h2 className='text-green-600 font-bold text-2xl'>Our Popular Products</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6'>
            {products.map((product, index) => (
              <div key={index} className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer'>
                <img src={product.image} alt={product.title} width={400} height={200} className='w-[200px] h-[200px] object-contain'/>

                <h2 className='font-bold font-lg'>{product.title}</h2>
                <div className='flex gap-3'>
                  <h2 className='font-bold'>{formatter.format(product.price)}</h2>
                </div>
                <Button variant="outline" className='text-[#31B65D] hover:text-white hover:bg-[#31B65D]' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
               </div> 
            ))}
        </div>
    </div>
  );
};

export default ProductList;
