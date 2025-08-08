import { create } from "zustand";

export const useAppTheme = create((set) => ({
    isDark: localStorage.getItem("theme") === "dark" ? 1 : 0,
    setTheme: (dark) => {
        const theme = dark ? "dark" : "light";
        localStorage.setItem("theme", theme);
        set({ isDark: dark ? 1 : 0 });
    },
}));