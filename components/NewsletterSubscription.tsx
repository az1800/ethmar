"use client";
import React, { useState } from "react";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const sendWelcomeEmail = async (emailAddress: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailAddress }),
      });
      const data = await response.json();

      if (!response.ok) {
        // Handle case where email already exists
        if (data.emailExists) {
          setEmailExists(true);
          return false;
        }
        throw new Error(data.error || "Failed to send email");
      }
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      setError("");
      setEmailExists(false);

      try {
        const success = await sendWelcomeEmail(email);
        if (success) {
          setEmailSent(true);
          setIsSubscribed(true);
          setEmail("");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setError("فشل في إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-[15rem] ml-auto p-4 bg-black text-white">
      {/* Title */}
      <h2 className="text-sm font-semibold mb-2 text-white text-right">
        اشترك في نشرتنا البريدية
      </h2>

      {/* Error message */}
      {error && (
        <div className="bg-red-600 text-white py-1 px-2 rounded-lg mb-2 text-xs text-right">
          {error}
        </div>
      )}

      {/* Email exists message */}
      {emailExists && (
        <div className="bg-yellow-600 text-white py-1 px-2 rounded-lg mb-2 text-xs text-right">
          هذا البريد الإلكتروني مشترك بالفعل
        </div>
      )}

      {/* Subscription form */}
      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-row items-center bg-white rounded-md overflow-hidden">
            <button
              type="submit"
              className="bg-green-800 p-3 flex items-center justify-center rounded-l-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M19 12H5M5 12L12 19M5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="ادخل بريدك الالكتروني"
              className="w-full py-2 px-4 bg-transparent text-gray-700 text-[0.6rem] outline-none"
              required
              dir="rtl"
              disabled={isLoading}
            />
          </div>
        </form>
      ) : (
        <div className="bg-green-800 text-white py-2 px-4 rounded-lg text-center text-sm">
          <p>شكراً لاشتراكك!</p>
          {emailSent && (
            <p className="text-xs mt-1">تم إرسال بريد إلكتروني للتأكيد.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscription;
