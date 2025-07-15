// components/ErrorPopup.tsx
"use client";
import React, { useState, useEffect } from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "error" | "success" | "info" | "warning";
  title?: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
  showRetry?: boolean;
  onRetry?: () => void;
}

const ErrorPopup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  type = "error",
  title,
  message,
  autoClose = true,
  duration = 5000,
  showRetry = true,
  onRetry,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showShake, setShowShake] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger entrance animation
      const timer1 = setTimeout(() => {
        setIsAnimating(true);
        // Add shake effect after entrance
        setTimeout(() => {
          setShowShake(true);
          setTimeout(() => setShowShake(false), 600);
        }, 200);
      }, 50);

      // Auto close
      if (autoClose) {
        const timer2 = setTimeout(() => {
          handleClose();
        }, duration);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }

      return () => clearTimeout(timer1);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, autoClose, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          colors: {
            bg: "bg-green-50",
            border: "border-green-200",
            text: "text-green-800",
            button: "bg-green-600 hover:bg-green-700",
            progress: "bg-green-500",
            glow: "bg-green-500/20",
          },
          title: title || "نجح",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          colors: {
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            text: "text-yellow-800",
            button: "bg-yellow-600 hover:bg-yellow-700",
            progress: "bg-yellow-500",
            glow: "bg-yellow-500/20",
          },
          title: title || "تحذير",
        };
      case "info":
        return {
          icon: Info,
          colors: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-800",
            button: "bg-blue-600 hover:bg-blue-700",
            progress: "bg-blue-500",
            glow: "bg-blue-500/20",
          },
          title: title || "معلومات",
        };
      default:
        return {
          icon: AlertCircle,
          colors: {
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-800",
            button: "bg-red-600 hover:bg-red-700",
            progress: "bg-red-500",
            glow: "bg-red-500/20",
          },
          title: title || "خطأ",
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0) translateY(-50%);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-3px) translateY(-50%);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(3px) translateY(-50%);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: translateY(-50%) scale(0.3);
            opacity: 0;
          }
          50% {
            transform: translateY(-50%) scale(1.05);
          }
          70% {
            transform: translateY(-50%) scale(0.9);
          }
          100% {
            transform: translateY(-50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }

        .animate-shrink {
          animation: shrink linear forwards;
        }
      `}</style>

      {/* Backdrop overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
        onClick={handleClose}
      />

      {/* Popup container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`
            relative max-w-md w-full pointer-events-auto
            ${isAnimating ? "animate-bounce-in" : ""}
            ${showShake ? "animate-shake" : ""}
          `}
          style={{
            transform: isAnimating
              ? "translateY(-50%) scale(1)"
              : "translateY(-50%) scale(0.3)",
            top: "10%",
            transition: "transform 0.3s ease-out",
          }}
          dir="rtl"
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 ${config.colors.glow} rounded-xl blur-xl animate-pulse-glow`}
          />

          {/* Main popup */}
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-float m-auto">
            {/* Header */}
            <div
              className={`${config.colors.bg} px-6 py-4 border-b ${config.colors.border}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center animate-slide-in">
                  <div className="relative">
                    <Icon
                      className={`w-6 h-6 ${config.colors.text} ml-2 animate-pulse`}
                    />
                  </div>
                  <h3
                    className={`text-lg font-semibold ${config.colors.text}`}
                    style={{ fontFamily: "Tajawal, sans-serif" }}
                  >
                    {config.title}
                  </h3>
                </div>

                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-110 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div
              className="p-6 animate-slide-in"
              style={{ animationDelay: "0.1s" }}
            >
              <p
                className="text-gray-700 dark:text-gray-300 text-right leading-relaxed"
                style={{ fontFamily: "Tajawal, sans-serif" }}
              >
                {message}
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-start space-x-3 space-x-reverse">
              <button
                onClick={handleClose}
                className={`px-6 py-2 ${config.colors.button} text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 animate-slide-in shadow-lg hover:shadow-xl`}
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  animationDelay: "0.2s",
                }}
              >
                إغلاق
              </button>
              {showRetry && (
                <button
                  onClick={onRetry}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95 animate-slide-in shadow-lg hover:shadow-xl"
                  style={{
                    fontFamily: "Tajawal, sans-serif",
                    animationDelay: "0.3s",
                  }}
                >
                  إعادة المحاولة
                </button>
              )}
            </div>

            {/* Progress bar */}
            {autoClose && (
              <div className="h-1 bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full ${config.colors.progress} animate-shrink`}
                  style={{
                    animationDuration: `${duration}ms`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPopup;
