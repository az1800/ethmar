"use client";
// app/resubscribe/page.tsx
import React, { useState, useEffect, Suspense } from "react";

const Loading = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-gray-50"
    dir="rtl"
  >
    <div className="text-center">
      <div className="inline-block animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      <p className="mt-4 text-gray-600">جاري التحميل...</p>
    </div>
  </div>
);

const ResubscribeContent = () => {
  // Import useSearchParams dynamically to avoid SSR issues
  const [searchParamsHook, setSearchParamsHook] = useState<any>(null);

  useEffect(() => {
    import("next/navigation").then((mod) => {
      setSearchParamsHook(() => mod.useSearchParams);
    });
  }, []);

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  // Extract email and token from URL parameters
  useEffect(() => {
    if (!searchParamsHook) return;

    const searchParams = searchParamsHook();
    const emailParam = searchParams?.get("email");
    const tokenParam = searchParams?.get("token");

    if (emailParam) setEmail(decodeURIComponent(emailParam));
    if (tokenParam) setToken(tokenParam);

    // Auto-submit if both parameters are present
    if (emailParam && tokenParam && !autoSubmitted) {
      setAutoSubmitted(true);
      handleResubscribe();
    }
  }, [searchParamsHook, autoSubmitted]);

  const handleResubscribe = async () => {
    if (!email || !token) {
      setStatus("error");
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
        body: JSON.stringify({ email, token }),
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
      console.error("Resubscribe error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <img
            className="mx-auto h-20 w-auto"
            src="https://nqveldgyeonkhrsrsjbn.supabase.co/storage/v1/object/public/companies/ethmarlogoS.svg"
            alt="شعار إثمار"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            إعادة الاشتراك
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            أهلاً بك مجدداً في مجتمع إثمار للشراكة الطلابية
          </p>
        </div>

        {status === "idle" || status === "loading" ? (
          <div className="space-y-4">
            {!autoSubmitted && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="token"
                    className="block text-sm font-medium text-gray-700"
                  >
                    رمز التحقق
                  </label>
                  <input
                    id="token"
                    name="token"
                    type="text"
                    required
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleResubscribe}
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {loading ? "جاري المعالجة..." : "إعادة الاشتراك"}
                  </button>
                </div>
              </>
            )}

            {loading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
                <p className="mt-2 text-gray-600">
                  جاري إعادة تفعيل اشتراكك...
                </p>
              </div>
            )}
          </div>
        ) : status === "success" ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mr-3">
                <h3 className="text-sm font-medium text-green-800">
                  تم إعادة الاشتراك بنجاح
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>{message}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    العودة للرئيسية
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mr-3">
                <h3 className="text-sm font-medium text-red-800">حدث خطأ</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{message}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setMessage("");
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    المحاولة مرة أخرى
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            لديك أسئلة؟{" "}
            <a
              href="mailto:support@ethmar.xyz"
              className="font-medium text-green-600 hover:text-green-500"
            >
              تواصل معنا
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ResubscribePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResubscribeContent />
    </Suspense>
  );
}
