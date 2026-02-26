"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { Product } from "@/types/product";
import { cartReducer, initialCartState } from "@/context/cart-reducer";

type CartContextValue = {
  items: ReturnType<typeof useCartState>["items"];
  itemCount: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "revoshop_cart";

function useCartState() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, (base) => {
    if (typeof window === "undefined") return base;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : base;
    } catch {
      return base;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return { state, dispatch, items: state.items };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useCartState();

  const value: CartContextValue = {
    items: state.items,
    itemCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addItem: (product) => dispatch({ type: "ADD_ITEM", payload: product }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
    updateQty: (id, quantity) => dispatch({ type: "UPDATE_QTY", payload: { id, quantity } }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used in CartProvider");
  return context;
}
