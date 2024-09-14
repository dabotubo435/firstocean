import { Button } from '@/components/ui/button';
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
const Header: React.FC = () => {

    const categories = ['Snacks', 'Drinks', 'home', 'books', 'toys'];  


  return (
    <div className='px-5 py-2 shadow-sm flex justify-between'>
        <div className='flex items-center gap-8'>
            <Image src="/logo.png" alt="Logo" width={80} height={30}/>
        
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>

                <LayoutGrid className='h-5 w-5'/> Category</h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-slate-200'>
                <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                    {categories.map((category, index) => (
                        <DropdownMenuItem key={index} className='flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-200'>
                            <h2>{category}</h2>
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
            </DropdownMenu>


            <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                <Search/>
                <input type='text' placeholder='Search' className='outline-none'/>
            </div>
        </div>
        <div className='flex gap-5 items-center'>
            <h2 className='flex gap-2 items-center text-lg'> <ShoppingBag/> 0</h2>
            <Button className='bg-[#31B65D] rounded-md text-white'>Login</Button>
        </div>
    </div>
  );
};

export default Header;