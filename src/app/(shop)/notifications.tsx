"use client";

import { notificationStore } from "@/store/notification";
import { BellIcon } from "lucide-react";
import { useStore } from "zustand";

export function Notifications() {
  const message = useStore(notificationStore, (state) => state.message);
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-secondary text-white py-2 px-4 rounded shadow-lg z-50">
      {typeof message === "string" ? (
        <p className="flex gap-2 items-start">
          <BellIcon className="size-4" />
          <span className="leading-none">{message}</span>
        </p>
      ) : (
        message
      )}
    </div>
  );
}
