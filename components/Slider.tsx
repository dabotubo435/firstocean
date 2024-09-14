"use client";

import React from 'react';
import { Carousel } from "@material-tailwind/react";
import Image from 'next/image';
  
const Slider: React.FC = () => {

  return (
    <Carousel className="rounded-xl">
      <Image src="/groimg1.jpg" alt='slider' width={1000} height={400} className='w-full h-[200px] md:h-[500px] object-cover rounded-2xl'/>
      <Image src="/groimg2.jpg" alt='slider' width={1000} height={400} className='w-full h-[200px] md:h-[500px] object-cover rounded-2xl'/>

    </Carousel>


  );
};

export default Slider;
