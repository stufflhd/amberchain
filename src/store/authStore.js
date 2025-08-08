import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  logout: () => set({ user: null, isLoading: false }),
}));

export default useAuthStore;