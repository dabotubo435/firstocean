"use client";

import React, { useEffect, useState } from 'react';
import { CartProvider } from '../context/CartContext';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import Image from 'next/image';
import Footer from './Footer';

const Products: React.FC = () => {

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

};
  export default Products