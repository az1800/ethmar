"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

export default function ResubscribePage() {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "invalid-params"
  >("idle");
  const [message, setMessage] = useState<string>("");
  const [autoSubmitted, setAutoSubmitted] = useState<boolean>(false);

  // Colors from the brand guidelines (matching unsubscribe page)
  const colors = {
    primaryGreen: "#2C953F",
    darkGreen: "#1F682C",
    darkerGreen: "#164B20",
    lightGreen: "#6BB579",
    white: "#FFFFFF",
    lightGray: "#F5F5F5",
    mediumGray: "#E4E4E4",
    darkGray: "#B3B3B3",
    brown: "#A5704A",
  };

  // Extract email and token from URL parameters and handle page state
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        const emailParam = url.searchParams.get("email");
        const tokenParam = url.searchParams.get("token");

        if (emailParam) setEmail(decodeURIComponent(emailParam));
        if (tokenParam) setToken(tokenParam);

        // Auto-submit if both parameters are present
        if (emailParam && tokenParam && !autoSubmitted) {
          setAutoSubmitted(true);
          handleResubscribe(decodeURIComponent(emailParam), tokenParam);
        } else if (!emailParam || !tokenParam) {
          // If URL doesn't have both required parameters, show error state
          setStatus("invalid-params");
          setMessage(
            "رابط إعادة الاشتراك غير صالح أو ناقص. الرجاء التحقق من استخدام الرابط الكامل المرسل إلى بريدك الإلكتروني."
          );
        }
      } catch (error) {
        console.error("Error parsing URL parameters:", error);
        setStatus("error");
        setMessage("حدث خطأ أثناء معالجة رابط إعادة الاشتراك.");
      }
    }
  }, [autoSubmitted]);

  // Handle resubscribe for both direct links and manual submissions
  const handleResubscribe = async (
    emailValue?: string,
    tokenValue?: string
  ): Promise<void> => {
    // Use provided values or form values
    const emailToUse = emailValue || email;
    const tokenToUse = tokenValue || token;

    if (!emailToUse || !tokenToUse) {
      setStatus("invalid-params");
      setMessage("البريد الإلكتروني أو رمز التحقق غير صالح");
      return;
    }

    setLoading(true);
    setStatus("loading");

    try {
      const response = await fetch("/api/resubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailToUse,
          token: tokenToUse,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "تم إعادة تفعيل اشتراكك بنجاح!");
      } else {
        setStatus("error");
        setMessage(data.error || "حدث خطأ أثناء إعادة الاشتراك");
      }
    } catch (error) {
      setStatus("error");
      setMessage("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  // Define animations for status transitions
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#2C953F] via-[#1F682C] to-[#164B20]">
        <Header />
      </div>
      <div
        dir="rtl"
        className="font-sans flex flex-col min-h-screen"
        style={{ background: "linear-gradient(to bottom, #F9FBF9, #F5F5F5)" }}
      >
        <main className="flex-grow flex items-center justify-center py-16">
          <motion.div
            className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 mx-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className="text-center">
              {/* Logo */}
              <motion.div
                className="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.lightGreen }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={colors.darkGreen}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.div>

              {/* Title */}
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: colors.darkGreen }}
              >
                إعادة الاشتراك في القائمة البريدية
              </h2>

              {/* Status and states - matching unsubscribe page */}
              {status === "idle" && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-700 text-xl mb-4">
                    جاري التحقق من بيانات إعادة الاشتراك...
                  </p>
                  <motion.div
                    className="flex justify-center mt-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <motion.div
                      className="h-14 w-14 border-4 rounded-full"
                      style={{
                        borderColor: `${colors.lightGreen}50`,
                        borderTopColor: colors.primaryGreen,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                  </motion.div>
                </motion.div>
              )}

              {status === "loading" && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="h-16 w-16 border-4 rounded-full mb-6"
                      style={{
                        borderColor: `${colors.lightGreen}50`,
                        borderTopColor: colors.primaryGreen,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                    <p className="text-gray-600 text-xl">جاري معالجة طلبك...</p>
                  </div>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.lightGreen}30` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      delay: 0.2,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={colors.darkGreen}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <p className="text-gray-700 text-2xl mb-4 font-medium">
                    {message || "تم إعادة تفعيل اشتراكك بنجاح!"}
                  </p>
                  <div
                    className="py-3 px-6 rounded-lg mb-6 mx-auto max-w-md"
                    style={{ backgroundColor: colors.lightGray }}
                  >
                    <p className="text-gray-700 text-lg" dir="ltr">
                      {email && email}
                    </p>
                  </div>
                  <motion.a
                    href="/"
                    className="inline-block mt-4 px-8 py-3 text-lg rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: colors.primaryGreen }}
                    whileHover={{
                      backgroundColor: colors.darkGreen,
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    العودة للصفحة الرئيسية
                  </motion.a>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center bg-red-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.div>
                  <p className="text-gray-700 text-2xl mb-3 font-medium">
                    حدث خطأ ما
                  </p>
                  <p className="text-gray-500 text-lg mb-6">
                    {message ||
                      "يرجى المحاولة مرة أخرى لاحقاً أو التواصل مع الدعم"}
                  </p>
                  <div className="flex justify-center space-x-4 space-x-reverse">
                    <motion.a
                      href="mailto:support@ethmar.xyz?subject=مشكلة في إعادة الاشتراك"
                      className="px-8 py-3 text-lg rounded-lg text-white font-medium transition-colors"
                      style={{ backgroundColor: colors.primaryGreen }}
                      whileHover={{
                        backgroundColor: colors.darkGreen,
                        scale: 1.02,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      تواصل مع الدعم
                    </motion.a>
                    <motion.a
                      href="/"
                      className="px-8 py-3 text-lg rounded-lg text-gray-700 font-medium transition-colors bg-gray-200"
                      whileHover={{
                        backgroundColor: colors.mediumGray,
                        scale: 1.02,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      العودة للرئيسية
                    </motion.a>
                  </div>
                </motion.div>
              )}

              {status === "invalid-params" && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center bg-yellow-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </motion.div>
                  <p className="text-gray-700 text-2xl mb-3 font-medium">
                    رابط غير صالح
                  </p>
                  <p className="text-gray-500 text-lg mb-6">
                    {message ||
                      "يرجى استخدام رابط إعادة الاشتراك من البريد الإلكتروني"}
                  </p>
                  <motion.a
                    href="/"
                    className="inline-block mt-2 px-8 py-3 text-lg text-white rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: colors.primaryGreen }}
                    whileHover={{
                      backgroundColor: colors.darkGreen,
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    العودة للصفحة الرئيسية
                  </motion.a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
}
