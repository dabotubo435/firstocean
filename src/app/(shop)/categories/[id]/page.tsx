"use client";

import { ProductItem } from "@/components/product/product-item";
import { createSupabaseClient } from "@/supabase/client";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function Category({ params }: { params: { id: string } }) {
  const categoryId = decodeURIComponent(params.id);
  let [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", categoryId);
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };
    fetchProductsByCategory();
  }, [categoryId]);

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
      image: "/groimg1.jpg",
      price: 40,
      title: "Book one",
    },
    {
      id: "4",
      category: "books",
      image: "/groimg2.jpg",
      price: 40,
      title: "Book two",
    },
    {
      id: "5",
      category: "snacks",
      image: "/banner-image.webp",
      price: 40,
      title: "Shawarma",
    },
  ];

  return (
    <main>
      <section className="container py-10">
        <h1 className="text-3xl font-bold mb-6 capitalize text-center">
          {categoryId.replaceAll("-", " ")} Products
        </h1>
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
      </section>
    </main>
  );
}
