// "use client";
// import React, { useState, useEffect, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// // Create a client component that uses useSearchParams
// const UnsubscribeContent = () => {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email")?.trim();
//   const token = searchParams.get("token")?.trim();
//   const [status, setStatus] = useState("confirm");
//   const [message, setMessage] = useState("");

//   // Colors from the brand guidelines
//   const colors = {
//     primaryGreen: "#2C953F",
//     darkGreen: "#1F682C",
//     darkerGreen: "#164B20",
//     lightGreen: "#6BB579",
//     white: "#FFFFFF",
//     lightGray: "#E4E4E4",
//     darkGray: "#B3B3B3",
//     brown: "#A5704A",
//   };

//   // Log URL parameters for debugging
//   useEffect(() => {
//     console.log("URL Parameters:");
//     console.log("- Email:", email);
//     console.log("- Token:", token);
//     console.log("- Token Length:", token?.length);
//   }, [email, token]);

//   // Check for valid parameters
//   useEffect(() => {
//     if (!email || !token) {
//       setStatus("invalid-params");
//     }
//   }, [email, token]);

//   const handleUnsubscribe = async () => {
//     setStatus("loading");

//     if (!email || !token) {
//       console.error("Missing email or token parameters");
//       setStatus("invalid-params");
//       return;
//     }

//     try {
//       console.log("Sending unsubscribe request with:");
//       console.log("- Email:", email);
//       console.log("- Token:", token);

//       const response = await fetch("/api/unsubscribe", {
//         method: "POST",
//         body: JSON.stringify({
//           email: email.trim(),
//           token: token.trim(),
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       // Log the raw response
//       console.log("Response status:", response.status);

//       const data = await response.json();
//       console.log("Response data:", data);

//       if (!response.ok || data.error) {
//         console.error("Unsubscribe error:", data.error);
//         setStatus("error");
//       } else {
//         if (data.message === "Already unsubscribed") {
//           setMessage("تم إلغاء اشتراكك مسبقاً");
//         }
//         setStatus("unsubscribed");
//       }
//     } catch (error) {
//       console.error("Unsubscribe request failed:", error);
//       setStatus("error");
//     }
//   };

//   return (
//     <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-10 mx-4">
//       <div className="text-center">
//         {/* Logo */}
//         <div
//           className="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center"
//           style={{ backgroundColor: colors.lightGreen }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-12 w-12"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke={colors.darkGreen}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//             />
//           </svg>
//         </div>

//         {/* Title */}
//         <h2
//           className="text-3xl font-bold mb-4"
//           style={{ color: colors.darkGreen }}
//         >
//           إدارة الاشتراك في القائمة البريدية
//         </h2>

//         {/* Status messages */}
//         {status === "confirm" && (
//           <div className="mt-6">
//             <p className="text-gray-700 text-xl mb-3">
//               هل أنت متأكد من إلغاء اشتراكك في القائمة البريدية؟
//             </p>
//             <p className="text-gray-500 text-base mb-6" dir="ltr">
//               {email && email}
//             </p>
//             <div className="flex justify-center space-x-4 space-x-reverse">
//               <button
//                 onClick={handleUnsubscribe}
//                 className="px-6 py-3 text-lg rounded text-white font-medium transition-colors"
//                 style={{ backgroundColor: colors.primaryGreen }}
//               >
//                 نعم، إلغاء الاشتراك
//               </button>
//               <a
//                 href="/"
//                 className="px-6 py-3 text-lg rounded text-gray-700 font-medium transition-colors bg-gray-200 hover:bg-gray-300"
//               >
//                 لا، إلغاء
//               </a>
//             </div>
//           </div>
//         )}

//         {status === "loading" && (
//           <div className="mt-6">
//             <div
//               className="animate-spin h-12 w-12 border-4 rounded-full mx-auto mb-6"
//               style={{
//                 borderColor: colors.lightGreen,
//                 borderTopColor: "transparent",
//               }}
//             ></div>
//             <p className="text-gray-600 text-xl">جاري معالجة طلبك...</p>
//           </div>
//         )}

//         {status === "unsubscribed" && (
//           <div className="mt-6">
//             <div
//               className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
//               style={{ backgroundColor: `${colors.lightGreen}30` }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke={colors.darkGreen}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//             <p className="text-gray-700 text-xl mb-3">
//               {message || "تم إلغاء اشتراكك بنجاح"}
//             </p>
//             <p className="text-gray-500 text-base" dir="ltr">
//               {email && email}
//             </p>
//           </div>
//         )}

//         {status === "error" && (
//           <div className="mt-6">
//             <div className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center bg-red-100">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8 text-red-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <p className="text-gray-700 text-xl mb-3">حدث خطأ ما</p>
//             <p className="text-gray-500 text-base mb-6">
//               يرجى المحاولة مرة أخرى لاحقاً أو التواصل مع الدعم
//             </p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-2 px-6 py-3 text-lg text-white rounded transition-colors"
//               style={{ backgroundColor: colors.primaryGreen }}
//             >
//               المحاولة مرة أخرى
//             </button>
//           </div>
//         )}

//         {status === "invalid-params" && (
//           <div className="mt-6">
//             <div className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8 text-yellow-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                 />
//               </svg>
//             </div>
//             <p className="text-gray-700 text-xl mb-3">رابط غير صالح</p>
//             <p className="text-gray-500 text-base mb-6">
//               يرجى استخدام رابط إلغاء الاشتراك من البريد الإلكتروني
//             </p>
//             <a
//               href="/"
//               className="inline-block mt-2 px-6 py-3 text-lg text-white rounded transition-colors"
//               style={{ backgroundColor: colors.primaryGreen }}
//             >
//               العودة للصفحة الرئيسية
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Loading component for Suspense fallback
// const Loading = () => {
//   return (
//     <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-10 mx-4 text-center">
//       <div
//         className="animate-spin h-12 w-12 border-4 rounded-full mx-auto mb-6"
//         style={{
//           borderColor: "#6BB579",
//           borderTopColor: "transparent",
//         }}
//       ></div>
//       <p className="text-gray-600 text-xl">جاري التحميل...</p>
//     </div>
//   );
// };

// // Main page component that uses Suspense
// const EthmarUnsubscribePage = () => {
//   return (
//     <div dir="rtl" className="font-sans flex flex-col min-h-screen bg-gray-50">
//       {/* Header with logo */}
//       <div
//         dir="ltr"
//         className="bg-gradient-to-r from-[rgb(31,104,44,90)] to-[#164B20]"
//       >
//         <Header />
//       </div>

//       {/* Main content - with flex-grow to push footer down */}
//       <main className="flex-grow flex items-center justify-center py-16">
//         <Suspense fallback={<Loading />}>
//           <UnsubscribeContent />
//         </Suspense>
//       </main>

//       {/* Footer - will now stick to bottom */}
//       <Footer />
//     </div>
//   );
// };

// export default EthmarUnsubscribePage;
"use client";
// app/resubscribe/page.tsx
import React, { useState, useEffect } from "react";

export default function ResubscribePage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // Extract email and token from URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        const emailParam = url.searchParams.get("email");
        const tokenParam = url.searchParams.get("token");

        // Add debug info
        setDebugInfo({
          rawUrl: window.location.href,
          parsedEmail: emailParam,
          parsedToken: tokenParam,
        });

        // Only set if they exist and aren't empty
        if (emailParam && emailParam.trim()) {
          setEmail(decodeURIComponent(emailParam.trim()));
        }

        if (tokenParam && tokenParam.trim()) {
          setToken(decodeURIComponent(tokenParam.trim()));
        }

        // Auto-submit if both parameters are present and not empty
        if (
          emailParam &&
          emailParam.trim() &&
          tokenParam &&
          tokenParam.trim() &&
          !autoSubmitted
        ) {
          setAutoSubmitted(true);
          // Use a small timeout to ensure state has been set
          setTimeout(() => {
            handleResubscribe(
              decodeURIComponent(emailParam.trim()),
              decodeURIComponent(tokenParam.trim())
            );
          }, 100);
        }
      } catch (error) {
        console.error("Error parsing URL parameters:", error);
        setDebugInfo({ error: String(error) });
      }
    }
  }, []);

  const handleResubscribe = async (
    overrideEmail?: string,
    overrideToken?: string
  ) => {
    // Use override values or state values
    const submitEmail = overrideEmail || email;
    const submitToken = overrideToken || token;

    if (!submitEmail || !submitToken) {
      setStatus("error");
      setMessage("البريد الإلكتروني أو رمز التحقق غير صالح");
      return;
    }

    setLoading(true);
    setStatus("loading");

    try {
      // Log the request data
      console.log("Sending resubscribe request with:", {
        email: submitEmail,
        token: submitToken,
      });

      const response = await fetch("/api/resubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: submitEmail, token: submitToken }),
      });

      const data = await response.json();

      // Update debug info with response
      setDebugInfo((prev: any) => ({
        ...prev,
        responseStatus: response.status,
        responseData: data,
      }));

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
      setDebugInfo((prev: any) => ({
        ...prev,
        fetchError: String(error),
      }));
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
                    onClick={() => handleResubscribe()}
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

        {/* Debug Information (only shown in development) */}
        {process.env.NODE_ENV === "development" && debugInfo && (
          <div
            className="mt-8 p-4 bg-gray-100 rounded-md text-xs text-left"
            dir="ltr"
          >
            <h4 className="font-bold mb-2">Debug Info:</h4>
            <pre className="overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
