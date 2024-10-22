"use client";

import { notificationStore } from "@/store/notification";
import { IProduct } from "@/supabase/entities/product";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartContext {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (product: IProduct) => void;
  setQuantityInCart: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContext | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const displayMessage = useStore(notificationStore, (state) => state.notify);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart:items");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const addToCart = (product: IProduct) => {
    let quantity = 0;
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.product.id === product.id) {
        cartItem.quantity += 1;
        quantity = cartItem.quantity;
      }
      return cartItem;
    });
    if (!quantity) {
      quantity = 1;
      updatedCartItems.push({ product, quantity });
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cart:items", JSON.stringify(updatedCartItems));
    displayMessage(`${product.title} added to cart!`);

    return quantity;
  };

  const setQuantityInCart = (id: string, quantity: number) => {
    if (quantity <= 0) {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.product.id !== id
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cart:items", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.product.id === id) {
          cartItem.quantity = quantity;
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
      localStorage.setItem("cart:items", JSON.stringify(updatedCartItems));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cart:items", JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        setQuantityInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
