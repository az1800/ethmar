"use client";
import { useUser } from "@/authentication/useUser";
import Loader from "@/components/Loader";
import { useNotification } from "@/components/Notification";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function GuestLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, isAuthenticated } = useUser();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      showNotification({
        type: "info",
        title: "تم تسجيل الدخول",
        message: "أنت مسجل دخول بالفعل. سيتم إعادة توجيهك إلى الصفحة الرئيسية.",
        duration: 4000,
      });

      // Short delay before redirect to show the notification
      const redirectTimer = setTimeout(() => {
        redirect("/");
      }, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isLoading, isAuthenticated, showNotification]);

  // Show loading state or the children
  return isLoading ? <Loader /> : children;
}
