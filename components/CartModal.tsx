"use client";

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartModal: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems, email }),
    });

    if (res.ok) {
      clearCart(); // Clear the cart after successful checkout
      alert('Order placed successfully!');
    } else {
      alert('Failed to place order');
    }
  };

  return (
    <>
      {/* Toggle Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full"
      >
        Cart ({cartItems.length})
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <div className="overflow-y-auto max-h-64"> {/* Scrollable cart items */}
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex justify-between items-center">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                        <div className="flex-grow ml-4">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <p className="text-green-400 font-bold">₦{item.price}</p>
                          <div className="flex items-center mt-2">
                            <button
                              className="bg-gray-600 text-white p-1 rounded"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              className="bg-gray-600 text-white p-1 rounded"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="bg-red-500 text-white p-2 rounded"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold">Total: ₦{totalPrice.toFixed(2)}</h3>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    className="bg-green-600 text-white w-full py-2 mt-4 rounded"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
