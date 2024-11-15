import { AuthProvider } from "@/context/auth";
import { CartProvider } from "@/context/cart";
import Link from "next/link";
import { Footer } from "./(shop)/footer";
import { Header } from "./(shop)/header";

export default function NotFound() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main>
          <div className="container py-20">
            <h1 className="text-3xl font-bold mb-6 capitalize text-center">
              Page not found
            </h1>
            <p className="text-center text-gray-600">
              The link you followed does not exist.{" "}
              <Link href="/" className="underline">
                Go to shop
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
