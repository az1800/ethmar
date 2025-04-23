"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Create a client component that uses useSearchParams
const UnsubscribeContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email")?.trim();
  const token = searchParams.get("token")?.trim();
  const [status, setStatus] = useState("confirm");
  const [message, setMessage] = useState("");

  // Colors from the brand guidelines
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

  // Log URL parameters for debugging
  useEffect(() => {}, [email, token]);

  // Check for valid parameters
  useEffect(() => {
    if (!email || !token) {
      setStatus("invalid-params");
    }
  }, [email, token]);

  const handleUnsubscribe = async () => {
    setStatus("loading");

    if (!email || !token) {
      console.error("Missing email or token parameters");
      setStatus("invalid-params");
      return;
    }

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          token: token.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Log the raw response

      const data = await response.json();

      if (!response.ok || data.error) {
        console.error("Unsubscribe error:", data.error);
        setStatus("error");
      } else {
        if (data.message === "Already unsubscribed") {
          setMessage("تم إلغاء اشتراكك مسبقاً");
        }
        setStatus("unsubscribed");
      }
    } catch (error) {
      console.error("Unsubscribe request failed:", error);
      setStatus("error");
    }
  };

  // Define animations for status transitions
  const containerVariants = {
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
          style={{ backgroundColor: `${colors.lightGreen}` }}
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
          إدارة الاشتراك في القائمة البريدية
        </h2>

        {/* Status messages */}
        {status === "confirm" && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-700 text-xl mb-4">
              هل أنت متأكد من إلغاء اشتراكك في القائمة البريدية؟
            </p>
            <div
              className="py-3 px-6 rounded-lg mb-8 mx-auto max-w-md"
              style={{ backgroundColor: colors.lightGray }}
            >
              <p className="text-gray-700 text-lg font-medium" dir="ltr">
                {email && email}
              </p>
            </div>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <motion.button
                onClick={handleUnsubscribe}
                className="px-8 py-3 text-lg rounded-lg text-white font-medium transition-colors"
                style={{ backgroundColor: colors.primaryGreen }}
                whileHover={{
                  backgroundColor: colors.darkGreen,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                نعم، إلغاء الاشتراك
              </motion.button>
              <motion.a
                href="/"
                className="px-8 py-3 text-lg rounded-lg text-gray-700 font-medium transition-colors bg-gray-200"
                whileHover={{
                  backgroundColor: colors.mediumGray,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                لا، إلغاء
              </motion.a>
            </div>
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

        {status === "unsubscribed" && (
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
              {message || "تم إلغاء اشتراكك بنجاح"}
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
              يرجى المحاولة مرة أخرى لاحقاً أو التواصل مع الدعم
            </p>
            <motion.button
              onClick={() => window.location.reload()}
              className="mt-2 px-8 py-3 text-lg text-white rounded-lg font-medium transition-colors"
              style={{ backgroundColor: colors.primaryGreen }}
              whileHover={{
                backgroundColor: colors.darkGreen,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              المحاولة مرة أخرى
            </motion.button>
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
              يرجى استخدام رابط إلغاء الاشتراك من البريد الإلكتروني
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
  );
};

// Loading component for Suspense fallback
const Loading = () => {
  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 mx-4 text-center">
      <div
        className="animate-spin h-14 w-14 border-4 rounded-full mx-auto mb-6"
        style={{
          borderColor: "#6BB57950",
          borderTopColor: "#2C953F",
        }}
      ></div>
      <p className="text-gray-600 text-xl">جاري التحميل...</p>
    </div>
  );
};

// Main page component that uses Suspense
const EthmarUnsubscribePage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-[rgb(31,104,44,90)] to-[#164B20]">
        <Header />
      </div>
      <div
        dir="rtl"
        className="font-sans flex flex-col min-h-screen"
        style={{ background: "linear-gradient(to bottom, #F9FBF9, #F5F5F5)" }}
      >
        {/* Main content - with flex-grow to push footer down */}
        <main className="flex-grow flex items-center justify-center py-16">
          <Suspense fallback={<Loading />}>
            <UnsubscribeContent />
          </Suspense>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default EthmarUnsubscribePage;
