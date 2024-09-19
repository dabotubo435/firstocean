"use client";

import React, { useEffect, useState } from 'react';
import { CartProvider } from '../../context/CartContext';
import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/ProductList';
import Image from 'next/image';
import Footer from '../../components/Footer';

export default function Home() {


  return (
    <CartProvider>
      <div className='p-10 px-5 md:px-16'>
         {/* <Slider />  */}
        <CategoryList />
        <ProductList />
        <Image src='/banner.jpg' width={1000} height={300} alt='banner' className='my-5 w-full h-[300px] object-contain'/>
        <Footer />
      </div>
    </CartProvider>
  );
}
