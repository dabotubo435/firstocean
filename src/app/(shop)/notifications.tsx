"use client";

import { notificationStore } from "@/store/notification";
import { BellIcon } from "lucide-react";
import { useStore } from "zustand";

export function Notifications() {
  const message = useStore(notificationStore, (state) => state.message);
  if (!message) return null;
  return (
    <div className="fixed top-4 flex gap-2 items-start right-4 bg-green-600 text-white py-2 px-4 rounded shadow-lg z-50">
      <BellIcon className="size-4" />
      <p className="leading-none">{message}</p>
    </div>
  );
}
