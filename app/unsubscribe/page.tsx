"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    lightGray: "#E4E4E4",
    darkGray: "#B3B3B3",
    brown: "#A5704A",
  };

  // Log URL parameters for debugging
  useEffect(() => {
    console.log("URL Parameters:");
    console.log("- Email:", email);
    console.log("- Token:", token);
    console.log("- Token Length:", token?.length);
  }, [email, token]);

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
      console.log("Sending unsubscribe request with:");
      console.log("- Email:", email);
      console.log("- Token:", token);

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
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

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

  return (
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-10 mx-4">
      <div className="text-center">
        {/* Logo */}
        <div
          className="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.lightGreen }}
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
        </div>

        {/* Title */}
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: colors.darkGreen }}
        >
          إدارة الاشتراك في القائمة البريدية
        </h2>

        {/* Status messages */}
        {status === "confirm" && (
          <div className="mt-6">
            <p className="text-gray-700 text-xl mb-3">
              هل أنت متأكد من إلغاء اشتراكك في القائمة البريدية؟
            </p>
            <p className="text-gray-500 text-base mb-6" dir="ltr">
              {email && email}
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button
                onClick={handleUnsubscribe}
                className="px-6 py-3 text-lg rounded text-white font-medium transition-colors"
                style={{ backgroundColor: colors.primaryGreen }}
              >
                نعم، إلغاء الاشتراك
              </button>
              <a
                href="/"
                className="px-6 py-3 text-lg rounded text-gray-700 font-medium transition-colors bg-gray-200 hover:bg-gray-300"
              >
                لا، إلغاء
              </a>
            </div>
          </div>
        )}

        {status === "loading" && (
          <div className="mt-6">
            <div
              className="animate-spin h-12 w-12 border-4 rounded-full mx-auto mb-6"
              style={{
                borderColor: colors.lightGreen,
                borderTopColor: "transparent",
              }}
            ></div>
            <p className="text-gray-600 text-xl">جاري معالجة طلبك...</p>
          </div>
        )}

        {status === "unsubscribed" && (
          <div className="mt-6">
            <div
              className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.lightGreen}30` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
            </div>
            <p className="text-gray-700 text-xl mb-3">
              {message || "تم إلغاء اشتراكك بنجاح"}
            </p>
            <p className="text-gray-500 text-base" dir="ltr">
              {email && email}
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
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
            </div>
            <p className="text-gray-700 text-xl mb-3">حدث خطأ ما</p>
            <p className="text-gray-500 text-base mb-6">
              يرجى المحاولة مرة أخرى لاحقاً أو التواصل مع الدعم
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-6 py-3 text-lg text-white rounded transition-colors"
              style={{ backgroundColor: colors.primaryGreen }}
            >
              المحاولة مرة أخرى
            </button>
          </div>
        )}

        {status === "invalid-params" && (
          <div className="mt-6">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-600"
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
            </div>
            <p className="text-gray-700 text-xl mb-3">رابط غير صالح</p>
            <p className="text-gray-500 text-base mb-6">
              يرجى استخدام رابط إلغاء الاشتراك من البريد الإلكتروني
            </p>
            <a
              href="/"
              className="inline-block mt-2 px-6 py-3 text-lg text-white rounded transition-colors"
              style={{ backgroundColor: colors.primaryGreen }}
            >
              العودة للصفحة الرئيسية
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// Loading component for Suspense fallback
const Loading = () => {
  return (
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-10 mx-4 text-center">
      <div
        className="animate-spin h-12 w-12 border-4 rounded-full mx-auto mb-6"
        style={{
          borderColor: "#6BB579",
          borderTopColor: "transparent",
        }}
      ></div>
      <p className="text-gray-600 text-xl">جاري التحميل...</p>
    </div>
  );
};

// Main page component that uses Suspense
const EthmarUnsubscribePage = () => {
  return (
    <div dir="rtl" className="font-sans flex flex-col min-h-screen bg-gray-50">
      {/* Header with logo */}
      <div
        dir="ltr"
        className="bg-gradient-to-r from-[rgb(31,104,44,90)] to-[#164B20]"
      >
        <Header />
      </div>

      {/* Main content - with flex-grow to push footer down */}
      <main className="flex-grow flex items-center justify-center py-16">
        <Suspense fallback={<Loading />}>
          <UnsubscribeContent />
        </Suspense>
      </main>

      {/* Footer - will now stick to bottom */}
      <Footer />
    </div>
  );
};

export default EthmarUnsubscribePage;
