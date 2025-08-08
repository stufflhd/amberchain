import { create } from "zustand";

const useLoadingStore = create((set) => ({
    isLoadingGlobally: false,
    setIsLoadingGlobally: (loading) => set({ isLoadingGlobally: loading })
}));

export default useLoadingStore;
