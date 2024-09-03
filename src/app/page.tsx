import Navbar from '../../components/Navbar';
import ProductGrid from '../../components/ProductGrid';
import { CartProvider } from '../../context/CartContext';

export default function Home() {
  return (
    <CartProvider>
      <div>
        <Navbar />
        <ProductGrid />
      </div>
    </CartProvider>
  );
}
