import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,

      addItem: (product, qty = 1) => {
        const existing = get().items.find((i) => i.id === product.id);

        if (existing) {
          get().updateQuantity(product.id, existing.quantity + qty);
          return;
        }
const {
  id, title, brand, category,
  price, discountPercentage, thumbnail, stock
} = product;

        set({
          items: [
            ...get().items,
            { id, title, brand, category, price, discountPercentage, thumbnail, quantity: qty,stock },
          ],
        });
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
          ),
        });
      },

      clearCart: () => set({ items: [], promoCode: null }),

      applyPromo: (code) => {
        const normalized = String(code).trim().toUpperCase();
        if (normalized === "DUMMY15") {
          set({ promoCode: "DUMMY15" });
          return true;
        }
        return false;
      },

      removePromo: () => set({ promoCode: null }),
    }),
    { name: "ShopNow-cart" }
  )
);