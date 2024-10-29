"use client";

import { createSupabaseClient } from "@/supabase/client";
import { useSupabase } from "@/supabase/hooks";
import { Tables, TablesInsert } from "@/supabase/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./auth";

export type CartWithProduct = Tables<"carts"> & {
  product: Tables<"products"> | null;
};

interface CartContext {
  cart: CartWithProduct[];
  totalPrice: number;
  addToLocalCart: (product: Tables<"products">) => void;
  removeFromLocalCart: (productId: Tables<"products">["id"]) => void;
  clearFromLocalCart: (productId: Tables<"products">["id"]) => void;
  clearLocalCart: () => void;
  refresh: () => Promise<void>;
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
  const [localCart, setLocalCart] = useState<CartWithProduct[]>([]);
  const { session } = useAuth();
  const { query: cartQuery, refetch } = useSupabase(
    (supabase) =>
      supabase
        .from("carts")
        .select("*, product:products(*)")
        .eq("user_id", session?.user.id ?? "")
        .order("created_at", { ascending: false }),
    {
      disabled: !session?.user.id,
    }
  );
  const serverCart: CartWithProduct[] | undefined =
    cartQuery?.data ?? undefined;
  const cart = serverCart ?? localCart;

  // sync local cart to supabase
  useEffect(() => {
    async function syncCart() {
      if (!session?.user) return;
      if (!localCart.length) return;

      try {
        const supabase = createSupabaseClient();
        const { error, count } = await supabase
          .from("carts")
          .select("*", { count: "exact" })
          .eq("user_id", session.user.id);
        if (!error && !count) {
          await supabase
            .from("carts")
            .insert(
              localCart.map(
                (cartItem): TablesInsert<"carts"> => ({
                  user_id: session.user.id,
                  product_id: cartItem.product_id,
                  quantity: cartItem.quantity,
                })
              )
            )
            .select();
          localStorage.setItem("cart:items", JSON.stringify([]));
          console.log("synced cart");
        }
      } catch (error) {
        console.log("failed to sync cart:", error);
      }
    }
    syncCart();
  }, [session?.user, localCart]);

  // get carts from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart:items");
    if (savedCart) setLocalCart(JSON.parse(savedCart));
  }, []);

  // add to cart and update local storage
  const addToLocalCart = (product: Tables<"products">) => {
    let quantity = 0;
    const updatedCartItems = localCart.map((cartItem) => {
      if (cartItem.product_id === product.id) {
        quantity = ++cartItem.quantity;
      }
      return cartItem;
    });
    if (!quantity) {
      updatedCartItems.unshift({
        user_id: "",
        product_id: product.id,
        product,
        quantity: ++quantity,
        created_at: new Date().toISOString(),
      });
    }
    setLocalCart(updatedCartItems);
    localStorage.setItem("cart:items", JSON.stringify(updatedCartItems));
    return quantity;
  };

  // update cart and update local storage
  const removeFromLocalCart = (productId: Tables<"products">["id"]) => {
    const cartProduct = localCart.find(
      (cartItem) => cartItem.product_id === productId
    );
    if (!cartProduct) return;

    if (cartProduct.quantity <= 1) {
      const updatedCartItems = localCart.filter(
        (cartItem) => cartItem.product_id !== productId
      );
      setLocalCart(updatedCartItems);
      localStorage.setItem("cart:items", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = localCart.map((cartItem) => {
        if (cartItem.product_id === productId) {
          --cartItem.quantity;
        }
        return cartItem;
      });
      setLocalCart(updatedCartItems);
      localStorage.setItem("cart:items", JSON.stringify(updatedCartItems));
    }
  };

  // update cart and update local storage
  const clearFromLocalCart = (productId: Tables<"products">["id"]) => {
    const updatedCartItems = localCart.filter(
      (cartItem) => cartItem.product_id !== productId
    );
    setLocalCart(updatedCartItems);
    localStorage.setItem("cart:items", JSON.stringify(updatedCartItems));
  };

  // clear cart and remove from local storage
  const clearLocalCart = () => {
    setLocalCart([]);
    localStorage.setItem("cart:items", JSON.stringify([]));
  };

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, { product, quantity }) =>
          total + (product?.price ?? 0) * quantity,
        0
      ),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToLocalCart,
        removeFromLocalCart,
        clearFromLocalCart,
        clearLocalCart,
        refresh: refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
