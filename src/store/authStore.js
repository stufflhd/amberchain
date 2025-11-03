// import { create } from 'zustand';

// const useAuthStore = create((set) => ({
//   user: null,
//   isLoading: true,
//   setAuth: (user) => set({ user, isLoading: false }),
//   logout: () => set({ user: null, isLoading: false }),
// }));

// export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  setAuth: (user, token) => {
    set({ user, token });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}));

export default useAuthStore;
