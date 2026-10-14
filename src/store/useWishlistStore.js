import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (product) => {
        const exists = get().items.some((i) => i.id === product.id);

        if (exists) {
          get().removeItem(product.id);
          return;
        }

        const {
          id,
          title,
          brand,
          category,
          price,
          discountPercentage,
          rating,
          stock,
          availabilityStatus,
          thumbnail,
        } = product;

        set({
          items: [
            ...get().items,
            {
              id,
              title,
              brand,
              category,
              price,
              discountPercentage,
              rating,
              stock,
              availabilityStatus,
              thumbnail,
            },
          ],
        });
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "shop-now-wishlist",
    }
  )
);

export const useIsInWishlist = (id) =>
  useWishlistStore((s) => s.items.some((i) => i.id === id));