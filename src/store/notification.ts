import { create } from "zustand";

interface NotificationStore {
  message: string | null;
  notify(message: string): void;
}

let timeout: NodeJS.Timeout | null = null;

export const notificationStore = create<NotificationStore>((set, get) => ({
  message: null,
  notify(message) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    const state = get();
    if (state.message) {
      set({ message: null });
      timeout = setTimeout(() => {
        set({ message });
      }, 100);
    } else {
      set({ message });
    }
    timeout = setTimeout(() => {
      set({ message: null });
    }, 3000);
  },
}));
