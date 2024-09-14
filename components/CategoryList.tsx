"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import Notification from './Notification';
import Image from 'next/image';

interface Category {
  id: string;
  category_name: string;
}

const CategoryList: React.FC = () => {

  const [categorys, setCategorys] = useState<Category[]>([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCategorys = async () => {
        const { data, error } = await supabase.from('categorylist').select('*');

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setCategorys(data || []);
        }
    };

    fetchCategorys();
  }, []);

  // Formatter for price with commas
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN', // Nigerian Naira
  });


  return (
    <div className='mt-5'>
        <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2'>
            {categorys.map((category: Category, index) => (
                <div className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200' key={index}>
                    {/* <img src={categorys.image} alt={product.title} width={50} height={50} className='group-hover:scale-125 transition-all ease-in-out' /> */}
                    <h2 className='text-green-800 '>{category.category_name}</h2>
                </div>
            ))}
        </div>
    </div>
  );
};

export default CategoryList;
