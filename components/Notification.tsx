"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Type definitions
export type NotificationType = "error" | "success" | "warning" | "info";

export interface NotificationProps {
  isVisible: boolean;
  onClose?: () => void;
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number; // in milliseconds
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

const Notification = ({
  isVisible,
  onClose,
  title,
  message,
  type = "info",
  duration = 5000,
  position = "top-right",
}: NotificationProps) => {
  const [isShowing, setIsShowing] = useState(false);

  // Colors based on Ethmar brand guide
  const colors = {
    error: {
      border: "#B33030",
      icon: "#B33030",
      bg: "#FFEFEF",
    },
    success: {
      border: "#2C953F",
      icon: "#2C953F",
      bg: "#EFFFEF",
    },
    warning: {
      border: "#A5704A",
      icon: "#A5704A",
      bg: "#FFF8EF",
    },
    info: {
      border: "#2C953F",
      icon: "#2C953F",
      bg: "#EFFFEF",
    },
  };

  // Default titles based on type
  const defaultTitles = {
    error: "خطأ",
    success: "تم بنجاح",
    warning: "تنبيه",
    info: "معلومات",
  };

  // Position styles
  const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  // Animation direction based on position
  const getTransformStyle = () => {
    if (position.includes("right"))
      return isShowing ? "translate-x-0" : "translate-x-full";
    if (position.includes("left"))
      return isShowing ? "translate-x-0" : "-translate-x-full";
    if (position.includes("top"))
      return isShowing ? "translate-y-0" : "-translate-y-full";
    if (position.includes("bottom"))
      return isShowing ? "translate-y-0" : "translate-y-full";
    return isShowing ? "translate-x-0" : "translate-x-full"; // default
  };

  // Icon based on notification type
  const getIcon = () => {
    switch (type) {
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill={colors[type].icon}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill={colors[type].icon}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill={colors[type].icon}
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill={colors[type].icon}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);

      // Auto-hide after specified duration if not manually closed
      if (duration !== 0) {
        const timer = setTimeout(() => {
          setIsShowing(false);
          if (onClose) setTimeout(onClose, 300); // Call onClose after animation completes
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsShowing(false);
    }
  }, [isVisible, onClose, duration]);

  const handleClose = () => {
    setIsShowing(false);
    if (onClose) setTimeout(onClose, 300); // Call onClose after animation completes
  };

  return (
    <div
      className={`fixed ${positionStyles[position]} w-80 bg-white border-r-4 rounded-lg shadow-lg transition-all duration-300 transform ${getTransformStyle()} opacity-${isShowing ? "100" : "0"}`}
      style={{
        borderRightColor: colors[type].border,
        backgroundColor: colors[type].bg,
        zIndex: 9999,
      }}
      dir="rtl"
    >
      <div className="p-4 flex items-start">
        <div className="flex-grow">
          <div className="flex items-center">
            {getIcon()}
            <h3 className="text-gray-800 font-medium">
              {title || defaultTitles[type]}
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-600">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// NotificationProvider for global management
import React, { createContext, useContext, ReactNode } from "react";

interface NotificationContextType {
  showNotification: (
    props: Omit<NotificationProps, "isVisible" | "onClose">
  ) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<
    (NotificationProps & { id: number }) | null
  >(null);

  const showNotification = (
    props: Omit<NotificationProps, "isVisible" | "onClose">
  ) => {
    // Generate a unique ID for the notification
    const id = Date.now();
    setNotification({ ...props, isVisible: true, id });
  };

  const hideNotification = () => {
    if (notification) {
      setNotification({ ...notification, isVisible: false });
      setTimeout(() => setNotification(null), 300);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, hideNotification }}
    >
      {children}
      {notification && (
        <Notification {...notification} onClose={hideNotification} />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export default Notification;
