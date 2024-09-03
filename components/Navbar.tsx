import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  const categories = ['Snacks', 'Drinks', 'home', 'books', 'toys']; // Example categories

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Store
        </Link>
        <ul className="flex space-x-4">
          {categories.map((category) => (
            <li key={category}>
              <Link href={`/products/${category}`} className="hover:text-green-400 capitalize">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
