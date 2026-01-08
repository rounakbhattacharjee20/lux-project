// src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback(
    (product) => {
      setCartItems((prev) => [...prev, product]);
    },
    [setCartItems]
  );

  // ✅ NEW: update quantity of an item by index
  const updateQuantity = useCallback(
    (index, newQuantity) => {
      if (newQuantity < 1) return; // don't go below 1
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: newQuantity };
        return updated;
      });
    },
    [setCartItems]
  );

  // ✅ NEW: remove item from cart by index
  const removeFromCart = useCallback(
    (index) => {
      setCartItems((prev) => prev.filter((_, i) => i !== index));
    },
    [setCartItems]
  );

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
