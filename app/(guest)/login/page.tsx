"use client";
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import Header from "@/components/Header";
import { useLogin } from "@/authentication/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useLogin();

  // Ethmar palette – keep outside to avoid re‑creation
  const colors = React.useMemo(
    () => ({
      green: {
        light: "#6BB579",
        primary: "#2C953F",
        dark: "#1F682C",
        darker: "#164B20",
      },
      gray: {
        light: "#FFFFFF",
        primary: "#E4E4E4",
        dark: "#B3B3B3",
        darker: "#808080",
      },
    }),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("يرجى ملء جميع الحقول");
    await login({ email, password }); // ← wait for the promise
  };

  // Custom spring animation styles for toggle
  const toggleTransition = "all 600ms cubic-bezier(0.2, 0.8, 0.2, 1)";

  return (
    <>
      <div className="relative bg-gradient-to-r from-emerald-700 to-green-900">
        <Header />

        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjEwem0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjZoMnYxMHoiLz48L2c+PC9zdmc+')]"></div>
      </div>

      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #f3f4f6, #ffffff)",
          backgroundAttachment: "fixed",
        }}
        dir="rtl"
      >
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            {/* Title with gradient text */}
            <h2 className="mt-4 text-center text-2xl font-bold bg-gradient-to-r from-[#1F682C] to-[#2C953F] inline-block text-transparent bg-clip-text">
              تسجيل الدخول إلى حسابك
            </h2>
            {/* Decorative divider */}
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-[#1F682C] to-[#2C953F] rounded-full"></div>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-2 group-focus-within:text-[#2C953F] transition-colors duration-150"
                >
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2C953F] focus:border-transparent transition-colors duration-150"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="rtl"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-2 group-focus-within:text-[#2C953F] transition-colors duration-150"
                >
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2C953F] focus:border-transparent transition-colors duration-150"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    dir="rtl"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Remember Me Toggle - Ethmar Style */}
            {/* <div className="flex items-center justify-start mt-6">
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-14 h-4 rounded-full flex items-center focus:outline-none shadow-md relative ml-2"
                  style={{
                    backgroundColor: rememberMe
                      ? colors.green.primary
                      : colors.gray.primary,
                    transition: toggleTransition,
                  }}
                  onClick={() => setRememberMe(!rememberMe)}
                  aria-checked={rememberMe}
                  role="switch"
                >
                  <div
                    className="absolute w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: rememberMe
                        ? colors.green.dark
                        : colors.gray.dark,
                      transform: rememberMe
                        ? "translateX(-32px)"
                        : "translateX(0px)",
                      transition: toggleTransition,
                    }}
                  >
                    <div
                      className="text-white"
                      style={{
                        transform: rememberMe
                          ? "rotate(0deg) scale(1)"
                          : "rotate(0deg) scale(1)",
                        opacity: 1,
                        transition: toggleTransition,
                      }}
                    >
                      {rememberMe ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                تذكرني
              </span>
            </div> */}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white font-medium text-base focus:outline-none ${
                  isLoading
                    ? "bg-[#6BB579] cursor-not-allowed"
                    : "bg-[#4d9c5a] hover:bg-[#3f8349] focus:ring-2 focus:ring-offset-2 focus:ring-[#2C953F]"
                } transition-all duration-150 shadow-md`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin ml-2"></div>
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    تسجيل الدخول
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                      ></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
