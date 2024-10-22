import { create } from "zustand";

interface CartStore {
  isOpen: boolean;
  toggle(): void;
}

export const cartStore = create<CartStore>((set) => ({
  isOpen: false,
  toggle() {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));
