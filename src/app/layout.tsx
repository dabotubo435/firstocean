import { Outfit } from 'next/font/google'
import './globals.css';
import { CartProvider } from '../../context/CartContext';
import Header from '../../components/Header';

const outfit = Outfit({ 
  weight: '500',  
  subsets: ['latin'] 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
