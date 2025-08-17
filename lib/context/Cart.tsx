"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type CartItem = {
  id: string;
  productId: number;
  quantity: number;
  product: Product;
};

interface CartContextType {
  cartId: string | null;
  items: CartItem[];
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  items: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  // ✅ Fetch / create cart on mount
  useEffect(() => {
    const initCart = async () => {
      const res = await fetch("/api/cart");
      const cart = await res.json();
      setCartId(cart.id);
      setItems(cart.items || []);
    };
    initCart();
  }, []);

  const addToCart = useCallback(
    async (productId: number) => {
      if (!cartId) return;

      try {
        const response = await fetch("/api/cart-items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId, productId, quantity: 1 }),
        });

        if (!response.ok) throw new Error("Failed to add item to cart");

        const newItem = await response.json();

        setItems((prev) => {
          const exists = prev.find((item) => item.productId === productId);
          if (exists) {
            return prev.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prev, newItem];
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    [cartId]
  );

  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart-items/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove item from cart");

      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }, []);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart-items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      const updatedItem = await response.json();
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? updatedItem : item))
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartId, items, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
