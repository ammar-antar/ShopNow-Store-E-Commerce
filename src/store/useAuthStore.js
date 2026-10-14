import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...INITIAL_STATE,

 setSession: (data) => {
  set({
    user: {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    },
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
},

      signOut: () => set(INITIAL_STATE),
    }),
    {
      name: "shop-now-auth",
    }
  )
);