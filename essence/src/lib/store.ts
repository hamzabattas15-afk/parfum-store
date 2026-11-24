"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, ProductSize } from "@/data/products";

export interface CartItem {
  productSlug: string;
  name: string;
  sizeMl: number;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (productSlug: string, sizeMl: number) => void;
  setQuantity: (productSlug: string, sizeMl: number, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (product, size, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productSlug === product.slug && i.sizeMl === size.ml
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing
                  ? { ...i, quantity: Math.min(i.quantity + quantity, size.stock) }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [
              ...state.items,
              {
                productSlug: product.slug,
                name: product.name,
                sizeMl: size.ml,
                price: size.price,
                quantity,
                image: product.images[0],
              },
            ],
            isOpen: true,
          };
        }),
      removeItem: (productSlug, sizeMl) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productSlug === productSlug && i.sizeMl === sizeMl)
          ),
        })),
      setQuantity: (productSlug, sizeMl, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) => !(i.productSlug === productSlug && i.sizeMl === sizeMl)
                )
              : state.items.map((i) =>
                  i.productSlug === productSlug && i.sizeMl === sizeMl
                    ? { ...i, quantity }
                    : i
                ),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "essence-cart",
      storage: createJSONStorage(() => localStorage),
      // ne jamais persister l'état "ouvert" du drawer
      partialize: (state) => ({ items: state.items }) as CartState,
    }
  )
);

export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);
