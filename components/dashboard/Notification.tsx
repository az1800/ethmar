"use client";
import React, { useEffect } from "react";

interface NotificationProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "";
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Notification({
  show,
  message,
  type,
  onClose,
  autoClose = true,
  duration = 3000,
}: NotificationProps) {
  useEffect(() => {
    if (show && autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, autoClose, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
      } transition-all`}
      dir="rtl"
    >
      <p className="font-arabic">{message}</p>
    </div>
  );
}
