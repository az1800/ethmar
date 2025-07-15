// hooks/usePopup.ts
import { useState, useCallback } from "react";

export interface PopupState {
  isOpen: boolean;
  type: "error" | "success" | "info" | "warning";
  title?: string;
  message: string;
  showRetry?: boolean;
  onRetry?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const usePopup = () => {
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    type: "error",
    message: "",
    showRetry: false,
    autoClose: true,
    duration: 5000,
  });

  const showPopup = useCallback((config: Omit<PopupState, "isOpen">) => {
    setPopup({
      isOpen: true,
      ...config,
    });
  }, []);

  const hidePopup = useCallback(() => {
    setPopup((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Convenience methods
  const showError = useCallback(
    (message: string, options?: Partial<PopupState>) => {
      showPopup({
        type: "error",
        message,
        showRetry: true,
        ...options,
      });
    },
    [showPopup]
  );

  const showSuccess = useCallback(
    (message: string, options?: Partial<PopupState>) => {
      showPopup({
        type: "success",
        message,
        showRetry: false,
        ...options,
      });
    },
    [showPopup]
  );

  const showInfo = useCallback(
    (message: string, options?: Partial<PopupState>) => {
      showPopup({
        type: "info",
        message,
        showRetry: false,
        ...options,
      });
    },
    [showPopup]
  );

  const showWarning = useCallback(
    (message: string, options?: Partial<PopupState>) => {
      showPopup({
        type: "warning",
        message,
        showRetry: false,
        ...options,
      });
    },
    [showPopup]
  );

  return {
    popup,
    showPopup,
    hidePopup,
    showError,
    showSuccess,
    showInfo,
    showWarning,
  };
};
