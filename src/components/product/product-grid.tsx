"use client";

import { createSupabaseClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import { ProductItem } from "./product-item";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductGrid: React.FC = () => {
  let [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  products = [
    {
      id: "1",
      category: "food",
      image: "/banner.jpg",
      price: 40,
      title: "First food",
    },
    {
      id: "2",
      category: "food",
      image: "/banner.jpg",
      price: 40,
      title: "Second food",
    },
    {
      id: "3",
      category: "books",
      image: "/banner.jpg",
      price: 40,
      title: "Book one",
    },
    {
      id: "4",
      category: "books",
      image: "/banner.jpg",
      price: 40,
      title: "Book two",
    },
    {
      id: "5",
      category: "snacks",
      image: "/banner.jpg",
      price: 40,
      title: "Shawarma",
    },
  ];

  return (
    <div>
      {products.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
