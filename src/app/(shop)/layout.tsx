import { AuthProvider } from "@/context/auth";
import { CartProvider } from "@/context/cart";
import { ReactNode } from "react";
import { Cart } from "./cart";
import { Footer } from "./footer";
import { Header } from "./header";
import { Notifications } from "./notifications";

export default function ShopLayout(props: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        {props.children}
        <Cart />
        <Footer />
        <Notifications />
      </CartProvider>
    </AuthProvider>
  );
}
